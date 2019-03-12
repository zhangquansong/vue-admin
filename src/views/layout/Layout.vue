<template>
    <div :class="classObj" class="app-wrapper">
        <side-bar class="sidebar-container"/>
        <div class="main-container">
            <navbar/>
            <tags-view/>
            <app-main/>
        </div>
    </div>
</template>

<script>
    import {Navbar, SideBar, AppMain, TagsView} from './components/index'

    export default {
        name: "Layout",
        components: {Navbar, SideBar, AppMain, TagsView},
        computed: {
            sidebar() {
                return this.$store.state.app.sidebar
            },
            device() {
                return this.$store.state.app.device
            },
            classObj() {
                return {
                    hideSidebar: !this.sidebar.opened,
                    openSidebar: this.sidebar.opened,
                    withoutAnimation: this.sidebar.withoutAnimation,
                }
            }
        },
        methods: {
            handleClickOutside() {
                this.$store.dispatch('closeSideBar', {withoutAnimation: false})
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "@/styles/mixin.scss";
    .app-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;
    }
</style>
