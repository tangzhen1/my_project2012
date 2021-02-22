import {} from "https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.js";
$(function() {
    $(".sage_int").css("display", "block")
    $(".sage_int button").on("click", function() {
        $(".sage_int").css("display", "none")
    })

    function login_click(node) {
        node.on("click", function() {
            $(this).css("borderColor", "#969696")
            $(this).children("span").css("display", "none")
            $(this).children("em").css("color", "#e2e2e2")
            $(this).children("input").css("display", "block").focus();
            $(this).siblings("p").css({
                color: "#6E6E6E",
                display: "block"
            });
            return false
        })
        $(document).on("click", function() {
            if (!node.children("input").val() && node.children("span").css("display") === "none") {
                node.css("borderColor", "#E6E6E6")
                node.children("span").css("display", "block")
                node.children("i").css("display", "none")
                node.children("input").css("display", "none")
                node.siblings("p").css("display", "none");
            } else {
                if (node.children("input").val()) {
                    node.siblings("p").css("display", "none");
                    node.css("borderColor", "#E6E6E6")
                }
            }
            return true
        })
        node.children("input").on("input", function() {
            node.children("i").css("display", "block")
        })
    }
    login_click($(".user_div"));
    login_click($(".pass_div"));
    login_aClick($(".login_a a"), $(".user_div"), $(".pass_div"))

    function login_aClick(node1, node2, node3) {
        node1.on("click", function() {
            if (!node2.children("input").val() || !node3.children("input").val()) {
                if (!node2.children("input").val()) {
                    node2.siblings("p").css({
                        display: "block",
                        color: "red"
                    });
                    node2.css("borderColor", "red")
                    node2.children("em").css("color", "red")
                }
                if (!node3.children("input").val()) {
                    node3.siblings("p").css({
                        display: "block",
                        color: "red"
                    });
                    node3.css("borderColor", "red")
                    node3.children("em").css("color", "red")
                }
            } else {
                $.ajax({
                    type: "post",
                    url: "http://10.31.165.21:3000/projectname/php/login.php",
                    data: {
                        tel: node2.children("input").val(),
                        password: node3.children("input").val()
                    }
                }).done((d) => {
                    if (d === "true") {
                        window.localStorage.setItem("tel", node2.children("input").val());
                        location.href = "index1.html";
                    } else {
                        node2.siblings("p").css({
                            display: "block",
                            color: "red"
                        }).html("用户名或者密码输入错误,&nbsp;请核对后重新输入");
                        node2.css("borderColor", "red")
                        node2.children("em").css("color", "red")
                        node3.children("input").val("");
                        node3.css("borderColor", "red")
                        node3.children("em").css("color", "red")
                    }
                })
            }
        })
    }
})