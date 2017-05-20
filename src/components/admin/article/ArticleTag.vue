<template>
    <div>
        <el-tag
            :key="tag.id"
            v-for="tag in dynamicTags"
            :closable="true"
            :close-transition="false"
            @close="handleClose(tag.id)"
            style="margin-right: 20px;"
            :type="tag.color"
        >
            {{tag.name}}
        </el-tag>
        <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="mini"
            style="width: 100px;"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                dynamicTags: [],
                inputVisible: false,
                inputValue: ''
            };
        },
        created () {
            this.handleQuery();
        },
        methods: {
            handleQuery(){
                this.$axios.post('/cms/tag/query',{}).then((res) => {
                    this.dynamicTags = res.data.data;
                })
            },
            handleClose(id) {
                debugger
                this.$axios.delete('/cms/tag/' + id,{}).then((res) => {
                    this.handleQuery();
                })
            },
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.$axios.post('/cms/tag',{
                        name:this.inputValue
                    }).then((res) => {
                        this.handleQuery();
                    })
                }
                this.inputVisible = false;
                this.inputValue = '';
            }
        }
    }
</script>
