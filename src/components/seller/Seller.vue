<template>
  <div class="seller" ref="seller">
    <div class="content">
      <div class="overview">
        <h1 class="title">{{ seller.name }}</h1>
        <div class="desc">
          <Star :size="36" :score="seller.score" />
          <span class="text">({{ seller.ratingCount }})</span>
          <span class="text">月售{{ seller.sellCount }}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{ seller.minPrice }}</span>
              <span class="unit">元</span>
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{ seller.deliveryPrice }}</span>
              <span class="unit">元</span>
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{ seller.deliveryTime }}</span>
              <span class="unit">分钟</span>
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite">
          <i class="icon-favorite" :class="{active: favorite}"></i>
          <span class="text">{{ favoriteText }}</span>
        </div>
      </div>
      <split />
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrap">
          <p class="content">
            {{ seller.bulletin }}
          </p>
        </div>
      </div>
      <ul class="supports" v-if="seller.supports">
        <li class="item" v-for="(item, index) in seller.supports" :key="index">
          <Icon :num="4" :index="item.type" />
          <span class="text">{{ item.description }}</span>
        </li>
      </ul>
      <split />
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pic-warp" ref="pics">
          <ul class="pic-list" ref="picList">
            <li class="item"
                v-for="(item, index) in seller.pics"
                :key="index"
                ref="lis"
            >
              <img :src="item" alt="" ref="img">
            </li>
          </ul>
        </div>
      </div>
      <split />
      <div class="info">
        <div class="title">商家信息</div>
        <ul class="list">
          <li class="item"
              v-for="(info, index) in seller.infos"
              :key="index"
          >
            {{ info }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Star from '../star/Star'
  import Split from '../split/Split'
  import Icon from '../icon/Icon'
  import BScroll from 'better-scroll'

  export default {
    name: "Seller",
    data() {
      return {
        favorite: false
      }
    },
    computed: {
      favoriteText() {
        return this.favorite ? '已收藏' : '收藏';
      }
    },
    methods: {
      toggleFavorite() {
        this.favorite = !this.favorite;
      },
      init() {
        if (this.seller.pics) {
          // 获得元素
          let lis = this.$refs.lis[0],
            img = this.$refs.img[0];

          // 获取元素的宽度和margin值
          let style = window.getComputedStyle(lis, null),
            picWidth = img.width,
            margin = parseFloat(style.marginRight);

          // 算出inner的宽度
          let width = (picWidth + margin) * this.seller.pics.length - margin;

          this.$refs.picList.style.width = width + 1 + 'px';

          new BScroll(this.$refs.pics, {
            scrollX: true
          });
        }
      }
    },
    props: {
      seller: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    watch: {
      seller(newValue, oldValue) {
        this.$nextTick(() => {
          this.init();
        })
      }
    },
    mounted (){
      this.$nextTick(() => {
        this.scroll = new BScroll(this.$refs.seller, {
          click: true
        });
      })

      this.init();
    },
    components: {
      Star,
      Split,
      Icon
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/index";

  .seller {
    width: 100%;
    position: absolute;
    top: 348px;
    bottom: 0;
    left: 0;
    overflow: hidden;

    .content {

      .overview {
        position: relative;
        padding: 36px;

        .title {
          font-size: 28px;
          color: rgb(7, 17, 27);
          margin-bottom: 16px;
          line-height: 28px;
        }

        .desc {
          margin-bottom: 36px;
          padding-bottom: 36px;
          line-height: 36px;
          font-size: 0;
          .border-1px(rgba(7, 17, 27, .1));

          .star {
            display: inline-block;
            margin-right: 16px;
            vertical-align: middle;
          }

          .text {
            display: inline-block;
            margin-right: 12px;
            color: rgb(77, 85, 93);
            font-size: 20px;
          }
        }

        .remark {
          display: flex;

          .block {
            flex: 1;
            text-align: center;
            border-right: 1px solid rgba(7, 17, 27, 0.1);

            &:last-child {
              border-right: none;
            }

            h2 {
              margin-bottom: 8px;
              color: rgb(147, 153, 159);
              font-size: 20px;
            }

            .content {
              line-height: 48px;
              font-size: 0;
              color: rgb(7, 17, 27);

              .stress {
                font-size: 48px;
                display: inline-block;
              }

              .unit {
                font-size: 20px;
                display: inline-block;
              }
            }
          }
        }
        
        .favorite {
          width: 90px;
          position: absolute;
          top: 36px;
          right: 36px;
          text-align: center;
          
          .icon-favorite {
            display: block;
            font-size: 48px;
            line-height: 48px;
            color: #d4d6d9;
            margin-bottom: 8px;
            
            &.active {
              color: rgb(240, 20, 20);
            }
          }

          .text {
            font-size: 20px;
            line-height: 20px;
            color: rgb(77, 85, 93);
          }
        }
      }

      .bulletin {
        padding: 36px 36px 0 36px;

        .title {
          font-size: 28px;
          color: rgb(7, 17, 27);
          margin-bottom: 16px;
          line-height: 28px;
        }

        .content-wrap {
          padding: 0 24px 32px 24px;
          .border-1px(rgba(7, 17, 27, .1));

          .content {
            font-size: 24px;
            color: rgb(240, 20, 20);
            line-height: 48px;
          }
        }
      }

      .supports {
        padding: 0 36px;

        .item {
          padding: 32px 24px;
          .border-1px(rgba(7, 17, 27, .1));

          &:last-child {
            .border-none();
          }

          .text {
            display: inline-block;
            vertical-align: middle;
            font-size: 24px;
            line-height: 32px;
            color: rgb(7, 17, 27);
          }
        }
      }

      .pics {
        padding: 36px;

        .title {
          font-size: 28px;
          color: rgb(7, 17, 27);
          margin-bottom: 24px;
          line-height: 28px;
        }

        .pic-warp {
          width: 100%;
          overflow: hidden;
          white-space: nowrap;

          .pic-list {
            font-size: 0;

            .item {
              width: 240px;
              height: 180px;
              display: inline-block;
              margin-right: 12px;

              img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }

      .info {
        padding: 36px 36px 0 36px;

        .title {
          font-size: 28px;
          color: rgb(7, 17, 27);
          padding-bottom: 24px;
          line-height: 28px;
          .border-1px(rgba(7, 17, 27, 0.1 ))
        }

        .list {

          .item {
            padding: 32px 24px;
            line-height: 32px;
            font-size: 24px;
            color: rgb(7, 17, 27);
            .border-1px(rgba(7, 17, 27, 0.1 ));

            &:last-child {
              .border-none();
            }
          }
        }
      }
    }
  }
</style>
