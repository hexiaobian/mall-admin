import axios from '../axios/axios';
export default {
  /**
   * 登录
   * @param {Object} data 
   */
  login(data) {
    return axios({
      method: 'post',
      url: '/passport/login',
      data
    });
  },
  /**
   * 注册
   * @param {Object} data 
   */
  register(data) {
    return axios({
      method: 'post',
      url: '/passport/logon',
      data
    })
  },
  /**
   * 获取商品类目
   * @param {Object} params 
   */
  getCategoryList(params) {
    return axios({
      method: 'get',
      url: '/category/all',
      params
    })
  },
  /**
   * 获取所有商品列表（可分页）
   * @param {*} params 
   */
  getProducts(params) {
    return axios({
      method: 'get',
      url: '/products/all',
      params
    })
  },
  /**
   * 编辑单个商品
   * @param {*} data 
   */
  editProduct(data) {
    return axios({
      method: 'put',
      url: '/products/edit',
      data
    })
  },
  /**
   * 删除单个商品
   * @param {*} id 
   */
  removeProduct(id) {
    return axios({
      method: 'delete',
      url: '/products/' + id,
    })
  },
  /**
   * 得到单个商品信息
   * @param {*} id 
   */
  getProductInfo(id) {
    return axios({
      method: 'get',
      url: '/products/' + id
    })
  },
  addProductInfo(data) {
    return axios({
      method: 'post',
      url: '/products/add',
      data
    })
  }
}
