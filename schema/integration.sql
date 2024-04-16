CREATE TABLE `integration` (
    `id` BINARY(16) NOT NULL,
    `label` VARCHAR(255) NOT NULL,
    `access_key` VARCHAR(255) NOT NULL,
    `secret_access_key` VARCHAR(1024) NOT NULL,
    `write_access` TINYINT(1) NULL DEFAULT '0',
    `last_usage_at` DATETIME(3) NULL,
    `custom_fields` JSON NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `json.integration.custom_fields` CHECK (JSON_VALID(`custom_fields`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;