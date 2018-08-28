<template>
  <div class="rating-select">
    <div class="type">
      <span class="block positive"
            :class="{active: selectType === 2}"
            @click="select(2, $event)"
      >{{ desc.all }}<span class="count">{{ ratings.length }}</span></span>
      <span class="block positive"
            :class="{active: selectType === 0}"
            @click="select(0, $event)"
      >{{ desc.positive }}<span class="count">{{ positives.length }}</span></span>
      <span class="block negative"
            :class="{active: selectType === 1}"
            @click="select(1, $event)"
      >{{ desc.negative }}<span class="count">{{ negatives.length }}</span></span>
    </div>
    <div class="switch"
         :class="{on: onlyContent}"
         @click="toggleContent"
    >
      <i class="icon-check_circle"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  const POSITIVE = 0,
    NEGATIVE = 1,
    ALL = 2;

  export default {
    name: "RatingSelect",
    data() {
      return {
        types: ALL,
        content: false
      }
    },
    props: {
      ratings: {
        type: Array,
        default() {
          return [];
        },
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    computed: {
      positives() {
        return this.ratings.filter(rating => {
          return rating.rateType === POSITIVE;
        });
      },
      negatives() {
        return this.ratings.filter(rating => {
          return rating.rateType === NEGATIVE;
        });
      }
    },
    methods: {
      select(type, event) {
        if (!event._constructed) {
          return false;
        }
        this.types = type;

        this.$emit('sendType', this.types);
      },
      toggleContent(event) {
        if (!event._constructed) {
          return false;
        }

        this.content = !this.content;
        this.$emit('sendContent', this.content);
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/index";

  .rating-select {

    .type {
      padding: 36px 0;
      margin: 0 36px;
      .border-1px(rgba(7, 17, 27, 0.1));
      font-size: 0;

      .block {
        display: inline-block;
        padding: 16px 24px;
        margin-right: 16px;
        border-radius: 2px;
        color: rgb(77, 85, 93);
        font-size: 24px;
        line-height: 32px;

        &.active {
          color: #fff;
        }

        &.positive {
          background-color: rgba(0, 160, 220, 0.2);

          &.active {
            background-color: rgb(0, 160, 220);
          }
        }

        &.negative {
          background-color: rgba(77, 85, 93, 0.2);

          &.active {
            background-color: rgb(77, 85, 93);
          }
        }

        .count {
          font-size: 16px;
          margin-left: 4px;
        }
      }
    }

    .switch {
      padding: 24px 36px;
      line-height: 48px;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      color: rgb(147, 153, 159);
      font-size: 0;

      &.on {

        .icon-check_circle {
          color: #00c850;
        }
      }

      .icon-check_circle {
        display: inline-block;
        vertical-align: top;
        margin-right: 8px;
        font-size: 48px;
      }

      .text {
        display: inline-block;
        vertical-align: top;
        font-size: 24px;
        margin-top: 2px;
      }
    }
  }
</style>
