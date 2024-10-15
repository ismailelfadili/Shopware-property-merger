<?php

declare(strict_types=1);

namespace FULLHAUS\CmsLayoutBlock\Twig;

use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotCollection;
use Shopware\Core\Content\Cms\Aggregate\CmsSlot\CmsSlotEntity;
use Twig\Extension\AbstractExtension;
use Twig\TwigFilter;

class ClusterSortExtension extends AbstractExtension
{
    private const CLUSTER_SLOT_SORT = [
        '',
        'colOne',
        'colTwo',
        'colThree',
        'colFour',
        'colFive',
        'colSix',
        'colSeven',
        'colEight',
        'colNine',
        'colTen',
    ];

    public function getFilters(): array
    {
        return [
            new TwigFilter('cluster_slot_sort', [$this, 'clusterSlotSort']),
        ];
    }

    public function clusterSlotSort(CmsSlotCollection $clusterSlots): CmsSlotCollection
    {
        $clusterSlots->sort(function (CmsSlotEntity $clusterSlotA, CmsSlotEntity $clusterSlotB) {
            $indexedPositionA = array_search($clusterSlotA->getSlot(), self::CLUSTER_SLOT_SORT, true);
            $indexedPositionB = array_search($clusterSlotB->getSlot(), self::CLUSTER_SLOT_SORT, true);

            return $indexedPositionA <=> $indexedPositionB;
        });

        return $clusterSlots;
    }
}
