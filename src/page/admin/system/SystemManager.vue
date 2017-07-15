<template>
    <div>
        <div>
            <el-button size="small" type="primary" class="el-icon-plus" @click="addDialogVisible=true,form={}">添加系统</el-button>
        </div>
        <br/>
        <el-table
            :data="tableData"
            stripe
            @current-change=""
            style="width: 100%">

            <el-table-column
                prop="name"
                label="系统名称">
            </el-table-column>
            <el-table-column
                prop="systemKey"
                label="系统密钥">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button
                        size="small"
                        type="primary"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                        size="small"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="添加系统" :visible.sync="addDialogVisible"  size="tiny">
            <el-form label-width="80px">
                <el-form-item label="系统名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSubmit">立即创建</el-button>
                    <el-button @click="addDialogVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="编辑系统" :visible.sync="editDialogVisible"  size="tiny">
            <el-form label-width="80px">
                <el-form-item label="系统名称">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="系统名称">
                    {{form.systemKey}}
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
        data() {
            return {
                tableData: [],
                form: {
                    id : '',
                    name: '',
                    systemKey:''
                },
                addDialogVisible:false,
                editDialogVisible:false
            }
        },
        created () {
            this.handleQuery();
        },
        methods:{
            handleQuery() {
                this.$axios.get(Config.ACCOUNT_HOST + "/admin/systems").then((res) => {
                    this.tableData = res.data.data;
                });
            },
            handleEdit(index,row) {
                this.$axios.get(Config.ACCOUNT_HOST + "/admin/systems/" + row.id,this.query).then((res) => {
                    if(res.data.success){
                        this.form = res.data.data;
                        this.editDialogVisible = true;
                    }else{

                    }
                });
            },
            handleSubmit() {
                if(this.form.id){
                    this.$axios.put(Config.ACCOUNT_HOST + "/admin/systems",{
                        'id' : this.form.id,
                        'name':this.form.name
                    }).then((res) => {
                        if(res.data.success){
                            this.editDialogVisible = false;
                            this.handleQuery();
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    });
                }else{
                    this.$axios.post(Config.ACCOUNT_HOST + "/admin/systems",{
                        'name':this.form.name
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
            handleDelete(index,row) {
                this.$axios.delete(Config.ACCOUNT_HOST + "/admin/systems/" + row.id).then((res) => {
                    if(res.data.success){
                        this.$message('删除成功!');
                    }else{
                        this.$message.error(res.data.msg);
                    }
                    this.handleQuery();
                });
            }
        }
    }
</script>

