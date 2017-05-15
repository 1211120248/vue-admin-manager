<template>
    <el-row style="height: 100%">
        <el-col :span="4" :offset="1" class="left" style="position:fixed;top:0;left:0;">
            <el-card class="box-card logo">
                <p>周杨博客</p>
            </el-card>
            <v-menu></v-menu>
        </el-col>
        <div style="height: 100%;overflow:scroll;" >
            <el-col :span="19" style="padding-left: 10px" :offset="5">
                <el-row>
                    <router-view>
                    </router-view>
                </el-row>
            </el-col>
        </div>
    </el-row>
</template>
<script>
    import vMenu from "./common/Menu.vue";


    export default{
        components:{
            vMenu
        }
    }
</script>
<style>

    .left{
        background-color: #eee;
        height: 100%;
    }

    .center{
        background-color: #00d1b2;
    }

    .right{
        background-color: #2a88bd;
    }

    .logo{
        background-color: #3399CC;
        height: 150px;
    }

    .logo p{
        color: white;
        margin-top: 30px;
        text-align: center;
        font-size: 30px;
    }

    .mryj h3{
        color: #3399CC;
        font-size: 15px;
    }

    .mryj p{
        font-size: 12px;
        color: #77787b;
    }

    .search{
        margin-top: 20px;
        color: #3399CC;
    }

    .search h3{
        font-size: 15px;
    }

    .message{
        margin-top: 20px;
    }

    .message h3{
        color: #3399CC;
        font-size: 15px;
    }

    .message .el-card__body{
        padding: 0px;
    }

    .message .message_row{
        padding: 10px 20px;
    }

    .message .message_row span{
        font-size: 13px;
    }

    .message .message_row p{
        font-size: 12px;
        color: #77787b;
    }


</style>
