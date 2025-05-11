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
            right: '2%',
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
            right: '0%',
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
            type: 'value',
            // 背景线条(竖着的)
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
            type: 'category',
            data: ['管道', '容器', '其他'],
            // 背景线条(横着的)
            splitLine: {
                show: false, // 是否显示
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                // 改变y轴颜色
                lineStyle: {
                    color: '#415264',
                    width: 2,
                    type: 'solid',
                },
            },
            axisLabel: {
                // 改变y轴字体颜色和大小
                color: '#59697A',
                fontSize: 12,
            },
        },
        // 所有数据
        series: [
            {
                type: 'bar',
                name: '低风险',
                // 柱体样式
                itemStyle: {
                    // 单个柱体文字显示样式
                    label: {
                        show: false, // 是否显示
                        position: 'right', // 显示的位置
                        color: 'rgb(242, 186, 2)',
                        fontSize: 12,
                    },
                    // 柱体设置渐变颜色,单色直接写色值即可
                    color: 'rgba(87, 146, 140, 1)',
                },
                data: [13, 15, 16, 12, 13, 15, 18], // 数据
            },
            {
                type: 'bar',
                name: '中风险',
                // 柱体样式
                itemStyle: {
                    // 单个柱体文字显示样式
                    label: {
                        show: false, // 是否显示
                        position: 'right', // 显示的位置
                        color: 'rgb(237, 130, 47)',
                        fontSize: 12,
                    },
                    // 柱体设置渐变颜色,单色直接写色值即可
                    color: 'rgba(180, 162, 79, 1)',
                },
                data: [10, 8, 9, 10, 12, 13, 12], // 数据
            },
            {
                type: 'bar',
                name: '中高风险',
                // 柱体样式
                itemStyle: {
                    // 单个柱体文字显示样式
                    label: {
                        show: false, // 是否显示
                        position: 'right', // 显示的位置
                        color: 'rgb(237, 130, 47)',
                        fontSize: 12,
                    },
                    // 柱体设置渐变颜色,单色直接写色值即可
                    color: 'rgba(187, 120, 72, 1)',
                },
                data: [8, 12, 8, 9, 8, 16, 12], // 数据
            },
            {
                type: 'bar',
                name: '高风险',
                // 柱体样式
                itemStyle: {
                    // 单个柱体文字显示样式
                    label: {
                        show: false, // 是否显示
                        position: 'right', // 显示的位置
                        color: 'rgb(237, 130, 47)',
                        fontSize: 12,
                    },
                    // 柱体设置渐变颜色,单色直接写色值即可
                    color: 'rgba(165, 72, 72, 1)',
                },
                data: [5, 0, 4, 2, 6, 4, 3], // 数据
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

onMounted(async () => {
    initCharts();
});
</script>

<style lang="scss" scoped>
.Container {
    background: linear-gradient(rgba(12, 24, 45, 0), rgba(16, 41, 64, 1));
}
</style>