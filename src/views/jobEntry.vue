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
        name="posttypeName"
        :value="addForm.posttypeName"
        label="职位类别"
        is-link
        placeholder="点击选择职位类别"
         :rules="[{ required: true, message: '点击选择职位类别' }]"
        @click="showPicker = true"
        />
        <van-popup v-model="showPicker" position="bottom">
        <van-picker
            show-toolbar
            :columns="columns"
            @confirm="onConfirm"
            @change="onChange"
            @cancel="showPicker = false"
        />
        </van-popup>

        <van-field
        readonly
        clickable
        name="postName"
        :value="addForm.postName"
        label="职位名称"
        is-link
        placeholder="选择职位名称"
         :rules="[{ required: true, message: '请选择职位名称' }]"
        @click="showPicker1 = true"
        />
        <van-popup v-model="showPicker1" position="bottom">
        <van-picker
            show-toolbar
            :columns="columns1"
            @confirm="onConfirm1"
            @cancel="showPicker1 = false"
        />
        </van-popup>
        
        <van-field
          readonly
        clickable
          v-model="addForm.minSalary"
          name="minSalary"
          label="月 薪"
          is-link
          placeholder="月 薪"
          @click="showPicker2 = true"
          :rules="[{ required: true, message: '请填写月薪' }]"
        />
        <van-action-sheet v-model="showPicker2" :actions="actions" @select="onSelect" />

        <van-field
        readonly
        clickable
        type="textarea"
        name="socialBenefit"
        :value="addForm.socialBenefit"
        label="福利待遇"
        is-link
        placeholder="选择福利待遇"
         :rules="[{ required: true, message: '请选择福利待遇' }]"
        @click="showPicker3 = true"
        />
        <van-popup v-model="showPicker3" position="bottom">
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
          v-model="addForm.recruitNum"
          name="招聘人数"
          label="招聘人数"
          placeholder="招聘人数"
          :rules="[{ required: true, message: '请填写招聘人数' }]"
        />

        <van-field
          v-model="addForm.postDscrpt"
          name="职位描述"
          label="职位描述"
          type="textarea"
          placeholder="例如工作内容、职位要求等"
          :rules="[{ required: true, message: '请填写职位描述' }]"
        />

        <van-field name="addForm.workHour" label="工作时间">
             <template #input>
                <van-radio-group v-model="addForm.workHour" direction="horizontal">
                <van-radio name="8h/26天">8h/26天</van-radio>
                <van-radio name="8h/28天">8h/28天</van-radio>
                </van-radio-group>
            </template>

        </van-field>
        <van-field name="addForm.workShift" label="工作班制">
             <template #input>
                <van-radio-group v-model="addForm.workShift" direction="horizontal">
                <van-radio name="三班倒">三班倒</van-radio>
                <van-radio name="长白班">长白班</van-radio>
                </van-radio-group>
            </template>

        </van-field>

         <van-field
          readonly
          clickable
          v-model="addForm.ageRange"
          name="ageRange"
          right-icon="arrow"
          label="年龄要求"
          placeholder="年龄要求"
          @click="showPicker7 = true"
          :rules="[{ required: true, message: '请填写年龄要求' }]"
        />
        <van-action-sheet v-model="showPicker7" :actions="actions3" @select="onSelect3" />
         <van-field
            readonly
            clickable
            name="minEducationName"
            :value="addForm.minEducationName"
            label="学历要求"
            right-icon="arrow"
            placeholder="点击选择学历要求"
            :rules="[{ required: true, message: '点击选择学历要求' }]"
            @click="showPicker6 = true"
            />
            <van-action-sheet v-model="showPicker6" :actions="actions1" @select="onSelect1" />

        <van-field
            readonly
            clickable
            name="workExperience"
            :value="addForm.workExperience"
            label="工作年限"
            right-icon="arrow"
            placeholder="选择工作年限"
            :rules="[{ required: true, message: '点击选择工作年限' }]"
            @click="showPicker5 = true"
            />
            <van-action-sheet v-model="showPicker5" :actions="actions2" @select="onSelect2" />
          <van-field
          v-model="addForm.entAddress"
          name="工作地点"
          label="工作地点"
          placeholder="工作地点"
          :rules="[{ required: true, message: '请填写工作地点' }]"
        />
          <van-field
          v-model="addForm.contactPpl"
          name="联 系 人"
          label="联 系 人"
          placeholder="联系人"
          :rules="[{ required: true, message: '请填写联系人' }]"
        />
          <van-field
          v-model="addForm.contactTel"
          name="联系电话"
          label="联系电话"
          placeholder="联系电话"
          :rules="[{ required: true, message: '请填写联系电话' }]"
        />
       
        <div style="margin-top:30px">
          <van-grid :column-num="submitArr.length>0&&this.idIndex>0?3:numsa">
            <van-grid-item v-if="submitArr.length>0&&this.idIndex>0&&(istype!=='add'||istype!=='edit')" @click="upSubmit" text="上一个" />
            <van-grid-item v-if="istype!=='add'&&istype!=='edit'" text="" @click="subquwd('next')">
                <van-button style="border:none;color:#FFA525;font-size:16px;">下一个</van-button>
            </van-grid-item>
            <van-grid-item  text="" @click="subquwd('sub')">
                <van-button style="border:none;color:#ffffff;font-size:16px;background:#FFA525;">完成</van-button>
            </van-grid-item>
        </van-grid>
        </div>
      </van-form>
    </div>
    <van-dialog v-model="isshow" title="" :showConfirmButton='false'>
        <div class="diosa">
            <div class="title"><van-icon size="20px" style="margin-right:10px" color="#e6542d" name="warning" />您确认离开职位发布吗？</div>
            <div style="font-size:14px;color:#FF2727;text-align:center;margin-top:8px">如果确认离开，需要重新录入企业信息！</div>
            <div class="btn">
                <div class="btn-small" style="margin-right:30px;background:#FF2727;" @click="$router.push('/')">确认离开</div>
                <div class="btn-small" style="background:#FFA525;" @click="isshow=false">继续录入</div>
            </div>
        </div>
    </van-dialog>
  </div>
