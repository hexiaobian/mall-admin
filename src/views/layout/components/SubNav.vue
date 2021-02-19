<template>
  <div class="subnav">
    <a-menu
      mode="inline"
      theme="dark"
      :default-selected-keys="[defaultSelectedKeys]"
      :default-open-keys="[defaultOpenKeys]"
      :selected-keys="[selectedKeys]"
      :inline-collapsed="$store.state.collapsed"
      @click="getSelectedKeys"
    >
      <a-sub-menu v-for="route in menuRoutes" :key="route.name">
        <span slot="title"
          ><a-icon :type="route.meta.icon" /><span>{{ route.meta.title }}</span></span
        >
        <a-menu-item v-for="sub in route.children" :key="sub.name">
          <router-link :to="{ name: sub.name }">
            <a-icon :type="sub.meta.icon" />{{ sub.meta.title }}
          </router-link>
        </a-menu-item>
      </a-sub-menu>
    </a-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedKeys: ""
    };
  },
  computed: {
    /**
     * 得到菜单项
     */
    menuRoutes() {
      const menuList = Object.assign([], this.$store.state.menuList);
      return menuList.filter(e => {
        if (!e.meta.hidden) {
          e.children = e.children.filter(c => !c.meta.hidden);
        }
        return !e.meta.hidden;
      });
    },
    /**
     * 默认选中项
     */
    defaultSelectedKeys() {
      return this.$router.currentRoute.matched[1].name
        ? this.$router.currentRoute.matched[1].name
        : "";
    },
    /**
     * 默认打开的子项
     */
    defaultOpenKeys() {
      return this.$router.currentRoute.matched[0].name;
    }
  },
  methods: {
    /**
     * 改变侧边栏的选中项
     */
    getSelectedKeys({ item, key }) {
      this.selectedKeys = key;
    }
  },
  watch: {
    /**
     * 监听$route的变化，改变侧边栏的选中
     */
    $route() {
      if (this.$router.currentRoute.name === "ProductEdit") {
        this.selectedKeys = "ProductAdd";
      } else {
        this.selectedKeys = this.$router.currentRoute.name;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import url("~@/assets/css/common.less");
</style>
