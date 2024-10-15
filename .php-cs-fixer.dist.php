<?php

$finder = (new PhpCsFixer\Finder())
    ->in(__DIR__.'/packages/FhMerchantFinder')
    ->exclude('Migration')
    ->in(__DIR__.'/packages/FhShopConnector')
    ->exclude('Migration')
;

return (new PhpCsFixer\Config())
    ->setRules([
        '@Symfony' => true,
    ])
    ->setFinder($finder)
;
