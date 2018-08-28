<template>
  <div class="tab">
    <router-link class="tab-item" to="/" exact tag="div">商品</router-link>
    <router-link class="tab-item" :to="{name: 'ratings'}" tag="div">评论</router-link>
    <router-link class="tab-item" :to="{name: 'seller'}" tag="div">商家</router-link>
  </div>
</template>

<script>
  export default {
    name: "Nav",
    data() {
      return {

      }
    }
  }
</script>

<style scoped lang="less">
@import "../../assets/less/mixin";

  .tab {
    width: 100%;
    display: flex;
    height: 80px;
    line-height: 80px;
    // border-bottom: 1px solid rgba(7, 17, 27, .1);/*no*/
    .border-1px(rgba(7, 17, 27, .1));

    .tab-item {
      display: block;
      flex: 1;
      text-align: center;
      font-size: 14px; /* no */
      color: rgba(77, 85, 93);
    }

    .tab-item.active {
      color: rgba(240, 20, 20);
    }
  }
</style>
