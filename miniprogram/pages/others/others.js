var session_key = swan.getStorageSync("session_key");
Page({
    data: {
        image:'',
        bio:'',
        location:'',
        nickname:'',
        list:[]
    },
    onLoad: function (options) {
        // 监听页面加载的生命周期函数
        var id = options.userId;
        console.log(id);
        var that = this
        swan.request({
            url: "https://baidu.woohoy.com/user/"+id,
            method: 'GET',
            dataType: 'json',
            data:{
            },
            header: {
                "Session-key":session_key,
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res){
                console.log(res.data)
                that.setData({
                    image:res.data.data.avatarUrl,
                    bio:res.data.data.bio,
                    location:res.data.data.location,
                    nickname:res.data.data.nickname
                })
            },
            fail: function(err){
                console.log('错误码: '+ err.errCode);
                console.log('错误信息: '+ err.errMsg);
            }
        })
        swan.request({
            url: "https://baidu.woohoy.com/article/user/"+id,
            method: 'GET',
            dataType: 'json',
            data:{
            },
            header: {
                "Session-key":session_key,
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function(res){
                console.log(res.data.data.list)
                var l = res.data.data.list
                for(let i=0;i<l.length;i++){
                    if(l[i].photo!=null)
                        l[i].photo = l[i].photo.split(",");
                }
                that.setData({
                    list:res.data.data.list
                })
            },
            fail: function(err){
                console.log('错误码: '+ err.errCode);
                console.log('错误信息: '+ err.errMsg);
            }
        })
    },
    onReady: function() {
        // 监听页面初次渲染完成的生命周期函数
    },
    onShow: function() {
        // 监听页面显示的生命周期函数
    },
    onHide: function() {
        // 监听页面隐藏的生命周期函数
    },
    onUnload: function() {
        // 监听页面卸载的生命周期函数
    },
    onPullDownRefresh: function() {
        // 监听用户下拉动作
    },
    onReachBottom: function() {
        // 页面上拉触底事件的处理函数
    },
    onShareAppMessage: function () {
        // 用户点击右上角转发
    }
});