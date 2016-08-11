/**
 * ajax
 * author:JM
 * Released on: August 11, 2016
 */
function ajax(param){
    var xhr;
    if(typeof XMLHttpRequest != 'undefined'){
        xhr =  new XMLHttpRequest();
    }else if(typeof ActiveXObject != 'undefined'){
        var version = [
            "MSXML2.XMLHttp.6.0",
            "MSXML2.XMLHttp.3.0",
            "MSXML2.XMLHttp"
        ];
        for (var i=0;i< version.length;i++){
            try{
                xhr = new ActiveXObject(version[i]);
            }catch (e){
                //跳过
            }
        }
    }else{
        throw new Error("Your browser don't support SHR object !");
    }
    var url = param.url;
    var data = (function(data){
        var arr = [];
        for(var i in data){
            arr.push(encodeURIComponent(i) + "=" + encodeURIComponent(data[i]));
        }
        return arr.join("&");
    })(param.data);
    var type = param.type || 'GET';
    if(type.toUpperCase() === 'GET'){
        url += url.indexOf("?") == "-1"? "?"+ data:"&"+data;
    }
    var async = typeof param.async === 'undefined'? true : param.async;
    //异步
    if(async === true){
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    param.success(xhr.responseText);
                }else{
                    param.error(xhr);
                }
            }
        }
    }
    xhr.open(type,url,async);
    if(type.toUpperCase() === 'POST'){
        xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        xhr.send(data);
    }else{
        xhr.send(null);
    }
    //同步
    if(async === false) {
        if (xhr.status == 200) {
            param.success(xhr.responseText);
        } else {
            param.error(xhr);
        }
    }
}
// readyState有五种状态：
// 0 (未初始化)： (XMLHttpRequest)对象已经创建，但还没有调用open()方法；
// 1 (载入)：已经调用open() 方法，但尚未发送请求；
// 2 (载入完成)： 请求已经发送完成；
// 3 (交互)：可以接收到部分响应数据；
// 4 (完成)：已经接收到了全部数据，并且连接已经关闭。

// 如此一来，你应该就能明白readyState的功能，而status实际是一种辅状态判断，只是status更多是服务器方的状态判断。关于status，由于它的状态有几十种，我只列出平时常用的几种：
// 100——客户必须继续发出请求
// 101——客户要求服务器根据请求转换HTTP协议版本
// 200——成功
// 201——提示知道新文件的URL
// 300——请求的资源可在多处得到
// 301——删除请求数据
// 404——没有发现文件、查询或URl
// 500——服务器产生内部错误
