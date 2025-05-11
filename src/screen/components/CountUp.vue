<template>
  <div>
    <span ref="countUpElement">{{ displayNumber }}</span>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { CountUp } from 'countup.js';

const props = defineProps({
  startVal: {
    type: Number,
    default: 0
  },
  endVal: {
    type: Number,
    required: true
  },
  duration: {
    type: Number,
    default: 2 // 2 seconds
  }
});

const countUpElement = ref(null);
const displayNumber = ref(props.startVal);
let countUpInstance = null;

const initializeCountUp = () => {
  if (countUpInstance) {
    countUpInstance.update(props.endVal);
  } else {
    countUpInstance = new CountUp(countUpElement.value, props.endVal, {
      startVal: props.startVal,
      duration: props.duration,
      useGrouping: true, // 使用千位分隔符
      separator: ',', // 千位分隔符
      decimal: '.', // 小数点
      prefix: '', // 前缀
      suffix: '' // 后缀
    });

    if (!countUpInstance.error) {
      countUpInstance.start();
    } else {
      console.error(countUpInstance.error);
    }
  }
};

onMounted(() => {
  initializeCountUp();
});

watch(() => [props.startVal, props.endVal, props.duration], () => {
  initializeCountUp();
});
</script>

<style scoped>
/* 你的样式 */
</style>