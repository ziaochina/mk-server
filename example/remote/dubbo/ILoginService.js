module.exports =
{
  "interface": "com.rrtimes.user.itf.ILoginService",
  "methodSignature": {
    "login": (sysUser) => (java) => [ {"$class": "com.rrtimes.user.vo.SysUser", "$": sysUser} ],
    "Ping": (type, value) => (java) => [ {"$class": "java.lang.String", "$": type}, {"$class": "[int", "$": value} ],
  }
}
