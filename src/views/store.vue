<template>
  <div>
    <a-input v-model="inputValue"></a-input>
    <a-input :value="inputValue" @input="handleInput"></a-input>
    <a-show :content="inputValue"></a-show>
    <p>{{inputValue}}</p>
  </div>
</template>
<script>
import AInput from "../components/AInput";
import AShow from "../components/AShow"; //平行兄弟组件
export default {
  name: "store",
  data() {
    return {
      inputValue: ""
    };
  },
  components: {
    AInput,
    AShow
  },
  methods: {
    // input为方法传递的值
    handleInput(val) {
      this.inputValue = val;
    }
  }
};
</script>
<style>
</style>


