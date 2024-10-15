<?php

declare(strict_types=1);

namespace FULLHAUS\MerchantFinder\Core\Content\MerchantFinder\Merchant;

use Shopware\Core\Content\Media\MediaEntity;
use Shopware\Core\Content\Product\Aggregate\ProductManufacturer\ProductManufacturerEntity;
use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;
use Shopware\Core\System\Country\Aggregate\CountryState\CountryStateEntity;
use Shopware\Core\System\Country\CountryEntity;
use Shopware\Core\System\SalesChannel\SalesChannelEntity;
use Shopware\Core\System\Salutation\SalutationEntity;

class MerchantEntity extends Entity
{
    use EntityIdTrait;

    /**
     * @var int
     */
    protected $autoIncrement;

    /**
     * @var string
     */
    protected $mediaId;

    /**
     * @var string
     */
    protected $markerId;

    /**
     * @var string
     */
    protected $markerShadowId;

    /**
     * @var string
     */
    protected $markerSettings;

    public function getAutoIncrement(): int
    {
        return $this->autoIncrement;
    }

    public function setAutoIncrement(int $autoIncrement): void
    {
        $this->autoIncrement = $autoIncrement;
    }

    public function getMarkerShadowId(): string
    {
        return $this->markerShadowId;
    }

    public function setMarkerShadowId(string $markerShadowId): void
    {
        $this->markerShadowId = $markerShadowId;
    }

    public function getMarkerSettings(): string
    {
        return $this->markerSettings;
    }

    public function setMarkerSettings(string $markerSettings): void
    {
        $this->markerSettings = $markerSettings;
    }

    /**
     * @var string
     */
    protected $salesChannelId;

    /**
     * @var string
     */
    protected $customerGroupId;

    /**
     * @var MediaEntity|null
     */
    protected $media;

    /**
     * @var ProductManufacturerEntity|null
     */
    protected $manufacturer;

    /**
     * @var string
     */
    protected $firstName;

    /**
     * @var string
     */
    protected $lastName;

    /**
     * @var string|null
     */
    protected $company;

    /**
     * @var string
     */
    protected $email;

    /**
     * @var string|null
     */
    protected $title;

    /**
     * @var bool
     */
    protected $active;

    /**
     * @var SalesChannelEntity|null
     */
    protected $salesChannel;

    /**
     * @var array|null
     */
    protected $customFields;

    /**
     * @var array|null
     */
    protected $data;

    /**
     * @var SalutationEntity|null
     */
    protected $salutation;

    /**
     * @var string
     */
    protected $countryId;

    /**
     * @var string|null
     */
    protected $countryStateId;

    /**
     * @var string
     */
    protected $salutationId;

    /**
     * @var string
     */
    protected $zipcode;

    /**
     * @var string
     */
    protected $city;

    /**
     * @var string|null
     */
    protected $department;

    /**
     * @var string
     */
    protected $street;

    /**
     * @var string|null
     */
    protected $vatId;

    /**
     * @var string|null
     */
    protected $phoneNumber;

    /**
     * @var string|null
     */
    protected $additionalAddressLine1;

    /**
     * @var string|null
     */
    protected $additionalAddressLine2;

    /**
     * @var CountryEntity|null
     */
    protected $country;

    /**
     * @var CountryStateEntity|null
     */
    protected $countryState;

    /**
     * @var CustomerEntity|null
     */
    protected $customer;

    /**
     * @var string
     */
    protected $shopUrl;

    /**
     * @var string
     */
    protected $merchantUrl;

    /**
     * @var string
     */
    protected $description;

    /**
     * @var string
     */
    protected $openingHours;

    /**
     * @var float
     */
    protected $locationLat;

    /**
     * @var float
     */
    protected $locationLon;

    /**
     * @var string
     */
    protected $originId;

    /**
     * @var string
     */
    protected $streetNumber;

    /**
     * @var string
     */
    protected $countryCode;

    /**
     * @var string|null
     */
    protected $merchantGroupId;

    /**
     * @var string|null
     */
    protected $merchantTypeId;

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    public function getOpeningHours(): string
    {
        return $this->openingHours;
    }

    public function setOpeningHours(string $openingHours): void
    {
        $this->openingHours = $openingHours;
    }

    public function getMarkerId(): string
    {
        return $this->markerId;
    }

    public function setMarkerId(string $markerId): void
    {
        $this->markerId = $markerId;
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

    public function getManufacturer(): ?ProductManufacturerEntity
    {
        return $this->manufacturer;
    }

    public function setManufacturer(?ProductManufacturerEntity $manufacturer): void
    {
        $this->manufacturer = $manufacturer;
    }

    public function getFirstName(): string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): void
    {
        $this->firstName = $firstName;
    }

