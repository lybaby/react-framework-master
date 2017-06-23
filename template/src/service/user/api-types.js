// 这里表示所有位于user_api目录下的API,请求方式为'user_api/.....',所有请求方式HTTP/POST JSON
/* 用户注册
 Request:
 {
 " certType ":"0",
 " certCode ":"15758454564",
 "pwd":" 728466",
 "nickname":"sdfsf",
 "eventId"：92345 ,//申请验证码时由服务器返回
 "captcha"：9234
 }
 */
export const USER_REGISTER = 'user_register';

/* 登录(不需身份验证)
 Request:
 {
     “version”: “2.0,
     “params”: {
     “certType” :  0
     “certCode” : “13590482213”
     “pwd” : “9527”,
     “token” : “sdfsdfdsfwerwr234322424sdfsff”,
     “deviceInfo” : {
     “deviceCode” :“12OF09ATQ6BM4CC5D”,
     “deviceName”: “liuxiang’s  iPhone”,
     “deviceModel”: “iPhone 5”,
     “osName”:“iOS”,
     “osVersion” : “8.01”,
     “osType” : 2,
     “deviceType”:	0PC;1手机;2平板
     “appVersion” : “2.2.305”
     "openCode":  "xxx"
     }，
    }
 }

 */
export const USER_LOGIN = 'user_login';

/* 找回密码
 Request:
 {
     “version”: “2.0,
     “params”: {
     “eventId” :  0
     ‘phoneNum’:
     “pwd” : “9527”
     }
 }
 */
export const USER_BACK_PWD = 'user_back_pwd';

/* 获取短信验证码
 Request:
 {
     “version”: “2.0,
     “params”: {
     “nameType” : 0
     “name” :  “18676390915”，
     “busType”: 1 //1为注册 2手机号登录
    }
 }

 */
export const FETCH_CAPTCHA = 'fetch_captcha';

/* 验证短信验证码
 Request:
 {
     “version”: “2.0,
     “params”: {
         “phoneNum” :18676390915
         “captcha” :  “4455”，
         evenId: 1
     }
 }
 */
export const VALID_CAPTCHA = 'valid_captcha';

/* 验证手机号是否注册
 Request:
 {
     “version”: “2.0,
     “params”: {
         “phoneNum” :18676390915
         “captcha” :  “4455”，
         evenId : 1
     }
 }
 Response:
 {
     “code” : 0
     “isReg”: “N“
 }
 */
export const VALID_REGISTER = 'valid_register';

/* 退出
 Request:
 {
 }
 */
export const USER_LOGOUT = 'user_logout';

/* 获取用户信息
 Request:
 {
     “version”: “2.0,
     “params”: {
     “sessionId” : “adflasdfasd”,
     “userId” :  100456
     “flag” :  15 //用于表示想要拉取哪些信息
     }
 }

 */
export const GET_USER_INFO = 'fetch_user_info';

/* 设置昵称
 Request:
 {
     “version”: “2.0,
     “params”: {
     “sessionId” : “adflasdfasd”,
     “nickname”: “sandy”
     }
 }
 */
export const SET_NICK_NAME = 'set_nick_name';

/* 设置邮箱
 Request:
 {
     “version”: “2.0,
     “params”: {
     “sessionId” : “adflasdfasd”,
     “email”: “test@test.com”
     }
 }
*/
export const SET_EMAIL = 'set_email';

/* 设置密码
 Request:
 {
 “version”: “2.0,
     “params”: {
     “sessionId” : “adflasdfasd”,
     “email”: “test@test.com”,
     “pwd”: “sxvadfasdf”,
     “key”: “sxzcfsdfsvadfasdf”, //加密key
     }
 }
*/
export const SET_PWD = 'set_pwd';

/* 检验是否设置密码
 Request:
 {
     “version”: “2.0,
     “params”: {
     “sessionId” : “adflasdfasd”,
     “sessionUserId”: “123123”
     }
 }
 */
export const CHECK_PWD = 'check_pwd';

/* 设置头像
 Request:
 {
 “version”: “2.0",
 “params”: {
 “sessionId” : “adflasdfasd”,
 “fileName”: “test”
 "fileData":'' // 文件二进制字节流
 }
 }
 */
export const UPLOAD_USER_ICON = 'upload_user_icon';

/* 设置签名
 Request:
 {
     “version”: “2.0,
     “params”: {
     “sessionId” : “adflasdfasd”,
     “newSignature”:”fdsfdsfdsfdsfsdf”
     }
 }
 */
