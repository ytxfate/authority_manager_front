<template>
  <div class="result-container">
    <el-table :data="results" border style="width: 100%">
      <el-table-column fixed prop="role_id" label="角色ID" width="160"/>
      <el-table-column prop="name" label="角色名称" width="300"/>
      <el-table-column prop="desc" label="角色描述" />
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="relateMenus(scope.row)">绑定菜单</el-button>
          <el-button type="text" size="small" @click="showEdit(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="deleteRole(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <EditDataInfo
      :editDialogVisible="editDialogVisible"
      :editDialogClose="editDialogClose"
      :queryClick="queryClick"
      :roleInfo="roleInfo"
      v-if="editDialogVisible"
    />
    <RelateMenusDataInfo
      v-if="relateMenusDialogVisible"
      :relateMenusDialogVisible="relateMenusDialogVisible"
      :relateRoleId="relateRoleId"
      :closeRelateMenus="closeRelateMenus"
    />
  </div>
</template>

<script>
import { deleteRole } from '@/api/authority/role_manager'
import EditDataInfo from './EditDataInfo'
import RelateMenusDataInfo from './RelateMenusDataInfo'
export default {
  name: 'ResultContainer',
  data() {
    return {
      editDialogVisible: false,
      roleInfo: {},
      relateMenusDialogVisible: false,
      relateRoleId: null
    }
  },
  props: ['results', 'queryClick'],
  methods: {
    deleteRole(row) {
      this.$confirm(`确认删除角色（${row.name}）？`)
        .then(() => {
          deleteRole({ role_id: row.role_id }).then((res) => {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.queryClick()
          })
        })
        .catch(() => {})
    },
    showEdit(row) {
      this.editDialogVisible = true
      this.roleInfo = JSON.parse(JSON.stringify(row))
    },
    editDialogClose() {
      this.editDialogVisible = false
    },
    relateMenus(row) {
      this.relateMenusDialogVisible = true
      this.relateRoleId = row.role_id
    },
    closeRelateMenus() {
      this.relateMenusDialogVisible = false
      this.relateRoleId = null
    }
  },
  components: {
    EditDataInfo,
    RelateMenusDataInfo
  }
}
</script>

<style scoped>
  .result-container {
    margin: 20px;
  }
</style>
