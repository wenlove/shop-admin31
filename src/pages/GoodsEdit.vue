<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="所属类别">
      <el-select v-model="form.category_id" placeholder="请选择类别">
        <el-option
          v-for="(item,index) in categorys"
          :key="index"
          :label="item.title"
          :value="item.category_id"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="是否发布">
      <el-switch v-model="form.status"></el-switch>
    </el-form-item>

    <el-form-item label="推荐类型">
      <el-checkbox label="置顶" v-model="form.is_top"></el-checkbox>
      <el-checkbox label="热门" v-model="form.is_hot"></el-checkbox>
    </el-form-item>

    <el-form-item label="内容标题">
      <el-input v-model="form.title"></el-input>
    </el-form-item>

    <el-form-item label="副标题">
      <el-input v-model="form.sub_title"></el-input>
    </el-form-item>

    <!-- 封面图片上传 -->
    <el-form-item label="封面图片">
      <!-- action图片上传的目录 -->
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8899/admin/article/uploadimg"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        drag
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>

    <el-form-item label="商品货号">
      <el-input v-model="form.goods_no"></el-input>
    </el-form-item>

    <el-form-item label="库存数量">
      <el-input v-model="form.stock_quantity"></el-input>
    </el-form-item>

    <el-form-item label="市场价格">
      <el-input v-model="form.market_price"></el-input>
    </el-form-item>

    <el-form-item label="销售价格">
      <el-input v-model="form.sell_price"></el-input>
    </el-form-item>

    <el-form-item label="图片相册">
      <el-upload
        action="http://localhost:8899/admin/article/uploadimg"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handlePictureSuccess"
        :file-list="form.fileList"
        drag
        multiple
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt>
      </el-dialog>
    </el-form-item>

    <el-form-item label="内容摘要">
      <el-input type="textarea" v-model="form.zhaiyao"></el-input>
    </el-form-item>

    <el-form-item label="内容描述">
      <quillEditor v-model="form.content" class="editor"></quillEditor>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
//导入富文本框样式
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

//导入第三方富文本组件
import { quillEditor } from "vue-quill-editor";

export default {
  data() {
    return {
      form: {
        category_id: "",
        is_top: false,
        is_hot: false,
        title: "",
        sub_title: "",
        imgList: [], //封面图片
        goods_no: "",
        stock_quantity: "",
        market_price: "",
        sell_price: "",
        is_slide: false,
        zhaiyao: "",
        fileList: [], //图片相册
        content: ""
      },
      id: 0, //数据id
      //所有类别
      categorys: [],
      imageUrl: "", //封面图片
      dialogImageUrl: "", //图片相册
      dialogVisible: false
    };
  },
  methods: {
    //上传封面图片成功的回调函数;
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      //   console.log(res);
      res.shorturl = "/" + res.shorturl;
      this.form.imgList = [res];
    },
    //上传封面图片之前的回调函数
    beforeAvatarUpload(file) {
      //判断图片大小是否超过了2m
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },

    //图片相册删除
    handleRemove(file, fileList) {
      console.log(this.form.fileList)
      if (fileList.length > 0) {
        const arr = fileList.map(v => {
          return v;
        });
        this.form.fileList = arr;
      } else {
        this.form.fileList = [];
      }
      console.log(this.form.fileList)

      // this.form.fileList = this.form.fileList.filter(v => {
      //   return file.name !== v.name;
      // });
    },
    //图片相册预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //图片相册上传成功
    handlePictureSuccess(res, file,fileList) {
      setTimeout(()=>{
         this.form.fileList.push(res)
      },10)
    },

    onSubmit() {
      this.$axios({
        url: "http://localhost:8899/admin/goods/edit/" + this.id,
        method: "POST",
        data: this.form,
        // 处理session跨域
        withCredentials: true
      }).then(res => {
        // console.log(this.form);
        const { message, status } = res.data;
        if (status === 0) {
          this.$message.success(message);
          this.$router.back();
        } else {
          this.$router.push("/login");
        }
      });
    }
  },
  mounted() {
    //加载所有类别
    this.$axios({
      url: "http://localhost:8899/admin/category/getlist/goods",
      method: "GET"
    }).then(res => {
      //解构赋值
      const { status, message } = res.data;
      if (status === 0) {
        this.categorys = message;
      }
    });

    //根据id获取商品数据
    const id = this.$route.params.id;
    this.id = id;
    this.$axios({
      url: `http://localhost:8899/admin/goods/getgoodsmodel/${id}`,
      method: "GET"
    }).then(res => {
      const { message, status } = res.data;
      // console.log(message);

      if (status == 0) {
        this.form = {
          ...message,
          category_id: +message.category_id,
          fileList: message.fileList.map(v => {
            return {
              ...v,
              url: "http://localhost:8899" + v.shorturl
            };
          })
        };

        this.imageUrl = message.imgList[0].url;
      }
    });
  },
  components: {
    //富文本框组件
    quillEditor
  }
};
</script>


<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.el-upload-dragger{
  width: 146px;
  height: 146px;
  border: 0 ;
}

.editor .ql-toolbar {
  line-height: 1;
}
</style>
