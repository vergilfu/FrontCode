<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <div>
      <br>
    </div>

    <el-container>
      <el-header style="text-align: left; font-size: 50px">
        <el-form-item label>
          <el-select v-model="group_name" placeholder="请选择用户组">
            <el-option v-for="item in groups" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-header>

      <el-main>
        <el-button type="primary">新增关联映射</el-button>
        <p></p>
        <el-table :data="person_list" style="width: 100%" border fit highlight-current-row>
          <el-table-column prop="number" label="ATC任务id" width="140" align="center"></el-table-column>
          <el-table-column prop="name" label="ATC任务名称" width="400" align="center"></el-table-column>
          <el-table-column prop="phone" label="关联API任务id" width="140" align="center"></el-table-column>
          <el-table-column prop="phone" label="关联API任务名称" width="400" align="center"></el-table-column>
        </el-table>
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
      formInline: {
        user: "",
        region: ""
      },

      activeNames: [""]
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
          alarm_frequency: {
            morning: this.mo_fre,
            afternoon: this.af_fre
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
    },
    handleChange(val) {
      console.log(val);
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
      this.mo_fre = newVal.group_configs.alarm_frequency.morning;
      this.af_fre = newVal.group_configs.alarm_frequency.afternoon;
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