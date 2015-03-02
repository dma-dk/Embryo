/*! @license Firebase v2.2.0 - License: https://www.firebase.com/terms/terms-of-service.html */
(function () {
    var h, aa = this;

    function m(a) {
        return void 0 !== a
    }

    function ba() {
    }

    function ca(a) {
        a.Ob = function () {
            return a.kf ? a.kf : a.kf = new a
        }
    }

    function da(a) {
        var b = typeof a;
        if ("object" == b)if (a) {
            if (a instanceof Array)return "array";
            if (a instanceof Object)return b;
            var c = Object.prototype.toString.call(a);
            if ("[object Window]" == c)return "object";
            if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice"))return "array";
            if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call"))return "function"
        } else return "null";
        else if ("function" == b && "undefined" == typeof a.call)return "object";
        return b
    }

    function ea(a) {
        return "array" == da(a)
    }

    function fa(a) {
        var b = da(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    }

    function p(a) {
        return "string" == typeof a
    }

    function ga(a) {
        return "number" == typeof a
    }

    function ha(a) {
        return "function" == da(a)
    }

    function ia(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    }

    function ja(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }

    function ka(a, b, c) {
        if (!a)throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function () {
                var c = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(c, d);
                return a.apply(b, c)
            }
        }
        return function () {
            return a.apply(b, arguments)
        }
    }

    function q(a, b, c) {
        q = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ja : ka;
        return q.apply(null, arguments)
    }

    var la = Date.now || function () {
            return +new Date
        };

    function ma(a, b) {
        function c() {
        }

        c.prototype = b.prototype;
        a.Kg = b.prototype;
        a.prototype = new c;
        a.Gg = function (a, c, f) {
            return b.prototype[c].apply(a, Array.prototype.slice.call(arguments, 2))
        }
    };
    function na(a) {
        a = String(a);
        if (/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, "")))try {
            return eval("(" + a + ")")
        } catch (b) {
        }
        throw Error("Invalid JSON string: " + a);
    }

    function oa() {
        this.Md = void 0
    }

    function pa(a, b, c) {
        switch (typeof b) {
            case "string":
                qa(b, c);
                break;
            case "number":
                c.push(isFinite(b) && !isNaN(b) ? b : "null");
                break;
            case "boolean":
                c.push(b);
                break;
            case "undefined":
                c.push("null");
                break;
            case "object":
                if (null == b) {
                    c.push("null");
                    break
                }
                if (ea(b)) {
                    var d = b.length;
                    c.push("[");
                    for (var e = "", f = 0; f < d; f++)c.push(e), e = b[f], pa(a, a.Md ? a.Md.call(b, String(f), e) : e, c), e = ",";
                    c.push("]");
                    break
                }
                c.push("{");
                d = "";
                for (f in b)Object.prototype.hasOwnProperty.call(b, f) && (e = b[f], "function" != typeof e && (c.push(d), qa(f, c),
                    c.push(":"), pa(a, a.Md ? a.Md.call(b, f, e) : e, c), d = ","));
                c.push("}");
                break;
            case "function":
                break;
            default:
                throw Error("Unknown type: " + typeof b);
        }
    }

    var ra = {
        '"': '\\"',
        "\\": "\\\\",
        "/": "\\/",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t",
        "\x0B": "\\u000b"
    }, sa = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;

    function qa(a, b) {
        b.push('"', a.replace(sa, function (a) {
            if (a in ra)return ra[a];
            var b = a.charCodeAt(0), e = "\\u";
            16 > b ? e += "000" : 256 > b ? e += "00" : 4096 > b && (e += "0");
            return ra[a] = e + b.toString(16)
        }), '"')
    };
    function ta(a) {
        return "undefined" !== typeof JSON && m(JSON.parse) ? JSON.parse(a) : na(a)
    }

    function r(a) {
        if ("undefined" !== typeof JSON && m(JSON.stringify))a = JSON.stringify(a); else {
            var b = [];
            pa(new oa, a, b);
            a = b.join("")
        }
        return a
    };
    function s(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    }

    function t(a, b) {
        if (Object.prototype.hasOwnProperty.call(a, b))return a[b]
    }

    function ua(a, b) {
        for (var c in a)Object.prototype.hasOwnProperty.call(a, c) && b(c, a[c])
    }

    function va(a) {
        var b = {};
        ua(a, function (a, d) {
            b[a] = d
        });
        return b
    };
    function wa(a) {
        this.vc = a;
        this.Jd = "firebase:"
    }

    h = wa.prototype;
    h.set = function (a, b) {
        null == b ? this.vc.removeItem(this.Jd + a) : this.vc.setItem(this.Jd + a, r(b))
    };
    h.get = function (a) {
        a = this.vc.getItem(this.Jd + a);
        return null == a ? null : ta(a)
    };
    h.remove = function (a) {
        this.vc.removeItem(this.Jd + a)
    };
    h.lf = !1;
    h.toString = function () {
        return this.vc.toString()
    };
    function xa() {
        this.pc = {}
    }

    xa.prototype.set = function (a, b) {
        null == b ? delete this.pc[a] : this.pc[a] = b
    };
    xa.prototype.get = function (a) {
        return s(this.pc, a) ? this.pc[a] : null
    };
    xa.prototype.remove = function (a) {
        delete this.pc[a]
    };
    xa.prototype.lf = !0;
    function ya(a) {
        try {
            if ("undefined" !== typeof window && "undefined" !== typeof window[a]) {
                var b = window[a];
                b.setItem("firebase:sentinel", "cache");
                b.removeItem("firebase:sentinel");
                return new wa(b)
            }
        } catch (c) {
        }
        return new xa
    }

    var za = ya("localStorage"), v = ya("sessionStorage");

    function Aa(a, b, c, d, e) {
        this.host = a.toLowerCase();
        this.domain = this.host.substr(this.host.indexOf(".") + 1);
        this.Bb = b;
        this.ub = c;
        this.Eg = d;
        this.Id = e || "";
        this.Ma = za.get("host:" + a) || this.host
    }

    function Ba(a, b) {
        b !== a.Ma && (a.Ma = b, "s-" === a.Ma.substr(0, 2) && za.set("host:" + a.host, a.Ma))
    }

    Aa.prototype.toString = function () {
        var a = (this.Bb ? "https://" : "http://") + this.host;
        this.Id && (a += "<" + this.Id + ">");
        return a
    };
    function Ca() {
        this.Sa = -1
    };
    function Da() {
        this.Sa = -1;
        this.Sa = 64;
        this.R = [];
        this.ge = [];
        this.Ef = [];
        this.Fd = [];
        this.Fd[0] = 128;
        for (var a = 1; a < this.Sa; ++a)this.Fd[a] = 0;
        this.Yd = this.Tb = 0;
        this.reset()
    }

    ma(Da, Ca);
    Da.prototype.reset = function () {
        this.R[0] = 1732584193;
        this.R[1] = 4023233417;
        this.R[2] = 2562383102;
        this.R[3] = 271733878;
        this.R[4] = 3285377520;
        this.Yd = this.Tb = 0
    };
    function Ea(a, b, c) {
        c || (c = 0);
        var d = a.Ef;
        if (p(b))for (var e = 0; 16 > e; e++)d[e] = b.charCodeAt(c) << 24 | b.charCodeAt(c + 1) << 16 | b.charCodeAt(c + 2) << 8 | b.charCodeAt(c + 3), c += 4; else for (e = 0; 16 > e; e++)d[e] = b[c] << 24 | b[c + 1] << 16 | b[c + 2] << 8 | b[c + 3], c += 4;
        for (e = 16; 80 > e; e++) {
            var f = d[e - 3] ^ d[e - 8] ^ d[e - 14] ^ d[e - 16];
            d[e] = (f << 1 | f >>> 31) & 4294967295
        }
        b = a.R[0];
        c = a.R[1];
        for (var g = a.R[2], k = a.R[3], l = a.R[4], n, e = 0; 80 > e; e++)40 > e ? 20 > e ? (f = k ^ c & (g ^ k), n = 1518500249) : (f = c ^ g ^ k, n = 1859775393) : 60 > e ? (f = c & g | k & (c | g), n = 2400959708) : (f = c ^ g ^ k, n = 3395469782), f = (b <<
        5 | b >>> 27) + f + l + n + d[e] & 4294967295, l = k, k = g, g = (c << 30 | c >>> 2) & 4294967295, c = b, b = f;
        a.R[0] = a.R[0] + b & 4294967295;
        a.R[1] = a.R[1] + c & 4294967295;
        a.R[2] = a.R[2] + g & 4294967295;
        a.R[3] = a.R[3] + k & 4294967295;
        a.R[4] = a.R[4] + l & 4294967295
    }

    Da.prototype.update = function (a, b) {
        m(b) || (b = a.length);
        for (var c = b - this.Sa, d = 0, e = this.ge, f = this.Tb; d < b;) {
            if (0 == f)for (; d <= c;)Ea(this, a, d), d += this.Sa;
            if (p(a))for (; d < b;) {
                if (e[f] = a.charCodeAt(d), ++f, ++d, f == this.Sa) {
                    Ea(this, e);
                    f = 0;
                    break
                }
            } else for (; d < b;)if (e[f] = a[d], ++f, ++d, f == this.Sa) {
                Ea(this, e);
                f = 0;
                break
            }
        }
        this.Tb = f;
        this.Yd += b
    };
    function Fa() {
        return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ la()).toString(36)
    };
    var w = Array.prototype, Ga = w.indexOf ? function (a, b, c) {
        return w.indexOf.call(a, b, c)
    } : function (a, b, c) {
        c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
        if (p(a))return p(b) && 1 == b.length ? a.indexOf(b, c) : -1;
        for (; c < a.length; c++)if (c in a && a[c] === b)return c;
        return -1
    }, Ha = w.forEach ? function (a, b, c) {
        w.forEach.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e = p(a) ? a.split("") : a, f = 0; f < d; f++)f in e && b.call(c, e[f], f, a)
    }, Ia = w.filter ? function (a, b, c) {
        return w.filter.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e = [], f = 0, g = p(a) ?
            a.split("") : a, k = 0; k < d; k++)if (k in g) {
            var l = g[k];
            b.call(c, l, k, a) && (e[f++] = l)
        }
        return e
    }, Ja = w.map ? function (a, b, c) {
        return w.map.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e = Array(d), f = p(a) ? a.split("") : a, g = 0; g < d; g++)g in f && (e[g] = b.call(c, f[g], g, a));
        return e
    }, Ka = w.reduce ? function (a, b, c, d) {
        d && (b = q(b, d));
        return w.reduce.call(a, b, c)
    } : function (a, b, c, d) {
        var e = c;
        Ha(a, function (c, g) {
            e = b.call(d, e, c, g, a)
        });
        return e
    }, La = w.every ? function (a, b, c) {
        return w.every.call(a, b, c)
    } : function (a, b, c) {
        for (var d = a.length, e =
            p(a) ? a.split("") : a, f = 0; f < d; f++)if (f in e && !b.call(c, e[f], f, a))return !1;
        return !0
    };

    function Ma(a, b) {
        var c = Na(a, b, void 0);
        return 0 > c ? null : p(a) ? a.charAt(c) : a[c]
    }

    function Na(a, b, c) {
        for (var d = a.length, e = p(a) ? a.split("") : a, f = 0; f < d; f++)if (f in e && b.call(c, e[f], f, a))return f;
        return -1
    }

    function Oa(a, b) {
        var c = Ga(a, b);
        0 <= c && w.splice.call(a, c, 1)
    }

    function Pa(a, b, c) {
        return 2 >= arguments.length ? w.slice.call(a, b) : w.slice.call(a, b, c)
    }

    function Qa(a, b) {
        a.sort(b || Ra)
    }

    function Ra(a, b) {
        return a > b ? 1 : a < b ? -1 : 0
    };
    var Sa;
    a:{
        var Ta = aa.navigator;
        if (Ta) {
            var Ua = Ta.userAgent;
            if (Ua) {
                Sa = Ua;
                break a
            }
        }
        Sa = ""
    }
    function Va(a) {
        return -1 != Sa.indexOf(a)
    };
    var Wa = Va("Opera") || Va("OPR"), Xa = Va("Trident") || Va("MSIE"), Ya = Va("Gecko") && -1 == Sa.toLowerCase().indexOf("webkit") && !(Va("Trident") || Va("MSIE")), Za = -1 != Sa.toLowerCase().indexOf("webkit");
    (function () {
        var a = "", b;
        if (Wa && aa.opera)return a = aa.opera.version, ha(a) ? a() : a;
        Ya ? b = /rv\:([^\);]+)(\)|;)/ : Xa ? b = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : Za && (b = /WebKit\/(\S+)/);
        b && (a = (a = b.exec(Sa)) ? a[1] : "");
        return Xa && (b = (b = aa.document) ? b.documentMode : void 0, b > parseFloat(a)) ? String(b) : a
    })();
    var $a = null, ab = null, bb = null;

    function cb(a, b) {
        if (!fa(a))throw Error("encodeByteArray takes an array as a parameter");
        db();
        for (var c = b ? ab : $a, d = [], e = 0; e < a.length; e += 3) {
            var f = a[e], g = e + 1 < a.length, k = g ? a[e + 1] : 0, l = e + 2 < a.length, n = l ? a[e + 2] : 0, u = f >> 2, f = (f & 3) << 4 | k >> 4, k = (k & 15) << 2 | n >> 6, n = n & 63;
            l || (n = 64, g || (k = 64));
            d.push(c[u], c[f], c[k], c[n])
        }
        return d.join("")
    }

    function db() {
        if (!$a) {
            $a = {};
            ab = {};
            bb = {};
            for (var a = 0; 65 > a; a++)$a[a] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a), ab[a] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a), bb[ab[a]] = a
        }
    };
    var eb = function () {
        var a = 1;
        return function () {
            return a++
        }
    }();

    function y(a, b) {
        if (!a)throw fb(b);
    }

    function fb(a) {
        return Error("Firebase INTERNAL ASSERT FAILED:" + a)
    }

    function gb(a) {
        try {
            var b;
            if ("undefined" !== typeof atob)b = atob(a); else {
                db();
                for (var c = bb, d = [], e = 0; e < a.length;) {
                    var f = c[a.charAt(e++)], g = e < a.length ? c[a.charAt(e)] : 0;
                    ++e;
                    var k = e < a.length ? c[a.charAt(e)] : 64;
                    ++e;
                    var l = e < a.length ? c[a.charAt(e)] : 64;
                    ++e;
                    if (null == f || null == g || null == k || null == l)throw Error();
                    d.push(f << 2 | g >> 4);
                    64 != k && (d.push(g << 4 & 240 | k >> 2), 64 != l && d.push(k << 6 & 192 | l))
                }
                if (8192 > d.length)b = String.fromCharCode.apply(null, d); else {
                    a = "";
                    for (c = 0; c < d.length; c += 8192)a += String.fromCharCode.apply(null, Pa(d, c,
                        c + 8192));
                    b = a
                }
            }
            return b
        } catch (n) {
            hb("base64Decode failed: ", n)
        }
        return null
    }

    function ib(a) {
        var b = jb(a);
        a = new Da;
        a.update(b);
        var b = [], c = 8 * a.Yd;
        56 > a.Tb ? a.update(a.Fd, 56 - a.Tb) : a.update(a.Fd, a.Sa - (a.Tb - 56));
        for (var d = a.Sa - 1; 56 <= d; d--)a.ge[d] = c & 255, c /= 256;
        Ea(a, a.ge);
        for (d = c = 0; 5 > d; d++)for (var e = 24; 0 <= e; e -= 8)b[c] = a.R[d] >> e & 255, ++c;
        return cb(b)
    }

    function kb(a) {
        for (var b = "", c = 0; c < arguments.length; c++)b = fa(arguments[c]) ? b + kb.apply(null, arguments[c]) : "object" === typeof arguments[c] ? b + r(arguments[c]) : b + arguments[c], b += " ";
        return b
    }

    var lb = null, mb = !0;

    function hb(a) {
        !0 === mb && (mb = !1, null === lb && !0 === v.get("logging_enabled") && nb(!0));
        if (lb) {
            var b = kb.apply(null, arguments);
            lb(b)
        }
    }

    function ob(a) {
        return function () {
            hb(a, arguments)
        }
    }

    function pb(a) {
        if ("undefined" !== typeof console) {
            var b = "FIREBASE INTERNAL ERROR: " + kb.apply(null, arguments);
            "undefined" !== typeof console.error ? console.error(b) : console.log(b)
        }
    }

    function qb(a) {
        var b = kb.apply(null, arguments);
        throw Error("FIREBASE FATAL ERROR: " + b);
    }

    function z(a) {
        if ("undefined" !== typeof console) {
            var b = "FIREBASE WARNING: " + kb.apply(null, arguments);
            "undefined" !== typeof console.warn ? console.warn(b) : console.log(b)
        }
    }

    function rb(a) {
        var b = "", c = "", d = "", e = "", f = !0, g = "https", k = 443;
        if (p(a)) {
            var l = a.indexOf("//");
            0 <= l && (g = a.substring(0, l - 1), a = a.substring(l + 2));
            l = a.indexOf("/");
            -1 === l && (l = a.length);
            b = a.substring(0, l);
            e = "";
            a = a.substring(l).split("/");
            for (l = 0; l < a.length; l++)if (0 < a[l].length) {
                var n = a[l];
                try {
                    n = decodeURIComponent(n.replace(/\+/g, " "))
                } catch (u) {
                }
                e += "/" + n
            }
            a = b.split(".");
            3 === a.length ? (c = a[1], d = a[0].toLowerCase()) : 2 === a.length && (c = a[0]);
            l = b.indexOf(":");
            0 <= l && (f = "https" === g || "wss" === g, k = b.substring(l + 1), isFinite(k) &&
            (k = String(k)), k = p(k) ? /^\s*-?0x/i.test(k) ? parseInt(k, 16) : parseInt(k, 10) : NaN)
        }
        return {host: b, port: k, domain: c, Bg: d, Bb: f, scheme: g, Pc: e}
    }

    function sb(a) {
        return ga(a) && (a != a || a == Number.POSITIVE_INFINITY || a == Number.NEGATIVE_INFINITY)
    }

    function tb(a) {
        if ("complete" === document.readyState)a(); else {
            var b = !1, c = function () {
                document.body ? b || (b = !0, a()) : setTimeout(c, Math.floor(10))
            };
            document.addEventListener ? (document.addEventListener("DOMContentLoaded", c, !1), window.addEventListener("load", c, !1)) : document.attachEvent && (document.attachEvent("onreadystatechange", function () {
                "complete" === document.readyState && c()
            }), window.attachEvent("onload", c))
        }
    }

    function ub(a, b) {
        if (a === b)return 0;
        if ("[MIN_NAME]" === a || "[MAX_NAME]" === b)return -1;
        if ("[MIN_NAME]" === b || "[MAX_NAME]" === a)return 1;
        var c = vb(a), d = vb(b);
        return null !== c ? null !== d ? 0 == c - d ? a.length - b.length : c - d : -1 : null !== d ? 1 : a < b ? -1 : 1
    }

    function wb(a, b) {
        if (b && a in b)return b[a];
        throw Error("Missing required key (" + a + ") in object: " + r(b));
    }

    function xb(a) {
        if ("object" !== typeof a || null === a)return r(a);
        var b = [], c;
        for (c in a)b.push(c);
        b.sort();
        c = "{";
        for (var d = 0; d < b.length; d++)0 !== d && (c += ","), c += r(b[d]), c += ":", c += xb(a[b[d]]);
        return c + "}"
    }

    function yb(a, b) {
        if (a.length <= b)return [a];
        for (var c = [], d = 0; d < a.length; d += b)d + b > a ? c.push(a.substring(d, a.length)) : c.push(a.substring(d, d + b));
        return c
    }

    function zb(a, b) {
        if (ea(a))for (var c = 0; c < a.length; ++c)b(c, a[c]); else A(a, b)
    }

    function Ab(a) {
        y(!sb(a), "Invalid JSON number");
        var b, c, d, e;
        0 === a ? (d = c = 0, b = -Infinity === 1 / a ? 1 : 0) : (b = 0 > a, a = Math.abs(a), a >= Math.pow(2, -1022) ? (d = Math.min(Math.floor(Math.log(a) / Math.LN2), 1023), c = d + 1023, d = Math.round(a * Math.pow(2, 52 - d) - Math.pow(2, 52))) : (c = 0, d = Math.round(a / Math.pow(2, -1074))));
        e = [];
        for (a = 52; a; a -= 1)e.push(d % 2 ? 1 : 0), d = Math.floor(d / 2);
        for (a = 11; a; a -= 1)e.push(c % 2 ? 1 : 0), c = Math.floor(c / 2);
        e.push(b ? 1 : 0);
        e.reverse();
        b = e.join("");
        c = "";
        for (a = 0; 64 > a; a += 8)d = parseInt(b.substr(a, 8), 2).toString(16), 1 === d.length &&
        (d = "0" + d), c += d;
        return c.toLowerCase()
    }

    var Bb = /^-?\d{1,10}$/;

    function vb(a) {
        return Bb.test(a) && (a = Number(a), -2147483648 <= a && 2147483647 >= a) ? a : null
    }

    function Cb(a) {
        try {
            a()
        } catch (b) {
            setTimeout(function () {
                z("Exception was thrown by user callback.", b.stack || "");
                throw b;
            }, Math.floor(0))
        }
    }

    function B(a, b) {
        if (ha(a)) {
            var c = Array.prototype.slice.call(arguments, 1).slice();
            Cb(function () {
                a.apply(null, c)
            })
        }
    };
    function Db(a, b, c, d) {
        this.pe = b;
        this.Sd = c;
        this.Kd = d;
        this.kd = a
    }

    Db.prototype.Rb = function () {
        var a = this.Sd.dc();
        return "value" === this.kd ? a.path : a.parent().path
    };
    Db.prototype.te = function () {
        return this.kd
    };
    Db.prototype.Mb = function () {
        return this.pe.Mb(this)
    };
    Db.prototype.toString = function () {
        return this.Rb().toString() + ":" + this.kd + ":" + r(this.Sd.cf())
    };
    function Eb(a, b, c) {
        this.pe = a;
        this.error = b;
        this.path = c
    }

    Eb.prototype.Rb = function () {
        return this.path
    };
    Eb.prototype.te = function () {
        return "cancel"
    };
    Eb.prototype.Mb = function () {
        return this.pe.Mb(this)
    };
    Eb.prototype.toString = function () {
        return this.path.toString() + ":cancel"
    };
    function C(a, b, c, d) {
        this.type = a;
        this.Ha = b;
        this.Ua = c;
        this.Ee = d;
        this.Kd = void 0
    }

    function Fb(a) {
        return new C(Gb, a)
    }

    var Gb = "value";

    function Hb(a, b, c) {
        this.Hb = a;
        this.lb = b;
        this.nb = c || null
    }

    h = Hb.prototype;
    h.wf = function (a) {
        return "value" === a
    };
    h.createEvent = function (a, b) {
        var c = b.n.g;
        return new Db("value", this, new D(a.Ha, b.dc(), c))
    };
    h.Mb = function (a) {
        var b = this.nb;
        if ("cancel" === a.te()) {
            y(this.lb, "Raising a cancel event on a listener with no cancel callback");
            var c = this.lb;
            return function () {
                c.call(b, a.error)
            }
        }
        var d = this.Hb;
        return function () {
            d.call(b, a.Sd)
        }
    };
    h.Ze = function (a, b) {
        return this.lb ? new Eb(this, a, b) : null
    };
    h.matches = function (a) {
        return a instanceof Hb ? a.Hb && this.Hb ? a.Hb === this.Hb && a.nb === this.nb : !0 : !1
    };
    h.jf = function () {
        return null !== this.Hb
    };
    function Ib(a, b, c) {
        this.ea = a;
        this.lb = b;
        this.nb = c
    }

    h = Ib.prototype;
    h.wf = function (a) {
        a = "children_added" === a ? "child_added" : a;
        return ("children_removed" === a ? "child_removed" : a)in this.ea
    };
    h.Ze = function (a, b) {
        return this.lb ? new Eb(this, a, b) : null
    };
    h.createEvent = function (a, b) {
        y(null != a.Ua, "Child events should have a childName.");
        var c = b.dc().u(a.Ua);
        return new Db(a.type, this, new D(a.Ha, c, b.n.g), a.Kd)
    };
    h.Mb = function (a) {
        var b = this.nb;
        if ("cancel" === a.te()) {
            y(this.lb, "Raising a cancel event on a listener with no cancel callback");
            var c = this.lb;
            return function () {
                c.call(b, a.error)
            }
        }
        var d = this.ea[a.kd];
        return function () {
            d.call(b, a.Sd, a.Kd)
        }
    };
    h.matches = function (a) {
        if (a instanceof Ib) {
            if (!this.ea || !a.ea)return !0;
            if (this.nb === a.nb) {
                var b = Jb(a.ea);
                if (b === Jb(this.ea)) {
                    if (1 === b) {
                        var b = Kb(a.ea), c = Kb(this.ea);
                        return c === b && (!a.ea[b] || !this.ea[c] || a.ea[b] === this.ea[c])
                    }
                    return Lb(this.ea, function (b, c) {
                        return a.ea[c] === b
                    })
                }
            }
        }
        return !1
    };
    h.jf = function () {
        return null !== this.ea
    };
    function jb(a) {
        for (var b = [], c = 0, d = 0; d < a.length; d++) {
            var e = a.charCodeAt(d);
            55296 <= e && 56319 >= e && (e -= 55296, d++, y(d < a.length, "Surrogate pair missing trail surrogate."), e = 65536 + (e << 10) + (a.charCodeAt(d) - 56320));
            128 > e ? b[c++] = e : (2048 > e ? b[c++] = e >> 6 | 192 : (65536 > e ? b[c++] = e >> 12 | 224 : (b[c++] = e >> 18 | 240, b[c++] = e >> 12 & 63 | 128), b[c++] = e >> 6 & 63 | 128), b[c++] = e & 63 | 128)
        }
        return b
    };
    function E(a, b, c, d) {
        var e;
        d < b ? e = "at least " + b : d > c && (e = 0 === c ? "none" : "no more than " + c);
        if (e)throw Error(a + " failed: Was called with " + d + (1 === d ? " argument." : " arguments.") + " Expects " + e + ".");
    }

    function G(a, b, c) {
        var d = "";
        switch (b) {
            case 1:
                d = c ? "first" : "First";
                break;
            case 2:
                d = c ? "second" : "Second";
                break;
            case 3:
                d = c ? "third" : "Third";
                break;
            case 4:
                d = c ? "fourth" : "Fourth";
                break;
            default:
                throw Error("errorPrefix called with argumentNumber > 4.  Need to update it?");
        }
        return a = a + " failed: " + (d + " argument ")
    }

    function H(a, b, c, d) {
        if ((!d || m(c)) && !ha(c))throw Error(G(a, b, d) + "must be a valid function.");
    }

    function Mb(a, b, c) {
        if (m(c) && (!ia(c) || null === c))throw Error(G(a, b, !0) + "must be a valid context object.");
    };
    var Nb = /[\[\].#$\/\u0000-\u001F\u007F]/, Ob = /[\[\].#$\u0000-\u001F\u007F]/;

    function Pb(a) {
        return p(a) && 0 !== a.length && !Nb.test(a)
    }

    function Qb(a) {
        return null === a || p(a) || ga(a) && !sb(a) || ia(a) && s(a, ".sv")
    }

    function Rb(a, b, c) {
        c && !m(b) || Sb(G(a, 1, c), b)
    }

    function Sb(a, b, c, d) {
        c || (c = 0);
        var e = d || [];
        if (!m(b))throw Error(a + "contains undefined" + Tb(e));
        if (ha(b))throw Error(a + "contains a function" + Tb(e) + " with contents: " + b.toString());
        if (sb(b))throw Error(a + "contains " + b.toString() + Tb(e));
        if (1E3 < c)throw new TypeError(a + "contains a cyclic object value (" + e.slice(0, 100).join(".") + "...)");
        if (p(b) && b.length > 10485760 / 3 && 10485760 < jb(b).length)throw Error(a + "contains a string greater than 10485760 utf8 bytes" + Tb(e) + " ('" + b.substring(0, 50) + "...')");
        if (ia(b)) {
            var f =
                !1, g = !1;
            ua(b, function (b, d) {
                if (".value" === b)f = !0; else if (".priority" !== b && ".sv" !== b && (g = !0, !Pb(b)))throw Error(a + " contains an invalid key (" + b + ")" + Tb(e) + '.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');
                e.push(b);
                Sb(a, d, c + 1, e);
                e.pop()
            });
            if (f && g)throw Error(a + ' contains ".value" child' + Tb(e) + " in addition to actual children.");
        }
    }

    function Tb(a) {
        return 0 == a.length ? "" : " in property '" + a.join(".") + "'"
    }

    function Ub(a, b) {
        if (!ia(b) || ea(b))throw Error(G(a, 1, !1) + " must be an Object containing the children to replace.");
        if (s(b, ".value"))throw Error(G(a, 1, !1) + ' must not contain ".value".  To overwrite with a leaf value, just use .set() instead.');
        Rb(a, b, !1)
    }

    function Vb(a, b, c) {
        if (sb(c))throw Error(G(a, b, !1) + "is " + c.toString() + ", but must be a valid Firebase priority (a string, finite number, server value, or null).");
        if (!Qb(c))throw Error(G(a, b, !1) + "must be a valid Firebase priority (a string, finite number, server value, or null).");
    }

    function Wb(a, b, c) {
        if (!c || m(b))switch (b) {
            case "value":
            case "child_added":
            case "child_removed":
            case "child_changed":
            case "child_moved":
                break;
            default:
                throw Error(G(a, 1, c) + 'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".');
        }
    }

    function Xb(a, b, c, d) {
        if ((!d || m(c)) && !Pb(c))throw Error(G(a, b, d) + 'was an invalid key: "' + c + '".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").');
    }

    function Yb(a, b) {
        if (!p(b) || 0 === b.length || Ob.test(b))throw Error(G(a, 1, !1) + 'was an invalid path: "' + b + '". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"');
    }

    function Zb(a, b) {
        if (".info" === I(b))throw Error(a + " failed: Can't modify data under /.info/");
    }

    function $b(a, b) {
        if (!p(b))throw Error(G(a, 1, !1) + "must be a valid credential (a string).");
    }

    function ac(a, b, c) {
        if (!p(c))throw Error(G(a, b, !1) + "must be a valid string.");
    }

    function J(a, b, c, d) {
        if (!d || m(c))if (!ia(c) || null === c)throw Error(G(a, b, d) + "must be a valid object.");
    }

    function K(a, b, c) {
        if (!ia(b) || null === b || !s(b, c))throw Error(G(a, 1, !1) + 'must contain the key "' + c + '"');
        if (!p(t(b, c)))throw Error(G(a, 1, !1) + 'must contain the key "' + c + '" with type "string"');
    };
    function bc(a) {
        this.g = a
    }

    h = bc.prototype;
    h.D = function (a, b, c, d, e) {
        y(a.Bc(this.g), "A node must be indexed if only a child is updated");
        d = a.K(b);
        if (d.aa(c))return a;
        null != e && (c.e() ? a.Da(b) ? cc(e, new C("child_removed", d, b)) : y(a.M(), "A child remove without an old child only makes sense on a leaf node") : d.e() ? cc(e, new C("child_added", c, b)) : cc(e, new C("child_changed", c, b, d)));
        return a.M() && c.e() ? a : a.P(b, c).hb(this.g)
    };
    h.oa = function (a, b, c) {
        null != c && (a.M() || a.U(L, function (a, e) {
            b.Da(a) || cc(c, new C("child_removed", e, a))
        }), b.M() || b.U(L, function (b, e) {
            if (a.Da(b)) {
                var f = a.K(b);
                f.aa(e) || cc(c, new C("child_changed", e, b, f))
            } else cc(c, new C("child_added", e, b))
        }));
        return b.hb(this.g)
    };
    h.$ = function (a, b) {
        return a.e() ? M : a.$(b)
    };
    h.Ca = function () {
        return !1
    };
    h.Nb = function () {
        return this
    };
    function dc(a) {
        this.ve = new bc(a.g);
        this.g = a.g;
        var b;
        a.ia ? (b = ec(a), b = a.g.ud(fc(a), b)) : b = a.g.yd();
        this.Vc = b;
        a.qa ? (b = gc(a), a = a.g.ud(hc(a), b)) : a = a.g.wd();
        this.xc = a
    }

    h = dc.prototype;
    h.matches = function (a) {
        return 0 >= this.g.compare(this.Vc, a) && 0 >= this.g.compare(a, this.xc)
    };
    h.D = function (a, b, c, d, e) {
        this.matches(new N(b, c)) || (c = M);
        return this.ve.D(a, b, c, d, e)
    };
    h.oa = function (a, b, c) {
        b.M() && (b = M);
        var d = b.hb(this.g), d = d.$(M), e = this;
        b.U(L, function (a, b) {
            e.matches(new N(a, b)) || (d = d.P(a, M))
        });
        return this.ve.oa(a, d, c)
    };
    h.$ = function (a) {
        return a
    };
    h.Ca = function () {
        return !0
    };
    h.Nb = function () {
        return this.ve
    };
    function ic(a, b) {
        return ub(a.name, b.name)
    }

    function jc(a, b) {
        return ub(a, b)
    };
    function kc() {
    }

    var lc = {};

    function mc(a) {
        return q(a.compare, a)
    }

    kc.prototype.we = function (a, b) {
        return 0 !== this.compare(new N("[MIN_NAME]", a), new N("[MIN_NAME]", b))
    };
    kc.prototype.yd = function () {
        return nc
    };
    function oc(a) {
        this.Vb = a
    }

    ma(oc, kc);
    h = oc.prototype;
    h.sd = function (a) {
        return !a.K(this.Vb).e()
    };
    h.compare = function (a, b) {
        var c = a.V.K(this.Vb), d = b.V.K(this.Vb), c = c.dd(d);
        return 0 === c ? ub(a.name, b.name) : c
    };
    h.ud = function (a, b) {
        var c = O(a), c = M.P(this.Vb, c);
        return new N(b, c)
    };
    h.wd = function () {
        var a = M.P(this.Vb, pc);
        return new N("[MAX_NAME]", a)
    };
    h.toString = function () {
        return this.Vb
    };
    var L = new oc(".priority");

    function qc() {
    }

    ma(qc, kc);
    h = qc.prototype;
    h.compare = function (a, b) {
        return ub(a.name, b.name)
    };
    h.sd = function () {
        throw fb("KeyIndex.isDefinedOn not expected to be called.");
    };
    h.we = function () {
        return !1
    };
    h.yd = function () {
        return nc
    };
    h.wd = function () {
        return new N("[MAX_NAME]", M)
    };
    h.ud = function (a) {
        y(p(a), "KeyIndex indexValue must always be a string.");
        return new N(a, M)
    };
    h.toString = function () {
        return ".key"
    };
    var rc = new qc;

    function sc() {
    }

    ma(sc, kc);
    h = sc.prototype;
    h.compare = function (a, b) {
        var c = a.V.dd(b.V);
        return 0 === c ? ub(a.name, b.name) : c
    };
    h.sd = function () {
        return !0
    };
    h.we = function (a, b) {
        return !a.aa(b)
    };
    h.yd = function () {
        return nc
    };
    h.wd = function () {
        return tc
    };
    h.ud = function (a, b) {
        var c = O(a);
        return new N(b, c)
    };
    h.toString = function () {
        return ".value"
    };
    var uc = new sc;

    function vc() {
    }

    vc.prototype.ff = function () {
        return null
    };
    vc.prototype.se = function () {
        return null
    };
    var wc = new vc;

    function xc(a, b, c) {
        this.Bf = a;
        this.Ia = b;
        this.Ed = c
    }

    xc.prototype.ff = function (a) {
        var b = this.Ia.B;
        if (yc(b, a))return b.j().K(a);
        b = null != this.Ed ? new zc(this.Ed, !0, !1) : this.Ia.o();
        return this.Bf.Ta(a, b)
    };
    xc.prototype.se = function (a, b, c) {
        var d = null != this.Ed ? this.Ed : Ac(this.Ia);
        a = this.Bf.he(d, b, 1, c, a);
        return 0 === a.length ? null : a[0]
    };
    function Bc() {
        this.Za = {}
    }

    function cc(a, b) {
        var c = b.type, d = b.Ua;
        y("child_added" == c || "child_changed" == c || "child_removed" == c, "Only child changes supported for tracking");
        y(".priority" !== d, "Only non-priority child changes can be tracked.");
        var e = t(a.Za, d);
        if (e) {
            var f = e.type;
            if ("child_added" == c && "child_removed" == f)a.Za[d] = new C("child_changed", b.Ha, d, e.Ha); else if ("child_removed" == c && "child_added" == f)delete a.Za[d]; else if ("child_removed" == c && "child_changed" == f)a.Za[d] = new C("child_removed", e.Ee, d); else if ("child_changed" == c &&
                "child_added" == f)a.Za[d] = new C("child_added", b.Ha, d); else if ("child_changed" == c && "child_changed" == f)a.Za[d] = new C("child_changed", b.Ha, d, e.Ee); else throw fb("Illegal combination of changes: " + b + " occurred after " + e);
        } else a.Za[d] = b
    };
    function N(a, b) {
        this.name = a;
        this.V = b
    }

    function Cc(a, b) {
        return new N(a, b)
    };
    function Dc(a) {
        this.ma = new dc(a);
        this.g = a.g;
        y(a.ka, "Only valid if limit has been set");
        this.sa = a.sa;
        this.Ab = !("" === a.Fb ? a.ia : "l" === a.Fb)
    }

    h = Dc.prototype;
    h.D = function (a, b, c, d, e) {
        this.ma.matches(new N(b, c)) || (c = M);
        return a.K(b).aa(c) ? a : a.vb() < this.sa ? this.ma.Nb().D(a, b, c, d, e) : Ec(this, a, b, c, d, e)
    };
    h.oa = function (a, b, c) {
        var d;
        if (b.M() || b.e())d = M.hb(this.g); else if (2 * this.sa < b.vb() && b.Bc(this.g)) {
            d = M.hb(this.g);
            b = this.Ab ? b.Sb(this.ma.xc, this.g) : b.Qb(this.ma.Vc, this.g);
            for (var e = 0; 0 < b.Na.length && e < this.sa;) {
                var f = P(b), g;
                if (g = this.Ab ? 0 >= this.g.compare(this.ma.Vc, f) : 0 >= this.g.compare(f, this.ma.xc))d = d.P(f.name, f.V), e++; else break
            }
        } else {
            d = b.hb(this.g);
            d = d.$(M);
            var k, l, n;
            if (this.Ab) {
                b = d.hf(this.g);
                k = this.ma.xc;
                l = this.ma.Vc;
                var u = mc(this.g);
                n = function (a, b) {
                    return u(b, a)
                }
            } else b = d.Pb(this.g), k = this.ma.Vc,
                l = this.ma.xc, n = mc(this.g);
            for (var e = 0, x = !1; 0 < b.Na.length;)f = P(b), !x && 0 >= n(k, f) && (x = !0), (g = x && e < this.sa && 0 >= n(f, l)) ? e++ : d = d.P(f.name, M)
        }
        return this.ma.Nb().oa(a, d, c)
    };
    h.$ = function (a) {
        return a
    };
    h.Ca = function () {
        return !0
    };
    h.Nb = function () {
        return this.ma.Nb()
    };
    function Ec(a, b, c, d, e, f) {
        var g;
        if (a.Ab) {
            var k = mc(a.g);
            g = function (a, b) {
                return k(b, a)
            }
        } else g = mc(a.g);
        y(b.vb() == a.sa, "");
        var l = new N(c, d), n = a.Ab ? Fc(b, a.g) : Gc(b, a.g), u = a.ma.matches(l);
        if (b.Da(c)) {
            var x = b.K(c), n = e.se(a.g, n, a.Ab);
            null != n && n.name == c && (n = e.se(a.g, n, a.Ab));
            e = null == n ? 1 : g(n, l);
            if (u && !d.e() && 0 <= e)return null != f && cc(f, new C("child_changed", d, c, x)), b.P(c, d);
            null != f && cc(f, new C("child_removed", x, c));
            b = b.P(c, M);
            return null != n && a.ma.matches(n) ? (null != f && cc(f, new C("child_added", n.V, n.name)), b.P(n.name,
                n.V)) : b
        }
        return d.e() ? b : u && 0 <= g(n, l) ? (null != f && (cc(f, new C("child_removed", n.V, n.name)), cc(f, new C("child_added", d, c))), b.P(c, d).P(n.name, M)) : b
    };
    function Hc() {
        this.wc = this.qa = this.lc = this.ia = this.ka = !1;
        this.sa = 0;
        this.Fb = "";
        this.Ac = null;
        this.Xb = "";
        this.zc = null;
        this.Ub = "";
        this.g = L
    }

    var Ic = new Hc;

    function fc(a) {
        y(a.ia, "Only valid if start has been set");
        return a.Ac
    }

    function ec(a) {
        y(a.ia, "Only valid if start has been set");
        return a.lc ? a.Xb : "[MIN_NAME]"
    }

    function hc(a) {
        y(a.qa, "Only valid if end has been set");
        return a.zc
    }

    function gc(a) {
        y(a.qa, "Only valid if end has been set");
        return a.wc ? a.Ub : "[MAX_NAME]"
    }

    function Jc(a) {
        var b = new Hc;
        b.ka = a.ka;
        b.sa = a.sa;
        b.ia = a.ia;
        b.Ac = a.Ac;
        b.lc = a.lc;
        b.Xb = a.Xb;
        b.qa = a.qa;
        b.zc = a.zc;
        b.wc = a.wc;
        b.Ub = a.Ub;
        b.g = a.g;
        return b
    }

    h = Hc.prototype;
    h.Be = function (a) {
        var b = Jc(this);
        b.ka = !0;
        b.sa = a;
        b.Fb = "";
        return b
    };
    h.Ce = function (a) {
        var b = Jc(this);
        b.ka = !0;
        b.sa = a;
        b.Fb = "l";
        return b
    };
    h.De = function (a) {
        var b = Jc(this);
        b.ka = !0;
        b.sa = a;
        b.Fb = "r";
        return b
    };
    h.Td = function (a, b) {
        var c = Jc(this);
        c.ia = !0;
        m(a) || (a = null);
        c.Ac = a;
        null != b ? (c.lc = !0, c.Xb = b) : (c.lc = !1, c.Xb = "");
        return c
    };
    h.jd = function (a, b) {
        var c = Jc(this);
        c.qa = !0;
        m(a) || (a = null);
        c.zc = a;
        m(b) ? (c.wc = !0, c.Ub = b) : (c.Jg = !1, c.Ub = "");
        return c
    };
    function Kc(a, b) {
        var c = Jc(a);
        c.g = b;
        return c
    }

    function Lc(a) {
        var b = {};
        a.ia && (b.sp = a.Ac, a.lc && (b.sn = a.Xb));
        a.qa && (b.ep = a.zc, a.wc && (b.en = a.Ub));
        if (a.ka) {
            b.l = a.sa;
            var c = a.Fb;
            "" === c && (c = a.ia ? "l" : "r");
            b.vf = c
        }
        a.g !== L && (b.i = a.g.toString());
        return b
    }

    function Mc(a) {
        return !(a.ia || a.qa || a.ka)
    }

    h.toString = function () {
        return r(Lc(this))
    };
    function Q(a, b, c, d) {
        this.k = a;
        this.path = b;
        this.n = c;
        this.bc = d
    }

    function Nc(a) {
        var b = null, c = null;
        a.ia && (b = fc(a));
        a.qa && (c = hc(a));
        if (a.g === rc) {
            if (a.ia) {
                if ("[MIN_NAME]" != ec(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");
                if ("string" !== typeof b)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");
            }
            if (a.qa) {
                if ("[MAX_NAME]" != gc(a))throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");
                if ("string" !== typeof c)throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");
            }
        } else if (a.g === L) {
            if (null != b && !Qb(b) || null != c && !Qb(c))throw Error("Query: When ordering by priority, the first argument passed to startAt(), endAt(), or equalTo() must be a valid priority value (null, a number, or a string).");
        } else if (y(a.g instanceof oc || a.g === uc, "unknown index type."), null != b && "object" === typeof b || null != c && "object" === typeof c)throw Error("Query: First argument passed to startAt(), endAt(), or equalTo() cannot be an object.");
    }

    function Oc(a) {
        if (a.ia && a.qa && a.ka && (!a.ka || "" === a.Fb))throw Error("Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead.");
    }

    function Pc(a, b) {
        if (!0 === a.bc)throw Error(b + ": You can't combine multiple orderBy calls.");
    }

    Q.prototype.dc = function () {
        E("Query.ref", 0, 0, arguments.length);
        return new R(this.k, this.path)
    };
    Q.prototype.ref = Q.prototype.dc;
    Q.prototype.wb = function (a, b, c, d) {
        E("Query.on", 2, 4, arguments.length);
        Wb("Query.on", a, !1);
        H("Query.on", 2, b, !1);
        var e = Qc("Query.on", c, d);
        if ("value" === a)Rc(this.k, this, new Hb(b, e.cancel || null, e.Ka || null)); else {
            var f = {};
            f[a] = b;
            Rc(this.k, this, new Ib(f, e.cancel, e.Ka))
        }
        return b
    };
    Q.prototype.on = Q.prototype.wb;
    Q.prototype.$b = function (a, b, c) {
        E("Query.off", 0, 3, arguments.length);
        Wb("Query.off", a, !0);
        H("Query.off", 2, b, !0);
        Mb("Query.off", 3, c);
        var d = null, e = null;
        "value" === a ? d = new Hb(b || null, null, c || null) : a && (b && (e = {}, e[a] = b), d = new Ib(e, null, c || null));
        e = this.k;
        d = ".info" === I(this.path) ? e.rd.gb(this, d) : e.N.gb(this, d);
        Sc(e.ba, this.path, d)
    };
    Q.prototype.off = Q.prototype.$b;
    Q.prototype.lg = function (a, b) {
        function c(g) {
            f && (f = !1, e.$b(a, c), b.call(d.Ka, g))
        }

        E("Query.once", 2, 4, arguments.length);
        Wb("Query.once", a, !1);
        H("Query.once", 2, b, !1);
        var d = Qc("Query.once", arguments[2], arguments[3]), e = this, f = !0;
        this.wb(a, c, function (b) {
            e.$b(a, c);
            d.cancel && d.cancel.call(d.Ka, b)
        })
    };
    Q.prototype.once = Q.prototype.lg;
    Q.prototype.Be = function (a) {
        z("Query.limit() being deprecated. Please use Query.limitToFirst() or Query.limitToLast() instead.");
        E("Query.limit", 1, 1, arguments.length);
        if (!ga(a) || Math.floor(a) !== a || 0 >= a)throw Error("Query.limit: First argument must be a positive integer.");
        if (this.n.ka)throw Error("Query.limit: Limit was already set (by another call to limit, limitToFirst, orlimitToLast.");
        var b = this.n.Be(a);
        Oc(b);
        return new Q(this.k, this.path, b, this.bc)
    };
    Q.prototype.limit = Q.prototype.Be;
    Q.prototype.Ce = function (a) {
        E("Query.limitToFirst", 1, 1, arguments.length);
        if (!ga(a) || Math.floor(a) !== a || 0 >= a)throw Error("Query.limitToFirst: First argument must be a positive integer.");
        if (this.n.ka)throw Error("Query.limitToFirst: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");
        return new Q(this.k, this.path, this.n.Ce(a), this.bc)
    };
    Q.prototype.limitToFirst = Q.prototype.Ce;
    Q.prototype.De = function (a) {
        E("Query.limitToLast", 1, 1, arguments.length);
        if (!ga(a) || Math.floor(a) !== a || 0 >= a)throw Error("Query.limitToLast: First argument must be a positive integer.");
        if (this.n.ka)throw Error("Query.limitToLast: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");
        return new Q(this.k, this.path, this.n.De(a), this.bc)
    };
    Q.prototype.limitToLast = Q.prototype.De;
    Q.prototype.mg = function (a) {
        E("Query.orderByChild", 1, 1, arguments.length);
        if ("$key" === a)throw Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');
        if ("$priority" === a)throw Error('Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');
        if ("$value" === a)throw Error('Query.orderByChild: "$value" is invalid.  Use Query.orderByValue() instead.');
        Xb("Query.orderByChild", 1, a, !1);
        Pc(this, "Query.orderByChild");
        var b = Kc(this.n, new oc(a));
        Nc(b);
        return new Q(this.k,
            this.path, b, !0)
    };
    Q.prototype.orderByChild = Q.prototype.mg;
    Q.prototype.ng = function () {
        E("Query.orderByKey", 0, 0, arguments.length);
        Pc(this, "Query.orderByKey");
        var a = Kc(this.n, rc);
        Nc(a);
        return new Q(this.k, this.path, a, !0)
    };
    Q.prototype.orderByKey = Q.prototype.ng;
    Q.prototype.og = function () {
        E("Query.orderByPriority", 0, 0, arguments.length);
        Pc(this, "Query.orderByPriority");
        var a = Kc(this.n, L);
        Nc(a);
        return new Q(this.k, this.path, a, !0)
    };
    Q.prototype.orderByPriority = Q.prototype.og;
    Q.prototype.pg = function () {
        E("Query.orderByValue", 0, 0, arguments.length);
        Pc(this, "Query.orderByValue");
        var a = Kc(this.n, uc);
        Nc(a);
        return new Q(this.k, this.path, a, !0)
    };
    Q.prototype.orderByValue = Q.prototype.pg;
    Q.prototype.Td = function (a, b) {
        E("Query.startAt", 0, 2, arguments.length);
        Rb("Query.startAt", a, !0);
        Xb("Query.startAt", 2, b, !0);
        var c = this.n.Td(a, b);
        Oc(c);
        Nc(c);
        if (this.n.ia)throw Error("Query.startAt: Starting point was already set (by another call to startAt or equalTo).");
        m(a) || (b = a = null);
        return new Q(this.k, this.path, c, this.bc)
    };
    Q.prototype.startAt = Q.prototype.Td;
    Q.prototype.jd = function (a, b) {
        E("Query.endAt", 0, 2, arguments.length);
        Rb("Query.endAt", a, !0);
        Xb("Query.endAt", 2, b, !0);
        var c = this.n.jd(a, b);
        Oc(c);
        Nc(c);
        if (this.n.qa)throw Error("Query.endAt: Ending point was already set (by another call to endAt or equalTo).");
        return new Q(this.k, this.path, c, this.bc)
    };
    Q.prototype.endAt = Q.prototype.jd;
    Q.prototype.Tf = function (a, b) {
        E("Query.equalTo", 1, 2, arguments.length);
        Rb("Query.equalTo", a, !1);
        Xb("Query.equalTo", 2, b, !0);
        if (this.n.ia)throw Error("Query.equalTo: Starting point was already set (by another call to endAt or equalTo).");
        if (this.n.qa)throw Error("Query.equalTo: Ending point was already set (by another call to endAt or equalTo).");
        return this.Td(a, b).jd(a, b)
    };
    Q.prototype.equalTo = Q.prototype.Tf;
    Q.prototype.Fa = function () {
        var a = xb(Lc(this.n));
        return "{}" === a ? "default" : a
    };
    function Qc(a, b, c) {
        var d = {cancel: null, Ka: null};
        if (b && c)d.cancel = b, H(a, 3, d.cancel, !0), d.Ka = c, Mb(a, 4, d.Ka); else if (b)if ("object" === typeof b && null !== b)d.Ka = b; else if ("function" === typeof b)d.cancel = b; else throw Error(G(a, 3, !0) + " must either be a cancel callback or a context object.");
        return d
    };
    function S(a, b) {
        if (1 == arguments.length) {
            this.w = a.split("/");
            for (var c = 0, d = 0; d < this.w.length; d++)0 < this.w[d].length && (this.w[c] = this.w[d], c++);
            this.w.length = c;
            this.da = 0
        } else this.w = a, this.da = b
    }

    function I(a) {
        return a.da >= a.w.length ? null : a.w[a.da]
    }

    function Tc(a) {
        return a.w.length - a.da
    }

    function T(a) {
        var b = a.da;
        b < a.w.length && b++;
        return new S(a.w, b)
    }

    function Uc(a) {
        return a.da < a.w.length ? a.w[a.w.length - 1] : null
    }

    S.prototype.toString = function () {
        for (var a = "", b = this.da; b < this.w.length; b++)"" !== this.w[b] && (a += "/" + this.w[b]);
        return a || "/"
    };
    S.prototype.parent = function () {
        if (this.da >= this.w.length)return null;
        for (var a = [], b = this.da; b < this.w.length - 1; b++)a.push(this.w[b]);
        return new S(a, 0)
    };
    S.prototype.u = function (a) {
        for (var b = [], c = this.da; c < this.w.length; c++)b.push(this.w[c]);
        if (a instanceof S)for (c = a.da; c < a.w.length; c++)b.push(a.w[c]); else for (a = a.split("/"), c = 0; c < a.length; c++)0 < a[c].length && b.push(a[c]);
        return new S(b, 0)
    };
    S.prototype.e = function () {
        return this.da >= this.w.length
    };
    var U = new S("");

    function V(a, b) {
        var c = I(a);
        if (null === c)return b;
        if (c === I(b))return V(T(a), T(b));
        throw Error("INTERNAL ERROR: innerPath (" + b + ") is not within outerPath (" + a + ")");
    }

    S.prototype.aa = function (a) {
        if (Tc(this) !== Tc(a))return !1;
        for (var b = this.da, c = a.da; b <= this.w.length; b++, c++)if (this.w[b] !== a.w[c])return !1;
        return !0
    };
    S.prototype.contains = function (a) {
        var b = this.da, c = a.da;
        if (Tc(this) > Tc(a))return !1;
        for (; b < this.w.length;) {
            if (this.w[b] !== a.w[c])return !1;
            ++b;
            ++c
        }
        return !0
    };
    function Vc() {
        this.children = {};
        this.bd = 0;
        this.value = null
    }

    function Wc(a, b, c) {
        this.zd = a ? a : "";
        this.Oc = b ? b : null;
        this.A = c ? c : new Vc
    }

    function Xc(a, b) {
        for (var c = b instanceof S ? b : new S(b), d = a, e; null !== (e = I(c));)d = new Wc(e, d, t(d.A.children, e) || new Vc), c = T(c);
        return d
    }

    h = Wc.prototype;
    h.za = function () {
        return this.A.value
    };
    function Yc(a, b) {
        y("undefined" !== typeof b, "Cannot set value to undefined");
        a.A.value = b;
        Zc(a)
    }

    h.clear = function () {
        this.A.value = null;
        this.A.children = {};
        this.A.bd = 0;
        Zc(this)
    };
    h.md = function () {
        return 0 < this.A.bd
    };
    h.e = function () {
        return null === this.za() && !this.md()
    };
    h.U = function (a) {
        var b = this;
        A(this.A.children, function (c, d) {
            a(new Wc(d, b, c))
        })
    };
    function $c(a, b, c, d) {
        c && !d && b(a);
        a.U(function (a) {
            $c(a, b, !0, d)
        });
        c && d && b(a)
    }

    function ad(a, b) {
        for (var c = a.parent(); null !== c && !b(c);)c = c.parent()
    }

    h.path = function () {
        return new S(null === this.Oc ? this.zd : this.Oc.path() + "/" + this.zd)
    };
    h.name = function () {
        return this.zd
    };
    h.parent = function () {
        return this.Oc
    };
    function Zc(a) {
        if (null !== a.Oc) {
            var b = a.Oc, c = a.zd, d = a.e(), e = s(b.A.children, c);
            d && e ? (delete b.A.children[c], b.A.bd--, Zc(b)) : d || e || (b.A.children[c] = a.A, b.A.bd++, Zc(b))
        }
    };
    function bd(a, b) {
        this.Ja = a;
        this.va = b ? b : cd
    }

    h = bd.prototype;
    h.La = function (a, b) {
        return new bd(this.Ja, this.va.La(a, b, this.Ja).Y(null, null, !1, null, null))
    };
    h.remove = function (a) {
        return new bd(this.Ja, this.va.remove(a, this.Ja).Y(null, null, !1, null, null))
    };
    h.get = function (a) {
        for (var b, c = this.va; !c.e();) {
            b = this.Ja(a, c.key);
            if (0 === b)return c.value;
            0 > b ? c = c.left : 0 < b && (c = c.right)
        }
        return null
    };
    function dd(a, b) {
        for (var c, d = a.va, e = null; !d.e();) {
            c = a.Ja(b, d.key);
            if (0 === c) {
                if (d.left.e())return e ? e.key : null;
                for (d = d.left; !d.right.e();)d = d.right;
                return d.key
            }
            0 > c ? d = d.left : 0 < c && (e = d, d = d.right)
        }
        throw Error("Attempted to find predecessor key for a nonexistent key.  What gives?");
    }

    h.e = function () {
        return this.va.e()
    };
    h.count = function () {
        return this.va.count()
    };
    h.Ic = function () {
        return this.va.Ic()
    };
    h.Yb = function () {
        return this.va.Yb()
    };
    h.fa = function (a) {
        return this.va.fa(a)
    };
    h.Pb = function (a) {
        return new ed(this.va, null, this.Ja, !1, a)
    };
    h.Qb = function (a, b) {
        return new ed(this.va, a, this.Ja, !1, b)
    };
    h.Sb = function (a, b) {
        return new ed(this.va, a, this.Ja, !0, b)
    };
    h.hf = function (a) {
        return new ed(this.va, null, this.Ja, !0, a)
    };
    function ed(a, b, c, d, e) {
        this.Nd = e || null;
        this.ze = d;
        this.Na = [];
        for (e = 1; !a.e();)if (e = b ? c(a.key, b) : 1, d && (e *= -1), 0 > e)a = this.ze ? a.left : a.right; else if (0 === e) {
            this.Na.push(a);
            break
        } else this.Na.push(a), a = this.ze ? a.right : a.left
    }

    function P(a) {
        if (0 === a.Na.length)return null;
        var b = a.Na.pop(), c;
        c = a.Nd ? a.Nd(b.key, b.value) : {key: b.key, value: b.value};
        if (a.ze)for (b = b.left; !b.e();)a.Na.push(b), b = b.right; else for (b = b.right; !b.e();)a.Na.push(b), b = b.left;
        return c
    }

    function fd(a) {
        if (0 === a.Na.length)return null;
        var b;
        b = a.Na;
        b = b[b.length - 1];
        return a.Nd ? a.Nd(b.key, b.value) : {key: b.key, value: b.value}
    }

    function gd(a, b, c, d, e) {
        this.key = a;
        this.value = b;
        this.color = null != c ? c : !0;
        this.left = null != d ? d : cd;
        this.right = null != e ? e : cd
    }

    h = gd.prototype;
    h.Y = function (a, b, c, d, e) {
        return new gd(null != a ? a : this.key, null != b ? b : this.value, null != c ? c : this.color, null != d ? d : this.left, null != e ? e : this.right)
    };
    h.count = function () {
        return this.left.count() + 1 + this.right.count()
    };
    h.e = function () {
        return !1
    };
    h.fa = function (a) {
        return this.left.fa(a) || a(this.key, this.value) || this.right.fa(a)
    };
    function hd(a) {
        return a.left.e() ? a : hd(a.left)
    }

    h.Ic = function () {
        return hd(this).key
    };
    h.Yb = function () {
        return this.right.e() ? this.key : this.right.Yb()
    };
    h.La = function (a, b, c) {
        var d, e;
        e = this;
        d = c(a, e.key);
        e = 0 > d ? e.Y(null, null, null, e.left.La(a, b, c), null) : 0 === d ? e.Y(null, b, null, null, null) : e.Y(null, null, null, null, e.right.La(a, b, c));
        return id(e)
    };
    function jd(a) {
        if (a.left.e())return cd;
        a.left.ca() || a.left.left.ca() || (a = kd(a));
        a = a.Y(null, null, null, jd(a.left), null);
        return id(a)
    }

    h.remove = function (a, b) {
        var c, d;
        c = this;
        if (0 > b(a, c.key))c.left.e() || c.left.ca() || c.left.left.ca() || (c = kd(c)), c = c.Y(null, null, null, c.left.remove(a, b), null); else {
            c.left.ca() && (c = md(c));
            c.right.e() || c.right.ca() || c.right.left.ca() || (c = nd(c), c.left.left.ca() && (c = md(c), c = nd(c)));
            if (0 === b(a, c.key)) {
                if (c.right.e())return cd;
                d = hd(c.right);
                c = c.Y(d.key, d.value, null, null, jd(c.right))
            }
            c = c.Y(null, null, null, null, c.right.remove(a, b))
        }
        return id(c)
    };
    h.ca = function () {
        return this.color
    };
    function id(a) {
        a.right.ca() && !a.left.ca() && (a = od(a));
        a.left.ca() && a.left.left.ca() && (a = md(a));
        a.left.ca() && a.right.ca() && (a = nd(a));
        return a
    }

    function kd(a) {
        a = nd(a);
        a.right.left.ca() && (a = a.Y(null, null, null, null, md(a.right)), a = od(a), a = nd(a));
        return a
    }

    function od(a) {
        return a.right.Y(null, null, a.color, a.Y(null, null, !0, null, a.right.left), null)
    }

    function md(a) {
        return a.left.Y(null, null, a.color, null, a.Y(null, null, !0, a.left.right, null))
    }

    function nd(a) {
        return a.Y(null, null, !a.color, a.left.Y(null, null, !a.left.color, null, null), a.right.Y(null, null, !a.right.color, null, null))
    }

    function pd() {
    }

    h = pd.prototype;
    h.Y = function () {
        return this
    };
    h.La = function (a, b) {
        return new gd(a, b, null)
    };
    h.remove = function () {
        return this
    };
    h.count = function () {
        return 0
    };
    h.e = function () {
        return !0
    };
    h.fa = function () {
        return !1
    };
    h.Ic = function () {
        return null
    };
    h.Yb = function () {
        return null
    };
    h.ca = function () {
        return !1
    };
    var cd = new pd;

    function qd(a, b) {
        this.F = a;
        y(m(this.F) && null !== this.F, "LeafNode shouldn't be created with null/undefined value.");
        this.ha = b || M;
        rd(this.ha);
        this.tb = null
    }

    h = qd.prototype;
    h.M = function () {
        return !0
    };
    h.L = function () {
        return this.ha
    };
    h.$ = function (a) {
        return new qd(this.F, a)
    };
    h.K = function (a) {
        return ".priority" === a ? this.ha : M
    };
    h.ra = function (a) {
        return a.e() ? this : ".priority" === I(a) ? this.ha : M
    };
    h.Da = function () {
        return !1
    };
    h.gf = function () {
        return null
    };
    h.P = function (a, b) {
        return ".priority" === a ? this.$(b) : b.e() && ".priority" !== a ? this : M.P(a, b).$(this.ha)
    };
    h.D = function (a, b) {
        var c = I(a);
        if (null === c)return b;
        if (b.e() && ".priority" !== c)return this;
        y(".priority" !== c || 1 === Tc(a), ".priority must be the last token in a path");
        return this.P(c, M.D(T(a), b))
    };
    h.e = function () {
        return !1
    };
    h.vb = function () {
        return 0
    };
    h.I = function (a) {
        return a && !this.L().e() ? {".value": this.za(), ".priority": this.L().I()} : this.za()
    };
    h.hash = function () {
        if (null === this.tb) {
            var a = "";
            this.ha.e() || (a += "priority:" + sd(this.ha.I()) + ":");
            var b = typeof this.F, a = a + (b + ":"), a = "number" === b ? a + Ab(this.F) : a + this.F;
            this.tb = ib(a)
        }
        return this.tb
    };
    h.za = function () {
        return this.F
    };
    h.dd = function (a) {
        if (a === M)return 1;
        if (a instanceof W)return -1;
        y(a.M(), "Unknown node type");
        var b = typeof a.F, c = typeof this.F, d = Ga(td, b), e = Ga(td, c);
        y(0 <= d, "Unknown leaf type: " + b);
        y(0 <= e, "Unknown leaf type: " + c);
        return d === e ? "object" === c ? 0 : this.F < a.F ? -1 : this.F === a.F ? 0 : 1 : e - d
    };
    var td = ["object", "boolean", "number", "string"];
    qd.prototype.hb = function () {
        return this
    };
    qd.prototype.Bc = function () {
        return !0
    };
    qd.prototype.aa = function (a) {
        return a === this ? !0 : a.M() ? this.F === a.F && this.ha.aa(a.ha) : !1
    };
    qd.prototype.toString = function () {
        return r(this.I(!0))
    };
    function ud(a, b) {
        this.qd = a;
        this.Wb = b
    }

    ud.prototype.get = function (a) {
        var b = t(this.qd, a);
        if (!b)throw Error("No index defined for " + a);
        return b === lc ? null : b
    };
    function vd(a, b, c) {
        var d = wd(a.qd, function (d, f) {
            var g = t(a.Wb, f);
            y(g, "Missing index implementation for " + f);
            if (d === lc) {
                if (g.sd(b.V)) {
                    for (var k = [], l = c.Pb(Cc), n = P(l); n;)n.name != b.name && k.push(n), n = P(l);
                    k.push(b);
                    return xd(k, mc(g))
                }
                return lc
            }
            g = c.get(b.name);
            k = d;
            g && (k = k.remove(new N(b.name, g)));
            return k.La(b, b.V)
        });
        return new ud(d, a.Wb)
    }

    function yd(a, b, c) {
        var d = wd(a.qd, function (a) {
            if (a === lc)return a;
            var d = c.get(b.name);
            return d ? a.remove(new N(b.name, d)) : a
        });
        return new ud(d, a.Wb)
    }

    var zd = new ud({".priority": lc}, {".priority": L});

    function W(a, b, c) {
        this.m = a;
        (this.ha = b) && rd(this.ha);
        this.pb = c;
        this.tb = null
    }

    h = W.prototype;
    h.M = function () {
        return !1
    };
    h.L = function () {
        return this.ha || M
    };
    h.$ = function (a) {
        return new W(this.m, a, this.pb)
    };
    h.K = function (a) {
        if (".priority" === a)return this.L();
        a = this.m.get(a);
        return null === a ? M : a
    };
    h.ra = function (a) {
        var b = I(a);
        return null === b ? this : this.K(b).ra(T(a))
    };
    h.Da = function (a) {
        return null !== this.m.get(a)
    };
    h.P = function (a, b) {
        y(b, "We should always be passing snapshot nodes");
        if (".priority" === a)return this.$(b);
        var c = new N(a, b), d;
        b.e() ? (d = this.m.remove(a), c = yd(this.pb, c, this.m)) : (d = this.m.La(a, b), c = vd(this.pb, c, this.m));
        return new W(d, this.ha, c)
    };
    h.D = function (a, b) {
        var c = I(a);
        if (null === c)return b;
        y(".priority" !== I(a) || 1 === Tc(a), ".priority must be the last token in a path");
        var d = this.K(c).D(T(a), b);
        return this.P(c, d)
    };
    h.e = function () {
        return this.m.e()
    };
    h.vb = function () {
        return this.m.count()
    };
    var Ad = /^(0|[1-9]\d*)$/;
    h = W.prototype;
    h.I = function (a) {
        if (this.e())return null;
        var b = {}, c = 0, d = 0, e = !0;
        this.U(L, function (f, g) {
            b[f] = g.I(a);
            c++;
            e && Ad.test(f) ? d = Math.max(d, Number(f)) : e = !1
        });
        if (!a && e && d < 2 * c) {
            var f = [], g;
            for (g in b)f[g] = b[g];
            return f
        }
        a && !this.L().e() && (b[".priority"] = this.L().I());
        return b
    };
    h.hash = function () {
        if (null === this.tb) {
            var a = "";
            this.L().e() || (a += "priority:" + sd(this.L().I()) + ":");
            this.U(L, function (b, c) {
                var d = c.hash();
                "" !== d && (a += ":" + b + ":" + d)
            });
            this.tb = "" === a ? "" : ib(a)
        }
        return this.tb
    };
    h.gf = function (a, b, c) {
        return (c = Bd(this, c)) ? (a = dd(c, new N(a, b))) ? a.name : null : dd(this.m, a)
    };
    function Fc(a, b) {
        var c;
        c = (c = Bd(a, b)) ? (c = c.Ic()) && c.name : a.m.Ic();
        return c ? new N(c, a.m.get(c)) : null
    }

    function Gc(a, b) {
        var c;
        c = (c = Bd(a, b)) ? (c = c.Yb()) && c.name : a.m.Yb();
        return c ? new N(c, a.m.get(c)) : null
    }

    h.U = function (a, b) {
        var c = Bd(this, a);
        return c ? c.fa(function (a) {
            return b(a.name, a.V)
        }) : this.m.fa(b)
    };
    h.Pb = function (a) {
        return this.Qb(a.yd(), a)
    };
    h.Qb = function (a, b) {
        var c = Bd(this, b);
        if (c)return c.Qb(a, function (a) {
            return a
        });
        for (var c = this.m.Qb(a.name, Cc), d = fd(c); null != d && 0 > b.compare(d, a);)P(c), d = fd(c);
        return c
    };
    h.hf = function (a) {
        return this.Sb(a.wd(), a)
    };
    h.Sb = function (a, b) {
        var c = Bd(this, b);
        if (c)return c.Sb(a, function (a) {
            return a
        });
        for (var c = this.m.Sb(a.name, Cc), d = fd(c); null != d && 0 < b.compare(d, a);)P(c), d = fd(c);
        return c
    };
    h.dd = function (a) {
        return this.e() ? a.e() ? 0 : -1 : a.M() || a.e() ? 1 : a === pc ? -1 : 0
    };
    h.hb = function (a) {
        if (a === rc || Cd(this.pb.Wb, a.toString()))return this;
        var b = this.pb, c = this.m;
        y(a !== rc, "KeyIndex always exists and isn't meant to be added to the IndexMap.");
        for (var d = [], e = !1, c = c.Pb(Cc), f = P(c); f;)e = e || a.sd(f.V), d.push(f), f = P(c);
        d = e ? xd(d, mc(a)) : lc;
        e = a.toString();
        c = Dd(b.Wb);
        c[e] = a;
        a = Dd(b.qd);
        a[e] = d;
        return new W(this.m, this.ha, new ud(a, c))
    };
    h.Bc = function (a) {
        return a === rc || Cd(this.pb.Wb, a.toString())
    };
    h.aa = function (a) {
        if (a === this)return !0;
        if (a.M())return !1;
        if (this.L().aa(a.L()) && this.m.count() === a.m.count()) {
            var b = this.Pb(L);
            a = a.Pb(L);
            for (var c = P(b), d = P(a); c && d;) {
                if (c.name !== d.name || !c.V.aa(d.V))return !1;
                c = P(b);
                d = P(a)
            }
            return null === c && null === d
        }
        return !1
    };
    function Bd(a, b) {
        return b === rc ? null : a.pb.get(b.toString())
    }

    h.toString = function () {
        return r(this.I(!0))
    };
    function O(a, b) {
        if (null === a)return M;
        var c = null;
        "object" === typeof a && ".priority"in a ? c = a[".priority"] : "undefined" !== typeof b && (c = b);
        y(null === c || "string" === typeof c || "number" === typeof c || "object" === typeof c && ".sv"in c, "Invalid priority type found: " + typeof c);
        "object" === typeof a && ".value"in a && null !== a[".value"] && (a = a[".value"]);
        if ("object" !== typeof a || ".sv"in a)return new qd(a, O(c));
        if (a instanceof Array) {
            var d = M, e = a;
            A(e, function (a, b) {
                if (s(e, b) && "." !== b.substring(0, 1)) {
                    var c = O(a);
                    if (c.M() || !c.e())d =
                        d.P(b, c)
                }
            });
            return d.$(O(c))
        }
        var f = [], g = !1, k = a;
        ua(k, function (a) {
            if ("string" !== typeof a || "." !== a.substring(0, 1)) {
                var b = O(k[a]);
                b.e() || (g = g || !b.L().e(), f.push(new N(a, b)))
            }
        });
        var l = xd(f, ic, function (a) {
            return a.name
        }, jc);
        if (g) {
            var n = xd(f, mc(L));
            return new W(l, O(c), new ud({".priority": n}, {".priority": L}))
        }
        return new W(l, O(c), zd)
    }

    var Ed = Math.log(2);

    function Fd(a) {
        this.count = parseInt(Math.log(a + 1) / Ed, 10);
        this.af = this.count - 1;
        this.Nf = a + 1 & parseInt(Array(this.count + 1).join("1"), 2)
    }

    function Gd(a) {
        var b = !(a.Nf & 1 << a.af);
        a.af--;
        return b
    }

    function xd(a, b, c, d) {
        function e(b, d) {
            var f = d - b;
            if (0 == f)return null;
            if (1 == f) {
                var n = a[b], u = c ? c(n) : n;
                return new gd(u, n.V, !1, null, null)
            }
            var n = parseInt(f / 2, 10) + b, f = e(b, n), x = e(n + 1, d), n = a[n], u = c ? c(n) : n;
            return new gd(u, n.V, !1, f, x)
        }

        a.sort(b);
        var f = function (b) {
            function d(b, g) {
                var k = u - b, x = u;
                u -= b;
                var x = e(k + 1, x), k = a[k], F = c ? c(k) : k, x = new gd(F, k.V, g, null, x);
                f ? f.left = x : n = x;
                f = x
            }

            for (var f = null, n = null, u = a.length, x = 0; x < b.count; ++x) {
                var F = Gd(b), ld = Math.pow(2, b.count - (x + 1));
                F ? d(ld, !1) : (d(ld, !1), d(ld, !0))
            }
            return n
        }(new Fd(a.length));
        return null !== f ? new bd(d || b, f) : new bd(d || b)
    }

    function sd(a) {
        return "number" === typeof a ? "number:" + Ab(a) : "string:" + a
    }

    function rd(a) {
        if (a.M()) {
            var b = a.I();
            y("string" === typeof b || "number" === typeof b || "object" === typeof b && s(b, ".sv"), "Priority must be a string or number.")
        } else y(a === pc || a.e(), "priority of unexpected type.");
        y(a === pc || a.L().e(), "Priority nodes can't have a priority of their own.")
    }

    var M = new W(new bd(jc), null, zd);

    function Hd() {
        W.call(this, new bd(jc), M, zd)
    }

    ma(Hd, W);
    h = Hd.prototype;
    h.dd = function (a) {
        return a === this ? 0 : 1
    };
    h.aa = function (a) {
        return a === this
    };
    h.L = function () {
        throw fb("Why is this called?");
    };
    h.K = function () {
        return M
    };
    h.e = function () {
        return !1
    };
    var pc = new Hd, nc = new N("[MIN_NAME]", M), tc = new N("[MAX_NAME]", pc);

    function D(a, b, c) {
        this.A = a;
        this.W = b;
        this.g = c
    }

    D.prototype.I = function () {
        E("Firebase.DataSnapshot.val", 0, 0, arguments.length);
        return this.A.I()
    };
    D.prototype.val = D.prototype.I;
    D.prototype.cf = function () {
        E("Firebase.DataSnapshot.exportVal", 0, 0, arguments.length);
        return this.A.I(!0)
    };
    D.prototype.exportVal = D.prototype.cf;
    D.prototype.Wf = function () {
        E("Firebase.DataSnapshot.exists", 0, 0, arguments.length);
        return !this.A.e()
    };
    D.prototype.exists = D.prototype.Wf;
    D.prototype.u = function (a) {
        E("Firebase.DataSnapshot.child", 0, 1, arguments.length);
        ga(a) && (a = String(a));
        Yb("Firebase.DataSnapshot.child", a);
        var b = new S(a), c = this.W.u(b);
        return new D(this.A.ra(b), c, L)
    };
    D.prototype.child = D.prototype.u;
    D.prototype.Da = function (a) {
        E("Firebase.DataSnapshot.hasChild", 1, 1, arguments.length);
        Yb("Firebase.DataSnapshot.hasChild", a);
        var b = new S(a);
        return !this.A.ra(b).e()
    };
    D.prototype.hasChild = D.prototype.Da;
    D.prototype.L = function () {
        E("Firebase.DataSnapshot.getPriority", 0, 0, arguments.length);
        return this.A.L().I()
    };
    D.prototype.getPriority = D.prototype.L;
    D.prototype.forEach = function (a) {
        E("Firebase.DataSnapshot.forEach", 1, 1, arguments.length);
        H("Firebase.DataSnapshot.forEach", 1, a, !1);
        if (this.A.M())return !1;
        var b = this;
        return !!this.A.U(this.g, function (c, d) {
            return a(new D(d, b.W.u(c), L))
        })
    };
    D.prototype.forEach = D.prototype.forEach;
    D.prototype.md = function () {
        E("Firebase.DataSnapshot.hasChildren", 0, 0, arguments.length);
        return this.A.M() ? !1 : !this.A.e()
    };
    D.prototype.hasChildren = D.prototype.md;
    D.prototype.name = function () {
        z("Firebase.DataSnapshot.name() being deprecated. Please use Firebase.DataSnapshot.key() instead.");
        E("Firebase.DataSnapshot.name", 0, 0, arguments.length);
        return this.key()
    };
    D.prototype.name = D.prototype.name;
    D.prototype.key = function () {
        E("Firebase.DataSnapshot.key", 0, 0, arguments.length);
        return this.W.key()
    };
    D.prototype.key = D.prototype.key;
    D.prototype.vb = function () {
        E("Firebase.DataSnapshot.numChildren", 0, 0, arguments.length);
        return this.A.vb()
    };
    D.prototype.numChildren = D.prototype.vb;
    D.prototype.dc = function () {
        E("Firebase.DataSnapshot.ref", 0, 0, arguments.length);
        return this.W
    };
    D.prototype.ref = D.prototype.dc;
    function Id(a) {
        y(ea(a) && 0 < a.length, "Requires a non-empty array");
        this.Ff = a;
        this.Gc = {}
    }

    Id.prototype.$d = function (a, b) {
        for (var c = this.Gc[a] || [], d = 0; d < c.length; d++)c[d].rc.apply(c[d].Ka, Array.prototype.slice.call(arguments, 1))
    };
    Id.prototype.wb = function (a, b, c) {
        Jd(this, a);
        this.Gc[a] = this.Gc[a] || [];
        this.Gc[a].push({rc: b, Ka: c});
        (a = this.ue(a)) && b.apply(c, a)
    };
    Id.prototype.$b = function (a, b, c) {
        Jd(this, a);
        a = this.Gc[a] || [];
        for (var d = 0; d < a.length; d++)if (a[d].rc === b && (!c || c === a[d].Ka)) {
            a.splice(d, 1);
            break
        }
    };
    function Jd(a, b) {
        y(Ma(a.Ff, function (a) {
            return a === b
        }), "Unknown event: " + b)
    };
    function Kd() {
        Id.call(this, ["visible"]);
        var a, b;
        "undefined" !== typeof document && "undefined" !== typeof document.addEventListener && ("undefined" !== typeof document.hidden ? (b = "visibilitychange", a = "hidden") : "undefined" !== typeof document.mozHidden ? (b = "mozvisibilitychange", a = "mozHidden") : "undefined" !== typeof document.msHidden ? (b = "msvisibilitychange", a = "msHidden") : "undefined" !== typeof document.webkitHidden && (b = "webkitvisibilitychange", a = "webkitHidden"));
        this.nc = !0;
        if (b) {
            var c = this;
            document.addEventListener(b,
                function () {
                    var b = !document[a];
                    b !== c.nc && (c.nc = b, c.$d("visible", b))
                }, !1)
        }
    }

    ma(Kd, Id);
    ca(Kd);
    Kd.prototype.ue = function (a) {
        y("visible" === a, "Unknown event type: " + a);
        return [this.nc]
    };
    function A(a, b) {
        for (var c in a)b.call(void 0, a[c], c, a)
    }

    function wd(a, b) {
        var c = {}, d;
        for (d in a)c[d] = b.call(void 0, a[d], d, a);
        return c
    }

    function Lb(a, b) {
        for (var c in a)if (!b.call(void 0, a[c], c, a))return !1;
        return !0
    }

    function Jb(a) {
        var b = 0, c;
        for (c in a)b++;
        return b
    }

    function Kb(a) {
        for (var b in a)return b
    }

    function Ld(a) {
        var b = [], c = 0, d;
        for (d in a)b[c++] = a[d];
        return b
    }

    function Md(a) {
        var b = [], c = 0, d;
        for (d in a)b[c++] = d;
        return b
    }

    function Cd(a, b) {
        for (var c in a)if (a[c] == b)return !0;
        return !1
    }

    function Nd(a, b, c) {
        for (var d in a)if (b.call(c, a[d], d, a))return d
    }

    function Od(a, b) {
        var c = Nd(a, b, void 0);
        return c && a[c]
    }

    function Pd(a) {
        for (var b in a)return !1;
        return !0
    }

    function Qd(a, b) {
        return b in a ? a[b] : void 0
    }

    function Dd(a) {
        var b = {}, c;
        for (c in a)b[c] = a[c];
        return b
    }

    var Rd = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

    function Sd(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d)a[c] = d[c];
            for (var f = 0; f < Rd.length; f++)c = Rd[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    };
    function Td() {
        this.uc = {}
    }

    function Ud(a, b, c) {
        m(c) || (c = 1);
        s(a.uc, b) || (a.uc[b] = 0);
        a.uc[b] += c
    }

    Td.prototype.get = function () {
        return Dd(this.uc)
    };
    function Vd(a) {
        this.Pf = a;
        this.td = null
    }

    Vd.prototype.get = function () {
        var a = this.Pf.get(), b = Dd(a);
        if (this.td)for (var c in this.td)b[c] -= this.td[c];
        this.td = a;
        return b
    };
    function Wd(a, b) {
        this.zf = {};
        this.Ud = new Vd(a);
        this.S = b;
        var c = 1E4 + 2E4 * Math.random();
        setTimeout(q(this.tf, this), Math.floor(c))
    }

    Wd.prototype.tf = function () {
        var a = this.Ud.get(), b = {}, c = !1, d;
        for (d in a)0 < a[d] && s(this.zf, d) && (b[d] = a[d], c = !0);
        c && (a = this.S, a.ja && (b = {c: b}, a.f("reportStats", b), a.Ba("s", b)));
        setTimeout(q(this.tf, this), Math.floor(6E5 * Math.random()))
    };
    var Xd = {}, Yd = {};

    function Zd(a) {
        a = a.toString();
        Xd[a] || (Xd[a] = new Td);
        return Xd[a]
    }

    function $d(a, b) {
        var c = a.toString();
        Yd[c] || (Yd[c] = b());
        return Yd[c]
    };
    var ae = null;
    "undefined" !== typeof MozWebSocket ? ae = MozWebSocket : "undefined" !== typeof WebSocket && (ae = WebSocket);
    function be(a, b, c) {
        this.me = a;
        this.f = ob(this.me);
        this.frames = this.Cc = null;
        this.jb = this.kb = this.Ue = 0;
        this.Ra = Zd(b);
        this.$a = (b.Bb ? "wss://" : "ws://") + b.Ma + "/.ws?v=5";
        "undefined" !== typeof location && location.href && -1 !== location.href.indexOf("firebaseio.com") && (this.$a += "&r=f");
        b.host !== b.Ma && (this.$a = this.$a + "&ns=" + b.ub);
        c && (this.$a = this.$a + "&s=" + c)
    }

    var ce;
    be.prototype.open = function (a, b) {
        this.fb = b;
        this.hg = a;
        this.f("Websocket connecting to " + this.$a);
        this.yc = !1;
        za.set("previous_websocket_failure", !0);
        try {
            this.ua = new ae(this.$a)
        } catch (c) {
            this.f("Error instantiating WebSocket.");
            var d = c.message || c.data;
            d && this.f(d);
            this.eb();
            return
        }
        var e = this;
        this.ua.onopen = function () {
            e.f("Websocket connected.");
            e.yc = !0
        };
        this.ua.onclose = function () {
            e.f("Websocket connection was disconnected.");
            e.ua = null;
            e.eb()
        };
        this.ua.onmessage = function (a) {
            if (null !== e.ua)if (a = a.data, e.jb +=
                    a.length, Ud(e.Ra, "bytes_received", a.length), de(e), null !== e.frames)ee(e, a); else {
                a:{
                    y(null === e.frames, "We already have a frame buffer");
                    if (6 >= a.length) {
                        var b = Number(a);
                        if (!isNaN(b)) {
                            e.Ue = b;
                            e.frames = [];
                            a = null;
                            break a
                        }
                    }
                    e.Ue = 1;
                    e.frames = []
                }
                null !== a && ee(e, a)
            }
        };
        this.ua.onerror = function (a) {
            e.f("WebSocket error.  Closing connection.");
            (a = a.message || a.data) && e.f(a);
            e.eb()
        }
    };
    be.prototype.start = function () {
    };
    be.isAvailable = function () {
        var a = !1;
        if ("undefined" !== typeof navigator && navigator.userAgent) {
            var b = navigator.userAgent.match(/Android ([0-9]{0,}\.[0-9]{0,})/);
            b && 1 < b.length && 4.4 > parseFloat(b[1]) && (a = !0)
        }
        return !a && null !== ae && !ce
    };
    be.responsesRequiredToBeHealthy = 2;
    be.healthyTimeout = 3E4;
    h = be.prototype;
    h.vd = function () {
        za.remove("previous_websocket_failure")
    };
    function ee(a, b) {
        a.frames.push(b);
        if (a.frames.length == a.Ue) {
            var c = a.frames.join("");
            a.frames = null;
            c = ta(c);
            a.hg(c)
        }
    }

    h.send = function (a) {
        de(this);
        a = r(a);
        this.kb += a.length;
        Ud(this.Ra, "bytes_sent", a.length);
        a = yb(a, 16384);
        1 < a.length && this.ua.send(String(a.length));
        for (var b = 0; b < a.length; b++)this.ua.send(a[b])
    };
    h.Uc = function () {
        this.rb = !0;
        this.Cc && (clearInterval(this.Cc), this.Cc = null);
        this.ua && (this.ua.close(), this.ua = null)
    };
    h.eb = function () {
        this.rb || (this.f("WebSocket is closing itself"), this.Uc(), this.fb && (this.fb(this.yc), this.fb = null))
    };
    h.close = function () {
        this.rb || (this.f("WebSocket is being closed"), this.Uc())
    };
    function de(a) {
        clearInterval(a.Cc);
        a.Cc = setInterval(function () {
            a.ua && a.ua.send("0");
            de(a)
        }, Math.floor(45E3))
    };
    function fe(a) {
        this.ac = a;
        this.Hd = [];
        this.Jb = 0;
        this.le = -1;
        this.xb = null
    }

    function ge(a, b, c) {
        a.le = b;
        a.xb = c;
        a.le < a.Jb && (a.xb(), a.xb = null)
    }

    function he(a, b, c) {
        for (a.Hd[b] = c; a.Hd[a.Jb];) {
            var d = a.Hd[a.Jb];
            delete a.Hd[a.Jb];
            for (var e = 0; e < d.length; ++e)if (d[e]) {
                var f = a;
                Cb(function () {
                    f.ac(d[e])
                })
            }
            if (a.Jb === a.le) {
                a.xb && (clearTimeout(a.xb), a.xb(), a.xb = null);
                break
            }
            a.Jb++
        }
    };
    function ie() {
        this.set = {}
    }

    h = ie.prototype;
    h.add = function (a, b) {
        this.set[a] = null !== b ? b : !0
    };
    h.contains = function (a) {
        return s(this.set, a)
    };
    h.get = function (a) {
        return this.contains(a) ? this.set[a] : void 0
    };
    h.remove = function (a) {
        delete this.set[a]
    };
    h.clear = function () {
        this.set = {}
    };
    h.e = function () {
        return Pd(this.set)
    };
    h.count = function () {
        return Jb(this.set)
    };
    function je(a, b) {
        A(a.set, function (a, d) {
            b(d, a)
        })
    };
    function ke(a, b, c) {
        this.me = a;
        this.f = ob(a);
        this.jb = this.kb = 0;
        this.Ra = Zd(b);
        this.Rd = c;
        this.yc = !1;
        this.Zc = function (a) {
            b.host !== b.Ma && (a.ns = b.ub);
            var c = [], f;
            for (f in a)a.hasOwnProperty(f) && c.push(f + "=" + a[f]);
            return (b.Bb ? "https://" : "http://") + b.Ma + "/.lp?" + c.join("&")
        }
    }

    var le, me;
    ke.prototype.open = function (a, b) {
        this.$e = 0;
        this.ga = b;
        this.mf = new fe(a);
        this.rb = !1;
        var c = this;
        this.mb = setTimeout(function () {
            c.f("Timed out trying to connect.");
            c.eb();
            c.mb = null
        }, Math.floor(3E4));
        tb(function () {
            if (!c.rb) {
                c.Pa = new ne(function (a, b, d, k, l) {
                    oe(c, arguments);
                    if (c.Pa)if (c.mb && (clearTimeout(c.mb), c.mb = null), c.yc = !0, "start" == a)c.id = b, c.rf = d; else if ("close" === a)b ? (c.Pa.Pd = !1, ge(c.mf, b, function () {
                        c.eb()
                    })) : c.eb(); else throw Error("Unrecognized command received: " + a);
                }, function (a, b) {
                    oe(c, arguments);
                    he(c.mf, a, b)
                }, function () {
                    c.eb()
                }, c.Zc);
                var a = {start: "t"};
                a.ser = Math.floor(1E8 * Math.random());
                c.Pa.ae && (a.cb = c.Pa.ae);
                a.v = "5";
                c.Rd && (a.s = c.Rd);
                "undefined" !== typeof location && location.href && -1 !== location.href.indexOf("firebaseio.com") && (a.r = "f");
                a = c.Zc(a);
                c.f("Connecting via long-poll to " + a);
                pe(c.Pa, a, function () {
                })
            }
        })
    };
    ke.prototype.start = function () {
        var a = this.Pa, b = this.rf;
        a.cg = this.id;
        a.dg = b;
        for (a.fe = !0; qe(a););
        a = this.id;
        b = this.rf;
        this.Zb = document.createElement("iframe");
        var c = {dframe: "t"};
        c.id = a;
        c.pw = b;
        this.Zb.src = this.Zc(c);
        this.Zb.style.display = "none";
        document.body.appendChild(this.Zb)
    };
    ke.isAvailable = function () {
        return !me && !("object" === typeof window && window.chrome && window.chrome.extension && !/^chrome/.test(window.location.href)) && !("object" === typeof Windows && "object" === typeof Windows.Fg) && (le || !0)
    };
    h = ke.prototype;
    h.vd = function () {
    };
    h.Uc = function () {
        this.rb = !0;
        this.Pa && (this.Pa.close(), this.Pa = null);
        this.Zb && (document.body.removeChild(this.Zb), this.Zb = null);
        this.mb && (clearTimeout(this.mb), this.mb = null)
    };
    h.eb = function () {
        this.rb || (this.f("Longpoll is closing itself"), this.Uc(), this.ga && (this.ga(this.yc), this.ga = null))
    };
    h.close = function () {
        this.rb || (this.f("Longpoll is being closed."), this.Uc())
    };
    h.send = function (a) {
        a = r(a);
        this.kb += a.length;
        Ud(this.Ra, "bytes_sent", a.length);
        a = jb(a);
        a = cb(a, !0);
        a = yb(a, 1840);
        for (var b = 0; b < a.length; b++) {
            var c = this.Pa;
            c.Qc.push({ug: this.$e, Cg: a.length, bf: a[b]});
            c.fe && qe(c);
            this.$e++
        }
    };
    function oe(a, b) {
        var c = r(b).length;
        a.jb += c;
        Ud(a.Ra, "bytes_received", c)
    }

    function ne(a, b, c, d) {
        this.Zc = d;
        this.fb = c;
        this.Je = new ie;
        this.Qc = [];
        this.oe = Math.floor(1E8 * Math.random());
        this.Pd = !0;
        this.ae = eb();
        window["pLPCommand" + this.ae] = a;
        window["pRTLPCB" + this.ae] = b;
        a = document.createElement("iframe");
        a.style.display = "none";
        if (document.body) {
            document.body.appendChild(a);
            try {
                a.contentWindow.document || hb("No IE domain setting required")
            } catch (e) {
                a.src = "javascript:void((function(){document.open();document.domain='" + document.domain + "';document.close();})())"
            }
        } else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
        a.contentDocument ? a.ab = a.contentDocument : a.contentWindow ? a.ab = a.contentWindow.document : a.document && (a.ab = a.document);
        this.Aa = a;
        a = "";
        this.Aa.src && "javascript:" === this.Aa.src.substr(0, 11) && (a = '<script>document.domain="' + document.domain + '";\x3c/script>');
        a = "<html><body>" + a + "</body></html>";
        try {
            this.Aa.ab.open(), this.Aa.ab.write(a), this.Aa.ab.close()
        } catch (f) {
            hb("frame writing exception"), f.stack && hb(f.stack), hb(f)
        }
    }

    ne.prototype.close = function () {
        this.fe = !1;
        if (this.Aa) {
            this.Aa.ab.body.innerHTML = "";
            var a = this;
            setTimeout(function () {
                null !== a.Aa && (document.body.removeChild(a.Aa), a.Aa = null)
            }, Math.floor(0))
        }
        var b = this.fb;
        b && (this.fb = null, b())
    };
    function qe(a) {
        if (a.fe && a.Pd && a.Je.count() < (0 < a.Qc.length ? 2 : 1)) {
            a.oe++;
            var b = {};
            b.id = a.cg;
            b.pw = a.dg;
            b.ser = a.oe;
            for (var b = a.Zc(b), c = "", d = 0; 0 < a.Qc.length;)if (1870 >= a.Qc[0].bf.length + 30 + c.length) {
                var e = a.Qc.shift(), c = c + "&seg" + d + "=" + e.ug + "&ts" + d + "=" + e.Cg + "&d" + d + "=" + e.bf;
                d++
            } else break;
            re(a, b + c, a.oe);
            return !0
        }
        return !1
    }

    function re(a, b, c) {
        function d() {
            a.Je.remove(c);
            qe(a)
        }

        a.Je.add(c);
        var e = setTimeout(d, Math.floor(25E3));
        pe(a, b, function () {
            clearTimeout(e);
            d()
        })
    }

    function pe(a, b, c) {
        setTimeout(function () {
            try {
                if (a.Pd) {
                    var d = a.Aa.ab.createElement("script");
                    d.type = "text/javascript";
                    d.async = !0;
                    d.src = b;
                    d.onload = d.onreadystatechange = function () {
                        var a = d.readyState;
                        a && "loaded" !== a && "complete" !== a || (d.onload = d.onreadystatechange = null, d.parentNode && d.parentNode.removeChild(d), c())
                    };
                    d.onerror = function () {
                        hb("Long-poll script failed to load: " + b);
                        a.Pd = !1;
                        a.close()
                    };
                    a.Aa.ab.body.appendChild(d)
                }
            } catch (e) {
            }
        }, Math.floor(1))
    };
    function se(a) {
        te(this, a)
    }

    var ue = [ke, be];

    function te(a, b) {
        var c = be && be.isAvailable(), d = c && !(za.lf || !0 === za.get("previous_websocket_failure"));
        b.Eg && (c || z("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."), d = !0);
        if (d)a.Xc = [be]; else {
            var e = a.Xc = [];
            zb(ue, function (a, b) {
                b && b.isAvailable() && e.push(b)
            })
        }
    }

    function ve(a) {
        if (0 < a.Xc.length)return a.Xc[0];
        throw Error("No transports available");
    };
    function we(a, b, c, d, e, f) {
        this.id = a;
        this.f = ob("c:" + this.id + ":");
        this.ac = c;
        this.Kc = d;
        this.ga = e;
        this.He = f;
        this.O = b;
        this.Gd = [];
        this.Ye = 0;
        this.Af = new se(b);
        this.Qa = 0;
        this.f("Connection created");
        xe(this)
    }

    function xe(a) {
        var b = ve(a.Af);
        a.J = new b("c:" + a.id + ":" + a.Ye++, a.O);
        a.Le = b.responsesRequiredToBeHealthy || 0;
        var c = ye(a, a.J), d = ze(a, a.J);
        a.Yc = a.J;
        a.Tc = a.J;
        a.C = null;
        a.sb = !1;
        setTimeout(function () {
            a.J && a.J.open(c, d)
        }, Math.floor(0));
        b = b.healthyTimeout || 0;
        0 < b && (a.od = setTimeout(function () {
            a.od = null;
            a.sb || (a.J && 102400 < a.J.jb ? (a.f("Connection exceeded healthy timeout but has received " + a.J.jb + " bytes.  Marking connection healthy."), a.sb = !0, a.J.vd()) : a.J && 10240 < a.J.kb ? a.f("Connection exceeded healthy timeout but has sent " +
            a.J.kb + " bytes.  Leaving connection alive.") : (a.f("Closing unhealthy connection after timeout."), a.close()))
        }, Math.floor(b)))
    }

    function ze(a, b) {
        return function (c) {
            b === a.J ? (a.J = null, c || 0 !== a.Qa ? 1 === a.Qa && a.f("Realtime connection lost.") : (a.f("Realtime connection failed."), "s-" === a.O.Ma.substr(0, 2) && (za.remove("host:" + a.O.host), a.O.Ma = a.O.host)), a.close()) : b === a.C ? (a.f("Secondary connection lost."), c = a.C, a.C = null, a.Yc !== c && a.Tc !== c || a.close()) : a.f("closing an old connection")
        }
    }

    function ye(a, b) {
        return function (c) {
            if (2 != a.Qa)if (b === a.Tc) {
                var d = wb("t", c);
                c = wb("d", c);
                if ("c" == d) {
                    if (d = wb("t", c), "d"in c)if (c = c.d, "h" === d) {
                        var d = c.ts, e = c.v, f = c.h;
                        a.Rd = c.s;
                        Ba(a.O, f);
                        0 == a.Qa && (a.J.start(), Ae(a, a.J, d), "5" !== e && z("Protocol version mismatch detected"), c = a.Af, (c = 1 < c.Xc.length ? c.Xc[1] : null) && Be(a, c))
                    } else if ("n" === d) {
                        a.f("recvd end transmission on primary");
                        a.Tc = a.C;
                        for (c = 0; c < a.Gd.length; ++c)a.Cd(a.Gd[c]);
                        a.Gd = [];
                        Ce(a)
                    } else"s" === d ? (a.f("Connection shutdown command received. Shutting down..."),
                    a.He && (a.He(c), a.He = null), a.ga = null, a.close()) : "r" === d ? (a.f("Reset packet received.  New host: " + c), Ba(a.O, c), 1 === a.Qa ? a.close() : (De(a), xe(a))) : "e" === d ? pb("Server Error: " + c) : "o" === d ? (a.f("got pong on primary."), Ee(a), Fe(a)) : pb("Unknown control packet command: " + d)
                } else"d" == d && a.Cd(c)
            } else if (b === a.C)if (d = wb("t", c), c = wb("d", c), "c" == d)"t"in c && (c = c.t, "a" === c ? Ge(a) : "r" === c ? (a.f("Got a reset on secondary, closing it"), a.C.close(), a.Yc !== a.C && a.Tc !== a.C || a.close()) : "o" === c && (a.f("got pong on secondary."),
                a.yf--, Ge(a))); else if ("d" == d)a.Gd.push(c); else throw Error("Unknown protocol layer: " + d); else a.f("message on old connection")
        }
    }

    we.prototype.Ba = function (a) {
        He(this, {t: "d", d: a})
    };
    function Ce(a) {
        a.Yc === a.C && a.Tc === a.C && (a.f("cleaning up and promoting a connection: " + a.C.me), a.J = a.C, a.C = null)
    }

    function Ge(a) {
        0 >= a.yf ? (a.f("Secondary connection is healthy."), a.sb = !0, a.C.vd(), a.C.start(), a.f("sending client ack on secondary"), a.C.send({
            t: "c",
            d: {t: "a", d: {}}
        }), a.f("Ending transmission on primary"), a.J.send({
            t: "c",
            d: {t: "n", d: {}}
        }), a.Yc = a.C, Ce(a)) : (a.f("sending ping on secondary."), a.C.send({t: "c", d: {t: "p", d: {}}}))
    }

    we.prototype.Cd = function (a) {
        Ee(this);
        this.ac(a)
    };
    function Ee(a) {
        a.sb || (a.Le--, 0 >= a.Le && (a.f("Primary connection is healthy."), a.sb = !0, a.J.vd()))
    }

    function Be(a, b) {
        a.C = new b("c:" + a.id + ":" + a.Ye++, a.O, a.Rd);
        a.yf = b.responsesRequiredToBeHealthy || 0;
        a.C.open(ye(a, a.C), ze(a, a.C));
        setTimeout(function () {
            a.C && (a.f("Timed out trying to upgrade."), a.C.close())
        }, Math.floor(6E4))
    }

    function Ae(a, b, c) {
        a.f("Realtime connection established.");
        a.J = b;
        a.Qa = 1;
        a.Kc && (a.Kc(c), a.Kc = null);
        0 === a.Le ? (a.f("Primary connection is healthy."), a.sb = !0) : setTimeout(function () {
            Fe(a)
        }, Math.floor(5E3))
    }

    function Fe(a) {
        a.sb || 1 !== a.Qa || (a.f("sending ping on primary."), He(a, {t: "c", d: {t: "p", d: {}}}))
    }

    function He(a, b) {
        if (1 !== a.Qa)throw"Connection is not connected";
        a.Yc.send(b)
    }

    we.prototype.close = function () {
        2 !== this.Qa && (this.f("Closing realtime connection."), this.Qa = 2, De(this), this.ga && (this.ga(), this.ga = null))
    };
    function De(a) {
        a.f("Shutting down all connections");
        a.J && (a.J.close(), a.J = null);
        a.C && (a.C.close(), a.C = null);
        a.od && (clearTimeout(a.od), a.od = null)
    };
    function Ie() {
        Id.call(this, ["online"]);
        this.Lc = !0;
        if ("undefined" !== typeof window && "undefined" !== typeof window.addEventListener) {
            var a = this;
            window.addEventListener("online", function () {
                a.Lc || a.$d("online", !0);
                a.Lc = !0
            }, !1);
            window.addEventListener("offline", function () {
                a.Lc && a.$d("online", !1);
                a.Lc = !1
            }, !1)
        }
    }

    ma(Ie, Id);
    ca(Ie);
    Ie.prototype.ue = function (a) {
        y("online" === a, "Unknown event type: " + a);
        return [this.Lc]
    };
    function Je(a) {
        var b = {}, c = {}, d = {}, e = "";
        try {
            var f = a.split("."), b = ta(gb(f[0]) || ""), c = ta(gb(f[1]) || ""), e = f[2], d = c.d || {};
            delete c.d
        } catch (g) {
        }
        return {Hg: b, ke: c, data: d, yg: e}
    }

    function Ke(a) {
        a = Je(a).ke;
        return "object" === typeof a && a.hasOwnProperty("iat") ? t(a, "iat") : null
    }

    function Le(a) {
        a = Je(a);
        var b = a.ke;
        return !!a.yg && !!b && "object" === typeof b && b.hasOwnProperty("iat")
    };
    function Me(a, b, c, d) {
        this.id = Ne++;
        this.f = ob("p:" + this.id + ":");
        this.Db = !0;
        this.ta = {};
        this.la = [];
        this.Nc = 0;
        this.Jc = [];
        this.ja = !1;
        this.Wa = 1E3;
        this.xd = 3E5;
        this.Dd = b;
        this.Bd = c;
        this.Ie = d;
        this.O = a;
        this.Pe = null;
        this.Sc = {};
        this.tg = 0;
        this.Dc = this.Ae = null;
        Oe(this, 0);
        Kd.Ob().wb("visible", this.kg, this);
        -1 === a.host.indexOf("fblocal") && Ie.Ob().wb("online", this.ig, this)
    }

    var Ne = 0, Pe = 0;
    h = Me.prototype;
    h.Ba = function (a, b, c) {
        var d = ++this.tg;
        a = {r: d, a: a, b: b};
        this.f(r(a));
        y(this.ja, "sendRequest call when we're not connected not allowed.");
        this.Oa.Ba(a);
        c && (this.Sc[d] = c)
    };
    function Qe(a, b, c, d, e) {
        var f = b.Fa(), g = b.path.toString();
        a.f("Listen called for " + g + " " + f);
        a.ta[g] = a.ta[g] || {};
        y(!a.ta[g][f], "listen() called twice for same path/queryId.");
        b = {H: e, nd: c, qg: Lc(b.n), tag: d};
        a.ta[g][f] = b;
        a.ja && Re(a, g, f, b)
    }

    function Re(a, b, c, d) {
        a.f("Listen on " + b + " for " + c);
        var e = {p: b};
        d.tag && (e.q = d.qg, e.t = d.tag);
        e.h = d.nd();
        a.Ba("q", e, function (e) {
            if ((a.ta[b] && a.ta[b][c]) === d) {
                a.f("listen response", e);
                var g = e.s;
                "ok" !== g && Se(a, b, c);
                e = e.d;
                d.H && d.H(g, e)
            }
        })
    }

    h.Q = function (a, b, c) {
        this.Ib = {Rf: a, df: !1, rc: b, ad: c};
        this.f("Authenticating using credential: " + a);
        Te(this);
        (b = 40 == a.length) || (a = Je(a).ke, b = "object" === typeof a && !0 === t(a, "admin"));
        b && (this.f("Admin auth credential detected.  Reducing max reconnect time."), this.xd = 3E4)
    };
    h.Ve = function (a) {
        delete this.Ib;
        this.ja && this.Ba("unauth", {}, function (b) {
            a(b.s, b.d)
        })
    };
    function Te(a) {
        var b = a.Ib;
        a.ja && b && a.Ba("auth", {cred: b.Rf}, function (c) {
            var d = c.s;
            c = c.d || "error";
            "ok" !== d && a.Ib === b && delete a.Ib;
            b.df ? "ok" !== d && b.ad && b.ad(d, c) : (b.df = !0, b.rc && b.rc(d, c))
        })
    }

    function Ue(a, b, c, d) {
        a.ja ? Ve(a, "o", b, c, d) : a.Jc.push({Pc: b, action: "o", data: c, H: d})
    }

    function We(a, b, c, d) {
        a.ja ? Ve(a, "om", b, c, d) : a.Jc.push({Pc: b, action: "om", data: c, H: d})
    }

    h.Ge = function (a, b) {
        this.ja ? Ve(this, "oc", a, null, b) : this.Jc.push({Pc: a, action: "oc", data: null, H: b})
    };
    function Ve(a, b, c, d, e) {
        c = {p: c, d: d};
        a.f("onDisconnect " + b, c);
        a.Ba(b, c, function (a) {
            e && setTimeout(function () {
                e(a.s, a.d)
            }, Math.floor(0))
        })
    }

    h.put = function (a, b, c, d) {
        Xe(this, "p", a, b, c, d)
    };
    function Ye(a, b, c, d) {
        Xe(a, "m", b, c, d, void 0)
    }

    function Xe(a, b, c, d, e, f) {
        d = {p: c, d: d};
        m(f) && (d.h = f);
        a.la.push({action: b, uf: d, H: e});
        a.Nc++;
        b = a.la.length - 1;
        a.ja ? Ze(a, b) : a.f("Buffering put: " + c)
    }

    function Ze(a, b) {
        var c = a.la[b].action, d = a.la[b].uf, e = a.la[b].H;
        a.la[b].rg = a.ja;
        a.Ba(c, d, function (d) {
            a.f(c + " response", d);
            delete a.la[b];
            a.Nc--;
            0 === a.Nc && (a.la = []);
            e && e(d.s, d.d)
        })
    }

    h.Cd = function (a) {
        if ("r"in a) {
            this.f("from server: " + r(a));
            var b = a.r, c = this.Sc[b];
            c && (delete this.Sc[b], c(a.b))
        } else {
            if ("error"in a)throw"A server-side error has occurred: " + a.error;
            "a"in a && (b = a.a, c = a.b, this.f("handleServerMessage", b, c), "d" === b ? this.Dd(c.p, c.d, !1, c.t) : "m" === b ? this.Dd(c.p, c.d, !0, c.t) : "c" === b ? $e(this, c.p, c.q) : "ac" === b ? (a = c.s, b = c.d, c = this.Ib, delete this.Ib, c && c.ad && c.ad(a, b)) : "sd" === b ? this.Pe ? this.Pe(c) : "msg"in c && "undefined" !== typeof console && console.log("FIREBASE: " + c.msg.replace("\n",
                "\nFIREBASE: ")) : pb("Unrecognized action received from server: " + r(b) + "\nAre you using the latest client?"))
        }
    };
    h.Kc = function (a) {
        this.f("connection ready");
        this.ja = !0;
        this.Dc = (new Date).getTime();
        this.Ie({serverTimeOffset: a - (new Date).getTime()});
        af(this);
        this.Bd(!0)
    };
    function Oe(a, b) {
        y(!a.Oa, "Scheduling a connect when we're already connected/ing?");
        a.Kb && clearTimeout(a.Kb);
        a.Kb = setTimeout(function () {
            a.Kb = null;
            bf(a)
        }, Math.floor(b))
    }

    h.kg = function (a) {
        a && !this.nc && this.Wa === this.xd && (this.f("Window became visible.  Reducing delay."), this.Wa = 1E3, this.Oa || Oe(this, 0));
        this.nc = a
    };
    h.ig = function (a) {
        a ? (this.f("Browser went online.  Reconnecting."), this.Wa = 1E3, this.Db = !0, this.Oa || Oe(this, 0)) : (this.f("Browser went offline.  Killing connection; don't reconnect."), this.Db = !1, this.Oa && this.Oa.close())
    };
    h.of = function () {
        this.f("data client disconnected");
        this.ja = !1;
        this.Oa = null;
        for (var a = 0; a < this.la.length; a++) {
            var b = this.la[a];
            b && "h"in b.uf && b.rg && (b.H && b.H("disconnect"), delete this.la[a], this.Nc--)
        }
        0 === this.Nc && (this.la = []);
        if (this.Db)this.nc ? this.Dc && (3E4 < (new Date).getTime() - this.Dc && (this.Wa = 1E3), this.Dc = null) : (this.f("Window isn't visible.  Delaying reconnect."), this.Wa = this.xd, this.Ae = (new Date).getTime()), a = Math.max(0, this.Wa - ((new Date).getTime() - this.Ae)), a *= Math.random(), this.f("Trying to reconnect in " +
        a + "ms"), Oe(this, a), this.Wa = Math.min(this.xd, 1.3 * this.Wa); else for (var c in this.Sc)delete this.Sc[c];
        this.Bd(!1)
    };
    function bf(a) {
        if (a.Db) {
            a.f("Making a connection attempt");
            a.Ae = (new Date).getTime();
            a.Dc = null;
            var b = q(a.Cd, a), c = q(a.Kc, a), d = q(a.of, a), e = a.id + ":" + Pe++;
            a.Oa = new we(e, a.O, b, c, d, function (b) {
                z(b + " (" + a.O.toString() + ")");
                a.Db = !1
            })
        }
    }

    h.qb = function () {
        this.Db = !1;
        this.Oa ? this.Oa.close() : (this.Kb && (clearTimeout(this.Kb), this.Kb = null), this.ja && this.of())
    };
    h.ic = function () {
        this.Db = !0;
        this.Wa = 1E3;
        this.Oa || Oe(this, 0)
    };
    function $e(a, b, c) {
        c = c ? Ja(c, function (a) {
            return xb(a)
        }).join("$") : "default";
        (a = Se(a, b, c)) && a.H && a.H("permission_denied")
    }

    function Se(a, b, c) {
        b = (new S(b)).toString();
        var d;
        m(a.ta[b]) ? (d = a.ta[b][c], delete a.ta[b][c], 0 === Jb(a.ta[b]) && delete a.ta[b]) : d = void 0;
        return d
    }

    function af(a) {
        Te(a);
        A(a.ta, function (b, d) {
            A(b, function (b, c) {
                Re(a, d, c, b)
            })
        });
        for (var b = 0; b < a.la.length; b++)a.la[b] && Ze(a, b);
        for (; a.Jc.length;)b = a.Jc.shift(), Ve(a, b.action, b.Pc, b.data, b.H)
    };
    function cf() {
        this.m = this.F = null
    }

    cf.prototype.ec = function (a, b) {
        if (a.e())this.F = b, this.m = null; else if (null !== this.F)this.F = this.F.D(a, b); else {
            null == this.m && (this.m = new ie);
            var c = I(a);
            this.m.contains(c) || this.m.add(c, new cf);
            c = this.m.get(c);
            a = T(a);
            c.ec(a, b)
        }
    };
    function df(a, b) {
        if (b.e())return a.F = null, a.m = null, !0;
        if (null !== a.F) {
            if (a.F.M())return !1;
            var c = a.F;
            a.F = null;
            c.U(L, function (b, c) {
                a.ec(new S(b), c)
            });
            return df(a, b)
        }
        return null !== a.m ? (c = I(b), b = T(b), a.m.contains(c) && df(a.m.get(c), b) && a.m.remove(c), a.m.e() ? (a.m = null, !0) : !1) : !0
    }

    function ef(a, b, c) {
        null !== a.F ? c(b, a.F) : a.U(function (a, e) {
            var f = new S(b.toString() + "/" + a);
            ef(e, f, c)
        })
    }

    cf.prototype.U = function (a) {
        null !== this.m && je(this.m, function (b, c) {
            a(b, c)
        })
    };
    function ff() {
        this.Od = M
    }

    ff.prototype.j = function (a) {
        return this.Od.ra(a)
    };
    ff.prototype.toString = function () {
        return this.Od.toString()
    };
    function gf() {
        this.ob = []
    }

    function hf(a, b) {
        for (var c = null, d = 0; d < b.length; d++) {
            var e = b[d], f = e.Rb();
            null === c || f.aa(c.Rb()) || (a.ob.push(c), c = null);
            null === c && (c = new jf(f));
            c.add(e)
        }
        c && a.ob.push(c)
    }

    function Sc(a, b, c) {
        hf(a, c);
        kf(a, function (a) {
            return a.aa(b)
        })
    }

    function lf(a, b, c) {
        hf(a, c);
        kf(a, function (a) {
            return a.contains(b) || b.contains(a)
        })
    }

    function kf(a, b) {
        for (var c = !0, d = 0; d < a.ob.length; d++) {
            var e = a.ob[d];
            if (e)if (e = e.Rb(), b(e)) {
                for (var e = a.ob[d], f = 0; f < e.ld.length; f++) {
                    var g = e.ld[f];
                    if (null !== g) {
                        e.ld[f] = null;
                        var k = g.Mb();
                        lb && hb("event: " + g.toString());
                        Cb(k)
                    }
                }
                a.ob[d] = null
            } else c = !1
        }
        c && (a.ob = [])
    }

    function jf(a) {
        this.Ea = a;
        this.ld = []
    }

    jf.prototype.add = function (a) {
        this.ld.push(a)
    };
    jf.prototype.Rb = function () {
        return this.Ea
    };
    var mf = "auth.firebase.com";

    function nf(a, b, c) {
        this.cd = a || {};
        this.Zd = b || {};
        this.Xa = c || {};
        this.cd.remember || (this.cd.remember = "default")
    }

    var of = ["remember", "redirectTo"];

    function pf(a) {
        var b = {}, c = {};
        ua(a || {}, function (a, e) {
            0 <= Ga(of, a) ? b[a] = e : c[a] = e
        });
        return new nf(b, {}, c)
    };
    var qf = {
        NETWORK_ERROR: "Unable to contact the Firebase server.",
        SERVER_ERROR: "An unknown server error occurred.",
        TRANSPORT_UNAVAILABLE: "There are no login transports available for the requested method.",
        REQUEST_INTERRUPTED: "The browser redirected the page before the login request could complete.",
        USER_CANCELLED: "The user cancelled authentication."
    };

    function X(a) {
        var b = Error(t(qf, a), a);
        b.code = a;
        return b
    };
    function rf() {
        var a = window.opener.frames, b;
        for (b = a.length - 1; 0 <= b; b--)try {
            if (a[b].location.protocol === window.location.protocol && a[b].location.host === window.location.host && "__winchan_relay_frame" === a[b].name)return a[b]
        } catch (c) {
        }
        return null
    }

    function sf(a, b, c) {
        a.attachEvent ? a.attachEvent("on" + b, c) : a.addEventListener && a.addEventListener(b, c, !1)
    }

    function tf(a, b, c) {
        a.detachEvent ? a.detachEvent("on" + b, c) : a.removeEventListener && a.removeEventListener(b, c, !1)
    }

    function uf(a) {
        /^https?:\/\//.test(a) || (a = window.location.href);
        var b = /^(https?:\/\/[\-_a-zA-Z\.0-9:]+)/.exec(a);
        return b ? b[1] : a
    }

    function vf(a) {
        var b = "";
        try {
            a = a.replace("#", "");
            var c = {}, d = a.replace(/^\?/, "").split("&");
            for (a = 0; a < d.length; a++)if (d[a]) {
                var e = d[a].split("=");
                c[e[0]] = e[1]
            }
            c && s(c, "__firebase_request_key") && (b = t(c, "__firebase_request_key"))
        } catch (f) {
        }
        return b
    }

    function wf(a) {
        var b = [], c;
        for (c in a)if (s(a, c)) {
            var d = t(a, c);
            if (ea(d))for (var e = 0; e < d.length; e++)b.push(encodeURIComponent(c) + "=" + encodeURIComponent(d[e])); else b.push(encodeURIComponent(c) + "=" + encodeURIComponent(t(a, c)))
        }
        return b ? "&" + b.join("&") : ""
    }

    function xf() {
        var a = rb(mf);
        return a.scheme + "://" + a.host + "/v2"
    }

    function yf(a) {
        return xf() + "/" + a + "/auth/channel"
    };
    function zf() {
        return !!(window.cordova || window.phonegap || window.PhoneGap) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(navigator.userAgent)
    }

    function Af() {
        var a = navigator.userAgent;
        if ("Microsoft Internet Explorer" === navigator.appName) {
            if ((a = a.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/)) && 1 < a.length)return 8 <= parseFloat(a[1])
        } else if (-1 < a.indexOf("Trident") && (a = a.match(/rv:([0-9]{2,2}[\.0-9]{0,})/)) && 1 < a.length)return 8 <= parseFloat(a[1]);
        return !1
    };
    function Bf(a) {
        a.method || (a.method = "GET");
        a.headers || (a.headers = {});
        a.headers.content_type || (a.headers.content_type = "application/json");
        a.headers.content_type = a.headers.content_type.toLowerCase();
        this.options = a
    }

    Bf.prototype.open = function (a, b, c) {
        function d() {
            c && (c(X("REQUEST_INTERRUPTED")), c = null)
        }

        var e = new XMLHttpRequest, f = this.options.method.toUpperCase(), g;
        sf(window, "beforeunload", d);
        e.onreadystatechange = function () {
            if (c && 4 === e.readyState) {
                var a;
                if (200 <= e.status && 300 > e.status) {
                    try {
                        a = ta(e.responseText)
                    } catch (b) {
                    }
                    c(null, a)
                } else 500 <= e.status && 600 > e.status ? c(X("SERVER_ERROR")) : c(X("NETWORK_ERROR"));
                c = null;
                tf(window, "beforeunload", d)
            }
        };
        if ("GET" === f)a += (/\?/.test(a) ? "" : "?") + wf(b), g = null; else {
            var k = this.options.headers.content_type;
            "application/json" === k && (g = r(b));
            "application/x-www-form-urlencoded" === k && (g = wf(b))
        }
        e.open(f, a, !0);
        a = {"X-Requested-With": "XMLHttpRequest", Accept: "application/json;text/plain"};
        Sd(a, this.options.headers);
        for (var l in a)e.setRequestHeader(l, a[l]);
        e.send(g)
    };
    Bf.isAvailable = function () {
        return !!window.XMLHttpRequest && "string" === typeof(new XMLHttpRequest).responseType && (!(navigator.userAgent.match(/MSIE/) || navigator.userAgent.match(/Trident/)) || Af())
    };
    Bf.prototype.tc = function () {
        return "json"
    };
    function Cf(a) {
        this.gc = Fa() + Fa() + Fa();
        this.pf = a
    }

    Cf.prototype.open = function (a, b, c) {
        function d() {
            c && (c(X("USER_CANCELLED")), c = null)
        }

        var e = this, f = rb(mf), g;
        b.requestId = this.gc;
        b.redirectTo = f.scheme + "://" + f.host + "/blank/page.html";
        a += /\?/.test(a) ? "" : "?";
        a += wf(b);
        (g = window.open(a, "_blank", "location=no")) && ha(g.addEventListener) ? (g.addEventListener("loadstart", function (a) {
            var b;
            if (b = a && a.url)a:{
                var n = a.url;
                try {
                    var u = document.createElement("a");
                    u.href = n;
                    b = u.host === f.host && "/blank/page.html" === u.pathname;
                    break a
                } catch (x) {
                }
                b = !1
            }
            b && (a = vf(a.url), g.removeEventListener("exit",
                d), g.close(), a = new nf(null, null, {
                requestId: e.gc,
                requestKey: a
            }), e.pf.requestWithCredential("/auth/session", a, c), c = null)
        }), g.addEventListener("exit", d)) : c(X("TRANSPORT_UNAVAILABLE"))
    };
    Cf.isAvailable = function () {
        return zf()
    };
    Cf.prototype.tc = function () {
        return "redirect"
    };
    function Df(a) {
        if (!a.window_features || -1 !== navigator.userAgent.indexOf("Fennec/") || -1 !== navigator.userAgent.indexOf("Firefox/") && -1 !== navigator.userAgent.indexOf("Android"))a.window_features = void 0;
        a.window_name || (a.window_name = "_blank");
        this.options = a
    }

    Df.prototype.open = function (a, b, c) {
        function d(a) {
            g && (document.body.removeChild(g), g = void 0);
            u && (u = clearInterval(u));
            tf(window, "message", e);
            tf(window, "unload", d);
            if (n && !a)try {
                n.close()
            } catch (b) {
                k.postMessage("die", l)
            }
            n = k = void 0
        }

        function e(a) {
            if (a.origin === l)try {
                var b = ta(a.data);
                "ready" === b.a ? k.postMessage(x, l) : "error" === b.a ? (d(!1), c && (c(b.d), c = null)) : "response" === b.a && (d(b.forceKeepWindowOpen), c && (c(null, b.d), c = null))
            } catch (e) {
            }
        }

        var f = Af(), g, k;
        if (!this.options.relay_url)return c(Error("invalid arguments: origin of url and relay_url must match"));
        var l = uf(a);
        if (l !== uf(this.options.relay_url))c && setTimeout(function () {
            c(Error("invalid arguments: origin of url and relay_url must match"))
        }, 0); else {
            f && (g = document.createElement("iframe"), g.setAttribute("src", this.options.relay_url), g.style.display = "none", g.setAttribute("name", "__winchan_relay_frame"), document.body.appendChild(g), k = g.contentWindow);
            a += (/\?/.test(a) ? "" : "?") + wf(b);
            var n = window.open(a, this.options.window_name, this.options.window_features);
            k || (k = n);
            var u = setInterval(function () {
                n && n.closed &&
                (d(!1), c && (c(X("USER_CANCELLED")), c = null))
            }, 500), x = r({a: "request", d: b});
            sf(window, "unload", d);
            sf(window, "message", e)
        }
    };
    Df.isAvailable = function () {
        return "postMessage"in window && !/^file:\//.test(location.href) && !(zf() || navigator.userAgent.match(/Windows Phone/) || window.Windows && /^ms-appx:/.test(location.href) || navigator.userAgent.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i) || navigator.userAgent.match(/CriOS/) || navigator.userAgent.match(/Twitter for iPhone/) || navigator.userAgent.match(/FBAN\/FBIOS/) || window.navigator.standalone) && !navigator.userAgent.match(/PhantomJS/)
    };
    Df.prototype.tc = function () {
        return "popup"
    };
    function Ef(a) {
        a.callback_parameter || (a.callback_parameter = "callback");
        this.options = a;
        window.__firebase_auth_jsonp = window.__firebase_auth_jsonp || {}
    }

    Ef.prototype.open = function (a, b, c) {
        function d() {
            c && (c(X("REQUEST_INTERRUPTED")), c = null)
        }

        function e() {
            setTimeout(function () {
                window.__firebase_auth_jsonp[f] = void 0;
                Pd(window.__firebase_auth_jsonp) && (window.__firebase_auth_jsonp = void 0);
                try {
                    var a = document.getElementById(f);
                    a && a.parentNode.removeChild(a)
                } catch (b) {
                }
            }, 1);
            tf(window, "beforeunload", d)
        }

        var f = "fn" + (new Date).getTime() + Math.floor(99999 * Math.random());
        b[this.options.callback_parameter] = "__firebase_auth_jsonp." + f;
        a += (/\?/.test(a) ? "" : "?") + wf(b);
        sf(window, "beforeunload", d);
        window.__firebase_auth_jsonp[f] = function (a) {
            c && (c(null, a), c = null);
            e()
        };
        Ff(f, a, c)
    };
    function Ff(a, b, c) {
        setTimeout(function () {
            try {
                var d = document.createElement("script");
                d.type = "text/javascript";
                d.id = a;
                d.async = !0;
                d.src = b;
                d.onerror = function () {
                    var b = document.getElementById(a);
                    null !== b && b.parentNode.removeChild(b);
                    c && c(X("NETWORK_ERROR"))
                };
                var e = document.getElementsByTagName("head");
                (e && 0 != e.length ? e[0] : document.documentElement).appendChild(d)
            } catch (f) {
                c && c(X("NETWORK_ERROR"))
            }
        }, 0)
    }

    Ef.isAvailable = function () {
        return !zf()
    };
    Ef.prototype.tc = function () {
        return "json"
    };
    function Gf(a, b) {
        this.Ke = ["session", a.Id, a.ub].join(":");
        this.Wd = b
    }

    Gf.prototype.set = function (a, b) {
        if (!b)if (this.Wd.length)b = this.Wd[0]; else throw Error("fb.login.SessionManager : No storage options available!");
        b.set(this.Ke, a)
    };
    Gf.prototype.get = function () {
        var a = Ja(this.Wd, q(this.Zf, this)), a = Ia(a, function (a) {
            return null !== a
        });
        Qa(a, function (a, c) {
            return Ke(c.token) - Ke(a.token)
        });
        return 0 < a.length ? a.shift() : null
    };
    Gf.prototype.Zf = function (a) {
        try {
            var b = a.get(this.Ke);
            if (b && b.token)return b
        } catch (c) {
        }
        return null
    };
    Gf.prototype.clear = function () {
        var a = this;
        Ha(this.Wd, function (b) {
            b.remove(a.Ke)
        })
    };
    function Hf(a) {
        this.gc = Fa() + Fa() + Fa();
        this.pf = a
    }

    Hf.prototype.open = function (a, b) {
        v.set("redirect_request_id", this.gc);
        v.set("redirect_request_id", this.gc);
        b.requestId = this.gc;
        b.redirectTo = b.redirectTo || window.location.href;
        a += (/\?/.test(a) ? "" : "?") + wf(b);
        window.location = a
    };
    Hf.isAvailable = function () {
        return !/^file:\//.test(location.href) && !zf()
    };
    Hf.prototype.tc = function () {
        return "redirect"
    };
    function If(a, b, c, d) {
        Id.call(this, ["auth_status"]);
        this.O = a;
        this.Xe = b;
        this.Dg = c;
        this.Fe = d;
        this.jc = new Gf(a, [za, v]);
        this.ib = null;
        Jf(this)
    }

    ma(If, Id);
    h = If.prototype;
    h.re = function () {
        return this.ib || null
    };
    function Jf(a) {
        v.get("redirect_request_id") && Kf(a);
        var b = a.jc.get();
        b && b.token ? (Lf(a, b), a.Xe(b.token, function (c, d) {
            Mf(a, c, d, !1, b.token, b)
        }, function (b, d) {
            Nf(a, "resumeSession()", b, d)
        })) : Lf(a, null)
    }

    function Of(a, b, c, d, e, f) {
        "firebaseio-demo.com" === a.O.domain && z("Firebase authentication is not supported on demo Firebases (*.firebaseio-demo.com). To secure your Firebase, create a production Firebase at https://www.firebase.com.");
        a.Xe(b, function (f, k) {
            Mf(a, f, k, !0, b, c, d || {}, e)
        }, function (b, c) {
            Nf(a, "auth()", b, c, f)
        })
    }

    function Pf(a, b) {
        a.jc.clear();
        Lf(a, null);
        a.Dg(function (a, d) {
            if ("ok" === a)B(b, null); else {
                var e = (a || "error").toUpperCase(), f = e;
                d && (f += ": " + d);
                f = Error(f);
                f.code = e;
                B(b, f)
            }
        })
    }

    function Mf(a, b, c, d, e, f, g, k) {
        "ok" === b ? (d && (b = c.auth, f.auth = b, f.expires = c.expires, f.token = Le(e) ? e : "", c = null, b && s(b, "uid") ? c = t(b, "uid") : s(f, "uid") && (c = t(f, "uid")), f.uid = c, c = "custom", b && s(b, "provider") ? c = t(b, "provider") : s(f, "provider") && (c = t(f, "provider")), f.provider = c, a.jc.clear(), Le(e) && (g = g || {}, c = za, "sessionOnly" === g.remember && (c = v), "none" !== g.remember && a.jc.set(f, c)), Lf(a, f)), B(k, null, f)) : (a.jc.clear(), Lf(a, null), f = a = (b || "error").toUpperCase(), c && (f += ": " + c), f = Error(f), f.code = a, B(k, f))
    }

    function Nf(a, b, c, d, e) {
        z(b + " was canceled: " + d);
        a.jc.clear();
        Lf(a, null);
        a = Error(d);
        a.code = c.toUpperCase();
        B(e, a)
    }

    function Qf(a, b, c, d, e) {
        Rf(a);
        c = new nf(d || {}, {}, c || {});
        Sf(a, [Bf, Ef], "/auth/" + b, c, e)
    }

    function Tf(a, b, c, d) {
        Rf(a);
        var e = [Df, Cf];
        c = pf(c);
        "anonymous" === b || "password" === b ? setTimeout(function () {
            B(d, X("TRANSPORT_UNAVAILABLE"))
        }, 0) : (c.Zd.window_features = "menubar=yes,modal=yes,alwaysRaised=yeslocation=yes,resizable=yes,scrollbars=yes,status=yes,height=625,width=625,top=" + ("object" === typeof screen ? .5 * (screen.height - 625) : 0) + ",left=" + ("object" === typeof screen ? .5 * (screen.width - 625) : 0), c.Zd.relay_url = yf(a.O.ub), c.Zd.requestWithCredential = q(a.hc, a), Sf(a, e, "/auth/" + b, c, d))
    }

    function Kf(a) {
        var b = v.get("redirect_request_id");
        if (b) {
            var c = v.get("redirect_client_options");
            v.remove("redirect_request_id");
            v.remove("redirect_client_options");
            var d = [Bf, Ef], b = {requestId: b, requestKey: vf(document.location.hash)}, c = new nf(c, {}, b);
            try {
                document.location.hash = document.location.hash.replace(/&__firebase_request_key=([a-zA-z0-9]*)/, "")
            } catch (e) {
            }
            Sf(a, d, "/auth/session", c)
        }
    }

    h.ne = function (a, b) {
        Rf(this);
        var c = pf(a);
        c.Xa._method = "POST";
        this.hc("/users", c, function (a, c) {
            a ? B(b, a) : B(b, a, c)
        })
    };
    h.Me = function (a, b) {
        var c = this;
        Rf(this);
        var d = "/users/" + encodeURIComponent(a.email), e = pf(a);
        e.Xa._method = "DELETE";
        this.hc(d, e, function (a, d) {
            !a && d && d.uid && c.ib && c.ib.uid && c.ib.uid === d.uid && Pf(c);
            B(b, a)
        })
    };
    h.je = function (a, b) {
        Rf(this);
        var c = "/users/" + encodeURIComponent(a.email) + "/password", d = pf(a);
        d.Xa._method = "PUT";
        d.Xa.password = a.newPassword;
        this.hc(c, d, function (a) {
            B(b, a)
        })
    };
    h.ie = function (a, b) {
        Rf(this);
        var c = "/users/" + encodeURIComponent(a.oldEmail) + "/email", d = pf(a);
        d.Xa._method = "PUT";
        d.Xa.email = a.newEmail;
        d.Xa.password = a.password;
        this.hc(c, d, function (a) {
            B(b, a)
        })
    };
    h.Ne = function (a, b) {
        Rf(this);
        var c = "/users/" + encodeURIComponent(a.email) + "/password", d = pf(a);
        d.Xa._method = "POST";
        this.hc(c, d, function (a) {
            B(b, a)
        })
    };
    h.hc = function (a, b, c) {
        Uf(this, [Bf, Ef], a, b, c)
    };
    function Sf(a, b, c, d, e) {
        Uf(a, b, c, d, function (b, c) {
            !b && c && c.token && c.uid ? Of(a, c.token, c, d.cd, function (a, b) {
                a ? B(e, a) : B(e, null, b)
            }) : B(e, b || X("UNKNOWN_ERROR"))
        })
    }

    function Uf(a, b, c, d, e) {
        b = Ia(b, function (a) {
            return "function" === typeof a.isAvailable && a.isAvailable()
        });
        0 === b.length ? setTimeout(function () {
            B(e, X("TRANSPORT_UNAVAILABLE"))
        }, 0) : (b = new (b.shift())(d.Zd), d = va(d.Xa), d.v = "js-2.2.0", d.transport = b.tc(), d.suppress_status_codes = !0, a = xf() + "/" + a.O.ub + c, b.open(a, d, function (a, b) {
            if (a)B(e, a); else if (b && b.error) {
                var c = Error(b.error.message);
                c.code = b.error.code;
                c.details = b.error.details;
                B(e, c)
            } else B(e, null, b)
        }))
    }

    function Lf(a, b) {
        var c = null !== a.ib || null !== b;
        a.ib = b;
        c && a.$d("auth_status", b);
        a.Fe(null !== b)
    }

    h.ue = function (a) {
        y("auth_status" === a, 'initial event must be of type "auth_status"');
        return [this.ib]
    };
    function Rf(a) {
        var b = a.O;
        if ("firebaseio.com" !== b.domain && "firebaseio-demo.com" !== b.domain && "auth.firebase.com" === mf)throw Error("This custom Firebase server ('" + a.O.domain + "') does not support delegated login.");
    };
    function Vf(a, b) {
        return a && "object" === typeof a ? (y(".sv"in a, "Unexpected leaf node or priority contents"), b[a[".sv"]]) : a
    }

    function Wf(a, b) {
        var c = new cf;
        ef(a, new S(""), function (a, e) {
            c.ec(a, Xf(e, b))
        });
        return c
    }

    function Xf(a, b) {
        var c = a.L().I(), c = Vf(c, b), d;
        if (a.M()) {
            var e = Vf(a.za(), b);
            return e !== a.za() || c !== a.L().I() ? new qd(e, O(c)) : a
        }
        d = a;
        c !== a.L().I() && (d = d.$(new qd(c)));
        a.U(L, function (a, c) {
            var e = Xf(c, b);
            e !== c && (d = d.P(a, e))
        });
        return d
    };
    function Yf(a, b) {
        this.value = a;
        this.children = b || Zf
    }

    var Zf = new bd(function (a, b) {
        return a === b ? 0 : a < b ? -1 : 1
    }), $f = new Yf(null);

    function ag(a) {
        var b = $f;
        A(a, function (a, d) {
            b = b.set(new S(d), a)
        });
        return b
    }

    h = Yf.prototype;
    h.e = function () {
        return null === this.value && this.children.e()
    };
    function bg(a, b, c) {
        if (null != a.value && c(a.value))return {path: U, value: a.value};
        if (b.e())return null;
        var d = I(b);
        a = a.children.get(d);
        return null !== a ? (b = bg(a, T(b), c), null != b ? {path: (new S(d)).u(b.path), value: b.value} : null) : null
    }

    function cg(a, b) {
        return bg(a, b, function () {
            return !0
        })
    }

    h.subtree = function (a) {
        if (a.e())return this;
        var b = this.children.get(I(a));
        return null !== b ? b.subtree(T(a)) : $f
    };
    h.set = function (a, b) {
        if (a.e())return new Yf(b, this.children);
        var c = I(a), d = (this.children.get(c) || $f).set(T(a), b), c = this.children.La(c, d);
        return new Yf(this.value, c)
    };
    h.remove = function (a) {
        if (a.e())return this.children.e() ? $f : new Yf(null, this.children);
        var b = I(a), c = this.children.get(b);
        return c ? (a = c.remove(T(a)), b = a.e() ? this.children.remove(b) : this.children.La(b, a), null === this.value && b.e() ? $f : new Yf(this.value, b)) : this
    };
    h.get = function (a) {
        if (a.e())return this.value;
        var b = this.children.get(I(a));
        return b ? b.get(T(a)) : null
    };
    function dg(a, b, c) {
        if (b.e())return c;
        var d = I(b);
        b = dg(a.children.get(d) || $f, T(b), c);
        d = b.e() ? a.children.remove(d) : a.children.La(d, b);
        return new Yf(a.value, d)
    }

    function eg(a, b) {
        return fg(a, U, b)
    }

    function fg(a, b, c) {
        var d = {};
        a.children.fa(function (a, f) {
            d[a] = fg(f, b.u(a), c)
        });
        return c(b, a.value, d)
    }

    function gg(a, b, c) {
        return hg(a, b, U, c)
    }

    function hg(a, b, c, d) {
        var e = a.value ? d(c, a.value) : !1;
        if (e)return e;
        if (b.e())return null;
        e = I(b);
        return (a = a.children.get(e)) ? hg(a, T(b), c.u(e), d) : null
    }

    function ig(a, b, c) {
        if (!b.e()) {
            var d = !0;
            a.value && (d = c(U, a.value));
            !0 === d && (d = I(b), (a = a.children.get(d)) && jg(a, T(b), U.u(d), c))
        }
    }

    function jg(a, b, c, d) {
        if (b.e())return a;
        a.value && d(c, a.value);
        var e = I(b);
        return (a = a.children.get(e)) ? jg(a, T(b), c.u(e), d) : $f
    }

    function kg(a, b) {
        lg(a, U, b)
    }

    function lg(a, b, c) {
        a.children.fa(function (a, e) {
            lg(e, b.u(a), c)
        });
        a.value && c(b, a.value)
    }

    function mg(a, b) {
        a.children.fa(function (a, d) {
            d.value && b(a, d.value)
        })
    }

    h.toString = function () {
        var a = {};
        kg(this, function (b, c) {
            a[b.toString()] = c.toString()
        });
        return r(a)
    };
    function ng(a, b) {
        this.ce = a;
        this.Of = b
    }

    function og(a) {
        this.G = a
    }

    og.prototype.Ya = function (a, b, c, d) {
        var e = new Bc, f;
        if (b.type === pg)b.source.qe ? c = qg(this, a, b.path, b.Ga, c, d, e) : (y(b.source.ef, "Unknown source."), f = b.source.Te, c = rg(this, a, b.path, b.Ga, c, d, f, e)); else if (b.type === sg)b.source.qe ? c = tg(this, a, b.path, b.children, c, d, e) : (y(b.source.ef, "Unknown source."), f = b.source.Te, c = ug(this, a, b.path, b.children, c, d, f, e)); else if (b.type === vg)if (b.Oe)if (f = b.path, null != c.kc(f))c = a; else {
            b = new xc(c, a, d);
            d = a.B.j();
            if (f.e() || ".priority" === I(f))wg(a.o()) ? b = c.pa(Ac(a)) : (b = a.o().j(),
                y(b instanceof W, "serverChildren would be complete if leaf node"), b = c.qc(b)), b = this.G.oa(d, b, e); else {
                f = I(f);
                var g = c.Ta(f, a.o());
                null == g && yc(a.o(), f) && (g = d.K(f));
                b = null != g ? this.G.D(d, f, g, b, e) : a.B.j().Da(f) ? this.G.D(d, f, M, b, e) : d;
                b.e() && wg(a.o()) && (d = c.pa(Ac(a)), d.M() && (b = this.G.oa(b, d, e)))
            }
            d = wg(a.o()) || null != c.kc(U);
            c = xg(a, b, d, this.G.Ca())
        } else c = yg(this, a, b.path, c, d, e); else if (b.type === zg)d = b.path, b = a.o(), f = b.j(), g = b.Z || d.e(), c = Ag(this, new Bg(a.B, new zc(f, g, b.Lb)), d, c, wc, e); else throw fb("Unknown operation type: " +
        b.type);
        e = Ld(e.Za);
        d = c;
        b = d.B;
        b.Z && (f = b.j().M() || b.j().e(), g = Cg(a), (0 < e.length || !a.B.Z || f && !b.j().aa(g) || !b.j().L().aa(g.L())) && e.push(Fb(Cg(d))));
        return new ng(c, e)
    };
    function Ag(a, b, c, d, e, f) {
        var g = b.B;
        if (null != d.kc(c))return b;
        var k;
        if (c.e())y(wg(b.o()), "If change path is empty, we must have complete server data"), b.o().Lb ? (e = Ac(b), d = d.qc(e instanceof W ? e : M)) : d = d.pa(Ac(b)), f = a.G.oa(b.B.j(), d, f); else {
            var l = I(c);
            if (".priority" == l)y(1 == Tc(c), "Can't have a priority with additional path components"), f = g.j(), k = b.o().j(), d = d.$c(c, f, k), f = null != d ? a.G.$(f, d) : g.j(); else {
                var n = T(c);
                yc(g, l) ? (k = b.o().j(), d = d.$c(c, g.j(), k), d = null != d ? g.j().K(l).D(n, d) : g.j().K(l)) : d = d.Ta(l, b.o());
                f = null != d ? a.G.D(g.j(), l, d, e, f) : g.j()
            }
        }
        return xg(b, f, g.Z || c.e(), a.G.Ca())
    }

    function rg(a, b, c, d, e, f, g, k) {
        var l = b.o();
        g = g ? a.G : a.G.Nb();
        if (c.e())d = g.oa(l.j(), d, null); else if (g.Ca() && !l.Lb)d = l.j().D(c, d), d = g.oa(l.j(), d, null); else {
            var n = I(c);
            if ((c.e() ? !l.Z || l.Lb : !yc(l, I(c))) && 1 < Tc(c))return b;
            d = l.j().K(n).D(T(c), d);
            d = ".priority" == n ? g.$(l.j(), d) : g.D(l.j(), n, d, wc, null)
        }
        l = l.Z || c.e();
        b = new Bg(b.B, new zc(d, l, g.Ca()));
        return Ag(a, b, c, e, new xc(e, b, f), k)
    }

    function qg(a, b, c, d, e, f, g) {
        var k = b.B;
        e = new xc(e, b, f);
        if (c.e())g = a.G.oa(b.B.j(), d, g), a = xg(b, g, !0, a.G.Ca()); else if (f = I(c), ".priority" === f)g = a.G.$(b.B.j(), d), a = xg(b, g, k.Z, k.Lb); else {
            var l = T(c);
            c = k.j().K(f);
            if (!l.e()) {
                var n = e.ff(f);
                d = null != n ? ".priority" === Uc(l) && n.ra(l.parent()).e() ? n : n.D(l, d) : M
            }
            c.aa(d) ? a = b : (g = a.G.D(k.j(), f, d, e, g), a = xg(b, g, k.Z, a.G.Ca()))
        }
        return a
    }

    function tg(a, b, c, d, e, f, g) {
        var k = b;
        kg(d, function (d, n) {
            var u = c.u(d);
            yc(b.B, I(u)) && (k = qg(a, k, u, n, e, f, g))
        });
        kg(d, function (d, n) {
            var u = c.u(d);
            yc(b.B, I(u)) || (k = qg(a, k, u, n, e, f, g))
        });
        return k
    }

    function Dg(a, b) {
        kg(b, function (b, d) {
            a = a.D(b, d)
        });
        return a
    }

    function ug(a, b, c, d, e, f, g, k) {
        if (b.o().j().e() && !wg(b.o()))return b;
        var l = b;
        c = c.e() ? d : dg($f, c, d);
        var n = b.o().j();
        c.children.fa(function (c, d) {
            if (n.Da(c)) {
                var F = b.o().j().K(c), F = Dg(F, d);
                l = rg(a, l, new S(c), F, e, f, g, k)
            }
        });
        c.children.fa(function (c, d) {
            var F = !wg(b.o()) && null == d.value;
            n.Da(c) || F || (F = b.o().j().K(c), F = Dg(F, d), l = rg(a, l, new S(c), F, e, f, g, k))
        });
        return l
    }

    function yg(a, b, c, d, e, f) {
        if (null != d.kc(c))return b;
        var g = new xc(d, b, e), k = e = b.B.j();
        if (wg(b.o())) {
            if (c.e())e = d.pa(Ac(b)), k = a.G.oa(b.B.j(), e, f); else if (".priority" === I(c)) {
                var l = d.Ta(I(c), b.o());
                null == l || e.e() || e.L().aa(l) || (k = a.G.$(e, l))
            } else l = I(c), e = d.Ta(l, b.o()), null != e && (k = a.G.D(b.B.j(), l, e, g, f));
            e = !0
        } else if (b.B.Z || c.e())k = e, e = b.B.j(), e.M() || e.U(L, function (c) {
            var e = d.Ta(c, b.o());
            null != e && (k = a.G.D(k, c, e, g, f))
        }), e = b.B.Z; else {
            l = I(c);
            if (1 == Tc(c) || yc(b.B, l))c = d.Ta(l, b.o()), null != c && (k = a.G.D(e, l, c,
                g, f));
            e = !1
        }
        return xg(b, k, e, a.G.Ca())
    };
    function Eg(a) {
        this.W = a;
        this.g = a.n.g
    }

    function Fg(a, b, c, d) {
        var e = [], f = [];
        Ha(b, function (b) {
            "child_changed" === b.type && a.g.we(b.Ee, b.Ha) && f.push(new C("child_moved", b.Ha, b.Ua))
        });
        Gg(a, e, "child_removed", b, d, c);
        Gg(a, e, "child_added", b, d, c);
        Gg(a, e, "child_moved", f, d, c);
        Gg(a, e, "child_changed", b, d, c);
        Gg(a, e, Gb, b, d, c);
        return e
    }

    function Gg(a, b, c, d, e, f) {
        d = Ia(d, function (a) {
            return a.type === c
        });
        Qa(d, q(a.Qf, a));
        Ha(d, function (c) {
            var d = Hg(a, c, f);
            Ha(e, function (e) {
                e.wf(c.type) && b.push(e.createEvent(d, a.W))
            })
        })
    }

    function Hg(a, b, c) {
        "value" !== b.type && "child_removed" !== b.type && (b.Kd = c.gf(b.Ua, b.Ha, a.g));
        return b
    }

    Eg.prototype.Qf = function (a, b) {
        if (null == a.Ua || null == b.Ua)throw fb("Should only compare child_ events.");
        return this.g.compare(new N(a.Ua, a.Ha), new N(b.Ua, b.Ha))
    };
    function zc(a, b, c) {
        this.A = a;
        this.Z = b;
        this.Lb = c
    }

    function wg(a) {
        return a.Z
    }

    function yc(a, b) {
        return a.Z && !a.Lb || a.A.Da(b)
    }

    zc.prototype.j = function () {
        return this.A
    };
    function Bg(a, b) {
        this.B = a;
        this.Qd = b
    }

    function xg(a, b, c, d) {
        return new Bg(new zc(b, c, d), a.Qd)
    }

    function Cg(a) {
        return a.B.Z ? a.B.j() : null
    }

    Bg.prototype.o = function () {
        return this.Qd
    };
    function Ac(a) {
        return a.Qd.Z ? a.Qd.j() : null
    };
    function Ig(a, b) {
        this.W = a;
        var c = a.n, d = new bc(c.g), c = Mc(c) ? new bc(c.g) : c.ka ? new Dc(c) : new dc(c);
        this.sf = new og(c);
        var e = b.o(), f = b.B, g = d.oa(M, e.j(), null), k = c.oa(M, f.j(), null);
        this.Ia = new Bg(new zc(k, f.Z, c.Ca()), new zc(g, e.Z, d.Ca()));
        this.Va = [];
        this.Uf = new Eg(a)
    }

    function Jg(a) {
        return a.W
    }

    h = Ig.prototype;
    h.o = function () {
        return this.Ia.o().j()
    };
    h.bb = function (a) {
        var b = Ac(this.Ia);
        return b && (Mc(this.W.n) || !a.e() && !b.K(I(a)).e()) ? b.ra(a) : null
    };
    h.e = function () {
        return 0 === this.Va.length
    };
    h.Gb = function (a) {
        this.Va.push(a)
    };
    h.gb = function (a, b) {
        var c = [];
        if (b) {
            y(null == a, "A cancel should cancel all event registrations.");
            var d = this.W.path;
            Ha(this.Va, function (a) {
                (a = a.Ze(b, d)) && c.push(a)
            })
        }
        if (a) {
            for (var e = [], f = 0; f < this.Va.length; ++f) {
                var g = this.Va[f];
                if (!g.matches(a))e.push(g); else if (a.jf()) {
                    e = e.concat(this.Va.slice(f + 1));
                    break
                }
            }
            this.Va = e
        } else this.Va = [];
        return c
    };
    h.Ya = function (a, b, c) {
        a.type === sg && null !== a.source.zb && (y(Ac(this.Ia), "We should always have a full cache before handling merges"), y(Cg(this.Ia), "Missing event cache, even though we have a server cache"));
        var d = this.Ia;
        a = this.sf.Ya(d, a, b, c);
        b = this.sf;
        c = a.ce;
        y(c.B.j().Bc(b.G.g), "Event snap not indexed");
        y(c.o().j().Bc(b.G.g), "Server snap not indexed");
        y(wg(a.ce.o()) || !wg(d.o()), "Once a server snap is complete, it should never go back");
        this.Ia = a.ce;
        return Kg(this, a.Of, a.ce.B.j(), null)
    };
    function Lg(a, b) {
        var c = a.Ia.B, d = [];
        c.j().M() || c.j().U(L, function (a, b) {
            d.push(new C("child_added", b, a))
        });
        c.Z && d.push(Fb(c.j()));
        return Kg(a, d, c.j(), b)
    }

    function Kg(a, b, c, d) {
        return Fg(a.Uf, b, c, d ? [d] : a.Va)
    };
    function Mg() {
        this.wa = {}
    }

    h = Mg.prototype;
    h.e = function () {
        return Pd(this.wa)
    };
    h.Ya = function (a, b, c) {
        var d = a.source.zb;
        if (null !== d)return d = t(this.wa, d), y(null != d, "SyncTree gave us an op for an invalid query."), d.Ya(a, b, c);
        var e = [];
        A(this.wa, function (d) {
            e = e.concat(d.Ya(a, b, c))
        });
        return e
    };
    h.Gb = function (a, b, c, d, e) {
        var f = a.Fa(), g = t(this.wa, f);
        if (!g) {
            var g = c.pa(e ? d : null), k = !1;
            g ? k = !0 : (g = d instanceof W ? c.qc(d) : M, k = !1);
            g = new Ig(a, new Bg(new zc(g, k, !1), new zc(d, e, !1)));
            this.wa[f] = g
        }
        g.Gb(b);
        return Lg(g, b)
    };
    h.gb = function (a, b, c) {
        var d = a.Fa(), e = [], f = [], g = null != Ng(this);
        if ("default" === d) {
            var k = this;
            A(this.wa, function (a, d) {
                f = f.concat(a.gb(b, c));
                a.e() && (delete k.wa[d], Mc(a.W.n) || e.push(a.W))
            })
        } else {
            var l = t(this.wa, d);
            l && (f = f.concat(l.gb(b, c)), l.e() && (delete this.wa[d], Mc(l.W.n) || e.push(l.W)))
        }
        g && null == Ng(this) && e.push(new R(a.k, a.path));
        return {sg: e, Vf: f}
    };
    function Og(a) {
        return Ia(Ld(a.wa), function (a) {
            return !Mc(a.W.n)
        })
    }

    h.bb = function (a) {
        var b = null;
        A(this.wa, function (c) {
            b = b || c.bb(a)
        });
        return b
    };
    function Pg(a, b) {
        if (Mc(b.n))return Ng(a);
        var c = b.Fa();
        return t(a.wa, c)
    }

    function Ng(a) {
        return Od(a.wa, function (a) {
                return Mc(a.W.n)
            }) || null
    };
    function Qg(a) {
        this.X = a
    }

    var Rg = new Qg(new Yf(null));

    function Sg(a, b, c) {
        if (b.e())return new Qg(new Yf(c));
        var d = cg(a.X, b);
        if (null != d) {
            var e = d.path, d = d.value;
            b = V(e, b);
            d = d.D(b, c);
            return new Qg(a.X.set(e, d))
        }
        a = dg(a.X, b, new Yf(c));
        return new Qg(a)
    }

    function Tg(a, b, c) {
        var d = a;
        ua(c, function (a, c) {
            d = Sg(d, b.u(a), c)
        });
        return d
    }

    Qg.prototype.Ld = function (a) {
        if (a.e())return Rg;
        a = dg(this.X, a, $f);
        return new Qg(a)
    };
    function Ug(a, b) {
        var c = cg(a.X, b);
        return null != c ? a.X.get(c.path).ra(V(c.path, b)) : null
    }

    function Vg(a) {
        var b = [], c = a.X.value;
        null != c ? c.M() || c.U(L, function (a, c) {
            b.push(new N(a, c))
        }) : a.X.children.fa(function (a, c) {
            null != c.value && b.push(new N(a, c.value))
        });
        return b
    }

    function Wg(a, b) {
        if (b.e())return a;
        var c = Ug(a, b);
        return null != c ? new Qg(new Yf(c)) : new Qg(a.X.subtree(b))
    }

    Qg.prototype.e = function () {
        return this.X.e()
    };
    Qg.prototype.apply = function (a) {
        return Xg(U, this.X, a)
    };
    function Xg(a, b, c) {
        if (null != b.value)return c.D(a, b.value);
        var d = null;
        b.children.fa(function (b, f) {
            ".priority" === b ? (y(null !== f.value, "Priority writes must always be leaf nodes"), d = f.value) : c = Xg(a.u(b), f, c)
        });
        c.ra(a).e() || null === d || (c = c.D(a.u(".priority"), d));
        return c
    };
    function Yg() {
        this.T = Rg;
        this.xa = [];
        this.Ec = -1
    }

    h = Yg.prototype;
    h.Ld = function (a) {
        var b = Na(this.xa, function (b) {
            return b.de === a
        });
        y(0 <= b, "removeWrite called with nonexistent writeId.");
        var c = this.xa[b];
        this.xa.splice(b, 1);
        for (var d = c.visible, e = !1, f = this.xa.length - 1; d && 0 <= f;) {
            var g = this.xa[f];
            g.visible && (f >= b && Zg(g, c.path) ? d = !1 : c.path.contains(g.path) && (e = !0));
            f--
        }
        if (d) {
            if (e)this.T = $g(this.xa, ah, U), this.Ec = 0 < this.xa.length ? this.xa[this.xa.length - 1].de : -1; else if (c.Ga)this.T = this.T.Ld(c.path); else {
                var k = this;
                A(c.children, function (a, b) {
                    k.T = k.T.Ld(c.path.u(b))
                })
            }
            return c.path
        }
        return null
    };
    h.pa = function (a, b, c, d) {
        if (c || d) {
            var e = Wg(this.T, a);
            return !d && e.e() ? b : d || null != b || null != Ug(e, U) ? (e = $g(this.xa, function (b) {
                return (b.visible || d) && (!c || !(0 <= Ga(c, b.de))) && (b.path.contains(a) || a.contains(b.path))
            }, a), b = b || M, e.apply(b)) : null
        }
        e = Ug(this.T, a);
        if (null != e)return e;
        e = Wg(this.T, a);
        return e.e() ? b : null != b || null != Ug(e, U) ? (b = b || M, e.apply(b)) : null
    };
    h.qc = function (a, b) {
        var c = M, d = Ug(this.T, a);
        if (d)d.M() || d.U(L, function (a, b) {
            c = c.P(a, b)
        }); else if (b) {
            var e = Wg(this.T, a);
            b.U(L, function (a, b) {
                var d = Wg(e, new S(a)).apply(b);
                c = c.P(a, d)
            });
            Ha(Vg(e), function (a) {
                c = c.P(a.name, a.V)
            })
        } else e = Wg(this.T, a), Ha(Vg(e), function (a) {
            c = c.P(a.name, a.V)
        });
        return c
    };
    h.$c = function (a, b, c, d) {
        y(c || d, "Either existingEventSnap or existingServerSnap must exist");
        a = a.u(b);
        if (null != Ug(this.T, a))return null;
        a = Wg(this.T, a);
        return a.e() ? d.ra(b) : a.apply(d.ra(b))
    };
    h.Ta = function (a, b, c) {
        a = a.u(b);
        var d = Ug(this.T, a);
        return null != d ? d : yc(c, b) ? Wg(this.T, a).apply(c.j().K(b)) : null
    };
    h.kc = function (a) {
        return Ug(this.T, a)
    };
    h.he = function (a, b, c, d, e, f) {
        var g;
        a = Wg(this.T, a);
        g = Ug(a, U);
        if (null == g)if (null != b)g = a.apply(b); else return [];
        g = g.hb(f);
        if (g.e() || g.M())return [];
        b = [];
        a = mc(f);
        e = e ? g.Sb(c, f) : g.Qb(c, f);
        for (f = P(e); f && b.length < d;)0 !== a(f, c) && b.push(f), f = P(e);
        return b
    };
    function Zg(a, b) {
        return a.Ga ? a.path.contains(b) : !!Nd(a.children, function (c, d) {
            return a.path.u(d).contains(b)
        })
    }

    function ah(a) {
        return a.visible
    }

    function $g(a, b, c) {
        for (var d = Rg, e = 0; e < a.length; ++e) {
            var f = a[e];
            if (b(f)) {
                var g = f.path;
                if (f.Ga)c.contains(g) ? (g = V(c, g), d = Sg(d, g, f.Ga)) : g.contains(c) && (g = V(g, c), d = Sg(d, U, f.Ga.ra(g))); else if (f.children)if (c.contains(g))g = V(c, g), d = Tg(d, g, f.children); else {
                    if (g.contains(c))if (g = V(g, c), g.e())d = Tg(d, U, f.children); else if (f = t(f.children, I(g)))f = f.ra(T(g)), d = Sg(d, U, f)
                } else throw fb("WriteRecord should have .snap or .children");
            }
        }
        return d
    }

    function bh(a, b) {
        this.Eb = a;
        this.X = b
    }

    h = bh.prototype;
    h.pa = function (a, b, c) {
        return this.X.pa(this.Eb, a, b, c)
    };
    h.qc = function (a) {
        return this.X.qc(this.Eb, a)
    };
    h.$c = function (a, b, c) {
        return this.X.$c(this.Eb, a, b, c)
    };
    h.kc = function (a) {
        return this.X.kc(this.Eb.u(a))
    };
    h.he = function (a, b, c, d, e) {
        return this.X.he(this.Eb, a, b, c, d, e)
    };
    h.Ta = function (a, b) {
        return this.X.Ta(this.Eb, a, b)
    };
    h.u = function (a) {
        return new bh(this.Eb.u(a), this.X)
    };
    function ch(a, b, c) {
        this.type = pg;
        this.source = a;
        this.path = b;
        this.Ga = c
    }

    ch.prototype.Mc = function (a) {
        return this.path.e() ? new ch(this.source, U, this.Ga.K(a)) : new ch(this.source, T(this.path), this.Ga)
    };
    ch.prototype.toString = function () {
        return "Operation(" + this.path + ": " + this.source.toString() + " overwrite: " + this.Ga.toString() + ")"
    };
    function dh(a, b) {
        this.type = vg;
        this.source = eh;
        this.path = a;
        this.Oe = b
    }

    dh.prototype.Mc = function () {
        return this.path.e() ? this : new dh(T(this.path), this.Oe)
    };
    dh.prototype.toString = function () {
        return "Operation(" + this.path + ": " + this.source.toString() + " ack write revert=" + this.Oe + ")"
    };
    function fh(a, b) {
        this.type = zg;
        this.source = a;
        this.path = b
    }

    fh.prototype.Mc = function () {
        return this.path.e() ? new fh(this.source, U) : new fh(this.source, T(this.path))
    };
    fh.prototype.toString = function () {
        return "Operation(" + this.path + ": " + this.source.toString() + " listen_complete)"
    };
    function gh(a, b, c) {
        this.type = sg;
        this.source = a;
        this.path = b;
        this.children = c
    }

    gh.prototype.Mc = function (a) {
        if (this.path.e())return a = this.children.subtree(new S(a)), a.e() ? null : a.value ? new ch(this.source, U, a.value) : new gh(this.source, U, a);
        y(I(this.path) === a, "Can't get a merge for a child not on the path of the operation");
        return new gh(this.source, T(this.path), this.children)
    };
    gh.prototype.toString = function () {
        return "Operation(" + this.path + ": " + this.source.toString() + " merge: " + this.children.toString() + ")"
    };
    var pg = 0, sg = 1, vg = 2, zg = 3;

    function hh(a, b, c, d) {
        this.qe = a;
        this.ef = b;
        this.zb = c;
        this.Te = d;
        y(!d || b, "Tagged queries must be from server.")
    }

    var eh = new hh(!0, !1, null, !1), ih = new hh(!1, !0, null, !1);
    hh.prototype.toString = function () {
        return this.qe ? "user" : this.Te ? "server(queryID=" + this.zb + ")" : "server"
    };
    function jh(a) {
        this.na = $f;
        this.yb = new Yg;
        this.Wc = {};
        this.cc = {};
        this.Fc = a
    }

    function kh(a, b, c, d, e) {
        var f = a.yb, g = e;
        y(d > f.Ec, "Stacking an older write on top of newer ones");
        m(g) || (g = !0);
        f.xa.push({path: b, Ga: c, de: d, visible: g});
        g && (f.T = Sg(f.T, b, c));
        f.Ec = d;
        return e ? lh(a, new ch(eh, b, c)) : []
    }

    function mh(a, b, c, d) {
        var e = a.yb;
        y(d > e.Ec, "Stacking an older merge on top of newer ones");
        e.xa.push({path: b, children: c, de: d, visible: !0});
        e.T = Tg(e.T, b, c);
        e.Ec = d;
        c = ag(c);
        return lh(a, new gh(eh, b, c))
    }

    function nh(a, b, c) {
        c = c || !1;
        b = a.yb.Ld(b);
        return null == b ? [] : lh(a, new dh(b, c))
    }

    function oh(a, b, c) {
        c = ag(c);
        return lh(a, new gh(ih, b, c))
    }

    function ph(a, b, c, d) {
        d = Qd(a.Wc, "_" + d);
        if (null != d) {
            var e = qh(d);
            d = e.path;
            e = e.zb;
            b = V(d, b);
            c = new ch(new hh(!1, !0, e, !0), b, c);
            return rh(a, d, c)
        }
        return []
    }

    function sh(a, b, c, d) {
        if (d = Qd(a.Wc, "_" + d)) {
            var e = qh(d);
            d = e.path;
            e = e.zb;
            b = V(d, b);
            c = ag(c);
            c = new gh(new hh(!1, !0, e, !0), b, c);
            return rh(a, d, c)
        }
        return []
    }

    jh.prototype.Gb = function (a, b) {
        var c = a.path, d = null, e = !1;
        ig(this.na, c, function (a, b) {
            var f = V(a, c);
            d = b.bb(f);
            e = e || null != Ng(b);
            return !d
        });
        var f = this.na.get(c);
        f ? (e = e || null != Ng(f), d = d || f.bb(U)) : (f = new Mg, this.na = this.na.set(c, f));
        var g;
        null != d ? g = !0 : (g = !1, d = M, mg(this.na.subtree(c), function (a, b) {
            var c = b.bb(U);
            c && (d = d.P(a, c))
        }));
        var k = null != Pg(f, a);
        if (!k && !Mc(a.n)) {
            var l = th(a);
            y(!(l in this.cc), "View does not exist, but we have a tag");
            var n = uh++;
            this.cc[l] = n;
            this.Wc["_" + n] = l
        }
        g = f.Gb(a, b, new bh(c, this.yb),
            d, g);
        k || e || (f = Pg(f, a), g = g.concat(vh(this, a, f)));
        return g
    };
    jh.prototype.gb = function (a, b, c) {
        var d = a.path, e = this.na.get(d), f = [];
        if (e && ("default" === a.Fa() || null != Pg(e, a))) {
            f = e.gb(a, b, c);
            e.e() && (this.na = this.na.remove(d));
            e = f.sg;
            f = f.Vf;
            b = -1 !== Na(e, function (a) {
                return Mc(a.n)
            });
            var g = gg(this.na, d, function (a, b) {
                return null != Ng(b)
            });
            if (b && !g && (d = this.na.subtree(d), !d.e()))for (var d = wh(d), k = 0; k < d.length; ++k) {
                var l = d[k], n = l.W, l = xh(this, l);
                this.Fc.Qe(n, yh(this, n), l.nd, l.H)
            }
            if (!g && 0 < e.length && !c)if (b)this.Fc.Vd(a, null); else {
                var u = this;
                Ha(e, function (a) {
                    a.Fa();
                    var b = u.cc[th(a)];
                    u.Fc.Vd(a, b)
                })
            }
            zh(this, e)
        }
        return f
    };
    jh.prototype.pa = function (a, b) {
        var c = this.yb, d = gg(this.na, a, function (b, c) {
            var d = V(b, a);
            if (d = c.bb(d))return d
        });
        return c.pa(a, d, b, !0)
    };
    function wh(a) {
        return eg(a, function (a, c, d) {
            if (c && null != Ng(c))return [Ng(c)];
            var e = [];
            c && (e = Og(c));
            A(d, function (a) {
                e = e.concat(a)
            });
            return e
        })
    }

    function zh(a, b) {
        for (var c = 0; c < b.length; ++c) {
            var d = b[c];
            if (!Mc(d.n)) {
                var d = th(d), e = a.cc[d];
                delete a.cc[d];
                delete a.Wc["_" + e]
            }
        }
    }

    function vh(a, b, c) {
        var d = b.path, e = yh(a, b);
        c = xh(a, c);
        b = a.Fc.Qe(b, e, c.nd, c.H);
        d = a.na.subtree(d);
        if (e)y(null == Ng(d.value), "If we're adding a query, it shouldn't be shadowed"); else for (e = eg(d, function (a, b, c) {
            if (!a.e() && b && null != Ng(b))return [Jg(Ng(b))];
            var d = [];
            b && (d = d.concat(Ja(Og(b), function (a) {
                return a.W
            })));
            A(c, function (a) {
                d = d.concat(a)
            });
            return d
        }), d = 0; d < e.length; ++d)c = e[d], a.Fc.Vd(c, yh(a, c));
        return b
    }

    function xh(a, b) {
        var c = b.W, d = yh(a, c);
        return {
            nd: function () {
                return (b.o() || M).hash()
            }, H: function (b, f) {
                if ("ok" === b) {
                    if (f && "object" === typeof f && s(f, "w")) {
                        var g = t(f, "w");
                        ea(g) && 0 <= Ga(g, "no_index") && z("Using an unspecified index. Consider adding " + ('".indexOn": "' + c.n.g.toString() + '"') + " at " + c.path.toString() + " to your security rules for better performance")
                    }
                    if (d) {
                        var k = c.path;
                        if (g = Qd(a.Wc, "_" + d))var l = qh(g), g = l.path, l = l.zb, k = V(g, k), k = new fh(new hh(!1, !0, l, !0), k), g = rh(a, g, k); else g = []
                    } else g = lh(a, new fh(ih,
                        c.path));
                    return g
                }
                g = "Unknown Error";
                "too_big" === b ? g = "The data requested exceeds the maximum size that can be accessed with a single request." : "permission_denied" == b ? g = "Client doesn't have permission to access the desired data." : "unavailable" == b && (g = "The service is unavailable");
                g = Error(b + ": " + g);
                g.code = b.toUpperCase();
                return a.gb(c, null, g)
            }
        }
    }

    function th(a) {
        return a.path.toString() + "$" + a.Fa()
    }

    function qh(a) {
        var b = a.indexOf("$");
        y(-1 !== b && b < a.length - 1, "Bad queryKey.");
        return {zb: a.substr(b + 1), path: new S(a.substr(0, b))}
    }

    function yh(a, b) {
        var c = th(b);
        return t(a.cc, c)
    }

    var uh = 1;

    function rh(a, b, c) {
        var d = a.na.get(b);
        y(d, "Missing sync point for query tag that we're tracking");
        return d.Ya(c, new bh(b, a.yb), null)
    }

    function lh(a, b) {
        return Ah(a, b, a.na, null, new bh(U, a.yb))
    }

    function Ah(a, b, c, d, e) {
        if (b.path.e())return Bh(a, b, c, d, e);
        var f = c.get(U);
        null == d && null != f && (d = f.bb(U));
        var g = [], k = I(b.path), l = b.Mc(k);
        if ((c = c.children.get(k)) && l)var n = d ? d.K(k) : null, k = e.u(k), g = g.concat(Ah(a, l, c, n, k));
        f && (g = g.concat(f.Ya(b, e, d)));
        return g
    }

    function Bh(a, b, c, d, e) {
        var f = c.get(U);
        null == d && null != f && (d = f.bb(U));
        var g = [];
        c.children.fa(function (c, f) {
            var n = d ? d.K(c) : null, u = e.u(c), x = b.Mc(c);
            x && (g = g.concat(Bh(a, x, f, n, u)))
        });
        f && (g = g.concat(f.Ya(b, e, d)));
        return g
    };
    function Ch(a) {
        this.O = a;
        this.Ra = Zd(a);
        this.ba = new gf;
        this.Ad = 1;
        this.S = new Me(this.O, q(this.Dd, this), q(this.Bd, this), q(this.Ie, this));
        this.Ag = $d(a, q(function () {
            return new Wd(this.Ra, this.S)
        }, this));
        this.mc = new Wc;
        this.xe = new ff;
        var b = this;
        this.rd = new jh({
            Qe: function (a, d, e, f) {
                d = [];
                e = b.xe.j(a.path);
                e.e() || (d = lh(b.rd, new ch(ih, a.path, e)), setTimeout(function () {
                    f("ok")
                }, 0));
                return d
            }, Vd: ba
        });
        Dh(this, "connected", !1);
        this.ga = new cf;
        this.Q = new If(a, q(this.S.Q, this.S), q(this.S.Ve, this.S), q(this.Fe, this));
        this.hd =
            0;
        this.ye = null;
        this.N = new jh({
            Qe: function (a, d, e, f) {
                Qe(b.S, a, e, d, function (d, e) {
                    var l = f(d, e);
                    lf(b.ba, a.path, l)
                });
                return []
            }, Vd: function (a, d) {
                var e = b.S, f = a.path.toString(), g = a.Fa();
                e.f("Unlisten called for " + f + " " + g);
                if (Se(e, f, g) && e.ja) {
                    var k = Lc(a.n);
                    e.f("Unlisten on " + f + " for " + g);
                    f = {p: f};
                    d && (f.q = k, f.t = d);
                    e.Ba("n", f)
                }
            }
        })
    }

    h = Ch.prototype;
    h.toString = function () {
        return (this.O.Bb ? "https://" : "http://") + this.O.host
    };
    h.name = function () {
        return this.O.ub
    };
    function Eh(a) {
        a = a.xe.j(new S(".info/serverTimeOffset")).I() || 0;
        return (new Date).getTime() + a
    }

    function Fh(a) {
        a = a = {timestamp: Eh(a)};
        a.timestamp = a.timestamp || (new Date).getTime();
        return a
    }

    h.Dd = function (a, b, c, d) {
        this.hd++;
        var e = new S(a);
        b = this.ye ? this.ye(a, b) : b;
        a = [];
        d ? c ? (b = wd(b, function (a) {
            return O(a)
        }), a = sh(this.N, e, b, d)) : (b = O(b), a = ph(this.N, e, b, d)) : c ? (d = wd(b, function (a) {
            return O(a)
        }), a = oh(this.N, e, d)) : (d = O(b), a = lh(this.N, new ch(ih, e, d)));
        d = e;
        0 < a.length && (d = Gh(this, e));
        lf(this.ba, d, a)
    };
    h.Bd = function (a) {
        Dh(this, "connected", a);
        !1 === a && Hh(this)
    };
    h.Ie = function (a) {
        var b = this;
        zb(a, function (a, d) {
            Dh(b, d, a)
        })
    };
    h.Fe = function (a) {
        Dh(this, "authenticated", a)
    };
    function Dh(a, b, c) {
        b = new S("/.info/" + b);
        c = O(c);
        var d = a.xe;
        d.Od = d.Od.D(b, c);
        c = lh(a.rd, new ch(ih, b, c));
        lf(a.ba, b, c)
    }

    h.Cb = function (a, b, c, d) {
        this.f("set", {path: a.toString(), value: b, Ig: c});
        var e = Fh(this);
        b = O(b, c);
        var e = Xf(b, e), f = this.Ad++, e = kh(this.N, a, e, f, !0);
        hf(this.ba, e);
        var g = this;
        this.S.put(a.toString(), b.I(!0), function (b, c) {
            var e = "ok" === b;
            e || z("set at " + a + " failed: " + b);
            e = nh(g.N, f, !e);
            lf(g.ba, a, e);
            Ih(d, b, c)
        });
        e = Jh(this, a);
        Gh(this, e);
        lf(this.ba, e, [])
    };
    h.update = function (a, b, c) {
        this.f("update", {path: a.toString(), value: b});
        var d = !0, e = Fh(this), f = {};
        A(b, function (a, b) {
            d = !1;
            var c = O(a);
            f[b] = Xf(c, e)
        });
        if (d)hb("update() called with empty data.  Don't do anything."), Ih(c, "ok"); else {
            var g = this.Ad++, k = mh(this.N, a, f, g);
            hf(this.ba, k);
            var l = this;
            Ye(this.S, a.toString(), b, function (b, d) {
                y("ok" === b || "permission_denied" === b, "merge at " + a + " failed.");
                var e = "ok" === b;
                e || z("update at " + a + " failed: " + b);
                var e = nh(l.N, g, !e), f = a;
                0 < e.length && (f = Gh(l, a));
                lf(l.ba, f, e);
                Ih(c, b,
                    d)
            });
            b = Jh(this, a);
            Gh(this, b);
            lf(this.ba, a, [])
        }
    };
    function Hh(a) {
        a.f("onDisconnectEvents");
        var b = Fh(a), c = [];
        ef(Wf(a.ga, b), U, function (b, e) {
            c = c.concat(lh(a.N, new ch(ih, b, e)));
            var f = Jh(a, b);
            Gh(a, f)
        });
        a.ga = new cf;
        lf(a.ba, U, c)
    }

    h.Ge = function (a, b) {
        var c = this;
        this.S.Ge(a.toString(), function (d, e) {
            "ok" === d && df(c.ga, a);
            Ih(b, d, e)
        })
    };
    function Kh(a, b, c, d) {
        var e = O(c);
        Ue(a.S, b.toString(), e.I(!0), function (c, g) {
            "ok" === c && a.ga.ec(b, e);
            Ih(d, c, g)
        })
    }

    function Lh(a, b, c, d, e) {
        var f = O(c, d);
        Ue(a.S, b.toString(), f.I(!0), function (c, d) {
            "ok" === c && a.ga.ec(b, f);
            Ih(e, c, d)
        })
    }

    function Mh(a, b, c, d) {
        var e = !0, f;
        for (f in c)e = !1;
        e ? (hb("onDisconnect().update() called with empty data.  Don't do anything."), Ih(d, "ok")) : We(a.S, b.toString(), c, function (e, f) {
            if ("ok" === e)for (var l in c) {
                var n = O(c[l]);
                a.ga.ec(b.u(l), n)
            }
            Ih(d, e, f)
        })
    }

    function Rc(a, b, c) {
        c = ".info" === I(b.path) ? a.rd.Gb(b, c) : a.N.Gb(b, c);
        Sc(a.ba, b.path, c)
    }

    h.qb = function () {
        this.S.qb()
    };
    h.ic = function () {
        this.S.ic()
    };
    h.Re = function (a) {
        if ("undefined" !== typeof console) {
            a ? (this.Ud || (this.Ud = new Vd(this.Ra)), a = this.Ud.get()) : a = this.Ra.get();
            var b = Ka(Md(a), function (a, b) {
                return Math.max(b.length, a)
            }, 0), c;
            for (c in a) {
                for (var d = a[c], e = c.length; e < b + 2; e++)c += " ";
                console.log(c + d)
            }
        }
    };
    h.Se = function (a) {
        Ud(this.Ra, a);
        this.Ag.zf[a] = !0
    };
    h.f = function (a) {
        hb("r:" + this.S.id + ":", arguments)
    };
    function Ih(a, b, c) {
        a && Cb(function () {
            if ("ok" == b)a(null); else {
                var d = (b || "error").toUpperCase(), e = d;
                c && (e += ": " + c);
                e = Error(e);
                e.code = d;
                a(e)
            }
        })
    };
    function Nh(a, b, c, d, e) {
        function f() {
        }

        a.f("transaction on " + b);
        var g = new R(a, b);
        g.wb("value", f);
        c = {
            path: b, update: c, H: d, status: null, qf: eb(), We: e, xf: 0, be: function () {
                g.$b("value", f)
            }, ee: null, ya: null, ed: null, fd: null, gd: null
        };
        d = a.N.pa(b, void 0) || M;
        c.ed = d;
        d = c.update(d.I());
        if (m(d)) {
            Sb("transaction failed: Data returned ", d);
            c.status = 1;
            e = Xc(a.mc, b);
            var k = e.za() || [];
            k.push(c);
            Yc(e, k);
            "object" === typeof d && null !== d && s(d, ".priority") ? (k = t(d, ".priority"), y(Qb(k), "Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")) :
                k = (a.N.pa(b) || M).L().I();
            e = Fh(a);
            d = O(d, k);
            e = Xf(d, e);
            c.fd = d;
            c.gd = e;
            c.ya = a.Ad++;
            c = kh(a.N, b, e, c.ya, c.We);
            lf(a.ba, b, c);
            Oh(a)
        } else c.be(), c.fd = null, c.gd = null, c.H && (a = new D(c.ed, new R(a, c.path), L), c.H(null, !1, a))
    }

    function Oh(a, b) {
        var c = b || a.mc;
        b || Ph(a, c);
        if (null !== c.za()) {
            var d = Qh(a, c);
            y(0 < d.length, "Sending zero length transaction queue");
            La(d, function (a) {
                return 1 === a.status
            }) && Rh(a, c.path(), d)
        } else c.md() && c.U(function (b) {
            Oh(a, b)
        })
    }

    function Rh(a, b, c) {
        for (var d = Ja(c, function (a) {
            return a.ya
        }), e = a.N.pa(b, d) || M, d = e, e = e.hash(), f = 0; f < c.length; f++) {
            var g = c[f];
            y(1 === g.status, "tryToSendTransactionQueue_: items in queue should all be run.");
            g.status = 2;
            g.xf++;
            var k = V(b, g.path), d = d.D(k, g.fd)
        }
        d = d.I(!0);
        a.S.put(b.toString(), d, function (d) {
            a.f("transaction put response", {path: b.toString(), status: d});
            var e = [];
            if ("ok" === d) {
                d = [];
                for (f = 0; f < c.length; f++) {
                    c[f].status = 3;
                    e = e.concat(nh(a.N, c[f].ya));
                    if (c[f].H) {
                        var g = c[f].gd, k = new R(a, c[f].path);
                        d.push(q(c[f].H,
                            null, null, !0, new D(g, k, L)))
                    }
                    c[f].be()
                }
                Ph(a, Xc(a.mc, b));
                Oh(a);
                lf(a.ba, b, e);
                for (f = 0; f < d.length; f++)Cb(d[f])
            } else {
                if ("datastale" === d)for (f = 0; f < c.length; f++)c[f].status = 4 === c[f].status ? 5 : 1; else for (z("transaction at " + b.toString() + " failed: " + d), f = 0; f < c.length; f++)c[f].status = 5, c[f].ee = d;
                Gh(a, b)
            }
        }, e)
    }

    function Gh(a, b) {
        var c = Sh(a, b), d = c.path(), c = Qh(a, c);
        Th(a, c, d);
        return d
    }

    function Th(a, b, c) {
        if (0 !== b.length) {
            for (var d = [], e = [], f = Ja(b, function (a) {
                return a.ya
            }), g = 0; g < b.length; g++) {
                var k = b[g], l = V(c, k.path), n = !1, u;
                y(null !== l, "rerunTransactionsUnderNode_: relativePath should not be null.");
                if (5 === k.status)n = !0, u = k.ee, e = e.concat(nh(a.N, k.ya, !0)); else if (1 === k.status)if (25 <= k.xf)n = !0, u = "maxretry", e = e.concat(nh(a.N, k.ya, !0)); else {
                    var x = a.N.pa(k.path, f) || M;
                    k.ed = x;
                    var F = b[g].update(x.I());
                    m(F) ? (Sb("transaction failed: Data returned ", F), l = O(F), "object" === typeof F && null != F && s(F,
                        ".priority") || (l = l.$(x.L())), x = k.ya, F = Fh(a), F = Xf(l, F), k.fd = l, k.gd = F, k.ya = a.Ad++, Oa(f, x), e = e.concat(kh(a.N, k.path, F, k.ya, k.We)), e = e.concat(nh(a.N, x, !0))) : (n = !0, u = "nodata", e = e.concat(nh(a.N, k.ya, !0)))
                }
                lf(a.ba, c, e);
                e = [];
                n && (b[g].status = 3, setTimeout(b[g].be, Math.floor(0)), b[g].H && ("nodata" === u ? (k = new R(a, b[g].path), d.push(q(b[g].H, null, null, !1, new D(b[g].ed, k, L)))) : d.push(q(b[g].H, null, Error(u), !1, null))))
            }
            Ph(a, a.mc);
            for (g = 0; g < d.length; g++)Cb(d[g]);
            Oh(a)
        }
    }

    function Sh(a, b) {
        for (var c, d = a.mc; null !== (c = I(b)) && null === d.za();)d = Xc(d, c), b = T(b);
        return d
    }

    function Qh(a, b) {
        var c = [];
        Uh(a, b, c);
        c.sort(function (a, b) {
            return a.qf - b.qf
        });
        return c
    }

    function Uh(a, b, c) {
        var d = b.za();
        if (null !== d)for (var e = 0; e < d.length; e++)c.push(d[e]);
        b.U(function (b) {
            Uh(a, b, c)
        })
    }

    function Ph(a, b) {
        var c = b.za();
        if (c) {
            for (var d = 0, e = 0; e < c.length; e++)3 !== c[e].status && (c[d] = c[e], d++);
            c.length = d;
            Yc(b, 0 < c.length ? c : null)
        }
        b.U(function (b) {
            Ph(a, b)
        })
    }

    function Jh(a, b) {
        var c = Sh(a, b).path(), d = Xc(a.mc, b);
        ad(d, function (b) {
            Vh(a, b)
        });
        Vh(a, d);
        $c(d, function (b) {
            Vh(a, b)
        });
        return c
    }

    function Vh(a, b) {
        var c = b.za();
        if (null !== c) {
            for (var d = [], e = [], f = -1, g = 0; g < c.length; g++)4 !== c[g].status && (2 === c[g].status ? (y(f === g - 1, "All SENT items should be at beginning of queue."), f = g, c[g].status = 4, c[g].ee = "set") : (y(1 === c[g].status, "Unexpected transaction status in abort"), c[g].be(), e = e.concat(nh(a.N, c[g].ya, !0)), c[g].H && d.push(q(c[g].H, null, Error("set"), !1, null))));
            -1 === f ? Yc(b, null) : c.length = f + 1;
            lf(a.ba, b.path(), e);
            for (g = 0; g < d.length; g++)Cb(d[g])
        }
    };
    function Wh() {
        this.fc = {}
    }

    ca(Wh);
    Wh.prototype.qb = function () {
        for (var a in this.fc)this.fc[a].qb()
    };
    Wh.prototype.interrupt = Wh.prototype.qb;
    Wh.prototype.ic = function () {
        for (var a in this.fc)this.fc[a].ic()
    };
    Wh.prototype.resume = Wh.prototype.ic;
    function Xh(a) {
        var b = this;
        this.sc = a;
        this.Xd = "*";
        Af() ? this.Hc = this.pd = rf() : (this.Hc = window.opener, this.pd = window);
        if (!b.Hc)throw"Unable to find relay frame";
        sf(this.pd, "message", q(this.ac, this));
        sf(this.pd, "message", q(this.nf, this));
        try {
            Yh(this, {a: "ready"})
        } catch (c) {
            sf(this.Hc, "load", function () {
                Yh(b, {a: "ready"})
            })
        }
        sf(window, "unload", q(this.jg, this))
    }

    function Yh(a, b) {
        b = r(b);
        Af() ? a.Hc.doPost(b, a.Xd) : a.Hc.postMessage(b, a.Xd)
    }

    Xh.prototype.ac = function (a) {
        var b = this, c;
        try {
            c = ta(a.data)
        } catch (d) {
        }
        c && "request" === c.a && (tf(window, "message", this.ac), this.Xd = a.origin, this.sc && setTimeout(function () {
            b.sc(b.Xd, c.d, function (a, c) {
                b.Mf = !c;
                b.sc = void 0;
                Yh(b, {a: "response", d: a, forceKeepWindowOpen: c})
            })
        }, 0))
    };
    Xh.prototype.jg = function () {
        try {
            tf(this.pd, "message", this.nf)
        } catch (a) {
        }
        this.sc && (Yh(this, {a: "error", d: "unknown closed window"}), this.sc = void 0);
        try {
            window.close()
        } catch (b) {
        }
    };
    Xh.prototype.nf = function (a) {
        if (this.Mf && "die" === a.data)try {
            window.close()
        } catch (b) {
        }
    };
    var Y = {
        Xf: function () {
            le = ce = !0
        }
    };
    Y.forceLongPolling = Y.Xf;
    Y.Yf = function () {
        me = !0
    };
    Y.forceWebSockets = Y.Yf;
    Y.xg = function (a, b) {
        a.k.S.Pe = b
    };
    Y.setSecurityDebugCallback = Y.xg;
    Y.Re = function (a, b) {
        a.k.Re(b)
    };
    Y.stats = Y.Re;
    Y.Se = function (a, b) {
        a.k.Se(b)
    };
    Y.statsIncrementCounter = Y.Se;
    Y.hd = function (a) {
        return a.k.hd
    };
    Y.dataUpdateCount = Y.hd;
    Y.ag = function (a, b) {
        a.k.ye = b
    };
    Y.interceptServerData = Y.ag;
    Y.gg = function (a) {
        new Xh(a)
    };
    Y.onPopupOpen = Y.gg;
    Y.vg = function (a) {
        mf = a
    };
    Y.setAuthenticationServer = Y.vg;
    function Z(a, b) {
        this.Rc = a;
        this.Ea = b
    }

    Z.prototype.cancel = function (a) {
        E("Firebase.onDisconnect().cancel", 0, 1, arguments.length);
        H("Firebase.onDisconnect().cancel", 1, a, !0);
        this.Rc.Ge(this.Ea, a || null)
    };
    Z.prototype.cancel = Z.prototype.cancel;
    Z.prototype.remove = function (a) {
        E("Firebase.onDisconnect().remove", 0, 1, arguments.length);
        Zb("Firebase.onDisconnect().remove", this.Ea);
        H("Firebase.onDisconnect().remove", 1, a, !0);
        Kh(this.Rc, this.Ea, null, a)
    };
    Z.prototype.remove = Z.prototype.remove;
    Z.prototype.set = function (a, b) {
        E("Firebase.onDisconnect().set", 1, 2, arguments.length);
        Zb("Firebase.onDisconnect().set", this.Ea);
        Rb("Firebase.onDisconnect().set", a, !1);
        H("Firebase.onDisconnect().set", 2, b, !0);
        Kh(this.Rc, this.Ea, a, b)
    };
    Z.prototype.set = Z.prototype.set;
    Z.prototype.Cb = function (a, b, c) {
        E("Firebase.onDisconnect().setWithPriority", 2, 3, arguments.length);
        Zb("Firebase.onDisconnect().setWithPriority", this.Ea);
        Rb("Firebase.onDisconnect().setWithPriority", a, !1);
        Vb("Firebase.onDisconnect().setWithPriority", 2, b);
        H("Firebase.onDisconnect().setWithPriority", 3, c, !0);
        Lh(this.Rc, this.Ea, a, b, c)
    };
    Z.prototype.setWithPriority = Z.prototype.Cb;
    Z.prototype.update = function (a, b) {
        E("Firebase.onDisconnect().update", 1, 2, arguments.length);
        Zb("Firebase.onDisconnect().update", this.Ea);
        if (ea(a)) {
            for (var c = {}, d = 0; d < a.length; ++d)c["" + d] = a[d];
            a = c;
            z("Passing an Array to Firebase.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")
        }
        Ub("Firebase.onDisconnect().update", a);
        H("Firebase.onDisconnect().update", 2, b, !0);
        Mh(this.Rc,
            this.Ea, a, b)
    };
    Z.prototype.update = Z.prototype.update;
    var $ = {};
    $.oc = Me;
    $.DataConnection = $.oc;
    Me.prototype.zg = function (a, b) {
        this.Ba("q", {p: a}, b)
    };
    $.oc.prototype.simpleListen = $.oc.prototype.zg;
    Me.prototype.Sf = function (a, b) {
        this.Ba("echo", {d: a}, b)
    };
    $.oc.prototype.echo = $.oc.prototype.Sf;
    Me.prototype.interrupt = Me.prototype.qb;
    $.Df = we;
    $.RealTimeConnection = $.Df;
    we.prototype.sendRequest = we.prototype.Ba;
    we.prototype.close = we.prototype.close;
    $.$f = function (a) {
        var b = Me.prototype.put;
        Me.prototype.put = function (c, d, e, f) {
            m(f) && (f = a());
            b.call(this, c, d, e, f)
        };
        return function () {
            Me.prototype.put = b
        }
    };
    $.hijackHash = $.$f;
    $.Cf = Aa;
    $.ConnectionTarget = $.Cf;
    $.Fa = function (a) {
        return a.Fa()
    };
    $.queryIdentifier = $.Fa;
    $.bg = function (a) {
        return a.k.S.ta
    };
    $.listens = $.bg;
    var Zh = function () {
        var a = 0, b = [];
        return function (c) {
            var d = c === a;
            a = c;
            for (var e = Array(8), f = 7; 0 <= f; f--)e[f] = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c % 64), c = Math.floor(c / 64);
            y(0 === c, "Cannot push at time == 0");
            c = e.join("");
            if (d) {
                for (f = 11; 0 <= f && 63 === b[f]; f--)b[f] = 0;
                b[f]++
            } else for (f = 0; 12 > f; f++)b[f] = Math.floor(64 * Math.random());
            for (f = 0; 12 > f; f++)c += "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);
            y(20 === c.length, "NextPushId: Length should be 20.");
            return c
        }
    }();

    function R(a, b) {
        var c, d, e;
        if (a instanceof Ch)c = a, d = b; else {
            E("new Firebase", 1, 2, arguments.length);
            d = rb(arguments[0]);
            c = d.Bg;
            "firebase" === d.domain && qb(d.host + " is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead");
            c || qb("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com");
            d.Bb || "undefined" !== typeof window && window.location && window.location.protocol && -1 !== window.location.protocol.indexOf("https:") && z("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");
            c = new Aa(d.host, d.Bb, c, "ws" === d.scheme || "wss" === d.scheme);
            d = new S(d.Pc);
            e = d.toString();
            var f;
            !(f = !p(c.host) || 0 === c.host.length || !Pb(c.ub)) && (f = 0 !== e.length) && (e && (e = e.replace(/^\/*\.info(\/|$)/, "/")), f = !(p(e) && 0 !== e.length && !Ob.test(e)));
            if (f)throw Error(G("new Firebase", 1, !1) + 'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".');
            if (b)if (b instanceof Wh)e = b; else if (p(b))e = Wh.Ob(), c.Id = b; else throw Error("Expected a valid Firebase.Context for second argument to new Firebase()");
            else e = Wh.Ob();
            f = c.toString();
            var g = t(e.fc, f);
            g || (g = new Ch(c), e.fc[f] = g);
            c = g
        }
        Q.call(this, c, d, Ic, !1)
    }

    ma(R, Q);
    var $h = R, ai = ["Firebase"], bi = aa;
    ai[0]in bi || !bi.execScript || bi.execScript("var " + ai[0]);
    for (var ci; ai.length && (ci = ai.shift());)!ai.length && m($h) ? bi[ci] = $h : bi = bi[ci] ? bi[ci] : bi[ci] = {};
    R.prototype.name = function () {
        z("Firebase.name() being deprecated. Please use Firebase.key() instead.");
        E("Firebase.name", 0, 0, arguments.length);
        return this.key()
    };
    R.prototype.name = R.prototype.name;
    R.prototype.key = function () {
        E("Firebase.key", 0, 0, arguments.length);
        return this.path.e() ? null : Uc(this.path)
    };
    R.prototype.key = R.prototype.key;
    R.prototype.u = function (a) {
        E("Firebase.child", 1, 1, arguments.length);
        if (ga(a))a = String(a); else if (!(a instanceof S))if (null === I(this.path)) {
            var b = a;
            b && (b = b.replace(/^\/*\.info(\/|$)/, "/"));
            Yb("Firebase.child", b)
        } else Yb("Firebase.child", a);
        return new R(this.k, this.path.u(a))
    };
    R.prototype.child = R.prototype.u;
    R.prototype.parent = function () {
        E("Firebase.parent", 0, 0, arguments.length);
        var a = this.path.parent();
        return null === a ? null : new R(this.k, a)
    };
    R.prototype.parent = R.prototype.parent;
    R.prototype.root = function () {
        E("Firebase.ref", 0, 0, arguments.length);
        for (var a = this; null !== a.parent();)a = a.parent();
        return a
    };
    R.prototype.root = R.prototype.root;
    R.prototype.toString = function () {
        E("Firebase.toString", 0, 0, arguments.length);
        var a;
        if (null === this.parent())a = this.k.toString(); else {
            a = this.parent().toString() + "/";
            var b = this.key();
            a += encodeURIComponent(String(b))
        }
        return a
    };
    R.prototype.toString = R.prototype.toString;
    R.prototype.set = function (a, b) {
        E("Firebase.set", 1, 2, arguments.length);
        Zb("Firebase.set", this.path);
        Rb("Firebase.set", a, !1);
        H("Firebase.set", 2, b, !0);
        this.k.Cb(this.path, a, null, b || null)
    };
    R.prototype.set = R.prototype.set;
    R.prototype.update = function (a, b) {
        E("Firebase.update", 1, 2, arguments.length);
        Zb("Firebase.update", this.path);
        if (ea(a)) {
            for (var c = {}, d = 0; d < a.length; ++d)c["" + d] = a[d];
            a = c;
            z("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.")
        }
        Ub("Firebase.update", a);
        H("Firebase.update", 2, b, !0);
        this.k.update(this.path, a, b || null)
    };
    R.prototype.update = R.prototype.update;
    R.prototype.Cb = function (a, b, c) {
        E("Firebase.setWithPriority", 2, 3, arguments.length);
        Zb("Firebase.setWithPriority", this.path);
        Rb("Firebase.setWithPriority", a, !1);
        Vb("Firebase.setWithPriority", 2, b);
        H("Firebase.setWithPriority", 3, c, !0);
        if (".length" === this.key() || ".keys" === this.key())throw"Firebase.setWithPriority failed: " + this.key() + " is a read-only object.";
        this.k.Cb(this.path, a, b, c || null)
    };
    R.prototype.setWithPriority = R.prototype.Cb;
    R.prototype.remove = function (a) {
        E("Firebase.remove", 0, 1, arguments.length);
        Zb("Firebase.remove", this.path);
        H("Firebase.remove", 1, a, !0);
        this.set(null, a)
    };
    R.prototype.remove = R.prototype.remove;
    R.prototype.transaction = function (a, b, c) {
        E("Firebase.transaction", 1, 3, arguments.length);
        Zb("Firebase.transaction", this.path);
        H("Firebase.transaction", 1, a, !1);
        H("Firebase.transaction", 2, b, !0);
        if (m(c) && "boolean" != typeof c)throw Error(G("Firebase.transaction", 3, !0) + "must be a boolean.");
        if (".length" === this.key() || ".keys" === this.key())throw"Firebase.transaction failed: " + this.key() + " is a read-only object.";
        "undefined" === typeof c && (c = !0);
        Nh(this.k, this.path, a, b || null, c)
    };
    R.prototype.transaction = R.prototype.transaction;
    R.prototype.wg = function (a, b) {
        E("Firebase.setPriority", 1, 2, arguments.length);
        Zb("Firebase.setPriority", this.path);
        Vb("Firebase.setPriority", 1, a);
        H("Firebase.setPriority", 2, b, !0);
        this.k.Cb(this.path.u(".priority"), a, null, b)
    };
    R.prototype.setPriority = R.prototype.wg;
    R.prototype.push = function (a, b) {
        E("Firebase.push", 0, 2, arguments.length);
        Zb("Firebase.push", this.path);
        Rb("Firebase.push", a, !0);
        H("Firebase.push", 2, b, !0);
        var c = Eh(this.k), c = Zh(c), c = this.u(c);
        "undefined" !== typeof a && null !== a && c.set(a, b);
        return c
    };
    R.prototype.push = R.prototype.push;
    R.prototype.fb = function () {
        Zb("Firebase.onDisconnect", this.path);
        return new Z(this.k, this.path)
    };
    R.prototype.onDisconnect = R.prototype.fb;
    R.prototype.Q = function (a, b, c) {
        z("FirebaseRef.auth() being deprecated. Please use FirebaseRef.authWithCustomToken() instead.");
        E("Firebase.auth", 1, 3, arguments.length);
        $b("Firebase.auth", a);
        H("Firebase.auth", 2, b, !0);
        H("Firebase.auth", 3, b, !0);
        Of(this.k.Q, a, {}, {remember: "none"}, b, c)
    };
    R.prototype.auth = R.prototype.Q;
    R.prototype.Ve = function (a) {
        E("Firebase.unauth", 0, 1, arguments.length);
        H("Firebase.unauth", 1, a, !0);
        Pf(this.k.Q, a)
    };
    R.prototype.unauth = R.prototype.Ve;
    R.prototype.re = function () {
        E("Firebase.getAuth", 0, 0, arguments.length);
        return this.k.Q.re()
    };
    R.prototype.getAuth = R.prototype.re;
    R.prototype.fg = function (a, b) {
        E("Firebase.onAuth", 1, 2, arguments.length);
        H("Firebase.onAuth", 1, a, !1);
        Mb("Firebase.onAuth", 2, b);
        this.k.Q.wb("auth_status", a, b)
    };
    R.prototype.onAuth = R.prototype.fg;
    R.prototype.eg = function (a, b) {
        E("Firebase.offAuth", 1, 2, arguments.length);
        H("Firebase.offAuth", 1, a, !1);
        Mb("Firebase.offAuth", 2, b);
        this.k.Q.$b("auth_status", a, b)
    };
    R.prototype.offAuth = R.prototype.eg;
    R.prototype.Hf = function (a, b, c) {
        E("Firebase.authWithCustomToken", 2, 3, arguments.length);
        $b("Firebase.authWithCustomToken", a);
        H("Firebase.authWithCustomToken", 2, b, !1);
        J("Firebase.authWithCustomToken", 3, c, !0);
        Of(this.k.Q, a, {}, c || {}, b)
    };
    R.prototype.authWithCustomToken = R.prototype.Hf;
    R.prototype.If = function (a, b, c) {
        E("Firebase.authWithOAuthPopup", 2, 3, arguments.length);
        ac("Firebase.authWithOAuthPopup", 1, a);
        H("Firebase.authWithOAuthPopup", 2, b, !1);
        J("Firebase.authWithOAuthPopup", 3, c, !0);
        Tf(this.k.Q, a, c, b)
    };
    R.prototype.authWithOAuthPopup = R.prototype.If;
    R.prototype.Jf = function (a, b, c) {
        E("Firebase.authWithOAuthRedirect", 2, 3, arguments.length);
        ac("Firebase.authWithOAuthRedirect", 1, a);
        H("Firebase.authWithOAuthRedirect", 2, b, !1);
        J("Firebase.authWithOAuthRedirect", 3, c, !0);
        var d = this.k.Q;
        Rf(d);
        var e = [Hf], f = pf(c);
        "anonymous" === a || "firebase" === a ? B(b, X("TRANSPORT_UNAVAILABLE")) : (v.set("redirect_client_options", f.cd), Sf(d, e, "/auth/" + a, f, b))
    };
    R.prototype.authWithOAuthRedirect = R.prototype.Jf;
    R.prototype.Kf = function (a, b, c, d) {
        E("Firebase.authWithOAuthToken", 3, 4, arguments.length);
        ac("Firebase.authWithOAuthToken", 1, a);
        H("Firebase.authWithOAuthToken", 3, c, !1);
        J("Firebase.authWithOAuthToken", 4, d, !0);
        p(b) ? (ac("Firebase.authWithOAuthToken", 2, b), Qf(this.k.Q, a + "/token", {access_token: b}, d, c)) : (J("Firebase.authWithOAuthToken", 2, b, !1), Qf(this.k.Q, a + "/token", b, d, c))
    };
    R.prototype.authWithOAuthToken = R.prototype.Kf;
    R.prototype.Gf = function (a, b) {
        E("Firebase.authAnonymously", 1, 2, arguments.length);
        H("Firebase.authAnonymously", 1, a, !1);
        J("Firebase.authAnonymously", 2, b, !0);
        Qf(this.k.Q, "anonymous", {}, b, a)
    };
    R.prototype.authAnonymously = R.prototype.Gf;
    R.prototype.Lf = function (a, b, c) {
        E("Firebase.authWithPassword", 2, 3, arguments.length);
        J("Firebase.authWithPassword", 1, a, !1);
        K("Firebase.authWithPassword", a, "email");
        K("Firebase.authWithPassword", a, "password");
        H("Firebase.authAnonymously", 2, b, !1);
        J("Firebase.authAnonymously", 3, c, !0);
        Qf(this.k.Q, "password", a, c, b)
    };
    R.prototype.authWithPassword = R.prototype.Lf;
    R.prototype.ne = function (a, b) {
        E("Firebase.createUser", 2, 2, arguments.length);
        J("Firebase.createUser", 1, a, !1);
        K("Firebase.createUser", a, "email");
        K("Firebase.createUser", a, "password");
        H("Firebase.createUser", 2, b, !1);
        this.k.Q.ne(a, b)
    };
    R.prototype.createUser = R.prototype.ne;
    R.prototype.Me = function (a, b) {
        E("Firebase.removeUser", 2, 2, arguments.length);
        J("Firebase.removeUser", 1, a, !1);
        K("Firebase.removeUser", a, "email");
        K("Firebase.removeUser", a, "password");
        H("Firebase.removeUser", 2, b, !1);
        this.k.Q.Me(a, b)
    };
    R.prototype.removeUser = R.prototype.Me;
    R.prototype.je = function (a, b) {
        E("Firebase.changePassword", 2, 2, arguments.length);
        J("Firebase.changePassword", 1, a, !1);
        K("Firebase.changePassword", a, "email");
        K("Firebase.changePassword", a, "oldPassword");
        K("Firebase.changePassword", a, "newPassword");
        H("Firebase.changePassword", 2, b, !1);
        this.k.Q.je(a, b)
    };
    R.prototype.changePassword = R.prototype.je;
    R.prototype.ie = function (a, b) {
        E("Firebase.changeEmail", 2, 2, arguments.length);
        J("Firebase.changeEmail", 1, a, !1);
        K("Firebase.changeEmail", a, "oldEmail");
        K("Firebase.changeEmail", a, "newEmail");
        K("Firebase.changeEmail", a, "password");
        H("Firebase.changeEmail", 2, b, !1);
        this.k.Q.ie(a, b)
    };
    R.prototype.changeEmail = R.prototype.ie;
    R.prototype.Ne = function (a, b) {
        E("Firebase.resetPassword", 2, 2, arguments.length);
        J("Firebase.resetPassword", 1, a, !1);
        K("Firebase.resetPassword", a, "email");
        H("Firebase.resetPassword", 2, b, !1);
        this.k.Q.Ne(a, b)
    };
    R.prototype.resetPassword = R.prototype.Ne;
    R.goOffline = function () {
        E("Firebase.goOffline", 0, 0, arguments.length);
        Wh.Ob().qb()
    };
    R.goOnline = function () {
        E("Firebase.goOnline", 0, 0, arguments.length);
        Wh.Ob().ic()
    };
    function nb(a, b) {
        y(!b || !0 === a || !1 === a, "Can't turn on custom loggers persistently.");
        !0 === a ? ("undefined" !== typeof console && ("function" === typeof console.log ? lb = q(console.log, console) : "object" === typeof console.log && (lb = function (a) {
            console.log(a)
        })), b && v.set("logging_enabled", !0)) : a ? lb = a : (lb = null, v.remove("logging_enabled"))
    }

    R.enableLogging = nb;
    R.ServerValue = {TIMESTAMP: {".sv": "timestamp"}};
    R.SDK_VERSION = "2.2.0";
    R.INTERNAL = Y;
    R.Context = Wh;
    R.TEST_ACCESS = $;
})();
