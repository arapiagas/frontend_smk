<template>
    <div class="px-4 py-8 md:px-6 lg:px-8 bg-white" v-if="gurus.length > 0">
        <div class="font-bold text-900 text-3xl mb-3 text-center">Daftar guru</div>
        <div class="flex justify-content-center flex-column md:flex-row flex-wrap">
            <div v-for="(guru,index) in gurus" :key="index" class="shadow-2 p-4 m-2 surface-card">
                <img :src="url+'/'+guru.gambar" class="mb-3" alt="profil" width="200">
                <div class="flex justify-content-between align-items-center">
                    <div class="pr-3">
                        <div class="text-xl text-900 font-medium mb-2"> {{ guru.nama }} </div>
                        <div class="text-blue-600"> {{ guru.nip }} </div>
                    </div>
                    <div class="flex flex-nowrap">
                        {{ guru.tempat_lahir }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from '../axios.js'
    import config from '../config.js'

    export default {
        data() {
            return {
                url: new config().storage,
                gurus: [],
            }
        },
        beforeCreate() {
            axios.get('/sanctum/csrf-cookie').then(() => {
                axios.get('/api/app/guru').then((result) => {
                    var data = result.data.data
                    this.gurus = data.guru
                }).catch((err) => {
                    console.log(err.response.data)
                });
            }).catch((err) => {
                console.log(err.response.data)
            });
        }
    }
</script>