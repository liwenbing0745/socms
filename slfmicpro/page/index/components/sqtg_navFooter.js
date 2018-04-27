// page/sqtg/sqtg_navFooter.js
Component({
    /**
    * 组件的属性列表
    */
    properties: {
        imgIndex: {
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
          img: '/imgs/tabBar/home_1.png',
          img_one: '/imgs/tabBar/home_2.png',
          linkUrl: '/page/index/index',
          select: 'select'
      },
      {
          id: 1,
          text: '分类',
          img: '/imgs/tabBar/iconf_05.png',
          img_one: '/imgs/tabBar/iconfs_03.png',
          linkUrl: '/page/index/search',
          select: 'select'
      },
      {
          id: 2,
          text: '购物车',
          img: '/imgs/tabBar/cart_2.png',
          img_one: '/imgs/tabBar/cart_1.png',
          linkUrl: '/page/shop/shop',
          select: 'select'
      },
      {
          id: 3,
          text: '我的',
          img: '/imgs/tabBar/mine_1.png',
          img_one: '/imgs/tabBar/mine_2.png',
          linkUrl: '/page/sqtg/per_PersonCenter',
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
        }
    }
})
