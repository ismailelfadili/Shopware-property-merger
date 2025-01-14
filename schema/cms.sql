CREATE TABLE `cms_page` (
    `id` BINARY(16) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `entity` VARCHAR(255) NULL,
    `config` JSON NULL,
    `preview_media_id` BINARY(16) NULL,
    `locked` TINYINT(1) NULL DEFAULT '0',
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `json.cms_page.config` CHECK (JSON_VALID(`config`)),
    CONSTRAINT `json.cms_page.translated` CHECK (JSON_VALID(`translated`)),
    KEY `fk.cms_page.preview_media_id` (`preview_media_id`),
    CONSTRAINT `fk.cms_page.preview_media_id` FOREIGN KEY (`preview_media_id`) REFERENCES `media` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `cms_page_translation` (
    `name` VARCHAR(255) NOT NULL,
    `custom_fields` JSON NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `cms_page_id` BINARY(16) NOT NULL,
    `language_id` BINARY(16) NOT NULL,
    PRIMARY KEY (`cms_page_id`,`language_id`),
    CONSTRAINT `json.cms_page_translation.custom_fields` CHECK (JSON_VALID(`custom_fields`)),
    KEY `fk.cms_page_translation.cms_page_id` (`cms_page_id`),
    KEY `fk.cms_page_translation.language_id` (`language_id`),
    CONSTRAINT `fk.cms_page_translation.cms_page_id` FOREIGN KEY (`cms_page_id`) REFERENCES `cms_page` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.cms_page_translation.language_id` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `cms_section` (
    `id` BINARY(16) NOT NULL,
    `position` INT(11) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `locked` TINYINT(1) NULL DEFAULT '0',
    `name` VARCHAR(255) NULL,
    `sizing_mode` VARCHAR(255) NULL,
    `mobile_behavior` VARCHAR(255) NULL,
    `background_color` VARCHAR(255) NULL,
    `background_media_id` BINARY(16) NULL,
    `background_media_mode` VARCHAR(255) NULL,
    `css_class` VARCHAR(255) NULL,
    `cms_page_id` BINARY(16) NOT NULL,
    `custom_fields` JSON NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `json.cms_section.custom_fields` CHECK (JSON_VALID(`custom_fields`)),
    KEY `fk.cms_section.cms_page_id` (`cms_page_id`),
    KEY `fk.cms_section.background_media_id` (`background_media_id`),
    CONSTRAINT `fk.cms_section.cms_page_id` FOREIGN KEY (`cms_page_id`) REFERENCES `cms_page` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.cms_section.background_media_id` FOREIGN KEY (`background_media_id`) REFERENCES `media` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `cms_block` (
    `id` BINARY(16) NOT NULL,
    `position` INT(11) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `locked` TINYINT(1) NULL DEFAULT '0',
    `name` VARCHAR(255) NULL,
    `section_position` VARCHAR(255) NULL,
    `margin_top` VARCHAR(255) NULL,
    `margin_bottom` VARCHAR(255) NULL,
    `margin_left` VARCHAR(255) NULL,
    `margin_right` VARCHAR(255) NULL,
    `background_color` VARCHAR(255) NULL,
    `background_media_id` BINARY(16) NULL,
    `background_media_mode` VARCHAR(255) NULL,
    `css_class` VARCHAR(255) NULL,
    `cms_section_id` BINARY(16) NOT NULL,
    `custom_fields` JSON NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `json.cms_block.custom_fields` CHECK (JSON_VALID(`custom_fields`)),
    KEY `fk.cms_block.cms_section_id` (`cms_section_id`),
    KEY `fk.cms_block.background_media_id` (`background_media_id`),
    CONSTRAINT `fk.cms_block.cms_section_id` FOREIGN KEY (`cms_section_id`) REFERENCES `cms_section` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.cms_block.background_media_id` FOREIGN KEY (`background_media_id`) REFERENCES `media` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `cms_slot` (
    `id` BINARY(16) NOT NULL,
    `version_id` BINARY(16) NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `slot` VARCHAR(255) NOT NULL,
    `locked` TINYINT(1) NULL DEFAULT '0',
    `cms_block_id` BINARY(16) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    PRIMARY KEY (`id`,`version_id`),
    CONSTRAINT `json.cms_slot.data` CHECK (JSON_VALID(`data`)),
    CONSTRAINT `json.cms_slot.translated` CHECK (JSON_VALID(`translated`)),
    KEY `fk.cms_slot.cms_block_id` (`cms_block_id`),
    CONSTRAINT `fk.cms_slot.cms_block_id` FOREIGN KEY (`cms_block_id`) REFERENCES `cms_block` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `cms_slot_translation` (
    `config` JSON NOT NULL,
    `custom_fields` JSON NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `cms_slot_id` BINARY(16) NOT NULL,
    `language_id` BINARY(16) NOT NULL,
    `cms_slot_version_id` BINARY(16) NOT NULL,
    PRIMARY KEY (`cms_slot_id`,`language_id`,`cms_slot_version_id`),
    CONSTRAINT `json.cms_slot_translation.config` CHECK (JSON_VALID(`config`)),
    CONSTRAINT `json.cms_slot_translation.custom_fields` CHECK (JSON_VALID(`custom_fields`)),
    KEY `fk.cms_slot_translation.cms_slot_id` (`cms_slot_id`,`cms_slot_version_id`),
    KEY `fk.cms_slot_translation.language_id` (`language_id`),
    CONSTRAINT `fk.cms_slot_translation.cms_slot_id` FOREIGN KEY (`cms_slot_id`,`cms_slot_version_id`) REFERENCES `cms_slot` (`id`,`version_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT `fk.cms_slot_translation.language_id` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;