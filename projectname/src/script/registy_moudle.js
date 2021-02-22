import {} from "https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js";

// 新用户注册与企业用户注册的切换
function $a_click(obj) {
    $(obj.node).on("click", function() {
        $(obj.node2).css("display", "block");
        $(obj.node3).css("display", "none");
    })
}
$a_click({
    node: "#new_u2",
    node2: ".newUser",
    node3: ".new_ente",
})
$a_click({
        node: "#new_q",
        node2: ".new_ente",
        node3: ".newUser",
    })
    // 新用户注册与企业用户注册的切换
    // 同意注意条款部分
$(".affirm_re input").prop("checked", false); //默认先不选中
$(".affirm_re").on("click", function() {
        if ($(this).children("input").prop("checked")) {
            $(this).children("p").css("visibility", "hidden") //消失了以然占位置

        } else {
            $(this).children("p").css("visibility", "visible")
        }
    })
    // 同意注意条款部分

//表单验证部分
//const newUser = $(".newUser");
let $tflag = true;
let $pflag = true;
let $reflag = true;
$("#re_form div p").not(".affirm_re p").css("visibility", "hidden");
$("#re_form div input").on("focus", function() {
    $(this).css({
        backgroundColor: "#fff",
        borderColor: "#E6E6E6"
    })
    $(this).siblings("p").css({
        visibility: "visible",
        color: "#787878"
    })
})
$("#re_form div input").not(".tel").on("blur", function() {
        $(this).siblings("p").css("visibility", "hidden")

    })
    //电话信息填写
$(".tel").on("focus", function() {
    $(this).siblings("p").html("手机号可用于登录、找回密码、接收订单通知等服务").css({
        color: "#787878"
    });
    $(this).siblings("em").css({
        backgroundPosition: "-999px -999px"
    })
})
$(".tel").on("blur", function() {
        if ($(this).val()) {
            let reg = /^1[3489]\d{9}$/g;
            if (!reg.test($(this).val())) {
                $(this).siblings("em").css({
                    backgroundPosition: "0 -18px"
                })
                $(this).siblings("p").css({
                    color: "red"
                }).html("手机号格式不正确,&nbsp;请重新输入");
                $(this).css({
                    backgroundColor: "#FEF0EF",
                    borderColor: "red"
                })
                $tflag = false;
            } else {
                let t = $(this).val()
                $.ajax({
                    type: 'post',
                    url: "http://10.31.165.21:3000/projectname/php/register.php",
                    data: {
                        telName: t
                    }
                }).done((d) => {
                    if (d === "true") {
                        $(this).siblings("p").css({
                            color: "red",
                            visibility: "visible"
                        }).html("此手机号已经注册,&nbsp;请更换其他手机号,&nbsp;或使用该<a href='login.html' style='color:#1A66B3'>手机号登录<a>");
                        $(this).siblings("em").css({
                            backgroundPosition: "0 -18px"
                        })
                        $tflag = false;
                    } else {
                        $(this).siblings("em").css({
                            backgroundPosition: "0 -37px"
                        })
                        $(this).siblings("p").css("visibility", "hidden");
                        $tflag = true;
                    }
                })
                $(this).siblings("em").css({
                    backgroundPosition: "0 -37px"
                })
                $(this).siblings("p").css("visibility", "hidden");
                $tflag = true;
            }
        } else {
            $(this).siblings("em").css({
                backgroundPosition: "-999px -999px"
            })
            $(this).siblings("p").html("手机号可用于登录、找回密码、接收订单通知等服务");
            $tflag = false;
        }
    })
    // 电话信息填写
    // 密码填写
