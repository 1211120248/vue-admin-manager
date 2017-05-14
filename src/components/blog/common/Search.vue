<template>
    <div>
        <v-panel title="搜索文章">
            <slot>
                <div style="margin-top: 15px;">
                    <el-input placeholder="请输入搜索的内容!" v-model="searchContent">
                        <el-select slot="prepend" v-model="searchWhere" placeholder="请选择" style="width: 110px">
                            <el-option label="文章名称" value="1"></el-option>
                            <el-option label="文章内容" value="2"></el-option>
                        </el-select>
                        <el-button slot="append" icon="search"></el-button>
                    </el-input>
                </div>
            </slot>
        </v-panel>
    </div>
</template>
<script>
    import 'bootstrap/dist/css/bootstrap.css';
    import vPanel from "./Panel.vue";

    export default{
        components:{
            vPanel
        },
        data () {
            return {
                articles : '',
                searchWhere : '',
                searchContent : ''
            }
        },
        created () {

        }
    }
</script>
<style>
</style>
