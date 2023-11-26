<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-container>
      <el-header style="text-align: left; font-size: 50px">
        <div style="margin-top:15px;">
          <el-form-item style="text-align:left">
            <el-button type="primary" @click="addtaskvis = true">新增任务</el-button>
          </el-form-item>
          <el-form-item style="text-align:left">
            <el-button type="primary" @click="save">保存</el-button>
          </el-form-item>
          <el-form-item style="text-align:left">
            <el-button type="primary" @click="refresh">刷新</el-button>
          </el-form-item>
        </div>
      </el-header>
    </el-container>

    <el-container>
      <el-main>
        <el-table :data="tasklist" style="width: 100%" :default-sort="{prop:'taskorigin',order:'ascending'}" border fit highlight-current-row>
          <el-table-column prop="taskorigin" label="任务类型" width="180" sortable align="center" />
          <el-table-column prop="taskid" label="任务ID" width="380" sortable align="center" />
          <el-table-column prop="taskname" label="任务名称" width="380" sortable align="center" />
          <el-table-column prop="taskenv" label="任务执行环境" width="500" sortable align="center" />
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="tasklist">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="editdatas(tasklist.row.taskid)"
              />

              <el-button
                type="primary"
                icon="el-icon-delete"
                size="mini"
                @click="deletedatas(tasklist.row.taskid)"
              />
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>

    <el-container>
      <el-main>
        <el-dialog title="新增任务" :visible.sync="addtaskvis" width="30%" @close="addclose">
          <el-form ref="addref" :model="addmsg" :rules="addrule" label-width="120px">
            <el-form-item label="任务类型" prop="taskorigin">
              <el-input v-model="addmsg.taskorigin" />
            </el-form-item>
            <el-form-item label="任务ID" prop="taskid">
              <el-input v-model="addmsg.taskid" />
            </el-form-item>
            <el-form-item label="任务名称" prop="taskname">
              <el-input v-model="addmsg.taskname" />
            </el-form-item>
            <el-form-item label="任务执行环境" prop="taskenv">
              <el-input v-model="addmsg.taskenv" />
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addtaskvis = false">取 消</el-button>
            <el-button type="primary" @click="addconfirm">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog title="编辑任务" :visible.sync="edittaskvis" width="30%" @close="editclose">
          <el-form ref="editref" :model="editmsg" :rules="editrule" label-width="120px">
            <el-form-item label="任务类型" prop="taskorigin">
              <el-input v-model="editmsg.taskorigin" />
            </el-form-item>
            <el-form-item label="任务ID" prop="taskid">
              <el-input v-model="editmsg.taskid" disabled />
            </el-form-item>
            <el-form-item label="任务名称" prop="taskname">
              <el-input v-model="editmsg.taskname" />
            </el-form-item>
            <el-form-item label="任务执行环境" prop="taskenv">
              <el-input v-model="editmsg.taskenv" />
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="edittaskvis = false">取 消</el-button>
            <el-button type="primary" @click="editconfirm">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog title="操作确认" :visible.sync="deletetaskvis" width="30%" @close="deleteclose">
          <el-form ref="deleteref" :model="deletemsg" :rules="deleterule" label-width="70px">
            <h3 align="center">确定要删除该数据吗？</h3>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="deletetaskvis = false">取 消</el-button>
            <el-button type="primary" @click="deleteconfirm">确 定</el-button>
          </span>
        </el-dialog>
      </el-main>
    </el-container>
  </el-form>
</template>

<script>
import axios from 'axios'
import { constants } from 'fs'

