CREATE TABLE `import_export_profile` (
    `id` BINARY(16) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `system_default` TINYINT(1) NULL DEFAULT '0',
    `source_entity` VARCHAR(255) NOT NULL,
    `file_type` VARCHAR(255) NOT NULL,
    `delimiter` VARCHAR(255) NULL,
    `enclosure` VARCHAR(255) NULL,
    `mapping` JSON NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `json.import_export_profile.mapping` CHECK (JSON_VALID(`mapping`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `import_export_log` (
    `id` BINARY(16) NOT NULL,
    `activity` VARCHAR(255) NOT NULL,
    `state` VARCHAR(255) NOT NULL,
    `records` INT(11) NOT NULL,
    `user_id` BINARY(16) NULL,
    `profile_id` BINARY(16) NULL,
    `file_id` BINARY(16) NULL,
    `username` VARCHAR(255) NULL,
    `profile_name` VARCHAR(255) NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`),
    KEY `fk.import_export_log.user_id` (`user_id`),
    KEY `fk.import_export_log.profile_id` (`profile_id`),
    CONSTRAINT `fk.import_export_log.user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.import_export_log.profile_id` FOREIGN KEY (`profile_id`) REFERENCES `import_export_profile` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `import_export_file` (
    `id` BINARY(16) NOT NULL,
    `original_name` VARCHAR(255) NOT NULL,
    `path` VARCHAR(255) NOT NULL,
    `expire_date` DATETIME(3) NOT NULL,
    `size` INT(11) NULL,
    `created_at` DATETIME(3) NOT NULL,
    `access_token` VARCHAR(255) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;