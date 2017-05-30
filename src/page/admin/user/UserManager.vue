<template>
    <div>
        <div>
            <el-button size="small" type="primary" class="el-icon-plus" @click="addDialogVisible=true,form={}">添加用户</el-button>
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
                label="用户名">
            </el-table-column>
            <el-table-column
                prop="nickname"
                label="昵称">
            </el-table-column>
            <el-table-column
                prop="status"
                label="状态">
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button
                        size="small"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
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
        <el-dialog title="添加用户" :visible.sync="addDialogVisible"  size="tiny">
            <el-form label-width="80px">
                <el-form-item label="账号">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" type="password"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.nickname"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSubmit">立即创建</el-button>
                    <el-button @click="addDialogVisible = false">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog title="编辑用户" :visible.sync="editDialogVisible" size="tiny">
            <el-form label-width="80px">
                <el-form-item label="账号">
                    <el-input v-model="form.name" disabled></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="form.nickname"></el-input>
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
                totalCount:'',
                query : {

                },
                form: {
                    id : '',
                    name: '',
                    password:'',
                    nickname:''
                },
                addDialogVisible: false,
                editDialogVisible: false,
                currentRow:0
            }
        },
        created () {
            this.handleQuery();
        },
        methods:{
            handleCurrentChange(page) {
                this.query.page = page;
                this.handleQuery();
            },
            handleEdit(index,row) {
                this.$axios.get(Config.HOST + "/account/users/" + row.id,this.query).then((res) => {
                    if(res.data.success){
                        this.form = res.data.data;
                        this.editDialogVisible = true;
                    }else{

                    }
                });
            },
            handleDelete(index,row) {
                this.$axios.delete(Config.HOST + "/account/users/" + row.id).then((res) => {
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
                    this.$axios.put(Config.HOST + "/account/users/" + this.form.id,this.form).then((res) => {
                        if(res.data.success){
                            this.editDialogVisible = false;
                            this.handleQuery();
                        }else{
                            this.$message.error(res.data.msg);
                        }
                    });
                }else{
                    this.$axios.post(Config.HOST + "/account/users",this.form).then((res) => {
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
                this.$axios.post(Config.HOST + "/account/users/query",this.query).then((res) => {
                    this.tableData = res.data.data.rows;
                    this.totalCount = res.data.data.totalCount;
                });
            }
        }
    }
</script>

