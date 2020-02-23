<template>
  <!-- 职位录入 -->
  <div class="jobEntry">
    <van-nav-bar
      title="职位发布"
      style="height:44px;font-size:18px;color:#333333"
      @click-left="onClickLeft"
    >
      <van-icon name="arrow-left" color="#333333" size="22px" slot="left" />
    </van-nav-bar>
    <div class="detail">
      <van-form label-align="right" validate-first scroll-to-error @submit="onSubmit" @failed="onFailed">
        <van-field
        readonly
        clickable
        name="picker"
        :value="value"
        label="职位类别"
        right-icon="arrow"
        placeholder="点击选择职位类别"
         :rules="[{ required: true, message: '点击选择职位类别' }]"
        @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
        <van-picker
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            @cancel="showPicker = false"
        />
        </van-popup>
        <van-field
          v-model="password"
          name="职位名称"
          label="职位名称"
          placeholder="职位名称"
          :rules="[{ required: true, message: '请填写职位名称' }]">
        </van-field>
        <van-field
          v-model="password"
          name="月 薪"
          label="月 薪"
          placeholder="月 薪"
          :rules="[{ required: true, message: '请填写月薪' }]"
        />

        <van-field
        readonly
        clickable
        name="picker"
        :value="value"
        label="福利待遇"
        right-icon="arrow"
        placeholder="点击选择福利待遇"
         :rules="[{ required: true, message: '点击选择福利待遇' }]"
        @click="showPicker1 = true"
        />
        <van-popup v-model="showPicker1" position="bottom">
         <div class="fuli-box">
            <div class="popu-header">
                <div></div>
                <div>福利待遇</div>
                <div style="color:#FFA525;" @click="quren">完成</div>
            </div>
            <div class="cont-fuli">
                <div class="fuli-itam" v-for="(item,index) in fuliList" :key="index" :viewType="item" @click="chooseOrder($event)">{{item}}</div>
            </div>
            
         </div>
        </van-popup>
        <van-field
          v-model="password"
          name="招聘人数"
          label="招聘人数"
          placeholder="招聘人数"
          :rules="[{ required: true, message: '请填写招聘人数' }]"
        />

        <van-field
          v-model="password"
          name="职位描述"
          label="职位描述"
          type="textarea"
          placeholder="例如工作内容、职位要求等"
          :rules="[{ required: true, message: '请填写职位描述' }]"
        />

        <van-field name="radio" label="工作时间">
             <template #input>
                <van-radio-group v-model="radio" direction="horizontal">
                <van-radio name="8h/26天">8h/26天</van-radio>
                <van-radio name="8h/28天">8h/28天</van-radio>
                </van-radio-group>
            </template>

        </van-field>
        <van-field name="radio1" label="工作班制">
             <template #input>
                <van-radio-group v-model="radio1" direction="horizontal">
                <van-radio name="三班倒">三班倒</van-radio>
                <van-radio name="长白班">长白班</van-radio>
                </van-radio-group>
            </template>

        </van-field>

         <van-field
          v-model="password"
          name="年龄要求"
          label="年龄要求"
          placeholder="年龄要求"
          :rules="[{ required: true, message: '请填写年龄要求' }]"
        />
         <van-field
            readonly
            clickable
            name="picker"
            :value="value"
            label="学历要求"
            right-icon="arrow"
            placeholder="点击选择学历要求"
            :rules="[{ required: true, message: '点击选择学历要求' }]"
            @click="showPicker6 = true"
            />
            <van-action-sheet v-model="showPicker6" :actions="actions" @select="onSelect" />

        <van-field
            readonly
            clickable
            name="picker"
            :value="value"
            label="工作年限"
            right-icon="arrow"
            placeholder="点击选择工作年限"
            :rules="[{ required: true, message: '点击选择工作年限' }]"
            @click="showPicker2 = true"
            />
            <van-popup v-model="showPicker2" position="bottom">
            <van-picker
                show-toolbar
                :columns="columns"
                @confirm="onConfirm"
                @cancel="showPicker2 = false"
            />
            </van-popup>
          <van-field
          v-model="password"
          name="工作地点"
          label="工作地点"
          placeholder="工作地点"
          :rules="[{ required: true, message: '请填写工作地点' }]"
        />
          <van-field
          v-model="password"
          name="联 系 人"
          label="联 系 人"
          placeholder="联 系 人"
          :rules="[{ required: true, message: '请填写联 系 人' }]"
        />
          <van-field
          v-model="password"
          name="联系电话"
          label="联系电话"
          placeholder="联系电话"
          :rules="[{ required: true, message: '请填写联系电话' }]"
        />
       
        <div style="margin-top:30px">
          <van-grid :column-num="3">
            <van-grid-item  text="上一个" />
            <van-grid-item  text="" @click="subquwd('next')">
                <van-button style="width:100%;height:100%;border:none;color:#FFA525;font-size:16px;" type="default">下一个</van-button>
            </van-grid-item>
            <van-grid-item  text="" @click="subquwd('sub')">
                <van-button style="width:100%;height:100%;border:none;color:#ffffff;font-size:16px;background:#FFA525;" type="default">确定</van-button>
            </van-grid-item>
        </van-grid>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "about",
  components: {},
  data() {
    return {
    titleSub:"",
      username: true,
      password: "",
      radio:'8h/26天',
      radio1:'三班倒',
      value: '',
      value1:[],
      columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
      showPicker: false,
      showPicker1: false,
      showPicker2: false,
      showPicker5: false,
      showPicker6: false,
      fuliList:["五险一金","包吃","包住","周末双休","年底双薪","旅游"],
       actions: [
        { name: '初中及以上' },
        { name: '高中及以上' },
        { name: '大专及以上' },
        { name: '本科及以上' },
        { name: '不限' }
      ]
    };
    
  },
  created() {},
  mounted() {},
  methods: {
    onClickLeft() {
      this.$router.push("/");
    },
    onSubmit(values) {
        
      if(this.titleSub=='next'){
          console.log("submit", "下一个");
      }else{
          console.log("submit", "确定");
          this.$router.push('/jobList')
      }
    },
    onFailed(errorInfo) {
      
      if(this.titleSub=='next'){
          console.log("onFailed", "下一个");
      }else{
          console.log("onFailed", "确定");
      }
      if(errorInfo){
          this.$notify({ type: 'warning', message: '请完善信息' });
      }
    },
     onConfirm(value) {
      this.value = value;
      this.showPicker = false;
    },
     onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.showPicker6 = false;
    },
    subquwd(val){
        console.log(val)
        this.titleSub=val
    },
    //多选
    chooseOrder (e) {
      if (e.target.className.indexOf("detail-selected") == -1) {
        e.target.className = "fuli-itam detail-selected"; //切换按钮样式
        //写逻辑
        this.value1.push(e.target.getAttribute("viewType"));
      } else {
        e.target.className = "fuli-itam"; //切换按钮样式
        let index = this.value1.indexOf(e.target.getAttribute("viewType"));
        if (index > -1) {
          this.value1.splice(index, 1);
        }
      }
    },
    quren(){
        this.showPicker1 = false
        this.value=this.value1.join(",")
    },
  }
};
</script>
<style lang="scss">
.jobEntry{
    .van-cell{
        border-bottom:1px solid #eee;
    }
    .van-cell:not(:last-child)::after{
        border:0;
    }
}
.jobEntry .van-field__label span{
    font-size:16px;
    color:#666666;
}
.jobEntry .van-grid-item__text{
    font-size:16px;
    color:#FFA525;
}
.jobEntry .van-grid-item__content{
    padding:12px 8px;
}
.jobEntry .van-grid-item:nth-child(3) .van-grid-item__content--center{
    background:#FFA525;
    padding:0;
    .van-grid-item__text{color:#ffffff;}
}
.jobEntry .van-grid-item:nth-child(2) .van-grid-item__content--center{
    padding:0;
}
</style>
<style lang="scss" scoped>
.jobEntry {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .detail {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    overflow-y: scroll;
    
  }
  .fuli-box{
    
    .popu-header{
        width:100%;
        height:44px;
        display: flex;
        justify-content:space-between;
        background:rgba(242,242,242,1);
        font-size:18px;
        align-items:center;
        box-sizing:border-box;
        padding:0 16px;
        color:#666666;
    }
    .cont-fuli{
        display: flex;
        flex-wrap: wrap;
        justify-content:center;
        font-size:16px;
        box-sizing:border-box;
        padding:16px;
        padding-right:0;
        color:rgba(51,51,51,1);
        .fuli-itam{
            box-sizing:border-box;
            padding:6px 16px;
            border:1px solid #E9E9E9;
            border-radius:6px;
            margin-bottom:14px;
            margin-right:14px;
        }
        .detail-selected{
            color:rgba(255,165,37,1);
            border:1px solid #FFA525;

        }
    }
  }
}
</style>
