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

let pieData = [
    { name: '低风险', type: 'risk_level_1', value: 60 },
    { name: '中风险', type: 'risk_level_2', value: 20 },
    { name: '中高风险', type: 'risk_level_3', value: 10 },
    { name: '高风险', type: 'risk_level_4', value: 10 },
];

const initChart = () => {
    if (chartRef.value) {
        myChart = echarts.init(chartRef.value);
        const option = {
            color:['rgba(87, 146, 140, 1)','rgba(180, 162, 79, 1)','rgba(187, 120, 72, 1)','rgba(165, 72, 72, 1)'],
            legend: {
                orient: 'vertical', // 垂直排列
                left: 'right', // 图例在左侧
                data: pieData.map(item => item.name), // 图例数据
                itemWidth: 10, // 设置图例图标的宽度
                itemHeight: 10, // 设置图例图标的高度
                textStyle: {
                    fontSize: 12,
                    color: '#6b6d71'
                }
            },
            series: [
                {
                    type: 'pie',
                    data: pieData,
                    label: {
                        show: true, // 显示文字
                        formatter: function (arg: any) {
                            return `${arg.percent}%`;
                        }
                    }
                }
            ]
        };
        myChart.setOption(option);
    }
};

onMounted(async () => {
    initChart();
});

window.addEventListener('resize', () => {
    if (myChart) {
        myChart.resize();
    }
});
</script>

<style lang="scss" scoped>
.Container {
    background: linear-gradient(rgba(12, 24, 45, 0), rgba(16, 41, 64, 1));
}
</style>