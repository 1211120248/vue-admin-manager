<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <template v-for="(item,index) in menus">
                <el-menu-item :index="item.href">
                    <span>{{ item.name }}</span>
                </el-menu-item>
             </template>
        </el-menu>
    </div>
</template>

<script>
    import Config from 'Config';

    export default {
        data () {
            return{
                menus:{}
            }
        },
        created () {
            this.$axios.post(Config.HOST + '/cms/menu/list',{
                "sorts":[
                    {
                        dir:'asc',
                        field:'sort'
                    }
                ]
            }).then((res) => {
                this.menus = res.data.data;
            })
        },
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 170px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