    public function getLastName(): string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): void
    {
        $this->lastName = $lastName;
    }

    public function getCompany(): ?string
    {
        return $this->company;
    }

    public function setCompany(?string $company): void
    {
        $this->company = $company;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email): void
    {
        $this->email = $email;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): void
    {
        $this->title = $title;
    }

    public function isActive(): bool
    {
        return $this->active;
    }

    public function setActive(bool $active): void
    {
        $this->active = $active;
    }

    public function getSalesChannel(): ?SalesChannelEntity
    {
        return $this->salesChannel;
    }

    public function setSalesChannel(?SalesChannelEntity $salesChannel): void
    {
        $this->salesChannel = $salesChannel;
    }

    public function getCustomFields(): ?array
    {
        return $this->customFields;
    }

    public function setCustomFields(?array $customFields): void
    {
        $this->customFields = $customFields;
    }

    public function getData(): ?array
    {
        return $this->data;
    }

    public function setData(?array $data): void
    {
        $this->data = $data;
    }

    public function getSalutation(): ?SalutationEntity
    {
        return $this->salutation;
    }

    public function setSalutation(?SalutationEntity $salutation): void
    {
        $this->salutation = $salutation;
    }

    public function getCountryId(): string
    {
        return $this->countryId;
    }

    public function setCountryId(string $countryId): void
    {
        $this->countryId = $countryId;
    }

    public function getCountryStateId(): ?string
    {
        return $this->countryStateId;
    }

    public function setCountryStateId(?string $countryStateId): void
    {
        $this->countryStateId = $countryStateId;
    }

    public function getSalutationId(): string
    {
        return $this->salutationId;
    }

    public function setSalutationId(string $salutationId): void
    {
        $this->salutationId = $salutationId;
    }

    public function getZipcode(): string
    {
        return $this->zipcode;
    }

    public function setZipcode(string $zipcode): void
    {
        $this->zipcode = $zipcode;
    }

    public function getCity(): string
    {
        return $this->city;
    }

    public function setCity(string $city): void
    {
        $this->city = $city;
    }

    public function getDepartment(): ?string
    {
        return $this->department;
    }

    public function setDepartment(?string $department): void
    {
        $this->department = $department;
    }

    public function getStreet(): string
    {
        return $this->street;
    }

    public function setStreet(string $street): void
    {
        $this->street = $street;
    }

    public function getVatId(): ?string
    {
        return $this->vatId;
    }

    public function setVatId(?string $vatId): void
    {
        $this->vatId = $vatId;
    }

    public function getPhoneNumber(): ?string
    {
        return $this->phoneNumber;
    }

    public function setPhoneNumber(?string $phoneNumber): void
    {
        $this->phoneNumber = $phoneNumber;
    }

    public function getAdditionalAddressLine1(): ?string
    {
        return $this->additionalAddressLine1;
    }

    public function setAdditionalAddressLine1(?string $additionalAddressLine1): void
    {
        $this->additionalAddressLine1 = $additionalAddressLine1;
    }

    public function getAdditionalAddressLine2(): ?string
    {
        return $this->additionalAddressLine2;
    }

    public function setAdditionalAddressLine2(?string $additionalAddressLine2): void
    {
        $this->additionalAddressLine2 = $additionalAddressLine2;
    }

    public function getCountry(): ?CountryEntity
    {
        return $this->country;
    }

    public function setCountry(?CountryEntity $country): void
    {
        $this->country = $country;
    }

    public function getCountryState(): ?CountryStateEntity
    {
        return $this->countryState;
    }

    public function setCountryState(?CountryStateEntity $countryState): void
    {
        $this->countryState = $countryState;
    }

    public function getCustomer(): ?CustomerEntity
    {
        return $this->customer;
    }

    public function setCustomer(?CustomerEntity $customer): void
    {
        $this->customer = $customer;
    }

    public function getShopUrl(): string
    {
        return $this->shopUrl;
    }

    public function setShopUrl(string $shopUrl): void
    {
        $this->shopUrl = $shopUrl;
    }

    public function getMerchantUrl(): string
    {
        return $this->merchantUrl;
    }

    public function setMerchantUrl(string $merchantUrl): void
    {
        $this->merchantUrl = $merchantUrl;
    }

    public function getLocationLat(): float
    {
        return $this->locationLat;
    }

    public function setLocationLat(float $locationLat): void
    {
        $this->locationLat = $locationLat;
    }

    public function getLocationLon(): float
    {
        return $this->locationLon;
    }

    public function setLocationLon(float $locationLon): void
    {
        $this->locationLon = $locationLon;
    }

    public function getOriginId(): string
    {
        return $this->originId;
    }

    public function setOriginId(string $originId): void
    {
        $this->originId = $originId;
    }

    public function getStreetNumber(): string
    {
        return $this->streetNumber;
    }

    public function setStreetNumber(string $streetNumber): void
    {
        $this->streetNumber = $streetNumber;
    }

    public function getCountryCode(): string
    {
        return $this->countryCode;
    }

    public function setCountryCode(string $countryCode): void
    {
        $this->countryCode = $countryCode;
    }

    public function getSalesChannelId(): string
    {
        return $this->salesChannelId;
    }

    public function setSalesChannelId(string $salesChannelId): void
    {
        $this->salesChannelId = $salesChannelId;
    }

    public function getCustomerGroupId(): string
    {
        return $this->customerGroupId;
    }

    public function setCustomerGroupId(string $customerGroupId): void
    {
        $this->customerGroupId = $customerGroupId;
    }

    public function getMerchantGroupId(): string
    {
        return $this->merchantGroupId;
    }

    public function setMerchantGroupId(string $merchantGroupId): void
    {
        $this->MerchantGroupId = $merchantGroupId;
    }

    public function getMerchantTypeId(): string
    {
        return $this->merchantTypeId;
    }

    public function setMerchantTypeId(string $merchantTypeId): void
    {
        $this->MerchantTypeId = $merchantTypeId;
    }
}
