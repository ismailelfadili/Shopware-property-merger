<?php

declare(strict_types=1);

namespace FULLHAUS\ShopConnector\Core\Content\ShopConnector;

use Shopware\Core\Content\Media\MediaDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\BoolField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\CreatedAtField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\SetNullOnDelete;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\OneToManyAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;
use Shopware\Core\System\SalesChannel\SalesChannelDefinition;

class ShopConnectorEntityDefinitionUsers extends EntityDefinition
{
    public const ENTITY_NAME = 'fh_shopconnector_users';

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
            new FkField('sales_channel_id', 'salesChannelId', SalesChannelDefinition::class),
            new BoolField('active', 'active'),
            (new StringField('dealer_num', 'dealerNum'))->addFlags(new Required()),
            (new StringField('shop_operator', 'shopOperator'))->addFlags(new Required()),
            (new StringField('shop_url', 'shopUrl'))->addFlags(new Required()),
            new FkField('media_id', 'mediaId', MediaDefinition::class),

            new CreatedAtField(),

            new ManyToOneAssociationField('media', 'media_id', MediaDefinition::class, 'id', false),
            (new OneToManyAssociationField('media', MediaDefinition::class, 'id', 'id'))->addFlags(new SetNullOnDelete()),
        ]);
    }
}
