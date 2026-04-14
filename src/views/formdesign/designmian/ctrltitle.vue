<template>
    <div class="ctrltitle" :class="istitle === false ? 'ishidetitle' : ''">
        <div class="ctrl-title">{{ title }}</div>
        <div class="ctrl-content">
            <slot></slot>
        </div>
    </div>
</template>
<script>
export default {
    props: ['title', 'istitle'],
}
</script>
<style scoped>
.ishidetitle .ctrl-title {
    display: none;
}
.ishidetitle .ctrl-content {
    float: left;
    width: 100% !important;
    line-height: 32px;
    margin-left: 0px;
}
.ctrltitle {
    display: flex;
}
.ctrltitle .ctrl-title {
    width: 80px;
    float: left;
    line-height: 42px;
    padding-left: 5px;
}
.ctrltitle .ctrl-content {
    float: left;
    width: calc(100% - 100px);
    line-height: 32px;
}
</style>
