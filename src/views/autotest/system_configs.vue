<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-container>
      <el-header style="text-align: left; font-size: 50px">
        <div style="margin-top:15px;">
          <el-form-item style="text-align:left">
            <el-button type="primary" @click="addvis = true">新增配置项</el-button>
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
        <el-table :data="systemconfigs" style="width: 100%" :default-sort="{prop:'configname',order:'ascending'}" border fit highlight-current-row>
          <el-table-column prop="configname" label="配置项" width="380" sortable align="center"></el-table-column>
          <el-table-column prop="configvalue" label="值" width="880" sortable align="center"></el-table-column>
          <el-table-column label="操作" width="180" align="center">
            <template slot-scope="systemconfigs">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="editdatas(systemconfigs.row.configname)"
              ></el-button>

              <el-button
                type="primary"
                icon="el-icon-delete"
                size="mini"
                @click="deletedatas(systemconfigs.row.configname)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>

    <el-container>
      <el-main>
        <el-dialog title="新增配置项" :visible.sync="addvis" width="30%" @close="addclose">
          <el-form :model="addmsg" :rules="addrule" ref="addref" label-width="70px">
            <el-form-item label="配置项" prop="configname" >
              <el-input v-model="addmsg.configname"></el-input>
            </el-form-item>
            <el-form-item label="值" prop="configvalue">
              <el-input v-model="addmsg.configvalue"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="addvis = false">取 消</el-button>
            <el-button type="primary" @click="addconfirm">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog title="编辑配置项" :visible.sync="editvis" width="30%" @close="editclose">
          <el-form :model="editmsg" :rules="editrule" ref="editref" label-width="70px">
            <el-form-item label="配置项" prop="configname">
              <el-input v-model="editmsg.configname" disabled></el-input>
            </el-form-item>
            <el-form-item label="值" prop="configvalue">
              <el-input v-model="editmsg.configvalue"></el-input>
            </el-form-item>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="editvis = false">取 消</el-button>
            <el-button type="primary" @click="editconfirm">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog title="操作确认" :visible.sync="deletevis" width="30%" @close="deleteclose">
          <el-form :model="deletemsg" :rules="deleterule" ref="deleteref" label-width="70px">
            <h3 align="center">确定要删除该数据吗？</h3>
          </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button @click="deletevis = false">取 消</el-button>
            <el-button type="primary" @click="deleteconfirm">确 定</el-button>
          </span>
        </el-dialog>
      </el-main>
    </el-container>
  </el-form>
</template>


<script>
import Sortable from "sortablejs";
import axios from "axios";
import { constants } from "fs";
import { consumers } from "stream";
import { all } from "q";

export default {
  name: "system_configs",
  data() {
    return {
      systemconfigs: [],
      addvis: false,
      addmsg: {
        configname: "",
        configvalue: ""
      },
      addrule: {
        configname: [{ required: true, message: "配置项", trigger: "blur" }],
        configvalue: [{ required: true, message: "值", trigger: "blur" }]
      },

      editvis: false,
      editmsg: {
        configname: "",
        configvalue: ""
      },
      editrule: {
        configname: [{ required: true, message: "配置项", trigger: "blur" }],
        configvalue: [{ required: true, message: "值", trigger: "blur" }]
      },

      deletevis: false,
      deletemsg: {
        configname: ""
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
    this.getdatas();
  },

  methods: {
    getdatas() {
      axios
        .post(process.env.VUE_APP_CONFIG_API + "/SystemConfigs/getdatas", {
          time: decodeURI("now")
        })
        .then(response => (this.systemconfigs = response.data));
      console.log(this.systemconfigs);
    },

    shownotification(str1) {
      this.$message({
        message: str1,
        center: true
      });
    },

    checkvalue(configname) {
      var checkflag = false;
      for (var i = 0; i < this.systemconfigs.length; i++) {
        if (configname == this.systemconfigs[i].configname) {
          checkflag = true;
        }
      }
      return checkflag;
    },

    save() {
      var savedatas = this.systemconfigs;
      axios.post(
        process.env.VUE_APP_CONFIG_API + "/SystemConfigs/save",
        savedatas
      );
      this.shownotification("保存成功!!!");
      this.refresh();
    },

    refresh() {
      axios
        .post(process.env.VUE_APP_CONFIG_API + "/SystemConfigs/refresh", {
          time: decodeURI("now")
        })
        .then(response => (this.systemconfigs = response.data));
    },

    addconfirm() {
      this.$refs.addref.validate(valid => {
        if (!valid) {
          this.shownotification("请填写配置项、值");
        } else {
          if (this.checkvalue(this.addmsg.configname)) {
            this.shownotification("配置项重复，请重新填写！！！");
          } else {
            this.systemconfigs.push({
              configname: this.addmsg.configname,
              configvalue: this.addmsg.configvalue
            });
            axios.post(
              process.env.VUE_APP_CONFIG_API + "/SystemConfigs/add",
              this.systemconfigs
            );
            this.addvis = false;
            this.shownotification("新增配置项保存成功！！！");
          }
        }
      });
    },

    addclose() {
      this.$refs.addref.resetFields();
    },

    editdatas(configname) {
      this.editvis = true;
      axios
        .post(process.env.VUE_APP_CONFIG_API + "/SystemConfigs/preedit", 
          {configname}
        )
        .then(response => (this.editmsg = response.data));
    },

    editconfirm() {
      this.$refs.editref.validate(valid => {
        if (!valid) {
          this.shownotification("请填写配置项及值");
        } else {
          axios.post(process.env.VUE_APP_CONFIG_API + "/SystemConfigs/edit", 
            this.editmsg
          );
          this.editvis = false;
          this.shownotification("保存成功！！！");
          this.refresh();
        }
      });
    },

    editclose() {
      // this.$refs.editref.resetFields();
    },

    deletedatas(configname) {
      console.log(configname);
      this.deletevis = true;
      this.deletemsg.configname = configname;
    },

    deleteconfirm() {
      axios.post(process.env.VUE_APP_CONFIG_API + "/SystemConfigs/delete", 
        this.deletemsg
      );
      this.deletevis = false;
      this.shownotification("删除成功！！！");
      this.refresh();
    },
    deleteclose() {
      this.$refs.deleteref.resetFields();
    },
    handleChange(val) {
      console.log(val);
    }
  }
};
</script>


