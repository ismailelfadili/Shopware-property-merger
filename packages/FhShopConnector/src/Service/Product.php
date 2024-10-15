<?php

declare(strict_types=1);

namespace FULLHAUS\ShopConnector\Service;

use Shopware\Core\Framework\Api\Response\Type\Api\JsonApiType;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Framework\DataAbstractionLayer\Exception\InconsistentCriteriaIdsException;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\EntitySearchResult;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\RequestCriteriaBuilder;

class Product
{
    /** @var EntityRepository */
    private $fhShopConnectorUserRepository;

    /** @var EntityRepository */
    private $fhShopConnectorProductRepository;

    /** @var EntityRepository */
    private $productRepository;

    /** @var RequestCriteriaBuilder */
    private $searchCriteriaBuilder;

    /** @var JsonApiType */
    private $responseFactory;

    /**
     * Product constructor.
     */
    public function __construct(
        EntityRepository $fhShopConnectorUserRepository,
        EntityRepository $fhShopConnectorProductRepository,
        EntityRepository $productRepository,
        RequestCriteriaBuilder $searchCriteriaBuilder,
        JsonApiType $responseFactory
    ) {
        $this->fhShopConnectorUserRepository = $fhShopConnectorUserRepository;
        $this->fhShopConnectorProductRepository = $fhShopConnectorProductRepository;
        $this->productRepository = $productRepository;
        $this->searchCriteriaBuilder = $searchCriteriaBuilder;
        $this->responseFactory = $responseFactory;
    }

    /**
     * @throws InconsistentCriteriaIdsException
     */
    public function findShopConnectorByProductEan($productEan, Context $context): EntitySearchResult
    {
        $criteria = new Criteria();
        $criteria->addFilter(new EqualsFilter('fh_shopconnector_products.ean', $productEan));

        return $this->fhShopConnectorProductRepository->search($criteria, $context);
    }

    /**
     * @throws InconsistentCriteriaIdsException
     */
    public function findShopConnectorByDealerId($dealerId, Context $context): EntitySearchResult
    {
        $criteria = new Criteria();
        $criteria->addFilter(new EqualsFilter('fh_shopconnector_users.id', $dealerId));

        return $this->fhShopConnectorUserRepository->search($criteria, $context);
    }
}
