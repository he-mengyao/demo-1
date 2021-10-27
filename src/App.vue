<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="less">
/*每个页面公共css */
page {
  --mainColor: #eb4450;
}
.price {
  color: var(--mainColor);
  &::before {
    content: "¥";
    font-size: 80%;
    margin-right: 5rpx;
  }
}
.divder {
  height: 20rpx;
  background-color: #f9f9f9;
}
</style>
