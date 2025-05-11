<template>
    <div class="w-full h-full">
        <el-table ref="myTable" :data="tableList" class="mt-2" height="100%" :header-cell-style="headerCellStyle"
            :cell-style="cellStyle" @mouseover.native="clearScroll" @mouseleave.native="createScroll">
            <el-table-column fixed prop="factory" label="企业名称" align="center" />
            <el-table-column prop="place" label="企业所在区域" align="center" />
            <el-table-column prop="deviceCode" label="出售设备编号" align="center" />
            <el-table-column prop="money" label="单笔销售金额" align="center" />
            <el-table-column prop="money_sum" label="当前区域月销售总额" align="center" />
            <el-table-column prop="time" label="成交时间" width="180" align="center" />
        </el-table>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ElTable } from 'element-plus'

let timer = <any>null
let myTable = ref<InstanceType<typeof ElTable> | null>(null)

interface tableData {
    factory: string;
    place: string;
    deviceCode: string;
    money: string;
    money_sum: string;
    time: string;
}

const tableList = ref<tableData[]>([]);

const getTableList = () => {
    tableList.value = [
        {
            factory: "华东机械制造有限公司",
            place: "杭州市",
            deviceCode: "SB-2023-001",
            money: "¥128,500",
            money_sum: "¥2,450,000",
            time: "2023-05-15 09:23:45"
        },
        {
            factory: "北方电子科技",
            place: "杭州市",
            deviceCode: "SB-2023-042",
            money: "¥95,200",
            money_sum: "¥1,780,000",
            time: "2023-05-15 10:12:33"
        },
        {
            factory: "华南精密仪器",
            place: "台州市",
            deviceCode: "SB-2023-017",
            money: "¥210,000",
            money_sum: "¥3,120,500",
            time: "2023-05-14 14:45:21"
        },
        {
            factory: "西部重工集团",
            place: "温州市",
            deviceCode: "SB-2023-056",
            money: "¥185,000",
            money_sum: "¥1,950,000",
            time: "2023-05-14 16:30:18"
        },
        {
            factory: "东海船舶设备",
            place: "杭州市",
            deviceCode: "SB-2023-029",
            money: "¥320,000",
            money_sum: "¥4,250,000",
            time: "2023-05-13 11:05:42"
        },
        {
            factory: "中原化工机械",
            place: "温州市",
            deviceCode: "SB-2023-038",
            money: "¥145,800",
            money_sum: "¥2,100,000",
            time: "2023-05-13 13:22:10"
        },
        {
            factory: "长江自动化设备",
            place: "宁波市",
            deviceCode: "SB-2023-012",
            money: "¥276,500",
            money_sum: "¥3,850,000",
            time: "2023-05-12 09:45:30"
        },
        {
            factory: "西南矿业机械",
            place: "宁波市",
            deviceCode: "SB-2023-065",
            money: "¥198,000",
            money_sum: "¥2,300,000",
            time: "2023-05-12 15:18:55"
        },
        {
            factory: "东北重型装备",
            place: "台州市",
            deviceCode: "SB-2023-021",
            money: "¥312,000",
            money_sum: "¥3,750,000",
            time: "2023-05-11 10:30:15"
        },
        {
            factory: "珠江电子设备",
            place: "杭州市",
            deviceCode: "SB-2023-048",
            money: "¥165,000",
            money_sum: "¥2,980,000",
            time: "2023-05-11 14:42:33"
        },
        {
            factory: "西北新能源科技",
            place: "温州市",
            deviceCode: "SB-2023-033",
            money: "¥225,000",
            money_sum: "¥3,150,000",
            time: "2023-05-10 08:15:22"
        },
        {
            factory: "东南精密制造",
            place: "宁波市",
            deviceCode: "SB-2023-059",
            money: "¥185,000",
            money_sum: "¥2,450,000",
            time: "2023-05-10 16:50:40"
        }
    ]
}

const headerCellStyle = {
    color: 'rgba(162, 178, 189, 1)',
    backgroundColor: 'rgba(28, 52, 81, 1)',
    fontSize: '12px',
    border: 'none',
};

const cellStyle = {
    color: 'rgba(255, 255, 255, 1)',
    backgroundColor: 'rgba(14, 32, 54, 1)',
    border: 'none',
    fontSize: '12px'
};

const clearScroll = () => {
    clearInterval(timer)
    timer = null
}

const createScroll = () => {
    clearScroll()
    if (myTable.value) {
        // 拿到 table
        const table = myTable.value.layout.table.refs
        // 拿到可以滚动的元素
        const tableWrapper = table.bodyWrapper.firstElementChild?.firstElementChild

        timer = setInterval(() => {
            if (tableWrapper) {
                tableWrapper.scrollTop += 1
                // 判断是否滚动到底部，如果到底部了置为0（可视高度+距离顶部=整个高度）
                if (tableWrapper.clientHeight + tableWrapper.scrollTop == tableWrapper.scrollHeight) {
                    tableWrapper.scrollTop = 0
                }
            }
        }, 100)
    }
}

onMounted(() => {
    createScroll()
    getTableList()
})

onUnmounted(() => {
    clearScroll()
})
</script>

<style>

</style>