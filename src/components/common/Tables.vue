<template>
    <div>
        <el-row :gutter="30" class="buttons">
            <el-col :span="2" v-if="schema.operation.add === true"><div class="grid-content bg-purple"><el-button  type="info" @click="handleAdd()">添加{{ schema.label }}</el-button></div></el-col>
        </el-row>


        <el-table :data="tableData" style="width: 100%">
            <el-table-column v-if="schema.attribute.selection === true"
                type="selection"
                width="70">
            </el-table-column>
            <el-table-column v-for="field in schema.fields" :prop="field.name" :label="field.label"
            ></el-table-column>
            <el-table-column label="操作" width="300">
                <template scope="scope">
                    <el-button size="small" type="info" v-if="schema.operation.edit === true"
                               @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" v-if="schema.operation.delete === true"
                               @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="form.title" :visible.sync="editFormVisible" size="tiny">
            <el-form label-width="80px">
                <el-form-item :label="field.label" v-for="field in schema.fields" v-if="schema.views[view === 'edit' ? 'edit' : 'add'].find((value) => {return value === field.name;})">
                    <el-input :v-model="field.name"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取 消</el-button>
                <el-button type="primary" >确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: 'mTables',
        props: {
            message: String,
            tableData:{},
            schema:{}
        },
        data() {
            return{
                editFormVisible:false,
                form:{
                    title:""
                },
                view:''
            }
        },
        created() {

        },
        methods:{
            handleEdit(index,row) {
                this.form.title = this.schema.label + "编辑";
                this.view = "edit"
                this.editFormVisible = true
            },
            handleAdd(index,row) {
                this.form.title = this.schema.label + "添加";
                this.view = "add"
                this.editFormVisible = true
            },
            handleDelete(index,row) {
                this.$confirm('你确定要删除掉所选的数据!, 是否继续?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
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


