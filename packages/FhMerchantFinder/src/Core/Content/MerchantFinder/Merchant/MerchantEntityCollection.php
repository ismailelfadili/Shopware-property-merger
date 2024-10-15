<?php

declare(strict_types=1);

namespace FULLHAUS\MerchantFinder\Core\Content\MerchantFinder\Merchant;

use Shopware\Core\Framework\DataAbstractionLayer\EntityCollection;

/**
 * @method void                add(MerchantEntity $entity)
 * @method void                set(string $key, MerchantEntity $entity)
 * @method MerchantEntity[]    getIterator()
 * @method MerchantEntity[]    getElements()
 * @method MerchantEntity|null get(string $key)
 * @method MerchantEntity|null first()
 * @method MerchantEntity|null last()
 */
class MerchantEntityCollection extends EntityCollection
{
    public function getMediaIds(): array
    {
        return $this->fmap(function (MerchantEntity $merchant) {
            return $merchant->getMediaId();
        });
    }

    public function filterByMediaId(string $id): self
    {
        return $this->filter(function (MerchantEntity $merchant) use ($id) {
            return $merchant->getMediaId() === $id;
        });
    }

    protected function getExpectedClass(): string
    {
        return MerchantEntity::class;
    }
}
