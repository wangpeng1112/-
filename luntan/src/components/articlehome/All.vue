<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent is-8">
      <article class="tile is-child box">
        <p align="right">
          <button class="button is-info" @click="getAll">全部帖子</button>
        </p>

        <ul
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="busy"
          infinite-scroll-distance="limit"
          style="height: 100vh;
    overflow-y: auto;"
        >
          <div class="box" v-for="(content, index) in contents" :key="index">
            <article class="media">
              <figure class="media-left">
                <p class="image is-64x64">
                  <img
                    :src="require(`../../assets/${content.user.userImg}`)"
                    class="size"
                  />
                </p>
              </figure>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>发帖人用户名:{{ content.user.userName }}</strong>

                    <br />
                    发帖标题:{{ content.article.artTitle }}
                  </p>
                </div>
                <nav class="level is-mobile">
                  <div class="level-left">
                    <a class="level-item">
                      <span class="icon is-small">
                        <i class="fab fa-hotjar"></i>
                      </span>
                      {{ content.article.artHotNum }}
                    </a>

                    <a class="level-item">
                      <span class="icon is-small">
                        <i class="fas fa-comment-dots"></i>
                      </span>
                      {{ content.article.artComNum }}
                    </a>

                    <a class="level-item"   @click="toggleLike(index)">
                      <span class="icon is-small">
                        <i class="fas fa-heart"></i>
                      </span>
                      {{ content.article.artLikeNum }}
                    </a>
                  </div>
                </nav>
              </div>
              <div class="media-right">
                <a class="navbar-item" slot="trigger" role="button">
                  <b-button type="is-info" outlined @click="detail(index)"
                    >查看详情</b-button
                  >
                </a>
              </div>
            </article>
          </div>
          <div v-if="flag === 1">没有更多了</div>

          <b-notification :closable="false" v-if="flag === 2">
            <div style="text-align:center">正在加载</div>
            <b-loading
              :is-full-page="isFullPage"
              :active.sync="isLoading"
              :can-cancel="true"
            ></b-loading>
          </b-notification>
        </ul>
      </article>
    </div>
    <div class="tile is-parent">
      <article class="tile is-child box">
        <p class="subtitle">所有板块</p>

        <div class="card">
          <header class="card-header">
            <p class="card-header-title">板块名</p>
            <a href="#" class="card-header-icon" aria-label="more options">
              <span class="icon">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </a>
          </header>
          <div class="card-content">
            <div class="content">
              <section>
                <b-tooltip
                  v-for="(ArticleType, index) in ArticleTypes"
                  :key="index"
                  :label="ArticleType.typeDesc"
                  class="is-info"
                >
                  <button
                    class="button is-info is-outlined"
                    @click="getTypeArticle(ArticleType.typeId)"
                  >
                    {{ ArticleType.typeName }}
                  </button>
                </b-tooltip>
              </section>
              <br />
            </div>
          </div>
          <footer class="card-footer">
            <a href="#" class="card-footer-item">点击你感兴趣的板块</a>
          </footer>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import { getAllArticle } from "@/api";
import { getAllArticleType } from "@/api";
import { getArticleByTypeId } from "@/api";
import { Like } from "@/api";
export default {
  data() {
    return {
      isLoading: false,
      isFullPage: false,
      btnFlag: false,
      busy: false,
      limit: 20,
      flag: 0,

      // test: [],
      contents: [
        {
          article: {
            artId: 0,
            artComNum: "",
            artCommentId: 0,
            artContent: "",
            artCreTime: "",
            artHotNum: 0,
            artLikeNum: 0,
            artTitle: "",
            artTypeId: 0,
            artUserId: 0,
            artView: 0
          },
          user: {
            userId: 0,
            userPassword: 0,
            userName: "",
            userEmail: "",
            userSex: "",
            userPhone: "",
            userStatus: 0,
            userTime: "",
            userShow: "",
            userBlog: "",
            userImg: "404.png",
            userFans: "",
            userConcern: ""
          }
        }
      ],
      test: [],
      ArticleTypes: [
        {
          typeId: 0,
          typeCreateTime: "",
          typeName: "",
          typeDesc: ""
        }
      ],
      number: 1,
      totalPages: 3
    };
  },
  mounted() {
	  
    getAllArticle()
      .then(res => {
		  console.log(res.data.data)
        this.contents = res.data.data;
      })
      .catch(() => {});
    getAllArticleType()
      .then(res => {
        const { data } = res.data;
		console.log(res.data.data)
        this.ArticleTypes = data.data;
		console.log(this.ArticleTypes)
      })
      .catch(() => {});
  },

  methods: {
	  toggleLike(index){
		  if(this.$store.state.isLogin){
	  	  const item = this.contents[index];
	  	  Like(this.$store.state.user.userId,item.article.artId,item.article.artUserId)
	  	  .then(res =>{
	  		 if(res.data.code==0){
	  			 alert(res.data.msg)
	  				 console.log(res.data.data)
	  				item.article.artLikeNum=res.data.data
	  		 }
	  	  });
		  }else{
			  alert("请先登录！！！")
		  }
	  },
    loadMore() {
      console.log("scrolling");

      this.busy = true;
      if (this.number - 1 === this.totalPages) {
        this.flag = 1;
      } else {
        this.flag = 2;
        this.isLoading = true;

        setTimeout(() => {
          getAllArticle(this.number++)
            .then(res => {
              const append = res.data.content;
              this.contents = this.contents.concat(append);

              this.busy = false;
            })
            .catch(() => {
              this.busy = false;
            });
        }, 1000);
      }
    },
    getTypeArticle(typeId) {
      getArticleByTypeId(typeId)
        .then(res => {
          const { data } = res.data;
          this.contents = data;
        })
        .catch(() => {});
    },
    getAll() {
      getAllArticle()
        .then(res => {
          this.contents = res.data.content;
        })
        .catch(() => {});
    },
    detail(index) {
      const detaildata = this.contents[index];
      this.$router.push({
        path: "/details",
        query: {
          detaildata: JSON.stringify(detaildata)
        }
      });
    }
  },
  created() {
    // this.loadMore();
  }
};
</script>

<style scoped>
.size {
  width: 64px;
  height: 64px;
}
.fuck {
  text-align: center;
}
.tile.is-ancestor {
  margin-left: 0;
  margin-right: 0;
  margin-top: 0;
}
</style>
