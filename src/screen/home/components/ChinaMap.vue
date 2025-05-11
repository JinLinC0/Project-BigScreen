<template>
	<div class="china-map" ref="chinaMap" @click="tooltipVisible = false"></div>
	<div class="tooltip" v-show="tooltipVisible" :style="tooltipStyle">
		<div class="tooltip-item" v-for="point in tooltipPoints" :key="point.name" @click="goEnterprise(point.name)">
			{{ point.name }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';
// import china from '@/assets/bigScreen/china.json';
import zhejiang from '@/assets/bigScreen/zhejiang.json';
// import ningbo from '@/assets/bigScreen/ningbo.json';
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus';

// 获取地图容器的引用
const chinaMap = ref<HTMLDivElement | null>(null);
let myChart: echarts.ECharts | null = null;
const router = useRouter()
const tooltipVisible = ref(false)
const tooltipStyle = ref({ top: '0px', left: '0px' })
const tooltipPoints = ref<{ name: string }[]>([]);
// 终点名称和经纬度
const geoCoordMap = [
	// 杭州市
	{ name: '分公司1', latlng: [120.13002083419951, 30.451371202764932], location: '杭州市', id: '1' },
	{ name: '分公司2', latlng: [120.33088314277734, 30.330594448531546], location: '杭州市' },
	{ name: '分公司3', latlng: [120.1721984624694, 30.310450439427846], location: '杭州市' },
	{ name: '分公司4', latlng: [119.1734183487406, 29.752859124617327], location: '杭州市' },
	{ name: '分公司5', latlng: [119.18249558430148, 30.03205224818185], location: '杭州市' },
	{ name: '分公司6', latlng: [119.62121209950806, 30.205645795147305], location: '杭州市' },
	{ name: '分公司7', latlng: [119.94324867756723, 30.08860456295977], location: '杭州市' },
	{ name: '分公司8', latlng: [119.99458784670446, 29.86492863552714], location: '杭州市' },
	// 宁波市
	{ name: '分公司9', latlng: [121.88140770412247, 29.472187413058656], location: '宁波市' },
	{ name: '分公司10', latlng: [121.31437016576808, 29.440871679564626], location: '宁波市' },
	{ name: '分公司11', latlng: [121.98561918451128, 29.774495738742186], location: '宁波市' },
	{ name: '分公司12', latlng: [121.4516418704593, 29.874383274593292], location: '宁波市' },
	{ name: '分公司13', latlng: [121.88473352006667, 29.87181766529938], location: '宁波市' },
	{ name: '分公司14', latlng: [121.91768703524986, 29.857528947250604], location: '宁波市' },
	{ name: '分公司15', latlng: [121.13692105526775, 30.00204208210528], location: '宁波市' },
	
	// 台州市
	{ name: '分公司16', latlng: [121.39119003048643, 28.317166835488976], location: '台州市' },
	{ name: '分公司17', latlng: [121.22317093979348, 28.1074171995453], location: '台州市' },
	{ name: '分公司18', latlng: [121.19983499512682, 28.788613607704235], location: '台州市' },
	{ name: '分公司19', latlng: [121.51720440028998, 29.03374480308158], location: '台州市' },
	{ name: '分公司20', latlng: [120.74711688995808, 28.780432596888662], location: '台州市' },
	
	// 温州市
	{ name: '分公司21', latlng: [120.69034875984391, 27.96829080928267], location: '温州市' },
	{ name: '分公司22', latlng: [120.93141147546226, 28.07173822582209], location: '温州市' },
	{ name: '分公司23', latlng: [120.653519695677, 28.127853762601635], location: '温州市' },
	{ name: '分公司24', latlng: [120.43924162966209, 27.603961154517886], location: '温州市' },
	{ name: '分公司25', latlng: [120.67360816690234, 27.73443065852157], location: '温州市' },
	{ name: '分公司26', latlng: [120.31871022711539, 27.787759613505862], location: '温州市' },
];
// 初始化地图
const initChinaMap = () => {
	if (!chinaMap.value) return;
	// 注册地图
	//@ts-ignore
	// echarts.registerMap('china', china);   // 浙江区域地图
	echarts.registerMap('zhejiang', zhejiang);   // 浙江区域地图
	// echarts.registerMap('ningbo', ningbo);    // 宁波区域地图
	// 初始化 echarts 实例
	myChart = echarts.init(chinaMap.value);
	// 起点名称和经纬度
	const fromName = '杭州总公司';
	const fromLatlng = [119.85812523223831, 30.16275626579482];

	// 飞线数据
	const specificFactories = ['分公司4', '分公司13', '分公司16', '分公司24'];
	const linesData = geoCoordMap
		.filter(row => specificFactories.includes(row.name))
		.map(row => {
			return {
				coords: [
					fromLatlng,
					row.latlng
				],
				fromName: fromName,
				toName: row.name,
				lineStyle: {
					color: '#FFE747',
					curveness: 0.3
				}
			};
		});
	// 终点标点数据
	const effectData = geoCoordMap.map(row => {
		return {
			value: row.latlng,
			name: row.name,
			lineStyle: {
				color: '#FFE747'
			}
		};
	});
	// echart 配置项
	const options: echarts.EChartsOption = {
		tooltip: {
			show: true,
			triggerOn: "mousemove", // mousemove、click
			padding: [4, 8],
			borderWidth: 1,
			borderColor: '#409eff',
			backgroundColor: 'rgba(255,255,255,0.7)',
			textStyle: {
				color: '#000000',
				fontSize: 13
			},
			formatter: (e: any) => {
				return e.name;
			}
		},
		geo: [
			// 第一层
			{
				map: "zhejiang",
				z: 3,
				zoom: 1.25,
				aspectScale: 0.85,
				roam: false,
				top: '10%',
				layoutSize: "100%", // 保持地图宽高比
				regions: [
					{ // 隐藏南海诸岛,因为顶层已经添加过了
						name: '南海诸岛',
						itemStyle: {
							borderWidth: 0.5,
							shadowBlur: 0,
							borderColor: '#61aacb',
							areaColor: '#104584'
						}
					}
				],
				itemStyle: {
					borderColor: '#c8feff',
					borderWidth: 0.5,
					shadowBlur: 3,
					shadowColor: '#66edff',
					areaColor: '#0862db'
				},
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						borderWidth: 1,
						areaColor: '#2da9ff',
					},
					label: {
						show: false,
						color: '#ffffff',
					}
				},
				select: {
					itemStyle: {
						shadowBlur: 10,
						borderWidth: 1,
						areaColor: '#2da9ff',
					},
					label: {
						color: '#ffffff',
					}
				}
			},
		],
		series: [
			// 飞线
			{
				type: 'lines',
				zlevel: 1,
				z: 1,
				effect: {
					show: true,
					period: 5, // 箭头指向速度，值越小速度越快
					trailLength: 0, // 特效尾迹长度[0,1]值越大，尾迹越长重
					symbol: 'arrow', // ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
					symbolSize: 5, // 图标大小
				},
				lineStyle: {
					color: '#FFE747',
					type: 'dashed',
					width: 1.5, // 尾迹线条宽度
					opacity: 1, // 尾迹线条透明度
					curveness: 0.3 // 尾迹线条曲直度
				},
				data: linesData,
				markPoint: {
					symbol: 'circle', // ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
					symbolSize: 8, // 图标大小
				}
			},
			// 起点
			{
				type: 'effectScatter',
				coordinateSystem: 'geo',
				zlevel: 6,
				rippleEffect: {
					// 涟漪特效
					period: 4, // 动画时间，值越小速度越快
					brushType: 'stroke', // 波纹绘制方式 stroke, fill
					scale: 4 // 波纹圆环最大限制，值越大波纹越大
				},
				label: {
					show: false,
					position: 'right', // 显示位置
					offset: [5, 0], // 偏移设置
					formatter: '{b}', // 圆环显示文字
					color: 'red'
				},
				symbol: 'circle',
				symbolSize: function () {
					return 10; // 圆环大小
				},
				itemStyle: {
					color: '#ff8400',
				},
				data: [{ value: fromLatlng, name: fromName }]
			},
			// 终点
			{
				type: 'effectScatter',
				coordinateSystem: 'geo',
				zlevel: 6,
				rippleEffect: {
					// 涟漪特效
					period: 4, // 动画时间，值越小速度越快
					brushType: 'stroke', // 波纹绘制方式 stroke, fill
					scale: 4 // 波纹圆环最大限制，值越大波纹越大
				},
				label: {
					show: false,
					position: 'right', // 显示位置
					offset: [5, 0], // 偏移设置
					formatter: '{b}', // 圆环显示文字
					color: 'red'
				},
				symbol: 'circle',
				symbolSize: function () {
					return 4; // 圆环大小
				},
				itemStyle: {
					color: '#befaff',
				},
				data: effectData
			}
		]
	};

	// 设置配置项
	myChart.setOption(options);

	// 监听地图点击事件
	myChart.on('click', (params: any) => {
		const location = params.name;
		const pointsInLocation = geoCoordMap.filter(point => point.location === location);

		if (pointsInLocation.length > 0) {
			setTimeout(() => {
				tooltipVisible.value = true;
				tooltipStyle.value = {
					top: `${params.event.offsetY + 60}px`,
					left: `${params.event.offsetX + 20}px`
				};
				tooltipPoints.value = pointsInLocation;
			}, 10)
		} else {
			tooltipVisible.value = false;
		}
	});
};


