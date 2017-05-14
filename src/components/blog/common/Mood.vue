<template>
    <div>
        <v-panel title="偶遇佳句">
            <slot>
                <div class="panel-body" style="height: 86px;">
                    也许有一天，我的理想会接二连三地受创，但我不会动摇，因为我坚信那是对的，我会继续追寻自己的梦想，我也相信早晚有一天我会遇到一个真正懂我的人！
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
</style>
