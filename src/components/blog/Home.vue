<template>
    <div>
        <el-col :span="14" style="padding-left: 10px">
            <v-carousel></v-carousel>
            <v-article></v-article>
        </el-col>
        <el-col :span="8" style="margin-left: 10px;">
            <v-mood></v-mood>
            <v-search></v-search>
            <v-words></v-words>
        </el-col>
    </div>
</template>

<script>
    import vArticle from "./common/Article.vue";
    import vMood from "./common/Mood.vue";
    import vPanel from "./common/Panel.vue";
    import vSearch from "./common/Search.vue";
    import vWords from "./common/Words.vue";
    import vCarousel from "./common/Carousel.vue";

    export default{
        components:{
            vArticle,vMood,vPanel,vSearch,vWords,vCarousel
        }
    }
</script>
