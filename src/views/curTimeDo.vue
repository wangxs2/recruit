<template>
    <div class="cur-time-do">
        <div class="cur-time-donate">
            <div class="time-donate">
                <van-tabs @click="timeDonateTab" v-model="activeName">
                    <van-tab title="实时播报"> 
                        <!-- <div class="top" id="top-content"><img src="../assets/image/curtimewrite.png" alt=""><span class="top-content-write">{{curTimeTopContent}}</span><van-icon name="cross" size="20" @click="closeCurTime"/></div> -->
                        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error.sync="error" error-text="请求失败，点击重新加载">
                            <div class="donate-list-wrapper">
                                <van-cell v-for="(item, i) in curTimeDataList" :key="i">
                                    <div class="donate-list">

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
                                                <!-- <span class="title" v-if="(item.isTop||item.isNew)&&item.headline&&item.headline.length<10">{{item.headline}}</span>
                                                <span class="title" v-else-if="(item.isTop||item.isNew)&&item.headline&&item.headline.length>10">{{item.headline.substring(0,11)}}...</span>
                                                <span class="title" v-else-if="!item.isTop&&!item.isNew&&item.headline&&item.headline.length<14">{{item.headline}}</span>
                                                <span class="title" v-else-if="!item.isTop&&!item.isNew&&item.headline&&item.headline.length>14">{{item.headline.substring(0,13)}}...</span> -->
                                                <span class="title">{{item.headline}}</span>
                                            </div>
                                            <div class="articl">{{item.mainBody}}</div>
                                            <div class="origin">信息来源：<span>{{item.publishSource}}</span></div>
                                            </a>
                                        </div>
                                    </div>
                                </van-cell>
                            </div>
                        </van-list>

                    </van-tab>
                    <van-tab title="资助信息">
                        <van-list v-model="loading1" :finished="finished1" finished-text="没有更多了" @load="onLoad1" :error.sync="error1" error-text="请求失败，点击重新加载">
                            <van-cell v-for="(item, i) in curTimeDataList" :key="i">
                                <div class="donate-list1">
                                    <div class="renwu-list-item">
                                        <div class="list-item-top">
                                            <div class="title">
                                                <span class="title-name">{{item.title}}</span>
                                            </div>
                                            <div class="desc">{{item.body}}</div>
                                        </div>
                                        <div class="list-item-bottom">
                                            <span class="time" v-if="item.updateTime">{{item.updateTime.substring(0,10)}}</span>
                                            <span class="btn" @click="showPdf(item.linksCur)" v-if="item.links"><img class="down-up" src="../assets/image/pdf.png" alt="">查看任务详单</span>
                                        </div>
                                        <div class="tab" style="background:rgba(255,69,69,1)" v-if="item.status==0">等待资助</div>
                                        <div class="tab" style="background:rgba(2,199,150,1)" v-else-if="item.status==1">资助完成</div>
                                    </div>
                                </div>
                            </van-cell>
                        </van-list>

                    </van-tab>
                    <van-tab title="求购详情">
                        <van-list v-model="loading2" :finished="finished2" finished-text="没有更多了" @load="onLoad2" :error.sync="error2" error-text="请求失败，点击重新加载">
                            <van-cell v-for="(item, i) in curTimeDataList" :key="i">
                                <div class="donate-list1">
                                    <div class="renwu-list-item">
                                        <div class="list-item-top">
                                            <div class="title">
                                                <span class="title-name">{{item.title}}</span>
                                            </div>
                                            <div class="desc">{{item.body}}</div>
                                        </div>
                                        <div class="list-item-bottom">
                                            <span class="time" v-if="item.updateTime">{{item.updateTime.substring(0,10)}}</span>
                                            <span class="btn" @click="showPdf(item.linksCur)" v-if="item.links"><img class="down-up" src="../assets/image/pdf.png" alt="">查看任务详单</span>
                                        </div>
                                        <div class="tab1" style="color:#FF4545" v-if="item.status==0">未核实</div>
                                        <div class="tab1" style="color:#02C796" v-else-if="item.status==2">已完结</div>
                                        <div class="tab1" style="color:#216AFF" v-else-if="item.status==1">已核实</div>
                                    </div>
                                </div>
                            </van-cell>
                        </van-list>

                    </van-tab>
                    <van-tab title="供应详情">
                        <van-list v-model="loading3" :finished="finished3" finished-text="没有更多了" @load="onLoad3" :error.sync="error3" error-text="请求失败，点击重新加载">
                            <van-cell v-for="(item, i) in curTimeDataList" :key="i">
                                <div class="donate-list1">
                                    <div class="renwu-list-item">
                                        <div class="list-item-top">
                                            <div class="title">
                                                <span class="title-name">{{item.title}}</span>
                                            </div>
                                            <div class="desc">{{item.body}}</div>
                                        </div>
                                        <div class="list-item-bottom">
                                            <span class="time" v-if="item.updateTime">{{item.updateTime.substring(0,10)}}</span>
                                            <span class="btn" @click="showPdf(item.linksCur)" v-if="item.links"><img class="down-up" src="../assets/image/pdf.png" alt="">查看任务详单</span>
                                        </div>
                                        <div class="tab1" style="color:#FF4545" v-if="item.status==0">未核实</div>
                                        <div class="tab1" style="color:#02C796" v-else-if="item.status==2">已完结</div>
                                        <div class="tab1" style="color:#216AFF" v-else-if="item.status==1">已核实</div>
                                    </div>
                                </div>
                            </van-cell>
                        </van-list>

                    </van-tab>
                </van-tabs>
            </div>
            
            <van-popup v-model="showPdfWord" closeable position="bottom" :style="{ height: '100%' }" class="pdf-wrapper">
            <div class="pdf-content">
                <pdf :url="url"></pdf>

            </div>
            
            </van-popup>
      

        </div>
        <div class="go-back-home" @click="goBackHome">
            <van-icon name="arrow-left" color="#ffffff" size="26"/>
        </div>

    </div>
