<template>
  <div class="product-add">
    <div class="steps">
      <a-steps :current="current">
        <a-step v-for="item in steps" :key="item.title" :title="item.title" />
      </a-steps>
    </div>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="{ span: 3 }"
      :wrapper-col="{ span: 14 }"
    >
      <div class="base-info" v-if="current === 0">
        <a-form-model-item label="商品标题" prop="title" required>
          <a-input v-model="form.title" />
        </a-form-model-item>
        <a-form-model-item label="商品描述" prop="desc">
          <a-input v-model="form.desc" type="textarea" />
        </a-form-model-item>
        <a-form-model-item label="商品类目" prop="category">
          <a-select v-model="form.category" @change="handleCategoryChange">
            <a-select-option v-for="c in categoryList" :key="c.id">{{ c.name }}</a-select-option>
          </a-select>
          <a-select v-model="form.c_item" placeholder="商品子类目">
            <a-select-option v-for="(cI, index) in cItems" :key="index" :value="cI">
              {{ cI }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="商品标签" prop="tags" required>
          <a-select mode="tags" style="width: 100%" v-model="form.tags">
            <a-select-option key="包邮，最迟次日达">
              包邮，最迟次日达
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </div>
      <div class="sale-info" v-else>
        <a-form-model-item label="商品售价" prop="price" required>
          <a-input v-model="form.price" />
        </a-form-model-item>
        <a-form-model-item label="商品折扣价" prop="price_off">
          <a-input v-model="form.price_off" />
        </a-form-model-item>
        <a-form-model-item label="商品库存" prop="inventory" required>
          <a-input v-model="form.inventory" />
        </a-form-model-item>
        <a-form-model-item label="计量单位" prop="unit" required>
          <a-input v-model="form.unit" />
        </a-form-model-item>
        <a-form-model-item label="商品相册" prop="images" required>
          <a-upload
            :action="`https://mallapi.duyiedu.com/upload/images?appkey=${$store.state.user.appkey}`"
            :multiple="true"
            list-type="picture-card"
            :file-list="fileList"
            name="avatar"
            @preview="handlePreview"
            @change="handleChange"
          >
            <div v-if="fileList.length < 8">
              <a-icon type="plus" />
              <div class="ant-upload-text">
                上传图片
              </div>
            </div>
          </a-upload>
          <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 20 }" class="product-stauts" prop="status">
          <a-checkbox :checked="isChecked" @change="changeStatus">
            是否上架
          </a-checkbox>
        </a-form-model-item>
      </div>
      <a-form-model-item :wrapper-col="{ span: 20 }">
        <div class="step-operate">
          <a-button v-if="current < steps.length - 1" type="primary" @click="next">
            下一步
          </a-button>
          <a-button
            v-if="current == steps.length - 1"
            type="primary"
            @click="submitForm('ruleForm')"
          >
            提交
          </a-button>
          <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
            上一步
          </a-button>
        </div>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import api from "@/api/api";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default {
  created() {
    /**
     * 获取单个商品信息
     */
    if (this.$route.params.id) {
      console.log(this.$route.params.id);
      this.getProductInfo(this.$route.params.id);
    }
    /**
     * 获取类目列表
     */
    this.getCategoryList();
  },
  data() {
    return {
      current: 0,
      steps: [
        {
          title: "填写商品基本信息"
        },
        {
          title: "填写商品销售信息"
        }
      ],
      form: {
        title: "",
        desc: "",
        category: 1,
        c_item: [],
        tags: [],
        price: 0,
        price_off: 0,
        unit: "",
        status: 0,
        images: [],
        inventory: 0,
        sale: 0
      },
      cItems: [],
      categoryList: [],
      rules: {},
      tags: [],
      previewVisible: false,
      previewImage: "",
      fileList: [],
      isChecked: false
    };
  },
  methods: {
    /**
     * 获取类目列表
     */
    getCategoryList() {
      api.getCategoryList().then(res => {
        if (res.status === "success") {
          this.categoryList = res.data.data;
          this.cItems = res.data.data.filter(c => c.id === this.form.category)[0]["c_items"];
        }
      });
    },
    next() {
      this.current++;
    },
    prev() {
      this.current--;
    },
    handleChange({ fileList }) {
      this.form.images = fileList;
      this.fileList = fileList;
    },
    handleCategoryChange(val) {
      this.cItems = this.categoryList.filter(c => c.id === val)[0]["c_item"];
    },
    handleCancel() {},
    handlePreview() {},
    /**
     * 获取单个商品的详细信息回填
     */
    getProductInfo(id) {
      api.getProductInfo(id).then(res => {
        if (res.status === "success") {
          this.fileList = res.data.images.map((e, index) => ({
            uid: index,
            name: "image-" + index + ".png",
            status: "done",
            url: e
          }));
          this.form = res.data;

          console.log("d", this.form);
        }
      });
    },
    /**
     * 是否上架
     */
    changeStatus(e) {
      this.isChecked = e.target.checked;
      this.form.status = this.isChecked ? 1 : 0;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          /**
           * 编辑商品
           */
          if (this.$route.params.id) {
            api.editProduct(this.form).then(res => {
              if (res.status === "success") {
                this.$router.push({ name: "ProductList" });
              }
            });
          } else {
            api.addProductInfo(this.form).then(res => {
              if (res.status === "success") {
                this.$router.push({ name: "ProductList" });
              }
            });
          }
        } else {
          this.$message.error("您未填好商品必填信息！");
          return false;
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.product-add {
  .steps {
    width: 50%;
    margin: 20px auto;
  }
  .steps-action {
    width: 100%;
    margin-top: 24px;
    text-align: center;
  }
  .step-operate {
    text-align: center;
  }
  .product-stauts {
    text-align: center;
  }
}
</style>
