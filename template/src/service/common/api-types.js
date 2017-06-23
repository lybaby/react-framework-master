// 这里表示所有位于common_api目录下的API,请求方式为'common_api/.....',所有请求方式HTTP/POST JSON

/* 客户端上传图片到服务器
 Request:
 {
 “version”: “2.0,
 “params”: {
     “sessionId” : “adflasdfasd”,
     “fileName”: “test”
     "fileData":'' // 文件二进制字节流
     "module":'note|verify|imGroup' //模块名称非必填，英文的目录名称投资圈：note投顾认证：verify 群组头像：imGroup
 }
 }
 */
export const UPLOAD_IMAGE = 'upload_image';
