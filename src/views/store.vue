<template>
  <div>
    <a-input v-model="inputValue"></a-input>
    <a-input :value="inputValue" @input="handleInput"></a-input>
    <p>{{inputValue}}</p>
  </div>
</template>
<script>
import AInput from "../components/AInput";
export default {
  name: "store",
  data() {
    return {
      inputValue: ""
    };
  },
  components: {
    AInput
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


