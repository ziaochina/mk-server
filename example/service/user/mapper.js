//mapper文件中只写SQL语句
exports.countByAppId = 'SELECT appId,COUNT(*) count FROM sys_user GROUP BY appId'
