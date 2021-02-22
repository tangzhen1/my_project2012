import {} from "https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js";
// 主要内容区域左部导航区js部分

$(".book_list .list_div").each(function(index, value) {
        $(".book_list .list_div").eq(index).on("mouseover", function() {
            $(this).children("dl").css({
                borderRightColor: "#fff",
                zIndex: 8,
                borderTop: "1px solid #487a6f",
                borderBottom: "1px solid #487a6f",
                padding: " 3px 10px"
            });
            $(this).siblings(".list_hidden_div").hover(function() {
                $(this).siblings("dl").css({
                    borderRightColor: "#fff",
                    zIndex: 5,
                    borderTop: "1px solid #487a6f",
                    borderBottom: "1px solid #487a6f",
                    padding: " 3px 10px"
                })
            }, function() {
                $(this).siblings("dl").css({
                    borderRightColor: "#487a6f",
                    zIndex: 0,
                    borderTop: "0",
                    borderBottom: "0",
                    padding: "4px 10px"
                })
            })
        })
        $(".book_list .list_div").eq(index).on("mouseout", function() {
            $(this).children("dl").css({
                borderRightColor: "#487a6f",
                zIndex: 0,
                borderTop: "0",
                borderBottom: "0",
                padding: "4px 10px"
            });
        })
        $(window).on("scroll", function() {
            $(".book_list .list_div").eq(index).on('mouseover', function() {
                if ($(this).children("dl").offset().top + 35 + $('.main_left').offset().top - $(window).scrollTop() <= $(this).children(".list_hidden_div").offset().top) {
                    $(this).children(".list_hidden_div").addClass("toTop")
                    $(this).siblings(".list_div").children(".list_hidden_div").removeClass("toTop")
                } else {
                    $(this).children(".list_hidden_div").removeClass("toTop")
                }
            })
        })
    })
    // 主要内容区域左部导航区js部分结束
    // 主要内容区域中间轮播图js区域开始
let $main_middle_top_num = 0;
let $main_middle_top_time = null;
$(".main_middle_top ul li").each(function(index, value) {
    let $li = $("<li></li>");
    $li.html(index + 1);
    $(".main_middle_top ol").append($li);
})
$(".main_middle_top ol li").eq(0).addClass("active");
$(".main_middle_top ol li").on("mouseover", function() {
    $main_middle_top_num = $(this).index();
    $(this).addClass("active").siblings("li").removeClass("active");
    $(".main_middle_top ul li").eq($(this).index()).css("opacity", "1").siblings("li").css("opacity", "0")
});
$main_middle_top_time = setInterval(function() {
    if ($main_middle_top_num === $(".main_middle_top ul li").length) $main_middle_top_num = 0;
    $(".main_middle_top ul li").eq($main_middle_top_num).css("opacity", "1").siblings("li").css("opacity", "0");
    $(".main_middle_top ol li").eq($main_middle_top_num).addClass("active").siblings("li").removeClass("active");
    $main_middle_top_num++;
}, 3000);
$(".main_middle_top").hover(function() {
        clearInterval($main_middle_top_time);
        $main_middle_top_time = null;
    }, function() {
        $main_middle_top_time = setInterval(function() {
            if ($main_middle_top_num === $(".main_middle_top ul li").length) $main_middle_top_num = 0;
            $(".main_middle_top ul li").eq($main_middle_top_num).css("opacity", "1").siblings("li").css("opacity", "0");
            $(".main_middle_top ol li").eq($main_middle_top_num).addClass("active").siblings("li").removeClass("active");
            $main_middle_top_num++;
        }, 3000);
    })
    // 主要内容区域中间轮播图js区域结束
    //主要内容区域中间下方轮播内容区域开始
