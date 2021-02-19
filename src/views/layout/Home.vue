<template>
  <div class="home">
    <sub-nav />
    <div class="content">
      <div class="container" :style="{ 'margin-left': mLeft + 'px', transition: 'all 0.3s' }">
        <top-nav />
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import SubNav from "@/views/layout/components/SubNav.vue";
import TopNav from "@/views/layout/components/TopNav.vue";

export default {
  name: "Home",
  components: {
    SubNav,
    TopNav
  },
  data() {
    return {};
  },
  computed: {
    mLeft() {
      return this.$store.state.collapsed ? 80 : 180;
    }
  }
};
</script>
