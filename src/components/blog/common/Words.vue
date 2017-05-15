<template>
    <div>
        <v-panel title="游客留言">
            <slot>
                <div class="words" data-example-id="default-media">
                    <div class="media">
                        <div class="media-body">
                            <h5 class="media-heading">我的未来不少你</h5>
                            <p>时间带不走真正的朋友，岁月留不住虚幻的拥有</p>
                        </div>
                    </div>
                    <div class="media">
                        <div class="media-body">
                            <h5 class="media-heading">王林</h5>
                            <p>我以火染红了整个苍穹，只为了给你不再冰冷的理由。 我以雷轰颠了整个世界，只为了让你听到我的声音。 我走过了万万里，走过了一界界，只为了寻找你的呼吸。</p>
                        </div>
                    </div>
                    <div class="media">
                        <div class="media-body">
                            <h5 class="media-heading">小梦</h5>
                            <p>如果你总是像这样嫌弃周围的人，看轻别人，你的态度会使自己变成一个别人无法肯定的人。</p>
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
        components:{
            vPanel
        },
        data () {
            return {
                articles : ''
            }
        },
        created () {

        }
    }
</script>
<style>
    .words h5{
        font-weight: 600;
    }

    .words .media-body p{
        font-size: 12px;
        color: #756F71;
    }
</style>
