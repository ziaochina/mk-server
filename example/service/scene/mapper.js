//mapper文件中只写SQL语句
exports.countByAppId = 'SELECT userId,COUNT(*) count FROM sys_scene GROUP BY userId'
