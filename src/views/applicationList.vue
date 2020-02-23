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
        <div class="sanjiao" @click="showPicker=true"><span style="margin-right:10px;font-size:15px">城市</span><div class="zj-topleft"></div></div>
        <div> 
            <van-search
            v-model="value"
            shape="round"
            background="#ffffff"
            placeholder="输入企业/岗位名称"
            />
        </div>
        <div class="dwnum"><van-icon name="filter-o" />筛选 <div class="num">1</div></div>
    </div>
    <div class="detail">
        <div v-for="(item,index) in zhwList" :key="index" @click="goDetail">
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
    <van-popup v-model="showPicker" position="bottom">
        <van-picker show-toolbar  :columns="columns" @cancel="showPicker=false" @confirm="onConfirm" @change="onChange" />
    </van-popup>
    <van-popup v-model="showDetail" position="bottom" :style="{ height: '100%' }">
        <van-nav-bar
        title="职位详情"
        style="height:44px;font-size:18px;color:#333333"
        @click-left="showDetail=false">
        <van-icon name="arrow-left" color="#333333" size="22px" slot="left" />
        </van-nav-bar>
        <div class="detail-wrapper">
            <div class="job-wrapper padding-top-bottom">
                <div class="title">普通操作工</div>
                <div class="job-content">经验不限 | 学历不限 | 18-45周岁 | 8h/26天 | 三班倒</div>
                <div class="address"><van-icon name="location-o" size="12"/>工作地点：贵州省凯里市炉碧开发区</div>
                <div class="money-people">
                    <span class="money">3000-5000/月</span>
                    <span class="people">招聘15人</span>
                </div>
            </div>
            <div class="fuli-wrapper padding-top-bottom">
                <div class="sub-title">福利待遇</div>
                <div class="fuli-list">
                    <span>哈哈哈</span>
                    <span>哈哈哈</span>
                </div>

            </div>
            <div class="job-desc-wrapper padding-top-bottom">
                <div class="sub-title">职位描述</div>
                <div class="job-desc-list">
                    <span>哈哈哈</span>
                    <span>哈哈哈</span>
                </div>
                <div class="show-job-detail" @click="showJobAll">展开</div>
            </div>
            <div class="link-people-tel padding-top-bottom">
                <img src="../assets/image/icon-com-1.png"/> 
                <div class="people-tel">
                    <div class="content">
                        <span>徐先生</span>
                        <span>13256487956</span>
                    </div>
                    <span class="compony-title">贵州其亚铝业有限公司</span>
                </div>
            </div>
            <div class="compony-info-wrapper padding-top-bottom">
                <div class="sub-title">企业信息</div>
                <div class="compony-title">
                   <span>贵州其亚铝业有限公司</span>
                   <span>认证企业</span>
                </div>
                <div class="compony-content">
                    <div class="content-left">
                        <span class="compony-type">合资</span>
                        <span class="compony-num">1000人以上</span>
                    </div>
                    <div class="content-right">
                        <span>在招职位 6个</span>
                        <van-icon name="arrow" />
                    </div>
                </div>
                <div class="people-tel">联系人：<span>徐先生</span><span>13256487956</span></div>
                <div class="address"><van-icon name="location-o" size="13" color="#666666"/>工作地点：贵州省凯里市炉碧开发区</div>

            </div>
            <div class="remark-wrapper padding-top-bottom">
                <div class="sub-title">备注</div>
                
                <div class="remark-content">企业建立于2018年8月15日，属内资私企，建筑面积为 20000m2 。目前在职员工已超过7000人。秉承“诚信、谦 虚、勤</div>

            </div>
            <div class="link-btn">立即联系</div>
        </div>

    </van-popup>
    
  </div>
</template>

