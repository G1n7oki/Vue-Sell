<template>
  <div class="calculator">
    <transition name="move">
      <div class="decrease" v-show="food.count > 0" @click.stop="decrease($event)">
        <i class="inner icon-remove_circle_outline"></i>
      </div>
    </transition>
    <div class="count" v-show="food.count > 0">{{ food.count }}</div>
    <div class="add" @click.stop="add($event)">
      <i class="inner icon-add_circle"></i>
    </div>
  </div>
</template>

<script>
  /**
   * Calculator Component
   *
   * @props
   * food: 商品的数量
   *
   * @methods
   * add: 增加商品
   * decrease: 减少商品
   * */

  import Vue from 'vue'

  export default {
    name: "Calculator",
    data() {
      return {}
    },
    props: {
      food: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    methods: {
      add(event) {
        // 阻止BScroll派发的点击事件
        if (!event._constructed) {
          return false;
        }
        // 设定边界, 如果不存在向food插入count字段
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }

        this.$emit('shop-add', event.target);
      },
      decrease(event) {
        if (!event._constructed) {
          return false;
        }

        if (this.food.count) {
          this.food.count--;
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/index";

  .calculator {
    font-size: 0;

    .decrease {
      display: inline-block;
      padding: 12px;

      .inner {
        display: inline-block;
        font-size: 48px;
        line-height: 48px;
        color: rgb(0, 160, 220);
      }
    }

    .count {
      width: 24px;
      text-align: center;
      display: inline-block;
      vertical-align: top;
      font-size: 20px;
      color: rgb(147, 153, 159);
      line-height: 48px;
      padding-top: 12px;
    }

    .add {
      display: inline-block;
      padding: 12px;
      transition: all .4s linear;

      .inner {
        display: inline-block;
        font-size: 48px;
        line-height: 48px;
        color: rgb(0, 160, 220);
      }
    }
  }

  // 进入动画的动作
  .move-enter-active {
    transition: all .4s linear;
    opacity: 1;
    transform: translate3d(0, 0, 0) rotate(180deg);
  }

  // 离开动画的开始
  .move-leave-active {
    transition: all .4s linear;
    opacity: 1;
    transform: translate3d(0, 0, 0) rotate(0);
  }

  // 进入动画的开始
  .move-enter {
    opacity: 0;
    transform: translate3d(48px, 0, 0) rotate(0);
  }

  // 离开动画的动作
  .move-leave-to {
    opacity: 0;
    transform: translate3d(48px, 0, 0) rotate(180deg);
  }
</style>
