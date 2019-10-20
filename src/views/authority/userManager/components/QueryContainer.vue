<template>
  <div class="query-container">
    <el-form :inline="true" :model="formValues" class="demo-form-inline">
      <el-row :gutter="20">
        <el-col :span="6" :offset="2">
          <el-form-item label="用户名称">
            <el-input v-model="formValues.username" placeholder="用户名称" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6" :offset="16">
          <el-form-item>
            <el-button type="primary" @click="queryClick(true)">查询</el-button>
            <el-button type="primary" @click="resetQueryFormValues">重置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'QueryContainer',
  props: ['formValues', 'queryClick', 'resetQueryFormValues']
}
</script>

<style scoped>
  .query-container {
    margin-top: 20px;
  }
</style>
