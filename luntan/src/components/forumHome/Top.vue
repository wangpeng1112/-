<template>
  <nav class="navbar is-light" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://bulma.io">
        <img
          src="https://bulma.io/images/bulma-logo.png"
          width="112"
          height="28"
        />
      </a>

      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item">首页</a>

        <a class="navbar-item">热榜</a>

        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link">更多</a>

          <div class="navbar-dropdown">
            <a class="navbar-item" @click="userhome">个人主页</a>
            <a class="navbar-item" @click="massage">消息
			<div class="notification-badge" >
			  3
			</div></a>
			  <a class="navbar-item" @click="post">发帖</a>
            <hr class="navbar-divider" />
            <a class="navbar-item">Report an issue</a>
          </div>
        </div>
        <div class="level-left">
          <div class="level-item">
            <p class="subtitle is-5"></p>
          </div>
          <div class="level-item">
            <div class="field has-addons">
              <p class="control">
                <input class="input" type="text" placeholder="Find a post" />
              </p>
              <p class="control">
                <button class="button">搜索</button>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="navbar-end" v-if="!$store.state.isLogin">
        <div class="navbar-item">
          <div class="buttons">
            <b-button type="is-info" outlined @click="register">注册</b-button>
<div class="navbar-menu">
      <div class="navbar-end">
        <b-dropdown position="is-bottom-left" aria-role="menu" trap-focus>
          <a class="navbar-item" slot="trigger" role="button">
            <b-button type="is-info" outlined>登录</b-button>
          </a>

          <b-dropdown-item aria-role="menu-item" :focusable="false" custom paddingless>
            <div class="modal-card" style="width:300px;">
              <section class="modal-card-body">
                <b-field label="Email">
                  <b-input type="email" v-model="email" placeholder="Your email" required></b-input>
                </b-field>
                
                <div v-if="loginMethod === 'password'">
                  <b-field label="密码">
                    <b-input type="password" password-reveal placeholder="Your password" required v-model="password"></b-input>
                  </b-field>
                </div>
                
                <div v-else-if="loginMethod === 'emailCode'">
                  <b-field label="邮箱验证码">
                    <b-input type="text" v-model="emailCode" placeholder="验证码" required></b-input>
                  </b-field>
				  <button :disabled="isButtonDisabled" @click="sendVerificationCode">
				        获取验证码
				      </button>
                </div>

                <b-checkbox v-model="loginMethod" true-value="password" false-value="emailCode">密码登录</b-checkbox>
              </section>
              <footer class="modal-card-foot">
                <button class="button is-primary" @click="login">登录</button>
              </footer>
            </div>
          </b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
  </div>
        </div>
      </div>
      <div v-else-if="$store.state.isLogin">
        <div>
          <i class="far fa-address-card">{{ $store.state.user.userName }}</i>
        </div>
        <div @click="logout">
          <i class="fas fa-sign-out-alt">登出</i>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { userLogin } from "@/api";
import { userEmailLoginTo } from "@/api";
import { userEmailLogin } from "@/api";

export default {
  data() {
    return {
      email: "",
      password: "",
	  emailCode: "",
	  loginMethod: "password",
	  isButtonDisabled: false
    };
  },
  methods: {
		  
	  post(){
		   this.$router.push("/postarticle");
	  },
    logout() {
      this.$store.commit("logout");
    },
    userhome() {
      this.$router.push("/userhome");
    },
	
	login() {
	  if (this.loginMethod === "password") {
	    // 执行密码登录逻辑
	    userLogin(this.email, this.password)
	      .then(res => {
	        const { data } = res.data;
	          console.log(res)
	          console.log(data);
	          this.user = data;
	          if (res.data.code==0) {
	            this.$store.dispatch("aLogin", {
	              user: data,
	              message: "牛逼",
	              success: () => {
	                console.log("欢迎您");
	              }
	            });
	          } else {
	            alert("该用户不存在");
	          }
	        })
	        .catch(() => {});
	  } else if (this.loginMethod === "emailCode") {
	    // 执行邮箱验证码登录逻辑
	   userEmailLoginTo(this.email, this.emailCode)
	     .then(res => {
	       const { data } = res.data;
	         console.log(res)
	         console.log(data);
	         this.user = data;
	         if (res.data.code==0) {
	           this.$store.dispatch("aLogin", {
	             user: data,
	             message: "牛逼",
	             success: () => {
	               console.log("欢迎您");
				   console.log(this.user.userId);
	             }
	           });
	         } else {
	           alert(res.data.msg);
	         }
	       })
	       .catch(() => {});
	  }
	},
	sendVerificationCode() {
	      this.isButtonDisabled = true;
	      setTimeout(() => {
	        this.isButtonDisabled = false;
	      }, 30000); 
		  // 30秒后解除禁用状态
		  userEmailLogin(this.email)
		  .then(res => {
			  alert(res.data.msg)
		  })
		  
	    },
		massage(){
			this.$router.push("/massage");
		},
	
    register() {
      this.$router.push("/registerhome");
    }
  }
};
</script>
<style>
	.notification-badge {
	  width: 20px;
	  height: 20px;
	  border-radius: 50%;
	  background-color: red;
	  color: #fff;
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  font-size: 12px;
	}
</style>
