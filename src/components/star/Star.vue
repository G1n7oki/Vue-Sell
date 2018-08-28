<template>
  <div class="star" :class="starType">
    <span class="star-item" v-for="(item, index) in classes" :class="item" :key="index"></span>
  </div>
</template>

<script>
  /**
   * Star Component
   *
   * 功能: 渲染高亮的星星
   *
   * 参数:
   * size: 定义使用星星的大小
   * score: 定义高亮星星的个数
   *
   * 计算属性:
   * starType: 规定星星大小的class
   * classes: 返回高亮星星, 灰色星星的个数
   *    CLS_ON: 全星
   *    CLS_HALF: 半星
   *    CLS_OFF: 灰星
   *    LENGTH: 星星个数
   * */

  const LENGTH = 5,
    CLS_ON = 'on',
    CLS_HALF = 'half',
    CLS_OFF = 'off';

  export default {
    name: "star",
    data() {
      return {

      }
    },
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType() {
        return 'star-' + this.size;
      },
      classes() {
        let result = [],
          score = Math.floor(this.score * 2) / 2,
          hasDecimal = score % 1 !== 0,
          integer = Math.floor(score);

        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON);
        }

        if (hasDecimal) {
          result.push(CLS_HALF);
        }

        while (result.length < LENGTH) {
          result.push(CLS_OFF);
        }

        return result;
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/index";

  .star {
    font-size: 0;

    &.star-48 {

      .star-item {
        width: 40px;
        height: 40px;
        margin-right: 44px;
        display: inline-block;

        &:last-child {
          margin-right: 0;
        }

        &.on {
          .bg-image('img/star48_on', 0, 0);
        }

        &.half {
          .bg-image('img/star48_half', 0, 0);
        }

        &.off {
          .bg-image('img/star48_off', 0, 0);
        }
      }
    }

    &.star-36 {

      .star-item {
        width: 30px;
        height: 30px;
        margin-right: 16px;
        display: inline-block;

        &.last-child {
          margin-right: 0;
        }

        &.on {
          .bg-image('img/star36_on', 0, 0);
        }

        &.half {
          .bg-image('img/star36_half', 0, 0);
        }

        &.off {
          .bg-image('img/star36_off', 0, 0);
        }
      }
    }

    &.star-24 {

      .star-item {
        width: 20px;
        height: 20px;
        margin-right: 6px;
        display: inline-block;

        &.last-child {
          margin-right: 0;
        }

        &.on {
          .bg-image('img/star24_on', 0, 0);
        }

        &.half {
          .bg-image('img/star24_half', 0, 0);
        }

        &.off {
          .bg-image('img/star24_off', 0, 0);
        }
      }
    }
  }
</style>
