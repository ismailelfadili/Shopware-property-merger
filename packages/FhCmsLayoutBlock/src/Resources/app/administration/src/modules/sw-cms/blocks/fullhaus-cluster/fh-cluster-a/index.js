import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'fh-cluster-a',
    label: 'fh.blocks.clusterA.label',
    category: 'fullhausCluster',
    component: 'sw-cms-block-fh-cluster-a',
    previewComponent: 'sw-cms-preview-fh-cluster-a',
    defaultConfig: {
        sizingMode: 'boxed'
    },
    slots: {
        colOne: {
            type: 'text',
            default: {
                config: {
                    content: {
                        source: 'static',
                        value: `
                        <h4>Lorem Ipsum dolor sit amet</h4>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                        sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>
                        `.trim(),
                    },
                },
            },
        },
        colTwo: {
            type: 'text',
            default: {
                config: {
                    content: {
                        source: 'static',
                        value: `
                        <h4>Lorem Ipsum dolor sit amet</h4>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                        sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.</p>
                        `.trim(),
                    },
                },
            },
        },
        colThree: {
            type: 'text',
            default: {
                config: {
                    content: {
                        source: 'static',
                        value: `
                        <h2>Lorem Ipsum dolor sit amet</h2>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                        sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                        Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
                        voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                        Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>
                        `.trim(),
                    },
                },
            },
        }
    }
});
