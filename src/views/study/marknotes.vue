<template>
  <el-container class="top-con">
    <el-aside class = 'aside-con'>
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </el-aside>
    <el-container class="content-con">
      <el-header>
        <textarea rows="2" ref="myTextarea" v-model="title" class="title" placeholder="请输入title"></textarea>
      </el-header>
      <el-main>
        <textarea rows="10" ref="myTextarea" v-model="content" class="content" placeholder="请输入内容"></textarea>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          label: "一级 1",
          children: [
            {
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 2",
          children: [
            {
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1"
                }
              ]
            },
            {
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1"
                }
              ]
            }
          ]
        },
        {
          label: "一级 3",
          children: [
            {
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1"
                }
              ]
            },
            {
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1"
                }
              ]
            }
          ]
        }
      ],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },

  methods: {
    handleNodeClick(data) {
      console.log(data);
    }
  }
};
</script>
<style>
.top-con {
  height: 100vh;
}
.aside-con {
  width:100px;
}
.title {
  width: 80%;
  min-height: 50px;
  resize: none;
  margin: 2%;
}
.content {
  width: 80%;
  min-height: 50px;
  resize: none;
  margin: 2%;
}
</style>
