<template>
  <transition name="move">
    <div class="food" v-show="flag" ref="food">
      <div class="content-wrap">
        <div class="header">
          <img :src="food.image" alt="">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{ food.name }}</h1>
          <div class="detail">
            <span class="sell-count">{{ food.sellCount }}</span>
            <span class="rating">好评率{{ food.rating }}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{ food.price }}</span>
            <span class="old" v-show="food.oldPrice">{{ food.oldPrice }}</span>
          </div>
          <div class="calculator-warp">
            <Calculator
              :food="food"
              @shop-add="getDom"
            />
          </div>
          <div class="buy"
               v-show="!food.count || food.count === 0"
               @click="addFirst($event)"
          >加入购物车
          </div>
        </div>
        <Split v-show="food.info"/>
        <div class="info" v-show="food.info">
          <h1 class="title">商品信息</h1>
          <p class="text">{{ food.info }}</p>
        </div>
        <Split/>
        <div class="rating">
          <h1 class="title">商品评价</h1>
          <RatingSelect
            :ratings="food.ratings"
            :selectType="selectType"
            :only-content="onlyContent"
            :desc="desc"
            @sendType="getType"
            @sendContent="getContent"
          />
          <div class="rating-wrap">
            <ul v-show="food.ratings && food.ratings.length">
              <li class="item"
                  v-for="(rating, index) in food.ratings"
                  v-show="needShow(rating.rateType, rating.text)"
              >
                <div class="user">
                  <span class="name">{{ rating.username }}</span>
                  <img class="avater" :src="rating.avatar" alt="">
                </div>
                <div class="time">{{ rating.rateTime | formatDate }}</div>
                <p class="text">
                  <span
                    :class="{'icon-thumb_up': rating.rateType === 0, 'icon-thumb_down': rating.rateType === 1}"></span>
                  {{ rating.text }}
                </p>
              </li>
            </ul>
            <div class="no-rating"
                 v-show="!food.ratings || !food.ratings.length"
            >暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import BScroll from 'better-scroll'
  import Vue from 'vue'
  import {formatDate} from "../../assets/js/date";
  import Calculator from '../calculator/Calculator'
  import Split from '../split/Split'
  import RatingSelect from '../rating_selcet/RatingSelect'

  const ALL = 2;

  export default {
    name: "Food",
    data() {
      return {
        flag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
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
      show() {
        this.flag = true;
        this.selectType = ALL;
        this.onlyContent = false;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new BScroll(this.$refs.food, {
              click: true
            });
          } else {
            this.scroll.refresh();
          }
        })
      },
      hide() {
        this.flag = false;
      },
      addFirst(event) {
        if (!event._constructed) {
          return false;
        }
        this.$emit('shop-add', event.target);
        Vue.set(this.food, 'count', 1);
      },
      getDom(el) {
        this.$emit('shop-add', el);
      },
      getType(type) {
        this.selectType = type;

        this.$nextTick(() => {
          this.scroll.refresh();
        })
      },
      getContent(data) {
        this.onlyContent = data;

        this.$nextTick(() => {
          this.scroll.refresh();
        })
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }

        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);

        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      Calculator,
      Split,
      RatingSelect
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/index";

  .food {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 96px;
    z-index: 1;
    background-color: #fff;

    &.move-enter-active, &.move-leave-active {
      transition: all .4s linear;
      transform: translate3d(0, 0, 0);
    }

    &.move-enter, &.move-leave-to {
      transform: translate3d(100%, 0, 0);
    }

    .content-wrap {
      padding-bottom: 120px;

      .header {
        width: 100%;
        height: 0;
        position: relative;
        padding-top: 100%;

        img {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }

        .back {
          position: absolute;
          top: 20px;
          left: 0;

          .icon-arrow_lift {
            display: block;
            padding: 20px;
            font-size: 40px;
            color: #fff;
          }
        }
      }

      .content {
        padding: 36px;
        position: relative;

        .title {
          line-height: 28px;
          margin-bottom: 16px;
          font-size: 28px;
          font-weight: 700;
          color: rgb(7, 17, 27);
        }

        .detail {
          height: 20px;
          margin-bottom: 36px;
          line-height: 20px;
          font-size: 0;

          .sell-count, .rating {
            font-size: 20px;
            color: rgba(147, 153, 159);
          }

          .sell-count {
            margin-right: 24px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 48px;

          .now {
            margin-right: 16px;
            font-size: 28px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 20px;
            color: rgb(147, 153, 159);
          }
        }

        .calculator-warp {
          position: absolute;
          right: 24px;
          bottom: 24px;
        }

        .buy {
          height: 48px;
          position: absolute;
          right: 36px;
          bottom: 36px;
          z-index: 10;
          line-height: 48px;
          padding: 0 24px;
          box-sizing: border-box;
          border-radius: 24px;
          font-size: 20px;
          color: #fff;
          background-color: rgb(0, 160, 220);
        }
      }

      .info {
        padding: 36px;

        .title {
          line-height: 28px;
          margin-bottom: 12px;
          font-size: 28px;
          color: #0711b;
        }

        .text {
          line-height: 48px;
          padding: 0 16px;
          font-size: 24px;
          color: rgb(77, 85, 93);
        }
      }

      .rating {
        padding-top: 36px;

        .title {
          line-height: 28px;
          margin-left: 36px;
          font-size: 28px;
          color: #07111b;
        }

        .rating-wrap {
          padding: 0 36px;

          .item {
            position: relative;
            padding: 32px 0;
            .border-1px(rgba(7, 17, 27, 0.1));

            .user {
              position: absolute;
              top: 32px;
              right: 0;
              font-size: 0;
              line-height: 24px;

              .name {
                display: inline-block;
                vertical-align: top;
                font-size: 20px;
                color: rgb(147, 153, 159);
                margin-right: 12px;
              }

              .avater {
                display: inline-block;
                border-radius: 50%;
                width: 24px;
                height: 24px
              }
            }

            .time {
              margin-bottom: 12px;
              line-height: 24px;
              font-size: 20px;
              color: rgb(147, 153, 159);
            }

            .text {
              line-height: 32px;
              font-size: 24px;
              color: rgb(7, 17, 27);

              .icon-thumb_up, .icon-thumb_down {
                margin-right: 8px;
                line-height: 48px;
                font-size: 24px;
              }

              .icon-thumb_up {
                color: rgb(0, 160, 220);
              }

              .icon-thumb_down {
                color: rgb(147, 153, 159);
              }
            }
          }

          .no-rating {
            padding: 32px;
            font-size: 24px;
            color: rgb(147, 153, 159);
          }
        }
      }
    }
  }
</style>
