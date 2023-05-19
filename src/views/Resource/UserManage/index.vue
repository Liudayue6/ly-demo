<template>
  <div class="user-manage">
    <div class="outer-container">
      <div class="title">用户管理</div>
      <div class="inner-container">
        <!-- 组织架构 -->
        <div class="organ">
          <span class="name">组织架构</span>
          <div class="search">
            <el-input placeholder="搜索名称" v-model="filterText" suffix-icon="el-icon-search">
            </el-input>
          </div>
          <!-- 树形控件 -->
          <el-tree :data="data" node-key="id" default-expand-all :expand-on-click-node="false" :props="defaultProps"
            :filter-node-method="filterNode" class="filter-tree" ref="tree">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span>{{ node.label }}</span>
              <span>
                <!-- 编辑组织 -->
                <el-button type="text" size="mini" @click="() => edit(data)">
                  <i class="el-icon-edit" style="color:#a2a2a2; margin-left: 10px;"></i>
                </el-button>
                <!-- 删除组织 -->
                <el-button type="text" size="mini" @click="() => remove(node, data)">
                  <i class="el-icon-remove" style="color:#a2a2a2;"></i>
                </el-button>
                <!-- 添加组织 -->
                <el-button type="text" size="mini" @click="() => append(data)">
                  <i class="el-icon-circle-plus" style="color:#a2a2a2;"></i>
                </el-button>
              </span>
            </span>
          </el-tree>
        </div>
        <!-- 数据区域 -->
        <div class="manage">
          <!-- 按钮区域 -->
          <div class="button">
            <router-link to="/add-user" style="color: #fff">
              <el-button type="primary"><i class="el-icon-document-add"></i>创建用户</el-button>
            </router-link>
            <el-upload style="display: inline-block;" multiple accept=".xls"><el-button style="margin-left: 10px;"><i
                  class="el-icon-upload2"></i>批量导入</el-button></el-upload>
            <el-button style="margin-left: 10px;"><i class="el-icon-download"></i>下载模板</el-button>
            <el-button><i class="el-icon-download"></i>批量导出</el-button>
            <!-- 批量管理 -->
            <el-dropdown style="margin-left: 10px;" @command="handleCommand">
              <el-button>批量管理<i class="el-icon-arrow-down el-icon--right"></i></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">批量删除</el-dropdown-item>
                <el-dropdown-item command="b">批量禁用</el-dropdown-item>
                <el-dropdown-item command="c">批量启用</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button class="filter">筛选查询<i class="el-icon-arrow-up"></i></el-button>
          </div>
          <!-- 搜索区域 -->
          <div class="search">
            <el-select v-model="value1" placeholder="请选择账号状态" style="width: 160px; margin-left: 249px">
              <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="value2" placeholder="请选择账号角色" style="width: 160px; margin-left: 8px">
              <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-input placeholder="搜索用户姓名/账号名称" suffix-icon="el-icon-search" v-model="input2"
              style="width: 200px; margin-left: 8px">
            </el-input>
          </div>
          <!-- 表格区域 -->
          <div class="table">
            <!-- 表格 -->
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"
              style="width: 100%;border:1px solid #ebeef5;padding: 0 10px;" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column prop="userName" label="用户姓名" width="100" show-overflow-tooltip> </el-table-column>
              <el-table-column prop="nickName" label="账号名称" width="120" show-overflow-tooltip></el-table-column>
              <el-table-column prop="role" label="账号角色" width="140" show-overflow-tooltip> </el-table-column>
              <el-table-column prop="status" label="账号状态" width="100">
                <template slot-scope="scope">
                  <el-tag :type="scope.row.status === '禁用' ? 'warning' : 'success'" disable-transitions>{{
                    scope.row.status }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="medium" type="text" @click="handleCheck(scope.$index, scope.row)">查看</el-button>
                  <el-button size="medium" @click="handleEdit(scope.$index, scope.row)" type="text">编辑</el-button>
                  <el-button size="medium" type="text" v-if="scope.row.status === '启用'" style="color:orange;"
                    @click="ban(scope.row)">禁用</el-button>
                  <el-button size="medium" type="text" v-else style="color:#67c7b3;"
                    @click="start(scope.row)">启用</el-button>
                  <el-button size="medium" type="text">下载私钥</el-button>
                  <el-button size="medium" @click="handleDelete(scope.$index, scope.row)" type="text"
                    style="color:red;">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <MyPagination @changePage="changePage"></MyPagination>
          </div>
        </div>
      </div>
      <!-- 编辑弹窗 -->
      <EditDialog ref="dialogEdit"></EditDialog>
      <AddDialog ref="dialogAdd"></AddDialog>
      <RemoveDialog ref="dialogRemove"></RemoveDialog>
      <UserDialog ref="dialogUser" :title="title" :fontColor="fontColor"></UserDialog>
    </div>
  </div>
</template>

<script>
import MyPagination from '../../../components/MyPagination.vue';
import tableData from '../../../mock/tableData.js';
import EditDialog from './EditDialog.vue';
import AddDialog from './AddDialog.vue';
import RemoveDialog from './RemoveDialog.vue';
import UserDialog from './UserDialog.vue';

// let id = 1000;

export default {
  components: {
    MyPagination,
    EditDialog,
    AddDialog,
    RemoveDialog,
    UserDialog
  },
  data() {
    const data = [{
      id: 1,
      label: '一级 1',
      children: [{
        id: 4,
        label: '二级 1-1',
        children: [{
          id: 9,
          label: '三级 1-1-1'
        }, {
          id: 10,
          label: '三级 1-1-2'
        }]
      }]
    }, {
      id: 2,
      label: '一级 2',
      children: [{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 6,
        label: '二级 2-2'
      }]
    }, {
      id: 3,
      label: '一级 3',
      children: [{
        id: 7,
        label: '二级 3-1'
      }, {
        id: 8,
        label: '二级 3-2'
      }]
    }]
    return {
      options1: [
        {
          value: "选项1",
          label: "启用",
        },
        {
          value: "选项2",
          label: "禁用",
        },
      ],
      options2: [
        {
          value: "选项1",
          label: "中心管理员",
        },
        {
          value: "选项2",
          label: "综合演练靶场管理员",
        },
      ],
      value1: "",
      value2: "",
      tableData,
      filterText: '',
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      data: JSON.parse(JSON.stringify(data)),
      title: "删除",
      fontColor: "red"
    };
  },
  methods: {
    /* 用户查看操作 */
    handleCheck(index, row) {
      this.$router.push({
        path: '/details',
        query: {
          message: { ...row }
        }
      })
    },
    /* 用户编辑操作 */
    handleEdit(index, row) {
      // console.log(index, row);
      this.$router.push({
        path: '/edit-user',
        query: {
          rowData: { ...row }
        }
      })
    },
    /* 禁用操作 */
    ban(row) {
      // row.status = '禁用'
      this.$refs.dialogUser.dialogFormVisible = true;
      this.title = "禁用"
      this.fontColor = "orange"
    },
    /* 启用操作 */
    start(row) {
      // row.status = '启用'
      this.$refs.dialogUser.dialogFormVisible = true;
      this.title = "启用"
      this.fontColor = "#67c7b3"
    },
    /* 用户删除操作 */
    handleDelete(index, row) {
      // console.log(index, row);
      // this.tableData.splice(index, 1)
      this.$refs.dialogUser.dialogFormVisible = true;
      this.title = "删除"
      this.fontColor = "red"
    },
    /* 树形控件 */
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    /* 编辑组织 */
    edit(data) {
      // console.log(data);
      this.$refs.dialogEdit.dialogFormVisible = true;
    },
    /* 添加组织 */
    append(data) {
      this.$refs.dialogAdd.dialogFormVisible = true;
      // const newChild = { id: id++, label: 'testtest', children: [] };
      // if (!data.children) {
      //   this.$set(data, 'children', []);
      // }
      // data.children.push(newChild);
    },
    /* 删除组织 */
    remove(node, data) {
      this.$refs.dialogRemove.dialogFormVisible = true;
      // const parent = node.parent;
      // const children = parent.data.children || parent.data;
      // const index = children.findIndex(d => d.id === data.id);
      // children.splice(index, 1);
    },
    // 树形控件输入过滤
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    /* 批量管理*/
    handleCommand(command) {
      if (command === "a") {
        this.$refs.dialogUser.dialogFormVisible = true;
        this.title = "批量删除"
        this.fontColor = "red"
      } else if (command === "b") {
        this.$refs.dialogUser.dialogFormVisible = true;
        this.title = "批量禁用"
        this.fontColor = "orange"
      } else {
        this.$refs.dialogUser.dialogFormVisible = true;
        this.title = "批量启用"
        this.fontColor = "#67c7b3"
      }
    }
  },
  /* 树形控件输入过滤 */
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  }
};
</script>

