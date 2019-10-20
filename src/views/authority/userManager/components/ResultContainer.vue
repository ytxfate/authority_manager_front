<template>
  <div class="result-container">
    <el-table :data="results" border style="width: 100%">
      <el-table-column fixed prop="user_id" label="用户ID" width="160"/>
      <el-table-column prop="username" label="用户名称" width="300"/>
      <el-table-column prop="password" label="用户密码" />
      <el-table-column fixed="right" label="操作" width="200">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="reateRoles(scope.row)">关联角色</el-button>
          <el-button type="text" size="small" @click="deleteUser(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <RelateRolesContainer
      v-if="relateRolesDialogVisible"
      :relateRolesDialogVisible="relateRolesDialogVisible"
      :relateRolesDialogClose="relateRolesDialogClose"
      :relateRolesUserId="relateRolesUserId"
    />
  </div>
</template>

<script>
import { deleteUser } from '@/api/authority/user_manager'
import RelateRolesContainer from './RelateRolesContainer'
export default {
  name: 'ResultContainer',
  data() {
    return {
      relateRolesDialogVisible: false,
      relateRolesUserId: null
    }
  },
  props: ['results', 'queryClick'],
  methods: {
    reateRoles(row) {
      this.relateRolesDialogVisible = true
      this.relateRolesUserId = row.user_id
    },
    relateRolesDialogClose() {
      this.relateRolesDialogVisible = false
      this.relateRolesUserId = null
    },
    deleteUser(row) {
      this.$confirm(`确认删除角色（${row.name}）？`)
        .then(() => {
          deleteUser({ 'user_id': row['user_id'] }).then(res => {
            this.$message({
              type: 'success',
              message: res.msg
            })
            this.queryClick()
          })
        })
        .catch(() => {})
    }
  },
  components: {
    RelateRolesContainer
  }
}
</script>

<style scoped>
  .result-container {
    margin: 20px;
  }
</style>
