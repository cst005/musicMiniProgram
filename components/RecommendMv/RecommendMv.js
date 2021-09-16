// components/RecommendMv/RecommendMv.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    newMvList: {
      type: Array,
      value: []
    },
    currentMonth:{
      type:String,
      value:''
    },
    currentDay:{
      type:String,
      value:''
    },mvRankingList:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    tabs: [{
        id: 0,
        name: "内地",
        isActive: true
      },
      {
        id: 0,
        name: "港台",
        isActive: false
      }, {
        id: 0,
        name: "欧美",
        isActive: false
      }, {
        id: 0,
        name: "韩国",
        isActive: false
      }, {
        id: 0,
        name: "日本",
        isActive: false
      }
    ],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleItemChange(e) {
      const {
        index
      } = e.detail;
      let {
        tabs
      } = this.data;
      tabs.forEach((v, i) => i == index ? v.isActive = true : v.isActive = false);
      this.setData({
        tabs
      })
    },
  }
})