<template>
  <div>
    <div>
      <QueryContainer
        :formValues="formValues"
        :resetQueryFormValues="resetQueryFormValues"
        :queryClick="queryClick"
      />
    </div>
    <div>
      <hr/>
    </div>
    <div>
      <el-row>
        <el-col :offset="1">
          <el-button type="primary" @click="addDialogShow">新增</el-button>
        </el-col>
      </el-row>
    </div>
    <div>
      <ResultContainer
        :results="results"
        :queryClick="queryClick"
      />
    </div>
    <div>
      <el-pagination
        class="page"
        background
        layout="prev, pager, next, jumper"
        :page-size="pagination.pageSize"
        :total="pagination.total"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
    <AddDataInfo
      :addDialogVisible="addDialogVisible"
      :addDialogClose="addDialogClose"
      :queryClick="queryClick"
      v-if="addDialogVisible"
    />
  </div>
</template>

<script>
import QueryContainer from './components/QueryContainer'
import ResultContainer from './components/ResultContainer'
import AddDataInfo from './components/AddDataInfo'
import { getRoles } from '@/api/authority/role_manager'

export default {
  name: 'RoleManager',
  data() {
    return {
      formValues: {},
      pagination: {
        pageSize: 10,
        total: 0,
        start: 0
      },
      results: [],
      addDialogVisible: false
    }
  },
  methods: {
    resetQueryFormValues() {
      this.formValues = {}
    },
    queryClick(first = false) {
      if (first === true) {
        this.pagination.start = 0
      }
      const req_dict = {}
      for (const key in this.formValues) {
        if (this.formValues[key].trim() !== '') {
          req_dict[key] = this.formValues[key].trim()
        }
      }
      getRoles({ start: this.pagination.start, size: this.pagination.pageSize }, req_dict).then(res => {
        const { response } = res
        this.results = response.data
        this.pagination.total = response.total
      })
    },
    currentChange(pageIndex) {
      this.pagination.start = (pageIndex - 1) * this.pagination.pageSize
      this.queryClick()
    },
    addDialogShow() {
      this.addDialogVisible = true
    },
    addDialogClose() {
      this.addDialogVisible = false
    }
  },
  components: {
    QueryContainer,
    ResultContainer,
    AddDataInfo
  }
}
</script>

<style scoped>
  .page {
    float: right;
    margin-right: 20px;
  }
</style>
