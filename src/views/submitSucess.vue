<template>
<!-- 企业信息录入成功 -->
  <div class="submit-sucess">
    <van-nav-bar
      title="提交成功"
      style="height:44px;font-size:18px;color:#333333"
      @click-left="onClickLeft">
     <van-icon name="arrow-left" color="#333333" size="22px" slot="left" />
    </van-nav-bar>
    <div class="content-wrapper">
        <div class="content">
            <div class="img-wrapper">
                <img src="">
                <span>提交成功</span>
            </div>
            <div class="btn" @click="publistJob">发布职位</div>
        </div>
    </div>
  </div>
</template>

<script>
 
export default {
  name: "submitSucess",
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

      },
      publistJob(){
          this.$store.state.companymsg={
              name:'小花',
              date:'现在'
          }
          this.$router.push("/jobEntry")
      }
  }
};
</script>
<style lang="scss">
</style>
<style lang="scss" scoped>
.submit-sucess{
    .content-wrapper{
        display:flex;
        justify-content:center;
        align-items:center;
        .content{
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            .img-wrapper{
                display:flex;
                flex-direction:column;
                justify-content:center;
                align-items:center;
                margin-top:90px;
                img{
                    width:82px;
                    height:82px;
                }
                span{
                    margin-top:25px;
                }
            }
            .btn{
                width:327px;
                height:44px;
                background:rgba(255,165,37,1);
                border-radius:5px;
                margin-top:133px;
                font-size:16px;
                font-family:PingFang SC;
                font-weight:500;
                color:rgba(255,255,255,1);
                line-height:44px;
                text-align:center;

            }
        }
    }

}
</style>
