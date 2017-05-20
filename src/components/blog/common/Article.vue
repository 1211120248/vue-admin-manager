<template>
    <div>
        <v-panel :title="title">
            <slot>
                <div class="row">
                    <div class="col-sm-6 col-md-4" v-for="(item,index) in articles">
                        <div class="thumbnail article">
                            <img :src="item.imgSrc" :alt="item.title">
                            <div class="caption">
                                <h4>{{ item.title }}</h4>
                                <p>{{ item.content }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </slot>
        </v-panel>
    </div>
</template>
<script>
    import 'bootstrap/dist/css/bootstrap.css';
    import vPanel from "./Panel.vue";

    export default{
        props:{
            title:''
        },
        components:{
            vPanel
        },
        data () {
            return {
                articles : ''
            }
        },
        created () {
            this.$axios.post('/cms/article/query',{}).then((res) => {
                this.articles = res.data.data.rows;
            })
        }
    }
</script>
<style>

    .article h4{
        font-weight: 600;
    }

    .article p{
        font-size: 12px;
        color: #756F71;
    }

</style>