</template> 

<script>
import pdf from '@/components/pdf'
export default {
  name: "curTimeDo",
  components:{
    pdf
  },
  data() {
    return {
      curTimeDataList:[],
      curTimeParams:{
        page: 1, // 页数
        pageSize:10, // 偏移量
      },
      curTimeParams1:{
        page: 1, // 页数
        pageSize:10, // 偏移量
        tab:'fund'
      },
      curTimeParams2:{
        page: 1, // 页数
        pageSize:10, // 偏移量
        tab:'purchase'
      },
      curTimeParams3:{
        page: 1, // 页数
        pageSize:10, // 偏移量
        tab:'supply'
      },
      loadMore:true, //加载更多按钮
      showHome: true,
      
      flag: false, 
      noMore: false,
      isoneClosePoint:1,
      curTimeTopContent:"", // 实时资讯统计
      list:[],
      pageSize: 10, // 每页条数
      offset: 100, // 滚动条与底部距离小于 offset 时触发load事件
      timeDonateTabIndex:0,
      renwuTabList:[
        {
          type:1,
          name:"等待资助",
        },
        {
          type:2,
          name:"资助方已付",
        },
        {
          type:1,
          name:"等待资助",
        },
        {
          type:2,
          name:"资助方已付",
        },
      ],
      showPdfWord:false,
      url:'',
      activeName:0,
      loading: false,
      finished: false,
      error: false,
      loading1: false,
      finished1: false,
      error1: false,
      
      loading2: false,
      finished2: false,
      error2: false,
      loading3: false,
      finished3: false,
      error3: false,

    };
  },
  created() {
    this.getCurTimeContent()
  },
 mounted () {
     this.activeName=this.$route.query.curIndex
   
  },
  methods:{
    showPdf(curUrl){
        // curUrl="http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf"
        // console.log(curUrl.substr(28))
        // this.showPdfWord=true
        // this.url=curUrl
        window.open(curUrl)
    },
    onLoad(){
        this.getCurTimeDataList()
    },
    onLoad1(){
        this.getCurTimeDataList1()
    },
    onLoad2(){
        this.getCurTimeDataList2()
    },
    onLoad3(){
        this.getCurTimeDataList3()
    },
    timeDonateTab(name,title){
      this.curTimeDataList=[]
      this.curTimeParams.page=1
      this.curTimeParams1.page=1
      this.curTimeParams2.page=1
      this.curTimeParams3.page=1
      this.loading= true
      this.finished= false
      this.error= false
      this.loading1= true
      this.finished1= false
      this.error1= false
      
      this.loading2= true
      this.finished2= false
      this.error2= false
      this.loading3= true
      this.finished3= false
      this.error3= false
        if (name==0&&this.loading){
            this.onLoad()
        }else if (name==1&&this.loading1){
            this.onLoad1()
        }else if (name==2&&this.loading2){
            this.onLoad2()
        }else if (name==3&&this.loading3){
            this.onLoad3()
        }
    },
    // 获取实时资讯数据
    getCurTimeDataList(){
      this.$fetchGet("donate/getInfo",this.curTimeParams).then(res=> {
        if (res.total){
          this.curTimeParams.page++
          const rows =res.list
          // 处理数据
          if (rows&&rows.length>0){
            this.curTimeDataList = this.curTimeDataList.concat(rows)
            this.loading = false;
            this.finished = false;

          }else {
            this.loading = false;
            this.finished = true;

          }
          
        }

      }).catch(error => {
        this.error = true;
        this.loading = false;
      })
  

    },
    // 获取实时资讯数据
    getCurTimeDataList1(){
      this.$fetchGet("donate/getListByTab",this.curTimeParams1).then(res=> {
        if (res.total){
          this.curTimeParams1.page++
          const rows =res.list
          // 处理数据
          if (rows&&rows.length>0){
            rows.forEach(item => {
              if (item.links){
                item.links=item.links.split(";")
                if (item.links&&item.links.length){
                    item.linksCur=item.links[0]
                }
              }
            })
            this.curTimeDataList = this.curTimeDataList.concat(rows)
            this.loading1 = false;
            this.finished1 = false;

          }else {
            this.loading1 = false;
            this.finished1 = true;

          }
          
        }

      }).catch(error => {
        this.error1 = true;
        this.loading1 = false;
      })
  

    },
    // 获取实时资讯数据
    getCurTimeDataList2(){
      this.$fetchGet("donate/getListByTab",this.curTimeParams2).then(res=> {
        if (res.total){
          this.curTimeParams2.page++
          const rows =res.list
          // 处理数据
          if (rows&&rows.length>0){
            rows.forEach(item => {
              if (item.links){
                item.links=item.links.split(";")
                if (item.links&&item.links.length){
                    item.linksCur=item.links[0]
                }
              }
            })
            this.curTimeDataList = this.curTimeDataList.concat(rows)
            this.loading2 = false;
            this.finished2 = false;

          }else {
            this.loading2 = false;
            this.finished2 = true;

          }
          
        }

      }).catch(error => {
        this.error2 = true;
        this.loading2 = false;
      })
  

    },
    // 获取实时资讯数据
    getCurTimeDataList3(){
      this.$fetchGet("donate/getListByTab",this.curTimeParams3).then(res=> {
        if (res.total){
          this.curTimeParams3.page++
          const rows =res.list
          // 处理数据
          if (rows&&rows.length>0){
            rows.forEach(item => {
              if (item.links){
                item.links=item.links.split(";")
                if (item.links&&item.links.length){
                    item.linksCur=item.links[0]
                }
              }
            })
            this.curTimeDataList = this.curTimeDataList.concat(rows)
            this.loading3 = false;
            this.finished3 = false;

          }else {
            this.loading3 = false;
            this.finished3 = true;

          }
          
        } 

      }).catch(error => {
        this.error3 = true;
        this.loading3 = false;
      })
  

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
    goBackHome(){
        this.$router.push({path:'/'})
    }
  }
};
</script>
<style lang="scss">
// .cur-time-do{

    .bigbox{
    width: 100%;
    height:100%;
    }
    .cur-time-do .van-cell{
        padding:0;
        background: #f1f1f1;
    }
    .cur-time-do .van-cell:not(:last-child)::after{
        border:0;
    }
    .van-tabs__nav{
        position:fixed;
        top:0;
        left:0;
        right:0;
        height:44px;
        z-index:10;
    }
    .van-tab{
        color: #fff;
        font-size:15px;
        font-family:PingFang SC;
        font-weight:bold;
        color:rgba(255,255,255,1);
    }
    .van-tabs__nav{
        background:#216AFF;
    }
    .van-tabs__nav--line{
        padding-bottom:0;
    }
    .van-tabs__line{
        bottom:0;
        background:#fff;
    }
    .van-popup__close-icon--top-right{
    top: 9px!important;
    }
// }
</style>
<style lang="scss" scoped>
.cur-time-do {
  width: 100%;
  height: 100%;
  background: #f1f1f1;
  overflow:scroll;
  .cur-time-donate{
    background: #f1f1f1;

  }
  .go-back-home{
      position:absolute;
      top:5px;
      left:-4px;
      padding:0 10px 10px 0;
      z-index:10;

  }
  .time-donate{
    .top{
      display:flex;
      justify-content:space-between;
      align-items: center;
      width: 100%;
    //   background:linear-gradient(180deg,rgba(89,101,233,1) 0%,rgba(91,178,245,1) 100%);
        background:#FFFCE8;
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
        color:#333333;
        line-height:18px;
        // padding-left: 10px;
        // border-left:1px solid #F2F1F1;
      }

    }
    // .donate-content{
    //   padding-top: 15px;
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
      .donate-list-wrapper{
          padding-top:15px;
      }
      .donate-list{
        display: flex;
        justify-content: space-between;
        padding: 0 15px 0 15px;
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
      .donate-list1{

        padding:0 12px;
        .renwu-list-item{
            position:relative;
            margin-top: 20px;
            padding: 12px;
            text-align:left;
            background:rgba(255,255,255,1);
            border-radius:4px;
            .list-item-top{
                .title{
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    .title-name{
                        width:253px;
                        font-size:15px;
                        font-family:PingFang SC;
                        font-weight:bold;
                        color:rgba(51,51,51,1);
                    }
                    .title-type{
                        font-family:PingFang SC;
                        font-weight:500;
                        color:rgba(255,69,69,1);
                        line-height:24px;

                    }

                }
                .desc{
                    font-size:13px;
                    font-family:PingFang SC;
                    font-weight:500;
                    color:rgba(102,102,102,1);
                    line-height:18px;
                    padding:10px 0;
                }

            }

            .list-item-bottom{
                display: flex;
                justify-content:space-between;
                font-size:12px;
                font-family:PingFang SC;
                font-weight:500;
                color:rgba(153,153,153,1);
                .time{}
                .btn{
                    display:flex;
                    justify-content:flex-start;
                    align-items:center;
                    img{
                        width:16px;
                        height:16px;
                        margin-right:6px;
                    }
                }
            }
            .tab{
                position:absolute;
                top:0;
                right:12px;
                width:75px;
                height:26px;
                line-height: 26px;
                text-align:center;
                font-size:13px;
                font-family:PingFang SC;
                font-weight:bold;
                color:rgba(255,255,255,1);
                border-radius:0px 0px 4px 4px;

            }
            .tab1{
                position:absolute;
                top:12px;
                right:12px;
                font-size:14px;
                font-family:PingFang SC;
                font-weight:500;
            }
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
