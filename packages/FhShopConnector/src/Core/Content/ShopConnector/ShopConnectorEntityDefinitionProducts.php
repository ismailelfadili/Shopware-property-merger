<?php

declare(strict_types=1);

namespace FULLHAUS\ShopConnector\Core\Content\ShopConnector;

use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\BoolField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\CreatedAtField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\LongTextField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\OneToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\System\SalesChannel\SalesChannelDefinition;

class ShopConnectorEntityDefinitionProducts extends EntityDefinition
{
    public const ENTITY_NAME = 'fh_shopconnector_products';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function getCollectionClass(): string
    {
        return ShopConnectorEntityCollection::class;
    }

    public function getEntityClass(): string
    {
        return ShopConnectorEntity::class;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new IdField('id', 'id'))->addFlags(new PrimaryKey(), new Required()),
            new StringField('origin_id', 'originId'),

            new FkField('sales_channel_id', 'salesChannelId', SalesChannelDefinition::class),
            new FkField('dealer_id', 'dealerId', ShopConnectorEntityDefinitionUsers::class),

            new BoolField('active', 'active'),
            new StringField('product_name', 'productName'),
            new StringField('weka_artnum', 'wekaArtnum'),
            (new StringField('ean', 'ean'))->addFlags(new Required()),
            new StringField('price', 'price'),
            (new LongTextField('deep_link', 'deepLink'))->addFlags(new Required()),

            new CreatedAtField(),
            /* Frontend Dealer assignment */
            new OneToOneAssociationField('dealer', 'dealer_id', 'id', ShopConnectorEntityDefinitionUsers::class, true),
        ]);
    }
}
