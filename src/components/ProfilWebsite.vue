<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <Toast />
                <h5>Profil Website</h5>
                <div class="p-fluid grid">
                    <div class="col-12">
                        <div class="field">
                            <label for="nama_sekolah">Nama sekolah</label>
                            <InputText id="nama_sekolah" v-model.trim="firstData.nama_sekolah" required="true" autofocus
                                :class="{'p-invalid': err.nama_sekolah}" />
                            <small class="p-invalid" v-if="err.nama_sekolah">{{ err.nama_sekolah[0] }}</small>
                        </div>
                    </div>
                    <div class="col-6 md:col-3">
                        <div class="field">
                            <label for="nama_pendidikan">Nama pendidikan</label>
                            <Dropdown v-model="firstData.nama_pendidikan" :options="dropData" optionValue="value"
                                optionLabel="name" placeholder="Pilih nama_pendidikan user" />
                            <small class="p-invalid" v-if="err.nama_pendidikan">{{ err.nama_pendidikan[0] }}</small>
                        </div>
                    </div>
                    <div class="col-6 md:col-3">
                        <div class="field">
                            <label for="slogan">Slogan</label>
                            <InputText id="slogan" v-model.trim="firstData.slogan" required="true" autofocus
                                :class="{'p-invalid': err.slogan}" />
                            <small class="p-invalid" v-if="err.slogan">{{ err.slogan[0] }}</small>
                        </div>
                    </div>
                    <div class="col-6 md:col-3">
                        <div class="field">
                            <label for="singkatan">Nama pendek</label>
                            <InputText id="singkatan" v-model.trim="firstData.singkatan" required="true" autofocus
                                :class="{'p-invalid': err.singkatan}" />
                            <small class="p-invalid" v-if="err.singkatan">{{ err.singkatan[0] }}</small>
                        </div>
                    </div>
                    <div class="col-6 md:col-3">
                        <div class="field">
                            <label for="npsn">NPSN</label>
                            <InputText id="npsn" v-model.trim="firstData.npsn" required="true" autofocus
                                :class="{'p-invalid': err.npsn}" />
                            <small class="p-invalid" v-if="err.npsn">{{ err.npsn[0] }}</small>
                        </div>
                    </div>
                    <div class="col-12">
                        <div class="field">
                            <label for="sambutan">Sambutan</label>
                            <Textarea placeholder="Sambutan" v-model.trim="firstData.sambutan" :autoResize="true"
                                rows="3" cols="30" :class="{'p-invalid': err.sambutan}" />
                            <small class=" p-invalid" v-if="err.sambutan">{{ err.sambutan[0] }}</small>
                        </div>
                    </div>
                    <div class="col-12 md:col-6">
                        <div class="field">
                            <label for="perkenalan">Perkenalan sekolah</label>
                            <Textarea placeholder="perkenalan" v-model.trim="firstData.perkenalan" :autoResize="true"
                                rows="3" cols="30" :class="{'p-invalid': err.perkenalan}" />
                            <small class=" p-invalid" v-if="err.perkenalan">{{ err.perkenalan[0] }}</small>
                        </div>
                    </div>
                    <div class="col-12 md:col-6">
                        <div class="field">
                            <label for="alamat">Alamat</label>
                            <Textarea placeholder="alamat" v-model.trim="firstData.alamat" :autoResize="true"
                                rows="3" cols="30" :class="{'p-invalid': err.alamat}" />
                            <small class=" p-invalid" v-if="err.alamat">{{ err.alamat[0] }}</small>
                        </div>
                    </div>
                    <div class="col-12 md:col-4">
                        <div class="field">
                            <label for="logo">Logo</label>
                            <div class="p-fileupload p-fileupload-basic p-component" data-v-38df812b="">
                                <label for="logo" class="p-button p-component p-fileupload-choose">
                                    <span class="p-button-icon p-button-icon-left pi pi-upload"></span>
                                    <span class="p-button-label"> Ubah logo </span>
                                    <input id="logo" type="file" @change="setLogo">
                                </label>
                            </div>
                            <small class="p-invalid" v-if="err.logo">{{ err.logo[0] }}</small>
                        </div>
                        <img :src="firstData.logo" :alt="firstData.logo" v-if="firstData.logo" width="150"
                        class="mt-0 mx-auto mb-5 block shadow-2" />
                    </div>
                    <div class="col-12 md:col-4">
                        <div class="field">
                            <label for="icon">Fav-icon</label>
                            <div class="p-fileupload p-fileupload-basic p-component" data-v-38df812b="">
                                <label for="icon" class="p-button p-component p-fileupload-choose">
                                    <span class="p-button-icon p-button-icon-left pi pi-upload"></span>
                                    <span class="p-button-label"> Ubah favicon </span>
                                    <input id="icon" type="file" @change="setIcon">
                                </label>
                            </div>
                            <small class="p-invalid" v-if="err.icon">{{ err.icon[0] }}</small>
                        </div>
                        <img :src="firstData.icon" :alt="firstData.icon" v-if="firstData.icon" width="150"
                        class="mt-0 mx-auto mb-5 block shadow-2" />
                    </div>
                    <div class="col-12 md:col-4">
                        <div class="field">
                            <label for="banner">Banner</label>
                            <div class="p-fileupload p-fileupload-basic p-component" data-v-38df812b="">
                                <label for="banner" class="p-button p-component p-fileupload-choose">
                                    <span class="p-button-icon p-button-icon-left pi pi-upload"></span>
                                    <span class="p-button-label"> Ubah banner </span>
                                    <input id="banner" type="file" @change="setBanner">
                                </label>
                            </div>
                            <small class="p-invalid" v-if="err.banner">{{ err.banner[0] }}</small>
                        </div>
                        <img :src="firstData.banner" :alt="firstData.banner" v-if="firstData.banner" width="150"
                        class="mt-0 mx-auto mb-5 block shadow-2" />
                    </div>
                </div>
                <Button :disabled="disable" label="Save" icon="pi pi-check" @click="save" />
            </div>
        </div>
    </div>
