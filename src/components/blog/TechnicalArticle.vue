<template>
    <div class="tech-article-menu">
        <el-menu :defaultActive="1" style="background-color: white" mode="horizontal">
            <el-menu-item index="1">Java</el-menu-item>
            <el-menu-item index="2">Hadoop</el-menu-item>
            <el-menu-item index="3">Web前端</el-menu-item>
            <el-menu-item index="4">Web安全</el-menu-item>
            <el-menu-item index="5">Python</el-menu-item>
        </el-menu>
        <v-article></v-article>
    </div>
</template>
<script>
    import vArticle from "./common/Article.vue";

    export default{
        components:{
            vArticle
        }
    }
</script>
<style>
    .tech-article-menu .el-menu-item, .el-submenu__title{
        font-size: 16px;
    }
</style>