$(".password").on("input", function() {
    $(this).siblings("p").html("<i></i><i></i><i></i><strong>密码为6-20个字符,可由英文、数字、及符号组成</strong>")
    if ($(this).val()) {
        if (/[A-Z]/g.test($(this).val()[$(this).val().length - 1])) {
            $(this).siblings("h3").css(
                "display", "block")
            $(this).siblings("p").css("visibility", "hidden")
        } else {
            $(this).siblings("p").css("visibility", "visible").children("i").css("display", "block");
            $(this).siblings("h3").css(
                "display", "none");
            $(this).siblings("p").children("strong").html("密码过于简单");
            let count = 0;
            if (/[A-Z]/g.test($(this).val())) count++;
            if (/[a-z]/g.test($(this).val())) count++;
            if (/[0-9]/g.test($(this).val())) count++;
            if (/[\W]/g.test($(this).val())) count++;
            if (/[_]/g.test($(this).val())) count++;
            if (count < 2) {
                $(this).siblings("em").css({
                    backgroundPosition: "0 -37px"
                })
                $(this).siblings("p").children("strong").html("密码过于简单");
                $pflag = true;
            }
            if (count < 3 && count >= 2) {
                $(this).siblings("em").css({
                    backgroundPosition: "0 -37px"
                })
                $(this).siblings("p").children("strong").html("试试字母符号、数字的组合更安全");
                $(this).siblings("p").children("i").eq(1).css("backgroundColor", "green");
                $pflag = true;
            } else {
                $(this).siblings("p").children("i").eq(1).css("backgroundColor", "#D6D6D6");
            }
            if (count >= 3) {
                $(this).siblings("em").css({
                    backgroundPosition: "0 -37px"
                })
                $(this).siblings("p").children("i").eq(2).css("backgroundColor", "yellow");
                $(this).siblings("p").children("i").eq(1).css("backgroundColor", "green");
                $(this).siblings("p").children("strong").html("密码设置安全,请放心使用");
                $pflag = true;
            } else {
                $(this).siblings("p").children("i").eq(2).css("backgroundColor", "#D6D6D6");
            }
        }
    } else {
        $(this).siblings("em").css({
            backgroundPosition: "-999px -999px"
        })
        $(this).siblings("p").css("visibility", "hidden");
        $pflag = false;
    }
})
$(".password").on("blur", function() {
    $(this).siblings("h3").css(
        "display", "none");
    if ($(this).val()) {
        if ($(this).val().length < 6) {
            $(this).siblings("em").css({
                backgroundPosition: "0 -18px"
            })
            $(this).siblings("p").css({
                visibility: "visible",
                color: "red"
            }).html("密码长度6-20个字符,请重新输入");
            $pflag = false;
            $(this).css({
                backgroundColor: "#FEF0EF",
                borderColor: "red"
            })
        } else {
            $(this).siblings("p").css("visibility", "visible");
            $pflag = true;
        }
    }
})
$(".repass").on("focus input", function() {
    $(this).siblings("p").html("请再次输入密码");
    $(this).siblings("em").css({
        backgroundPosition: "-999px -999px"
    })
})
$(".repass").on("blur", function() {
    let $value = $(".password").val();
    if ($(this).val()) {
        if ($(this).val() !== $value) {
            $(this).css({
                backgroundColor: "#FEF0EF",
                borderColor: "red"
            });
            $(this).siblings("p").css({
                visibility: "visible",
                color: "red"
            }).html("两次密码不一致,请重新输入");
            $(this).siblings("em").css({
                backgroundPosition: "0 -18px"
            })
            $reflag = false;
        } else {
            $(this).siblings("em").css({
                backgroundPosition: "0 -37px"
            })
            $reflag = true;
        }
    } else {
        $reflag = false;
    }
})
$("#re_form").on("submit", function() {
    if (!$(".repass").val()) {
        $(".repass").siblings("p").css({
            visibility: "visible",
            color: "red"
        }).html("密码不能为空");
        $(".repass").siblings("em").css({
            backgroundPosition: "0 -18px"
        })
        $(".repass").css({
            backgroundColor: "#FEF0EF",
            borderColor: "red"
        });
        $reflag = false;
    }
    if (!$(".password").val()) {
        $(".password").siblings("p").css({
            visibility: "visible",
            color: "red"
        }).html("登录密码不能为空");
        $(".password").siblings("em").css({
            backgroundPosition: "0 -18px"
        })
        $(".password").css({
            backgroundColor: "#FEF0EF",
            borderColor: "red"
        });
        $pflag = false;
    }
    if (!$(".tel").val()) {
        $(".tel").siblings("p").css({
            visibility: "visible",
            color: "red"
        }).html("手机号码不能为空");
        $(".tel").siblings("em").css({
            backgroundPosition: "0 -18px"
        })
        $(".tel").css({
            backgroundColor: "#FEF0EF",
            borderColor: "red"
        });
        $tflag = false;
    }
    if (!$tflag || !$pflag || !$reflag || !$(".affirm_re input").prop("checked")) {
        return false
    }
})







// $.ajax({
//     url: 'http://10.31.165.21:3000/projectname/php/new_enterpriseRegisty.php',
//     dataType: 'json',
//     contentType: 'text/html;charset=UTF-8'
// }).done((d) => {
//     //decodeURI(d[1].name);
//     console.log(unescape(d));
//     console.log(unescape(d[1].name));
// })