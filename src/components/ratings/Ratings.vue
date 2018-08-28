<template>
  <div class="ratings" ref="ratings">
    <div class="content">
      <div class="overview">
        <div class="left">
          <h1 class="score">{{ seller.score }}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{ seller.rankRate }}%</div>
        </div>
        <div class="right">
          <div class="score-wrap">
            <span class="title">服务态度</span>
            <Star :size="36" :score="seller.serviceScore" />
            <span class="score">{{ seller.serviceScore }}</span>
          </div>
          <div class="score-wrap">
            <span class="title">商家评分</span>
            <Star :size="36" :score="seller.foodScore" />
            <span class="score">{{ seller.foodScore }}</span>
          </div>
          <div class="time-warp">
            <span class="title">送达时间</span>
            <span class="time">{{ seller.deliveryTime }}分钟</span>
          </div>
        </div>
      </div>
      <Split />
      <RatingSelect
        :ratings="ratings"
        :selectType="selectType"
        :onlyContent="onlyContent"
        @sendType="getType"
        @sendContent="getContent"
      />
      <div class="rating-wrap">
        <ul>
          <li class="item"
              v-for="(rating, index) in ratings"
              :key="index"
              v-show="needShow(rating.rateType, rating.text)"
          >
            <div class="avatar">
              <img :src="rating.avatar" alt="">
            </div>
            <div class="content">
              <h1 class="name">{{ rating.username }}</h1>
              <div class="star-warp">
                <Star :size="24" :score="rating.score" />
                <span class="delivery" v-show="rating.deliveryTime">{{ rating.deliveryTime }}分钟送达</span>
                <div class="text">{{ rating.text }}</div>
                <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                  <i class="icon-thumb_up"></i>
                  <span
                    v-for="(item, index) in rating.recommend"
                    :key="index"
                  >{{ item }}</span>
                </div>
                <div class="time">{{ rating.rateTime | formatDate }}</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Star from '../star/Star'
  import Split from '../split/Split'
  import RatingSelect from '../rating_selcet/RatingSelect'
  import {formatDate} from "../../assets/js/date";
  import BScroll from 'better-scroll'

  const ALL = 2;

  export default {
    name: "Ratings",
    data() {
      return {
        selectType: ALL,
        onlyContent: false,
        ratings: []
      }
    },
    props: {
      seller: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    components: {
      Star,
      Split,
      RatingSelect
    },
    created() {
      this.$axios.get('/api/ratings')
        .then(response => {
          const res = response.data;
          if (res.erron === 0) {
            this.ratings = res.data;

            this.$nextTick(() => {
              if (!this.scroll) {
                this.scroll = new BScroll(this.$refs.ratings, {
                  click: true
                });
              } else {
                this.scroll.refresh();
              }
            })
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);

        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    methods: {
      getType(data) {
        this.selectType = data;

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
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/index";

  .ratings {
    width: 100%;
    position: absolute;
    top: 348px;
    bottom: 0;
    left: 0;
    overflow: hidden;

    .overview {
      display: flex;
      padding: 36px 0;

      .left {
        width: 274px;
        flex: 0 0 274px;
        border-right: 1px solid rgba(7, 17, 27, 0.1);
        text-align: center;
        padding: 12px 0;

        .score {
          font-size: 48px;
          line-height: 56px;
          color: rgb(255, 153, 0);
          margin-bottom: 12px;
        }

        .title {
          font-size: 24px;
          color: rgb(7, 17, 27);
          line-height: 24px;
          margin-bottom: 16px;
        }

        .rank {
          font-size: 20px;
          color: rgb(7, 17, 27);
          line-height: 20px;
        }
      }

      .right {
        flex: 1;
        padding-left: 48px;

        .score-wrap {
          line-height: 36px;
          margin-bottom: 16px;
          font-size: 0;

          .title {
            font-size: 24px;
            color: rgb(7, 17, 27);
          }

          .star {
            display: inline-block;
            vertical-align: middle;
            margin-left: 24px;
          }

          .score {
            font-size: 24px;
            color: rgb(255, 153, 0);
          }
        }

        .time-warp {
          font-size: 0;

          .title {
            display: inline-block;
            font-size: 24px;
            color: rgb(7, 17, 27);
          }

          .time {
            display: inline-block;
            font-size: 24px;
            color: rgb(147, 153, 159);
            margin-left: 24px;
          }
        }
      }
    }

    .rating-wrap {
      padding: 0 36px;

      .item {
        display: flex;
        padding: 36px 0;
        .border-1px(rgba(7, 17, 27, 0.1));

        .avatar {
          width: 56px;
          flex: 0 0 56px;
          margin-right: 24px;

          img {
            width: 56px;
            height: 56px;
            border-radius: 50%;
          }
        }

        .content {
          position: relative;
          flex: 1;

          .name {
            font-size: 20px;
            line-height: 24px;
            color: rgb(7, 17, 27);
            margin-bottom: 8px;
          }

          .star-warp {
            margin-bottom: 12px;
            font-size: 0;

            .star {
              display: inline-block;
              vertical-align: top;
              margin-right: 12px;
            }

            .delivery {
              display: inline-block;
              vertical-align: top;
              font-size: 20px;
              color: rgb(147, 153, 159);
              line-height: 24px;
            }

            .text {
              line-height: 36px;
              color: rgb(7, 17, 27);
              font-size: 24px;
              margin-bottom: 16px;
              margin-top: 12px;
            }

            .recommend {
              line-height: 32px;

              .icon-thumb_up, span{
                display: inline-block;
                margin-right: 16px;
                margin-bottom: 16px;
                vertical-align: middle;
              }

              .icon-thumb_up {
                font-size: 24px;
                color: rgb(0, 160, 220);
              }

              span {
                font-size: 18px;
                padding: 4px 12px;
                border: 1px solid rgba(7, 17, 27, .1);
                color: rgb(147, 153, 159);
                line-height: 32px;
              }
            }

            .time {
              position: absolute;
              top: 0;
              right: 0;
              font-size: 20px;
              font-weight: 200;
              color: rgb(147, 153, 159);
              line-height: 24px;
            }
          }
        }
      }
    }
  }
</style>
