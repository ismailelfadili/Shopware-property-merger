import './module/sw-cms/elements/tabs';
import './module/sw-cms/elements/accordion';
import './module/sw-cms/elements/video';

import './module/sw-cms/blocks/tabs';
import './module/sw-cms/blocks/accordion';
import './module/sw-cms/blocks/video';

import './module/sw-cms/blocks/text-image/text-on-image-teaser';
import './module/sw-cms/blocks/text-image/text-on-image-header';
import './module/sw-cms/blocks/text-image/text-on-image-two-column-grid';
import './module/sw-cms/blocks/text-image/text-image-two-column';

import deDE from './module/sw-cms/snippet/de-DE.json';
import enGB from './module/sw-cms/snippet/en-GB.json';

Shopware.Locale.extend('de-DE', deDE);
Shopware.Locale.extend('en-GB', enGB);
