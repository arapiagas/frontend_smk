<template>
    <div class="bg-white border-top-1 border-200 px-4 py-8 md:px-6 lg:px-8" v-if="myProfil">
        <div class="bg-white">
            <div class="grid">
                <div class="col-12 md:col-4 flex flex-wrap justify-content-start md:mb-0 mb-3">
                    <img :src="url+'/'+myProfil.logo" alt="footer sections" height="50" class="mr-2">
                </div>
                <div class="col-12 md:col-4">
                    <div class="text-lg mb-4 flex flex-wrap" style="max-width: 290px;">
                        {{ myProfil.alamat }}
                    </div>
                    <div class="mb-3">
                        NPSN : {{ myProfil.npsn }}
                    </div>
                </div>
                <div class="col-12 md:col-4 text-gray-200">
                    <div class="text-900 font-bold line-height-3 mb-3">Halaman Statis</div>
                    <router-link v-for="(hal,index) in halaman" :to="'/halaman/'+hal.link" :key="index"
                        class="line-height-3 text-xl block cursor-pointer text-700">
                        {{ hal.title }}
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from './axios.js'
    import config from './config.js'

    export default {
        data() {
            return {
                halaman: [],
                myProfil: {},
                url: new config().storage
            }
        },
        beforeCreate() {
            axios.get('/sanctum/csrf-cookie').then(() => {
                axios.get('/api/app/footer').then((result) => {
                    var data = result.data.data
                    this.halaman = data.halaman
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

</style>