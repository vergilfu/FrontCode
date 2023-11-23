<template>
  <div class="app-container">
    <div class="filter-container">
      <el-form :inline="true" :model="listQuery" class="demo-form-inline">
        <el-row>
          <el-col :span="4">
            <el-form-item label="名称">
              <el-input
                v-model="listQuery.name"
                placeholder="名称"
                style="width: 200px;"
                class="filter-item"
                @keyup.enter.native="handleFilter(listQuery)"
              />
            </el-form-item>

          </el-col>
          <el-col :span="4">
            <el-form-item label="path">
              <el-input
                v-model="listQuery.path"
                placeholder="path"
                style="width: 200px;"
                class="filter-item"
                @keyup.enter.native="handleFilter(listQuery)"
              />
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="">
              <el-button
                v-waves
                class="filter-item"
                type="primary"
                icon="el-icon-search"
                @click="handleFilter(listQuery)"
              >
                搜索
              </el-button>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="10">
            <el-button
              class="filter-item"
              style="margin-left: 10px;"
              type="primary"
              icon="el-icon-edit"
              @click="handleCreate"
            >
              新增
            </el-button>

            <el-button
              v-waves
              :loading="downloadLoading"
              class="filter-item"
              type="primary"
              icon="el-icon-download"
              @click="handleDownload"
            >
              导出
            </el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-container style="">

      <!-- <el-aside width="200px" style="">
        <el-button type="primary" icon="el-icon-document-add" style="" circle />
        <el-button type="primary" icon="el-icon-edit" circle />
        <el-button type="danger" icon="el-icon-delete" circle />
        <el-header style="font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>操作</span>
        </el-header>
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message" />导航一</template>
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title">选项4</template>
              <el-menu-item index="1-4-1">选项4-1</el-menu-item>
            </el-submenu>
          </el-submenu>

        </el-menu>
      </el-aside> -->

      <el-container>

        <el-main>
          <el-table
            :key="tableKey"
            v-loading="listLoading"
            :data="tablelist"
            fit
            highlight-current-row
            style="width: 100%;"
            @sort-change="sortChange"
          >
            <el-table-column type="index" label="ID">
            <!-- <template slot-scope="{row}">
                        <span>{{ row.id }}</span>
                    </template> -->
            </el-table-column>
            <el-table-column label="名称" width="150px">
              <template slot-scope="{row}">
                <span>{{ row.name }}</span>
              </template>
            </el-table-column>
            <el-table-column label="path" min-width="150px">
              <template slot-scope="{row}">
                <el-popover trigger="hover" placement="top">
                  <p>URL Base: {{ VUE_APP_MOCK_SERVER + row.baseuri }}</p>
                  <p>URL全路径: {{ VUE_APP_MOCK_SERVER + row.uri }}</p>
                  <!-- <el-table :data="row">
                                <el-table-column width="150" property="basePath" label="URL Base"></el-table-column>
                                <el-table-column width="100" property="fullPath" label="URL全路径"></el-table-column>
                            </el-table> -->
                  <div slot="reference" class="name-wrapper">
                    <span class="link-type" @click="handleUpdate(row)">{{ row.uri }}</span>
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <!-- <el-table-column label="URL Base" width="150px" >
                    <template slot-scope="{row}">
                        <span>{{ row.basePath | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="URL全路径" width="150px" >
                    <template slot-scope="{row}">
                        <span>{{ row.fullPath | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
                    </template>
                </el-table-column> -->
            <el-table-column label="创建人" width="110px">
              <template slot-scope="{row}">
                <span>{{ row.creator }}</span>
              </template>
            </el-table-column>
            <el-table-column label="修改人" width="110px">
              <template slot-scope="{row}">
                <span>{{ row.modifier }}</span>
              </template>
            </el-table-column>
            <el-table-column label="修改时间" width="110px">
              <template slot-scope="{row}">
                <span>{{ row.modifytime }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Actions" width="230" class-name="small-padding fixed-width">
              <template slot-scope="{row,$index}">
                <el-button type="primary" size="mini" @click="handleUpdate(row)">
                  编辑
                </el-button>

                <el-button slot="reference" size="mini" type="danger" @click="handleDelete(row, $index)">
                  删除</el-button>
                <el-button size="mini" type="success" @click="handletest(row, 'published')">
                  测试
                </el-button>
              </template>
            </el-table-column>
          </el-table>

        </el-main>
      </el-container>
    </el-container>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="90%" top="10px">
      <el-form
        ref="dataForm"
        class="demo-form-inline"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="100px"
      >

        <el-collapse v-model="activeNames" @change="handleCollapseChange">
          <el-collapse-item title="" name="1" style="font-size: 16px; font-weight: bold;">
            <template slot="title">
              <div style="font-size: 16px; font-weight: bold;">基本信息</div>
            </template>

            <el-row>
              <el-col :span="6">
                <el-form-item label="名称" prop="name">
                  <el-input v-model="temp.name" />
                </el-form-item>

              </el-col>
              <!-- <el-col :span="6">
                                <el-form-item label="请求方法" prop="">
                                    <el-select v-model="temp.method" class="filter-item" multiple
                                        placeholder="Please select">
                                        <el-option v-for="item in httpTypeOptions" :key="item.key"
                                            :label="item.display_name" :value="item.key" />
                                    </el-select>
                                </el-form-item>
                            </el-col> -->
            </el-row>
            <el-row>
              <el-col :span="6">
                <el-form-item label="URL Path" prop="path" autosize>
                  <el-tooltip class="item" effect="dark" placement="top-start">
                    <div slot="content">填写url的patch部分，不包含查询参数（Query Parameters）<br></div>
                    <el-input v-model="temp.path" autosize />
                  </el-tooltip>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="" prop="">
                  <el-tooltip class="item" effect="dark" placement="top-start">
                    <div slot="content">是否自动添加随机的URL区分如http://ip:port/ASKC/api/user
                      <br>如果没有特殊要求（比如系统必须填写http://ip:port/api/user），请保持勾选
                    </div>
                    <el-switch
                      v-model="temp.isRandomPath"
                      active-text="添加随机path"
                      :disabled="dialogStatus !== 'create'"
                    />
                    <!-- <el-checkbox v-model="temp.isRandomPath">添加随机path</el-checkbox> -->
                  </el-tooltip>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="URL Base" prop="">

                  <el-tooltip class="item" effect="dark" placement="top-start">
                    <div slot="content">mock平台提供的URL基本信息
                      <br>你可以把这部分内容直接填写到系统配置中
                    </div>
                    <el-input v-model="temp.baseURL" :disabled="true" size="medium" />
                  </el-tooltip>
                  <el-button type="primary" icon="el-icon-document" @click="handleCopy(temp.baseURL,$event)">copy url</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="URL全路径" prop="" autosize>
                  <el-tooltip class="item" effect="dark" content="URL全路径" placement="top-start">
                    <el-input v-model="temp.fullPath" :disabled="true" size="medium" />
                  </el-tooltip>
                </el-form-item>
              </el-col>
            </el-row>
            <hr>
          </el-collapse-item>
          <el-collapse-item title="" name="2" style="font-size: 16px; font-weight: bold;">
            <template slot="title">
              <div style="font-size: 16px; font-weight: bold;">设置处理响应体前置脚本</div>
            </template>
            <div class="components-container">
              <aside style="font-size: 12px;line-height: 1.5;">
                可以为空。请输入python代码，这里的代码会在处理响应体前执行，你可以导入python标准库包
                <br>支持已传入变量request，request的用法参考：
                <br>request.method：获取请求的HTTP方法 method = request.method
                <br>request.headers：获取请求的头部信息 user_agent = request.headers.get('User-Agent')
                <br>request.args：获取请求的URL参数 name = request.args.get('name')
                <br>request.form：获取请求的表单数据 name = request.form.get('name')
                <br>request.json：获取请求的JSON数据 data = request.json
                <br>request.data：以字节形式返回原始请求体数据 body_data = request.data.decode('utf-8')
                <br>request.files：获取请求上传的文件 file = request.files['file']
                <br>request.cookies：获取请求的Cookie session_id = request.cookies.get('session_id')
                <br><br>这个脚本里面你可以设置一些变量，用于响应体格式化和后续的后置脚本处理
                <br>例如：number=zhangsan; number这个变量可以在后续处理中被使用到
              </aside>
              <div class="editor-container">
                <el-input
                  v-model="temp.response_before"
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 20 }"
                  placeholder="样例：
import time
data = request.json
number=data['number']
now = time.time()"
                />

                <!-- <json-editor ref="jsonEditor" v-model="temp.response_before" /> -->
              </div>
            </div>
            <hr>
          </el-collapse-item>
          <el-collapse-item title="" name="3">

            <template slot="title">
              <div style="font-size: 16px; font-weight: bold;">响应头配置</div>
            </template>

            <el-row>
              <el-col :span="6">
                <el-form-item prop="response_code" label="响应码">
                  <el-input v-model="temp.response_code" />
                </el-form-item>
              </el-col>
            </el-row>
            <hr>
            <div style="font-size: 16px; font-weight: bold;">设置响应头</div>
            <el-button type="success" @click="addHeaderRow">增行</el-button>
            <el-table :data="temp.response_header" stripe style="width: 50%" border>
              <el-table-column type="index" label="序号" width="60" />
              <el-table-column label="key" :rules="rules.headerkey" width="200">
                <template slot-scope="{row}">
                  <el-input v-model="row.key" class="edit-input" size="small" />
                </template>
              </el-table-column>
              <el-table-column label="value" :rules="rules.headervalue" width="200">
                <template slot-scope="{row}">
                  <el-input v-model="row.value" class="edit-input" size="small" />
                </template>
              </el-table-column>
              <el-table-column label="description" width="250">
                <template slot-scope="{row}">
                  <el-input v-model="row.description" class="edit-input" size="small" />
                </template>
              </el-table-column>
              <el-table-column label="操作" width="100">
                <template slot-scope="scope">
                  <el-button
                    type="text"
                    size="small"
                    @click.native.prevent="deleteHeaderRow(scope.$index, temp.response_header)"
                  >
                    移除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-collapse-item>
          <el-collapse-item title="" name="4" style="font-size: 16px; font-weight: bold;">
            <template slot="title">
              <div style="font-size: 16px; font-weight: bold;">响应体配置</div>
            </template>
            <div class="components-container">
              <aside style="font-size: 12px;line-height: 1.5;">
                <p v-pre>请输入响应体样本，你可以可以使用{{number}} 这种方法来格式化响应体</p>
                <p v-pre>例如：{"status":"success","number":"{{number}}"} </p>
                mock平台通过字符串的replace方法替换对应的内容

              </aside>
              <div class="editor-container">
                <el-input
                  v-model="temp.response_sample"
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 20 }"
                  :placeholder="`样例：\n${jsonPlaceholderSample}`"
                />

                <!-- <json-editor ref="jsonEditor" v-model="temp.response_after" /> -->
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="" name="5">
            <template slot="title">
              <div style="font-size: 16px; font-weight: bold;">设置处理响应体后置脚本</div>
            </template>
            <div class="components-container">
              <aside style="font-size: 12px;line-height: 1.5;">
                可以为空。请输入python代码，这里的代码会在影响前执行，你可以导入python标准库包
                <br>支持已传入变量：request(请求上下文)，response_header（响应头，dict类型）,response_body（响应体，字符串），response_code（响应状态码，int类型）

              </aside>
              <div class="editor-container">
                <el-input
                  v-model="temp.response_after"
                  type="textarea"
                  :autosize="{ minRows: 3, maxRows: 20 }"
                  placeholder="样例：
import time
now = time.time()
data = request.json
number=data['number']
if number === 'zhangsan':
    response_code=302
    response_header={'Location':'/login'}
    response_body='<html><body>302跳转</body></html>'"
                />

                <!-- <json-editor ref="jsonEditor" v-model="temp.response_after" /> -->
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="" name="6">
            <template slot="title">
              <div style="font-size: 16px; font-weight: bold;">系统信息</div>
            </template>
            <el-row>
              <el-col :span="6">
                <el-form-item label="创建时间" prop="type" autosize>
                  <el-date-picker
                    v-model="temp.createtime"
                    type="datetime"
                    :disabled="true"
                    placeholder="Please pick a date"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="创建人" prop="">
                  <el-input v-model="temp.author" :disabled="true" size="medium" />
                </el-form-item>
              </el-col>

              <el-col :span="6">
                <el-form-item label="修改人" prop="">
                  <el-input v-model="temp.modifier" :disabled="true" size="medium" />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="修改时间" prop="" autosize>
                  <el-date-picker
                    v-model="temp.modifytime"
                    type="datetime"
                    :disabled="true"
                    placeholder="Please pick a date"
                  />

                </el-form-item>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          Cancel
        </el-button>
        <el-button type="primary" @click="dialogStatus === 'create' ? createData() : updateData()">
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table :data="pvData" border fit highlight-current-row style="width: 100%">
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
import { fetchPv } from '@/api/article'

import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
// import JsonEditor from '@/components/JsonEditor'
// import axios from 'axios'
// import { TransitionGroupStub } from '@vue/test-utils'
import clip from '@/utils/clipboard' // use clipboard directly
import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive

const httpTypeOptions = [
  { key: 'POST', display_name: 'POST' },
  { key: 'GET', display_name: 'GET' },
  { key: 'PUT', display_name: 'PUT' },
  { key: 'DELTE', display_name: 'DELTE' },
  { key: 'OPTION', display_name: 'OPTION' },
  { key: 'HEAD', display_name: 'HEAD' }

]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = httpTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'List',
  components: { Pagination },
  directives: { waves, clipboard },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      VUE_APP_MOCK_SERVER: process.env.VUE_APP_MOCK_SERVER,
      jsonPlaceholderSample: `{"status": "success","number": "{{number}}"}`,
      response_before_code: '',
      activeNames: ['1'],
      tableKey: 0,
      tablelist: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        name: undefined,
        path: undefined,
        type: undefined,
        sort: '+id'
      },
      importanceOptions: [1, 2, 3],
      httpTypeOptions,
      sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
      showReviewer: false,
      temp: {
        fid: undefined
      },
      defaultTemp: {
        fid: undefined,
        name: '',
        method: 'POST',
        path: '',
        isRandomPath: true,
        basePath: '',
        baseURL: '',
        fullPath: '',
        createtime: '',
        author: '',
        modifier: '',
        modifytime: '',
        response_before: '',
        response_after: '',
        response_sample: '',
        response_header: '',
        response_code: 200
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '新增'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        name: [{ required: true, message: '名称 is required', trigger: 'change' }],
        path: [{ required: true, message: 'path is required', trigger: 'change' }],
        response_code: [{ required: true, message: '响应码 is required', trigger: 'change' }],
        sample: [{ required: true, message: '响应样例 is required', trigger: 'change' }],
        headerkey: [{ required: true, message: 'header key is required', trigger: 'change' }],
        headervalue: [{ required: true, message: 'header value is required', trigger: 'change' }]
      },
      downloadLoading: false
    }
  },
  watch: {
    'temp.path': function(newVal, oldVal) {
      // 在self.temp.path变化时执行操作
      // 获取当前的路径
      if (this.dialogStatus === 'create') {
        this.refreshOtherPath()
      }
    },
    'temp.isRandomPath': function(newVal, oldVal) {
      // 在self.temp.path变化时执行操作
      // 获取当前的路径

      if (this.dialogStatus === 'create') {
        this.initBasePath()
        this.refreshOtherPath()
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    refreshOtherPath() {
      this.temp.fullPath = ''

      if (!this.temp.path.startsWith('/') && this.temp.path.length !== 0) {
        this.temp.path = '/' + this.temp.path
      }
      let tmp_path = this.temp.basePath + this.temp.path
      tmp_path = tmp_path.replace(/\/\//g, '/')
      this.temp.fullPath = process.env.VUE_APP_MOCK_SERVER + tmp_path
      this.temp.baseURL = process.env.VUE_APP_MOCK_SERVER + this.temp.basePath
    },
    initBasePath() {
      this.temp.basePath = '/'
      if (this.temp.isRandomPath === true && this.temp.basePath === '/') {
        this.temp.basePath = '/' + this.getRandomLetters()
      }
    },
    getRandomLetters() {
      let letters = ''
      const alphabet = 'abcdefghijklmnopqrstuvwxyz'

      for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * alphabet.length)
        const letter = alphabet.charAt(randomIndex)
        letters += letter
      }

      return letters
    },
    handleCollapseChange(val) {
      console.log(val)
    },
    getList() {
      // this.listLoading = true
      this.handleFilter({})
    },
    handleFilter(form) {
      const params = {
        'name': form.name,
        'uri': form.path,
        'fid': form.fid
      }
      this.$axios.get(process.env.VUE_APP_MOCK_SERVER + '/mock/query', { params })
        .then(response => {
          this.tablelist = response.data.data
          this.total = this.tablelist.length
          this.listLoading = false
        }

        ).catch((err) => {
          this.$notify.error({
            title: '查询失败',
            message: err,
            duration: 2000
          })
          this.listLoading = false
        }
        )
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      // const { prop, order } = data
      // if (prop === 'id') {
      //     this.sortByID(order)
      // }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = { ...this.defaultTemp }
      this.temp.response_header = [{
        'key': 'Content-Type',
        'value': 'application/json',
        'description': 'Content-Type'
      }]
    },
    handleCreate() {
      this.resetTemp()
      this.initBasePath()
      this.refreshOtherPath()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    validatePathExists() {
      this.getList()
      for (let i = 0; i < this.tablelist.length; i++) {
        const data = this.tablelist[i]
        let tp = this.temp.basePath + this.temp.path
        tp = tp.replace('//', '/')
        if (data.uri === tp && data.fid !== this.temp.fid) {
          console.log('验证重复')
          return true
        }
      }
      return false
    },
    formValidateMore(valid) {
      if (!valid) {
        this.$notify.error({
          title: '失败',
          message: '必填项未输入完成',
          duration: 2000
        })
        return false
      }
      if (this.temp.response_header.length === 0) {
        this.$notify.error({
          title: '失败',
          message: 'header 不能为空',
          duration: 2000
        })
        return false
      } else {
        for (let i = 0; i < this.temp.response_header.length; i++) {
          if (this.temp.response_header[i].key === undefined || this.temp.response_header[i].value === undefined) {
            this.$notify.error({
              title: '失败',
              message: '响应头的 key value应填写完整',
              duration: 2000
            })
            return false
          }
        }
      }
      if (this.validatePathExists() === true) {
        this.$notify.error({
          title: '失败',
          message: 'path 已存在，请勿重复新增，或者关闭页面后重新打开',
          duration: 2000
        })
        return false
      }
      return true
    },
    handlePostCallback(res) {
      console.log(res)
      if (res.status !== 200 || res.data.status !== 'success') {
        this.$notify.error({
          title: '失败',
          message: '响应报错：' + res.data,
          duration: 2000
        })
      } else {
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: 'Successfully',
          type: 'success',
          duration: 2000
        })
      }
    },
    postData(url, data) {
      this.$axios({
        method: 'post',
        url: process.env.VUE_APP_MOCK_SERVER + url,
        data: data
        // withCredentials: true,
        // headers: {
        //   'Referrer-Policy': 'no-referrer-when-downgrade'
        // }
      }).then(response => {
        this.handlePostCallback(response)
        this.getList()
      }).catch((err) => {
        this.$notify.error({
          title: '失败',
          message: err,
          duration: 2000
        })
      }
      )
    },
    createData() {
      const uri = this.temp.basePath + this.temp.path
      const data = {
        'after': this.temp.response_after,
        'before': this.temp.response_before,
        'creator': '1',
        'do_make': '',
        'name': this.temp.name,
        'response_code': this.temp.response_code,
        'response_header': this.temp.response_header,
        'response_sample': this.temp.response_sample,
        'uri': uri.replace('//', '/'),
        'baseuri': this.temp.path
      }
      const url = '/mock/add'

      this.$refs['dataForm'].validate((valid) => {
        const ispass = this.formValidateMore(valid)
        if (ispass) {
          this.postData(url, data)
        }
      })
    },
    resetEditData(row) {
      this.temp = {
        fid: row.fid,
        path: row.uri,
        name: row.name,
        isRandomPath: row.uri !== row.baseuri,
        basePath: '',
        baseURL: '',
        fullPath: this.VUE_APP_MOCK_SERVER + row.uri,
        createtime: row.createtime,
        author: row.creator,
        modifier: row.modifier,
        modifytime: row.modifytime,
        response_before: row.before,
        response_after: row.after,
        response_sample: row.response_sample,
        response_header: JSON.parse(row.response_header),
        response_code: row.response_code
      }
      this.temp.basePath = row.uri.replace(row.baseuri, '')
      this.temp.path = row.uri.replace(this.temp.basePath, '')
      this.temp.baseURL = this.VUE_APP_MOCK_SERVER + this.temp.basePath
      this.temp.fullPath = this.VUE_APP_MOCK_SERVER + this.temp.basePath + this.temp.path
    },
    handleUpdate(row) {
      this.dialogFormVisible = true
      this.resetEditData(row)
      this.dialogStatus = 'update'
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      const uri = this.temp.basePath + this.temp.path
      const data = {
        'fid': this.temp.fid,
        'after': this.temp.response_after,
        'before': this.temp.response_before,
        'creator': '1',
        'do_make': '',
        'name': this.temp.name,
        'response_code': this.temp.response_code,
        'response_header': this.temp.response_header,
        'response_sample': this.temp.response_sample,
        'uri': uri.replace('//', '/'),
        'baseuri': this.temp.path
      }
      const url = '/mock/update'
      // TODO 更新动作没有完成
      this.$refs['dataForm'].validate((valid) => {
        const ispass = this.formValidateMore(valid)
        if (ispass) {
          this.postData(url, data)
        }
      })
      // let valid = this.formValidateMore()
      // if (valid === false) {
      //     return
      // }

      // this.dialogFormVisible = false
      // this.$notify({
      //     title: '更新成功',
      //     message: 'Update Successfully',
      //     type: 'success',
      //     duration: 2000
      // })
    },
    handleDelete(row, index) {
      const url = '/mock/delete1'
      const data = {
        'fid': row.fid
      }
      this.postData(url, data)

      // this.list.splice(index, 1)
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v => filterVal.map(j => {
        if (j === 'timestamp') {
          return parseTime(v[j])
        } else {
          return v[j]
        }
      }))
    },
    getSortClass: function(key) {
      // const sort = this.listQuery.sort
      // return sort === `+${key}` ? 'ascending' : 'descending'
      console.log('getSortClass')
    },

    addHeaderRow() {
      this.temp.response_header.push({})
      console.log(this.temp.response_header)
    },
    deleteHeaderRow(index, rows) {
      rows.splice(index, 1)
    },
    handleCopy(text, event) {
      clip(text, event)
    },
    clipboardSuccess() {
      this.$message({
        message: 'Copy successfully',
        type: 'success',
        duration: 1500
      })
    }

  }

}
</script>

<style scoped>
.editor-container {
    position: relative;
    height: 100%;
}
</style>

