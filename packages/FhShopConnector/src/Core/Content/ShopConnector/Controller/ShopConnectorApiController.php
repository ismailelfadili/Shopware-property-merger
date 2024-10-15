<?php

declare(strict_types=1);

namespace FULLHAUS\ShopConnector\Core\Content\ShopConnector\Controller;

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
class ShopConnectorApiController extends AbstractController
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

    #[Route(path: '/api/v{version}/fh/shopconnector/import', name: 'api.fh.shopconnector.import', methods: ['POST'])]
    public function import(Request $request, Context $context): JsonResponse
    {
        // TODO: make it happen
        return new JsonResponse();
    }

    #[Route(path: '/api/v{version}/fh/shopconnector/export', name: 'api.fh.shopconnector.export', methods: ['GET'])]
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
    `active`,
    `product_name` as `productName`,
    `weka_art_num` as `wekaArtNum`,
    `ean`,
    `price`,
    `deep_link` as `deepLink`,
    `created_at` as `createdAt`,
    `updated_at` as `updatedAt`
from `fh_shopconnector_products`
order by `deepLink`;
SQL;

        $data = $connection->executeQuery($sql)->fetchAll(FetchMode::ASSOCIATIVE);
        $file = 'shop_connector_export_'.date('Y-m-d-h-i-s').'.csv';

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
