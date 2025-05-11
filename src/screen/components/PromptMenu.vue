<template>
    <div class="container">
        <div class="header"></div>
        <div class="w-full h-full flex">
            <img class="w-[20%] h-full ml-6 mr-6" :src="prop.url" />
            <div>
                <div class="text-[18px] text-white">
                    {{ prop.title }}
                </div>
                <div class="text-[18px] text-white text-center">
                    <CountUp :endVal="prop.data" :duration="3" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import CountUp from '@/components/CountUp/index.vue'
const prop = defineProps({
    url: {
        type: String,
        default: '/src/assets/bigScreen/svg/service-enterprises.svg'
    },
    title: {
        type: String,
        default: '标题'
    },
    data: {
        type: String,
        default: '0'
    }
})
</script>

<style lang="scss" scoped>
.container {
    width: 250px;
    height: 60%;
    margin-left: 22px;
    display: flex;
    flex-direction: row;
}

.header {
    width: 3px;
    height: 100%;
    background: linear-gradient(rgb(255, 255, 219), rgb(115, 140, 186), rgb(255, 255, 219));
}
</style>