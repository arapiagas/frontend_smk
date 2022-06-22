<template>
	<div class="layout-topbar">
		<router-link to="/pendidik" class="layout-topbar-logo">
			<img alt="Logo" :src="icon" />
			<span>{{ pendidikan }}{{ nama }}</span>
		</router-link>
		<button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle">
			<i class="pi pi-bars"></i>
		</button>

		<button class="p-link layout-topbar-menu-button layout-topbar-button" v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'scalein', 
			leaveToClass: 'hidden', leaveActiveClass: 'fadeout', hideOnOutsideClick: true}">
			<i class="pi pi-ellipsis-v"></i>
		</button>
		<ul class="layout-topbar-menu hidden lg:flex origin-top">
			<li>
				<button @click.prevent="logout" class="p-link layout-topbar-button">
					<i class="pi pi-sign-out"></i>
					<span>Logout</span>
				</button>
			</li>
		</ul>
	</div>
</template>

<script>
	import axios from './axios.js'
	import config from './config.js'

	export default {
		data() {
			return {
				pendidikan: null,
				nama: null,
				icon: null
			}
		},
		beforeMount() {
			axios.get('/sanctum/csrf-cookie').then(() => {
				axios.get('/api/admin/profil', {
					headers: {
						Authorization: 'Bearer ' + localStorage.getItem('WebToken')
					}
				}).then((result) => {
					var getData = result.data.data

					this.pendidikan = getData.nama_pendidikan
					this.nama = getData.singkatan
					this.icon = new config().storage + '/' + getData.icon
				}).catch((err) => {
					console.log(err.response.data)
				});
			}).catch((err) => {
				console.log(err.response.data)
			});
		},
		methods: {
			onMenuToggle(event) {
				this.$emit('menu-toggle', event);
			},
			onTopbarMenuToggle(event) {
				this.$emit('topbar-menu-toggle', event);
			},
			logout() {
				axios.get('/sanctum/csrf-cookie').then(() => {
					axios.post('/api/logout', {}, {
						headers: {
							Authorization: 'Bearer ' + localStorage.getItem('WebToken')
						}
					}).then((response) => {
						console.log(response.data.msg)

						localStorage.removeItem('WebToken')
						localStorage.removeItem('Privilage')

						this.$router.push('/')
					}).catch((err) => {
						console.log(err.response.data)
					});
				}).catch((err) => {
					console.log(err.response.data)
				});
			}
		},
		computed: {
			darkTheme() {
				return this.$appState.darkTheme;
			}
		}
	}
</script>