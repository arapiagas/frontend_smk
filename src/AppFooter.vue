<template>
	<div class="layout-footer">
		Copyright © {{ tahun }} , {{ nama_sekolah }} All rights reserved
	</div>
</template>

<script>
	import axios from './axios.js'
	export default {
		data() {
			return {
				tahun: "",
				nama_sekolah: ""
			}
		},
		name: "AppFooter",
		methods: {
			footerImage() {
				return this.$appState.darkTheme ? 'images/logo-white.svg' : 'images/logo-dark.svg';
			}
		},
		computed: {
			darkTheme() {
				return this.$appState.darkTheme;
			}
		},
		beforeMount() {
			this.tahun = new Date().getFullYear()
			axios.get('/sanctum/csrf-cookie').then(() => {
				axios.get('/api/app/profile').then((result) => {
					var response = result.data.data
					this.nama_sekolah = response.nama_pendidikan + ' ' + response.nama_sekolah
				}).catch((err) => {
					console.log(err.response.data)
				});
			}).catch((err) => {
				console.log(err.response.data)
			});
		},
	}
</script>