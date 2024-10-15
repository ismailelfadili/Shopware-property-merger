<?php

declare(strict_types=1);

namespace FULLHAUS\ShopConnector\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration1625575582FhShopConnector extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1625575582;
    }

    public function update(Connection $connection): void
    {
        $query = <<<SQL
            CREATE TABLE IF NOT EXISTS `fh_shopconnector_users` (
                `id` BINARY(16) NOT NULL,
                `origin_id` VARCHAR(255) COLLATE utf8mb4_unicode_ci,
                `sales_channel_id` BINARY(16),
                `active` TINYINT,
                `dealer_num` TEXT(16) DEFAULT NULL,
                `media_id` BINARY(16),
                `shop_operator` TEXT DEFAULT NULL,
                `shop_url` TEXT DEFAULT NULL,
                `created_at` DATETIME(3) NOT NULL,
                `updated_at` DATETIME(3) NULL,
                PRIMARY KEY (`id`)
            ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

            CREATE TABLE IF NOT EXISTS `fh_shopconnector_products` (
                `id` BINARY(16) NOT NULL,
                `origin_id` VARCHAR(255) COLLATE utf8mb4_unicode_ci,
                `sales_channel_id` BINARY(16),
                `active` TINYINT,
                `dealer_id` BINARY(16) DEFAULT NULL,
                `product_name` TEXT DEFAULT NULL,
                `weka_artnum` TEXT DEFAULT NULL,
                `ean` TEXT DEFAULT NULL,
                `price` TEXT DEFAULT NULL,
                `deep_link` TEXT DEFAULT NULL,
                `created_at` DATETIME(3) NOT NULL,
                `updated_at` DATETIME(3) NULL,
                PRIMARY KEY (`id`),
                FOREIGN KEY (`dealer_id`) REFERENCES `fh_shopconnector_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
            ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
SQL;
        $connection->executeStatement($query);
    }

    public function updateDestructive(Connection $connection): void
    {
        // implement update destructive
    }
}
