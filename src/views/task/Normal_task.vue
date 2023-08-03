<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-container>
      <el-header style="text-align: left; font-size: 50px">
        <div style="margin-top:15px;">
          <el-form-item style="text-align:left">
            <el-button type="primary" @click="addtask">新增任务</el-button>
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
      <el-header style="text-align: left; font-size: 50px">
        <el-form-item label>
          <el-select v-model="groupname" placeholder="请选择用户组">
            <el-option v-for="item in groups" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-header>
    </el-container>

    <el-container>
      <el-main>
        <el-table :data="taskmanagement" style="width: 100%" :default-sort="{prop:'taskorigin',order:'ascending'}" border fit highlight-current-row>
          <el-table-column prop="taskorigin" label="任务类型" width="180" sortable align="center"></el-table-column>
          <el-table-column prop="taskid" label="任务ID" width="180" sortable align="center"></el-table-column>
          <el-table-column prop="taskname" label="任务名称" width="180" sortable align="center"></el-table-column>
          <el-table-column prop="taskfrequency" label="任务通知频率" width="180" sortable align="center"></el-table-column>

          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="taskmanagement">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="edittask(taskmanagement.row.taskid)"
              ></el-button>

              <el-button
                type="primary"
                icon="el-icon-delete"
                size="mini"
                @click="deletetask(taskmanagement.row.taskid)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>

    <el-container>
      <el-main>
        <el-dialog title="新增任务" :visible.sync="addtaskvis" width="30%" @close="addtaskclose">
          <el-form :model="addmsg" :rules="addrule" ref="addref" label-width="110px">
            <el-form-item label="taskselect" prop="taskselect">
              
              <el-select v-model="selectvalue" placeholder="请选择">
                <el-option
                  v-for="item in selectitems"
                  :key="item.selectvalue"
                  :label="item.label"
                  :value="item.selectvalue"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="任务通知频率" prop="taskfrequency">
              <div class="block">
                <span class="demonstration"></span>
                <el-cascader
                  v-model="addmsg.taskfrequency"
                  :options="options"
                  :props="{ expandTrigger: 'hover' }"
                  @change="handleChange"
                ></el-cascader>
              </div>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="addtaskvis = false">取 消</el-button>
            <el-button type="primary" @click="addconfirm">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog title="编辑任务" :visible.sync="edittaskvis" width="30%" @close="edittaskclose">
          <el-form :model="editmsg" :rules="editrule" ref="editref" label-width="110px">
            <el-form-item label="任务类型" prop="taskorigin">
              <el-input v-model="editmsg.taskorigin" disabled></el-input>
            </el-form-item>
            <el-form-item label="任务ID" prop="taskid">
              <el-input v-model="editmsg.taskid"></el-input>
            </el-form-item>
            <el-form-item label="任务名称" prop="taskname">
              <el-input v-model="editmsg.taskname"></el-input>
            </el-form-item>
            <el-form-item label="任务通知频率" prop="taskfrequency">
              <div class="block">
                <span class="demonstration"></span>
                <el-cascader
                  v-model="editmsg.taskfrequency"
                  :options="options"
                  :props="{ expandTrigger: 'hover' }"
                  @change="handleChange"
                ></el-cascader>
              </div>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="edittaskvis = false">取 消</el-button>
            <el-button type="primary" @click="editconfirm">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog title="操作确认" :visible.sync="deletetaskvis" width="30%" @close="deletetaskclose">
          <el-form :model="deletemsg" :rules="deleterule" ref="deleteref" label-width="70px">
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
import axios from "axios";
import { constants } from "fs";
export default {
  data() {
    return {
      options: [
        {
          value: "0",
          label: "每小时",
          children: [
            {
              value: "1",
              label: "上午每小时通知一次",
              children: [
                {
                  value: "1",
                  label: "下午每小时通知一次"
                },
                {
                  value: "2",
                  label: "下午每小时通知两次"
                },
                {
                  value: "3",
                  label: "下午每小时通知三次"
                }
              ]
            },
            {
              value: "2",
              label: "上午每小时通知两次",
              children: [
                {
                  value: "1",
                  label: "下午每小时通知一次"
                },
                {
                  value: "2",
                  label: "下午每小时通知两次"
                },
                {
                  value: "3",
                  label: "下午每小时通知三次"
                }
              ]
            },
            {
              value: "3",
              label: "上午每小时通知三次",
              children: [
                {
                  value: "1",
                  label: "下午每小时通知一次"
                },
                {
                  value: "2",
                  label: "下午每小时通知两次"
                },
                {
                  value: "3",
                  label: "下午每小时通知三次"
                }
              ]
            }
          ]
        },
        ,
        {
          value: "1",
          label: "每天通知两次"
        },
        {
          value: "2",
          label: "每周通知两次"
        }
      ],
      selectitems: [
        {
          selectvalue: {},
          label: ""
        }
      ],
      selectvalue: {},
      taskmanagement: [],
      groupname: "共享组",
      groups: [],

      addtaskvis: false,
      addmsg: {
        groupname: "",
        taskid: "",
        taskname: "",
        taskorigin: "",
        taskfrequency: ""
      },
      addrule: {
        taskid: [{ required: true, message: "请输入taskid", trigger: "blur" }],
        taskname: [
          { required: true, message: "请输入任务名称", trigger: "blur" }
        ],
        taskorigin: [
          { required: true, message: "请输入任务类型", trigger: "blur" }
        ],
        taskfrequency: [
          { required: true, message: "请输入任务通知频率", trigger: "blur" }
        ]
      },

      edittaskvis: false,
      editmsg: {
        groupname: "",
        taskid: "",
        taskname: "",
        taskorigin: "",
        taskfrequency: ""
      },
      editrule: {
        taskid: [{ required: true, message: "请输入taskid", trigger: "blur" }],
        taskname: [
          { required: true, message: "请输入任务名称", trigger: "blur" }
        ],
        taskorigin: [
          { required: true, message: "请输入任务类型", trigger: "blur" }
        ],
        taskfrequency: [
          { required: true, message: "请输入任务通知频率", trigger: "blur" }
        ]
      },

      deletetaskvis: false,
      deletemsg: {
        taskid: ""
      },
      deleterule: {},

      activeNames: [""],
      formInline: {
        user: "",
        region: ""
      }
    };
  },

  created() {
    this.getGroups();
    this.getTaskdata();
  },

  methods: {
    getGroups() {
      axios
        .post(process.env.VUE_APP_CONFIG_API + "/Normaltask/getGroups", {
          groupname: decodeURI("共享组")
        })
        .then(response => (this.groups = response.data));
    },

    getTaskdata() {
      axios
        .post(process.env.VUE_APP_CONFIG_API + "/Normaltask/getTaskdata", {
          groupname: decodeURI("共享组")
        })
        .then(response => (this.taskmanagement = response.data));
    },

    shownotification(str1) {
      this.$message({
        message: str1,
        center: true
      });
    },

    checkvalue(taskid) {
      var checkflag = false;
      for (var i = 0; i < this.taskmanagement.length; i++) {
        if (taskid == this.taskmanagement[i].taskid) {
          checkflag = true;
        }
      }
      return checkflag;
    },

    save() {
      var savedatas = {
        groupname: this.groupname,
        taskmanagement: this.taskmanagement
      };
      axios.post(
        process.env.VUE_APP_CONFIG_API + "/Normaltask/save",
        savedatas
      );
      this.shownotification("保存成功!!!");
      this.refresh();
    },

    refresh() {
      axios
        .post(process.env.VUE_APP_CONFIG_API + "/Normaltask/refresh", {
          groupname: this.groupname
        })
        .then(response => (this.taskmanagement = response.data));
    },

    addtask() {
      axios
        .post(process.env.VUE_APP_CONFIG_API + "/Normaltask/getLookupvalue", {
          groupname: this.groupname,
          tasklist: this.taskmanagement
        })
        .then(response => (this.selectitems = response.data));
      this.addtaskvis = true;
    },

    addconfirm() {
      this.$refs.addref.validate(valid => {
        if (!valid) {
          this.shownotification(
            "请填写任务类型、任务ID、任务名称及任务通知频率"
          );
        } else {
          console.log(this.selectvalue)
          this.taskmanagement.push({
            taskorigin: this.selectvalue.taskorigin,
            taskid: this.selectvalue.taskid,
            taskname: this.selectvalue.taskname,
            taskfrequency: this.addmsg.taskfrequency
          });
          axios.post(process.env.VUE_APP_CONFIG_API + "/Normaltask/addtask", {
            groupname: this.groupname,
            taskmanagement: this.taskmanagement
          });
          this.addtaskvis = false;
          this.shownotification("新增任务信息保存成功！！！");
        }
      });
    },

    addtaskclose() {
      this.$refs.addref.resetFields();
    },

    edittask(taskid) {
      this.edittaskvis = true;
      axios
        .post(process.env.VUE_APP_CONFIG_API + "/Normaltask/preedit", {
          groupname: this.groupname,
          taskid: taskid
        })
        .then(response => (this.editmsg = response.data));
    },

    editconfirm() {
      this.$refs.editref.validate(valid => {
        if (!valid) {
          this.shownotification(
            "请填写任务类型、任务ID、任务名称及任务通知频率"
          );
        } else {
          console.log(this.editmsg);
          axios.post(process.env.VUE_APP_CONFIG_API + "/Normaltask/edit", {
            groupname: this.groupname,
            editmsg: this.editmsg
          });
          this.edittaskvis = false;
          this.shownotification("保存成功！！！");
          this.refresh();
        }
      });
    },

    edittaskclose() {
      // this.$refs.editref.resetFields();
    },

    deletetask(taskid) {
      this.deletetaskvis = true;
      this.deletemsg.taskid = taskid;
    },

    deleteconfirm() {
      axios.post(process.env.VUE_APP_CONFIG_API + "/Normaltask/delete", {
        groupname: this.groupname,
        taskid: this.deletemsg.taskid
      });
      this.deletetaskvis = false;
      this.shownotification("删除成功！！！");
      this.refresh();
    },
    deletetaskclose() {
      this.$refs.deleteref.resetFields();
    },
    handleChange(val) {
      console.log(val);
    }
  },
  watch: {
    groupname(newVal, oldVal) {
      axios
        .post(process.env.VUE_APP_CONFIG_API + "/Normaltask/getTaskdata", {
          groupname: decodeURI(newVal)
        })
        .then(response => (this.taskmanagement = response.data));
    }
  }
};
</script>