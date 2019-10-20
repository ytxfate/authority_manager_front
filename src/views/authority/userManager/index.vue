<template>
    <div>
      <div>
        <QueryContainer
          :formValues="formValues"
          :queryClick="queryClick"
          :resetQueryFormValues="resetQueryFormValues"
        />
      </div>
      <div>
        <hr/>
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
    </div>
</template>

<script>
import QueryContainer from './components/QueryContainer'
import ResultContainer from './components/ResultContainer'
import { getUsersInfo } from '@/api/authority/user_manager'

export default {
  name: 'UserManager',
  data() {
    return {
      formValues: {},
      pagination: {
        pageSize: 10,
        total: 0,
        start: 0
      },
      results: []
    }
  },
  methods: {
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
      getUsersInfo({ start: this.pagination.start, size: this.pagination.pageSize }, req_dict).then(res => {
        const { response } = res
        this.results = response.data
        this.pagination.total = response.total
      })
    },
    currentChange(pageIndex) {
      this.pagination.start = (pageIndex - 1) * this.pagination.pageSize
      this.queryClick()
    },
    resetQueryFormValues() {
      this.formValues = {}
    }
  },
  components: {
    QueryContainer,
    ResultContainer
  }
}
</script>

<style scoped>
  .page {
    float: right;
    margin-right: 20px;
  }
</style>