function apeendCh(node1, node2) {
    node1.each(function(index, value) {
        node2.append("<li></li>");
    })
}
apeendCh($(".main_middle_content ul"), $(".main_middle_bottom ol"))
$(".main_middle_bottom ol li").eq(0).addClass("active");
let $main_middle_bottom_num = 0;
$main_middle_bottom_change($main_middle_bottom_num);
$(".main_middle_bottom ol li").on("mouseover", function() {
    $main_middle_bottom_num = $(this).index();
    $main_middle_bottom_move($main_middle_bottom_num);
    $main_middle_bottom_change($main_middle_bottom_num);
    $(this).addClass("active").siblings("li").removeClass("active")
})
let $main_middle_bottom_ul = $(".main_middle_content ul").eq(0).clone(true);
$(".main_middle_content").append($main_middle_bottom_ul);
let $main_middle_content_left = $(".main_middle_content").offset().left;
$(".main_middle_bottom>.icon-youjiantou1").on("click", function() {
    $(".main_middle_content ul").eq($(".main_middle_content ul").length - 1).html($(".main_middle_content ul").eq(0).html());
    if ($main_middle_bottom_num === $(".main_middle_content ul").length - 1) {
        $main_middle_bottom_num = 0;
        $(".main_middle_content").css("left", 0);
    }
    $main_middle_bottom_num++;
    if ($main_middle_bottom_num === $(".main_middle_content ul").length - 1) {
        $(".main_middle_bottom ol li").eq(0).addClass("active").siblings("li").removeClass("active");
    } else {
        $(".main_middle_bottom ol li").eq($main_middle_bottom_num).addClass("active").siblings("li").removeClass("active");
        $main_middle_bottom_change($main_middle_bottom_num);
    }
    $main_middle_bottom_move($main_middle_bottom_num);
})
$(".main_middle_bottom>.icon-youjiantou").on("click", function() {
    $(".main_middle_content ul").eq($(".main_middle_content ul").length - 1).html($(".main_middle_content ul").eq(0).html());
    if ($main_middle_bottom_num === 0) {
        $main_middle_bottom_num = $(".main_middle_content ul").length - 1;
        $(".main_middle_content").css("left", -$main_middle_bottom_num * $(".main_middle_content ul").eq(0).width())
    }
    $main_middle_bottom_num--;
    $(".main_middle_bottom ol li").eq($main_middle_bottom_num).addClass("active").siblings("li").removeClass("active");
    $main_middle_bottom_change($main_middle_bottom_num);
    $main_middle_bottom_move($main_middle_bottom_num);
})

function $main_middle_bottom_move(a) {
    let $width = $(".main_middle_content ul").eq(0).width();
    $(".main_middle_content").animate({
        left: a * -$width
    })
}

function $main_middle_bottom_change(num) {
    $.ajax({
        url: " http://10.31.165.21:3000/projectname/php/main_list.php",
        dataType: 'json'
    }).done(function(d) {
        let $data_list = d.slice(num * 8, (num + 1) * 8);
        let $str = "";
        for (let value of $data_list) {
            $str += `
                <li>
                <a href="list.html"><img src=${value.url} alt=${value.title
                }></a>
                <p><a href="" title=${value.title
                }>${value.title
                }</a></p>
                <h3>${value.name
                }</h3>
                <h4><span>￥${value.price
                }</span><em>￥${value.pre_price
                }</em></h4>
                <h5>${value.book
                }</h5>
            </li>`
        }
        $(".main_middle_content ul").eq(num).html($str);
        $(".main_middle_content ul li").each(function(index, value) {
            if ($(".main_middle_content ul li").eq(index).children("h5").html() === "null") {
                $(".main_middle_content ul li").eq(index).children("h5").html("")
            }
            if ($(".main_middle_content ul li").eq(index).children("h4").children("em").html() === "￥null") {
                $(".main_middle_content ul li").eq(index).children("h4").children("em").html("")
            }
        })
    })
}

//主要内容区域中间下方轮播内容区域结束

//主要内容区域右方轮播内容区域开始
let $book_presell_width;
let $book_presell_num = 0;
$.ajax({
    url: " http://10.31.165.21:3000/projectname/php/main_list.php",
    dataType: 'json'
}).done(function(d) {
    let $data_list = d.slice(0, 5);
    let $str = "";
    for (let value of $data_list) {
        $str += `
        <li>
        <a href="list.html">
            <img src=${value.url} alt=${value.title}>
            <div>
                <p>${value.title}</p>
                <span>¥${value.price}</span>
                <em>¥${value.price}</em>
            </div>
        </a>
    </li>
        `
    }
    $(".book_presell ul").html($str);
    apeendCh($(".book_presell ul li"), $(".book_presell ol"));
    $book_presell_width = $(".book_presell ul li").eq(0).outerWidth(true);
    book_presell_move({
        a: $(".book_presell ol li"),
        b: $book_presell_num,
        c: $book_presell_width,
        d: $(".book_presell ul")
    });
    let li = $(".book_presell ul li").eq(0).clone(true);
    let flag = true;
    $(".book_presell ul").append(li);
    $(".book_presell>.icon-youjiantou1").on("click", function() {
        if (flag) {
            flag = false;
            if ($book_presell_num === $(".book_presell ul li").length - 1) {
                $book_presell_num = 0;
                $(".book_presell ul").css("left", 0)
            }
            $book_presell_num++;
            $(".book_presell ul").animate({
                left: -$book_presell_num * $book_presell_width
            }, function() {
                flag = true
            })
            if ($book_presell_num === $(".book_presell ul li").length - 1) {
                $(".book_presell ol li").eq(0).addClass("active").siblings("li").removeClass("active");
            } else {
                $(".book_presell ol li").eq($book_presell_num).addClass("active").siblings("li").removeClass("active");
            }
        }
    })
    $(".book_presell>.icon-youjiantou").on("click", function() {
        if (flag) {
            flag = false;
            if ($book_presell_num === 0) {
                $book_presell_num = $(".book_presell ul li").length - 1;
                $(".book_presell ul").css("left", ($(".book_presell ul li").length - 1) * -$book_presell_width)
            }
            $book_presell_num--;
            $(".book_presell ul").animate({
                left: -$book_presell_num * $book_presell_width
            }, function() {
                flag = true
            })
            $(".book_presell ol li").eq($book_presell_num).addClass("active").siblings("li").removeClass("active");
        }
    })
})

