<template>
  <div class="third">
    <section>
      <div class="content">
        <h3>用户须知</h3>
        <p>
          注册时要填写以下项目：
          用户名: 中英文即可 密码:
          不易过于简单。建议6位以上，数字、字母、字符，至少2种混合。 Email:
          必填，作为登录账号 性别: 请选择 男或女 填写完毕，点提交
        </p>
      </div>
      <b-collapse
        :open="false"
        position="is-bottom"
        aria-id="contentIdForA11y1"
      >
        <a slot="trigger" slot-scope="props" aria-controls="contentIdForA11y1">
          <b-icon :icon="!props.open ? 'menu-down' : 'menu-up'"></b-icon>
          {{ !props.open ? "查看全部" : "收起" }}
        </a>
        <p>
          
        </p>
      </b-collapse>
    </section>
    <b-button rounded type="is-info" @click="submit">提交注册信息</b-button>
  </div>
</template>

<script>
import { register } from "@/api";
export default {
  data() {
    return {};
  },
  methods: {
    submit() {
      console.log(this.$store.state.registeruser.userName);
      const userName = this.$store.state.registeruser.userName;
      const userPassword = this.$store.state.registeruser.userPassword;
      const userShow = this.$store.state.registeruser.userShow;
      const userEmail = this.$store.state.registeruser.userEmail;
      const userPhone = this.$store.state.registeruser.userPhone;
      const userSex = this.$store.state.registeruser.userSex;

      if (
        userName === "" &&
        userPassword === "" &&
        userShow === "" &&
        userEmail === "" &&
        userPhone === "" &&
        userSex === ""
      ) {
        alert("确定信息填写完整了吗？");
      } else {
        register(
          userName,
          userPassword,
          userShow,
          userEmail,
          userPhone,
          userSex
        ).then(res => {
          const { data } = res.data.code;
		 
          if (data == 0) {
            this.$router.go(-1);
          }else{
			  alert("用户名和密码已经存在")
		  }
        });
      }
    }
  }
};
</script>

<style scoped>
.third {
  text-align: center;
  float: right;
  width: 500px;
  height: 500px;
}
.content {
  margin-bottom: 0 !important;
}
</style>
