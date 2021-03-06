var _ = {},
  sa = {
    para: {
      name: "sensors",
      server_url: "",
      send_timeout: 1e3,
      use_client_time: !1,
      show_log: !0,
      allow_amend_share_path: !0,
      max_string_length: 300,
      datasend_timeout: 3e3,
      source_channel: [],
      autoTrack: {
        appLaunch: !0,
        appShow: !0,
        appHide: !0,
        pageShow: !0,
        pageShare: !0,
        mpClick: !1,
      },
      is_persistent_save: !1,
    },
  },
  mpHook = {
    data: 1,
    onLoad: 1,
    onShow: 1,
    onReady: 1,
    onPullDownRefresh: 1,
    onReachBottom: 1,
    onShareAppMessage: 1,
    onPageScroll: 1,
    onResize: 1,
    onTabItemTap: 1,
    onHide: 1,
    onUnload: 1,
  },
  logger = "object" == typeof logger ? logger : {};
(logger.info = function() {
  if (sa.para.show_log && "object" == typeof console && console.log)
    try {
      return console.log.apply(console, arguments);
    } catch (t) {
      console.log(arguments[0]);
    }
}),
  (sa.setPara = function(t) {
    sa.para = _.extend2Lev(sa.para, t);
    var e = [];
    if (_.isArray(sa.para.source_channel))
      for (var a = sa.para.source_channel.length, r = 0; r < a; r++)
        -1 ===
          " utm_source utm_medium utm_campaign utm_content utm_term sa_utm ".indexOf(
            " " + sa.para.source_channel[r] + " "
          ) && e.push(sa.para.source_channel[r]);
    (sa.para.source_channel = e),
      _.isObject(sa.para.register) &&
        _.extend(_.info.properties, sa.para.register),
      sa.para.openid_url ||
        (sa.para.openid_url = sa.para.server_url.replace(
          /([^\/])\/(sa)(\.gif){0,1}/,
          "$1/mp_login"
        )),
      "number" != typeof sa.para.send_timeout && (sa.para.send_timeout = 1e3);
    var s = { send_timeout: 6e3, max_length: 6 };
    (t && t.datasend_timeout) ||
      (sa.para.batch_send && (sa.para.datasend_timeout = 1e4)),
      !0 === sa.para.batch_send
        ? ((sa.para.batch_send = _.extend({}, s)),
          (sa.para.use_client_time = !0))
        : "object" == typeof sa.para.batch_send &&
          ((sa.para.use_client_time = !0),
          (sa.para.batch_send = _.extend({}, s, sa.para.batch_send))),
      sa.para.server_url ||
        logger.info(
          "\u8bf7\u4f7f\u7528 setPara() \u65b9\u6cd5\u8bbe\u7f6e server_url \u6570\u636e\u63a5\u6536\u5730\u5740,\u8be6\u60c5\u53ef\u67e5\u770bhttps://www.sensorsdata.cn/manual/mp_sdk_new.html#112-%E5%BC%95%E5%85%A5%E5%B9%B6%E9%85%8D%E7%BD%AE%E5%8F%82%E6%95%B0"
        );
  }),
  (sa.status = {});
