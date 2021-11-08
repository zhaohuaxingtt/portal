<template>
  <div class="main">
    <!-- 有Icon刻度 -->
    <div class="content" v-show="showIcon()">
      <div class="content-line-icon">
        <div class="left">
          <div :class="labelClass()">
            <span>{{ title() }}</span>
          </div>
          <Icon class="car-icon" symbol :name="iconName()" />
          <div :class="verticalIconLineClass()"></div>
          <div class="dothorizontalLine">
            <div :class="leftHorizontalLineClass()"></div>
            <div :class="dotClass()"></div>
            <div class="horizontalLine"></div>
          </div>
        </div>
      </div>
      <div class="bottom-label">
        <div class="bottom-label-left">
          <span>{{ leftMonth() }}</span>
        </div>
        <div class="bottom-label-right">
          <span>{{ rightMonth() }}</span>
        </div>
      </div>
      <div class="bottom-date-label">
        <div>
          <span>{{ dateYear() }}</span>
        </div>
        <div>
          <span>{{ dateMonthDay() }}</span>
        </div>
      </div>
    </div>

    <!-- 无Icon刻度 -->
    <div class="not-content" v-show="!showIcon()">
      <div class="not-line-content">
        <div class="not-horizontalLine"></div>
      </div>
      <div class="not-bottom-label">
        <span>{{ rightMonth() }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from 'rise'
export default {
  props: {
    itemProp: {
      type: Object,
      default: function() {
        return {
          title: 'PM',
          month: '0',
          status: false,
          showIcon: false
        }
      }
    },
    status: {
      type: Boolean,
      default: true
    },
    highlightItems: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  methods: {
    title() {
      return this.itemProp.title
    },
    leftMonth() {
      return this.itemProp.leftMonth
    },
    rightMonth() {
      return this.itemProp.rightMonth
    },
    showIcon() {
      return this.itemProp.showIcon
    },
    dateYear() {
      // this.itemProp.date = "2021-09-20"
      let date = this.isHighlight()
      if (date && date.length > 0) {
        let year = moment(new Date(date)).format('YYYY')
        return year
      }
      return ''
    },
    dateMonthDay() {
      // this.itemProp.date = "2021-09-20"
      let date = this.isHighlight()
      if (date && date.length > 0) {
        let monthDay = moment(new Date(date)).format('MM-DD')
        return monthDay
      }
      return ''
    },
    showLeftHLine() {
      return this.itemProp.showLeftHLine
    },
    leftHorizontalLineClass() {
      let show = this.showLeftHLine()
      if (show) {
        return 'horizontalLine'
      }
      return 'empty-horizontalLine'
    },
    labelClass() {
      let title = this.isHighlight()
      if (title) {
        return 'label-highlight'
      }
      return 'label-normal'
    },
    verticalIconLineClass() {
      let title = this.isHighlight()
      if (title) {
        return 'verticalIconLine-highlight'
      }
      return 'verticalIconLine'
    },
    isHighlight() {
      let result = this.highlightItems
        ? this.highlightItems[this.itemProp.formKey]
        : null
      return result
    },
    dotClass() {
      let title = this.isHighlight()
      if (title) {
        return 'dot-highlight'
      }
      return 'dot'
    },
    iconName() {
      let title = this.isHighlight()
      if (title) {
        return 'icondingdianguanlijiedian-jinhangzhong'
      }
      return 'icondingdianguanlijiedian-yiwancheng'
    }
  },
  components: {
    Icon
  }
}
</script>

<style lang="scss" scoped>
//有Icon
$total-content-Width: 46px; //Icon内容大小，包括边距
$content-Width: 41px; //Icon内容大小
$total-content-Height: 180px; //Item的高度  content-Height + date-label-margin + date-label-height
$content-Height: 100px; //Item的高度
$scale-Space: 5px; //刻度尺的间隙
$dot-Width: 6px; //远点大小
$line-Height: 4px; //线高
$vertical-Icon-Line-Height: 20px; //垂直线高
$vertical-Icon-Line-Width: 1px; //垂直线宽
$date-label-height: 60px; //垂直线宽
$date-label-margin: 30px; //刻度尺的间隙
$Highlight-Color: #1660f1;
$Highlight-Text-Color: #41434a;

//无Icon
$scale-Width: 17.5px; //刻度尺的宽度
$not-Icon-Content-Width: 22.5px; // scale-Space+scale-Width

.main {
  display: inline-block;
}

.content {
  width: $total-content-Width;
  height: $total-content-Height;
  // background-color: chartreuse;
  .content-line-icon {
    display: flex;
    width: 100%;
    height: $content-Height;

    .left {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      width: $content-Width;
      margin-left: $scale-Space;
      // background-color: orange;

      .car-icon {
        font-size: 35px;
        margin-top: 15px;
      }

      .label-normal {
        color: #cdd4e2;
        font-size: 20px;
        font-weight: bold;
        // background-color: red;
      }

      .label-highlight {
        color: $Highlight-Text-Color;
        font-size: 20px;
        font-weight: bold;
        // background-color: red;
      }

      .verticalIconLine {
        background-color: #cdd4e2;
        height: $vertical-Icon-Line-Height;
        width: $vertical-Icon-Line-Width;
      }

      .verticalIconLine-highlight {
        background-color: $Highlight-Color; // #41434a;
        height: $vertical-Icon-Line-Height;
        width: $vertical-Icon-Line-Width;
      }

      .dothorizontalLine {
        display: flex;
        // background-color: yellow;
        width: $content-Width;
        height: $dot-Width;
        align-items: center;
        box-sizing: border-box;
        .dot {
          background-color: #cdd4e2;
          height: $dot-Width;
          width: $dot-Width;
          border-radius: 50%;
        }

        .dot-highlight {
          background-color: $Highlight-Color;
          height: $dot-Width;
          width: $dot-Width;
          border-radius: 50%;
        }

        .horizontalLine {
          height: $line-Height;
          width: $scale-Width;
          background-color: #cdd4e2;
          border-radius: 50%;
        }

        .empty-horizontalLine {
          height: $line-Height;
          width: $scale-Width;
          background-color: transparent;
          border-radius: 50%;
        }
      }
    }
  }

  .bottom-label {
    display: flex;
    // background-color: red;
    .bottom-label-left {
      // background-color: blue;
      display: inline-block;
      zoom: 0.7;
      margin-left: 25px;
    }

    .bottom-label-right {
      // background-color: burlywood;
      display: inline-block;
      color: #0d2451;
      zoom: 0.7;
      margin-left: 20px;
    }
  }

  .bottom-date-label {
    // background-color: red;
    margin-top: $date-label-margin;
    text-align: center;
    color: #5f6f8f;
    height: $date-label-height;
    zoom: 0.8;
  }
}

.not-content {
  width: $not-Icon-Content-Width;
  height: 100%;
  .not-line-content {
    width: 100%;
    height: $content-Height;
    display: flex;
    flex-direction: column-reverse;
    align-items: flex-end;
  }
  // background-color: green;
  .not-horizontalLine {
    height: $line-Height;
    width: $scale-Width;
    background-color: #cdd4e2;
    border-radius: 2px;
    margin-bottom: 1px;
  }
  .not-bottom-label {
    color: #0d2451;
    zoom: 0.7;
    margin-left: 30px;
  }
}
</style>
