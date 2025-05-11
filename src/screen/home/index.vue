<template>
    <div class="app-container">
        <div class="header">
            <div class="flex h-[30px]">
                <div class="w-[30%]">
                    <DigitalClock class="mt-1" />
                </div>
                <div class="w-[40%]">
                    <div class="trapezoid">
                        <span class="text-[25px] text-[#fff] font-bold">浙江区域xxxxxx系统云平台</span>
                    </div>
                </div>
                <div class="w-[30%] flex items-center justify-end">
                    <div class="flex items-center">
                        <Weather :url=weather title="当前天气：" />
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="content-aside  pr-12">
                <div v-for="item in leftChartList" :key="item.title" class="w-full h-[calc(100%/3)] pt-6">
                    <ChartsTitle :title="item.title" />
                    <component :is="item.componentName" class="side-component" />
                </div>
            </div>
            <div class="content-center">
                <div class="w-[100%] h-[15%] flex items-center justify-center" v-if="topTitleDate.managementDevices">
                    <div class="componentOneContainer">
                        <div class="w-[80%] h-full flex items-center justify-end">
                            <div>
                                <span class="text-[16px]" style="color: rgba(194, 221, 240, 1);">服务企业数</span>
                                <div class="text-[22px] text-center" style="color: rgba(127, 208, 255, 1);">
                                    <CountUp :endVal="23" :duration="3" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="componentTwoContainer">
                        <div class="w-[80%] h-full flex items-center justify-end">
                            <div>
                                <span class="text-[16px]" style="color: rgba(194, 221, 240, 1);">风险告警数</span>
                                <div class="text-[22px] text-center" style="color: rgba(127, 208, 255, 1);">
                                    <CountUp :endVal=topTitleDate.riskAlert :duration="3" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="componentThreeContainer">
                        <div class="w-[80%] h-full flex items-center justify-end">
                            <div>
                                <span class="text-[16px]" style="color: rgba(194, 221, 240, 1);">在管设备数</span>
                                <div class="text-[22px] text-center" style="color: rgba(127, 208, 255, 1);">
                                    <CountUp :endVal=topTitleDate.managementDevices :duration="3" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-[100%] h-[60%]" style="position: relative;">
                    <ChartsTitle title="服务网络分布" />
                    <ChinaMap style="height: calc(100% - 30px);" />
                </div>
                <div class="w-[100%] h-[25%]">
                    <ChartsTitle title="风险告警总览" />
                    <BottomTable style="height: calc(100% - 60px);" />
                </div>
            </div>
            <div class="content-aside pl-12">
                <div v-for="item in rightChartList" :key="item.title" class="w-full h-[calc(100%/3)] pt-6">
                    <ChartsTitle :title="item.title" />
                    <component :is="item.componentName" class="side-component" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// 封装组件的引入
import DigitalClock from '../components/DigitalClock.vue';
import Weather from '../components/Weather.vue';
import ChartsTitle from '../components/ChartsTitle.vue';
import ChinaMap from './components/ChinaMap.vue';
// 图表的引入
import BottomTable from '../components/BottomTable.vue';
import SingleLineBar from './components/charts/SingleLineBar.vue';
import VerticalMultiItemBar from './components/charts/VerticalMultiItemBar.vue';
import SingleLineBarForAlarm from './components/charts/SingleLineBarForAlarm.vue';
import GraphChart from './components/charts/GraphChart.vue';
import HorizontalMultiItemBar from './components/charts/HorizontalMultiItemBar.vue';
import PieChart from './components/charts/PieChart.vue';
// 静态资源的引入
import weather from '/src/assets/bigScreen/svg/weather.svg'
import { ref } from 'vue';

const leftChartList = [
    { title: '服务地区企业数量统计', componentName: SingleLineBar },
    { title: '服务地区设备数量统计', componentName: VerticalMultiItemBar },
    { title: '服务地区收入情况统计', componentName: SingleLineBarForAlarm },
]
const rightChartList = [
    { title: '风险设备数量变化趋势', componentName: GraphChart },
    { title: '风险设备数量统计分布', componentName: HorizontalMultiItemBar },
    { title: '风险设备占比', componentName: PieChart },
]

const topTitleDate = ref({
    riskAlert: '',
    managementDevices: ''
})
</script>

<style lang="scss" scoped>
$header-height: 7%;
$aside-width: 20%;

.app-container {
    width: 100vw;
    height: 100vh;
    // background-color: #021026ff;
    background-image: url('/src/assets/bigScreen/cut/bg.png');
    background-size: cover;
    /* 使图片占满整个元素 */
    background-position: center;
    /* 图片居中 */
    background-repeat: no-repeat;
    /* 防止图片重复 */
    width: 100%;
    /* 设置宽度为100% */
    height: 100vh;
    /* 设置高度为视口高度 */

    .header {
        width: 100%;
        height: $header-height;
        background-image: url('/src/assets/bigScreen/cut/bg_title.png');
        background-size: cover;
        /* 使图片占满整个元素 */
        background-position: center;
        /* 图片居中 */
        background-repeat: no-repeat;
        /* 防止图片重复 */
    }

    .content {
        width: 100%;
        height: calc(100% - $header-height);
        padding: 0 20px;
        display: flex;

        .content-aside {
            width: $aside-width;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding-bottom: 20px;
        }

        .content-center {
            width: calc(100% - $aside-width * 2);
            height: 100%;
        }
    }
}

.trapezoid {
    width: 100%;
    height: 60px;
    margin: auto;
    // clip-path: polygon(0 0, 100% 0, 95% 100%, 5% 100%);
    display: flex;
    align-items: center;
    justify-content: center;
}

.componentOneContainer {
    width: 250px;
    height: 88px;
    // margin-left: 22px;
    display: flex;
    flex-direction: row;
    background-image: url('/src/assets/bigScreen/cut/bg_company.png');;
    background-size: cover; /* 使图片占满整个元素 */
    background-position: center; /* 图片居中 */
    background-repeat: no-repeat; /* 防止图片重复 */
}

.componentTwoContainer {
    width: 250px;
    height: 88px;
    margin-left: 22px;
    display: flex;
    flex-direction: row;
    background-image: url('/src/assets/bigScreen/cut/bg_risk.png');;
    background-size: cover; /* 使图片占满整个元素 */
    background-position: center; /* 图片居中 */
    background-repeat: no-repeat; /* 防止图片重复 */
}

.componentThreeContainer {
    width: 250px;
    height: 88px;
    margin-left: 22px;
    display: flex;
    flex-direction: row;
    background-image: url('/src/assets/bigScreen/cut/bg_equipment.png');;
    background-size: cover; /* 使图片占满整个元素 */
    background-position: center; /* 图片居中 */
    background-repeat: no-repeat; /* 防止图片重复 */
}

.side-component {
    height: calc(100% - 30px);
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 5px;
    padding-bottom: 15px;
    justify-items: center;
    align-items: center;
}
</style>