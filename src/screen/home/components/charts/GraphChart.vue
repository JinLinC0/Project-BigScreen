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

const initChart = () => {
    if (chartRef.value) {
        myChart = echarts.init(chartRef.value);
        const option = {
            legend: {
                icon: 'rect',
                itemWidth: 14,
                itemHeight: 5,
                itemGap: 13,
                data: [
                    { name: '低风险', icon: 'rect' },
                    { name: '中风险', icon: 'rect' },
                    { name: '中高风险', icon: 'rect' },
                    { name: '高风险', icon: 'rect' }
                ],
                right: '0%',
                tooltip: {
                    show: true
                },
                textStyle: {
                    fontSize: 12,
                    color: '#6b6d71'
                }
            },
            color:['rgba(87, 146, 140, 1)','rgba(180, 162, 79, 1)','rgba(187, 120, 72, 1)','rgba(165, 72, 72, 1)'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    lineStyle: {
                        color: '#57617B'
                    }
                },
                backgroundColor: 'rgba(50, 50, 50, 0.7)',
                borderColor: '#57617B',
                textStyle: {
                    color: '#fff'
                }
            },
            grid: {
                top: '12%',
                bottom: '0%',
                left: '0%',
                right: '0%',
                containLabel: true
            },
            xAxis: [{
                axisLine: {
                    lineStyle: {
                        color: '#57617B'
                    }
                },
                data: ['10-06', '10-07', '10-08', '10-09', '10-10', '10-11', '10-12']
            }],
            yAxis: [{
                type: 'value',
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#57617B'
                    }
                },
                axisLabel: {
                    fontSize: 14
                },
                splitLine: {
                    lineStyle: {
                        color: '#57617B'
                    }
                }
            }],
            series: [{
                name: '低风险',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    width: 2,
                    // color: '#68d980ff'
                },
                data: [13, 15, 16, 12, 13, 15, 18]
            },
            {
                name: '中风险',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    width: 2,
                    // color: '#ebc95bff'
                },
                data: [10, 8, 9, 10, 12, 13, 12]
            },
            {
                name: '中高风险',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    width: 2,
                    // color:'#ff9945ff'
                },
                data: [8, 12, 8, 9, 8, 16, 12]
            },
            {
                name: '高风险',
                type: 'line',
                smooth: true,
                symbol: 'circle',
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    width: 2,
                    // color: '#e35b5bff'
                },
                data: [5, 0, 4, 2, 6, 4, 3]
            }]
        }
        myChart.setOption(option);
    }
}

window.addEventListener("resize", function () {
    if (myChart) {
        myChart.resize();
    }
});

onMounted(async () => {
    initChart()
})
</script>

<style scoped>
.Container {
    background: linear-gradient(rgba(12, 24, 45, 0), rgba(16, 41, 64, 1));
}
</style>