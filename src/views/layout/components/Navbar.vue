<template>
    <div class="navbar">
        <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
        <breadcrumb class="breadcrumb-container"/>

        <div class="right-menu">

            <el-tooltip content="全屏" effect="dark" placement="bottom">
                <screenfull class="screenfull right-menu-item"/>
            </el-tooltip>

            <el-dropdown class="avatar-container right-menu-item" trigger="click">
                <div class="avatar-wrapper">
                    <img :src="'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80'"
                         class="user-avatar">
                    <i class="el-icon-caret-bottom"/>
                </div>

                <el-dropdown-menu slot="dropdown">
                    <router-link to="/">
                        <el-dropdown-item> 首页</el-dropdown-item>
                    </router-link>
                    <el-dropdown-item divided>
                        <span style="display:block;" @click="logout">退出登录</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Hamburger from '@/components/Hamburger'
    import Breadcrumb from '@/components/Breadcrumb'
    import Screenfull from '@/components/Screenfull'

    export default {
        components: {
            Hamburger,
            Breadcrumb,
            Screenfull
        },
        computed: {
            ...mapGetters([
                'sidebar'
            ])
        },
        methods: {
            toggleSideBar() {
                this.$store.dispatch('toggleSideBar')
            },
            logout() {
                this.$store.dispatch('LogOut').then(() => {
                    location.reload()
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .navbar {
        height: 50px;
        line-height: 50px;
        border-radius: 0px !important;

        .hamburger-container {
            line-height: 58px;
            height: 50px;
            float: left;
            padding: 0 5px;
        }

        .breadcrumb-container {
            float: left;
        }

        .errLog-container {
            display: inline-block;
            vertical-align: top;
        }

        .right-menu {
            float: right;
            height: 100%;

            &:focus {
                outline: none;
            }

            .right-menu-item {
                display: inline-block;
                margin: 0 10px;
            }

            .screenfull {
                height: 20px;
            }

            .international {
                vertical-align: top;
            }

            .theme-switch {
                vertical-align: 15px;
            }

            .avatar-container {
                height: 50px;
                margin-right: 30px;

                .avatar-wrapper {
                    margin-top: 5px;
                    position: relative;

                    .user-avatar {
                        cursor: pointer;
                        width: 40px;
                        height: 40px;
                        border-radius: 10px;
                    }

                    .el-icon-caret-bottom {
                        cursor: pointer;
                        position: absolute;
                        right: -20px;
                        top: 25px;
                        font-size: 12px;
                    }
                }
            }
        }
    }
</style>
