<?php

declare(strict_types=1);

namespace FULLHAUS\MerchantFinder\Core\Content\MerchantFinder\Controller;

use Doctrine\DBAL\Connection;
use FULLHAUS\MerchantFinder\FhMerchantFinder;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsAnyFilter;
use Shopware\Core\Framework\Log\Package;
use Shopware\Core\Framework\Validation\DataBag\RequestDataBag;
use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Shopware\Core\System\SystemConfig\SystemConfigService;
use Shopware\Storefront\Controller\StorefrontController;
use Shopware\Storefront\Page\GenericPageLoader;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route(defaults: ['_routeScope' => ['storefront']])]
#[Package('storefront')]
class MerchantFinderStorefrontController extends StorefrontController
{
    private GenericPageLoader $genericLoader;
    private SystemConfigService $systemConfigService;

    public function __construct(
        GenericPageLoader $genericLoader,
        SystemConfigService $systemConfigService
    ) {
        $this->genericLoader = $genericLoader;
        $this->systemConfigService = $systemConfigService;
    }

    #[Route(path: '/fh/merchant-finder', name: 'fh.merchant-finder.index', options: ['seo' => false], defaults: ['XmlHttpRequest' => true], methods: ['GET'])]
    public function index(Request $request, RequestDataBag $data, SalesChannelContext $context): Response
    {
        $page = $this->genericLoader->load($request, $context);

        return $this->renderStorefront('@FhMerchantFinder/storefront/page/index.html.twig', [
            'pluginConfig' => $this->systemConfigService->getDomain('FhMerchantFinder.config'),
            'data' => $data,
            'page' => $page,
        ]);
    }

    #[Route(path: '/fh/merchant-finder/suggest', name: 'fh.merchant-finder.suggest', options: ['seo' => false], defaults: ['XmlHttpRequest' => true], methods: ['POST'])]
    public function suggest(Request $request, RequestDataBag $data, SalesChannelContext $context): JsonResponse
    {
        // TODO: Suggest Search, OSM doesn't allow service here
        return new JsonResponse();
    }

