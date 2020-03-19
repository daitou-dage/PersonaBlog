const random_tags = new Vue({
    el:"#random_tags",
    data:{
        tags:["熊大","熊二","光头强","佩奇","乔治","托马斯","毛毛","笨笨"]
    },
    computed:{
        randomColor(){
            return function (){
                let red = Math.random() * 255 + 50;
                let green = Math.random() * 255 + 50;
                let blue = Math.random() * 255 + 50;
                return "rgb(" + red + "," + green + "," + blue + ")";
            }
        },
        randomSize(){
            return function (){
                let font = Math.random() * 20 + 5;
                return font + "px";
            }
        }
    }
});
const newHot = new Vue({
    el:"#new_hot",
    data:{
        titleList:[
            {title:"使用码云git的webhook实现生产环境代",link:'http://www.baidu.com'},
            {title:"VirtualBox压缩vmdk、vagrant打包b",link:'http://www.baidu.com'},
            {title:"初烧盲狙一条铁三角e40",link:'http://www.baidu.com'},
            {title:"树莓派安装homebridge小记",link:'http://www.baidu.com'},
            {title:"查看你的AWS服务器已使用流量",link:'http://www.baidu.com'},
            {title:"更新PC端微信(2.6.7.57)防撤回",link:'http://www.baidu.com'}
        ]
    }
});
const newComments = new Vue({
    el:"#new_comments",
    data:{
        commentList:[
            {name:'泰迪',date:'1周前',content:'今天天气不错，挺风和日丽的'},
            {name:'迪迦',date:'2周前',content:'我们下午没有课，天气也挺爽的'},
            {name:'忍者龟',date:'5周前',content:'一大早我早早的跑去上自习'}
        ]
    }
})