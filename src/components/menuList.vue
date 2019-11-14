<template>
    <div>
        <template v-for="(route, index) in menus">
            <template v-if="route.children">
            <el-submenu :key="index" :index="route.name">
                <template slot="title">
                {{route.meta.name || route.name}}</template>
                <el-menu-item v-for="(cRoute, cIndex) in route.children" :key="cIndex" :index="cRoute.name" :route="cRoute"><i class="ion menuIcon" v-html="cRoute.meta.icon"></i>{{cRoute.meta.name || cRoute.name}}</el-menu-item>
            </el-submenu>
            </template>
            <template v-else>
            <el-menu-item :route="route" :index="route.name" :key="'nav'+index">{{route.meta.name || route.name}}</el-menu-item>
            </template>
        </template>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import store from '@/vuex/index'
export default {
    name:'menuList',
    data(){
        return{
            menus:[]
        }
    },
    created(){
        this.menus = this.$store.state.menuList;
    }
}
</script>