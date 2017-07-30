module.exports = {
  "interface": "com.rrtimes.user.itf.IAppService",
  "methodSignature": {
    "delete": (id) => (java) => [ {"$class": "java.lang.Long", "$": id} ],
    "queryAll": () => (java) => [  ],
    "findByAppDomain": (appDomain) => (java) => [ {"$class": "java.lang.String", "$": appDomain} ],
    "checkAppSecret": (id, md5Secret) => (java) => [ {"$class": "java.lang.Long", "$": id}, {"$class": "java.lang.String", "$": md5Secret} ],
    "checkNameIsExists": (appName) => (java) => [ {"$class": "java.lang.String", "$": appName} ],
    "findAppIdByAppDomain": (appDomain) => (java) => [ {"$class": "java.lang.String", "$": appDomain} ],
    "findByOrgId": (orgId) => (java) => [ {"$class": "java.lang.Long", "$": orgId} ],
    "queryById": (appId, withScrept) => (java) => [ {"$class": "java.lang.Long", "$": appId}, {"$class": "java.lang.Boolean", "$": withScrept} ],
    "queryById": (appId) => (java) => [ {"$class": "java.lang.Long", "$": appId} ],
    "update": (dto) => (java) => [ {"$class": "com.rrtimes.rap.vo.DTO", "$": dto} ],
    "delete": (dto) => (java) => [ {"$class": "com.rrtimes.rap.vo.DTO", "$": dto} ],
    "create": (dto) => (java) => [ {"$class": "com.rrtimes.rap.vo.DTO", "$": dto} ],
    "query": (dto) => (java) => [ {"$class": "com.rrtimes.rap.vo.DTO", "$": dto} ],
    "createBatch": (dtos) => (java) => [ {"$class": "java.util.List", "$": dtos} ],
    "queryByPrimaryKey": (key) => (java) => [ {"$class": "java.lang.Long", "$": key} ],
    "queryByPrimaryKey": (dto) => (java) => [ {"$class": "com.rrtimes.rap.vo.DTO", "$": dto} ],
    "deleteBatchByPrimaryKey": (dtos) => (java) => [ {"$class": "java.util.List", "$": dtos} ],
    "queryByWhereSql": (whereSql) => (java) => [ {"$class": "java.lang.String", "$": whereSql} ],
    "deleteBatch": (dtos) => (java) => [ {"$class": "java.util.List", "$": dtos} ],
  }
}
