"use strict";
//still in progress...
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.fBool = exports.isBool = exports.toBool = exports.selectMany = exports.aClx = exports.union = exports.unique = exports.range = exports.tCl = exports.rCl = exports.aCl = exports.hCl = exports.aChld = exports.dP = exports.drEL = exports.daEl = exports.rEL = exports.aEL = exports.attr = exports.css = exports.defEnum = exports.clone = exports.obj = exports.pojo = exports.isDOM = exports.inherit = exports.copy = exports.extend = exports.splat = exports.round = exports.clamp = exports.pInt = exports.isInt = exports.isNumeric = exports.isNum = exports.isArr = exports.isObj = exports.isStr = exports.dfnd = exports.isFn = exports.typeOf = exports.empty = exports.ts = exports.consts = void 0;
var tslib_1 = require("tslib");
var c = {
    s: "string",
    o: "object",
    b: "boolean",
    i: "integer",
    n: "number",
    a: "array",
    fn: "function",
    sp: "super",
    c: "color",
    t: "type",
    d: "defaut",
    u: "undefined",
    v: "value",
    svgNs: "http://www.w3.org/2000/svg"
};
exports.consts = c;
exports.ts = function (t) { return ({}).toString.call(t); };
/**
 * it can be extended later to array [] and object {}
 * @param s any
 */
exports.empty = function (s) { return typeof s == void 0 || !s || (exports.isStr(s) && s.match(/^ *$/) !== null); };
/**
 * returned values: array, date,	function, number, object, regexp, string, undefined  	global,	JSON, null
 * @param o any
 */
exports.typeOf = function (o) { return exports.ts(o).slice(8, -1).toLowerCase(); };
exports.isFn = function (f) { return typeof f === c.fn; };
/**
 * defined,	undefined === void 0
 * @param t any
 */
exports.dfnd = function (t) { return t !== void 0 && t !== null; };
exports.isStr = function (s) { return typeof s === c.s; };
/**
 * true for Array, pojo retruns true only for a plain old object {}
 * @param t any
 */
exports.isObj = function (t) { return typeof t === c.o; };
exports.isArr = function (t) { return Array.isArray(t); }; // typeOf(t) === c.a;
/**
 * @description returns true if n is number
 * @param n value
 *
 * - "1" returns false
 * - NaN returns true
 */
exports.isNum = function (n) { return typeof n === c.n; };
/**
 * @description returns true if n is numeric
 * @param n
 *
 * - "1" returns true
 * - NaN returns false
 */
exports.isNumeric = function (n) { return isNaN(n) ? !1 : (n = parseInt(n), (0 | n) === n); };
//return (typeof x === dab.n) && (x % 1 === 0);
exports.isInt = function (n) { return (parseFloat(n) == parseInt(n)) && !isNaN(n); };
//http://speakingjs.com/es5/ch11.html#converting_to_integer
/**
 * @description parse a number according to a radix
 * @param s string value
 * @param radix convertion radix
 *
 * - "0101001" => 2		binary
 * - "0xFF"	=> 255 hexadecimal
 * - "123" => 123
 */
exports.pInt = function (s, radix) { return parseInt(s, radix); };
/**
 * @description clamps a value inside a range min..max
 * @param v value
 * @param min minim
 * @param max maximum
 */
exports.clamp = function (v, min, max) { return (v <= min) ? min : (v >= max) ? max : v; };
/**
 * @description rounds a number to a decimal
 * @param v float value
 * @param decimals valid decimals
 *
 * - (123.5678, 1) => 123.6
 * - (123.5678, 0) => 124
 * - (123.5678, -1) => NaN
 */
exports.round = function (v, decimals) {
    //https://expertcodeblog.wordpress.com/2018/02/12/typescript-javascript-round-number-by-decimal-pecision/
    return (decimals = decimals | 0, Number(Math.round(Number(v + "e" + decimals)) + "e-" + decimals));
}; //force toArray
exports.splat = function (o) { return exports.isArr(o) ? o : (exports.dfnd(o) ? [o] : []); };
/**
 * copy all properties in src to obj, and returns obj
 * @param obj dest object
 * @param src source object
 */
