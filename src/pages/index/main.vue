<template>
   <view>
     <button @click="getHandleSign">GET请求</button>
     <button @click="postHandleSign">POST请求</button>
     1234
   </view>
</template>

<script>
export default {
   data() {
      return {
      
      }
   },
   onLoad() {
     
   },
   methods: {
      async getInfo() {},
      // get 网关签名
      getHandleSign() {
        const dat = {
          id: 732138543570509044,
        }
        this.$http
          .get('/crisps-app-wap-bff-api/service/nk/planner/v1/detail.do', {
            params: dat,
          })
          .then((res) => {
            console.log(res)
          })
      },
      // post 网关签名
      postHandleSign() {
        const dat = {
          locationCodeList: ['ad100020'],
        }
        this.$http
          .post(
            '/crisps-app-wap-bff-api/service/nk/public/v1/find_advertising.do',
            dat
          )
          .then((res) => {
            console.log(res)
          })
      },
   }
}
</script>
<style>
.title {
   text-align: center;
   font-weight: bold;
}

.uni-input {
   border: 1px solid #000;
   margin: 5px;
   background-color: rgba(102, 102, 102, 0.5);
}
</style>
