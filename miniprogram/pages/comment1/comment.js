var openid = swan.getStorageSync("openid");
var session_key = swan.getStorageSync("session_key");
Page({
    data: {
        inputanswer:"",
        footerbottom:0,
        answer:[]
    },
// 约拍详情信息
    loadlist:function(){
        swan.request({
            url: 'https://baidu.woohoy.com/article/'+this.data.id,
            method:"GET",
            header: {
                "Session-Key":session_key,
                'Content-Type': 'application/json'
            },
            dataType: 'json',
                success: e => {
                    console.log(e.data)
                   var card = e.data.data[0]
                   if(card.photo!==null){
                    card.photo=card.photo.split(",")
                   }
                   for(var i=1;i<e.data.data.length;i++){
                       console.log(e.data.data[i])
                       this.data.answer =this.data.answer.concat(e.data.data[i])
                   }
                   this.setData({
                       card,
                       user:card.user,
                       answer:this.data.answer
                   })
                },
                fail: er => {
                    console.log(er)
                }
        });
    },
// 获取回复内容
    inputanswer:function(e){
        this.setData({
            inputanswer:e.detail.value
        })
    },

// 改变发送按钮的位置
    onFocus:function(e){
        this.setData({
            footerbottom:e.detail.height
        })
    },
    onBlur:function(){
        this.setData({
            footerbottom:0
        })
    },

// 点击发送按钮
    answer:function(){
        swan.request({
            url:"https://baidu.woohoy.com/article",
            method:"POST",
            header: {
                "Session-Key":session_key,
                'Content-Type': 'application/json'
            },
            data:{
                "content":this.data.inputanswer,
                "parentId":this.data.id
            },
            dataType: 'json',
                success: e => {
                    console.log(e)
                },
                fail: er => {
                    console.log(er)
                }
        })
    },

    onLoad: function (option) {
        // console.log(option.id)
        this.setData({
            id:option.userId
        })
        console.log(this.data.id)
        this.loadlist()

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