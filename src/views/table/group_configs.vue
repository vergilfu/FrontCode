<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-container>
      <el-header style="text-align: left; font-size: 50px">
        <div style="margin-top:15px;">
          <el-form-item style="text-align:left">
            <el-button type="primary" @click="addpersonvis = true">新增成员</el-button>
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
      <el-header style="text-align: left; font-size: 50px">
        <el-form-item label>
          <el-select v-model="group_name" placeholder="请选择用户组">
            <el-option v-for="item in groups" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-header>

      <el-main>
        <table>
          <tr>
            <td>
              <h3>消息通知机器人</h3>
            </td>
          </tr>
          <tr>
            <td>
              <el-input style="width:900px;" placeholder="消息机器人地址" v-model="robot_url" clearable></el-input>
            </td>
          </tr>
          <tr>
            <td>
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
                      v-model="startTime_morning"
                      :picker-options="{
                  start: '06:00',
                  step: '00:15',
                  end: '12:00'
                  }"
                    ></el-time-select>
                    <el-time-select
                      placeholder="结束时间"
                      v-model="endTime_morning"
                      :picker-options="{
                  start: '06:00',
                  step: '00:15',
                  end: '12:00',
                  minTime: startTime_morning
                  }"
                    ></el-time-select>
                  </td>
                  <td>
                    <el-time-select
                      placeholder="起始时间"
                      v-model="startTime_afternoon"
                      :picker-options="{
                  start: '12:00',
                  step: '00:15',
                  end: '22:00'
                  }"
                    ></el-time-select>
                    <el-time-select
                      placeholder="结束时间"
                      v-model="endTime_afternoon"
                      :picker-options="{
                  start: '12:00',
                  step: '00:15',
                  end: '22:00',
                  minTime: startTime_afternoon
                  }"
                    ></el-time-select>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </el-main>
    </el-container>

    <el-container>
      <el-main>
        <el-table :data="person_list" style="width: 100%" border fit highlight-current-row>
          <el-table-column prop="number" label="编号" width="180"></el-table-column>
          <el-table-column prop="name" label="姓名" width="180"></el-table-column>
          <el-table-column prop="phone" label="电话" width="300"></el-table-column>

          <el-table-column label="操作" width="180">
            <template slot-scope="person_list">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="editperson(person_list.row.number)"
              ></el-button>

              <el-button
                type="primary"
                icon="el-icon-delete"
                size="mini"
                @click="deleteperson(person_list.row.number)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
    <el-container>
      <el-main>
        <el-dialog title="新增成员" :visible.sync="addpersonvis" width="30%" @close="addpersonclose">
          <el-form :model="add_msg" :rules="add_rule" ref="add_ref" label-width="70px">
            <el-form-item label="编号" prop="number">
              <el-input v-model="add_msg.number"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="add_msg.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="add_msg.phone"></el-input>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="addpersonvis = false">取 消</el-button>
            <el-button type="primary" @click="add_confirm">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog title="编辑成员" :visible.sync="editpersonvis" width="30%" @close="editpersonclose">
          <el-form :model="edit_msg" :rules="edit_rule" ref="edit_ref" label-width="70px">
            <el-form-item label="编号" prop="number">
              <el-input v-model="edit_msg.number" disabled></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="name">
              <el-input v-model="edit_msg.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
              <el-input v-model="edit_msg.phone"></el-input>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="editpersonvis = false">取 消</el-button>
            <el-button type="primary" @click="edit_confirm">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog
          title="操作确认"
          :visible.sync="deletepersonvis"
          width="30%"
          @close="deletepersonclose"
        >
          <el-form :model="delete_msg" :rules="delete_rule" ref="delete_ref" label-width="70px">
            <h3 align="center">确定要删除该数据吗？</h3>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="deletepersonvis = false">取 消</el-button>
            <el-button type="primary" @click="delete_confirm">确 定</el-button>
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
      startTime_morning: "",
      endTime_morning: "",
      startTime_afternoon: "",
      endTime_afternoon: "",
      robot_url: "",

      formInline: {
        user: "",
        region: ""
      },

      group_data: {},
      person_list: [],

      group_name: "共享组",
      groups: [
        {
          name: "费用组",
          id: "费用组"
        },
        {
          name: "共享组",
          id: "共享组"
        },
        {
          name: "智能移动组",
          id: "智能移动组"
        },
        {
          name: "预算组",
          id: "预算组"
        },
        {
          name: "合并报表组",
          id: "合并报表组"
        },
        {
          name: "会计组",
          id: "会计组"
        },
        {
          name: "资金组",
          id: "资金组"
        }
      ],
      addpersonvis: false,
      add_msg: {
        group_name: "",
        number: "",
        name: "",
        phone: ""
      },
      add_rule: {
        number: [{ required: true, message: "请输入编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }]
      },
      editpersonvis: false,
      edit_msg: {
        group_name: "",
        number: "",
        name: "",
        phone: ""
      },
      edit_rule: {
        number: [{ required: true, message: "请输入编号", trigger: "blur" }],
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }]
      },
      deletepersonvis: false,
      delete_msg: {
        number: ""
      },
      delete_rule: {}
    };
  },

  created() {
    this.getgroupsdata();
  },

  methods: {
    getgroupsdata() {
      axios
        .get(process.env.VUE_APP_CONFIG_API + "/groups", {
          params: { group_name: decodeURI("共享组") }
        })
        .then(response => (this.group_data = response.data));
    },

    shownotification(str1) {
      this.$message({
        message: str1,
        center: true
      });
    },

    checkvalue(number) {
      var checkflag = false;
      for (var i = 0; i < this.person_list.length; i++) {
        if (number == this.person_list[i].number) {
          checkflag = true;
        }
      }
      return checkflag;
    },

    save() {
      var save_datas = {
        group_name: this.group_name,
        group_configs: {
          robot_url: this.robot_url,
          worktime: {
            onduty: this.startTime_morning,
            pre_noon: this.endTime_morning,
            after_noon: this.startTime_afternoon,
            offduty: this.endTime_afternoon
          },
          person: this.person_list
        }
      };
      axios.post(
        process.env.VUE_APP_CONFIG_API + "/groups/group_configs/save",
        save_datas
      );
      this.shownotification("保存成功!!!");
      this.refresh();
    },

    refresh() {
      axios
        .post(
          process.env.VUE_APP_CONFIG_API + "/groups/group_configs/refresh",
          {
            group_name: this.group_name
          }
        )
        .then(response => (this.group_data = response.data));
    },

    add_confirm() {
      this.$refs.add_ref.validate(valid => {
        if (!valid) {
          this.shownotification("请填写编号、姓名及手机号");
        } else {
          if (this.checkvalue(this.add_msg.number)) {
            this.shownotification("编码重复，请重新填写！！！");
          } else {
            this.person_list.push({
              number: this.add_msg.number,
              name: this.add_msg.name,
              phone: this.add_msg.phone
            });
            axios.post(
              process.env.VUE_APP_CONFIG_API + "/groups/group_configs/add",
              {
                group_name: this.group_name,
                person_list: this.person_list
              }
            );
            this.addpersonvis = false;
            this.shownotification("新增成员信息保存成功！！！");
          }
        }
      });
    },

    addpersonclose() {
      this.$refs.add_ref.resetFields();
    },

    editperson(number) {
      this.editpersonvis = true;
      axios
        .post(
          process.env.VUE_APP_CONFIG_API + "/groups/group_configs/pre-edit",
          {
            group_name: this.group_name,
            number: number
          }
        )
        .then(response => (this.edit_msg = response.data));
      console.log(this.person_list);
    },

    edit_confirm() {
      this.$refs.edit_ref.validate(valid => {
        if (!valid) {
          this.shownotification("请填写姓名及手机号");
        } else {
          axios.post(
            process.env.VUE_APP_CONFIG_API + "/groups/group_configs/edit",
            {
              group_name: this.group_name,
              person_msg: this.edit_msg
            }
          );
          this.editpersonvis = false;
          this.shownotification("保存成功！！！");
          this.refresh();
        }
      });
    },

    editpersonclose() {
      this.$refs.edit_ref.resetFields();
    },

    deleteperson(number) {
      this.deletepersonvis = true;
      this.delete_msg.number = number;
    },

    delete_confirm() {
      axios.post(
        process.env.VUE_APP_CONFIG_API + "/groups/group_configs/delete",
        {
          group_name: this.group_name,
          number: this.delete_msg.number
        }
      );
      this.deletepersonvis = false;
      this.shownotification("删除成功！！！");
      this.refresh();
    },
    deletepersonclose() {
      this.$refs.delete_ref.resetFields();
    }
  },

  watch: {
    group_data(newVal, oldVal) {
      this.person_list = newVal.group_configs.person;
      this.robot_url = newVal.group_configs.robot_url;
      this.startTime_morning = newVal.group_configs.worktime.onduty;
      this.endTime_morning = newVal.group_configs.worktime.pre_noon;
      this.startTime_afternoon = newVal.group_configs.worktime.after_noon;
      this.endTime_afternoon = newVal.group_configs.worktime.offduty;
    },

    group_name(newVal, oldVal) {
      axios
        .get(process.env.VUE_APP_CONFIG_API + "/groups", {
          params: { group_name: decodeURI(newVal) }
        })
        .then(response => (this.group_data = response.data));
    }
  }
};
</script>