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

const KeyuanDetails = (resolve) => {
  import('components/details/keyuandetails').then((module) => {
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
    path: '/secondhandhouse',
    component: RecommendList,
    meta: { keepAlive: true },
    name: 'recommendList'
  }, {
    path: '/secondkeyuan',
    component: Keyuan,
    meta: { keepAlive: true },
    name: 'keyuan'
  }, {
    path: '/secondaddkeyuan',
    name: 'addkeyuan',
    component: Addkeyuan
  }, {
    path: '/secondaddfangyuan',
    name: 'addfangyuan',
    component: Addfangyuan
  }, {
    path: '/seconddetail',
    name: 'detail',
    component: Details
  }, {
    path: '/secondkeyuandetail',
    name: 'keyuandetail',
    component: KeyuanDetails
  }, {
    path: '/secondprojectlist',
    name: 'projectlist',
    component: MyProjectList,
    meta: { keepAlive: true }
  }
]
