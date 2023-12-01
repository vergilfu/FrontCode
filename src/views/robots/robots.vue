<template>
  <div class="chat-container">
    <div class="chat-header">
      <img :src=robot1 style="height: 50%; margin: 10%;">
      <el-select v-model="model" placeholder="请选择" style="margin-top: 13%;width: 300px;">
        <el-option v-for="item in models" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div id="chat-content" class="chat-content">
      <div id="chatWindow" class="mb-3" style="width: 100%;"></div>
    </div>
    <div class="chat-footer">
      <div class="input-group">
        <div style="width: 20%;"></div>
        <div style="display: flex;width: 55%;border-color: 	#d9d9e3;border-width: 1px;border-style: solid;box-shadow: 0px 0px 5px #d9d9e3(0, 0, 0, 0.5);border-radius: 5px;margin:1%;">
          <textarea  @keydown="handleKeyDown" rows="2" ref="myTextarea" v-model="chatInput"
            class="chat-message-input" placeholder="请输入消息"></textarea>
          <el-button type="success" class="send-button" @click="sendMessage">发送<br>(ctrl+enter)</el-button>
        </div>

        <el-upload style="width: 20%;height: auto;" drag action="https://jsonplaceholder.typicode.com/posts/" multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios'
import { constants } from 'fs'

export default {

  data() {
    return {
      maxTextareaHeight: 150,// 最大高度值，单位可以根据实际情况调整
      chatInput: '',
      chatWindow: null,
      chat_content: null,
      userIcon: require('@/assets/dashboard/image/women.jpg'),
      botIcon: require('@/assets/dashboard/image/robot.jpg'),
      robot1: require('@/assets/dashboard/image/robot1.jpg'),
      robotmsg: '',
      robotdom: null,
      robotmsgtol: [],
      websocket: null,
      models: [{
        value: 'gpt-3.5-turbo',
        label: 'gpt-3.5-turbo'
      }, {
        value: 'gpt-3.5-turbo-16k',
        label: 'gpt-3.5-turbo-16k'
      }, {
        value: 'gpt-4',
        label: 'gpt-4'
      }, {
        value: 'gpt-4-32k',
        label: 'gpt-4-32k'
      }],
      model: 'gpt-3.5-turbo'
    }
  },

  created() {
    this.websocket = new WebSocket('ws://172.20.200.121:8090') // 替换为你的WebSocket地址
    this.websocket.onmessage = (event) => {
      this.robotmsg = event.data
    }
  },

  mounted() {
    this.chatWindow = document.getElementById('chatWindow');
    this.chat_content = document.getElementById('chat-content');
    console.log(this.chatWindow);
    console.log(this.chat_content);

    this.$refs.myTextarea.addEventListener('input', this.adjustTextareaHeight);
  },

  methods: {
    handleKeyDown(event) {
      if (event.ctrlKey && event.keyCode === 13) {
        // 这里可以处理Ctrl + Enter键被按下的逻辑
        this.sendMessage();
      }
    },
    adjustTextareaHeight() {
      this.$refs.myTextarea.style.height = 'auto';
      this.$refs.myTextarea.style.height = Math.min(this.$refs.myTextarea.scrollHeight, this.maxTextareaHeight) + 'px';
    },
    dealwithstr(newstr) {
      // 在接收到事件时，将字符串拼接到已有的字符串上
      if (newstr.indexOf('\n\n') !== -1 || newstr.indexOf('\n') !== -1) {
        const list = newstr.split(/\n\n|\n/)
        this.robotdom.lastElementChild.textContent += list[0]
        this.scrollToBottom();

        for (let i = 1; i < list.length; i++) {
          const newElement = document.createElement('p');
          newElement.setAttribute('style', 'white-space: pre-wrap;width:80%; word-wrap: break-word;');
          newElement.textContent = list[i];
          this.robotdom.appendChild(newElement);
          this.scrollToBottom();
          // this.concatenatedString.push(list[i])
        }
      } else {
        console.log(newstr)
        this.robotdom.lastElementChild.textContent += newstr
        this.scrollToBottom();
      }
    },

    addUserMessage(message) {
      const newElement1 = document.createElement('div');
      newElement1.className = 'message-bubble1';
      const newElement2 = document.createElement('img');
      newElement2.className = 'chat-icon';
      newElement2.setAttribute('src', this.userIcon);
      const newElement3 = document.createElement('p');
      newElement3.setAttribute('style', 'white-space: pre-wrap; word-wrap: break-word;');
      newElement3.innerHTML = message;
      newElement1.appendChild(newElement2);
      newElement1.appendChild(newElement3);
      this.chatWindow.appendChild(newElement1);
      this.chatInput = '';
      this.scrollToBottom();
      this.websocket.send(JSON.stringify({method:'chat', model: this.model, question: message }))
      this.addBotMessage();
    },
    addBotMessage() {
      const newElement1 = document.createElement('div');
      newElement1.className = 'message-bubble2';
      const newElement2 = document.createElement('img');
      newElement2.className = 'chat-icon';
      newElement2.setAttribute('src', this.botIcon);
      const newElement3 = document.createElement('div');
      const newElement4 = document.createElement('p');
      newElement4.setAttribute('style', 'white-space: pre-line;width:80%; word-wrap: break-word;');
      newElement4.textContent = '';
      newElement3.appendChild(newElement4);
      newElement1.appendChild(newElement2);
      newElement1.appendChild(newElement3);
      this.chatWindow.appendChild(newElement1);
      this.robotdom = newElement3
      this.scrollToBottom();
    },
    sendMessage() {
      const message = this.chatInput.trim();
      if (message.length === 0) {
        alert('请输入内容！');
        return;
      }
      this.addUserMessage(message);
    },
    scrollToBottom() {
      this.$nextTick(() => {
        this.chatWindow.scrollTop = this.chatWindow.scrollHeight;
        this.chat_content.scrollTop = this.chat_content.scrollHeight;
      });
    }
  },
  watch: {
    robotmsg(newVal, oldVal) {
      this.dealwithstr(newVal);
    }
  }
}

</script>

<style>
.chat-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90vh;
}

.chat-header {
  height: 10%;
  display: flex;
}

.chat-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  overflow-y: auto;
  width: 1800px;
  height: 73%;
}

.chat-footer {
  height: 17%;
  margin-bottom: 3%;
  width: 100%;
}

.chatWindow {
  max-height: calc(100% - 50px);
  margin-bottom: 10px;
  overflow-y: auto;
  flex-grow: 1;
  white-space: pre-wrap;
}

.input-group {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: auto;
  min-height: 50px;
}

.chat-message-input {
  width: 100%;
  min-height: 50px;
  border: none;
  resize: none;
}
.chat-message-input:focus {
  outline: none;
}


.chat-icon {
  width: 30px;
  height: 30px;
}

.message-bubble1 {
  background-color: #FF69B4;
}

.message-bubble2 {
  background-color: #D8BFD8;
}

.send-button {
  background-color: #FFB6C1;
  border: none
}

.send-button:hover {
  background-color: #FFB6C1;
  background-color: #FFC0CB;
  border: none
}
</style>
