<template>
  <div>
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span style="width:33.3%;">{{ data.title }}</span>
        <span style="width:33.3%;text-align:center;">
          <input
            type="text"
            :value="data.sort_id"
            @keyup.enter="handleKeyUp($event,data)"
            class="categoryInput"
          >
        </span>
        <span style="width:33.3%;text-align:center;">
          <el-button type="text" size="mini" @click="() => append(data)">编辑</el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: []
    };
  },

  methods: {
    append(data) {},
    //获取栏目数据
    getList() {
      this.$axios({
        url: "http://localhost:8899/admin/category/getlist/goods",
        method: "GET"
      }).then(res => {
        const { message, status } = res.data;
        if (status == 0) {
          this.data = message;
        }
      });
    },

    //获取输入框的值
    handleKeyUp(event, data) {
      if (data.sort_id == event.target.value) {
        return;
      }

      //获取用户确认信息
      let res = window.confirm("是否确认编辑");

      // 如果用户确认编辑，则提交编辑数据
      if (res) {
        this.$axios({
          url: `http://localhost:8899/admin/category/edit/${data.category_id}`,
          method: "POST",
          data: {
            ...data,
            sort_id: event.target.value
          },
          // 处理session跨域
          withCredentials: true
        }).then(res => {
          const { message, status } = res.data;
          if (status == 0) {
            this.$message.success(message);
            //重新获取数据渲染页面
            this.getList();
          } else {
            this.$message.error(message);
          }
        });
      }
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style scoped>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.categoryInput {
  width: 50px;
  height: 20px;
}
</style>
