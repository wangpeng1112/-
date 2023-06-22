import axios from "axios";
import Qs from "qs";
import { SnackbarProgrammatic as Snackbar } from "buefy";

//全局默认配置
axios.defaults.baseURL = "/api";
// 允许请求发送凭据
axios.defaults.withCredentials = true;
// 设置默认的请求头部
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';




axios.interceptors.response.use(
  res => {
    return res;
  },
  () => {
    Snackbar.open({
      message: "服务器被吃了",
      type: "is-warning",
      position: "is-top",
      actionText: "Retry",
      indefinite: true,
      onAction: () => {
        this.$buefy.toast.open({
          message: "Action pressed",
          queue: false
        });
      }
    });
  }
);

//post传数据用data，get传参数用params
export const adminLogin = (username, password) => {
  return axios.post(
  "/loginbackstage", 
   Qs.stringify({ username, password }));
};
// 用户登录
export const userLogin = (email, password) => {
  return axios.post(
    "/user/login",
    JSON.stringify({ email, password })
  );
};
export const userEmailLogin = email => {
  return axios.post(`/user/EmailLogin/${email}`);
};
export const Like = (userId,artId,artUserId) =>{
	return axios.post(
	   "/xiaozujian/like",
	   JSON.stringify({userId,artId,artUserId})
	)
}
export const GuanzhuStart = (userId,artUserId) => {
	return axios.post(
	    "/follow/start",
		JSON.stringify({userId,artUserId})
	)
}
export const GuanZhu = (userId,artUserId) =>{
	return axios.post(
	    "/follow/guanzhu",
		JSON.stringify({userId,artUserId})
	)
}
export const delet = artId =>{
	return axios.get(`/article/delet/${artId}`)
}
export const HotNumbe = artId =>{
	return axios.get(`/article/hot/${artId}`)
}
	
export const FenYe =(page,size,userId) =>{
	return axios.post(
     '/message/fenye',
	JSON.stringify({
		page,
		size,
		userId
	})
	)
}
export const LikeMessage = userId =>{
	return axios.get(
	 `/message/like/${userId}`
	)
}
export const UnGuanZhu = (userId,artUserId) => {
	return axios.post(
	    "/follow/quxiaoguanz",
		JSON.stringify({userId,artUserId})
	)
}
export const GuanzhuList = userId =>{
	return axios.post(
	   "/follow/Guanzhu",
	   JSON.stringify({userId})
	)
}
export const FensiList = userId =>{
	return axios.post(
		"/follow/fensi",
		JSON.stringify({userId})
	)
}
export const userEmailLoginTo = (email, emailCode) => {
  return axios.post(
    "/user/EmailLoginTo",
    JSON.stringify({ email, emailCode })
  );
};
// 获得全部文章
export const getAllArticle = page => {
  return axios.post("/article/All", JSON.stringify({ page }));
};
// 获得全部文章类型
export const getAllArticleType = () => {
  return axios.post("/articletype/getallarticletype");
};
//获得文章类型
export const getArticleByTypeId = typeId => {
  return axios.post("/getarticlebytypeid", Qs.stringify({ typeId }));
};
//获得热门文章类型
export const getHotArticleType = () => {
  return axios.post("/articletype/gethotarticletype");
};
// 获得页面主页
export const getPageMain = pageNum => {
  return axios({
    url: "/article/getpagearticle",
    params: {
      page: pageNum
    }
  });
};
// 获得新
export const getnew = () => {
  return axios("/article/getnew");
};
//获得时间
export const gethotuser = () => {
  return axios("/user/hotuser");
};
// 注册
export const register = (
  userName,
  userPassword,
  userShow,
  userEmail,
  userPhone,
  userSex
) => {
  return axios.post(
    "/user/enroll",
    JSON.stringify({
      userName,
      userPassword,
      userShow,
      userEmail,
      userPhone,
      userSex
    })
  );
};
//获得评论
export const getcomment = artId => {
  return axios.post("/Comment/getComment", JSON.stringify({ artId }));
};
// 新评论
export const newcomment = (comArtId, text, comUserId) => {
  return axios.post(
    "/Comment/postcomment",
    JSON.stringify({ comArtId, text, comUserId })
  );
};
export const newpost = (userId, title, text, select) => {
  return axios.post("/article/newpost", JSON.stringify({ userId, title, text, select }));
};
// 按用户id查
export const findartbyuserid = userId => {
  return axios.get(`/article/findartbyuserid/${userId}`);
};
// 获得用户列表
export const getuserlist = () => {
  return axios.post("/getuserlist");
};
