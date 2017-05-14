<template>
    <el-row style="height: 100%">
        <el-col :span="4" :offset="1" class="left" style="overflow:scroll;">
            <el-card class="box-card logo">
                <p>周杨博客</p>
            </el-card>
            <v-menu></v-menu>
        </el-col>
        <div style="height: 100%;overflow:scroll;">
            <el-col :span="16" style="height: 100%;">
                <v-carousel></v-carousel>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span style="line-height: 36px;">热门排行</span>
                    </div>
                    <div class="text item">
                        <el-card class="article">
                            <el-row>
                                <el-col :span="6">
                                    <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1917280723,3303033225&fm=23&gp=0.jpg" style="height: 80px"/>
                                </el-col>
                                <el-col :span="17" :offset="1">
                                    <h3>Spring深入源码解析</h3>
                                    <p class="detail"> Spring 设计的核心 org.springframework.beans 包（架构核心是org.springframework.core包），它的设计目标是与 JavaBean 组件一起使用。这个包通常不是由用户直接使用，而是由服务器将其用作其他多数功能的底层中介。下一个最高级抽象是 BeanFactory 接口，它是工厂设计模式的实现，允许通过名称创建和检索对象。</p>
                                </el-col>
                            </el-row>
                        </el-card>
                        <el-card class="article">
                            <el-row>
                                <el-col :span="6">
                                    <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1917280723,3303033225&fm=23&gp=0.jpg" style="height: 80px"/>
                                </el-col>
                                <el-col :span="17" :offset="1">
                                    <h3>Spring深入源码解析</h3>
                                    <p class="detail"> Spring 设计的核心 org.springframework.beans 包（架构核心是org.springframework.core包），它的设计目标是与 JavaBean 组件一起使用。这个包通常不是由用户直接使用，而是由服务器将其用作其他多数功能的底层中介。下一个最高级抽象是 BeanFactory 接口，它是工厂设计模式的实现，允许通过名称创建和检索对象。</p>
                                </el-col>
                            </el-row>
                        </el-card>
                        <el-card class="article">
                            <el-row>
                                <el-col :span="6">
                                    <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1917280723,3303033225&fm=23&gp=0.jpg" style="height: 80px"/>
                                </el-col>
                                <el-col :span="17" :offset="1">
                                    <h3>Spring深入源码解析</h3>
                                    <p class="detail"> Spring 设计的核心 org.springframework.beans 包（架构核心是org.springframework.core包），它的设计目标是与 JavaBean 组件一起使用。这个包通常不是由用户直接使用，而是由服务器将其用作其他多数功能的底层中介。下一个最高级抽象是 BeanFactory 接口，它是工厂设计模式的实现，允许通过名称创建和检索对象。</p>
                                </el-col>
                            </el-row>
                        </el-card>
                        <el-card class="article">
                            <el-row>
                                <el-col :span="6">
                                    <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1917280723,3303033225&fm=23&gp=0.jpg" style="height: 80px"/>
                                </el-col>
                                <el-col :span="17" :offset="1">
                                    <h3>Spring深入源码解析</h3>
                                    <p class="detail"> Spring 设计的核心 org.springframework.beans 包（架构核心是org.springframework.core包），它的设计目标是与 JavaBean 组件一起使用。这个包通常不是由用户直接使用，而是由服务器将其用作其他多数功能的底层中介。下一个最高级抽象是 BeanFactory 接口，它是工厂设计模式的实现，允许通过名称创建和检索对象。</p>
                                </el-col>
                            </el-row>
                        </el-card>
                        <div class="block">
                            <el-pagination
                                :page-size="100"
                                layout="total, prev, pager, next"
                                :total="1000">
                            </el-pagination>
                        </div>
                    </div>
                </el-card>
            </el-col>
            <el-col :span="7" style="margin-left: 10px;">
                <el-card class="box-card mryj">
                    <div slot="header">
                        <h3>2015年11月1日 星期日</h3>
                    </div>
                    <div class="text item">
                        <p>我不敢再回想过去那些事情，因为经历了岁月的洗礼后，那些曾经稀松平常的小事件，在此刻却被赋予了新的意义，让我产生一种带着眼前这个紧抱着我的女人，私奔到天涯海角</p>
                    </div>
                </el-card>
                <el-card class="box-card search">
                    <div slot="header">
                        <h3>搜索</h3>
                    </div>
                    <div class="text item">
                        <el-input placeholder="请输入内容">
                            <el-button slot="append" icon="search"></el-button>
                        </el-input>
                    </div>
                </el-card>
                <el-card class="message">
                    <div slot="header">
                        <h3>留言</h3>
                    </div>
                    <div class="text item">
                        <div class="message_row">
                            <el-row>
                                <el-col :span="6">
                                    <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1917280723,3303033225&fm=23&gp=0.jpg" style="height: 30px"/>
                                </el-col>
                                <el-col :span="17" :offset="1">
                                    <span>Mocker(2017年05月11日)说:</span>
                                    <p>希望作者能写下Aop的原理</p>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="message_row">
                            <el-row>
                                <el-col :span="6">
                                    <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1917280723,3303033225&fm=23&gp=0.jpg" style="height: 30px"/>
                                </el-col>
                                <el-col :span="17" :offset="1">
                                    <span>Mocker(2017年05月11日)说:</span>
                                    <p>希望作者能写下Aop的原理</p>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="message_row">
                            <el-row>
                                <el-col :span="6">
                                    <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1917280723,3303033225&fm=23&gp=0.jpg" style="height: 30px"/>
                                </el-col>
                                <el-col :span="17" :offset="1">
                                    <span>Mocker(2017年05月11日)说:</span>
                                    <p>希望作者能写下Aop的原理</p>
                                </el-col>
                            </el-row>
                        </div>
                        <div class="message_row">
                            <el-row>
                                <el-col :span="6">
                                    <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1917280723,3303033225&fm=23&gp=0.jpg" style="height: 30px"/>
                                </el-col>
                                <el-col :span="17" :offset="1">
                                    <span>Mocker(2017年05月11日)说:</span>
                                    <p>希望作者能写下Aop的原理</p>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </div>
    </el-row>
</template>
<script>
    import vMenu from "./common/Menu.vue";
    import vCarousel from "./common/Carousel.vue";

    export default{
        components:{
            vMenu,vCarousel
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

    .article{
        margin-bottom: 10px;
    }

    .article .detail{
        font-size: 12px;
        color: #77787b;
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
