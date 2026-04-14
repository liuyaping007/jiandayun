<template>
    <div :style="cssstr">
        <p>
            {{ filed }}
        </p>
    </div>
</template>
<script>
export default {
    name: 'fromlable',
    props: ['filed', 'titlecolor'],
    data() {
        return {
            filedvalue: this.filed,
            cssstr: `color:${this.titlecolor}`,
        }
    },
    watch: {
        titlecolor(val) {
            this.cssstr = `color:${val}`
        },
    },
}
</script>
