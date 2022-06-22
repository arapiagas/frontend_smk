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
							<h5 class="mb-2 md:m-0 p-as-md-center">Data guru</h5>
							<span class="p-input-icon-left">
								<i class="pi pi-search" />
								<InputText v-model="filters['global'].value" placeholder="Search..." />
							</span>
						</div>
					</template>
					<Column field="nama" header="Nama" :sortable="true"></Column>
					<Column field="nip" header="Nip" :sortable="true"></Column>
					<Column field="jenis_kelamin" header="Jenis kelamin" :sortable="true"></Column>
					<Column field="gambar" header="Gambar">
						<template #body="slotProps">
							<img :src="uri + '/' + slotProps.data.gambar" :alt="slotProps.data.gambar" width="100" />
						</template>
					</Column>
					<Column :exportable="false" style="min-width:8rem">
						<template #body="slotProps">
							<Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2"
								@click="edit(slotProps.data)" />
							<Button icon="pi pi-trash" class="p-button-rounded p-button-warning"
								@click="confirm(slotProps.data)" />
						</template>
					</Column>
				</DataTable>


				<Dialog v-model:visible="modal" :style="{width: '500px'}" header="Popup form" :modal="true"
					class="p-fluid">
					<img :src="preview" :alt="gambar" v-if="gambar" width="150"
						class="mt-0 mx-auto mb-5 block shadow-2" />
					<div class="field">
						<label for="nama">Nama</label>
						<InputText id="nama" v-model.trim="firstData.nama" required="true" autofocus
							:class="{'p-invalid': err.nama}" />
						<small class="p-invalid" v-if="err.nama">{{ err.nama[0] }}</small>
					</div>
					<div class="field">
						<label for="nip">NIP</label>
						<InputText id="nip" v-model.trim="firstData.nip" required="true"
							:class="{'p-invalid': err.nip}" />
						<small class="p-invalid" v-if="err.nip">{{ err.nip[0] }}</small>
					</div>
					<div class="field">
						<label class="mb-3">Jenis kelamin</label>
						<div class="formgrid grid">
							<div class="field-radiobutton col-6">
								<RadioButton id="jenis_kelamin1" name="category" value="L"
									v-model="firstData.jenis_kelamin" />
								<label for="jenis_kelamin1">Laki laki</label>
							</div>
							<div class="field-radiobutton col-6">
								<RadioButton id="jenis_kelamin2" name="category" value="P"
									v-model="firstData.jenis_kelamin" />
								<label for="jenis_kelamin2">Perempuan</label>
							</div>
						</div>
						<small class="p-invalid" v-if="err.jenis_kelamin">{{ err.jenis_kelamin[0] }}</small>
					</div>
					<div class="field">
						<label for="tempat_lahir">Tempat lahir</label>
						<InputText id="tempat_lahir" v-model.trim="firstData.tempat_lahir" required="true" autofocus
							:class="{'p-invalid': err.tempat_lahir}" />
						<small class="p-invalid" v-if="err.tempat_lahir">{{ err.tempat_lahir[0] }}</small>
					</div>
					<div class="field">
						<label for="file_input">Upload file</label>
						<div class="p-fileupload p-fileupload-basic p-component" data-v-38df812b="">
							<label for="file_input" class="p-button p-component p-fileupload-choose">
								<span class="p-button-icon p-button-icon-left pi pi-upload"></span>
								<span class="p-button-label"> {{ label }} </span>
								<input id="file_input" type="file" @change="setImage">
							</label>
						</div>
						<small class="p-invalid" v-if="err.gambar">{{ err.gambar[0] }}</small>
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
						<span v-if="firstData">Anda yakin ingin menghapus data guru dengan nip
							<b>{{firstData.nip}}</b>?</span>
					</div>
					<template #footer>
						<Button label="No" icon="pi pi-times" class="p-button-text" @click="modalDelete = false" />
						<Button :disabled="disable" label="Yes" icon="pi pi-check" class="p-button-text"
							@click="deleteData" />
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
				insert: true
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
				axios.get('/api/admin/guru', {
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
					form.append(data, this.firstData[data])
				}
				if (this.gambar != null) {
					form.append('gambar', this.gambar)
				}

				axios.get('/sanctum/csrf-cookie').then(() => {
					if (this.insert) {
						axios.post('/api/admin/guru', form, {
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
						axios.post('/api/admin/guru/' + this.firstData.id, form, {
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
					axios.delete('/api/admin/guru/' + this.firstData.id, {
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