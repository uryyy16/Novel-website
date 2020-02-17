$(function () {
    var $swap = 0;
    $(".shun").click(function () {
        if($swap == 0){
            $(".snr").stop().fadeIn(100);
            $swap = 1;
        }else{
            $(".snr").stop().fadeOut(100);
            $swap = 0;
        }
    })
    //获取排行榜信息（分页）
    function getPHB(){
        $.ajax({
            type:"",
            url:"",
            success: function (msg) {
                $.each(msg,function (key,value) {
                      //创建节点
                    var $newphb = $("<li>\n" +
                        "                    <div class=\"bookList\">\n" +
                        "                        <div class=\"bookNum\">"+key+"</div>\n" +
                        "                        <div class=\"bookName\">霸道总裁爱上我</div>\n" +
                        "                        <div class=\"detail\"><button name=\"detail\">查看详情</button></div>\n" +
                        "                    </div>\n" +
                        "                </li>")

                    //插入节点
                    var $paihb = $(".pai ul");
                    $paihb.prepend($newphb);
                })
            }
        })
    }
    getPHB();
    //注册功能实现
    $(".btn").click(function () {
        var $userName = $(".user").val();
        var $password = $(".re_password").val();
        $.ajax({
            type :"post",
            url:"http://localhost/user/register",
            data:$userName+$password,
            success :function () {
                alert("注册成功");
                window.location.href = 'http://localhost:63342/untitled1/novel/index.html';
            },
            error :function (xhr) {
                alert(xhr.status);
            }
        })
    })
    //登录功能实现
    $(".de").click(function () {
        var $userName = $(".lo_username").val();
        var $password = $(".lo_password").val();
        $ajax({
            type:"POST",
            async:true,
            url:"http://localhost/user/login"
            data: $userName+$password,
            success : function () {
            //获取书架信息
            getBookList($userName);
        },
            error: function (xhr) {
                alert(xhr.status);
            }
    })

        })
    //获取书架信息
    function getBookList(userName){
        $.ajax({
            type:"",
            url:"",
            data:""+userName,
            success: function(msg) {
                $.each(msg,function (key) {
                    //创建节点
                    var $newBook = $("<li><div class=\"list\">\n" +
                        "                <div class=\"list_name\"><span>霸道总裁爱上我</span></div>\n" +
                        "                <div class=\"list_del\"><i><img src=\"images/image/shanchu.jpg\" alt=\"\"></i></div>\n" +
                        "                <div class=\"list_start\"><button >查看详情</button></div>\n" +
                        "            </div></li>");
                    //插入节点
                    var $newList = $(".snr ul");
                    $newList.prepend($newBook);
                })
            },
            error :function (xhr) {
                alert(xhr.status);
            }

        })
    }
    /*书架li节点函数
    function createEle(obj){
        var $newBook = $("<li><div class=\"list\">\n" +
            "                <div class=\"list_name\"><span>霸道总裁爱上我</span></div>\n" +
            "                <div class=\"list_del\"><i><img src=\"images/image/shanchu.jpg\" alt=\"\"></i></div>\n" +
            "                <div class=\"list_start\"><button >查看详情</button></div>\n" +
            "            </div></li>")
    }*/
    /*书籍详情节点函数
    function createInfo(obj){
        var $newInfo = $("<div class=\"image\"><img src=\"\" alt=\"\"></div>\n" +
            "         <div class=\"info\">\n" +
            "             <h3>标题</h3>\n" +
            "             <span>作者</span>\n" +
            "             <p>简介</p>\n" +
            "             <button class=\"in\">加入书架</button>")
    }*/
    //书架中删除
    $(".snr").delegate(".list_del","click",function () {
        var $item = $(this).parents("li");
        $item.remove();
    })
    //查看详情
    $(".snr").delegate(".list_start","click",function () {
        var $obj = $(this).parents(".bookList").get(0).object;
        $.ajax({
            type:"get",
            url:"http://localhost/book/intro",
            data:$obj.id,
            success: function (value){
            var $information = $("<div class=\"image\"><img src="+value.Book_pic+" alt=\"\"></div>\n" +
            "         <div class=\"info\">\n" +
            "             <h3>"+value.Book_name+"</h3>\n" +
            "             <span>"+value.Book_writer+"</span>\n" +
            "             <p>"+value.Book_introduction+"</p>\n" +
            "             <button class=\"in\">加入书架</button>");
            $(".middle").prepend($information);
            window.location.href = 'http://localhost:63342/untitled1/novel/infor.html';
            },
            error: function (xhr){
            alert(xhr.status);
            }
        })
    })

    //加入书架
    $(".content2").delegate(".in","click",function () {
         $.ajax({
             type:"",
              url:"",
              data:"",
             success: function (msg) {
                 var obj = eval("("+msg+")");
                 var obj = JSON.parse(msg);
              //创建节点
             var $newBook = $("<li><div class=\"list\">\n" +
            "                <div class=\"list_name\"><span>霸道总裁爱上我</span></div>\n" +
            "                <div class=\"list_del\"><i><img src=\"images/image/shanchu.jpg\" alt=\"\"></i></div>\n" +
            "                <div class=\"list_start\"><button >查看详情</button></div>\n" +
            "            </div></li>");
              //插入节点
             var $newList = $(".snr ul");
             $newList.prepend($newBook);

             },
             error: function (xhr) {
                 alert(xhr.status);
            }
        })
    })









})
