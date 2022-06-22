<template>
    <div class="px-4 py-8 md:px-6 lg:px-8 bg-white">
        <TabView>
            <TabPanel header="Beasiswa" v-if="beasiswa.length >0">
                <ul class="p-0 m-0 list-none">
                    <li v-for="(bea,index) in beasiswa" :key="index"
                        class="flex align-items-center py-2 border-bottom-1 surface-border">
                        <div
                            class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                            {{ ++index }}
                        </div>
                        <span class="text-900 line-height-3">
                            {{ bea.nama }}
                        </span>
                    </li>
                </ul>
            </TabPanel>
            <TabPanel header="Prestasi Siswa" v-if="prestasi.length >0">
                <ul class="list-none p-0 m-0">
                    <li v-for="(pres,index1) in prestasi" :key="index1"
                        class="flex align-items-center justify-content-between mb-4">
                        <div class="flex">
                            <div
                                class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                                {{ ++index1 }}
                            </div>
                            <div class="mr-0 md:mr-8">
                                <span class="block text-900 font-medium mb-1">
                                    {{ pres.nama }}
                                </span>
                                <div class="text-600">
                                    Juara Ke-{{ pres.juara }} tingkat {{ pres.tingkat }}
                                </div>
                            </div>
                        </div>
                        <div class="mt-2 md:mt-0 flex flex-nowrap">
                            {{ pres.tahun }}
                        </div>
                    </li>
                </ul>
            </TabPanel>
            <TabPanel header="Fasilitas Sekolah" v-if="fasilitas.length >0">
                <ul class="p-0 m-0 list-none">
                    <li v-for="(fas,index2) in fasilitas" :key="index2"
                        class="flex align-items-center py-2 border-bottom-1 surface-border">
                        <div
                            class="w-3rem h-3rem flex align-items-center justify-content-center bg-blue-100 border-circle mr-3 flex-shrink-0">
                            {{ ++index2 }}
                        </div>
                        <span class="text-900 line-height-3">
                            {{ fas.nama }}
                        </span>
                    </li>
                </ul>
            </TabPanel>
            <TabPanel header="Ekstrakurikuler" v-if="extra.length >0">
                <ul class="list-none p-0 m-0">
                    <li v-for="(ext,index3) in extra" :key="index3"
                        class="flex flex-column md:flex-row md:align-items-center md:justify-content-between mb-4">
                        <div class="flex align-items-center">
                            <img :src="url+'/'+ext.gambar" class="mr-3" style="width: 45px; height: 45px;">
                            <div class="mr-0 md:mr-8">
                                <span class="block text-900 font-medium">
                                    {{ ext.nama }}
                                </span>
                            </div>
                        </div>
                    </li>
                </ul>
            </TabPanel>
        </TabView>
    </div>
</template>

<script>
    import axios from '../axios.js'
    import config from '../config.js'

    export default {
        data() {
            return {
                url: new config().storage,
                extra: [],
                prestasi: [],
                beasiswa: [],
                fasilitas: [],
            }
        },
        beforeCreate() {
            axios.get('/sanctum/csrf-cookie').then(() => {
                axios.get('/api/app/info').then((result) => {
                    var data = result.data.data
                    this.extra = data.extra
                    this.prestasi = data.prestasi
                    this.beasiswa = data.beasiswa
                    this.fasilitas = data.fasilitas
                }).catch((err) => {
                    console.log(err.response.data)
                });
            }).catch((err) => {
                console.log(err.response.data)
            });
        }
    }
</script>