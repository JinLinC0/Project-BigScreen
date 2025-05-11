<template>
    <div class="title-container">
        <!-- <div class="header"></div> -->
        <div class="title">
            <div>{{ prop.title }}</div>    
        </div>
    </div>
</template>

<script setup lang="ts">
const prop = defineProps({
    title: {
        type: String,
        default: ''
    }
})
</script>

<style lang="scss" scoped>
.title-container {
    width: 250px;
    height: 30px;
    display: flex;
    flex-direction: row;
}
.header {
    width: 10px;
    height: 100%;
    background: linear-gradient(rgb(255, 255, 219), rgb(115, 140, 186), rgb(255, 255, 219));
}

.title {
    height: 100%;
    width: 100%;
    // background: linear-gradient(90deg, rgb(115, 140, 186), rgb(53, 79, 130));
    background-image: url('/src/assets/bigScreen/cut/bg_content_title.png');;
    background-size: cover; /* 使图片占满整个元素 */
    background-position: center; /* 图片居中 */
    background-repeat: no-repeat; /* 防止图片重复 */
    display: flex;
    align-items: center;
    // margin-left: 5px;

    div {
        color: #fff;
        font-size: 18px;
        margin-left: 10px;
        text-align: center;
        transform: skewX(-7deg); /* 设置文本向左倾斜 7 度 */
    }
}
</style>