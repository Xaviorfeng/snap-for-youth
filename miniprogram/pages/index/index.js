//index.js
const app = getApp()

Page({
  data: {
    input:'',
    currentId:0,
    isRelease:false,
    love:[],
    followlove:[],
    list:[],
    followlist:[],
    imageList:[],
    isReleaseShow: false,
    height: 0,
    // cardlist:[
    //     {
    //         src: '../../images/photo1.png',
    //         text: '终于见到干净的海！',
    //         user: {
    //             pic: '../../images/shareTitle2.png',
    //             name: 'Sali',
    //             position: '南京市.鼓楼区'
    //         },
    //         notlove: true
    //     },
    //     {
    //         src: '../../images/photo1.png',
    //         text: '分享今日的阳光！',
    //         user: {
    //             pic: '../../images/photo1.png',
    //             name: 'Joe',
    //             position: '南京市.鼓楼区'
    //         },
    //         notlove: true
    //     },
    //     {
    //         src: '../../images/photo1.png',
    //         text: '分享今日的阳光！',
    //         user: {
    //             pic: '../../images/photo1.png',
    //             name: 'Joe',
    //             position: '南京市.鼓楼区'
    //         },
    //         notlove: true
    //     },

    //     {
    //         src: '../../images/photo1.png',
    //         text: '终于见到干净的海！',
    //         user: {
    //             pic: '../../images/shareTitle2.png',
    //             name: 'Sali',
    //             position: '南京市.鼓楼区'
    //         },
    //         notlove: true
    //     }
    // ],
    tabs: [{
        name: '一',
        label: '推荐'
    }, {
        name: '二',
        label: '关注'
    }
],
    banner_list: [{
        "banner": [{
        "pic_url": "../../images/indexTitle.png"
        }, {
        "pic_url": "../../images/shareTitle1.png"
        }]
    }, {
        "banner": []
    }],
    activeNameOne: '一',
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    // list: [
    //     {
    //         imgSrc: '../../images/shareTitle1.png',
    //         title: '主标题文案六',
    //         subTitle: '次要信息'
    //     }
    // ],
    horizontalList: [
        {
            imgSrc: '../../images/shareTitle1.png',
            title: '标题文案'
        },
        {
            imgSrc: '../../images/shareTitle1.png',
            title: '标题文案'
        },
        {
            imgSrc: '../../images/shareTitle1.png',
            title: '标题文案'
        }
    ]
  },
  scroll: function (e) {
    if (this.data.toView == "top") {
      this.setData({
        toView: ""
      });
    }
  },
  toOthers(e){
    console.log(e.currentTarget.dataset['id']);
    var id = e.currentTarget.dataset['id'];
    //console.log(id);
    swan.navigateTo({
        url: '../others/others?userId='+id
    })
  },
  love(e){
    var session_key = app.globalData.session_key;
    //console.log(e.currentTarget.dataset['index']);
    //console.log(e.currentTarget.dataset['id']);
    const index = e.currentTarget.dataset['index'];
    const id = e.currentTarget.dataset['id'];
    //console.log(this.data.love[index]);
    var lovelist = this.data.love;
    if(this.data.love[index]==true){
        lovelist[index]=false;
    }
    else{
        lovelist[index]=true;
    }
    this.setData({
        love:lovelist
    })
    console.log(session_key);
    var that = this
    swan.request({
        url: "https://baidu.woohoy.com/article/like",
        method: 'POST',
        dataType: 'json',
        data:{
            id:id
        },
        header: {
            "Session-key":session_key,
            'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res){
            console.log(res.data);

        },
        fail: function(err){
            console.log('错误码: '+ err.errCode);
            console.log('错误信息: '+ err.errMsg);

        }
    })

  },
  love2(e){
    var session_key = app.globalData.session_key;
    //console.log(e.currentTarget.dataset['index']);
    //console.log(e.currentTarget.dataset['id']);
    const index = e.currentTarget.dataset['index'];
    const id = e.currentTarget.dataset['id'];
    //console.log(this.data.love[index]);
    var lovelist = this.data.followlove;
    if(this.data.followlove[index]==true){
        lovelist[index]=false;
    }
    else{
        lovelist[index]=true;
    }
    this.setData({
        followlove:lovelist
    })
    console.log(session_key);
    var that = this
    swan.request({
        url: "https://baidu.woohoy.com/article/like",
        method: 'POST',
        dataType: 'json',
        data:{
            id:id
        },
        header: {
            "Session-key":session_key,
            'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res){
            console.log(res.data);

        },
        fail: function(err){
            console.log('错误码: '+ err.errCode);
            console.log('错误信息: '+ err.errMsg);
        }
    })

  },
  comment(e){
      const id = e.currentTarget.dataset['id'];
      console.log(id);
      swan.navigateTo({
        url: '../comment/comment?userId='+id
    })
  },
  submit(e){
    var session_key = app.globalData.session_key;
    var content = this.data.input;
    var id = this.data.currentId;
    console.log(content)
    console.log(id);
    var that = this;
    if(content){
    swan.request({
        url: "https://baidu.woohoy.com/article",
        method: 'POST',
        dataType: 'json',
        data:{
            parentId:id,
            content:content,
        },

        header: {
            "Session-key":session_key,
            'content-type': 'application/json'
        },
        success: function(res){
            console.log(res.data);
        },
        fail: function(err){
            console.log('错误码: '+ err.errCode);
            console.log('错误信息: '+ err.errMsg);

        }
    })
}
    this.setData({
        isRelease:false
    })
  },
  transmit(e){
    var session_key = app.globalData.session_key;
    //console.log(e.currentTarget.dataset['index']);
    console.log(e.currentTarget.dataset['id']);
    const id = e.currentTarget.dataset['id'];
    //console.log(this.data.love[index]);
    //console.log(session_key);
    var that = this
    swan.request({
        url: "https://baidu.woohoy.com/article/forward",
        method: 'POST',
        dataType: 'json',
        data:{
            id:id
        },
        header: {
            "Session-key":session_key,
            'content-type': 'application/x-www-form-urlencoded'
        },
        success: function(res){
            console.log(res.data);

        },
        fail: function(err){
            console.log('错误码: '+ err.errCode);
            console.log('错误信息: '+ err.errMsg);

        }
    })
  },
  toRelease(e){
        swan.navigateTo({
            url:'../post/post'
        })
  },
  todetail(e){
    const index = e.currentTarget.dataset['index'];
    const id = this.data.list[index].userId;
    // console.log(id);
    // console.log(index);
    swan.navigateTo({
        url: '../detail/detail?params='+index+'&userId='+id
    })
  },
  onLoad: function() {
    if (!swan.cloud) {
      swan.redirectTo({
        url: '../chooseLib/chooseLib',
      })
      return
    }
    var that = this
    swan.request({
        url: "https://baidu.woohoy.com/article",
        method: 'GET',
        dataType: 'json',
        data:{},
        header: {
            'content-type':'application/json'
        },
        success: function(res){
            var l = res.data.data.list
            for(let i=0;i<l.length;i++){
                that.data.love.push(false);
                if(l[i].photo!=null)
                    l[i].photo = l[i].photo.split(",");
            }
            that.setData({
                list:res.data.data.list
            })
            //console.log(that.data.love);
            //console.log(that.data.list[1].photo);

        },
        fail: function(err){
            console.log('错误码: '+ err.errCode);
            console.log('错误信息: '+ err.errMsg);

        }

    })
    swan.request({
        url: "https://baidu.woohoy.com/article",
        method: 'GET',
        dataType: 'json',
        data:{},
        header: {
            'content-type':'application/json'
        },
        success: function(res){
            var l = res.data.data.list
            for(let i=0;i<l.length;i++){
                that.data.followlove.push(false);
                if(l[i].photo!=null)
                    l[i].photo = l[i].photo.split(",");
            }
            that.setData({
                followlist:res.data.data.list
            })
            //console.log(that.data.list);
            //console.log(that.data.list[1].photo);

        },
        fail: function(err){
            console.log('错误码: '+ err.errCode);
            console.log('错误信息: '+ err.errMsg);

        }
    })
    // 获取用户信息
    swan.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          swan.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetUserid: function() {
    // 调用云函数
    swan.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user userid: ', res.result.userid)
        app.globalData.userid = res.result.userid
        swan.navigateTo({
          url: '../userConsole/userConsole',
        })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        swan.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })
  },
  bindInput(e){
    var value=e.detail.value
    console.log(value)
    this.setData({
        input:value
    })
  },
  tabsOne(e) {
      console.log(this.data.activeNameOne);
    this.setData({
        content: e.detail.name,
        activeNameOne: e.detail.name
    })
},
  // 上传图片
  doUpload: function () {
    // 选择图片
    swan.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {

        swan.showLoading({
          title: '上传中',
        })

        const filePath = res.tempFilePaths[0]

        // 上传图片
        const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
        swan.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res, cloudPath, filePath)

            app.globalData.fileID = res.fileID
            app.globalData.cloudPath = cloudPath
            app.globalData.imagePath = filePath

            swan.navigateTo({
              url: '../storageConsole/storageConsole'
            })
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            swan.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            swan.hideLoading()
          }
        })

      },
      fail: e => {
        console.error(e)
      }
    })
  },
})
