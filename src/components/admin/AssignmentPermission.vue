<template>
    <el-tabs v-model="activeName" @tab-click="handleClick" :activeName="activeName">
        <el-tab-pane :label="system.name" :name="system.id" v-for="system in systems">
            <el-tree
                :data="permissions"
                show-checkbox
                node-key="id"
                ref="dialogTree"
                getCheckedKeys=""
                :default-checked-keys="selectedPermission"
                :props="defaultProps">
            </el-tree>
        </el-tab-pane>
    </el-tabs>
</template>
<script>

    import Config from 'Config';
    export default {
        data() {
            permission:[]
        },
        created:{

        }
    }
</script>
