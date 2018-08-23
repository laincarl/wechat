import store from '../../stores/UserStore';
import { observer } from "../../utils/observer";
Component(observer({ store/*,otherStore*/ })({
  properties: {
    
    title: {            // 属性名
      type: String,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '标题'     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
   
    price: {
      type: Number,
      value: 0
    },
  },

  data: {

  },
  //事件处理函数

  onLoad: function () {

  },
}))