exports.extend = function (obj, src) {
    //const returnedTarget = Object.assign(target, source); doesn't throw error if source is undefined
    //		but target has to be an object
    exports.pojo(src) && Object.keys(src).forEach(function (key) { obj[key] = src[key]; });
    return obj;
};
/**
 * copy properties in src that exists only in obj, and returns obj
 * @param obj dest and template object
 * @param src source object
 */
exports.copy = function (obj, src) {
    exports.pojo(src) && Object.keys(obj).forEach(function (key) {
        var k = src[key];
        exports.dfnd(k) && (obj[key] = k);
    });
    return obj;
};
exports.inherit = function (parent, child) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
};
/**
 * @description returns true if an element if an HTML or SVG DOM element
 * @param e {any} an element
 */
exports.isDOM = function (e) { return e instanceof window.HTMLElement || e instanceof window.HTMLDocument; };
/**
 * plainObj   Plain Old JavaScript Object (POJO) {}
 * @param arg args
 */
exports.pojo = function (arg) {
    if (arg == null || typeof arg !== 'object') {
        return false;
    }
    var proto = Object.getPrototypeOf(arg);
    // Prototype may be null if you used `Object.create(null)`
    // Checking `proto`'s constructor is safe because `getPrototypeOf()`
    // explicitly crosses the boundary from object data to object metadata
    return !proto || proto.constructor.name === 'Object';
    //Object.getPrototypeOf([]).constructor.name == "Array"
    //Object.getPrototypeOf({}).constructor.name == "Object"
    //Object.getPrototypeOf(Object.create(null)) == null
};
/**
 * deep copy
 * @param o any
 */
exports.obj = function (o) {
    if (!exports.pojo(o)) {
        return o;
    }
    var result = Object.create(null);
    for (var k in o)
        if (!o.hasOwnProperty || o.hasOwnProperty(k)) {
            var prop = o[k];
            result[k] = exports.pojo(prop) ? exports.obj(prop) : prop;
        }
    return result;
};
/**
 * JSON stringify & parse cloner
 * @param o any
 */
exports.clone = function (o) { return JSON.parse(JSON.stringify(o)); };
exports.defEnum = function (e) {
    for (var key in e) { //let item = e[key];
        e[e[key]] = key;
    }
    return e;
};
/**
 * css(el, { background: 'green', display: 'none', 'border-radius': '5px' });
 * @param el HTMLElement
 * @param styles object of styles
 */
exports.css = function (el, styles) {
    if (exports.isStr(styles))
        return el.style[styles];
    else {
        Object.assign(el.style, styles);
        // for (let prop in styles)
        // 	el.style[prop] = styles[prop];
        return el;
    }
};
/**
 * @description get/set html element attribute
 * @param el HTML element
 * @param attrs string to get it's attribute, or an object with attributes to set
 */
exports.attr = function (el, attrs) {
    if (exports.isStr(attrs))
        return el.getAttribute(attrs);
    for (var attr_1 in attrs)
        el.setAttribute(attr_1, attrs[attr_1]);
    return el;
};
/**
 * @description adds an event listener to an element
 * @param el element
 * @param type event name
 * @param fn listener function
 * @param b boolean | AddEventListenerOptions | undefined
 */
exports.aEL = function (el, type, fn, b) { return el.addEventListener(type, fn, b); };
/**
 * @description removes an event listener from an element
 * @param el element
 * @param type event name
 * @param fn
 * @param b
 */
exports.rEL = function (el, type, fn, b) { return el.removeEventListener(type, fn, b); };
/**
 * @description adds an event listener to the document
 * @param type event name
 * @param fn listener function
 * @param b boolean | AddEventListenerOptions | undefined
 */
