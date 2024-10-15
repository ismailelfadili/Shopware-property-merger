<?php

declare(strict_types=1);

namespace FULLHAUS\MerchantFinder\Core\Content\MerchantFinder\Merchant;

use Shopware\Core\Checkout\Customer\Aggregate\CustomerGroup\CustomerGroupDefinition;
use Shopware\Core\Content\Media\MediaDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\BoolField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\CustomFields;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\SetNullOnDelete;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\WriteProtected;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FloatField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IntField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\JsonField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\OneToManyAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\System\Country\CountryDefinition;
use Shopware\Core\System\SalesChannel\SalesChannelDefinition;

class MerchantEntityDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'fh_merchant';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function getCollectionClass(): string
    {
        return MerchantEntityCollection::class;
    }

    public function getEntityClass(): string
    {
        return MerchantEntity::class;
    }

    protected function defineFields(): FieldCollection
    {
        // TODO: Add Media & Brand manufacturerId
        return new FieldCollection([
            (new IdField('id', 'id'))->addFlags(new PrimaryKey(), new Required()),
            new StringField('origin_id', 'originId'),
            new FkField('sales_channel_id', 'salesChannelId', SalesChannelDefinition::class),
            new FkField('country_id', 'countryId', CountryDefinition::class),
            new FkField('customer_group_id', 'customerGroupId', CustomerGroupDefinition::class),
            new FkField('media_id', 'mediaId', MediaDefinition::class),
            new FkField('marker_id', 'markerId', MediaDefinition::class),
            new FkField('marker_shadow_id', 'markerShadowId', MediaDefinition::class),
            new StringField('marker_settings', 'markerSettings'),
            new StringField('first_name', 'firstName'),
            new StringField('last_name', 'lastName'),
            new StringField('company', 'company'),
            new StringField('email', 'email'),
            new StringField('title', 'title'),
            new BoolField('active', 'active'),
            new StringField('zipcode', 'zipcode'),
            new StringField('city', 'city'),
            new StringField('street', 'street'),
            new StringField('street_number', 'streetNumber'),
            new StringField('country_code', 'countryCode'),
            new FloatField('location_lat', 'locationLat'),
            new FloatField('location_lon', 'locationLon'),
            new StringField('department', 'department'),
            new StringField('vat_id', 'vatId'),
            new StringField('phone_number', 'phoneNumber'),
            new StringField('description', 'description'),
            new StringField('opening_hours', 'openingHours'),
            new JsonField('data', 'data'),
            new StringField('additional_address_line1', 'additionalAddressLine1'),
            new StringField('additional_address_line2', 'additionalAddressLine2'),
            new StringField('shop_url', 'shopUrl'),
            new StringField('merchant_url', 'merchantUrl'),
            new StringField('merchant_group_id', 'merchantGroupId'),
            new StringField('merchant_type_id', 'merchantTypeId'),
            new CustomFields(),
            (new IntField('auto_increment', 'autoIncrement'))->addFlags(new WriteProtected()),
            new ManyToOneAssociationField('media', 'media_id', MediaDefinition::class, 'id', false),
            (new OneToManyAssociationField('media', MediaDefinition::class, 'id', 'id'))->addFlags(new SetNullOnDelete()),
        ]);
    }
}
