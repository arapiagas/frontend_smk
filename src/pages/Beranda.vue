<template>
    <div class="shadow-2">
        <div class="relative p-8 overflow-hidden" v-if="myProfil.banner">
            <img :src="url+'/'+myProfil.banner" alt="Image" class="absolute top-0 left-0 w-auto h-full block md:w-full">
            <div class="overlay"></div>
            <div class="text-center my-6 relative z-2">
                <div class="text-6xl text-white font-semibold mb-1"> {{ myProfil.slogan }} </div>
                <div class="text-6xl text-green-500 font-bold mb-4">
                    {{ myProfil.nama_pendidikan }} {{ myProfil.nama_sekolah }}
                </div>
                <p class="mt-0 mb-4 line-height-3 text-center mx-auto text-white" style="max-width: 500px;">
                    {{ myProfil.perkenalan }}.
                </p>
                <p v-if="medsos.length > 0" class="text-sm mt-4 mb-3 line-height-3 text-white">
                    Follow media sosial kami
                </p>
                <div v-if="medsos.length > 0" class="flex justify-content-center align-items-center">
                    <a v-for="(media,index) in medsos" :key="index" :href="media.link" class="text-white mr-3">
                        <i :class="'pi ' + media.ikon + ' text-2xl'"></i>
                    </a>
                </div>
            </div>
        </div>
    </div>
    <div class="surface-section px-4 py-8 md:px-6 lg:px-8 bg-white" v-if="myProfil.sambutan">
        <div class="col-12 p-2 md:p-8"
            style="border-radius:20px; background:linear-gradient(0deg, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #EFE1AF 0%, #C3DCFA 100%);">
            <div class="flex flex-column justify-content-center align-items-center text-center px-3 py-3 md:py-0">
                <h3 class="text-gray-900 mb-2">Sambutan</h3>
                <span class="text-gray-600 text-2xl">Kepala Sekolah {{ myProfil.nama_pendidikan }}
                    {{ myProfil.nama_sekolah }}</span>
                <p class="text-gray-900 sm:line-height-2 md:line-height-4 text-2xl mt-4" style="max-width:800px;">
                    “{{ myProfil.sambutan }}.”
                </p>
            </div>
        </div>
    </div>
    <div class="surface-section px-4 py-8 md:px-6 lg:px-8" v-if="studi.length > 0">
        <div class="font-bold text-900 text-3xl mb-3 text-center">Program Studi</div>
        <div class="flex flex-wrap">
            <div v-for="(std,index) in studi" :key="index" class="w-full sm:w-6 md:w-6 lg:w-4 p-2">
                <div class="shadow-3 border-round-md p-4">
                    <div class="text-center">
                        <img :src="url+'/'+std.gambar" alt="Image" width="170">
                    </div>
                    <div class="mt-3 mb-2 font-medium text-900 text-xl"> {{ std.nama }} </div>
                    <span class="text-700 line-height-3">
                        {{ std.deskripsi }}.
                    </span>
                </div>
            </div>
        </div>
    </div>
    <div class="px-4 py-8 md:px-6 lg:px-8" v-if="visi_misi.length > 0">
        <div class="font-bold text-900 text-3xl mb-3 text-center">Visi Misi</div>
        <div v-for="(vm,index) in visi_misi" :key="index">
            <div v-if="vm.tipe == 'visi'" class="mb-5 flex">
                <div class="flex flex-column align-items-center" style="width: 2rem;">
                    <span class="bg-blue-500 text-0 flex align-items-center justify-content-center border-circle"
                        style="min-width: 2.5rem; min-height: 2.5rem;">
                        <i class="pi pi-image"></i>
                    </span>
                    <div class="h-full bg-blue-500" style="width: 2px; min-height: 4rem;"></div>
                </div>
                <div class="ml-5 surface-card shadow-2 border-round p-3 flex-auto">
                    <div class="mb-3">
                        <span class="text-900 font-medium inline-block mr-3">
                            Visi
                        </span>
                    </div>
                    <div class="line-height-3 text-700 mb-3">
                        {{ vm.isi_text }}.
                    </div>
                </div>
            </div>
            <div v-else class="mb-5 flex">
                <div class="flex flex-column align-items-center" style="width: 2rem;">
                    <span class="bg-orange-500 text-0 flex align-items-center justify-content-center border-circle"
                        style="min-width: 2.5rem; min-height: 2.5rem;">
                        <i class="pi pi-image"></i>
                    </span>
                    <div class="h-full bg-orange-500" style="width: 2px; min-height: 4rem;"></div>
                </div>
                <div class="ml-5 surface-card shadow-2 border-round p-3 flex-auto">
                    <div class="mb-3">
                        <span class="text-900 font-medium inline-block mr-3">
                            Misi
                        </span>
                    </div>
                    <div class="line-height-3 text-700 mb-3">
                        {{ vm.isi_text }}.
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="px-4 py-8 md:px-6 lg:px-8 bg-white" v-if="testimoni.length > 0">
        <div class="font-bold text-900 text-3xl mb-3 text-center">Testimoni</div>
        <Carousel :value="testimoni" :numVisible="4" :numScroll="3" :responsiveOptions="responsiveOptions"
            :circular="true" :autoplayInterval="3000">
            <template #item="slotProps">
                <div class="p-2">
                    <div class="shadow-2 surface-card border-round relative">
                        <div class="px-4 py-5 relative">
                            <p
                                class="text-900 font-italic line-height-3 text-lg m-0 pb-4 border-bottom-1 surface-border">
                                “{{ slotProps.data.pesan }}.”
                            </p>
                            <div class="text-900 font-semibold line-height-3 mt-4">
                                {{ slotProps.data.user.nama }}
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </Carousel>
    </div>
</template>

<script>
    import axios from '../axios.js'
    import config from '../config.js'

    export default {
        data() {
            return {
                displayCustom: false,
                url: new config().storage,
                medsos: [],
                studi: [],
                myProfil: {},
                visi_misi: [],
                testimoni: [],
                responsiveOptions: [{
                        breakpoint: '1024px',
                        numVisible: 3,
                        numScroll: 3
                    },
                    {
                        breakpoint: '600px',
                        numVisible: 2,
                        numScroll: 2
                    },
                    {
                        breakpoint: '480px',
                        numVisible: 1,
                        numScroll: 1
                    }
                ]
            }
        },
        beforeCreate() {
            axios.get('/sanctum/csrf-cookie').then(() => {
                axios.get('/api/app/beranda').then((result) => {
                    var data = result.data.data
                    this.studi = data.studi
                    this.medsos = data.medsos
                    this.myProfil = data.profil
                    this.visi_misi = data.visi_misi
                    this.testimoni = data.testimoni
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
    .overlay {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: #000;
        z-index: 1;
        opacity: 0.6;
    }
</style>