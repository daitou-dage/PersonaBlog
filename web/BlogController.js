var blogDao = require("../dao/BlogDao");
var tagsDao = require("../dao/TagsDao");
var tagBlogMappingDao = require("../dao/TagBlogMappingDao");
var timeUtil = require("../util/TimeUtil");
var respUtil = require("../util/RespUtil");
var url = require("url");

var path = new Map();

function queryBlogById(request,response){
    var params = url.parse(request.url,true).query;
    blogDao.queryBlogById(parseInt(params.bid), function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    });
}
path.set("/queryBlogById",queryBlogById);

function queryBlogCount(request,response){
    blogDao.queryBlogCount(function(result){
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    });
}
path.set("/queryBlogCount",queryBlogCount);

function queryBlogByPage(request,response){
    var params = url.parse(request.url,true).query;
    blogDao.queryBlogByPage(parseInt(params.page),parseInt(params.pageSize),function(result){
        for (var i = 0; i < result.length; i++) {
            //将图片变成数据流
            result[i].content = result[i].content.replace(/<img[\w\W]*">/,"");
            //过滤掉图片的数据流
            result[i].content = result[i].content.replace(/<[\w\W]{1,5}>/g,"");
            //标题至多显示300个字符
            result[i].content = result[i].content.substring(0,300);
        }
        response.writeHead(200);
        response.write(respUtil.writeResult("success","查询成功",result));
        response.end();
    })
}
path.set("/queryBlogByPage",queryBlogByPage);

//插入博客文章
function editBlog(request,response){
    var params = url.parse(request.url,true).query;
    var tags = params.tags.replace(/ /g,"").replace("，",",");    //处理中文和英文的逗号
    request.on("data",function(data){
        blogDao.insertBlog(params.title,data.toString(),0,tags,timeUtil.getNow(),timeUtil.getNow(),function(result){
            response.writeHead(200);
            response.write(respUtil.writeResult("success","添加成功",null));
            response.end();
            var blogId = result.insertId;
            var tagList = tags.split(",");
            for (var i = 0; i < tagList.length; i++) {
                if (tagList[i] == "") {
                    continue;
                }
                queryTag(tagList[i],blogId);
            }
        })
    })
}
path.set("/editBlog",editBlog);

//查询标签存不存在，不存在就创建标签，存在就映射出去。
function queryTag(tag,blogId){
    tagsDao.queryTag(tag,function(result){
        if (result == null || result.length == 0) {
            insertTag(tag,blogId);
        } else {
            tagBlogMappingDao.insertTagBlogMapping(result[0].id,blogId);
        }
    })
}
//创建标签
function insertTag(tag,blogId){
    tagsDao.insertTag(tag,timeUtil.getNow(),timeUtil.getNow(),function(result){
        insertTagBlogMapping(result.insertId,blogId,timeUtil.getNow(),timeUtil.getNow(),function(result){});
    })
}
//窗前标签映射
function insertTagBlogMapping(tagId,blogId){
    tagBlogMappingDao.insertTagBlogMapping(tagId,blogId,timeUtil.getNow(),timeUtil.getNow(),function(result){});
}
module.exports.path = path;