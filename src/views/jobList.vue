<template>
<!-- 职位列表 -->
  <div class="jobList">
    <van-nav-bar
      title="职位列表"
      style="height:44px;font-size:18px;color:#333333"
      @click-left="onClickLeft">
     <!-- <van-icon name="arrow-left" color="#333333" size="22px" slot="left" /> -->
    </van-nav-bar>
    <div class="detail">
        <van-swipe-cell v-for="(item,index) in $store.state.saSubdata" :key="index">
            <div class="iteam-box" @click="editmsg(item,index)">
                <div class="one-list">
                    <div>{{item.postName}}</div>
                    <div style="color:#F16458;">{{item.minSalary}}</div>
                </div>
                <div class="two-list">
                    <span>上海</span><span>{{item.workExperience}}</span><span>{{item.minEducation}}</span>
                </div>
                <div class="three-list">
                    <span v-for="(iteam,index) in item.fulime" :key="index">{{iteam}}</span>
                </div>
                <div class="four-list">
                    <img width="30" height="30" src="../assets/image/addre.png">
                    <div style="margin:0 4px">{{item.entAddress}}</div>
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
        <div class="btn" style="color:#FFA525" @click="goonlist">继续添加</div>
        <div class="btn" style="background:rgba(255,165,37,1);color:#ffffff" @click="isshow=true">提交</div>
    </div>
    <van-dialog v-model="isshow" title="" :showConfirmButton='false'>
        <div class="diosa">
            <div class="title"><van-icon size="20px" style="margin-right:10px" color="#e6542d" name="warning" />您确认要提交吗？</div>
            <div style="font-size:14px;color:#FFA525;text-align:center;margin-top:8px">再次发布职位，需要重新录入企业信息！</div>
            <div class="btn">
                <div class="btn-small" style="margin-right:30px;background:#FFA525;" @click="submit">确认提交</div>
                <div class="btn-small" style="background:#ffffff;color:#666666;border:1px solid #dddddd" @click="isshow=false">继续录入</div>
            </div>
        </div>
    </van-dialog>
  </div>
</template>

<script>
 
export default {
  name: "about",
  components:{},
  data() {
    return {
      isshow:false,
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
    console.log(this.$store.state.saSubdata)
  },
 mounted () {
 
  },
  methods:{ 
    onClickLeft(){
      this.$router.push("/")
    },
    submit() {
      this.$fetchPost("release/insertList", this.$store.state.saSubdata, "json").then(res=>{
        if(res.result==1){
          this.$router.push("/succes")
        }else{
          this.isshow=false
          this.$notify({ type: 'danger', message: res.message });
        }
      })
    },
    //编辑
    editmsg(row,index){
       this.$router.push({
          path: "/jobEntry",
          query: {
            istype: "edit",
            sizeForm:row,
            editindex:index
          }
        });
        
    },
    //继续添加
    goonlist(){
      this.$router.push({
          path: "/jobEntry",
          query: {
            istype: "add"
          }
        });
    }
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
  .diosa{
      padding:20px 10px;
      .title{
          font-size:16px;
          font-weight:bold;
          color:rgba(51,51,51,1);
          justify-content:center;
          display: flex;
          align-items:center;
      }
       .btn{
        display: flex;
        justify-content: center;
        color:#ffffff;
         font-size:16px;
         margin-top:39px;
        .btn-small{
          box-sizing: border-box;
          padding: 10px 20px;
          border-radius:24px;
          transition: transform 100ms ease-out
        }
        .btn-small:hover{
          transform: scale(1.02)
        }
      }
  }
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
    // display: flex;
    // flex-direction: column;
    overflow: hidden;
    overflow-y: scroll;
    margin-bottom:49px;
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
          display: flex;
          flex-wrap:wrap;
           justify-content:flex-start;
            span{
                font-size:12px;
                background:rgba(233,241,255,1);
                border-radius:3px;
                margin-right:6px;
                margin-top:6px;
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
