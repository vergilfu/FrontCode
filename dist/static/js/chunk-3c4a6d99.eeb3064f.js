(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3c4a6d99"],{1860:function(e,t,a){"use strict";a("1e29")},"1e29":function(e,t,a){},"2cbf":function(e,t,a){"use strict";a("73e0")},"73e0":function(e,t,a){},"8d41":function(e,t,a){},b311:function(e,t,a){
/*!
 * clipboard.js v2.0.4
 * https://zenorocha.github.io/clipboard.js
 * 
 * Licensed MIT © Zeno Rocha
 */
(function(t,a){e.exports=a()})(0,(function(){return function(e){var t={};function a(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,a),i.l=!0,i.exports}return a.m=e,a.c=t,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)a.d(n,i,function(t){return e[t]}.bind(null,i));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="",a(a.s=0)}([function(e,t,a){"use strict";var n="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),r=a(1),o=p(r),s=a(3),l=p(s),c=a(4),u=p(c);function p(e){return e&&e.__esModule?e:{default:e}}function d(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function f(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function m(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var h=function(e){function t(e,a){d(this,t);var n=f(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return n.resolveOptions(a),n.listenClick(e),n}return m(t,e),i(t,[{key:"resolveOptions",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action="function"===typeof e.action?e.action:this.defaultAction,this.target="function"===typeof e.target?e.target:this.defaultTarget,this.text="function"===typeof e.text?e.text:this.defaultText,this.container="object"===n(e.container)?e.container:document.body}},{key:"listenClick",value:function(e){var t=this;this.listener=(0,u.default)(e,"click",(function(e){return t.onClick(e)}))}},{key:"onClick",value:function(e){var t=e.delegateTarget||e.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new o.default({action:this.action(t),target:this.target(t),text:this.text(t),container:this.container,trigger:t,emitter:this})}},{key:"defaultAction",value:function(e){return b("action",e)}},{key:"defaultTarget",value:function(e){var t=b("target",e);if(t)return document.querySelector(t)}},{key:"defaultText",value:function(e){return b("text",e)}},{key:"destroy",value:function(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:"isSupported",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:["copy","cut"],t="string"===typeof e?[e]:e,a=!!document.queryCommandSupported;return t.forEach((function(e){a=a&&!!document.queryCommandSupported(e)})),a}}]),t}(l.default);function b(e,t){var a="data-clipboard-"+e;if(t.hasAttribute(a))return t.getAttribute(a)}e.exports=h},function(e,t,a){"use strict";var n="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),r=a(2),o=s(r);function s(e){return e&&e.__esModule?e:{default:e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var c=function(){function e(t){l(this,e),this.resolveOptions(t),this.initSelection()}return i(e,[{key:"resolveOptions",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.action=e.action,this.container=e.container,this.emitter=e.emitter,this.target=e.target,this.text=e.text,this.trigger=e.trigger,this.selectedText=""}},{key:"initSelection",value:function(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function(){var e=this,t="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return e.removeFake()},this.fakeHandler=this.container.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[t?"right":"left"]="-9999px";var a=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=a+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,this.container.appendChild(this.fakeElem),this.selectedText=(0,o.default)(this.fakeElem),this.copyText()}},{key:"removeFake",value:function(){this.fakeHandler&&(this.container.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(this.container.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function(){this.selectedText=(0,o.default)(this.target),this.copyText()}},{key:"copyText",value:function(){var e=void 0;try{e=document.execCommand(this.action)}catch(t){e=!1}this.handleResult(e)}},{key:"handleResult",value:function(e){this.emitter.emit(e?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function(){this.trigger&&this.trigger.focus(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function(){this.removeFake()}},{key:"action",set:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"copy";if(this._action=e,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function(){return this._action}},{key:"target",set:function(e){if(void 0!==e){if(!e||"object"!==("undefined"===typeof e?"undefined":n(e))||1!==e.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&e.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(e.hasAttribute("readonly")||e.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=e}},get:function(){return this._target}}]),e}();e.exports=c},function(e,t){function a(e){var t;if("SELECT"===e.nodeName)e.focus(),t=e.value;else if("INPUT"===e.nodeName||"TEXTAREA"===e.nodeName){var a=e.hasAttribute("readonly");a||e.setAttribute("readonly",""),e.select(),e.setSelectionRange(0,e.value.length),a||e.removeAttribute("readonly"),t=e.value}else{e.hasAttribute("contenteditable")&&e.focus();var n=window.getSelection(),i=document.createRange();i.selectNodeContents(e),n.removeAllRanges(),n.addRange(i),t=n.toString()}return t}e.exports=a},function(e,t){function a(){}a.prototype={on:function(e,t,a){var n=this.e||(this.e={});return(n[e]||(n[e]=[])).push({fn:t,ctx:a}),this},once:function(e,t,a){var n=this;function i(){n.off(e,i),t.apply(a,arguments)}return i._=t,this.on(e,i,a)},emit:function(e){var t=[].slice.call(arguments,1),a=((this.e||(this.e={}))[e]||[]).slice(),n=0,i=a.length;for(n;n<i;n++)a[n].fn.apply(a[n].ctx,t);return this},off:function(e,t){var a=this.e||(this.e={}),n=a[e],i=[];if(n&&t)for(var r=0,o=n.length;r<o;r++)n[r].fn!==t&&n[r].fn._!==t&&i.push(n[r]);return i.length?a[e]=i:delete a[e],this}},e.exports=a},function(e,t,a){var n=a(5),i=a(6);function r(e,t,a){if(!e&&!t&&!a)throw new Error("Missing required arguments");if(!n.string(t))throw new TypeError("Second argument must be a String");if(!n.fn(a))throw new TypeError("Third argument must be a Function");if(n.node(e))return o(e,t,a);if(n.nodeList(e))return s(e,t,a);if(n.string(e))return l(e,t,a);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}function o(e,t,a){return e.addEventListener(t,a),{destroy:function(){e.removeEventListener(t,a)}}}function s(e,t,a){return Array.prototype.forEach.call(e,(function(e){e.addEventListener(t,a)})),{destroy:function(){Array.prototype.forEach.call(e,(function(e){e.removeEventListener(t,a)}))}}}function l(e,t,a){return i(document.body,e,t,a)}e.exports=r},function(e,t){t.node=function(e){return void 0!==e&&e instanceof HTMLElement&&1===e.nodeType},t.nodeList=function(e){var a=Object.prototype.toString.call(e);return void 0!==e&&("[object NodeList]"===a||"[object HTMLCollection]"===a)&&"length"in e&&(0===e.length||t.node(e[0]))},t.string=function(e){return"string"===typeof e||e instanceof String},t.fn=function(e){var t=Object.prototype.toString.call(e);return"[object Function]"===t}},function(e,t,a){var n=a(7);function i(e,t,a,n,i){var r=o.apply(this,arguments);return e.addEventListener(a,r,i),{destroy:function(){e.removeEventListener(a,r,i)}}}function r(e,t,a,n,r){return"function"===typeof e.addEventListener?i.apply(null,arguments):"function"===typeof a?i.bind(null,document).apply(null,arguments):("string"===typeof e&&(e=document.querySelectorAll(e)),Array.prototype.map.call(e,(function(e){return i(e,t,a,n,r)})))}function o(e,t,a,i){return function(a){a.delegateTarget=n(a.target,t),a.delegateTarget&&i.call(e,a)}}e.exports=r},function(e,t){var a=9;if("undefined"!==typeof Element&&!Element.prototype.matches){var n=Element.prototype;n.matches=n.matchesSelector||n.mozMatchesSelector||n.msMatchesSelector||n.oMatchesSelector||n.webkitMatchesSelector}function i(e,t){while(e&&e.nodeType!==a){if("function"===typeof e.matches&&e.matches(t))return e;e=e.parentNode}}e.exports=i}])}))},c78d:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"app-container"},[a("div",{staticClass:"filter-container"},[a("el-form",{staticClass:"demo-form-inline",attrs:{inline:!0,model:e.listQuery}},[a("el-row",[a("el-col",{attrs:{span:4}},[a("el-form-item",{attrs:{label:"名称"}},[a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"名称"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(e.listQuery)}},model:{value:e.listQuery.name,callback:function(t){e.$set(e.listQuery,"name",t)},expression:"listQuery.name"}})],1)],1),a("el-col",{attrs:{span:4}},[a("el-form-item",{attrs:{label:"path"}},[a("el-input",{staticClass:"filter-item",staticStyle:{width:"200px"},attrs:{placeholder:"path"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleFilter(e.listQuery)}},model:{value:e.listQuery.path,callback:function(t){e.$set(e.listQuery,"path",t)},expression:"listQuery.path"}})],1)],1),a("el-col",{attrs:{span:4}},[a("el-form-item",{attrs:{label:""}},[a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{type:"primary",icon:"el-icon-search"},on:{click:function(t){return e.handleFilter(e.listQuery)}}},[e._v(" 搜索 ")])],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:10}},[a("el-button",{staticClass:"filter-item",staticStyle:{"margin-left":"10px"},attrs:{type:"primary",icon:"el-icon-edit"},on:{click:e.handleCreate}},[e._v(" 新增 ")]),a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],staticClass:"filter-item",attrs:{loading:e.downloadLoading,type:"primary",icon:"el-icon-download"},on:{click:e.handleDownload}},[e._v(" 导出 ")])],1)],1)],1)],1),a("el-container",{},[a("el-container",[a("el-main",[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.listLoading,expression:"listLoading"}],key:e.tableKey,staticStyle:{width:"100%"},attrs:{data:e.tablelist,fit:"","highlight-current-row":""},on:{"sort-change":e.sortChange}},[a("el-table-column",{attrs:{type:"index",label:"ID"}}),a("el-table-column",{attrs:{label:"名称",width:"150px"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.name))])]}}])}),a("el-table-column",{attrs:{label:"path","min-width":"150px"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("el-popover",{attrs:{trigger:"hover",placement:"top"}},[a("p",[e._v("URL Base: "+e._s(e.VUE_APP_MOCK_SERVER+n.baseuri))]),a("p",[e._v("URL全路径: "+e._s(e.VUE_APP_MOCK_SERVER+n.uri))]),a("div",{staticClass:"name-wrapper",attrs:{slot:"reference"},slot:"reference"},[a("span",{staticClass:"link-type",on:{click:function(t){return e.handleUpdate(n)}}},[e._v(e._s(n.uri))])])])]}}])}),a("el-table-column",{attrs:{label:"创建人",width:"110px"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.creator))])]}}])}),a("el-table-column",{attrs:{label:"修改人",width:"110px"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.modifier))])]}}])}),a("el-table-column",{attrs:{label:"修改时间",width:"110px"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("span",[e._v(e._s(n.modifytime))])]}}])}),a("el-table-column",{attrs:{label:"Actions",width:"230","class-name":"small-padding fixed-width"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row,i=t.$index;return[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.handleUpdate(n)}}},[e._v(" 编辑 ")]),a("el-button",{attrs:{slot:"reference",size:"mini",type:"danger"},on:{click:function(t){return e.handleDelete(n,i)}},slot:"reference"},[e._v(" 删除")]),a("el-button",{attrs:{size:"mini",type:"success"},on:{click:function(t){return e.handletest(n,"published")}}},[e._v(" 测试 ")])]}}])})],1)],1)],1)],1),a("pagination",{directives:[{name:"show",rawName:"v-show",value:e.total>0,expression:"total > 0"}],attrs:{total:e.total,page:e.listQuery.page,limit:e.listQuery.limit},on:{"update:page":function(t){return e.$set(e.listQuery,"page",t)},"update:limit":function(t){return e.$set(e.listQuery,"limit",t)},pagination:e.getList}}),a("el-dialog",{attrs:{title:e.textMap[e.dialogStatus],visible:e.dialogFormVisible,width:"90%",top:"10px"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{ref:"dataForm",staticClass:"demo-form-inline",attrs:{rules:e.rules,model:e.temp,"label-position":"left","label-width":"100px"}},[a("el-collapse",{on:{change:e.handleCollapseChange},model:{value:e.activeNames,callback:function(t){e.activeNames=t},expression:"activeNames"}},[a("el-collapse-item",{staticStyle:{"font-size":"16px","font-weight":"bold"},attrs:{title:"",name:"1"}},[a("template",{slot:"title"},[a("div",{staticStyle:{"font-size":"16px","font-weight":"bold"}},[e._v("基本信息")])]),a("el-row",[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"名称",prop:"name"}},[a("el-input",{model:{value:e.temp.name,callback:function(t){e.$set(e.temp,"name",t)},expression:"temp.name"}})],1)],1)],1),a("el-row",[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"URL Path",prop:"path",autosize:""}},[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top-start"}},[a("div",{attrs:{slot:"content"},slot:"content"},[e._v("填写url的patch部分，不包含查询参数（Query Parameters）"),a("br")]),a("el-input",{attrs:{autosize:""},model:{value:e.temp.path,callback:function(t){e.$set(e.temp,"path",t)},expression:"temp.path"}})],1)],1)],1),a("el-col",{attrs:{span:4}},[a("el-form-item",{attrs:{label:"",prop:""}},[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top-start"}},[a("div",{attrs:{slot:"content"},slot:"content"},[e._v("是否自动添加随机的URL区分如http://ip:port/ASKC/api/user "),a("br"),e._v("如果没有特殊要求（比如系统必须填写http://ip:port/api/user），请保持勾选 ")]),a("el-switch",{attrs:{"active-text":"添加随机path",disabled:"create"!==e.dialogStatus},model:{value:e.temp.isRandomPath,callback:function(t){e.$set(e.temp,"isRandomPath",t)},expression:"temp.isRandomPath"}})],1)],1)],1),a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"URL Base",prop:""}},[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",placement:"top-start"}},[a("div",{attrs:{slot:"content"},slot:"content"},[e._v("mock平台提供的URL基本信息 "),a("br"),e._v("你可以把这部分内容直接填写到系统配置中 ")]),a("el-input",{attrs:{disabled:!0,size:"medium"},model:{value:e.temp.baseURL,callback:function(t){e.$set(e.temp,"baseURL",t)},expression:"temp.baseURL"}})],1),a("el-button",{attrs:{type:"primary",icon:"el-icon-document"},on:{click:function(t){return e.handleCopy(e.temp.baseURL,t)}}},[e._v("copy url")])],1)],1),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"URL全路径",prop:"",autosize:""}},[a("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"URL全路径",placement:"top-start"}},[a("el-input",{attrs:{disabled:!0,size:"medium"},model:{value:e.temp.fullPath,callback:function(t){e.$set(e.temp,"fullPath",t)},expression:"temp.fullPath"}})],1)],1)],1)],1),a("hr")],2),a("el-collapse-item",{staticStyle:{"font-size":"16px","font-weight":"bold"},attrs:{title:"",name:"2"}},[a("template",{slot:"title"},[a("div",{staticStyle:{"font-size":"16px","font-weight":"bold"}},[e._v("设置处理响应体前置脚本")])]),a("div",{staticClass:"components-container"},[a("aside",{staticStyle:{"font-size":"12px","line-height":"1.5"}},[e._v(" 可以为空。请输入python代码，这里的代码会在处理响应体前执行，你可以导入python标准库包 "),a("br"),e._v("支持已传入变量request，request的用法参考： "),a("br"),e._v("request.method：获取请求的HTTP方法 method = request.method "),a("br"),e._v("request.headers：获取请求的头部信息 user_agent = request.headers.get('User-Agent') "),a("br"),e._v("request.args：获取请求的URL参数 name = request.args.get('name') "),a("br"),e._v("request.form：获取请求的表单数据 name = request.form.get('name') "),a("br"),e._v("request.json：获取请求的JSON数据 data = request.json "),a("br"),e._v("request.data：以字节形式返回原始请求体数据 body_data = request.data.decode('utf-8') "),a("br"),e._v("request.files：获取请求上传的文件 file = request.files['file'] "),a("br"),e._v("request.cookies：获取请求的Cookie session_id = request.cookies.get('session_id') "),a("br"),a("br"),e._v("这个脚本里面你可以设置一些变量，用于响应体格式化和后续的后置脚本处理 "),a("br"),e._v("例如：number=zhangsan; number这个变量可以在后续处理中被使用到 ")]),a("div",{staticClass:"editor-container"},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:3,maxRows:20},placeholder:"样例：\nimport time\ndata = request.json\nnumber=data['number']\nnow = time.time()"},model:{value:e.temp.response_before,callback:function(t){e.$set(e.temp,"response_before",t)},expression:"temp.response_before"}})],1)]),a("hr")],2),a("el-collapse-item",{attrs:{title:"",name:"3"}},[a("template",{slot:"title"},[a("div",{staticStyle:{"font-size":"16px","font-weight":"bold"}},[e._v("响应头配置")])]),a("el-row",[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{prop:"response_code",label:"响应码"}},[a("el-input",{model:{value:e.temp.response_code,callback:function(t){e.$set(e.temp,"response_code",t)},expression:"temp.response_code"}})],1)],1)],1),a("hr"),a("div",{staticStyle:{"font-size":"16px","font-weight":"bold"}},[e._v("设置响应头")]),a("el-button",{attrs:{type:"success"},on:{click:e.addHeaderRow}},[e._v("增行")]),a("el-table",{staticStyle:{width:"50%"},attrs:{data:e.temp.response_header,stripe:"",border:""}},[a("el-table-column",{attrs:{type:"index",label:"序号",width:"60"}}),a("el-table-column",{attrs:{label:"key",rules:e.rules.headerkey,width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("el-input",{staticClass:"edit-input",attrs:{size:"small"},model:{value:n.key,callback:function(t){e.$set(n,"key",t)},expression:"row.key"}})]}}])}),a("el-table-column",{attrs:{label:"value",rules:e.rules.headervalue,width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("el-input",{staticClass:"edit-input",attrs:{size:"small"},model:{value:n.value,callback:function(t){e.$set(n,"value",t)},expression:"row.value"}})]}}])}),a("el-table-column",{attrs:{label:"description",width:"250"},scopedSlots:e._u([{key:"default",fn:function(t){var n=t.row;return[a("el-input",{staticClass:"edit-input",attrs:{size:"small"},model:{value:n.description,callback:function(t){e.$set(n,"description",t)},expression:"row.description"}})]}}])}),a("el-table-column",{attrs:{label:"操作",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",size:"small"},nativeOn:{click:function(a){return a.preventDefault(),e.deleteHeaderRow(t.$index,e.temp.response_header)}}},[e._v(" 移除 ")])]}}])})],1)],2),a("el-collapse-item",{staticStyle:{"font-size":"16px","font-weight":"bold"},attrs:{title:"",name:"4"}},[a("template",{slot:"title"},[a("div",{staticStyle:{"font-size":"16px","font-weight":"bold"}},[e._v("响应体配置")])]),a("div",{staticClass:"components-container"},[a("aside",{staticStyle:{"font-size":"12px","line-height":"1.5"}},[a("p",{pre:!0},[e._v("请输入响应体样本，你可以可以使用{{number}} 这种方法来格式化响应体")]),a("p",{pre:!0},[e._v('例如：{"status":"success","number":"{{number}}"} ')]),e._v(" mock平台通过字符串的replace方法替换对应的内容 ")]),a("div",{staticClass:"editor-container"},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:3,maxRows:20},placeholder:"样例：\n"+e.jsonPlaceholderSample},model:{value:e.temp.response_sample,callback:function(t){e.$set(e.temp,"response_sample",t)},expression:"temp.response_sample"}})],1)])],2),a("el-collapse-item",{attrs:{title:"",name:"5"}},[a("template",{slot:"title"},[a("div",{staticStyle:{"font-size":"16px","font-weight":"bold"}},[e._v("设置处理响应体后置脚本")])]),a("div",{staticClass:"components-container"},[a("aside",{staticStyle:{"font-size":"12px","line-height":"1.5"}},[e._v(" 可以为空。请输入python代码，这里的代码会在影响前执行，你可以导入python标准库包 "),a("br"),e._v("支持已传入变量：request(请求上下文)，response_header（响应头，dict类型）,response_body（响应体，字符串），response_code（响应状态码，int类型） ")]),a("div",{staticClass:"editor-container"},[a("el-input",{attrs:{type:"textarea",autosize:{minRows:3,maxRows:20},placeholder:"样例：\nimport time\nnow = time.time()\ndata = request.json\nnumber=data['number']\nif number === 'zhangsan':\n    response_code=302\n    response_header={'Location':'/login'}\n    response_body='<html><body>302跳转</body></html>'"},model:{value:e.temp.response_after,callback:function(t){e.$set(e.temp,"response_after",t)},expression:"temp.response_after"}})],1)])],2),a("el-collapse-item",{attrs:{title:"",name:"6"}},[a("template",{slot:"title"},[a("div",{staticStyle:{"font-size":"16px","font-weight":"bold"}},[e._v("系统信息")])]),a("el-row",[a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"创建时间",prop:"type",autosize:""}},[a("el-date-picker",{attrs:{type:"datetime",disabled:!0,placeholder:"Please pick a date"},model:{value:e.temp.createtime,callback:function(t){e.$set(e.temp,"createtime",t)},expression:"temp.createtime"}})],1)],1),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"创建人",prop:""}},[a("el-input",{attrs:{disabled:!0,size:"medium"},model:{value:e.temp.author,callback:function(t){e.$set(e.temp,"author",t)},expression:"temp.author"}})],1)],1),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"修改人",prop:""}},[a("el-input",{attrs:{disabled:!0,size:"medium"},model:{value:e.temp.modifier,callback:function(t){e.$set(e.temp,"modifier",t)},expression:"temp.modifier"}})],1)],1),a("el-col",{attrs:{span:6}},[a("el-form-item",{attrs:{label:"修改时间",prop:"",autosize:""}},[a("el-date-picker",{attrs:{type:"datetime",disabled:!0,placeholder:"Please pick a date"},model:{value:e.temp.modifytime,callback:function(t){e.$set(e.temp,"modifytime",t)},expression:"temp.modifytime"}})],1)],1)],1)],2)],1)],1),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(t){e.dialogFormVisible=!1}}},[e._v(" Cancel ")]),a("el-button",{attrs:{type:"primary"},on:{click:function(t){"create"===e.dialogStatus?e.createData():e.updateData()}}},[e._v(" Confirm ")])],1)],1),a("el-dialog",{attrs:{visible:e.dialogPvVisible,title:"Reading statistics"},on:{"update:visible":function(t){e.dialogPvVisible=t}}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.pvData,border:"",fit:"","highlight-current-row":""}},[a("el-table-column",{attrs:{prop:"key",label:"Channel"}}),a("el-table-column",{attrs:{prop:"pv",label:"Pv"}})],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.dialogPvVisible=!1}}},[e._v("Confirm")])],1)],1)],1)},i=[],r=a("5530"),o=(a("13d5"),a("d3b7"),a("2ca0"),a("ac1f"),a("5319"),a("b0c0"),a("4e82"),a("b64b"),a("3ca3"),a("ddb0"),a("d81d"),a("a434"),a("b775"));function s(e){return Object(o["a"])({url:"/vue-element-admin/article/pv",method:"get",params:{pv:e}})}a("8d41");var l="@@wavesContext";function c(e,t){function a(a){var n=Object.assign({},t.value),i=Object.assign({ele:e,type:"hit",color:"rgba(0, 0, 0, 0.15)"},n),r=i.ele;if(r){r.style.position="relative",r.style.overflow="hidden";var o=r.getBoundingClientRect(),s=r.querySelector(".waves-ripple");switch(s?s.className="waves-ripple":(s=document.createElement("span"),s.className="waves-ripple",s.style.height=s.style.width=Math.max(o.width,o.height)+"px",r.appendChild(s)),i.type){case"center":s.style.top=o.height/2-s.offsetHeight/2+"px",s.style.left=o.width/2-s.offsetWidth/2+"px";break;default:s.style.top=(a.pageY-o.top-s.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",s.style.left=(a.pageX-o.left-s.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return s.style.backgroundColor=i.color,s.className="waves-ripple z-active",!1}}return e[l]?e[l].removeHandle=a:e[l]={removeHandle:a},a}var u={bind:function(e,t){e.addEventListener("click",c(e,t),!1)},update:function(e,t){e.removeEventListener("click",e[l].removeHandle,!1),e.addEventListener("click",c(e,t),!1)},unbind:function(e){e.removeEventListener("click",e[l].removeHandle,!1),e[l]=null,delete e[l]}},p=function(e){e.directive("waves",u)};window.Vue&&(window.waves=u,Vue.use(p)),u.install=p;var d=u,f=a("ed08"),m=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"pagination-container",class:{hidden:e.hidden}},[a("el-pagination",e._b({attrs:{background:e.background,"current-page":e.currentPage,"page-size":e.pageSize,layout:e.layout,"page-sizes":e.pageSizes,total:e.total},on:{"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t},"update:pageSize":function(t){e.pageSize=t},"update:page-size":function(t){e.pageSize=t},"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}},"el-pagination",e.$attrs,!1))],1)},h=[];a("a9e3");Math.easeInOutQuad=function(e,t,a,n){return e/=n/2,e<1?a/2*e*e+t:(e--,-a/2*(e*(e-2)-1)+t)};var b=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(e){window.setTimeout(e,1e3/60)}}();function v(e){document.documentElement.scrollTop=e,document.body.parentNode.scrollTop=e,document.body.scrollTop=e}function y(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function g(e,t,a){var n=y(),i=e-n,r=20,o=0;t="undefined"===typeof t?500:t;var s=function e(){o+=r;var s=Math.easeInOutQuad(o,n,i,t);v(s),o<t?b(e):a&&"function"===typeof a&&a()};s()}var _={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(e){this.$emit("update:page",e)}},pageSize:{get:function(){return this.limit},set:function(e){this.$emit("update:limit",e)}}},methods:{handleSizeChange:function(e){this.$emit("pagination",{page:this.currentPage,limit:e}),this.autoScroll&&g(0,800)},handleCurrentChange:function(e){this.$emit("pagination",{page:e,limit:this.pageSize}),this.autoScroll&&g(0,800)}}},k=_,w=(a("2cbf"),a("2877")),x=Object(w["a"])(k,m,h,!1,null,"6af373ef",null),S=x.exports,E=(a("bc3a"),a("2b0e")),P=a("b311"),C=a.n(P);function T(){E["default"].prototype.$message({message:"Copy successfully",type:"success",duration:1500})}function R(){E["default"].prototype.$message({message:"Copy failed",type:"error"})}function L(e,t){var a=new C.a(t.target,{text:function(){return e}});a.on("success",(function(){T(),a.destroy()})),a.on("error",(function(){R(),a.destroy()})),a.onClick(t)}var O=a("b311");if(!O)throw new Error("you should npm install `clipboard` --save at first ");var z={bind:function(e,t){if("success"===t.arg)e._v_clipboard_success=t.value;else if("error"===t.arg)e._v_clipboard_error=t.value;else{var a=new O(e,{text:function(){return t.value},action:function(){return"cut"===t.arg?"cut":"copy"}});a.on("success",(function(t){var a=e._v_clipboard_success;a&&a(t)})),a.on("error",(function(t){var a=e._v_clipboard_error;a&&a(t)})),e._v_clipboard=a}},update:function(e,t){"success"===t.arg?e._v_clipboard_success=t.value:"error"===t.arg?e._v_clipboard_error=t.value:(e._v_clipboard.text=function(){return t.value},e._v_clipboard.action=function(){return"cut"===t.arg?"cut":"copy"})},unbind:function(e,t){"success"===t.arg?delete e._v_clipboard_success:"error"===t.arg?delete e._v_clipboard_error:(e._v_clipboard.destroy(),delete e._v_clipboard)}},$=function(e){e.directive("Clipboard",z)};window.Vue&&(window.clipboard=z,Vue.use($)),z.install=$;var q=z,A=[{key:"POST",display_name:"POST"},{key:"GET",display_name:"GET"},{key:"PUT",display_name:"PUT"},{key:"DELTE",display_name:"DELTE"},{key:"OPTION",display_name:"OPTION"},{key:"HEAD",display_name:"HEAD"}],j=A.reduce((function(e,t){return e[t.key]=t.display_name,e}),{}),F={name:"List",components:{Pagination:S},directives:{waves:d,clipboard:q},filters:{statusFilter:function(e){var t={published:"success",draft:"info",deleted:"danger"};return t[e]},typeFilter:function(e){return j[e]}},data:function(){return{VUE_APP_MOCK_SERVER:"http://172.18.2.171:8085",jsonPlaceholderSample:'{"status": "success","number": "{{number}}"}',response_before_code:"",activeNames:["1"],tableKey:0,tablelist:null,total:0,listLoading:!0,listQuery:{page:1,limit:20,name:void 0,path:void 0,type:void 0,sort:"+id"},importanceOptions:[1,2,3],httpTypeOptions:A,sortOptions:[{label:"ID Ascending",key:"+id"},{label:"ID Descending",key:"-id"}],showReviewer:!1,temp:{fid:void 0},defaultTemp:{fid:void 0,name:"",method:"POST",path:"",isRandomPath:!0,basePath:"",baseURL:"",fullPath:"",createtime:"",author:"",modifier:"",modifytime:"",response_before:"",response_after:"",response_sample:"",response_header:"",response_code:200},dialogFormVisible:!1,dialogStatus:"",textMap:{update:"修改",create:"新增"},dialogPvVisible:!1,pvData:[],rules:{name:[{required:!0,message:"名称 is required",trigger:"change"}],path:[{required:!0,message:"path is required",trigger:"change"}],response_code:[{required:!0,message:"响应码 is required",trigger:"change"}],sample:[{required:!0,message:"响应样例 is required",trigger:"change"}],headerkey:[{required:!0,message:"header key is required",trigger:"change"}],headervalue:[{required:!0,message:"header value is required",trigger:"change"}]},downloadLoading:!1}},watch:{"temp.path":function(e,t){"create"===this.dialogStatus&&this.refreshOtherPath()},"temp.isRandomPath":function(e,t){"create"===this.dialogStatus&&(this.initBasePath(),this.refreshOtherPath())}},created:function(){this.getList()},methods:{refreshOtherPath:function(){this.temp.fullPath="",this.temp.path.startsWith("/")||0===this.temp.path.length||(this.temp.path="/"+this.temp.path);var e=this.temp.basePath+this.temp.path;e=e.replace(/\/\//g,"/"),this.temp.fullPath="http://172.18.2.171:8085"+e,this.temp.baseURL="http://172.18.2.171:8085"+this.temp.basePath},initBasePath:function(){this.temp.basePath="/",!0===this.temp.isRandomPath&&"/"===this.temp.basePath&&(this.temp.basePath="/"+this.getRandomLetters())},getRandomLetters:function(){for(var e="",t="abcdefghijklmnopqrstuvwxyz",a=0;a<8;a++){var n=Math.floor(Math.random()*t.length),i=t.charAt(n);e+=i}return e},handleCollapseChange:function(e){console.log(e)},getList:function(){this.handleFilter({})},handleFilter:function(e){var t=this,a={name:e.name,uri:e.path,fid:e.fid};this.$axios.get("http://172.18.2.171:8085/mock/query",{params:a}).then((function(e){t.tablelist=e.data.data,t.total=t.tablelist.length,t.listLoading=!1})).catch((function(e){t.$notify.error({title:"查询失败",message:e,duration:2e3}),t.listLoading=!1}))},handleModifyStatus:function(e,t){this.$message({message:"操作Success",type:"success"}),e.status=t},sortChange:function(e){},sortByID:function(e){this.listQuery.sort="ascending"===e?"+id":"-id",this.handleFilter()},resetTemp:function(){this.temp=Object(r["a"])({},this.defaultTemp),this.temp.response_header=[{key:"Content-Type",value:"application/json",description:"Content-Type"}]},handleCreate:function(){var e=this;this.resetTemp(),this.initBasePath(),this.refreshOtherPath(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick((function(){e.$refs["dataForm"].clearValidate()}))},validatePathExists:function(){this.getList();for(var e=0;e<this.tablelist.length;e++){var t=this.tablelist[e],a=this.temp.basePath+this.temp.path;if(a=a.replace("//","/"),t.uri===a&&t.fid!==this.temp.fid)return console.log("验证重复"),!0}return!1},formValidateMore:function(e){if(!e)return this.$notify.error({title:"失败",message:"必填项未输入完成",duration:2e3}),!1;if(0===this.temp.response_header.length)return this.$notify.error({title:"失败",message:"header 不能为空",duration:2e3}),!1;for(var t=0;t<this.temp.response_header.length;t++)if(void 0===this.temp.response_header[t].key||void 0===this.temp.response_header[t].value)return this.$notify.error({title:"失败",message:"响应头的 key value应填写完整",duration:2e3}),!1;return!0!==this.validatePathExists()||(this.$notify.error({title:"失败",message:"path 已存在，请勿重复新增，或者关闭页面后重新打开",duration:2e3}),!1)},handlePostCallback:function(e){console.log(e),200!==e.status||"success"!==e.data.status?this.$notify.error({title:"失败",message:"响应报错："+e.data,duration:2e3}):(this.dialogFormVisible=!1,this.$notify({title:"成功",message:"Successfully",type:"success",duration:2e3}))},postData:function(e,t){var a=this;this.$axios({method:"post",url:"http://172.18.2.171:8085"+e,data:t}).then((function(e){a.handlePostCallback(e),a.getList()})).catch((function(e){a.$notify.error({title:"失败",message:e,duration:2e3})}))},createData:function(){var e=this,t=this.temp.basePath+this.temp.path,a={after:this.temp.response_after,before:this.temp.response_before,creator:"1",do_make:"",name:this.temp.name,response_code:this.temp.response_code,response_header:this.temp.response_header,response_sample:this.temp.response_sample,uri:t.replace("//","/"),baseuri:this.temp.path},n="/mock/add";this.$refs["dataForm"].validate((function(t){var i=e.formValidateMore(t);i&&e.postData(n,a)}))},resetEditData:function(e){this.temp={fid:e.fid,path:e.uri,name:e.name,isRandomPath:e.uri!==e.baseuri,basePath:"",baseURL:"",fullPath:this.VUE_APP_MOCK_SERVER+e.uri,createtime:e.createtime,author:e.creator,modifier:e.modifier,modifytime:e.modifytime,response_before:e.before,response_after:e.after,response_sample:e.response_sample,response_header:JSON.parse(e.response_header),response_code:e.response_code},this.temp.basePath=e.uri.replace(e.baseuri,""),this.temp.path=e.uri.replace(this.temp.basePath,""),this.temp.baseURL=this.VUE_APP_MOCK_SERVER+this.temp.basePath,this.temp.fullPath=this.VUE_APP_MOCK_SERVER+this.temp.basePath+this.temp.path},handleUpdate:function(e){var t=this;this.dialogFormVisible=!0,this.resetEditData(e),this.dialogStatus="update",this.$nextTick((function(){t.$refs["dataForm"].clearValidate()}))},updateData:function(){var e=this,t=this.temp.basePath+this.temp.path,a={fid:this.temp.fid,after:this.temp.response_after,before:this.temp.response_before,creator:"1",do_make:"",name:this.temp.name,response_code:this.temp.response_code,response_header:this.temp.response_header,response_sample:this.temp.response_sample,uri:t.replace("//","/"),baseuri:this.temp.path},n="/mock/update";this.$refs["dataForm"].validate((function(t){var i=e.formValidateMore(t);i&&e.postData(n,a)}))},handleDelete:function(e,t){var a="/mock/delete1",n={fid:e.fid};this.postData(a,n)},handleFetchPv:function(e){var t=this;s(e).then((function(e){t.pvData=e.data.pvData,t.dialogPvVisible=!0}))},handleDownload:function(){var e=this;this.downloadLoading=!0,Promise.all([a.e("chunk-6e83591c"),a.e("chunk-5164a781"),a.e("chunk-7f4cd4ea"),a.e("chunk-2133cd4f")]).then(a.bind(null,"4bf8")).then((function(t){var a=["timestamp","title","type","importance","status"],n=["timestamp","title","type","importance","status"],i=e.formatJson(n);t.export_json_to_excel({header:a,data:i,filename:"table-list"}),e.downloadLoading=!1}))},formatJson:function(e){return this.list.map((function(t){return e.map((function(e){return"timestamp"===e?Object(f["d"])(t[e]):t[e]}))}))},getSortClass:function(e){console.log("getSortClass")},addHeaderRow:function(){this.temp.response_header.push({}),console.log(this.temp.response_header)},deleteHeaderRow:function(e,t){t.splice(e,1)},handleCopy:function(e,t){L(e,t)},clipboardSuccess:function(){this.$message({message:"Copy successfully",type:"success",duration:1500})}}},V=F,M=(a("1860"),Object(w["a"])(V,n,i,!1,null,"5ba95108",null));t["default"]=M.exports}}]);