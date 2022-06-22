<template>
    <div class="py-4 px-4 w-full lg:px-8 flex align-items-center justify-content-between fixed bg-white shadow-2"
        style="z-index: 999999;" v-if="myProfil">
        <router-link to="/" class="flex align-items-center">
            <img :src="url + '/' + myProfil.logo" :alt="myProfil.singkatan" height="40" class="mr-0 lg:mr-2">
        </router-link>
        <a class="cursor-pointer block lg:hidden text-700 p-ripple" v-ripple
            v-styleclass="{ selector: '@next', enterClass: 'hidden', leaveToClass: 'hidden', hideOnOutsideClick: true }">
            <i class="pi pi-bars text-4xl"></i>
        </a>
        <div class="surface-0 align-items-center flex-grow-1 justify-content-end hidden lg:flex absolute lg:static w-full left-0 px-6 lg:px-0 z-2"
            style="top:92%" v-if="menus.length > 0">
            <ul class="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row cursor-pointer">
                <div v-for="(menu,index) in menus" :key="index">
                    <li v-if="menu.dropdown.length <= 0">
                        <router-link :to="menu.link"
                            class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium hover:text-green-600 line-height-3 p-ripple"
                            v-ripple>
                            <span> {{ menu.title }} </span>
                        </router-link>
                    </li>
                    <li v-else class="relative">
                        <a class="flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3 hover:text-green-600 p-ripple align-items-center transition-colors transition-duration-150"
                            v-styleclass="{ selector: '@next', enterClass: 'hidden', leaveToClass: 'hidden', hideOnOutsideClick: true }">
                            <span> {{ menu.title }} </span>
                            <i class="pi pi-chevron-down ml-auto lg:ml-3"></i>
                        </a>
                        <ul style="z-index: 999999;"
                            class="list-none p-0 m-0 border-round shadow-0 lg:shadow-2 lg:absolute surface-overlay origin-top w-full lg:w-15rem hidden">
                            <li v-for="(dropdown,list) in menu.dropdown" :key="list">
                                <a v-if="dropdown.link.startsWith('http')" :href="dropdown.link"
                                    class="flex p-3 align-items-center border-round hover:text-green-600 hover:surface-50 transition-colors transition-duration-150 p-ripple text-800 font-medium">
                                    <span> {{ dropdown.title }} </span>
                                </a>
                                <router-link v-else :to="dropdown.link"
                                    class="flex p-3 align-items-center border-round hover:text-green-600 hover:surface-50 transition-colors transition-duration-150 p-ripple text-800 font-medium">
                                    <span> {{ dropdown.title }} </span>
                                </router-link>
                            </li>
                        </ul>
                    </li>
                </div>
            </ul>
        </div>
    </div>
</template>

<script>
    import axios from './axios.js'
    import config from './config.js'

    export default {
        data() {
            return {
                menus: [],
                myProfil: {},
                url: new config().storage,
            }
        },
        beforeCreate() {
            axios.get('/sanctum/csrf-cookie').then(() => {
                axios.get('/api/app/header').then((result) => {
                    var data = result.data.data
                    this.menus = data.menu
                    this.myProfil = data.profil
                }).catch((err) => {
                    console.log(err.response.data)
                });
            }).catch((err) => {
                console.log(err.response.data)
            });
        },
    }
</script>

<style>
    .router-link-active.router-link-exact-active {
        color: var(--green-600) !important;
    }
</style>