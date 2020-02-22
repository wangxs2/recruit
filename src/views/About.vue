<template>
<!-- 企业信息录入 -->
  <div class="about">
    <van-nav-bar
      title="企业基础信息登记"
      style="height:44px;font-size:18px;color:#333333"
      @click-left="onClickLeft">
     <van-icon name="arrow-left" color="#333333" size="22px" slot="left" />
    </van-nav-bar>
    <div >
      <van-form @submit="onSubmit">
        <van-field
          v-model="username"
          name="用户名"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">
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
      username: '',
      password: '',
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
</style>
<style lang="scss" scoped>
</style>
