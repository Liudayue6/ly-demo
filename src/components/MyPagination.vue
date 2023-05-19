<template>
    <div style="text-align:center;margin-top: 7px;">
        <el-pagination @current-change="changePage"
            :page-sizes="[6]" :page-size="6" layout="total, sizes, prev, pager, next, jumper" :total="400" background>
        </el-pagination>
    </div>
</template>

<script>
export default {
    props: {
        total: {
            type: Number,
            default: 100
        },
        pageSize: {
            type: Number,
            default: 10
        }
    },
    methods: {
        changePage(page) {
            this.$emit('changePage', page)
        }
    }
};
</script>

<style></style>