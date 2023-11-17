<template>
  <div class="app-container">
    <!-- v-if="isUploadedFile === false" -->
    <div style="display:inline-block;">
      <upload-excel-component :on-success="handleSuccess" :before-upload="beforeUpload" />
    </div>
    <el-tag v-if="filename !== ''" closable @close="handleCloseUploadFileName(filename)">
      {{ filename }}
    </el-tag>
    <div>
      <div>
        <br>
        <div style="margin-bottom: 20px;">
          <el-button size="small" @click="addTab(editableTabsValue)">
            新增过滤方案
          </el-button>
        </div>
        <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab" @tab-click="clickTab">
          <el-tab-pane v-for="item0 in editableTabs" :key="item0.name" :label="item0.title" :name="item0.name">
            <el-button
              type="primary"
              icon="el-icon-plus"
              size="mini"
              @click.native.prevent="addRow(filterTable)"
            />
            <el-table :data="filterTable" border fit highlight-current-row style="width: 100%">
              <el-table-column label="字段" width="180">
                <template slot-scope="{row}">
                  <el-select v-model="row.key" placeholder="请选择">
                    <el-option v-for="item1 in tableHeader" :key="item1" :label="item1" :value="item1" />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="条件" width="180">
                <template slot-scope="{row}">
                  <el-select v-model="row.condition" placeholder="请选择">
                    <el-option v-for="item2 in options" :key="item2.value" :label="item2.label" :value="item2.value" />
                  </el-select>
                </template>

              </el-table-column>
              <el-table-column label="值" width="180">
                <template slot-scope="{row}">
                  <el-input v-model="row.value" class="edit-input" size="small" />
                </template>
              </el-table-column>
              <el-table-column label="" width="180">
                <template slot-scope="scope">
                  <el-button
                    type="primary"
                    icon="el-icon-minus"
                    size="mini"
                    @click.native.prevent="deleteRow(scope.$index, filterTable)"
                  />
                </template>
              </el-table-column>

            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <FilenameOption v-model="filename" />
      <el-button type="primary" icon="el-icon-search" @click.native.prevent="filterData">过滤</el-button>
      <el-button @click.native.prevent="resetData">重置</el-button>
      <el-button
        :loading="downloadLoading"
        style="margin:0 0 20px 20px;"
        type="primary"
        icon="el-icon-document"
        @click="handleDownload"
      >
        导出
      </el-button>

      <a
        href="https://panjiachen.github.io/vue-element-admin-site/feature/component/excel.html"
        target="_blank"
        style="margin-left:15px;"
      >
        <el-tag type="info">精准测试规范</el-tag>
      </a>
    </div>
    <div>
      <el-table
        ref="multipleTable"
        v-loading="listLoading"
        :data="list"
        border
        fit
        element-loading-text="Loading..."
        highlight-current-row
        style="width: 100%;margin-top:20px;"
      >
        <el-table-column v-if="tableHeader.length > 0" align="center" label="序号" width="50" type="index" />
        <el-table-column
          v-for="item of tableHeader"
          :key="item"
          :prop="item"
          :label="item"
          align="center"
          :show-overflow-tooltip="true"
          width="200px"
        />
      </el-table>
    </div>

  </div>
</template>

<script>
import { parseTime } from '@/utils'
// options components
import FilenameOption from './components/FilenameOption'
import UploadExcelComponent from './components/upload'

