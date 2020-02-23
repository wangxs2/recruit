<template>
<!-- 职位列表 -->
  <div class="jobList">
    <van-nav-bar
      title="职位列表"
      style="height:44px;font-size:18px;color:#333333"
      @click-left="onClickLeft">
     <van-icon name="arrow-left" color="#333333" size="22px" slot="left" />
    </van-nav-bar>
    <div class="detail">
        <van-swipe-cell v-for="(item,index) in zhwList" :key="index">
            <div class="iteam-box">
                <div class="one-list">
                    <div>{{item.name}}</div>
                    <div style="color:#F16458;">3000-5000</div>
                </div>
                <div class="two-list">
                    <span>上海</span><span>1-3年</span><span>大专</span>
                </div>
                <div class="three-list">
                    <span>五险一金</span><span>交通补助</span><span>餐补</span>
                </div>
                <div class="four-list">
                    <img width="30" height="30" src="../assets/image/addre.png">
                    <div style="margin:0 4px">道合盛(上海)环保科技有限公司</div>
                    <div class="recompy">认证企业</div>
                </div>
            </div>
            <van-button
                slot="right"
                square
                icon="delete"
                text="删除"
                type="danger"
                class="delete-button"
            />
        </van-swipe-cell>
     
    </div>
    <div class="btn-bottom">
        <div class="btn" style="color:#FFA525">继续添加</div>
        <div class="btn" style="background:rgba(255,165,37,1);color:#ffffff">提交</div>
    </div>
  </div>
</template>

<script>
 
export default {
  name: "about",
  components:{},
  data() {
    return {
      zhwList:[
          {
              name:"普工"
          },
          {
              name:"车间"
          }
      ]
    }
  },
  created() {
    
  },
 mounted () {
 
  },
  methods:{ 
    onClickLeft(){
      this.$router.push("/")
    },
     onSubmit(values) {
      console.log('submit', values);
    },
  }
};
</script>
<style lang="scss">
.jobList{
    .delete-button {
     height: 100%;
    }
}

</style>
<style lang="scss" scoped>
.jobList {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background:#f5f4f7;
  position: relative;
  .btn-bottom{
    width: 100%;
    height:49px;
    line-height:49px;
    text-align:center;
    position: absolute;
    left: 0px;
    bottom: 0px;
    display: flex;
    font-size:16px;
    justify-content:space-between;
    background:rgba(255,255,255,1);
    box-shadow:0px -1px 0px 0px rgba(238,238,238,1);
    .btn{
        flex:1;
    }
    .btn:hover{
        font-size:18px;
          transform: scale(1.02)
        }
  }
  .detail {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    overflow-y: scroll;
    .iteam-box{
        background:#ffffff;
        margin-bottom:10px;
        font-size:16px;
        box-sizing:border-box;
        padding:12px;
        .one-list{
           display: flex;
           justify-content:space-between;
           color:#333333;
           margin-bottom:10px;
        }
        .two-list{
            margin-bottom:10px;
            span{
                font-size:14px;
                color:#666666;
                margin-right:10px;
            }
        }
        .three-list{
            margin-bottom:10px;
            span{
                font-size:12px;
                background:rgba(233,241,255,1);
                border-radius:3px;
                margin-right:10px;
                color:#4B9BFE;
                padding:3px 6px;
            }
        }
        .four-list{
           display: flex;
           font-size:13px;
           justify-content:flex-start;
           align-items:center;
           .recompy{
               border:1px solid rgba(245,186,86,1);
               color:#F5BA56;
               padding:0 4px;
               font-size:10px;
               box-sizing:border-box;
               border-radius:3px;
           }
        }
    }
  }
}
</style>
