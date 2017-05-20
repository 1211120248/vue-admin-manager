<template>
    <el-tabs activeName="1" type="card" >
        <el-tab-pane label="文章列表" name="1">
            <v-article-list></v-article-list>
        </el-tab-pane>
        <el-tab-pane label="文章标签" name="3">
            <v-article-tag></v-article-tag>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
    import vArticleList from './ArticleList.vue';
    import vArticleTag from './ArticleTag.vue';

    export default {
        components:{
            vArticleList,vArticleTag
        }
    }
</script>