export default {
  data() {
    return {
      tasklist: [],
      addtaskvis: false,
      addmsg: {
        taskorigin: '',
        taskid: '',
        taskname: '',
        taskenv: ''
      },
      addrule: {
        taskorigin: [{ required: true, message: '任务类型', trigger: 'blur' }],
        taskid: [{ required: true, message: '任务ID', trigger: 'blur' }],
        taskname: [{ required: true, message: '任务名称', trigger: 'blur' }],
        taskenv: [{ required: true, message: '任务执行环境', trigger: 'blur' }]
      },

      edittaskvis: false,
      editmsg: {
        taskorigin: '',
        taskid: '',
        taskname: '',
        taskenv: ''
      },
      editrule: {
        taskorigin: [{ required: true, message: '任务类型', trigger: 'blur' }],
        taskid: [{ required: true, message: '任务ID', trigger: 'blur' }],
        taskname: [{ required: true, message: '任务名称', trigger: 'blur' }],
        taskenv: [{ required: true, message: '任务执行环境', trigger: 'blur' }]
      },

      deletetaskvis: false,
      deletemsg: {
        taskid: ''
      },
      deleterule: {},
      activeNames: [''],
      formInline: {
        user: '',
        region: ''
      }
    }
  },

  created() {
    this.getdatas()
  },

  methods: {
    getdatas() {
      axios
        .post(process.env.VUE_APP_CONFIG_API + '/TaskList/getTaskdata', {
          time: decodeURI('now')
        })
        .then(response => (this.tasklist = response.data))
    },

    shownotification(str1) {
      this.$message({
        message: str1,
        center: true
      })
    },

    checkvalue(taskid) {
      var checkflag = false
      for (var i = 0; i < this.tasklist.length; i++) {
        if (taskid == this.tasklist[i].taskid) {
          checkflag = true
        }
      }
      return checkflag
    },

    save() {
      var savedatas = this.tasklist
      axios.post(
        process.env.VUE_APP_CONFIG_API + '/TaskList/save',
        savedatas
      )
      this.shownotification('保存成功!!!')
      this.refresh()
    },

    refresh() {
      axios
        .post(process.env.VUE_APP_CONFIG_API + '/TaskList/refresh', {
          time: decodeURI('now')
        })
        .then(response => (this.tasklist = response.data))
    },

    addconfirm() {
      this.$refs.addref.validate(valid => {
        if (!valid) {
          this.shownotification('请填写必填项')
        } else {
          if (this.checkvalue(this.addmsg.taskid)) {
            this.shownotification('任务ID重复,请重新填写!!!')
          } else {
            this.tasklist.push({
              taskorigin: this.addmsg.taskorigin,
              taskid: this.addmsg.taskid,
              taskname: this.addmsg.taskname,
              taskenv: this.addmsg.taskenv
            })
            axios.post(
              process.env.VUE_APP_CONFIG_API + '/TaskList/add',
              {
                taskorigin: this.addmsg.taskorigin,
                taskid: this.addmsg.taskid,
                taskname: this.addmsg.taskname,
                taskenv: this.addmsg.taskenv
              }
            )
            this.addtaskvis = false
            this.shownotification('新增任务保存成功！！！')
          }
        }
      })
    },
    addclose() {
      this.$refs.addref.resetFields()
    },

    editdatas(taskid) {
      this.edittaskvis = true
      axios
        .post(process.env.VUE_APP_CONFIG_API + '/TaskList/preedit',
          { taskid: taskid }
        )
        .then(response => (this.editmsg = response.data))
    },
    editconfirm() {
      this.$refs.editref.validate(valid => {
        if (!valid) {
          this.shownotification('请填写必填项')
        } else {
          axios.post(process.env.VUE_APP_CONFIG_API + '/TaskList/edit',
            this.editmsg
          )
          this.edittaskvis = false
          this.shownotification('保存成功！！！')
          this.refresh()
        }
      })
    },
    editclose() {
      // this.$refs.editref.resetFields();
    },

    deletedatas(taskid) {
      this.deletetaskvis = true
      this.deletemsg.taskid = taskid
    },

    deleteconfirm() {
      axios.post(process.env.VUE_APP_CONFIG_API + '/TaskList/delete',
        this.deletemsg
      )
      this.deletetaskvis = false
      this.shownotification('删除成功！！！')
      this.refresh()
    },
    deleteclose() {
      this.$refs.deleteref.resetFields()
    },
    handleChange(val) {
      console.log(val)
    }
  }
}
</script>
