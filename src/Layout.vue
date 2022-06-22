<template>
    <div class="surface-0 overflow-hidden">
        <layoutheader />
        <div class="z-1 bg-green-100 relative" style="margin-top:90px">
            <router-view />
            <layoutfooter />
        </div>
    </div>
</template>

<script>
    import LayoutFooter from './LayoutFooter.vue'
    import LayoutHeader from './LayoutHeader.vue'
    export default {
        components: {
            'layoutheader': LayoutHeader,
            'layoutfooter': LayoutFooter,
        }
    }
</script>