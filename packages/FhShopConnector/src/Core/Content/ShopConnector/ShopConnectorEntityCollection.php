<?php

declare(strict_types=1);

namespace FULLHAUS\ShopConnector\Core\Content\ShopConnector;

use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;

/**
 * @method void                     add(ShopConnectorEntity $entity)
 * @method void                     set(string $key, ShopConnectorEntity $entity)
 * @method ShopConnectorEntity[]    getIterator()
 * @method ShopConnectorEntity[]    getElements()
 * @method ShopConnectorEntity|null get(string $key)
 * @method ShopConnectorEntity|null first()
 * @method ShopConnectorEntity|null last()
 */
class ShopConnectorEntityCollection extends EntityCollection
{
    public function getMediaIds(): array
    {
        return $this->fmap(function (ShopConnectorEntity $item) {
            return $item->getMediaId();
        });
    }

    public function filterByMediaId(string $id): self
    {
        return $this->filter(function (ShopConnectorEntity $item) use ($id) {
            return $item->getMediaId() === $id;
        });
    }

    protected function getExpectedClass(): string
    {
        return ShopConnectorEntity::class;
    }
}
