<template>
    <div>
        <div>
            <el-button size="small" type="primary" class="el-icon-plus" @click="addDialogVisible=true,form={}">添加角色</el-button>
        </div>
        <br/>
        <el-table
            :data="tableData"
            stripe
            @current-change=""
            style="width: 100%">
            <el-table-column
                type="selection"
                width="70">
            </el-table-column>
            <el-table-column
                prop="name"
                label="名称">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button
                        size="small"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                        size="small"
                        type="primary"
                        @click="handleEditPermissions(scope.$index, scope.row)">权限</el-button>
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="pagination"
                       layout="prev, pager, next"
                       :total="totalCount" @current-change="handleCurrentChange">
        </el-pagination>
        <br/>
        <el-dialog title="添加角色" :visible.sync="addDialogVisible"  size="tiny">
            <el-form label-width="80px">
                <el-form-item label="名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSubmit">立即创建</el-button>
                    <el-button @click="addDialogVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="编辑角色" :visible.sync="editDialogVisible" size="tiny">
            <el-form label-width="80px">
                <el-form-item label="名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSubmit">保存编辑</el-button>
                    <el-button @click="editDialogVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="分配权限" :visible.sync="permissionsDialogVisible" size="full">
            <el-tabs v-model="activeName" :activeName="activeName">
                <el-tab-pane :label="system.name" :name="system.id" v-for="system in systems">
                    <el-tree
                        :data="system.permissions"
                        show-checkbox
                        node-key="id"
                        :default-checked-keys="selectedPermissions"
                        @check-change="nodeChange"
                        :props="defaultProps">
                    </el-tree>
                </el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button @click="permissionsDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSavePermissions">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import Config from 'Config';
    export default {
        data() {
            return {
                tableData: [],
                totalCount:0,
                query : {

                },
                currentNodeKey:'',
                form: {
                    id : '',
                    name: ''
                },
                addDialogVisible: false,
                editDialogVisible: false,
                permissionsDialogVisible: false,
                currentRow:0,
                defaultProps: {
                    children: 'children',
                    label: 'text'
                },
                selectedPermissions:[],
                systems:[],
                activeName:''
            }
        },
        created () {
            this.handleQuery();
        },
        methods:{
            nodeChange(obj,isChecked,isChildChecked){
                if(isChecked){
                    this.selectedPermissions.push(obj.id);
                }else{
                    for(var i = 0; i < this.selectedPermissions.length; i++) {
                        if(this.selectedPermissions[i] == obj.id) {
                            this.selectedPermissions.splice(i, 1);
                            break;
                        }
                    }
                }
                console.log(this.selectedPermissions);
            },
            handleSelectedNode(node){
                this.selectedNode = node.id;
            },
            handleSavePermissions () {
                this.$axios.put(Config.ACCOUNT_HOST + "/admin/roles/" + this.form.id + "/permissions/",this.selectedPermissions).then((res) => {
                    if(res.data.success){
                        this.permissionsDialogVisible = false;
                    }else{

                    }
                });
            },
            handleCurrentChange(page) {
                this.query.page = page;
                this.handleQuery();
            },
            handleEdit(index,row) {
                this.$axios.get(Config.ACCOUNT_HOST + "/admin/roles/" + row.id,this.query).then((res) => {
                    if(res.data.success){
                        this.form = res.data.data;
                        this.editDialogVisible = true;
                    }else{

                    }
                });
            },
            handleEditPermissions(index,row){
                this.form.id = row.id;
                //查询出系统
                this.$axios.get(Config.ACCOUNT_HOST + "/admin/systems").then((res) => {
                    this.systems = res.data.data;
                    if(this.systems){
                        this.activeName = this.systems[0].id;
                        //查询出权限树
                        this.$axios.get(Config.ACCOUNT_HOST + "/admin/systems/permissions.tree").then((res) => {
                            for(let i = 0; i < this.systems.length; ++i){
                                this.systems[i].permissions = res.data.data[this.systems[i].id];
                            }
                            //查询出该角色已经选择的权限
                            this.$axios.get(Config.ACCOUNT_HOST + "/admin/roles/"+this.form.id+"/permissions").then((res) => {
                                console.log(this.selectedPermissions = res.data.data)
                                this.selectedPermissions = res.data.data;
                                this.permissionsDialogVisible = true;
                            });
                        });
                    }
                });
            },
            handleDelete(index,row) {
                this.$axios.delete(Config.ACCOUNT_HOST + "/admin/roles/" + row.id).then((res) => {
                    if(res.data.success){
                        this.$message('删除成功!');
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    this.handleQuery();
                });
            },
            handleSubmit() {
                if(this.form.id){
                    this.$axios.put(Config.ACCOUNT_HOST + "/admin/roles/" + this.form.id,this.form).then((res) => {
                        if(res.data.success){
                            this.editDialogVisible = false;
                            this.handleQuery();
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    });
                }else{
                    this.$axios.post(Config.ACCOUNT_HOST + "/admin/roles",this.form).then((res) => {
                        if(res.data.success){
                            this.addDialogVisible = false;
                            this.handleQuery();
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    });
                }
            },
            handleQuery(){
                this.$axios.get(Config.ACCOUNT_HOST + "/admin/roles",this.query).then((res) => {
                    this.tableData = res.data.data.rows;
                    this.totalCount = res.data.data.totalCount;
                });
            }
        }
    }
</script>
<style>
    .dialog-footer{
    }
</style>

