module.exports  = { 
 
  login: ({ userName, password }, ctx) => ctx.setToken([100, 200, 300]).return(true),

  create: (user, ctx) => user,

  update: (dto, ctx) => [ctx.token.userId, ctx.token.orgId, ctx.token.versionId],

  ping: (data) => true,

  asyn: (data, ctx) => {
    setTimeout(() => ctx.return("setTimeout 1000"), 1000)
  },

  err: () => {
    throw {code: "100", message: "throw error"}
  },
}
 