    /**
     * @throws GuzzleException
     */
    #[Route(path: '/fh/merchant-finder/search', name: 'fh.merchant-finder.search', options: ['seo' => false], defaults: ['XmlHttpRequest' => true], methods: ['POST'])]
    public function search(Request $request, RequestDataBag $data, SalesChannelContext $context): JsonResponse
    {
        $pluginConfig = $this->systemConfigService->getDomain('FhMerchantFinder.config');
        $filterCountries = !empty($pluginConfig['FhMerchantFinder.config.allowedSearchCountryCodes']) ? explode(',',
            $pluginConfig['FhMerchantFinder.config.allowedSearchCountryCodes']) : FhMerchantFinder::getDefault('allowedSearchCountryCodes');

        $searchEngine = !empty($pluginConfig['FhMerchantFinder.config.nominatim']) ? $pluginConfig['FhMerchantFinder.config.nominatim'] : FhMerchantFinder::getDefault('nominatim');
        $countryCodes = !empty($pluginConfig['FhMerchantFinder.config.allowedSearchCountryCodes']) ? $pluginConfig['FhMerchantFinder.config.allowedSearchCountryCodes'] : FhMerchantFinder::getDefault('allowedSearchCountryCodes');

        $connection = $this->container->get(Connection::class);

        $myLocation = [];

        if (!empty($request->request->get('zipcode'))) {
            // Start search
            $query = <<<SQL
select * from `fh_zipcode`
where `city` like :city or `zipcode` like :zipcode
LIMIT 10;
SQL;

            $myLocation = $connection->executeQuery($query, [
                'city' => '%'.$request->request->get('zipcode').'%',
                'zipcode' => '%'.$request->request->get('zipcode').'%',
            ]
            )->fetchAllAssociative();

            // No location found - Get them from OSM
            if (0 == count($myLocation)) {
                $query = http_build_query([
                    'q' => $request->request->get('zipcode'),
                    'format' => 'json',
                    'addressdetails' => 1,
                ]);

                $client = new Client();
                $countries = json_decode($countryCodes);
                $parameters = $searchEngine.'?'.$query.'&'.$countries;

                $res = $client->request('GET', $parameters,
                    ['headers' => ['Accept' => 'application/json', 'Content-type' => 'application/json']]);
                $data = json_decode($res->getBody()->getContents(), true);

                foreach ($data as $item) {
                    if (in_array($item['address']['country_code'], $filterCountries)) {
                        // Fill local database with locations
                        $query = <<<SQL
INSERT IGNORE INTO `fh_zipcode` (
    `id`,
    `zipcode`,
    `city`,
    `state`,
    `country`,
    `country_code`,
    `suburb`,
    `lon`,
    `lat`,
    `licence`
) VALUES (
    :id,
    :zipcode,
    :city,
    :state,
    :country,
    :country_code,
    :suburb,
    :lon,
    :lat,
    :licence
);
SQL;

                        $placeholder = [
                            'id' => $item['place_id'] ?? null,
                            'zipcode' => $item['address']['postcode'] ?? null,
                            'city' => $item['address']['city'] ?? null,
                            'state' => $item['address']['state'] ?? null,
                            'country' => $item['address']['country'] ?? null,
                            'country_code' => $item['address']['country_code'] ?? null,
                            'suburb' => $item['address']['suburb'] ?? null,
                            'lon' => $item['lon'] ?? null,
                            'lat' => $item['lat'] ?? null,
                            'licence' => $item['licence'] ?? null,
                        ];

                        $connection->executeStatement($query, $placeholder);

                        $myLocation[] = $placeholder;
                    }
                }
            }
        }

        // Sort by dealer classification number
        if (count($myLocation) > 0) {
            $query = <<<SQL
select
    lower(HEX(`id`)) as `id`,
    lower(HEX(`sales_channel_id`)) as `salesChannelId`,
    lower(HEX(`media_id`)) as `mediaId`,
    lower(HEX(`marker_id`)) as `markerId`,
    lower(HEX(`marker_shadow_id`)) as `markerShadowId`,
    `origin_id` as `originId`,
    `first_name` as `firstName`,
    `last_name` as `lastName`,
    `zipcode`,
    `city`,
    `company`,
    `street`,
    `street_number` as `streetNumber`,
    `country`,
    `country_code` as `countryCode`,
    `location_lat` as `locationLat`,
    `location_lon` as `locationLon`,
    `phone_number` as `phoneNumber`,
    `email` as `eMail`,
    `shop_url` as `shopUrl`,
    `merchant_url` as `merchantUrl`,
    `description`,
    `opening_hours` as `openingHours`,
    `merchant_type_id` as `merchantTypeId`,
    `marker_settings` as `markerSettings`,
    ACOS(
         SIN(RADIANS(:lat)) * SIN(RADIANS(`location_lat`))
         + COS(RADIANS(:lat)) * COS(RADIANS(`location_lat`))
         * COS(RADIANS(:lon) - RADIANS(`location_lon`))
    ) * 6380 as distance
from `fh_merchant`
where CONCAT(`company`, `city`) like :term
and `active` is true
having (`salesChannelId` = :salesChannelId or `salesChannelId` is null)
and `distance` < :distance
order by case
when `merchantTypeId` = 0 then 10
when `merchantTypeId` = 11 then 10
when `merchantTypeId` = 12 then 10
when `merchantTypeId` = 13 then 10
when `merchantTypeId` = 14 then 1
when `merchantTypeId` = 15 then 2
when `merchantTypeId` = 16 then 3
else 10 end asc, `distance` asc
LIMIT 500;
SQL;

            $data = $connection->executeQuery($query, [
                'lat' => $myLocation[0]['lat'],
                'lon' => $myLocation[0]['lon'],
                'term' => '%'.$request->request->get('term').'%',
                // 'distance' => $request->request->get('distance'),
                'distance' => '50',
                'salesChannelId' => $context->getSalesChannel()->getId(),
            ]
            )->fetchAllAssociative();
        } else {
            $data = [];
        }

        $response = new JsonResponse();
        $response->setEncodingOptions(JSON_NUMERIC_CHECK);
        $response->setData([
            'data' => $this->extendResultData($data, $context->getContext()),
            'loc' => $myLocation,
        ]);

        return $response;
    }

    private function extendResultData($data, $context)
    {
        // collect and add media
        $mediaIds = [];
        foreach ($data as $item) {
            if (!empty($item['mediaId'])) {
                $mediaIds[] = $item['mediaId'];
            }
            if (!empty($item['markerId'])) {
                $mediaIds[] = $item['markerId'];
            }
            if (!empty($item['markerShadowId'])) {
                $mediaIds[] = $item['markerShadowId'];
            }
        }

        if (count($mediaIds) > 0) {
            $mediaRepository = $this->container->get('media.repository');
            $criteria = new Criteria();
            $criteria->addFilter(new EqualsAnyFilter('id', array_unique($mediaIds)));
            $mediaEntries = $mediaRepository->search($criteria, $context)->getEntities()->getElements();
            foreach ($data as &$item) {
                if (!empty($item['mediaId'])) {
                    foreach ($mediaEntries as $mediaEntry) {
                        if ($mediaEntry->getId() == $item['mediaId']) {
                            $item['mediaUrl'] = $mediaEntry->getUrl();
                        }
                    }
                }
                if (!empty($item['markerId'])) {
                    foreach ($mediaEntries as $mediaEntry) {
                        if ($mediaEntry->getId() == $item['markerId']) {
                            $item['markerUrl'] = $mediaEntry->getUrl();
                        }
                    }
                }
                if (!empty($item['markerShadowId'])) {
                    foreach ($mediaEntries as $mediaEntry) {
                        if ($mediaEntry->getId() == $item['markerShadowId']) {
                            $item['markerShadowUrl'] = $mediaEntry->getUrl();
                        }
                    }
                }
            }
        }

        return $data;
    }
}
