<template>
  <div class="goods">
    <div ref="menu">
      <ul class="menu-wrap">
        <li class="item"
            v-for="(item, index) in goods"
            :key="index" :class="{'current': currentIndex === index}"
            @click="selectMenu(index, $event)"
        >
          <div class="text">
            <Icon
              v-if="item.type > 0"
              :num="3"
              :index="index"/>
            {{ item.name }}
          </div>
        </li>
      </ul>
    </div>
    <div ref="food">
      <ul class="food-wrap">
        <li class="list list-hock"
            v-for="(item, index) in goods"
            :key="index"
        >
          <h1 class="title">{{ item.name }}</h1>
          <ul>
            <li class="item"
                v-for="(food, index) in item.foods"
                :key="index"
                @click="selectFood(food, $event)"
            >
              <div class="icon">
                <img :src="food.icon" alt="">
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="desc">{{ food.description }}</p>
                <div class="extra">
                  <span class="count">月售{{ food.sellCount }}</span>
                  <span>好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{ food.price }}</span>
                  <span class="old" v-show="food.oldPrice">{{ food.oldPrice }}</span>
                </div>
                <div class="calculator-wrap">
                  <Calculator
                    :food="food"
                    @shop-add="getDmo"
                  />
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <Shop
      :deliveryPrice="seller.deliveryPrice"
      :minPrice="seller.minPrice"
      :select-foods="selectFoods"
      ref="shop"
    />
    <Food
      :food="selectedFood"
      ref="foods"
      @shop-add="getDmo"
    />
  </div>
</template>

<script>
  /**
   * Goods Component
   *
   * @data
   * goods: 保存接收的数据
   * listHeight: 高度列表
   * scrollY: 滑动的距离
   * selectedFood: 选中的商品
   *
   * @computed
   * currentIndex: 返回当前高度的索引
   * selectFoods: 返回当前选择的商品
   *
   * @methods
   * selectMenu: 滚动到当前选择的按钮
   * selectFood: 显示选中商品的详情
   * initScroll: 初始化BScroll, 监听滚动的距离
   * calculateHeight: 获得所有品类距离父级的高度
   * add: 调用子组件的drop方法
   */

  import BScroll from 'better-scroll'
  import Icon from '../icon/Icon'
  import Shop from '../shop/Shop'
  import Calculator from  '../calculator/Calculator'
  import Food from '../food/Food'

  export default {
    name: "Goods",
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    props: {
      seller: {
        type: Object
      }
    },
    created() {
      this.$axios.get('/api/goods')
        .then(response => {
          const res = response.data;
          if (res.erron === 0) {
            this.goods = res.data;
            this.$nextTick(() => {
              this.initScroll();
              this.calculateHeight();
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height = this.listHeight[i],
            height$ = this.listHeight[i + 1];

          if (!height$ || this.scrollY >= height && this.scrollY < height$) {
            return i;
          }
        }
      },
      selectFoods() {
        let foods = [];
        this.goods.forEach(good => {
          good.foods.forEach(food => {
            if (food.count > 0) {
              foods.push(food)
            }
          });
        });
        return foods;
      }
    },
    methods: {
      selectMenu(index, event) {
        if (!event._constructed){
          return false;
        }

        let foodList = this.$refs.food.getElementsByClassName('list-hock');

        let el = foodList[index];

        this.foodsScroll.scrollToElement(el, 300);
      },
      selectFood(food, event) {
        if (!event._constructed){
          return false;
        }

        this.selectedFood = food;

        this.$refs.foods.show();
      },
      initScroll() {
        new BScroll(this.$refs.menu, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.food, {
          probeType: 3,
          click: true
        });

        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y));
        })
      },
      calculateHeight() {
        let foodList = this.$refs.food.getElementsByClassName('list-hock'),
          height = 0;

        this.listHeight.push(height);

        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      },
      getDmo(el) {
        this.$nextTick(() => {
          this.$refs['shop'].drop(el);
        })
      }
    },
    components: {
      Icon,
      Shop,
      Calculator,
      Food
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/index";

  .goods {
    width: 100%;
    display: flex;
    overflow: hidden;
    position: absolute;
    top: 348px;
    bottom: 116px;

    .menu-wrap {
      width: 160px;
      flex: 0 0 160px;
      background-color: #f3f5f7;

      .item {
        display: table;
        width: 112px;
        height: 108px;
        padding: 0 24px;
        line-height: 28px;

        &.current {
          position: relative;
          margin-top: -1px; /* no */
          z-index: 10;
          background-color: #fff;
          font-weight: 700;

          .text {
            .border-none();
          }
        }

        .text {
          height: 108px;
          display: table-cell;
          vertical-align: middle;
          font-size: 24px;
          font-weight: 200;
          .border-1px(rgba(7, 17, 27, .1));
        }

      }
    }

    .food-wrap {
      flex: 1;

      .list {

        .title {
          height: 52px;
          padding-left: 28px;
          line-height: 52px;
          border-left: 2px solid #d9dde1; /*no*/
          font-size: 24px;
          color: rgb(147, 153, 159);
          background-color: #f3f5f7;
        }

        .item {
          display: flex;
          margin: 36px;
          padding-bottom: 36px;
          .border-1px(rgba(7, 17, 27, 0.1));

          &:last-child {
            .border-none();
            margin-bottom: 0;
          }

          .icon {
            width: 114px;
            height: 114px;
            flex: 0 0 114px;
            margin-right: 20px;

            img {
              width: 100%;
            }
          }

          .content {
            flex: 1;

            .name {
              height: 28px;
              margin: 4px 0 16px;
              line-height: 28px;
              font-size: 28px;
              color: rgb(7, 17, 27);
            }

            .desc, .extra {
              font-size: 20px;
              line-height: 20px;
              color: rgb(147, 153, 159);
            }

            .desc {
              line-height: 24px;
              margin-bottom: 16px;
            }

            .extra {

              .count {
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

            .calculator-wrap {
              position: absolute;
              right: 0;
              bottom: 20px;
            }
          }
        }
      }
    }
  }
</style>
