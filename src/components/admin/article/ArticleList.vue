<template>
    <div>
        <el-row style="margin-bottom: 5px;">
            <el-button type="primary" @click="handleEdit">添加文章</el-button>
            <el-button type="primary" @click="handleDelete">删除文章</el-button>
        </el-row>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                prop="title"
                label="文章标题">
            </el-table-column>
            <el-table-column
                prop="publishtime"
                label="发布时间"
                width="200">
            </el-table-column>
            <el-table-column
                prop="category"
                label="分类"
                width="120">
            </el-table-column>
            <el-table-column
                prop="tagNames"
                label="标签"
                width="300">
            </el-table-column>
            <el-table-column
                prop="author"
                label="作者"
                width="120">
            </el-table-column>
        </el-table>
        <el-dialog
            title="添加文章"
            :visible.sync="display" size="full">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="文章名称">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="文章分类" >
                    <el-select v-model="form.category" placeholder="请选择文章分类" style="width: 100%">
                        <el-option label="Java" value="Java"></el-option>
                        <el-option label="Hadoop" value="Hadoop"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章标签">
                    <el-select style="width: 100%"
                               v-model="form.tag"
                               multiple
                               filterable
                               allow-create
                               placeholder="请选择文章标签">
                        <el-option
                            v-for="item in tagList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章作者">
                    <el-input v-model="form.author"></el-input>
                </el-form-item>
                <el-form-item>

                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSubmit">立即创建</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tableData: [],
                display:false,
                form: {
                    title:'',
                    category:'',
                    tagNames:'',
                    author:''
                },
                tagList:[]
            }
        },
        created () {
            this.handleQuery();
        },
        methods : {
            handleQuery () {
                this.$axios.post('/cms/article/query',{}).then((res) => {
                    this.tableData = res.data.data.rows;
                })
            },
            handleSubmit () {
                this.$axios.post('/cms/article',{
                    title:this.form.title,
                    category:this.form.category,
                    tag:this.form.tag.toString(),
                    author:this.form.author
                }).then((res) => {
                    this.display = false;
                    this.handleQuery();
                })
            },
            handleDelete(){

            },
            handleEdit (){
                //获取标签列表
                this.$axios.post('/cms/tag/query',{}).then((res) => {
                    for(let tag of res.data.data){
                        this.tagList.push({
                            'value' : tag.id,
                            'label' : tag.name
                        });
                    }
                })
                this.display = true;
            }
        }
    }
</script>
