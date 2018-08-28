<template>
  <div class="header">
    <div class="content-warp">
      <div class="avatar">
        <img :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }}/{{ seller.deliveryTime }}分钟送达
        </div>
        <div class="supports" v-if="seller.supports">
          <Icon :num="1" :index="seller.supports[0].type" />
          <span class="text">{{ seller.supports[0].description }}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" @click="detailshow">
        <span class="count">{{ seller.supports.length }}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-warp" @click="detailshow">
      <div class="title"></div>
      <div class="text">{{ seller.bulletin }}</div>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="">
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailValue">
        <div class="warp clearfix">
          <div class="main">
            <h1 class="name">{{ seller.name }}</h1>
            <div class="star-warp">
              <Star :size="48" :score="seller.score" />
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="supports" v-if="seller.supports">
              <li class="item" v-for="(item, index) in seller.supports" :key="index">
                <Icon :num="2" :index="item.type" />
                <span class="text">{{ item.description }}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p>
                {{ seller.bulletin }}
              </p>
            </div>
          </div>
        </div>
        <div class="close" @click="detailHide">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

  import Star from '../star/Star';
  import Icon from '../icon/Icon'

  export default {
    name: "Header",
    data() {
      return {
        detailValue: false
      }
    },
    props: {
      seller: {
        type: Object
      }
    },
    methods: {
      detailshow() {
        this.detailValue = true;
      },
      detailHide() {
        this.detailValue = false;
      }
    },
    components: {
      Star,
      Icon
    }
  }
</script>

<style scoped lang="less">
  @import '../../assets/less/index';

  .header {
    position: relative;
    color: #fff;
    background-color: rgba(7, 17, 27, .5);
    overflow: hidden;

    .content-warp {
      display: flex;
      padding: 48px 24px 36px 48px;
      position: relative;

      .avatar {
        overflow: hidden;

        img {
          width: 128px;
          height: 128px;
          float: left;
          border-radius: 4px;
        }
      }

      .content {
        margin-left: 32px;
        font-size: 14px;

        .title {
          display: flex;
          margin: 4px 0 16px 0;

          .brand {
            width: 60px;
            height: 36px;
            display: block;
            vertical-align: top;
            .bg-image('img/brand', 0, 0);
            background-size: 100% 100%;
          }

          .name {
            display: block;
            line-height: 36px;
            font-size: 32px;
            font-weight: bold;
            margin-left: 12px;
          }
        }

        .description {
          font-size: 24px;
          font-weight: 200;
          margin-bottom: 20px;
          line-height: 24px;
        }

        .supports {
          display: flex;

          .text {
            display: block;
            font-size: 20px;
            font-weight: 200;
            line-height: 24px;
            margin-left: 8px;
          }
        }
      }

      .support-count {
        height: 48px;
        display: flex;
        align-items: center;
        position: absolute;
        right: 24px;
        bottom: 36px;
        padding: 0 16px;
        background-color: rgba(0, 0, 0, 0.2);
        border-radius: 28px;

        .count {
          font-size: 20px;
          font-weight: 200;
          vertical-align: top;
          line-height: 24px;
        }

        i {
          display: block;
          margin-left: 4px;
          margin-top: 2px;
          font-size: 20px;
          line-height: 24px;
        }
      }
    }

    .bulletin-warp {
      width: 100%;
      height: 56px;
      display: flex;
      align-items: center;
      background-color: rgba(7, 17, 27, 0.2);

      .title {
        width: 44px;
        height: 24px;
        .bg-image('img/bulletin', 0, 0);
        margin: 0 8px 0 24px;
      }

      .text {
        width: 620px;
        font-size: 20px;
        font-weight: 200;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        line-height: 56px;
      }

      i {
        margin-left: 8px;
      }
    }

    .background {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      filter: blur(10px);

      img {
        width: 100%;
        height: 100%;
      }
    }

    .detail {
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 99;
      overflow: auto;
      background-color: rgba(7, 17, 27, .8);
      backdrop-filter: blur(10px);

      .warp {
        width: 100%;
        min-height: 100%;

        .main {
          margin-top: 128px;
          padding-bottom: 128px;

          .name {
            text-align: center;
            font-size: 32px;
            font-weight: 700;
            line-height: 32px;
          }

          .star-warp {
            margin-top: 36px;
            padding: 4px 0;
            text-align: center;
          }

          .title {
            width: 80%;
            display: flex;
            margin: 56px auto 48px;

            .line {
              flex: 1;
              border-bottom: 1px solid rgba(255, 255, 255, 0.2); /* no */
              position: relative;
              top: -12px;
            }

            .text {
              padding: 0 24px;
              font-size: 28px;
              font-weight: 700;
              line-height: 28px;
            }
          }

          .supports {
            width: 80%;
            margin: 0 auto;

            .item {
              padding: 0 24px;
              margin-bottom: 24px;
              font-size: 0;

              &:last-child {
                margin-bottom: 0;
              }

              .text {
                line-height: 32px;
                font-size: 24px;
              }
            }
          }

          .bulletin {
            width: 80%;
            margin: 0 auto;
            font-size: 24px;
            line-height: 48px;
            font-weight: 200;

            p {
              padding: 0 24px;
            }
          }
        }
      }

      .close {
        position: relative;
        width: 64px;
        height: 64px;
        margin: -128px auto;
        clear: both;
        font-size: 64px;
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
