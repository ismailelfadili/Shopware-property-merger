<?php

declare(strict_types=1);

namespace FULLHAUS\MerchantFinder\Core\Content\MerchantFinder\Controller;

use Doctrine\DBAL\Connection;
use Doctrine\DBAL\FetchMode;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\Log\Package;
use Shopware\Core\System\SystemConfig\SystemConfigService;
use Shopware\Storefront\Page\GenericPageLoader;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

#[Route(defaults: ['_routeScope' => ['api']])]
#[Package('sales-channel')]
class MerchantFinderApiController extends AbstractController
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

    #[Route(path: '/api/v{version}/fh/merchant-finder/import', name: 'api.fh.merchant-finder.import', methods: ['POST'])]
    public function import(Request $request, Context $context): JsonResponse
    {
        // TODO: make it happen
        return new JsonResponse();
    }

    #[Route(path: '/api/v{version}/fh/merchant-finder/update-locations', name: 'api.fh.merchant-finder.update-locations', methods: ['POST'])]
    public function updateLocations(Context $context): JsonResponse
    {
        // TODO: make it happen
        return new JsonResponse();
    }

    #[Route(path: '/api/v{version}/fh/merchant-finder/export', name: 'api.fh.merchant-finder.export', methods: ['GET'])]
    public function export(Context $context): void
    {
        // TODO: clean export, maybe save as temp file & download
        $connection = $this->container->get(Connection::class);

        // $repo = $this->container->get('fh_merchant.repository');
        // $criteria = new Criteria();
        // $data = $repo->search($criteria, $context);

        $sql = <<<SQL
select
    lower(HEX(`id`)) as `id`,
    `origin_id` as `originId`,
    lower(HEX(`sales_channel_id`)) as `salesChannelId`,
    lower(HEX(`country_id`)) as `countryId`,
    lower(HEX(`customer_group_id`)) as `customerGroupId`,
    lower(HEX(`media_id`)) as `mediaId`,
    lower(HEX(`marker_id`)) as `markerId`,
    lower(HEX(`marker_shadow_id`)) as `markerShadowId`,
    `company`,
    `first_name` as `firstName`,
    `last_name` as `lastName`,
    `email`,
    `zipcode`,
    `city`,
    `street`,
    `street_number` as `streetNumber`,
    `country`,
    `country_code` as `countryCode`,
    `location_lat` as `locationLat`,
    `location_lon` as `locationLon`,
    `vat_id` as `vatId`,
    `phone_number` as `phoneNumber`,
    `shop_url` as `shopUrl`,
    `merchant_url` as `merchantUrl`,
    `description`,
    `opening_hours` as `openingHours`,
    `marker_settings` as `markerSettings`,
    `merchant_group_id` as `merchantGroupId`,
    `merchant_type_id` as `merchantTypeId`
from `fh_merchant`
order by `originId`;
SQL;

        $data = $connection->executeQuery($sql)->fetchAll(FetchMode::ASSOCIATIVE);
        $file = 'merchant_finder_export_'.date('Y-m-d-h-i-s').'.csv';

        foreach ($data as &$item) {
            if (empty($item['originId'])) {
                $item['originId'] = $item['id'];
            }
            unset($item['id']);
        }

        header('Content-Type: text/csv');
        header('Content-Disposition: attachment;filename='.$file);

        $out = fopen('php://output', 'w');
        fputcsv($out, array_keys($data[0]));

        unset($item);
        foreach ($data as $item) {
            fputcsv($out, array_values($item));
        }

        fclose($out);
        exit;
    }
}
