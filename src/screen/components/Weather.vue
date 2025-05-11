<template>
    <div class="container">
        <!-- <div class="header"></div> -->
        <div class="w-full h-full flex justify-center items-center">
            <img class="w-[10%] h-full ml-6 mr-2" :src="prop.url" />
            <div class="flex">
                <div class="text-[16px] text-white">
                    {{ prop.title }}
                </div>
                <div class="text-[16px] text-white text-center">
                    {{ data }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';

const data = ref('')
const prop = defineProps({
    url: {
        type: String,
        default: '/src/assets/bigScreen/svg/service-enterprises.svg'
    },
    title: {
        type: String,
        default: '标题'
    }
})
onMounted(() => {
    axios.get('https://devapi.qweather.com/v7/weather/now?key=4a9a4ca2cc6648c8a8fa86c67991920c&location=101210101', {}).then((res: any) => {
        data.value = res.data.now.text
    })
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