var ArrayProto = Array.prototype,
  FuncProto = Function.prototype,
  ObjProto = Object.prototype,
  slice = ArrayProto.slice,
  toString = ObjProto.toString,
  hasOwnProperty = ObjProto.hasOwnProperty,
  LIB_VERSION = "1.13.19",
  LIB_NAME = "MiniProgram",
  source_channel_standard =
    "utm_source utm_medium utm_campaign utm_content utm_term",
  latest_source_channel = [
    "$latest_utm_source",
    "$latest_utm_medium",
    "$latest_utm_campaign",
    "$latest_utm_content",
    "$latest_utm_term",
    "latest_sa_utm",
  ],
  mp_scene = {
    1000: "\u5176\u4ed6",
    1001: "\u53d1\u73b0\u680f\u5c0f\u7a0b\u5e8f\u4e3b\u5165\u53e3\uff0c???\u6700\u8fd1\u4f7f\u7528???\u5217\u8868\uff08\u57fa\u7840\u5e932.2.4\u7248\u672c\u8d77\u5305\u542b???\u6211\u7684\u5c0f\u7a0b\u5e8f???\u5217\u8868\uff09",
    1005: "\u9876\u90e8\u641c\u7d22\u6846\u7684\u641c\u7d22\u7ed3\u679c\u9875",
    1006: "\u53d1\u73b0\u680f\u5c0f\u7a0b\u5e8f\u4e3b\u5165\u53e3\u641c\u7d22\u6846\u7684\u641c\u7d22\u7ed3\u679c\u9875",
    1007: "\u5355\u4eba\u804a\u5929\u4f1a\u8bdd\u4e2d\u7684\u5c0f\u7a0b\u5e8f\u6d88\u606f\u5361\u7247",
    1008: "\u7fa4\u804a\u4f1a\u8bdd\u4e2d\u7684\u5c0f\u7a0b\u5e8f\u6d88\u606f\u5361\u7247",
    1011: "\u626b\u63cf\u4e8c\u7ef4\u7801",
    1012: "\u957f\u6309\u56fe\u7247\u8bc6\u522b\u4e8c\u7ef4\u7801",
    1013: "\u624b\u673a\u76f8\u518c\u9009\u53d6\u4e8c\u7ef4\u7801",
    1014: "\u5c0f\u7a0b\u5e8f\u6a21\u7248\u6d88\u606f",
    1017: "\u524d\u5f80\u4f53\u9a8c\u7248\u7684\u5165\u53e3\u9875",
    1019: "\u5fae\u4fe1\u94b1\u5305",
    1020: "\u516c\u4f17\u53f7 profile \u9875\u76f8\u5173\u5c0f\u7a0b\u5e8f\u5217\u8868",
    1022: "\u804a\u5929\u9876\u90e8\u7f6e\u9876\u5c0f\u7a0b\u5e8f\u5165\u53e3",
    1023: "\u5b89\u5353\u7cfb\u7edf\u684c\u9762\u56fe\u6807",
    1024: "\u5c0f\u7a0b\u5e8f profile \u9875",
    1025: "\u626b\u63cf\u4e00\u7ef4\u7801",
    1026: "\u9644\u8fd1\u5c0f\u7a0b\u5e8f\u5217\u8868",
    1027: "\u9876\u90e8\u641c\u7d22\u6846\u641c\u7d22\u7ed3\u679c\u9875???\u4f7f\u7528\u8fc7\u7684\u5c0f\u7a0b\u5e8f???\u5217\u8868",
    1028: "\u6211\u7684\u5361\u5305",
    1029: "\u5361\u5238\u8be6\u60c5\u9875",
    1030: "\u81ea\u52a8\u5316\u6d4b\u8bd5\u4e0b\u6253\u5f00\u5c0f\u7a0b\u5e8f",
    1031: "\u957f\u6309\u56fe\u7247\u8bc6\u522b\u4e00\u7ef4\u7801",
    1032: "\u624b\u673a\u76f8\u518c\u9009\u53d6\u4e00\u7ef4\u7801",
    1034: "\u5fae\u4fe1\u652f\u4ed8\u5b8c\u6210\u9875",
    1035: "\u516c\u4f17\u53f7\u81ea\u5b9a\u4e49\u83dc\u5355",
    1036: "App \u5206\u4eab\u6d88\u606f\u5361\u7247",
    1037: "\u5c0f\u7a0b\u5e8f\u6253\u5f00\u5c0f\u7a0b\u5e8f",
    1038: "\u4ece\u53e6\u4e00\u4e2a\u5c0f\u7a0b\u5e8f\u8fd4\u56de",
    1039: "\u6447\u7535\u89c6",
    1042: "\u6dfb\u52a0\u597d\u53cb\u641c\u7d22\u6846\u7684\u641c\u7d22\u7ed3\u679c\u9875",
    1043: "\u516c\u4f17\u53f7\u6a21\u677f\u6d88\u606f",
    1044: "\u5e26 shareTicket \u7684\u5c0f\u7a0b\u5e8f\u6d88\u606f\u5361\u7247\uff08\u8be6\u60c5)",
    1045: "\u670b\u53cb\u5708\u5e7f\u544a",
    1046: "\u670b\u53cb\u5708\u5e7f\u544a\u8be6\u60c5\u9875",
    1047: "\u626b\u63cf\u5c0f\u7a0b\u5e8f\u7801",
    1048: "\u957f\u6309\u56fe\u7247\u8bc6\u522b\u5c0f\u7a0b\u5e8f\u7801",
    1049: "\u624b\u673a\u76f8\u518c\u9009\u53d6\u5c0f\u7a0b\u5e8f\u7801",
    1052: "\u5361\u5238\u7684\u9002\u7528\u95e8\u5e97\u5217\u8868",
    1053: "\u641c\u4e00\u641c\u7684\u7ed3\u679c\u9875",
    1054: "\u9876\u90e8\u641c\u7d22\u6846\u5c0f\u7a0b\u5e8f\u5feb\u6377\u5165\u53e3",
    1056: "\u97f3\u4e50\u64ad\u653e\u5668\u83dc\u5355",
    1057: "\u94b1\u5305\u4e2d\u7684\u94f6\u884c\u5361\u8be6\u60c5\u9875",
    1058: "\u516c\u4f17\u53f7\u6587\u7ae0",
    1059: "\u4f53\u9a8c\u7248\u5c0f\u7a0b\u5e8f\u7ed1\u5b9a\u9080\u8bf7\u9875",
    1064: "\u5fae\u4fe1\u8fdeWi-Fi\u72b6\u6001\u680f",
    1067: "\u516c\u4f17\u53f7\u6587\u7ae0\u5e7f\u544a",
    1068: "\u9644\u8fd1\u5c0f\u7a0b\u5e8f\u5217\u8868\u5e7f\u544a",
    1069: "\u79fb\u52a8\u5e94\u7528",
    1071: "\u94b1\u5305\u4e2d\u7684\u94f6\u884c\u5361\u5217\u8868\u9875",
    1072: "\u4e8c\u7ef4\u7801\u6536\u6b3e\u9875\u9762",
    1073: "\u5ba2\u670d\u6d88\u606f\u5217\u8868\u4e0b\u53d1\u7684\u5c0f\u7a0b\u5e8f\u6d88\u606f\u5361\u7247",
    1074: "\u516c\u4f17\u53f7\u4f1a\u8bdd\u4e0b\u53d1\u7684\u5c0f\u7a0b\u5e8f\u6d88\u606f\u5361\u7247",
    1077: "\u6447\u5468\u8fb9",
    1078: "\u8fdeWi-Fi\u6210\u529f\u9875",
    1079: "\u5fae\u4fe1\u6e38\u620f\u4e2d\u5fc3",
    1081: "\u5ba2\u670d\u6d88\u606f\u4e0b\u53d1\u7684\u6587\u5b57\u94fe",
    1082: "\u516c\u4f17\u53f7\u4f1a\u8bdd\u4e0b\u53d1\u7684\u6587\u5b57\u94fe",
    1084: "\u670b\u53cb\u5708\u5e7f\u544a\u539f\u751f\u9875",
    1088: "\u4f1a\u8bdd\u4e2d\u67e5\u770b\u7cfb\u7edf\u6d88\u606f\uff0c\u6253\u5f00\u5c0f\u7a0b\u5e8f",
    1089: "\u5fae\u4fe1\u804a\u5929\u4e3b\u754c\u9762\u4e0b\u62c9",
    1090: "\u957f\u6309\u5c0f\u7a0b\u5e8f\u53f3\u4e0a\u89d2\u83dc\u5355\u5524\u51fa\u6700\u8fd1\u4f7f\u7528\u5386\u53f2",
    1091: "\u516c\u4f17\u53f7\u6587\u7ae0\u5546\u54c1\u5361\u7247",
    1092: "\u57ce\u5e02\u670d\u52a1\u5165\u53e3",
    1095: "\u5c0f\u7a0b\u5e8f\u5e7f\u544a\u7ec4\u4ef6",
    1096: "\u804a\u5929\u8bb0\u5f55",
    1097: "\u5fae\u4fe1\u652f\u4ed8\u7b7e\u7ea6\u9875",
    1099: "\u9875\u9762\u5185\u5d4c\u63d2\u4ef6",
    1102: "\u516c\u4f17\u53f7 profile \u9875\u670d\u52a1\u9884\u89c8",
    1103: "\u53d1\u73b0\u680f\u5c0f\u7a0b\u5e8f\u4e3b\u5165\u53e3\uff0c???\u6211\u7684\u5c0f\u7a0b\u5e8f???\u5217\u8868",
    1104: "\u5fae\u4fe1\u804a\u5929\u4e3b\u754c\u9762\u4e0b\u62c9\uff0c???\u6211\u7684\u5c0f\u7a0b\u5e8f???\u680f",
    1106: "\u804a\u5929\u4e3b\u754c\u9762\u4e0b\u62c9\uff0c\u4ece\u9876\u90e8\u641c\u7d22\u7ed3\u679c\u9875\uff0c\u6253\u5f00\u5c0f\u7a0b\u5e8f",
    1107: "\u8ba2\u9605\u6d88\u606f\uff0c\u6253\u5f00\u5c0f\u7a0b\u5e8f",
    1113: "\u5b89\u5353\u624b\u673a\u8d1f\u4e00\u5c4f\uff0c\u6253\u5f00\u5c0f\u7a0b\u5e8f(\u4e09\u661f)",
    1114: "\u5b89\u5353\u624b\u673a\u4fa7\u8fb9\u680f\uff0c\u6253\u5f00\u5c0f\u7a0b\u5e8f(\u4e09\u661f)",
    1124: "\u626b???\u4e00\u7269\u4e00\u7801???\u6253\u5f00\u5c0f\u7a0b\u5e8f",
    1125: "\u957f\u6309\u56fe\u7247\u8bc6\u522b???\u4e00\u7269\u4e00\u7801???",
    1126: "\u626b\u63cf\u624b\u673a\u76f8\u518c\u4e2d\u9009\u53d6\u7684???\u4e00\u7269\u4e00\u7801???",
    1129: "\u5fae\u4fe1\u722c\u866b\u8bbf\u95ee",
    1131: "\u6d6e\u7a97\u6253\u5f00\u5c0f\u7a0b\u5e8f",
    1146: "\u5730\u7406\u4f4d\u7f6e\u4fe1\u606f\u6253\u5f00\u51fa\u884c\u7c7b\u5c0f\u7a0b\u5e8f",
    1148: "\u5361\u5305-\u4ea4\u901a\u5361\uff0c\u6253\u5f00\u5c0f\u7a0b\u5e8f",
  },
  sa_referrer = "\u76f4\u63a5\u6253\u5f00";
