<template>
<!-- 企业信息录入 -->
  <div class="forgetpass">
    <van-nav-bar
      title="全联人才服务平台"
      style="height:44px;font-size:18px;color:#333333"
      @click-left="onClickLeft">
     <van-icon name="cross" color="#333333" size="22px" slot="left" />
    </van-nav-bar>
    <div >
    <div style="color:#333333;font-size:24px;text-align:left;margin-top:40px;margin-left:24px">设置新密码</div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="用户名"
          label=""
         clearable
          placeholder="请输入您的手机号"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          name="密码"
          label=""
          placeholder="请输入验证码"
          :rules="[{ required: true, message: '请输入验证码' }]">
          <van-button slot="button" size="small" plain  color="#FFA525">发送验证码</van-button>
        </van-field>
        <van-field
          v-model="password"
          name="密码"
          label=""
          placeholder="输入新密码（6-20位数字与字母组合）"
          :rules="[{ required: true, message: '请输入新密码' }]"
        />
          <van-field
          v-model="password"
          name="密码"
          label=""
          placeholder="再次确认密码"
          :rules="[{ required: true, message: '请再次确认密码' }]"
        />
        <div style="margin: 16px;margin-top:40px">
          <van-button block color="#FFA525" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
 
export default {
  name: "about",
  components:{},
  data() {
    return {
     isflage:true,
     clearimg:"",
     passimg:"closed-eye",
     ispassword:'password',
    username: '',
      password: '',
    }
  },
  created() {
    
  },
 mounted () {
 
  },
  methods:{ 
      //是否看密码
    isshowpass(){
        this.isflage=!this.isflage
        if(this.isflage){
            this.passimg="closed-eye"
            this.ispassword="password"
        }else{
            this.passimg="eye-o"
            this.ispassword="text"
        }
    },
    onClickLeft(){
      this.$router.push("/login")
    },
     onSubmit(values) {
      console.log('submit', values);
    },
  }
};
</script>
<style lang="scss">
.forgetpass{
    .van-cell{
        padding:20px 24px;
    }
}
</style>
<style lang="scss" scoped>
.forgetpass{
    .forget{
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 0px 24px;
        span{
            font-size: 14px;
        }
   }
}

</style>
