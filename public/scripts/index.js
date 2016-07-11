$(function() {
    //轮播图
    //定义属性
    var i = 1;
    var imgnum = $(".g-list").children().length;
    var $imginner = $(".g-list");

    function move() {
        //创建函数
        // 当点击到第一张图时，将索引变成倒数第2张
        if (i == -1) {
            $imginner.css({
                "margin-left": -(imgnum - 1) * 100 + "%"
            })
            i = imgnum - 2;
        }
        // 当点击到最后一张图时，将索引变成第2张
        if (i == imgnum) {
            $imginner.css({
                "margin-left": "-100%"
            })
            i = 2;
        }
        $imginner.stop().animate({
            "margin-left": -i * 100 + "%"
        }, 500);
        //下标签变色
        if (i == imgnum - 1) {
            $(".g-icons i").eq(0).addClass("cur").siblings().removeClass("cur");
        } else {
            $(".g-icons i").eq(i - 1).addClass("cur").siblings().removeClass("cur");
        }

    }
    //点击下标签，改变轮播图
    $(".g-icons i").each(function(index) {
        $(".g-icons i").on('click', function() {
            var bgnum = $(this).index();
            i = bgnum + 1;
            switch (true) {
                case bgnum == 0:
                    $imginner.stop().animate({
                        "margin-left": "-100%"
                    }, 500)
                    $(".g-icons i").eq(bgnum).addClass("cur").siblings().removeClass("cur");
                    break;
                case bgnum == 1:
                    $imginner.stop().animate({
                        "margin-left": "-200%"
                    }, 500)
                    $(".g-icons i").eq(bgnum).addClass("cur").siblings().removeClass("cur");
                    break;
                case bgnum == 2:
                    $imginner.stop().animate({
                        "margin-left": "-300%"
                    }, 500)
                    $(".g-icons i").eq(bgnum).addClass("cur").siblings().removeClass("cur");
                    break;

            }
        })
    })

    var t = setInterval(function() {
        //运行轮播
        i++;
        move();
    }, 3000)
})

$(function() {
    //导航栏更多内容
    $(".more").on("click", function() {
        $(".main-nav table tr").removeAttr("style").css("display", "blcok");
        $(".footer").removeAttr("style");
        $(".more").addClass("display-n");
        $("#span-online").removeAttr("style");
    })
    $(".less").on("click", function() {
        $(".main-nav table tr").css("display", "none");
        $(".main-nav table .tr-line").removeAttr("style");
        $(".footer").css("display", "none");
        $(".more").removeClass("display-n").addClass("display-b");
        $("#span-online").css("display", "none");
    })


})


$(function() {
    $(document).ready(function() {
           $.ajax({
                url: '/datanews',
                type: 'get',
                dataType: 'json',
                beforeSend: beforeCheck,
                error: errCheck, //错误执行方法
                success: succCheck //成功执行方法
            })

            function beforeCheck() {
                $('.index-list').empty();

            }


            function errCheck() {
                alert("Error!");
            }

            function succCheck(data) {
                inputData(data);
            }
        });
        //选择新闻类型
    $('.main-nav td span').on("click", function() {
        $('.main-nav td span').removeClass("cur");
        $(this).addClass("cur");
    })
    $("#type1").on('click', function() {
        var newsid = $(this).attr("id");
        console.log(newsid);
        $.ajax({
            url: '/type1',
            type: 'get',
            dataType: 'json',
            beforeSend: beforeCheck,
            error: errCheck, //错误执行方法
            success: succCheck //成功执行方法
        })

        function beforeCheck() {
            $('.index-list').empty();

        }


        function errCheck() {
            alert("Error!");
        }

        function succCheck(data) {
            inputData(data);
        }
    })
    $("#type2").on('click', function() {
        var newsid = $(this).attr("id");
        console.log(newsid);
        $.ajax({
            url: '/type2',
            type: 'get',
            dataType: 'json',
            beforeSend: beforeCheck,
            error: errCheck, //错误执行方法
            success: succCheck //成功执行方法
        })

        function beforeCheck() {
            $('.index-list').empty();

        }


        function errCheck() {
            alert("Error!");
        }

        function succCheck(data) {
            inputData(data);
        }
    })
    $("#type3").on('click', function() {
        var newsid = $(this).attr("id");
        console.log(newsid);
        $.ajax({
            url: '/type3',
            type: 'get',
            dataType: 'json',
            beforeSend: beforeCheck,
            error: errCheck, //错误执行方法
            success: succCheck //成功执行方法
        })

        function beforeCheck() {
            $('.index-list').empty();

        }


        function errCheck() {
            alert("Error!");
        }

        function succCheck(data) {
            inputData(data);
        }
    })

    // 点击加载更多

    $('.morewrp').on("click", function() {
        var newsid = $(this).attr("class");
        $.ajax({
            url: '/datanews',
            type: 'get',
            dataType: 'json',
            beforeSend: LoadFunction,
            success: succFunction
        })

        
        function LoadFunction() {
            $(".moremoremore").text('加载中...');
        }

        function succFunction(data) {
            $(".moremoremore").text('点击加载更多');
            inputData(data);

            // console.log(data[i].newstitle);

        }



    })

    function inputData(data) {
        //循环输出
        for (i in data) {
            var dataInt = {
                newdata: [{
                    newstitle: data[i].newstitle,
                    newsimg: data[i].newsimg,
                    newscontent: data[i].newscontent,
                    newstime: data[i].newstime
                }]
            }
            $.each(dataInt.newdata, function(key, value) {
                var newbox = $("<div>").addClass("index-list-item").appendTo($(".index-list"));
                var newsitem = $("<div>").addClass("index-list-main showleft").appendTo(newbox);
                var imgbox = $("<div>").addClass("index-list-image").appendTo(newsitem);
                var img = $("<img>").attr("src", $(value).attr("newsimg")).appendTo(imgbox);
                var newstext = $("<div>").addClass("index-list-main-text").appendTo(newsitem);
                var title = $("<div>").addClass("index-list-main-title").text($(value).attr("newstitle")).appendTo(newstext);
                var content = $("<div>").addClass("index-list-main-abs").text($(value).attr("newscontent")).appendTo(newstext);
                var newsbottom = $("<div>").addClass("index-list-bottom").appendTo(newsitem);
                var time = $("<div>").addClass("index-list-main-time").appendTo(newsbottom);
                var newtime = $("<div>").addClass("tip-time").text($(value).attr("newstime")).appendTo(time);
            })
        }
    }



})
