<template>
    <div class="cur-time">
        <div class="cur-time-donate">
      <div class="time-donate">
        <!-- <div class="top"><span>实时播报</span></div> -->
        <!-- <div class="top"><span>{{curTimeTopContent}}</span><van-icon name="cross" size="20" @click="closeCurTime"/></div> -->
        <div class="top" id="top-content"><img src="../assets/image/curtimewrite.png" alt=""><span class="top-content-write">{{curTimeTopContent||'撒旦解放了事件发生解放拉萨连锁咖啡店记录数据分类数据分类是基辅罗斯拉萨扩大解放了首府拉萨解放了手机发了多少顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶'}}</span><van-icon name="cross" size="20" @click="closeCurTime"/></div>
        <div class="donate-content" v-if="curTimeNoDataShow">



          <van-pull-refresh v-model="isDownLoading" @refresh="onDownRefresh">
            <van-list
              v-model="isUpLoading"
              :finished="upFinished"
              :immediate-check="false"
              :offset="10"
              finished-text="我是有底线的"
              @load="onLoadList">
              <div v-if="curTimeDataList.length > 0" class="allcontent">
                <div class="donate-list" v-for="(item, i) in curTimeDataList" :key="i">
                  <div class="time-wrapper">
                    <span class="time-length">{{item.duration}}</span>
                    <span class="time-cur" v-if="item.pubDate">{{item.pubDate.substring(5,16)}}</span>
                  </div>

                  <div class="line-split">
                    <span class="dot"></span>
                    <span class="line"></span>
                  </div>

                  <div class="main-content">
                    <a :href="item.url">

                      <div class="title-wrapper">
                        <span class="tab-type por" v-if="item.isTop&&item.isTop==1">置顶</span>
                        <span class="tab-type new" v-if="item.isNew&&item.isNew==1">最新</span>
                        <span class="title" v-if="(item.isTop||item.isNew)&&item.headline&&item.headline.length<10">{{item.headline}}</span>
                        <span class="title" v-else-if="(item.isTop||item.isNew)&&item.headline&&item.headline.length>10">{{item.headline.substring(0,11)}}...</span>
                        <span class="title" v-else-if="!item.isTop&&!item.isNew&&item.headline&&item.headline.length<14">{{item.headline}}</span>
                        <span class="title" v-else-if="!item.isTop&&!item.isNew&&item.headline&&item.headline.length>14">{{item.headline.substring(0,13)}}...</span>
                      </div>
                      <div class="articl">{{item.mainBody}}</div>
                      <div class="origin">信息来源：<span>{{item.publishSource}}</span></div>
                    </a>
                  </div>
                </div>
              </div>
            </van-list>
          </van-pull-refresh>
        </div>
        <div class="donate-content donate-content-no" v-else>
         <img class="down-up" src="../assets/image/reduce.png" alt="">
         <p>没有数据哦!</p>

        </div>
      </div>
      

        </div>

    </div>
</template> 

<script>
// @ is an alias to /src
export default {
  name: "curTime",
  data() {
    return {
      curTimeDataList:[],
      curTimeParams:{
        page: 1, // 页数
        pageSize:10, // 偏移量
      },
      curTimeNoDataShow: false, // 实时捐赠无数据显示
      loadMore:true, //加载更多按钮
      showHome: true,
      
      flag: false, 
      noMore: false,
      isoneClosePoint:1,
      curTimeTopContent:"", // 实时资讯统计
      hasMore: false,
      isLoading: false,
      list:[],
      nullTip: '空空如也~',
      pageSize: 10, // 每页条数
      pageIndex: 1, // 页码
      dtWinNumberInfos: [], // 请求数据
      isDownLoading: false, // 下拉刷新
      isUpLoading: false, // 上拉加载
      upFinished: false, // 上拉加载完毕
      offset: 100, // 滚动条与底部距离小于 offset 时触发load事件
      topHeight:0

    };
  },
  created() {
    this.getCurTimeDataList()
    this.getCurTimeContent()
		  window.addEventListener('scroll', this.scrollHandle, true)
  },
 mounted () {
   this.topHeight=document.getElementById("top-content").offsetHeight
   
  },
  methods:{
    // 获取实时资讯数据
    getCurTimeDataList(){
      this.$fetchGet("donate/getInfo",this.curTimeParams).then(res=> {
        if (res.total){
          this.curTimeNoDataShow= true
          const rows =res.list
          if (rows == null || rows.length === 0) {
            // 加载结束
            this.upFinished = true
            return
          }
          if (rows.length < this.curTimeParams.pageSize) {
            // 最后一页不足10条的情况
            this.upFinished = true
          }
          // 处理数据
          if (this.curTimeParams.page === 1) {
            this.curTimeDataList = rows
          } else {
            this.curTimeDataList = this.curTimeDataList.concat(rows)
          }
          
        } else {
          this.curTimeNoDataShow= false
        }

      }).catch(error => {
      }).finally(() => {
        this.isDownLoading = false
        this.isUpLoading = false
      })
  

    },
    onDownRefresh() {
      this.curTimeParams.page = 1
      this.upFinished = false // 不写这句会导致你上拉到底过后在下拉刷新将不能触发下拉加载事件
      this.getCurTimeDataList() // 加载数据
    },
    // 上拉加载请求方法
    onLoadList() {
      this.curTimeParams.page++
      this.getCurTimeDataList()
    },
    // 实时资讯按钮
    curTimeBtn(){
      this.curTimeDonate=true
      this.showHome=false
      
    },
    getCurTimeContent(){
      this.$fetchGet("donateCount/findDonateCount").then(res=> {
        if (res&&res.length){

          this.curTimeTopContent=res[0].content
        }
      })
    },
    closeCurTime(){
      this.$router.push({path:"/"})
      this.curTimeDonate=false
      this.showHome=true
      this.curTimeParams.page=1
      this.curTimeDataList=[]
      this.getCurTimeDataList()

    },
  }
};
</script>
<style>
.bigbox{
  width: 100%;
  height:100%;
}

