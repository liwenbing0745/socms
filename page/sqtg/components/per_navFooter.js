// page/sqtg/sqtg_navFooter.js
Component({
    /**
    * 组件的属性列表
    */
    properties: {
        imgIndex: {
            type: Number,
            value: 0
        },
        Cartcount: {
            type: Number,
            value: 0
        }
    },

    /**
    * 组件的初始数据
    */
    data: {
        navList: [
      {
          id: 0,
          text: '首页',
          img: '/imgs/tabBar/xcx_footer_img_01_01.png',
          img_one: '/imgs/tabBar/xcx_footer_img_01_02.png',
          linkUrl: '/page/sqtg/sqtg_index',
          select: 'select'
      },
      {
          id: 1,
          text: '去结算',
          img: '/imgs/tabBar/xcx_footer_img_02_01.png',
          img_one: '/imgs/tabBar/xcx_footer_img_02_02.png',
          linkUrl: '/page/sqtg/sqtg_cart',
          select: 'select'
      },
      {
          id: 2,
          text: '我的',
          img: '/imgs/tabBar/xcx_footer_img_03_01.png',
          img_one: '/imgs/tabBar/xcx_footer_img_03_02.png',
          linkUrl: '/page/sqtg/sqtg_PersonCenter',
          select: 'select'
      }
      
    ]
    },
    
    /**
    * 组件的方法列表
    */
    methods: {
        toTab: function (event) {
            var inx = event.currentTarget.dataset.index;
            this.triggerEvent('NavTab', {})
            this.setData({
                imgIndex: inx
            })
        },
        // tapnav: function (event) {
        //     var inx = event.currentTarget.dataset.id;
        //     wx.redirectTo({ url: inx });
        // }
    }
})
