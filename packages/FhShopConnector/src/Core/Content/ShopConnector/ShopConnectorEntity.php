<?php

declare(strict_types=1);

namespace FULLHAUS\ShopConnector\Core\Content\ShopConnector;

use Shopware\Core\Content\Media\MediaEntity;
use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;

class ShopConnectorEntity extends Entity
{
    use EntityIdTrait;

    /** User list **/
    /**
     * @var bool
     */
    protected $active;

    /**
     * @var string
     */
    protected $dealerNum;

    /**
     * @var string
     */
    protected $dealerId;

    /**
     * @var string
     */
    protected $dealer;

    /**
     * @var string
     */
    protected $mediaId;

    /**
     * @var MediaEntity|null
     */
    protected $media;

    /**
     * @var string
     */
    protected $shopOperator;

    /**
     * @var string
     */
    protected $shopUrl;

    /** Product list **/
    /**
     * @var string
     */
    protected $originId;

    /**
     * @var string
     */
    protected $productName;

    /**
     * @var string
     */
    protected $wekaArtnum;

    /**
     * @var string
     */
    protected $gtin;

    /**
     * @var string
     */
    protected $ean;

    /**
     * @var string
     */
    protected $price;

    /**
     * @var string
     */
    protected $deepLink;

    /**
     * @var string
     */
    protected $salesChannelId;

    /** User list **/
    /**
     * @return string
     */
    public function getActive(): bool
    {
        return $this->active;
    }

    /**
     * @param string $active
     */
    public function setActive(bool $active): void
    {
        $this->active = $active;
    }

    public function getSalesChannelId(): string
    {
        return $this->salesChannelId;
    }

    public function setSalesChannelId(string $salesChannelId): void
    {
        $this->salesChannelId = $salesChannelId;
    }

    public function getDealerNum(): string
    {
        return $this->dealerNum;
    }

    public function setDealerNum(string $dealerNum): void
    {
        $this->dealerNum = $dealerNum;
    }

    public function getDealer(): ?string
    {
        return $this->dealer;
    }

    public function setDealer(string $dealer): void
    {
        $this->dealer = $dealer;
    }

    public function getMediaId(): string
    {
        return $this->mediaId;
    }

    public function setMediaId(string $mediaId): void
    {
        $this->mediaId = $mediaId;
    }

    public function getMedia(): MediaEntity
    {
        return $this->media;
    }

    public function setMedia(MediaEntity $media): void
    {
        $this->media = $media;
    }

    public function getShopOperator(): string
    {
        return $this->shopOperator;
    }

    public function setShopOperator(string $shopOperator): void
    {
        $this->shopOperator = $shopOperator;
    }

    public function getShopUrl(): string
    {
        return $this->shopUrl;
    }

    public function setShopUrl(string $shopUrl): void
    {
        $this->shopUrl = $shopUrl;
    }

    /** Productlist **/
    public function getOriginId(): string
    {
        return $this->originId;
    }

    public function setOriginId(string $originId): void
    {
        $this->originId = $originId;
    }

    public function getProductName(): string
    {
        return $this->productName;
    }

    public function setProductName(string $productName): void
    {
        $this->productName = $productName;
    }

    public function getDealerId(): string
    {
        return $this->dealerId;
    }

    public function setDealerId(string $dealerId): void
    {
        $this->dealerId = $dealerId;
    }

    public function getWekaArtnum(): string
    {
        return $this->wekaArtnum;
    }

    public function setWekaArtnum(string $wekaArtnum): void
    {
        $this->wekaArtnum = $wekaArtnum;
    }

    public function getGtin(): string
    {
        return $this->gtin;
    }

    public function setGtin(string $gtin): void
    {
        $this->gtin = $gtin;
    }

    public function getEan(): string
    {
        return $this->ean;
    }

    public function setEan(string $ean): void
    {
        $this->ean = $ean;
    }

    public function getPrice(): string
    {
        return $this->price;
    }

    public function setPrice(string $price): void
    {
        $this->price = $price;
    }

    public function getDeepLink(): string
    {
        return $this->deepLink;
    }

    public function setDeepLink(string $deepLink): void
    {
        $this->deepLink = $deepLink;
    }
}
