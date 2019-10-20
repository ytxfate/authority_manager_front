<template>
  <div>
    <div>
      <query-container
        :formValues="formValues"
        :queryClick="queryClick"
        :resetQueryFormValues="resetQueryFormValues"
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
      <ResultContainer :results="results" :queryClick="queryClick"/>
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
      :closeAddDialog="closeAddDialog"
      :queryClick="queryClick"
      v-if="addDialogVisible"
    />
  </div>
</template>

<script>
import QueryContainer from './components/QueryContainer'
import ResultContainer from './components/ResultContainer'
import AddDataInfo from './components/AddDataInfo'
import { getMenus } from '@/api/authority/menu_manager'

export default {
  name: 'MenuManager',
  data() {
    return {
      formValues: {
        path: '',
        component: '',
        name: '',
        meta: { title: '' },
        hidden: ''
      },
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
    queryClick(first = false) {
      if (first === true) {
        this.pagination.start = 0
      }
      const req_dict = {}
      for (const key in this.formValues) {
        if (this.formValues[key] !== '') {
          req_dict[key] = (this.formValues[key].constructor === String) ? this.formValues[key].trim() : this.formValues[key]
        }
      }
      if (req_dict.meta.title === '') {
        delete req_dict.meta
      }
      getMenus({ start: this.pagination.start, size: this.pagination.pageSize }, req_dict).then((res) => {
        const { total, data } = res.response
        this.pagination.total = total
        this.results = data
      }).catch(error => {
        console.log('queryClick', error)
      })
    },
    addDialogShow() {
      this.addDialogVisible = true
    },
    closeAddDialog() {
      this.addDialogVisible = false
    },
    currentChange(pageIndex) {
      this.pagination.start = (pageIndex - 1) * this.pagination.pageSize
      this.queryClick()
    },
    resetQueryFormValues() {
      this.formValues = { path: '', component: '', name: '', meta: { title: '' }, hidden: '' }
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
