<?php

declare(strict_types=1);

namespace FULLHAUS\ShopConnector\Storefront\Subscriber;

use FULLHAUS\ShopConnector\Service\Product as ProductService;
use Shopware\Core\Content\Product\ProductEntity;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\Search\EntitySearchResult;
use Shopware\Storefront\Page\Product\ProductPageLoadedEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class ProductSubscriber implements EventSubscriberInterface
{
    /** @var ProductService */
    private $productService;

    /**
     * Product constructor.
     */
    public function __construct(
        ProductService $productService
    ) {
        $this->productService = $productService;
    }

    public static function getSubscribedEvents(): array
    {
        return [
            ProductPageLoadedEvent::class => 'onProductPageLoadedEvent',
        ];
    }

    /* Get product and context and add extension */
    /**
     * @throws \Exception
     */
    public function onProductPageLoadedEvent(ProductPageLoadedEvent $event): void
    {
        $product = $event->getPage()->getProduct();
        $context = $event->getContext();

        $value = $this->findShopConnectorByProduct($product, $context);

        if ($value) {
            $product->addExtension('fhShopConnector', $value);
        }
    }

    /* Helper to find ShopConnector by product EAN */
    /**
     * @throws \Exception
     */
    private function findShopConnectorByProduct(ProductEntity $product, Context $context): ?EntitySearchResult
    {
        $result = null;

        try {
            $result = $this->productService->findShopConnectorByProductEan($product->getEan(), $context);

            if (!$result->getTotal() && $product->getParentId()) {
                $result = $this->productService->findShopConnectorByProductEan($product->getParentId(), $context);
            }

            $result = $result->getTotal() ? $result : null;
        } catch (\Exception $e) {
            throw new \Exception($e->getMessage());
        }

        return $result;
    }
}