</template>

<script>
    import config from '../config.js'
    import axios from '../axios.js'

    export default {
        data() {
            return {
                firstData:{},
                dropData:[
                    {
                        name:'SMK',
                        value:'SMK'
                    },
                    {
                        name:'SMA',
                        value:'SMA'
                    },
                    {
                        name:'MA',
                        value:'MA'
                    }
                ],
                uri: new config().storage,
                err:[],
                logo:null,
                icon:null,
                banner:null,
                disable:false
            }
        },
         beforeCreate() {
            axios.get('/sanctum/csrf-cookie').then(() => {
                axios.get('/api/admin/profil', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('WebToken')
                    }
                }).then((result) => {
                    var getData = result.data.data
                    var data = {
                        nama_pendidikan: getData.nama_pendidikan,
                        nama_sekolah: getData.nama_sekolah,
                        slogan: getData.slogan,
                        singkatan: getData.singkatan,
                        npsn: getData.npsn,
                        sambutan: getData.sambutan,
                        perkenalan: getData.perkenalan,
                        alamat: getData.alamat,
                        id: getData.id,
                        logo: this.uri + '/' + getData.logo,
                        icon: this.uri + '/' + getData.icon,
                        banner: this.uri + '/' + getData.banner
                    }
                    
                    this.firstData = data
                    console.log(result.data)
                }).catch((err) => {
                    console.log(err.response.data)
                });
            }).catch((err) => {
                console.log(err.response.data)
            });
        },
        methods: {
            save() {
                this.disable = true
                let form = new FormData()
                for (const data in this.firstData) {
                    if (data == 'logo') {
                        continue
                    }
                    if (data == 'icon') {
                        continue
                    }
                    if (data == 'banner') {
                        continue
                    }
                    form.append(data, this.firstData[data])
                }
                if (this.logo != null) {
                    form.append('logo', this.logo)
                }
                if (this.icon != null) {
                    form.append('icon', this.icon)
                }
                if (this.banner != null) {
                    form.append('banner', this.banner)
                }

                form.append('_method', 'put')
                axios.post('/api/admin/profil/' + this.firstData.id, form, {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('WebToken')
                    }
                }).then((result) => {
                    this.toast('success', 'Berhasil', 'Refresh browser untuk melihat perubahan')

                    this.disable = false
                }).catch((err) => {
                    this.toast('error', 'Error', 'Data gagal diperbarui')
                    this.disable = false
                    console.log(err)
                    this.err = err.response.data
                });
            },
            setIcon(e) {
                this.icon = e.target.files[0]
                this.firstData.icon = URL.createObjectURL(this.icon)
            },
            setLogo(e) {
                this.logo = e.target.files[0]
                this.firstData.logo = URL.createObjectURL(this.logo)
            },
            setBanner(e) {
                this.banner = e.target.files[0]
                this.firstData.banner = URL.createObjectURL(this.banner)
            },
            toast(tipe, judul, pesan) {
                this.$toast.add({
                    severity: tipe,
                    summary: judul,
                    detail: pesan,
                    life: 3000
                });
            }
        },
    }
</script>