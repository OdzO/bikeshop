'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">bikeshop documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-bee36f305d0c979c2eec1fecbe14cf44d5baf3e6276f24a5a48e7f308942c88437dc72bcc8a985f0be482ad58b779ed4c2b352675125c7a4c4fec9c9076b80ea"' : 'data-target="#xs-components-links-module-AppModule-bee36f305d0c979c2eec1fecbe14cf44d5baf3e6276f24a5a48e7f308942c88437dc72bcc8a985f0be482ad58b779ed4c2b352675125c7a4c4fec9c9076b80ea"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-bee36f305d0c979c2eec1fecbe14cf44d5baf3e6276f24a5a48e7f308942c88437dc72bcc8a985f0be482ad58b779ed4c2b352675125c7a4c4fec9c9076b80ea"' :
                                            'id="xs-components-links-module-AppModule-bee36f305d0c979c2eec1fecbe14cf44d5baf3e6276f24a5a48e7f308942c88437dc72bcc8a985f0be482ad58b779ed4c2b352675125c7a4c4fec9c9076b80ea"' }>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HeaderComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >HeaderComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UserPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UserPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-AppModule-bee36f305d0c979c2eec1fecbe14cf44d5baf3e6276f24a5a48e7f308942c88437dc72bcc8a985f0be482ad58b779ed4c2b352675125c7a4c4fec9c9076b80ea"' : 'data-target="#xs-pipes-links-module-AppModule-bee36f305d0c979c2eec1fecbe14cf44d5baf3e6276f24a5a48e7f308942c88437dc72bcc8a985f0be482ad58b779ed4c2b352675125c7a4c4fec9c9076b80ea"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-AppModule-bee36f305d0c979c2eec1fecbe14cf44d5baf3e6276f24a5a48e7f308942c88437dc72bcc8a985f0be482ad58b779ed4c2b352675125c7a4c4fec9c9076b80ea"' :
                                            'id="xs-pipes-links-module-AppModule-bee36f305d0c979c2eec1fecbe14cf44d5baf3e6276f24a5a48e7f308942c88437dc72bcc8a985f0be482ad58b779ed4c2b352675125c7a4c4fec9c9076b80ea"' }>
                                            <li class="link">
                                                <a href="pipes/SalePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SalePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/CartPageModuleModule.html" data-type="entity-link" >CartPageModuleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-CartPageModuleModule-a7c16735024ccfdd86ccdce7b7ac464cda979d31ebddf34a5b1c29d209b78a8ec7e324e520120fca1dd9827718458e74ea6a4334307eec1a9d22fc3ba9e58ed8"' : 'data-target="#xs-components-links-module-CartPageModuleModule-a7c16735024ccfdd86ccdce7b7ac464cda979d31ebddf34a5b1c29d209b78a8ec7e324e520120fca1dd9827718458e74ea6a4334307eec1a9d22fc3ba9e58ed8"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-CartPageModuleModule-a7c16735024ccfdd86ccdce7b7ac464cda979d31ebddf34a5b1c29d209b78a8ec7e324e520120fca1dd9827718458e74ea6a4334307eec1a9d22fc3ba9e58ed8"' :
                                            'id="xs-components-links-module-CartPageModuleModule-a7c16735024ccfdd86ccdce7b7ac464cda979d31ebddf34a5b1c29d209b78a8ec7e324e520120fca1dd9827718458e74ea6a4334307eec1a9d22fc3ba9e58ed8"' }>
                                            <li class="link">
                                                <a href="components/CartPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CartPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-CartPageModuleModule-a7c16735024ccfdd86ccdce7b7ac464cda979d31ebddf34a5b1c29d209b78a8ec7e324e520120fca1dd9827718458e74ea6a4334307eec1a9d22fc3ba9e58ed8"' : 'data-target="#xs-pipes-links-module-CartPageModuleModule-a7c16735024ccfdd86ccdce7b7ac464cda979d31ebddf34a5b1c29d209b78a8ec7e324e520120fca1dd9827718458e74ea6a4334307eec1a9d22fc3ba9e58ed8"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-CartPageModuleModule-a7c16735024ccfdd86ccdce7b7ac464cda979d31ebddf34a5b1c29d209b78a8ec7e324e520120fca1dd9827718458e74ea6a4334307eec1a9d22fc3ba9e58ed8"' :
                                            'id="xs-pipes-links-module-CartPageModuleModule-a7c16735024ccfdd86ccdce7b7ac464cda979d31ebddf34a5b1c29d209b78a8ec7e324e520120fca1dd9827718458e74ea6a4334307eec1a9d22fc3ba9e58ed8"' }>
                                            <li class="link">
                                                <a href="pipes/SalePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SalePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/LoginModule.html" data-type="entity-link" >LoginModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-LoginModule-d8718415841341973ee76aed3b452fd82b091051ce261ed4a650849997e26b3a6e2d1f7b82942232461dfd29556615f99910ddee2cd584c215a7e76fd5d2cf8d"' : 'data-target="#xs-components-links-module-LoginModule-d8718415841341973ee76aed3b452fd82b091051ce261ed4a650849997e26b3a6e2d1f7b82942232461dfd29556615f99910ddee2cd584c215a7e76fd5d2cf8d"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-LoginModule-d8718415841341973ee76aed3b452fd82b091051ce261ed4a650849997e26b3a6e2d1f7b82942232461dfd29556615f99910ddee2cd584c215a7e76fd5d2cf8d"' :
                                            'id="xs-components-links-module-LoginModule-d8718415841341973ee76aed3b452fd82b091051ce261ed4a650849997e26b3a6e2d1f7b82942232461dfd29556615f99910ddee2cd584c215a7e76fd5d2cf8d"' }>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductAdminModuleModule.html" data-type="entity-link" >ProductAdminModuleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProductAdminModuleModule-c484cfb82bd88088641d7ad5f5d4a34db3e670158742576a96dee99d83f280a9b4adfe4d18d1578d4cb7339dd79a73fc2fae309c8ca2314442c9a587840aff8e"' : 'data-target="#xs-components-links-module-ProductAdminModuleModule-c484cfb82bd88088641d7ad5f5d4a34db3e670158742576a96dee99d83f280a9b4adfe4d18d1578d4cb7339dd79a73fc2fae309c8ca2314442c9a587840aff8e"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProductAdminModuleModule-c484cfb82bd88088641d7ad5f5d4a34db3e670158742576a96dee99d83f280a9b4adfe4d18d1578d4cb7339dd79a73fc2fae309c8ca2314442c9a587840aff8e"' :
                                            'id="xs-components-links-module-ProductAdminModuleModule-c484cfb82bd88088641d7ad5f5d4a34db3e670158742576a96dee99d83f280a9b4adfe4d18d1578d4cb7339dd79a73fc2fae309c8ca2314442c9a587840aff8e"' }>
                                            <li class="link">
                                                <a href="components/DialogDeleteProductComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogDeleteProductComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DialogNewProductAttributeComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DialogNewProductAttributeComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductAdminComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductAdminComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/ProductListModuleModule.html" data-type="entity-link" >ProductListModuleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-ProductListModuleModule-6852ede7cda020fb08aea0329802df0e3cdb68ac654f2efa0b0765a42491229bc03f8e9ae1708498d9cb8df26ca697e2ca6b2f03b20513655589554be77b41a7"' : 'data-target="#xs-components-links-module-ProductListModuleModule-6852ede7cda020fb08aea0329802df0e3cdb68ac654f2efa0b0765a42491229bc03f8e9ae1708498d9cb8df26ca697e2ca6b2f03b20513655589554be77b41a7"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-ProductListModuleModule-6852ede7cda020fb08aea0329802df0e3cdb68ac654f2efa0b0765a42491229bc03f8e9ae1708498d9cb8df26ca697e2ca6b2f03b20513655589554be77b41a7"' :
                                            'id="xs-components-links-module-ProductListModuleModule-6852ede7cda020fb08aea0329802df0e3cdb68ac654f2efa0b0765a42491229bc03f8e9ae1708498d9cb8df26ca697e2ca6b2f03b20513655589554be77b41a7"' }>
                                            <li class="link">
                                                <a href="components/ProductCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductFilterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductFilterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProductListComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProductListComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#pipes-links-module-ProductListModuleModule-6852ede7cda020fb08aea0329802df0e3cdb68ac654f2efa0b0765a42491229bc03f8e9ae1708498d9cb8df26ca697e2ca6b2f03b20513655589554be77b41a7"' : 'data-target="#xs-pipes-links-module-ProductListModuleModule-6852ede7cda020fb08aea0329802df0e3cdb68ac654f2efa0b0765a42491229bc03f8e9ae1708498d9cb8df26ca697e2ca6b2f03b20513655589554be77b41a7"' }>
                                            <span class="icon ion-md-add"></span>
                                            <span>Pipes</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="pipes-links-module-ProductListModuleModule-6852ede7cda020fb08aea0329802df0e3cdb68ac654f2efa0b0765a42491229bc03f8e9ae1708498d9cb8df26ca697e2ca6b2f03b20513655589554be77b41a7"' :
                                            'id="xs-pipes-links-module-ProductListModuleModule-6852ede7cda020fb08aea0329802df0e3cdb68ac654f2efa0b0765a42491229bc03f8e9ae1708498d9cb8df26ca697e2ca6b2f03b20513655589554be77b41a7"' }>
                                            <li class="link">
                                                <a href="pipes/SalePipe.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SalePipe</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/VerificationModuleModule.html" data-type="entity-link" >VerificationModuleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-VerificationModuleModule-b5784a86d4287f4c9c702638d2ee0c1f1146f94897304415d5a3d9ac3169fb26f1b00b8b7ef79a0756c2f4f0f6014f3c94d28a38ae82e656a12ec174ef2693e3"' : 'data-target="#xs-components-links-module-VerificationModuleModule-b5784a86d4287f4c9c702638d2ee0c1f1146f94897304415d5a3d9ac3169fb26f1b00b8b7ef79a0756c2f4f0f6014f3c94d28a38ae82e656a12ec174ef2693e3"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-VerificationModuleModule-b5784a86d4287f4c9c702638d2ee0c1f1146f94897304415d5a3d9ac3169fb26f1b00b8b7ef79a0756c2f4f0f6014f3c94d28a38ae82e656a12ec174ef2693e3"' :
                                            'id="xs-components-links-module-VerificationModuleModule-b5784a86d4287f4c9c702638d2ee0c1f1146f94897304415d5a3d9ac3169fb26f1b00b8b7ef79a0756c2f4f0f6014f3c94d28a38ae82e656a12ec174ef2693e3"' }>
                                            <li class="link">
                                                <a href="components/AccVerifyComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AccVerifyComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/TestObjects.html" data-type="entity-link" >TestObjects</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CartService.html" data-type="entity-link" >CartService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/DynamodbService.html" data-type="entity-link" >DynamodbService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/FilterService.html" data-type="entity-link" >FilterService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AdminGuard.html" data-type="entity-link" >AdminGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/UserGuard.html" data-type="entity-link" >UserGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/AttributeDialog.html" data-type="entity-link" >AttributeDialog</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DynamoDbScan.html" data-type="entity-link" >DynamoDbScan</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Filter.html" data-type="entity-link" >Filter</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Product.html" data-type="entity-link" >Product</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ProductAttribute.html" data-type="entity-link" >ProductAttribute</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ShopDataTable.html" data-type="entity-link" >ShopDataTable</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#pipes-links"' :
                                'data-target="#xs-pipes-links"' }>
                                <span class="icon ion-md-add"></span>
                                <span>Pipes</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="pipes-links"' : 'id="xs-pipes-links"' }>
                                <li class="link">
                                    <a href="pipes/SalePipe.html" data-type="entity-link" >SalePipe</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});