CREATE TABLE `event_action` (
    `id` BINARY(16) NOT NULL,
    `event_name` VARCHAR(500) NOT NULL,
    `action_name` VARCHAR(500) NOT NULL,
    `config` JSON NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `json.event_action.config` CHECK (JSON_VALID(`config`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;