</template>

<script>
const onedata=[]
const twodata=["采购", "进出口贸易", "其他采购/贸易职位"]
export default {
  name: "about",
  components: {},
  data() {
    return {

        columns: [
            { text: '浙江', children: [{ text: '杭州', children: [{ text: '西湖区' }, { text: '余杭区' }] }, 
            { text: '温州', children: [{ text: '鹿城区' }, { text: '瓯海区' }] }] },
            { text: '福建', children: [{ text: '福州', children: [{ text: '鼓楼区' }, { text: '台江区' }] }, { text: '厦门', children: [{ text: '思明区' }, { text: '海沧区' }] }] }],
    addForm:{
        posttypeid:'',//  职位类别id
        posttypeName:'',//  职位类别名称
        postName:'',//  职位名称
        entId:3,// 企业id 
        postId:'',// 职位id 
        recruitNum:'',//招聘人数(单位:人)
        salary:'',//月薪
        ageRange:'',//年龄要求 
        minEducation:'',//最低文化程度要求
        minEducationName:'',//最低文化程度要求
        otherRequire:'',//其他条件
        postDscrpt:'',//职位描述
        minSalary:'',//最低工资待遇(单位:元) 
        maxSalary:'',//最低工资待遇(单位:元)
        isNegotiable:'',//面议(单位:元)  
        workHour:'8h/26天',//工作时间
        workShift:'三班倒',//工作班制
        socialBenefit:'',// 福利待遇
        fulime:[],// 福利待遇
        workExperience:'',//工作年限(默认0不限) 
        entAddress:'',//公司地址
        contactPpl:'',//联系人(多个用;分隔)  
        contactTel:'',//联系电话(多个用;分隔) 
        remark:'',//备注
        isPub:'',//是否发布(0否;1是)  
        inputTime:'',// 录入时间 
        updateTime:'',// 更新时间                                                                                                 
    },
    numsa:2,
    submitArr:[],
    idIndex:0,//上一步标志
    titleSub:"",
    isshow:false,
      username: true,
      password: "",
      radio:'8h/26天',
      radio1:'三班倒',
      value: '',
      value1:[],
      columns: [
       { values: ["采购/贸易", "产品", "传媒", "房地产/建筑", "服务业", "高级管理", "供应链/物流", "管培生/储备干部", "技术", "教育培训", "金融", "旅游", "其他", "人事/财务/行政", "设计", "生产制造", "市场", "销售", "医疗健康", "运营", "咨询/翻译/法律"] },
       { values: twodata }
      ],//职位类别
      showPicker: false,//职位类别
      columns1: [{text:"采购",postId:567},{text:"采购工程师",postId:572},{text:"采购经理",postId:569},{text:"采购主管",postId:573},{text:"采购助理",postId:574},{text:"采购专员","postId":570},{text:"采购总监",postId:568},{text:"买手",postId:571}],//职位名称
      showPicker1: false,//职位名称
      actions: [
        { name: '1000以下',id:1 },
        { name: '1000-2000',id:2 },
        { name: '3000-5000' ,id:3},
        { name: '5000-8000',id:4 },
        { name: '8000-12000' ,id:5},
        { name: '12000-20000',id:6 },
        { name: '20000以上',id:7 },
        { name: '面议' ,id:0}
      ],//月薪
      showPicker2: false,//月薪
      showPicker3: false,//福利待遇
       actions2: [
        { name: '一年以下',id:1 },
        { name: '1-3年',id:2 },
        { name: '3-5年',id:3 },
        { name: '5年以上',id:4 },
        { name: '不限',id:0 }
      ],//工作年限
      showPicker5: false,//工作年限
      showPicker6: false,//学历要求
      fuliList:["五险一金","包吃","包住","加班补助","周末双休","年底双薪","员工旅游","带薪年假","年终分红","绩效奖","免费班车","节日福利","弹性工作","定期体检"],
    actions1: [
        { name: '初中及以上',id:'middle' },
        { name: '高中及以上',id:'high' },
        { name: '大专及以上',id:'junior' },
        { name: '本科及以上',id:'college' },
        { name: '不限',id:'unlimited' }
      ],
      actions3: [
        { name: '18-25岁',id:1 },
        { name: '25-35岁',id:2 },
        { name: '35-60岁',id:3 },
        { name: '不限',id:0 }
      ],//年龄要求
      showPicker7: false,//年龄要求
      compayObj:{},
      istype:"",
      editindex:"",
    };
    
  },
  created() {
    this.istype=this.$route.query.istype
    if(this.istype=="add"){
      this.numsa=1
      this.submitArr=this.$store.state.saSubdata
    }else if(this.istype=="edit"){
      this.numsa=1
      this.addForm=this.$route.query.sizeForm
      this.editindex=this.$route.query.editindex
    }else{
      this.compayObj=this.$store.state.companymsg
      if(this.compayObj){
        // this.addForm.entId=this.compayObj.entId
        this.addForm.entAddress=this.compayObj.entAddress
        this.addForm.contactPpl=this.compayObj.contactName
        this.addForm.contactTel=this.compayObj.tel
      }
    }
  },
  mounted() {
    
   
  },
  methods: {
    getAllmenu(){
        this.$fetchGet("position/getFirstType", {
            firstType:''
        }).then(res => {
            this.onedata=res.data
            console.log(this.onedata)
            this.$fetchGet("position/getSecondType", {
                firstType:res.data[0],
                secondType:'',
            }).then(data => {
                this.twodata=data.data
            })
        })
    },
    onChange(picker, values,index) {
        console.log(values)
        console.log(picker)
        console.log(index)
        this.$fetchGet("position/getSecondType", {
            firstType:values[0],
            secondType:'',
        }).then(data => {
            this.twodata=data.data
            this.columns1=[]
             this.$fetchGet("position/getJobs", {
                    firstType:values[0],
                    secondType:index==0?this.twodata[0]:values[1],
                    position:'',
              }).then(res => {
                    // this.twodata=data.data
                    if(res.data){
                       res.data.forEach(iteam=>{
                          iteam.text=iteam.postName
                          this.columns1.push(iteam)
                      })
                    }
                   
              })
            picker.setColumnValues(1, data.data);
            
        })
        
    },
    onClickLeft() {
        this.isshow=true
    //   this.$router.push("/");
    },
    //上一步
    upSubmit(){
    this.idIndex--;
      this.addForm = this.cloneObj(this.submitArr[this.idIndex]);
    },
    //清空表单
    emptyForm(){
        this.addForm={
        posttypeid:'',//  职位类别id
        posttypeName:'',//  职位类别名称
        postName:'',//  职位名称
        entId:'',// 企业id 
        postId:'',// 职位id 
        recruitNum:'',//招聘人数(单位:人)
        ageRange:'',//年龄要求
        minEducationName:'',//最低文化程度要求
        minEducation:'',//最低文化程度要求
        otherRequire:'',//其他条件
        postDscrpt:'',//职位描述
        salary:'',//月薪
        minSalary:'',//最低工资待遇(单位:元) 
        maxSalary:'',//最低工资待遇(单位:元)
        isNegotiable:'',//面议(单位:元)  
        workHour:'8h/26天',//工作时间
        workShift:'三班倒',//工作班制
        socialBenefit:'',// 福利待遇
        workExperience:'',//工作年限(默认0不限) 
        contactPpl:this.compayObj.contactName,//联系人(多个用;分隔)  
        contactTel:this.compayObj.tel,//联系电话(多个用;分隔)
        entAddress:this.compayObj.entAddress,//公司地址
        remark:'',//备注
        isPub:'',//是否发布(0否;1是)  
        inputTime:'',// 录入时间 
        updateTime:'',// 更新时间                                                                                                 
      }
    //   this.value1=[]
    },
    onSubmit(values) {
        
      if(this.titleSub=='next'){
        console.log("submit", "下一个");
        // console.log(this.addForm)
        // this.idIndex++;
        // this.submitArr.push(this.cloneObj(this.addForm));
        // console.log(this.submitArr)
        // this.emptyForm()
        if (this.submitArr.length > this.idIndex + 1) {
            this.idIndex++;
            this.submitArr[this.idIndex - 1] = this.addForm;
            this.addForm = this.cloneObj(this.submitArr[this.idIndex]);
          } else if (this.submitArr.length == this.idIndex + 1) {
            this.idIndex++;
            this.submitArr[this.idIndex - 1] = this.cloneObj(this.addForm)
            this.emptyForm();
          } else {
            this.idIndex++;
            this.submitArr.push(this.cloneObj(this.addForm));
            this.emptyForm();
          }
          console.log(this.submitArr)
      }else{
          console.log("submit", "确定");
          
          console.log(this.$store.state.saSubdata)
          if(this.istype=="edit"){
            this.$store.state.saSubdata[this.editindex]=this.addForm
          }else{
            this.submitArr.push(this.addForm);
            this.$store.state.saSubdata=this.submitArr
          }
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
    //职位类别
    onConfirm(value) {
    console.log(value)
      this.addForm.posttypeName = value[0]+"-"+value[1];
      this.showPicker = false;
    },
    //职位名称
    onConfirm1(value) {
     console.log(value)
      this.addForm.postName = value.text;
      this.addForm.postId = value.postId;
      this.showPicker1 = false;
    },
    //月薪
     onSelect(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      console.log(item)
      this.showPicker2 = false;
      if(item.id==0){
        this.addForm.minSalary=''
        this.addForm.maxSalary=''
      }else if(item.id==1){
        this.addForm.minSalary=0
        this.addForm.maxSalary=1000
      }else if(item.id==7){
        this.addForm.minSalary=20000
        this.addForm.maxSalary=''
      }else{
        let str=item.name.split("-")
        this.addForm.minSalary=str[0]
        this.addForm.maxSalary=str[1]
      }
      this.addForm.salary=item.id
    },
     onSelect1(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.showPicker6 = false;
      this.addForm.minEducationName=item.name
      this.addForm.minEducation=item.id
    },
     onSelect2(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.showPicker5 = false;
      this.addForm.workExperience=item.name
    },
    onSelect3(item) {
      // 默认情况下点击选项时不会自动收起
      // 可以通过 close-on-click-action 属性开启自动收起
      this.showPicker7 = false;
      this.addForm.ageRange=item.name
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
        this.showPicker3 = false
        console.log(this.value1)
        this.addForm.fulime=this.value1
        this.addForm.socialBenefit=this.value1.join(",")
        // this.value=this.value1.join(",")
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
.jobEntry .van-grid-item__content--center{
    padding:0;
}
.jobEntry .van-grid-item:last-child .van-grid-item__content--center{
    background:#FFA525;
    .van-grid-item__text{color:#ffffff;}
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
        justify-content:flex-start;
        font-size:16px;
        box-sizing:border-box;
        padding:16px;
        padding-right:0;
        color:rgba(51,51,51,1);
        .fuli-itam{
            box-sizing:border-box;
            padding:4px 10px;
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
