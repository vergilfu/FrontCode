<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-container>
      <el-header style="text-align: left; font-size: 50px">
        <div style="margin-top:15px;">
          <el-form-item style="text-align:left">
            <el-button type="primary" @click="addgroupvis = true">新增用户组</el-button>
          </el-form-item>

          <el-form-item style="text-align:left">
            <el-button type="primary" @click="addpersonvis = true">新增成员</el-button>
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

      <el-main>
        <el-collapse v-model="activeNames" style="width: 60%" @change="handleChange">
          <el-collapse-item title="消息通知机器人地址" name="1">
            <el-input style="width:900px;" placeholder="消息机器人地址" v-model="roboturl" clearable></el-input>
          </el-collapse-item>

          <el-collapse-item title="用户组工作日历" name="2">
            <table>
              <tr>
                <td align="center">
                  <h4>上午工作时间</h4>
                </td>
                <td align="center">
                  <h4>下午工作时间</h4>
                </td>
              </tr>

              <tr>
                <td>
                  <el-time-select
                    placeholder="起始时间"
                    v-model="worktimemorningonduty"
                    :picker-options="{
                start: '06:00',
                step: '00:15',
                end: '12:00'
                }"
                  ></el-time-select>
                  <el-time-select
                    placeholder="结束时间"
                    v-model="worktimemorningoffduty"
                    :picker-options="{
                start: '06:00',
                step: '00:15',
                end: '12:00',
                minTime: worktimemorningonduty
                }"
                  ></el-time-select>
                </td>

                <td>
                  <el-time-select
                    placeholder="起始时间"
                    v-model="worktimeafternoononduty"
                    :picker-options="{
                start: '12:00',
                step: '00:15',
                end: '22:00'
                }"
                  ></el-time-select>
                  <el-time-select
                    placeholder="结束时间"
                    v-model="worktimeafternoonoffduty"
                    :picker-options="{
                start: '12:00',
                step: '00:15',
                end: '22:00',
                minTime: worktimeafternoononduty
                }"
                  ></el-time-select>
                </td>
              </tr>
            </table>
          </el-collapse-item>
        </el-collapse>
      </el-main>
    </el-container>

    <el-container>
      <el-main>
        <el-table :data="personlist" style="width: 100%" :default-sort="{prop:'personnumber',order:'ascending'}"  border fit highlight-current-row > 
          <el-table-column prop="personnumber" label="编号" width="180" align="center" sortable></el-table-column>
          <el-table-column prop="personname" label="姓名" width="180" align="center" sortable></el-table-column>
          <el-table-column prop="personphone" label="电话" width="300" align="center" sortable></el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="personlist">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="editperson(personlist.row.personnumber)"
              ></el-button>

              <el-button
                type="primary"
                icon="el-icon-delete"
                size="mini"
                @click="deleteperson(personlist.row.personnumber)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>

    <el-container>
      <el-main>
        
        <el-dialog title="新增成员" :visible.sync="addpersonvis" width="30%" @close="addpersonclose">
          <el-form :model="addmsg" :rules="addrule" ref="addref" label-width="70px">
            <el-form-item label="编号" prop="personnumber">
              <el-input v-model="addmsg.personnumber"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="personname">
              <el-input v-model="addmsg.personname"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="personphone">
              <el-input v-model="addmsg.personphone"></el-input>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="addpersonvis = false">取 消</el-button>
            <el-button type="primary" @click="addconfirm">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog title="编辑成员" :visible.sync="editpersonvis" width="30%" @close="editpersonclose">
          <el-form :model="editmsg" :rules="editrule" ref="editref" label-width="70px">
            <el-form-item label="编号" prop="personnumber">
              <el-input v-model="editmsg.personnumber" disabled></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="personname">
              <el-input v-model="editmsg.personname"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="personphone">
              <el-input v-model="editmsg.personphone"></el-input>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="editpersonvis = false">取 消</el-button>
            <el-button type="primary" @click="editconfirm">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog
          title="操作确认"
          :visible.sync="deletepersonvis"
          width="30%"
          @close="deletepersonclose"
        >
          <el-form :model="deletemsg" :rules="deleterule" ref="deleteref" label-width="70px">
            <h3 align="center">确定要删除该数据吗？</h3>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="deletepersonvis = false">取 消</el-button>
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
// import { shownotification } from "@/DIYpackage/Normal_method"

