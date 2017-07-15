<template>
    <div>
        <el-tabs v-model="activeName"  @tab-click="handleClick" :activeName="activeName">
            <el-tab-pane :label="system.name" :name="system.id" v-for="system in systems">
                <v-permission-manager :systemId="system.id"></v-permission-manager>
            </el-tab-pane>
        </el-tabs>
        <router-view></router-view>
    </div>
</template>
<script>
    import vPermissionManager from './PermissionManager.vue';
    import Config from 'Config';

    export default {
        components:{
            vPermissionManager
        },
        data() {
            return {
                systems:[],
                activeName:''
            };
        },
        created() {
            this.$axios.get(Config.ACCOUNT_HOST + "/admin/systems").then((res) => {
                this.systems = res.data.data;
                if(this.systems && this.systems.length > 0){
                    this.activeName = this.systems[0].id;
                }
            });
        },
        methods: {

            handleClick(tab, event) {

            }
        }
    };
</script>
<style
