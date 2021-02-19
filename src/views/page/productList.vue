<template>
  <div class="product-list">
    <!-- 搜索 -->
    <div class="search">
      <a-form-model
        layout="inline"
        :model="searchForm"
        @submit="handleSubmit"
        @submit.native.prevent
      >
        <a-form-model-item label="搜索关键词">
          <a-input v-model="searchForm.searchWord" placeholder="请输入关键词"> </a-input>
        </a-form-model-item>
        <a-form-model-item label="类目">
          <a-select
            show-search
            placeholder="搜索类目"
            style="width: 200px"
            @change="handleChange"
            allowClear
          >
            <a-select-option :value="c.id" v-for="c in categoryList" :key="c.id">
              {{ c.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" html-type="submit">
            搜索
          </a-button>
        </a-form-model-item>
      </a-form-model>
      <a-button>
        <router-link :to="{ name: 'ProductAdd' }">
          新增商品
        </router-link>
      </a-button>
    </div>
    <!-- 表格 -->
    <a-table
      bordered
      :columns="columns"
      :data-source="tableData"
      :pagination="pageData"
      @change="changePage"
    >
      <template slot="operate" slot-scope="text, record">
        <div class="operate">
          <a-button type="primary" style="margin-right: 10px" @click="editProduct(record.id)">
            编辑
          </a-button>
          <a-button type="danger" @click="removeProduct(record)">
            删除
          </a-button>
        </div>
      </template>
    </a-table>
  </div>
</template>

<script>
import api from "@/api/api";
export default {
  created() {
    api.getCategoryList().then(res => {
      if (res.status === "success") {
        this.categoryList = res.data.data;
        res.data.data
          .map(r => ({ status: r.id, name: r.name }))
          .forEach(c => {
            this.codeToName[c.status] = c.name;
          });
        console.log(this.codeToName);
      } else {
        this.$message(res.msg);
      }
    });
    this.getProductsList();
  },
  data() {
    return {
      searchForm: {
        searchWord: "",
        category: ""
      },
      categoryList: [],
      codeToName: [],
      columns: [
        {
          title: "ID",
          dataIndex: "id"
        },
        {
          title: "标题",
          dataIndex: "title",
          width: 100,
          ellipsis: true
        },
        {
          title: "描述",
          dataIndex: "desc",
          width: 100,
          ellipsis: true
        },
        {
          title: "商品类目",
          dataIndex: "categoryName",
          width: 100
        },
        {
          title: "商品价格",
          dataIndex: "price"
        },
        {
          title: "折扣价格",
          dataIndex: "price_off"
        },
        {
          title: "标签",
          dataIndex: "tags",
          width: 100,
          ellipsis: true
        },
        {
          title: "商品库存量",
          dataIndex: "inventory"
        },
        {
          title: "上架状态",
          dataIndex: "statusWord"
        },
        {
          title: "操作",
          key: "operate",
          width: 200,
          scopedSlots: { customRender: "operate" }
        }
      ],
      tableData: [],
      pageData: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        total: 1
      }
    };
  },
  methods: {
    handleSubmit() {
      this.getProductsList();
    },
    handleChange(val) {
      this.searchForm.category = val;
    },
    getProductsList() {
      const params = {
        page: this.pageData.current,
        size: this.pageData.pageSize,
        ...this.searchForm
      };
      api.getProducts(params).then(res => {
        console.log(params);
        if (res.status === "success") {
          console.log(res.data.data);
          this.tableData = res.data.data.map(r => {
            r.key = r.id;
            r.categoryName = this.codeToName[r.category];
            r.statusWord = r.status === 0 ? "下架" : "上架";
            return r;
          });
          this.pageData.total = res.data.total;
        }
      });
    },
    changePage(page) {
      this.pageData = page;
      this.getProductsList();
    },
    removeProduct(record) {
      this.$confirm({
        title: "删除商品",
        content: () => (
          <div style="color:red;">{`确认删除商品标题为${record.title}的商品吗？`}</div>
        ),
        onOk: () => {
          api.removeProduct(record.id).then(res => {
            if (res.status === "success") {
              this.getProductsList();
            }
          });
        },
        onCancel: () => {
          this.$message.warning("您已取消删除商品标题为" + record.title + "的商品！");
          return false;
        }
      });
    },
    editProduct(id) {
      this.$router.push({
        name: "ProductEdit",
        params: {
          id
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.search {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 30px;
}
</style>
