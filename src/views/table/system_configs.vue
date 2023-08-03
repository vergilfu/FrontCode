<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-container>
      <el-header style="text-align: left; font-size: 50px">
        <div style="margin-top:15px;">
          <el-form-item style="text-align:left">
            <el-button type="primary" @click="save">新增自动化任务</el-button>
          </el-form-item>

          <el-form-item style="text-align:left">
            <el-button type="primary" @click="save">保存</el-button>
          </el-form-item>

          <el-form-item style="text-align:left">
            <el-button type="primary" @click="refresh">刷新</el-button>
          </el-form-item>

          <!-- <el-form-item style="text-align:left">
            <el-button type="primary" @click="exit">退出</el-button>
          </el-form-item>-->
        </div>
      </el-header>
    </el-container>

    <el-container>
      <el-main>
        <el-table
          ref="dragTable"
          :data="normal_list"
          row-key="id"
          border
          fit
          highlight-current-row
          style="width: 45%"
        >
          <el-table-column width="200px" align="center" label="配置项">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column width="540px" label="值">
            <template slot-scope="{row}">
              <el-input v-model="row.value" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>

    <el-container>
      <el-main>
        <el-table 
            :data="taskurl_list" 
            style="width: 45%" 
            height="200" 
            border
            :default-sort="{prop: 'name', order: 'descending'}"
          >
          <el-table-column width="200px" align="center" sortable label="任务类型">
            <template slot-scope="{row}">
              <span>{{ row.name }}</span>
            </template>
          </el-table-column>

          <el-table-column width="540px" label="任务url">
            <template slot-scope="{row}">
              <el-input v-model="row.value" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>

    <el-container>
      <el-main>
        <div>
          <el-table
            :data="task_list"
            style="width: 50%"
            height="300"
            border
            :default-sort="{prop: 'tasktype', order: 'descending'}"
          >
            <el-table-column prop="tasktype" label="日期" sortable width="180"></el-table-column>
            <el-table-column prop="taskid" label="姓名"  width="180"></el-table-column>
            <el-table-column prop="taskname" label="地址" :formatter="formatter"></el-table-column>
          </el-table>
        </div>
      </el-main>
    </el-container>
  </el-form>
</template>



<script>
import Sortable from "sortablejs";
import axios from "axios";
import { constants } from "fs";

export default {
  name: "group_configs",
  data() {
    return {
      formInline: {
        user: "",
        region: ""
      },
      normal_list: [],
      taskurl_list: [],
      task_list: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      this.listLoading = true;
      axios
        .get(process.env.VUE_APP_CONFIG_API + "/system_configs/read_normal", {})
        .then(response => (this.normal_list = response.data.datas));

      axios
        .get(
          process.env.VUE_APP_CONFIG_API + "/system_configs/read_taskurl",
          {}
        )
        .then(response => (this.taskurl_list = response.data.datas));

      axios
        .get(process.env.VUE_APP_CONFIG_API + "/system_configs/read_task", {})
        .then(response => (this.task_list = response.data.datas));
    },

    save() {
      alert(111);
    },

    refresh() {
      alert(111);
    }
  }
};
</script>

<style scoped>
.icon-star {
  margin-right: 2px;
}
.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.show-d {
  margin-top: 15px;
}
</style>
