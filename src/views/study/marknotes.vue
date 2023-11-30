<template>

  <div class="notebook-container">

    <!-- 左边侧边栏 -->

    <div class="sidebar">
      <h2>文件夹</h2>
      <ul>
        <li v-for="(folder, index) in folders" :key="index" @click="selectFolder(folder)">
          {{ folder.name }}
        </li>
      </ul>
    </div>

    <!-- 右边笔记内容区域 -->

    <div class="note-area">
      <h2>{{ selectedFolder.name }}</h2>
      <div>
        <textarea v-model="selectedFolder.note" class="myTextarea" />
      </div>
    </div>
  </div>
</template>
<script>

/* eslint-disable import/no-webpack-loader-syntax */
import marked from '!!raw-loader!marked'

export default {
  data() {
    return {
      folders: [
        { name: '文件夹1', note: '这是文件夹1的笔记内容' },
        { name: '文件夹2', note: '这是文件夹2的笔记内容' },
        { name: '文件夹3', note: '这是文件夹3的笔记内容' }
      ],
      selectedFolder: { name: '', note: '' }
    }
  },

  methods: {
    selectFolder(folder) {
      this.selectedFolder = { ...folder }
    }
  }
}
</script>
<style>
.notebook-container {
display: flex;
justify-content: space-between;
}
.sidebar {
min-width: 200px;
background-color: #f0f0f0;
padding: 20px;
}
ul {
list-style: none;
padding: 0;
}
li {
cursor: pointer;
margin-bottom: 10px;
}
.note-area {
flex-grow: 1;
padding: 20px;
}
h2 {
margin-bottom: 10px;
}
.myTextarea {
width: 100%;
height: 300px;
}
</style>
