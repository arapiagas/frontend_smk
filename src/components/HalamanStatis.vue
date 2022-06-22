<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <Toast />
                <Toolbar class="mb-4">
                    <template v-slot:start>
                        <div class="my-2">
                            <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="openModal" />
                        </div>
                    </template>
                </Toolbar>

                <DataTable :value="allData" :paginator="true" :rows="10" :filters="filters"
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    :rowsPerPageOptions="[5,10,25]"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} data"
                    responsiveLayout="scroll">
                    <template #header>
                        <div class="table-header flex flex-column md:flex-row md:justify-content-between">
                            <h5 class="mb-2 md:m-0 p-as-md-center">Data halaman statis</h5>
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Search..." />
                            </span>
                        </div>
                    </template>
                    <Column field="title" header="Title" :sortable="true"></Column>
                    <Column field="aktif" header="Aktif" :sortable="true"></Column>
                    <Column :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                            <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
                                @click="edit(slotProps.data)" />
                            <Button icon="pi pi-trash" class="p-button-rounded p-button-warning"
                                @click="confirm(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>


                <Dialog v-model:visible="modal" header="Popup form" :breakpoints="{'960px': '75vw', '640px': '100vw'}"
                    :style="{width: '50vw'}" maximizable="true" :modal="true" class="p-fluid">
                    <img :src="preview" :alt="gambar" v-if="gambar" width="150"
                        class="mt-0 mx-auto mb-5 block shadow-2" />
                    <div class="field">
                        <label for="title">Title</label>
                        <InputText id="title" v-model.trim="firstData.title" required="true" autofocus
                            :class="{'p-invalid': err.title}" />
                        <small class="p-invalid" v-if="err.title">{{ err.title[0] }}</small>
                    </div>
                    <div class="field">
                        <label for="isi_text">Isi text</label>
                        <editor v-model.trim="firstData.isi_text"
                            api-key="3ufqnnk3jn2z4g1tw4toiuxezc65rgv2vpkjt47bg3ky25ac"
                            :class="{'p-invalid': err.isi_text}" :init="setting" />
                        <small class=" p-invalid" v-if="err.isi_text">{{ err.isi_text[0] }}</small>
                    </div>
                    <div class="field">
                        <label class="mb-3">Aktif</label>
                        <div class="formgrid grid">
                            <div class="field-radiobutton col-6">
                                <RadioButton id="aktif1" name="aktif" value="Y" v-model="firstData.aktif" />
                                <label for="aktif1">Y</label>
                            </div>
                            <div class="field-radiobutton col-6">
                                <RadioButton id="aktif2" name="aktif" value="N" v-model="firstData.aktif" />
                                <label for="aktif2">N</label>
                            </div>
                        </div>
                        <small class="p-invalid" v-if="err.aktif">{{ err.aktif[0] }}</small>
                    </div>
                    <template #footer>
                        <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideModal" />
                        <Button :disabled="disable" label="Save" icon="pi pi-check" class="p-button-text"
                            @click="save" />
                    </template>
                </Dialog>

                <Dialog v-model:visible="modalDelete" :style="{width: '450px'}" header="Confirm" :modal="true">
                    <div class="flex align-items-center justify-content-center">
                        <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                        <span v-if="firstData">Anda yakin ingin menghapus data halaman statis dengan title
                            <b>{{firstData.title}}</b>?</span>
                    </div>
                    <template #footer>
                        <Button label="No" icon="pi pi-times" class="p-button-text" @click="modalDelete = false" />
                        <Button :disabled="disable" label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteData" />
                    </template>
                </Dialog>
            </div>
        </div>
    </div>

</template>

