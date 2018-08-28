<template>
  <div class="shop">
    <div class="content" @click="toggleList">
      <div class="left">
        <div class="logo-wrap">
          <div class="logo" :class="{active: totalCount > 0}">
            <i class="icon-shopping_cart" :class="{active: totalCount > 0}"></i>
          </div>
          <div v-show="totalCount > 0" class="num">{{ totalCount }}</div>
        </div>
        <div class="price" :class="{active: totalPrice > 0}">￥{{ totalPrice }}</div>
        <div class="desc">另需配送费￥{{ deliveryPrice }}元</div>
      </div>
      <div class="right">
        <div class="pay"
             :class="{active: totalPrice >= minPrice}"
             @click.stop="pay"
        >
          {{ payDesc }}
        </div>
      </div>
    </div>
    <div class="ball-wrap">
      <transition-group
        name="drop"
        tag="div"
        @before-enter="beforeEnter"
        @enter="enter"
        @after-enter="afterEnter"
      >
        <div class="ball"
             v-for="(ball, index) in balls"
             v-show="ball.show"
             :key="index"
        >
          <div class="inner inner-hook"></div>
        </div>
      </transition-group>
    </div>
    <transition name="fold">
      <div class="list"
           v-show="listShow"
      >
        <div class="header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="list">
          <ul>
            <li class="item"
                v-for="(food, index) in selectFoods"
                :key="index"
            >
              <span class="name">{{ food.name }}</span>
              <div class="price">
                <span>￥{{ food.price * food.count}}</span>
              </div>
              <div class="calculator-wrap">
                <Calculator :food="food"/>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="mask"
           v-show="listShow"
           @click="hideList"
      ></div>
    </transition>
  </div>
</template>

