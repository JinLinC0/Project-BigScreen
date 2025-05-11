<template>
    <div class="Container">
        <div class="h-full w-full" ref="barRef"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const barRef = ref();
let myChart: any = null;

const initCharts = () => {
    let option = {
        // 整个echarts图标的位置
        grid: {
            top: '12%',
            bottom: '0%',
            left: '0%',
            right: '0%',
            containLabel: true
        },
        // 鼠标hover出现的提示框组件
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow',
            },
            backgroundColor: 'rgba(69, 173, 175, 0.5)',
            borderWidth: 0,
            textStyle: {
                color: '#fff',
                fontSize: 14,
            },
        },
        // 图例
        legend: {
            align: 'left', // 对齐反向
            right: 10,
            textStyle: {
                fontSize: 12,
                color: '#6b6d71'
            },
            itemWidth: 10,
            itemHeight: 8,
            itemGap: 10, // 间隔
        },
        barWidth: 10, // 柱体宽度
        // x轴相关样式
        xAxis: {
            type: 'category', // 将x轴设置为类别轴
            data: ["杭州市", "宁波市", "台州市", "温州市"], // 类别数据
            // 背景线条(竖着的)
            splitLine: {
                show: false, // 不显示背景线条
            },
            // 坐标轴的刻度线
            axisTick: {
                show: false, // 是否隐藏
                inside: true, // 刻度线指向内部还是外部
            },
            // x轴线
            axisLine: {
                lineStyle: {
                    color: '#26D9FF',
                },
            },
            // x轴文字样式
            axisLabel: {
                formatter: '{value}', // 自定义x轴文字内容,添加单位等
                color: '#59697A',
                fontSize: 12,
            },
        },
        // y轴相关样式
        yAxis: {
            type: 'value', // 将y轴设置为数值轴
            // 背景线条(横着的)
            splitLine: {
                lineStyle: {
                    color: 'rgba(65, 82, 100, 0.50)',
                    type: 'solid', // dashed设置背景横线为虚线,solid为实线
                },
            },
            // 坐标轴的刻度线
            axisTick: {
                show: false, // 是否隐藏
                inside: true, // 刻度线指向内部还是外部
            },
            // y轴线
            axisLine: {
                lineStyle: {
                    color: '#415264',
                    width: 2,
                    type: 'solid',
                },
            },
            // y轴文字样式
            axisLabel: {
                formatter: '{value}', // 自定义y轴文字内容,添加单位等
                color: '#59697A',
                fontSize: 12,
            },
        },
        // 所有数据
        series: [
            {
                type: 'bar',
                name: '管道',
                // 柱体样式
                itemStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(124, 205, 250, 1)' // 渐变开始颜色
                            },
                            {
                                offset: 1,
                                color: 'rgba(70, 158, 243, 0.50)' // 渐变结束颜色
                            }
                        ],
                        global: false // 默认值，表示使用局部坐标系
                    }
                },
                data: [20, 15, 35, 20], // 数据
            },
            {
                type: 'bar',
                name: '容器',
                // 柱体样式
                itemStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(87, 146, 140, 1)' // 渐变开始颜色
                            },
                            {
                                offset: 1,
                                color: 'rgba(87, 146, 140, 0.50)' // 渐变结束颜色
                            }
                        ],
                        global: false // 默认值，表示使用局部坐标系
                    }
                },
                data: [33, 30, 25, 15], // 数据
            },
            {
                type: 'bar',
                name: '其他',
                itemStyle: {
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [
                            {
                                offset: 0,
                                color: 'rgba(180, 162, 79, 1)' // 渐变开始颜色
                            },
                            {
                                offset: 1,
                                color: 'rgba(180, 162, 79, 0.50)' // 渐变结束颜色
                            }
                        ],
                        global: false // 默认值，表示使用局部坐标系
                    }
                },
                data: [15, 10, 10, 20],
            },
        ],
    };
    myChart = echarts.init(barRef.value as HTMLDivElement);
    myChart.setOption(option, true);
};

window.addEventListener("resize", function () {
    if (myChart) {
        myChart.resize();
    }
});

onMounted(() => {
    initCharts();
});
</script>

<style lang="scss" scoped>
.Container {
    background: linear-gradient(rgba(12, 24, 45, 0), rgba(16, 41, 64, 1));
}
</style>