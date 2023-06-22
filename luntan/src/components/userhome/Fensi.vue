<template>
  <div class="container">
    <h1 class="page-title">粉丝列表</h1>
    <el-row>
      <el-col v-for="fan in user" :key="fan.userId" :span="8">
        <el-card class="fan-card">
          <div slot="header" class="fan-card-header">
            <img
            :src="require(`@/assets/${fan.userImg}`)"
            class="avatar"
            border="0"
            align="default"
            >
          </div>
          <div class="fan-card-content">
            <div class="fan-username">{{ fan.userName }}</div>
            <div class="fan-info">电子邮件：{{ fan.userEmail }}</div>
            
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
	import { FensiList } from "@/api";
export default {
  data() {
    return {
      user: {
		  userId:"",
         userEmail: "",
         userImg: "",
         userName: "",
         userPhone: "",
         userSex: "",
         userShow: ""
      }
    };
  },
  created(){
  	  FensiList(this.$store.state.user.userId).then(res => {
  		  
  		  this.user = res.data.data
  		  console.log(this.user)
  		  
  	  })
  },
  methods: {
  	  
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.page-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.fan-card {
  margin-bottom: 20px;
}

.fan-card-header {
  text-align: center;
  padding: 10px;
}

.fan-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.fan-card-content {
  padding: 20px;
}

.fan-username {
  font-weight: bold;
  margin-bottom: 5px;
}

.fan-info {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.button {
  margin-top: 10px;
}
</style>