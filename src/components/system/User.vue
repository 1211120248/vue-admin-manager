<template>
    <div class="table">
        <el-tabs v-model="activeName">
            <el-tab-pane label="用户管理" name="userManager">
                <el-row :gutter="30" class="buttons">
                    <el-col :span="7">
                        <el-input placeholder="请输入内容" v-model="searchContent">
                            <el-select v-model="searchWhere" slot="prepend">
                                <el-option label="用户名" value="1"></el-option>
                                <el-option label="昵称" value="2"></el-option>
                            </el-select>
                            <el-button slot="append" icon="search"></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="2"><div class="grid-content bg-purple"><el-button  type="info" @click="handleAdd()">添加用户</el-button></div></el-col>
                    <el-col :span="2"><div class="grid-content bg-purple"><el-button  type="info" @click="handleDelete()">批量删除</el-button></div></el-col>
                </el-row>
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column
                        type="selection"
                        width="70">
                    </el-table-column>
                    <el-table-column prop="name" label="用户名" width="150" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="nickname" label="昵称" width="150" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="roles" label="角色" width="150" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="email" label="邮箱地址" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="age" label="年龄" width="100">
                    </el-table-column>
                    <el-table-column prop="sex" label="性别" width="100">
                        <template scope="scope">
                            <el-tag :type="scope.row.sex == 1 ? 'success' : 'danger'">{{scope.row.sex == 1 ? '男' : '女'}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="300">
                        <template scope="scope">
                            <el-button size="small" type="info"
                                       @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button size="small" type="success"
                                       @click="handleAssignmentRoles(scope.$index, scope.row)">角色</el-button>
                            <el-button size="small" :type="scope.row.status == 1 ? 'warning' : 'info'">
                                {{scope.row.status == 1 ? '禁用' : '启用'}}</el-button>
                            <el-button size="small" type="danger"
                                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination
                        @current-change ="handleCurrentChange"
                        layout="prev, pager, next"
                        :total="total">
                    </el-pagination>
                </div>
            </el-tab-pane>
            <el-tab-pane label="在线用户" name="online">在线用户</el-tab-pane>
            <el-tab-pane label="登录日志" name="loginLog">登录日志</el-tab-pane>
            <el-tab-pane label="用户设置" name="userSetting"></el-tab-pane>
        </el-tabs>

        <el-dialog title="角色分配" :visible.sync="roleVisible">
            <el-row type="flex" class="row-bg" justify="center">
                <el-transfer
                    filterable
                    filter-placeholder="请输入角色名称"
                    v-model="selectRoles"
                    :titles="['全部角色', '选择的角色']"
                    :data="roles">
                </el-transfer>
            </el-row>
        </el-dialog>

        <el-dialog :title="form.title" :visible.sync="editFormVisible" size="tiny">
            <el-form :model="form" label-width="40px">
                <el-form-item label="账号">
                    <el-input v-model="form.name" :disabled="form.edit"></el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="form.nickname"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="form.sex">
                        <el-radio label="1" name="sex">男</el-radio>
                        <el-radio label="0" name="sex">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="状态">
                    <el-radio-group v-model="form.status">
                        <el-radio label="1" name="status">启用</el-radio>
                        <el-radio label="0" name="status">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleSave">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeName:"userManager",
                tableData: [],
                cur_page: 1,
                total: 0,
                editFormVisible:false,
                viewFormVisible:false,
                roleVisible:false,
                searchContent: '',
                searchWhere: '1',
                form:{
                    "name" : "",
                    "nickname" : "",
                    "email" : "",
                    "sex" : "1",
                    "age" : "",
                    "status":"1",
                    "edit":"",
                    "title":""
                },
                selectRoles:[],
                roles:[
                    {
                        "label":"超级管理员",
                        "key":"1"
                    },
                    {
                        "label":"审核人员",
                        "key":"2"
                    },
                    {
                        "label":"发证人员",
                        "key":"3"
                    },
                    {
                        "label":"审批人员1",
                        "key":"4"
                    },
                    {
                        "label":"审批人员2",
                        "key":"5"
                    },{
                        "label":"审批人员3",
                        "key":"6"
                    },{
                        "label":"审批人员4",
                        "key":"7"
                    },{
                        "label":"审批人员5",
                        "key":"8"
                    }
                ]
            }
        },
        created(){
            this.getData();
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            getData(){
                this.$axios.post('/api/system/user',{page:this.cur_page}).then((res) => {
                    this.tableData = res.data.data;
                    this.total = res.data.total
                })
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleAdd(){
                this.form.title = "添加用户";
                this.editFormVisible = true;
                //如果edit为false 则是添加状态
                this.form.edit = false;

            },handleView(index, row){
                this.viewFormVisible = true;
                this.form.name = row.name;
                this.form.nickname = row.nickname;
                this.form.email = row.email;
                this.form.sex = row.sex;
                this.form.age = row.age;
                this.form.status = row.status;
            },handleAssignmentRoles(index, row){
                this.roleVisible = true;
            },
            handleEdit(index, row) {
                //打开表单
                this.form.title = "编辑用户";
                this.editFormVisible = true;
                this.form.name = row.name;
                this.form.nickname = row.nickname;
                this.form.email = row.email;
                this.form.sex = row.sex;
                this.form.age = row.age;
                this.form.status = row.status;
                //设置为编辑状态
                this.form.edit = true;
            },
            handleSave() {
                if(this.form.edit){
                    //编辑用户
                    alert("编辑用户");
                }else{
                    //添加用户
                    alert("添加用户");
                }

               //关闭弹窗
               this.editFormVisible = false;
               //清空表单
               this.form.name="";
               this.form.nickname="";
               this.form.email="";
               this.form.sex="1";
               this.form.age="";
               this.form.status = "1";
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
