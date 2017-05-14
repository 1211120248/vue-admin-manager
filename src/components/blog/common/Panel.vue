<template>
    <div>
        <div class="panel v-panel">
            <div class="panel-heading">
                <h2 class="panel-title">
                    <span>{{ title }}</span>
                </h2>
            </div>
            <div class="panel-body">
                <slot>

                </slot>
            </div>
        </div>
    </div>
</template>
<script>
    import 'bootstrap/dist/css/bootstrap.css';
    export default{
        props: {
            title : ""
        }
    }
</script>
<style>
    .v-panel{
        border:none;
    }

    .v-panel .panel-body{
        padding: 0px;
    }

    .v-panel .panel-heading{
        padding: 10px 0;
    }

    .v-panel .panel-title{
        font-size: 16px;
        font-weight: bold;
        line-height: 36px;
        color: #333;
        border-bottom: #3399CC 4px solid;
    }
</style>