const goEnterprise = (name: string) => {
	for (let i = 0; i < geoCoordMap.length; i++) {
		if (name === geoCoordMap[i].name) {
			if (geoCoordMap[i].id !== undefined) {
				router.push({ path: '/pid', query: { id: geoCoordMap[i].id } });
			} else {
				ElMessage.error('当前子企业没有大屏展示图')
			}
		}
	}
}
// 处理全局点击事件
const handleGlobalClick = (event: MouseEvent) => {
	if (chinaMap.value && !chinaMap.value.contains(event.target as Node)) {
		tooltipVisible.value = false;
	}
};
// 在组件挂载后初始化地图
onMounted(() => {
	initChinaMap();
	document.addEventListener('click', handleGlobalClick)
});

window.addEventListener("resize", function () {
	if (myChart) {
		myChart.resize();
	}
});
onBeforeUnmount(() => {
	document.removeEventListener('click', handleGlobalClick);
});
</script>

<style scoped>
.china-map {
	width: 100%;
	height: 100%;
}

.tooltip {
	position: absolute;
	background: rgba(0, 0, 0, 0.7);
	color: white;
	padding: 10px;
	border-radius: 5px;
	z-index: 1000;
	max-width: 250px;
	word-wrap: break-word;

	.tooltip-item {
		margin: 2px;

		&:hover {
			cursor: pointer;
			color: rgb(80, 144, 240);
		}
	}
}
</style>