export default {
  name: 'ExportExcel',
  components: { FilenameOption, UploadExcelComponent },
  data() {
    return {
      list: null,
      readonlylist: null,
      listLoading: true,
      isUploadedFile: false,
      downloadLoading: false,
      filename: '',
      autoWidth: true,
      bookType: 'xlsx',
      tableHeader: [],
      editableTabsValue: '2',
      tabsData: {},
      editableTabs: [],
      tabIndex: 2,
      filterTable: [{
        'key': undefined,
        'condition': 'in',
        'value': undefined
      }],

      options: [{
        'label': '包含',
        'value': 'in'
      },
      {
        'label': '不包含',
        'value': 'notin'
      },
      {
        'label': '等于',
        'value': 'eq'
      },
      {
        'label': '不等于',
        'value': 'noteq'
      }, {
        'label': '大于等于',
        'value': 'gt'
      },
      {
        'label': '小于等于',
        'value': 'lt'
      }]

    }
  },
  created() {
    this.fetchData()
    this.initTabs()
  },
  methods: {
    initTabs() {
      this.tabsData = {
        'tab1': {
          title: '方案 1',
          name: 'tab1',
          content: [{
            'key': '用例级别',
            'condition': 'in',
            'value': 'P1'
          },
          {
            'key': '工作量（正整数，单位：分钟）',
            'condition': 'gt',
            'value': '15'
          }
          ]
        }, 'tab2': {
          title: '方案 2',
          name: 'tab2',
          content: [
            {
              'key': '',
              'condition': 'in',
              'value': ''
            }
          ]
        }
      }
      for (var key in this.tabsData) {
        this.editableTabs.push(this.tabsData[key])
      }
      this.selectTab('tab1')
    },

    fetchData() {
      this.listLoading = true

      this.listLoading = false
    },
    handleDownload() {
      if (this.readonlylist === null) {
        this.$message({
          message: '请先上传文件',
          type: 'warning'
        })
        return
      }
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const multiHeader = this.tableMultiHeader
        const header = this.tableHeader
        const filterVal = this.tableHeader
        const list = this.list
        const data = this.formatJson(filterVal, list)
        const merges = []
        excel.export_json_to_excel({
          multiHeader,
          header,
          merges,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    beforeUpload(file) {
      const isLt1M = file.size / 1024 / 1024 < 3
      if (isLt1M) {
        const parts = file.name.split('.')
        const fileNameWithoutExtension = parts.slice(0, -1).join('.')
        this.filename = '精准测试用例-' + fileNameWithoutExtension
        return true
      }

      this.$message({
        message: 'Please do not upload files larger than 1m in size.',
        type: 'warning'
      })
      return false
    },
    handleSuccess({ results, header, multiHeader }) {
      console.log('handleSuccess results', results)
      console.log('handleSuccess header', header)
      console.log('handleSuccess multiHeader', multiHeader)
      this.list = results
      this.readonlylist = results
      this.tableHeader = header
      this.listLoading = true
      this.tableMultiHeader = multiHeader
      this.listLoading = false
      this.isUploadedFile = true
      // for (let i = 0; i < this.tableHeader.length; i++) {
      //   this.keyoptions.push({

      //     "label": this.tableHeader[i],
      //     "value": this.tableHeader[i],

      //   })
      // }
    },
    handleCloseUploadFileName() {
      this.isUploadedFile = false
      this.list = null
      this.tableHeader = []
      this.filename = ''
    },
    addTab(targetName) {
      const newTabName = ++this.tabIndex + ''
      const tab = {
        title: '方案' + this.tabIndex,
        name: newTabName,
        content: [{
          'key': undefined,
          'condition': 'in',
          'value': undefined
        }]
      }
      this.editableTabs.push(tab)
      this.tabsData[newTabName] = tab
      this.editableTabsValue = newTabName
      this.filterTable = tab.content
    },
    removeTab(targetName) {
      console.log('removeTab', targetName)
      const tabs = this.editableTabs
      let activeName = this.editableTabsValue
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            const nextTab = tabs[index + 1] || tabs[index - 1]
            if (nextTab) {
              activeName = nextTab.name
            }
          }
        })
      }

      this.editableTabsValue = activeName
      this.editableTabs = tabs.filter(tab => tab.name !== targetName)
    },
    clickTab(tag) {
      const tabname = tag.name
      this.selectTab(tabname)
    },
    selectTab(tagname) {
      this.editableTabsValue = tagname
      this.filterTable = this.tabsData[tagname].content
    },
    deleteRow(index, rows) {
      rows.splice(index, 1)
    },
    addRow(data) {
      data.push({
        'key': undefined,
        'condition': 'in',
        'value': undefined
      })
    },
    filterData() {
      var filterTable = this.filterTable

      var datas = this.readonlylist
      if (datas === null) {
        this.$message({
          message: '请先上传文件',
          type: 'warning'
        })
        return
      }
      var filteredDatas = datas.filter(function(data) {
        return filterTable.every(function(filter) {
          var key = filter.key
          var condition = filter.condition
          var value = filter.value

          if (condition === 'in') {
            return data[key].includes(value)
          }

          if (condition === 'notin') {
            return !data[key].includes(value)
          }

          if (condition === 'eq') {
            return data[key] === value
          }

          if (condition === 'noteq') {
            return data[key] !== value
          }

          if (condition === 'gt') {
            return parseInt(data[key]) >= parseInt(value)
          }

          if (condition === 'lt') {
            return parseInt(data[key]) <= parseInt(value)
          }
        })
      })
      this.list = filteredDatas
      console.log(filteredDatas)
    },
    resetData() {
      this.list = this.readonlylist
    }

  }
}
</script>

<style>
.radio-label {
  font-size: 14px;
  color: #606266;
  line-height: 40px;
  padding: 0 12px 0 30px;
}
</style>
