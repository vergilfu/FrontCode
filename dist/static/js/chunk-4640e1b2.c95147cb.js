(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4640e1b2"],{"3e8f":function(t,e){},f6e7:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:t.formInline}},[s("el-container",[s("el-header",{staticStyle:{"text-align":"left","font-size":"50px"}},[s("div",{staticStyle:{"margin-top":"15px"}},[s("el-form-item",{staticStyle:{"text-align":"left"}},[s("el-button",{attrs:{type:"primary"},on:{click:function(e){t.addtaskvis=!0}}},[t._v("新增任务")])],1),s("el-form-item",{staticStyle:{"text-align":"left"}},[s("el-button",{attrs:{type:"primary"},on:{click:t.save}},[t._v("保存")])],1),s("el-form-item",{staticStyle:{"text-align":"left"}},[s("el-button",{attrs:{type:"primary"},on:{click:t.refresh}},[t._v("刷新")])],1)],1)])],1),s("el-container",[s("el-main",[s("el-table",{staticStyle:{width:"100%"},attrs:{data:t.tasklist,"default-sort":{prop:"taskorigin",order:"ascending"},border:"",fit:"","highlight-current-row":""}},[s("el-table-column",{attrs:{prop:"taskorigin",label:"任务类型",width:"180",sortable:"",align:"center"}}),s("el-table-column",{attrs:{prop:"taskid",label:"任务ID",width:"380",sortable:"",align:"center"}}),s("el-table-column",{attrs:{prop:"taskname",label:"任务名称",width:"380",sortable:"",align:"center"}}),s("el-table-column",{attrs:{prop:"taskenv",label:"任务执行环境",width:"500",sortable:"",align:"center"}}),s("el-table-column",{attrs:{label:"操作",width:"180",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{type:"primary",icon:"el-icon-edit",size:"mini"},on:{click:function(s){return t.editdatas(e.row.taskid)}}}),s("el-button",{attrs:{type:"primary",icon:"el-icon-delete",size:"mini"},on:{click:function(s){return t.deletedatas(e.row.taskid)}}})]}}])})],1)],1)],1),s("el-container",[s("el-main",[s("el-dialog",{attrs:{title:"新增任务",visible:t.addtaskvis,width:"30%"},on:{"update:visible":function(e){t.addtaskvis=e},close:t.addclose}},[s("el-form",{ref:"addref",attrs:{model:t.addmsg,rules:t.addrule,"label-width":"120px"}},[s("el-form-item",{attrs:{label:"任务类型",prop:"taskorigin"}},[s("el-input",{model:{value:t.addmsg.taskorigin,callback:function(e){t.$set(t.addmsg,"taskorigin",e)},expression:"addmsg.taskorigin"}})],1),s("el-form-item",{attrs:{label:"任务ID",prop:"taskid"}},[s("el-input",{model:{value:t.addmsg.taskid,callback:function(e){t.$set(t.addmsg,"taskid",e)},expression:"addmsg.taskid"}})],1),s("el-form-item",{attrs:{label:"任务名称",prop:"taskname"}},[s("el-input",{model:{value:t.addmsg.taskname,callback:function(e){t.$set(t.addmsg,"taskname",e)},expression:"addmsg.taskname"}})],1),s("el-form-item",{attrs:{label:"任务执行环境",prop:"taskenv"}},[s("el-input",{model:{value:t.addmsg.taskenv,callback:function(e){t.$set(t.addmsg,"taskenv",e)},expression:"addmsg.taskenv"}})],1)],1),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(e){t.addtaskvis=!1}}},[t._v("取 消")]),s("el-button",{attrs:{type:"primary"},on:{click:t.addconfirm}},[t._v("确 定")])],1)],1),s("el-dialog",{attrs:{title:"编辑任务",visible:t.edittaskvis,width:"30%"},on:{"update:visible":function(e){t.edittaskvis=e},close:t.editclose}},[s("el-form",{ref:"editref",attrs:{model:t.editmsg,rules:t.editrule,"label-width":"120px"}},[s("el-form-item",{attrs:{label:"任务类型",prop:"taskorigin"}},[s("el-input",{model:{value:t.editmsg.taskorigin,callback:function(e){t.$set(t.editmsg,"taskorigin",e)},expression:"editmsg.taskorigin"}})],1),s("el-form-item",{attrs:{label:"任务ID",prop:"taskid"}},[s("el-input",{attrs:{disabled:""},model:{value:t.editmsg.taskid,callback:function(e){t.$set(t.editmsg,"taskid",e)},expression:"editmsg.taskid"}})],1),s("el-form-item",{attrs:{label:"任务名称",prop:"taskname"}},[s("el-input",{model:{value:t.editmsg.taskname,callback:function(e){t.$set(t.editmsg,"taskname",e)},expression:"editmsg.taskname"}})],1),s("el-form-item",{attrs:{label:"任务执行环境",prop:"taskenv"}},[s("el-input",{model:{value:t.editmsg.taskenv,callback:function(e){t.$set(t.editmsg,"taskenv",e)},expression:"editmsg.taskenv"}})],1)],1),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(e){t.edittaskvis=!1}}},[t._v("取 消")]),s("el-button",{attrs:{type:"primary"},on:{click:t.editconfirm}},[t._v("确 定")])],1)],1),s("el-dialog",{attrs:{title:"操作确认",visible:t.deletetaskvis,width:"30%"},on:{"update:visible":function(e){t.deletetaskvis=e},close:t.deleteclose}},[s("el-form",{ref:"deleteref",attrs:{model:t.deletemsg,rules:t.deleterule,"label-width":"70px"}},[s("h3",{attrs:{align:"center"}},[t._v("确定要删除该数据吗？")])]),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(e){t.deletetaskvis=!1}}},[t._v("取 消")]),s("el-button",{attrs:{type:"primary"},on:{click:t.deleteconfirm}},[t._v("确 定")])],1)],1)],1)],1)],1)},i=[],n=s("bc3a"),l=s.n(n),r=(s("3e8f"),{data:function(){return{tasklist:[],addtaskvis:!1,addmsg:{taskorigin:"",taskid:"",taskname:"",taskenv:""},addrule:{taskorigin:[{required:!0,message:"任务类型",trigger:"blur"}],taskid:[{required:!0,message:"任务ID",trigger:"blur"}],taskname:[{required:!0,message:"任务名称",trigger:"blur"}],taskenv:[{required:!0,message:"任务执行环境",trigger:"blur"}]},edittaskvis:!1,editmsg:{taskorigin:"",taskid:"",taskname:"",taskenv:""},editrule:{taskorigin:[{required:!0,message:"任务类型",trigger:"blur"}],taskid:[{required:!0,message:"任务ID",trigger:"blur"}],taskname:[{required:!0,message:"任务名称",trigger:"blur"}],taskenv:[{required:!0,message:"任务执行环境",trigger:"blur"}]},deletetaskvis:!1,deletemsg:{taskid:""},deleterule:{},activeNames:[""],formInline:{user:"",region:""}}},created:function(){this.getdatas()},methods:{getdatas:function(){var t=this;l.a.post("http://172.18.1.169:8081/TaskList/getTaskdata",{time:decodeURI("now")}).then((function(e){return t.tasklist=e.data}))},shownotification:function(t){this.$message({message:t,center:!0})},checkvalue:function(t){for(var e=!1,s=0;s<this.tasklist.length;s++)t==this.tasklist[s].taskid&&(e=!0);return e},save:function(){var t=this.tasklist;l.a.post("http://172.18.1.169:8081/TaskList/save",t),this.shownotification("保存成功!!!"),this.refresh()},refresh:function(){var t=this;l.a.post("http://172.18.1.169:8081/TaskList/refresh",{time:decodeURI("now")}).then((function(e){return t.tasklist=e.data}))},addconfirm:function(){var t=this;this.$refs.addref.validate((function(e){e?t.checkvalue(t.addmsg.taskid)?t.shownotification("任务ID重复,请重新填写!!!"):(t.tasklist.push({taskorigin:t.addmsg.taskorigin,taskid:t.addmsg.taskid,taskname:t.addmsg.taskname,taskenv:t.addmsg.taskenv}),l.a.post("http://172.18.1.169:8081/TaskList/add",{taskorigin:t.addmsg.taskorigin,taskid:t.addmsg.taskid,taskname:t.addmsg.taskname,taskenv:t.addmsg.taskenv}),t.addtaskvis=!1,t.shownotification("新增任务保存成功！！！")):t.shownotification("请填写必填项")}))},addclose:function(){this.$refs.addref.resetFields()},editdatas:function(t){var e=this;this.edittaskvis=!0,l.a.post("http://172.18.1.169:8081/TaskList/preedit",{taskid:t}).then((function(t){return e.editmsg=t.data}))},editconfirm:function(){var t=this;this.$refs.editref.validate((function(e){e?(l.a.post("http://172.18.1.169:8081/TaskList/edit",t.editmsg),t.edittaskvis=!1,t.shownotification("保存成功！！！"),t.refresh()):t.shownotification("请填写必填项")}))},editclose:function(){},deletedatas:function(t){this.deletetaskvis=!0,this.deletemsg.taskid=t},deleteconfirm:function(){l.a.post("http://172.18.1.169:8081/TaskList/delete",this.deletemsg),this.deletetaskvis=!1,this.shownotification("删除成功！！！"),this.refresh()},deleteclose:function(){this.$refs.deleteref.resetFields()},handleChange:function(t){console.log(t)}}}),o=r,d=s("2877"),c=Object(d["a"])(o,a,i,!1,null,null,null);e["default"]=c.exports}}]);