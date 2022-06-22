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
                            <h5 class="mb-2 md:m-0 p-as-md-center">Data testimoni</h5>
                            <span class="p-input-icon-left">
                                <i class="pi pi-search" />
                                <InputText v-model="filters['global'].value" placeholder="Search..." />
                            </span>
                        </div>
                    </template>
                    <Column field="user.nama" header="Nama" :sortable="true"></Column>
                    <Column field="pesan" header="Pesan" :sortable="true"></Column>
                    <Column :exportable="false" style="min-width:8rem">
                        <template #body="slotProps">
                            <Button v-if="slotProps.data.user_id == me.id" icon="pi pi-pencil"
                                class="p-button-rounded p-button-success mr-2" @click="edit(slotProps.data)" />
                            <Button v-if="me.level != 'siswa'" icon="pi pi-trash"
                                class="p-button-rounded p-button-warning" @click="confirm(slotProps.data)" />
                        </template>
                    </Column>
                </DataTable>


                <Dialog v-model:visible="modal" :style="{width: '500px'}" header="Popup form" :modal="true"
                    class="p-fluid">
                    <div class="field">
                        <label for="pesan">Pesan kesan</label>
                        <Textarea placeholder="Isi text" v-model.trim="firstData.pesan" :autoResize="true" rows="3"
                            cols="30" :class="{'p-invalid': err.pesan}" />
                        <small class="p-invalid" v-if="err.pesan">{{ err.pesan[0] }}</small>
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
                        <span v-if="firstData">Anda yakin ingin menghapus data testimoni dengan milik
                            <b>{{firstData.user.nama}}</b>?</span>
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
                err: [],
                filters: {
                    global: {
                        value: null
                    }
                },
                disable: false,
                modalDelete: false,
                modal: false,
                insert: true,
                me: {}
            }
        },
        productService: null,
        created() {
            this.initFilters();
        },
         beforeCreate() {
            axios.get('/sanctum/csrf-cookie').then(() => {
                axios.post('/api/me', {token: localStorage.getItem('WebToken')},
                {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('WebToken')
                    }
                }).then((result) => {
                    this.me = result.data
                }).catch((err) => {
                    console.log(err.response.data)
                });
            }).catch((err) => {
                console.log(err.response.data)
            });
            axios.get('/sanctum/csrf-cookie').then(() => {
                axios.get('/api/admin/testimoni', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('WebToken')
                    }
                }).then((result) => {
                    this.allData = result.data.data
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
                this.modal = true;
            },
            hideModal() {
                this.modal = false;
            },
            save() {
                this.err = []
                this.disable = true
                this.firstData.user_id = this.me.id

                axios.get('/sanctum/csrf-cookie').then(() => {
                    if (this.insert) {
                        axios.post('/api/admin/testimoni', this.firstData, {
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
                        }).catch((err) => {
                            this.toast('error', 'Error', 'Data gagal ditambahkan')

                            this.disable = false
                            this.err = err.response.data
                            console.log(err.response.data)
                        });
                    } else {
                        axios.put('/api/admin/testimoni/' + this.firstData.id, this.firstData, {
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
                this.modal = true;
            },
            confirm(data) {
                this.firstData = data;
                this.modalDelete = true;
            },
            deleteData() {
                this.disable = true
                axios.get('/sanctum/csrf-cookie').then(() => {
                    axios.delete('/api/admin/testimoni/' + this.firstData.id, {
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