<template>
  <div class="chat-container">
    <div class="chat-header">
      <h1 class="text-center">GPT-4.0</h1>
    </div>
    <div class="chat-content">
      <div id="chatWindow" class="mb-3" style="width: 100%;" />
    </div>
    <div class="chat-footer">
      <div class="input-group">
        <textarea
          ref="myTextarea"
          v-model="chatInput"
          rows="2"
          class="chat-message-input"
          placeholder="请输入消息"
          @keydown="handleKeyDown"
        />
        <el-button type="success" class="send-button" @click="sendMessage">发送<br>(ctrl+enter)</el-button>
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
      maxTextareaHeight: 150, // 最大高度值，单位可以根据实际情况调整
      chatInput: '',
      chatWindow: null,
      userIcon: require('@/assets/dashboard/image/robot.jpg'),
      botIcon: require('@/assets/dashboard/image/robot.jpg'),

      robotmsg: '',
      robotdom: null,
      robotmsgtol: [],
      websocket: null
    }
  },
  watch: {
    robotmsg(newVal, oldVal) {
      this.dealwithstr(newVal)
    }
  },

  created() {
    this.websocket = new WebSocket('ws://172.20.200.121:8090') // 替换为你的WebSocket地址
    this.websocket.onmessage = (event) => {
      this.robotmsg = event.data
    }
  },

  mounted() {
    this.chatWindow = document.getElementById('chatWindow')
    this.$refs.myTextarea.addEventListener('input', this.adjustTextareaHeight)
  },

  methods: {
    handleKeyDown(event) {
      if (event.ctrlKey && event.keyCode === 13) {
        // 这里可以处理Ctrl + Enter键被按下的逻辑
        this.sendMessage()
      }
    },
    adjustTextareaHeight() {
      this.$refs.myTextarea.style.height = 'auto'
      this.$refs.myTextarea.style.height = Math.min(this.$refs.myTextarea.scrollHeight, this.maxTextareaHeight) + 'px'
    },
    dealwithstr(newstr) {
      // 在接收到事件时，将字符串拼接到已有的字符串上
      if (newstr.indexOf('\n\n') !== -1 || newstr.indexOf('\n') !== -1) {
        const list = newstr.split(/\n\n|\n/)
        this.robotdom.lastElementChild.textContent += list[0]

        for (let i = 1; i < list.length; i++) {
          const newElement = document.createElement('p')
          newElement.setAttribute('style', 'white-space: pre-wrap;width:80%; word-wrap: break-word;')
          newElement.textContent = list[i]
          this.robotdom.appendChild(newElement)
          // this.concatenatedString.push(list[i])
        }
      } else {
        console.log(newstr)
        this.robotdom.lastElementChild.textContent += newstr
      }
    },

    addUserMessage(message) {
      const newElement1 = document.createElement('div')
      newElement1.className = 'message-bubble1'
      const newElement2 = document.createElement('img')
      newElement2.className = 'chat-icon'
      newElement2.setAttribute('src', this.userIcon)
      const newElement3 = document.createElement('p')
      newElement3.setAttribute('style', 'white-space: pre-wrap; word-wrap: break-word;')
      newElement3.innerHTML = message
      newElement1.appendChild(newElement2)
      newElement1.appendChild(newElement3)
      this.chatWindow.appendChild(newElement1)
      this.chatInput = ''
      this.scrollToBottom()
      this.websocket.send(JSON.stringify(message))
      this.addBotMessage()
    },
    addBotMessage() {
      const newElement1 = document.createElement('div')
      newElement1.className = 'message-bubble2'
      const newElement2 = document.createElement('img')
      newElement2.className = 'chat-icon'
      newElement2.setAttribute('src', this.botIcon)
      const newElement3 = document.createElement('div')
      const newElement4 = document.createElement('p')
      newElement4.setAttribute('style', 'white-space: pre-line;width:80%; word-wrap: break-word;')
      newElement4.textContent = ''
      newElement3.appendChild(newElement4)
      newElement1.appendChild(newElement2)
      newElement1.appendChild(newElement3)
      this.chatWindow.appendChild(newElement1)
      this.robotdom = newElement3
      this.scrollToBottom()
    },
    sendMessage() {
      const message = this.chatInput.trim()
      if (message.length === 0) {
        common_ops.alert('请输入内容！')
        return
      }
      this.addUserMessage(message)
      this.scrollToBottom() // 添加这行代码
    },
    scrollToBottom() {
      this.$nextTick(() => {
        this.chatWindow.scrollTop = this.chatWindow.scrollHeight
      })
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
  width: 800px;
  margin-top: auto;
  min-height: 50px;
}

.chat-message-input {
  width: 100%;
  min-height: 50px;

}

.chat-icon {
  width: 30px;
  height: 30px;
}

.message-bubble1 {
  background-color: #B0C4DE;
}

.message-bubble2 {
  background-color: #5F9EA0;
}
</style>
