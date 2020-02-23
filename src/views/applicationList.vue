<template>
<!-- 职位列表 -->
  <div class="applicationList">
    <van-nav-bar
      title="职位列表"
      style="height:44px;font-size:18px;color:#333333"
      @click-left="onClickLeft">
     <van-icon name="arrow-left" color="#333333" size="22px" slot="left" />
    </van-nav-bar>
    <div class="searchrow">
        <div class="sanjiao"><span style="margin-right:10px;font-size:15px">城市</span><div class="zj-topleft"></div></div>
        <div> 
            <van-search
            v-model="value"
            shape="round"
            background="#ffffff"
            placeholder="输入企业名称/岗位名称"
            />
        </div>
        <div class="dwnum"><van-icon name="filter-o" />筛选 <div class="num">1</div></div>
    </div>
    <div class="detail">
        <div v-for="(item,index) in zhwList" :key="index">
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
                <div class="five-list">
                    <van-icon color="#FFA525" name="phone" />
                    <div style="margin:0 4px">徐先生</div>
                    <div>13256487956</div>
                </div>
                <div class="four-list">
                    <img width="30" height="30" src="../assets/image/youyanse.png">
                    <div style="margin:0 4px">道合盛(上海)环保科技有限公司</div>
                    <div class="recompy">认证企业</div>
                </div>
            </div>
            
        </div>
     
    </div>
    
  </div>
</template>

<script>
 
export default {
  name: "about",
  components:{},
  data() {
    return {
        value:'',
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
.applicationList{
    .delete-button {
     height: 100%;
    }
}

</style>
<style lang="scss" scoped>
.applicationList {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background:#f5f4f7;
  position: relative;
  .searchrow{
    width:100%;
    height:49px;
    background:#ffffff;
    display: flex;
    font-size:13px;
    justify-content:space-between;
    align-items:center;
    box-sizing:border-box;
    padding: 0 14px;
    .dwnum{
        position: relative;
    }
    .num{
        position: absolute;
        top:-6px;
        right:-6px;
       width:14px;
        height:14px;
        background:rgba(255,62,47,1);
        border-radius:50%;
        text-align:center;
        line-height:15px;
        box-sizing:border-box;
        color:#ffffff;
        font-size:8px;
    }
    .sanjiao{
        display: flex;
        justify-content:flex-start;
        align-items:flex-end;
    }
    .zj-topleft{
        width: 0;
        height: 0;
        border-color: transparent #333333;
        border-width:6px 6px 0 0 ;
        border-style:solid;
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
        margin-bottom:8px;
        font-size:16px;
        box-sizing:border-box;
        padding:12px;
        .one-list{
           display: flex;
           justify-content:space-between;
           color:#333333;
           margin-bottom:6px;
        }
        .two-list{
            margin-bottom:6px;
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
        .five-list{
            display: flex;
           font-size:13px;
           margin-bottom:8px;
           justify-content:flex-start;
           align-items:center;
        }
    }
  }
}
</style>
