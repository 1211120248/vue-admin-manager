<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="系统管理" name="systemManager">
                <v-system-manager></v-system-manager>
            </el-tab-pane>
        </el-tabs>
        <router-view></router-view>
    </div>
</template>
<script>
    import vSystemManager from './SystemManager.vue';

    export default {
        components:{
            vSystemManager
        },
        data() {
            return {
                activeName: 'systemManager'
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    };
</script>