exports.daEl = function (type, fn, b) { return document.addEventListener(type, fn, b); };
/**
 * @description removes an event listener from the document
 * @param el element
 * @param type event name
 * @param fn
 * @param b
 */
exports.drEL = function (type, fn, b) { return document.removeEventListener(type, fn, b); };
/**
 * @description defines a new object property
 * @param obj object
 * @param propName property name
 * @param attrs attributes
 */
exports.dP = function (obj, propName, attrs) { return Object.defineProperty(obj, propName, attrs); };
/**
 * @description appends a child element to it's new parent
 * @param parent parent element
 * @param child child element
 */
exports.aChld = function (parent, child) { return parent.appendChild(child); };
/**
 * @description test for class
 * @param el Element
 * @param className className cannot contain spaces
 * @returns true if present, false otherwise
 */
exports.hCl = function (el, className) { return el.classList.contains(className); };
/**
 * @description adds a class to an Element
 * @param el Element
 * @param className className cannot contain spaces
 */
exports.aCl = function (el, className) { return el.classList.add(className); };
/**
 * @description removes a class from an Element
 * @param el Element
 * @param className className cannot contain spaces
 */
exports.rCl = function (el, className) { return el.classList.remove(className); };
/**
 * @description toggles a class from an Element
 * @param el Element
 * @param className className cannot contain spaces
 * @param force undefined is toggle, true is add, false is remove
 * @returns true if present, false if not
 */
exports.tCl = function (el, className, force) { return el.classList.toggle(className, force); };
//https://plainjs.com/javascript/traversing/match-element-selector-52/
//https://plainjs.com/javascript/traversing/get-siblings-of-an-element-40/
exports.range = function (s, e) { return Array.from('x'.repeat(e - s), function (_, i) { return s + i; }); };
/**
 * return unique items in array
 * @param x array
 */
exports.unique = function (x) { return x.filter(function (elem, index) { return x.indexOf(elem) === index; }); };
exports.union = function (x, y) { return exports.unique(x.concat(y)); };
/**
 * add class safe
 * @param el HTMLElement
 * @param className class names separated by space
 */
exports.aClx = function (el, className) {
    var _a;
    (_a = el.classList).add.apply(_a, tslib_1.__spread((className || "").split(' ').filter(function (v) { return !exports.empty(v); })));
    return el;
};
/**
 * LINQ select many
 * @param input
 * @param selectListFn
 */
exports.selectMany = function (input, selectListFn) {
    return input.reduce(function (out, inx) {
        out.push.apply(out, tslib_1.__spread(selectListFn(inx)));
        return out;
    }, new Array());
};
var a = {
    'TRUE': true,
    'True': true,
    'true': true,
    '1': true,
    'FALSE': false,
    'False': false,
    'false': false,
    '0': false
};
/**
 * return true if value it's true or false, undefined if not valid
 * @param val any
 *
 * value can be:
 * - TRUE
 * - True
 * - true
 * - FALSE
 * - False
 * - false
 * - 1
 * - 0
 */
exports.toBool = function (val) { return a[val]; };
/**
 * return true if value is a valid boolean
 * @param val any
 *
 * valid values are:
 * - TRUE
 * - True
 * - true
 * - FALSE
 * - False
 * - false
 * - 1
 * - 0
 */
exports.isBool = function (val) { return a[val] != undefined; };
/**
 * @description converts a value to boolean, and undefined are forced to boolean
 * @param val value
 * @param forcedUndefined forced undefined values, default is "false"
 */
exports.fBool = function (val, forcedUndefined) { return a[val] || !!forcedUndefined; };
/**
 * parses an string and returns an array of parsed number values
 * @param s string in the form "n0, n1, n2, n3, n(n)"
 * @param l amount of valid numbers to parse
 * @returns number array if valid, undefined otherwise
 */
exports.parse = function (s, l) {
    var n, nans = false, numbers = s.split(',').map(function (str) { return (n = parseFloat(str), isNaN(n) && (nans = true), n); });
    return (nans || numbers.length != l) ? void 0 : numbers;
};
