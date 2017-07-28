module.exports  = { 

  helloworld: () => "hello world",

  ping: (data) => data,

  asyn: (data, ctx) => {
    setTimeout(() => ctx.return("setTimeout 1000"), 1000)
  },

  err: () => {
    throw {code: "100", message: "throw error"}
  },

  login: (data, ctx) => ctx.return(true),

  create: (user, ctx) => user,

}
 
