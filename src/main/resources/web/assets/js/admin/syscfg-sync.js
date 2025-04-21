"use strict";
var _DefaultRole;
useEditComp = function useEditComp(name) {
    if (["DingtalkSyncUsers", "WxworkSyncUsers", "FeishuSyncUsers"].includes(name)) {
        return React.createElement("select", {
            className: "form-control form-control-sm"
        }, React.createElement("option", {
            value: "true"
        }, $L("是")), React.createElement("option", {
            value: "false"
        }, $L("否")))
    } else if (["DingtalkSyncUsersRole", "WxworkSyncUsersRole", "FeishuSyncUsersRole"].includes(name)) {
        var iv = $("td[data-id=\"".concat(name, "\"]")).attr("data-value");
        setTimeout(function() {
            renderRbcomp(React.createElement(UserSelector, {
                hideDepartment: true,
                hideUser: true,
                hideTeam: true,
                multiple: false,
                defaultValue: iv
            }), name, function() {
                _DefaultRole = this
            })
        }, 100);
        return React.createElement("div", {
            id: name,
            style: {
                maxWidth: 400
            }
        })
    } else if (["DingtalkSyncUsersMatch", "WxworkSyncUsersMatch", "FeishuSyncUsersMatch"].includes(name)) {
        return React.createElement("select", {
            className: "form-control form-control-sm"
        }, React.createElement("option", {
            value: "ID"
        }, $L("默认")), React.createElement("option", {
            value: "EMAIL"
        }, $L("邮箱")), location.href.includes("/wxwork") && React.createElement("option", {
            value: "NAME"
        }, $L("用户名/账号")), React.createElement("option", {
            value: "NAME2"
        }, $L("姓名")))
    }
}
;
postBefore = function postBefore(data) {
    var v = _DefaultRole && _DefaultRole.val()[0];
    if ($("#DingtalkSyncUsersRole")[0])
        data.DingtalkSyncUsersRole = v || "";
    else if ($("#WxworkSyncUsersRole")[0])
        data.WxworkSyncUsersRole = v || "";
    else if ($("#FeishuSyncUsersRole")[0])
        data.FeishuSyncUsersRole = v || "";
    return data
}
;
$(document).ready(function() {
    var $btn = $(".J_syncUsers").on("click", function() {
        RbAlert.create($L("确认立即同步部门用户？"), {
            onConfirm: function onConfirm() {
                $btn.button("loading").find(".icon").addClass("zmdi-hc-spin");
                this.hide();
                syncUsers()
            }
        })
    })
});
function syncUsers() {
    $.post("".concat(location.href.split("#")[0], "/sync-users"), function(res) {
        if (res.error_code === 0)
            RbHighbar.success("同步完成");
        else
            RbHighbar.error(res.error_msg);
        $(".J_syncUsers").button("reset").find(".icon").removeClass("zmdi-hc-spin")
    })
}