<style lang='less' scoped>
.user-manage {
  background-color: #f0f2f5;

  .outer-container {
    width: 1240px;
    height: 650px;
    margin: 0 auto;
    margin-top: 85px;

    .title {
      line-height: 60px;
      background-color: #fff;
      margin-bottom: 20px;
      padding-left: 25px;
      font-size: 18px;
      color: #333;
      border-radius: 4px;
    }

    .inner-container {
      height: 570px;
      background-color: #fff;
      display: flex;
      padding: 25px 10px 0 25px;
      border-radius: 4px;

      .organ {
        box-sizing: border-box;
        width: 400px;
        height: 520px;
        border: 1px solid rgba(215, 215, 215, 1);
        border-radius: 4px;
        padding: 15px;

        .name {
          font-size: 15px;
          color: #333;
        }

        .search {
          margin: 20px 0;
        }

        .custom-tree-node {
          i {
            font-size: 15px;
            color: #a2a2a2;
          }
        }
      }

      .manage {
        margin-left: 20px;
        // width: 775px;
        height: 560px;

        // border: 1px solid black;
        .button {
          font-size: 15px;

          i {
            margin-right: 2px;
          }

          .filter {
            margin-left: 60px;
          }
        }

        .search {
          margin: 20px 0 10px 0;
        }

        .table {
          width: 785px;
        }
      }
    }
  }
}
</style>