<template>
  <div class="message-panel" >
   
    <div class="notification-list">
      <h2 class="notification-heading">系统通知</h2>
      <ul class="notification-items">
        <li>
          <div class="notification-header">
			  <div class="notification-badge" >
			    {{like.number}}
			  </div>
            <span class="notification-title">{{ like.title }}</span>
            <span class="notification-date">{{ like.date }}</span>
          </div>
          <div class="notification-content">
            "用户: {{like.username}}给你的帖子：{{like.artname}}点了关注，快来查看吧！
          </div>
		  <el-button type="primary" @click="viewItem">查看详情</el-button>
        </li>
		
      </ul>
    </div>
  </div>
</template>

<script>
	import { LikeMessage } from "@/api";
export default {
  data() {
    return {
		
      
       like: {
          id: 1,
		  number:0,
          title: "收到一个新点赞",
          date: "2023-06-12",
          username:"wpd",
		  artname:"回家"
        },
    //     {
    //       id: 2,
		  // number:0,
    //       title: "收到一个新赞",
    //       date: "2023-06-11",
    //       content: "用户B给你的回答点了个赞！",
    //     },
    //     {
    //       id: 3,
		  // number:0,
    //       title: "有新的关注者",
    //       date: "2023-06-10",
    //       content: "用户C关注了你，赶快去看看TA的资料吧！",
    //     },
      
      unreadCount: 3,
    };
  },
  created() {
  	LikeMessage(this.$store.state.user.userId).then(res => {
		const data = JSON.parse(res.data.data.message.content);
		console.log(res.data.data.message)
     this.like.username = data.username;
	 this.like.artname = data.artname;
	 this.like.date = this.$moment(res.data.data.message.createTime).format('YYYY-MM-DD hh:mm:ss');
		this.like.number = res.data.data.num;
		
	})
  },
	  
  methods: {
	  viewItem(){
		  this.$router.push("/allmessage");
	  }
  },
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
	
.notification-content {
  padding: 10px;
  background-color: #f2f2f2;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 1.5;
  color: #333;
}

.notification-list {
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 16px;
  background-color: #f9f9f9;
}

.notification-heading {
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: bold;
}

.notification-items {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.notification-item {
  border-bottom: 1px solid #ccc;
  padding-bottom: 16px;
  margin-bottom: 16px;
}

.notification-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.notification-title {
  font-size: 18px;
  font-weight: bold;
}

.notification-date {
  font-size: 14px;
  color: #888;
}


</style>

