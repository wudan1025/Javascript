/* 
 * 使用ajax「返回的都是Promise实例」
 *   ajax([config])
 *   ajax.get/delete/head/options(url,[config])
 *   ajax.post/put/patch(url,data,[config])
 *   ajax.all([promises])
 *   -----
 *   ajax.defaults.xxx='xxx'
 *   ajax.interceptors.request/response.use()
 *   
 * config
 *   baseURL:String,
 *   url:String, 「required」
 *   method:String,
 *   transformRequest:Function,
 *   headers:Object,  ->{post:{},get:{},...}
 *   params:String/Object,
 *   cache:Boolean,
 *   data:String/Object,
 *   timeout:Number,
 *   withCredentials:Boolean,
 *   responseType:String,
 *   validateStatus:Function
 * 
 * 返回结果
    成功 response={
         status,
         statusText,
         xhr,
         config,
         headers:{...},
         body:...
    } 

    失败 reason={
        code:标识,
        xhr,
        config,
        response:同上
    }   
 */