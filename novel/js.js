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
    // //获取页数
    // getPage();
    // function getPage() {
    //     $.ajax({
    //         type:"",
    //         url:"",
    //         data:"",
    //         success :function (msg) {
    //             for(var i = 0;i < msg.count; i++){
    //                 var $a = $(" <a href=\"javascript:;\">"+i+1+"</a>");
    //                 if( i == 0){
    //                     $a.addClass("cur");
    //                 }
    //                 $(".page").append($a);
    //             }
    //         },
    //         // error :function (xhr) {
    //         //     alert(xhr.status);
    //         // }
    //     })
    // }
    //获取排行榜信息（分页）
    function getPHB(number){
        $.ajax({
            type:"",
            url:"",
            data :number,
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
                    $newphb.get(0).object = value;
                    //插入节点
                    var $paihb = $(".pai ul");
                    $paihb.prepend($newphb);
                    // //清空页码内容
                    // $(".page").html("");
                    // //重新获取页码
                    // getPage();
                })
            },
            error :function (xhr) {
                alert(xhr.status);
            }
        })
    }
    getPHB(1);
    //监听页码点击
    $(".content2").delegate(".page>a","click",function () {
        var $pageClick = $(this).val();
        // $(".cur").css("color","#5590dc");
        $(this).addClass("cu");
        $(".cu").css("color","red");
        $(this).siblings().css("color","#5590dc");
        getPHB($pageClick);
        })
    //搜索功能实现
    $(".stn").click(function () {
        var $text = $(".seText").val;
        $.ajax({
            type :"",
            url : "",
            data :$text,
            success :function (swap,value) {
                //未搜索到
                if(swap == 0)
                    alert("未输入有效关键词");
                else//搜索到
                {
                    var $information = $("<div class=\"image\"><img src="+value.Book_pic+" alt=\"\"></div>\n" +
                        "         <div class=\"info\">\n" +
                        "             <h3>"+value.Book_name+"</h3>\n" +
                        "             <span>"+value.Book_writer+"</span>\n" +
                        "             <p>"+value.Book_introduction+"</p>\n" +
                        "             <button class=\"in\">加入书架</button>");
                    $(".middle").prepend($information);
                    window.location.href = 'http://localhost:63342/untitled1/novel/infor.html';
                }
            },
            error : function (xhr) {
                alert(xhr.status);
            }
        })
    })
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
            url:"http://localhost/user/login",
            async:true,
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
            data:userName,
            success: function(msg) {
                $.each(msg,function (value) {
                    //创建节点
                    var $newBook = $("<li><div class=\"list\">\n" +
                        "                <div class=\"list_name\"><span>霸道总裁爱上我</span></div>\n" +
                        "                <div class=\"list_del\"><i><img src=\"images/image/shanchu.jpg\" alt=\"\"></i></div>\n" +
                        "                <div class=\"list_start\"><button >查看详情</button></div>\n" +
                        "            </div></li>");
                    $newBook.get(0).object = value;
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
        var $obj = $(this).parents(".bookList").get(0).object;
        $item.remove();
        $.ajax({
            type :"",
            url:"",
            data:$obj.id,
            success :function () {
                alert("删除成功");
            },
            error:function (xhr) {
                alert(xhr.status);
            }
        })
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
        var $obj = $(this).parents(".bookList").get(0).object;
         $.ajax({
             type:"",
              url:"",
              data:$obj.id,
             success: function (msg) {
               //  var obj = eval("("+msg+")");
                 // var obj = JSON.parse(msg);
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
