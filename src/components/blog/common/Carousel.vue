<template>
    <el-carousel :interval="5000" arrow="always">
        <el-carousel-item   v-for="(item,index) in carousels">
                <img :src="item.src" style="z-index: -1" width="100%"/>
                <h3 style="position: absolute;top: 200px;width: 100%;color: white;text-align: center">{{ item.title }}</h3>
                <p style="position: absolute;top: 250px;width: 100%;color: white;text-align: center">{{ item.content }}</p>
        </el-carousel-item>
    </el-carousel>
</template>
<script>
    import 'bootstrap/dist/css/bootstrap.css';
    export default{
        data () {
            return {
                carousels : ''
            }
        },
        created () {
            this.$axios.post('/cms/carousel/query',{pageSize:100000}).then((res) => {
                this.carousels = res.data.data.rows;
            })
        }
    }
</script>
<style>

</style>
