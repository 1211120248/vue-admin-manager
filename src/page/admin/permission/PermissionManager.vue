<template>
    <div>
        <div>
            <el-button size="small" type="primary" class="el-icon-plus" @click="handleAdd">添加权限</el-button>
            <el-button size="small" type="primary" class="el-icon-edit" @click="handleEdit">编辑权限</el-button>
            <el-button size="small" type="danger" class="el-icon-close" @click="handleDelete">删除权限</el-button>
        </div>
        <br/>
        <el-tree :data="permissions" :props="defaultProps" highlight-current @node-click="handleSelectedNode" default-expand-all></el-tree>
        <br/>
        <el-dialog title="添加权限" :visible.sync="addDialogVisible" size="tiny">
            <el-form label-width="80px">
                <el-form-item label="名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="权限代码">
                    <el-input v-model="form.code"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSubmit">立即创建</el-button>
                    <el-button @click="addDialogVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="编辑权限" :visible.sync="editDialogVisible" size="tiny">
            <el-form label-width="80px">
                <el-form-item label="名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="权限代码">
                    <el-input v-model="form.code"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSubmit">保存编辑</el-button>
                    <el-button @click="editDialogVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
    import Config from 'Config';
    export default {
        props: {
            systemId:''
        },
        data() {
            return {
                permissions: [],
                totalCount:'',
                query : {

                },
                title:'',
                form: {
                    id : '',
                    name: '',
                    code: '',
                    parentId: '',
                    type:''
                },
                editDialogVisible: false,
                addDialogVisible: false,
                currentRow:0,
                defaultProps: {
                    children: 'children',
                    label: 'text'
                },
                selectedNode: ''
            }
        },
        created () {
            this.handleQuery();
        },
        methods:{
            handleSelectedNode(node){
                this.selectedNode = node.id;
            },
            handleCurrentChange(page) {
                this.query.page = page;
                this.handleQuery();
            },
            handleAdd() {
                this.clearForm();
                this.addDialogVisible = true;
            },
            handleEdit() {
                this.clearForm();
                if(this.selectedNode){
                    this.$axios.get(Config.ACCOUNT_HOST + "/admin/permissions/" + this.selectedNode).then((res) => {
                        this.form = res.data.data;
                        this.editDialogVisible = true;
                    });
                }else{
                    this.$message.error("请先选择你要编辑的节点!");
                }

            },
            handleDelete(index,row) {
                this.$axios.delete(Config.ACCOUNT_HOST + "/admin/permissions/" + this.selectedNode).then((res) => {
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
                    this.$axios.put(Config.ACCOUNT_HOST + "/admin/permissions",{
                        'id':this.form.id,
                        'name':this.form.name,
                        'code':this.form.code
                    }).then((res) => {
                        if(res.data.success){
                            this.editDialogVisible = false;
                            this.handleQuery();
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    });
                }else{
                    this.$axios.post(Config.ACCOUNT_HOST + "/admin/permissions",{
                        'parentId':this.selectedNode,
                        'name':this.form.name,
                        'code':this.form.code,
                        "systemId":this.systemId
                    }).then((res) => {
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
                this.$axios.get(Config.ACCOUNT_HOST + "/admin/systems/"+this.systemId+"/permissions.tree",this.query).then((res) => {
                    this.permissions = res.data.data;
                });
            },
            clearForm(){
                this.form.id = '';
                this.form.parentId='';
                this.form.name = '';
                this.form.code = '';
                this.form.type = '';
            }
        }
    }
</script>

