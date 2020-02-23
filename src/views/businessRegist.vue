<template>
<!-- 企业信息录入 -->
  <div class="business-regist">
    <van-nav-bar
      title="企业基础信息登记"
      style="height:44px;font-size:18px;color:#333333"
      @click-left="onClickLeft">
     <van-icon name="arrow-left" color="#333333" size="22px" slot="left" />
    </van-nav-bar>
    <div class="form-wrapper">
      <van-form @submit="onSubmit" @failed="onFailed">
        <div class="input-wrapper">
            <span class="label-title">所在省市</span>
            <van-field
            v-model="proCity"
            name="proCity"
            readonly
            placeholder="所在省市"
            :rules="[{ required: true, message: '请选择所在省市' }]"
             @click="showPicker = true"
            />
            <van-icon name="arrow" size="16"/>
            
            <van-popup v-model="showPicker" position="bottom">
                <van-picker show-toolbar  :columns="columns" @cancel="onCancel" @confirm="onConfirm" @change="onChange" />
            </van-popup>
        </div>
        <div class="input-wrapper">
            <span class="label-title">企业名称</span>
            <van-field
            v-model="form.entFullname"
            name="entFullname"
            placeholder="企业名称"
            :rules="[{ required: true, message: '请填写企业名称' }]"
            />
        </div>
        <div class="input-wrapper">
            <span class="label-title">企业地址</span>
            <van-field
            v-model="form.entAddress"
            name="entAddress"
            placeholder="企业地址"
            :rules="[{ required: true, message: '请填写企业地址' }]"
            />
            <!-- <van-icon name="location-o" size="18" color="#FFA525" @click="positionAddress"/> -->
        </div>
        <div class="input-wrapper">
            <span class="label-title">企业类型</span>
            <van-field
            v-model="form.entType"
            name="entType"
            readonly
            placeholder="企业类型"
            :rules="[{ required: true, message: '请选择企业类型' }]"
             @click="showPicker1 = true"
            />
            <van-icon name="arrow" size="16"/>
            
            <van-popup v-model="showPicker1" position="bottom">
                <van-picker show-toolbar title="企业类型" confirm-button-text="完成"  :columns="columns1" @cancel="onCancel1" @confirm="onConfirm1" @change="onChange1" />
            </van-popup>
        </div>
        <div class="input-wrapper">
            <span class="label-title">所属行业</span>
            <van-field
            v-model="form.industry"
            name="industry"
            placeholder="所属行业"
            :rules="[{ required: true, message: '请填写所属行业' }]"
            />
             <!-- @click="showPicker2 = true"
            <van-icon name="arrow" size="16"/>
            
            <van-popup v-model="showPicker2" position="bottom">
                <van-picker show-toolbar title="所属行业" confirm-button-text="完成" :columns="columns2" @cancel="onCancel2" @confirm="onConfirm2" @change="onChange2" />
            </van-popup> -->
        </div>
        <div class="input-wrapper">
            <span class="label-title">企业规模</span>
            <van-field
            v-model="form.staffAmount"
            readonly
            name="staffAmount"
            placeholder="企业规模"
            :rules="[{ required: true, message: '请选择企业规模' }]"
             @click="showPicker3 = true"
            />
            <van-icon name="arrow" size="16"/>
            
            <van-popup v-model="showPicker3" position="bottom">
                <van-picker show-toolbar title="企业规模" confirm-button-text="完成" :columns="columns3" @cancel="onCancel3" @confirm="onConfirm3" @change="onChange3" />
            </van-popup>
        </div>
        <div class="input-wrapper">
            <span class="label-title">联系人</span>
            <van-field
            v-model="form.contactName"
            name="contactName"
            placeholder="联系人"
            :rules="[{ required: true, message: '请填写联系人' }]"
            />
        </div>
        <div class="input-wrapper">
            <span class="label-title">联系电话</span>
            <van-field
            v-model="form.tel"
            name="tel"
            placeholder="联系电话"
            :rules="phoneRules"
            />
        </div>
        <div class="input-wrapper">
            <span class="label-title">邮箱地址</span>
            <van-field
            v-model="form.emailAddress"
            name="emailAddress"
            placeholder="邮箱地址"
            :rules="[{ required: true, message: '请填写邮箱地址' }]"
            />
        </div>
        <!-- <div class="input-wrapper">
            <span class="label-title">是否认证</span>
            <van-field name="renzheng">
                <template #input>
                    <van-radio-group v-model="form.renzheng" direction="horizontal">
                        <van-radio name="1">是
                            <img
                            class="radio-checked-img"
                            slot="icon"
                            slot-scope="props"
                            :src="props.checked ? activeIcon : inactiveIcon"
                            >
                        </van-radio>
                        <van-radio name="2">否
                            <img
                            class="radio-checked-img"
                            slot="icon"
                            slot-scope="props"
                            :src="props.checked ? activeIcon : inactiveIcon"
                            >
                        </van-radio>
                    </van-radio-group>
                </template>
            </van-field>
        </div> -->
        <div class="input-wrapper upload-img">
            <span class="label-title">营业执照</span>
            <van-field name="qualiCertificate" :rules="uploadImgRules">
                <template #input>
                    <van-uploader v-model="meedUrlArr" multiple 
                    :after-read="imgRead" 
                    @delete="imgdelete">
                        <div class="upload-img-icon">
                            <div class="upload-title">上传</div>
                        </div>
                    </van-uploader>
                </template>
            </van-field>
        </div>
        <div class="input-wrapper input-deser">
            <span class="label-title">备注</span>
            <van-field
            v-model="form.remark"
            type="textarea"
            name="remark"
            placeholder="请填写备注"
            :rules="[{ required: false, message: '请填写备注' }]"
            />
        </div>
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
    <!-- 提交弹框 -->       
    <div class="model-wrapper" v-if="show">
        <div class="submit-wrapper">
            <div class="title">您确认提交吗？</div>
            <div class="btn-wrapper">
                <div class="btn go-back" @click="goBackShow">离开</div>
                <div class="btn" @click="cancleShow">取消</div>
            </div>
        </div>
    </div>      
    <!-- 离开信息登记弹框 -->      
    <div class="model-wrapper" v-if="show1">
        <div class="submit-wrapper">
            <div class="title">您确认离开信息登记吗？</div>
            <div class="title1">离开信息将需要全部重新填写</div>
            <div class="btn-wrapper">
                <div class="btn go-back1" @click="goBackShow1">离开</div>
                <div class="btn go-back2" @click="cancleShow1">继续填写</div>
            </div>
        </div>
    </div> 
  </div>
