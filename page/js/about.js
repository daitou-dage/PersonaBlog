var blogComments = new Vue({
    el:"#blog_comments",
    data:{
        total:0,
        comments:[{
            id:"",
            name:"",
            ctime:"",
            comments:"",
            options:""
        }]
    },
    computed:{
        reply:function(){
            return function(commentId,userName){
                document.getElementById("comment_reply").value = commentId;
                document.getElementById("comment_reply_name").value = userName;
            }
        }
    },
    created:function(){
        var bid = -1;
        for (var i = 0; i < searcheUrlParams.length; i++) {
            if (searcheUrlParams[i].split("=")[0] == "bid"){
                try {
                    bid = parseInt(searcheUrlParams[i].split("=")[1]);
                }catch (e) {
                    console.log(e);
                }
            }
        }
        axios({
            method:"get",
            url:"/queryCommentsByBlogId?bid=" + bid
        }).then(function(resp){
            blogComments.comments = resp.data.data;
            for (var i = 0; i < blogComments.comments.length; i++) {
                if (blogComments.comments[i].parent > -1){
                    blogComments.comments[i].options = "回复@" + blogComments.comments[i].parent_name;
                }
            }
        });
        axios({
            method:"get",
            url:"/queryCommentsCountByBlogId?bid=" + bid
        }).then(function(resp){
            blogComments.total = resp.data.data[0].count;
        });

    }
})