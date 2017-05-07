<template>
    <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="roleManager">
            <el-row :gutter="30" class="buttons">
                <el-col :span="2"><div class="grid-content bg-purple"><el-button  type="info" @click="handleAdd()">添加角色</el-button></div></el-col>
            </el-row>
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column
                    prop="name"
                    label="角色名称" width="200" show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="permissions">
                    <template scope="scope">
                        <el-tree
                            :data="data2"
                            node-key="id"
                            :default-expanded-keys="[2, 3]"
                            :default-checked-keys="[5]"
                            :props="defaultProps">
                        </el-tree>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="300">
                    <template scope="scope">
                        <el-button size="small" type="info"
                                   @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button size="small" type="success"
                                   @click="handleAssignmentPermission(scope.$index, scope.row)">权限</el-button>
                        <el-button size="small" type="danger"
                                   @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-dialog :title="form.title" :visible.sync="editFormVisible" size="tiny">
            <el-form :model="form" label-width="80px">
                <el-form-item label="角色名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSave">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog :title="form.title" :visible.sync="assignmentPermissionFormVisible">
            <el-input
                placeholder="输入关键字进行过滤"
                v-model="filterText">
            </el-input>

            <el-tree style="margin-top: 10px"
                class="filter-tree"
                :data="data3"
                :props="defaultProps"
                show-checkbox
                default-expand-all
                :filter-node-method="filterNode"
                ref="tree2">
            </el-tree>
        </el-dialog>
    </el-tabs>
</template>

<script>
    export default {
        watch: {
            filterText(val) {
                this.$refs.tree2.filter(val);
            }
        },
        data() {
            return {
                editFormVisible : false,
                assignmentPermissionFormVisible:false,
                form : {
                    id: "",
                    title : "",
                    name : "",
                    edit: "",
                    permissions:""
                },
                tableData: [
                    {
                        "name":"超级管理员"
                    },{
                        "name":"超级管理员"
                    },{
                        "name":"超级管理员"
                    },{
                        "name":"超级管理员"
                    },{
                        "name":"超级管理员"
                    }
                ],
                activeName : "roleManager",
                cur_page: 1,
                filterText: '',
                data3: [{
                    id: 1,
                    label: '系统权限',
                    children: [
                        {
                            id: 4,
                            label: '用户管理',
                            children: [{
                                id: 9,
                                label: '添加用户'
                            }, {
                                id: 10,
                                label: '删除用户'
                            }]
                        },
                        {
                            id: 4,
                            label: '角色管理',
                            children: [{
                                id: 9,
                                label: '添加角色'
                            }, {
                                id: 10,
                                label: '删除角色'
                            }]
                        }
                    ]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                },
                data2: [{
                    id: 1,
                    label: '系统权限',
                    children: [
                        {
                            id: 4,
                            label: '用户管理',
                            children: [{
                                id: 9,
                                label: '添加用户'
                            }, {
                                id: 10,
                                label: '删除用户'
                            }]
                        },
                        {
                            id: 4,
                            label: '角色管理',
                            children: [{
                                id: 9,
                                label: '添加角色'
                            }, {
                                id: 10,
                                label: '删除角色'
                            }]
                        }
                    ]
                }]
            }
        },
        created(){

        },
        methods: {
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.form.title = "编辑角色";
                this.form.name = row.name;
                this.form.edit = true;
                this.editFormVisible = true;
            },
            handleAssignmentPermission(index, row){
                this.form.title = "分配权限";
                this.assignmentPermissionFormVisible = true;
            },
            handleAdd(){
                this.form.title = "添加角色";
                this.form.name = "";
                this.form.edit = false;
                this.editFormVisible = true;
            },
            handleSave(index,row) {
                if(this.form.edit){
                    //编辑角色
                    alert("编辑角色");
                }else{
                    //添加角色
                    alert("添加角色");
                }
            },
            handleDelete(index, row) {
                this.$message.error('删除第'+(index+1)+'行');
            }
        }
    }
</script>
<style>
    .buttons{
        margin-bottom: 10px;
    }

    .el-select .el-input {
        width: 100px;
    }
</style>
