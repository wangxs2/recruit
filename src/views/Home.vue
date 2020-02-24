<template>
  <div class="home">
    <van-nav-bar
      title="招聘直通车"
      style="height:44px;font-size:18px;color:#333333"
      @click-left="onClickLeft"
    />
    <div class="detail">
      <div class="content"></div>
      <div class="content-bottom">
        <div class="feihua">
          <div style="color:#222222;font-size:23px">企业复工复产人才供需平台</div>
          <div  style="color:#666666;font-size:14px;margin-top:6px">助力复工复产 服务民营经济</div>
        </div>
        <div class="btn">
          <div class="btn-small" style="margin-right:30px" @click="$router.push('/businessRegist')">我要招聘</div>
          <div class="btn-small" @click="$router.push('/applicationList')">我要求职</div>
        </div>
      </div>
    </div>
    <div class="tel" style="color:rgba(255,165,37,1)">咨询热线：010-62350535</div>
  </div>
</template>

<script>
 
export default {
  name: "home",
  components:{},
  data() {
    return {
    
    }
  },
  created() {
    
  },
 mounted () {
 
  },
  methods:{ 
    onClickLeft(){

    }
  }
};
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
.home{
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .detail{
   flex: 1;
    display: flex;
    flex-direction: column;
    background: url("../assets/image/image_0@2x.png") no-repeat;
    background-size: 100% 100%;
    margin-top: 30px;
    .content{
      flex: 1;
      // background: greenyellow;
    }
    .content-bottom{
      width: 100%;
      height: 260px;
      box-sizing: border-box;
      padding-bottom: 60px;
      font-size: 16px;
      color: #ffffff;
      .feihua{
        box-sizing: border-box;
        padding: 40px 0px;
        text-align: center;
      }
      .btn{
        display: flex;
        justify-content: center;
        .btn-small{
          box-sizing: border-box;
          padding: 14px 31px;
          background:rgba(255,165,37,1);
          border-radius:8px;
          transition: transform 100ms ease-out
        }
        .btn-small:hover{
          transform: scale(1.02)
        }
      }
      
    }
  }
  .tel{
    position:absolute;
    bottom:0;
    left:0;
    right:0;
    height:44px;
    line-height:44px;
    text-align:center;
    font-size:14px;
  }
}
</style>
