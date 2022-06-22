<template>
    <div class="surface-section px-4 py-8 md:px-6 lg:px-8" v-if="blogs.length > 0">
        <DataView :value="blogs" :layout="layout" :paginator="true" :rows="10" :lazy="true">
            <template #grid="slotProps">
                <div class="col-12 md:col-3 sm:col-6 p-3">
                    <router-link :to="{name:'detail_blogpost',params: { slug: slotProps.data.slug }}">
                        <div class="p-3 shadow-2 border-round surface-card h-full">
                            <div class="flex justify-content-between text-500">
                                <span> {{ slotProps.data.judul }} </span>
                                <span class="inline-flex">
                                    <i class="pi pi-eye mr-2"></i>
                                    <span> {{ slotProps.data.views }} </span>
                                </span>
                            </div>
                            <p class="line-height-3 mt-3 mb-6 text-900 font-medium text-ellipsis-2">
                                {{ slotProps.data.isi_text }}
                            </p>
                            <div>
                                <span class="bg-blue-100 text-blue-600 font-medium py-1 px-3 mr-2"
                                    style="border-radius: 30px;">
                                    {{ slotProps.data.kategori.nama }} </span>
                            </div>
                            <img :src="url+'/'+slotProps.data.gambar" alt="Image" class="block w-full mt-5">
                        </div>
                    </router-link>
                </div>
            </template>
        </DataView>
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
                blogs: [],
            }
        },
        beforeCreate() {
            axios.get('/sanctum/csrf-cookie').then(() => {
                axios.get('/api/app/blogpost').then((result) => {
                    var data = result.data.data
                    this.blogs = data.blog
                    console.log(this.blogs)
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
    .text-ellipsis-2 {
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box !important;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        white-space: normal;
    }
</style>