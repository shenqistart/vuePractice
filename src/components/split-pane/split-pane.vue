<template>
  <div class="split-pane-wrapper" ref="outer">
    <div class="pane pane-left" :style="{ width: leftOffsetPercent, paddingRight: `${this.triggerWidth / 2}px` }">
      <slot name="left"></slot>
    </div>
    <div class="pane-trigger-con" @mousedown="handleMousedown" :style="{ left: triggerLeft, width: `${triggerWidth}px` }"></div>
    <div class="pane pane-right" :style="{ left: leftOffsetPercent, paddingLeft: `${this.triggerWidth / 2}px` }">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: "SplitPane",
  props: {
    value: {
      type: Number,
      default: 0.5
    },
    triggerWidth: {
      type: Number,
      default: 8
    },
    min: {
      type: Number,
      default: 0.1
    },
    max: {
      type: Number,
      default: 0.9
    }
  },
  data() {
    return {
      // leftOffset: 0.3,
      canMove: false, //什么时候可以移动
      initOffset: 0
    };
  },
  computed: {
    leftOffsetPercent() {
      return `${this.value * 100}%`;
    },
    triggerLeft() {
      return `calc(${this.value * 100}% - ${this.triggerWidth / 2}px)`;
    }
  },
  methods: {
    handleClick() {
      this.leftOffset -= 0.02;
    },

    handleMousedown(event) {
      // 给整个dom都绑定拖动这个事件
      document.addEventListener("mousemove", this.handleMousemove);
      document.addEventListener("mouseup", this.handleMouseup);
      // 本身的一个初始值也要去掉
      this.initOffset =
        event.pageX - event.srcElement.getBoundingClientRect().left;
      this.canMove = true;
    },
    handleMousemove(event) {
      if (!this.canMove) return;
      // 点击时会返回一个元素的对象
      const outerRect = this.$refs.outer.getBoundingClientRect();
      // 设置最大值最小值
      let offsetPercent =
        (event.pageX -
          this.initOffset +
          this.triggerWidth / 2 -
          outerRect.left) /
        outerRect.width;
      if (offsetPercent < this.min) offsetPercent = this.min;
      if (offsetPercent > this.max) offsetPercent = this.max;
      // this.$emit('input', offsetPercent)
      this.$emit("update:value", offsetPercent);
    },
    handleMouseup() {
      this.canMove = false;
    }
  }
};
</script>
<style lang="less">
.split-pane-wrapper {
  height: 100%;
  width: 100%;
  position: relative;
  .pane {
    position: absolute;
    top: 0;
    height: 100%;
    &-left {
      // width: 30%;
      background: palevioletred;
    }
    &-right {
      right: 0;
      bottom: 0;
      background: paleturquoise;
    }
    &-trigger-con {
      height: 100%;
      background: red;
      position: absolute;
      top: 0;
      z-index: 10;
      user-select: none; //选中的操作
      cursor: col-resize;
    }
  }
}
</style>
