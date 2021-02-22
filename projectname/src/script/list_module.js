import {} from "https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js";
let $l_num = 0;
list_draw($l_num);

function list_draw($a) {
    $.ajax({
        url: " http://10.31.165.21:3000/projectname/php/main_list2.php",
        dataType: 'json'
    }).done(function(d) {
        if ($(".container>ul").html() !== "") {
            $(".container>ul").html("");
        }
        if ($(".container>.page>ul").html() !== "") {
            $(".container>.page>ul").html("")
        }
        let $l = Math.ceil(d.length / 10);
        $(".container>.page>em").children("b").html($l);
        for (let i = 1; i <= $l; i++) {
            $(".container>.page>ul").append("<li>" + i + "</li>");
        }
        $(".container>.page>ul").append("<li></li>");
        $(".container>.page>ul>li").eq($(".container>.page>ul>li").length - 1).html("...")
        let $data = d.slice(10 * $a, ($a + 1) * 10);
        let $str = "";
        for (let i of $data) {
            $str += `
            <li>
            <a href="">
                <img src=${i.url} alt=${i.title}>
            </a>
            <p><a href="" title=${i.title}>${i.title}</a></p>
            <h3><span>￥${i.price}</span></h3>
            <em><a href="detail.html?id=${i.sid}">购买</a></em>
        </li>
            `
        }
        $(".container>ul").html($str);
        $(".page>ul>li").eq($a).addClass("active").siblings("li").removeClass("active");
        if ($a <= 0) {
            $(".page>.pre").addClass("s_active").siblings("span").removeClass("s_active");
        } else {
            $(".page>.pre").removeClass("s_active")
        }
        if ($a >= $(".page>ul>li").length - 2) {
            $(".page>.next").addClass("s_active").siblings("span").removeClass("s_active");
        } else {
            $(".page>.next").removeClass("s_active")
        }
    })
}

$(".page>.pre").on("click", function() {
    if ($l_num <= 0) {
        return;
    }
    $(".page>.pre").removeClass("s_active");
    $l_num--;
    list_draw($l_num);
})
$(".page>.next").on("click", function() {
    if ($l_num >= $(".page>ul>li").length - 2) {
        return;
    }
    $(".page>.next").removeClass("s_active");
    $l_num++;
    list_draw($l_num);
});
$(".container>.page>ul").on("click", "li", function() {
    if ($(this).index() === $(".container>.page>ul").children().length - 1) {
        return
    }
    list_draw(+$(this).html() - 1);
})
$(".container>.page>button").on("click", function() {
    let $b = $(".container>.page input").val() ? $(".container>.page input").val() : 1;
    list_draw(+$b - 1);
})