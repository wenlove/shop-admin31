<template>
  <div>
    <!-- 搜索框 -->
    <div class="order_search">
      <el-input placeholder="请输入内容" v-model="searchvalue" class="input-with-select">
        <el-button slot="append" @click="handleSearch" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <!-- 会员列表数据 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="user_name" label="姓名"></el-table-column>
      <el-table-column prop="mobile" label="手机"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="add_time" label="时间"></el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleCheck(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页模块 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      pageIndex: 1,
      pageSize: 5,
      total: 0, //总条数

      searchvalue: "" //搜索关键字
    };
  },
  methods: {
    getList() {
      this.$axios({
        url: `http://localhost:8899/admin/account/getlist`,
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          searchvalue: this.searchvalue
        },
        method: "GET"
      }).then(res => {
        // console.log(res.data);
        const { message, status } = res.data;
        if (status == 0) {
          this.tableData = message;

          this.total = res.data.totalcount;
        }
      });
    },
    handleSelectionChange(val) {
      console.log(val);
    },
    handleCheck(row) {
      const { id } = row;
      this.$router.push("/admin/order-edit/" + id);
    },
    //分页
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.pageSize = val;

      //重新加载数据
      this.getList();
    },
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.pageIndex = val;

      //重新加载数据
      this.getList();
    },

    //搜索关键字
    handleSearch() {
      this.getList();
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style lang="less" >
.order_search {
  text-align: right;
  margin-bottom: 20px;
  .el-input {
    width: 200px;
  }
}
.el-pagination {
  margin-top: 15px;
}
</style>