.van-popup__close-icon--top-right{
  top: 9px!important;
}
</style>
<style lang="scss" scoped>
.cur-time {
  width: 100%;
  height: 100%;
  background: #f1f1f1;
  overflow:scroll;
  .cur-time-donate{
    background: #f1f1f1;

  }
  .time-donate{
    // .top{
    //   display: flex;
    //   justify-content: flex-start;
    //   align-items: center;
    //   height: 36px;
    //   font-size:16px;
    //   font-family:PingFang SC;
    //   font-weight:bold;
    //   color:rgba(51,51,51,1);
    //   padding: 0 12px;
    //   background: #fff;
    //   span{
    //     padding-left:10px;
    //     border-left: 3px solid #216AFF;
    //   }

    // }

    .top{
      display:flex;
      justify-content:space-between;
      align-items: center;
      width: 100%;
      background:linear-gradient(180deg,rgba(89,101,233,1) 0%,rgba(91,178,245,1) 100%);
      padding:15px 10px;
      box-sizing:border-box;
      img{
        width: 33px;
        height: 30px;
        margin-right: 10px;
      }
      .top-content-write{
        display: block;
        width: 285px;
        font-size:13px;
        text-align: left;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(255,255,255,1);
        line-height:18px;
        padding-left: 10px;
        border-left:1px solid #F2F1F1;
      }

    }
    .donate-content{
      padding-top: 15px;
      &.donate-content-no{
        
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 100px;

        img{
          width: 194px;
          height:147px;
        }
        p{
          font-size:15px;
          font-family:PingFang SC;
          font-weight:400;
          color:rgba(153,153,153,1);
          margin-top:23px;

        }
      }
      .donate-list{
        display: flex;
        justify-content: space-between;
        padding: 0 15px;
        .time-wrapper{
          display: flex;
          flex-direction: column;
          .time-length{
            text-align: right;
            font-size:15px;
            font-family:PingFang SC;
            font-weight:bold;
            color:rgba(51,51,51,1);
          }
          .time-cur{
            text-align: right;
            font-size:12px;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(102,102,102,1);
            margin-top: 8.5px;

          }
        }
        .line-split{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .dot{
            width:9px;
            height:9px;
            background:rgba(33,106,255,1);
            border-radius:50%;
          }
          .line{
            width: 2px;
            height: 100%;
            background:#E2E2E2;
          }
        }
        .main-content{
          width:232px;
          background:rgba(255,255,255,1);
          border-radius:4px;
          padding: 12px;
          margin-bottom: 15px;
          a{
            display:block;
            color:rgba(51,51,51,1);
            .title-wrapper{
              width:232px;
              line-height:20px;
              // height: 20px;
              text-align: left;
              // white-space:nowrap;
              // text-overflow:ellipsis;
              // overflow:hidden; 
              .tab-type{
                font-size:12px;
                font-family:PingFang SC;
                font-weight:bold;
                color:rgba(255,255,255,1);
                padding: 3px 4px;
                vertical-align:top;
                margin-right: 8px;
                &.por{
                  background: #9141FF;
                }
                &.new{
                  background: #ED563B;
                }
              }
              .title{
                width:175px;
                font-size:16px;
                font-family:PingFang SC;
                font-weight:bold;
                color:rgba(51,51,51,1);
                vertical-align:top;
                // line-height:15px;

              }
            }
            .articl{
              font-size:13px;
              font-family:PingFang SC;
              font-weight:500;
              color:rgba(102,102,102,1);
              line-height:15px;
              margin: 12px 0;
              text-align: left;

            }
            .origin{
              font-size:12px;
              font-family:PingFang SC;
              font-weight:500;
              color:rgba(153,153,153,1);
              text-align: right;
              span {

              }
            }
          }
        }

      }
      .loading-more{
        height: 30px;
        line-height: 30px;
        text-align: center;
        color: #999;
        font-size: 14px;
        background: #f1f1f1;
        margin-top: 20px;
      }

    }



  }
  .cur-time-btn{
    position: fixed;
    top: 190px;
    right: 17px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; 
    width: 44px;
    height: 44px;
    background:rgba(255,252,232,1);
    box-shadow:0px 0px 8px 0px rgba(0, 0, 0, 0.32);
    border-radius:50%;
    z-index:999;
    span{
      font-size: 14px;
      line-height: 15px;
      font-family:PingFang SC;
      font-weight:bold;
      font-style: italic;
      color: #FF4600;
      margin-right: 2px;
      &:last-child{
        color: #FF9100;
      }
      // background: linear-gradient(to bottom, #FF4600, #FF9100);
      // -webkit-background-clip: text;
      // color: transparent;

    }
  }
}
</style>
