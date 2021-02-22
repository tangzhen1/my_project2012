import {} from "https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js";


let $nav_arr = ["北京", "天津", "河北", "山西", "内蒙古", "辽宁", "吉林", "黑龙江", "上海", "江苏", "浙江", "安徽", "福建", "江西", "山东", "河南", "湖北", "湖南", "广东", "广西", "海南", "重庆", "四川", "贵州", "云南", "西藏", "陕西", "甘肃", "青海", "宁夏", "新疆", "台湾", "香港", "澳门", "钓鱼岛"];
let str = "";
$nav_arr.forEach((v) => {
    str += `
   <li>
        <a href="javascript:;">${v}</a>
    </li>
   `
})
$(".nav_adress").html(str);
$(".nav_left").hover(function() {
    $(this).css({
        background: "#fff",
        borderColor: "rgb(220, 220, 220)",
        borderBottomColor: " #fff",
        zIndex: "1"
    })
    $(".nav_adress").css("display", "block").hover(function() {
        $(this).css("display", "block");
        $(".nav_adress").on("click", "a", function() {
            $(".nav_left em").html($(this).html());
            $(".nav_adress").css("display", "none")
        })
    }, function() {
        $(this).css("display", "none")
    })
}, function() {
    $(this).css({
        background: "#f9f9f9",
        borderColor: "#f9f9f9",
        zIndex: "0"
    })
    $(".nav_adress").css("display", "none")
})
let $height;

if ($(".hidden_div").height() < 554) {
    $(".hidden_div").height(554)
}

function colorR($that) {
    $that.css({
        borderColor: "#FF2832",
        zIndex: 6,
        fontSize: "16px"
    }).siblings("li").css({
        borderColor: "#F9F9F9",
        zIndex: 0,
        fontSize: "14px"
    })
    $that.children("a").css("color", "#ff2832")
    $that.siblings("li").children("a").css("color", "#666666")
}
$(".shop_left").hover(function() {
        $(".hidden_ul").css("display", "block");
        if (!$height) {
            $height = $(".hidden_ul").outerHeight();
        } else {
            $(".hidden_ul").stop(true).animate({
                height: $height
            })
        }
        $(".hidden_ul li").on("mouseover", function() {
            colorR($(this));
            $(".hidden_div").css("display", "block");
            let $h = $(".shop_content").offset().top + $(".shop_content").outerHeight() + 3;
            $(window).on("scroll", function() {
                if ($(window).scrollTop() > $h) {
                    $(".hidden_div").css({
                        top: $(window).scrollTop() - $h
                    })
                } else {
                    $(".hidden_div").css({
                        top: 0
                    })
                }
                if ($(".hidden_div").offset().top > $height - 100 + $h) {
                    $(".hidden_div").css({
                        top: 0
                    })
                }
            })
            $(".hidden_div .hidden_box").eq($(this).index()).css("display", "block").siblings(".hidden_box").css("display", "none");
        })
        $(".hidden_ul li").on("mouseout", function(e) {
            let $that = $(this);
            $(".hidden_div").hover(function() {
                $(this).css("display", "block");
                colorR($that);
            }, function() {
                $(this).css("display", "none");
                liClear($(".hidden_ul li"))
            })
            liClear($(".hidden_ul li"))
            $(".hidden_div").css("display", "none");
        })
    },
    function(e) {
        let $a = e.target.nodeName;
        liClear($(".hidden_ul li"))
        if ($a === "A" || ($a === "DIV" && e.target.getAttribute("class") === "shop_left")) {
            $(".hidden_div").css("display", "none");
            $(".hidden_ul").css("display", "none")
        } else {
            $(".hidden_div").css("display", "none");
            $(".hidden_ul").animate({
                height: 0
            }, 400, function() {
                $(".hidden_ul").css("display", "none")
            })
        }
    })

function liClear($arr) {
    $arr.each(function(index, value) {
        $arr.eq(index).css({
            borderColor: "#F9F9F9",
            zIndex: 0,
            fontSize: "14px"
        })
        $arr.eq(index).children("a").css("color", "#666666")
    })
};