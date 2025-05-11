<template>
    <div class="w-full h-full">
        <el-table ref="myTable" :data="tableList" class="mt-2" height="100%" :header-cell-style="headerCellStyle"
            :cell-style="cellStyle" @mouseover.native="clearScroll" @mouseleave.native="createScroll">
            <el-table-column fixed prop="factory" label="企业名称" align="center" />
            <el-table-column prop="deviceName" label="设备名" align="center" />
            <el-table-column prop="deviceCode" label="设备编号" align="center" />
            <el-table-column prop="deviceType" label="设备类型" align="center" />
            <el-table-column prop="riskLevel" label="风险等级" align="center" />
            <el-table-column prop="failure_probability_level" label="失效可能性等级" align="center" />
            <el-table-column prop="failure_consequence_level" label="失效后果等级" align="center" />
            <el-table-column prop="time" label="时间" width="180" align="center" />
        </el-table>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ElTable } from 'element-plus'
// import { getAlarmListWithRisk } from '@/api/bigScreen/alarm';
// import { useEnumStore } from '@/stores/enum';
// const enumStore = useEnumStore();

let timer = <any>null
let myTable = ref<InstanceType<typeof ElTable> | null>(null)

interface tableData {
    factory: string;
    deviceName: string;
    deviceCode: string;
    deviceType: string;
    riskLevel: string;
    failure_probability_level: string;
    failure_consequence_level: string;
    time: string
}

const tableList = ref<tableData[]>([]);

const getTableList = async () => {
    // 获取数据
    const res = await getAlarmListWithRisk({ category: 'alarm_category_4' })
    const resData = res.data
    resData.forEach((element: any) => {
        let data: any = {}
        data.factory = element.device.factory.name
        data.deviceName = element.device.name
        data.deviceCode = element.device.code
        data.deviceType = element.device.type
        data.riskLevel = enumStore.getEnumNameList(element.risk.level);
        data.failure_probability_level = enumStore.getEnumNameList(element.risk.failure_probability_result.level);
        data.failure_consequence_level = enumStore.getEnumNameList(element.risk.failure_consequence_result.level);
        data.time = element.create_datetime
        tableList.value.push(data)
    });
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