/**
 * 用户角色权限控制
 */
const roleTORoute = {
  "coustomer": [{
      name: 'Product'
    },
    {
      name: 'ProductList'
    },
    {
      name: 'ProductAdd'
    },
    {
      name: 'ProductEdit'
    }
  ],

  "admin": [{
      name: 'Product'
    },
    {
      name: 'ProductList'
    },
    {
      name: 'ProductAdd'
    },
    {
      name: 'Category'
    },
    {
      name: 'ProductEdit'
    },
  ]
}


/**
 * 过滤无权限的路由
 * @param {String} role 
 * @param {Array} routes 
 */
export default function getMenuRoute(role, routes) {
  const allowRoutesName = roleTORoute[role].map(r => r.name)
  const resultRoute = routes.filter(r => {
    if (allowRoutesName.includes(r.name)) {
      r.children = r.children.filter(c => allowRoutesName.includes(c.name))
      return true
    }
    return false
  })
  return resultRoute
}
