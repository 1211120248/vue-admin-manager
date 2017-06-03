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
        <el-dialog title="分配权限" :visible.sync="permissionsDialogVisible">
            <el-tree
                :data="permissions"
                show-checkbox
                node-key="id"
                ref="dialogTree"
                getCheckedKeys=""
                :default-checked-keys="selectedPermission"
                :props="defaultProps">
            </el-tree>
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
                permissions:[],
                defaultProps: {
                    children: 'children',
                    label: 'text'
                },
                selectedPermission:[]
            }
        },
        created () {
            this.handleQuery();
        },
        methods:{
            handleSelectedNode(node){
                this.selectedNode = node.id;
            },
            handleSavePermissions () {
                this.$axios.put(Config.HOST + "/account/roles/assignmentPermission/" + this.form.id,this.$refs.dialogTree.getCheckedKeys()).then((res) => {
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
                this.$axios.get(Config.HOST + "/account/roles/" + row.id,this.query).then((res) => {
                    if(res.data.success){
                        this.form = res.data.data;
                        this.editDialogVisible = true;
                    }else{

                    }
                });
            },
            handleEditPermissions(index,row){
                this.form.id = row.id;
                this.selectedPermission = [];
                this.permissionsDialogVisible = true;
                this.$axios.post(Config.HOST + "/account/permissions/query.tree",{}).then((res) => {
                    this.permissions = res.data.data;
                });
                this.$axios.post(Config.HOST + "/account/roles/getPermissions/" + row.id,{}).then((res) => {
                    this.selectedPermission = res.data.data;
                });
            },
            handleDelete(index,row) {
                this.$axios.delete(Config.HOST + "/account/roles/" + row.id).then((res) => {
                    if(res.data.success){
                        this.$message('删除成功!');
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    this.handleQuery();
                });
            },
            handleSubmit() {
                debugger
                if(this.form.id){
                    this.$axios.put(Config.HOST + "/account/roles/" + this.form.id,this.form).then((res) => {
                        if(res.data.success){
                            this.editDialogVisible = false;
                            this.handleQuery();
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    });
                }else{
                    this.$axios.post(Config.HOST + "/account/roles",this.form).then((res) => {
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
                this.$axios.post(Config.HOST + "/account/roles/query",this.query).then((res) => {
                    this.tableData = res.data.data.rows;
                    this.totalCount = res.data.data.totalCount;
                });
            }
        }
    }
</script>

