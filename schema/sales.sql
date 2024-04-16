CREATE TABLE `sales_channel` (
    `id` BINARY(16) NOT NULL,
    `type_id` BINARY(16) NOT NULL,
    `language_id` BINARY(16) NOT NULL,
    `customer_group_id` BINARY(16) NOT NULL,
    `currency_id` BINARY(16) NOT NULL,
    `payment_method_id` BINARY(16) NOT NULL,
    `shipping_method_id` BINARY(16) NOT NULL,
    `country_id` BINARY(16) NOT NULL,
    `navigation_category_id` BINARY(16) NOT NULL,
    `navigation_category_version_id` BINARY(16) NOT NULL,
    `footer_category_id` BINARY(16) NULL,
    `footer_category_version_id` BINARY(16) NULL,
    `service_category_id` BINARY(16) NULL,
    `service_category_version_id` BINARY(16) NULL,
    `mail_header_footer_id` BINARY(16) NULL,
    `short_name` VARCHAR(255) NULL,
    `access_key` VARCHAR(255) NOT NULL,
    `configuration` JSON NULL,
    `active` TINYINT(1) NULL DEFAULT '0',
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `json.sales_channel.configuration` CHECK (JSON_VALID(`configuration`)),
    CONSTRAINT `json.sales_channel.translated` CHECK (JSON_VALID(`translated`)),
    KEY `fk.sales_channel.type_id` (`type_id`),
    KEY `fk.sales_channel.language_id` (`language_id`),
    KEY `fk.sales_channel.customer_group_id` (`customer_group_id`),
    KEY `fk.sales_channel.currency_id` (`currency_id`),
    KEY `fk.sales_channel.payment_method_id` (`payment_method_id`),
    KEY `fk.sales_channel.shipping_method_id` (`shipping_method_id`),
    KEY `fk.sales_channel.country_id` (`country_id`),
    KEY `fk.sales_channel.navigation_category_id` (`navigation_category_id`,`navigation_category_version_id`),
    KEY `fk.sales_channel.footer_category_id` (`footer_category_id`,`navigation_category_version_id`),
    KEY `fk.sales_channel.service_category_id` (`service_category_id`,`navigation_category_version_id`),
    KEY `fk.sales_channel.mail_header_footer_id` (`mail_header_footer_id`),
    CONSTRAINT `fk.sales_channel.type_id` FOREIGN KEY (`type_id`) REFERENCES `sales_channel_type` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.sales_channel.language_id` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.sales_channel.customer_group_id` FOREIGN KEY (`customer_group_id`) REFERENCES `customer_group` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.sales_channel.currency_id` FOREIGN KEY (`currency_id`) REFERENCES `currency` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.sales_channel.payment_method_id` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_method` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.sales_channel.shipping_method_id` FOREIGN KEY (`shipping_method_id`) REFERENCES `shipping_method` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.sales_channel.country_id` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.sales_channel.navigation_category_id` FOREIGN KEY (`navigation_category_id`,`navigation_category_version_id`) REFERENCES `category` (`id`,`version_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.sales_channel.footer_category_id` FOREIGN KEY (`footer_category_id`,`navigation_category_version_id`) REFERENCES `category` (`id`,`version_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.sales_channel.service_category_id` FOREIGN KEY (`service_category_id`,`navigation_category_version_id`) REFERENCES `category` (`id`,`version_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.sales_channel.mail_header_footer_id` FOREIGN KEY (`mail_header_footer_id`) REFERENCES `mail_header_footer` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `sales_channel_translation` (
    `name` VARCHAR(255) NOT NULL,
    `custom_fields` JSON NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `sales_channel_id` BINARY(16) NOT NULL,
    `language_id` BINARY(16) NOT NULL,
    PRIMARY KEY (`sales_channel_id`,`language_id`),
    CONSTRAINT `json.sales_channel_translation.custom_fields` CHECK (JSON_VALID(`custom_fields`)),
    KEY `fk.sales_channel_translation.sales_channel_id` (`sales_channel_id`),
    KEY `fk.sales_channel_translation.language_id` (`language_id`),
    CONSTRAINT `fk.sales_channel_translation.sales_channel_id` FOREIGN KEY (`sales_channel_id`) REFERENCES `sales_channel` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.sales_channel_translation.language_id` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `sales_channel_country` (
    `sales_channel_id` BINARY(16) NOT NULL,
    `country_id` BINARY(16) NOT NULL,
    PRIMARY KEY (`sales_channel_id`,`country_id`),
    KEY `fk.sales_channel_country.sales_channel_id` (`sales_channel_id`),
    KEY `fk.sales_channel_country.country_id` (`country_id`),
    CONSTRAINT `fk.sales_channel_country.sales_channel_id` FOREIGN KEY (`sales_channel_id`) REFERENCES `sales_channel` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.sales_channel_country.country_id` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `sales_channel_currency` (
    `sales_channel_id` BINARY(16) NOT NULL,
    `currency_id` BINARY(16) NOT NULL,
    PRIMARY KEY (`sales_channel_id`,`currency_id`),
    KEY `fk.sales_channel_currency.sales_channel_id` (`sales_channel_id`),
    KEY `fk.sales_channel_currency.currency_id` (`currency_id`),
    CONSTRAINT `fk.sales_channel_currency.sales_channel_id` FOREIGN KEY (`sales_channel_id`) REFERENCES `sales_channel` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.sales_channel_currency.currency_id` FOREIGN KEY (`currency_id`) REFERENCES `currency` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `sales_channel_domain` (
    `id` BINARY(16) NOT NULL,
    `url` VARCHAR(255) NOT NULL,
    `sales_channel_id` BINARY(16) NOT NULL,
    `language_id` BINARY(16) NOT NULL,
    `currency_id` BINARY(16) NOT NULL,
    `snippet_set_id` BINARY(16) NOT NULL,
    `custom_fields` JSON NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `json.sales_channel_domain.custom_fields` CHECK (JSON_VALID(`custom_fields`)),
    KEY `fk.sales_channel_domain.sales_channel_id` (`sales_channel_id`),
    KEY `fk.sales_channel_domain.language_id` (`language_id`),
    KEY `fk.sales_channel_domain.currency_id` (`currency_id`),
    KEY `fk.sales_channel_domain.snippet_set_id` (`snippet_set_id`),
    CONSTRAINT `fk.sales_channel_domain.sales_channel_id` FOREIGN KEY (`sales_channel_id`) REFERENCES `sales_channel` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.sales_channel_domain.language_id` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.sales_channel_domain.currency_id` FOREIGN KEY (`currency_id`) REFERENCES `currency` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.sales_channel_domain.snippet_set_id` FOREIGN KEY (`snippet_set_id`) REFERENCES `snippet_set` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `sales_channel_language` (
    `sales_channel_id` BINARY(16) NOT NULL,
    `language_id` BINARY(16) NOT NULL,
    PRIMARY KEY (`sales_channel_id`,`language_id`),
    KEY `fk.sales_channel_language.sales_channel_id` (`sales_channel_id`),
    KEY `fk.sales_channel_language.language_id` (`language_id`),
    CONSTRAINT `fk.sales_channel_language.sales_channel_id` FOREIGN KEY (`sales_channel_id`) REFERENCES `sales_channel` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.sales_channel_language.language_id` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `sales_channel_payment_method` (
    `sales_channel_id` BINARY(16) NOT NULL,
    `payment_method_id` BINARY(16) NOT NULL,
    PRIMARY KEY (`sales_channel_id`,`payment_method_id`),
    KEY `fk.sales_channel_payment_method.sales_channel_id` (`sales_channel_id`),
    KEY `fk.sales_channel_payment_method.payment_method_id` (`payment_method_id`),
    CONSTRAINT `fk.sales_channel_payment_method.sales_channel_id` FOREIGN KEY (`sales_channel_id`) REFERENCES `sales_channel` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.sales_channel_payment_method.payment_method_id` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_method` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `sales_channel_shipping_method` (
    `sales_channel_id` BINARY(16) NOT NULL,
    `shipping_method_id` BINARY(16) NOT NULL,
    PRIMARY KEY (`sales_channel_id`,`shipping_method_id`),
    KEY `fk.sales_channel_shipping_method.sales_channel_id` (`sales_channel_id`),
    KEY `fk.sales_channel_shipping_method.shipping_method_id` (`shipping_method_id`),
    CONSTRAINT `fk.sales_channel_shipping_method.sales_channel_id` FOREIGN KEY (`sales_channel_id`) REFERENCES `sales_channel` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.sales_channel_shipping_method.shipping_method_id` FOREIGN KEY (`shipping_method_id`) REFERENCES `shipping_method` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `sales_channel_type` (
    `id` BINARY(16) NOT NULL,
    `cover_url` VARCHAR(255) NULL,
    `icon_name` VARCHAR(255) NULL,
    `screenshot_urls` JSON NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `json.sales_channel_type.screenshot_urls` CHECK (JSON_VALID(`screenshot_urls`)),
    CONSTRAINT `json.sales_channel_type.translated` CHECK (JSON_VALID(`translated`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `sales_channel_type_translation` (
    `name` VARCHAR(255) NOT NULL,
    `manufacturer` VARCHAR(255) NULL,
    `description` VARCHAR(255) NULL,
    `description_long` LONGTEXT NULL,
    `custom_fields` JSON NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `sales_channel_type_id` BINARY(16) NOT NULL,
    `language_id` BINARY(16) NOT NULL,
    PRIMARY KEY (`sales_channel_type_id`,`language_id`),
    CONSTRAINT `json.sales_channel_type_translation.custom_fields` CHECK (JSON_VALID(`custom_fields`)),
    KEY `fk.sales_channel_type_translation.sales_channel_type_id` (`sales_channel_type_id`),
    KEY `fk.sales_channel_type_translation.language_id` (`language_id`),
    CONSTRAINT `fk.sales_channel_type_translation.sales_channel_type_id` FOREIGN KEY (`sales_channel_type_id`) REFERENCES `sales_channel_type` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.sales_channel_type_translation.language_id` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;