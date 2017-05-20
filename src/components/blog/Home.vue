<template>
    <div>
        <el-col :span="14" style="padding-left: 10px">
            <v-carousel></v-carousel>
            <v-article title="最新文章"></v-article>
        </el-col>
        <el-col :span="8" style="margin-left: 10px;">
            <v-panel title="本站公告">
                <slot>
                    <div class="panel-body" style="height: 86px;">
                        也许有一天，我的理想会接二连三地受创，但我不会动摇，因为我坚信那是对的，我会继续追寻自己的梦想，我也相信早晚有一天我会遇到一个真正懂我的人！
                    </div>
                </slot>
            </v-panel>
            <v-search></v-search>
            <v-words></v-words>
        </el-col>
    </div>
</template>

<script>
    import vArticle from "./common/Article.vue";
    import vPanel from "./common/Panel.vue";
    import vSearch from "./common/Search.vue";
    import vWords from "./common/Words.vue";
    import vCarousel from "./common/Carousel.vue";

    export default{
        components:{
            vArticle,vPanel,vSearch,vWords,vCarousel
        }
    }
</script>
