const RecommendList = (resolve) => {
  import('components/recommendList/recommendList').then((module) => {
    resolve(module)
  })
}

const Keyuan = resolve => {
  import('components/keyuan/keyuan').then(module => {
    resolve(module)
  })
}

const Details = (resolve) => {
  import('components/details/details').then((module) => {
    resolve(module)
  })
}

const Addkeyuan = resolve => {
  import('components/addProject/addkeyuan').then(module => {
    resolve(module)
  })
}

const Addfangyuan = resolve => {
  import('components/addProject/addfangyuan').then(module => {
    resolve(module)
  })
}

const SearchList = (resolve) => {
  import('components/search/search').then((module) => {
    resolve(module)
  })
}

const MyProjectList = (resolve) => {
  import('components/projectlist/projectlist').then((module) => {
    resolve(module)
  })
}

export default [
  {
    path: '/',
    component: RecommendList,
    meta: { keepAlive: true }
  }, {
    path: '/recommend',
    component: RecommendList,
    meta: { keepAlive: true },
    name: 'recommendList'
  }, {
    path: '/keyuan',
    component: Keyuan,
    meta: { keepAlive: true },
    name: 'keyuan'
  }, {
    path: '/addkeyuan',
    name: 'addkeyuan',
    component: Addkeyuan
  }, {
    path: '/addfangyuan',
    name: 'addfangyuan',
    component: Addfangyuan
  }, {
    path: '/detail',
    name: 'detail',
    component: Details
  }, {
    path: '/search',
    name: 'search',
    component: SearchList
  }, {
    path: '/projectlist',
    name: 'projectlist',
    component: MyProjectList,
    meta: { keepAlive: true }
  }
]
