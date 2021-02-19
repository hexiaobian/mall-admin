<template>
  <div class="topnav" :class="{ 'menu-unfold': $store.state.collapsed, 'menu-fold': true }">
    <div class="nav-content">
      <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
        <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
      </a-button>
      <a-breadcrumb>
        <a-breadcrumb-item>{{ routes[0].meta.title }}</a-breadcrumb-item>
        <a-breadcrumb-item
          ><router-link :to="{ name: routes[1].name }">{{
            routes[1].meta.title
          }}</router-link></a-breadcrumb-item
        >
      </a-breadcrumb>
    </div>
    <ul class="user-info" @mouseover="changeDir(0)" @mouseleave="changeDir(1)">
      <li>
        欢迎您，{{ $store.state.user.username }}
        <a-icon :type="dir" />
      </li>
      <li @click="logout">退出</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dir: "up",
      routes: []
    };
  },
  watch: {
    $route: {
      handler() {
        this.routes = this.$router.currentRoute.matched;
      },
      immediate: true
    }
  },
  methods: {
    changeDir(type) {
      if (type === 0) {
        this.dir = "down";
      } else {
        this.dir = "up";
      }
    },
    toggleCollapsed() {
      this.$store.dispatch("toggleCollapsed");
    },
    logout() {
      this.$router.replace({ name: "Login" });
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style lang="less" scoped>
.topnav {
  height: 50px;
  line-height: 50px;
  padding-left: 10px;
  padding-right: 20px;
  transition: all 0.3s;
  .nav-content {
    float: left;
    .ant-breadcrumb {
      display: inline-block;
      margin-left: 20px;
    }
  }
  .user-info {
    position: fixed;
    top: 0;
    right: 0;
    text-align: center;
    z-index: 9;
    background-color: #fff;
    li {
      padding: 0 30px;
      cursor: pointer;
      &:not(:first-of-type) {
        display: none;
        &:hover {
          background: #eeeeee;
          color: #999999;
        }
      }
    }
    &:hover {
      li {
        display: block;
      }
    }
  }
}
</style>
