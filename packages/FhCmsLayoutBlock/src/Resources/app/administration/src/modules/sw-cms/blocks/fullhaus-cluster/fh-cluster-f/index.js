import './component';
import './preview';

Shopware.Service('cmsService').registerCmsBlock({
    name: 'fh-cluster-f',
    label: 'fh.blocks.clusterF.label',
    category: 'fullhausCluster',
    component: 'sw-cms-block-fh-cluster-f',
    previewComponent: 'sw-cms-preview-fh-cluster-f',
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
                        <h2>Lorem Ipsum dolor sit amet</h2>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                        sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                        Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                        sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
                        Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
                        tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.</p>
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
                        <h3>Lorem Ipsum dolor sit amet</h3>
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
                        <h4>Lorem Ipsum dolor sit amet</h4>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                        sed diam voluptua.</p>
                        `.trim(),
                    },
                },
            },
        },
        colFour: {
            type: 'text',
            default: {
                config: {
                    content: {
                        source: 'static',
                        value: `
                        <h4>Lorem Ipsum dolor sit amet</h4>
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
                        sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
                        sed diam voluptua.</p>
                        `.trim(),
                    },
                },
            },
        }
    }
});
