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
            <el-upload style="display: inline-block;" multiple accept=".xls"><el-button class="gap"><i
                  class="el-icon-upload2"></i>批量导入</el-button></el-upload>
            <el-button class="gap" @click="handleDownload"><i class="el-icon-download"></i>下载模板</el-button>
            <el-button :disabled="selectControl"><i class="el-icon-download"></i>批量导出</el-button>
            <!-- 批量管理 -->
            <el-dropdown class="gap" @command="handleCommand" :disabled="selectControl">
              <el-button>批量管理<i class="el-icon-arrow-down el-icon--right"></i></el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">批量删除</el-dropdown-item>
                <el-dropdown-item command="b">批量禁用</el-dropdown-item>
                <el-dropdown-item command="c">批量启用</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button class="filter" @click="searchControl">
              筛选查询<i class="el-icon-arrow-up el-icon--right" v-if="!isShow"></i>
              <i class="el-icon-arrow-down el-icon--right" v-else></i>
            </el-button>
          </div>
          <!-- 搜索区域 -->
          <div class="search" :class="{ show: isShow }">
            <el-select v-model="value1" placeholder="请选择账号状态" clearable>
              <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-select v-model="value2" placeholder="请选择账号角色" clearable>
              <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <el-input placeholder="搜索用户姓名/账号名称" suffix-icon="el-icon-search" v-model="input" style="width: 200px;">
            </el-input>
          </div>
          <!-- 表格区域 -->
          <div class="table">
            <!-- 表格 -->
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" @selection-change="handleChange">
              <el-table-column type="selection" width="60"> </el-table-column>
              <el-table-column prop="userName" label="用户姓名" show-overflow-tooltip> </el-table-column>
              <el-table-column prop="nickName" label="账号名称" show-overflow-tooltip></el-table-column>
              <el-table-column prop="role" label="账号角色" show-overflow-tooltip> </el-table-column>
              <el-table-column prop="status" label="账号状态" width="100">
                <template slot-scope="scope">
                  <el-tag :type="scope.row.status === '禁用' ? 'warning' : 'success'" disable-transitions>{{
                    scope.row.status }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" fixed="right" width="300">
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
          </div>
          <!-- 分页 -->
          <MyPagination></MyPagination>
        </div>
      </div>
      <!-- 弹窗 -->
      <UserDialog ref="dialogUser" :title="title" :fontColor="fontColor" :text="text"></UserDialog>
    </div>
  </div>
</template>

<script>
import MyPagination from '../../../components/MyPagination.vue';
import tableData from '../../../mock/tableData.js';
import UserDialog from './UserDialog.vue';

// let id = 1000;

export default {
  components: {
    MyPagination,
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
      text: "",
      fontColor: "red",
      input: "",
      selectControl: true,
      isShow: false,
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
      this.text = "确定要对所选中的用户账号操作"
    },
    /* 启用操作 */
    start(row) {
      // row.status = '启用'
      this.$refs.dialogUser.dialogFormVisible = true;
      this.title = "启用"
      this.fontColor = "#67c7b3",
        this.text = "确定要对所选中的用户账号操作"
    },
    /* 用户删除操作 */
    handleDelete(index, row) {
      // console.log(index, row);
      // this.tableData.splice(index, 1)
      this.$refs.dialogUser.dialogFormVisible = true;
      this.title = "删除"
      this.fontColor = "red",
        this.text = "确定要对所选中的用户账号操作"
    },
    /* 树形控件 */
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    /* 编辑组织 */
    edit(data) {
      // console.log(data);
      this.$refs.dialogUser.dialogFormVisible = true;
      this.title = "编辑组织"
    },
    /* 添加组织 */
    append(data) {
      this.$refs.dialogUser.dialogFormVisible = true;
      this.title = "添加组织"
      // const newChild = { id: id++, label: 'testtest', children: [] };
      // if (!data.children) {
      //   this.$set(data, 'children', []);
      // }
      // data.children.push(newChild);
    },
    /* 删除组织 */
    remove(node, data) {
      this.$refs.dialogUser.dialogFormVisible = true;
      this.title = "删除"
      this.fontColor = "red"
      this.text = "此组织及其下方组织和人员将一并删除，确定要操作"
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
        this.text = "确定要对所选中的用户账号操作"
      } else if (command === "b") {
        this.$refs.dialogUser.dialogFormVisible = true;
        this.title = "批量禁用"
        this.fontColor = "orange"
        this.text = "确定要对所选中的用户账号操作"
      } else {
        this.$refs.dialogUser.dialogFormVisible = true;
        this.title = "批量启用"
        this.fontColor = "#67c7b3"
        this.text = "确定要对所选中的用户账号操作"
      }
    },
    /* 表格选择项发生变化 */
    handleChange() {
      if (this.$refs.multipleTable.selection.length) {
        this.selectControl = false
      } else {
        this.selectControl = true
      }
      console.log(this.$refs.multipleTable.selection);
    },
    /* 筛选查询显示和隐藏 */
    searchControl() {
      this.isShow = !this.isShow
    },
    /* 下载mob */
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
  width: 100%;

  .outer-container {
    min-width: 1150px;

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
      // height: 70vh;
      background-color: #fff;
      display: flex;
      padding: 25px 20px 30px;
      border-radius: 4px;

      .organ {
        box-sizing: border-box;
        width: 300px;
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
        flex: 1;
        margin-left: 20px;
        overflow: hidden;

        .button {
          margin-bottom: 20px;

          .gap {
            margin-left: 10px;
          }

          i {
            margin-right: 2px;
          }

          .filter {
            float: right;
          }
        }

        .search {
          display: flex;
          justify-content: flex-end;
          transition: all 0.3s;

          .el-select {
            margin-right: 10px;
            width: 160px;
          }
        }

        .show {
          display: none;
        }

        .table {
          margin-top: 20px;
          border: 1px solid #ebeef5;
          padding: 0 10px;
        }
      }
    }
  }
}
</style>