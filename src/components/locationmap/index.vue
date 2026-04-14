<template>
  <div class="map">
    <div style="display:none">
      <el-amap
        class="amap-box"
        vid="amapDemo"
        :zoom="zoom"
        :center="center"
        :plugin="plugin"
      >
        <!-- 标记点 -->
        <el-amap-marker :position="center" vid="marker"></el-amap-marker>
        <!-- 圆 -->
        <el-amap-circle
          vid="circle"
          :center="center"
          :radius="radius"
          fill-opacity="0.2"
          strokeColor="#38f"
          strokeOpacity="0.8"
          strokeWeight="1"
          fillColor="#38f"
        ></el-amap-circle>
      </el-amap>
      <iframe
        style="display:none"
        ref="buildpublish"
        class="result-wrapper"
        frameborder="0"
        name="buildpublish"
        src="/locationmap.html"
      />
    </div>
    <i
      class="el-icon-s-flag"
      style="color: red;    color: red;
    font-size: 18px;
    margin-right: 5px;"
    ></i
    >{{
      address === '' || address === undefined || address === null
        ? ipcityaddress
        : address
    }}
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'locationmap',
  props: ['cityaddress'],
  data() {
    const self = this
    return {
      address: this.cityaddress,
      zoom: 14,
      center: [121.5273285, 31.21515044], // 圆心位置
      radius: 200, // 圆半径，单位:米
      loaded: false,
      ipcityaddress: '',
      plugin: [
        {
          pName: 'Geolocation',
          showMarker: false,
          events: {
            init(o) {
              // 定位成功 自动将marker和circle移到定位点
              o.getCurrentPosition((status, result) => {
                self.address = result.formattedAddress
                if (result && result.position) {
                  self.center = [result.position.lng, result.position.lat]
                  self.loaded = true
                } else {
                  console.log('定位失败')
                }
              })
              console.log(o)
            }
          }
        }
      ]
    }
  },
  methods: {
    EditFrom(func) {
      console.log(func)
      this.currentfunname = func.data.funname
      if (func.data.funname === 'locationmapafter') {
        this.ipcityaddress =
          func.data.data.province +
          '/' +
          func.data.data.city +
          '/' +
          func.data.data.district
      }
    }
  },
  created() {
    if (this.address === '' || this.address === undefined) {
      this.address = '...正在获取定位'
    }
    window.addEventListener('message', this.EditFrom)
  },
  mounted() {
    console.log(window.sessionStorage.id) // 可以获取到经纬度
  }
}
</script>