export const SET_USER_SIGNATURE = 'set_user_signature';

/* 设置性别
 Request:
 {
     “version”: “2.0,
     “params”: {
     “sessionId” : “adflasdfasd”,
     “newGender” : 0 //性别0女 1男
     }
 }
 */
export const SET_USER_GENDER = 'set_user_gender';

/* 获取个人名片
 Request:
 {
     “version”: “2.0,
     “params”: {
     “sessionId” : “adflasdfasd”
     }
 }
 Response:
 {	“code”: 0,
    “result”:
    {
        “userId” :1234,
        ”userIcon”:”www.yisunline.com/1.jpg”,
        ”nickname” : “sandy”, //用户昵称
        ”sig” : “个性好”, //个性签名
        “ptfCnt” :12, //数量组合
        “maxPer”:“35%“ //最高收益
        “gender”:0 //性别0女 1男
        "uType":1 //用户类型 1普通用户 2认证投顾,表示已经审核通过的投顾用户
    }
 }
 */
export const GET_USER_CARD = 'get_user_card';

/* 获取好友个数
 Request:
     {
     “version”: “2.0,
     “params”: {
     “sessionId” : “adflasdfasd”
     }
 }
 Response:
 {
     “code”: 0,
     “result”:  {
     " fdLim ":50, //好友上限
     " addFds ":20//已添加好友数量
     }
 }
 */
export const GET_USER_FRIEND_LIMITS = 'get_user_friendlimits';

/* 获取开关值
 Request:
 {
     “version”: “2.0,
     “params”: {
     “sessionId” : “adflasdfasd”
     }
 }
 Response:
 {
     “code”: 0,
     “result”:  {
     “prvy”:”YYYY” //每一位都用Y/N表示是否开通：第1位：是否允许将我引荐给别人 第2位：是否允许通过手机号搜索到我,第3位 : 是否接收资讯推送第4位：加我为联系人时是否需要验证
 }
 }
 */

export const GET_USER_SWITCH = 'get_user_switch';

/* 设置隐私
 Request:
 {
    “version”: “2.0,
    “params”: {
     “sessionId” : “adflasdfasd”,
     “prvy” : "YNYY"
     }
 }
 */
export const SET_USER_SWITCH = 'set_user_switch';

/* 设置备注名
 Request:
 {
     “version”: “2.0,
     “params”: {
     “sessionId” : “adflasdfasd”,
     “cmnt” : "小黄",
     "tarUserId":
     }
 }
 */
export const SET_FRIEND_CMNT = 'set_friend_cmnt';

/* 更改手机号
     Request:
     {
     “version”: “2.0,
     “params”: {
     “sessionId” : “adflasdfasd”,
     “oldNum”:”133272647728”,
     “newNum”:”133272647722”,
     “captcha” : 9527, //短信验证码
     “eventId”,2131234 //申请验证码时由服务器返回
     }
     }
 */
export const UPDATE_USER_PHONE_NUM = 'update_user_phone_num';

/* 意见反馈
 Request:
 {
 “version”: “2.0,
 “params”: {
 “sessionId” : “adflasdfasd”,  有可能有session有可能没有,
 “content” : “我的Tab点击区域有问题，不好点” ,
 "urls":["www.yisunline.com/logo1", "www.yisunline.com/logo3"]
 }
 }
 */
export const USER_FEEDBACK = 'user_feedback';

/* 标记消息为已处理
 Request:
 {
 “version”: “2.0,
 “params”: {
 “sessionId” : “adflasdfasd”,
 “noticeId” :  “13925452134”
 }
 }
 */
export const SET_NOTICE_SOLVED = 'set_notice_solved';


/* 获取用户系统通知
 Request:
 {
     “version”: “2.0,
     “params”: {
     “sessionId” : “adflasdfasd”,
     “version”:12345 //从大于该版本开始拉取，拉取最新的消息，客户端没版本号默认传0
     }
 }
 Response:
 {
     “code”: 0,
     “result”:  {
     "version":12365458
     “data“ :	［
     {“msgId” :1234,”url”:”www.yisunline.com”,”msgTitle” : “士大夫士大夫的”,”msgType”:A,”ts”:222222,”isRead”:1,"msgLev":"G"},
     {“msgId” :1234,”url”:”www.yisunline.com”,”msgTitle” : “士大夫士大夫的”,”msgType”:A,”ts”:222222,”isRead”:1,"msgLev":"G"}
     ］
    }
 }
 */
export const FETCH_SYSTEM_MESSAGE = 'fetch_system_message';