export default {
  data() {
    return {
      worktimemorningonduty: "",
      worktimemorningoffduty: "",
      worktimeafternoononduty: "",
      worktimeafternoonoffduty: "",
      roboturl: "",

      groupdata: {},
      personlist: [],
      groupname: "共享组",
      groups: [],

      addpersonvis: false,
      addmsg: {
        groupname: "",
        personnumber: "",
        personname: "",
        personphone: ""
      },
      addrule: {
        personnumber: [
          { required: true, message: "请输入编号", trigger: "blur" }
        ],
        personname: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ],
        personphone: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ]
      },

      editpersonvis: false,
      editmsg: {
        groupname: "",
        personnumber: "",
        personname: "",
        personphone: ""
      },
      editrule: {
        personnumber: [
          { required: true, message: "请输入编号", trigger: "blur" }
        ],
        personname: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ],
        personphone: [
          { required: true, message: "请输入手机号", trigger: "blur" }
        ]
      },

      deletepersonvis: false,
      deletemsg: {
        personnumber: ""
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
    this.getGroupsdata();
  },

  methods: {
    getGroups() {
      axios
        .post(process.env.VUE_APP_CONFIG_API + "/GroupConfigs/getGroups", {
          groupname: decodeURI("共享组")
        })
        .then(response => (this.groups = response.data));
    },

    getGroupsdata() {
      axios
        .post(process.env.VUE_APP_CONFIG_API + "/GroupConfigs/getGroupDatas", {
          groupname: decodeURI("共享组")
        })
        .then(response => (this.groupdata = response.data));
    },

    shownotification(str1) {
      this.$message({
        message: str1,
        center: true
      });
    },

    checkvalue(personnumber) {
      var checkflag = false;
      for (var i = 0; i < this.personlist.length; i++) {
        if (personnumber == this.personlist[i].personnumber) {
          checkflag = true;
        }
      }
      return checkflag;
    },

    save() {
      var savedatas = {
        groupname: this.groupname,
        roboturl: this.roboturl,
        worktimemorningonduty: this.worktimemorningonduty,
        worktimemorningoffduty: this.worktimemorningoffduty,
        worktimeafternoononduty: this.worktimeafternoononduty,
        worktimeafternoonoffduty: this.worktimeafternoonoffduty,
        personlist: this.personlist
      };
      axios.post(
        process.env.VUE_APP_CONFIG_API + "/GroupConfigs/save",
        savedatas
      );
      this.shownotification("保存成功!!!");
      this.refresh();
    },

    refresh() {
      axios
        .post(process.env.VUE_APP_CONFIG_API + "/GroupConfigs/refresh", {
          groupname: this.groupname
        })
        .then(response => (this.groupdata = response.data));
    },

    addconfirm() {
      this.$refs.addref.validate(valid => {
        if (!valid) {
          this.shownotification("请填写编号、姓名及手机号");
        } else {
          if (this.checkvalue(this.addmsg.personnumber)) {
            this.shownotification("编码重复，请重新填写！！！");
          } else {
            this.personlist.push({
              personnumber: this.addmsg.personnumber,
              personname: this.addmsg.personname,
              personphone: this.addmsg.personphone
            });
            axios.post(process.env.VUE_APP_CONFIG_API + "/GroupConfigs/add", {
              groupname: this.groupname,
              personlist: this.personlist
            });
            this.addpersonvis = false;
            this.shownotification("新增成员信息保存成功！！！");
          }
        }
      });
    },

    addpersonclose() {
      this.$refs.addref.resetFields();
    },

    editperson(personnumber) {
      this.editpersonvis = true;
      axios
        .post(process.env.VUE_APP_CONFIG_API + "/GroupConfigs/preedit", {
          groupname: this.groupname,
          personnumber: personnumber
        })
        .then(response => (this.editmsg = response.data));
    },

    editconfirm() {
      this.$refs.editref.validate(valid => {
        if (!valid) {
          this.shownotification("请填写姓名及手机号");
        } else {
          console.log(this.editmsg);
          axios.post(process.env.VUE_APP_CONFIG_API + "/GroupConfigs/edit", {
            groupname: this.groupname,
            personmsg: this.editmsg
          });
          this.editpersonvis = false;
          this.shownotification("保存成功！！！");
          this.refresh();
        }
      });
    },

    editpersonclose() {
      // this.$refs.editref.resetFields();
    },

    deleteperson(personnumber) {
      this.deletepersonvis = true;
      this.deletemsg.personnumber = personnumber;
    },

    deleteconfirm() {
      axios.post(process.env.VUE_APP_CONFIG_API + "/GroupConfigs/delete", {
        groupname: this.groupname,
        personnumber: this.deletemsg.personnumber
      });
      this.deletepersonvis = false;
      this.shownotification("删除成功！！！");
      this.refresh();
    },
    deletepersonclose() {
      this.$refs.deleteref.resetFields();
    },
    handleChange(val) {
      console.log(val);
    }
  },

  watch: {
    groupdata(newVal, oldVal) {
      this.personlist = newVal.personlist;
      this.roboturl = newVal.roboturl;
      this.worktimemorningonduty = newVal.worktimemorningonduty;
      this.worktimemorningoffduty = newVal.worktimemorningoffduty;
      this.worktimeafternoononduty = newVal.worktimeafternoononduty;
      this.worktimeafternoonoffduty = newVal.worktimeafternoonoffduty;
    },

    groupname(newVal, oldVal) {
      axios
        .post(process.env.VUE_APP_CONFIG_API + "/GroupConfigs/getGroupDatas", {
          groupname: decodeURI(newVal)
        })
        .then(response => (this.groupdata = response.data));
    }
  }
};
</script>