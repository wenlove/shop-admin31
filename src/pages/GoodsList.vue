<template>
  <div>
    <!-- 商品列表顶部 -->
    <el-row type="flex" justify="space-between" class="goods-option">
      <div>
        <el-button @click="handleToGoodsAdd">新增</el-button>
        <el-button type="danger" @click="handleDeleteMore">删除</el-button>
      </div>
      <!-- 搜索框部分 -->
      <div class="goods-search">
        <el-input placeholder="请输入内容" v-model="searchValue" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </div>
    </el-row>

    <!-- 商品列表数据 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column label="日期" width="300">
        <template slot-scope="scope">
          <el-row type="flex" align="middle">
            <img :src="scope.row.imgurl" class="img">
            <div>{{scope.row.title}}</div>
          </el-row>
        </template>
      </el-table-column>

      <el-table-column prop="categoryname" label="类型"></el-table-column>
      <el-table-column prop="sell_price" label="价格"></el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" style="text-align:center" width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页相关-->
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
      //商品列表数据
      tableData: [],

      selectGoods: [], // 选中的商品
      searchValue: "", //搜索关键字

      //分页相关
      pageIndex: 1, //当前页
      pageSize: 5, //每页显示条数
      total: 0 //总页数
    };
  },

  methods: {
    //获取所有商品数据
    getList() {
      this.$axios({
        url: `http://localhost:8899/admin/goods/getlist?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}
        &searchvalue=${this.searchValue}`,
        method: "GET"
      }).then(res => {
        //解构赋值
        const { message, status } = res.data;
        console.log(message);

        if (status === 0) {
          this.tableData = message;

          //获取总页数
          this.total = res.data.totalcount;
        }
      });
    },
    //封装删除函数
    deleteList(ids) {
      this.$axios({
        url: `http://localhost:8899/admin/goods/del/${ids}`,
        method: "GET"
      }).then(res => {
        const { message, status } = res.data;

        if (status === 0) {
          this.$message.success(message);
          this.getList();
        } else {
          this.$message.error(message);
        }
      });
    },
    //点击多选按钮，选择每一项时候就触发
    handleSelectionChange(val) {
      this.selectGoods = val;
    },

    //每页显示条数
    handleSizeChange(val) {
      //console.log(`每页 ${val} 条`);
      this.pageSize = val;

      //重新请求数据
      this.getList();
    },
    //获取当前页
    handleCurrentChange(val) {
      //console.log(`当前页: ${val}`);
      this.pageIndex = val;

      //重新请求数据
      this.getList();
    },
    //编辑
    handleEdit(goods) {
      // console.log(goods);
      this.$router.push('/admin/goods-edit/'+goods.id)
    },
    //删除单条数据
    handleDelete(goods) {
      this.deleteList(goods.id);
    },
    //删除多条数据
    handleDeleteMore() {
      //判断是否选中
      if(!this.selectGoods.length){
        return;
      }

      const arr = this.selectGoods.map(v => {
        return v.id;
      });
      const ids = arr.join(",");
      this.deleteList(ids);
    },

    //处理搜素
    handleSearch() {
      this.getList();
    },

    //跳转到新增页面
    handleToGoodsAdd(){
      this.$router.push('/admin/goods-add')
    }
  },
  //页面加载时渲染
  mounted() {
    this.getList();
  }
};
</script>

<style scope>
.goods-option {
  margin: 0 0 20px;
}
.goods-search {
  width: 250px;
}
.img {
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  margin-right: 5px;
}
</style>