function book_presell_move(obj) {
    obj.a.eq(0).addClass("active");
    obj.a.on("mouseover", function() {
        obj.b = $(this).index();
        obj.d.stop(true).animate({
            left: -obj.c * $(this).index()
        })
        $(this).addClass("active").siblings("li").removeClass("active");
    })
    obj.fn && typeof obj.fn === 'function' && obj.fn();
}

//主要内容区域右方轮播内容区域结束

//主要内容区域右方底部js区域开始
$(".bottom_b>ul li").eq(0).addClass("active");
bottom_div_draw(0);

function bottom_div_draw($a) {
    $.ajax({
        url: "http://10.31.165.21:3000/projectname/php/main_list2.php",
        dataType: 'json'
    }).done(function(d) {
        if ($(".bottom_div ul").html() !== "") {
            $(".bottom_div ul").html("")
        }
        let $data = d.slice($a * 10, ($a + 1) * 10);
        let $str = "";
        let b = 0;
        for (let i of $data) {
            b++;
            $str += `
            <li class="clearfix">
            <strong>${b}</strong>
            <h3>${i.title}</h3>
            <div>
                <img src=${i.url} alt=${i.title}>
                <p><a href="" title=${i.title}>${i.title}</a></p>
                <span>￥${i.price}</span>
                <em>￥${i.pre_price}</em>
                <b>${i.comm}</b>
            </div>
        </li>
    `
        }
        $(".bottom_div ul").html($str);
        for (let i = 0; i < 3; i++) {
            $(".bottom_div>ul li").eq(i).children("strong").addClass("active");
        }
        $(".bottom_div>ul li").on("mouseover", function() {
            $(this).css({
                height: "150px"
            }).children("h3").css("display", "none");
            $(this).children("div").css("display", "block");
            $(this).siblings("li").css({
                height: "38px"
            }).children("h3").css("display", "block");
            $(this).siblings("li").children("div").css("display", "none");
        })
    })
}
$(".bottom_b>ul li").each(function(index, value) {
    $(".bottom_b>ul li").eq(index).on("mouseover", function() {
        let $a = $(this).index();
        $(this).addClass("active").siblings("li").removeClass("active")
        bottom_div_draw($a)
    })
})

//主要内容区域右方底部js区域结束

//第二模块渲染区域开始
left_bottom_draw(0);
$(".left_top>ul>li").eq(0).addClass("active");
$(".left_top>ul>li").on("mouseover", function() {
    $(this).addClass("active").siblings("li").removeClass("active");
    let $a = $(this).index();
    left_bottom_draw($a)
})

function left_bottom_draw($a) {
    $.ajax({
        url: " http://10.31.165.21:3000/projectname/php/main_list.php",
        dataType: 'json'
    }).done(function(d) {
        if ($a > 3) $a = $a % 3;
        let $data = d.slice($a * 10, ($a + 1) * 10);
        let $str = "";
        if ($(".left_bottom>ul").html() !== "") {
            $(".left_bottom>ul").html("")
        }
        for (let i of $data) {
            $str += `
            <li>
            <a href="list.html"><img src=${i.url} alt=${i.title}></a>
            <p><a href="" title=${i.title}>${i.title}</a></p>
            <h3><span></span><em>当当独家特供</em></h3>
            <h4><span>¥${i.price}</span><em>¥${i.pre_price}</em></h4>
            <h5>${i.book}</h5>
        </li>
            `
        }
        $(".left_bottom>ul").html($str)
        $(".left_bottom>ul li").each(function(index, value) {
            if ($(".left_bottom>ul li").eq(index).children("h4").children("em").html() === "¥null") {
                $(".left_bottom>ul li").eq(index).children("h4").children("em").html("")
            }
        })
    })
}