<script>
import json from "@/libs/city_code.json"
export default {
  name: "about",
  components:{},
  data() {
    return {
    showDetail:false,
    columns:[
        {
            values: '',
            className: 'column1'
        },
        {
            values: '',
            className: 'column2',
            defaultIndex: 0
        },
      ],
    value:'',
    proCity:'',
    allCity:json, // 省市数据
    form:{
        province:'',
        city:''
    },
    showPicker:false,
    zhwList:[],
    query:{
        page:1,
        pageSize:15,
        salary:"",
        benefit:"",
        postId:"",
        entId:""
    },
    }
  },
  created() {
    this.getData()
  },
 mounted () {
     this.columns[0].values = Object.values(this.allCity).map(function(e){
        return {text:e.name}
    })
    // 默认展示二级的数据
    if (this.allCity[0].city){
        this.columns[1].values = Object.values(this.allCity[0].city).map(function(e){
            return {text:e.name}
        })
    }
 
  },
  methods:{ 
    getData(){
        this.$fetchGet("position/getFirstType", this.query).then(res => {})
    },
    goDetail(){
        this.showDetail=true
    },
    showJobAll(){

    },
    onConfirm(value){
        console.log(value)
        this.proCity=value[0].text+value[1].text
        this.showPicker=false
        this.form.province=value[0].text
        this.form.city=value[1].text
    },
    onChange(picker, values,index){
        picker.setColumnValues(1,this.cityDate(this.allCity,values[0].text))
        this.form.proCity=values
    }, 
    cityDate(data,province){
        var x=[]
        data.forEach(function(res){
            if (res.city){
                if(res.name == province){
                    for (let i = 0; i < res.city.length; i++) {
                        let obj = {}
                        obj.text = res.city[i].name
                        x.push(obj);
                    }
                }
            }
        })
        return x
    },
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
  .detail-wrapper{
      padding:0 14px;
      font-family:PingFang SC;
      font-weight:500;
      color:rgba(51,51,51,1);
      .padding-top-bottom{
          padding:20px 0;
          border-bottom:1px solid #DDDDDD;

      }
      .job-wrapper{
          .title{
            font-size:20px;
            font-weight:bold;
            color:rgba(51,51,51,1);
          }
          .job-content{
            font-size:13px;
            margin-top:15px;
          }
          .address{
                display:flex;
                justify-content:flex-start;
                align-items:center;
                font-size:13px;
                color:rgba(153,153,153,1);
                margin-top:10px;
          }
          .money-people{
              display:flex;
              justify-content:space-between;
              align-items:center;
              margin-top:15px;
              .money{
                font-size:17px;
                font-weight:bold;
                color:rgba(241,100,88,1);
              }
              .people{
                font-size:13px;
                color:rgba(51,51,51,1);
              }
          }
      }
      .sub-title{
        font-size:16px;
        font-weight:bold;
        color:rgba(51,51,51,1);
      }
      .fuli-wrapper{
          .fuli-list{
              display:flex;
              flex-wrap:wrap;
              justify-content:flex-start;
              align-items:center;
              span{
                font-size:12px;
                color:rgba(75,155,254,1);
                padding:4px 7px;
                margin:5px 15px 5px 0;
                background:#E9F1FF;

              }
          }
      }
      .job-desc-wrapper{
          .job-desc-list{
            display:flex;
            flex-direction:column;
            justify-content:flex-start;
            align-items:flex-start;
            font-size:13px;
            color:rgba(51,51,51,1);
            span{
                margin:5px 0 5px 0;
            }
          }
          .show-job-detail{
            text-align:right;
            font-size:13px;
            color:rgba(255,165,37,1);
          }
      }
      .link-people-tel{
          display:flex;
          justify-content:flex-start;
          align-items:center;
          img{
              width:30px;
              height:30px;
          }
          .people-tel{
              display:flex;
              flex-direction:column;
              justify-content:flex-start;
              align-items:flex-start;
              margin-left:10px;
              .content{
                display:flex;
                justify-content:flex-start;
                font-size:14px;
                color:rgba(51,51,51,1);
                  span{
                      &:last-child{
                          margin-left:10px;
                      }
                  }
              }
              .compony-title{
                    font-size:13px;
                    color:rgba(102,102,102,1);
                    margin-top:5px;
              }
          }
      }
      .compony-info-wrapper{
          .compony-title{
            display:flex;
            justify-content:space-between;
            align-items:center;
            font-size:15px;
            font-weight:bold;
            color:rgba(51,51,51,1);
            margin-top:10px;
            span{
                &:last-child{
                    padding:3px 5px;
                    border:1px solid rgba(245,186,86,1);
                    border-radius:3px;
                    font-size:10px;
                    color:rgba(245,186,86,1);
                }
            }
          }
          .compony-content{
              display:flex;
              justify-content:space-between;
              align-items:center;
              font-size:13px;
              color:rgba(102,102,102,1);
              margin-top:13px;
              .content-left{
                  .compony-type{
                    padding:3px 7px;
                    background:rgba(46,164,255,1);
                    opacity:0.6;
                    border-radius:4px;
                    font-size:12px;
                    color:rgba(255,255,255,1);
                    margin-right:10px;
                  }
                  .compony-num{}
              }
              .content-right{
                  span{
                      margin-right:10px;

                  }
              }
          }
          .people-tel{
            font-size:13px;
            color:rgba(102,102,102,1);
            margin-top:11px;
              span{
                  &:last-child{
                      margin-left:10px;
                  }
              }
          }
          .address{
            font-size:13px;
            color:rgba(102,102,102,1);
            margin-top:13px;
          }
      }
      .remark-wrapper{
          .remark-content{
            font-size:13px;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(102,102,102,1);
            line-height:22px;
            margin-top:10px;
          }
      }
      .link-btn{
            width:100%;
            height:49px;
            background:rgba(255,165,37,1);
            font-size:16px;
            text-align:center;
            color:rgba(255,255,255,1);
            line-height:49px;
            margin-top:24px;
      }
  }
}
</style>