<script>
  /**
   * Shop Components
   *
   * @data
   * balls: 控制小球的显示隐藏
   * dropBalls: 移动的小球
   * fold: 控制折叠列表的显示隐藏
   *
   * @props
   * deliveryPrice: 配送费
   * minPrice: 最低配送价格
   * selectFoods: 选择的商品
   *
   * @computed
   * totalPrice: 返回总价
   * totalCount: 返回总个数
   * payDesc: 支付描述
   * listShow: 控制列表的显示隐藏
   *
   */

  import BScroll from 'better-scroll'
  import Calculator from '../calculator/Calculator'

  export default {
    name: "shop",
    data() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: true
      }
    },
    props: {
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      },
      selectFoods: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach(food => {
          total += food.price * food.count
        });

        return total;
      },
      totalCount() {
        let count = 0;
        this.selectFoods.forEach(food => {
          count += food.count
        });

        return count;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        } else {
          return '去结算';
        }
      },
      listShow() {
        if (!this.totalCount) {
          this.fold = true;
          return false;
        }

        let show = !this.fold;

        if (show) {
          this.$nextTick(() => {
            if (!this.list) {
              this.list = new BScroll(this.$refs.list, {
                click: true
              })
            } else {
              this.list.refresh();
            }
          })
        }

        return show;
      }
    },
    methods: {
      drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];

          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeEnter(el) {
        let count = this.balls.length;

        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0, ${y}px, 0)`;
            el.style.transform = `translate3d(0, ${y}px, 0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`;
            inner.style.transform = `translate3d(${x}px, 0, 0)`;
          }
        }
      },
      enter(el) {
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0, 0, 0)';
          el.style.transform = 'translate3d(0, 0, 0)';
          let inner = el.getElementsByClassName('inner-hook');
          inner[0].style.webkitTransform = 'translate3d(0, 0, 0)';
          inner[0].style.transform = 'translate3d(0, 0, 0)';
        })
      },
      afterEnter(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      },
      toggleList() {
        if (!this.totalCount) {
          return;
        }

        this.fold = !this.fold;
      },
      empty() {
        this.selectFoods.forEach(food => {
          food.count = 0;
        })
      },
      hideList() {
        this.fold = true;
      },
      pay() {
        if (this.totalPrice < this.minPrice) {
          return;
        }

        confirm(`确认支付${this.totalPrice}元吗?`);
      }
    },
    components: {
      Calculator
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/index";

  .shop {
    width: 100%;
    height: 96px;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;

    .content {
      display: flex;
      height: 96px;
      background-color: #141d27;
      font-size: 0;

      .left {
        flex: 1;

        .logo-wrap {
          width: 112px;
          height: 112px;
          display: inline-block;
          position: relative;
          top: -20px;
          margin: 0 24px;
          padding: 12px;
          box-sizing: border-box;
          vertical-align: top;
          border-radius: 50%;
          background-color: #141d27;

          .num {
            width: 48px;
            height: 32px;
            position: absolute;
            top: 0;
            right: 0;
            line-height: 32px;
            text-align: center;
            border-radius: 32px;
            font-weight: 700;
            font-size: 18px;
            color: #fff;
            background-color: rgb(240, 20, 20);
            box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.4);
          }

          .logo {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-color: #2b343c;
            text-align: center;

            &.active {
              background-color: rgb(0, 160, 220);
            }

            .icon-shopping_cart {
              font-size: 48px;
              color: #80858a;
              line-height: 88px;

              &.active {
                color: #fff;
              }
            }
          }
        }

        .price {
          display: inline-block;
          vertical-align: top;
          line-height: 48px;
          font-size: 32px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.4);
          margin-top: 24px;
          padding-right: 24px;
          border-right: 1px solid rgba(255, 255, 255, 0.1); /* no */
          box-sizing: border-box;

          &.active {
            color: #fff;
          }
        }

        .desc {
          display: inline-block;
          vertical-align: top;
          margin: 24px 0 0 24px;
          line-height: 48px;
          font-size: 20px;
          color: rgba(255, 255, 255, 0.4);
        }
      }

      .right {
        width: 210px;
        flex: 0 0 210px;

        .pay {
          height: 96px;
          line-height: 96px;
          text-align: center;
          font-size: 24px;
          color: rgba(255, 255, 255, 0.4);
          font-weight: 700;
          background-color: #2b333b;

          &.active {
            background-color: #00b43c;
            color: #fff;
          }
        }
      }
    }

    .ball-wrap {

      .ball {
        position: fixed;
        left: 64px;
        bottom: 44px;
        z-index: 200;

        &.drop-enter-active {
          transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        }

        .inner {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: rgb(0, 160, 220);
          transition: all .4s linear;
        }
      }
    }

    .list {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 96px;
      z-index: -1;

      &.fold-enter-active, &.fold-leave-active {
        transition: all 0.4s linear;
        transform: translate3d(0, 0, 0);
      }

      &.fold-enter, &.fold-leave-to {
        transform: translate3d(0, 100%, 0);
      }

      .header {
        height: 80px;
        line-height: 80px;
        padding: 0 36px;
        background-color: #f3f5f7;
        .border-1px(rgba(7, 17, 27, 0.1));

        .title {
          float: left;
          font-size: 28px;
          color: rgb(1, 17, 27);
        }

        .empty {
          float: right;
          font-size: 24px;
          color: rgb(0, 160, 220);
        }
      }

      .list-content {
        padding: 0 36px;
        max-height: 434px;
        overflow: hidden;
        background-color: #fff;

        .item {
          position: relative;
          padding: 24px 0;
          box-sizing: border-box;
          .border-1px(rgba(7, 17, 27, 0.1));

          .name {
            line-height: 48px;
            font-size: 28px;
            color: rgb(7, 17, 27);
          }

          .price {
            position: absolute;
            right: 180px;
            bottom: 24px;
            line-height: 48px;
            font-size: 28px;
            font-weight: 700;
            color: rgb(240, 20, 20);
          }

          .calculator-wrap {
            position: absolute;
            right: 0;
            bottom: 12px;
          }
        }
      }
    }

    .mask {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: -2;
      background-color: rgba(7, 17, 27, 0.6);

      &.fade-enter-active, &.fade-leave-active {
        transition: opacity 0.5s linear;
        opacity: 1;
      }

      &.fade-enter, &.fade-leave-to {
        opacity: 0;
      }
    }
  }
</style>
