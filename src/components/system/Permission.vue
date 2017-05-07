<template>
    <div class="table">
       <m-tables :schema="schema" message="测试" :tableData="tableData">

       </m-tables>
    </div>
</template>

<script>
    import Permission from 'models/Permission.js'
    import MTables from "../common/Tables";
    export default {
        components: {MTables},
        data() {
                return {
                tableData: [
                    {
                        "name":"用户管理",
                        "code":"user.manager"
                    }
                ],
                cur_page: 1,
                schema:Permission.state.schema
            }
        }
    }
</script>
