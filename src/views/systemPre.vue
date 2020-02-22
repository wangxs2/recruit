<template>
    <div class="system-pre">
        <div class="img-quesheng">
            
            <img src="../assets/image/quesheng-img.png" >
            <span>系统维护中，请稍后访问~</span>
        </div>
        <div class="btn" @click="fresh">刷新</div>


    </div>
</template> 

<script>
// @ is an alias to /src
export default {
  name: "systemPre",
  data() {
    return {
    };
  },
  created() {
  },
mounted () {

},
  methods:{
      fresh(){
          window.location.reload()
      }
  }
};
</script>
<style lang="scss" scoped>
.system-pre{
    width:100%;
    height:100%;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .img-quesheng{
        display:flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        img{
            width:231px;
            height:167px;
        }
        span{
            font-size:15px;
            font-family:PingFang SC;
            font-weight:400;
            color:rgba(2,111,253,1);
            margin-top: 30px;
        }
    }
    .btn{
        width:290px;
        height:44px;
        line-height:44px;
        text-align: center;
        background:rgba(2,111,253,1);
        border-radius:22px;
        font-size:17px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(255,255,255,1);
        margin-top: 108px;

    }

}
</style>
