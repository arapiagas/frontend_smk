<template>
    <div class="surface-ground px-4 py-8 md:px-6 lg:px-8 flex align-items-center justify-content-center" v-if="profil">
        <div class="surface-card p-4 shadow-2 border-round w-full lg:w-6">
            <div class="text-center mb-5">
                <img :src="url+'/'+profil.icon" alt="Image" height="50" class="mb-3">
                <div class="text-900 text-3xl font-medium mb-3">Selamat Datang</div>
                <span class="text-600 font-medium line-height-3">Login dengan akun anda</span>
            </div>
            <div>
                <label for="email1" class="block text-900 font-medium mb-2">Email</label>
                <div class="text-xs text-red-500" v-if="formError.email">
                    {{ formError.email[0] }}
                </div>
                <input v-model="form.email" class="p-inputtext p-component w-full mb-3" id="email1" type="email">
                <label for="password1" class="block text-900 font-medium mb-2">Password</label>
                <div class="text-xs text-red-500" v-if="formError.password">
                    {{ formError.password[0] }}
                </div>
                <input v-model="form.password" class="p-inputtext p-component w-full mb-3" id="password1"
                    type="password">
                <button :disabled="disable" @click.prevent="Login" class="p-button p-component w-full p-button-success"
                    type="button">
                    <span class="pi pi-user p-button-icon p-button-icon-left"></span>
                    <span class="p-button-label">Sign In</span>
                    <span class="p-ink"></span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from '../axios.js'
    import config from '../config.js'

    export default {
        data() {
            return {
                form: {
                    email: "",
                    password: ""
                },
                disable: false,
                formError: [],
                profil: {},
                url: new config().storage,
            }
        },
        computed: {
            logoColor() {
                if (this.$appState.darkTheme) return 'white';
                return 'dark';
            }
        },
        beforeCreate() {
            axios.get('/sanctum/csrf-cookie').then(() => {
                axios.get('/api/app/profile').then((result) => {
                    this.profil = result.data.data
                }).catch((err) => {
                    console.log(err.response.data)
                });
            }).catch((err) => {
                console.log(err.response.data)
            });
        },
        methods: {
            Login() {
                this.disable = true
                this.formError = []
                axios.get('/sanctum/csrf-cookie').then(() => {
                    axios.post('/api/auth/login', this.form).then((result) => {
                        this.$root.$emit("login", true)
                        localStorage.setItem('WebToken', result.data.token)
                        localStorage.setItem('Privilage', result.data.level)

                        if (result.data.level == 'admin') {
                            this.$router.push('/pendidik')
                        } else if (result.data.level == 'petugas') {
                            this.$router.push('/petugas')
                        } else if (result.data.level == 'siswa') {
                            this.$router.push('/siswa')
                        }
                    }).catch((err) => {
                        console.log(err)
                        this.formError = err.response.data
                        this.disable = false
                    });
                }).catch((err) => {
                    this.disable = false
                    console.log(err.response)
                });
            }
        },
    }
</script>

<style scoped>
    .pi-eye {
        transform: scale(1.6);
        margin-right: 1rem;
    }

    .pi-eye-slash {
        transform: scale(1.6);
        margin-right: 1rem;
    }
</style>