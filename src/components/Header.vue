<template>
    <el-row type="flex" justify="space-between">
        <div class="arrow" @click="handleClick">
        <i class="el-icon-back"></i>
        </div>
        <div>退出</div>
    </el-row>
</template>

<script>
export default {
  methods: {
    //点击触发自定义的aside里面的事件
    handleClick() {
      this.$emit("click");
    }
  }
};
</script>

<style scoped>
.arrow {
  cursor: pointer;
}
</style>
