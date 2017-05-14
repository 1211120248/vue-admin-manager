<template>

    <el-menu default-active="1">
        <template v-for="(item,index) in menus">
            <el-menu-item :index="item.id">
                <!--<i class="el-icon-message"></i>-->
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
        }
    }
</script>
<style>
    .icon{

    }
</style>
