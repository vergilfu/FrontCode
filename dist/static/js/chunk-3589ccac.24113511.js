(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3589ccac"],{2728:function(e,t,i){"use strict";i("ecc1")},"5fe4":function(e,t,i){"use strict";i.r(t);var o=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"Page"},[i("el-form",{ref:"mainFormRef",staticStyle:{padding:"0 80px"},attrs:{model:e.main_form,"label-width":"100px",rules:e.rules}},[i("el-form-item",{attrs:{label:"声纹采集：",prop:"file"}},[i("el-select",{staticStyle:{width:"200px"},attrs:{disabled:e.voiceStatus,placeholder:"请选择麦克风"},model:{value:e.main_form.chooseMicDeviceId,callback:function(t){e.$set(e.main_form,"chooseMicDeviceId",t)},expression:"main_form.chooseMicDeviceId"}},e._l(e.Mic,(function(e){return i("el-option",{key:e.deviceId,attrs:{label:e.label,value:e.deviceId}})})),1),""!=e.main_form.chooseMicDeviceId?i("div",{staticClass:"voiceGather"},[i("el-button",{staticStyle:{"margin-top":"20px"},on:{click:e.voiceInput}},[e._v(e._s(e.voiceStatus?"取消录音":"开始录音"))]),e.voiceStatus?[i("div",{staticClass:"bo"},e._l(e.RMSList,(function(e,t){return i("div",{key:t,staticClass:"RMS",style:{height:e/100*40+"px"}})})),0)]:e._e()],2):e._e()],1)],1)],1)},c=[],a=(i("d3b7"),i("159b"),i("ace4"),i("5cc6"),i("9a8c"),i("a975"),i("735e"),i("c1ac"),i("d139"),i("3a7b"),i("d5d6"),i("82f8"),i("e91f"),i("60bd"),i("5f96"),i("3280"),i("3fcc"),i("ca91"),i("25a1"),i("cd26"),i("3c5d"),i("2954"),i("649e"),i("219c"),i("170b"),i("b39a"),i("72f7"),i("e9c4"),i("a9ee")),n=i.n(a),r={data:function(){return{websocket:"",recorder:"",voiceStatus:!1,main_form:{chooseMicDeviceId:""},Mic:[],rules:{file:[{required:!0,message:"不能为空",trigger:"blur"}]}}},created:function(){var e=this;this.websocket=new WebSocket("wss://172.20.200.121:8090"),this.websocket.onerror=function(e){console.error("WebSocket error:",e)},this.websocket.onmessage=function(t){e.robotmsg=t.data}},mounted:function(){this.getMic()},methods:{getMic:function(){var e=this;console.log("navigator"+navigator.mediaDevices.getUserMedia),navigator.mediaDevices&&navigator.mediaDevices.getUserMedia&&navigator.mediaDevices.getUserMedia({audio:!0}).then((function(t){navigator.mediaDevices.enumerateDevices().then((function(t){t.forEach((function(i){console.log(t),"audioinput"===i.kind&&"default"!=i.deviceId&&"communications"!=i.deviceId&&e.Mic.push(i)}))})),t.getTracks().forEach((function(e){return e.stop()}))}))},voiceInput:function(){this.voiceStatus?this.stopRecord():this.startRecord()},startRecord:function(){var e=this,t=this;this.voiceStatus=!0,window.navigator.mediaDevices.getUserMedia({audio:{deviceId:this.main_form.chooseMicDeviceId}}).then((function(t){e.stream=t,e.getVoice(),e.recorder=n()(t,{type:"audio",mimeType:"audio/wav",recorderType:n.a.StereoAudioRecorder,desiredSampRate:16e3,numberOfAudioChannels:1,timeSlice:1e3,ondataavailable:e.sendData}),e.recorder.startRecording()})).catch((function(e){console.log(e),console.log("当前浏览器不支持开启麦克风!"),t.voiceStatus=!1}))},stopRecord:function(){if(this.voiceStatus=!1,null!=this.recorder){var e=this.recorder;e.stopRecording();var t=this.stream;clearInterval(this.timer1),t.getAudioTracks().forEach((function(e){return e.stop()}))}},getVoice:function(){var e=new(window.AudioContext||window.webkitAudioContext),t=e.createMediaStreamSource(this.stream),i=e.createAnalyser();t.connect(i);var o=new Uint8Array(i.frequencyBinCount);function c(){i.getByteFrequencyData(o);for(var e=0,t=0;t<o.length;t++)e+=o[t];var c=e/o.length;return c}this.timer1=setInterval((function(){var e=c();console.log("音量:",Math.round(e))}),100)},sendData:function(e){var t=new Blob([e],{type:"audio/wav; codecs=opus"});this.websocket.send(JSON.stringify({method:"chat",model:this.model,question:message}));var i=new window.File([t],"测试.wav");console.log(i)}}},s=r,d=(i("2728"),i("2877")),u=Object(d["a"])(s,o,c,!1,null,"98501866",null);t["default"]=u.exports},ecc1:function(e,t,i){}}]);