<template>
    <div :class="containerClass" @click="onWrapperClick">
        <AppTopBar @menu-toggle="onMenuToggle" />
        <div class="layout-sidebar" @click="onSidebarClick">
            <AppMenu :model="menu" @menuitem-click="onMenuItemClick" />
        </div>

        <div class="layout-main-container">
            <div class="layout-main">
                <router-view />
            </div>
            <AppFooter />
        </div>

        <AppConfig :layoutMode="layoutMode" @layout-change="onLayoutChange" />
        <transition name="layout-mask">
            <div class="layout-mask p-component-overlay" v-if="mobileMenuActive"></div>
        </transition>
    </div>
</template>

<script>
    import AppTopBar from './AppTopbar.vue';
    import AppMenu from './AppMenu.vue';
    import AppConfig from './AppConfig.vue';
    import AppFooter from './AppFooter.vue';

    export default {
        emits: ['change-theme'],
        data() {
            return {
                layoutMode: 'static',
                staticMenuInactive: false,
                overlayMenuActive: false,
                mobileMenuActive: false,
                menu: [{
                        label: 'Dashboard',
                        items: [{
                            label: 'Dashboard',
                            icon: 'pi pi-fw pi-home',
                            to: '/pendidik'
                        }]
                    },
                    {
                        label: 'Master Data',
                        icon: 'pi pi-fw pi-sitemap',
                        items: [{
                                label: 'Data guru',
                                icon: 'pi pi-fw pi-id-card',
                                to: '/pendidik/guru_pengajar'
                            },
                            {
                                label: 'Data user',
                                icon: 'pi pi-fw pi-users',
                                to: '/pendidik/data_user'
                            },
                            {
                                label: "Program studi",
                                icon: "pi pi-fw pi-book",
                                to: "/pendidik/program_studi"
                            },
                            {
                                label: "Beasiswa sekolah",
                                icon: "pi pi-fw pi-credit-card",
                                to: "/pendidik/beasiswa"
                            },
                            {
                                label: 'Ekstrakurikular',
                                icon: 'pi pi-fw pi-sitemap',
                                to: '/pendidik/ekskul'
                            },
                            {
                                label: 'Prestasi siswa',
                                icon: 'pi pi-fw pi-star',
                                to: '/pendidik/daftar_prestasi'
                            },
                            {
                                label: 'Fasilitas sekolah',
                                icon: 'pi pi-fw pi-list',
                                to: '/pendidik/fasilitas_sekolah'
                            }
                        ]
                    },
                    {
                        label: 'Media',
                        items: [{
                                label: 'Kategori',
                                icon: 'pi pi-fw pi-tags',
                                to: '/pendidik/blogspot_kategori'
                            },
                            {
                                label: 'Blogpost',
                                icon: 'pi pi-fw pi-th-large',
                                to: '/pendidik/blogpost'
                            },
                            {
                                label: 'Album foto',
                                icon: 'pi pi-fw pi-image',
                                to: '/pendidik/album_galeri'
                            },
                            {
                                label: 'Testimoni',
                                icon: 'pi pi-fw pi-comment',
                                to: '/pendidik/testimoni_user'
                            },
                            {
                                label: 'Halaman statis',
                                icon: 'pi pi-fw pi-desktop',
                                to: '/pendidik/halaman_statis'
                            },
                            {
                                label: 'Media sosial',
                                icon: 'pi pi-fw pi-facebook',
                                to: '/pendidik/media_sosial'
                            },
                        ]
                    },
                    {
                        label: 'Pengaturan',
                        items: [{
                                label: 'List icon',
                                icon: 'pi pi-fw pi-arrows-v',
                                to: '/pendidik/daftar_ikon'
                            },
                            {
                                label: 'Visi & Misi',
                                icon: 'pi pi-fw pi-eject',
                                to: '/pendidik/visi_misi_sekolah'
                            },
                            {
                                label: 'Menu website',
                                icon: 'pi pi-fw pi-bars',
                                items: [{
                                        label: 'header',
                                        icon: 'pi pi-fw pi-bars',
                                        to: '/pendidik/menu'
                                    },
                                    {
                                        label: 'Dropdown',
                                        icon: 'pi pi-fw pi-angle-down',
                                        to: '/pendidik/menu/dropdown'
                                    },
                                ]
                            },
                            {
                                label: 'Profil website',
                                icon: 'pi pi-fw pi-cog',
                                to: '/pendidik/web_profil'
                            },
                        ]
                    }
                ]
            }
        },
        watch: {
            $route() {
                this.menuActive = false;
                this.$toast.removeAllGroups();
            }
        },
        methods: {
            onWrapperClick() {
                if (!this.menuClick) {
                    this.overlayMenuActive = false;
                    this.mobileMenuActive = false;
                }

                this.menuClick = false;
            },
            onMenuToggle() {
                this.menuClick = true;

                if (this.isDesktop()) {
                    if (this.layoutMode === 'overlay') {
                        if (this.mobileMenuActive === true) {
                            this.overlayMenuActive = true;
                        }

                        this.overlayMenuActive = !this.overlayMenuActive;
                        this.mobileMenuActive = false;
                    } else if (this.layoutMode === 'static') {
                        this.staticMenuInactive = !this.staticMenuInactive;
                    }
                } else {
                    this.mobileMenuActive = !this.mobileMenuActive;
                }

                event.preventDefault();
            },
            onSidebarClick() {
                this.menuClick = true;
            },
            onMenuItemClick(event) {
                if (event.item && !event.item.items) {
                    this.overlayMenuActive = false;
                    this.mobileMenuActive = false;
                }
            },
            onLayoutChange(layoutMode) {
                this.layoutMode = layoutMode;
            },
            addClass(element, className) {
                if (element.classList)
                    element.classList.add(className);
                else
                    element.className += ' ' + className;
            },
            removeClass(element, className) {
                if (element.classList)
                    element.classList.remove(className);
                else
                    element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join(
                        '|') + '(\\b|$)', 'gi'), ' ');
            },
            isDesktop() {
                return window.innerWidth >= 992;
            },
            isSidebarVisible() {
                if (this.isDesktop()) {
                    if (this.layoutMode === 'static')
                        return !this.staticMenuInactive;
                    else if (this.layoutMode === 'overlay')
                        return this.overlayMenuActive;
                }

                return true;
            }
        },
        computed: {
            containerClass() {
                return ['layout-wrapper', {
                    'layout-overlay': this.layoutMode === 'overlay',
                    'layout-static': this.layoutMode === 'static',
                    'layout-static-sidebar-inactive': this.staticMenuInactive && this.layoutMode === 'static',
                    'layout-overlay-sidebar-active': this.overlayMenuActive && this.layoutMode === 'overlay',
                    'layout-mobile-sidebar-active': this.mobileMenuActive,
                    'p-input-filled': this.$primevue.config.inputStyle === 'filled',
                    'p-ripple-disabled': this.$primevue.config.ripple === false
                }];
            },
            logo() {
                return (this.$appState.darkTheme) ? "/images/logo-white.svg" : "/images/logo.svg";
            }
        },
        beforeUpdate() {
            if (this.mobileMenuActive)
                this.addClass(document.body, 'body-overflow-hidden');
            else
                this.removeClass(document.body, 'body-overflow-hidden');
        },
        components: {
            'AppTopBar': AppTopBar,
            'AppMenu': AppMenu,
            'AppConfig': AppConfig,
            'AppFooter': AppFooter,
        }
    }
</script>

<style lang="scss">
    @import './App.scss';
</style>