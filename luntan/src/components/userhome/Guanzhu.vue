<template>
  <div class="container">
    <h1 class="page-title">关注列表</h1>
    <el-row>
      <el-col v-for="user in user" :key="user.id" :span="8">
        <el-card class="following-card">
          <div slot="header" class="following-card-header">
            <img 
			:src="require(`@/assets/${user.userImg}`)"
			class="avatar"
			border="0"
			align="default"
			>
          </div>
          <div class="following-card-content">
            <div class="following-username">{{ user.userName }}</div>
            <div class="following-info">电子邮件：{{ user.userEmail }}</div>
            
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
	import { GuanzhuList } from "@/api";
export default {
  data() {
    return {
     
         
         user: {
           userEmail: "",
           userImg: "",
           userName: "",
           userPhone: "",
           userSex: "",
           userShow: ""
        }
       // 可以添加更多的 count 元素
     
    };
  },
  created(){
	  GuanzhuList(this.$store.state.user.userId).then(res => {
		  
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

.following-card {
  margin-bottom: 20px;
}

.following-card-header {
  text-align: center;
  padding: 10px;
}

.following-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
}

.following-card-content {
  padding: 20px;
}

.following-username {
  font-weight: bold;
  margin-bottom: 5px;
}

.following-info {
  font-size: 14px;
  color: #666;
  margin-bottom: 10px;
}

.button {
  margin-top: 10px;
}
</style>