//app.js
App({
  globalData: {
    code:'',
    openid:'',
    session_key:'',
    avatarUrl:'',
    nickname:''
  },
  onLaunch: function () {
    let that = this;
    swan.login({
        success: function(res){
            //console.log(res.code);
            let code = res.code
            //console.log(this.data.code);
            if (res.code) {
              //发起网络请求
              swan.request({
                url: "https://baidu.woohoy.com/user/authorization",
                method: 'POST',
                dataType: 'json',
                data:{
                    code: code
                },
                header: {
                    // 'content-type':'application/json',
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: function(res){
                    const openid = res.data.data.openid;
                    const session_key = res.data.data.session_key;
                    that.globalData.openid=openid
                    that.globalData.session_key=session_key
                    //console.log(that.globalData.openid)
                },
                fail: function(err){
                    console.log('错误码: '+ err.errCode);
                    console.log('错误信息: '+ err.errMsg);
                }
            })
            //console.log(that.globalData.openid)
    //         swan.request({
    //             url: "https://baidu.woohoy.com/user/login",
    //             method: 'POST',
    //             dataType: 'json',
    //             data:{
    //                 openId: that.globalData.openid
    //             },
    //             header: {
    //                 'content-type':'application/json'
    //             },
    //             success: function(res){
    //                 console.log(res.data);
    //             },
    //             fail: function(err){
    //                 console.log('错误码: '+ err.errCode);
    //                 console.log('错误信息: '+ err.errMsg);
    //             }
    //         })
            }
            else {
              console.log('获取用户登录态失败！' + res.errMsg)
            }
        }
    })

    if (!swan.cloud) {
      console.error('请使用 3.105.2 或以上的基础库以使用云能力')
    } else {
      swan.cloud.init({
        traceUser: true,
        // env: '这里是你的env id'
      })
    }

    this.globalData = {}
  }
})
