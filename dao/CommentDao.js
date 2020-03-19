var dbutil = require("./DBUtil");

function insertComment(blogId,parent,parentName,userName,email,comments,ctime,utime,success){
    var insertSql = "insert into Comments (`blog_id`,`parent`,`parent_name`,`user_name`,`email`,`comments`,`ctime`,`utime`) values (?,?,?,?,?,?,?,?);";
    var params = [blogId,parent,parentName,userName,email,comments,ctime,utime];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,params,function(error,result){
        if (error == null){
            success(result);
        }else{
            console.log(error);
        }
    })
    connection.end();
}

function queryCommentsByBlogId(blogId,success){
    var querySql = "select * from comments where blog_id = ?;"
    var params = [blogId];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,function(error,result){
        if (error == null){
            success(result);
        }else{
            console.log(error);
        }
    })
    connection.end();
}

function queryCommentsCountByBlogId(blogId,success){
    var querySql = "select count(1) as count from comments where blog_id = ?;";
    var params = [blogId];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,function(error,result){
        if (error == null){
            success(result);
        }else{
            console.log(error);
        }
    })
    connection.end();
}

module.exports = {
    insertComment,
    queryCommentsByBlogId,
    queryCommentsCountByBlogId
};