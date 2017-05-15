<template>

    <el-menu :default-active="onRoutes" unique-opened router>
        <template v-for="(item,index) in menus">
            <el-menu-item :index="item.href">
                <span>{{ item.name }}</span>
            </el-menu-item>
        </template>
    </el-menu>
</template>
<script>
    export default{
        data () {
            return {
                menus : ''
            }
        },
        created () {
            this.$axios.post('/cms/menu/query',{pageSize:100000}).then((res) => {
                this.menus = res.data.data.rows;
            })
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>
<style>
    .icon{

    }
</style>
