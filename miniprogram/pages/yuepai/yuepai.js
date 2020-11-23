var openid = swan.getStorageSync("openid");
var session_key = swan.getStorageSync("session_key");


Page({
    data: {
        userID:-1,
        list:[],
        id:0,

    },

    like:function(e){
        // console.log(e)
        swan.checkSession({
            success: res => {
                console.log(e.detail.index)
        var islikeindex=e.detail.index+""
        if(this.data.list[islikeindex].islike==false){
            this.data.list[islikeindex].islike=true
        }else{
            this.data.list[islikeindex].islike=false
        }

        this.setData({
            id:e.detail.id,
            list:this.data.list
        })

        if(this.data.list[islikeindex].islike==true){
            console.log(this.data.list[islikeindex].islike)
            swan.request({
                url: 'https://baidu.woohoy.com/article/like',
                method:"POST",
                header: {
                    "Session-Key":session_key,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data:{
                    "id":this.data.id
                },
                dataType: 'json',
                    success: e => {
                        console.log(e)
                        e.data.data.islike=true

                    },
                    fail: er => {
                        console.log(er)
                    }
            });
        }else{
            console.log(this.data.list[islikeindex].islike)
            swan.request({
                url: 'https://baidu.woohoy.com/article/unlike',
                method:"POST",
                header: {
                    "Session-Key":session_key,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data:{
                    "id":this.data.id
                },
                dataType: 'json',
                    success: e => {
                        console.log(e)
                        e.data.data.islike=false
                    },
                    fail: er => {
                        console.log(er)
                    }
            });
        }

            },
            fail: err => {
                swan.showToast({
                    title: '请先登录',
                    icon:"none"
                });
            }
        });


    },

// 跳到用户详情页面
    lookuser:function(e){

        swan.navigateTo({
            url: '../../pages/user/user?id='+e.detail
        });
    },

// 跳到发布页面
    add:function(){
        swan.checkSession({
            success: res => {

                swan.navigateTo({
                    url: '../../pages/fabu/fabu'
                });
                console.log(res)
            },
            fail: err => {
                swan.showToast({
                    title: '您还未登录',
                    icon:"none"
                });

            }
        });

    },

// 点击查看约拍详情信息
    gotalk:function(e){


        console.log(e)
        if(e.detail.islike==true){
            this.setData({
                id:e.detail.id,
                islike:"1"
            })
        }else{
            this.setData({
                id:e.detail.id,
                islike:""
            })
        }

        swan.navigateTo({
            url: `../../pages/comment/comment?id=${this.data.id}&islike=${this.data.islike}`
        });
    },

// 加载约拍列表
loadyuepailist:function(page=1,size=10){
    swan.request({
            url: 'https://baidu.woohoy.com/article',
            method:"GET",
            header: {
                "Session-Key":session_key,
                'Content-Type': 'application/json'
            },
            data:{
                page,
                size
            },
            dataType: 'json',
                success: e => {

                    console.log(e)
                    var list = e.data.data.list
                    if(e.data.code==200){
                        swan.showLoading({
                            title: '拼命加载中'
                        });
                        console.log(this.data.userID)
                    for(let i = 0;i<list.length;i++){
                        if(list[i].photo !== null){
                            list[i].photo = list[i].photo.split(",");
                        }
                        if(list[i].likeUserId !== null){
                            list[i].likeUserId = list[i].likeUserId.split(",");
                        }                    
                        // console.log(list[i])
                        if(list[i].likeUserId!==null){
                            // console.log(list[i].likeUserId)
                            for(let j=0;j<list[i].likeUserId.length;j++){


                                if(list[i].likeUserId[j] == this.data.userID){
                                    list[i].islike=true
                                }else{
                                    list[i].islike=false
                                }
                            }
                        }else{
                            list[i].islike=false
                        }
                    }

                    this.setData({
                        list:this.data.list.concat(list)
                    })
                    // console.log(this.data.list)

                    swan.hideLoading();
                    swan.stopPullDownRefresh();
                    }else{
                        swan.showToast({
                            title: '请先登录',
                            icon:"none"
                        });
                    }

                },
                fail: er => {
                    console.log(er)
                }
        });
},

    onLoad: function () {
        // 监听页面加载的生命周期函数

        // this.setData({
        //     userid
        // })

    },



    onReady: function() {
        // 监听页面初次渲染完成的生命周期函数
    },
    onShow: function() {
        var userID = swan.getStorageSync("userid");
        if(userID!==""){
            this.setData({
                userID,
                list:[]
            })
        }
        this.loadyuepailist(1,10)
    },
    onHide: function() {
        // 监听页面隐藏的生命周期函数
    },
    onUnload: function() {
        // 监听页面卸载的生命周期函数
    },
    onPullDownRefresh: function() {
        // 监听用户下拉动作
        this.setData({
            list:[],
        })
        this.loadyuepailist(1,10)
    },
    onReachBottom: function() {
        // 页面上拉触底事件的处理函数
        this.loadyuepailist(this.data.list.length/10+1,10)
    },
    onShareAppMessage: function (e) {
        console.log(e)
        let yuepailist = e.target.dataset.blog
        return{
            title:yuepailist.content,
            path:"/pages/yuepai/yuepai?id="+yuepailist.id
        }
        // 用户点击右上角转发
    }
});