</template>

<script>
 
import json from "@/libs/city_code.json"
export default {
  name: "businessRegist",
  components:{},
  data() {
    this.phoneRules = [
      { required: true, message: '请输入手机号' },
      { validator: this.phoneValidator, message: '手机号格式错误' },
    ];
    this.uploadImgRules = [
      { required: false, message: '请上传营业执照'},
    ];
    return {
      activeIcon: require('../assets/image/yes.png'), // 单选选中图片
      inactiveIcon: require('../assets/image/no.png'), //单选未选中图片
      allCity:json, // 省市数据
      showPicker:false, // 省市选择框
      showPicker1:false, // 企业类型选择框
      showPicker2:false, // 所属行业选择框
      showPicker3:false, // 所属行业选择框
      show:false, // 离开企业信息提提交弹框
      show1:false, // 离开企业信息弹框
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
      columns1: ['全部', '国企', '外商独资', '代表处', '合资', '民营', '国家机关', '股份制企业', '上市公司', '事业单位', '银行', '医院', '学校/下级学院', '律师事务所', '社会团体', '港澳台公司', '其他'],
      columns2:['杭州', '宁波', '温州', '嘉兴', '湖州'],
      columns3:['全部', '20人以下', '20-99人', '100-499人', '500-999人','1000-9999人', '10000人以上'],
      proCity:'',
      form:{
        province:'',//省
        city:'',//市
        entFullname:'',
        entName:'',
        entAddress:'',
        entType:'',
        industry:'',
        staffAmount:'',
        contactName:'',
        tel:'',
        emailAddress:'',
        // renzheng:'1',
        qualiCertificate:'',
        remark:''
      },
      meedUrlArr:[],
    }
  },
  created() {
    
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
      
    imgRead(val){
        // let selectImg=[]
        // this.showimg=true
        // if (val&&!Array.isArray(val)){   
        //   val=[val]

        // }
        
        // val.forEach(item => {
        //   let obj={}
        //   lrz(item.file, {
        //     quality: 0.2    //自定义使用压缩方式
        //   })  
        //   .then(rst=> {
        //       //成功时执行
        //     let file = new window.File([rst.file], item.file.name, {
        //         type: item.file.type
        //     }) //把blob转化成file
        //     let reader = new FileReader();    //html5读文件

        //     reader.readAsDataURL(file); //转BASE64 
        //     let that=this
        //     reader.onload = function (e) {        //读取完毕后调用接口

        //       obj={
        //         ImgByte: e.target.result
        //       }
        //       selectImg.push(obj)
        //       if(val.length>0&&val.length==selectImg.length){
                //   that.uploadImg2(selectImg)
                  this.uploadImg2(val)
        //         }
        //     }

              
        //   }).catch(error=> {
        //       //失败时执行
        //   }).always(()=> {
        
        //       //不管成功或失败，都会执行
        //   })
        // })

    },
    
    //删除图片的回调
    imgdelete(val,detail){
    //   if (this.meedUrlArr2&&this.meedUrlArr2.length){
    //     this.meedUrlArr2.forEach(item => {

    //       item=item.split(',')
    //     })
    //     this.meedUrlArr2 = (this.meedUrlArr2 + '').split(',');
    //     this.meedUrlArr2 = this.meedUrlArr2.toString().split(',');
    //     this.meedUrlArr2 = this.meedUrlArr2.join().split(',');
        
    //     this.$toast("图片删除成功");
    //     this.meedUrlArr2.splice(detail.index, 1)
      
    //   }
    },
    //提供方录入身份证明
    uploadImg2 (file) {
        console.log(file)
        let formdata1 = new FormData();
        formdata1.append('files', file.file);
        this.$fetchPostFile("enterprise/uploadFiles",formdata1).then(res=> {
            this.$toast(res.message);
            this.form.qualiCertificate=res.data.paths
        })
    },
    positionAddress(){
        
      let geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, //是否使用高精度定位，默认:true
        timeout: 10000, //超过10秒后停止定位，默认：无穷大
        maximumAge: 0, //定位结果缓存0毫秒，默认：0
        convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true, //显示定位按钮，默认：true
        buttonPosition: "RB", //定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: false, //定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
        useNative: true,
        zoomToAccuracy: true //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      });
      geolocation.getCurrentPosition((status, result) => {
        if(status=='complete'){
            console.log(result)
            this.form.entAddress=result.formattedAddress
        }else{
          this.$toast("获取当前位置失败");
        }
      });
    },
    phoneValidator(val) {
      return /^[\d\-]+$/g.test(val);
    },
    onClickLeft(){
      this.$router.push("/")
    },
    // 提交表单成功按钮
    onSubmit(values) {
        this.form.entName=this.form.entFullname
      console.log('submit', values);
      this.$fetchPost('enterprise/insert',this.form,"json").then(res => {
          console.log(res)

      })
    },
    // 提交表单失败按钮
    onFailed(values){
        this.$toast("请填写完整信息")
      console.log('failed', values);
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
    onCancel(){
        this.showPicker=false
    },
    onConfirm1(value){
        this.form.entType=value
        this.showPicker1=false
    },
    onChange1(picker, values,index){
        this.form.entType=values
    }, 
    onCancel1(){
        this.showPicker1=false
    },
    onConfirm2(value){
        this.form.industry=value
        this.showPicker2=false
    },
    onChange2(picker, values,index){
        this.form.industry=values
    }, 
    onCancel2(){
        this.showPicker2=false
    },
    onConfirm3(value){
        this.form.staffAmount=value
        this.showPicker3=false
    },
    onChange3(picker, values,index){
        this.form.staffAmount=values
    }, 
    onCancel3(){
        this.showPicker3=false
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
    // 提交离开按钮
    goBackShow(){

    },
    // 提交取消按钮
    cancleShow(){

    },
    // 离开信息登记按钮
    goBackShow1(){

    },
    // 继续信息登记按钮
    cancleShow1(){

    },
  }
};
</script>
<style lang="scss">
.business-regist{
    .van-cell{
        flex:1;
    }
    .van-radio__label{
        font-size:16px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(102,102,102,1);

    }
    .van-button::before,.van-button--info{
        width:327px;
        height:44px;
        background:rgba(255,165,37,1);
        border-radius:5px;
        border:none;
        font-size:16px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(255,255,255,1);
    }
    .van-cell{
        padding:0;
        font-size:16px;
        color:#333;
    }
    .van-cell:not(:last-child)::after{
        border:0;
    }
    .van-field__error-message{
        position:absolute;
        top:0px;
        right:20px;
    }
    .van-uploader__preview{
        margin-top:16px;
    }
    .van-picker-column{
        text-align:left;
    }
    .van-picker-column__item{
        padding-left:17px;
    }
}
</style>
<style lang="scss" scoped>
.business-regist{
    .form-wrapper{
        .input-wrapper{
            display:flex;
            justify-content: flex-start;
            align-items: center;
            height:52px;
            border-bottom: 1px solid #EBECEE;
            padding:0 13px;
            &.upload-img{
                padding:17px 13px;
                height: 114px;
                .upload-img-icon{
                    display:flex;
                    justify-content:center;
                    align-items:center;
                    width:165px;
                    height:113px;
                    background:url("../assets/image/upload.png") no-repeat;
                    background-size:165px 113px;
                    .upload-title{
                        width:54px;
                        height:54px;
                        text-align:center;
                        line-height:54px;
                        font-size:16px;
                        font-family:PingFang SC;
                        font-weight:500;
                        color:rgba(255,255,255,1);
                        background:rgba(0,0,0,1);
                        opacity:0.4;
                        border-radius:50%;
                    }
                }

            }
            &.input-deser{
                display:flex;
                justify-content: flex-start;
                align-items: flex-start;
                padding:17px 13px;
            }
            .label-title{
                width: 70px;
                font-size:16px;
                font-family:PingFang SC;
                font-weight:500;
                color:rgba(102,102,102,1);
                margin-right:12px;
            }
            .radio-checked-img{
                width:17px;
                height:17px;
            }
        }
    }
    .model-wrapper{
        position:absolute;
        top:0;
        left:0;
        bottom:0;
        right:0;
        display:flex;
        justify-content:center;
        align-items:center;
        background:rgba(0,0,0,.5);
        z-index:10;
        .submit-wrapper{
            display:flex;
            flex-direction:column;
            justify-content:center;
            align-items:center;
            width:279px;
            height:180px;
            background:rgba(255,255,255,1);
            border-radius:6px;
            font-size:16px;
            font-family:PingFang SC;
            font-weight:bold;
            color:rgba(51,51,51,1);
            .title{
            }
            .title1{
                font-size:13px;
                font-family:PingFang SC;
                font-weight:500;
                color:rgba(255,39,39,1);
                margin-top:15px;
            }
            .btn-wrapper{
                width:80%;
                display:flex;
                justify-content:space-between;
                padding:0 15px;
                margin-top:35px;
                .btn{
                    width:96px;
                    height:36px;
                    border-radius:18px;
                    text-align:center;
                    line-height:36px;
                    color:#333;
                    border:2px solid rgba(187,187,187,1);
                    &.go-back{
                        color:#fff;
                        background:rgba(255,165,37,1);
                        border:2px solid rgba(255,165,37,1);
                    }
                    &.go-back1{
                        color:#fff;
                        background:#FF2727;
                        border:2px solid #FF2727;
                    }
                    &.go-back2{
                        color:#fff;
                        background:#FFA525;
                        border:2px solid #FFA525;
                    }
                }
            }
        }

    }

}
</style>
