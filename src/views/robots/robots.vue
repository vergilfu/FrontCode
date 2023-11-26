<template>
  <el-form :inline="true" :model="formInline" class="demo-form-inline">
    <el-container>
      <el-main>
        <div ref="chatbox" class="chatbox">
          <div v-for="message in messages" :key="message.id" class="message">
            {{ message.content }}
          </div>
          <input v-model="newMessage" type="text" placeholder="请输入消息" @keyup.enter="sendMessage">
        </div>

      </el-main>
    </el-container>
  </el-form>
</template>

<script>
import axios from 'axios'
import { constants } from 'fs'

export default {
  data() {
    return {
      activeNames: [''],
      formInline: {
        user: '',
        region: ''
      },

      messages: [
        { id: 1, content: 'Hello' },
        { id: 2, content: 'Hi' }
      ],
      newMessage: '',
      theanswer: ''
    }
  },

  created() {
  },
  mounted() {
    // 滚动到最新消息
    this.$nextTick(() => {
      this.$refs.chatbox.scrollTop = this.$refs.chatbox.scrollHeight
    })
  },

  methods: {
    sendMessage() {
      if (this.newMessage.trim()) {
        this.messages.push({
          id: Date.now(),
          content: this.newMessage.trim()
        })
        axios.post(process.env.VUE_APP_CONFIG_API + '/gpt/chat/getanswer', {
          question: this.newMessage.trim()
        })
          .then(response => {
            this.theanswer = response.data
            this.messages.push({
              id: Date.now(),
              content: this.theanswer.trim()
            })
          })
          .catch(error => {
            // 处理错误
          })
        this.newMessage = ''
      }
    }

  }
}
</script>

<style scoped>
.message {
  margin-bottom: 10px;
}

input {
  width: 100%;
  padding: 10px;
}
</style>
