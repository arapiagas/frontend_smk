<template>
    <div class="surface-section px-4 py-8 md:px-6 lg:px-8 text-700" v-if="blog">
        <div class="flex flex-wrap">
            <div class="w-full lg:w-6 pl-0 lg:pr-5 pt-5">
                <img :src="url+'/'+blog.gambar" alt="Image" class="w-full border-round">
                <div class="text-center text-sm font-medium mt-3">
                    {{ blog.judul }}
                </div>
            </div>
            <div class="w-full lg:w-6 pr-0 lg:pl-5">
                <router-link v-if="kategori.nama" :to="{name:'kategori',params: { nama: kategori.nama }}">
                    {{ kategori.nama }}
                </router-link>
                <span class="text-blue-700 bg-blue-50 inline-block py-2 px-3" style="border-radius: 50px;">
                </span>
                <div class="font-normal text-2xl mt-3 mb-3 text-900">
                    {{ blog.judul }}
                </div>
                <p class="line-height-3 mt-0 mb-5">
                    {{ blog.isi_text }}.
                </p>
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
                layout: "grid",
                blog: {},
                kategori: {}
            }
        },
        beforeCreate() {
            axios.get('/sanctum/csrf-cookie').then(() => {
                axios.get('/api/app/blogpost/' + this.$route.params.slug).then((result) => {
                    var data = result.data.data
                    this.blog = data.blog
                    this.kategori = data.blog.kategori
                }).catch((err) => {
                    console.log(err.response.data)
                });
            }).catch((err) => {
                console.log(err.response.data)
            });
        }
    }
</script>

<style>

</style>