sa.status.referrer = "\u76f4\u63a5\u6253\u5f00";
var mpshow_time = null,
  share_depth = 0,
  share_distinct_id = "",
  is_first_launch = !1;
function mp_proxy(t, e, a) {
  var r = sa.autoTrackCustom[a];
  if (t[e]) {
    var s = t[e];
    t[e] = function() {
      "onLaunch" === e && (this[sa.para.name] = sa),
        !sa.para.autoTrackIsFirst ||
        (_.isObject(sa.para.autoTrackIsFirst) && !sa.para.autoTrackIsFirst[a])
          ? (s.apply(this, arguments), r.apply(this, arguments))
          : (!0 === sa.para.autoTrackIsFirst ||
              (_.isObject(sa.para.autoTrackIsFirst) &&
                sa.para.autoTrackIsFirst[a])) &&
            (r.apply(this, arguments), s.apply(this, arguments));
    };
  } else
    t[e] = function() {
      "onLaunch" === e && (this[sa.para.name] = sa), r.apply(this, arguments);
    };
}
function click_proxy(t, e) {
  var a = t[e];
  t[e] = function() {
    var t = {},
      e = "";
    if ("object" == typeof arguments[0]) {
      var r = arguments[0].currentTarget || {},
        s = r.dataset || {};
        var eventName = r.dataset ? r.dataset['event_name'] : '' ;
        for(const key in s){
          // ??????????????????
          if(key != 'eventOpts' && key !="event_name"){
            t[key] = s[key];
            // ?????? key ??? n ?????????,?????????????????????
            if(key && key.length >1 && key.split("_")[0] === 'n' ){
              t[key] = s[key] ? Number(s[key]) : 0 ;
              t.t[key] = s[key] ? Number(s[key]) : 0;
            }
            // ??????key ?????? ""
            if(s[key] == true && s[key]!==1 && key.split("_")[0] !== 'is'){
              t[key] = '';
              t.t[key] = '';
            }
          }
        };
      (e = arguments[0].type),
        (t.$url_path = _.getCurrentPath()),
        (t.$element_id = r.id),
        (t.$element_type = s.type),
        (t.$element_content = s.content),
        (t.$element_name = s.name);
    }
    return (
      e && _.isClick(e) && eventName && sa.track(eventName, t),
      a && a.apply(this, arguments)
    );
  };
}
(sa.lib_version = LIB_VERSION),
  (function() {
    FuncProto.bind;
    var t = ArrayProto.forEach,
      e = ArrayProto.indexOf,
      a = Array.isArray,
      r = {},
      s = (_.each = function(e, a, s) {
        if (null == e) return !1;
        if (t && e.forEach === t) e.forEach(a, s);
        else if (e.length === +e.length) {
          for (var n = 0, i = e.length; n < i; n++)
            if (n in e && a.call(s, e[n], n, e) === r) return !1;
        } else
          for (var o in e)
            if (hasOwnProperty.call(e, o) && a.call(s, e[o], o, e) === r)
              return !1;
      });
    (_.logger = logger),
      (_.extend = function(t) {
        return (
          s(slice.call(arguments, 1), function(e) {
            for (var a in e) void 0 !== e[a] && (t[a] = e[a]);
          }),
          t
        );
      }),
      (_.extend2Lev = function(t) {
        return (
          s(slice.call(arguments, 1), function(e) {
            for (var a in e)
              void 0 !== e[a] &&
                (_.isObject(e[a]) && _.isObject(t[a])
                  ? _.extend(t[a], e[a])
                  : (t[a] = e[a]));
          }),
          t
        );
      }),
      (_.coverExtend = function(t) {
        return (
          s(slice.call(arguments, 1), function(e) {
            for (var a in e)
              void 0 !== e[a] && void 0 === t[a] && (t[a] = e[a]);
          }),
          t
        );
      }),
      (_.isArray =
        a ||
        function(t) {
          return "[object Array]" === toString.call(t);
        }),
      (_.isFunction = function(t) {
        try {
          return /^\s*\bfunction\b/.test(t);
        } catch (t) {
          return !1;
        }
      }),
      (_.isArguments = function(t) {
        return !(!t || !hasOwnProperty.call(t, "callee"));
      }),
      (_.toArray = function(t) {
        return t
          ? t.toArray
            ? t.toArray()
            : _.isArray(t)
            ? slice.call(t)
            : _.isArguments(t)
            ? slice.call(t)
            : _.values(t)
          : [];
      }),
      (_.values = function(t) {
        var e = [];
        return null == t
          ? e
          : (s(t, function(t) {
              e[e.length] = t;
            }),
            e);
      }),
      (_.include = function(t, a) {
        var n = !1;
        return null == t
          ? n
          : e && t.indexOf === e
          ? -1 != t.indexOf(a)
          : (s(t, function(t) {
              if (n || (n = t === a)) return r;
            }),
            n);
      });
  })(),
  (_.trim = function(t) {
    return t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
  }),
  (_.isObject = function(t) {
    return null != t && "[object Object]" == toString.call(t);
  }),
  (_.isEmptyObject = function(t) {
    if (_.isObject(t)) {
      for (var e in t) if (hasOwnProperty.call(t, e)) return !1;
      return !0;
    }
    return !1;
  }),
  (_.isUndefined = function(t) {
    return void 0 === t;
  }),
  (_.isString = function(t) {
    return "[object String]" == toString.call(t);
  }),
  (_.isDate = function(t) {
    return "[object Date]" == toString.call(t);
  }),
  (_.isBoolean = function(t) {
    return "[object Boolean]" == toString.call(t);
  }),
  (_.isNumber = function(t) {
    return "[object Number]" == toString.call(t) && /[\d\.]+/.test(String(t));
  }),
  (_.isJSONString = function(t) {
    try {
      JSON.parse(t);
    } catch (t) {
      return !1;
    }
    return !0;
  }),
  (_.decodeURIComponent = function(t) {
    var e = "";
    try {
      e = decodeURIComponent(t);
    } catch (a) {
      e = t;
    }
    return e;
  }),
  (_.encodeDates = function(t) {
    return (
      _.each(t, function(e, a) {
        _.isDate(e)
          ? (t[a] = _.formatDate(e))
          : _.isObject(e) && (t[a] = _.encodeDates(e));
      }),
      t
    );
  }),
  (_.formatDate = function(t) {
    function e(t) {
      return t < 10 ? "0" + t : t;
    }
    return (
      t.getFullYear() +
      "-" +
      e(t.getMonth() + 1) +
      "-" +
      e(t.getDate()) +
      " " +
      e(t.getHours()) +
      ":" +
      e(t.getMinutes()) +
      ":" +
      e(t.getSeconds()) +
      "." +
      e(t.getMilliseconds())
    );
  }),
  (_.searchObjDate = function(t) {
    _.isObject(t) &&
      _.each(t, function(e, a) {
        _.isObject(e)
          ? _.searchObjDate(t[a])
          : _.isDate(e) && (t[a] = _.formatDate(e));
      });
  }),
  (_.formatString = function(t) {
    return t.length > sa.para.max_string_length
      ? (logger.info(
          "\u5b57\u7b26\u4e32\u957f\u5ea6\u8d85\u8fc7\u9650\u5236\uff0c\u5df2\u7ecf\u505a\u622a\u53d6--" +
            t
        ),
        t.slice(0, sa.para.max_string_length))
      : t;
  }),
  (_.searchObjString = function(t) {
    _.isObject(t) &&
      _.each(t, function(e, a) {
        _.isObject(e)
          ? _.searchObjString(t[a])
          : _.isString(e) && (t[a] = _.formatString(e));
      });
  }),
  (_.unique = function(t) {
    for (var e, a = [], r = {}, s = 0; s < t.length; s++)
      (e = t[s]) in r || ((r[e] = !0), a.push(e));
    return a;
  }),
  (_.strip_sa_properties = function(t) {
    return _.isObject(t)
      ? (_.each(t, function(e, a) {
          if (_.isArray(e)) {
            var r = [];
            _.each(e, function(t) {
              _.isString(t)
                ? r.push(t)
                : logger.info(
                    "\u60a8\u7684\u6570\u636e-",
                    e,
                    "\u7684\u6570\u7ec4\u91cc\u7684\u503c\u5fc5\u987b\u662f\u5b57\u7b26\u4e32,\u5df2\u7ecf\u5c06\u5176\u5220\u9664"
                  );
            }),
              0 !== r.length
                ? (t[a] = r)
                : (delete t[a],
                  logger.info(
                    "\u5df2\u7ecf\u5220\u9664\u7a7a\u7684\u6570\u7ec4"
                  ));
          }
          _.isString(e) ||
            _.isNumber(e) ||
            _.isDate(e) ||
            _.isBoolean(e) ||
            _.isArray(e) ||
            (logger.info(
              "\u60a8\u7684\u6570\u636e-",
              e,
              "-\u683c\u5f0f\u4e0d\u6ee1\u8db3\u8981\u6c42\uff0c\u6211\u4eec\u5df2\u7ecf\u5c06\u5176\u5220\u9664"
            ),
            delete t[a]);
        }),
        t)
      : t;
  }),
  (_.strip_empty_properties = function(t) {
    var e = {};
    return (
      _.each(t, function(t, a) {
        null != t && (e[a] = t);
      }),
      e
    );
  }),
  (_.utf8Encode = function(t) {
    var e,
      a,
      r,
      s,
      n = "";
    for (
      e = a = 0,
        r = (t = (t + "").replace(/\r\n/g, "\n").replace(/\r/g, "\n")).length,
        s = 0;
      s < r;
      s++
    ) {
      var i = t.charCodeAt(s),
        o = null;
      i < 128
        ? a++
        : (o =
            i > 127 && i < 2048
              ? String.fromCharCode((i >> 6) | 192, (63 & i) | 128)
              : String.fromCharCode(
                  (i >> 12) | 224,
                  ((i >> 6) & 63) | 128,
                  (63 & i) | 128
                )),
        null !== o &&
          (a > e && (n += t.substring(e, a)), (n += o), (e = a = s + 1));
    }
    return a > e && (n += t.substring(e, t.length)), n;
  }),
  (_.base64Encode = function(t) {
    var e,
      a,
      r,
      s,
      n,
      i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      o = 0,
      c = 0,
      u = "",
      p = [];
    if (!t) return t;
    t = _.utf8Encode(t);
    do {
      (e =
        ((n =
          (t.charCodeAt(o++) << 16) |
          (t.charCodeAt(o++) << 8) |
          t.charCodeAt(o++)) >>
          18) &
        63),
        (a = (n >> 12) & 63),
        (r = (n >> 6) & 63),
        (s = 63 & n),
        (p[c++] = i.charAt(e) + i.charAt(a) + i.charAt(r) + i.charAt(s));
    } while (o < t.length);
    switch (((u = p.join("")), t.length % 3)) {
      case 1:
        u = u.slice(0, -2) + "==";
        break;
      case 2:
        u = u.slice(0, -1) + "=";
    }
    return u;
  }),
  (_.getCurrentPath = function() {
    var t = "\u672a\u53d6\u5230";
    try {
      var e = getCurrentPages();
      t = e[e.length - 1].route;
    } catch (t) {
      logger.info(t);
    }
    return t;
  }),
  (_.getCurrentUrl = function(t) {
    var e = _.getCurrentPath(),
      a = "";
    return (
      _.isObject(t) &&
        t.sensors_mp_encode_url_query &&
        (a = t.sensors_mp_encode_url_query),
      e ? (a ? e + "?" + a : e) : "\u672a\u53d6\u5230"
    );
  }),
  (_.getPath = function(t) {
    return (t =
      "string" == typeof t ? t.replace(/^\//, "") : "\u53d6\u503c\u5f02\u5e38");
  }),
  (_.getMethods = function(t) {
    var e = [];
    for (var a in t) "function" != typeof t[a] || mpHook[a] || e.push(a);
    return e;
  }),
  (_.isClick = function(t) {
    return !!{ tap: 1, longpress: 1, longtap: 1 }[t];
  }),
  (sa.initialState = {
    queue: [],
    isComplete: !1,
    systemIsComplete: !1,
    storeIsComplete: !1,
    checkIsComplete: function() {
      this.systemIsComplete &&
        this.storeIsComplete &&
        ((this.isComplete = !0),
        this.queue.length > 0 &&
          (_.each(this.queue, function(t) {
            sa[t[0]].apply(sa, slice.call(t[1]));
          }),
          (this.queue = [])));
    },
  }),
  (_.getCustomUtmFromQuery = function(t, e, a, r) {
    if (!_.isObject(t)) return {};
    var s = {};
    if (t.sa_utm)
      for (var n in t)
        "sa_utm" !== n
          ? _.include(sa.para.source_channel, n) && (s[a + n] = t[n])
          : (s[r + n] = t[n]);
    else
      for (var n in t)
        -1 === (" " + source_channel_standard + " ").indexOf(" " + n + " ")
          ? _.include(sa.para.source_channel, n) && (s[a + n] = t[n])
          : (s[e + n] = t[n]);
    return s;
  }),
  (_.getObjFromQuery = function(t) {
    var e = t.split("?"),
      a = [],
      r = {};
    return e && e[1]
      ? (_.each(e[1].split("&"), function(t) {
          (a = t.split("="))[0] && a[1] && (r[a[0]] = a[1]);
        }),
        r)
      : {};
  }),
  (_.setStorageSync = function(t, e) {
    var a = function() {
      uni.setStorageSync(t, e);
    };
    try {
      a();
    } catch (t) {
      logger.info("set Storage fail --", t);
      try {
        a();
      } catch (t) {
        logger.info("set Storage fail again --", t);
      }
    }
  }),
  (_.getStorageSync = function(t) {
    var e = "";
    try {
      e = uni.getStorageSync(t);
    } catch (a) {
      try {
        e = uni.getStorageSync(t);
      } catch (t) {
        logger.info("getStorage fail");
      }
    }
    return e;
  }),
  (_.getMPScene = function(t) {
    return "number" == typeof t || ("string" == typeof t && "" !== t)
      ? ((t = String(t)), mp_scene[t] || t)
      : "\u672a\u53d6\u5230\u503c";
  }),
  (_.getShareDepth = function() {
    if ("number" == typeof share_depth && 0 !== share_depth) {
      var t = sa.store.getDistinctId(),
        e = sa.store.getFirstId();
      return !share_distinct_id ||
        (share_distinct_id !== t && share_distinct_id !== e)
        ? share_depth + 1
        : share_depth;
    }
    return 1;
  }),
  (_.setShareInfo = function(t, e) {
    var a = {};
    if (!(t && _.isObject(t.query) && t.query.sampshare)) return {};
    if (((a = _.decodeURIComponent(t.query.sampshare)), !_.isJSONString(a)))
      return {};
    var r = (a = JSON.parse(a)).d,
      s = a.p,
      n = a.i;
    "string" == typeof n
      ? ((e.$share_distinct_id = n), (share_distinct_id = n))
      : (e.$share_distinct_id = "\u53d6\u503c\u5f02\u5e38"),
      "number" == typeof r
        ? ((e.$share_depth = r), (share_depth = r))
        : (e.$share_depth = "-1"),
      (e.$share_url_path =
        "string" == typeof s ? s : "\u53d6\u503c\u5f02\u5e38");
  }),
  (_.getShareInfo = function() {
    return JSON.stringify({
      i: sa.store.getDistinctId() || "\u53d6\u503c\u5f02\u5e38",
      p: _.getCurrentPath(),
      d: _.getShareDepth(),
    });
  }),
  (_.detectOptionQuery = function(t) {
    if (!t || !_.isObject(t.query)) return {};
    var e,
      a,
      r,
      s,
      n = {};
    return (
      (n.query = _.extend({}, t.query)),
      "string" == typeof n.query.scene &&
        ((e = n.query),
        (a = [
          "utm_source",
          "utm_content",
          "utm_medium",
          "utm_campaign",
          "utm_term",
          "sa_utm",
        ].concat(sa.para.source_channel)),
        (r = new RegExp("(" + a.join("|") + ")%3D", "i")),
        1 === (s = Object.keys(e)).length &&
          "scene" === s[0] &&
          r.test(e.scene)) &&
        ((n.scene = n.query.scene), delete n.query.scene),
      t.query.q &&
        t.query.scancode_time &&
        "101" === String(t.scene).slice(0, 3) &&
        ((n.q = String(n.query.q)),
        delete n.query.q,
        delete n.query.scancode_time),
      n
    );
  }),
  (_.getMixedQuery = function(t) {
    var e = _.detectOptionQuery(t),
      a = e.scene,
      r = e.q,
      s = e.query;
    for (var n in s) s[n] = _.decodeURIComponent(s[n]);
    return (
      a &&
        ((a =
          -1 !== (a = _.decodeURIComponent(a)).indexOf("?")
            ? "?" + a.replace(/\?/g, "")
            : "?" + a),
        _.extend(s, _.getObjFromQuery(a))),
      r && _.extend(s, _.getObjFromQuery(_.decodeURIComponent(r))),
      s
    );
  }),
  (_.setUtm = function(t, e) {
    var a = {},
      r = _.getMixedQuery(t),
      s = _.getCustomUtmFromQuery(r, "$", "_", "$"),
      n = _.getCustomUtmFromQuery(r, "$latest_", "_latest_", "$latest_");
    return (a.pre1 = s), (a.pre2 = n), _.extend(e, s), a;
  }),
  (_.wxrequest = function(t) {
    var e = uni.request(t);
    setTimeout(function() {
      _.isObject(e) && _.isFunction(e.abort) && e.abort();
    }, sa.para.datasend_timeout);
  }),
  (_.info = {
    currentProps: {},
    properties: { $lib: LIB_NAME, $lib_version: String(LIB_VERSION) },
    getSystem: function() {
      var t = this.properties;
      function e() {
        uni.getSystemInfo({
          success: function(e) {
            var a, r;
            (t.$manufacturer = e.brand),
              (t.$model = e.model),
              (t.$screen_width = Number(e.screenWidth)),
              (t.$screen_height = Number(e.screenHeight)),
              (t.$os =
                ((a = e.platform),
                "ios" === (r = a.toLowerCase())
                  ? "iOS"
                  : "android" === r
                  ? "Android"
                  : a)),
              (t.$os_version =
                e.system.indexOf(" ") > -1 ? e.system.split(" ")[1] : e.system);
          },
          complete: function() {
            (sa.initialState.systemIsComplete = !0),
              sa.initialState.checkIsComplete();
          },
        });
      }
      uni.getNetworkType({
        success: function(e) {
          t.$network_type = e.networkType;
        },
        complete: e,
      });
    },
  }),
  (sa._ = _),
  (sa.prepareData = function(t, e) {
    var a = {
      distinct_id: this.store.getDistinctId(),
      lib: {
        $lib: LIB_NAME,
        $lib_method: "code",
        $lib_version: String(LIB_VERSION),
      },
      properties: {},
    };
    _.extend(a, this.store.getUnionId(), t),
      _.isObject(t.properties) &&
        !_.isEmptyObject(t.properties) &&
        _.extend(a.properties, t.properties),
      (t.type && "profile" === t.type.slice(0, 7)) ||
        (sa.para.batch_send &&
          (a._track_id = Number(
            String(Math.random()).slice(2, 5) +
              String(Math.random()).slice(2, 4) +
              String(Date.now()).slice(-4)
          )),
        (a.properties = _.extend(
          {},
          _.info.properties,
          sa.store.getProps(),
          _.info.currentProps,
          a.properties
        )),
        "object" == typeof sa.store._state &&
        "number" == typeof sa.store._state.first_visit_day_time &&
        sa.store._state.first_visit_day_time > new Date().getTime()
          ? (a.properties.$is_first_day = !0)
          : (a.properties.$is_first_day = !1)),
      a.properties.$time && _.isDate(a.properties.$time)
        ? ((a.time = 1 * a.properties.$time), delete a.properties.$time)
        : sa.para.use_client_time && (a.time = 1 * new Date()),
      _.searchObjDate(a),
      _.searchObjString(a),
      logger.info(a),
      sa.sendStrategy.send(a);
  }),
  (sa.store = {
    verifyDistinctId: function(t) {
      return (
        "number" == typeof t &&
          ((t = String(t)), /^\d+$/.test(t) || (t = "unexpected_id")),
        ("string" == typeof t && "" !== t) || (t = "unexpected_id"),
        t
      );
    },
    storageInfo: null,
    getUUID: function() {
      return (
        Date.now() +
        "-" +
        Math.floor(1e7 * Math.random()) +
        "-" +
        Math.random()
          .toString(16)
          .replace(".", "") +
        "-" +
        String(31242 * Math.random())
          .replace(".", "")
          .slice(0, 8)
      );
    },
    getStorage: function() {
      return this.storageInfo
        ? this.storageInfo
        : ((this.storageInfo =
            sa._.getStorageSync("sensorsdata2015_wechat") || ""),
          this.storageInfo);
    },
    _state: {},
    mem: {
      mdata: [],
      getLength: function() {
        return this.mdata.length;
      },
      add: function(t) {
        this.mdata.push(t);
      },
      clear: function(t) {
        this.mdata.splice(0, t);
      },
    },
    toState: function(t) {
      var e = null;
      _.isJSONString(t)
        ? (e = JSON.parse(t)).distinct_id
          ? (this._state = e)
          : this.set("distinct_id", this.getUUID())
        : _.isObject(t) && (e = t).distinct_id
        ? (this._state = e)
        : this.set("distinct_id", this.getUUID());
    },
    getFirstId: function() {
      return this._state._first_id || this._state.first_id;
    },
    getDistinctId: function() {
      return this._state._distinct_id || this._state.distinct_id;
    },
    getUnionId: function() {
      var t = {},
        e = this._state._first_id || this._state.first_id,
        a = this._state._distinct_id || this._state.distinct_id;
      return (
        e && a
          ? ((t.login_id = a), (t.anonymous_id = e))
          : (t.anonymous_id = a),
        t
      );
    },
    getProps: function() {
      return this._state.props || {};
    },
    setProps: function(t, e) {
      var a = this._state.props || {};
      e ? this.set("props", t) : (_.extend(a, t), this.set("props", a));
    },
    set: function(t, e) {
      var a = {};
      for (var r in ("string" == typeof t
        ? (a[t] = e)
        : "object" == typeof t && (a = t),
      (this._state = this._state || {}),
      a))
        (this._state[r] = a[r]),
          "first_id" === r
            ? delete this._state._first_id
            : "distinct_id" === r && delete this._state._distinct_id;
      this.save();
    },
    change: function(t, e) {
      this._state["_" + t] = e;
    },
    save: function() {
      var t = JSON.parse(JSON.stringify(this._state));
      delete t._first_id,
        delete t._distinct_id,
        sa._.setStorageSync("sensorsdata2015_wechat", t);
    },
    init: function() {
      var t = this.getStorage();
      if (t) this.toState(t);
      else {
        is_first_launch = !0;
        var e = new Date(),
          a = e.getTime();
        e.setHours(23),
          e.setMinutes(59),
          e.setSeconds(60),
          sa.setOnceProfile({ $first_visit_time: new Date() }),
          this.set({
            distinct_id: this.getUUID(),
            first_visit_time: a,
            first_visit_day_time: e.getTime(),
          });
      }
    },
  }),
  (sa.setProfile = function(t, e) {
    sa.prepareData({ type: "profile_set", properties: t }, e);
  }),
  (sa.setOnceProfile = function(t, e) {
    sa.prepareData({ type: "profile_set_once", properties: t }, e);
  }),
  (sa.appendProfile = function(t, e) {
    if (!_.isObject(t)) return !1;
    _.each(t, function(e, a) {
      _.isString(e)
        ? (t[a] = [e])
        : _.isArray(e) ||
          (delete t[a],
          logger.info(
            "appendProfile\u5c5e\u6027\u7684\u503c\u5fc5\u987b\u662f\u5b57\u7b26\u4e32\u6216\u8005\u6570\u7ec4"
          ));
    }),
      sa.prepareData({ type: "profile_append", properties: t }, e);
  }),
  (sa.incrementProfile = function(t, e) {
    if (!_.isObject(t)) return !1;
    var a = t;
    _.isString(t) && ((t = {})[a] = 1),
      sa.prepareData({ type: "profile_increment", properties: t }, e);
  }),
  (sa.track = function(t, e, a) {
    this.prepareData({ type: "track", event: t, properties: e }, a);
  }),
  (sa.identify = function(t, e) {
    if ("string" != typeof t && "number" != typeof t) return !1;
    t = sa.store.verifyDistinctId(t);
    var a = sa.store.getFirstId();
    !0 === e
      ? a
        ? sa.store.set("first_id", t)
        : sa.store.set("distinct_id", t)
      : a
      ? sa.store.change("first_id", t)
      : sa.store.change("distinct_id", t);
  }),
  (sa.trackSignup = function(t, e, a, r) {
    var s = sa.store.getFirstId() || sa.store.getDistinctId();
    sa.store.set("distinct_id", t),
      sa.prepareData(
        {
          original_id: s,
          distinct_id: t,
          type: "track_signup",
          event: e,
          properties: a,
        },
        r
      );
  }),
  (sa.registerApp = function(t) {
    _.isObject(t) &&
      !_.isEmptyObject(t) &&
      (_.info.currentProps = _.extend(_.info.currentProps, t));
  }),
  (sa.register = function(t) {
    _.isObject(t) && !_.isEmptyObject(t) && sa.store.setProps(t);
  }),
  (sa.clearAllRegister = function() {
    sa.store.setProps({}, !0);
  }),
  (sa.clearAllProps = function(t) {
    var e = sa.store.getProps(),
      a = {};
    _.isArray(t) &&
      (_.each(e, function(e, r) {
        _.include(t, r) || (a[r] = e);
      }),
      sa.store.setProps(a, !0));
  }),
  (sa.clearAppRegister = function(t) {
    _.isArray(t) &&
      _.each(_.info.currentProps, function(e, a) {
        _.include(t, a) && delete _.info.currentProps[a];
      });
  }),
  (sa.setLatestChannel = function(t) {
    _.isEmptyObject(t) ||
      ((function(t, e) {
        var a = !1;
        for (var r in e) t[e[r]] && (a = !0);
        return a;
      })(t, latest_source_channel) &&
        (sa.clearAppRegister(latest_source_channel),
        sa.clearAllProps(latest_source_channel)),
      sa.para.is_persistent_save ? sa.register(t) : sa.registerApp(t));
  }),
  (sa.login = function(t) {
    if ("string" != typeof t && "number" != typeof t) return !1;
    t = sa.store.verifyDistinctId(t);
    var e = sa.store.getFirstId(),
      a = sa.store.getDistinctId();
    t !== a &&
      (e
        ? sa.trackSignup(t, "$SignUp")
        : (sa.store.set("first_id", a), sa.trackSignup(t, "$SignUp")));
  }),
  (sa.logout = function(t) {
    var e = sa.store.getFirstId();
    e
      ? (sa.store.set("first_id", ""),
        !0 === t
          ? sa.store.set("distinct_id", sa.store.getUUID())
          : sa.store.set("distinct_id", e))
      : logger.info("\u6ca1\u6709first_id\uff0clogout\u5931\u8d25");
  }),
  (sa.openid = {
    getRequest: function(t) {
      uni.login({
        success: function(e) {
          e.code && sa.para.appid && sa.para.openid_url
            ? _.wxrequest({
                url:
                  sa.para.openid_url +
                  "&code=" +
                  e.code +
                  "&appid=" +
                  sa.para.appid,
                method: "GET",
                complete: function(e) {
                  _.isObject(e) && _.isObject(e.data) && e.data.openid
                    ? t(e.data.openid)
                    : t();
                },
              })
            : t();
        },
      });
    },
    getWXStorage: function() {
      var t = sa.store.getStorage();
      if (t && _.isObject(t)) return t.openid;
    },
    getOpenid: function(t) {
      if (!sa.para.appid) return t(), !1;
      var e = this.getWXStorage();
      e ? t(e) : this.getRequest(t);
    },
  }),
  (sa.initial = function() {
    this._.info.getSystem(), this.store.init();
  }),
  (sa.init = function(t) {
    if (!0 === this.hasInit) return !1;
    (this.hasInit = !0),
      sa.setPara(t),
      sa.para.batch_send &&
        (uni.getStorage({
          key: "sensors_mp_prepare_data",
          complete(t) {
            var e = t.data && _.isArray(t.data) ? t.data : [];
            (sa.store.mem.mdata = e.concat(sa.store.mem.mdata)),
              (sa.sendStrategy.syncStorage = !0);
          },
        }),
        sa.sendStrategy.batchInterval()),
      (sa.initialState.storeIsComplete = !0),
      sa.initialState.checkIsComplete();
  }),
  (sa.getPresetProperties = function() {
    if (_.info && _.info.properties && _.info.properties.$lib) {
      var t = {};
      _.each(_.info.currentProps, function(e, a) {
        0 === a.indexOf("$") && (t[a] = e);
      });
      var e = _.extend(
        t,
        { $url_path: _.getCurrentPath() },
        _.info.properties,
        sa.store.getProps()
      );
      return delete e.$lib, e;
    }
    return {};
  }),
  (_.autoExeQueue = function() {
    return {
      items: [],
      enqueue: function(t) {
        this.items.push(t), this.start();
      },
      dequeue: function() {
        return this.items.shift();
      },
      getCurrentItem: function() {
        return this.items[0];
      },
      isRun: !1,
      start: function() {
        this.items.length > 0 &&
          !this.isRun &&
          ((this.isRun = !0), this.getCurrentItem().start());
      },
      close: function() {
        this.dequeue(), (this.isRun = !1), this.start();
      },
    };
  }),
  (sa.requestQueue = function(t) {
    this.url = t.url;
  }),
  (sa.requestQueue.prototype.isEnd = function() {
    this.received || ((this.received = !0), this.close());
  }),
  (sa.requestQueue.prototype.start = function() {
    var t = this;
    setTimeout(function() {
      t.isEnd();
    }, sa.para.send_timeout),
      _.wxrequest({
        url: this.url,
        method: "GET",
        complete: function() {
          t.isEnd();
        },
      });
  }),
  (sa.dataQueue = _.autoExeQueue()),
  (sa.sendStrategy = {
    dataHasSend: !0,
    dataHasChange: !1,
    syncStorage: !1,
    failTime: 0,
    onAppHide: function() {
      sa.para.batch_send && this.batchSend();
    },
    send: function(t) {
      if (!sa.para.server_url) return !1;
      if (sa.para.batch_send) {
        if (((this.dataHasChange = !0), sa.store.mem.getLength() >= 300))
          return (
            logger.info(
              "\u6570\u636e\u91cf\u5b58\u50a8\u8fc7\u5927\uff0c\u6709\u5f02\u5e38"
            ),
            !1
          );
        sa.store.mem.add(t),
          sa.store.mem.getLength() >= sa.para.batch_send.max_length &&
            this.batchSend();
      } else this.queueSend(t);
    },
    queueSend: function(t) {
      (t = JSON.stringify(t)),
        (t =
          -1 !== sa.para.server_url.indexOf("?")
            ? sa.para.server_url +
              "&data=" +
              encodeURIComponent(_.base64Encode(t))
            : sa.para.server_url +
              "?data=" +
              encodeURIComponent(_.base64Encode(t)));
      var e = new sa.requestQueue({ url: t });
      (e.close = function() {
        sa.dataQueue.close();
      }),
        sa.dataQueue.enqueue(e);
    },
    wxrequest: function(t) {
      if (_.isArray(t.data) && t.data.length > 0) {
        var e = Date.now();
        t.data.forEach(function(t) {
          t._flush_time = e;
        }),
          (t.data = JSON.stringify(t.data)),
          _.wxrequest({
            url: sa.para.server_url,
            method: "POST",
            dataType: "text",
            data: "data_list=" + encodeURIComponent(_.base64Encode(t.data)),
            success: function() {
              t.success(t.len);
            },
            fail: function() {
              t.fail();
            },
          });
      } else t.success(t.len);
    },
    batchSend: function() {
      if (this.dataHasSend) {
        var t = sa.store.mem.mdata,
          e = t.length;
        e > 0 &&
          ((this.dataHasSend = !1),
          this.wxrequest({
            data: t,
            len: e,
            success: this.batchRemove.bind(this),
            fail: this.sendFail.bind(this),
          }));
      }
    },
    sendFail: function() {
      (this.dataHasSend = !0), this.failTime++;
    },
    batchRemove: function(t) {
      sa.store.mem.clear(t),
        (this.dataHasSend = !0),
        (this.dataHasChange = !0),
        this.batchWrite(),
        (this.failTime = 0);
    },
    is_first_batch_write: !0,
    batchWrite: function() {
      var t = this;
      this.dataHasChange &&
        (this.is_first_batch_write &&
          ((this.is_first_batch_write = !1),
          setTimeout(function() {
            t.batchSend();
          }, 1e3)),
        (this.dataHasChange = !1),
        this.syncStorage &&
          sa._.setStorageSync("sensors_mp_prepare_data", sa.store.mem.mdata));
    },
    batchInterval: function() {
      var t = this;
      !(function e() {
        setTimeout(function() {
          t.batchWrite(), e();
        }, 500);
      })(),
        (function e() {
          setTimeout(function() {
            t.batchSend(), e();
          }, sa.para.batch_send.send_timeout * Math.pow(2, t.failTime));
        })();
    },
  }),
  (sa.setOpenid = function(t, e) {
    sa.store.set("openid", t),
      e ? sa.store.set("distinct_id", t) : sa.identify(t, !0);
  }),
  (sa.initWithOpenid = function(t, e) {
    (t = t || {}).appid && (sa.para.appid = t.appid),
      sa.openid.getOpenid(function(a) {
        a && sa.setOpenid(a, t.isCoverLogin),
          e && _.isFunction(e) && e(a),
          sa.init(t);
      });
  }),
  _.each(
    [
      "setProfile",
      "setOnceProfile",
      "track",
      "quick",
      "incrementProfile",
      "appendProfile",
      "login",
      "logout",
    ],
    function(t) {
      var e = sa[t];
      sa[t] = function() {
        sa.initialState.isComplete
          ? e.apply(sa, arguments)
          : sa.initialState.queue.push([t, arguments]);
      };
    }
  ),
  (_.setQuery = function(t, e) {
    if (t && _.isObject(t) && !_.isEmptyObject(t)) {
      var a = [];
      return (
        _.each(t, function(t, r) {
          ("q" === r && _.isString(t) && 0 === t.indexOf("http")) ||
            "scene" === r ||
            (e
              ? a.push(r + "=" + t)
              : a.push(r + "=" + _.decodeURIComponent(t)));
        }),
        a.join("&")
      );
    }
    return "";
  }),
  (_.getUtmFromPage = function() {
    var t = {};
    try {
      var e = getCurrentPages(),
        a = e[e.length - 1].options;
      t = _.getCustomUtmFromQuery(a, "$", "_", "$");
    } catch (t) {
      logger.info(t);
    }
    return t;
  }),
  (sa.autoTrackCustom = {
    trackCustom: function(t, e, a) {
      var r = sa.para.autoTrack[t],
        s = "";
      sa.para.autoTrack &&
        r &&
        ("function" == typeof r
          ? ((s = r()), _.isObject(s) && _.extend(e, s))
          : _.isObject(r) && (_.extend(e, r), (sa.para.autoTrack[t] = !0)),
        sa.track(a, e));
    },
    appLaunch: function(t, e) {
      "object" != typeof this || this.trackCustom || (this[sa.para.name] = sa);
      var a = {};
      t && t.path && (a.$url_path = _.getPath(t.path)), _.setShareInfo(t, a);
      var r = _.setUtm(t, a);
      is_first_launch
        ? ((a.$is_first_time = !0),
          _.isEmptyObject(r.pre1) || sa.setOnceProfile(r.pre1))
        : (a.$is_first_time = !1),
        sa.setLatestChannel(r.pre2),
        (a.$scene = _.getMPScene(t.scene)),
        sa.registerApp({ $latest_scene: a.$scene }),
        (a.$url_query = _.setQuery(t.query)),
        e
          ? ((a = _.extend(a, e)), sa.track("$MPLaunch", a))
          : sa.para.autoTrack &&
            sa.para.autoTrack.appLaunch &&
            sa.autoTrackCustom.trackCustom("appLaunch", a, "$MPLaunch");
    },
    appShow: function(t, e) {
      var a = {};
      (mpshow_time = new Date().getTime()),
        t && t.path && (a.$url_path = _.getPath(t.path)),
        _.setShareInfo(t, a);
      var r = _.setUtm(t, a);
      sa.setLatestChannel(r.pre2),
        (a.$scene = _.getMPScene(t.scene)),
        sa.registerApp({ $latest_scene: a.$scene }),
        (a.$url_query = _.setQuery(t.query)),
        e
          ? ((a = _.extend(a, e)), sa.track("$MPShow", a))
          : sa.para.autoTrack &&
            sa.para.autoTrack.appShow &&
            sa.autoTrackCustom.trackCustom("appShow", a, "$MPShow");
    },
    appHide: function(t) {
      var e = new Date().getTime(),
        a = {};
      (a.$url_path = _.getCurrentPath()),
        mpshow_time &&
          e - mpshow_time > 0 &&
          (e - mpshow_time) / 36e5 < 24 &&
          (a.event_duration = (e - mpshow_time) / 1e3),
        t
          ? ((a = _.extend(a, t)), sa.track("$MPHide", a))
          : sa.para.autoTrack &&
            sa.para.autoTrack.appHide &&
            sa.autoTrackCustom.trackCustom("appHide", a, "$MPHide"),
        sa.sendStrategy.onAppHide();
    },
    pageLoad: function(t) {
      t &&
        _.isObject(t) &&
        ((this.sensors_mp_url_query = _.setQuery(t)),
        (this.sensors_mp_encode_url_query = _.setQuery(t, !0)));
    },
    pageShow: function() {
      var t = {},
        e = _.getCurrentPath();
      (t.$referrer = sa_referrer),
        (t.$url_path = e),
        (sa.status.last_referrer = sa_referrer),
        (t.$url_query = this.sensors_mp_url_query
          ? this.sensors_mp_url_query
          : ""),
        (t = _.extend(t, _.getUtmFromPage())),
        sa.para.onshow
          ? sa.para.onshow(sa, e, this)
          : sa.para.autoTrack &&
            sa.para.autoTrack.pageShow &&
            sa.autoTrackCustom.trackCustom("pageShow", t, "$MPViewScreen"),
        (sa_referrer = e),
        (sa.status.referrer = e);
    },
    pageShare: function(t, e) {
      var a = t.onShareAppMessage;
      t.onShareAppMessage = function() {
        var t = a.apply(this, arguments);
        return (
          sa.para.autoTrack &&
            sa.para.autoTrack.pageShare &&
            sa.autoTrackCustom.trackCustom(
              "pageShare",
              {
                $url_path: _.getCurrentPath(),
                $share_depth: _.getShareDepth(),
              },
              "$MPShare"
            ),
          sa.para.allow_amend_share_path &&
            ("object" != typeof t && ((t = {}).path = _.getCurrentUrl(this)),
            "object" != typeof t ||
              (void 0 !== t.path && "" !== t.path) ||
              (t.path = _.getCurrentUrl(this)),
            "object" == typeof t &&
              "string" == typeof t.path &&
              (-1 === t.path.indexOf("?")
                ? (t.path = t.path + "?")
                : "&" !== t.path.slice(-1) && (t.path = t.path + "&")),
            (t.path =
              t.path + "sampshare=" + encodeURIComponent(_.getShareInfo()))),
          t
        );
      };
    },
  }),
  (sa.quick = function() {
    var t = arguments[0],
      e = arguments[1],
      a = arguments[2],
      r = _.isObject(a) ? a : {};
    if ("getAnonymousID" === t) {
      if (!_.isEmptyObject(sa.store._state))
        return (
          sa.store._state._first_id ||
          sa.store._state.first_id ||
          sa.store._state._distinct_id ||
          sa.store._state.distinct_id
        );
      logger.info("\u8bf7\u5148\u521d\u59cb\u5316SDK");
    } else
      "appLaunch" === t || "appShow" === t
        ? e
          ? sa.autoTrackCustom[t](e, r)
          : logger.info(
              "App\u7684launch\u548cshow\uff0c\u5728sensors.quick\u7b2c\u4e8c\u4e2a\u53c2\u6570\u5fc5\u987b\u4f20\u5165App\u7684options\u53c2\u6570"
            )
        : "appHide" === t &&
          ((r = _.isObject(e) ? e : {}), sa.autoTrackCustom[t](r));
  });
var oldApp = App;
App = function(t) {
  mp_proxy(t, "onLaunch", "appLaunch"),
    mp_proxy(t, "onShow", "appShow"),
    mp_proxy(t, "onHide", "appHide"),
    oldApp.apply(this, arguments);
};
var oldPage = Page;
Page = function(t) {
  for (
    var e = sa.para.autoTrack && sa.para.autoTrack.mpClick && _.getMethods(t),
      a = 0,
      r = e.length;
    a < r;
    a++
  )
    click_proxy(t, e[a]);
  mp_proxy(t, "onLoad", "pageLoad"),
    mp_proxy(t, "onShow", "pageShow"),
    "function" == typeof t.onShareAppMessage && sa.autoTrackCustom.pageShare(t),
    oldPage.apply(this, arguments);
};
var oldComponent = Component;
(Component = function(t) {
  try {
    for (
      var e =
          sa.para.autoTrack &&
          sa.para.autoTrack.mpClick &&
          _.getMethods(t.methods),
        a = 0,
        r = e.length;
      a < r;
      a++
    )
      
      click_proxy(t.methods, e[a]);
    mp_proxy(t.methods, "onLoad", "pageLoad"),
      mp_proxy(t.methods, "onShow", "pageShow"),
      "function" == typeof t.methods.onShareAppMessage &&
        sa.autoTrackCustom.pageShare(t.methods),
      oldComponent.apply(this, arguments);
  } catch (t) {
    oldComponent.apply(this, arguments);
  }
}),
  sa.initial(),
  (module.exports = sa);
