var judgeid = 0;
var judgeClick = 0;
var haveLogin = 0;
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
    //获取排行榜信息
    function getPHB(number){
        $.ajax({
            type:"get",
            url:"http://localhost/book/rank",
            success: function (obj) {
                var msg = JSON.parse(obj);
                $.each(msg,function (key,value) {
                      //创建节点
                    if(key <= 6*number-1&&key>number*6-7)
                    {
                        var $newphb = $("<li>\n" +
                            "                    <div class=\"bookList\">\n" +
                            "                        <div class=\"bookNum\">"+(key+1)+"</div>\n" +
                            "                        <div class=\"bookName\">"+value.book_name+"</div>\n" +
                            "                        <div class=\"detail\"><button name=\"detail\">查看详情</button></div>\n" +
                            "                    </div>\n" +
                            "                </li>")
                        $newphb.get(0).object = value;
                        //插入节点
                        var $paihb = $(".pai ul");
                        $paihb.append($newphb);
                        // //清空页码内容
                        // $(".page").html("");
                        // //重新获取页码
                        // getPage();
                    }
            })
            },
            error :function (xhr) {
                alert(xhr.status);
            }
        })
    }
    var number;
    if(judgeClick == 0){
        getPHB(1);
    }else{
        getPHB(number);
    }
    //监听页码点击
    $(".content2").delegate(".page>a","click",function () {
        judgeClick = 1;
        var $pageClick = $(this).html();
        getPHB($pageClick);
        // // $(".cur").css("color","#5590dc");
        // $(this).addClass("cu");
        // $(".cu").css("color","red");
        // $(this).siblings().css("color","#5590dc");
        //保存当前点击的页码
        var date = new Date();
        date.setDate(date.getDate() + 10);
        document.cookie = "pageNumber="+$(this).html()+";expires="+date.toGMTString()+";";
        //获取cookie
        var res = document.cookie.split(";");
        for(var i = 0;i < res.length; i++){
            var temp = res[i].split("=");
            if(temp[0].trim() === "pageNumber"){
                number = temp[1];
            }
        }
        });
    //搜索功能实现
    $(".stn").click(function () {
        var $text = $(".seText").text();
        if($text.length == 0){
            alert("内容不能为空");
        }
        if($text.length != 0){
            $.ajax({
                type :"post",
                url : "http://localhost/user/search",
                data :$text,
                success :function (msg) {
                    var value = JSON.parse(msg);
                    //未搜索到
                    if(value=="")
                        alert("未输入有效关键词");
                    else//搜索到
                    {
                        var $information = createInfo(value);
                        $(".middle").prepend($information);
                        window.location.href = 'http://localhost:63342/untitled1/novel/infor.html';
                    }
                },
                error : function (xhr) {
                    alert(xhr.status);
                }
            })
        }
    })
    //书籍分类
     $(".sort ul li").click(function () {
         var $getSort = $(this).text();
         var datas = {book_type:$getSort};
         var data = JSON.stringify(datas);
         $.ajax({
             type:"get",
             url:"http://localhost/book/classify",
             data:data,
             success:function (msg) {
                 var $obj = JSON.parse(msg);
                 $.each($obj,function (value) {
                     var $bookSort =$("<li>\n" +
                         "                   <div class=\"deta\">\n" +
                         // "                       <div class=\"creat_image\"><img src=\"\" alt=\"\"></div>\n" +
                         "                       <div class=\"info\">\n" +
                         "                           <h3>"+value.book_name+"</h3>\n" +
                         "                           <h6>"+value.book_type+"</h6>\n" +
                         "                           <span>作者: <a href=\"javascript:;\">"+value.book_writer+"</a></span>\n" +
                         // "                           <p>简介</p>\n" +
                         "                           <form action=\"http://localhost/admin/delete\" method=\"post\">\n" +
                         "                               <button class=\"out\">删除图书</button></form>\n" +
                         "                           <button class=\"in\">加入书架</button>\n" +
                         "                           <button class=\"clear\">修改图书</button>\n" +
                         "                       </div>\n" +
                         "                   </div>\n" +
                         "               </li>")
                     $bookSort.get(0).object = value;
                     var $bsort = $(".middle ul");
                     $bsort.prepend($bookSort);
                     window.location.href = 'http://localhost:63342/untitled1/novel/sort/sort.html';
                 })
             },
             error:function (xhr) {
                 console.log("书籍分类");
                 console.log(xhr.status);
             }
         })
     })
    //注册功能实现
    $(".btn").click(function () {
        var $userName = $(this).parents(".box3").find(".user").val();
        var $password = $(this).parents(".box3").find(".re_password").val();
        var datas = {select: $('input[type = radio][name = n]:checked').val(),name: $(".user").val(),pwd:$(".re_password").val()};
        var data = JSON.stringify(datas);
        if($userName.length == 0||$password.length == 0)
        {
            alert("内容不能为空");
        }
        if($userName.length != 0&&$password.length != 0){
            $.ajax({
                type :"post",
                url:"http://localhost/user/register",
                data:data,
                success :function (msg) {
                    var value = JSON.parse(msg);
                    alert("注册成功");
                    $userName.get(0).object = value;
                    window.location.href = 'http://localhost:63342/untitled1/novel/index.html';
                },
                error :function (xhr) {
                    alert(xhr.status);
                }
            })
        }
    })
    //管理员删除图书
    $(".middle").delegate(".out","click",function (){
        if(judgeid == 1){
            var  $item = $(this).parents(".deta");
            $item.remove();
            var $obj = $(this).parents(".deta").get(0).object;
            var datas = {id:$obj.id};
            var data = JSON.stringify(datas);
            $.ajax({
                url:"http://localhost/admin/delete",
                type:"post",
                data:data,
                success:function () {
                    alert("删除成功");
                },
                error:function (xhr) {
                    alert(xhr.status);
                }
            })
        }
        if(judgeid == 0){
            alert("没有删除权限");
        }
    })
    //管理员修改图书
    $(".middle").delegate(".change","click",function () {
         if(judgeid == 0){
             alert("没有修改权限");
         }
         else{
             var $obj = $(this).parents(".deta").get(0).object;
             var $bookName = $(this).parents(".middle").find(".info h3").text();
             var $writer =  $(this).parents(".middle").find(".info span a").text();
             var $bookType = $(this).parents(".middle").find(".info h6").text();
             $(".bookname").text =$bookName;
             $(".booktype").text = $bookType;
             $(".writer").text = $writer;
             window.location.href = 'http://localhost:63342/untitled1/novel/updata/updata.html';
             $(".boxmiddle").delegate(".finish","click",function () {
                 var $getName = $(this).parents(".boxmiddle").find(".bookname").text();
                 var $getType = $(this).parents(".boxmiddle").find(".booktype").text();
                 var $getWriter = $(this).parents(".boxmiddle").find(".writer").text();
                 var datas = {id:$obj.id,book_name:$getName,book_writer:$getWriter,book_type:$getType};
                 var data = JSON.stringify(datas);
                 $.ajax({
                     url:"http://localhost/admin/update",
                     type:"post",
                     data:data,
                     success:function () {
                         getPHB(number);
                         window.location.href = 'http://localhost:63342/untitled1/novel/index.html';
                         alert("修改成功");
                     },
                     error:function (xhr) {
                         console.log("管理员修改信息");
                         console.log(xhr.status);
                     }
                 })
             })
         }
    })
    //登录功能实现
    var a = 1;
    $(".de").click(function () {
        var $userName = $(this).parents(".dl").find(".lo_username").val();
        var $password = $(this).parents(".dl").find(".lo_password").val();
        var $obj = $(this).parents(".dl").find(".lo_username").get(0).object;
        var datas = {user_id:$userName,pwd:$password,id:$obj.id};
        var data = JSON.stringify(datas);
        if($userName.length == 0||$password.length == 0)
        {
            alert("内容不能为空");
        }
        if($userName.length != 0&&$password.length != 0){
            $.ajax({
                type:"POST",
                url:"http://localhost/user/login",
                async:true,
                data: data,
                success : function (msg) {
                    var value = JSON.parse(msg);
                    var gly = value.select;
                    if(value == "")
                    {
                        alert("账号或密码错误");
                    }
                    else{
                        haveLogin = 1;
                        var i = a;
                        getBookList($obj.id);
                        var $but = $("<button class=\"clear\">退出登录</button>");
                        $(".header").prepend($but);
                        // if(!window.localStorage){
                        //     alert("浏览器不支持localstorage");
                        //     return false;
                        // }else{
                        //     if($(".zidong").is(":checked")){
                        //         localStorage.setItem('user',JSON.stringify($userName));
                        //         localStorage.setItem('pwd',JSON.stringify($password));
                        //         var use = localStorage.getItem('user');
                        //         var pwd = localStorage.getItem('pwd');
                        //         if(use&&(!pwd)){
                        //             $(".lo_password").val = JSON.stringify(pwd);
                        //         }
                        //     }
                        // }
                        var date = new Date();
                        date.setDate(date.getDate() + 1);
                        document.cookie = "userName"+i+"="+$userName+";expires="+date.toGMTString()+";";
                        document.cookie = "password"+i+"="+$password+";expires="+date.toGMTString()+";";
                        a++;
                        //获取cookie
                        var res = document.cookie.split(";");
                        for(var i = 0;i < res.length; i++){
                            var temp = res[i].split("=");
                            if(temp[1].trim() === $userName){
                                var j = i+1;
                                temp = res[j].split("=");
                                if($password.length == 0){
                                    $(".lo_password").val = temp[1];
                                }
                            }
                        }
                    }
                    if(gly == 2){
                        judgeid = 1;
                    }
                },
                error: function (xhr) {
                    alert(xhr.status);
                }
            })
        }
        })
    //退出登录
    $(".header").delegate(".but","click",function () {
        $(".snr").remove();
        haveLogin = 0;
    })
    //获取书架信息
    function getBookList(userId){
        var dates={user_id:userId};
        var date = JSON.stringify(dates);
        $.ajax({
            type:"http://localhost/user/shelf",
            url:"get",
            data:date,
            success: function(obj) {
                var msg = JSON.parse(obj);
                $.each(msg,function (value) {
                    //创建节点
                    var $newBook = $("<li><div class=\"list\">\n" +
                        "                <div class=\"list_name\"><span>"+value.book_name+"</span></div>\n" +
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
            return $newBook;
    }*/
    //书籍详情节点函数
    function createInfo(value){
        var $newInfo = $(" <div class=\"deta\">\n" +
            "         <div class=\"image\"><img src="+value.book_pic+" alt=\"\"></div>\n" +
            "                 <div class=\"info\">\n" +
            "                     <h3>"+value.book_name+"</h3>\n" +
            "                     <h6>"+book_type+"</h6>\n" +
            "                     <span>作者: <a href=\"javascript:;\">"+value.book_writer+"</a></span>\n" +
            "                     <p>"+value.book_introduction+"</p>\n" +
            "                     <form action=\"http://localhost/admin/delete\" method=\"post\">\n" +
            "                     <button class=\"out\">删除图书</button></form>\n" +
            "                     <button class=\"in\">加入书架</button>\n" +
            "                     <button class=\"change\">修改图书</button>\n" +
            "                 </div>\n" +
            "         </div>")
            return $newInfo;
    }
    //书架中删除
    $(".snr").delegate(".list_del","click",function () {
        var $item = $(this).parents("li");$item.remove();
        var $obj = $(this).parents(".bookList").get(0).object;
        var $use = $(this).parents(".content2").find(".lo_userName").get(0).object;
        var datas = {id:$obj.id,user_id:$use.id};
        var data = JSON.stringify(datas);
        $.ajax({
            type :"post",
            url:"http://localhost/user/delete",
            data:data,
            success :function () {
                alert("删除成功");
            },
            error:function (xhr) {
                alert(xhr.status);
            }
        })
    })
    //查看详情
    $(".content2").delegate(".list_start","click",function () {
        var $obj = $(this).parents(".bookList").get(0).object;
        $(".deta").get(0).object = $obj;
        var datas = {id:$obj.id};
        var data =JSON.stringify(datas);
        $.ajax({
            type:"get",
            url:"http://localhost/book/intro",
            data:data,
            success: function (msg){
                var value = JSON.parse(msg);
            var $information = createInfo(value);
            $(".middle").prepend($information);
            $information.get(0).object = value;
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
        var $use = $(this).parents(".content2").find(".lo_username").get(0).object;
        var datas = {id:$obj.id,user_id:$use.id};
        var data = JSON.stringify(datas);
        if(haveLogin == 0){
            alert("请先登录！");
        }else{
            $.ajax({
                type:"post",
                url:"http://localhost/user/insert",
                data:data,
                success: function (obj) {
                    //  var obj = eval("("+msg+")");
                    var msg = JSON.parse(obj);
                    //创建节点
                    var $newBook = $("<li><div class=\"list\">\n" +
                        "                <div class=\"list_name\"><span>"+msg.book_name+"</span></div>\n" +
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
        }

    })
})
