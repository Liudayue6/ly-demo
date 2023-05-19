<template>
    <div class="add-user">
        <div class="title">创建用户</div>
        <Message></Message>
    </div>
</template>

<script>
import Message from '../../../components/Message.vue';
export default {
    components:{
        Message
    }
}
</script>


<style lang="less" scoped>
.add-user {
    width: 1220px;
    height: 680px;
    margin: 0 auto;
    margin-top: 90px;
    background-color: #fff;

    .title {
        line-height: 60px;
        font-size: 16px;
        margin: 0 30px;
        border-bottom: 1px solid #d7d7d7;
    }
}
</style>