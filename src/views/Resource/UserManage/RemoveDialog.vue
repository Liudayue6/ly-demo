<template>
    <div class="remove-dialog">
        <el-dialog title="删除" :visible.sync="dialogFormVisible" style="margin-top: 150px;">
            <span>此组织及其下方组织和人员将一并删除，确定要操作<span style="color: red;">[删除]</span>吗?</span>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            dialogFormVisible: false,
        }
    },
    methods: {
        confirm() {
            this.dialogFormVisible = false
            this.$message({
                showClose: true,
                message: '删除组织成功',
                type: 'success'
            });
        }
    }
}
</script>


<style lang="less" scoped></style>