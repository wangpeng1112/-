<template>
  <div class="message-panel">
    <div class="notification-list">
      <h2 class="notification-heading">系统通知</h2>
      <ul class="notification-items">
        <li v-for="item in formattedLike" :key="item.id">
          <div class="notification-header">
            <span class="notification-title">通知</span>
            <span class="notification-date">{{ item.formattedTime }}</span>
          </div>
          <div class="notification-content">
            用户: {{ item.parsedContent.username }}给你的帖子：{{ item.parsedContent.artname}}点了关注，快来查看吧！
          </div>
          <el-button type="primary" @click="viewItem">已读</el-button>
        </li>
      </ul>
    </div>
    <el-pagination
      class="pagination"
      @current-change="handlePageChange"
      :current-page="currentPage"
      :page-size="pageSize"
      :total="size"
    ></el-pagination>
  </div>
</template>

<script>
	import { FenYe } from "@/api";
export default {
	
  data() {
    return {
       size:0,
     
		like: [] ,
        
      currentPage: 1,
      pageSize: 2,
    };
  },
  computed: {
	  formattedLike() {
	      return this.like.map(item => {
	        const formattedTime = this.$moment(item.createTime).format('YYYY-MM-DD hh:mm:ss');
			const parsedContent = JSON.parse(item.content);
	
	        return { ...item, formattedTime,parsedContent };
	      });
	    },
    displayedItems() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.notificationList.slice(startIndex, endIndex);
    },

  },
  created() {
  	FenYe(this.currentPage,this.pageSize,this.$store.state.user.userId).then(res=>{
         
      
	  this.like=res.data.data.content

		
		this.size = res.data.data.totalElements;

	})
  },
  methods: {
    handlePageChange(newPage) {
      this.currentPage = newPage;
	  FenYe(this.currentPage-1, this.pageSize,this.$store.state.user.userId).then(res => {
	        this.like = res.data.data.content;
	        this.size = res.data.data.totalElements;
	      });
    },
    viewItem() {
      // 处理查看详情的逻辑
    },
  },
};
</script>

<style>
.message-panel {
  max-width: 800px;
  margin: 0 auto;
}

.notification-items {
  list-style: none;
  padding: 0;
}

.notification-header {
  display: flex;
  align-items: center;
}

.notification-badge {
  margin-right: 10px;
  padding: 4px 8px;
  background-color: #1890ff;
  color: #fff;
  border-radius: 50%;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
</style>