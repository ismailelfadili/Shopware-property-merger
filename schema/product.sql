CREATE TABLE `product` (
    `id` BINARY(16) NOT NULL,
    `version_id` BINARY(16) NOT NULL,
    `parent_id` BINARY(16) NULL,
    `parent_version_id` BINARY(16) NOT NULL,
    `child_count` INT(11) NULL,
    `blacklist_ids` JSON NULL,
    `whitelist_ids` JSON NULL,
    `auto_increment` INT(11) NULL,
    `active` TINYINT(1) NULL DEFAULT '0',
    `stock` INT(11) NOT NULL,
    `available_stock` INT(11) NULL,
    `available` TINYINT(1) NULL DEFAULT '0',
    `variant_restrictions` JSON NULL,
    `display_group` VARCHAR(255) NULL,
    `configurator_group_config` JSON NULL,
    `product_manufacturer_id` BINARY(16) NULL,
    `product_manufacturer_version_id` BINARY(16) NOT NULL,
    `unit_id` BINARY(16) NULL,
    `tax_id` BINARY(16) NOT NULL,
    `product_media_id` BINARY(16) NULL,
    `product_media_version_id` BINARY(16) NULL,
    `price` JSON NOT NULL,
    `manufacturer_number` VARCHAR(255) NULL,
    `ean` VARCHAR(255) NULL,
    `product_number` VARCHAR(64) NOT NULL,
    `is_closeout` TINYINT(1) NULL DEFAULT '0',
    `purchase_steps` INT(11) NULL,
    `max_purchase` INT(11) NULL,
    `min_purchase` INT(11) NULL,
    `purchase_unit` DOUBLE NULL,
    `reference_unit` DOUBLE NULL,
    `shipping_free` TINYINT(1) NULL DEFAULT '0',
    `purchase_price` DOUBLE NULL,
    `mark_as_topseller` TINYINT(1) NULL DEFAULT '0',
    `weight` DOUBLE NULL,
    `width` DOUBLE NULL,
    `height` DOUBLE NULL,
    `length` DOUBLE NULL,
    `release_date` DATETIME(3) NULL,
    `category_tree` JSON NULL,
    `property_ids` JSON NULL,
    `option_ids` JSON NULL,
    `tag_ids` JSON NULL,
    `listing_prices` JSON NULL,
    `rating_average` DOUBLE NULL,
    `delivery_time_id` BINARY(16) NULL,
    `restock_time` INT(11) NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`,`version_id`),
    CONSTRAINT `json.product.blacklist_ids` CHECK (JSON_VALID(`blacklist_ids`)),
    CONSTRAINT `json.product.whitelist_ids` CHECK (JSON_VALID(`whitelist_ids`)),
    CONSTRAINT `json.product.variant_restrictions` CHECK (JSON_VALID(`variant_restrictions`)),
    CONSTRAINT `json.product.configurator_group_config` CHECK (JSON_VALID(`configurator_group_config`)),
    CONSTRAINT `json.product.price` CHECK (JSON_VALID(`price`)),
    CONSTRAINT `json.product.category_tree` CHECK (JSON_VALID(`category_tree`)),
    CONSTRAINT `json.product.property_ids` CHECK (JSON_VALID(`property_ids`)),
    CONSTRAINT `json.product.option_ids` CHECK (JSON_VALID(`option_ids`)),
    CONSTRAINT `json.product.tag_ids` CHECK (JSON_VALID(`tag_ids`)),
    CONSTRAINT `json.product.listing_prices` CHECK (JSON_VALID(`listing_prices`)),
    CONSTRAINT `json.product.translated` CHECK (JSON_VALID(`translated`)),
    KEY `fk.product.delivery_time_id` (`delivery_time_id`),
    KEY `fk.product.parent_id` (`parent_id`,`version_id`),
    KEY `fk.product.tax_id` (`tax_id`),
    KEY `fk.product.product_manufacturer_id` (`product_manufacturer_id`,`product_manufacturer_version_id`),
    KEY `fk.product.unit_id` (`unit_id`),
    KEY `fk.product.product_media_id` (`product_media_id`,`product_media_version_id`),
    CONSTRAINT `fk.product.delivery_time_id` FOREIGN KEY (`delivery_time_id`) REFERENCES `delivery_time` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.product.parent_id` FOREIGN KEY (`parent_id`,`version_id`) REFERENCES `product` (`id`,`version_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.product.tax_id` FOREIGN KEY (`tax_id`) REFERENCES `tax` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.product.product_manufacturer_id` FOREIGN KEY (`product_manufacturer_id`,`product_manufacturer_version_id`) REFERENCES `product_manufacturer` (`id`,`version_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.product.unit_id` FOREIGN KEY (`unit_id`) REFERENCES `unit` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `product_category` (
    `product_id` BINARY(16) NOT NULL,
    `product_version_id` BINARY(16) NOT NULL,
    `category_id` BINARY(16) NOT NULL,
    `category_version_id` BINARY(16) NOT NULL,
    PRIMARY KEY (`product_id`,`product_version_id`,`category_id`,`category_version_id`),
    KEY `fk.product_category.product_id` (`product_id`,`product_version_id`),
    KEY `fk.product_category.category_id` (`category_id`,`category_version_id`),
    CONSTRAINT `fk.product_category.product_id` FOREIGN KEY (`product_id`,`product_version_id`) REFERENCES `product` (`id`,`version_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.product_category.category_id` FOREIGN KEY (`category_id`,`category_version_id`) REFERENCES `category` (`id`,`version_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `product_tag` (
    `product_id` BINARY(16) NOT NULL,
    `product_version_id` BINARY(16) NOT NULL,
    `tag_id` BINARY(16) NOT NULL,
    PRIMARY KEY (`product_id`,`product_version_id`,`tag_id`),
    KEY `fk.product_tag.product_id` (`product_id`,`product_version_id`),
    KEY `fk.product_tag.tag_id` (`tag_id`),
    CONSTRAINT `fk.product_tag.product_id` FOREIGN KEY (`product_id`,`product_version_id`) REFERENCES `product` (`id`,`version_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.product_tag.tag_id` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `product_configurator_setting` (
    `id` BINARY(16) NOT NULL,
    `version_id` BINARY(16) NOT NULL,
    `product_id` BINARY(16) NOT NULL,
    `product_version_id` BINARY(16) NOT NULL,
    `media_id` BINARY(16) NULL,
    `property_group_option_id` BINARY(16) NOT NULL,
    `price` JSON NULL,
    `position` INT(11) NULL,
    `custom_fields` JSON NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`,`version_id`),
    CONSTRAINT `json.product_configurator_setting.price` CHECK (JSON_VALID(`price`)),
    CONSTRAINT `json.product_configurator_setting.custom_fields` CHECK (JSON_VALID(`custom_fields`)),
    KEY `fk.product_configurator_setting.product_id` (`product_id`,`product_version_id`),
    KEY `fk.product_configurator_setting.media_id` (`media_id`),
    KEY `fk.product_configurator_setting.property_group_option_id` (`property_group_option_id`),
    CONSTRAINT `fk.product_configurator_setting.product_id` FOREIGN KEY (`product_id`,`product_version_id`) REFERENCES `product` (`id`,`version_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.product_configurator_setting.media_id` FOREIGN KEY (`media_id`) REFERENCES `media` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.product_configurator_setting.property_group_option_id` FOREIGN KEY (`property_group_option_id`) REFERENCES `property_group_option` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `product_price` (
    `id` BINARY(16) NOT NULL,
    `version_id` BINARY(16) NOT NULL,
    `product_id` BINARY(16) NOT NULL,
    `product_version_id` BINARY(16) NOT NULL,
    `rule_id` BINARY(16) NOT NULL,
    `price` JSON NOT NULL,
    `quantity_start` INT(11) NOT NULL,
    `quantity_end` INT(11) NULL,
    `custom_fields` JSON NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`,`version_id`),
    CONSTRAINT `json.product_price.price` CHECK (JSON_VALID(`price`)),
    CONSTRAINT `json.product_price.custom_fields` CHECK (JSON_VALID(`custom_fields`)),
    KEY `fk.product_price.product_id` (`product_id`,`product_version_id`),
    KEY `fk.product_price.rule_id` (`rule_id`),
    CONSTRAINT `fk.product_price.product_id` FOREIGN KEY (`product_id`,`product_version_id`) REFERENCES `product` (`id`,`version_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.product_price.rule_id` FOREIGN KEY (`rule_id`) REFERENCES `rule` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `product_property` (
    `product_id` BINARY(16) NOT NULL,
    `product_version_id` BINARY(16) NOT NULL,
    `property_group_option_id` BINARY(16) NOT NULL,
    PRIMARY KEY (`product_id`,`property_group_option_id`),
    KEY `fk.product_property.product_id` (`product_id`,`product_version_id`),
    KEY `fk.product_property.property_group_option_id` (`property_group_option_id`),
    CONSTRAINT `fk.product_property.product_id` FOREIGN KEY (`product_id`,`product_version_id`) REFERENCES `product` (`id`,`version_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.product_property.property_group_option_id` FOREIGN KEY (`property_group_option_id`) REFERENCES `property_group_option` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `product_search_keyword` (
    `id` BINARY(16) NOT NULL,
    `version_id` BINARY(16) NOT NULL,
    `language_id` BINARY(16) NOT NULL,
    `product_id` BINARY(16) NOT NULL,
    `product_version_id` BINARY(16) NOT NULL,
    `keyword` VARCHAR(255) NOT NULL,
    `ranking` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`,`version_id`,`language_id`),
    KEY `fk.product_search_keyword.product_id` (`product_id`,`product_version_id`),
    KEY `fk.product_search_keyword.language_id` (`language_id`),
    CONSTRAINT `fk.product_search_keyword.product_id` FOREIGN KEY (`product_id`,`product_version_id`) REFERENCES `product` (`id`,`version_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.product_search_keyword.language_id` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `product_keyword_dictionary` (
    `id` BINARY(16) NOT NULL,
    `language_id` BINARY(16) NOT NULL,
    `keyword` VARCHAR(255) NOT NULL,
    `reversed` VARCHAR(255) NULL,
    PRIMARY KEY (`id`),
    KEY `fk.product_keyword_dictionary.language_id` (`language_id`),
    CONSTRAINT `fk.product_keyword_dictionary.language_id` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `product_review` (
    `id` BINARY(16) NOT NULL,
    `product_id` BINARY(16) NOT NULL,
    `customer_id` BINARY(16) NOT NULL,
    `sales_channel_id` BINARY(16) NOT NULL,
    `language_id` BINARY(16) NOT NULL,
    `external_user` VARCHAR(255) NULL,
    `external_email` VARCHAR(255) NULL,
    `title` VARCHAR(255) NOT NULL,
    `content` LONGTEXT NOT NULL,
    `points` DOUBLE NULL,
    `status` TINYINT(1) NULL DEFAULT '0',
    `comment` LONGTEXT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `product_version_id` BINARY(16) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `fk.product_review.product_id` (`product_id`,`product_version_id`),
    KEY `fk.product_review.customer_id` (`customer_id`),
    KEY `fk.product_review.sales_channel_id` (`sales_channel_id`),
    KEY `fk.product_review.language_id` (`language_id`),
    CONSTRAINT `fk.product_review.product_id` FOREIGN KEY (`product_id`,`product_version_id`) REFERENCES `product` (`id`,`version_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.product_review.customer_id` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.product_review.sales_channel_id` FOREIGN KEY (`sales_channel_id`) REFERENCES `sales_channel` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.product_review.language_id` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `product_manufacturer` (
    `id` BINARY(16) NOT NULL,
    `version_id` BINARY(16) NOT NULL,
    `media_id` BINARY(16) NULL,
    `link` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`,`version_id`),
    CONSTRAINT `json.product_manufacturer.translated` CHECK (JSON_VALID(`translated`)),
    KEY `fk.product_manufacturer.media_id` (`media_id`),
    CONSTRAINT `fk.product_manufacturer.media_id` FOREIGN KEY (`media_id`) REFERENCES `media` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `product_manufacturer_translation` (
    `name` VARCHAR(255) NOT NULL,
    `description` LONGTEXT NULL,
    `custom_fields` JSON NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `product_manufacturer_id` BINARY(16) NOT NULL,
    `language_id` BINARY(16) NOT NULL,
    `product_manufacturer_version_id` BINARY(16) NOT NULL,
    PRIMARY KEY (`product_manufacturer_id`,`language_id`,`product_manufacturer_version_id`),
    CONSTRAINT `json.product_manufacturer_translation.custom_fields` CHECK (JSON_VALID(`custom_fields`)),
    KEY `fk.product_manufacturer_translation.product_manufacturer_id` (`product_manufacturer_id`,`product_manufacturer_version_id`),
    KEY `fk.product_manufacturer_translation.language_id` (`language_id`),
    CONSTRAINT `fk.product_manufacturer_translation.product_manufacturer_id` FOREIGN KEY (`product_manufacturer_id`,`product_manufacturer_version_id`) REFERENCES `product_manufacturer` (`id`,`version_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.product_manufacturer_translation.language_id` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `product_media` (
    `id` BINARY(16) NOT NULL,
    `version_id` BINARY(16) NOT NULL,
    `product_id` BINARY(16) NOT NULL,
    `product_version_id` BINARY(16) NOT NULL,
    `media_id` BINARY(16) NOT NULL,
    `position` INT(11) NULL,
    `custom_fields` JSON NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`,`version_id`),
    CONSTRAINT `json.product_media.custom_fields` CHECK (JSON_VALID(`custom_fields`)),
    KEY `fk.product_media.product_id` (`product_id`,`product_version_id`),
    KEY `fk.product_media.media_id` (`media_id`),
    CONSTRAINT `fk.product_media.product_id` FOREIGN KEY (`product_id`,`product_version_id`) REFERENCES `product` (`id`,`version_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.product_media.media_id` FOREIGN KEY (`media_id`) REFERENCES `media` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `product_translation` (
    `additional_text` VARCHAR(255) NULL,
    `name` VARCHAR(255) NOT NULL,
    `keywords` LONGTEXT NULL,
    `description` LONGTEXT NULL,
    `meta_title` VARCHAR(255) NULL,
    `pack_unit` VARCHAR(255) NULL,
    `custom_fields` JSON NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `product_id` BINARY(16) NOT NULL,
    `language_id` BINARY(16) NOT NULL,
    `product_version_id` BINARY(16) NOT NULL,
    PRIMARY KEY (`product_id`,`language_id`,`product_version_id`),
    CONSTRAINT `json.product_translation.custom_fields` CHECK (JSON_VALID(`custom_fields`)),
    KEY `fk.product_translation.product_id` (`product_id`,`product_version_id`),
    KEY `fk.product_translation.language_id` (`language_id`),
    CONSTRAINT `fk.product_translation.product_id` FOREIGN KEY (`product_id`,`product_version_id`) REFERENCES `product` (`id`,`version_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.product_translation.language_id` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `product_option` (
    `product_id` BINARY(16) NOT NULL,
    `product_version_id` BINARY(16) NOT NULL,
    `property_group_option_id` BINARY(16) NOT NULL,
    PRIMARY KEY (`product_id`,`property_group_option_id`),
    KEY `fk.product_option.product_id` (`product_id`,`product_version_id`),
    KEY `fk.product_option.property_group_option_id` (`property_group_option_id`),
    CONSTRAINT `fk.product_option.product_id` FOREIGN KEY (`product_id`,`product_version_id`) REFERENCES `product` (`id`,`version_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.product_option.property_group_option_id` FOREIGN KEY (`property_group_option_id`) REFERENCES `property_group_option` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `product_category_tree` (
    `product_id` BINARY(16) NOT NULL,
    `product_version_id` BINARY(16) NOT NULL,
    `category_id` BINARY(16) NOT NULL,
    `category_version_id` BINARY(16) NOT NULL,
    PRIMARY KEY (`product_id`,`product_version_id`,`category_id`,`category_version_id`),
    KEY `fk.product_category_tree.product_id` (`product_id`,`product_version_id`),
    KEY `fk.product_category_tree.category_id` (`category_id`,`category_version_id`),
    CONSTRAINT `fk.product_category_tree.product_id` FOREIGN KEY (`product_id`,`product_version_id`) REFERENCES `product` (`id`,`version_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.product_category_tree.category_id` FOREIGN KEY (`category_id`,`category_version_id`) REFERENCES `category` (`id`,`version_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `product_visibility` (
    `id` BINARY(16) NOT NULL,
    `product_id` BINARY(16) NOT NULL,
    `product_version_id` BINARY(16) NOT NULL,
    `sales_channel_id` BINARY(16) NOT NULL,
    `visibility` INT(11) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `fk.product_visibility.sales_channel_id` (`sales_channel_id`),
    KEY `fk.product_visibility.product_id` (`product_id`,`product_version_id`),
    CONSTRAINT `fk.product_visibility.sales_channel_id` FOREIGN KEY (`sales_channel_id`) REFERENCES `sales_channel` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.product_visibility.product_id` FOREIGN KEY (`product_id`,`product_version_id`) REFERENCES `product` (`id`,`version_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `product_stream` (
    `id` BINARY(16) NOT NULL,
    `api_filter` JSON NULL,
    `invalid` TINYINT(1) NULL DEFAULT '0',
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `json.product_stream.api_filter` CHECK (JSON_VALID(`api_filter`)),
    CONSTRAINT `json.product_stream.translated` CHECK (JSON_VALID(`translated`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `product_stream_translation` (
    `name` VARCHAR(255) NOT NULL,
    `description` LONGTEXT NULL,
    `custom_fields` JSON NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `product_stream_id` BINARY(16) NOT NULL,
    `language_id` BINARY(16) NOT NULL,
    PRIMARY KEY (`product_stream_id`,`language_id`),
    CONSTRAINT `json.product_stream_translation.custom_fields` CHECK (JSON_VALID(`custom_fields`)),
    KEY `fk.product_stream_translation.product_stream_id` (`product_stream_id`),
    KEY `fk.product_stream_translation.language_id` (`language_id`),
    CONSTRAINT `fk.product_stream_translation.product_stream_id` FOREIGN KEY (`product_stream_id`) REFERENCES `product_stream` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.product_stream_translation.language_id` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `product_stream_filter` (
    `id` BINARY(16) NOT NULL,
    `product_stream_id` BINARY(16) NOT NULL,
    `parent_id` BINARY(16) NULL,
    `type` VARCHAR(255) NOT NULL,
    `field` VARCHAR(255) NULL,
    `operator` VARCHAR(255) NULL,
    `value` LONGTEXT NULL,
    `parameters` JSON NULL,
    `position` INT(11) NULL,
    `custom_fields` JSON NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `json.product_stream_filter.parameters` CHECK (JSON_VALID(`parameters`)),
    CONSTRAINT `json.product_stream_filter.custom_fields` CHECK (JSON_VALID(`custom_fields`)),
    KEY `fk.product_stream_filter.product_stream_id` (`product_stream_id`),
    KEY `fk.product_stream_filter.parent_id` (`parent_id`),
    CONSTRAINT `fk.product_stream_filter.product_stream_id` FOREIGN KEY (`product_stream_id`) REFERENCES `product_stream` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.product_stream_filter.parent_id` FOREIGN KEY (`parent_id`) REFERENCES `product_stream_filter` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;