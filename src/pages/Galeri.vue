<template>
    <div class="surface-section px-4 py-8 md:px-6 lg:px-8" v-if="galeris.length > 0">
        <DataView :value="galeris" :layout="layout" :lazy="true" paginatorPosition="both" :paginator="true" :rows="20">
            <template #grid="slotProps">
                <div class="col-6 md:col-2 p-3">
                    <div class="p-3 shadow-2 border-round surface-card h-full text-center">
                        <img :src="url+'/'+slotProps.data.media" alt="Media" width="150" />
                    </div>
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
                galeris: []
            }
        },
        beforeCreate() {
            axios.get('/sanctum/csrf-cookie').then(() => {
                axios.get('/api/app/galeri').then((result) => {
                    var data = result.data.data
                    this.galeris = data.galeri
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