<script>
    import {
        FilterMatchMode
    } from 'primevue/api';
    import config from '../config.js'
    import axios from '../axios.js'

    export default {
        data() {
            return {
                allData: [],
                uri: new config().storage,
                firstData: {},
                gambar: null,
                err: [],
                label: "Choose Image",
                preview: null,
                filters: {
                    global: {
                        value: null
                    }
                },
                disable: false,
                modalDelete: false,
                modal: false,
                insert: true,
                dropData: [],
                setting: {
                    height: 500,
                    menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | bold italic backcolor link image | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat code | help',
                    image_title: true,
                    automatic_uploads: true,
                    file_picker_types: 'image',
                    file_picker_callback: function (cb, value, meta) {
                        var input = document.createElement('input');
                        input.setAttribute('type', 'file');
                        input.setAttribute('accept', 'image/*');

                        input.onchange = function () {
                            var file = this.files[0];

                            var reader = new FileReader();
                            reader.onload = function () {
                                var id = 'blobid' + (new Date()).getTime();
                                var blobCache = tinymce.activeEditor.editorUpload.blobCache;
                                var base64 = reader.result.split(',')[1];
                                var blobInfo = blobCache.create(id, file, base64);
                                blobCache.add(blobInfo);

                                cb(blobInfo.blobUri(), {
                                    title: file.name
                                });
                            };
                            reader.readAsDataURL(file);
                        };

                        input.click();
                    },
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }
            }
        },
        productService: null,
        created() {
            // this.uri = new config().storage
            this.initFilters();
            this.preview = this.uri + '/' + this.firstData.gambar
        },
         beforeCreate() {
            axios.get('/sanctum/csrf-cookie').then(() => {
                axios.get('/api/admin/halaman_statis', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('WebToken')
                    }
                }).then((result) => {
                    this.allData = result.data.data
                    console.log(result.data)
                }).catch((err) => {
                    console.log(err.response.data)
                });
            }).catch((err) => {
                console.log(err.response.data)
            });
        },
        methods: {
            openModal() {
                this.insert = true
                this.firstData = {};
                this.gambar = null
                this.modal = true;
            },
            hideModal() {
                this.modal = false;
            },
            setImage(e) {
                this.gambar = e.target.files[0]
                this.label = e.target.files[0].name
                this.preview = URL.createObjectURL(this.gambar)
            },
            save() {
                this.err = []
                this.disable = true
                let form = new FormData()
                for (const data in this.firstData) {
                    if (data == 'gambar') {
                        continue
                    }
                    if (data == 'komentar') {
                        continue
                    }
                    form.append(data, this.firstData[data])
                }
                if (this.gambar != null) {
                    form.append('gambar', this.gambar)
                }

                axios.get('/sanctum/csrf-cookie').then(() => {
                    if (this.insert) {
                        axios.post('/api/admin/halaman_statis', form, {
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem('WebToken')
                            }
                        }).then((result) => {

                            this.firstData = result.data.data
                            this.allData.unshift(this.firstData)

                            this.toast('success', 'Berhasil', 'Data berhasil ditambahkan')

                            this.disable = false
                            this.modal = false
                            this.firstData = {}
                            this.gambar = null
                        }).catch((err) => {
                            this.toast('error', 'Error', 'Data gagal ditambahkan')

                            this.disable = false
                            this.err = err.response.data
                            console.log(err.response.data)
                        });
                    } else {
                        form.append('_method', 'put')
                        axios.post('/api/admin/halaman_statis/' + this.firstData.id, form, {
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem('WebToken')
                            }
                        }).then((result) => {
                            this.allData[this.findIndexById(this.firstData.id)] = result.data.data;
                            this.toast('success', 'Berhasil', 'Data berhasil diperbarui')

                            this.disable = false
                            this.modal = false
                        }).catch((err) => {
                            this.toast('error', 'Error', 'Data gagal diperbarui')
                            this.disable = false
                            this.err = err.response.data
                            console.log(err.response.data)
                        });
                    }
                }).catch((err) => {
                    this.toast('error', 'Error', 'Ada kesalahan')
                    this.disable = false
                    console.log(err.response.data)
                });
            },
            edit(getData) {
                this.firstData = getData;
                this.insert = false
                this.preview = this.uri + '/' + getData.gambar
                this.label = "Choose Image"
                this.modal = true;
            },
            confirm(data) {
                this.firstData = data;
                this.modalDelete = true;
            },
            deleteData() {
                this.disable = true
                axios.get('/sanctum/csrf-cookie').then(() => {
                    axios.delete('/api/admin/halaman_statis/' + this.firstData.id, {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.getItem('WebToken')
                        }
                    }).then(() => {
                        this.allData = this.allData.filter(val => val.id !== this.firstData.id);
                        this.modalDelete = false;
                        this.firstData = {};
                        this.toast('success', 'Berhasil', 'Data berhasil dihapus')
                        this.disable = false
                    }).catch((err) => {
                        console.log(err.response.data)
                        this.toast('error', 'Error', 'Data gagal dihapus')
                        this.disable = false
                    });
                }).catch((err) => {
                    console.log(err.response.data)
                    this.toast('error', 'Error', 'Ada kesalahan')
                    this.disable = false
                });
            },
            initFilters() {
                this.filters = {
                    'global': {
                        value: null,
                        matchMode: FilterMatchMode.CONTAINS
                    },
                }
            },
            findIndexById(id) {
                let index = -1;
                for (let i = 0; i < this.allData.length; i++) {
                    if (this.allData[i].id === id) {
                        index = i;
                        break;
                    }
                }
                return index;
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

<style scoped lang="scss">
    @import '../assets/demo/badges.scss';
</style>