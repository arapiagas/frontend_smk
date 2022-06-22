<template>
    <div class="px-4 py-8 md:px-6 lg:px-8" v-if="statis">
        <div class="surface-card p-4 shadow-2 border-round">
            <div v-html="statis.isi_text"></div>
        </div>
    </div>
</template>

<script>
    import axios from '../axios.js'
    import config from '../config.js'

    export default {
        data() {
            return {
                url: new config().storage,
                statis: {},
            }
        },
        beforeCreate() {
            axios.get('/sanctum/csrf-cookie').then(() => {
                axios.get('/api/app/statis/' + this.$route.params.link).then((result) => {
                    var data = result.data.data
                    this.statis = data.statis
                }).catch((err) => {
                    console.log(err.response.data)
                });
            }).catch((err) => {
                console.log(err.response.data)
            });
        }
    }
</script>