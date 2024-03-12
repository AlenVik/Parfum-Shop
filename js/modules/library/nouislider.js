function noUslierFunc(t) { var e, r; e = this, r = function (t) { "use strict"; var e, r; function n(t) { return "object" == typeof t && "function" == typeof t.to } function i(t) { t.parentElement.removeChild(t) } function o(t) { return null != t } function s(t) { t.preventDefault() } function a(t) { return "number" == typeof t && !isNaN(t) && isFinite(t) } function l(t, e, r) { r > 0 && (f(t, e), setTimeout((function () { d(t, e) }), r)) } function u(t) { return Math.max(Math.min(t, 100), 0) } function c(t) { return Array.isArray(t) ? t : [t] } function p(t) { var e = (t = String(t)).split("."); return e.length > 1 ? e[1].length : 0 } function f(t, e) { t.classList && !/\s/.test(e) ? t.classList.add(e) : t.className += " " + e } function d(t, e) { t.classList && !/\s/.test(e) ? t.classList.remove(e) : t.className = t.className.replace(new RegExp("(^|\\b)" + e.split(" ").join("|") + "(\\b|$)", "gi"), " ") } function h(t) { var e = void 0 !== window.pageXOffset, r = "CSS1Compat" === (t.compatMode || ""); return { x: e ? window.pageXOffset : r ? t.documentElement.scrollLeft : t.body.scrollLeft, y: e ? window.pageYOffset : r ? t.documentElement.scrollTop : t.body.scrollTop } } function m(t, e) { return 100 / (e - t) } function g(t, e, r) { return 100 * e / (t[r + 1] - t[r]) } function v(t, e) { for (var r = 1; t >= e[r];)r += 1; return r } function b(t, e, r) { if (r >= t.slice(-1)[0]) return 100; var n = v(r, t), i = t[n - 1], o = t[n], s = e[n - 1], a = e[n]; return s + function (t, e) { return g(t, t[0] < 0 ? e + Math.abs(t[0]) : e - t[0], 0) }([i, o], r) / m(s, a) } function S(t, e, r, n) { if (100 === n) return n; var i = v(n, t), o = t[i - 1], s = t[i]; return r ? n - o > (s - o) / 2 ? s : o : e[i - 1] ? t[i - 1] + function (t, e) { return Math.round(t / e) * e }(n - t[i - 1], e[i - 1]) : n } t.PipsMode = void 0, (e = t.PipsMode || (t.PipsMode = {})).Range = "range", e.Steps = "steps", e.Positions = "positions", e.Count = "count", e.Values = "values", t.PipsType = void 0, (r = t.PipsType || (t.PipsType = {}))[r.None = -1] = "None", r[r.NoValue = 0] = "NoValue", r[r.LargeValue = 1] = "LargeValue", r[r.SmallValue = 2] = "SmallValue"; var x = function () { function t(t, e, r) { var n; this.xPct = [], this.xVal = [], this.xSteps = [], this.xNumSteps = [], this.xHighestCompleteStep = [], this.xSteps = [r || !1], this.xNumSteps = [!1], this.snap = e; var i = []; for (Object.keys(t).forEach((function (e) { i.push([c(t[e]), e]) })), i.sort((function (t, e) { return t[0][0] - e[0][0] })), n = 0; n < i.length; n++)this.handleEntryPoint(i[n][1], i[n][0]); for (this.xNumSteps = this.xSteps.slice(0), n = 0; n < this.xNumSteps.length; n++)this.handleStepPoint(n, this.xNumSteps[n]) } return t.prototype.getDistance = function (t) { for (var e = [], r = 0; r < this.xNumSteps.length - 1; r++)e[r] = g(this.xVal, t, r); return e }, t.prototype.getAbsoluteDistance = function (t, e, r) { var n, i = 0; if (t < this.xPct[this.xPct.length - 1]) for (; t > this.xPct[i + 1];)i++; else t === this.xPct[this.xPct.length - 1] && (i = this.xPct.length - 2); r || t !== this.xPct[i + 1] || i++, null === e && (e = []); var o = 1, s = e[i], a = 0, l = 0, u = 0, c = 0; for (n = r ? (t - this.xPct[i]) / (this.xPct[i + 1] - this.xPct[i]) : (this.xPct[i + 1] - t) / (this.xPct[i + 1] - this.xPct[i]); s > 0;)a = this.xPct[i + 1 + c] - this.xPct[i + c], e[i + c] * o + 100 - 100 * n > 100 ? (l = a * n, o = (s - 100 * n) / e[i + c], n = 1) : (l = e[i + c] * a / 100 * o, o = 0), r ? (u -= l, this.xPct.length + c >= 1 && c--) : (u += l, this.xPct.length - c >= 1 && c++), s = e[i + c] * o; return t + u }, t.prototype.toStepping = function (t) { return t = b(this.xVal, this.xPct, t) }, t.prototype.fromStepping = function (t) { return function (t, e, r) { if (r >= 100) return t.slice(-1)[0]; var n = v(r, e), i = t[n - 1], o = t[n], s = e[n - 1]; return function (t, e) { return e * (t[1] - t[0]) / 100 + t[0] }([i, o], (r - s) * m(s, e[n])) }(this.xVal, this.xPct, t) }, t.prototype.getStep = function (t) { return t = S(this.xPct, this.xSteps, this.snap, t) }, t.prototype.getDefaultStep = function (t, e, r) { var n = v(t, this.xPct); return (100 === t || e && t === this.xPct[n - 1]) && (n = Math.max(n - 1, 1)), (this.xVal[n] - this.xVal[n - 1]) / r }, t.prototype.getNearbySteps = function (t) { var e = v(t, this.xPct); return { stepBefore: { startValue: this.xVal[e - 2], step: this.xNumSteps[e - 2], highestStep: this.xHighestCompleteStep[e - 2] }, thisStep: { startValue: this.xVal[e - 1], step: this.xNumSteps[e - 1], highestStep: this.xHighestCompleteStep[e - 1] }, stepAfter: { startValue: this.xVal[e], step: this.xNumSteps[e], highestStep: this.xHighestCompleteStep[e] } } }, t.prototype.countStepDecimals = function () { var t = this.xNumSteps.map(p); return Math.max.apply(null, t) }, t.prototype.hasNoSize = function () { return this.xVal[0] === this.xVal[this.xVal.length - 1] }, t.prototype.convert = function (t) { return this.getStep(this.toStepping(t)) }, t.prototype.handleEntryPoint = function (t, e) { var r; if (!a(r = "min" === t ? 0 : "max" === t ? 100 : parseFloat(t)) || !a(e[0])) throw new Error("noUiSlider: 'range' value isn't numeric."); this.xPct.push(r), this.xVal.push(e[0]); var n = Number(e[1]); r ? this.xSteps.push(!isNaN(n) && n) : isNaN(n) || (this.xSteps[0] = n), this.xHighestCompleteStep.push(0) }, t.prototype.handleStepPoint = function (t, e) { if (e) if (this.xVal[t] !== this.xVal[t + 1]) { this.xSteps[t] = g([this.xVal[t], this.xVal[t + 1]], e, 0) / m(this.xPct[t], this.xPct[t + 1]); var r = (this.xVal[t + 1] - this.xVal[t]) / this.xNumSteps[t], n = Math.ceil(Number(r.toFixed(3)) - 1), i = this.xVal[t] + this.xNumSteps[t] * n; this.xHighestCompleteStep[t] = i } else this.xSteps[t] = this.xHighestCompleteStep[t] = this.xVal[t] }, t }(), y = { to: function (t) { return void 0 === t ? "" : t.toFixed(2) }, from: Number }, w = { target: "target", base: "base", origin: "origin", handle: "handle", handleLower: "handle-lower", handleUpper: "handle-upper", touchArea: "touch-area", horizontal: "horizontal", vertical: "vertical", background: "background", connect: "connect", connects: "connects", ltr: "ltr", rtl: "rtl", textDirectionLtr: "txt-dir-ltr", textDirectionRtl: "txt-dir-rtl", draggable: "draggable", drag: "state-drag", tap: "state-tap", active: "active", tooltip: "tooltip", pips: "pips", pipsHorizontal: "pips-horizontal", pipsVertical: "pips-vertical", marker: "marker", markerHorizontal: "marker-horizontal", markerVertical: "marker-vertical", markerNormal: "marker-normal", markerLarge: "marker-large", markerSub: "marker-sub", value: "value", valueHorizontal: "value-horizontal", valueVertical: "value-vertical", valueNormal: "value-normal", valueLarge: "value-large", valueSub: "value-sub" }, E = { tooltips: ".__tooltips", aria: ".__aria" }; function P(t, e) { if (!a(e)) throw new Error("noUiSlider: 'step' is not numeric."); t.singleStep = e } function C(t, e) { if (!a(e)) throw new Error("noUiSlider: 'keyboardPageMultiplier' is not numeric."); t.keyboardPageMultiplier = e } function N(t, e) { if (!a(e)) throw new Error("noUiSlider: 'keyboardMultiplier' is not numeric."); t.keyboardMultiplier = e } function V(t, e) { if (!a(e)) throw new Error("noUiSlider: 'keyboardDefaultStep' is not numeric."); t.keyboardDefaultStep = e } function A(t, e) { if ("object" != typeof e || Array.isArray(e)) throw new Error("noUiSlider: 'range' is not an object."); if (void 0 === e.min || void 0 === e.max) throw new Error("noUiSlider: Missing 'min' or 'max' in 'range'."); t.spectrum = new x(e, t.snap || !1, t.singleStep) } function k(t, e) { if (e = c(e), !Array.isArray(e) || !e.length) throw new Error("noUiSlider: 'start' option is incorrect."); t.handles = e.length, t.start = e } function M(t, e) { if ("boolean" != typeof e) throw new Error("noUiSlider: 'snap' option must be a boolean."); t.snap = e } function U(t, e) { if ("boolean" != typeof e) throw new Error("noUiSlider: 'animate' option must be a boolean."); t.animate = e } function D(t, e) { if ("number" != typeof e) throw new Error("noUiSlider: 'animationDuration' option must be a number."); t.animationDuration = e } function O(t, e) { var r, n = [!1]; if ("lower" === e ? e = [!0, !1] : "upper" === e && (e = [!1, !0]), !0 === e || !1 === e) { for (r = 1; r < t.handles; r++)n.push(e); n.push(!1) } else { if (!Array.isArray(e) || !e.length || e.length !== t.handles + 1) throw new Error("noUiSlider: 'connect' option doesn't match handle count."); n = e } t.connect = n } function L(t, e) { switch (e) { case "horizontal": t.ort = 0; break; case "vertical": t.ort = 1; break; default: throw new Error("noUiSlider: 'orientation' option is invalid.") } } function T(t, e) { if (!a(e)) throw new Error("noUiSlider: 'margin' option must be numeric."); 0 !== e && (t.margin = t.spectrum.getDistance(e)) } function j(t, e) { if (!a(e)) throw new Error("noUiSlider: 'limit' option must be numeric."); if (t.limit = t.spectrum.getDistance(e), !t.limit || t.handles < 2) throw new Error("noUiSlider: 'limit' option is only supported on linear sliders with 2 or more handles.") } function z(t, e) { var r; if (!a(e) && !Array.isArray(e)) throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers."); if (Array.isArray(e) && 2 !== e.length && !a(e[0]) && !a(e[1])) throw new Error("noUiSlider: 'padding' option must be numeric or array of exactly 2 numbers."); if (0 !== e) { for (Array.isArray(e) || (e = [e, e]), t.padding = [t.spectrum.getDistance(e[0]), t.spectrum.getDistance(e[1])], r = 0; r < t.spectrum.xNumSteps.length - 1; r++)if (t.padding[0][r] < 0 || t.padding[1][r] < 0) throw new Error("noUiSlider: 'padding' option must be a positive number(s)."); var n = e[0] + e[1], i = t.spectrum.xVal[0]; if (n / (t.spectrum.xVal[t.spectrum.xVal.length - 1] - i) > 1) throw new Error("noUiSlider: 'padding' option must not exceed 100% of the range.") } } function F(t, e) { switch (e) { case "ltr": t.dir = 0; break; case "rtl": t.dir = 1; break; default: throw new Error("noUiSlider: 'direction' option was not recognized.") } } function H(t, e) { if ("string" != typeof e) throw new Error("noUiSlider: 'behaviour' must be a string containing options."); var r = e.indexOf("tap") >= 0, n = e.indexOf("drag") >= 0, i = e.indexOf("fixed") >= 0, o = e.indexOf("snap") >= 0, s = e.indexOf("hover") >= 0, a = e.indexOf("unconstrained") >= 0, l = e.indexOf("drag-all") >= 0, u = e.indexOf("smooth-steps") >= 0; if (i) { if (2 !== t.handles) throw new Error("noUiSlider: 'fixed' behaviour must be used with 2 handles"); T(t, t.start[1] - t.start[0]) } if (a && (t.margin || t.limit)) throw new Error("noUiSlider: 'unconstrained' behaviour cannot be used with margin or limit"); t.events = { tap: r || o, drag: n, dragAll: l, smoothSteps: u, fixed: i, snap: o, hover: s, unconstrained: a } } function R(t, e) { if (!1 !== e) if (!0 === e || n(e)) { t.tooltips = []; for (var r = 0; r < t.handles; r++)t.tooltips.push(e) } else { if ((e = c(e)).length !== t.handles) throw new Error("noUiSlider: must pass a formatter for all handles."); e.forEach((function (t) { if ("boolean" != typeof t && !n(t)) throw new Error("noUiSlider: 'tooltips' must be passed a formatter or 'false'.") })), t.tooltips = e } } function _(t, e) { if (e.length !== t.handles) throw new Error("noUiSlider: must pass a attributes for all handles."); t.handleAttributes = e } function B(t, e) { if (!n(e)) throw new Error("noUiSlider: 'ariaFormat' requires 'to' method."); t.ariaFormat = e } function q(t, e) { if (!function (t) { return n(t) && "function" == typeof t.from }(e)) throw new Error("noUiSlider: 'format' requires 'to' and 'from' methods."); t.format = e } function X(t, e) { if ("boolean" != typeof e) throw new Error("noUiSlider: 'keyboardSupport' option must be a boolean."); t.keyboardSupport = e } function Y(t, e) { t.documentElement = e } function I(t, e) { if ("string" != typeof e && !1 !== e) throw new Error("noUiSlider: 'cssPrefix' must be a string or `false`."); t.cssPrefix = e } function W(t, e) { if ("object" != typeof e) throw new Error("noUiSlider: 'cssClasses' must be an object."); "string" == typeof t.cssPrefix ? (t.cssClasses = {}, Object.keys(e).forEach((function (r) { t.cssClasses[r] = t.cssPrefix + e[r] }))) : t.cssClasses = e } function $(t) { var e = { margin: null, limit: null, padding: null, animate: !0, animationDuration: 300, ariaFormat: y, format: y }, r = { step: { r: !1, t: P }, keyboardPageMultiplier: { r: !1, t: C }, keyboardMultiplier: { r: !1, t: N }, keyboardDefaultStep: { r: !1, t: V }, start: { r: !0, t: k }, connect: { r: !0, t: O }, direction: { r: !0, t: F }, snap: { r: !1, t: M }, animate: { r: !1, t: U }, animationDuration: { r: !1, t: D }, range: { r: !0, t: A }, orientation: { r: !1, t: L }, margin: { r: !1, t: T }, limit: { r: !1, t: j }, padding: { r: !1, t: z }, behaviour: { r: !0, t: H }, ariaFormat: { r: !1, t: B }, format: { r: !1, t: q }, tooltips: { r: !1, t: R }, keyboardSupport: { r: !0, t: X }, documentElement: { r: !1, t: Y }, cssPrefix: { r: !0, t: I }, cssClasses: { r: !0, t: W }, handleAttributes: { r: !1, t: _ } }, n = { connect: !1, direction: "ltr", behaviour: "tap", orientation: "horizontal", keyboardSupport: !0, cssPrefix: "noUi-", cssClasses: w, keyboardPageMultiplier: 5, keyboardMultiplier: 1, keyboardDefaultStep: 10 }; t.format && !t.ariaFormat && (t.ariaFormat = t.format), Object.keys(r).forEach((function (i) { if (o(t[i]) || void 0 !== n[i]) r[i].t(e, o(t[i]) ? t[i] : n[i]); else if (r[i].r) throw new Error("noUiSlider: '" + i + "' is required.") })), e.pips = t.pips; var i = document.createElement("div"), s = void 0 !== i.style.msTransform, a = void 0 !== i.style.transform; return e.transformRule = a ? "transform" : s ? "msTransform" : "webkitTransform", e.style = [["left", "top"], ["right", "bottom"]][e.dir][e.ort], e } function G(e, r, n) { var a, p, m, g, v, b, S, x = window.navigator.pointerEnabled ? { start: "pointerdown", move: "pointermove", end: "pointerup" } : window.navigator.msPointerEnabled ? { start: "MSPointerDown", move: "MSPointerMove", end: "MSPointerUp" } : { start: "mousedown touchstart", move: "mousemove touchmove", end: "mouseup touchend" }, y = window.CSS && CSS.supports && CSS.supports("touch-action", "none") && function () { var t = !1; try { var e = Object.defineProperty({}, "passive", { get: function () { t = !0 } }); window.addEventListener("test", null, e) } catch (t) { } return t }(), w = e, P = r.spectrum, C = [], N = [], V = [], A = 0, k = {}, M = e.ownerDocument, U = r.documentElement || M.documentElement, D = M.body, O = "rtl" === M.dir || 1 === r.ort ? 0 : 100; function L(t, e) { var r = M.createElement("div"); return e && f(r, e), t.appendChild(r), r } function T(t, e) { var n = L(t, r.cssClasses.origin), i = L(n, r.cssClasses.handle); if (L(i, r.cssClasses.touchArea), i.setAttribute("data-handle", String(e)), r.keyboardSupport && (i.setAttribute("tabindex", "0"), i.addEventListener("keydown", (function (t) { return function (t, e) { if (F() || H(e)) return !1; var n = ["Left", "Right"], i = ["Down", "Up"], o = ["PageDown", "PageUp"], s = ["Home", "End"]; r.dir && !r.ort ? n.reverse() : r.ort && !r.dir && (i.reverse(), o.reverse()); var a, l = t.key.replace("Arrow", ""), u = l === o[0], c = l === o[1], p = l === i[0] || l === n[0] || u, f = l === i[1] || l === n[1] || c, d = l === s[0], h = l === s[1]; if (!(p || f || d || h)) return !0; if (t.preventDefault(), f || p) { var m = p ? 0 : 1, g = gt(e)[m]; if (null === g) return !1; !1 === g && (g = P.getDefaultStep(N[e], p, r.keyboardDefaultStep)), g *= c || u ? r.keyboardPageMultiplier : r.keyboardMultiplier, g = Math.max(g, 1e-7), g *= p ? -1 : 1, a = C[e] + g } else a = h ? r.spectrum.xVal[r.spectrum.xVal.length - 1] : r.spectrum.xVal[0]; return pt(e, P.toStepping(a), !0, !0), ot("slide", e), ot("update", e), ot("change", e), ot("set", e), !1 }(t, e) }))), void 0 !== r.handleAttributes) { var o = r.handleAttributes[e]; Object.keys(o).forEach((function (t) { i.setAttribute(t, o[t]) })) } return i.setAttribute("role", "slider"), i.setAttribute("aria-orientation", r.ort ? "vertical" : "horizontal"), 0 === e ? f(i, r.cssClasses.handleLower) : e === r.handles - 1 && f(i, r.cssClasses.handleUpper), n.handle = i, n } function j(t, e) { return !!e && L(t, r.cssClasses.connect) } function z(t, e) { return !(!r.tooltips || !r.tooltips[e]) && L(t.firstChild, r.cssClasses.tooltip) } function F() { return w.hasAttribute("disabled") } function H(t) { return p[t].hasAttribute("disabled") } function R() { v && (it("update" + E.tooltips), v.forEach((function (t) { t && i(t) })), v = null) } function _() { R(), v = p.map(z), nt("update" + E.tooltips, (function (t, e, n) { if (v && r.tooltips && !1 !== v[e]) { var i = t[e]; !0 !== r.tooltips[e] && (i = r.tooltips[e].to(n[e])), v[e].innerHTML = i } })) } function B(t, e) { return t.map((function (t) { return P.fromStepping(e ? P.getStep(t) : t) })) } function q(e) { var r, n = function (e) { if (e.mode === t.PipsMode.Range || e.mode === t.PipsMode.Steps) return P.xVal; if (e.mode === t.PipsMode.Count) { if (e.values < 2) throw new Error("noUiSlider: 'values' (>= 2) required for mode 'count'."); for (var r = e.values - 1, n = 100 / r, i = []; r--;)i[r] = r * n; return i.push(100), B(i, e.stepped) } return e.mode === t.PipsMode.Positions ? B(e.values, e.stepped) : e.mode === t.PipsMode.Values ? e.stepped ? e.values.map((function (t) { return P.fromStepping(P.getStep(P.toStepping(t))) })) : e.values : [] }(e), i = {}, o = P.xVal[0], s = P.xVal[P.xVal.length - 1], a = !1, l = !1, u = 0; return r = n.slice().sort((function (t, e) { return t - e })), (n = r.filter((function (t) { return !this[t] && (this[t] = !0) }), {}))[0] !== o && (n.unshift(o), a = !0), n[n.length - 1] !== s && (n.push(s), l = !0), n.forEach((function (r, o) { var s, c, p, f, d, h, m, g, v, b, S = r, x = n[o + 1], y = e.mode === t.PipsMode.Steps; for (y && (s = P.xNumSteps[o]), s || (s = x - S), void 0 === x && (x = S), s = Math.max(s, 1e-7), c = S; c <= x; c = Number((c + s).toFixed(7))) { for (g = (d = (f = P.toStepping(c)) - u) / (e.density || 1), b = d / (v = Math.round(g)), p = 1; p <= v; p += 1)i[(h = u + p * b).toFixed(5)] = [P.fromStepping(h), 0]; m = n.indexOf(c) > -1 ? t.PipsType.LargeValue : y ? t.PipsType.SmallValue : t.PipsType.NoValue, !o && a && c !== x && (m = 0), c === x && l || (i[f.toFixed(5)] = [c, m]), u = f } })), i } function X(e, n, i) { var o, s, a = M.createElement("div"), l = ((o = {})[t.PipsType.None] = "", o[t.PipsType.NoValue] = r.cssClasses.valueNormal, o[t.PipsType.LargeValue] = r.cssClasses.valueLarge, o[t.PipsType.SmallValue] = r.cssClasses.valueSub, o), u = ((s = {})[t.PipsType.None] = "", s[t.PipsType.NoValue] = r.cssClasses.markerNormal, s[t.PipsType.LargeValue] = r.cssClasses.markerLarge, s[t.PipsType.SmallValue] = r.cssClasses.markerSub, s), c = [r.cssClasses.valueHorizontal, r.cssClasses.valueVertical], p = [r.cssClasses.markerHorizontal, r.cssClasses.markerVertical]; function d(t, e) { var n = e === r.cssClasses.value, i = n ? l : u; return e + " " + (n ? c : p)[r.ort] + " " + i[t] } return f(a, r.cssClasses.pips), f(a, 0 === r.ort ? r.cssClasses.pipsHorizontal : r.cssClasses.pipsVertical), Object.keys(e).forEach((function (o) { !function (e, o, s) { if ((s = n ? n(o, s) : s) !== t.PipsType.None) { var l = L(a, !1); l.className = d(s, r.cssClasses.marker), l.style[r.style] = e + "%", s > t.PipsType.NoValue && ((l = L(a, !1)).className = d(s, r.cssClasses.value), l.setAttribute("data-value", String(o)), l.style[r.style] = e + "%", l.innerHTML = String(i.to(o))) } }(o, e[o][0], e[o][1]) })), a } function Y() { g && (i(g), g = null) } function I(t) { Y(); var e = q(t), r = t.filter, n = t.format || { to: function (t) { return String(Math.round(t)) } }; return g = w.appendChild(X(e, r, n)) } function W() { var t = a.getBoundingClientRect(), e = "offset" + ["Width", "Height"][r.ort]; return 0 === r.ort ? t.width || a[e] : t.height || a[e] } function G(t, e, n, i) { var o = function (o) { var s, a, l = function (t, e, r) { var n = 0 === t.type.indexOf("touch"), i = 0 === t.type.indexOf("mouse"), o = 0 === t.type.indexOf("pointer"), s = 0, a = 0; if (0 === t.type.indexOf("MSPointer") && (o = !0), "mousedown" === t.type && !t.buttons && !t.touches) return !1; if (n) { var l = function (e) { var n = e.target; return n === r || r.contains(n) || t.composed && t.composedPath().shift() === r }; if ("touchstart" === t.type) { var u = Array.prototype.filter.call(t.touches, l); if (u.length > 1) return !1; s = u[0].pageX, a = u[0].pageY } else { var c = Array.prototype.find.call(t.changedTouches, l); if (!c) return !1; s = c.pageX, a = c.pageY } } return e = e || h(M), (i || o) && (s = t.clientX + e.x, a = t.clientY + e.y), t.pageOffset = e, t.points = [s, a], t.cursor = i || o, t }(o, i.pageOffset, i.target || e); return !!l && !(F() && !i.doNotReject) && (s = w, a = r.cssClasses.tap, !((s.classList ? s.classList.contains(a) : new RegExp("\\b" + a + "\\b").test(s.className)) && !i.doNotReject) && !(t === x.start && void 0 !== l.buttons && l.buttons > 1) && (!i.hover || !l.buttons) && (y || l.preventDefault(), l.calcPoint = l.points[r.ort], void n(l, i))) }, s = []; return t.split(" ").forEach((function (t) { e.addEventListener(t, o, !!y && { passive: !0 }), s.push([t, o]) })), s } function J(t) { var e, n, i, o, s, l, c = 100 * (t - (e = a, n = r.ort, i = e.getBoundingClientRect(), o = e.ownerDocument, s = o.documentElement, l = h(o), /webkit.*Chrome.*Mobile/i.test(navigator.userAgent) && (l.x = 0), n ? i.top + l.y - s.clientTop : i.left + l.x - s.clientLeft)) / W(); return c = u(c), r.dir ? 100 - c : c } function K(t, e) { "mouseout" === t.type && "HTML" === t.target.nodeName && null === t.relatedTarget && Z(t, e) } function Q(t, e) { if (-1 === navigator.appVersion.indexOf("MSIE 9") && 0 === t.buttons && 0 !== e.buttonsProperty) return Z(t, e); var n = (r.dir ? -1 : 1) * (t.calcPoint - e.startCalcPoint); lt(n > 0, 100 * n / e.baseSize, e.locations, e.handleNumbers, e.connect) } function Z(t, e) { e.handle && (d(e.handle, r.cssClasses.active), A -= 1), e.listeners.forEach((function (t) { U.removeEventListener(t[0], t[1]) })), 0 === A && (d(w, r.cssClasses.drag), ct(), t.cursor && (D.style.cursor = "", D.removeEventListener("selectstart", s))), r.events.smoothSteps && (e.handleNumbers.forEach((function (t) { pt(t, N[t], !0, !0, !1, !1) })), e.handleNumbers.forEach((function (t) { ot("update", t) }))), e.handleNumbers.forEach((function (t) { ot("change", t), ot("set", t), ot("end", t) })) } function tt(t, e) { if (!e.handleNumbers.some(H)) { var n; 1 === e.handleNumbers.length && (n = p[e.handleNumbers[0]].children[0], A += 1, f(n, r.cssClasses.active)), t.stopPropagation(); var i = [], o = G(x.move, U, Q, { target: t.target, handle: n, connect: e.connect, listeners: i, startCalcPoint: t.calcPoint, baseSize: W(), pageOffset: t.pageOffset, handleNumbers: e.handleNumbers, buttonsProperty: t.buttons, locations: N.slice() }), a = G(x.end, U, Z, { target: t.target, handle: n, listeners: i, doNotReject: !0, handleNumbers: e.handleNumbers }), l = G("mouseout", U, K, { target: t.target, handle: n, listeners: i, doNotReject: !0, handleNumbers: e.handleNumbers }); i.push.apply(i, o.concat(a, l)), t.cursor && (D.style.cursor = getComputedStyle(t.target).cursor, p.length > 1 && f(w, r.cssClasses.drag), D.addEventListener("selectstart", s, !1)), e.handleNumbers.forEach((function (t) { ot("start", t) })) } } function et(t) { t.stopPropagation(); var e = J(t.calcPoint), n = function (t) { var e = 100, r = !1; return p.forEach((function (n, i) { if (!H(i)) { var o = N[i], s = Math.abs(o - t); (s < e || s <= e && t > o || 100 === s && 100 === e) && (r = i, e = s) } })), r }(e); !1 !== n && (r.events.snap || l(w, r.cssClasses.tap, r.animationDuration), pt(n, e, !0, !0), ct(), ot("slide", n, !0), ot("update", n, !0), r.events.snap ? tt(t, { handleNumbers: [n] }) : (ot("change", n, !0), ot("set", n, !0))) } function rt(t) { var e = J(t.calcPoint), r = P.getStep(e), n = P.fromStepping(r); Object.keys(k).forEach((function (t) { "hover" === t.split(".")[0] && k[t].forEach((function (t) { t.call(vt, n) })) })) } function nt(t, e) { k[t] = k[t] || [], k[t].push(e), "update" === t.split(".")[0] && p.forEach((function (t, e) { ot("update", e) })) } function it(t) { var e = t && t.split(".")[0], r = e ? t.substring(e.length) : t; Object.keys(k).forEach((function (t) { var n = t.split(".")[0], i = t.substring(n.length); e && e !== n || r && r !== i || function (t) { return t === E.aria || t === E.tooltips }(i) && r !== i || delete k[t] })) } function ot(t, e, n) { Object.keys(k).forEach((function (i) { var o = i.split(".")[0]; t === o && k[i].forEach((function (t) { t.call(vt, C.map(r.format.to), e, C.slice(), n || !1, N.slice(), vt) })) })) } function st(t, e, n, i, o, s, a) { var l; return p.length > 1 && !r.events.unconstrained && (i && e > 0 && (l = P.getAbsoluteDistance(t[e - 1], r.margin, !1), n = Math.max(n, l)), o && e < p.length - 1 && (l = P.getAbsoluteDistance(t[e + 1], r.margin, !0), n = Math.min(n, l))), p.length > 1 && r.limit && (i && e > 0 && (l = P.getAbsoluteDistance(t[e - 1], r.limit, !1), n = Math.min(n, l)), o && e < p.length - 1 && (l = P.getAbsoluteDistance(t[e + 1], r.limit, !0), n = Math.max(n, l))), r.padding && (0 === e && (l = P.getAbsoluteDistance(0, r.padding[0], !1), n = Math.max(n, l)), e === p.length - 1 && (l = P.getAbsoluteDistance(100, r.padding[1], !0), n = Math.min(n, l))), a || (n = P.getStep(n)), !((n = u(n)) === t[e] && !s) && n } function at(t, e) { var n = r.ort; return (n ? e : t) + ", " + (n ? t : e) } function lt(t, e, n, i, o) { var s = n.slice(), a = i[0], l = r.events.smoothSteps, u = [!t, t], c = [t, !t]; i = i.slice(), t && i.reverse(), i.length > 1 ? i.forEach((function (t, r) { var n = st(s, t, s[t] + e, u[r], c[r], !1, l); !1 === n ? e = 0 : (e = n - s[t], s[t] = n) })) : u = c = [!0]; var p = !1; i.forEach((function (t, r) { p = pt(t, n[t] + e, u[r], c[r], !1, l) || p })), p && (i.forEach((function (t) { ot("update", t), ot("slide", t) })), null != o && ot("drag", a)) } function ut(t, e) { return r.dir ? 100 - t - e : t } function ct() { V.forEach((function (t) { var e = N[t] > 50 ? -1 : 1, r = 3 + (p.length + e * t); p[t].style.zIndex = String(r) })) } function pt(t, e, n, i, o, s) { return o || (e = st(N, t, e, n, i, !1, s)), !1 !== e && (function (t, e) { N[t] = e, C[t] = P.fromStepping(e); var n = "translate(" + at(ut(e, 0) - O + "%", "0") + ")"; p[t].style[r.transformRule] = n, ft(t), ft(t + 1) }(t, e), !0) } function ft(t) { if (m[t]) { var e = 0, n = 100; 0 !== t && (e = N[t - 1]), t !== m.length - 1 && (n = N[t]); var i = n - e, o = "translate(" + at(ut(e, i) + "%", "0") + ")", s = "scale(" + at(i / 100, "1") + ")"; m[t].style[r.transformRule] = o + " " + s } } function dt(t, e) { return null === t || !1 === t || void 0 === t ? N[e] : ("number" == typeof t && (t = String(t)), !1 !== (t = r.format.from(t)) && (t = P.toStepping(t)), !1 === t || isNaN(t) ? N[e] : t) } function ht(t, e, n) { var i = c(t), o = void 0 === N[0]; e = void 0 === e || e, r.animate && !o && l(w, r.cssClasses.tap, r.animationDuration), V.forEach((function (t) { pt(t, dt(i[t], t), !0, !1, n) })); var s = 1 === V.length ? 0 : 1; if (o && P.hasNoSize() && (n = !0, N[0] = 0, V.length > 1)) { var a = 100 / (V.length - 1); V.forEach((function (t) { N[t] = t * a })) } for (; s < V.length; ++s)V.forEach((function (t) { pt(t, N[t], !0, !0, n) })); ct(), V.forEach((function (t) { ot("update", t), null !== i[t] && e && ot("set", t) })) } function mt(t) { if (void 0 === t && (t = !1), t) return 1 === C.length ? C[0] : C.slice(0); var e = C.map(r.format.to); return 1 === e.length ? e[0] : e } function gt(t) { var e = N[t], n = P.getNearbySteps(e), i = C[t], o = n.thisStep.step, s = null; if (r.snap) return [i - n.stepBefore.startValue || null, n.stepAfter.startValue - i || null]; !1 !== o && i + o > n.stepAfter.startValue && (o = n.stepAfter.startValue - i), s = i > n.thisStep.startValue ? n.thisStep.step : !1 !== n.stepBefore.step && i - n.stepBefore.highestStep, 100 === e ? o = null : 0 === e && (s = null); var a = P.countStepDecimals(); return null !== o && !1 !== o && (o = Number(o.toFixed(a))), null !== s && !1 !== s && (s = Number(s.toFixed(a))), [s, o] } f(b = w, r.cssClasses.target), 0 === r.dir ? f(b, r.cssClasses.ltr) : f(b, r.cssClasses.rtl), 0 === r.ort ? f(b, r.cssClasses.horizontal) : f(b, r.cssClasses.vertical), f(b, "rtl" === getComputedStyle(b).direction ? r.cssClasses.textDirectionRtl : r.cssClasses.textDirectionLtr), a = L(b, r.cssClasses.base), function (t, e) { var n = L(e, r.cssClasses.connects); p = [], (m = []).push(j(n, t[0])); for (var i = 0; i < r.handles; i++)p.push(T(e, i)), V[i] = i, m.push(j(n, t[i + 1])) }(r.connect, a), (S = r.events).fixed || p.forEach((function (t, e) { G(x.start, t.children[0], tt, { handleNumbers: [e] }) })), S.tap && G(x.start, a, et, {}), S.hover && G(x.move, a, rt, { hover: !0 }), S.drag && m.forEach((function (t, e) { if (!1 !== t && 0 !== e && e !== m.length - 1) { var n = p[e - 1], i = p[e], o = [t], s = [n, i], a = [e - 1, e]; f(t, r.cssClasses.draggable), S.fixed && (o.push(n.children[0]), o.push(i.children[0])), S.dragAll && (s = p, a = V), o.forEach((function (e) { G(x.start, e, tt, { handles: s, handleNumbers: a, connect: t }) })) } })), ht(r.start), r.pips && I(r.pips), r.tooltips && _(), it("update" + E.aria), nt("update" + E.aria, (function (t, e, n, i, o) { V.forEach((function (t) { var e = p[t], i = st(N, t, 0, !0, !0, !0), s = st(N, t, 100, !0, !0, !0), a = o[t], l = String(r.ariaFormat.to(n[t])); i = P.fromStepping(i).toFixed(1), s = P.fromStepping(s).toFixed(1), a = P.fromStepping(a).toFixed(1), e.children[0].setAttribute("aria-valuemin", i), e.children[0].setAttribute("aria-valuemax", s), e.children[0].setAttribute("aria-valuenow", a), e.children[0].setAttribute("aria-valuetext", l) })) })); var vt = { destroy: function () { for (it(E.aria), it(E.tooltips), Object.keys(r.cssClasses).forEach((function (t) { d(w, r.cssClasses[t]) })); w.firstChild;)w.removeChild(w.firstChild); delete w.noUiSlider }, steps: function () { return V.map(gt) }, on: nt, off: it, get: mt, set: ht, setHandle: function (t, e, r, n) { if (!((t = Number(t)) >= 0 && t < V.length)) throw new Error("noUiSlider: invalid handle number, got: " + t); pt(t, dt(e, t), !0, !0, n), ot("update", t), r && ot("set", t) }, reset: function (t) { ht(r.start, t) }, disable: function (t) { null != t ? (p[t].setAttribute("disabled", ""), p[t].handle.removeAttribute("tabindex")) : (w.setAttribute("disabled", ""), p.forEach((function (t) { t.handle.removeAttribute("tabindex") }))) }, enable: function (t) { null != t ? (p[t].removeAttribute("disabled"), p[t].handle.setAttribute("tabindex", "0")) : (w.removeAttribute("disabled"), p.forEach((function (t) { t.removeAttribute("disabled"), t.handle.setAttribute("tabindex", "0") }))) }, __moveHandles: function (t, e, r) { lt(t, e, N, r) }, options: n, updateOptions: function (t, e) { var i = mt(), s = ["margin", "limit", "padding", "range", "animate", "snap", "step", "format", "pips", "tooltips"]; s.forEach((function (e) { void 0 !== t[e] && (n[e] = t[e]) })); var a = $(n); s.forEach((function (e) { void 0 !== t[e] && (r[e] = a[e]) })), P = a.spectrum, r.margin = a.margin, r.limit = a.limit, r.padding = a.padding, r.pips ? I(r.pips) : Y(), r.tooltips ? _() : R(), N = [], ht(o(t.start) ? t.start : i, e) }, target: w, removePips: Y, removeTooltips: R, getPositions: function () { return N.slice() }, getTooltips: function () { return v }, getOrigins: function () { return p }, pips: I }; return vt } function J(t, e) { if (!t || !t.nodeName) throw new Error("noUiSlider: create requires a single element, got: " + t); if (t.noUiSlider) throw new Error("noUiSlider: Slider was already initialized."); var r = G(t, $(e), e); return t.noUiSlider = r, r } var K = { __spectrum: x, cssClasses: w, create: J }; t.create = J, t.cssClasses = w, t.default = K, Object.defineProperty(t, "__esModule", { value: !0 }) }, "object" == typeof exports && "undefined" != typeof module ? r(exports) : "function" == typeof define && define.amd ? define(["exports"], r) : r((e = "undefined" != typeof globalThis ? globalThis : e || self).noUiSlider = {}) } export default noUslierFunc;