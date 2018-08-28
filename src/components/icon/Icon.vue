<template>
  <div :class="iconType"></div>
</template>

<script>
  /**
   * Icon Component
   *
   * @computed
   * 定义使用的icon组
   *
   * @props
   * num: 判断使用哪套icon
   * index: 使用当前这套icon的某一个icon
   *
   * @created
   * classMap: 将索引转换成具体的类名
   */
  export default {
    name: "Icon",
    data() {
      return {

      }
    },
    props: {
      num: {
        type: Number
      },
      index: {
        type: Number
      }
    },
    created() {
      this.classMap = [
        'decrease',
        'discount',
        'special',
        'invoice',
        'guarantee'
      ]
    },
    computed: {
      iconType() {
        return "icon-" + this.num + ' ' + this.classMap[this.index]
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../assets/less/index";

  .icon-1 {
    display: inline-block;
    width: 24px;
    height: 24px;
    vertical-align: middle;

    &.decrease {
      .bg-image('img/decrease_1', 0, 0);
    }

    &.discount {
      .bg-image('img/discount_1', 0, 0);
    }

    &.guarantee {
      .bg-image('img/guarantee_1', 0, 0);
    }

    &.invoice {
      .bg-image('img/invoice_1', 0, 0);
    }

    &.special {
      .bg-image('img/special_1', 0, 0);
    }
  }

  .icon-2 {
    display: inline-block;
    width: 32px;
    height: 32px;
    vertical-align: top;
    margin-right: 12px;

    &.decrease {
      .bg-image('img/decrease_2', 0, 0);
    }

    &.discount {
      .bg-image('img/discount_2', 0, 0);
    }

    &.guarantee {
      .bg-image('img/guarantee_2', 0, 0);
    }

    &.invoice {
      .bg-image('img/invoice_2', 0, 0);
    }

    &.special {
      .bg-image('img/special_2', 0, 0);
    }
  }

  .icon-3 {
    display: inline-block;
    width: 24px;
    height: 24px;
    vertical-align: middle;

    &.decrease {
      .bg-image('img/decrease_3', 0, 0);
    }

    &.discount {
      .bg-image('img/discount_3', 0, 0);
    }

    &.guarantee {
      .bg-image('img/guarantee_3', 0, 0);
    }

    &.invoice {
      .bg-image('img/invoice_3', 0, 0);
    }

    &.special {
      .bg-image('img/special_3', 0, 0);
    }
  }

  .icon-4 {
    display: inline-block;
    width: 32px;
    height: 32px;
    vertical-align: middle;

    &.decrease {
      .bg-image('img/decrease_4', 0, 0);
    }

    &.discount {
      .bg-image('img/discount_4', 0, 0);
    }

    &.guarantee {
      .bg-image('img/guarantee_4', 0, 0);
    }

    &.invoice {
      .bg-image('img/invoice_4', 0, 0);
    }

    &.special {
      .bg-image('img/special_4', 0, 0);
    }
  }
</style>
