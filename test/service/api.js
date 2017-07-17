exports.api = {

  helloworld: () => "hello world",

  ping: (data) => {
  	return data;
  },

  asyn: (data, ctx) => {
    setTimeout(() => ctx.return("setTimeout 1000"), 1000)
  },

  err: () => {
    throw {code: "100", message: "throw error"}
  },

  token: (data, ctx) => ctx.token("this is a token.").return(true),

}
