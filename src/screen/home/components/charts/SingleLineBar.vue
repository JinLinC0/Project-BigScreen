<template>
    <div class="Container">
        <div ref="chartRef" class="h-full w-full"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';

const chartRef = ref<HTMLDivElement | null>(null);
let myChart: echarts.ECharts | null = null;

onMounted(() => {
    if (chartRef.value) {
        myChart = echarts.init(chartRef.value);
        const option = {
            tooltip: {
                trigger: 'item',
                triggerOn: 'click',
                formatter: (arg: any) => {
                    return `${arg.name}的${arg.seriesName}为：${arg.data}`;
                }
            },
            grid: {
                top: '12%',
                bottom: '0%',
                left: '0%',
                right: '0%',
                containLabel: true
            },
            legend: {
                data: ['企业数'],
                right: '0%', // 设置图例距离右侧的位置
                icon: 'rect',
                itemWidth: 10, // 设置图例图标的宽度
                itemHeight: 10, // 设置图例图标的高度
                textStyle: {
                    fontSize: 12,
                    color: '#6b6d71'
                },
                show: false
            },
            xAxis: {
                data: ["杭州市", "宁波市", "台州市", "温州市"]
            },
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
                interval: 5
            },
            series: [
                {
                    name: '企业数',
                    type: 'bar',
                    data: [8, 7, 5, 6],
                    barWidth: 20,
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
                    }
                }
            ]
        };
        myChart.setOption(option);
    }
});

window.addEventListener("resize", function () {
    if (myChart) {
        myChart.resize();
    }
});
</script>

<style scoped>
.Container {
    background: linear-gradient(rgba(12, 24, 45, 0), rgba(16, 41, 64, 1));
}
</style>