/*!
 * jQuery JavaScript Library v1.12.4-aem
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */

(function(global, factory) {

    if (typeof module === "object" && typeof module.exports === "object") {
        // For CommonJS and CommonJS-like environments where a proper `window`
        // is present, execute the factory and get jQuery.
        // For environments that do not have a `window` with a `document`
        // (such as Node.js), expose a factory as module.exports.
        // This accentuates the need for the creation of a real `window`.
        // e.g. var jQuery = require("jquery")(window);
        // See ticket #14549 for more info.
        module.exports = global.document ?
            factory(global, true) :
            function(w) {
                if (!w.document) {
                    throw new Error("jQuery requires a window with a document");
                }
                return factory(w);
            };
    } else {
        factory(global);
    }

    // Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function(window, noGlobal) {

    // Support: Firefox 18+
    // Can't be in strict mode, several libs including ASP.NET trace
    // the stack via arguments.caller.callee and Firefox dies if
    // you try to trace through "use strict" call chains. (#13335)
    //"use strict";
    var deletedIds = [];

    var document = window.document;

    var slice = deletedIds.slice;

    var concat = deletedIds.concat;

    var push = deletedIds.push;

    var indexOf = deletedIds.indexOf;

    var class2type = {};

    var toString = class2type.toString;

    var hasOwn = class2type.hasOwnProperty;

    var support = {};



    var
        version = "1.12.4-aem",

        // Define a local copy of jQuery
        jQuery = function(selector, context) {

            // The jQuery object is actually just the init constructor 'enhanced'
            // Need init if jQuery is called (just allow error to be thrown if not included)
            return new jQuery.fn.init(selector, context);
        },

        // Support: Android<4.1, IE<9
        // Make sure we trim BOM and NBSP
        rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

        // Matches dashed string for camelizing
        rmsPrefix = /^-ms-/,
        rdashAlpha = /-([\da-z])/gi,

        // Used by jQuery.camelCase as callback to replace()
        fcamelCase = function(all, letter) {
            return letter.toUpperCase();
        };

    jQuery.fn = jQuery.prototype = {

        // The current version of jQuery being used
        jquery: version,

        constructor: jQuery,

        // Start with an empty selector
        selector: "",

        // The default length of a jQuery object is 0
        length: 0,

        toArray: function() {
            return slice.call(this);
        },

        // Get the Nth element in the matched element set OR
        // Get the whole matched element set as a clean array
        get: function(num) {
            return num != null ?

                // Return just the one element from the set
                (num < 0 ? this[num + this.length] : this[num]) :

                // Return all the elements in a clean array
                slice.call(this);
        },

        // Take an array of elements and push it onto the stack
        // (returning the new matched element set)
        pushStack: function(elems) {

            // Build a new jQuery matched element set
            var ret = jQuery.merge(this.constructor(), elems);

            // Add the old object onto the stack (as a reference)
            ret.prevObject = this;
            ret.context = this.context;

            // Return the newly-formed element set
            return ret;
        },

        // Execute a callback for every element in the matched set.
        each: function(callback) {
            return jQuery.each(this, callback);
        },

        map: function(callback) {
            return this.pushStack(jQuery.map(this, function(elem, i) {
                return callback.call(elem, i, elem);
            }));
        },

        slice: function() {
            return this.pushStack(slice.apply(this, arguments));
        },

        first: function() {
            return this.eq(0);
        },

        last: function() {
            return this.eq(-1);
        },

        eq: function(i) {
            var len = this.length,
                j = +i + (i < 0 ? len : 0);
            return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
        },

        end: function() {
            return this.prevObject || this.constructor();
        },

        // For internal use only.
        // Behaves like an Array's method, not like a jQuery method.
        push: push,
        sort: deletedIds.sort,
        splice: deletedIds.splice
    };

    jQuery.extend = jQuery.fn.extend = function() {
        var src, copyIsArray, copy, name, options, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // Handle a deep copy situation
        if (typeof target === "boolean") {
            deep = target;

            // skip the boolean and the target
            target = arguments[i] || {};
            i++;
        }

        // Handle case when target is a string or something (possible in deep copy)
        if (typeof target !== "object" && !jQuery.isFunction(target)) {
            target = {};
        }

        // extend jQuery itself if only one argument is passed
        if (i === length) {
            target = this;
            i--;
        }

        for (; i < length; i++) {

            // Only deal with non-null/undefined values
            if ((options = arguments[i]) != null) {

                // Extend the base object
                for (name in options) {
                    src = target[name];
                    copy = options[name];

                    // Prevent never-ending loop
                    if (target === copy) {
                        continue;
                    }

                    // Recurse if we're merging plain objects or arrays
                    if (deep && copy && (jQuery.isPlainObject(copy) ||
                            (copyIsArray = jQuery.isArray(copy)))) {

                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && jQuery.isArray(src) ? src : [];

                        } else {
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }

                        // Never move original objects, clone them
                        target[name] = jQuery.extend(deep, clone, copy);

                        // Don't bring in undefined values
                    } else if (copy !== undefined) {
                        target[name] = copy;
                    }
                }
            }
        }

        // Return the modified object
        return target;
    };

    jQuery.extend({

        // Unique for each copy of jQuery on the page
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),

        // Assume jQuery is ready without the ready module
        isReady: true,

        error: function(msg) {
            throw new Error(msg);
        },

        noop: function() {},

        // See test/unit/core.js for details concerning isFunction.
        // Since version 1.3, DOM methods and functions like alert
        // aren't supported. They return false on IE (#2968).
        isFunction: function(obj) {
            return jQuery.type(obj) === "function";
        },

        isArray: Array.isArray || function(obj) {
            return jQuery.type(obj) === "array";
        },

        isWindow: function(obj) {
            /* jshint eqeqeq: false */
            return obj != null && obj == obj.window;
        },

        isNumeric: function(obj) {

            // parseFloat NaNs numeric-cast false positives (null|true|false|"")
            // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
            // subtraction forces infinities to NaN
            // adding 1 corrects loss of precision from parseFloat (#15100)
            var realStringObj = obj && obj.toString();
            return !jQuery.isArray(obj) && (realStringObj - parseFloat(realStringObj) + 1) >= 0;
        },

        isEmptyObject: function(obj) {
            var name;
            for (name in obj) {
                return false;
            }
            return true;
        },

        isPlainObject: function(obj) {
            var key;

            // Must be an Object.
            // Because of IE, we also have to check the presence of the constructor property.
            // Make sure that DOM nodes and window objects don't pass through, as well
            if (!obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow(obj)) {
                return false;
            }

            try {

                // Not own constructor property must be Object
                if (obj.constructor &&
                    !hasOwn.call(obj, "constructor") &&
                    !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
                    return false;
                }
            } catch (e) {

                // IE8,9 Will throw exceptions on certain host objects #9897
                return false;
            }

            // Support: IE<9
            // Handle iteration over inherited properties before own properties.
            if (!support.ownFirst) {
                for (key in obj) {
                    return hasOwn.call(obj, key);
                }
            }

            // Own properties are enumerated firstly, so to speed up,
            // if last one is own, then all properties are own.
            for (key in obj) {}

            return key === undefined || hasOwn.call(obj, key);
        },

        type: function(obj) {
            if (obj == null) {
                return obj + "";
            }
            return typeof obj === "object" || typeof obj === "function" ?
                class2type[toString.call(obj)] || "object" :
                typeof obj;
        },

        // Workarounds based on findings by Jim Driscoll
        // http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
        globalEval: function(data) {
            if (data && jQuery.trim(data)) {

                // We use execScript on Internet Explorer
                // We use an anonymous function so that context is window
                // rather than jQuery in Firefox
                (window.execScript || function(data) {
                    window["eval"].call(window, data); // jscs:ignore requireDotNotation
                })(data);
            }
        },

        // Convert dashed to camelCase; used by the css and data modules
        // Microsoft forgot to hump their vendor prefix (#9572)
        camelCase: function(string) {
            return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
        },

        nodeName: function(elem, name) {
            return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
        },

        each: function(obj, callback) {
            var length, i = 0;

            if (isArrayLike(obj)) {
                length = obj.length;
                for (; i < length; i++) {
                    if (callback.call(obj[i], i, obj[i]) === false) {
                        break;
                    }
                }
            } else {
                for (i in obj) {
                    if (callback.call(obj[i], i, obj[i]) === false) {
                        break;
                    }
                }
            }

            return obj;
        },

        // Support: Android<4.1, IE<9
        trim: function(text) {
            return text == null ?
                "" :
                (text + "").replace(rtrim, "");
        },

        // results is for internal usage only
        makeArray: function(arr, results) {
            var ret = results || [];

            if (arr != null) {
                if (isArrayLike(Object(arr))) {
                    jQuery.merge(ret,
                        typeof arr === "string" ? [arr] : arr
                    );
                } else {
                    push.call(ret, arr);
                }
            }

            return ret;
        },

        inArray: function(elem, arr, i) {
            var len;

            if (arr) {
                if (indexOf) {
                    return indexOf.call(arr, elem, i);
                }

                len = arr.length;
                i = i ? i < 0 ? Math.max(0, len + i) : i : 0;

                for (; i < len; i++) {

                    // Skip accessing in sparse arrays
                    if (i in arr && arr[i] === elem) {
                        return i;
                    }
                }
            }

            return -1;
        },

        merge: function(first, second) {
            var len = +second.length,
                j = 0,
                i = first.length;

            while (j < len) {
                first[i++] = second[j++];
            }

            // Support: IE<9
            // Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
            if (len !== len) {
                while (second[j] !== undefined) {
                    first[i++] = second[j++];
                }
            }

            first.length = i;

            return first;
        },

        grep: function(elems, callback, invert) {
            var callbackInverse,
                matches = [],
                i = 0,
                length = elems.length,
                callbackExpect = !invert;

            // Go through the array, only saving the items
            // that pass the validator function
            for (; i < length; i++) {
                callbackInverse = !callback(elems[i], i);
                if (callbackInverse !== callbackExpect) {
                    matches.push(elems[i]);
                }
            }

            return matches;
        },

        // arg is for internal usage only
        map: function(elems, callback, arg) {
            var length, value,
                i = 0,
                ret = [];

            // Go through the array, translating each of the items to their new values
            if (isArrayLike(elems)) {
                length = elems.length;
                for (; i < length; i++) {
                    value = callback(elems[i], i, arg);

                    if (value != null) {
                        ret.push(value);
                    }
                }

                // Go through every key on the object,
            } else {
                for (i in elems) {
                    value = callback(elems[i], i, arg);

                    if (value != null) {
                        ret.push(value);
                    }
                }
            }

            // Flatten any nested arrays
            return concat.apply([], ret);
        },

        // A global GUID counter for objects
        guid: 1,

        // Bind a function to a context, optionally partially applying any
        // arguments.
        proxy: function(fn, context) {
            var args, proxy, tmp;

            if (typeof context === "string") {
                tmp = fn[context];
                context = fn;
                fn = tmp;
            }

            // Quick check to determine if target is callable, in the spec
            // this throws a TypeError, but we will just return undefined.
            if (!jQuery.isFunction(fn)) {
                return undefined;
            }

            // Simulated bind
            args = slice.call(arguments, 2);
            proxy = function() {
                return fn.apply(context || this, args.concat(slice.call(arguments)));
            };

            // Set the guid of unique handler to the same of original handler, so it can be removed
            proxy.guid = fn.guid = fn.guid || jQuery.guid++;

            return proxy;
        },

        now: function() {
            return +(new Date());
        },

        // jQuery.support is not used in Core but other projects attach their
        // properties to it so it needs to exist.
        support: support
    });

    // JSHint would error on this code due to the Symbol not being defined in ES5.
    // Defining this global in .jshintrc would create a danger of using the global
    // unguarded in another place, it seems safer to just disable JSHint for these
    // three lines.
    /* jshint ignore: start */
    if (typeof Symbol === "function") {
        jQuery.fn[Symbol.iterator] = deletedIds[Symbol.iterator];
    }
    /* jshint ignore: end */

    // Populate the class2type map
    jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
        function(i, name) {
            class2type["[object " + name + "]"] = name.toLowerCase();
        });

    function isArrayLike(obj) {

        // Support: iOS 8.2 (not reproducible in simulator)
        // `in` check used to prevent JIT error (gh-2145)
        // hasOwn isn't used here due to false negatives
        // regarding Nodelist length in IE
        var length = !!obj && "length" in obj && obj.length,
            type = jQuery.type(obj);

        if (type === "function" || jQuery.isWindow(obj)) {
            return false;
        }

        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && (length - 1) in obj;
    }
    var Sizzle =
        /*!
         * Sizzle CSS Selector Engine v2.2.1
         * http://sizzlejs.com/
         *
         * Copyright jQuery Foundation and other contributors
         * Released under the MIT license
         * http://jquery.org/license
         *
         * Date: 2015-10-17
         */
        (function(window) {

            var i,
                support,
                Expr,
                getText,
                isXML,
                tokenize,
                compile,
                select,
                outermostContext,
                sortInput,
                hasDuplicate,

                // Local document vars
                setDocument,
                document,
                docElem,
                documentIsHTML,
                rbuggyQSA,
                rbuggyMatches,
                matches,
                contains,

                // Instance-specific data
                expando = "sizzle" + 1 * new Date(),
                preferredDoc = window.document,
                dirruns = 0,
                done = 0,
                classCache = createCache(),
                tokenCache = createCache(),
                compilerCache = createCache(),
                sortOrder = function(a, b) {
                    if (a === b) {
                        hasDuplicate = true;
                    }
                    return 0;
                },

                // General-purpose constants
                MAX_NEGATIVE = 1 << 31,

                // Instance methods
                hasOwn = ({}).hasOwnProperty,
                arr = [],
                pop = arr.pop,
                push_native = arr.push,
                push = arr.push,
                slice = arr.slice,
                // Use a stripped-down indexOf as it's faster than native
                // http://jsperf.com/thor-indexof-vs-for/5
                indexOf = function(list, elem) {
                    var i = 0,
                        len = list.length;
                    for (; i < len; i++) {
                        if (list[i] === elem) {
                            return i;
                        }
                    }
                    return -1;
                },

                booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

                // Regular expressions

                // http://www.w3.org/TR/css3-selectors/#whitespace
                whitespace = "[\\x20\\t\\r\\n\\f]",

                // http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
                identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

                // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
                attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
                // Operator (capture 2)
                "*([*^$|!~]?=)" + whitespace +
                // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
                "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
                "*\\]",

                pseudos = ":(" + identifier + ")(?:\\((" +
                // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
                // 1. quoted (capture 3; capture 4 or capture 5)
                "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
                // 2. simple (capture 6)
                "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
                // 3. anything else (capture 2)
                ".*" +
                ")\\)|)",

                // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
                rwhitespace = new RegExp(whitespace + "+", "g"),
                rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),

                rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
                rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),

                rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),

                rpseudo = new RegExp(pseudos),
                ridentifier = new RegExp("^" + identifier + "$"),

                matchExpr = {
                    "ID": new RegExp("^#(" + identifier + ")"),
                    "CLASS": new RegExp("^\\.(" + identifier + ")"),
                    "TAG": new RegExp("^(" + identifier + "|[*])"),
                    "ATTR": new RegExp("^" + attributes),
                    "PSEUDO": new RegExp("^" + pseudos),
                    "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
                        "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
                        "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
                    "bool": new RegExp("^(?:" + booleans + ")$", "i"),
                    // For use in libraries implementing .is()
                    // We use this for POS matching in `select`
                    "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                        whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
                },

                rinputs = /^(?:input|select|textarea|button)$/i,
                rheader = /^h\d$/i,

                rnative = /^[^{]+\{\s*\[native \w/,

                // Easily-parseable/retrievable ID or TAG or CLASS selectors
                rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

                rsibling = /[+~]/,
                rescape = /'|\\/g,

                // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
                runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
                funescape = function(_, escaped, escapedWhitespace) {
                    var high = "0x" + escaped - 0x10000;
                    // NaN means non-codepoint
                    // Support: Firefox<24
                    // Workaround erroneous numeric interpretation of +"0x"
                    return high !== high || escapedWhitespace ?
                        escaped :
                        high < 0 ?
                        // BMP codepoint
                        String.fromCharCode(high + 0x10000) :
                        // Supplemental Plane codepoint (surrogate pair)
                        String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
                },

                // Used for iframes
                // See setDocument()
                // Removing the function wrapper causes a "Permission Denied"
                // error in IE
                unloadHandler = function() {
                    setDocument();
                };

            // Optimize for push.apply( _, NodeList )
            try {
                push.apply(
                    (arr = slice.call(preferredDoc.childNodes)),
                    preferredDoc.childNodes
                );
                // Support: Android<4.0
                // Detect silently failing push.apply
                arr[preferredDoc.childNodes.length].nodeType;
            } catch (e) {
                push = {
                    apply: arr.length ?

                        // Leverage slice if possible
                        function(target, els) {
                            push_native.apply(target, slice.call(els));
                        } :

                        // Support: IE<9
                        // Otherwise append directly
                        function(target, els) {
                            var j = target.length,
                                i = 0;
                            // Can't trust NodeList.length
                            while ((target[j++] = els[i++])) {}
                            target.length = j - 1;
                        }
                };
            }

            function Sizzle(selector, context, results, seed) {
                var m, i, elem, nid, nidselect, match, groups, newSelector,
                    newContext = context && context.ownerDocument,

                    // nodeType defaults to 9, since context defaults to document
                    nodeType = context ? context.nodeType : 9;

                results = results || [];

                // Return early from calls with invalid selector or context
                if (typeof selector !== "string" || !selector ||
                    nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {

                    return results;
                }

                // Try to shortcut find operations (as opposed to filters) in HTML documents
                if (!seed) {

                    if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
                        setDocument(context);
                    }
                    context = context || document;

                    if (documentIsHTML) {

                        // If the selector is sufficiently simple, try using a "get*By*" DOM method
                        // (excepting DocumentFragment context, where the methods don't exist)
                        if (nodeType !== 11 && (match = rquickExpr.exec(selector))) {

                            // ID selector
                            if ((m = match[1])) {

                                // Document context
                                if (nodeType === 9) {
                                    if ((elem = context.getElementById(m))) {

                                        // Support: IE, Opera, Webkit
                                        // TODO: identify versions
                                        // getElementById can match elements by name instead of ID
                                        if (elem.id === m) {
                                            results.push(elem);
                                            return results;
                                        }
                                    } else {
                                        return results;
                                    }

                                    // Element context
                                } else {

                                    // Support: IE, Opera, Webkit
                                    // TODO: identify versions
                                    // getElementById can match elements by name instead of ID
                                    if (newContext && (elem = newContext.getElementById(m)) &&
                                        contains(context, elem) &&
                                        elem.id === m) {

                                        results.push(elem);
                                        return results;
                                    }
                                }

                                // Type selector
                            } else if (match[2]) {
                                push.apply(results, context.getElementsByTagName(selector));
                                return results;

                                // Class selector
                            } else if ((m = match[3]) && support.getElementsByClassName &&
                                context.getElementsByClassName) {

                                push.apply(results, context.getElementsByClassName(m));
                                return results;
                            }
                        }

                        // Take advantage of querySelectorAll
                        if (support.qsa &&
                            !compilerCache[selector + " "] &&
                            (!rbuggyQSA || !rbuggyQSA.test(selector))) {

                            if (nodeType !== 1) {
                                newContext = context;
                                newSelector = selector;

                                // qSA looks outside Element context, which is not what we want
                                // Thanks to Andrew Dupont for this workaround technique
                                // Support: IE <=8
                                // Exclude object elements
                            } else if (context.nodeName.toLowerCase() !== "object") {

                                // Capture the context ID, setting it first if necessary
                                if ((nid = context.getAttribute("id"))) {
                                    nid = nid.replace(rescape, "\\$&");
                                } else {
                                    context.setAttribute("id", (nid = expando));
                                }

                                // Prefix every selector in the list
                                groups = tokenize(selector);
                                i = groups.length;
                                nidselect = ridentifier.test(nid) ? "#" + nid : "[id='" + nid + "']";
                                while (i--) {
                                    groups[i] = nidselect + " " + toSelector(groups[i]);
                                }
                                newSelector = groups.join(",");

                                // Expand context for sibling selectors
                                newContext = rsibling.test(selector) && testContext(context.parentNode) ||
                                    context;
                            }

                            if (newSelector) {
                                try {
                                    push.apply(results,
                                        newContext.querySelectorAll(newSelector)
                                    );
                                    return results;
                                } catch (qsaError) {} finally {
                                    if (nid === expando) {
                                        context.removeAttribute("id");
                                    }
                                }
                            }
                        }
                    }
                }

                // All others
                return select(selector.replace(rtrim, "$1"), context, results, seed);
            }

            /**
             * Create key-value caches of limited size
             * @returns {function(string, object)} Returns the Object data after storing it on itself with
             *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
             *	deleting the oldest entry
             */
            function createCache() {
                var keys = [];

                function cache(key, value) {
                    // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
                    if (keys.push(key + " ") > Expr.cacheLength) {
                        // Only keep the most recent entries
                        delete cache[keys.shift()];
                    }
                    return (cache[key + " "] = value);
                }
                return cache;
            }

            /**
             * Mark a function for special use by Sizzle
             * @param {Function} fn The function to mark
             */
            function markFunction(fn) {
                fn[expando] = true;
                return fn;
            }

            /**
             * Support testing using an element
             * @param {Function} fn Passed the created div and expects a boolean result
             */
            function assert(fn) {
                var div = document.createElement("div");

                try {
                    return !!fn(div);
                } catch (e) {
                    return false;
                } finally {
                    // Remove from its parent by default
                    if (div.parentNode) {
                        div.parentNode.removeChild(div);
                    }
                    // release memory in IE
                    div = null;
                }
            }

            /**
             * Adds the same handler for all of the specified attrs
             * @param {String} attrs Pipe-separated list of attributes
             * @param {Function} handler The method that will be applied
             */
            function addHandle(attrs, handler) {
                var arr = attrs.split("|"),
                    i = arr.length;

                while (i--) {
                    Expr.attrHandle[arr[i]] = handler;
                }
            }

            /**
             * Checks document order of two siblings
             * @param {Element} a
             * @param {Element} b
             * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
             */
            function siblingCheck(a, b) {
                var cur = b && a,
                    diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
                    (~b.sourceIndex || MAX_NEGATIVE) -
                    (~a.sourceIndex || MAX_NEGATIVE);

                // Use IE sourceIndex if available on both nodes
                if (diff) {
                    return diff;
                }

                // Check if b follows a
                if (cur) {
                    while ((cur = cur.nextSibling)) {
                        if (cur === b) {
                            return -1;
                        }
                    }
                }

                return a ? 1 : -1;
            }

            /**
             * Returns a function to use in pseudos for input types
             * @param {String} type
             */
            function createInputPseudo(type) {
                return function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return name === "input" && elem.type === type;
                };
            }

            /**
             * Returns a function to use in pseudos for buttons
             * @param {String} type
             */
            function createButtonPseudo(type) {
                return function(elem) {
                    var name = elem.nodeName.toLowerCase();
                    return (name === "input" || name === "button") && elem.type === type;
                };
            }

            /**
             * Returns a function to use in pseudos for positionals
             * @param {Function} fn
             */
            function createPositionalPseudo(fn) {
                return markFunction(function(argument) {
                    argument = +argument;
                    return markFunction(function(seed, matches) {
                        var j,
                            matchIndexes = fn([], seed.length, argument),
                            i = matchIndexes.length;

                        // Match elements found at the specified indexes
                        while (i--) {
                            if (seed[(j = matchIndexes[i])]) {
                                seed[j] = !(matches[j] = seed[j]);
                            }
                        }
                    });
                });
            }

            /**
             * Checks a node for validity as a Sizzle context
             * @param {Element|Object=} context
             * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
             */
            function testContext(context) {
                return context && typeof context.getElementsByTagName !== "undefined" && context;
            }

            // Expose support vars for convenience
            support = Sizzle.support = {};

            /**
             * Detects XML nodes
             * @param {Element|Object} elem An element or a document
             * @returns {Boolean} True iff elem is a non-HTML XML node
             */
            isXML = Sizzle.isXML = function(elem) {
                // documentElement is verified for cases where it doesn't yet exist
                // (such as loading iframes in IE - #4833)
                var documentElement = elem && (elem.ownerDocument || elem).documentElement;
                return documentElement ? documentElement.nodeName !== "HTML" : false;
            };

            /**
             * Sets document-related variables once based on the current document
             * @param {Element|Object} [doc] An element or document object to use to set the document
             * @returns {Object} Returns the current document
             */
            setDocument = Sizzle.setDocument = function(node) {
                var hasCompare, parent,
                    doc = node ? node.ownerDocument || node : preferredDoc;

                // Return early if doc is invalid or already selected
                if (doc === document || doc.nodeType !== 9 || !doc.documentElement) {
                    return document;
                }

                // Update global variables
                document = doc;
                docElem = document.documentElement;
                documentIsHTML = !isXML(document);

                // Support: IE 9-11, Edge
                // Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
                if ((parent = document.defaultView) && parent.top !== parent) {
                    // Support: IE 11
                    if (parent.addEventListener) {
                        parent.addEventListener("unload", unloadHandler, false);

                        // Support: IE 9 - 10 only
                    } else if (parent.attachEvent) {
                        parent.attachEvent("onunload", unloadHandler);
                    }
                }

                /* Attributes
                ---------------------------------------------------------------------- */

                // Support: IE<8
                // Verify that getAttribute really returns attributes and not properties
                // (excepting IE8 booleans)
                support.attributes = assert(function(div) {
                    div.className = "i";
                    return !div.getAttribute("className");
                });

                /* getElement(s)By*
                ---------------------------------------------------------------------- */

                // Check if getElementsByTagName("*") returns only elements
                support.getElementsByTagName = assert(function(div) {
                    div.appendChild(document.createComment(""));
                    return !div.getElementsByTagName("*").length;
                });

                // Support: IE<9
                support.getElementsByClassName = rnative.test(document.getElementsByClassName);

                // Support: IE<10
                // Check if getElementById returns elements by name
                // The broken getElementById methods don't pick up programatically-set names,
                // so use a roundabout getElementsByName test
                support.getById = assert(function(div) {
                    docElem.appendChild(div).id = expando;
                    return !document.getElementsByName || !document.getElementsByName(expando).length;
                });

                // ID find and filter
                if (support.getById) {
                    Expr.find["ID"] = function(id, context) {
                        if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                            var m = context.getElementById(id);
                            return m ? [m] : [];
                        }
                    };
                    Expr.filter["ID"] = function(id) {
                        var attrId = id.replace(runescape, funescape);
                        return function(elem) {
                            return elem.getAttribute("id") === attrId;
                        };
                    };
                } else {
                    // Support: IE6/7
                    // getElementById is not reliable as a find shortcut
                    delete Expr.find["ID"];

                    Expr.filter["ID"] = function(id) {
                        var attrId = id.replace(runescape, funescape);
                        return function(elem) {
                            var node = typeof elem.getAttributeNode !== "undefined" &&
                                elem.getAttributeNode("id");
                            return node && node.value === attrId;
                        };
                    };
                }

                // Tag
                Expr.find["TAG"] = support.getElementsByTagName ?
                    function(tag, context) {
                        if (typeof context.getElementsByTagName !== "undefined") {
                            return context.getElementsByTagName(tag);

                            // DocumentFragment nodes don't have gEBTN
                        } else if (support.qsa) {
                            return context.querySelectorAll(tag);
                        }
                    } :

                    function(tag, context) {
                        var elem,
                            tmp = [],
                            i = 0,
                            // By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
                            results = context.getElementsByTagName(tag);

                        // Filter out possible comments
                        if (tag === "*") {
                            while ((elem = results[i++])) {
                                if (elem.nodeType === 1) {
                                    tmp.push(elem);
                                }
                            }

                            return tmp;
                        }
                        return results;
                    };

                // Class
                Expr.find["CLASS"] = support.getElementsByClassName && function(className, context) {
                    if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
                        return context.getElementsByClassName(className);
                    }
                };

                /* QSA/matchesSelector
                ---------------------------------------------------------------------- */

                // QSA and matchesSelector support

                // matchesSelector(:active) reports false when true (IE9/Opera 11.5)
                rbuggyMatches = [];

                // qSa(:focus) reports false when true (Chrome 21)
                // We allow this because of a bug in IE8/9 that throws an error
                // whenever `document.activeElement` is accessed on an iframe
                // So, we allow :focus to pass through QSA all the time to avoid the IE error
                // See http://bugs.jquery.com/ticket/13378
                rbuggyQSA = [];

                if ((support.qsa = rnative.test(document.querySelectorAll))) {
                    // Build QSA regex
                    // Regex strategy adopted from Diego Perini
                    assert(function(div) {
                        // Select is set to empty string on purpose
                        // This is to test IE's treatment of not explicitly
                        // setting a boolean content attribute,
                        // since its presence should be enough
                        // http://bugs.jquery.com/ticket/12359
                        docElem.appendChild(div).innerHTML = "<a id='" + expando + "'></a>" +
                            "<select id='" + expando + "-\r\\' msallowcapture=''>" +
                            "<option selected=''></option></select>";

                        // Support: IE8, Opera 11-12.16
                        // Nothing should be selected when empty strings follow ^= or $= or *=
                        // The test attribute must be unknown in Opera but "safe" for WinRT
                        // http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
                        if (div.querySelectorAll("[msallowcapture^='']").length) {
                            rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
                        }

                        // Support: IE8
                        // Boolean attributes and "value" are not treated correctly
                        if (!div.querySelectorAll("[selected]").length) {
                            rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
                        }

                        // Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
                        if (!div.querySelectorAll("[id~=" + expando + "-]").length) {
                            rbuggyQSA.push("~=");
                        }

                        // Webkit/Opera - :checked should return selected option elements
                        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                        // IE8 throws error here and will not see later tests
                        if (!div.querySelectorAll(":checked").length) {
                            rbuggyQSA.push(":checked");
                        }

                        // Support: Safari 8+, iOS 8+
                        // https://bugs.webkit.org/show_bug.cgi?id=136851
                        // In-page `selector#id sibing-combinator selector` fails
                        if (!div.querySelectorAll("a#" + expando + "+*").length) {
                            rbuggyQSA.push(".#.+[+~]");
                        }
                    });

                    assert(function(div) {
                        // Support: Windows 8 Native Apps
                        // The type and name attributes are restricted during .innerHTML assignment
                        var input = document.createElement("input");
                        input.setAttribute("type", "hidden");
                        div.appendChild(input).setAttribute("name", "D");

                        // Support: IE8
                        // Enforce case-sensitivity of name attribute
                        if (div.querySelectorAll("[name=d]").length) {
                            rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
                        }

                        // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
                        // IE8 throws error here and will not see later tests
                        if (!div.querySelectorAll(":enabled").length) {
                            rbuggyQSA.push(":enabled", ":disabled");
                        }

                        // Opera 10-11 does not throw on post-comma invalid pseudos
                        div.querySelectorAll("*,:x");
                        rbuggyQSA.push(",.*:");
                    });
                }

                if ((support.matchesSelector = rnative.test((matches = docElem.matches ||
                        docElem.webkitMatchesSelector ||
                        docElem.mozMatchesSelector ||
                        docElem.oMatchesSelector ||
                        docElem.msMatchesSelector)))) {

                    assert(function(div) {
                        // Check to see if it's possible to do matchesSelector
                        // on a disconnected node (IE 9)
                        support.disconnectedMatch = matches.call(div, "div");

                        // This should fail with an exception
                        // Gecko does not error, returns false instead
                        matches.call(div, "[s!='']:x");
                        rbuggyMatches.push("!=", pseudos);
                    });
                }

                rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
                rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

                /* Contains
                ---------------------------------------------------------------------- */
                hasCompare = rnative.test(docElem.compareDocumentPosition);

                // Element contains another
                // Purposefully self-exclusive
                // As in, an element does not contain itself
                contains = hasCompare || rnative.test(docElem.contains) ?
                    function(a, b) {
                        var adown = a.nodeType === 9 ? a.documentElement : a,
                            bup = b && b.parentNode;
                        return a === bup || !!(bup && bup.nodeType === 1 && (
                            adown.contains ?
                            adown.contains(bup) :
                            a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16
                        ));
                    } :
                    function(a, b) {
                        if (b) {
                            while ((b = b.parentNode)) {
                                if (b === a) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    };

                /* Sorting
                ---------------------------------------------------------------------- */

                // Document order sorting
                sortOrder = hasCompare ?
                    function(a, b) {

                        // Flag for duplicate removal
                        if (a === b) {
                            hasDuplicate = true;
                            return 0;
                        }

                        // Sort on method existence if only one input has compareDocumentPosition
                        var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
                        if (compare) {
                            return compare;
                        }

                        // Calculate position if both inputs belong to the same document
                        compare = (a.ownerDocument || a) === (b.ownerDocument || b) ?
                            a.compareDocumentPosition(b) :

                            // Otherwise we know they are disconnected
                            1;

                        // Disconnected nodes
                        if (compare & 1 ||
                            (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {

                            // Choose the first element that is related to our preferred document
                            if (a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
                                return -1;
                            }
                            if (b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
                                return 1;
                            }

                            // Maintain original order
                            return sortInput ?
                                (indexOf(sortInput, a) - indexOf(sortInput, b)) :
                                0;
                        }

                        return compare & 4 ? -1 : 1;
                    } :
                    function(a, b) {
                        // Exit early if the nodes are identical
                        if (a === b) {
                            hasDuplicate = true;
                            return 0;
                        }

                        var cur,
                            i = 0,
                            aup = a.parentNode,
                            bup = b.parentNode,
                            ap = [a],
                            bp = [b];

                        // Parentless nodes are either documents or disconnected
                        if (!aup || !bup) {
                            return a === document ? -1 :
                                b === document ? 1 :
                                aup ? -1 :
                                bup ? 1 :
                                sortInput ?
                                (indexOf(sortInput, a) - indexOf(sortInput, b)) :
                                0;

                            // If the nodes are siblings, we can do a quick check
                        } else if (aup === bup) {
                            return siblingCheck(a, b);
                        }

                        // Otherwise we need full lists of their ancestors for comparison
                        cur = a;
                        while ((cur = cur.parentNode)) {
                            ap.unshift(cur);
                        }
                        cur = b;
                        while ((cur = cur.parentNode)) {
                            bp.unshift(cur);
                        }

                        // Walk down the tree looking for a discrepancy
                        while (ap[i] === bp[i]) {
                            i++;
                        }

                        return i ?
                            // Do a sibling check if the nodes have a common ancestor
                            siblingCheck(ap[i], bp[i]) :

                            // Otherwise nodes in our document sort first
                            ap[i] === preferredDoc ? -1 :
                            bp[i] === preferredDoc ? 1 :
                            0;
                    };

                return document;
            };

            Sizzle.matches = function(expr, elements) {
                return Sizzle(expr, null, null, elements);
            };

            Sizzle.matchesSelector = function(elem, expr) {
                // Set document vars if needed
                if ((elem.ownerDocument || elem) !== document) {
                    setDocument(elem);
                }

                // Make sure that attribute selectors are quoted
                expr = expr.replace(rattributeQuotes, "='$1']");

                if (support.matchesSelector && documentIsHTML &&
                    !compilerCache[expr + " "] &&
                    (!rbuggyMatches || !rbuggyMatches.test(expr)) &&
                    (!rbuggyQSA || !rbuggyQSA.test(expr))) {

                    try {
                        var ret = matches.call(elem, expr);

                        // IE 9's matchesSelector returns false on disconnected nodes
                        if (ret || support.disconnectedMatch ||
                            // As well, disconnected nodes are said to be in a document
                            // fragment in IE 9
                            elem.document && elem.document.nodeType !== 11) {
                            return ret;
                        }
                    } catch (e) {}
                }

                return Sizzle(expr, document, null, [elem]).length > 0;
            };

            Sizzle.contains = function(context, elem) {
                // Set document vars if needed
                if ((context.ownerDocument || context) !== document) {
                    setDocument(context);
                }
                return contains(context, elem);
            };

            Sizzle.attr = function(elem, name) {
                // Set document vars if needed
                if ((elem.ownerDocument || elem) !== document) {
                    setDocument(elem);
                }

                var fn = Expr.attrHandle[name.toLowerCase()],
                    // Don't get fooled by Object.prototype properties (jQuery #13807)
                    val = fn && hasOwn.call(Expr.attrHandle, name.toLowerCase()) ?
                    fn(elem, name, !documentIsHTML) :
                    undefined;

                return val !== undefined ?
                    val :
                    support.attributes || !documentIsHTML ?
                    elem.getAttribute(name) :
                    (val = elem.getAttributeNode(name)) && val.specified ?
                    val.value :
                    null;
            };

            Sizzle.error = function(msg) {
                throw new Error("Syntax error, unrecognized expression: " + msg);
            };

            /**
             * Document sorting and removing duplicates
             * @param {ArrayLike} results
             */
            Sizzle.uniqueSort = function(results) {
                var elem,
                    duplicates = [],
                    j = 0,
                    i = 0;

                // Unless we *know* we can detect duplicates, assume their presence
                hasDuplicate = !support.detectDuplicates;
                sortInput = !support.sortStable && results.slice(0);
                results.sort(sortOrder);

                if (hasDuplicate) {
                    while ((elem = results[i++])) {
                        if (elem === results[i]) {
                            j = duplicates.push(i);
                        }
                    }
                    while (j--) {
                        results.splice(duplicates[j], 1);
                    }
                }

                // Clear input after sorting to release objects
                // See https://github.com/jquery/sizzle/pull/225
                sortInput = null;

                return results;
            };

            /**
             * Utility function for retrieving the text value of an array of DOM nodes
             * @param {Array|Element} elem
             */
            getText = Sizzle.getText = function(elem) {
                var node,
                    ret = "",
                    i = 0,
                    nodeType = elem.nodeType;

                if (!nodeType) {
                    // If no nodeType, this is expected to be an array
                    while ((node = elem[i++])) {
                        // Do not traverse comment nodes
                        ret += getText(node);
                    }
                } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
                    // Use textContent for elements
                    // innerText usage removed for consistency of new lines (jQuery #11153)
                    if (typeof elem.textContent === "string") {
                        return elem.textContent;
                    } else {
                        // Traverse its children
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                            ret += getText(elem);
                        }
                    }
                } else if (nodeType === 3 || nodeType === 4) {
                    return elem.nodeValue;
                }
                // Do not include comment or processing instruction nodes

                return ret;
            };

            Expr = Sizzle.selectors = {

                // Can be adjusted by the user
                cacheLength: 50,

                createPseudo: markFunction,

                match: matchExpr,

                attrHandle: {},

                find: {},

                relative: {
                    ">": {
                        dir: "parentNode",
                        first: true
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: true
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },

                preFilter: {
                    "ATTR": function(match) {
                        match[1] = match[1].replace(runescape, funescape);

                        // Move the given value to match[3] whether quoted or unquoted
                        match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);

                        if (match[2] === "~=") {
                            match[3] = " " + match[3] + " ";
                        }

                        return match.slice(0, 4);
                    },

                    "CHILD": function(match) {
                        /* matches from matchExpr["CHILD"]
                        	1 type (only|nth|...)
                        	2 what (child|of-type)
                        	3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
                        	4 xn-component of xn+y argument ([+-]?\d*n|)
                        	5 sign of xn-component
                        	6 x of xn-component
                        	7 sign of y-component
                        	8 y of y-component
                        */
                        match[1] = match[1].toLowerCase();

                        if (match[1].slice(0, 3) === "nth") {
                            // nth-* requires argument
                            if (!match[3]) {
                                Sizzle.error(match[0]);
                            }

                            // numeric x and y parameters for Expr.filter.CHILD
                            // remember that false/true cast respectively to 0/1
                            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                            match[5] = +((match[7] + match[8]) || match[3] === "odd");

                            // other types prohibit arguments
                        } else if (match[3]) {
                            Sizzle.error(match[0]);
                        }

                        return match;
                    },

                    "PSEUDO": function(match) {
                        var excess,
                            unquoted = !match[6] && match[2];

                        if (matchExpr["CHILD"].test(match[0])) {
                            return null;
                        }

                        // Accept quoted arguments as-is
                        if (match[3]) {
                            match[2] = match[4] || match[5] || "";

                            // Strip excess characters from unquoted arguments
                        } else if (unquoted && rpseudo.test(unquoted) &&
                            // Get excess from tokenize (recursively)
                            (excess = tokenize(unquoted, true)) &&
                            // advance to the next closing parenthesis
                            (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {

                            // excess is a negative index
                            match[0] = match[0].slice(0, excess);
                            match[2] = unquoted.slice(0, excess);
                        }

                        // Return only captures needed by the pseudo filter method (type and argument)
                        return match.slice(0, 3);
                    }
                },

                filter: {

                    "TAG": function(nodeNameSelector) {
                        var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                        return nodeNameSelector === "*" ?
                            function() {
                                return true;
                            } :
                            function(elem) {
                                return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
                            };
                    },

                    "CLASS": function(className) {
                        var pattern = classCache[className + " "];

                        return pattern ||
                            (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) &&
                            classCache(className, function(elem) {
                                return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "");
                            });
                    },

                    "ATTR": function(name, operator, check) {
                        return function(elem) {
                            var result = Sizzle.attr(elem, name);

                            if (result == null) {
                                return operator === "!=";
                            }
                            if (!operator) {
                                return true;
                            }

                            result += "";

                            return operator === "=" ? result === check :
                                operator === "!=" ? result !== check :
                                operator === "^=" ? check && result.indexOf(check) === 0 :
                                operator === "*=" ? check && result.indexOf(check) > -1 :
                                operator === "$=" ? check && result.slice(-check.length) === check :
                                operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 :
                                operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" :
                                false;
                        };
                    },

                    "CHILD": function(type, what, argument, first, last) {
                        var simple = type.slice(0, 3) !== "nth",
                            forward = type.slice(-4) !== "last",
                            ofType = what === "of-type";

                        return first === 1 && last === 0 ?

                            // Shortcut for :nth-*(n)
                            function(elem) {
                                return !!elem.parentNode;
                            } :

                            function(elem, context, xml) {
                                var cache, uniqueCache, outerCache, node, nodeIndex, start,
                                    dir = simple !== forward ? "nextSibling" : "previousSibling",
                                    parent = elem.parentNode,
                                    name = ofType && elem.nodeName.toLowerCase(),
                                    useCache = !xml && !ofType,
                                    diff = false;

                                if (parent) {

                                    // :(first|last|only)-(child|of-type)
                                    if (simple) {
                                        while (dir) {
                                            node = elem;
                                            while ((node = node[dir])) {
                                                if (ofType ?
                                                    node.nodeName.toLowerCase() === name :
                                                    node.nodeType === 1) {

                                                    return false;
                                                }
                                            }
                                            // Reverse direction for :only-* (if we haven't yet done so)
                                            start = dir = type === "only" && !start && "nextSibling";
                                        }
                                        return true;
                                    }

                                    start = [forward ? parent.firstChild : parent.lastChild];

                                    // non-xml :nth-child(...) stores cache data on `parent`
                                    if (forward && useCache) {

                                        // Seek `elem` from a previously-cached index

                                        // ...in a gzip-friendly way
                                        node = parent;
                                        outerCache = node[expando] || (node[expando] = {});

                                        // Support: IE <9 only
                                        // Defend against cloned attroperties (jQuery gh-1709)
                                        uniqueCache = outerCache[node.uniqueID] ||
                                            (outerCache[node.uniqueID] = {});

                                        cache = uniqueCache[type] || [];
                                        nodeIndex = cache[0] === dirruns && cache[1];
                                        diff = nodeIndex && cache[2];
                                        node = nodeIndex && parent.childNodes[nodeIndex];

                                        while ((node = ++nodeIndex && node && node[dir] ||

                                                // Fallback to seeking `elem` from the start
                                                (diff = nodeIndex = 0) || start.pop())) {

                                            // When found, cache indexes on `parent` and break
                                            if (node.nodeType === 1 && ++diff && node === elem) {
                                                uniqueCache[type] = [dirruns, nodeIndex, diff];
                                                break;
                                            }
                                        }

                                    } else {
                                        // Use previously-cached element index if available
                                        if (useCache) {
                                            // ...in a gzip-friendly way
                                            node = elem;
                                            outerCache = node[expando] || (node[expando] = {});

                                            // Support: IE <9 only
                                            // Defend against cloned attroperties (jQuery gh-1709)
                                            uniqueCache = outerCache[node.uniqueID] ||
                                                (outerCache[node.uniqueID] = {});

                                            cache = uniqueCache[type] || [];
                                            nodeIndex = cache[0] === dirruns && cache[1];
                                            diff = nodeIndex;
                                        }

                                        // xml :nth-child(...)
                                        // or :nth-last-child(...) or :nth(-last)?-of-type(...)
                                        if (diff === false) {
                                            // Use the same loop as above to seek `elem` from the start
                                            while ((node = ++nodeIndex && node && node[dir] ||
                                                    (diff = nodeIndex = 0) || start.pop())) {

                                                if ((ofType ?
                                                        node.nodeName.toLowerCase() === name :
                                                        node.nodeType === 1) &&
                                                    ++diff) {

                                                    // Cache the index of each encountered element
                                                    if (useCache) {
                                                        outerCache = node[expando] || (node[expando] = {});

                                                        // Support: IE <9 only
                                                        // Defend against cloned attroperties (jQuery gh-1709)
                                                        uniqueCache = outerCache[node.uniqueID] ||
                                                            (outerCache[node.uniqueID] = {});

                                                        uniqueCache[type] = [dirruns, diff];
                                                    }

                                                    if (node === elem) {
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    }

                                    // Incorporate the offset, then check against cycle size
                                    diff -= last;
                                    return diff === first || (diff % first === 0 && diff / first >= 0);
                                }
                            };
                    },

                    "PSEUDO": function(pseudo, argument) {
                        // pseudo-class names are case-insensitive
                        // http://www.w3.org/TR/selectors/#pseudo-classes
                        // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
                        // Remember that setFilters inherits from pseudos
                        var args,
                            fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] ||
                            Sizzle.error("unsupported pseudo: " + pseudo);

                        // The user may use createPseudo to indicate that
                        // arguments are needed to create the filter function
                        // just as Sizzle does
                        if (fn[expando]) {
                            return fn(argument);
                        }

                        // But maintain support for old signatures
                        if (fn.length > 1) {
                            args = [pseudo, pseudo, "", argument];
                            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ?
                                markFunction(function(seed, matches) {
                                    var idx,
                                        matched = fn(seed, argument),
                                        i = matched.length;
                                    while (i--) {
                                        idx = indexOf(seed, matched[i]);
                                        seed[idx] = !(matches[idx] = matched[i]);
                                    }
                                }) :
                                function(elem) {
                                    return fn(elem, 0, args);
                                };
                        }

                        return fn;
                    }
                },

                pseudos: {
                    // Potentially complex pseudos
                    "not": markFunction(function(selector) {
                        // Trim the selector passed to compile
                        // to avoid treating leading and trailing
                        // spaces as combinators
                        var input = [],
                            results = [],
                            matcher = compile(selector.replace(rtrim, "$1"));

                        return matcher[expando] ?
                            markFunction(function(seed, matches, context, xml) {
                                var elem,
                                    unmatched = matcher(seed, null, xml, []),
                                    i = seed.length;

                                // Match elements unmatched by `matcher`
                                while (i--) {
                                    if ((elem = unmatched[i])) {
                                        seed[i] = !(matches[i] = elem);
                                    }
                                }
                            }) :
                            function(elem, context, xml) {
                                input[0] = elem;
                                matcher(input, null, xml, results);
                                // Don't keep the element (issue #299)
                                input[0] = null;
                                return !results.pop();
                            };
                    }),

                    "has": markFunction(function(selector) {
                        return function(elem) {
                            return Sizzle(selector, elem).length > 0;
                        };
                    }),

                    "contains": markFunction(function(text) {
                        text = text.replace(runescape, funescape);
                        return function(elem) {
                            return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
                        };
                    }),

                    // "Whether an element is represented by a :lang() selector
                    // is based solely on the element's language value
                    // being equal to the identifier C,
                    // or beginning with the identifier C immediately followed by "-".
                    // The matching of C against the element's language value is performed case-insensitively.
                    // The identifier C does not have to be a valid language name."
                    // http://www.w3.org/TR/selectors/#lang-pseudo
                    "lang": markFunction(function(lang) {
                        // lang value must be a valid identifier
                        if (!ridentifier.test(lang || "")) {
                            Sizzle.error("unsupported lang: " + lang);
                        }
                        lang = lang.replace(runescape, funescape).toLowerCase();
                        return function(elem) {
                            var elemLang;
                            do {
                                if ((elemLang = documentIsHTML ?
                                        elem.lang :
                                        elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {

                                    elemLang = elemLang.toLowerCase();
                                    return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                                }
                            } while ((elem = elem.parentNode) && elem.nodeType === 1);
                            return false;
                        };
                    }),

                    // Miscellaneous
                    "target": function(elem) {
                        var hash = window.location && window.location.hash;
                        return hash && hash.slice(1) === elem.id;
                    },

                    "root": function(elem) {
                        return elem === docElem;
                    },

                    "focus": function(elem) {
                        return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
                    },

                    // Boolean properties
                    "enabled": function(elem) {
                        return elem.disabled === false;
                    },

                    "disabled": function(elem) {
                        return elem.disabled === true;
                    },

                    "checked": function(elem) {
                        // In CSS3, :checked should return both checked and selected elements
                        // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
                        var nodeName = elem.nodeName.toLowerCase();
                        return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
                    },

                    "selected": function(elem) {
                        // Accessing this property makes selected-by-default
                        // options in Safari work properly
                        if (elem.parentNode) {
                            elem.parentNode.selectedIndex;
                        }

                        return elem.selected === true;
                    },

                    // Contents
                    "empty": function(elem) {
                        // http://www.w3.org/TR/selectors/#empty-pseudo
                        // :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
                        //   but not by others (comment: 8; processing instruction: 7; etc.)
                        // nodeType < 6 works because attributes (2) do not appear as children
                        for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                            if (elem.nodeType < 6) {
                                return false;
                            }
                        }
                        return true;
                    },

                    "parent": function(elem) {
                        return !Expr.pseudos["empty"](elem);
                    },

                    // Element/input types
                    "header": function(elem) {
                        return rheader.test(elem.nodeName);
                    },

                    "input": function(elem) {
                        return rinputs.test(elem.nodeName);
                    },

                    "button": function(elem) {
                        var name = elem.nodeName.toLowerCase();
                        return name === "input" && elem.type === "button" || name === "button";
                    },

                    "text": function(elem) {
                        var attr;
                        return elem.nodeName.toLowerCase() === "input" &&
                            elem.type === "text" &&

                            // Support: IE<8
                            // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
                            ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
                    },

                    // Position-in-collection
                    "first": createPositionalPseudo(function() {
                        return [0];
                    }),

                    "last": createPositionalPseudo(function(matchIndexes, length) {
                        return [length - 1];
                    }),

                    "eq": createPositionalPseudo(function(matchIndexes, length, argument) {
                        return [argument < 0 ? argument + length : argument];
                    }),

                    "even": createPositionalPseudo(function(matchIndexes, length) {
                        var i = 0;
                        for (; i < length; i += 2) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    }),

                    "odd": createPositionalPseudo(function(matchIndexes, length) {
                        var i = 1;
                        for (; i < length; i += 2) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    }),

                    "lt": createPositionalPseudo(function(matchIndexes, length, argument) {
                        var i = argument < 0 ? argument + length : argument;
                        for (; --i >= 0;) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    }),

                    "gt": createPositionalPseudo(function(matchIndexes, length, argument) {
                        var i = argument < 0 ? argument + length : argument;
                        for (; ++i < length;) {
                            matchIndexes.push(i);
                        }
                        return matchIndexes;
                    })
                }
            };

            Expr.pseudos["nth"] = Expr.pseudos["eq"];

            // Add button/input type pseudos
            for (i in {
                    radio: true,
                    checkbox: true,
                    file: true,
                    password: true,
                    image: true
                }) {
                Expr.pseudos[i] = createInputPseudo(i);
            }
            for (i in {
                    submit: true,
                    reset: true
                }) {
                Expr.pseudos[i] = createButtonPseudo(i);
            }

            // Easy API for creating new setFilters
            function setFilters() {}
            setFilters.prototype = Expr.filters = Expr.pseudos;
            Expr.setFilters = new setFilters();

            tokenize = Sizzle.tokenize = function(selector, parseOnly) {
                var matched, match, tokens, type,
                    soFar, groups, preFilters,
                    cached = tokenCache[selector + " "];

                if (cached) {
                    return parseOnly ? 0 : cached.slice(0);
                }

                soFar = selector;
                groups = [];
                preFilters = Expr.preFilter;

                while (soFar) {

                    // Comma and first run
                    if (!matched || (match = rcomma.exec(soFar))) {
                        if (match) {
                            // Don't consume trailing commas as valid
                            soFar = soFar.slice(match[0].length) || soFar;
                        }
                        groups.push((tokens = []));
                    }

                    matched = false;

                    // Combinators
                    if ((match = rcombinators.exec(soFar))) {
                        matched = match.shift();
                        tokens.push({
                            value: matched,
                            // Cast descendant combinators to space
                            type: match[0].replace(rtrim, " ")
                        });
                        soFar = soFar.slice(matched.length);
                    }

                    // Filters
                    for (type in Expr.filter) {
                        if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] ||
                                (match = preFilters[type](match)))) {
                            matched = match.shift();
                            tokens.push({
                                value: matched,
                                type: type,
                                matches: match
                            });
                            soFar = soFar.slice(matched.length);
                        }
                    }

                    if (!matched) {
                        break;
                    }
                }

                // Return the length of the invalid excess
                // if we're just parsing
                // Otherwise, throw an error or return tokens
                return parseOnly ?
                    soFar.length :
                    soFar ?
                    Sizzle.error(selector) :
                    // Cache the tokens
                    tokenCache(selector, groups).slice(0);
            };

            function toSelector(tokens) {
                var i = 0,
                    len = tokens.length,
                    selector = "";
                for (; i < len; i++) {
                    selector += tokens[i].value;
                }
                return selector;
            }

            function addCombinator(matcher, combinator, base) {
                var dir = combinator.dir,
                    checkNonElements = base && dir === "parentNode",
                    doneName = done++;

                return combinator.first ?
                    // Check against closest ancestor/preceding element
                    function(elem, context, xml) {
                        while ((elem = elem[dir])) {
                            if (elem.nodeType === 1 || checkNonElements) {
                                return matcher(elem, context, xml);
                            }
                        }
                    } :

                    // Check against all ancestor/preceding elements
                    function(elem, context, xml) {
                        var oldCache, uniqueCache, outerCache,
                            newCache = [dirruns, doneName];

                        // We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
                        if (xml) {
                            while ((elem = elem[dir])) {
                                if (elem.nodeType === 1 || checkNonElements) {
                                    if (matcher(elem, context, xml)) {
                                        return true;
                                    }
                                }
                            }
                        } else {
                            while ((elem = elem[dir])) {
                                if (elem.nodeType === 1 || checkNonElements) {
                                    outerCache = elem[expando] || (elem[expando] = {});

                                    // Support: IE <9 only
                                    // Defend against cloned attroperties (jQuery gh-1709)
                                    uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});

                                    if ((oldCache = uniqueCache[dir]) &&
                                        oldCache[0] === dirruns && oldCache[1] === doneName) {

                                        // Assign to newCache so results back-propagate to previous elements
                                        return (newCache[2] = oldCache[2]);
                                    } else {
                                        // Reuse newcache so results back-propagate to previous elements
                                        uniqueCache[dir] = newCache;

                                        // A match means we're done; a fail means we have to keep checking
                                        if ((newCache[2] = matcher(elem, context, xml))) {
                                            return true;
                                        }
                                    }
                                }
                            }
                        }
                    };
            }

            function elementMatcher(matchers) {
                return matchers.length > 1 ?
                    function(elem, context, xml) {
                        var i = matchers.length;
                        while (i--) {
                            if (!matchers[i](elem, context, xml)) {
                                return false;
                            }
                        }
                        return true;
                    } :
                    matchers[0];
            }

            function multipleContexts(selector, contexts, results) {
                var i = 0,
                    len = contexts.length;
                for (; i < len; i++) {
                    Sizzle(selector, contexts[i], results);
                }
                return results;
            }

            function condense(unmatched, map, filter, context, xml) {
                var elem,
                    newUnmatched = [],
                    i = 0,
                    len = unmatched.length,
                    mapped = map != null;

                for (; i < len; i++) {
                    if ((elem = unmatched[i])) {
                        if (!filter || filter(elem, context, xml)) {
                            newUnmatched.push(elem);
                            if (mapped) {
                                map.push(i);
                            }
                        }
                    }
                }

                return newUnmatched;
            }

            function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
                if (postFilter && !postFilter[expando]) {
                    postFilter = setMatcher(postFilter);
                }
                if (postFinder && !postFinder[expando]) {
                    postFinder = setMatcher(postFinder, postSelector);
                }
                return markFunction(function(seed, results, context, xml) {
                    var temp, i, elem,
                        preMap = [],
                        postMap = [],
                        preexisting = results.length,

                        // Get initial elements from seed or context
                        elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),

                        // Prefilter to get matcher input, preserving a map for seed-results synchronization
                        matcherIn = preFilter && (seed || !selector) ?
                        condense(elems, preMap, preFilter, context, xml) :
                        elems,

                        matcherOut = matcher ?
                        // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                        postFinder || (seed ? preFilter : preexisting || postFilter) ?

                        // ...intermediate processing is necessary
                        [] :

                        // ...otherwise use results directly
                        results :
                        matcherIn;

                    // Find primary matches
                    if (matcher) {
                        matcher(matcherIn, matcherOut, context, xml);
                    }

                    // Apply postFilter
                    if (postFilter) {
                        temp = condense(matcherOut, postMap);
                        postFilter(temp, [], context, xml);

                        // Un-match failing elements by moving them back to matcherIn
                        i = temp.length;
                        while (i--) {
                            if ((elem = temp[i])) {
                                matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
                            }
                        }
                    }

                    if (seed) {
                        if (postFinder || preFilter) {
                            if (postFinder) {
                                // Get the final matcherOut by condensing this intermediate into postFinder contexts
                                temp = [];
                                i = matcherOut.length;
                                while (i--) {
                                    if ((elem = matcherOut[i])) {
                                        // Restore matcherIn since elem is not yet a final match
                                        temp.push((matcherIn[i] = elem));
                                    }
                                }
                                postFinder(null, (matcherOut = []), temp, xml);
                            }

                            // Move matched elements from seed to results to keep them synchronized
                            i = matcherOut.length;
                            while (i--) {
                                if ((elem = matcherOut[i]) &&
                                    (temp = postFinder ? indexOf(seed, elem) : preMap[i]) > -1) {

                                    seed[temp] = !(results[temp] = elem);
                                }
                            }
                        }

                        // Add elements to results, through postFinder if defined
                    } else {
                        matcherOut = condense(
                            matcherOut === results ?
                            matcherOut.splice(preexisting, matcherOut.length) :
                            matcherOut
                        );
                        if (postFinder) {
                            postFinder(null, results, matcherOut, xml);
                        } else {
                            push.apply(results, matcherOut);
                        }
                    }
                });
            }

            function matcherFromTokens(tokens) {
                var checkContext, matcher, j,
                    len = tokens.length,
                    leadingRelative = Expr.relative[tokens[0].type],
                    implicitRelative = leadingRelative || Expr.relative[" "],
                    i = leadingRelative ? 1 : 0,

                    // The foundational matcher ensures that elements are reachable from top-level context(s)
                    matchContext = addCombinator(function(elem) {
                        return elem === checkContext;
                    }, implicitRelative, true),
                    matchAnyContext = addCombinator(function(elem) {
                        return indexOf(checkContext, elem) > -1;
                    }, implicitRelative, true),
                    matchers = [function(elem, context, xml) {
                        var ret = (!leadingRelative && (xml || context !== outermostContext)) || (
                            (checkContext = context).nodeType ?
                            matchContext(elem, context, xml) :
                            matchAnyContext(elem, context, xml));
                        // Avoid hanging onto element (issue #299)
                        checkContext = null;
                        return ret;
                    }];

                for (; i < len; i++) {
                    if ((matcher = Expr.relative[tokens[i].type])) {
                        matchers = [addCombinator(elementMatcher(matchers), matcher)];
                    } else {
                        matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

                        // Return special upon seeing a positional matcher
                        if (matcher[expando]) {
                            // Find the next relative operator (if any) for proper handling
                            j = ++i;
                            for (; j < len; j++) {
                                if (Expr.relative[tokens[j].type]) {
                                    break;
                                }
                            }
                            return setMatcher(
                                i > 1 && elementMatcher(matchers),
                                i > 1 && toSelector(
                                    // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                                    tokens.slice(0, i - 1).concat({
                                        value: tokens[i - 2].type === " " ? "*" : ""
                                    })
                                ).replace(rtrim, "$1"),
                                matcher,
                                i < j && matcherFromTokens(tokens.slice(i, j)),
                                j < len && matcherFromTokens((tokens = tokens.slice(j))),
                                j < len && toSelector(tokens)
                            );
                        }
                        matchers.push(matcher);
                    }
                }

                return elementMatcher(matchers);
            }

            function matcherFromGroupMatchers(elementMatchers, setMatchers) {
                var bySet = setMatchers.length > 0,
                    byElement = elementMatchers.length > 0,
                    superMatcher = function(seed, context, xml, results, outermost) {
                        var elem, j, matcher,
                            matchedCount = 0,
                            i = "0",
                            unmatched = seed && [],
                            setMatched = [],
                            contextBackup = outermostContext,
                            // We must always have either seed elements or outermost context
                            elems = seed || byElement && Expr.find["TAG"]("*", outermost),
                            // Use integer dirruns iff this is the outermost matcher
                            dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
                            len = elems.length;

                        if (outermost) {
                            outermostContext = context === document || context || outermost;
                        }

                        // Add elements passing elementMatchers directly to results
                        // Support: IE<9, Safari
                        // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
                        for (; i !== len && (elem = elems[i]) != null; i++) {
                            if (byElement && elem) {
                                j = 0;
                                if (!context && elem.ownerDocument !== document) {
                                    setDocument(elem);
                                    xml = !documentIsHTML;
                                }
                                while ((matcher = elementMatchers[j++])) {
                                    if (matcher(elem, context || document, xml)) {
                                        results.push(elem);
                                        break;
                                    }
                                }
                                if (outermost) {
                                    dirruns = dirrunsUnique;
                                }
                            }

                            // Track unmatched elements for set filters
                            if (bySet) {
                                // They will have gone through all possible matchers
                                if ((elem = !matcher && elem)) {
                                    matchedCount--;
                                }

                                // Lengthen the array for every element, matched or not
                                if (seed) {
                                    unmatched.push(elem);
                                }
                            }
                        }

                        // `i` is now the count of elements visited above, and adding it to `matchedCount`
                        // makes the latter nonnegative.
                        matchedCount += i;

                        // Apply set filters to unmatched elements
                        // NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
                        // equals `i`), unless we didn't visit _any_ elements in the above loop because we have
                        // no element matchers and no seed.
                        // Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
                        // case, which will result in a "00" `matchedCount` that differs from `i` but is also
                        // numerically zero.
                        if (bySet && i !== matchedCount) {
                            j = 0;
                            while ((matcher = setMatchers[j++])) {
                                matcher(unmatched, setMatched, context, xml);
                            }

                            if (seed) {
                                // Reintegrate element matches to eliminate the need for sorting
                                if (matchedCount > 0) {
                                    while (i--) {
                                        if (!(unmatched[i] || setMatched[i])) {
                                            setMatched[i] = pop.call(results);
                                        }
                                    }
                                }

                                // Discard index placeholder values to get only actual matches
                                setMatched = condense(setMatched);
                            }

                            // Add matches to results
                            push.apply(results, setMatched);

                            // Seedless set matches succeeding multiple successful matchers stipulate sorting
                            if (outermost && !seed && setMatched.length > 0 &&
                                (matchedCount + setMatchers.length) > 1) {

                                Sizzle.uniqueSort(results);
                            }
                        }

                        // Override manipulation of globals by nested matchers
                        if (outermost) {
                            dirruns = dirrunsUnique;
                            outermostContext = contextBackup;
                        }

                        return unmatched;
                    };

                return bySet ?
                    markFunction(superMatcher) :
                    superMatcher;
            }

            compile = Sizzle.compile = function(selector, match /* Internal Use Only */ ) {
                var i,
                    setMatchers = [],
                    elementMatchers = [],
                    cached = compilerCache[selector + " "];

                if (!cached) {
                    // Generate a function of recursive functions that can be used to check each element
                    if (!match) {
                        match = tokenize(selector);
                    }
                    i = match.length;
                    while (i--) {
                        cached = matcherFromTokens(match[i]);
                        if (cached[expando]) {
                            setMatchers.push(cached);
                        } else {
                            elementMatchers.push(cached);
                        }
                    }

                    // Cache the compiled function
                    cached = compilerCache(selector, matcherFromGroupMatchers(elementMatchers, setMatchers));

                    // Save selector and tokenization
                    cached.selector = selector;
                }
                return cached;
            };

            /**
             * A low-level selection function that works with Sizzle's compiled
             *  selector functions
             * @param {String|Function} selector A selector or a pre-compiled
             *  selector function built with Sizzle.compile
             * @param {Element} context
             * @param {Array} [results]
             * @param {Array} [seed] A set of elements to match against
             */
            select = Sizzle.select = function(selector, context, results, seed) {
                var i, tokens, token, type, find,
                    compiled = typeof selector === "function" && selector,
                    match = !seed && tokenize((selector = compiled.selector || selector));

                results = results || [];

                // Try to minimize operations if there is only one selector in the list and no seed
                // (the latter of which guarantees us context)
                if (match.length === 1) {

                    // Reduce context if the leading compound selector is an ID
                    tokens = match[0] = match[0].slice(0);
                    if (tokens.length > 2 && (token = tokens[0]).type === "ID" &&
                        support.getById && context.nodeType === 9 && documentIsHTML &&
                        Expr.relative[tokens[1].type]) {

                        context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
                        if (!context) {
                            return results;

                            // Precompiled matchers will still verify ancestry, so step up a level
                        } else if (compiled) {
                            context = context.parentNode;
                        }

                        selector = selector.slice(tokens.shift().value.length);
                    }

                    // Fetch a seed set for right-to-left matching
                    i = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
                    while (i--) {
                        token = tokens[i];

                        // Abort if we hit a combinator
                        if (Expr.relative[(type = token.type)]) {
                            break;
                        }
                        if ((find = Expr.find[type])) {
                            // Search, expanding context for leading sibling combinators
                            if ((seed = find(
                                    token.matches[0].replace(runescape, funescape),
                                    rsibling.test(tokens[0].type) && testContext(context.parentNode) || context
                                ))) {

                                // If seed is empty or no tokens remain, we can return early
                                tokens.splice(i, 1);
                                selector = seed.length && toSelector(tokens);
                                if (!selector) {
                                    push.apply(results, seed);
                                    return results;
                                }

                                break;
                            }
                        }
                    }
                }

                // Compile and execute a filtering function if one is not provided
                // Provide `match` to avoid retokenization if we modified the selector above
                (compiled || compile(selector, match))(
                    seed,
                    context, !documentIsHTML,
                    results, !context || rsibling.test(selector) && testContext(context.parentNode) || context
                );
                return results;
            };

            // One-time assignments

            // Sort stability
            support.sortStable = expando.split("").sort(sortOrder).join("") === expando;

            // Support: Chrome 14-35+
            // Always assume duplicates if they aren't passed to the comparison function
            support.detectDuplicates = !!hasDuplicate;

            // Initialize against the default document
            setDocument();

            // Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
            // Detached nodes confoundingly follow *each other*
            support.sortDetached = assert(function(div1) {
                // Should return 1, but returns 4 (following)
                return div1.compareDocumentPosition(document.createElement("div")) & 1;
            });

            // Support: IE<8
            // Prevent attribute/property "interpolation"
            // http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
            if (!assert(function(div) {
                    div.innerHTML = "<a href='#'></a>";
                    return div.firstChild.getAttribute("href") === "#";
                })) {
                addHandle("type|href|height|width", function(elem, name, isXML) {
                    if (!isXML) {
                        return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
                    }
                });
            }

            // Support: IE<9
            // Use defaultValue in place of getAttribute("value")
            if (!support.attributes || !assert(function(div) {
                    div.innerHTML = "<input/>";
                    div.firstChild.setAttribute("value", "");
                    return div.firstChild.getAttribute("value") === "";
                })) {
                addHandle("value", function(elem, name, isXML) {
                    if (!isXML && elem.nodeName.toLowerCase() === "input") {
                        return elem.defaultValue;
                    }
                });
            }

            // Support: IE<9
            // Use getAttributeNode to fetch booleans when getAttribute lies
            if (!assert(function(div) {
                    return div.getAttribute("disabled") == null;
                })) {
                addHandle(booleans, function(elem, name, isXML) {
                    var val;
                    if (!isXML) {
                        return elem[name] === true ? name.toLowerCase() :
                            (val = elem.getAttributeNode(name)) && val.specified ?
                            val.value :
                            null;
                    }
                });
            }

            return Sizzle;

        })(window);



    jQuery.find = Sizzle;
    jQuery.expr = Sizzle.selectors;
    jQuery.expr[":"] = jQuery.expr.pseudos;
    jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
    jQuery.text = Sizzle.getText;
    jQuery.isXMLDoc = Sizzle.isXML;
    jQuery.contains = Sizzle.contains;



    var dir = function(elem, dir, until) {
        var matched = [],
            truncate = until !== undefined;

        while ((elem = elem[dir]) && elem.nodeType !== 9) {
            if (elem.nodeType === 1) {
                if (truncate && jQuery(elem).is(until)) {
                    break;
                }
                matched.push(elem);
            }
        }
        return matched;
    };


    var siblings = function(n, elem) {
        var matched = [];

        for (; n; n = n.nextSibling) {
            if (n.nodeType === 1 && n !== elem) {
                matched.push(n);
            }
        }

        return matched;
    };


    var rneedsContext = jQuery.expr.match.needsContext;

    var rsingleTag = (/^<([\w-]+)\s*\/?>(?:<\/\1>|)$/);



    var risSimple = /^.[^:#\[\.,]*$/;

    // Implement the identical functionality for filter and not
    function winnow(elements, qualifier, not) {
        if (jQuery.isFunction(qualifier)) {
            return jQuery.grep(elements, function(elem, i) {
                /* jshint -W018 */
                return !!qualifier.call(elem, i, elem) !== not;
            });

        }

        if (qualifier.nodeType) {
            return jQuery.grep(elements, function(elem) {
                return (elem === qualifier) !== not;
            });

        }

        if (typeof qualifier === "string") {
            if (risSimple.test(qualifier)) {
                return jQuery.filter(qualifier, elements, not);
            }

            qualifier = jQuery.filter(qualifier, elements);
        }

        return jQuery.grep(elements, function(elem) {
            return (jQuery.inArray(elem, qualifier) > -1) !== not;
        });
    }

    jQuery.filter = function(expr, elems, not) {
        var elem = elems[0];

        if (not) {
            expr = ":not(" + expr + ")";
        }

        return elems.length === 1 && elem.nodeType === 1 ?
            jQuery.find.matchesSelector(elem, expr) ? [elem] : [] :
            jQuery.find.matches(expr, jQuery.grep(elems, function(elem) {
                return elem.nodeType === 1;
            }));
    };

    jQuery.fn.extend({
        find: function(selector) {
            var i,
                ret = [],
                self = this,
                len = self.length;

            if (typeof selector !== "string") {
                return this.pushStack(jQuery(selector).filter(function() {
                    for (i = 0; i < len; i++) {
                        if (jQuery.contains(self[i], this)) {
                            return true;
                        }
                    }
                }));
            }

            for (i = 0; i < len; i++) {
                jQuery.find(selector, self[i], ret);
            }

            // Needed because $( selector, context ) becomes $( context ).find( selector )
            ret = this.pushStack(len > 1 ? jQuery.unique(ret) : ret);
            ret.selector = this.selector ? this.selector + " " + selector : selector;
            return ret;
        },
        filter: function(selector) {
            return this.pushStack(winnow(this, selector || [], false));
        },
        not: function(selector) {
            return this.pushStack(winnow(this, selector || [], true));
        },
        is: function(selector) {
            return !!winnow(
                this,

                // If this is a positional/relative selector, check membership in the returned set
                // so $("p:first").is("p:last") won't return true for a doc with two "p".
                typeof selector === "string" && rneedsContext.test(selector) ?
                jQuery(selector) :
                selector || [],
                false
            ).length;
        }
    });


    // Initialize a jQuery object


    // A central reference to the root jQuery(document)
    var rootjQuery,

        // A simple way to check for HTML strings
        // Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
        // Strict HTML recognition (#11290: must start with <)
        rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

        init = jQuery.fn.init = function(selector, context, root) {
            var match, elem;

            // HANDLE: $(""), $(null), $(undefined), $(false)
            if (!selector) {
                return this;
            }

            // init accepts an alternate rootjQuery
            // so migrate can support jQuery.sub (gh-2101)
            root = root || rootjQuery;

            // Handle HTML strings
            if (typeof selector === "string") {
                if (selector.charAt(0) === "<" &&
                    selector.charAt(selector.length - 1) === ">" &&
                    selector.length >= 3) {

                    // Assume that strings that start and end with <> are HTML and skip the regex check
                    match = [null, selector, null];

                } else {
                    match = rquickExpr.exec(selector);
                }

                // Match html or make sure no context is specified for #id
                if (match && (match[1] || !context)) {

                    // HANDLE: $(html) -> $(array)
                    if (match[1]) {
                        context = context instanceof jQuery ? context[0] : context;

                        // scripts is true for back-compat
                        // Intentionally let the error be thrown if parseHTML is not present
                        jQuery.merge(this, jQuery.parseHTML(
                            match[1],
                            context && context.nodeType ? context.ownerDocument || context : document,
                            true
                        ));

                        // HANDLE: $(html, props)
                        if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                            for (match in context) {

                                // Properties of context are called as methods if possible
                                if (jQuery.isFunction(this[match])) {
                                    this[match](context[match]);

                                    // ...and otherwise set as attributes
                                } else {
                                    this.attr(match, context[match]);
                                }
                            }
                        }

                        return this;

                        // HANDLE: $(#id)
                    } else {
                        elem = document.getElementById(match[2]);

                        // Check parentNode to catch when Blackberry 4.6 returns
                        // nodes that are no longer in the document #6963
                        if (elem && elem.parentNode) {

                            // Handle the case where IE and Opera return items
                            // by name instead of ID
                            if (elem.id !== match[2]) {
                                return rootjQuery.find(selector);
                            }

                            // Otherwise, we inject the element directly into the jQuery object
                            this.length = 1;
                            this[0] = elem;
                        }

                        this.context = document;
                        this.selector = selector;
                        return this;
                    }

                    // HANDLE: $(expr, $(...))
                } else if (!context || context.jquery) {
                    return (context || root).find(selector);

                    // HANDLE: $(expr, context)
                    // (which is just equivalent to: $(context).find(expr)
                } else {
                    return this.constructor(context).find(selector);
                }

                // HANDLE: $(DOMElement)
            } else if (selector.nodeType) {
                this.context = this[0] = selector;
                this.length = 1;
                return this;

                // HANDLE: $(function)
                // Shortcut for document ready
            } else if (jQuery.isFunction(selector)) {
                return typeof root.ready !== "undefined" ?
                    root.ready(selector) :

                    // Execute immediately if ready is not present
                    selector(jQuery);
            }

            if (selector.selector !== undefined) {
                this.selector = selector.selector;
                this.context = selector.context;
            }

            return jQuery.makeArray(selector, this);
        };

    // Give the init function the jQuery prototype for later instantiation
    init.prototype = jQuery.fn;

    // Initialize central reference
    rootjQuery = jQuery(document);


    var rparentsprev = /^(?:parents|prev(?:Until|All))/,

        // methods guaranteed to produce a unique set when starting from a unique set
        guaranteedUnique = {
            children: true,
            contents: true,
            next: true,
            prev: true
        };

    jQuery.fn.extend({
        has: function(target) {
            var i,
                targets = jQuery(target, this),
                len = targets.length;

            return this.filter(function() {
                for (i = 0; i < len; i++) {
                    if (jQuery.contains(this, targets[i])) {
                        return true;
                    }
                }
            });
        },

        closest: function(selectors, context) {
            var cur,
                i = 0,
                l = this.length,
                matched = [],
                pos = rneedsContext.test(selectors) || typeof selectors !== "string" ?
                jQuery(selectors, context || this.context) :
                0;

            for (; i < l; i++) {
                for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {

                    // Always skip document fragments
                    if (cur.nodeType < 11 && (pos ?
                            pos.index(cur) > -1 :

                            // Don't pass non-elements to Sizzle
                            cur.nodeType === 1 &&
                            jQuery.find.matchesSelector(cur, selectors))) {

                        matched.push(cur);
                        break;
                    }
                }
            }

            return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
        },

        // Determine the position of an element within
        // the matched set of elements
        index: function(elem) {

            // No argument, return index in parent
            if (!elem) {
                return (this[0] && this[0].parentNode) ? this.first().prevAll().length : -1;
            }

            // index in selector
            if (typeof elem === "string") {
                return jQuery.inArray(this[0], jQuery(elem));
            }

            // Locate the position of the desired element
            return jQuery.inArray(

                // If it receives a jQuery object, the first element is used
                elem.jquery ? elem[0] : elem, this);
        },

        add: function(selector, context) {
            return this.pushStack(
                jQuery.uniqueSort(
                    jQuery.merge(this.get(), jQuery(selector, context))
                )
            );
        },

        addBack: function(selector) {
            return this.add(selector == null ?
                this.prevObject : this.prevObject.filter(selector)
            );
        }
    });

    function sibling(cur, dir) {
        do {
            cur = cur[dir];
        } while (cur && cur.nodeType !== 1);

        return cur;
    }

    jQuery.each({
        parent: function(elem) {
            var parent = elem.parentNode;
            return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function(elem) {
            return dir(elem, "parentNode");
        },
        parentsUntil: function(elem, i, until) {
            return dir(elem, "parentNode", until);
        },
        next: function(elem) {
            return sibling(elem, "nextSibling");
        },
        prev: function(elem) {
            return sibling(elem, "previousSibling");
        },
        nextAll: function(elem) {
            return dir(elem, "nextSibling");
        },
        prevAll: function(elem) {
            return dir(elem, "previousSibling");
        },
        nextUntil: function(elem, i, until) {
            return dir(elem, "nextSibling", until);
        },
        prevUntil: function(elem, i, until) {
            return dir(elem, "previousSibling", until);
        },
        siblings: function(elem) {
            return siblings((elem.parentNode || {}).firstChild, elem);
        },
        children: function(elem) {
            return siblings(elem.firstChild);
        },
        contents: function(elem) {
            return jQuery.nodeName(elem, "iframe") ?
                elem.contentDocument || elem.contentWindow.document :
                jQuery.merge([], elem.childNodes);
        }
    }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
            var ret = jQuery.map(this, fn, until);

            if (name.slice(-5) !== "Until") {
                selector = until;
            }

            if (selector && typeof selector === "string") {
                ret = jQuery.filter(selector, ret);
            }

            if (this.length > 1) {

                // Remove duplicates
                if (!guaranteedUnique[name]) {
                    ret = jQuery.uniqueSort(ret);
                }

                // Reverse order for parents* and prev-derivatives
                if (rparentsprev.test(name)) {
                    ret = ret.reverse();
                }
            }

            return this.pushStack(ret);
        };
    });
    var rnotwhite = (/\S+/g);



    // Convert String-formatted options into Object-formatted ones
    function createOptions(options) {
        var object = {};
        jQuery.each(options.match(rnotwhite) || [], function(_, flag) {
            object[flag] = true;
        });
        return object;
    }

    /*
     * Create a callback list using the following parameters:
     *
     *	options: an optional list of space-separated options that will change how
     *			the callback list behaves or a more traditional option object
     *
     * By default a callback list will act like an event callback list and can be
     * "fired" multiple times.
     *
     * Possible options:
     *
     *	once:			will ensure the callback list can only be fired once (like a Deferred)
     *
     *	memory:			will keep track of previous values and will call any callback added
     *					after the list has been fired right away with the latest "memorized"
     *					values (like a Deferred)
     *
     *	unique:			will ensure a callback can only be added once (no duplicate in the list)
     *
     *	stopOnFalse:	interrupt callings when a callback returns false
     *
     */
    jQuery.Callbacks = function(options) {

        // Convert options from String-formatted to Object-formatted if needed
        // (we check in cache first)
        options = typeof options === "string" ?
            createOptions(options) :
            jQuery.extend({}, options);

        var // Flag to know if list is currently firing
            firing,

            // Last fire value for non-forgettable lists
            memory,

            // Flag to know if list was already fired
            fired,

            // Flag to prevent firing
            locked,

            // Actual callback list
            list = [],

            // Queue of execution data for repeatable lists
            queue = [],

            // Index of currently firing callback (modified by add/remove as needed)
            firingIndex = -1,

            // Fire callbacks
            fire = function() {

                // Enforce single-firing
                locked = options.once;

                // Execute callbacks for all pending executions,
                // respecting firingIndex overrides and runtime changes
                fired = firing = true;
                for (; queue.length; firingIndex = -1) {
                    memory = queue.shift();
                    while (++firingIndex < list.length) {

                        // Run callback and check for early termination
                        if (list[firingIndex].apply(memory[0], memory[1]) === false &&
                            options.stopOnFalse) {

                            // Jump to end and forget the data so .add doesn't re-fire
                            firingIndex = list.length;
                            memory = false;
                        }
                    }
                }

                // Forget the data if we're done with it
                if (!options.memory) {
                    memory = false;
                }

                firing = false;

                // Clean up if we're done firing for good
                if (locked) {

                    // Keep an empty list if we have data for future add calls
                    if (memory) {
                        list = [];

                        // Otherwise, this object is spent
                    } else {
                        list = "";
                    }
                }
            },

            // Actual Callbacks object
            self = {

                // Add a callback or a collection of callbacks to the list
                add: function() {
                    if (list) {

                        // If we have memory from a past run, we should fire after adding
                        if (memory && !firing) {
                            firingIndex = list.length - 1;
                            queue.push(memory);
                        }

                        (function add(args) {
                            jQuery.each(args, function(_, arg) {
                                if (jQuery.isFunction(arg)) {
                                    if (!options.unique || !self.has(arg)) {
                                        list.push(arg);
                                    }
                                } else if (arg && arg.length && jQuery.type(arg) !== "string") {

                                    // Inspect recursively
                                    add(arg);
                                }
                            });
                        })(arguments);

                        if (memory && !firing) {
                            fire();
                        }
                    }
                    return this;
                },

                // Remove a callback from the list
                remove: function() {
                    jQuery.each(arguments, function(_, arg) {
                        var index;
                        while ((index = jQuery.inArray(arg, list, index)) > -1) {
                            list.splice(index, 1);

                            // Handle firing indexes
                            if (index <= firingIndex) {
                                firingIndex--;
                            }
                        }
                    });
                    return this;
                },

                // Check if a given callback is in the list.
                // If no argument is given, return whether or not list has callbacks attached.
                has: function(fn) {
                    return fn ?
                        jQuery.inArray(fn, list) > -1 :
                        list.length > 0;
                },

                // Remove all callbacks from the list
                empty: function() {
                    if (list) {
                        list = [];
                    }
                    return this;
                },

                // Disable .fire and .add
                // Abort any current/pending executions
                // Clear all callbacks and values
                disable: function() {
                    locked = queue = [];
                    list = memory = "";
                    return this;
                },
                disabled: function() {
                    return !list;
                },

                // Disable .fire
                // Also disable .add unless we have memory (since it would have no effect)
                // Abort any pending executions
                lock: function() {
                    locked = true;
                    if (!memory) {
                        self.disable();
                    }
                    return this;
                },
                locked: function() {
                    return !!locked;
                },

                // Call all callbacks with the given context and arguments
                fireWith: function(context, args) {
                    if (!locked) {
                        args = args || [];
                        args = [context, args.slice ? args.slice() : args];
                        queue.push(args);
                        if (!firing) {
                            fire();
                        }
                    }
                    return this;
                },

                // Call all the callbacks with the given arguments
                fire: function() {
                    self.fireWith(this, arguments);
                    return this;
                },

                // To know if the callbacks have already been called at least once
                fired: function() {
                    return !!fired;
                }
            };

        return self;
    };


    jQuery.extend({

        Deferred: function(func) {
            var tuples = [

                    // action, add listener, listener list, final state
                    ["resolve", "done", jQuery.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", jQuery.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", jQuery.Callbacks("memory")]
                ],
                state = "pending",
                promise = {
                    state: function() {
                        return state;
                    },
                    always: function() {
                        deferred.done(arguments).fail(arguments);
                        return this;
                    },
                    then: function( /* fnDone, fnFail, fnProgress */ ) {
                        var fns = arguments;
                        return jQuery.Deferred(function(newDefer) {
                            jQuery.each(tuples, function(i, tuple) {
                                var fn = jQuery.isFunction(fns[i]) && fns[i];

                                // deferred[ done | fail | progress ] for forwarding actions to newDefer
                                deferred[tuple[1]](function() {
                                    var returned = fn && fn.apply(this, arguments);
                                    if (returned && jQuery.isFunction(returned.promise)) {
                                        returned.promise()
                                            .progress(newDefer.notify)
                                            .done(newDefer.resolve)
                                            .fail(newDefer.reject);
                                    } else {
                                        newDefer[tuple[0] + "With"](
                                            this === promise ? newDefer.promise() : this,
                                            fn ? [returned] : arguments
                                        );
                                    }
                                });
                            });
                            fns = null;
                        }).promise();
                    },

                    // Get a promise for this deferred
                    // If obj is provided, the promise aspect is added to the object
                    promise: function(obj) {
                        return obj != null ? jQuery.extend(obj, promise) : promise;
                    }
                },
                deferred = {};

            // Keep pipe for back-compat
            promise.pipe = promise.then;

            // Add list-specific methods
            jQuery.each(tuples, function(i, tuple) {
                var list = tuple[2],
                    stateString = tuple[3];

                // promise[ done | fail | progress ] = list.add
                promise[tuple[1]] = list.add;

                // Handle state
                if (stateString) {
                    list.add(function() {

                        // state = [ resolved | rejected ]
                        state = stateString;

                        // [ reject_list | resolve_list ].disable; progress_list.lock
                    }, tuples[i ^ 1][2].disable, tuples[2][2].lock);
                }

                // deferred[ resolve | reject | notify ]
                deferred[tuple[0]] = function() {
                    deferred[tuple[0] + "With"](this === deferred ? promise : this, arguments);
                    return this;
                };
                deferred[tuple[0] + "With"] = list.fireWith;
            });

            // Make the deferred a promise
            promise.promise(deferred);

            // Call given func if any
            if (func) {
                func.call(deferred, deferred);
            }

            // All done!
            return deferred;
        },

        // Deferred helper
        when: function(subordinate /* , ..., subordinateN */ ) {
            var i = 0,
                resolveValues = slice.call(arguments),
                length = resolveValues.length,

                // the count of uncompleted subordinates
                remaining = length !== 1 ||
                (subordinate && jQuery.isFunction(subordinate.promise)) ? length : 0,

                // the master Deferred.
                // If resolveValues consist of only a single Deferred, just use that.
                deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

                // Update function for both resolve and progress values
                updateFunc = function(i, contexts, values) {
                    return function(value) {
                        contexts[i] = this;
                        values[i] = arguments.length > 1 ? slice.call(arguments) : value;
                        if (values === progressValues) {
                            deferred.notifyWith(contexts, values);

                        } else if (!(--remaining)) {
                            deferred.resolveWith(contexts, values);
                        }
                    };
                },

                progressValues, progressContexts, resolveContexts;

            // add listeners to Deferred subordinates; treat others as resolved
            if (length > 1) {
                progressValues = new Array(length);
                progressContexts = new Array(length);
                resolveContexts = new Array(length);
                for (; i < length; i++) {
                    if (resolveValues[i] && jQuery.isFunction(resolveValues[i].promise)) {
                        resolveValues[i].promise()
                            .progress(updateFunc(i, progressContexts, progressValues))
                            .done(updateFunc(i, resolveContexts, resolveValues))
                            .fail(deferred.reject);
                    } else {
                        --remaining;
                    }
                }
            }

            // if we're not waiting on anything, resolve the master
            if (!remaining) {
                deferred.resolveWith(resolveContexts, resolveValues);
            }

            return deferred.promise();
        }
    });


    // The deferred used on DOM ready
    var readyList;

    jQuery.fn.ready = function(fn) {

        // Add the callback
        jQuery.ready.promise().done(fn);

        return this;
    };

    jQuery.extend({

        // Is the DOM ready to be used? Set to true once it occurs.
        isReady: false,

        // A counter to track how many items to wait for before
        // the ready event fires. See #6781
        readyWait: 1,

        // Hold (or release) the ready event
        holdReady: function(hold) {
            if (hold) {
                jQuery.readyWait++;
            } else {
                jQuery.ready(true);
            }
        },

        // Handle when the DOM is ready
        ready: function(wait) {

            // Abort if there are pending holds or we're already ready
            if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
                return;
            }

            // Remember that the DOM is ready
            jQuery.isReady = true;

            // If a normal DOM Ready event fired, decrement, and wait if need be
            if (wait !== true && --jQuery.readyWait > 0) {
                return;
            }

            // If there are functions bound, to execute
            readyList.resolveWith(document, [jQuery]);

            // Trigger any bound ready events
            if (jQuery.fn.triggerHandler) {
                jQuery(document).triggerHandler("ready");
                jQuery(document).off("ready");
            }
        }
    });

    /**
     * Clean-up method for dom ready events
     */
    function detach() {
        if (document.addEventListener) {
            document.removeEventListener("DOMContentLoaded", completed);
            window.removeEventListener("load", completed);

        } else {
            document.detachEvent("onreadystatechange", completed);
            window.detachEvent("onload", completed);
        }
    }

    /**
     * The ready event handler and self cleanup method
     */
    function completed() {

        // readyState === "complete" is good enough for us to call the dom ready in oldIE
        if (document.addEventListener ||
            window.event.type === "load" ||
            document.readyState === "complete") {

            detach();
            jQuery.ready();
        }
    }

    jQuery.ready.promise = function(obj) {
        if (!readyList) {

            readyList = jQuery.Deferred();

            // Catch cases where $(document).ready() is called
            // after the browser event has already occurred.
            // Support: IE6-10
            // Older IE sometimes signals "interactive" too soon
            if (document.readyState === "complete" ||
                (document.readyState !== "loading" && !document.documentElement.doScroll)) {

                // Handle it asynchronously to allow scripts the opportunity to delay ready
                window.setTimeout(jQuery.ready);

                // Standards-based browsers support DOMContentLoaded
            } else if (document.addEventListener) {

                // Use the handy event callback
                document.addEventListener("DOMContentLoaded", completed);

                // A fallback to window.onload, that will always work
                window.addEventListener("load", completed);

                // If IE event model is used
            } else {

                // Ensure firing before onload, maybe late but safe also for iframes
                document.attachEvent("onreadystatechange", completed);

                // A fallback to window.onload, that will always work
                window.attachEvent("onload", completed);

                // If IE and not a frame
                // continually check to see if the document is ready
                var top = false;

                try {
                    top = window.frameElement == null && document.documentElement;
                } catch (e) {}

                if (top && top.doScroll) {
                    (function doScrollCheck() {
                        if (!jQuery.isReady) {

                            try {

                                // Use the trick by Diego Perini
                                // http://javascript.nwbox.com/IEContentLoaded/
                                top.doScroll("left");
                            } catch (e) {
                                return window.setTimeout(doScrollCheck, 50);
                            }

                            // detach all dom ready events
                            detach();

                            // and execute any waiting functions
                            jQuery.ready();
                        }
                    })();
                }
            }
        }
        return readyList.promise(obj);
    };

    // Kick off the DOM ready check even if the user does not
    jQuery.ready.promise();




    // Support: IE<9
    // Iteration over object's inherited properties before its own
    var i;
    for (i in jQuery(support)) {
        break;
    }
    support.ownFirst = i === "0";

    // Note: most support tests are defined in their respective modules.
    // false until the test is run
    support.inlineBlockNeedsLayout = false;

    // Execute ASAP in case we need to set body.style.zoom
    jQuery(function() {

        // Minified: var a,b,c,d
        var val, div, body, container;

        body = document.getElementsByTagName("body")[0];
        if (!body || !body.style) {

            // Return for frameset docs that don't have a body
            return;
        }

        // Setup
        div = document.createElement("div");
        container = document.createElement("div");
        container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
        body.appendChild(container).appendChild(div);

        if (typeof div.style.zoom !== "undefined") {

            // Support: IE<8
            // Check if natively block-level elements act like inline-block
            // elements when setting their display to 'inline' and giving
            // them layout
            div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

            support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
            if (val) {

                // Prevent IE 6 from affecting layout for positioned elements #11048
                // Prevent IE from shrinking the body in IE 7 mode #12869
                // Support: IE<8
                body.style.zoom = 1;
            }
        }

        body.removeChild(container);
    });


    (function() {
        var div = document.createElement("div");

        // Support: IE<9
        support.deleteExpando = true;
        try {
            delete div.test;
        } catch (e) {
            support.deleteExpando = false;
        }

        // Null elements to avoid leaks in IE.
        div = null;
    })();
    var acceptData = function(elem) {
        var noData = jQuery.noData[(elem.nodeName + " ").toLowerCase()],
            nodeType = +elem.nodeType || 1;

        // Do not set data on non-element DOM nodes because it will not be cleared (#8335).
        return nodeType !== 1 && nodeType !== 9 ?
            false :

            // Nodes accept data unless otherwise specified; rejection can be conditional
            !noData || noData !== true && elem.getAttribute("classid") === noData;
    };




    var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        rmultiDash = /([A-Z])/g;

    function dataAttr(elem, key, data) {

        // If nothing was found internally, try to fetch any
        // data from the HTML5 data-* attribute
        if (data === undefined && elem.nodeType === 1) {

            var name = "data-" + key.replace(rmultiDash, "-$1").toLowerCase();

            data = elem.getAttribute(name);

            if (typeof data === "string") {
                try {
                    data = data === "true" ? true :
                        data === "false" ? false :
                        data === "null" ? null :

                        // Only convert to a number if it doesn't change the string
                        +data + "" === data ? +data :
                        rbrace.test(data) ? jQuery.parseJSON(data) :
                        data;
                } catch (e) {}

                // Make sure we set the data so it isn't changed later
                jQuery.data(elem, key, data);

            } else {
                data = undefined;
            }
        }

        return data;
    }

    // checks a cache object for emptiness
    function isEmptyDataObject(obj) {
        var name;
        for (name in obj) {

            // if the public data object is empty, the private is still empty
            if (name === "data" && jQuery.isEmptyObject(obj[name])) {
                continue;
            }
            if (name !== "toJSON") {
                return false;
            }
        }

        return true;
    }

    function internalData(elem, name, data, pvt /* Internal Use Only */ ) {
        if (!acceptData(elem)) {
            return;
        }

        var ret, thisCache,
            internalKey = jQuery.expando,

            // We have to handle DOM nodes and JS objects differently because IE6-7
            // can't GC object references properly across the DOM-JS boundary
            isNode = elem.nodeType,

            // Only DOM nodes need the global jQuery cache; JS object data is
            // attached directly to the object so GC can occur automatically
            cache = isNode ? jQuery.cache : elem,

            // Only defining an ID for JS objects if its cache already exists allows
            // the code to shortcut on the same path as a DOM node with no cache
            id = isNode ? elem[internalKey] : elem[internalKey] && internalKey;

        // Avoid doing any more work than we need to when trying to get data on an
        // object that has no data at all
        if ((!id || !cache[id] || (!pvt && !cache[id].data)) &&
            data === undefined && typeof name === "string") {
            return;
        }

        if (!id) {

            // Only DOM nodes need a new unique ID for each element since their data
            // ends up in the global cache
            if (isNode) {
                id = elem[internalKey] = deletedIds.pop() || jQuery.guid++;
            } else {
                id = internalKey;
            }
        }

        if (!cache[id]) {

            // Avoid exposing jQuery metadata on plain JS objects when the object
            // is serialized using JSON.stringify
            cache[id] = isNode ? {} : {
                toJSON: jQuery.noop
            };
        }

        // An object can be passed to jQuery.data instead of a key/value pair; this gets
        // shallow copied over onto the existing cache
        if (typeof name === "object" || typeof name === "function") {
            if (pvt) {
                cache[id] = jQuery.extend(cache[id], name);
            } else {
                cache[id].data = jQuery.extend(cache[id].data, name);
            }
        }

        thisCache = cache[id];

        // jQuery data() is stored in a separate object inside the object's internal data
        // cache in order to avoid key collisions between internal data and user-defined
        // data.
        if (!pvt) {
            if (!thisCache.data) {
                thisCache.data = {};
            }

            thisCache = thisCache.data;
        }

        if (data !== undefined) {
            thisCache[jQuery.camelCase(name)] = data;
        }

        // Check for both converted-to-camel and non-converted data property names
        // If a data property was specified
        if (typeof name === "string") {

            // First Try to find as-is property data
            ret = thisCache[name];

            // Test for null|undefined property data
            if (ret == null) {

                // Try to find the camelCased property
                ret = thisCache[jQuery.camelCase(name)];
            }
        } else {
            ret = thisCache;
        }

        return ret;
    }

    function internalRemoveData(elem, name, pvt) {
        if (!acceptData(elem)) {
            return;
        }

        var thisCache, i,
            isNode = elem.nodeType,

            // See jQuery.data for more information
            cache = isNode ? jQuery.cache : elem,
            id = isNode ? elem[jQuery.expando] : jQuery.expando;

        // If there is already no cache entry for this object, there is no
        // purpose in continuing
        if (!cache[id]) {
            return;
        }

        if (name) {

            thisCache = pvt ? cache[id] : cache[id].data;

            if (thisCache) {

                // Support array or space separated string names for data keys
                if (!jQuery.isArray(name)) {

                    // try the string as a key before any manipulation
                    if (name in thisCache) {
                        name = [name];
                    } else {

                        // split the camel cased version by spaces unless a key with the spaces exists
                        name = jQuery.camelCase(name);
                        if (name in thisCache) {
                            name = [name];
                        } else {
                            name = name.split(" ");
                        }
                    }
                } else {

                    // If "name" is an array of keys...
                    // When data is initially created, via ("key", "val") signature,
                    // keys will be converted to camelCase.
                    // Since there is no way to tell _how_ a key was added, remove
                    // both plain key and camelCase key. #12786
                    // This will only penalize the array argument path.
                    name = name.concat(jQuery.map(name, jQuery.camelCase));
                }

                i = name.length;
                while (i--) {
                    delete thisCache[name[i]];
                }

                // If there is no data left in the cache, we want to continue
                // and let the cache object itself get destroyed
                if (pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache)) {
                    return;
                }
            }
        }

        // See jQuery.data for more information
        if (!pvt) {
            delete cache[id].data;

            // Don't destroy the parent cache unless the internal data object
            // had been the only thing left in it
            if (!isEmptyDataObject(cache[id])) {
                return;
            }
        }

        // Destroy the cache
        if (isNode) {
            jQuery.cleanData([elem], true);

            // Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
            /* jshint eqeqeq: false */
        } else if (support.deleteExpando || cache != cache.window) {
            /* jshint eqeqeq: true */
            delete cache[id];

            // When all else fails, undefined
        } else {
            cache[id] = undefined;
        }
    }

    jQuery.extend({
        cache: {},

        // The following elements (space-suffixed to avoid Object.prototype collisions)
        // throw uncatchable exceptions if you attempt to set expando properties
        noData: {
            "applet ": true,
            "embed ": true,

            // ...but Flash objects (which have this classid) *can* handle expandos
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },

        hasData: function(elem) {
            elem = elem.nodeType ? jQuery.cache[elem[jQuery.expando]] : elem[jQuery.expando];
            return !!elem && !isEmptyDataObject(elem);
        },

        data: function(elem, name, data) {
            return internalData(elem, name, data);
        },

        removeData: function(elem, name) {
            return internalRemoveData(elem, name);
        },

        // For internal use only.
        _data: function(elem, name, data) {
            return internalData(elem, name, data, true);
        },

        _removeData: function(elem, name) {
            return internalRemoveData(elem, name, true);
        }
    });

    jQuery.fn.extend({
        data: function(key, value) {
            var i, name, data,
                elem = this[0],
                attrs = elem && elem.attributes;

            // Special expections of .data basically thwart jQuery.access,
            // so implement the relevant behavior ourselves

            // Gets all values
            if (key === undefined) {
                if (this.length) {
                    data = jQuery.data(elem);

                    if (elem.nodeType === 1 && !jQuery._data(elem, "parsedAttrs")) {
                        i = attrs.length;
                        while (i--) {

                            // Support: IE11+
                            // The attrs elements can be null (#14894)
                            if (attrs[i]) {
                                name = attrs[i].name;
                                if (name.indexOf("data-") === 0) {
                                    name = jQuery.camelCase(name.slice(5));
                                    dataAttr(elem, name, data[name]);
                                }
                            }
                        }
                        jQuery._data(elem, "parsedAttrs", true);
                    }
                }

                return data;
            }

            // Sets multiple values
            if (typeof key === "object") {
                return this.each(function() {
                    jQuery.data(this, key);
                });
            }

            return arguments.length > 1 ?

                // Sets one value
                this.each(function() {
                    jQuery.data(this, key, value);
                }) :

                // Gets one value
                // Try to fetch any internally stored data first
                elem ? dataAttr(elem, key, jQuery.data(elem, key)) : undefined;
        },

        removeData: function(key) {
            return this.each(function() {
                jQuery.removeData(this, key);
            });
        }
    });


    jQuery.extend({
        queue: function(elem, type, data) {
            var queue;

            if (elem) {
                type = (type || "fx") + "queue";
                queue = jQuery._data(elem, type);

                // Speed up dequeue by getting out quickly if this is just a lookup
                if (data) {
                    if (!queue || jQuery.isArray(data)) {
                        queue = jQuery._data(elem, type, jQuery.makeArray(data));
                    } else {
                        queue.push(data);
                    }
                }
                return queue || [];
            }
        },

        dequeue: function(elem, type) {
            type = type || "fx";

            var queue = jQuery.queue(elem, type),
                startLength = queue.length,
                fn = queue.shift(),
                hooks = jQuery._queueHooks(elem, type),
                next = function() {
                    jQuery.dequeue(elem, type);
                };

            // If the fx queue is dequeued, always remove the progress sentinel
            if (fn === "inprogress") {
                fn = queue.shift();
                startLength--;
            }

            if (fn) {

                // Add a progress sentinel to prevent the fx queue from being
                // automatically dequeued
                if (type === "fx") {
                    queue.unshift("inprogress");
                }

                // clear up the last queue stop function
                delete hooks.stop;
                fn.call(elem, next, hooks);
            }

            if (!startLength && hooks) {
                hooks.empty.fire();
            }
        },

        // not intended for public consumption - generates a queueHooks object,
        // or returns the current one
        _queueHooks: function(elem, type) {
            var key = type + "queueHooks";
            return jQuery._data(elem, key) || jQuery._data(elem, key, {
                empty: jQuery.Callbacks("once memory").add(function() {
                    jQuery._removeData(elem, type + "queue");
                    jQuery._removeData(elem, key);
                })
            });
        }
    });

    jQuery.fn.extend({
        queue: function(type, data) {
            var setter = 2;

            if (typeof type !== "string") {
                data = type;
                type = "fx";
                setter--;
            }

            if (arguments.length < setter) {
                return jQuery.queue(this[0], type);
            }

            return data === undefined ?
                this :
                this.each(function() {
                    var queue = jQuery.queue(this, type, data);

                    // ensure a hooks for this queue
                    jQuery._queueHooks(this, type);

                    if (type === "fx" && queue[0] !== "inprogress") {
                        jQuery.dequeue(this, type);
                    }
                });
        },
        dequeue: function(type) {
            return this.each(function() {
                jQuery.dequeue(this, type);
            });
        },
        clearQueue: function(type) {
            return this.queue(type || "fx", []);
        },

        // Get a promise resolved when queues of a certain type
        // are emptied (fx is the type by default)
        promise: function(type, obj) {
            var tmp,
                count = 1,
                defer = jQuery.Deferred(),
                elements = this,
                i = this.length,
                resolve = function() {
                    if (!(--count)) {
                        defer.resolveWith(elements, [elements]);
                    }
                };

            if (typeof type !== "string") {
                obj = type;
                type = undefined;
            }
            type = type || "fx";

            while (i--) {
                tmp = jQuery._data(elements[i], type + "queueHooks");
                if (tmp && tmp.empty) {
                    count++;
                    tmp.empty.add(resolve);
                }
            }
            resolve();
            return defer.promise(obj);
        }
    });


    (function() {
        var shrinkWrapBlocksVal;

        support.shrinkWrapBlocks = function() {
            if (shrinkWrapBlocksVal != null) {
                return shrinkWrapBlocksVal;
            }

            // Will be changed later if needed.
            shrinkWrapBlocksVal = false;

            // Minified: var b,c,d
            var div, body, container;

            body = document.getElementsByTagName("body")[0];
            if (!body || !body.style) {

                // Test fired too early or in an unsupported environment, exit.
                return;
            }

            // Setup
            div = document.createElement("div");
            container = document.createElement("div");
            container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
            body.appendChild(container).appendChild(div);

            // Support: IE6
            // Check if elements with layout shrink-wrap their children
            if (typeof div.style.zoom !== "undefined") {

                // Reset CSS: box-sizing; display; margin; border
                div.style.cssText =

                    // Support: Firefox<29, Android 2.3
                    // Vendor-prefix box-sizing
                    "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
                    "box-sizing:content-box;display:block;margin:0;border:0;" +
                    "padding:1px;width:1px;zoom:1";
                div.appendChild(document.createElement("div")).style.width = "5px";
                shrinkWrapBlocksVal = div.offsetWidth !== 3;
            }

            body.removeChild(container);

            return shrinkWrapBlocksVal;
        };

    })();
    var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

    var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");


    var cssExpand = ["Top", "Right", "Bottom", "Left"];

    var isHidden = function(elem, el) {

        // isHidden might be called from jQuery#filter function;
        // in that case, element will be second argument
        elem = el || elem;
        return jQuery.css(elem, "display") === "none" ||
            !jQuery.contains(elem.ownerDocument, elem);
    };



    function adjustCSS(elem, prop, valueParts, tween) {
        var adjusted,
            scale = 1,
            maxIterations = 20,
            currentValue = tween ?
            function() {
                return tween.cur();
            } :
            function() {
                return jQuery.css(elem, prop, "");
            },
            initial = currentValue(),
            unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"),

            // Starting value computation is required for potential unit mismatches
            initialInUnit = (jQuery.cssNumber[prop] || unit !== "px" && +initial) &&
            rcssNum.exec(jQuery.css(elem, prop));

        if (initialInUnit && initialInUnit[3] !== unit) {

            // Trust units reported by jQuery.css
            unit = unit || initialInUnit[3];

            // Make sure we update the tween properties later on
            valueParts = valueParts || [];

            // Iteratively approximate from a nonzero starting point
            initialInUnit = +initial || 1;

            do {

                // If previous iteration zeroed out, double until we get *something*.
                // Use string for doubling so we don't accidentally see scale as unchanged below
                scale = scale || ".5";

                // Adjust and apply
                initialInUnit = initialInUnit / scale;
                jQuery.style(elem, prop, initialInUnit + unit);

                // Update scale, tolerating zero or NaN from tween.cur()
                // Break the loop if scale is unchanged or perfect, or if we've just had enough.
            } while (
                scale !== (scale = currentValue() / initial) && scale !== 1 && --maxIterations
            );
        }

        if (valueParts) {
            initialInUnit = +initialInUnit || +initial || 0;

            // Apply relative offset (+=/-=) if specified
            adjusted = valueParts[1] ?
                initialInUnit + (valueParts[1] + 1) * valueParts[2] :
                +valueParts[2];
            if (tween) {
                tween.unit = unit;
                tween.start = initialInUnit;
                tween.end = adjusted;
            }
        }
        return adjusted;
    }


    // Multifunctional method to get and set values of a collection
    // The value/s can optionally be executed if it's a function
    var access = function(elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0,
            length = elems.length,
            bulk = key == null;

        // Sets many values
        if (jQuery.type(key) === "object") {
            chainable = true;
            for (i in key) {
                access(elems, fn, i, key[i], true, emptyGet, raw);
            }

            // Sets one value
        } else if (value !== undefined) {
            chainable = true;

            if (!jQuery.isFunction(value)) {
                raw = true;
            }

            if (bulk) {

                // Bulk operations run against the entire set
                if (raw) {
                    fn.call(elems, value);
                    fn = null;

                    // ...except when executing function values
                } else {
                    bulk = fn;
                    fn = function(elem, key, value) {
                        return bulk.call(jQuery(elem), value);
                    };
                }
            }

            if (fn) {
                for (; i < length; i++) {
                    fn(
                        elems[i],
                        key,
                        raw ? value : value.call(elems[i], i, fn(elems[i], key))
                    );
                }
            }
        }

        return chainable ?
            elems :

            // Gets
            bulk ?
            fn.call(elems) :
            length ? fn(elems[0], key) : emptyGet;
    };
    var rcheckableType = (/^(?:checkbox|radio)$/i);

    var rtagName = (/<([\w:-]+)/);

    var rscriptType = (/^$|\/(?:java|ecma)script/i);

    var rleadingWhitespace = (/^\s+/);

    var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
        "details|dialog|figcaption|figure|footer|header|hgroup|main|" +
        "mark|meter|nav|output|picture|progress|section|summary|template|time|video";



    function createSafeFragment(document) {
        var list = nodeNames.split("|"),
            safeFrag = document.createDocumentFragment();

        if (safeFrag.createElement) {
            while (list.length) {
                safeFrag.createElement(
                    list.pop()
                );
            }
        }
        return safeFrag;
    }


    (function() {
        var div = document.createElement("div"),
            fragment = document.createDocumentFragment(),
            input = document.createElement("input");

        // Setup
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

        // IE strips leading whitespace when .innerHTML is used
        support.leadingWhitespace = div.firstChild.nodeType === 3;

        // Make sure that tbody elements aren't automatically inserted
        // IE will insert them into empty tables
        support.tbody = !div.getElementsByTagName("tbody").length;

        // Make sure that link elements get serialized correctly by innerHTML
        // This requires a wrapper element in IE
        support.htmlSerialize = !!div.getElementsByTagName("link").length;

        // Makes sure cloning an html5 element does not cause problems
        // Where outerHTML is undefined, this still works
        support.html5Clone =
            document.createElement("nav").cloneNode(true).outerHTML !== "<:nav></:nav>";

        // Check if a disconnected checkbox will retain its checked
        // value of true after appended to the DOM (IE6/7)
        input.type = "checkbox";
        input.checked = true;
        fragment.appendChild(input);
        support.appendChecked = input.checked;

        // Make sure textarea (and checkbox) defaultValue is properly cloned
        // Support: IE6-IE11+
        div.innerHTML = "<textarea>x</textarea>";
        support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;

        // #11217 - WebKit loses check when the name is after the checked attribute
        fragment.appendChild(div);

        // Support: Windows Web Apps (WWA)
        // `name` and `type` must use .setAttribute for WWA (#14901)
        input = document.createElement("input");
        input.setAttribute("type", "radio");
        input.setAttribute("checked", "checked");
        input.setAttribute("name", "t");

        div.appendChild(input);

        // Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
        // old WebKit doesn't clone checked state correctly in fragments
        support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;

        // Support: IE<9
        // Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
        support.noCloneEvent = !!div.addEventListener;

        // Support: IE<9
        // Since attributes and properties are the same in IE,
        // cleanData must set properties to undefined rather than use removeAttribute
        div[jQuery.expando] = 1;
        support.attributes = !div.getAttribute(jQuery.expando);
    })();


    // We have to close these tags to support XHTML (#13200)
    var wrapMap = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],

        // Support: IE8
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],

        // IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
        // unless wrapped in a div with non-breaking characters in front of it.
        _default: support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    };

    // Support: IE8-IE9
    wrapMap.optgroup = wrapMap.option;

    wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
    wrapMap.th = wrapMap.td;


    function getAll(context, tag) {
        var elems, elem,
            i = 0,
            found = typeof context.getElementsByTagName !== "undefined" ?
            context.getElementsByTagName(tag || "*") :
            typeof context.querySelectorAll !== "undefined" ?
            context.querySelectorAll(tag || "*") :
            undefined;

        if (!found) {
            for (found = [], elems = context.childNodes || context;
                (elem = elems[i]) != null; i++
            ) {
                if (!tag || jQuery.nodeName(elem, tag)) {
                    found.push(elem);
                } else {
                    jQuery.merge(found, getAll(elem, tag));
                }
            }
        }

        return tag === undefined || tag && jQuery.nodeName(context, tag) ?
            jQuery.merge([context], found) :
            found;
    }


    // Mark scripts as having already been evaluated
    function setGlobalEval(elems, refElements) {
        var elem,
            i = 0;
        for (;
            (elem = elems[i]) != null; i++) {
            jQuery._data(
                elem,
                "globalEval", !refElements || jQuery._data(refElements[i], "globalEval")
            );
        }
    }


    var rhtml = /<|&#?\w+;/,
        rtbody = /<tbody/i;

    function fixDefaultChecked(elem) {
        if (rcheckableType.test(elem.type)) {
            elem.defaultChecked = elem.checked;
        }
    }

    function buildFragment(elems, context, scripts, selection, ignored) {
        var j, elem, contains,
            tmp, tag, tbody, wrap,
            l = elems.length,

            // Ensure a safe fragment
            safe = createSafeFragment(context),

            nodes = [],
            i = 0;

        for (; i < l; i++) {
            elem = elems[i];

            if (elem || elem === 0) {

                // Add nodes directly
                if (jQuery.type(elem) === "object") {
                    jQuery.merge(nodes, elem.nodeType ? [elem] : elem);

                    // Convert non-html into a text node
                } else if (!rhtml.test(elem)) {
                    nodes.push(context.createTextNode(elem));

                    // Convert html into DOM nodes
                } else {
                    tmp = tmp || safe.appendChild(context.createElement("div"));

                    // Deserialize a standard representation
                    tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
                    wrap = wrapMap[tag] || wrapMap._default;

                    tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];

                    // Descend through wrappers to the right content
                    j = wrap[0];
                    while (j--) {
                        tmp = tmp.lastChild;
                    }

                    // Manually add leading whitespace removed by IE
                    if (!support.leadingWhitespace && rleadingWhitespace.test(elem)) {
                        nodes.push(context.createTextNode(rleadingWhitespace.exec(elem)[0]));
                    }

                    // Remove IE's autoinserted <tbody> from table fragments
                    if (!support.tbody) {

                        // String was a <table>, *may* have spurious <tbody>
                        elem = tag === "table" && !rtbody.test(elem) ?
                            tmp.firstChild :

                            // String was a bare <thead> or <tfoot>
                            wrap[1] === "<table>" && !rtbody.test(elem) ?
                            tmp :
                            0;

                        j = elem && elem.childNodes.length;
                        while (j--) {
                            if (jQuery.nodeName((tbody = elem.childNodes[j]), "tbody") &&
                                !tbody.childNodes.length) {

                                elem.removeChild(tbody);
                            }
                        }
                    }

                    jQuery.merge(nodes, tmp.childNodes);

                    // Fix #12392 for WebKit and IE > 9
                    tmp.textContent = "";

                    // Fix #12392 for oldIE
                    while (tmp.firstChild) {
                        tmp.removeChild(tmp.firstChild);
                    }

                    // Remember the top-level container for proper cleanup
                    tmp = safe.lastChild;
                }
            }
        }

        // Fix #11356: Clear elements from fragment
        if (tmp) {
            safe.removeChild(tmp);
        }

        // Reset defaultChecked for any radios and checkboxes
        // about to be appended to the DOM in IE 6/7 (#8060)
        if (!support.appendChecked) {
            jQuery.grep(getAll(nodes, "input"), fixDefaultChecked);
        }

        i = 0;
        while ((elem = nodes[i++])) {

            // Skip elements already in the context collection (trac-4087)
            if (selection && jQuery.inArray(elem, selection) > -1) {
                if (ignored) {
                    ignored.push(elem);
                }

                continue;
            }

            contains = jQuery.contains(elem.ownerDocument, elem);

            // Append to fragment
            tmp = getAll(safe.appendChild(elem), "script");

            // Preserve script evaluation history
            if (contains) {
                setGlobalEval(tmp);
            }

            // Capture executables
            if (scripts) {
                j = 0;
                while ((elem = tmp[j++])) {
                    if (rscriptType.test(elem.type || "")) {
                        scripts.push(elem);
                    }
                }
            }
        }

        tmp = null;

        return safe;
    }


    (function() {
        var i, eventName,
            div = document.createElement("div");

        // Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
        for (i in {
                submit: true,
                change: true,
                focusin: true
            }) {
            eventName = "on" + i;

            if (!(support[i] = eventName in window)) {

                // Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
                div.setAttribute(eventName, "t");
                support[i] = div.attributes[eventName].expando === false;
            }
        }

        // Null elements to avoid leaks in IE.
        div = null;
    })();


    var rformElems = /^(?:input|select|textarea)$/i,
        rkeyEvent = /^key/,
        rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
        rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

    function returnTrue() {
        return true;
    }

    function returnFalse() {
        return false;
    }

    // Support: IE9
    // See #13393 for more info
    function safeActiveElement() {
        try {
            return document.activeElement;
        } catch (err) {}
    }

    function on(elem, types, selector, data, fn, one) {
        var origFn, type;

        // Types can be a map of types/handlers
        if (typeof types === "object") {

            // ( types-Object, selector, data )
            if (typeof selector !== "string") {

                // ( types-Object, data )
                data = data || selector;
                selector = undefined;
            }
            for (type in types) {
                on(elem, type, selector, data, types[type], one);
            }
            return elem;
        }

        if (data == null && fn == null) {

            // ( types, fn )
            fn = selector;
            data = selector = undefined;
        } else if (fn == null) {
            if (typeof selector === "string") {

                // ( types, selector, fn )
                fn = data;
                data = undefined;
            } else {

                // ( types, data, fn )
                fn = data;
                data = selector;
                selector = undefined;
            }
        }
        if (fn === false) {
            fn = returnFalse;
        } else if (!fn) {
            return elem;
        }

        if (one === 1) {
            origFn = fn;
            fn = function(event) {

                // Can use an empty set, since event contains the info
                jQuery().off(event);
                return origFn.apply(this, arguments);
            };

            // Use same guid so caller can remove using origFn
            fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
        }
        return elem.each(function() {
            jQuery.event.add(this, types, fn, data, selector);
        });
    }

    /*
     * Helper functions for managing events -- not part of the public interface.
     * Props to Dean Edwards' addEvent library for many of the ideas.
     */
    jQuery.event = {

        global: {},

        add: function(elem, types, handler, data, selector) {
            var tmp, events, t, handleObjIn,
                special, eventHandle, handleObj,
                handlers, type, namespaces, origType,
                elemData = jQuery._data(elem);

            // Don't attach events to noData or text/comment nodes (but allow plain objects)
            if (!elemData) {
                return;
            }

            // Caller can pass in an object of custom data in lieu of the handler
            if (handler.handler) {
                handleObjIn = handler;
                handler = handleObjIn.handler;
                selector = handleObjIn.selector;
            }

            // Make sure that the handler has a unique ID, used to find/remove it later
            if (!handler.guid) {
                handler.guid = jQuery.guid++;
            }

            // Init the element's event structure and main handler, if this is the first
            if (!(events = elemData.events)) {
                events = elemData.events = {};
            }
            if (!(eventHandle = elemData.handle)) {
                eventHandle = elemData.handle = function(e) {

                    // Discard the second event of a jQuery.event.trigger() and
                    // when an event is called after a page has unloaded
                    return typeof jQuery !== "undefined" &&
                        (!e || jQuery.event.triggered !== e.type) ?
                        jQuery.event.dispatch.apply(eventHandle.elem, arguments) :
                        undefined;
                };

                // Add elem as a property of the handle fn to prevent a memory leak
                // with IE non-native events
                eventHandle.elem = elem;
            }

            // Handle multiple events separated by a space
            types = (types || "").match(rnotwhite) || [""];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();

                // There *must* be a type, no attaching namespace-only handlers
                if (!type) {
                    continue;
                }

                // If event changes its type, use the special event handlers for the changed type
                special = jQuery.event.special[type] || {};

                // If selector defined, determine special event api type, otherwise given type
                type = (selector ? special.delegateType : special.bindType) || type;

                // Update special based on newly reset type
                special = jQuery.event.special[type] || {};

                // handleObj is passed to all event handlers
                handleObj = jQuery.extend({
                    type: type,
                    origType: origType,
                    data: data,
                    handler: handler,
                    guid: handler.guid,
                    selector: selector,
                    needsContext: selector && jQuery.expr.match.needsContext.test(selector),
                    namespace: namespaces.join(".")
                }, handleObjIn);

                // Init the event handler queue if we're the first
                if (!(handlers = events[type])) {
                    handlers = events[type] = [];
                    handlers.delegateCount = 0;

                    // Only use addEventListener/attachEvent if the special events handler returns false
                    if (!special.setup ||
                        special.setup.call(elem, data, namespaces, eventHandle) === false) {

                        // Bind the global event handler to the element
                        if (elem.addEventListener) {
                            elem.addEventListener(type, eventHandle, false);

                        } else if (elem.attachEvent) {
                            elem.attachEvent("on" + type, eventHandle);
                        }
                    }
                }

                if (special.add) {
                    special.add.call(elem, handleObj);

                    if (!handleObj.handler.guid) {
                        handleObj.handler.guid = handler.guid;
                    }
                }

                // Add to the element's handler list, delegates in front
                if (selector) {
                    handlers.splice(handlers.delegateCount++, 0, handleObj);
                } else {
                    handlers.push(handleObj);
                }

                // Keep track of which events have ever been used, for event optimization
                jQuery.event.global[type] = true;
            }

            // Nullify elem to prevent memory leaks in IE
            elem = null;
        },

        // Detach an event or set of events from an element
        remove: function(elem, types, handler, selector, mappedTypes) {
            var j, handleObj, tmp,
                origCount, t, events,
                special, handlers, type,
                namespaces, origType,
                elemData = jQuery.hasData(elem) && jQuery._data(elem);

            if (!elemData || !(events = elemData.events)) {
                return;
            }

            // Once for each type.namespace in types; type may be omitted
            types = (types || "").match(rnotwhite) || [""];
            t = types.length;
            while (t--) {
                tmp = rtypenamespace.exec(types[t]) || [];
                type = origType = tmp[1];
                namespaces = (tmp[2] || "").split(".").sort();

                // Unbind all events (on this namespace, if provided) for the element
                if (!type) {
                    for (type in events) {
                        jQuery.event.remove(elem, type + types[t], handler, selector, true);
                    }
                    continue;
                }

                special = jQuery.event.special[type] || {};
                type = (selector ? special.delegateType : special.bindType) || type;
                handlers = events[type] || [];
                tmp = tmp[2] &&
                    new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");

                // Remove matching events
                origCount = j = handlers.length;
                while (j--) {
                    handleObj = handlers[j];

                    if ((mappedTypes || origType === handleObj.origType) &&
                        (!handler || handler.guid === handleObj.guid) &&
                        (!tmp || tmp.test(handleObj.namespace)) &&
                        (!selector || selector === handleObj.selector ||
                            selector === "**" && handleObj.selector)) {
                        handlers.splice(j, 1);

                        if (handleObj.selector) {
                            handlers.delegateCount--;
                        }
                        if (special.remove) {
                            special.remove.call(elem, handleObj);
                        }
                    }
                }

                // Remove generic event handler if we removed something and no more handlers exist
                // (avoids potential for endless recursion during removal of special event handlers)
                if (origCount && !handlers.length) {
                    if (!special.teardown ||
                        special.teardown.call(elem, namespaces, elemData.handle) === false) {

                        jQuery.removeEvent(elem, type, elemData.handle);
                    }

                    delete events[type];
                }
            }

            // Remove the expando if it's no longer used
            if (jQuery.isEmptyObject(events)) {
                delete elemData.handle;

                // removeData also checks for emptiness and clears the expando if empty
                // so use it instead of delete
                jQuery._removeData(elem, "events");
            }
        },

        trigger: function(event, data, elem, onlyHandlers) {
            var handle, ontype, cur,
                bubbleType, special, tmp, i,
                eventPath = [elem || document],
                type = hasOwn.call(event, "type") ? event.type : event,
                namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];

            cur = tmp = elem = elem || document;

            // Don't do events on text and comment nodes
            if (elem.nodeType === 3 || elem.nodeType === 8) {
                return;
            }

            // focus/blur morphs to focusin/out; ensure we're not firing them right now
            if (rfocusMorph.test(type + jQuery.event.triggered)) {
                return;
            }

            if (type.indexOf(".") > -1) {

                // Namespaced trigger; create a regexp to match event type in handle()
                namespaces = type.split(".");
                type = namespaces.shift();
                namespaces.sort();
            }
            ontype = type.indexOf(":") < 0 && "on" + type;

            // Caller can pass in a jQuery.Event object, Object, or just an event type string
            event = event[jQuery.expando] ?
                event :
                new jQuery.Event(type, typeof event === "object" && event);

            // Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
            event.isTrigger = onlyHandlers ? 2 : 3;
            event.namespace = namespaces.join(".");
            event.rnamespace = event.namespace ?
                new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") :
                null;

            // Clean up the event in case it is being reused
            event.result = undefined;
            if (!event.target) {
                event.target = elem;
            }

            // Clone any incoming data and prepend the event, creating the handler arg list
            data = data == null ? [event] :
                jQuery.makeArray(data, [event]);

            // Allow special events to draw outside the lines
            special = jQuery.event.special[type] || {};
            if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
                return;
            }

            // Determine event propagation path in advance, per W3C events spec (#9951)
            // Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
            if (!onlyHandlers && !special.noBubble && !jQuery.isWindow(elem)) {

                bubbleType = special.delegateType || type;
                if (!rfocusMorph.test(bubbleType + type)) {
                    cur = cur.parentNode;
                }
                for (; cur; cur = cur.parentNode) {
                    eventPath.push(cur);
                    tmp = cur;
                }

                // Only add window if we got to document (e.g., not plain obj or detached DOM)
                if (tmp === (elem.ownerDocument || document)) {
                    eventPath.push(tmp.defaultView || tmp.parentWindow || window);
                }
            }

            // Fire handlers on the event path
            i = 0;
            while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {

                event.type = i > 1 ?
                    bubbleType :
                    special.bindType || type;

                // jQuery handler
                handle = (jQuery._data(cur, "events") || {})[event.type] &&
                    jQuery._data(cur, "handle");

                if (handle) {
                    handle.apply(cur, data);
                }

                // Native handler
                handle = ontype && cur[ontype];
                if (handle && handle.apply && acceptData(cur)) {
                    event.result = handle.apply(cur, data);
                    if (event.result === false) {
                        event.preventDefault();
                    }
                }
            }
            event.type = type;

            // If nobody prevented the default action, do it now
            if (!onlyHandlers && !event.isDefaultPrevented()) {

                if (
                    (!special._default ||
                        special._default.apply(eventPath.pop(), data) === false
                    ) && acceptData(elem)
                ) {

                    // Call a native DOM method on the target with the same name name as the event.
                    // Can't use an .isFunction() check here because IE6/7 fails that test.
                    // Don't do default actions on window, that's where global variables be (#6170)
                    if (ontype && elem[type] && !jQuery.isWindow(elem)) {

                        // Don't re-trigger an onFOO event when we call its FOO() method
                        tmp = elem[ontype];

                        if (tmp) {
                            elem[ontype] = null;
                        }

                        // Prevent re-triggering of the same event, since we already bubbled it above
                        jQuery.event.triggered = type;
                        try {
                            elem[type]();
                        } catch (e) {

                            // IE<9 dies on focus/blur to hidden element (#1486,#12518)
                            // only reproducible on winXP IE8 native, not IE9 in IE8 mode
                        }
                        jQuery.event.triggered = undefined;

                        if (tmp) {
                            elem[ontype] = tmp;
                        }
                    }
                }
            }

            return event.result;
        },

        dispatch: function(event) {

            // Make a writable jQuery.Event from the native event object
            event = jQuery.event.fix(event);

            var i, j, ret, matched, handleObj,
                handlerQueue = [],
                args = slice.call(arguments),
                handlers = (jQuery._data(this, "events") || {})[event.type] || [],
                special = jQuery.event.special[event.type] || {};

            // Use the fix-ed jQuery.Event rather than the (read-only) native event
            args[0] = event;
            event.delegateTarget = this;

            // Call the preDispatch hook for the mapped type, and let it bail if desired
            if (special.preDispatch && special.preDispatch.call(this, event) === false) {
                return;
            }

            // Determine handlers
            handlerQueue = jQuery.event.handlers.call(this, event, handlers);

            // Run delegates first; they may want to stop propagation beneath us
            i = 0;
            while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
                event.currentTarget = matched.elem;

                j = 0;
                while ((handleObj = matched.handlers[j++]) &&
                    !event.isImmediatePropagationStopped()) {

                    // Triggered event must either 1) have no namespace, or 2) have namespace(s)
                    // a subset or equal to those in the bound event (both can have no namespace).
                    if (!event.rnamespace || event.rnamespace.test(handleObj.namespace)) {

                        event.handleObj = handleObj;
                        event.data = handleObj.data;

                        ret = ((jQuery.event.special[handleObj.origType] || {}).handle ||
                            handleObj.handler).apply(matched.elem, args);

                        if (ret !== undefined) {
                            if ((event.result = ret) === false) {
                                event.preventDefault();
                                event.stopPropagation();
                            }
                        }
                    }
                }
            }

            // Call the postDispatch hook for the mapped type
            if (special.postDispatch) {
                special.postDispatch.call(this, event);
            }

            return event.result;
        },

        handlers: function(event, handlers) {
            var i, matches, sel, handleObj,
                handlerQueue = [],
                delegateCount = handlers.delegateCount,
                cur = event.target;

            // Support (at least): Chrome, IE9
            // Find delegate handlers
            // Black-hole SVG <use> instance trees (#13180)
            //
            // Support: Firefox<=42+
            // Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
            if (delegateCount && cur.nodeType &&
                (event.type !== "click" || isNaN(event.button) || event.button < 1)) {

                /* jshint eqeqeq: false */
                for (; cur != this; cur = cur.parentNode || this) {
                    /* jshint eqeqeq: true */

                    // Don't check non-elements (#13208)
                    // Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
                    if (cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click")) {
                        matches = [];
                        for (i = 0; i < delegateCount; i++) {
                            handleObj = handlers[i];

                            // Don't conflict with Object.prototype properties (#13203)
                            sel = handleObj.selector + " ";

                            if (matches[sel] === undefined) {
                                matches[sel] = handleObj.needsContext ?
                                    jQuery(sel, this).index(cur) > -1 :
                                    jQuery.find(sel, this, null, [cur]).length;
                            }
                            if (matches[sel]) {
                                matches.push(handleObj);
                            }
                        }
                        if (matches.length) {
                            handlerQueue.push({
                                elem: cur,
                                handlers: matches
                            });
                        }
                    }
                }
            }

            // Add the remaining (directly-bound) handlers
            if (delegateCount < handlers.length) {
                handlerQueue.push({
                    elem: this,
                    handlers: handlers.slice(delegateCount)
                });
            }

            return handlerQueue;
        },

        fix: function(event) {
            if (event[jQuery.expando]) {
                return event;
            }

            // Create a writable copy of the event object and normalize some properties
            var i, prop, copy,
                type = event.type,
                originalEvent = event,
                fixHook = this.fixHooks[type];

            if (!fixHook) {
                this.fixHooks[type] = fixHook =
                    rmouseEvent.test(type) ? this.mouseHooks :
                    rkeyEvent.test(type) ? this.keyHooks : {};
            }
            copy = fixHook.props ? this.props.concat(fixHook.props) : this.props;

            event = new jQuery.Event(originalEvent);

            i = copy.length;
            while (i--) {
                prop = copy[i];
                event[prop] = originalEvent[prop];
            }

            // Support: IE<9
            // Fix target property (#1925)
            if (!event.target) {
                event.target = originalEvent.srcElement || document;
            }

            // Support: Safari 6-8+
            // Target should not be a text node (#504, #13143)
            if (event.target.nodeType === 3) {
                event.target = event.target.parentNode;
            }

            // Support: IE<9
            // For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
            event.metaKey = !!event.metaKey;

            return fixHook.filter ? fixHook.filter(event, originalEvent) : event;
        },

        // Includes some event props shared by KeyEvent and MouseEvent
        props: ("altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
            "metaKey relatedTarget shiftKey target timeStamp view which").split(" "),

        fixHooks: {},

        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(event, original) {

                // Add which for key events
                if (event.which == null) {
                    event.which = original.charCode != null ? original.charCode : original.keyCode;
                }

                return event;
            }
        },

        mouseHooks: {
            props: ("button buttons clientX clientY fromElement offsetX offsetY " +
                "pageX pageY screenX screenY toElement").split(" "),
            filter: function(event, original) {
                var body, eventDoc, doc,
                    button = original.button,
                    fromElement = original.fromElement;

                // Calculate pageX/Y if missing and clientX/Y available
                if (event.pageX == null && original.clientX != null) {
                    eventDoc = event.target.ownerDocument || document;
                    doc = eventDoc.documentElement;
                    body = eventDoc.body;

                    event.pageX = original.clientX +
                        (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
                        (doc && doc.clientLeft || body && body.clientLeft || 0);
                    event.pageY = original.clientY +
                        (doc && doc.scrollTop || body && body.scrollTop || 0) -
                        (doc && doc.clientTop || body && body.clientTop || 0);
                }

                // Add relatedTarget, if necessary
                if (!event.relatedTarget && fromElement) {
                    event.relatedTarget = fromElement === event.target ?
                        original.toElement :
                        fromElement;
                }

                // Add which for click: 1 === left; 2 === middle; 3 === right
                // Note: button is not normalized, so don't use it
                if (!event.which && button !== undefined) {
                    event.which = (button & 1 ? 1 : (button & 2 ? 3 : (button & 4 ? 2 : 0)));
                }

                return event;
            }
        },

        special: {
            load: {

                // Prevent triggered image.load events from bubbling to window.load
                noBubble: true
            },
            focus: {

                // Fire native event if possible so blur/focus sequence is correct
                trigger: function() {
                    if (this !== safeActiveElement() && this.focus) {
                        try {
                            this.focus();
                            return false;
                        } catch (e) {

                            // Support: IE<9
                            // If we error on focus to hidden element (#1486, #12518),
                            // let .trigger() run the handlers
                        }
                    }
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === safeActiveElement() && this.blur) {
                        this.blur();
                        return false;
                    }
                },
                delegateType: "focusout"
            },
            click: {

                // For checkbox, fire native event so checked state will be right
                trigger: function() {
                    if (jQuery.nodeName(this, "input") && this.type === "checkbox" && this.click) {
                        this.click();
                        return false;
                    }
                },

                // For cross-browser consistency, don't fire native .click() on links
                _default: function(event) {
                    return jQuery.nodeName(event.target, "a");
                }
            },

            beforeunload: {
                postDispatch: function(event) {

                    // Support: Firefox 20+
                    // Firefox doesn't alert if the returnValue field is not set.
                    if (event.result !== undefined && event.originalEvent) {
                        event.originalEvent.returnValue = event.result;
                    }
                }
            }
        },

        // Piggyback on a donor event to simulate a different one
        simulate: function(type, elem, event) {
            var e = jQuery.extend(
                new jQuery.Event(),
                event, {
                    type: type,
                    isSimulated: true

                    // Previously, `originalEvent: {}` was set here, so stopPropagation call
                    // would not be triggered on donor event, since in our own
                    // jQuery.event.stopPropagation function we had a check for existence of
                    // originalEvent.stopPropagation method, so, consequently it would be a noop.
                    //
                    // Guard for simulated events was moved to jQuery.event.stopPropagation function
                    // since `originalEvent` should point to the original event for the
                    // constancy with other events and for more focused logic
                }
            );

            jQuery.event.trigger(e, null, elem);

            if (e.isDefaultPrevented()) {
                event.preventDefault();
            }
        }
    };

    jQuery.removeEvent = document.removeEventListener ?
        function(elem, type, handle) {

            // This "if" is needed for plain objects
            if (elem.removeEventListener) {
                elem.removeEventListener(type, handle);
            }
        } :
        function(elem, type, handle) {
            var name = "on" + type;

            if (elem.detachEvent) {

                // #8545, #7054, preventing memory leaks for custom events in IE6-8
                // detachEvent needed property on element, by name of that event,
                // to properly expose it to GC
                if (typeof elem[name] === "undefined") {
                    elem[name] = null;
                }

                elem.detachEvent(name, handle);
            }
        };

    jQuery.Event = function(src, props) {

        // Allow instantiation without the 'new' keyword
        if (!(this instanceof jQuery.Event)) {
            return new jQuery.Event(src, props);
        }

        // Event object
        if (src && src.type) {
            this.originalEvent = src;
            this.type = src.type;

            // Events bubbling up the document may have been marked as prevented
            // by a handler lower down the tree; reflect the correct value.
            this.isDefaultPrevented = src.defaultPrevented ||
                src.defaultPrevented === undefined &&

                // Support: IE < 9, Android < 4.0
                src.returnValue === false ?
                returnTrue :
                returnFalse;

            // Event type
        } else {
            this.type = src;
        }

        // Put explicitly provided properties onto the event object
        if (props) {
            jQuery.extend(this, props);
        }

        // Create a timestamp if incoming event doesn't have one
        this.timeStamp = src && src.timeStamp || jQuery.now();

        // Mark it as fixed
        this[jQuery.expando] = true;
    };

    // jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
    // http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
    jQuery.Event.prototype = {
        constructor: jQuery.Event,
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,

        preventDefault: function() {
            var e = this.originalEvent;

            this.isDefaultPrevented = returnTrue;
            if (!e) {
                return;
            }

            // If preventDefault exists, run it on the original event
            if (e.preventDefault) {
                e.preventDefault();

                // Support: IE
                // Otherwise set the returnValue property of the original event to false
            } else {
                e.returnValue = false;
            }
        },
        stopPropagation: function() {
            var e = this.originalEvent;

            this.isPropagationStopped = returnTrue;

            if (!e || this.isSimulated) {
                return;
            }

            // If stopPropagation exists, run it on the original event
            if (e.stopPropagation) {
                e.stopPropagation();
            }

            // Support: IE
            // Set the cancelBubble property of the original event to true
            e.cancelBubble = true;
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;

            this.isImmediatePropagationStopped = returnTrue;

            if (e && e.stopImmediatePropagation) {
                e.stopImmediatePropagation();
            }

            this.stopPropagation();
        }
    };

    // Create mouseenter/leave events using mouseover/out and event-time checks
    // so that event delegation works in jQuery.
    // Do the same for pointerenter/pointerleave and pointerover/pointerout
    //
    // Support: Safari 7 only
    // Safari sends mouseenter too often; see:
    // https://code.google.com/p/chromium/issues/detail?id=470258
    // for the description of the bug (it existed in older Chrome versions as well).
    jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(orig, fix) {
        jQuery.event.special[orig] = {
            delegateType: fix,
            bindType: fix,

            handle: function(event) {
                var ret,
                    target = this,
                    related = event.relatedTarget,
                    handleObj = event.handleObj;

                // For mouseenter/leave call the handler if related is outside the target.
                // NB: No relatedTarget if the mouse left/entered the browser window
                if (!related || (related !== target && !jQuery.contains(target, related))) {
                    event.type = handleObj.origType;
                    ret = handleObj.handler.apply(this, arguments);
                    event.type = fix;
                }
                return ret;
            }
        };
    });

    // IE submit delegation
    if (!support.submit) {

        jQuery.event.special.submit = {
            setup: function() {

                // Only need this for delegated form submit events
                if (jQuery.nodeName(this, "form")) {
                    return false;
                }

                // Lazy-add a submit handler when a descendant form may potentially be submitted
                jQuery.event.add(this, "click._submit keypress._submit", function(e) {

                    // Node name check avoids a VML-related crash in IE (#9807)
                    var elem = e.target,
                        form = jQuery.nodeName(elem, "input") || jQuery.nodeName(elem, "button") ?

                        // Support: IE <=8
                        // We use jQuery.prop instead of elem.form
                        // to allow fixing the IE8 delegated submit issue (gh-2332)
                        // by 3rd party polyfills/workarounds.
                        jQuery.prop(elem, "form") :
                        undefined;

                    if (form && !jQuery._data(form, "submit")) {
                        jQuery.event.add(form, "submit._submit", function(event) {
                            event._submitBubble = true;
                        });
                        jQuery._data(form, "submit", true);
                    }
                });

                // return undefined since we don't need an event listener
            },

            postDispatch: function(event) {

                // If form was submitted by the user, bubble the event up the tree
                if (event._submitBubble) {
                    delete event._submitBubble;
                    if (this.parentNode && !event.isTrigger) {
                        jQuery.event.simulate("submit", this.parentNode, event);
                    }
                }
            },

            teardown: function() {

                // Only need this for delegated form submit events
                if (jQuery.nodeName(this, "form")) {
                    return false;
                }

                // Remove delegated handlers; cleanData eventually reaps submit handlers attached above
                jQuery.event.remove(this, "._submit");
            }
        };
    }

    // IE change delegation and checkbox/radio fix
    if (!support.change) {

        jQuery.event.special.change = {

            setup: function() {

                if (rformElems.test(this.nodeName)) {

                    // IE doesn't fire change on a check/radio until blur; trigger it on click
                    // after a propertychange. Eat the blur-change in special.change.handle.
                    // This still fires onchange a second time for check/radio after blur.
                    if (this.type === "checkbox" || this.type === "radio") {
                        jQuery.event.add(this, "propertychange._change", function(event) {
                            if (event.originalEvent.propertyName === "checked") {
                                this._justChanged = true;
                            }
                        });
                        jQuery.event.add(this, "click._change", function(event) {
                            if (this._justChanged && !event.isTrigger) {
                                this._justChanged = false;
                            }

                            // Allow triggered, simulated change events (#11500)
                            jQuery.event.simulate("change", this, event);
                        });
                    }
                    return false;
                }

                // Delegated event; lazy-add a change handler on descendant inputs
                jQuery.event.add(this, "beforeactivate._change", function(e) {
                    var elem = e.target;

                    if (rformElems.test(elem.nodeName) && !jQuery._data(elem, "change")) {
                        jQuery.event.add(elem, "change._change", function(event) {
                            if (this.parentNode && !event.isSimulated && !event.isTrigger) {
                                jQuery.event.simulate("change", this.parentNode, event);
                            }
                        });
                        jQuery._data(elem, "change", true);
                    }
                });
            },

            handle: function(event) {
                var elem = event.target;

                // Swallow native change events from checkbox/radio, we already triggered them above
                if (this !== elem || event.isSimulated || event.isTrigger ||
                    (elem.type !== "radio" && elem.type !== "checkbox")) {

                    return event.handleObj.handler.apply(this, arguments);
                }
            },

            teardown: function() {
                jQuery.event.remove(this, "._change");

                return !rformElems.test(this.nodeName);
            }
        };
    }

    // Support: Firefox
    // Firefox doesn't have focus(in | out) events
    // Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
    //
    // Support: Chrome, Safari
    // focus(in | out) events fire after focus & blur events,
    // which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
    // Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
    if (!support.focusin) {
        jQuery.each({
            focus: "focusin",
            blur: "focusout"
        }, function(orig, fix) {

            // Attach a single capturing handler on the document while someone wants focusin/focusout
            var handler = function(event) {
                jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
            };

            jQuery.event.special[fix] = {
                setup: function() {
                    var doc = this.ownerDocument || this,
                        attaches = jQuery._data(doc, fix);

                    if (!attaches) {
                        doc.addEventListener(orig, handler, true);
                    }
                    jQuery._data(doc, fix, (attaches || 0) + 1);
                },
                teardown: function() {
                    var doc = this.ownerDocument || this,
                        attaches = jQuery._data(doc, fix) - 1;

                    if (!attaches) {
                        doc.removeEventListener(orig, handler, true);
                        jQuery._removeData(doc, fix);
                    } else {
                        jQuery._data(doc, fix, attaches);
                    }
                }
            };
        });
    }

    jQuery.fn.extend({

        on: function(types, selector, data, fn) {
            return on(this, types, selector, data, fn);
        },
        one: function(types, selector, data, fn) {
            return on(this, types, selector, data, fn, 1);
        },
        off: function(types, selector, fn) {
            var handleObj, type;
            if (types && types.preventDefault && types.handleObj) {

                // ( event )  dispatched jQuery.Event
                handleObj = types.handleObj;
                jQuery(types.delegateTarget).off(
                    handleObj.namespace ?
                    handleObj.origType + "." + handleObj.namespace :
                    handleObj.origType,
                    handleObj.selector,
                    handleObj.handler
                );
                return this;
            }
            if (typeof types === "object") {

                // ( types-object [, selector] )
                for (type in types) {
                    this.off(type, selector, types[type]);
                }
                return this;
            }
            if (selector === false || typeof selector === "function") {

                // ( types [, fn] )
                fn = selector;
                selector = undefined;
            }
            if (fn === false) {
                fn = returnFalse;
            }
            return this.each(function() {
                jQuery.event.remove(this, types, fn, selector);
            });
        },

        trigger: function(type, data) {
            return this.each(function() {
                jQuery.event.trigger(type, data, this);
            });
        },
        triggerHandler: function(type, data) {
            var elem = this[0];
            if (elem) {
                return jQuery.event.trigger(type, data, elem, true);
            }
        }
    });


    var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
        rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
        rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

        // Support: IE 10-11, Edge 10240+
        // In IE/Edge using regex groups here causes severe slowdowns.
        // See https://connect.microsoft.com/IE/feedback/details/1736512/
        rnoInnerhtml = /<script|<style|<link/i,

        // checked="checked" or checked
        rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
        rscriptTypeMasked = /^true\/(.*)/,
        rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        safeFragment = createSafeFragment(document),
        fragmentDiv = safeFragment.appendChild(document.createElement("div"));

    // Support: IE<8
    // Manipulating tables requires a tbody
    function manipulationTarget(elem, content) {
        return jQuery.nodeName(elem, "table") &&
            jQuery.nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr") ?

            elem.getElementsByTagName("tbody")[0] ||
            elem.appendChild(elem.ownerDocument.createElement("tbody")) :
            elem;
    }

    // Replace/restore the type attribute of script elements for safe DOM manipulation
    function disableScript(elem) {
        elem.type = (jQuery.find.attr(elem, "type") !== null) + "/" + elem.type;
        return elem;
    }

    function restoreScript(elem) {
        var match = rscriptTypeMasked.exec(elem.type);
        if (match) {
            elem.type = match[1];
        } else {
            elem.removeAttribute("type");
        }
        return elem;
    }

    function cloneCopyEvent(src, dest) {
        if (dest.nodeType !== 1 || !jQuery.hasData(src)) {
            return;
        }

        var type, i, l,
            oldData = jQuery._data(src),
            curData = jQuery._data(dest, oldData),
            events = oldData.events;

        if (events) {
            delete curData.handle;
            curData.events = {};

            for (type in events) {
                for (i = 0, l = events[type].length; i < l; i++) {
                    jQuery.event.add(dest, type, events[type][i]);
                }
            }
        }

        // make the cloned public data object a copy from the original
        if (curData.data) {
            curData.data = jQuery.extend({}, curData.data);
        }
    }

    function fixCloneNodeIssues(src, dest) {
        var nodeName, e, data;

        // We do not need to do anything for non-Elements
        if (dest.nodeType !== 1) {
            return;
        }

        nodeName = dest.nodeName.toLowerCase();

        // IE6-8 copies events bound via attachEvent when using cloneNode.
        if (!support.noCloneEvent && dest[jQuery.expando]) {
            data = jQuery._data(dest);

            for (e in data.events) {
                jQuery.removeEvent(dest, e, data.handle);
            }

            // Event data gets referenced instead of copied if the expando gets copied too
            dest.removeAttribute(jQuery.expando);
        }

        // IE blanks contents when cloning scripts, and tries to evaluate newly-set text
        if (nodeName === "script" && dest.text !== src.text) {
            disableScript(dest).text = src.text;
            restoreScript(dest);

            // IE6-10 improperly clones children of object elements using classid.
            // IE10 throws NoModificationAllowedError if parent is null, #12132.
        } else if (nodeName === "object") {
            if (dest.parentNode) {
                dest.outerHTML = src.outerHTML;
            }

            // This path appears unavoidable for IE9. When cloning an object
            // element in IE9, the outerHTML strategy above is not sufficient.
            // If the src has innerHTML and the destination does not,
            // copy the src.innerHTML into the dest.innerHTML. #10324
            if (support.html5Clone && (src.innerHTML && !jQuery.trim(dest.innerHTML))) {
                dest.innerHTML = src.innerHTML;
            }

        } else if (nodeName === "input" && rcheckableType.test(src.type)) {

            // IE6-8 fails to persist the checked state of a cloned checkbox
            // or radio button. Worse, IE6-7 fail to give the cloned element
            // a checked appearance if the defaultChecked value isn't also set

            dest.defaultChecked = dest.checked = src.checked;

            // IE6-7 get confused and end up setting the value of a cloned
            // checkbox/radio button to an empty string instead of "on"
            if (dest.value !== src.value) {
                dest.value = src.value;
            }

            // IE6-8 fails to return the selected option to the default selected
            // state when cloning options
        } else if (nodeName === "option") {
            dest.defaultSelected = dest.selected = src.defaultSelected;

            // IE6-8 fails to set the defaultValue to the correct value when
            // cloning other types of input fields
        } else if (nodeName === "input" || nodeName === "textarea") {
            dest.defaultValue = src.defaultValue;
        }
    }

    function domManip(collection, args, callback, ignored) {

        // Flatten any nested arrays
        args = concat.apply([], args);

        var first, node, hasScripts,
            scripts, doc, fragment,
            i = 0,
            l = collection.length,
            iNoClone = l - 1,
            value = args[0],
            isFunction = jQuery.isFunction(value);

        // We can't cloneNode fragments that contain checked, in WebKit
        if (isFunction ||
            (l > 1 && typeof value === "string" &&
                !support.checkClone && rchecked.test(value))) {
            return collection.each(function(index) {
                var self = collection.eq(index);
                if (isFunction) {
                    args[0] = value.call(this, index, self.html());
                }
                domManip(self, args, callback, ignored);
            });
        }

        if (l) {
            fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
            first = fragment.firstChild;

            if (fragment.childNodes.length === 1) {
                fragment = first;
            }

            // Require either new content or an interest in ignored elements to invoke the callback
            if (first || ignored) {
                scripts = jQuery.map(getAll(fragment, "script"), disableScript);
                hasScripts = scripts.length;

                // Use the original fragment for the last item
                // instead of the first because it can end up
                // being emptied incorrectly in certain situations (#8070).
                for (; i < l; i++) {
                    node = fragment;

                    if (i !== iNoClone) {
                        node = jQuery.clone(node, true, true);

                        // Keep references to cloned scripts for later restoration
                        if (hasScripts) {

                            // Support: Android<4.1, PhantomJS<2
                            // push.apply(_, arraylike) throws on ancient WebKit
                            jQuery.merge(scripts, getAll(node, "script"));
                        }
                    }

                    callback.call(collection[i], node, i);
                }

                if (hasScripts) {
                    doc = scripts[scripts.length - 1].ownerDocument;

                    // Reenable scripts
                    jQuery.map(scripts, restoreScript);

                    // Evaluate executable scripts on first document insertion
                    for (i = 0; i < hasScripts; i++) {
                        node = scripts[i];
                        if (rscriptType.test(node.type || "") &&
                            !jQuery._data(node, "globalEval") &&
                            jQuery.contains(doc, node)) {

                            if (node.src) {

                                // Optional AJAX dependency, but won't run scripts if not present
                                if (jQuery._evalUrl) {
                                    jQuery._evalUrl(node.src);
                                }
                            } else {
                                jQuery.globalEval(
                                    (node.text || node.textContent || node.innerHTML || "")
                                    .replace(rcleanScript, "")
                                );
                            }
                        }
                    }
                }

                // Fix #11809: Avoid leaking memory
                fragment = first = null;
            }
        }

        return collection;
    }

    function remove(elem, selector, keepData) {
        var node,
            elems = selector ? jQuery.filter(selector, elem) : elem,
            i = 0;

        for (;
            (node = elems[i]) != null; i++) {

            if (!keepData && node.nodeType === 1) {
                jQuery.cleanData(getAll(node));
            }

            if (node.parentNode) {
                if (keepData && jQuery.contains(node.ownerDocument, node)) {
                    setGlobalEval(getAll(node, "script"));
                }
                node.parentNode.removeChild(node);
            }
        }

        return elem;
    }

    jQuery.extend({
        htmlPrefilter: function(html) {
            return html.replace(rxhtmlTag, "<$1></$2>");
        },

        clone: function(elem, dataAndEvents, deepDataAndEvents) {
            var destElements, node, clone, i, srcElements,
                inPage = jQuery.contains(elem.ownerDocument, elem);

            if (support.html5Clone || jQuery.isXMLDoc(elem) ||
                !rnoshimcache.test("<" + elem.nodeName + ">")) {

                clone = elem.cloneNode(true);

                // IE<=8 does not properly clone detached, unknown element nodes
            } else {
                fragmentDiv.innerHTML = elem.outerHTML;
                fragmentDiv.removeChild(clone = fragmentDiv.firstChild);
            }

            if ((!support.noCloneEvent || !support.noCloneChecked) &&
                (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {

                // We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
                destElements = getAll(clone);
                srcElements = getAll(elem);

                // Fix all IE cloning issues
                for (i = 0;
                    (node = srcElements[i]) != null; ++i) {

                    // Ensure that the destination node is not null; Fixes #9587
                    if (destElements[i]) {
                        fixCloneNodeIssues(node, destElements[i]);
                    }
                }
            }

            // Copy the events from the original to the clone
            if (dataAndEvents) {
                if (deepDataAndEvents) {
                    srcElements = srcElements || getAll(elem);
                    destElements = destElements || getAll(clone);

                    for (i = 0;
                        (node = srcElements[i]) != null; i++) {
                        cloneCopyEvent(node, destElements[i]);
                    }
                } else {
                    cloneCopyEvent(elem, clone);
                }
            }

            // Preserve script evaluation history
            destElements = getAll(clone, "script");
            if (destElements.length > 0) {
                setGlobalEval(destElements, !inPage && getAll(elem, "script"));
            }

            destElements = srcElements = node = null;

            // Return the cloned set
            return clone;
        },

        cleanData: function(elems, /* internal */ forceAcceptData) {
            var elem, type, id, data,
                i = 0,
                internalKey = jQuery.expando,
                cache = jQuery.cache,
                attributes = support.attributes,
                special = jQuery.event.special;

            for (;
                (elem = elems[i]) != null; i++) {
                if (forceAcceptData || acceptData(elem)) {

                    id = elem[internalKey];
                    data = id && cache[id];

                    if (data) {
                        if (data.events) {
                            for (type in data.events) {
                                if (special[type]) {
                                    jQuery.event.remove(elem, type);

                                    // This is a shortcut to avoid jQuery.event.remove's overhead
                                } else {
                                    jQuery.removeEvent(elem, type, data.handle);
                                }
                            }
                        }

                        // Remove cache only if it was not already removed by jQuery.event.remove
                        if (cache[id]) {

                            delete cache[id];

                            // Support: IE<9
                            // IE does not allow us to delete expando properties from nodes
                            // IE creates expando attributes along with the property
                            // IE does not have a removeAttribute function on Document nodes
                            if (!attributes && typeof elem.removeAttribute !== "undefined") {
                                elem.removeAttribute(internalKey);

                                // Webkit & Blink performance suffers when deleting properties
                                // from DOM nodes, so set to undefined instead
                                // https://code.google.com/p/chromium/issues/detail?id=378607
                            } else {
                                elem[internalKey] = undefined;
                            }

                            deletedIds.push(id);
                        }
                    }
                }
            }
        }
    });

    jQuery.fn.extend({

        // Keep domManip exposed until 3.0 (gh-2225)
        domManip: domManip,

        detach: function(selector) {
            return remove(this, selector, true);
        },

        remove: function(selector) {
            return remove(this, selector);
        },

        text: function(value) {
            return access(this, function(value) {
                return value === undefined ?
                    jQuery.text(this) :
                    this.empty().append(
                        (this[0] && this[0].ownerDocument || document).createTextNode(value)
                    );
            }, null, value, arguments.length);
        },

        append: function() {
            return domManip(this, arguments, function(elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.appendChild(elem);
                }
            });
        },

        prepend: function() {
            return domManip(this, arguments, function(elem) {
                if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                    var target = manipulationTarget(this, elem);
                    target.insertBefore(elem, target.firstChild);
                }
            });
        },

        before: function() {
            return domManip(this, arguments, function(elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this);
                }
            });
        },

        after: function() {
            return domManip(this, arguments, function(elem) {
                if (this.parentNode) {
                    this.parentNode.insertBefore(elem, this.nextSibling);
                }
            });
        },

        empty: function() {
            var elem,
                i = 0;

            for (;
                (elem = this[i]) != null; i++) {

                // Remove element nodes and prevent memory leaks
                if (elem.nodeType === 1) {
                    jQuery.cleanData(getAll(elem, false));
                }

                // Remove any remaining nodes
                while (elem.firstChild) {
                    elem.removeChild(elem.firstChild);
                }

                // If this is a select, ensure that it displays empty (#12336)
                // Support: IE<9
                if (elem.options && jQuery.nodeName(elem, "select")) {
                    elem.options.length = 0;
                }
            }

            return this;
        },

        clone: function(dataAndEvents, deepDataAndEvents) {
            dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
            deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

            return this.map(function() {
                return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
            });
        },

        html: function(value) {
            return access(this, function(value) {
                var elem = this[0] || {},
                    i = 0,
                    l = this.length;

                if (value === undefined) {
                    return elem.nodeType === 1 ?
                        elem.innerHTML.replace(rinlinejQuery, "") :
                        undefined;
                }

                // See if we can take a shortcut and just use innerHTML
                if (typeof value === "string" && !rnoInnerhtml.test(value) &&
                    (support.htmlSerialize || !rnoshimcache.test(value)) &&
                    (support.leadingWhitespace || !rleadingWhitespace.test(value)) &&
                    !wrapMap[(rtagName.exec(value) || ["", ""])[1].toLowerCase()]) {

                    value = jQuery.htmlPrefilter(value);

                    try {
                        for (; i < l; i++) {

                            // Remove element nodes and prevent memory leaks
                            elem = this[i] || {};
                            if (elem.nodeType === 1) {
                                jQuery.cleanData(getAll(elem, false));
                                elem.innerHTML = value;
                            }
                        }

                        elem = 0;

                        // If using innerHTML throws an exception, use the fallback method
                    } catch (e) {}
                }

                if (elem) {
                    this.empty().append(value);
                }
            }, null, value, arguments.length);
        },

        replaceWith: function() {
            var ignored = [];

            // Make the changes, replacing each non-ignored context element with the new content
            return domManip(this, arguments, function(elem) {
                var parent = this.parentNode;

                if (jQuery.inArray(this, ignored) < 0) {
                    jQuery.cleanData(getAll(this));
                    if (parent) {
                        parent.replaceChild(elem, this);
                    }
                }

                // Force callback invocation
            }, ignored);
        }
    });

    jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(name, original) {
        jQuery.fn[name] = function(selector) {
            var elems,
                i = 0,
                ret = [],
                insert = jQuery(selector),
                last = insert.length - 1;

            for (; i <= last; i++) {
                elems = i === last ? this : this.clone(true);
                jQuery(insert[i])[original](elems);

                // Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
                push.apply(ret, elems.get());
            }

            return this.pushStack(ret);
        };
    });


    var iframe,
        elemdisplay = {

            // Support: Firefox
            // We have to pre-define these values for FF (#10227)
            HTML: "block",
            BODY: "block"
        };

    /**
     * Retrieve the actual display of a element
     * @param {String} name nodeName of the element
     * @param {Object} doc Document object
     */

    // Called only from within defaultDisplay
    function actualDisplay(name, doc) {
        var elem = jQuery(doc.createElement(name)).appendTo(doc.body),

            display = jQuery.css(elem[0], "display");

        // We don't have any data stored on the element,
        // so use "detach" method as fast way to get rid of the element
        elem.detach();

        return display;
    }

    /**
     * Try to determine the default display value of an element
     * @param {String} nodeName
     */
    function defaultDisplay(nodeName) {
        var doc = document,
            display = elemdisplay[nodeName];

        if (!display) {
            display = actualDisplay(nodeName, doc);

            // If the simple way fails, read from inside an iframe
            if (display === "none" || !display) {

                // Use the already-created iframe if possible
                iframe = (iframe || jQuery("<iframe frameborder='0' width='0' height='0'/>"))
                    .appendTo(doc.documentElement);

                // Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
                doc = (iframe[0].contentWindow || iframe[0].contentDocument).document;

                // Support: IE
                doc.write();
                doc.close();

                display = actualDisplay(nodeName, doc);
                iframe.detach();
            }

            // Store the correct default display
            elemdisplay[nodeName] = display;
        }

        return display;
    }
    var rmargin = (/^margin/);

    var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");

    var swap = function(elem, options, callback, args) {
        var ret, name,
            old = {};

        // Remember the old values, and insert the new ones
        for (name in options) {
            old[name] = elem.style[name];
            elem.style[name] = options[name];
        }

        ret = callback.apply(elem, args || []);

        // Revert the old values
        for (name in options) {
            elem.style[name] = old[name];
        }

        return ret;
    };


    var documentElement = document.documentElement;



    (function() {
        var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
            reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
            container = document.createElement("div"),
            div = document.createElement("div");

        // Finish early in limited (non-browser) environments
        if (!div.style) {
            return;
        }

        div.style.cssText = "float:left;opacity:.5";

        // Support: IE<9
        // Make sure that element opacity exists (as opposed to filter)
        support.opacity = div.style.opacity === "0.5";

        // Verify style float existence
        // (IE uses styleFloat instead of cssFloat)
        support.cssFloat = !!div.style.cssFloat;

        div.style.backgroundClip = "content-box";
        div.cloneNode(true).style.backgroundClip = "";
        support.clearCloneStyle = div.style.backgroundClip === "content-box";

        container = document.createElement("div");
        container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
            "padding:0;margin-top:1px;position:absolute";
        div.innerHTML = "";
        container.appendChild(div);

        // Support: Firefox<29, Android 2.3
        // Vendor-prefix box-sizing
        support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
            div.style.WebkitBoxSizing === "";

        jQuery.extend(support, {
            reliableHiddenOffsets: function() {
                if (pixelPositionVal == null) {
                    computeStyleTests();
                }
                return reliableHiddenOffsetsVal;
            },

            boxSizingReliable: function() {

                // We're checking for pixelPositionVal here instead of boxSizingReliableVal
                // since that compresses better and they're computed together anyway.
                if (pixelPositionVal == null) {
                    computeStyleTests();
                }
                return boxSizingReliableVal;
            },

            pixelMarginRight: function() {

                // Support: Android 4.0-4.3
                if (pixelPositionVal == null) {
                    computeStyleTests();
                }
                return pixelMarginRightVal;
            },

            pixelPosition: function() {
                if (pixelPositionVal == null) {
                    computeStyleTests();
                }
                return pixelPositionVal;
            },

            reliableMarginRight: function() {

                // Support: Android 2.3
                if (pixelPositionVal == null) {
                    computeStyleTests();
                }
                return reliableMarginRightVal;
            },

            reliableMarginLeft: function() {

                // Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
                if (pixelPositionVal == null) {
                    computeStyleTests();
                }
                return reliableMarginLeftVal;
            }
        });

        function computeStyleTests() {
            var contents, divStyle,
                documentElement = document.documentElement;

            // Setup
            documentElement.appendChild(container);

            div.style.cssText =

                // Support: Android 2.3
                // Vendor-prefix box-sizing
                "-webkit-box-sizing:border-box;box-sizing:border-box;" +
                "position:relative;display:block;" +
                "margin:auto;border:1px;padding:1px;" +
                "top:1%;width:50%";

            // Support: IE<9
            // Assume reasonable values in the absence of getComputedStyle
            pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
            pixelMarginRightVal = reliableMarginRightVal = true;

            // Check for getComputedStyle so that this code is not run in IE<9.
            if (window.getComputedStyle) {
                divStyle = window.getComputedStyle(div);
                pixelPositionVal = (divStyle || {}).top !== "1%";
                reliableMarginLeftVal = (divStyle || {}).marginLeft === "2px";
                boxSizingReliableVal = (divStyle || {
                    width: "4px"
                }).width === "4px";

                // Support: Android 4.0 - 4.3 only
                // Some styles come back with percentage values, even though they shouldn't
                div.style.marginRight = "50%";
                pixelMarginRightVal = (divStyle || {
                    marginRight: "4px"
                }).marginRight === "4px";

                // Support: Android 2.3 only
                // Div with explicit width and no margin-right incorrectly
                // gets computed margin-right based on width of container (#3333)
                // WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
                contents = div.appendChild(document.createElement("div"));

                // Reset CSS: box-sizing; display; margin; border; padding
                contents.style.cssText = div.style.cssText =

                    // Support: Android 2.3
                    // Vendor-prefix box-sizing
                    "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
                    "box-sizing:content-box;display:block;margin:0;border:0;padding:0";
                contents.style.marginRight = contents.style.width = "0";
                div.style.width = "1px";

                reliableMarginRightVal = !parseFloat((window.getComputedStyle(contents) || {}).marginRight);

                div.removeChild(contents);
            }

            // Support: IE6-8
            // First check that getClientRects works as expected
            // Check if table cells still have offsetWidth/Height when they are set
            // to display:none and there are still other visible table cells in a
            // table row; if so, offsetWidth/Height are not reliable for use when
            // determining if an element has been hidden directly using
            // display:none (it is still safe to use offsets if a parent element is
            // hidden; don safety goggles and see bug #4512 for more information).
            div.style.display = "none";
            reliableHiddenOffsetsVal = div.getClientRects().length === 0;
            if (reliableHiddenOffsetsVal) {
                div.style.display = "";
                div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
                div.childNodes[0].style.borderCollapse = "separate";
                contents = div.getElementsByTagName("td");
                contents[0].style.cssText = "margin:0;border:0;padding:0;display:none";
                reliableHiddenOffsetsVal = contents[0].offsetHeight === 0;
                if (reliableHiddenOffsetsVal) {
                    contents[0].style.display = "";
                    contents[1].style.display = "none";
                    reliableHiddenOffsetsVal = contents[0].offsetHeight === 0;
                }
            }

            // Teardown
            documentElement.removeChild(container);
        }

    })();


    var getStyles, curCSS,
        rposition = /^(top|right|bottom|left)$/;

    if (window.getComputedStyle) {
        getStyles = function(elem) {

            // Support: IE<=11+, Firefox<=30+ (#15098, #14150)
            // IE throws on elements created in popups
            // FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
            var view = elem.ownerDocument.defaultView;

            if (!view || !view.opener) {
                view = window;
            }

            return view.getComputedStyle(elem);
        };

        curCSS = function(elem, name, computed) {
            var width, minWidth, maxWidth, ret,
                style = elem.style;

            computed = computed || getStyles(elem);

            // getPropertyValue is only needed for .css('filter') in IE9, see #12537
            ret = computed ? computed.getPropertyValue(name) || computed[name] : undefined;

            // Support: Opera 12.1x only
            // Fall back to style even without computed
            // computed is undefined for elems on document fragments
            if ((ret === "" || ret === undefined) && !jQuery.contains(elem.ownerDocument, elem)) {
                ret = jQuery.style(elem, name);
            }

            if (computed) {

                // A tribute to the "awesome hack by Dean Edwards"
                // Chrome < 17 and Safari 5.0 uses "computed value"
                // instead of "used value" for margin-right
                // Safari 5.1.7 (at least) returns percentage for a larger set of values,
                // but width seems to be reliably pixels
                // this is against the CSSOM draft spec:
                // http://dev.w3.org/csswg/cssom/#resolved-values
                if (!support.pixelMarginRight() && rnumnonpx.test(ret) && rmargin.test(name)) {

                    // Remember the original values
                    width = style.width;
                    minWidth = style.minWidth;
                    maxWidth = style.maxWidth;

                    // Put in the new values to get a computed value out
                    style.minWidth = style.maxWidth = style.width = ret;
                    ret = computed.width;

                    // Revert the changed values
                    style.width = width;
                    style.minWidth = minWidth;
                    style.maxWidth = maxWidth;
                }
            }

            // Support: IE
            // IE returns zIndex value as an integer.
            return ret === undefined ?
                ret :
                ret + "";
        };
    } else if (documentElement.currentStyle) {
        getStyles = function(elem) {
            return elem.currentStyle;
        };

        curCSS = function(elem, name, computed) {
            var left, rs, rsLeft, ret,
                style = elem.style;

            computed = computed || getStyles(elem);
            ret = computed ? computed[name] : undefined;

            // Avoid setting ret to empty string here
            // so we don't default to auto
            if (ret == null && style && style[name]) {
                ret = style[name];
            }

            // From the awesome hack by Dean Edwards
            // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

            // If we're not dealing with a regular pixel number
            // but a number that has a weird ending, we need to convert it to pixels
            // but not position css attributes, as those are
            // proportional to the parent element instead
            // and we can't measure the parent instead because it
            // might trigger a "stacking dolls" problem
            if (rnumnonpx.test(ret) && !rposition.test(name)) {

                // Remember the original values
                left = style.left;
                rs = elem.runtimeStyle;
                rsLeft = rs && rs.left;

                // Put in the new values to get a computed value out
                if (rsLeft) {
                    rs.left = elem.currentStyle.left;
                }
                style.left = name === "fontSize" ? "1em" : ret;
                ret = style.pixelLeft + "px";

                // Revert the changed values
                style.left = left;
                if (rsLeft) {
                    rs.left = rsLeft;
                }
            }

            // Support: IE
            // IE returns zIndex value as an integer.
            return ret === undefined ?
                ret :
                ret + "" || "auto";
        };
    }




    function addGetHookIf(conditionFn, hookFn) {

        // Define the hook, we'll check on the first run if it's really needed.
        return {
            get: function() {
                if (conditionFn()) {

                    // Hook not needed (or it's not possible to use it due
                    // to missing dependency), remove it.
                    delete this.get;
                    return;
                }

                // Hook needed; redefine it so that the support test is not executed again.
                return (this.get = hookFn).apply(this, arguments);
            }
        };
    }


    var

        ralpha = /alpha\([^)]*\)/i,
        ropacity = /opacity\s*=\s*([^)]*)/i,

        // swappable if display is none or starts with table except
        // "table", "table-cell", or "table-caption"
        // see here for display values:
        // https://developer.mozilla.org/en-US/docs/CSS/display
        rdisplayswap = /^(none|table(?!-c[ea]).+)/,
        rnumsplit = new RegExp("^(" + pnum + ")(.*)$", "i"),

        cssShow = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        cssNormalTransform = {
            letterSpacing: "0",
            fontWeight: "400"
        },

        cssPrefixes = ["Webkit", "O", "Moz", "ms"],
        emptyStyle = document.createElement("div").style;


    // return a css property mapped to a potentially vendor prefixed property
    function vendorPropName(name) {

        // shortcut for names that are not vendor prefixed
        if (name in emptyStyle) {
            return name;
        }

        // check for vendor prefixed names
        var capName = name.charAt(0).toUpperCase() + name.slice(1),
            i = cssPrefixes.length;

        while (i--) {
            name = cssPrefixes[i] + capName;
            if (name in emptyStyle) {
                return name;
            }
        }
    }

    function showHide(elements, show) {
        var display, elem, hidden,
            values = [],
            index = 0,
            length = elements.length;

        for (; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue;
            }

            values[index] = jQuery._data(elem, "olddisplay");
            display = elem.style.display;
            if (show) {

                // Reset the inline display of this element to learn if it is
                // being hidden by cascaded rules or not
                if (!values[index] && display === "none") {
                    elem.style.display = "";
                }

                // Set elements which have been overridden with display: none
                // in a stylesheet to whatever the default browser style is
                // for such an element
                if (elem.style.display === "" && isHidden(elem)) {
                    values[index] =
                        jQuery._data(elem, "olddisplay", defaultDisplay(elem.nodeName));
                }
            } else {
                hidden = isHidden(elem);

                if (display && display !== "none" || !hidden) {
                    jQuery._data(
                        elem,
                        "olddisplay",
                        hidden ? display : jQuery.css(elem, "display")
                    );
                }
            }
        }

        // Set the display of most of the elements in a second loop
        // to avoid the constant reflow
        for (index = 0; index < length; index++) {
            elem = elements[index];
            if (!elem.style) {
                continue;
            }
            if (!show || elem.style.display === "none" || elem.style.display === "") {
                elem.style.display = show ? values[index] || "" : "none";
            }
        }

        return elements;
    }

    function setPositiveNumber(elem, value, subtract) {
        var matches = rnumsplit.exec(value);
        return matches ?

            // Guard against undefined "subtract", e.g., when used as in cssHooks
            Math.max(0, matches[1] - (subtract || 0)) + (matches[2] || "px") :
            value;
    }

    function augmentWidthOrHeight(elem, name, extra, isBorderBox, styles) {
        var i = extra === (isBorderBox ? "border" : "content") ?

            // If we already have the right measurement, avoid augmentation
            4 :

            // Otherwise initialize for horizontal or vertical properties
            name === "width" ? 1 : 0,

            val = 0;

        for (; i < 4; i += 2) {

            // both box models exclude margin, so add it if we want it
            if (extra === "margin") {
                val += jQuery.css(elem, extra + cssExpand[i], true, styles);
            }

            if (isBorderBox) {

                // border-box includes padding, so remove it if we want content
                if (extra === "content") {
                    val -= jQuery.css(elem, "padding" + cssExpand[i], true, styles);
                }

                // at this point, extra isn't border nor margin, so remove border
                if (extra !== "margin") {
                    val -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                }
            } else {

                // at this point, extra isn't content, so add padding
                val += jQuery.css(elem, "padding" + cssExpand[i], true, styles);

                // at this point, extra isn't content nor padding, so add border
                if (extra !== "padding") {
                    val += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles);
                }
            }
        }

        return val;
    }

    function getWidthOrHeight(elem, name, extra) {

        // Start with offset property, which is equivalent to the border-box value
        var valueIsBorderBox = true,
            val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
            styles = getStyles(elem),
            isBorderBox = support.boxSizing &&
            jQuery.css(elem, "boxSizing", false, styles) === "border-box";

        // some non-html elements return undefined for offsetWidth, so check for null/undefined
        // svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
        // MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
        if (val <= 0 || val == null) {

            // Fall back to computed then uncomputed css if necessary
            val = curCSS(elem, name, styles);
            if (val < 0 || val == null) {
                val = elem.style[name];
            }

            // Computed unit is not pixels. Stop here and return.
            if (rnumnonpx.test(val)) {
                return val;
            }

            // we need the check for style in case a browser which returns unreliable values
            // for getComputedStyle silently falls back to the reliable elem.style
            valueIsBorderBox = isBorderBox &&
                (support.boxSizingReliable() || val === elem.style[name]);

            // Normalize "", auto, and prepare for extra
            val = parseFloat(val) || 0;
        }

        // use the active box-sizing model to add/subtract irrelevant styles
        return (val +
            augmentWidthOrHeight(
                elem,
                name,
                extra || (isBorderBox ? "border" : "content"),
                valueIsBorderBox,
                styles
            )
        ) + "px";
    }

    jQuery.extend({

        // Add in style property hooks for overriding the default
        // behavior of getting and setting a style property
        cssHooks: {
            opacity: {
                get: function(elem, computed) {
                    if (computed) {

                        // We should always get a number back from opacity
                        var ret = curCSS(elem, "opacity");
                        return ret === "" ? "1" : ret;
                    }
                }
            }
        },

        // Don't automatically add "px" to these possibly-unitless properties
        cssNumber: {
            "animationIterationCount": true,
            "columnCount": true,
            "fillOpacity": true,
            "flexGrow": true,
            "flexShrink": true,
            "fontWeight": true,
            "lineHeight": true,
            "opacity": true,
            "order": true,
            "orphans": true,
            "widows": true,
            "zIndex": true,
            "zoom": true
        },

        // Add in properties whose names you wish to fix before
        // setting or getting the value
        cssProps: {

            // normalize float css property
            "float": support.cssFloat ? "cssFloat" : "styleFloat"
        },

        // Get and set the style property on a DOM Node
        style: function(elem, name, value, extra) {

            // Don't set styles on text and comment nodes
            if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
                return;
            }

            // Make sure that we're working with the right name
            var ret, type, hooks,
                origName = jQuery.camelCase(name),
                style = elem.style;

            name = jQuery.cssProps[origName] ||
                (jQuery.cssProps[origName] = vendorPropName(origName) || origName);

            // gets hook for the prefixed version
            // followed by the unprefixed version
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

            // Check if we're setting a value
            if (value !== undefined) {
                type = typeof value;

                // Convert "+=" or "-=" to relative numbers (#7345)
                if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
                    value = adjustCSS(elem, name, ret);

                    // Fixes bug #9237
                    type = "number";
                }

                // Make sure that null and NaN values aren't set. See: #7116
                if (value == null || value !== value) {
                    return;
                }

                // If a number was passed in, add the unit (except for certain CSS properties)
                if (type === "number") {
                    value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
                }

                // Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
                // but it would mean to define eight
                // (for every problematic property) identical functions
                if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
                    style[name] = "inherit";
                }

                // If a hook was provided, use that value, otherwise just set the specified value
                if (!hooks || !("set" in hooks) ||
                    (value = hooks.set(elem, value, extra)) !== undefined) {

                    // Support: IE
                    // Swallow errors from 'invalid' CSS values (#5509)
                    try {
                        style[name] = value;
                    } catch (e) {}
                }

            } else {

                // If a hook was provided get the non-computed value from there
                if (hooks && "get" in hooks &&
                    (ret = hooks.get(elem, false, extra)) !== undefined) {

                    return ret;
                }

                // Otherwise just get the value from the style object
                return style[name];
            }
        },

        css: function(elem, name, extra, styles) {
            var num, val, hooks,
                origName = jQuery.camelCase(name);

            // Make sure that we're working with the right name
            name = jQuery.cssProps[origName] ||
                (jQuery.cssProps[origName] = vendorPropName(origName) || origName);

            // gets hook for the prefixed version
            // followed by the unprefixed version
            hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];

            // If a hook was provided get the computed value from there
            if (hooks && "get" in hooks) {
                val = hooks.get(elem, true, extra);
            }

            // Otherwise, if a way to get the computed value exists, use that
            if (val === undefined) {
                val = curCSS(elem, name, styles);
            }

            //convert "normal" to computed value
            if (val === "normal" && name in cssNormalTransform) {
                val = cssNormalTransform[name];
            }

            // Return, converting to number if forced or a qualifier was provided and val looks numeric
            if (extra === "" || extra) {
                num = parseFloat(val);
                return extra === true || isFinite(num) ? num || 0 : val;
            }
            return val;
        }
    });

    jQuery.each(["height", "width"], function(i, name) {
        jQuery.cssHooks[name] = {
            get: function(elem, computed, extra) {
                if (computed) {

                    // certain elements can have dimension info if we invisibly show them
                    // however, it must have a current display style that would benefit from this
                    return rdisplayswap.test(jQuery.css(elem, "display")) &&
                        elem.offsetWidth === 0 ?
                        swap(elem, cssShow, function() {
                            return getWidthOrHeight(elem, name, extra);
                        }) :
                        getWidthOrHeight(elem, name, extra);
                }
            },

            set: function(elem, value, extra) {
                var styles = extra && getStyles(elem);
                return setPositiveNumber(elem, value, extra ?
                    augmentWidthOrHeight(
                        elem,
                        name,
                        extra,
                        support.boxSizing &&
                        jQuery.css(elem, "boxSizing", false, styles) === "border-box",
                        styles
                    ) : 0
                );
            }
        };
    });

    if (!support.opacity) {
        jQuery.cssHooks.opacity = {
            get: function(elem, computed) {

                // IE uses filters for opacity
                return ropacity.test((computed && elem.currentStyle ?
                        elem.currentStyle.filter :
                        elem.style.filter) || "") ?
                    (0.01 * parseFloat(RegExp.$1)) + "" :
                    computed ? "1" : "";
            },

            set: function(elem, value) {
                var style = elem.style,
                    currentStyle = elem.currentStyle,
                    opacity = jQuery.isNumeric(value) ? "alpha(opacity=" + value * 100 + ")" : "",
                    filter = currentStyle && currentStyle.filter || style.filter || "";

                // IE has trouble with opacity if it does not have layout
                // Force it by setting the zoom level
                style.zoom = 1;

                // if setting opacity to 1, and no other filters exist -
                // attempt to remove filter attribute #6652
                // if value === "", then remove inline opacity #12685
                if ((value >= 1 || value === "") &&
                    jQuery.trim(filter.replace(ralpha, "")) === "" &&
                    style.removeAttribute) {

                    // Setting style.filter to null, "" & " " still leave "filter:" in the cssText
                    // if "filter:" is present at all, clearType is disabled, we want to avoid this
                    // style.removeAttribute is IE Only, but so apparently is this code path...
                    style.removeAttribute("filter");

                    // if there is no filter style applied in a css rule
                    // or unset inline opacity, we are done
                    if (value === "" || currentStyle && !currentStyle.filter) {
                        return;
                    }
                }

                // otherwise, set new filter values
                style.filter = ralpha.test(filter) ?
                    filter.replace(ralpha, opacity) :
                    filter + " " + opacity;
            }
        };
    }

    jQuery.cssHooks.marginRight = addGetHookIf(support.reliableMarginRight,
        function(elem, computed) {
            if (computed) {
                return swap(elem, {
                        "display": "inline-block"
                    },
                    curCSS, [elem, "marginRight"]);
            }
        }
    );

    jQuery.cssHooks.marginLeft = addGetHookIf(support.reliableMarginLeft,
        function(elem, computed) {
            if (computed) {
                return (
                    parseFloat(curCSS(elem, "marginLeft")) ||

                    // Support: IE<=11+
                    // Running getBoundingClientRect on a disconnected node in IE throws an error
                    // Support: IE8 only
                    // getClientRects() errors on disconnected elems
                    (jQuery.contains(elem.ownerDocument, elem) ?
                        elem.getBoundingClientRect().left -
                        swap(elem, {
                            marginLeft: 0
                        }, function() {
                            return elem.getBoundingClientRect().left;
                        }) :
                        0
                    )
                ) + "px";
            }
        }
    );

    // These hooks are used by animate to expand properties
    jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
            expand: function(value) {
                var i = 0,
                    expanded = {},

                    // assumes a single number if not a string
                    parts = typeof value === "string" ? value.split(" ") : [value];

                for (; i < 4; i++) {
                    expanded[prefix + cssExpand[i] + suffix] =
                        parts[i] || parts[i - 2] || parts[0];
                }

                return expanded;
            }
        };

        if (!rmargin.test(prefix)) {
            jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
        }
    });

    jQuery.fn.extend({
        css: function(name, value) {
            return access(this, function(elem, name, value) {
                var styles, len,
                    map = {},
                    i = 0;

                if (jQuery.isArray(name)) {
                    styles = getStyles(elem);
                    len = name.length;

                    for (; i < len; i++) {
                        map[name[i]] = jQuery.css(elem, name[i], false, styles);
                    }

                    return map;
                }

                return value !== undefined ?
                    jQuery.style(elem, name, value) :
                    jQuery.css(elem, name);
            }, name, value, arguments.length > 1);
        },
        show: function() {
            return showHide(this, true);
        },
        hide: function() {
            return showHide(this);
        },
        toggle: function(state) {
            if (typeof state === "boolean") {
                return state ? this.show() : this.hide();
            }

            return this.each(function() {
                if (isHidden(this)) {
                    jQuery(this).show();
                } else {
                    jQuery(this).hide();
                }
            });
        }
    });


    function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
    }
    jQuery.Tween = Tween;

    Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
            this.elem = elem;
            this.prop = prop;
            this.easing = easing || jQuery.easing._default;
            this.options = options;
            this.start = this.now = this.cur();
            this.end = end;
            this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
        },
        cur: function() {
            var hooks = Tween.propHooks[this.prop];

            return hooks && hooks.get ?
                hooks.get(this) :
                Tween.propHooks._default.get(this);
        },
        run: function(percent) {
            var eased,
                hooks = Tween.propHooks[this.prop];

            if (this.options.duration) {
                this.pos = eased = jQuery.easing[this.easing](
                    percent, this.options.duration * percent, 0, 1, this.options.duration
                );
            } else {
                this.pos = eased = percent;
            }
            this.now = (this.end - this.start) * eased + this.start;

            if (this.options.step) {
                this.options.step.call(this.elem, this.now, this);
            }

            if (hooks && hooks.set) {
                hooks.set(this);
            } else {
                Tween.propHooks._default.set(this);
            }
            return this;
        }
    };

    Tween.prototype.init.prototype = Tween.prototype;

    Tween.propHooks = {
        _default: {
            get: function(tween) {
                var result;

                // Use a property on the element directly when it is not a DOM element,
                // or when there is no matching style property that exists.
                if (tween.elem.nodeType !== 1 ||
                    tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
                    return tween.elem[tween.prop];
                }

                // passing an empty string as a 3rd parameter to .css will automatically
                // attempt a parseFloat and fallback to a string if the parse fails
                // so, simple values such as "10px" are parsed to Float.
                // complex values such as "rotate(1rad)" are returned as is.
                result = jQuery.css(tween.elem, tween.prop, "");

                // Empty strings, null, undefined and "auto" are converted to 0.
                return !result || result === "auto" ? 0 : result;
            },
            set: function(tween) {

                // use step hook for back compat - use cssHook if its there - use .style if its
                // available and use plain properties where available
                if (jQuery.fx.step[tween.prop]) {
                    jQuery.fx.step[tween.prop](tween);
                } else if (tween.elem.nodeType === 1 &&
                    (tween.elem.style[jQuery.cssProps[tween.prop]] != null ||
                        jQuery.cssHooks[tween.prop])) {
                    jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
                } else {
                    tween.elem[tween.prop] = tween.now;
                }
            }
        }
    };

    // Support: IE <=9
    // Panic based approach to setting things on disconnected nodes

    Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
            if (tween.elem.nodeType && tween.elem.parentNode) {
                tween.elem[tween.prop] = tween.now;
            }
        }
    };

    jQuery.easing = {
        linear: function(p) {
            return p;
        },
        swing: function(p) {
            return 0.5 - Math.cos(p * Math.PI) / 2;
        },
        _default: "swing"
    };

    jQuery.fx = Tween.prototype.init;

    // Back Compat <1.8 extension point
    jQuery.fx.step = {};




    var
        fxNow, timerId,
        rfxtypes = /^(?:toggle|show|hide)$/,
        rrun = /queueHooks$/;

    // Animations created synchronously will run synchronously
    function createFxNow() {
        window.setTimeout(function() {
            fxNow = undefined;
        });
        return (fxNow = jQuery.now());
    }

    // Generate parameters to create a standard animation
    function genFx(type, includeWidth) {
        var which,
            attrs = {
                height: type
            },
            i = 0;

        // if we include width, step value is 1 to do all cssExpand values,
        // if we don't include width, step value is 2 to skip over Left and Right
        includeWidth = includeWidth ? 1 : 0;
        for (; i < 4; i += 2 - includeWidth) {
            which = cssExpand[i];
            attrs["margin" + which] = attrs["padding" + which] = type;
        }

        if (includeWidth) {
            attrs.opacity = attrs.width = type;
        }

        return attrs;
    }

    function createTween(value, prop, animation) {
        var tween,
            collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]),
            index = 0,
            length = collection.length;
        for (; index < length; index++) {
            if ((tween = collection[index].call(animation, prop, value))) {

                // we're done with this property
                return tween;
            }
        }
    }

    function defaultPrefilter(elem, props, opts) {
        /* jshint validthis: true */
        var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
            anim = this,
            orig = {},
            style = elem.style,
            hidden = elem.nodeType && isHidden(elem),
            dataShow = jQuery._data(elem, "fxshow");

        // handle queue: false promises
        if (!opts.queue) {
            hooks = jQuery._queueHooks(elem, "fx");
            if (hooks.unqueued == null) {
                hooks.unqueued = 0;
                oldfire = hooks.empty.fire;
                hooks.empty.fire = function() {
                    if (!hooks.unqueued) {
                        oldfire();
                    }
                };
            }
            hooks.unqueued++;

            anim.always(function() {

                // doing this makes sure that the complete handler will be called
                // before this completes
                anim.always(function() {
                    hooks.unqueued--;
                    if (!jQuery.queue(elem, "fx").length) {
                        hooks.empty.fire();
                    }
                });
            });
        }

        // height/width overflow pass
        if (elem.nodeType === 1 && ("height" in props || "width" in props)) {

            // Make sure that nothing sneaks out
            // Record all 3 overflow attributes because IE does not
            // change the overflow attribute when overflowX and
            // overflowY are set to the same value
            opts.overflow = [style.overflow, style.overflowX, style.overflowY];

            // Set display property to inline-block for height/width
            // animations on inline elements that are having width/height animated
            display = jQuery.css(elem, "display");

            // Test default display if display is currently "none"
            checkDisplay = display === "none" ?
                jQuery._data(elem, "olddisplay") || defaultDisplay(elem.nodeName) : display;

            if (checkDisplay === "inline" && jQuery.css(elem, "float") === "none") {

                // inline-level elements accept inline-block;
                // block-level elements need to be inline with layout
                if (!support.inlineBlockNeedsLayout || defaultDisplay(elem.nodeName) === "inline") {
                    style.display = "inline-block";
                } else {
                    style.zoom = 1;
                }
            }
        }

        if (opts.overflow) {
            style.overflow = "hidden";
            if (!support.shrinkWrapBlocks()) {
                anim.always(function() {
                    style.overflow = opts.overflow[0];
                    style.overflowX = opts.overflow[1];
                    style.overflowY = opts.overflow[2];
                });
            }
        }

        // show/hide pass
        for (prop in props) {
            value = props[prop];
            if (rfxtypes.exec(value)) {
                delete props[prop];
                toggle = toggle || value === "toggle";
                if (value === (hidden ? "hide" : "show")) {

                    // If there is dataShow left over from a stopped hide or show
                    // and we are going to proceed with show, we should pretend to be hidden
                    if (value === "show" && dataShow && dataShow[prop] !== undefined) {
                        hidden = true;
                    } else {
                        continue;
                    }
                }
                orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);

                // Any non-fx value stops us from restoring the original display value
            } else {
                display = undefined;
            }
        }

        if (!jQuery.isEmptyObject(orig)) {
            if (dataShow) {
                if ("hidden" in dataShow) {
                    hidden = dataShow.hidden;
                }
            } else {
                dataShow = jQuery._data(elem, "fxshow", {});
            }

            // store state if its toggle - enables .stop().toggle() to "reverse"
            if (toggle) {
                dataShow.hidden = !hidden;
            }
            if (hidden) {
                jQuery(elem).show();
            } else {
                anim.done(function() {
                    jQuery(elem).hide();
                });
            }
            anim.done(function() {
                var prop;
                jQuery._removeData(elem, "fxshow");
                for (prop in orig) {
                    jQuery.style(elem, prop, orig[prop]);
                }
            });
            for (prop in orig) {
                tween = createTween(hidden ? dataShow[prop] : 0, prop, anim);

                if (!(prop in dataShow)) {
                    dataShow[prop] = tween.start;
                    if (hidden) {
                        tween.end = tween.start;
                        tween.start = prop === "width" || prop === "height" ? 1 : 0;
                    }
                }
            }

            // If this is a noop like .hide().hide(), restore an overwritten display value
        } else if ((display === "none" ? defaultDisplay(elem.nodeName) : display) === "inline") {
            style.display = display;
        }
    }

    function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;

        // camelCase, specialEasing and expand cssHook pass
        for (index in props) {
            name = jQuery.camelCase(index);
            easing = specialEasing[name];
            value = props[index];
            if (jQuery.isArray(value)) {
                easing = value[1];
                value = props[index] = value[0];
            }

            if (index !== name) {
                props[name] = value;
                delete props[index];
            }

            hooks = jQuery.cssHooks[name];
            if (hooks && "expand" in hooks) {
                value = hooks.expand(value);
                delete props[name];

                // not quite $.extend, this wont overwrite keys already present.
                // also - reusing 'index' from above because we have the correct "name"
                for (index in value) {
                    if (!(index in props)) {
                        props[index] = value[index];
                        specialEasing[index] = easing;
                    }
                }
            } else {
                specialEasing[name] = easing;
            }
        }
    }

    function Animation(elem, properties, options) {
        var result,
            stopped,
            index = 0,
            length = Animation.prefilters.length,
            deferred = jQuery.Deferred().always(function() {

                // don't match elem in the :animated selector
                delete tick.elem;
            }),
            tick = function() {
                if (stopped) {
                    return false;
                }
                var currentTime = fxNow || createFxNow(),
                    remaining = Math.max(0, animation.startTime + animation.duration - currentTime),

                    // Support: Android 2.3
                    // Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
                    temp = remaining / animation.duration || 0,
                    percent = 1 - temp,
                    index = 0,
                    length = animation.tweens.length;

                for (; index < length; index++) {
                    animation.tweens[index].run(percent);
                }

                deferred.notifyWith(elem, [animation, percent, remaining]);

                if (percent < 1 && length) {
                    return remaining;
                } else {
                    deferred.resolveWith(elem, [animation]);
                    return false;
                }
            },
            animation = deferred.promise({
                elem: elem,
                props: jQuery.extend({}, properties),
                opts: jQuery.extend(true, {
                    specialEasing: {},
                    easing: jQuery.easing._default
                }, options),
                originalProperties: properties,
                originalOptions: options,
                startTime: fxNow || createFxNow(),
                duration: options.duration,
                tweens: [],
                createTween: function(prop, end) {
                    var tween = jQuery.Tween(elem, animation.opts, prop, end,
                        animation.opts.specialEasing[prop] || animation.opts.easing);
                    animation.tweens.push(tween);
                    return tween;
                },
                stop: function(gotoEnd) {
                    var index = 0,

                        // if we are going to the end, we want to run all the tweens
                        // otherwise we skip this part
                        length = gotoEnd ? animation.tweens.length : 0;
                    if (stopped) {
                        return this;
                    }
                    stopped = true;
                    for (; index < length; index++) {
                        animation.tweens[index].run(1);
                    }

                    // resolve when we played the last frame
                    // otherwise, reject
                    if (gotoEnd) {
                        deferred.notifyWith(elem, [animation, 1, 0]);
                        deferred.resolveWith(elem, [animation, gotoEnd]);
                    } else {
                        deferred.rejectWith(elem, [animation, gotoEnd]);
                    }
                    return this;
                }
            }),
            props = animation.props;

        propFilter(props, animation.opts.specialEasing);

        for (; index < length; index++) {
            result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
            if (result) {
                if (jQuery.isFunction(result.stop)) {
                    jQuery._queueHooks(animation.elem, animation.opts.queue).stop =
                        jQuery.proxy(result.stop, result);
                }
                return result;
            }
        }

        jQuery.map(props, createTween, animation);

        if (jQuery.isFunction(animation.opts.start)) {
            animation.opts.start.call(elem, animation);
        }

        jQuery.fx.timer(
            jQuery.extend(tick, {
                elem: elem,
                anim: animation,
                queue: animation.opts.queue
            })
        );

        // attach callbacks from options
        return animation.progress(animation.opts.progress)
            .done(animation.opts.done, animation.opts.complete)
            .fail(animation.opts.fail)
            .always(animation.opts.always);
    }

    jQuery.Animation = jQuery.extend(Animation, {

        tweeners: {
            "*": [function(prop, value) {
                var tween = this.createTween(prop, value);
                adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
                return tween;
            }]
        },

        tweener: function(props, callback) {
            if (jQuery.isFunction(props)) {
                callback = props;
                props = ["*"];
            } else {
                props = props.match(rnotwhite);
            }

            var prop,
                index = 0,
                length = props.length;

            for (; index < length; index++) {
                prop = props[index];
                Animation.tweeners[prop] = Animation.tweeners[prop] || [];
                Animation.tweeners[prop].unshift(callback);
            }
        },

        prefilters: [defaultPrefilter],

        prefilter: function(callback, prepend) {
            if (prepend) {
                Animation.prefilters.unshift(callback);
            } else {
                Animation.prefilters.push(callback);
            }
        }
    });

    jQuery.speed = function(speed, easing, fn) {
        var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
            complete: fn || !fn && easing ||
                jQuery.isFunction(speed) && speed,
            duration: speed,
            easing: fn && easing || easing && !jQuery.isFunction(easing) && easing
        };

        opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
            opt.duration in jQuery.fx.speeds ?
            jQuery.fx.speeds[opt.duration] : jQuery.fx.speeds._default;

        // normalize opt.queue - true/undefined/null -> "fx"
        if (opt.queue == null || opt.queue === true) {
            opt.queue = "fx";
        }

        // Queueing
        opt.old = opt.complete;

        opt.complete = function() {
            if (jQuery.isFunction(opt.old)) {
                opt.old.call(this);
            }

            if (opt.queue) {
                jQuery.dequeue(this, opt.queue);
            }
        };

        return opt;
    };

    jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {

            // show any hidden elements after setting opacity to 0
            return this.filter(isHidden).css("opacity", 0).show()

                // animate to the value specified
                .end().animate({
                    opacity: to
                }, speed, easing, callback);
        },
        animate: function(prop, speed, easing, callback) {
            var empty = jQuery.isEmptyObject(prop),
                optall = jQuery.speed(speed, easing, callback),
                doAnimation = function() {

                    // Operate on a copy of prop so per-property easing won't be lost
                    var anim = Animation(this, jQuery.extend({}, prop), optall);

                    // Empty animations, or finishing resolves immediately
                    if (empty || jQuery._data(this, "finish")) {
                        anim.stop(true);
                    }
                };
            doAnimation.finish = doAnimation;

            return empty || optall.queue === false ?
                this.each(doAnimation) :
                this.queue(optall.queue, doAnimation);
        },
        stop: function(type, clearQueue, gotoEnd) {
            var stopQueue = function(hooks) {
                var stop = hooks.stop;
                delete hooks.stop;
                stop(gotoEnd);
            };

            if (typeof type !== "string") {
                gotoEnd = clearQueue;
                clearQueue = type;
                type = undefined;
            }
            if (clearQueue && type !== false) {
                this.queue(type || "fx", []);
            }

            return this.each(function() {
                var dequeue = true,
                    index = type != null && type + "queueHooks",
                    timers = jQuery.timers,
                    data = jQuery._data(this);

                if (index) {
                    if (data[index] && data[index].stop) {
                        stopQueue(data[index]);
                    }
                } else {
                    for (index in data) {
                        if (data[index] && data[index].stop && rrun.test(index)) {
                            stopQueue(data[index]);
                        }
                    }
                }

                for (index = timers.length; index--;) {
                    if (timers[index].elem === this &&
                        (type == null || timers[index].queue === type)) {

                        timers[index].anim.stop(gotoEnd);
                        dequeue = false;
                        timers.splice(index, 1);
                    }
                }

                // start the next in the queue if the last step wasn't forced
                // timers currently will call their complete callbacks, which will dequeue
                // but only if they were gotoEnd
                if (dequeue || !gotoEnd) {
                    jQuery.dequeue(this, type);
                }
            });
        },
        finish: function(type) {
            if (type !== false) {
                type = type || "fx";
            }
            return this.each(function() {
                var index,
                    data = jQuery._data(this),
                    queue = data[type + "queue"],
                    hooks = data[type + "queueHooks"],
                    timers = jQuery.timers,
                    length = queue ? queue.length : 0;

                // enable finishing flag on private data
                data.finish = true;

                // empty the queue first
                jQuery.queue(this, type, []);

                if (hooks && hooks.stop) {
                    hooks.stop.call(this, true);
                }

                // look for any active animations, and finish them
                for (index = timers.length; index--;) {
                    if (timers[index].elem === this && timers[index].queue === type) {
                        timers[index].anim.stop(true);
                        timers.splice(index, 1);
                    }
                }

                // look for any animations in the old queue and finish them
                for (index = 0; index < length; index++) {
                    if (queue[index] && queue[index].finish) {
                        queue[index].finish.call(this);
                    }
                }

                // turn off finishing flag
                delete data.finish;
            });
        }
    });

    jQuery.each(["toggle", "show", "hide"], function(i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
            return speed == null || typeof speed === "boolean" ?
                cssFn.apply(this, arguments) :
                this.animate(genFx(name, true), speed, easing, callback);
        };
    });

    // Generate shortcuts for custom animations
    jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
            return this.animate(props, speed, easing, callback);
        };
    });

    jQuery.timers = [];
    jQuery.fx.tick = function() {
        var timer,
            timers = jQuery.timers,
            i = 0;

        fxNow = jQuery.now();

        for (; i < timers.length; i++) {
            timer = timers[i];

            // Checks the timer has not already been removed
            if (!timer() && timers[i] === timer) {
                timers.splice(i--, 1);
            }
        }

        if (!timers.length) {
            jQuery.fx.stop();
        }
        fxNow = undefined;
    };

    jQuery.fx.timer = function(timer) {
        jQuery.timers.push(timer);
        if (timer()) {
            jQuery.fx.start();
        } else {
            jQuery.timers.pop();
        }
    };

    jQuery.fx.interval = 13;

    jQuery.fx.start = function() {
        if (!timerId) {
            timerId = window.setInterval(jQuery.fx.tick, jQuery.fx.interval);
        }
    };

    jQuery.fx.stop = function() {
        window.clearInterval(timerId);
        timerId = null;
    };

    jQuery.fx.speeds = {
        slow: 600,
        fast: 200,

        // Default speed
        _default: 400
    };


    // Based off of the plugin by Clint Helfers, with permission.
    // http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
    jQuery.fn.delay = function(time, type) {
        time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
        type = type || "fx";

        return this.queue(type, function(next, hooks) {
            var timeout = window.setTimeout(next, time);
            hooks.stop = function() {
                window.clearTimeout(timeout);
            };
        });
    };


    (function() {
        var a,
            input = document.createElement("input"),
            div = document.createElement("div"),
            select = document.createElement("select"),
            opt = select.appendChild(document.createElement("option"));

        // Setup
        div = document.createElement("div");
        div.setAttribute("className", "t");
        div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
        a = div.getElementsByTagName("a")[0];

        // Support: Windows Web Apps (WWA)
        // `type` must use .setAttribute for WWA (#14901)
        input.setAttribute("type", "checkbox");
        div.appendChild(input);

        a = div.getElementsByTagName("a")[0];

        // First batch of tests.
        a.style.cssText = "top:1px";

        // Test setAttribute on camelCase class.
        // If it works, we need attrFixes when doing get/setAttribute (ie6/7)
        support.getSetAttribute = div.className !== "t";

        // Get the style information from getAttribute
        // (IE uses .cssText instead)
        support.style = /top/.test(a.getAttribute("style"));

        // Make sure that URLs aren't manipulated
        // (IE normalizes it by default)
        support.hrefNormalized = a.getAttribute("href") === "/a";

        // Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
        support.checkOn = !!input.value;

        // Make sure that a selected-by-default option has a working selected property.
        // (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
        support.optSelected = opt.selected;

        // Tests for enctype support on a form (#6743)
        support.enctype = !!document.createElement("form").enctype;

        // Make sure that the options inside disabled selects aren't marked as disabled
        // (WebKit marks them as disabled)
        select.disabled = true;
        support.optDisabled = !opt.disabled;

        // Support: IE8 only
        // Check if we can trust getAttribute("value")
        input = document.createElement("input");
        input.setAttribute("value", "");
        support.input = input.getAttribute("value") === "";

        // Check if an input maintains its value after becoming a radio
        input.value = "t";
        input.setAttribute("type", "radio");
        support.radioValue = input.value === "t";
    })();


    var rreturn = /\r/g,
        rspaces = /[\x20\t\r\n\f]+/g;

    jQuery.fn.extend({
        val: function(value) {
            var hooks, ret, isFunction,
                elem = this[0];

            if (!arguments.length) {
                if (elem) {
                    hooks = jQuery.valHooks[elem.type] ||
                        jQuery.valHooks[elem.nodeName.toLowerCase()];

                    if (
                        hooks &&
                        "get" in hooks &&
                        (ret = hooks.get(elem, "value")) !== undefined
                    ) {
                        return ret;
                    }

                    ret = elem.value;

                    return typeof ret === "string" ?

                        // handle most common string cases
                        ret.replace(rreturn, "") :

                        // handle cases where value is null/undef or number
                        ret == null ? "" : ret;
                }

                return;
            }

            isFunction = jQuery.isFunction(value);

            return this.each(function(i) {
                var val;

                if (this.nodeType !== 1) {
                    return;
                }

                if (isFunction) {
                    val = value.call(this, i, jQuery(this).val());
                } else {
                    val = value;
                }

                // Treat null/undefined as ""; convert numbers to string
                if (val == null) {
                    val = "";
                } else if (typeof val === "number") {
                    val += "";
                } else if (jQuery.isArray(val)) {
                    val = jQuery.map(val, function(value) {
                        return value == null ? "" : value + "";
                    });
                }

                hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];

                // If set returns undefined, fall back to normal setting
                if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === undefined) {
                    this.value = val;
                }
            });
        }
    });

    jQuery.extend({
        valHooks: {
            option: {
                get: function(elem) {
                    var val = jQuery.find.attr(elem, "value");
                    return val != null ?
                        val :

                        // Support: IE10-11+
                        // option.text throws exceptions (#14686, #14858)
                        // Strip and collapse whitespace
                        // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
                        jQuery.trim(jQuery.text(elem)).replace(rspaces, " ");
                }
            },
            select: {
                get: function(elem) {
                    var value, option,
                        options = elem.options,
                        index = elem.selectedIndex,
                        one = elem.type === "select-one" || index < 0,
                        values = one ? null : [],
                        max = one ? index + 1 : options.length,
                        i = index < 0 ?
                        max :
                        one ? index : 0;

                    // Loop through all the selected options
                    for (; i < max; i++) {
                        option = options[i];

                        // oldIE doesn't update selected after form reset (#2551)
                        if ((option.selected || i === index) &&

                            // Don't return options that are disabled or in a disabled optgroup
                            (support.optDisabled ?
                                !option.disabled :
                                option.getAttribute("disabled") === null) &&
                            (!option.parentNode.disabled ||
                                !jQuery.nodeName(option.parentNode, "optgroup"))) {

                            // Get the specific value for the option
                            value = jQuery(option).val();

                            // We don't need an array for one selects
                            if (one) {
                                return value;
                            }

                            // Multi-Selects return an array
                            values.push(value);
                        }
                    }

                    return values;
                },

                set: function(elem, value) {
                    var optionSet, option,
                        options = elem.options,
                        values = jQuery.makeArray(value),
                        i = options.length;

                    while (i--) {
                        option = options[i];

                        if (jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {

                            // Support: IE6
                            // When new option element is added to select box we need to
                            // force reflow of newly added node in order to workaround delay
                            // of initialization properties
                            try {
                                option.selected = optionSet = true;

                            } catch (_) {

                                // Will be executed only in IE6
                                option.scrollHeight;
                            }

                        } else {
                            option.selected = false;
                        }
                    }

                    // Force browsers to behave consistently when non-matching value is set
                    if (!optionSet) {
                        elem.selectedIndex = -1;
                    }

                    return options;
                }
            }
        }
    });

    // Radios and checkboxes getter/setter
    jQuery.each(["radio", "checkbox"], function() {
        jQuery.valHooks[this] = {
            set: function(elem, value) {
                if (jQuery.isArray(value)) {
                    return (elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1);
                }
            }
        };
        if (!support.checkOn) {
            jQuery.valHooks[this].get = function(elem) {
                return elem.getAttribute("value") === null ? "on" : elem.value;
            };
        }
    });




    var nodeHook, boolHook,
        attrHandle = jQuery.expr.attrHandle,
        ruseDefault = /^(?:checked|selected)$/i,
        getSetAttribute = support.getSetAttribute,
        getSetInput = support.input;

    jQuery.fn.extend({
        attr: function(name, value) {
            return access(this, jQuery.attr, name, value, arguments.length > 1);
        },

        removeAttr: function(name) {
            return this.each(function() {
                jQuery.removeAttr(this, name);
            });
        }
    });

    jQuery.extend({
        attr: function(elem, name, value) {
            var ret, hooks,
                nType = elem.nodeType;

            // Don't get/set attributes on text, comment and attribute nodes
            if (nType === 3 || nType === 8 || nType === 2) {
                return;
            }

            // Fallback to prop when attributes are not supported
            if (typeof elem.getAttribute === "undefined") {
                return jQuery.prop(elem, name, value);
            }

            // All attributes are lowercase
            // Grab necessary hook if one is defined
            if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
                name = name.toLowerCase();
                hooks = jQuery.attrHooks[name] ||
                    (jQuery.expr.match.bool.test(name) ? boolHook : nodeHook);
            }

            if (value !== undefined) {
                if (value === null) {
                    jQuery.removeAttr(elem, name);
                    return;
                }

                if (hooks && "set" in hooks &&
                    (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret;
                }

                elem.setAttribute(name, value + "");
                return value;
            }

            if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                return ret;
            }

            ret = jQuery.find.attr(elem, name);

            // Non-existent attributes return null, we normalize to undefined
            return ret == null ? undefined : ret;
        },

        attrHooks: {
            type: {
                set: function(elem, value) {
                    if (!support.radioValue && value === "radio" &&
                        jQuery.nodeName(elem, "input")) {

                        // Setting the type on a radio button after the value resets the value in IE8-9
                        // Reset value to default in case type is set after value during creation
                        var val = elem.value;
                        elem.setAttribute("type", value);
                        if (val) {
                            elem.value = val;
                        }
                        return value;
                    }
                }
            }
        },

        removeAttr: function(elem, value) {
            var name, propName,
                i = 0,
                attrNames = value && value.match(rnotwhite);

            if (attrNames && elem.nodeType === 1) {
                while ((name = attrNames[i++])) {
                    propName = jQuery.propFix[name] || name;

                    // Boolean attributes get special treatment (#10870)
                    if (jQuery.expr.match.bool.test(name)) {

                        // Set corresponding property to false
                        if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
                            elem[propName] = false;

                            // Support: IE<9
                            // Also clear defaultChecked/defaultSelected (if appropriate)
                        } else {
                            elem[jQuery.camelCase("default-" + name)] =
                                elem[propName] = false;
                        }

                        // See #9699 for explanation of this approach (setting first, then removal)
                    } else {
                        jQuery.attr(elem, name, "");
                    }

                    elem.removeAttribute(getSetAttribute ? name : propName);
                }
            }
        }
    });

    // Hooks for boolean attributes
    boolHook = {
        set: function(elem, value, name) {
            if (value === false) {

                // Remove boolean attributes when set to false
                jQuery.removeAttr(elem, name);
            } else if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {

                // IE<8 needs the *property* name
                elem.setAttribute(!getSetAttribute && jQuery.propFix[name] || name, name);

            } else {

                // Support: IE<9
                // Use defaultChecked and defaultSelected for oldIE
                elem[jQuery.camelCase("default-" + name)] = elem[name] = true;
            }
            return name;
        }
    };

    jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(i, name) {
        var getter = attrHandle[name] || jQuery.find.attr;

        if (getSetInput && getSetAttribute || !ruseDefault.test(name)) {
            attrHandle[name] = function(elem, name, isXML) {
                var ret, handle;
                if (!isXML) {

                    // Avoid an infinite loop by temporarily removing this function from the getter
                    handle = attrHandle[name];
                    attrHandle[name] = ret;
                    ret = getter(elem, name, isXML) != null ?
                        name.toLowerCase() :
                        null;
                    attrHandle[name] = handle;
                }
                return ret;
            };
        } else {
            attrHandle[name] = function(elem, name, isXML) {
                if (!isXML) {
                    return elem[jQuery.camelCase("default-" + name)] ?
                        name.toLowerCase() :
                        null;
                }
            };
        }
    });

    // fix oldIE attroperties
    if (!getSetInput || !getSetAttribute) {
        jQuery.attrHooks.value = {
            set: function(elem, value, name) {
                if (jQuery.nodeName(elem, "input")) {

                    // Does not return so that setAttribute is also used
                    elem.defaultValue = value;
                } else {

                    // Use nodeHook if defined (#1954); otherwise setAttribute is fine
                    return nodeHook && nodeHook.set(elem, value, name);
                }
            }
        };
    }

    // IE6/7 do not support getting/setting some attributes with get/setAttribute
    if (!getSetAttribute) {

        // Use this for any attribute in IE6/7
        // This fixes almost every IE6/7 issue
        nodeHook = {
            set: function(elem, value, name) {

                // Set the existing or create a new attribute node
                var ret = elem.getAttributeNode(name);
                if (!ret) {
                    elem.setAttributeNode(
                        (ret = elem.ownerDocument.createAttribute(name))
                    );
                }

                ret.value = value += "";

                // Break association with cloned elements by also using setAttribute (#9646)
                if (name === "value" || value === elem.getAttribute(name)) {
                    return value;
                }
            }
        };

        // Some attributes are constructed with empty-string values when not defined
        attrHandle.id = attrHandle.name = attrHandle.coords =
            function(elem, name, isXML) {
                var ret;
                if (!isXML) {
                    return (ret = elem.getAttributeNode(name)) && ret.value !== "" ?
                        ret.value :
                        null;
                }
            };

        // Fixing value retrieval on a button requires this module
        jQuery.valHooks.button = {
            get: function(elem, name) {
                var ret = elem.getAttributeNode(name);
                if (ret && ret.specified) {
                    return ret.value;
                }
            },
            set: nodeHook.set
        };

        // Set contenteditable to false on removals(#10429)
        // Setting to empty string throws an error as an invalid value
        jQuery.attrHooks.contenteditable = {
            set: function(elem, value, name) {
                nodeHook.set(elem, value === "" ? false : value, name);
            }
        };

        // Set width and height to auto instead of 0 on empty string( Bug #8150 )
        // This is for removals
        jQuery.each(["width", "height"], function(i, name) {
            jQuery.attrHooks[name] = {
                set: function(elem, value) {
                    if (value === "") {
                        elem.setAttribute(name, "auto");
                        return value;
                    }
                }
            };
        });
    }

    if (!support.style) {
        jQuery.attrHooks.style = {
            get: function(elem) {

                // Return undefined in the case of empty string
                // Note: IE uppercases css property names, but if we were to .toLowerCase()
                // .cssText, that would destroy case sensitivity in URL's, like in "background"
                return elem.style.cssText || undefined;
            },
            set: function(elem, value) {
                return (elem.style.cssText = value + "");
            }
        };
    }




    var rfocusable = /^(?:input|select|textarea|button|object)$/i,
        rclickable = /^(?:a|area)$/i;

    jQuery.fn.extend({
        prop: function(name, value) {
            return access(this, jQuery.prop, name, value, arguments.length > 1);
        },

        removeProp: function(name) {
            name = jQuery.propFix[name] || name;
            return this.each(function() {

                // try/catch handles cases where IE balks (such as removing a property on window)
                try {
                    this[name] = undefined;
                    delete this[name];
                } catch (e) {}
            });
        }
    });

    jQuery.extend({
        prop: function(elem, name, value) {
            var ret, hooks,
                nType = elem.nodeType;

            // Don't get/set properties on text, comment and attribute nodes
            if (nType === 3 || nType === 8 || nType === 2) {
                return;
            }

            if (nType !== 1 || !jQuery.isXMLDoc(elem)) {

                // Fix name and attach hooks
                name = jQuery.propFix[name] || name;
                hooks = jQuery.propHooks[name];
            }

            if (value !== undefined) {
                if (hooks && "set" in hooks &&
                    (ret = hooks.set(elem, value, name)) !== undefined) {
                    return ret;
                }

                return (elem[name] = value);
            }

            if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
                return ret;
            }

            return elem[name];
        },

        propHooks: {
            tabIndex: {
                get: function(elem) {

                    // elem.tabIndex doesn't always return the
                    // correct value when it hasn't been explicitly set
                    // http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
                    // Use proper attribute retrieval(#12072)
                    var tabindex = jQuery.find.attr(elem, "tabindex");

                    return tabindex ?
                        parseInt(tabindex, 10) :
                        rfocusable.test(elem.nodeName) ||
                        rclickable.test(elem.nodeName) && elem.href ?
                        0 :
                        -1;
                }
            }
        },

        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    });

    // Some attributes require a special call on IE
    // http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
    if (!support.hrefNormalized) {

        // href/src property should get the full normalized URL (#10299/#12915)
        jQuery.each(["href", "src"], function(i, name) {
            jQuery.propHooks[name] = {
                get: function(elem) {
                    return elem.getAttribute(name, 4);
                }
            };
        });
    }

    // Support: Safari, IE9+
    // Accessing the selectedIndex property
    // forces the browser to respect setting selected
    // on the option
    // The getter ensures a default option is selected
    // when in an optgroup
    if (!support.optSelected) {
        jQuery.propHooks.selected = {
            get: function(elem) {
                var parent = elem.parentNode;

                if (parent) {
                    parent.selectedIndex;

                    // Make sure that it also works with optgroups, see #5701
                    if (parent.parentNode) {
                        parent.parentNode.selectedIndex;
                    }
                }
                return null;
            },
            set: function(elem) {
                var parent = elem.parentNode;
                if (parent) {
                    parent.selectedIndex;

                    if (parent.parentNode) {
                        parent.parentNode.selectedIndex;
                    }
                }
            }
        };
    }

    jQuery.each([
        "tabIndex",
        "readOnly",
        "maxLength",
        "cellSpacing",
        "cellPadding",
        "rowSpan",
        "colSpan",
        "useMap",
        "frameBorder",
        "contentEditable"
    ], function() {
        jQuery.propFix[this.toLowerCase()] = this;
    });

    // IE6/7 call enctype encoding
    if (!support.enctype) {
        jQuery.propFix.enctype = "encoding";
    }




    var rclass = /[\t\r\n\f]/g;

    function getClass(elem) {
        return jQuery.attr(elem, "class") || "";
    }

    jQuery.fn.extend({
        addClass: function(value) {
            var classes, elem, cur, curValue, clazz, j, finalValue,
                i = 0;

            if (jQuery.isFunction(value)) {
                return this.each(function(j) {
                    jQuery(this).addClass(value.call(this, j, getClass(this)));
                });
            }

            if (typeof value === "string" && value) {
                classes = value.match(rnotwhite) || [];

                while ((elem = this[i++])) {
                    curValue = getClass(elem);
                    cur = elem.nodeType === 1 &&
                        (" " + curValue + " ").replace(rclass, " ");

                    if (cur) {
                        j = 0;
                        while ((clazz = classes[j++])) {
                            if (cur.indexOf(" " + clazz + " ") < 0) {
                                cur += clazz + " ";
                            }
                        }

                        // only assign if different to avoid unneeded rendering.
                        finalValue = jQuery.trim(cur);
                        if (curValue !== finalValue) {
                            jQuery.attr(elem, "class", finalValue);
                        }
                    }
                }
            }

            return this;
        },

        removeClass: function(value) {
            var classes, elem, cur, curValue, clazz, j, finalValue,
                i = 0;

            if (jQuery.isFunction(value)) {
                return this.each(function(j) {
                    jQuery(this).removeClass(value.call(this, j, getClass(this)));
                });
            }

            if (!arguments.length) {
                return this.attr("class", "");
            }

            if (typeof value === "string" && value) {
                classes = value.match(rnotwhite) || [];

                while ((elem = this[i++])) {
                    curValue = getClass(elem);

                    // This expression is here for better compressibility (see addClass)
                    cur = elem.nodeType === 1 &&
                        (" " + curValue + " ").replace(rclass, " ");

                    if (cur) {
                        j = 0;
                        while ((clazz = classes[j++])) {

                            // Remove *all* instances
                            while (cur.indexOf(" " + clazz + " ") > -1) {
                                cur = cur.replace(" " + clazz + " ", " ");
                            }
                        }

                        // Only assign if different to avoid unneeded rendering.
                        finalValue = jQuery.trim(cur);
                        if (curValue !== finalValue) {
                            jQuery.attr(elem, "class", finalValue);
                        }
                    }
                }
            }

            return this;
        },

        toggleClass: function(value, stateVal) {
            var type = typeof value;

            if (typeof stateVal === "boolean" && type === "string") {
                return stateVal ? this.addClass(value) : this.removeClass(value);
            }

            if (jQuery.isFunction(value)) {
                return this.each(function(i) {
                    jQuery(this).toggleClass(
                        value.call(this, i, getClass(this), stateVal),
                        stateVal
                    );
                });
            }

            return this.each(function() {
                var className, i, self, classNames;

                if (type === "string") {

                    // Toggle individual class names
                    i = 0;
                    self = jQuery(this);
                    classNames = value.match(rnotwhite) || [];

                    while ((className = classNames[i++])) {

                        // Check each className given, space separated list
                        if (self.hasClass(className)) {
                            self.removeClass(className);
                        } else {
                            self.addClass(className);
                        }
                    }

                    // Toggle whole class name
                } else if (value === undefined || type === "boolean") {
                    className = getClass(this);
                    if (className) {

                        // store className if set
                        jQuery._data(this, "__className__", className);
                    }

                    // If the element has a class name or if we're passed "false",
                    // then remove the whole classname (if there was one, the above saved it).
                    // Otherwise bring back whatever was previously saved (if anything),
                    // falling back to the empty string if nothing was stored.
                    jQuery.attr(this, "class",
                        className || value === false ?
                        "" :
                        jQuery._data(this, "__className__") || ""
                    );
                }
            });
        },

        hasClass: function(selector) {
            var className, elem,
                i = 0;

            className = " " + selector + " ";
            while ((elem = this[i++])) {
                if (elem.nodeType === 1 &&
                    (" " + getClass(elem) + " ").replace(rclass, " ")
                    .indexOf(className) > -1
                ) {
                    return true;
                }
            }

            return false;
        }
    });




    // Return jQuery for attributes-only inclusion


    jQuery.each(("blur focus focusin focusout load resize scroll unload click dblclick " +
            "mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
            "change select submit keydown keypress keyup error contextmenu").split(" "),
        function(i, name) {

            // Handle event binding
            jQuery.fn[name] = function(data, fn) {
                return arguments.length > 0 ?
                    this.on(name, null, data, fn) :
                    this.trigger(name);
            };
        });

    jQuery.fn.extend({
        hover: function(fnOver, fnOut) {
            return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        }
    });


    var location = window.location;

    var nonce = jQuery.now();

    var rquery = (/\?/);



    var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

    jQuery.parseJSON = function(data) {

        // Attempt to parse using the native JSON parser first
        if (window.JSON && window.JSON.parse) {

            // Support: Android 2.3
            // Workaround failure to string-cast null input
            return window.JSON.parse(data + "");
        }

        var requireNonComma,
            depth = null,
            str = jQuery.trim(data + "");

        // Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
        // after removing valid tokens
        return str && !jQuery.trim(str.replace(rvalidtokens, function(token, comma, open, close) {

                // Force termination if we see a misplaced comma
                if (requireNonComma && comma) {
                    depth = 0;
                }

                // Perform no more replacements after returning to outermost depth
                if (depth === 0) {
                    return token;
                }

                // Commas must not follow "[", "{", or ","
                requireNonComma = open || comma;

                // Determine new depth
                // array/object open ("[" or "{"): depth += true - false (increment)
                // array/object close ("]" or "}"): depth += false - true (decrement)
                // other cases ("," or primitive): depth += true - true (numeric cast)
                depth += !close - !open;

                // Remove this token
                return "";
            })) ?
            (Function("return " + str))() :
            jQuery.error("Invalid JSON: " + data);
    };


    // Cross-browser xml parsing
    jQuery.parseXML = function(data) {
        var xml, tmp;
        if (!data || typeof data !== "string") {
            return null;
        }
        try {
            if (window.DOMParser) { // Standard
                tmp = new window.DOMParser();
                xml = tmp.parseFromString(data, "text/xml");
            } else { // IE
                xml = new window.ActiveXObject("Microsoft.XMLDOM");
                xml.async = "false";
                xml.loadXML(data);
            }
        } catch (e) {
            xml = undefined;
        }
        if (!xml || !xml.documentElement || xml.getElementsByTagName("parsererror").length) {
            jQuery.error("Invalid XML: " + data);
        }
        return xml;
    };


    var
        rhash = /#.*$/,
        rts = /([?&])_=[^&]*/,

        // IE leaves an \r character at EOL
        rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

        // #7653, #8125, #8152: local protocol detection
        rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        rnoContent = /^(?:GET|HEAD)$/,
        rprotocol = /^\/\//,
        rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

        /* Prefilters
         * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
         * 2) These are called:
         *    - BEFORE asking for a transport
         *    - AFTER param serialization (s.data is a string if s.processData is true)
         * 3) key is the dataType
         * 4) the catchall symbol "*" can be used
         * 5) execution will start with transport dataType and THEN continue down to "*" if needed
         */
        prefilters = {},

        /* Transports bindings
         * 1) key is the dataType
         * 2) the catchall symbol "*" can be used
         * 3) selection will start with transport dataType and THEN go to "*" if needed
         */
        transports = {},

        // Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
        allTypes = "*/".concat("*"),

        // Document location
        ajaxLocation = location.href,

        // Segment location into parts
        ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];

    // Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
    function addToPrefiltersOrTransports(structure) {

        // dataTypeExpression is optional and defaults to "*"
        return function(dataTypeExpression, func) {

            if (typeof dataTypeExpression !== "string") {
                func = dataTypeExpression;
                dataTypeExpression = "*";
            }

            var dataType,
                i = 0,
                dataTypes = dataTypeExpression.toLowerCase().match(rnotwhite) || [];

            if (jQuery.isFunction(func)) {

                // For each dataType in the dataTypeExpression
                while ((dataType = dataTypes[i++])) {

                    // Prepend if requested
                    if (dataType.charAt(0) === "+") {
                        dataType = dataType.slice(1) || "*";
                        (structure[dataType] = structure[dataType] || []).unshift(func);

                        // Otherwise append
                    } else {
                        (structure[dataType] = structure[dataType] || []).push(func);
                    }
                }
            }
        };
    }

    // Base inspection function for prefilters and transports
    function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {

        var inspected = {},
            seekingTransport = (structure === transports);

        function inspect(dataType) {
            var selected;
            inspected[dataType] = true;
            jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
                var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
                if (typeof dataTypeOrTransport === "string" &&
                    !seekingTransport && !inspected[dataTypeOrTransport]) {

                    options.dataTypes.unshift(dataTypeOrTransport);
                    inspect(dataTypeOrTransport);
                    return false;
                } else if (seekingTransport) {
                    return !(selected = dataTypeOrTransport);
                }
            });
            return selected;
        }

        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
    }

    // A special extend for ajax options
    // that takes "flat" options (not to be deep extended)
    // Fixes #9887
    function ajaxExtend(target, src) {
        var deep, key,
            flatOptions = jQuery.ajaxSettings.flatOptions || {};

        for (key in src) {
            if (src[key] !== undefined) {
                (flatOptions[key] ? target : (deep || (deep = {})))[key] = src[key];
            }
        }
        if (deep) {
            jQuery.extend(true, target, deep);
        }

        return target;
    }

    /* Handles responses to an ajax request:
     * - finds the right dataType (mediates between content-type and expected dataType)
     * - returns the corresponding response
     */
    function ajaxHandleResponses(s, jqXHR, responses) {
        var firstDataType, ct, finalDataType, type,
            contents = s.contents,
            dataTypes = s.dataTypes;

        // Remove auto dataType and get content-type in the process
        while (dataTypes[0] === "*") {
            dataTypes.shift();
            if (ct === undefined) {
                ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
            }
        }

        // Check if we're dealing with a known content-type
        if (ct) {
            for (type in contents) {
                if (contents[type] && contents[type].test(ct)) {
                    dataTypes.unshift(type);
                    break;
                }
            }
        }

        // Check to see if we have a response for the expected dataType
        if (dataTypes[0] in responses) {
            finalDataType = dataTypes[0];
        } else {

            // Try convertible dataTypes
            for (type in responses) {
                if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
                    finalDataType = type;
                    break;
                }
                if (!firstDataType) {
                    firstDataType = type;
                }
            }

            // Or just use first one
            finalDataType = finalDataType || firstDataType;
        }

        // If we found a dataType
        // We add the dataType to the list if needed
        // and return the corresponding response
        if (finalDataType) {
            if (finalDataType !== dataTypes[0]) {
                dataTypes.unshift(finalDataType);
            }
            return responses[finalDataType];
        }
    }

    /* Chain conversions given the request and the original response
     * Also sets the responseXXX fields on the jqXHR instance
     */
    function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev,
            converters = {},

            // Work with a copy of dataTypes in case we need to modify it for conversion
            dataTypes = s.dataTypes.slice();

        // Create converters map with lowercased keys
        if (dataTypes[1]) {
            for (conv in s.converters) {
                converters[conv.toLowerCase()] = s.converters[conv];
            }
        }

        current = dataTypes.shift();

        // Convert to each sequential dataType
        while (current) {

            if (s.responseFields[current]) {
                jqXHR[s.responseFields[current]] = response;
            }

            // Apply the dataFilter if provided
            if (!prev && isSuccess && s.dataFilter) {
                response = s.dataFilter(response, s.dataType);
            }

            prev = current;
            current = dataTypes.shift();

            if (current) {

                // There's only work to do if current dataType is non-auto
                if (current === "*") {

                    current = prev;

                    // Convert response if prev dataType is non-auto and differs from current
                } else if (prev !== "*" && prev !== current) {

                    // Seek a direct converter
                    conv = converters[prev + " " + current] || converters["* " + current];

                    // If none found, seek a pair
                    if (!conv) {
                        for (conv2 in converters) {

                            // If conv2 outputs current
                            tmp = conv2.split(" ");
                            if (tmp[1] === current) {

                                // If prev can be converted to accepted input
                                conv = converters[prev + " " + tmp[0]] ||
                                    converters["* " + tmp[0]];
                                if (conv) {

                                    // Condense equivalence converters
                                    if (conv === true) {
                                        conv = converters[conv2];

                                        // Otherwise, insert the intermediate dataType
                                    } else if (converters[conv2] !== true) {
                                        current = tmp[0];
                                        dataTypes.unshift(tmp[1]);
                                    }
                                    break;
                                }
                            }
                        }
                    }

                    // Apply converter (if not an equivalence)
                    if (conv !== true) {

                        // Unless errors are allowed to bubble, catch and return them
                        if (conv && s["throws"]) { // jscs:ignore requireDotNotation
                            response = conv(response);
                        } else {
                            try {
                                response = conv(response);
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: conv ? e : "No conversion from " + prev + " to " + current
                                };
                            }
                        }
                    }
                }
            }
        }

        return {
            state: "success",
            data: response
        };
    }

    jQuery.extend({

        // Counter for holding the number of active queries
        active: 0,

        // Last-Modified header cache for next request
        lastModified: {},
        etag: {},

        ajaxSettings: {
            url: ajaxLocation,
            type: "GET",
            isLocal: rlocalProtocol.test(ajaxLocParts[1]),
            global: true,
            processData: true,
            async: true,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            /*
            timeout: 0,
            data: null,
            dataType: null,
            username: null,
            password: null,
            cache: null,
            throws: false,
            traditional: false,
            headers: {},
            */

            accepts: {
                "*": allTypes,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },

            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },

            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },

            // Data converters
            // Keys separate source (or catchall "*") and destination types with a single space
            converters: {

                // Convert anything to text
                "* text": String,

                // Text to html (true = no transformation)
                "text html": true,

                // Evaluate text as a json expression
                "text json": jQuery.parseJSON,

                // Parse text as xml
                "text xml": jQuery.parseXML
            },

            // For options that shouldn't be deep extended:
            // you can add your own custom options here if
            // and when you create one that shouldn't be
            // deep extended (see ajaxExtend)
            flatOptions: {
                url: true,
                context: true
            }
        },

        // Creates a full fledged settings object into target
        // with both ajaxSettings and settings fields.
        // If target is omitted, writes into ajaxSettings.
        ajaxSetup: function(target, settings) {
            return settings ?

                // Building a settings object
                ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings) :

                // Extending ajaxSettings
                ajaxExtend(jQuery.ajaxSettings, target);
        },

        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),

        // Main method
        ajax: function(url, options) {

            // If url is an object, simulate pre-1.5 signature
            if (typeof url === "object") {
                options = url;
                url = undefined;
            }

            // Force options to be an object
            options = options || {};

            var

                // Cross-domain detection vars
                parts,

                // Loop variable
                i,

                // URL without anti-cache param
                cacheURL,

                // Response headers as string
                responseHeadersString,

                // timeout handle
                timeoutTimer,

                // To know if global events are to be dispatched
                fireGlobals,

                transport,

                // Response headers
                responseHeaders,

                // Create the final options object
                s = jQuery.ajaxSetup({}, options),

                // Callbacks context
                callbackContext = s.context || s,

                // Context for global events is callbackContext if it is a DOM node or jQuery collection
                globalEventContext = s.context &&
                (callbackContext.nodeType || callbackContext.jquery) ?
                jQuery(callbackContext) :
                jQuery.event,

                // Deferreds
                deferred = jQuery.Deferred(),
                completeDeferred = jQuery.Callbacks("once memory"),

                // Status-dependent callbacks
                statusCode = s.statusCode || {},

                // Headers (they are sent all at once)
                requestHeaders = {},
                requestHeadersNames = {},

                // The jqXHR state
                state = 0,

                // Default abort message
                strAbort = "canceled",

                // Fake xhr
                jqXHR = {
                    readyState: 0,

                    // Builds headers hashtable if needed
                    getResponseHeader: function(key) {
                        var match;
                        if (state === 2) {
                            if (!responseHeaders) {
                                responseHeaders = {};
                                while ((match = rheaders.exec(responseHeadersString))) {
                                    responseHeaders[match[1].toLowerCase()] = match[2];
                                }
                            }
                            match = responseHeaders[key.toLowerCase()];
                        }
                        return match == null ? null : match;
                    },

                    // Raw string
                    getAllResponseHeaders: function() {
                        return state === 2 ? responseHeadersString : null;
                    },

                    // Caches the header
                    setRequestHeader: function(name, value) {
                        var lname = name.toLowerCase();
                        if (!state) {
                            name = requestHeadersNames[lname] = requestHeadersNames[lname] || name;
                            requestHeaders[name] = value;
                        }
                        return this;
                    },

                    // Overrides response content-type header
                    overrideMimeType: function(type) {
                        if (!state) {
                            s.mimeType = type;
                        }
                        return this;
                    },

                    // Status-dependent callbacks
                    statusCode: function(map) {
                        var code;
                        if (map) {
                            if (state < 2) {
                                for (code in map) {

                                    // Lazy-add the new callback in a way that preserves old ones
                                    statusCode[code] = [statusCode[code], map[code]];
                                }
                            } else {

                                // Execute the appropriate callbacks
                                jqXHR.always(map[jqXHR.status]);
                            }
                        }
                        return this;
                    },

                    // Cancel the request
                    abort: function(statusText) {
                        var finalText = statusText || strAbort;
                        if (transport) {
                            transport.abort(finalText);
                        }
                        done(0, finalText);
                        return this;
                    }
                };

            // Attach deferreds
            deferred.promise(jqXHR).complete = completeDeferred.add;
            jqXHR.success = jqXHR.done;
            jqXHR.error = jqXHR.fail;

            // Remove hash character (#7531: and string promotion)
            // Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
            // Handle falsy url in the settings object (#10093: consistency with old signature)
            // We also use the url parameter if available
            s.url = ((url || s.url || ajaxLocation) + "")
                .replace(rhash, "")
                .replace(rprotocol, ajaxLocParts[1] + "//");

            // Alias method option to type as per ticket #12004
            s.type = options.method || options.type || s.method || s.type;

            // Extract dataTypes list
            s.dataTypes = jQuery.trim(s.dataType || "*").toLowerCase().match(rnotwhite) || [""];

            // A cross-domain request is in order when we have a protocol:host:port mismatch
            if (s.crossDomain == null) {
                parts = rurl.exec(s.url.toLowerCase());
                s.crossDomain = !!(parts &&
                    (parts[1] !== ajaxLocParts[1] || parts[2] !== ajaxLocParts[2] ||
                        (parts[3] || (parts[1] === "http:" ? "80" : "443")) !==
                        (ajaxLocParts[3] || (ajaxLocParts[1] === "http:" ? "80" : "443")))
                );
            }

            // Convert data if not already a string
            if (s.data && s.processData && typeof s.data !== "string") {
                s.data = jQuery.param(s.data, s.traditional);
            }

            // Apply prefilters
            inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);

            // If request was aborted inside a prefilter, stop there
            if (state === 2) {
                return jqXHR;
            }

            // We can fire global events as of now if asked to
            // Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
            fireGlobals = jQuery.event && s.global;

            // Watch for a new set of requests
            if (fireGlobals && jQuery.active++ === 0) {
                jQuery.event.trigger("ajaxStart");
            }

            // Uppercase the type
            s.type = s.type.toUpperCase();

            // Determine if request has content
            s.hasContent = !rnoContent.test(s.type);

            // Save the URL in case we're toying with the If-Modified-Since
            // and/or If-None-Match header later on
            cacheURL = s.url;

            // More options handling for requests with no content
            if (!s.hasContent) {

                // If data is available, append data to url
                if (s.data) {
                    cacheURL = (s.url += (rquery.test(cacheURL) ? "&" : "?") + s.data);

                    // #9682: remove data so that it's not used in an eventual retry
                    delete s.data;
                }

                // Add anti-cache in url if needed
                if (s.cache === false) {
                    s.url = rts.test(cacheURL) ?

                        // If there is already a '_' parameter, set its value
                        cacheURL.replace(rts, "$1_=" + nonce++) :

                        // Otherwise add one to the end
                        cacheURL + (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce++;
                }
            }

            // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
            if (s.ifModified) {
                if (jQuery.lastModified[cacheURL]) {
                    jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
                }
                if (jQuery.etag[cacheURL]) {
                    jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
                }
            }

            // Set the correct header, if data is being sent
            if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
                jqXHR.setRequestHeader("Content-Type", s.contentType);
            }

            // Set the Accepts header for the server, depending on the dataType
            jqXHR.setRequestHeader(
                "Accept",
                s.dataTypes[0] && s.accepts[s.dataTypes[0]] ?
                s.accepts[s.dataTypes[0]] +
                (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") :
                s.accepts["*"]
            );

            // Check for headers option
            for (i in s.headers) {
                jqXHR.setRequestHeader(i, s.headers[i]);
            }

            // Allow custom headers/mimetypes and early abort
            if (s.beforeSend &&
                (s.beforeSend.call(callbackContext, jqXHR, s) === false || state === 2)) {

                // Abort if not done already and return
                return jqXHR.abort();
            }

            // aborting is no longer a cancellation
            strAbort = "abort";

            // Install callbacks on deferreds
            for (i in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) {
                jqXHR[i](s[i]);
            }

            // Get transport
            transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);

            // If no transport, we auto-abort
            if (!transport) {
                done(-1, "No Transport");
            } else {
                jqXHR.readyState = 1;

                // Send global event
                if (fireGlobals) {
                    globalEventContext.trigger("ajaxSend", [jqXHR, s]);
                }

                // If request was aborted inside ajaxSend, stop there
                if (state === 2) {
                    return jqXHR;
                }

                // Timeout
                if (s.async && s.timeout > 0) {
                    timeoutTimer = window.setTimeout(function() {
                        jqXHR.abort("timeout");
                    }, s.timeout);
                }

                try {
                    state = 1;
                    transport.send(requestHeaders, done);
                } catch (e) {

                    // Propagate exception as error if not done
                    if (state < 2) {
                        done(-1, e);

                        // Simply rethrow otherwise
                    } else {
                        throw e;
                    }
                }
            }

            // Callback for when everything is done
            function done(status, nativeStatusText, responses, headers) {
                var isSuccess, success, error, response, modified,
                    statusText = nativeStatusText;

                // Called once
                if (state === 2) {
                    return;
                }

                // State is "done" now
                state = 2;

                // Clear timeout if it exists
                if (timeoutTimer) {
                    window.clearTimeout(timeoutTimer);
                }

                // Dereference transport for early garbage collection
                // (no matter how long the jqXHR object will be used)
                transport = undefined;

                // Cache response headers
                responseHeadersString = headers || "";

                // Set readyState
                jqXHR.readyState = status > 0 ? 4 : 0;

                // Determine if successful
                isSuccess = status >= 200 && status < 300 || status === 304;

                // Get response data
                if (responses) {
                    response = ajaxHandleResponses(s, jqXHR, responses);
                }

                // Convert no matter what (that way responseXXX fields are always set)
                response = ajaxConvert(s, response, jqXHR, isSuccess);

                // If successful, handle type chaining
                if (isSuccess) {

                    // Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
                    if (s.ifModified) {
                        modified = jqXHR.getResponseHeader("Last-Modified");
                        if (modified) {
                            jQuery.lastModified[cacheURL] = modified;
                        }
                        modified = jqXHR.getResponseHeader("etag");
                        if (modified) {
                            jQuery.etag[cacheURL] = modified;
                        }
                    }

                    // if no content
                    if (status === 204 || s.type === "HEAD") {
                        statusText = "nocontent";

                        // if not modified
                    } else if (status === 304) {
                        statusText = "notmodified";

                        // If we have data, let's convert it
                    } else {
                        statusText = response.state;
                        success = response.data;
                        error = response.error;
                        isSuccess = !error;
                    }
                } else {

                    // We extract error from statusText
                    // then normalize statusText and status for non-aborts
                    error = statusText;
                    if (status || !statusText) {
                        statusText = "error";
                        if (status < 0) {
                            status = 0;
                        }
                    }
                }

                // Set data for the fake xhr object
                jqXHR.status = status;
                jqXHR.statusText = (nativeStatusText || statusText) + "";

                // Success/Error
                if (isSuccess) {
                    deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
                } else {
                    deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
                }

                // Status-dependent callbacks
                jqXHR.statusCode(statusCode);
                statusCode = undefined;

                if (fireGlobals) {
                    globalEventContext.trigger(isSuccess ? "ajaxSuccess" : "ajaxError", [jqXHR, s, isSuccess ? success : error]);
                }

                // Complete
                completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);

                if (fireGlobals) {
                    globalEventContext.trigger("ajaxComplete", [jqXHR, s]);

                    // Handle the global AJAX counter
                    if (!(--jQuery.active)) {
                        jQuery.event.trigger("ajaxStop");
                    }
                }
            }

            return jqXHR;
        },

        getJSON: function(url, data, callback) {
            return jQuery.get(url, data, callback, "json");
        },

        getScript: function(url, callback) {
            return jQuery.get(url, undefined, callback, "script");
        }
    });

    jQuery.each(["get", "post"], function(i, method) {
        jQuery[method] = function(url, data, callback, type) {

            // shift arguments if data argument was omitted
            if (jQuery.isFunction(data)) {
                type = type || callback;
                callback = data;
                data = undefined;
            }

            // The url can be an options object (which then must have .url)
            return jQuery.ajax(jQuery.extend({
                url: url,
                type: method,
                dataType: type,
                data: data,
                success: callback
            }, jQuery.isPlainObject(url) && url));
        };
    });


    jQuery._evalUrl = function(url) {
        return jQuery.ajax({
            url: url,

            // Make this explicit, since user can override this through ajaxSetup (#11264)
            type: "GET",
            dataType: "script",
            cache: true,
            async: false,
            global: false,
            "throws": true
        });
    };


    jQuery.fn.extend({
        wrapAll: function(html) {
            if (jQuery.isFunction(html)) {
                return this.each(function(i) {
                    jQuery(this).wrapAll(html.call(this, i));
                });
            }

            if (this[0]) {

                // The elements to wrap the target around
                var wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);

                if (this[0].parentNode) {
                    wrap.insertBefore(this[0]);
                }

                wrap.map(function() {
                    var elem = this;

                    while (elem.firstChild && elem.firstChild.nodeType === 1) {
                        elem = elem.firstChild;
                    }

                    return elem;
                }).append(this);
            }

            return this;
        },

        wrapInner: function(html) {
            if (jQuery.isFunction(html)) {
                return this.each(function(i) {
                    jQuery(this).wrapInner(html.call(this, i));
                });
            }

            return this.each(function() {
                var self = jQuery(this),
                    contents = self.contents();

                if (contents.length) {
                    contents.wrapAll(html);

                } else {
                    self.append(html);
                }
            });
        },

        wrap: function(html) {
            var isFunction = jQuery.isFunction(html);

            return this.each(function(i) {
                jQuery(this).wrapAll(isFunction ? html.call(this, i) : html);
            });
        },

        unwrap: function() {
            return this.parent().each(function() {
                if (!jQuery.nodeName(this, "body")) {
                    jQuery(this).replaceWith(this.childNodes);
                }
            }).end();
        }
    });


    function getDisplay(elem) {
        return elem.style && elem.style.display || jQuery.css(elem, "display");
    }

    function filterHidden(elem) {

        // Disconnected elements are considered hidden
        if (!jQuery.contains(elem.ownerDocument || document, elem)) {
            return true;
        }
        while (elem && elem.nodeType === 1) {
            if (getDisplay(elem) === "none" || elem.type === "hidden") {
                return true;
            }
            elem = elem.parentNode;
        }
        return false;
    }

    jQuery.expr.filters.hidden = function(elem) {

        // Support: Opera <= 12.12
        // Opera reports offsetWidths and offsetHeights less than zero on some elements
        return support.reliableHiddenOffsets() ?
            (elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
                !elem.getClientRects().length) :
            filterHidden(elem);
    };

    jQuery.expr.filters.visible = function(elem) {
        return !jQuery.expr.filters.hidden(elem);
    };




    var r20 = /%20/g,
        rbracket = /\[\]$/,
        rCRLF = /\r?\n/g,
        rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
        rsubmittable = /^(?:input|select|textarea|keygen)/i;

    function buildParams(prefix, obj, traditional, add) {
        var name;

        if (jQuery.isArray(obj)) {

            // Serialize array item.
            jQuery.each(obj, function(i, v) {
                if (traditional || rbracket.test(prefix)) {

                    // Treat each array item as a scalar.
                    add(prefix, v);

                } else {

                    // Item is non-scalar (array or object), encode its numeric index.
                    buildParams(
                        prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]",
                        v,
                        traditional,
                        add
                    );
                }
            });

        } else if (!traditional && jQuery.type(obj) === "object") {

            // Serialize object item.
            for (name in obj) {
                buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
            }

        } else {

            // Serialize scalar item.
            add(prefix, obj);
        }
    }

    // Serialize an array of form elements or a set of
    // key/values into a query string
    jQuery.param = function(a, traditional) {
        var prefix,
            s = [],
            add = function(key, value) {

                // If value is a function, invoke it and return its value
                value = jQuery.isFunction(value) ? value() : (value == null ? "" : value);
                s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value);
            };

        // Set traditional to true for jQuery <= 1.3.2 behavior.
        if (traditional === undefined) {
            traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
        }

        // If an array was passed in, assume that it is an array of form elements.
        if (jQuery.isArray(a) || (a.jquery && !jQuery.isPlainObject(a))) {

            // Serialize the form elements
            jQuery.each(a, function() {
                add(this.name, this.value);
            });

        } else {

            // If traditional, encode the "old" way (the way 1.3.2 or older
            // did it), otherwise encode params recursively.
            for (prefix in a) {
                buildParams(prefix, a[prefix], traditional, add);
            }
        }

        // Return the resulting serialization
        return s.join("&").replace(r20, "+");
    };

    jQuery.fn.extend({
        serialize: function() {
            return jQuery.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {

                    // Can add propHook for "elements" to filter or add form elements
                    var elements = jQuery.prop(this, "elements");
                    return elements ? jQuery.makeArray(elements) : this;
                })
                .filter(function() {
                    var type = this.type;

                    // Use .is(":disabled") so that fieldset[disabled] works
                    return this.name && !jQuery(this).is(":disabled") &&
                        rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) &&
                        (this.checked || !rcheckableType.test(type));
                })
                .map(function(i, elem) {
                    var val = jQuery(this).val();

                    return val == null ?
                        null :
                        jQuery.isArray(val) ?
                        jQuery.map(val, function(val) {
                            return {
                                name: elem.name,
                                value: val.replace(rCRLF, "\r\n")
                            };
                        }) : {
                            name: elem.name,
                            value: val.replace(rCRLF, "\r\n")
                        };
                }).get();
        }
    });


    // Create the request object
    // (This is still attached to ajaxSettings for backward compatibility)
    jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

        // Support: IE6-IE8
        function() {

            // XHR cannot access local files, always use ActiveX for that case
            if (this.isLocal) {
                return createActiveXHR();
            }

            // Support: IE 9-11
            // IE seems to error on cross-domain PATCH requests when ActiveX XHR
            // is used. In IE 9+ always use the native XHR.
            // Note: this condition won't catch Edge as it doesn't define
            // document.documentMode but it also doesn't support ActiveX so it won't
            // reach this code.
            if (document.documentMode > 8) {
                return createStandardXHR();
            }

            // Support: IE<9
            // oldIE XHR does not support non-RFC2616 methods (#13240)
            // See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
            // and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
            // Although this check for six methods instead of eight
            // since IE also does not support "trace" and "connect"
            return /^(get|post|head|put|delete|options)$/i.test(this.type) &&
                createStandardXHR() || createActiveXHR();
        } :

        // For all other browsers, use the standard XMLHttpRequest object
        createStandardXHR;

    var xhrId = 0,
        xhrCallbacks = {},
        xhrSupported = jQuery.ajaxSettings.xhr();

    // Support: IE<10
    // Open requests must be manually aborted on unload (#5280)
    // See https://support.microsoft.com/kb/2856746 for more info
    if (window.attachEvent) {
        window.attachEvent("onunload", function() {
            for (var key in xhrCallbacks) {
                xhrCallbacks[key](undefined, true);
            }
        });
    }

    // Determine support properties
    support.cors = !!xhrSupported && ("withCredentials" in xhrSupported);
    xhrSupported = support.ajax = !!xhrSupported;

    // Create transport if the browser can provide an xhr
    if (xhrSupported) {

        jQuery.ajaxTransport(function(options) {

            // Cross domain only allowed if supported through XMLHttpRequest
            if (!options.crossDomain || support.cors) {

                var callback;

                return {
                    send: function(headers, complete) {
                        var i,
                            xhr = options.xhr(),
                            id = ++xhrId;

                        // Open the socket
                        xhr.open(
                            options.type,
                            options.url,
                            options.async,
                            options.username,
                            options.password
                        );

                        // Apply custom fields if provided
                        if (options.xhrFields) {
                            for (i in options.xhrFields) {
                                xhr[i] = options.xhrFields[i];
                            }
                        }

                        // Override mime type if needed
                        if (options.mimeType && xhr.overrideMimeType) {
                            xhr.overrideMimeType(options.mimeType);
                        }

                        // X-Requested-With header
                        // For cross-domain requests, seeing as conditions for a preflight are
                        // akin to a jigsaw puzzle, we simply never set it to be sure.
                        // (it can always be set on a per-request basis or even using ajaxSetup)
                        // For same-domain requests, won't change header if already provided.
                        if (!options.crossDomain && !headers["X-Requested-With"]) {
                            headers["X-Requested-With"] = "XMLHttpRequest";
                        }

                        // Set headers
                        for (i in headers) {

                            // Support: IE<9
                            // IE's ActiveXObject throws a 'Type Mismatch' exception when setting
                            // request header to a null-value.
                            //
                            // To keep consistent with other XHR implementations, cast the value
                            // to string and ignore `undefined`.
                            if (headers[i] !== undefined) {
                                xhr.setRequestHeader(i, headers[i] + "");
                            }
                        }

                        // Do send the request
                        // This may raise an exception which is actually
                        // handled in jQuery.ajax (so no try/catch here)
                        xhr.send((options.hasContent && options.data) || null);

                        // Listener
                        callback = function(_, isAbort) {
                            var status, statusText, responses;

                            // Was never called and is aborted or complete
                            if (callback && (isAbort || xhr.readyState === 4)) {

                                // Clean up
                                delete xhrCallbacks[id];
                                callback = undefined;
                                xhr.onreadystatechange = jQuery.noop;

                                // Abort manually if needed
                                if (isAbort) {
                                    if (xhr.readyState !== 4) {
                                        xhr.abort();
                                    }
                                } else {
                                    responses = {};
                                    status = xhr.status;

                                    // Support: IE<10
                                    // Accessing binary-data responseText throws an exception
                                    // (#11426)
                                    if (typeof xhr.responseText === "string") {
                                        responses.text = xhr.responseText;
                                    }

                                    // Firefox throws an exception when accessing
                                    // statusText for faulty cross-domain requests
                                    try {
                                        statusText = xhr.statusText;
                                    } catch (e) {

                                        // We normalize with Webkit giving an empty statusText
                                        statusText = "";
                                    }

                                    // Filter status for non standard behaviors

                                    // If the request is local and we have data: assume a success
                                    // (success with no data won't get notified, that's the best we
                                    // can do given current implementations)
                                    if (!status && options.isLocal && !options.crossDomain) {
                                        status = responses.text ? 200 : 404;

                                        // IE - #1450: sometimes returns 1223 when it should be 204
                                    } else if (status === 1223) {
                                        status = 204;
                                    }
                                }
                            }

                            // Call complete if needed
                            if (responses) {
                                complete(status, statusText, responses, xhr.getAllResponseHeaders());
                            }
                        };

                        // Do send the request
                        // `xhr.send` may raise an exception, but it will be
                        // handled in jQuery.ajax (so no try/catch here)
                        if (!options.async) {

                            // If we're in sync mode we fire the callback
                            callback();
                        } else if (xhr.readyState === 4) {

                            // (IE6 & IE7) if it's in cache and has been
                            // retrieved directly we need to fire the callback
                            window.setTimeout(callback);
                        } else {

                            // Register the callback, but delay it in case `xhr.send` throws
                            // Add to the list of active xhr callbacks
                            xhr.onreadystatechange = xhrCallbacks[id] = callback;
                        }
                    },

                    abort: function() {
                        if (callback) {
                            callback(undefined, true);
                        }
                    }
                };
            }
        });
    }

    // Functions to create xhrs
    function createStandardXHR() {
        try {
            return new window.XMLHttpRequest();
        } catch (e) {}
    }

    function createActiveXHR() {
        try {
            return new window.ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {}
    }

    // AEM Patch - Start
    // Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
    // (See GRANITE-20058)
    jQuery.ajaxPrefilter(function(s) {
        if (s.crossDomain) {
            s.contents.script = false;
        }
    });
    // AEM Patch - End


    // Install script dataType
    jQuery.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, " +
                "application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(text) {
                jQuery.globalEval(text);
                return text;
            }
        }
    });

    // Handle cache's special case and global
    jQuery.ajaxPrefilter("script", function(s) {
        if (s.cache === undefined) {
            s.cache = false;
        }
        if (s.crossDomain) {
            s.type = "GET";
            s.global = false;
        }
    });

    // Bind script tag hack transport
    jQuery.ajaxTransport("script", function(s) {

        // This transport only deals with cross domain requests
        if (s.crossDomain) {

            var script,
                head = document.head || jQuery("head")[0] || document.documentElement;

            return {

                send: function(_, callback) {

                    script = document.createElement("script");

                    script.async = true;

                    if (s.scriptCharset) {
                        script.charset = s.scriptCharset;
                    }

                    script.src = s.url;

                    // Attach handlers for all browsers
                    script.onload = script.onreadystatechange = function(_, isAbort) {

                        if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {

                            // Handle memory leak in IE
                            script.onload = script.onreadystatechange = null;

                            // Remove the script
                            if (script.parentNode) {
                                script.parentNode.removeChild(script);
                            }

                            // Dereference the script
                            script = null;

                            // Callback if not abort
                            if (!isAbort) {
                                callback(200, "success");
                            }
                        }
                    };

                    // Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
                    // Use native DOM manipulation to avoid our domManip AJAX trickery
                    head.insertBefore(script, head.firstChild);
                },

                abort: function() {
                    if (script) {
                        script.onload(undefined, true);
                    }
                }
            };
        }
    });




    var oldCallbacks = [],
        rjsonp = /(=)\?(?=&|$)|\?\?/;

    // Default jsonp settings
    jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var callback = oldCallbacks.pop() || (jQuery.expando + "_" + (nonce++));
            this[callback] = true;
            return callback;
        }
    });

    // Detect, normalize options and install callbacks for jsonp requests
    jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {

        var callbackName, overwritten, responseContainer,
            jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ?
                "url" :
                typeof s.data === "string" &&
                (s.contentType || "")
                .indexOf("application/x-www-form-urlencoded") === 0 &&
                rjsonp.test(s.data) && "data"
            );

        // Handle iff the expected data type is "jsonp" or we have a parameter to set
        if (jsonProp || s.dataTypes[0] === "jsonp") {

            // Get callback name, remembering preexisting value associated with it
            callbackName = s.jsonpCallback = jQuery.isFunction(s.jsonpCallback) ?
                s.jsonpCallback() :
                s.jsonpCallback;

            // Insert callback into url or form data
            if (jsonProp) {
                s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
            } else if (s.jsonp !== false) {
                s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
            }

            // Use data converter to retrieve json after script execution
            s.converters["script json"] = function() {
                if (!responseContainer) {
                    jQuery.error(callbackName + " was not called");
                }
                return responseContainer[0];
            };

            // force json dataType
            s.dataTypes[0] = "json";

            // Install callback
            overwritten = window[callbackName];
            window[callbackName] = function() {
                responseContainer = arguments;
            };

            // Clean-up function (fires after converters)
            jqXHR.always(function() {

                // If previous value didn't exist - remove it
                if (overwritten === undefined) {
                    jQuery(window).removeProp(callbackName);

                    // Otherwise restore preexisting value
                } else {
                    window[callbackName] = overwritten;
                }

                // Save back as free
                if (s[callbackName]) {

                    // make sure that re-using the options doesn't screw things around
                    s.jsonpCallback = originalSettings.jsonpCallback;

                    // save the callback name for future use
                    oldCallbacks.push(callbackName);
                }

                // Call if it was a function and we have a response
                if (responseContainer && jQuery.isFunction(overwritten)) {
                    overwritten(responseContainer[0]);
                }

                responseContainer = overwritten = undefined;
            });

            // Delegate to script
            return "script";
        }
    });




    // data: string of html
    // context (optional): If specified, the fragment will be created in this context,
    // defaults to document
    // keepScripts (optional): If true, will include scripts passed in the html string
    jQuery.parseHTML = function(data, context, keepScripts) {
        if (!data || typeof data !== "string") {
            return null;
        }
        if (typeof context === "boolean") {
            keepScripts = context;
            context = false;
        }
        context = context || document;

        var parsed = rsingleTag.exec(data),
            scripts = !keepScripts && [];

        // Single tag
        if (parsed) {
            return [context.createElement(parsed[1])];
        }

        parsed = buildFragment([data], context, scripts);

        if (scripts && scripts.length) {
            jQuery(scripts).remove();
        }

        return jQuery.merge([], parsed.childNodes);
    };


    // Keep a copy of the old load method
    var _load = jQuery.fn.load;

    /**
     * Load a url into a page
     */
    jQuery.fn.load = function(url, params, callback) {
        if (typeof url !== "string" && _load) {
            return _load.apply(this, arguments);
        }

        var selector, type, response,
            self = this,
            off = url.indexOf(" ");

        if (off > -1) {
            selector = jQuery.trim(url.slice(off, url.length));
            url = url.slice(0, off);
        }

        // If it's a function
        if (jQuery.isFunction(params)) {

            // We assume that it's the callback
            callback = params;
            params = undefined;

            // Otherwise, build a param string
        } else if (params && typeof params === "object") {
            type = "POST";
        }

        // If we have elements to modify, make the request
        if (self.length > 0) {
            jQuery.ajax({
                url: url,

                // If "type" variable is undefined, then "GET" method will be used.
                // Make value of this field explicit since
                // user can override it through ajaxSetup method
                type: type || "GET",
                dataType: "html",
                data: params
            }).done(function(responseText) {

                // Save response for use in complete callback
                response = arguments;

                self.html(selector ?

                    // If a selector was specified, locate the right elements in a dummy div
                    // Exclude scripts to avoid IE 'Permission Denied' errors
                    jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector) :

                    // Otherwise use the full result
                    responseText);

                // If the request succeeds, this function gets "data", "status", "jqXHR"
                // but they are ignored because response was set above.
                // If it fails, this function gets "jqXHR", "status", "error"
            }).always(callback && function(jqXHR, status) {
                self.each(function() {
                    callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
                });
            });
        }

        return this;
    };




    // Attach a bunch of functions for handling common AJAX events
    jQuery.each([
        "ajaxStart",
        "ajaxStop",
        "ajaxComplete",
        "ajaxError",
        "ajaxSuccess",
        "ajaxSend"
    ], function(i, type) {
        jQuery.fn[type] = function(fn) {
            return this.on(type, fn);
        };
    });




    jQuery.expr.filters.animated = function(elem) {
        return jQuery.grep(jQuery.timers, function(fn) {
            return elem === fn.elem;
        }).length;
    };





    /**
     * Gets a window from an element
     */
    function getWindow(elem) {
        return jQuery.isWindow(elem) ?
            elem :
            elem.nodeType === 9 ?
            elem.defaultView || elem.parentWindow :
            false;
    }

    jQuery.offset = {
        setOffset: function(elem, options, i) {
            var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
                position = jQuery.css(elem, "position"),
                curElem = jQuery(elem),
                props = {};

            // set position first, in-case top/left are set even on static elem
            if (position === "static") {
                elem.style.position = "relative";
            }

            curOffset = curElem.offset();
            curCSSTop = jQuery.css(elem, "top");
            curCSSLeft = jQuery.css(elem, "left");
            calculatePosition = (position === "absolute" || position === "fixed") &&
                jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1;

            // need to be able to calculate position if either top or left
            // is auto and position is either absolute or fixed
            if (calculatePosition) {
                curPosition = curElem.position();
                curTop = curPosition.top;
                curLeft = curPosition.left;
            } else {
                curTop = parseFloat(curCSSTop) || 0;
                curLeft = parseFloat(curCSSLeft) || 0;
            }

            if (jQuery.isFunction(options)) {

                // Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
                options = options.call(elem, i, jQuery.extend({}, curOffset));
            }

            if (options.top != null) {
                props.top = (options.top - curOffset.top) + curTop;
            }
            if (options.left != null) {
                props.left = (options.left - curOffset.left) + curLeft;
            }

            if ("using" in options) {
                options.using.call(elem, props);
            } else {
                curElem.css(props);
            }
        }
    };

    jQuery.fn.extend({
        offset: function(options) {
            if (arguments.length) {
                return options === undefined ?
                    this :
                    this.each(function(i) {
                        jQuery.offset.setOffset(this, options, i);
                    });
            }

            var docElem, win,
                box = {
                    top: 0,
                    left: 0
                },
                elem = this[0],
                doc = elem && elem.ownerDocument;

            if (!doc) {
                return;
            }

            docElem = doc.documentElement;

            // Make sure it's not a disconnected DOM node
            if (!jQuery.contains(docElem, elem)) {
                return box;
            }

            // If we don't have gBCR, just use 0,0 rather than error
            // BlackBerry 5, iOS 3 (original iPhone)
            if (typeof elem.getBoundingClientRect !== "undefined") {
                box = elem.getBoundingClientRect();
            }
            win = getWindow(doc);
            return {
                top: box.top + (win.pageYOffset || docElem.scrollTop) - (docElem.clientTop || 0),
                left: box.left + (win.pageXOffset || docElem.scrollLeft) - (docElem.clientLeft || 0)
            };
        },

        position: function() {
            if (!this[0]) {
                return;
            }

            var offsetParent, offset,
                parentOffset = {
                    top: 0,
                    left: 0
                },
                elem = this[0];

            // Fixed elements are offset from window (parentOffset = {top:0, left: 0},
            // because it is its only offset parent
            if (jQuery.css(elem, "position") === "fixed") {

                // we assume that getBoundingClientRect is available when computed position is fixed
                offset = elem.getBoundingClientRect();
            } else {

                // Get *real* offsetParent
                offsetParent = this.offsetParent();

                // Get correct offsets
                offset = this.offset();
                if (!jQuery.nodeName(offsetParent[0], "html")) {
                    parentOffset = offsetParent.offset();
                }

                // Add offsetParent borders
                parentOffset.top += jQuery.css(offsetParent[0], "borderTopWidth", true);
                parentOffset.left += jQuery.css(offsetParent[0], "borderLeftWidth", true);
            }

            // Subtract parent offsets and element margins
            // note: when an element has margin: auto the offsetLeft and marginLeft
            // are the same in Safari causing offset.left to incorrectly be 0
            return {
                top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
                left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
            };
        },

        offsetParent: function() {
            return this.map(function() {
                var offsetParent = this.offsetParent;

                while (offsetParent && (!jQuery.nodeName(offsetParent, "html") &&
                        jQuery.css(offsetParent, "position") === "static")) {
                    offsetParent = offsetParent.offsetParent;
                }
                return offsetParent || documentElement;
            });
        }
    });

    // Create scrollLeft and scrollTop methods
    jQuery.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(method, prop) {
        var top = /Y/.test(prop);

        jQuery.fn[method] = function(val) {
            return access(this, function(elem, method, val) {
                var win = getWindow(elem);

                if (val === undefined) {
                    return win ? (prop in win) ? win[prop] :
                        win.document.documentElement[method] :
                        elem[method];
                }

                if (win) {
                    win.scrollTo(!top ? val : jQuery(win).scrollLeft(),
                        top ? val : jQuery(win).scrollTop()
                    );

                } else {
                    elem[method] = val;
                }
            }, method, val, arguments.length, null);
        };
    });

    // Support: Safari<7-8+, Chrome<37-44+
    // Add the top/left cssHooks using jQuery.fn.position
    // Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
    // getComputedStyle returns percent when specified for top/left/bottom/right
    // rather than make the css module depend on the offset module, we just check for it here
    jQuery.each(["top", "left"], function(i, prop) {
        jQuery.cssHooks[prop] = addGetHookIf(support.pixelPosition,
            function(elem, computed) {
                if (computed) {
                    computed = curCSS(elem, prop);

                    // if curCSS returns percentage, fallback to offset
                    return rnumnonpx.test(computed) ?
                        jQuery(elem).position()[prop] + "px" :
                        computed;
                }
            }
        );
    });


    // Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
    jQuery.each({
        Height: "height",
        Width: "width"
    }, function(name, type) {
        jQuery.each({
                padding: "inner" + name,
                content: type,
                "": "outer" + name
            },
            function(defaultExtra, funcName) {

                // margin is only for outerHeight, outerWidth
                jQuery.fn[funcName] = function(margin, value) {
                    var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"),
                        extra = defaultExtra || (margin === true || value === true ? "margin" : "border");

                    return access(this, function(elem, type, value) {
                        var doc;

                        if (jQuery.isWindow(elem)) {

                            // As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
                            // isn't a whole lot we can do. See pull request at this URL for discussion:
                            // https://github.com/jquery/jquery/pull/764
                            return elem.document.documentElement["client" + name];
                        }

                        // Get document width or height
                        if (elem.nodeType === 9) {
                            doc = elem.documentElement;

                            // Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
                            // whichever is greatest
                            // unfortunately, this causes bug #3838 in IE6/8 only,
                            // but there is currently no good, small way to fix it.
                            return Math.max(
                                elem.body["scroll" + name], doc["scroll" + name],
                                elem.body["offset" + name], doc["offset" + name],
                                doc["client" + name]
                            );
                        }

                        return value === undefined ?

                            // Get width or height on the element, requesting but not forcing parseFloat
                            jQuery.css(elem, type, extra) :

                            // Set width or height on the element
                            jQuery.style(elem, type, value, extra);
                    }, type, chainable ? margin : undefined, chainable, null);
                };
            });
    });


    jQuery.fn.extend({

        bind: function(types, data, fn) {
            return this.on(types, null, data, fn);
        },
        unbind: function(types, fn) {
            return this.off(types, null, fn);
        },

        delegate: function(selector, types, data, fn) {
            return this.on(types, selector, data, fn);
        },
        undelegate: function(selector, types, fn) {

            // ( namespace ) or ( selector, types [, fn] )
            return arguments.length === 1 ?
                this.off(selector, "**") :
                this.off(types, selector || "**", fn);
        }
    });

    // The number of elements contained in the matched element set
    jQuery.fn.size = function() {
        return this.length;
    };

    jQuery.fn.andSelf = jQuery.fn.addBack;




    // Register as a named AMD module, since jQuery can be concatenated with other
    // files that may use define, but not via a proper concatenation script that
    // understands anonymous AMD modules. A named AMD is safest and most robust
    // way to register. Lowercase jquery is used because AMD module names are
    // derived from file names, and jQuery is normally delivered in a lowercase
    // file name. Do this after creating the global so that if an AMD module wants
    // to call noConflict to hide this version of jQuery, it will work.

    // Note that for maximum portability, libraries that are not jQuery should
    // declare themselves as anonymous modules, and avoid setting a global if an
    // AMD loader is present. jQuery is a special case. For more information, see
    // https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

    if (typeof define === "function" && define.amd) {
        define("jquery", [], function() {
            return jQuery;
        });
    }



    var

        // Map over jQuery in case of overwrite
        _jQuery = window.jQuery,

        // Map over the $ in case of overwrite
        _$ = window.$;

    jQuery.noConflict = function(deep) {
        if (window.$ === jQuery) {
            window.$ = _$;
        }

        if (deep && window.jQuery === jQuery) {
            window.jQuery = _jQuery;
        }

        return jQuery;
    };

    // Expose jQuery and $ identifiers, even in
    // AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
    // and CommonJS for browser emulators (#13566)
    if (!noGlobal) {
        window.jQuery = window.$ = jQuery;
    }

    return jQuery;
}));

jQuery.uaMatch = function(ua) {
    ua = ua.toLowerCase();

    var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
        /(webkit)[ \/]([\w.]+)/.exec(ua) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
        /(msie) ([\w.]+)/.exec(ua) ||
        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];

    return {
        browser: match[1] || "",
        version: match[2] || "0"
    };
};

// Don't clobber any existing jQuery.browser in case it's different
if (!jQuery.browser) {
    matched = jQuery.uaMatch(navigator.userAgent);
    browser = {};

    if (matched.browser) {
        browser[matched.browser] = true;
        browser.version = matched.version;
    }

    // Chrome is Webkit, but Webkit is also Safari.
    if (browser.chrome) {
        browser.webkit = true;
    } else if (browser.webkit) {
        browser.safari = true;
    }

    jQuery.browser = browser;
}

/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */
(function(factory) {
    "use strict";

    if (typeof module === "object" && module.exports) {
        module.exports = factory();
    } else {
        var g = window.Granite = window.Granite || {};
        g.Sling = factory();
    }
}(function() {
    "use strict";

    /**
     * A helper class providing a set of Sling-related utilities.
     * @static
     * @singleton
     * @class Granite.Sling
     */
    return {
        /**
         * The selector for infinite hierarchy depth when retrieving repository content.
         * @static
         * @final
         * @type String
         */
        SELECTOR_INFINITY: ".infinity",

        /**
         * The parameter name for the used character set.
         * @static
         * @final
         * @type String
         */
        CHARSET: "_charset_",

        /**
         * The parameter name for the status.
         * @static
         * @final
         * @type String
         */
        STATUS: ":status",

        /**
         * The parameter value for the status type "browser".
         * @static
         * @final
         * @type String
         */
        STATUS_BROWSER: "browser",

        /**
         * The parameter name for the operation.
         * @static
         * @final
         * @type String
         */
        OPERATION: ":operation",

        /**
         * The parameter value for the delete operation.
         * @static
         * @final
         * @type String
         */
        OPERATION_DELETE: "delete",

        /**
         * The parameter value for the move operation.
         * @static
         * @final
         * @type String
         */
        OPERATION_MOVE: "move",

        /**
         * The parameter name suffix for deleting.
         * @static
         * @final
         * @type String
         */
        DELETE_SUFFIX: "@Delete",

        /**
         * The parameter name suffix for setting a type hint.
         * @static
         * @final
         * @type String
         */
        TYPEHINT_SUFFIX: "@TypeHint",

        /**
         * The parameter name suffix for copying.
         * @static
         * @final
         * @type String
         */
        COPY_SUFFIX: "@CopyFrom",

        /**
         * The parameter name suffix for moving.
         * @static
         * @final
         * @type String
         */
        MOVE_SUFFIX: "@MoveFrom",

        /**
         * The parameter name for the ordering.
         * @static
         * @final
         * @type String
         */
        ORDER: ":order",

        /**
         * The parameter name for the replace flag.
         * @static
         * @final
         * @type String
         */
        REPLACE: ":replace",

        /**
         * The parameter name for the destination flag.
         * @static
         * @final
         * @type String
         */
        DESTINATION: ":dest",

        /**
         * The parameter name for the save parameter prefix.
         * @static
         * @final
         * @type String
         */
        SAVE_PARAM_PREFIX: ":saveParamPrefix",

        /**
         * The parameter name for input fields that should be ignored by Sling.
         * @static
         * @final
         * @type String
         */
        IGNORE_PARAM: ":ignore",

        /**
         * The parameter name for login requests.
         * @static
         * @final
         * @type String
         */
        REQUEST_LOGIN_PARAM: "sling:authRequestLogin",

        /**
         * The login URL.
         * @static
         * @final
         * @type String
         */
        LOGIN_URL: "/system/sling/login.html",

        /**
         * The logout URL.
         * @static
         * @final
         * @type String
         */
        LOGOUT_URL: "/system/sling/logout.html"
    };
}));

/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */
(function(factory) {
    "use strict";

    if (typeof module === "object" && module.exports) {
        module.exports = factory();
    } else {
        var g = window.Granite = window.Granite || {};
        g.Util = factory();
    }
}(function() {
    "use strict";

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray#Polyfill
    var isArray = function(arg) {
        return Object.prototype.toString.call(arg) === "[object Array]";
    };

    /**
     * A helper class providing a set of general utilities.
     * @static
     * @singleton
     * @class Granite.Util
     */
    return {
        /**
         * Replaces occurrences of <code>{n}</code> in the specified text with the texts from the snippets.
         *
         * @example
         * var text = Granite.Util.patchText("{0} has signed in.", "Jack");
         * // text = "Jack has signed in."
         * var text2 = Granite.Util.patchText("{0} {1} has signed in from {2}.", ["Jack", "McFarland", "x.x.x.x"]);
         * // text2 = "Jack McFarland has signed in from x.x.x.x."
         *
         * @param {String} text The text.
         * @param {String|String[]} snippets The text(s) replacing <code>{n}</code>.
         * @returns {String} The patched text.
         */
        patchText: function(text, snippets) {
            if (snippets) {
                if (!isArray(snippets)) {
                    text = text.replace("{0}", snippets);
                } else {
                    for (var i = 0; i < snippets.length; i++) {
                        text = text.replace(("{" + i + "}"), snippets[i]);
                    }
                }
            }
            return text;
        },

        /**
         * Returns the top most accessible window.
         * Check {@link .setIFrameMode} to avoid security exception message on WebKit browsers
         * if this method is called in an iFrame included in a window from different domain.
         *
         * @returns {Window} The top window.
         */
        getTopWindow: function() {
            var win = window;
            if (this.iFrameTopWindow) {
                return this.iFrameTopWindow;
            }
            try {
                // try to access parent
                // win.parent.location.href throws an exception if not authorized (e.g. different location in a portlet)
                while (win.parent && win !== win.parent && win.parent.location.href) {
                    win = win.parent;
                }
            } catch (error) {
                // ignored
            }
            return win;
        },

        /**
         * Allows to define if Granite.Util is running in an iFrame and parent window is in another domain
         * (and optionally define what would be the top window in that case.
         * This is necessary to use {@link .getTopWindow} in a iFrame on WebKit based browsers because
         * {@link .getTopWindow} iterates on parent windows to find the top one which triggers a security exception
         * if one parent window is in a different domain. Exception cannot be caught but is not breaking the JS
         * execution.
         *
         * @param {Window} [topWindow=window] The iFrame top window. Must be running on the same host to avoid
         * security exception.
         */
        setIFrameMode: function(topWindow) {
            this.iFrameTopWindow = topWindow || window;
        },

        /**
         * Applies default properties if non-existent into the base object.
         * Child objects are merged recursively.
         * REMARK:
         *   - objects are recursively merged
         *   - simple type object properties are copied over the base
         *   - arrays are cloned and override the base (no value merging)
         *
         * @param {Object} base The object.
         * @param {...Object} pass The objects to be copied onto the base.
         * @returns {Object} The base object with defaults.
         */
        applyDefaults: function() {
            var override;
            var base = arguments[0] || {};

            for (var i = 1; i < arguments.length; i++) {
                override = arguments[i];

                for (var name in override) {
                    var value = override[name];

                    if (override.hasOwnProperty(name) && value !== undefined) {
                        if (value !== null && typeof value === "object" && !(value instanceof Array)) {
                            // nested object
                            base[name] = this.applyDefaults(base[name], value);
                        } else if (value instanceof Array) {
                            // override array
                            base[name] = value.slice(0);
                        } else {
                            // simple type
                            base[name] = value;
                        }
                    }
                }
            }

            return base;
        },

        /**
         * Returns the keycode from the given event.
         * It is a normalized value over variation of browsers' inconsistencies.
         *
         * @param {UIEvent} event The event.
         * @returns {Number} The keycode.
         */
        getKeyCode: function(event) {
            return event.keyCode ? event.keyCode : event.which;
        }
    };
}));

/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */
/* global CQURLInfo:false, G_XHR_HOOK:false */
/* eslint strict: 0 */
(function(factory) {
    "use strict";

    if (typeof module === "object" && module.exports) {
        module.exports = factory(require("@granite/util"), require("jquery"));
    } else {
        window.Granite.HTTP = factory(Granite.Util, jQuery);
    }
}(function(util, $) {
    /**
     * A helper class providing a set of HTTP-related utilities.
     * @static
     * @singleton
     * @class Granite.HTTP
     */
    return (function() {
        /**
         * The context path used on the server.
         * May only be set by {@link #detectContextPath}.
         * @type String
         */
        var contextPath = null;

        /**
         * The regular expression to detect the context path used
         * on the server using the URL of this script.
         * @readonly
         * @type RegExp
         */
        // eslint-disable-next-line max-len
        var SCRIPT_URL_REGEXP = /^(?:http|https):\/\/[^/]+(\/.*)\/(?:etc\.clientlibs|etc(\/.*)*\/clientlibs|libs(\/.*)*\/clientlibs|apps(\/.*)*\/clientlibs|etc\/designs).*\.js(\?.*)?$/;

        /**
         * The regular expression to match `#` and other non-ASCII characters in a URI.
         * @readonly
         * @type RegExp
         */
        var ENCODE_PATH_REGEXP = /[^\w-.~%:/?[\]@!$&'()*+,;=]/;

        /**
         * The regular expression to parse URI.
         * @readonly
         * @type RegExp
         * @see https://tools.ietf.org/html/rfc3986#appendix-B
         */
        var URI_REGEXP = /^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;

        /**
         * Indicates after a session timeout if a refresh has already been triggered
         * in order to avoid multiple alerts.
         * @type String
         */
        var loginRedirected = false;

        var self = {};

        /**
         * Returns the scheme and authority (userinfo, host, port) components of the given URI;
         * or an empty string if the URI does not have the components.
         *
         * This method assumes the URI is valid.
         *
         * e.g. `scheme://userinfo@host:80/path?query#fragment` -> `scheme://userinfo@host:80`
         *
         * @param {String} uri The URI
         * @returns {String} The scheme and authority components
         */
        self.getSchemeAndAuthority = function(uri) {
            if (!uri) {
                return "";
            }

            var result = URI_REGEXP.exec(uri);

            if (result === null) {
                return "";
            }

            return [result[1], result[3]].join("");
        };

        /**
         * Returns the context path used on the server.
         *
         * @returns {String} The context path
         */
        self.getContextPath = function() {
            // Keep cache of calculated path.
            if (contextPath === null) {
                contextPath = self.detectContextPath();
            }
            return contextPath;
        };

        /**
         * Detects the context path used on the server.
         *
         * @returns {String} The context path
         * @private
         */
        self.detectContextPath = function() {
            try {
                if (window.CQURLInfo) {
                    contextPath = CQURLInfo.contextPath || "";
                } else {
                    var scripts = document.getElementsByTagName("script");
                    for (var i = 0; i < scripts.length; i++) {
                        var result = SCRIPT_URL_REGEXP.exec(scripts[i].src);
                        if (result) {
                            contextPath = result[1];
                            return contextPath;
                        }
                    }
                    contextPath = "";
                }
            } catch (e) {
                // ignored
            }

            return contextPath;
        };

        /**
         * Makes sure the specified relative URL starts with the context path
         * used on the server. If an absolute URL is passed, it will be returned
         * as-is.
         *
         * @param {String} url The URL
         * @returns {String} The externalized URL
         */
        self.externalize = function(url) {
            try {
                if (url.indexOf("/") === 0 && self.getContextPath() && url.indexOf(self.getContextPath() + "/") !== 0) {
                    url = self.getContextPath() + url;
                }
            } catch (e) {
                // ignored
            }
            return url;
        };

        /**
         * Removes scheme, authority and context path from the specified
         * absolute URL if it has the same scheme and authority as the
         * specified document (or the current one). If a relative URL is passed,
         * the context path will be stripped if present.
         *
         * @param {String} url The URL
         * @param {String} doc (optional) The document
         * @returns {String} The internalized URL
         */
        self.internalize = function(url, doc) {
            if (url.charAt(0) === "/") {
                if (contextPath === url) {
                    return "";
                } else if (contextPath && url.indexOf(contextPath + "/") === 0) {
                    return url.substring(contextPath.length);
                } else {
                    return url;
                }
            }

            if (!doc) {
                doc = document;
            }
            var docHost = self.getSchemeAndAuthority(doc.location.href);
            var urlHost = self.getSchemeAndAuthority(url);
            if (docHost === urlHost) {
                return url.substring(urlHost.length + (contextPath ? contextPath.length : 0));
            } else {
                return url;
            }
        };

        /**
         * Removes all parts but the path from the specified URL.
         * <p>Examples:<pre><code>
         /x/y.sel.html?param=abc => /x/y
         </code></pre>
         * <pre><code>
         http://www.day.com/foo/bar.html => /foo/bar
         </code></pre><p>
         *
         * @param {String} url The URL, may be empty. If empty <code>window.location.href</code> is taken.
         * @returns {String} The path
         */
        self.getPath = function(url) {
            if (!url) {
                if (window.CQURLInfo && CQURLInfo.requestPath) {
                    return CQURLInfo.requestPath;
                } else {
                    url = window.location.pathname;
                }
            } else {
                url = self.removeParameters(url);
                url = self.removeAnchor(url);
            }

            url = self.internalize(url);
            var i = url.indexOf(".", url.lastIndexOf("/"));
            if (i !== -1) {
                url = url.substring(0, i);
            }
            return url;
        };

        /**
         * Removes the fragment component from the given URI.
         *
         * This method assumes the URI is valid.
         *
         * e.g. `scheme://userinfo@host:80/path?query#fragment` -> `scheme://userinfo@host:80/path?query`
         *
         * @param {String} uri The URI
         * @returns {String} The URI without fragment component
         */
        self.removeAnchor = function(uri) {
            var fragmentIndex = uri.indexOf("#");
            if (fragmentIndex >= 0) {
                return uri.substring(0, fragmentIndex);
            } else {
                return uri;
            }
        };

        /**
         * Removes the query component and its subsequent fragment component from the given URI.
         * i.e. When query component exists, the subsequent fragment component is also removed.
         * However, when query component doesn't exist, fragment component is not removed.
         *
         * The assumption here is that the usages of `#` before the `?` are intended as part of the path component
         * that need to be encoded separately.
         * This assumption is made because `c.d.cq.commons.jcr.JcrUtil#isValidName` allows `#`.
         *
         * e.g. `scheme://userinfo@host:80/path#with#hash?query#fragment` -> `scheme://userinfo@host:80/path#with#hash`
         *
         * @param {String} uri The URL
         * @returns {String} The URI without the query component and its subsequent fragment component
         */
        self.removeParameters = function(uri) {
            var queryIndex = uri.indexOf("?");
            if (queryIndex >= 0) {
                return uri.substring(0, queryIndex);
            } else {
                return uri;
            }
        };

        /**
         * Encodes the path component of the given URI if it is not already encoded.
         * See {@link #encodePath} for the details of the encoding.
         *
         * e.g. `scheme://userinfo@host:80/path#with#hash?query#fragment`
         * -> `scheme://userinfo@host:80/path%23with%23hash?query#fragment`
         *
         * @param {String} uri The URI to encode
         * @returns {String} The encoded URI
         */
        self.encodePathOfURI = function(uri) {
            var DELIMS = ["?", "#"];

            var parts = [uri];
            var delim;
            for (var i = 0, ln = DELIMS.length; i < ln; i++) {
                delim = DELIMS[i];
                if (uri.indexOf(delim) >= 0) {
                    parts = uri.split(delim);
                    break;
                }
            }

            if (ENCODE_PATH_REGEXP.test(parts[0])) {
                parts[0] = self.encodePath(parts[0]);
            }

            return parts.join(delim);
        };

        /**
         * Encodes the given URI using `encodeURI`.
         *
         * This method is used to encode URI components from the scheme component up to the path component (inclusive).
         * Therefore, `?` and `#` are also encoded in addition.
         *
         * However `[` and `]` are not encoded.
         * The assumption here is that the usages of `[` and `]` are only at the host component (for IPv6),
         * not at the path component.
         * This assumption is made because `c.d.cq.commons.jcr.JcrUtil#isValidName` disallows `[` and `]`.
         *
         * Examples
         *
         * * `scheme://userinfo@host:80/path?query#fragment` -> `scheme://userinfo@host:80/path%3Fquery%23fragment`
         * * `http://[2001:db8:85a3:8d3:1319:8a2e:370:7348]/` -> `http://[2001:db8:85a3:8d3:1319:8a2e:370:7348]/`
         *
         * @param {String} uri The URI to encode
         * @returns {String} The encoded URI
         */
        self.encodePath = function(uri) {
            uri = encodeURI(uri);

            // Decode back `%5B` and `%5D`.
            // The `[` and `]` are not valid characters at the path component and need to be encoded,
            // which `encodeURI` does correctly.
            // However as mentioned in the doc, they are assumed to be used for authority component only.
            uri = uri.replace(/%5B/g, "[").replace(/%5D/g, "]");

            uri = uri.replace(/\?/g, "%3F");
            uri = uri.replace(/#/g, "%23");

            return uri;
        };

        /**
         * Handles login redirection if needed.
         */
        self.handleLoginRedirect = function() {
            if (!loginRedirected) {
                loginRedirected = true;
                alert(Granite.I18n.get("Your request could not be completed because you have been signed out."));

                var l = util.getTopWindow().document.location;
                l.href = self.externalize("/") + "?resource=" + encodeURIComponent(l.pathname + l.search + l.hash);
            }
        };

        /**
         * Gets the XHR hooked URL if called in a portlet context
         *
         * @param {String} url The URL to get
         * @param {String} method The method to use to retrieve the XHR hooked URL
         * @param {Object} params The parameters
         * @returns {String} The XHR hooked URL if available, the provided URL otherwise
         */
        self.getXhrHook = function(url, method, params) {
            method = method || "GET";
            if (window.G_XHR_HOOK && typeof G_XHR_HOOK === "function") {
                var p = {
                    "url": url,
                    "method": method
                };
                if (params) {
                    p["params"] = params;
                }
                return G_XHR_HOOK(p);
            }
            return null;
        };

        /**
         * Evaluates and returns the body of the specified response object.
         * Alternatively, a URL can be specified, in which case it will be
         * requested using a synchornous {@link #get} in order to acquire
         * the response object.
         *
         * @param {Object|String} response The response object or URL
         * @returns {Object} The evaluated response body
         * @since 5.3
         */
        self.eval = function(response) {
            if (typeof response !== "object") {
                response = $.ajax({
                    url: response,
                    type: "get",
                    async: false
                });
            }
            try {
                // support responseText for backward compatibility (pre 5.3)
                // eslint-disable-next-line no-eval
                return eval("(" + (response.body ? response.body :
                    response.responseText) + ")");
            } catch (e) {
                // ignored
            }
            return null;
        };

        return self;
    }());
}));

/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */
(function(factory) {
    "use strict";

    if (typeof module === "object" && module.exports) {
        module.exports = factory(require("@granite/http"));
    } else {
        window.Granite.I18n = factory(window.Granite.HTTP);
    }
}(function(HTTP) {
    "use strict";

    /**
     * A helper class providing a set of utilities related to internationalization (i18n).
     *
     * <h3>Locale Priorities</h3>
     * <p>The locale is read based on the following priorities:</p>
     * <ol>
     *   <li>manually specified locale</li>
     *   <li><code>document.documentElement.lang</code></li>
     *   <li><code>Granite.I18n.LOCALE_DEFAULT</code></li>
     * </ol>
     *
     * <h3>Dictionary Priorities</h3>
     * <p>The dictionary URL is read based on the following priorities:</p>
     * <ol>
     *   <li>manually specified URL (<code>urlPrefix</code, <code>urlSuffix</code>)</li>
     *   <li><code>data-i18n-dictionary-src</code> attribute at &lt;html&gt; element,
     *       which has the type of <a href="http://tools.ietf.org/html/rfc6570">URI Template</a> string</li>
     *   <li>The URL resolved from default <code>urlPrefix</code> and <code>urlSuffix</code></li>
     * </ol>
     *
     * <h3>URI Template of data-i18n-dictionary-src</h3>
     * <p>It expects the variable named <code>locale</code>,
     * which will be fetched from the locale (based on priorities above).
     * E.g. <code>&lt;html lang="en" data-i18n-dictionary-src="/libs/cq/i18n/dict.{+locale}.json"&gt;</code>.</p>
     *
     * @static
     * @class Granite.I18n
     */
    return (function() {
        /**
         * The map where the dictionaries are stored under their locale.
         * @type Object
         */
        var dicts = {};

        /**
         * The prefix for the URL used to request dictionaries from the server.
         * @type String
         */
        var urlPrefix = "/libs/cq/i18n/dict.";

        /**
         * The suffix for the URL used to request dictionaries from the server.
         * @type String
         */
        var urlSuffix = ".json";

        /**
         * The manually specified locale as a String or a function that returns the locale as a string.
         * @type String
         */
        var manualLocale = undefined;

        /**
         * If the current locale represents pseudo translations.
         * In that case the dictionary is expected to provide just a special
         * translation pattern to automatically convert all original strings.
         */
        var pseudoTranslations = false;

        var languages = null;

        var self = {};

        /**
         * Indicates if the dictionary parameters are specified manually.
         */
        var manualDictionary = false;

        var getDictionaryUrl = function(locale) {
            if (manualDictionary) {
                return urlPrefix + locale + urlSuffix;
            }

            var dictionarySrc;
            var htmlEl = document.querySelector("html");
            if (htmlEl) {
                dictionarySrc = htmlEl.getAttribute("data-i18n-dictionary-src");
            }

            if (!dictionarySrc) {
                return urlPrefix + locale + urlSuffix;
            }

            // dictionarySrc is a URITemplate
            // Use simple string replacement for now; for more complicated scenario, please use Granite.URITemplate
            return dictionarySrc.replace("{locale}", encodeURIComponent(locale)).replace("{+locale}", locale);
        };

        var patchText = function(text, snippets) {
            if (snippets) {
                if (Array.isArray(snippets)) {
                    for (var i = 0; i < snippets.length; i++) {
                        text = text.replace("{" + i + "}", snippets[i]);
                    }
                } else {
                    text = text.replace("{0}", snippets);
                }
            }
            return text;
        };

        /**
         * The default locale (en).
         * @readonly
         * @type String
         */
        self.LOCALE_DEFAULT = "en";

        /**
         * The language code for pseudo translations.
         * @readonly
         * @type String
         */
        self.PSEUDO_LANGUAGE = "zz";

        /**
         * The dictionary key for pseudo translation pattern.
         * @readonly
         * @type String
         */
        self.PSEUDO_PATTERN_KEY = "_pseudoPattern_";

        /**
         * Initializes I18n with the given config options:
         * <ul>
         * <li>locale: the current locale (defaults to "en")</li>
         * <li>urlPrefix: the prefix for the URL used to request dictionaries from
         * the server (defaults to "/libs/cq/i18n/dict.")</li>
         * <li>urlSuffix: the suffix for the URL used to request dictionaries from
         * the server (defaults to ".json")</li>
         * </ul>
         * Sample config. The dictioniary would be requested from
         * "/apps/i18n/dict.fr.json":
         <code><pre>{
         "locale": "fr",
         "urlPrefix": "/apps/i18n/dict.",
         "urlSuffix": ".json"
         }</pre></code>
         *
         * @param {Object} config The config
         */
        self.init = function(config) {
            config = config || {};

            this.setLocale(config.locale);
            this.setUrlPrefix(config.urlPrefix);
            this.setUrlSuffix(config.urlSuffix);
        };

        /**
         * Sets the current locale.
         *
         * @param {String|Function} locale The locale or a function that returns the locale as a string
         */
        self.setLocale = function(locale) {
            if (!locale) {
                return;
            }
            manualLocale = locale;
        };

        /**
         * Returns the current locale based on the priorities.
         *
         * @returns {String} The locale
         */
        self.getLocale = function() {
            if (typeof manualLocale === "function") {
                // execute function first time only and store result in currentLocale
                manualLocale = manualLocale();
            }
            return manualLocale || document.documentElement.lang || self.LOCALE_DEFAULT;
        };

        /**
         * Sets the prefix for the URL used to request dictionaries from
         * the server. The locale and URL suffix will be appended.
         *
         * @param {String} prefix The URL prefix
         */
        self.setUrlPrefix = function(prefix) {
            if (!prefix) {
                return;
            }
            urlPrefix = prefix;
            manualDictionary = true;
        };

        /**
         * Sets the suffix for the URL used to request dictionaries from
         * the server. It will be appended to the URL prefix and locale.
         *
         * @param {String} suffix The URL suffix
         */
        self.setUrlSuffix = function(suffix) {
            if (!suffix) {
                return;
            }
            urlSuffix = suffix;
            manualDictionary = true;
        };

        /**
         * Returns the dictionary for the specified locale. This method
         * will request the dictionary using the URL prefix, the locale,
         * and the URL suffix. If no locale is specified, the current
         * locale is used.
         *
         * @param {String} locale (optional) The locale
         * @returns {Object} The dictionary
         */
        self.getDictionary = function(locale) {
            locale = locale || self.getLocale();

            if (!dicts[locale]) {
                pseudoTranslations = locale.indexOf(self.PSEUDO_LANGUAGE) === 0;

                try {
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", HTTP.externalize(getDictionaryUrl(locale)), false);
                    xhr.send();

                    dicts[locale] = JSON.parse(xhr.responseText);
                } catch (e) {
                    // ignored
                }
                if (!dicts[locale]) {
                    dicts[locale] = {};
                }
            }
            return dicts[locale];
        };

        /**
         * Translates the specified text into the current language.
         *
         * @param {String} text The text to translate
         * @param {String[]} snippets The snippets replacing <code>{n}</code> (optional)
         * @param {String} note A hint for translators (optional)
         * @returns {String} The translated text
         */
        self.get = function(text, snippets, note) {
            var dict;
            var newText;
            var lookupText;

            dict = self.getDictionary();

            // note that pseudoTranslations is initialized in the getDictionary() call above
            lookupText = pseudoTranslations ? self.PSEUDO_PATTERN_KEY :
                note ? text + " ((" + note + "))" :
                text;
            if (dict) {
                newText = dict[lookupText];
            }
            if (!newText) {
                newText = text;
            }
            if (pseudoTranslations) {
                newText = newText.replace("{string}", text).replace("{comment}", note ? note : "");
            }
            return patchText(newText, snippets);
        };

        /**
         * Translates the specified text into the current language. Use this
         * method to translate String variables, e.g. data from the server.
         *
         * @param {String} text The text to translate
         * @param {String} note A hint for translators (optional)
         * @returns {String} The translated text
         */
        self.getVar = function(text, note) {
            if (!text) {
                return null;
            }
            return self.get(text, null, note);
        };

        /**
         * Returns the available languages, including a "title" property with a display name:
         * for instance "German" for "de" or "German (Switzerland)" for "de_ch".
         *
         * @returns {Object} An object with language codes as keys and an object with "title",
         *                  "language", "country" and "defaultCountry" members.
         */
        self.getLanguages = function() {
            if (!languages) {
                try {
                    // use overlay servlet so customers can define /apps/wcm/core/resources/languages
                    // TODO: broken!!!
                    var url = HTTP.externalize("/libs/wcm/core/resources/languages.overlay.infinity.json");
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", url, false);
                    xhr.send();

                    var json = JSON.parse(xhr.responseText);

                    Object.keys(json).forEach(function(prop) {
                        var lang = json[prop];
                        if (lang.language) {
                            lang.title = self.getVar(lang.language);
                        }
                        if (lang.title && lang.country && lang.country !== "*") {
                            lang.title += " (" + self.getVar(lang.country) + ")";
                        }
                    });
                    languages = json;
                } catch (e) {
                    languages = {};
                }
            }
            return languages;
        };

        /**
         * Parses a language code string such as "de_CH" and returns an object with
         * language and country extracted. The delimiter can be "_" or "-".
         *
         * @param {String} langCode a language code such as "de" or "de_CH" or "de-ch"
         * @returns {Object} an object with "code" ("de_CH"), "language" ("de") and "country" ("CH")
         *                  (or null if langCode was null)
         */
        self.parseLocale = function(langCode) {
            if (!langCode) {
                return null;
            }
            var pos = langCode.indexOf("_");
            if (pos < 0) {
                pos = langCode.indexOf("-");
            }

            var language;
            var country;
            if (pos < 0) {
                language = langCode;
                country = null;
            } else {
                language = langCode.substring(0, pos);
                country = langCode.substring(pos + 1);
            }
            return {
                code: langCode,
                language: language,
                country: country
            };
        };

        return self;
    }());
}));

/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */
(function(factory) {
    "use strict";

    if (typeof module === "object" && module.exports) {
        module.exports = factory(require("jquery"));
    } else {
        var g = window.Granite = window.Granite || {};
        g.TouchIndicator = factory(window.jQuery);
    }
}(function($) {
    "use strict";

    var CSS = {
        "visibility": "hidden",
        // fixed would be better, but flickers on ipad while scrolling
        "position": "absolute",
        "width": "30px",
        "height": "30px",
        "-webkit-border-radius": "20px",
        "border-radius": "20px",
        "border": "5px solid orange",
        "-webkit-user-select": "none",
        "user-select": "none",
        "opacity": "0.5",
        "z-index": "2000",
        "pointer-events": "none"
    };

    var used = {};

    var unused = [];

    /**
     * Implements the "Adobe Dynamic Touch Indicator" that tracks touch events and displays a visual indicator for
     * screen sharing and presentation purposes.
     *
     * To enable it, call <code>Granite.TouchIndicator.init()</code> e.g. on document ready:
     * <pre><code>
     * Granite.$(document).ready(function() {
     *     Granite.TouchIndicator.init();
     * });
     * </code></pre>
     *
     * AdobePatentID="2631US01"
     */
    return {
        debugWithMouse: false,

        init: function() {
            var self = this;
            var NS = ".touchindicator";

            $(document).on("touchstart" + NS + "touchmove" + NS + "touchend" + NS, function(e) {
                var touches = e.originalEvent.touches;
                self.update(touches);
                return true;
            });

            if (this.debugWithMouse) {
                $(document).on("mousemove" + NS, function(e) {
                    e.identifer = "fake";
                    self.update([e]);
                    return true;
                });
            }
        },

        update: function(touches) {
            // go over all touch events present in the array
            var retained = {};
            for (var i = 0; i < touches.length; i++) {
                var touch = touches[i];
                var id = touch.identifier;

                // check if we already have a indicator with the correct id
                var indicator = used[id];
                if (!indicator) {
                    // if not, check if we have an unused one
                    indicator = unused.pop();

                    // if not, create a new one and append it to the dom
                    if (!indicator) {
                        indicator = $(document.createElement("div")).css(CSS);
                        $("body").append(indicator);
                    }
                }

                retained[id] = indicator;
                indicator.offset({
                    left: touch.pageX - 20,
                    top: touch.pageY - 20
                });
                indicator.css("visibility", "visible");
            }

            // now hide all unused ones and stuff them in the unused array
            for (id in used) {
                if (used.hasOwnProperty(id) && !retained[id]) {
                    indicator = used[id];
                    indicator.css("visibility", "hidden");
                    unused.push(indicator);
                }
            }
            used = retained;
        }
    };
}));

/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */
(function(factory) {
    "use strict";

    if (typeof module === "object" && module.exports) {
        module.exports = factory();
    } else {
        var g = window.Granite = window.Granite || {};
        g.OptOutUtil = factory();
    }
}(function($) {
    "use strict";

    function trim(s) {
        if (String.prototype.trim) {
            return s.trim();
        }
        return s.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
    }

    /**
     * A library to determine whether any opt-out cookie is set and whether a given cookie name is white-listed.
     *
     * The opt-out and white-list cookie names are determined by a server-side configuration
     * (<code>com.adobe.granite.security.commons.OptOutService</code>) and provided to this tool by an optionally
     * included component (<code>/libs/granite/security/components/optout</code>) which provides a global JSON object
     * named <code>GraniteOptOutConfig</code>.
     *
     * @static
     * @class Granite.OptOutUtil
     */
    return (function() {

        var self = {};

        /**
         * The names of cookies the presence of which indicates the user has opted out.
         * @type String[]
         */
        var optOutCookieNames = [];

        /**
         * The names of cookies which may still be set in spite of the user having opted out.
         * @type String[]
         */
        var whitelistedCookieNames = [];

        /**
         * Initializes this tool with an opt-out configuration.
         *
         * The following options are supported:
         * <ul>
         *     <li>cookieNames: an array of cookie names representing opt-out cookies. Defaults to empty.</li>
         *     <li>whitelistCookieNames: an array of cookies representing white-listed cookies. Defaults to empty.</li>
         * </ul>
         *
         * @param {Object} config The opt-out configuration.
         *
         * @example
         * {
         *     "cookieNames": ["omniture_optout","cq-opt-out"],
         *     "whitelistCookieNames": ["someAppCookie", "anotherImportantAppCookie"]
         * }
         */
        self.init = function(config) {
            if (config) {
                optOutCookieNames = config.cookieNames || [];
                whitelistedCookieNames = config.whitelistCookieNames || [];
            } else {
                optOutCookieNames = [];
                whitelistedCookieNames = [];
            }
        };

        /**
         * Returns the array of configured cookie names representing opt-out cookies.
         *
         * @returns {String[]} The cookie names.
         */
        self.getCookieNames = function() {
            return optOutCookieNames;
        };

        /**
         * Returns the array of configured cookie names representing white-listed cookies.
         *
         * @returns {String[]} The cookie names.
         */
        self.getWhitelistCookieNames = function() {
            return whitelistedCookieNames;
        };

        /**
         * Determines whether the user (browser) has elected to opt-out.
         * This is indicated by the presence of one of the cookies retrieved through {@link #getCookieNames()}.
         *
         * @returns {Boolean} <code>true</code> if an opt-cookie was found in the browser's cookies;
         *     <code>false</code> otherwise.
         */
        self.isOptedOut = function() {
            var browserCookies = document.cookie.split(";");
            for (var i = 0; i < browserCookies.length; i++) {
                var cookie = browserCookies[i];
                var cookieName = trim(cookie.split("=")[0]);
                if (self.getCookieNames().indexOf(cookieName) >= 0) {
                    return true;
                }
            }
            return false;
        };

        /**
         * Determines whether the given <code>cookieName</code> may be used to set a cookie.
         * This is the case if either opt-out is inactive (<code>{@link #isOptedOut()} === false</code>) or it is
         * active and the give cookie name was found in the white-list ({@link #getWhitelistCookieNames()}).
         *
         * @param {String} cookieName The name of the cookie to check.
         * @returns {Boolean} <code>true</code> if a cookie of this name may be used with respect to the opt-out status;
         *     <code>false</code> otherwise.
         */
        self.maySetCookie = function(cookieName) {
            return !(self.isOptedOut() && self.getWhitelistCookieNames().indexOf(cookieName) === -1);
        };

        return self;
    }());
}));

/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */


//------------------------------------------------------------------------------
// Initialize the Granite utils library

Granite.OptOutUtil.init(window.GraniteOptOutConfig);
Granite.HTTP.detectContextPath();

/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */
/* global G_IS_HOOKED:false */
(function($, window) {
    "use strict";

    var http;

    window.Granite = window.Granite || {};
    window.Granite.$ = window.Granite.$ || $;

    // for deprecated "shared" support (GRANITE-1602)
    window._g = window._g || {};
    window._g.$ = window._g.$ || $;

    http = Granite.HTTP;

    // necessary global modifications for ajax calls
    $.ajaxSetup({
        externalize: true,
        encodePath: true,
        hook: true,
        beforeSend: function(jqXHR, s) {
            // s: settings provided by the ajax call or default values
            if (typeof G_IS_HOOKED === "undefined" || !G_IS_HOOKED(s.url)) {
                if (s.externalize) {
                    s.url = http.externalize(s.url);
                }
                if (s.encodePath) {
                    s.url = http.encodePathOfURI(s.url);
                }
            }
            if (s.hook) {
                // portlet XHR hook
                var hook = http.getXhrHook(s.url, s.type, s.data);
                if (hook) {
                    s.url = hook.url;
                    if (hook.params) {
                        if (s.type.toUpperCase() === "GET") {
                            s.url += "?" + $.param(hook.params);
                        } else {
                            s.data = $.param(hook.params);
                        }
                    }
                }
            }
        },
        statusCode: {
            403: function(jqXHR) {
                if (jqXHR.getResponseHeader("X-Reason") === "Authentication Failed") {
                    http.handleLoginRedirect();
                }
            }
        }
    });

    $.ajaxSettings.traditional = true;
}(jQuery, this));

/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2015 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */
(function(factory) {
    "use strict";

    // GRANITE-22281 Check for multiple initialization
    if (window.Granite.csrf) {
        return;
    }

    window.Granite.csrf = factory(window.Granite.HTTP);
}(function(http) {
    "use strict";

    // AdobePatentID="P5296"

    function Promise() {
        this._handler = [];
    }

    Promise.prototype = {
        then: function(resolveFn, rejectFn) {
            this._handler.push({
                resolve: resolveFn,
                reject: rejectFn
            });
        },
        resolve: function() {
            this._execute("resolve", arguments);
        },
        reject: function() {
            this._execute("reject", arguments);
        },
        _execute: function(result, args) {
            if (this._handler === null) {
                throw new Error("Promise already completed.");
            }

            for (var i = 0, ln = this._handler.length; i < ln; i++) {
                this._handler[i][result].apply(window, args);
            }

            this.then = function(resolveFn, rejectFn) {
                (result === "resolve" ? resolveFn : rejectFn).apply(window, args);
            };

            this._handler = null;
        }
    };

    function verifySameOrigin(url) {
        // url could be relative or scheme relative or absolute
        // host + port
        var host = document.location.host;
        var protocol = document.location.protocol;
        var relativeOrigin = "//" + host;
        var origin = protocol + relativeOrigin;

        // Allow absolute or scheme relative URLs to same origin
        return (url === origin || url.slice(0, origin.length + 1) === origin + "/") ||
            (url === relativeOrigin || url.slice(0, relativeOrigin.length + 1) === relativeOrigin + "/") ||
            // or any other URL that isn't scheme relative or absolute i.e relative.
            !(/^(\/\/|http:|https:).*/.test(url));
    }

    var FIELD_NAME = ":cq_csrf_token";
    var HEADER_NAME = "CSRF-Token";
    var TOKEN_SERVLET = http.externalize("/libs/granite/csrf/token.json");

    var promise;
    var globalToken;

    function logFailRequest(error) {
        if (window.console) {
            // eslint-disable-next-line no-console
            console.warn("CSRF data not available;" +
                "The data may be unavailable by design, such as during non-authenticated requests: " + error);
        }
    }

    function getToken() {
        var localPromise = new Promise();
        promise = localPromise;

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                try {
                    var data = JSON.parse(xhr.responseText);
                    globalToken = data.token;
                    localPromise.resolve(globalToken);
                } catch (ex) {
                    logFailRequest(ex);
                    localPromise.reject(xhr.responseText);
                }
            }
        };
        xhr.open("GET", TOKEN_SERVLET, true);
        xhr.send();

        return localPromise;
    }

    function getTokenSync() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", TOKEN_SERVLET, false);
        xhr.send();

        try {
            return globalToken = JSON.parse(xhr.responseText).token;
        } catch (ex) {
            logFailRequest(ex);
        }
    }

    function clearToken() {
        globalToken = undefined;
        getToken();
    }

    function addField(form) {
        var action = form.getAttribute("action");
        if (form.method.toUpperCase() === "GET" || (action && !verifySameOrigin(action))) {
            return;
        }

        if (!globalToken) {
            getTokenSync();
        }

        if (!globalToken) {
            return;
        }

        var input = form.querySelector('input[name="' + FIELD_NAME + '"]');

        if (!input) {
            input = document.createElement("input");
            input.setAttribute("type", "hidden");
            input.setAttribute("name", FIELD_NAME);
            form.appendChild(input);
        }

        input.setAttribute("value", globalToken);
    }

    function handleForm(document) {
        var handler = function(ev) {
            var t = ev.target;

            if (t.nodeName === "FORM") {
                addField(t);
            }
        };

        if (document.addEventListener) {
            document.addEventListener("submit", handler, true);
        } else if (document.attachEvent) {
            document.attachEvent("submit", handler);
        }
    }

    handleForm(document);

    var open = XMLHttpRequest.prototype.open;

    XMLHttpRequest.prototype.open = function(method, url, async) {
        if (method.toLowerCase() !== "get" && verifySameOrigin(url)) {
            this._csrf = true;
            this._async = async;
        }

        return open.apply(this, arguments);
    };

    var send = XMLHttpRequest.prototype.send;

    XMLHttpRequest.prototype.send = function() {
        if (!this._csrf) {
            send.apply(this, arguments);
            return;
        }

        if (globalToken) {
            this.setRequestHeader(HEADER_NAME, globalToken);
            send.apply(this, arguments);
            return;
        }

        if (this._async === false) {
            getTokenSync();

            if (globalToken) {
                this.setRequestHeader(HEADER_NAME, globalToken);
            }

            send.apply(this, arguments);
            return;
        }

        var self = this;
        var args = Array.prototype.slice.call(arguments);

        promise.then(function(token) {
            self.setRequestHeader(HEADER_NAME, token);
            send.apply(self, args);
        }, function() {
            send.apply(self, args);
        });
    };

    var submit = HTMLFormElement.prototype.submit;

    HTMLFormElement.prototype.submit = function() {
        addField(this);
        return submit.apply(this, arguments);
    };

    if (window.Node) {
        var ac = Node.prototype.appendChild;

        Node.prototype.appendChild = function() {
            var result = ac.apply(this, arguments);

            if (result.nodeName === "IFRAME") {
                try {
                    if (result.contentWindow && !result._csrf) {
                        result._csrf = true;
                        handleForm(result.contentWindow.document);
                    }
                } catch (ex) {
                    if (result.src && result.src.length && verifySameOrigin(result.src)) {
                        if (window.console) {
                            // eslint-disable-next-line no-console
                            console.error("Unable to attach CSRF token to an iframe element on the same origin");
                        }
                    }

                    // Potential error: Access is Denied
                    // we can safely ignore CORS security errors here
                    // because we do not want to expose the csrf anyways to another domain
                }
            }

            return result;
        };
    }

    // refreshing csrf token periodically
    getToken();

    setInterval(function() {
        getToken();
    }, 300000);

    return {
        initialised: false,
        refreshToken: getToken,
        _clearToken: clearToken
    };
}));

/*
 * Copyright 1997-2010 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

// map $CQ to Granite jQuery
window.$CQ = _g.$;


/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

/**
 * The <code>_g</code> library contains all Granite component classes and utilities.
 * @static
 * @granite-class _g
 */
window._g = window._g || {};

// namespace
_g.shared = {};

// debug console
if (window.console === undefined) {
    window.console = {
        log: function(m) {}
    };
}

/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

/**
 * A helper class providing a set of HTTP-related utilities.
 * @static
 * @singleton
 * @class CQ.shared.HTTP
 * @deprecated use Granite.HTTP and Granite.$#ajax instead
 */
_g.shared.HTTP = new function() {
    /**
     * Creates an empty response object.
     * @private
     * @static
     * @return {Object} The response object
     */
    var createResponse = function() {
        var response = new Object();
        response.headers = new Object();
        response.body = new Object();
        return response;
    };

    var getResponseFromXhr = function(request) {
        if (!request) return null;
        var response = createResponse();
        response.body = request.responseText;
        response.headers[_g.HTTP.HEADER_STATUS] = request.status;
        // set properties for backward compatibility (pre 5.3)
        response.responseText = request.responseText;
        response.status = request.status;
        return response;
    };

    return {
        /**
         * The extension for HTML files.
         * @static
         * @final
         * @type String
         */
        EXTENSION_HTML: ".html",

        /**
         * The extension for JSON files.
         * @static
         * @final
         * @type String
         */
        EXTENSION_JSON: ".json",

        /**
         * The extension for resources.
         * @private
         * @static
         * @final
         * @type String
         */
        EXTENSION_RES: ".res",

        /**
         * The Status header.
         * @static
         * @final
         * @type String
         */
        HEADER_STATUS: "Status",

        /**
         * The Message header.
         * @static
         * @final
         * @type String
         */
        HEADER_MESSAGE: "Message",

        /**
         * The Location header.
         * @static
         * @final
         * @type String
         */
        HEADER_LOCATION: "Location",

        /**
         * The Path header.
         * @static
         * @final
         * @type String
         */
        HEADER_PATH: "Path",

        /**
         * The parameter name for no caching.
         * @static
         * @final
         * @type String
         */
        PARAM_NO_CACHE: "cq_ck",

        /**
         * Requests the specified URL from the server using GET. The request
         * will be synchronous, unless a callback function is specified.
         * @static
         * @param {String} url The URL to request
         * @param {Function} callback (optional) The callback function which is
         *        called regardless of success or failure and is passed the following
         *        parameters:<ul>
         *        <li><b>options</b> : Object<div class="sub-desc">The parameter to the request call.</div></li>
         *        <li><b>success</b> : Boolean<div class="sub-desc">True if the request succeeded.</div></li>
         *        <li><b>response</b> : Object<div class="sub-desc">The response object.</div></li>
         *        </ul>
         * @param {Object} scope The scope for the callback (optional)
         * @param {Boolean} suppressForbiddenCheck Suppress the check if the session has timed out (optional)
         * @return {Mixed} The response object or, if the
         *         request is asynchronous, the transaction ID
         */
        get: function(url, callback, scope, suppressForbiddenCheck) {
            url = _g.HTTP.getXhrHookedURL(_g.HTTP.externalize(url, true));

            if (callback != undefined) {
                return _g.$.ajax({
                    type: "GET",
                    url: url,
                    externalize: false,
                    encodePath: false,
                    hook: false,
                    complete: function(request, textStatus) {
                        var response = getResponseFromXhr(request);
                        if (!suppressForbiddenCheck) _g.HTTP.handleForbidden(response);
                        callback.call(scope || this,
                            this,
                            textStatus == "success",
                            response);
                    }
                });
            } else {
                try {
                    var request = _g.$.ajax({
                        type: "GET",
                        url: url,
                        async: false,
                        externalize: false,
                        encodePath: false,
                        hook: false
                    });
                    var response = getResponseFromXhr(request);
                    if (!suppressForbiddenCheck) _g.HTTP.handleForbidden(response);
                    return response;
                } catch (e) {
                    return null;
                }
            }
        },

        /**
         * Requests the specified URL from the server using POST. The request
         * will be synchronous, unless a callback function is specified.
         * The returned response object looks like this:
         * <pre><code>{ headers: { "Status": 200, ... } }</code></pre>
         * See constants above for all supported headers.
         * @static
         * @param {String} url The URL to request
         * @param {Function} callback (optional) The callback function which is
         *        called regardless of success or failure and is passed the following
         *        parameters:<ul>
         *        <li><b>options</b> : Object<div class="sub-desc">The parameter to the request call.</div></li>
         *        <li><b>success</b> : Boolean<div class="sub-desc">True if the request succeeded.</div></li>
         *        <li><b>xhr</b> : Object<div class="sub-desc">The XMLHttpRequest object containing the response data.
         *        See <a href="http://www.w3.org/TR/XMLHttpRequest/">http://www.w3.org/TR/XMLHttpRequest/</a> for details about
         *        accessing elements of the response.</div></li>
         *        <li><b>response</b> : Object<div class="sub-desc">The response object.<br>
         *        <i>Added in CQ 5.3</i></div></li>
         *        </ul>
         * @param {Object} params The parameters
         * @param {Object} scope The scope for the callback
         * @param {Boolean} suppressErrorMsg Suppress the error msg notification
         * @param {Boolean} suppressForbiddenCheck Suppress the check if the session has timed out (optional)
         * @return {Mixed} The response object or, if the request is
         *         asynchronous, the transaction ID
         */
        post: function(url, callback, params, scope, suppressErrorMsg, suppressForbiddenCheck) {
            url = _g.HTTP.externalize(url, true);

            var hook = _g.HTTP.getXhrHook(url, "POST", params);
            if (hook) {
                url = hook.url;
                params = hook.params;
            }

            if (callback != undefined) {
                return _g.$.ajax({
                    type: "POST",
                    url: url,
                    data: params,
                    externalize: false,
                    encodePath: false,
                    hook: false,
                    complete: function(request, textStatus) {
                        var response = _g.HTTP.buildPostResponseFromHTML(request.responseText);
                        if (!suppressForbiddenCheck) _g.HTTP.handleForbidden(request);
                        callback.call(scope || this,
                            this,
                            textStatus == "success",
                            response);
                    }
                });
            } else {
                try {
                    var request = _g.$.ajax({
                        type: "POST",
                        url: url,
                        data: params,
                        async: false,
                        externalize: false,
                        encodePath: false,
                        hook: false
                    });
                    var response = _g.HTTP.buildPostResponseFromHTML(request.responseText);
                    if (!suppressForbiddenCheck) _g.HTTP.handleForbidden(request);
                    return response;
                } catch (e) {
                    return null;
                }
            }
        },

        /**
         * Returns the value of the parameter with the specified name
         * in the URL. Only the first value will be considered.
         * Values will be URL-decoded.
         * @static
         * @param {String} url The URL
         * @param {String} name The name of the parameter
         * @return {String} The value
         */
        getParameter: function(url, name) {
            var params = _g.HTTP.getParameters(url, name);
            return params != null ? params[0] : null;
        },

        /**
         * Returns the values of the parameters with the specified name
         * in the URL. Values will be URL-decoded.
         * @static
         * @param {String} url The URL
         * @param {String} name The name of the parameter
         * @return {String[]} The values
         */
        getParameters: function(url, name) {
            var values = [];
            if (!name) {
                return null;
            }
            name = encodeURIComponent(name);
            if (url.indexOf("?") == -1) {
                return null;
            }
            if (url.indexOf("#") != -1) {
                url = url.substring(0, url.indexOf("#"));
            }
            var query = url.substring(url.indexOf("?") + 1);
            if (query.indexOf(name) == -1) {
                return null;
            }
            var queryPts = query.split("&");
            for (var i = 0; i < queryPts.length; i++) {
                var paramPts = queryPts[i].split("=");
                if (paramPts[0] == name) {
                    values.push(paramPts.length > 1 ? decodeURIComponent(paramPts[1]) : "");
                }
            }
            return values.length > 0 ? values : null;
        },

        /**
         * Adds a parameter to the specified URL. The parameter name and
         * value will be URL-endcoded.
         * @static
         * @param {String} url The URL
         * @param {String} name The name of the parameter
         * @param {String/String[]} value The value of the parameter.
         *        Since 5.3, an array of strings can be passed
         * @return {String} The URL with the new parameter
         */
        addParameter: function(url, name, value) {
            if (value && value instanceof Array) {
                for (var i = 0; i < value.length; i++) {
                    url = _g.HTTP.addParameter(url, name, value[i]);
                }
                return url;
            }
            var separator = url.indexOf("?") == -1 ? "?" : "&";
            var hashIdx = url.indexOf("#");
            if (hashIdx < 0) {
                return url + separator + encodeURIComponent(name) + "=" + encodeURIComponent(value);
            } else {
                var hash = url.substring(hashIdx);
                url = url.substring(0, hashIdx);
                return url + separator + encodeURIComponent(name) + "=" + encodeURIComponent(value) + hash;
            }
        },

        /**
         * Overwrites a parameter in the specified URL. The parameter name
         * and value will be URL-endcoded.
         * @static
         * @param {String} url The URL
         * @param {String} name The name of the parameter
         * @param {String} value The value of the parameter
         * @return {String} The URL with the new parameter
         */
        setParameter: function(url, name, value) {
            url = _g.HTTP.removeParameter(url, name);
            return _g.HTTP.addParameter(url, name, value);
        },

        /**
         * Removes a parameter from the specified URL.
         * @static
         * @param {String} url The URL
         * @param {String} name The name of the parameter to remove
         * @return {String} The URL without the parameter
         */
        removeParameter: function(url, name) {
            var pattern0 = "?" + encodeURIComponent(name) + "=";
            var pattern1 = "&" + encodeURIComponent(name) + "=";
            var pattern;
            if (url.indexOf(pattern0) != -1) {
                pattern = pattern0;
            } else if (url.indexOf(pattern1) != -1) {
                pattern = pattern1;
            } else {
                return url;
            }

            var indexCutStart = url.indexOf(pattern);
            var begin = url.substring(0, indexCutStart);

            var indexCutEnd = url.indexOf("&", indexCutStart + 1);
            var end = "";
            if (indexCutEnd != -1) {
                end = url.substring(indexCutEnd);
                if (end.indexOf("&") == 0) {
                    end = end.replace("&", "?");
                }
            }
            return begin + end;
        },

        /**
         * Removes all parameter from the specified URL.
         * @static
         * @param {String} url The URL
         * @return {String} The URL without parameters
         */
        removeParameters: Granite.HTTP.removeParameters,

        /**
         * Adds the specified selector to an URL.
         * @param {String} url The URL. The URL must contain a extension and
         *                 must not contain a suffix (x.json/a/b). Anchor and
         *                 request parameters are supported.
         * @param {String} selector The name of the selector to insert
         * @param {Number} index (optional) The index of the selector. If it is "-1"
         *                 or bigger than the number of the existing selectors
         *                 the selector will be appended. Defaults to "0".
         * @return {String} The updated URL
         * @since 5.3
         */
        addSelector: function(url, selector, index) {
            if (!index) index = 0;

            // url:  /x/y.z.json?a=1#b
            // post: ?a=1#b
            // path: /x
            // main: y.z.json
            var post = ""; // string of parameters and anchor
            var pIndex = url.indexOf("?");
            if (pIndex == -1) pIndex = url.indexOf("#");
            if (pIndex != -1) {
                post = url.substring(pIndex);
                url = url.substring(0, pIndex);
            }
            var sIndex = url.lastIndexOf("/");
            var main = url.substring(sIndex); // name, selectors and extension
            if (main.indexOf("." + selector + ".") == -1) {
                var path = url.substring(0, sIndex);
                var obj = main.split(".");
                var newMain = "";
                var delim = "";
                if (index > obj.length - 2 || index == -1) {
                    // insert at last position
                    index = obj.length - 2;
                }
                for (var i = 0; i < obj.length; i++) {
                    newMain += delim + obj[i];
                    delim = ".";
                    if (index == i) {
                        newMain += delim + selector;
                    }
                }
                return path + newMain + post;
            } else {
                return url;
            }
        },

        /**
         * Replaces the selector at the given index position. If no selector exists
         * at the index position, no change is made to the URL.
         *
         * @param {String} url The URL.
         * @param {String} selector The value with which to replace the selector.
         * @param {Number} index The index of the selector to set/replace.
         * @return {String} The URL with the selector replaced.
         * @since 5.4
         */
        setSelector: function(url, selector, index) {

            var post = "";
            var pIndex = url.indexOf("?");
            if (pIndex == -1) pIndex = url.indexOf("#");
            if (pIndex != -1) {
                post = url.substring(pIndex);
                url = url.substring(0, pIndex);
            }

            var selectors = _g.HTTP.getSelectors(url);
            var ext = url.substring(url.lastIndexOf("."));
            // cut extension
            url = url.substring(0, url.lastIndexOf("."));
            // cut selectors
            var fragment = (selectors.length > 0) ? url.replace("." + selectors.join("."), "") : url;

            if (selectors.length > 0) {
                for (var i = 0; i < selectors.length; i++) {
                    if (index == i) {
                        fragment += "." + selector;
                    } else {
                        fragment += "." + selectors[i]
                    }
                }
            } else {
                fragment += "." + selector;
            }

            return fragment + ext + post;
        },

        /**
         * Adds the specified selectors to an URL.
         * @param {String} url The URL. The URL must contain a extension and
         *                 must not contain a suffix (x.json/a/b). Anchor and
         *                 request parameters are supported.
         * @param {String[]} selectors The name of the selectors to insert
         * @return {String} The updated URL
         * @since 5.5
         */
        addSelectors: function(url, selectors) {
            var res = url;
            if (url && selectors && selectors.length) {
                for (var i = 0; i < selectors.length; i++) {
                    res = _g.HTTP.addSelector(res, selectors[i], i);
                }
            }
            return res;
        },

        /**
         * Returns the anchor part of the URL.
         * @static
         * @param {String} url The URL
         * @return {String} The anchor
         */
        getAnchor: function(url) {
            if (url.indexOf("#") != -1) {
                return url.substring(url.indexOf("#") + 1);
            }
            return "";
        },

        /**
         * Sets the anchor of the specified URL.
         * @static
         * @param {String} url The URL
         * @param {String} anchor The anchor
         * @return {String} The URL with anchor
         */
        setAnchor: function(url, anchor) {
            return _g.HTTP.removeAnchor(url) + "#" + anchor;
        },

        /**
         * Removes the anchor from the specified URL.
         * @static
         * @param {String} url The URL
         * @return {String} The URL without anchor
         */
        removeAnchor: Granite.HTTP.removeAnchor,

        /**
         * Prevents caching by adding a timestamp to the specified URL.
         * @static
         * @param {String} url The URL
         * @return {String} The URL with timestamp
         */
        noCaching: function(url) {
            return _g.HTTP.setParameter(url, _g.HTTP.PARAM_NO_CACHE, new Date().valueOf());
        },

        /**
         * Builds a response object using the specified node and its child nodes.
         * The content of each node with an ID will be set as a response header.
         * @private
         * @static
         * @param {Node} node The content document or the node to parse
         * @param {Object} response The response object to use (optional)
         * @return {Object} The response object
         */
        buildPostResponseFromNode: function(node, response) {
            if (!node) {
                return null;
            }
            if (response == undefined) {
                response = createResponse();
            }

            for (var i = 0; i < node.childNodes.length; i++) {
                var child = node.childNodes[i];
                if (child.tagName) {
                    if (child.id) {
                        if (child.href) {
                            response.headers[child.id] = child.href;
                        } else {
                            response.headers[child.id] = child.innerHTML;
                        }
                    }
                    response = _g.HTTP.buildPostResponseFromNode(child, response);
                }
            }
            return response;
        },

        /**
         * Builds a response object using the specified HTML string. The
         * content of each node with an ID will be set as a response header.
         * @private
         * @static
         * @param {String} html The HTML string
         * @return {Object} The response object
         */
        buildPostResponseFromHTML: function(html) {
            var response = createResponse();
            try {
                if (html.responseText != undefined) {
                    html = html.responseText;
                } else if (typeof html != "string") {
                    html = html.toString();
                }
                var div = document.createElement("div");
                div.innerHTML = html;
                response = _g.HTTP.buildPostResponseFromNode(div, response);
                div = null;
            } catch (e) {}
            return response;
        },

        /**
         * Returns the value of the cookie with the specified name.
         * @static
         * @param {String} name The name of the cookie
         * @return {String} The value of the cookie
         */
        getCookie: function(name) {
            var cname = encodeURIComponent(name) + "=";
            var dc = document.cookie;
            if (dc.length > 0) {
                var begin = dc.indexOf(cname);
                if (begin != -1) {
                    begin += cname.length;
                    var end = dc.indexOf(";", begin);
                    if (end == -1) end = dc.length;
                    return decodeURIComponent(dc.substring(begin, end));
                }
            }
            return null;
        },

        /**
         * Sets the value of the cookie with the specified name.
         * @static
         * @param {String} name The name of the cookie
         * @param {String} value The value of the cookie
         * @param {String} path (optional) The server path the cookie applies to
         * @param {Number} days (optional) The number of days the cookie will live
         * @param {String} domain (optional) The server domain
         * @param {Boolean} secure (optional) True if the
         *        connection is secure
         * @return {String} The value of the cookie
         */
        setCookie: function(name, value, path, days, domain, secure) {
            if (typeof(days) != "number") days = 7;
            var date;
            if (days > 0) {
                date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            } else {
                date = new Date(0);
            }
            document.cookie = encodeURIComponent(name) + "=" +
                encodeURIComponent(value) + "; " +
                (days != 0 ? "expires=" + date.toGMTString() + "; " : "") +
                (domain ? "domain=" + domain + "; " : "") +
                (path ? "path=" + path : "") +
                (secure ? "; secure" : "");
            return value;
        },

        /**
         * Clears the cookie with the specified name.
         * @static
         * @param {String} name The name of the cookie
         * @param {String} path (optional) The server path the cookie applies to
         * @param {String} domain (optional) The server domain
         * @param {Boolean} secure (optional) True if the
         *        connection is secure
         */
        clearCookie: function(name, path, domain, secure) {
            _g.HTTP.setCookie(name, "null", path || "", -1, domain || "", secure || "");
        },

        /**
         * Returns the scheme and authority (user, hostname, port) part of
         * the specified URL or an empty string if the URL does not include
         * that part.
         * @static
         * @param {String} url The URL
         * @return {String} The scheme and authority part
         */
        getSchemeAndAuthority: Granite.HTTP.getSchemeAndAuthority,

        /**
         * Returns the context path used on the server.
         * @static
         * @return {String} The context path
         * @since 5.3
         */
        getContextPath: Granite.HTTP.getContextPath,

        /**
         * Makes sure the specified relative URL starts with the context path
         * used on the server. If an absolute URL is passed, it will be returned
         * as-is.
         * @static
         * @param {String} url The URL
         * @param {boolean} encode true to encode the path of the URL (optional)
         * @return {String} The externalized URL
         * @since 5.3
         */
        externalize: function(url, encode) {
            // check if URL is already XHR_HOOKED and assume that the externalization has
            // already been applied if so (externalizing an already hooked URL will break
            // it in several/most cases!)
            if ((typeof G_IS_HOOKED != "undefined") && G_IS_HOOKED(url)) {
                return url;
            }
            if (encode) url = _g.HTTP.encodePathOfURI(url);

            // Granite.HTTP.externalize does nor hooked check nor encoding
            url = Granite.HTTP.externalize(url);

            return url;
        },

        /**
         * Removes scheme, authority and context path from the specified
         * absolute URL if it has the same scheme and authority as the
         * specified document (or the current one).
         * @static
         * @param {String} url The URL
         * @param {String} doc (optional) The document
         * @return {String} The internalized URL
         */
        internalize: Granite.HTTP.internalize,

        /**
         * Removes all parts but the path from the specified URL.
         * <p>Examples:<pre><code>
         /x/y.sel.html?param=abc => /x/y
         </code></pre>
         * <pre><code>
         http://www.day.com/foo/bar.html => /foo/bar
         </code></pre><p>
         * @static
         * @param {String} url The URL, may be empty. If empty <code>window.location.href</code> is taken.
         * @return {String} The path
         * @since 5.3
         */
        getPath: Granite.HTTP.getPath,

        /**
         * Returns the current request suffix as provided by CQURLInfo.suffix.
         *
         * @static
         * @return {String} The suffix
         *
         * @since 5.5
         */
        getSuffix: function() {
            if (window.CQURLInfo && CQURLInfo.suffix) {
                return CQURLInfo.suffix;
            }
            return null;
        },

        /**
         * Returns an array with the selectors present in the given url.
         * If no selectors are present, an empty array is returned.
         * @static
         * @param {String} url The URL, optional. If no url is provided, the
         *                     selectors as provided by CQURLInfo.selectors
         *                     are taken, with a fallback to window.location.href.
         * @return {Array} An array containing the selectors or an empty
         *                 array if none were found.
         * @since 5.4
         */
        getSelectors: function(url) {

            if (!url && window.CQURLInfo) {
                if (CQURLInfo.selectors) {
                    return CQURLInfo.selectors;
                }
            }

            var selectors = [];

            url = url || window.location.href;

            url = _g.HTTP.removeParameters(url);
            url = _g.HTTP.removeAnchor(url);

            var fragment = url.substring(url.lastIndexOf("/"));
            if (fragment) {
                var split = fragment.split(".");
                if (split.length > 2) {
                    for (var i = 0; i < split.length; i++) {
                        // don't add node name and extension as selectors
                        if (i > 0 && i < split.length - 1) {
                            selectors.push(split[i]);
                        }
                    }
                }
            }

            return selectors;
        },

        /**
         * Returns the extension of an URL. This is the string
         * after the last dot until the end of the url without
         * any request parameters, anchors or suffix, for
         * example "html".
         *
         * @param {String} url The URL
         * @return {String} The URL extension (without the dot)
         *                  or an empty string if no was found.
         * @since 5.4
         */
        getExtension: function(url) {

            if (!url && window.CQURLInfo) {
                if (CQURLInfo.extension) {
                    return CQURLInfo.extension;
                }
            }

            url = url || window.location.href;

            // strip things from the end
            url = _g.HTTP.removeParameters(url);
            url = _g.HTTP.removeAnchor(url);

            // extension is everything after the last dot
            var pos = url.lastIndexOf(".");
            if (pos < 0) {
                return "";
            }

            // do not include the dot
            url = url.substring(pos + 1);

            // remove suffix if present
            pos = url.indexOf("/");
            if (pos < 0) {
                return url;
            }

            return url.substring(0, pos);
        },

        /**
         * Encodes the path of the specified URL if it is not already encoded.
         * Path means the part of the URL before the first question mark or
         * hash sign.<br>
         * See {@link #encodePath} for details about the encoding.<br>
         * Sample:<br>
         * <code>/x/y+z.png?path=/x/y+z >> /x/y%2Bz.png?path=x/y+z</code><br>
         * Note that the sample would not work because the "+" in the request
         * parameter would be interpreted as a space. Parameters must be encoded
         * separately.
         * @param {String} url The URL to encoded
         * @return {String} The encoded URL
         * @since 5.3
         */
        encodePathOfURI: Granite.HTTP.encodePathOfURI,

        /**
         * Encodes the specified path using encodeURI. Additionally <code>+</code>,
         * <code>#</code> and <code>?</code> are encoded.<br>
         * The following characters are not encoded:<br>
         * <code>0-9 a-z A-Z</code><br>
         * <code>- _ . ! ~ * ( )</code><br>
         * <code>/ : @ & =</code><br>
         * @param {String} path The path to encode
         * @return {String} The encoded path
         * @since 5.3
         */
        encodePath: Granite.HTTP.encodePath,

        /**
         * Evaluates and returns the body of the specified response object.
         * Alternatively, a URL can be specified, in which case it will be
         * requested using a synchornous {@link #get} in order to acquire
         * the response object.
         * @static
         * @param {Object/String} response The response object or URL
         * @return {Object} The evaluated response body
         * @since 5.3
         */
        eval: Granite.HTTP.eval,

        /**
         * Checks whether the specified status code is OK.
         * @static
         * @param {Number} status The status code
         * @return {Boolean} True if the status is OK, else false
         */
        isOkStatus: function(status) {
            try {
                return (new String(status).indexOf("2") == 0);
            } catch (e) {
                return false;
            }
        },

        /**
         * Checks if the specified response is OK.
         * The response object is expected to look like this:
         * <pre><code>{ headers: { "Status": 200, ... } }</code></pre>
         * See constants above for all supported headers.
         * @static
         * @param {Object} response The response object
         * @return {Boolean} True if the response is OK, else false
         */
        isOk: function(response) {
            try {
                return _g.HTTP.isOkStatus(
                    response.headers[_g.HTTP.HEADER_STATUS]);
            } catch (e) {
                return false;
            }
        },

        /**
         * <p>Returns if the specified response is of status 403/forbidden. If the
         * status is 403 and <code>suppressLogin</code> is undefined the document
         * is redirected to the login page.</p>
         * <p>The status is expected to be found in the "status" property of the
         * response: <code>{ "status": 403 }</code></p>
         * @param {Object} response The response
         * @param {Boolean} suppressLogin <code>true</code> to not redirect to the login page
         * @return {Boolean} <code>true</code> if the status is 403
         */
        handleForbidden: function(response, suppressLogin) {
            try {
                if (response[_g.HTTP.HEADER_STATUS.toLowerCase()] == 403) {
                    Granite.HTTP.handleLoginRedirect();
                    return true;
                }
                return false;
            } catch (e) {
                return false;
            }
        },

        /**
         * Gets the XHR hooked URL if called in a portlet context
         * @param {String} url The URL to get
         * @param {String} method The method to use to retrieve the XHR hooked URL
         * @param {Object} params The parameters
         * @return {String} The XHR hooked URL if available, the provided URL otherwise
         */
        getXhrHook: Granite.HTTP.getXhrHook,

        /**
         * Gets the XHR hooked URL if called in a portlet context
         * @param {String} url The URL to get
         * @param {String} method The method to use to retrieve the XHR hooked URL
         * @param {Object} params The parameters
         * @return {String} The XHR hooked URL if available, the provided URL otherwise
         */
        getXhrHookedURL: function(url, method, params) {
            var hook = _g.HTTP.getXhrHook(url, method, params);
            if (hook) {
                return hook.url;
            }
            return url;
        },

        /**
         * Reloads the XHR hook (portlet context)
         * @static
         * @param {String} url The URL
         * @return {String} Updated URL if reload hook function exists
         */
        reloadHook: function(url) {
            if (typeof G_RELOAD_HOOK != "undefined" && _g.$.isFunction(G_RELOAD_HOOK)) {
                if (CQURLInfo.selectorString != "") {
                    url = _g.HTTP.addSelector(url, CQURLInfo.selectorString);
                }
                url = G_RELOAD_HOOK(url) || url;
            }
            return url;
        }

    }
};

// shortcut
_g.HTTP = _g.shared.HTTP;

/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

/**
 * A helper class providing a set of general utilities.
 * @static
 * @singleton
 * @class CQ.shared.Util
 * @granite-class _g.Util
 * @deprecated
 */
_g.shared.Util = new function() {
    return {
        /**
         * Reloads the window or replaces its location with the specified URL.
         * If no window is specified, the current window will be used.
         * @static
         * @param {Window} win (optional) The window to reload
         * @param {String} url (optional) The URL
         * @param {String} preventHistory (optional) Prevent history
         */
        reload: function(win, url, preventHistory) {
            if (!win) win = window;
            if (!url) {
                url = _g.HTTP.noCaching(win.location.href);
            }
            url = _g.HTTP.reloadHook(url);

            if (preventHistory) {
                win.location.replace(url);
            } else {
                win.location.href = url;
            }
        },

        /**
         * Loads the specified URL in the current window.
         * @static
         * @param {String} url The URL
         * @param {String} preventHistory (optional) Prevent history
         */
        load: function(url, preventHistory) {
            _g.Util.reload(window, url, preventHistory);
        },

        /**
         * Opens a new window with the specified URL.
         * If no window is specified, the current window will be used.
         * @static
         * @param {String} url The URL
         * @param {Window} win (optional) The window to reload
         * @param {String} name (optional) New window name
         * @param {String} options (optional) New window options
         * @return {Object} New window
         */
        open: function(url, win, name, options) {
            if (!win) win = window;
            if (!url) {
                return;
            }
            url = _g.HTTP.reloadHook(url);

            if (!name) {
                name = "";
            }
            if (!options) {
                options = "";
            }

            return win.open(url, name, options);
        },

        /**
         * Converts certain characters (&, <, >, and ") to their HTML character equivalents for literal display in web pages.
         * @param {String} value The string to encode
         * @return {String} The encoded text
         */
        htmlEncode: function(value) {
            return !value ? value : String(value).replace(/&/g, "&amp;").replace(/>/g, "&gt;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
        },

        /**
         * Converts certain characters (&, <, >, and ") from their HTML character equivalents.
         * @param {String} value The string to decode
         * @return {String} The decoded text
         */
        htmlDecode: function(value) {
            return !value ? value : String(value).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
        },

        /**
         * Truncates a string and add an ellipsis ('...') to the end if it exceeds the specified length
         * @param {String}  value  The string to truncate
         * @param {Number}  length The maximum length to allow before truncating
         * @param {Boolean} word   True to try to find a common work break
         * @return {String} The converted text
         */
        ellipsis: function(value, length, word) {
            if (value && value.length > length) {
                if (word) {
                    var vs = value.substr(0, length - 2);
                    var index = Math.max(vs.lastIndexOf(' '), vs.lastIndexOf('.'), vs.lastIndexOf('!'), vs.lastIndexOf('?'), vs.lastIndexOf(';'));
                    if (index == -1 || index < (length - 15)) {
                        return value.substr(0, length - 3) + "...";
                    } else {
                        return vs.substr(0, index) + "...";
                    }
                } else {
                    return value.substr(0, length - 3) + "...";
                }
            }
            return value;
        },

        /**
         * Replaces occurrences of <code>{n}</code> in the specified text with
         * the texts from the snippets.
         * <p>Example 1 (single snippet):<pre><code>
var text = CQ.shared.Util.patchText("{0} has signed in.", "Jack");
           </code></pre>Result 1:<pre><code>
Jack has signed in.
           </code></pre></p>
         * <p>Example 2 (multiple snippets):<pre><code>
var text = "{0} {1} has signed in from {2}.";
text = CQ.shared.Util.patchText(text, ["Jack", "McFarland", "10.0.0.99"]);
           </code></pre>Result 2:<pre><code>
Jack McFarland has signed in from 10.0.0.99.
           </code></pre></p>
         * @static
         * @param {String} text The text
         * @param {String/String[]} snippets The text(s) replacing
         *        <code>{n}</code>
         * @return {String} The patched text
         */
        patchText: Granite.Util.patchText,

        /**
         * Evaluates and returns the response text of the specified response
         * object.
         * @static
         * @param {Object} response The response object
         * @return {Object} The evaluated object
         * @deprecated Use {@link CQ.shared.HTTP#eval} instead
         */
        eval: function(response) {
            return _g.HTTP.eval(response);
        },

        /**
         * Returns the top most accessible window.
         * @static
         * @return {Window} The top window
         * @since 5.5
         */
        getTopWindow: Granite.Util.getTopWindow,

        /**
         * Allows to define if Granite.Util is running in an iFrame and parent window is in another domain
         * (and optionally define what would be the top window in that case.
         * This is necessary to use {@link getTopWindow} in a iFrame on WebKit based browsers because
         * {@link getTopWindow} iterates on parent windows to find the top one which triggers a security exception
         * if one parent window is in a different domain. Exception cannot be caught but is not breaking the JS
         * execution.
         * @param {Object} topWindow (optional) The iFrame top window. Must be running on the same host to avoid
         * security exception. Defaults to window.
         */
        setIFrameMode: Granite.Util.setIFrameMode
    }

};

// shortcut
_g.Util = _g.shared.Util;

/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

/**
 * A helper class providing a set of Sling-related utilities.
 * @static
 * @singleton
 * @class CQ.Sling
 * @deprecated use Granite.Sling instead
 */
_g.shared.Sling = function() {

    return {

        /**
         * The selector for infinite hierarchy depth when retrieving
         * repository content.
         * @static
         * @final
         * @type String
         */
        SELECTOR_INFINITY: Granite.Sling.SELECTOR_INFINITY,

        /**
         * The parameter name for the used character set.
         * @static
         * @final
         * @type String
         */
        CHARSET: Granite.Sling.CHARSET,

        /**
         * The parameter name for the status.
         * @static
         * @final
         * @type String
         */
        STATUS: Granite.Sling.STATUS,

        /**
         * The parameter value for the status type "browser".
         * @static
         * @final
         * @type String
         */
        STATUS_BROWSER: Granite.Sling.STATUS_BROWSER,

        /**
         * The parameter name for the operation.
         * @static
         * @final
         * @type String
         */
        OPERATION: Granite.Sling.OPERATION,

        /**
         * The parameter value for the delete operation.
         * @static
         * @final
         * @type String
         */
        OPERATION_DELETE: Granite.Sling.OPERATION_DELETE,

        /**
         * The parameter value for the move operation.
         * @static
         * @final
         * @type String
         */
        OPERATION_MOVE: Granite.Sling.OPERATION_MOVE,

        /**
         * The parameter name suffix for deleting.
         * @static
         * @final
         * @type String
         */
        DELETE_SUFFIX: Granite.Sling.DELETE_SUFFIX,

        /**
         * The parameter name suffix for setting a type hint.
         * @static
         * @final
         * @type String
         */
        TYPEHINT_SUFFIX: Granite.Sling.TYPEHINT_SUFFIX,

        /**
         * The parameter name suffix for copying.
         * @static
         * @final
         * @type String
         */
        COPY_SUFFIX: Granite.Sling.COPY_SUFFIX,

        /**
         * The parameter name suffix for moving.
         * @static
         * @final
         * @type String
         */
        MOVE_SUFFIX: Granite.Sling.MOVE_SUFFIX,

        /**
         * The parameter name for the ordering.
         * @static
         * @final
         * @type String
         */
        ORDER: Granite.Sling.ORDER,

        /**
         * The parameter name for the replace flag.
         * @static
         * @final
         * @type String
         */
        REPLACE: Granite.Sling.REPLACE,

        /**
         * The parameter name for the destination flag.
         * @static
         * @final
         * @type String
         */
        DESTINATION: Granite.Sling.DESTINATION,

        /**
         * The parameter name for the save parameter prefix.
         * @static
         * @final
         * @type String
         */
        SAVE_PARAM_PREFIX: Granite.Sling.SAVE_PARAM_PREFIX,

        /**
         * The parameter name for input fields that should
         * be ignored by Sling.
         * @static
         * @final
         * @type String
         */
        IGNORE_PARAM: Granite.Sling.IGNORE_PARAM,

        /**
         * The parameter name for login requests.
         * @static
         * @final
         * @type String
         */
        REQUEST_LOGIN_PARAM: Granite.Sling.REQUEST_LOGIN_PARAM,

        /**
         * Login URL
         * @static
         * @final
         * @type String
         */
        LOGIN_URL: Granite.Sling.LOGIN_URL,

        /**
         * Logout URL
         * @static
         * @final
         * @type String
         */
        LOGOUT_URL: Granite.Sling.LOGOUT_URL,

        /**
         * Detects and processes binary repository data returned by Sling
         * and does some preparsing on it for more easy data handling.
         * @static
         * @param {Object} value The repository data to check
         * @return {Object} The processed repository data
         */
        processBinaryData: function(value) {
            if (value && value[":jcr:data"] != undefined) {
                // value is a binary
                var o = new Object();
                o.size = value[":jcr:data"];
                o.type = value["jcr:mimeType"];
                o.date = value["jcr:lastModified"];
                value = o;
            }
            return value;
        },

        /**
         * Returns the content path for the data.
         * @static
         * @param {String} relPath The relative path to resolve
         * @param {String} absPath The absolute path to resovle against
         * @param {Boolean} allowParentPaths Indicates parent paths (../) should be processed at the start of the
         * relative path
         * @return {String} The absolute path path
         */
        getContentPath: function(relPath, absPath, allowParentPaths) {
            var path = absPath;
            if (path.lastIndexOf(".") > path.lastIndexOf("/")) {
                // remove selectors and extension from absPath:
                // /content/foo.bar.html >> /content/foo
                path = path.substr(0, path.indexOf(".", path.lastIndexOf("/")));
            }
            if (relPath) {
                if (relPath.indexOf("/") == 0) {
                    path = relPath;
                } else {
                    if (allowParentPaths) {
                        while (relPath.indexOf("../") == 0) {
                            relPath = relPath.substring(3);
                            path = path.substring(0, path.lastIndexOf("/"));
                        }
                    }
                    relPath = relPath.replace("./", "");
                    path = path + "/" + relPath;
                }
            }
            return path;
        }
    };

}();

// shortcut
_g.Sling = _g.shared.Sling;

/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

/**
 * Provides static utilities for XSS management.
 * @static
 * @singleton
 * @since 5.4
 * @class CQ.shared.XSS
 * @granite-class _g.XSS
 * @deprecated
 */
_g.shared.XSS = new function() {
    return {
        /**
         * Get XSS property name from a provided property name
         *
         * @static
         * @param  {String} propertyName Property name
         * @return {String} XSS property name
         */
        getXSSPropertyName: function(propertyName) {
            if (!propertyName) {
                return '';
            }
            if (_g.XSS.KEY_REGEXP.test(propertyName)) {
                return propertyName;
            }
            return propertyName += _g.XSS.KEY_SUFFIX;
        },

        /**
         * Get XSS property value from provided property name and json record
         *
         * @static
         * @param  {Object} rec          Object containing the properties and their values
         * @param  {String} propertyName Property name
         * @param  {Number} ellipsisLimit Maximum number of characters
         * @return {String} XSS property value
         */
        getXSSRecordPropertyValue: function(rec, propertyName, ellipsisLimit) {
            var value = '';
            if (rec && propertyName) {
                var xssPropValue = rec.get(this.getXSSPropertyName(propertyName));
                if (xssPropValue) {
                    value = xssPropValue;
                } else {
                    value = this.getXSSValue(rec.get(propertyName));
                }

                if (ellipsisLimit && !isNaN(ellipsisLimit)) {
                    value = _g.Util.ellipsis(value, ellipsisLimit, true);
                }
            }
            return value;
        },

        /**
         * Get XSS property value from provided property name and table
         *
         * @static
         * @param  {Object} table         Object containing the properties and their values
         * @param  {String} propertyName  Property name
         * @param  {Number} ellipsisLimit Maximum number of characters
         * @return {String} XSS property value
         */
        getXSSTablePropertyValue: function(table, propertyName, ellipsisLimit) {
            var value = '';
            if (table && propertyName) {
                var xssPropValue = table[this.getXSSPropertyName(propertyName)];
                if (xssPropValue) {
                    value = xssPropValue;
                } else {
                    value = this.getXSSValue(table[propertyName]);
                }

                if (ellipsisLimit && !isNaN(ellipsisLimit)) {
                    value = _g.Util.ellipsis(value, ellipsisLimit, true);
                }
            }
            return value;
        },

        /**
         * XSS value renderer
         *
         * @static
         * @param  {String} val  Value to protect
         * @return {String} XSS protected value
         */
        getXSSValue: function(val) {
            if (val) {
                // There is a value to display, which we encode
                return _g.Util.htmlEncode(val);
            } else {
                // There was no value to display
                return '';
            }
        },

        /**
         * Update configuration object's property name if XSS is enabled for it
         *
         * @static
         * @param {Object}  cfg          Configuration object
         * @param {String}  propertyName Property name of the provided configuration object
         */
        updatePropertyName: function(cfg, propertyName) {
            if (!cfg || !propertyName || !cfg[propertyName]) {
                return;
            }
            if (cfg['xssProtect'] && !cfg['xssKeepPropName']) {
                cfg[propertyName] = this.getXSSPropertyName(cfg[propertyName]);
            }
        },

        /**
         * XSS property renderer
         *
         * @static
         * @param  {String} val  Value to display if XSS would not have been requested or is not available
         * @param  {Object} meta Field metadata
         * @param  {Object} cfg  Field configuration
         * @param  {Object} rec  Record containing information
         * @return {String} XSS property value
         */
        xssPropertyRenderer: function(val, meta, rec, cfg) {
            if (cfg && cfg['dataIndex'] && rec && rec.data && rec.data[this.getXSSPropertyName(cfg['dataIndex'])]) {
                // The record contains the XSS property equivalent
                val = rec.data[this.getXSSPropertyName(cfg['dataIndex'])];
                if (cfg['ellipsisLimit'] && !isNaN(cfg['ellipsisLimit'])) {
                    val = _g.Util.ellipsis(val, cfg['ellipsisLimit'], true);
                }
                return val;
            } else if (val) {
                // The record does not contain the XSS property equivalent
                return val;
            } else {
                // There was no value to display
                return '';
            }
        }
    }
};

// shortcut
_g.XSS = _g.shared.XSS;

/**
 * Key suffix for XSS property name
 * @static
 * @final
 * @type String
 */
_g.XSS.KEY_SUFFIX = "_xss";

/**
 * Key regular expression to test if a property name already ends with XSS suffix
 * @private
 * @static
 * @final
 * @type Object
 */
_g.XSS.KEY_REGEXP = new RegExp(_g.XSS.KEY_SUFFIX + "$");

/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

/**
 * A helper class providing a set of utilities related to internationalization
 * (i18n). Note: for cq localization, make sure to use CQ.I18n.get().
 * @static
 * @singleton
 * @class CQ.I18n
 * @granite-class _g.I18n
 * @deprecated use Granite.I18n instead
 */
_g.shared.I18n = Granite.I18n; //function() {

// shortcut
_g.I18n = _g.shared.I18n;

_g.shared.I18n.getMessage = Granite.I18n.get;
_g.shared.I18n.getVarMessage = Granite.I18n.getVar;

/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

/**
 * A helper class providing a set of String related utilities.
 * @static
 * @singleton
 * @since 5.5
 * @class CQ.shared.String
 * @granite-class _g.String
 * @deprecated
 */
_g.shared.String = new function() {

    return {

        /**
         * Check to see if the the str starts with the prefix.
         * The comparison is case sensitive.
         * @static
         * @param {String} str The string to check.
         * @param {String} prefix The prefix to find.
         * @return {Boolean} if the str starts with the prefix
         * return true, otherwise false.
         */
        startsWith: function(str, prefix) {
            if (str == null || prefix == null) {
                return str == null && prefix == null;
            }

            if (prefix.length > str.length) {
                return false;
            }

            // ensure we are dealing with the string form of this object
            var sMatch = str.toString();
            var sSearch = prefix.toString();

            return (sMatch.indexOf(sSearch) == 0);
        },

        /**
         * Check to see if the the str ends with the suffix.
         * The comparison is case sensitive.
         * @static
         * @param {String} str The string to check.
         * @param {String} suffix The suffix to find.
         * @return {Boolean} if the str ends with the suffix
         * return true, otherwise false.
         */
        endsWith: function(str, suffix) {

            if (str == null || suffix == null) {
                return str == null && suffix == null;
            }

            if (suffix.length > str.length) {
                return false;
            }

            // ensure we are dealing with the string form of this object
            str = str.toString();
            suffix = suffix.toString();

            return (str.lastIndexOf(suffix) == (str.length - suffix.length));
        },

        /**
         * Check to see if the the str contains the searchStr.
         * The comparison is case sensitive.
         * @static
         * @param {String} str The string to check.
         * @param {String} searchStr The prefix to find.
         * @return {Boolean} if the str ends with the suffix
         * return true, otherwise false.
         */
        contains: function(str, searchStr) {

            if (str == null || searchStr == null) {
                return false;
            }

            // ensure we are dealing with the string form of this object
            str = str.toString();
            searchStr = searchStr.toString();

            return (str.indexOf(searchStr) >= 0);
        }
    }
};

// shortcut
_g.String = _g.shared.String;

/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

/**
 * @class _g.shared.ClientSidePersistence
 * The _g.shared.ClientSidePersistence is a class providing method to persist a map of pairs (key/value).
 * @constructor
 * Creates a new ClientSidePersistence object.
 */
_g.shared.ClientSidePersistence = function(cfg) {
    var session = {
        /**
         * @cfg {String} PERSISTENCE_NAME
         * Persistence global key name
         * @final
         * @private
         */
        PERSISTENCE_NAME: _g.shared.ClientSidePersistence.decoratePersistenceName("ClientSidePersistence"),

        /**
         * @cfg {Object} config
         * Default configuration of ClientSidePersistence
         */
        config: {},

        /**
         * @property {Object} cache
         * Client side persistence cache object
         * @private
         */
        cache: null,

        /**
         * Returns current ClientSidePersistence mode
         * @return {Object} Current ClientSidePersistence mode (see {@link #config})
         */
        getMode: function() {
            return this.config.mode;
        },

        /**
         * Returns window object used by ClientSidePersistence
         * @return {Object} window object used by ClientSidePersistence
         */
        getWindow: function() {
            return this.config['window'] || _g.shared.Util.getTopWindow();
        },

        /**
         * Prints actual ClientSidePersistence content restricted to specified container name (if specified) and to used mode
         * @private
         * @return
         */
        debug: function() {
            if (console) {
                var map = this.getMap();
                var debugInfo = "[ClientSidePersistence -> mode=" + this.getMode().name + ", container=" + (this.config.container || '') + "]\n";
                var count = 0;
                var containerRE = new RegExp('^' + this.config.container + '/');

                for (var idx = 0, keys = Object.keys(map).sort(), last = null; idx < keys.length; idx++) {
                    var key = keys[idx];

                    if (this.config.container && (typeof(key) == 'string') && !key.match(containerRE)) {
                        continue;
                    }

                    var value = map[key];
                    debugInfo += "-[" + ++count + "]-> '" + key.replace(containerRE, '') + "' = '" + decodeURIComponent(value) + "'\n";
                }

                if (!count) {
                    debugInfo += "(container is empty)";
                }

                console.log(debugInfo);
            }
        },

        /**
         * Returns user provided key with container name (if it's specified)
         * @param {String} key
         * @private
         * @return {String} user provided key with container name
         */
        keyName: function(key) {
            return (this.config.container ? (this.config.container + '/') : '') + key;
        },

        /**
         * Returns the list of all the keys contained into the persistence
         * @return {String[]} list of the keys
         */
        getKeys: function() {
            var map = this.getMap();
            var keys = [];
            if (map) {
                for (var k in map) {
                    if (this.config.container) {
                        if (k.indexOf(this.config.container + '/') == 0) {
                            var key = k.substring(this.config.container.length + 1);
                            keys.push(key);
                        }
                    } else {
                        keys.push(k);
                    }
                }

            }
            return keys;
        },

        /**
         * Returns the value of the given key.
         * @param {String} key
         * @return {String} value of a given key
         */
        get: function(key) {
            var value = this.getMap()[this.keyName(key)];
            return value ? decodeURIComponent(value) : value;
        },

        /**
         * Sets the value of the given key.
         * @param {String} key
         * @param {String} value
         */
        set: function(key, value) {
            key = (typeof key === 'string') ? key.replace(/:=/g, '') : '';
            var eventData = {
                'key': key
            };
            key = this.keyName(key);

            if (!key.length) {
                return;
            }

            var result = [];
            var map = this.getMap();
            eventData.action = map[key] ? "update" : "set";

            if (value) {
                map[key] = encodeURIComponent(value);
            } else {
                eventData.action = "remove";
                delete map[key];
            }

            for (var entry in map) {
                result.push(entry + ':=' + map[entry]);
            }

            this.cache = map;
            this.write(result.join('|'));

            _g.$.extend(eventData, {
                'value': value,
                'mode': this.getMode().name,
                'container': this.config.container
            });

            _g.$(_g.shared.ClientSidePersistence).trigger(_g.shared.ClientSidePersistence.EVENT_NAME, eventData);
        },

        /**
         * Returns object containing a map of key/value pairs
         * @private
         * @return {Object} map of key/value pairs
         */
        getMap: function() {
            if (!this.cache || !this.config.useCache) {
                var data = this.read().split('|');
                var result = {};

                for (var idx = 0; idx < data.length; idx++) {
                    var chunks = data[idx].split(':=');
                    var key = chunks[0];

                    if (key && key.length) {
                        result[key] = chunks[1] || '';
                    }
                }

                this.cache = result;
            }

            return this.cache;
        },

        /**
         * Removes key from the persistence
         * @param {String} key
         * @return
         */
        remove: function(key) {
            this.set(key);
        },

        /**
         * Clears the whole content of persistence object
         * @return
         */
        clearMap: function() {
            this.write();
        },

        /**
         * Reads the whole content of persistence object
         * @private
         * @return {String} content of persistence object
         */
        read: function() {
            return this.config.mode.read(this) || '';
        },

        /**
         * Stores user provided data in persistence object
         * @param {String} data
         * @private
         * @return
         */
        write: function(data) {
            this.config.mode.write(this, data || '');
        }
    };

    /* applies user provided config on top of default configuration */
    _g.$.extend(session.config, _g.shared.ClientSidePersistence.getDefaultConfig(), cfg);

    if (session.config.useContainer === false) {
        session.config.container = null;
    }

    /* check if sessionStorage is supported and switch to localStorage otherwise */
    var useFallback;
    var testItem = 'test-' + Math.random();

    if (session.config.mode === _g.shared.ClientSidePersistence.MODE_SESSION) {
        useFallback = false;

        try {
            window.sessionStorage.setItem(testItem, testItem);
            window.sessionStorage.removeItem(testItem);
        } catch (error) {
            useFallback = true;
        }

        if (useFallback) {
            session.config.mode = _g.shared.ClientSidePersistence.MODE_LOCAL;
        }
    }

    /* check if localStorage is supported and switch to window.name otherwise */
    if (session.config.mode === _g.shared.ClientSidePersistence.MODE_LOCAL) {
        useFallback = false;

        try {
            window.localStorage.setItem(testItem, testItem);
            window.localStorage.removeItem(testItem);
        } catch (error) {
            useFallback = true;
        }

        if (useFallback) {
            session.config.mode = _g.shared.ClientSidePersistence.MODE_WINDOW;
        }
    }

    return session;
};

/**
 * @cfg {String} EVENT_NAME
 * Event name triggered while setting/updating key in ClientSidePersistence
 * @final
 * @private
 */
_g.shared.ClientSidePersistence.EVENT_NAME = 'ClientSidePersistence';

/**
 * window.sessionStorage implementation for ClientSidePersistence
 */
_g.shared.ClientSidePersistence.MODE_SESSION = {
    /**
     * @property {String} name
     * Name of MODE_SESSION storage implementation
     */
    name: 'session',

    /**
     * Reads the whole content of persistence object (using window.sessionStorage)
     * @param {ClientSidePersistence} self
     * @return content of persistence object
     */
    read: function(self) {
        return self.getWindow().sessionStorage.getItem(self.PERSISTENCE_NAME);
    },

    /**
     * Stores user provided data in persistence object (using window.sessionStorage)
     * @param {ClientSidePersistence} self
     * @param {String} value
     * @return
     */
    write: function(self, value) {
        if (Granite.OptOutUtil.isOptedOut()) return;
        try {
            self.getWindow().sessionStorage.setItem(self.PERSISTENCE_NAME, value);
        } catch (error) {
            //could not deal with the setItem
            return;
        }
    }
};

/**
 * window.localStorage implementation for ClientSidePersistence
 */
_g.shared.ClientSidePersistence.MODE_LOCAL = {
    /**
     * @property {String} name
     * Name of MODE_LOCAL storage implementation
     */
    name: 'local',

    /**
     * Reads the whole content of persistence object (using window.localStorage)
     * @param {ClientSidePersistence} self
     * @return content of persistence object
     */
    read: function(self) {
        return self.getWindow().localStorage.getItem(self.PERSISTENCE_NAME);
    },

    /**
     * Stores user provided data in persistence object (using window.localStorage)
     * @param {ClientSidePersistence} self
     * @param {String} value
     * @return
     */
    write: function(self, value) {
        if (Granite.OptOutUtil.isOptedOut()) return;
        try {
            self.getWindow().localStorage.setItem(self.PERSISTENCE_NAME, value);
        } catch (error) {
            //could not deal with the setItem
            return;
        }
    }
};

_g.shared.ClientSidePersistence.decoratePersistenceName = function(name) {
    return name;
};

/**
 * window.name implementation for ClientSidePersistence
 */
_g.shared.ClientSidePersistence.MODE_WINDOW = {
    /**
     * @property {String} name
     * Name of MODE_WINDOW storage implementation
     */
    'name': 'window',

    /**
     * Reads the whole content of persistence object (using window.name)
     * @param {ClientSidePersistence} self
     * @return content of persistence object
     */
    read: function(self) {
        return self.getWindow().name;
    },

    /**
     * Stores user provided data in persistence object (using window.name)
     * @param {ClientSidePersistence} self
     * @param {String} value
     * @return
     */
    write: function(self, value) {
        if (Granite.OptOutUtil.isOptedOut()) return;
        self.getWindow().name = value;
    }
};

/**
 * document.cookie implementation for ClientSidePersistence
 */
_g.shared.ClientSidePersistence.MODE_COOKIE = {
    /**
     * @property {String} COOKIE_NAME
     * Cookie key name used by MODE_COOKIE persistence mode
     */
    COOKIE_NAME: _g.shared.ClientSidePersistence.decoratePersistenceName("SessionPersistence"),

    /**
     * @property {String} name
     * Name of MODE_COOKIE storage implementation
     */
    name: 'cookie',

    /**
     * Reads the whole content of persistence object (using document.cookie)
     * @param {ClientSidePersistence} self
     * @return content of persistence object
     */
    read: function(self) {
        return _g.shared.ClientSidePersistence.CookieHelper.read(this.COOKIE_NAME);
    },

    /**
     * Stores or clears user provided data in persistence object (using document.cookie)
     * @param {ClientSidePersistence} self
     * @param {String} value (optional)
     * @return
     */
    write: function(self, value) {
        if (Granite.OptOutUtil.isOptedOut() && !Granite.OptOutUtil.maySetCookie(this.COOKIE_NAME)) return;
        if (!value) {
            _g.shared.ClientSidePersistence.CookieHelper.erase(this.COOKIE_NAME);
        } else {
            _g.shared.ClientSidePersistence.CookieHelper.set(this.COOKIE_NAME, value, 365 /* days */ );
        }
    }
};

/*
 * ClientSidePersistence default config
 */
_g.shared.ClientSidePersistence.getDefaultConfig = function() {
    return {
        /**
         * @property {Object} window
         * Defines which window object should be used by ClientSidePersistence
         */
        window: _g.shared.Util.getTopWindow(),

        /**
         * @property {Boolean} useCache
         * Determines if ClientSidePersistence should use internal cache
         */
        useCache: false,

        /**
         * @property {String} container
         * Container name where key/values will be stored (by default it's null)
         */
        container: null,

        /**
         * @property {Object} mode
         * Defines which mode should be used (available modes are {@link _g.shared.ClientSidePersistence.MODE_SESSION MODE_SESSION},
         * {@link _g.shared.ClientSidePersistence.MODE_LOCAL MODE_LOCAL}, {@link _g.shared.ClientSidePersistence.MODE_WINDOW MODE_WINDOW}
         * and {@link _g.shared.ClientSidePersistence.MODE_COOKIE MODE_COOKIE})
         */
        mode: _g.shared.ClientSidePersistence.MODE_LOCAL
    };
};

/**
 * Cookie helper class.
 * @class _g.shared.ClientSidePersistence.CookieHelper
 * @singleton
 */
_g.shared.ClientSidePersistence.CookieHelper = {
    /**
     * Sets a cookie.
     * @param {String} name
     * @param {String} value
     * @param {Number} days
     */
    set: function(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        if (value) {
            value = encodeURIComponent(value);
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    },

    /**
     * Returns the value of the cookie of the given name.
     * @param {String} name
     * @return {String} value of a given name (can be null)
     */
    read: function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) {
                var value = c.substring(nameEQ.length, c.length);
                return value ? decodeURIComponent(value) : null;
            }
        }
        return null;
    },

    /**
     * Removes the cookie of the given name.
     * @param {String} name
     */
    erase: function(name) {
        _g.shared.ClientSidePersistence.CookieHelper.set(name, "", -1);
    }
};

/*
 * Clears client side persistence using all implemented modes
 */
_g.shared.ClientSidePersistence.clearAllMaps = function() {
    var modes = [
        _g.shared.ClientSidePersistence.MODE_COOKIE,
        _g.shared.ClientSidePersistence.MODE_LOCAL,
        _g.shared.ClientSidePersistence.MODE_SESSION,
        _g.shared.ClientSidePersistence.MODE_WINDOW
    ];

    _g.$.each(modes, function(id, mode) {
        var persistence = new _g.shared.ClientSidePersistence({
            'mode': mode
        });
        persistence.clearMap();
    });
};

/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2012 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

//------------------------------------------------------------------------------
// Initialize the Granite shared library

//todo: user language (not yet available)
//_g.I18n.init({locale: _g.User.getLanguage()});
_g.I18n.init();

/*
 * Copyright 1997-2010 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */


/*
 * Copyright 1997-2010 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

/**
 * The <code>CQ</code> library contains all CQ component classes and utilities.
 * @static
 */
window.CQ = window.CQ || {};

// map CQ.shared to Granite shared
CQ.shared = _g.shared;

// shortcuts
CQ.Sling = CQ.shared.Sling;
CQ.I18n = CQ.shared.I18n;

// map constants for portlet support
G_XHR_HOOK = typeof CQ_XHR_HOOK != "undefined" ? CQ_XHR_HOOK : undefined;
G_RELOAD_HOOK = typeof CQ_RELOAD_HOOK != "undefined" ? CQ_RELOAD_HOOK : undefined;
G_IS_HOOKED = typeof CQ_IS_HOOKED != "undefined" ? CQ_IS_HOOKED : undefined;
G_CONTENT_PATH = typeof CQ_CONTENT_PATH != "undefined" ? CQ_CONTENT_PATH : undefined;

/**
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2011 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 *
 */

/**
 * A helper class providing a set of form related utilities.
 * @static
 * @singleton
 * @class CQ.shared.Form
 */
CQ.shared.Form = function() {

    /**
     * Returns an associative array mapping ids to label nodes.
     * @private
     * @return {Object} For instance:
     *      {
     *          id1: labelNode1,
     *          id2: labelNode2,
     *          ...
     *      }
     */
    var getDocumentLabelMap = function() {
        var contentFrame = parent.frames["ContentFrame"],
            doc = contentFrame !== undefined ? contentFrame.contentDocument : document;

        var labelMap = new Object();
        var labelNodes = doc.getElementsByTagName("label");
        for (var i = 0; i < labelNodes.length; i++) {
            var forId = labelNodes[i].htmlFor; // buggy IE can't handle getAttribute("for")
            if (forId) {
                labelMap[forId] = labelNodes[i];
            }
        }
        return labelMap;
    };

    /**
     * Given a <label> node (perhaps one containing <input> or <select> children), return the text
     * content (excluding any <input> or <select> content).
     * @private
     * @return {String} The text content of all non-<input> and non-<select> descendants.
     */
    var getLabelNodeTextContent = function(node) {
        var text = "";
        var walkTree = function(node) {
            if (node.nodeType == 3) { // text node
                text += node.nodeValue;
            }
            if (node.nodeName.toLowerCase() == "select" ||
                node.nodeName.toLowerCase() == "input" ||
                node.nodeName.toLowerCase() == "textarea" ||
                node.nodeName.toLowerCase() == "button") {
                // don't walk into fields if they're children of the label
                return;
            }
            for (var i = 0; node.childNodes && i < node.childNodes.length; i++) {
                walkTree(node.childNodes[i]);
            }
        };
        walkTree(node);
        return text;
    };

    /**
     * Given an indexed id, return the id for the parent section (the id with the index stripped off).
     * @private
     */
    var getSectionIdForIndexedId = function(id) {
        return id.replace(/-\d+$/, "");
    };

    /**
     * <p>Return the label text (as a <code>String</code>) for a particular <code>id</code>.  When a label
     * can't be found, return the id itself as a fall-back.</p>
     * <p>Note: Public callers can ignore the <code>documentLabelMap</code> parameter (it's used internally
     * as a caching mechanism).</p>
     * @param {String} id The id which the target <code>&lt;label&gt;</code> refers to.
     * @return {String} The label text.
     */
    var getLabelForId = function(id, documentLabelMap) {
        if (!documentLabelMap) {
            documentLabelMap = getDocumentLabelMap();
        }

        if (documentLabelMap[id]) {
            return getLabelNodeTextContent(documentLabelMap[id]);
        }
        return null;
    };

    /**
     * Locate the default values for the given node. Supported nodes
     * include, <code>input</code>, <code>textarea</code>, <code>option</code>.
     *
     * @private
     * @param {HTMLElement} node The element which to locate the default value for.
     * @return {String} the default value for the given node.
     */
    var getDefaultValue = function(node) {
        var defaultValue;
        var nodeName = node.nodeName.toLowerCase();
        var nodeType = hasAttribute(node, "type") ? node.getAttribute("type") : undefined;

        if (nodeName == "input") {
            if (nodeType == "radio" || nodeType == "checkbox") {
                if (hasAttribute(node, "checked")) {
                    defaultValue = node.getAttribute("value");
                }
            } else if (node.type == "text") {
                defaultValue = node.defaultValue;
                // support elements like hidden, reset, submit
            } else {
                defaultValue = node.value;
            }
        } else if (nodeName == "textarea") {
            defaultValue = node.value;
        } else if (nodeName == "option" && hasAttribute(node, "selected")) {
            defaultValue = node.getAttribute("value");
        }

        return defaultValue;
    };

    /**
     * Helper function to get around IE7 not supporting hasAttribute.
     * @private
     * @param {HTMLElement} el the html element
     * @param {String} attr the attribute to test for.
     */
    var hasAttribute = function(el, attr) {
        if (el == null) {
            return false;
        }

        // IE8 issue with attributes being not null but empty string
        return ($CQ(el).attr(attr) != undefined);
    };

    return {

        /**
         * Searches an array for an object with a particular property of a particular value.
         * @return {Object} the first object which matches, or null if no objects match.
         */
        searchArray: function(arr, testProperty, testValue) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i][testProperty] && arr[i][testProperty] == testValue) {
                    return arr[i];
                }
            }
            return null;
        },

        /**
         * <p>Return the label text for an <code>&lt;input&gt;</code> or <code>&lt;select&gt;</code>.  When a
         * label can't be found, the element's name attribute is used as a fall-back.</p>
         * <p>Note: Public callers can ignore the <code>documentLabelMap</code> parameter (it's used internally
         * as a caching mechanism).</p>
         * @param {HTMLElement} fieldNode The <code>&lt;input&gt;</code>, <code>&lt;select&gt;</code> or
         * <code>&lt;textArea&gt;</code> node.
         * @return {String} The label text.
         */
        getLabelForField: function(fieldNode, documentLabelMap) {
            if (!documentLabelMap) {
                documentLabelMap = getDocumentLabelMap();
            }

            var id = fieldNode.getAttribute("id");
            if (id && documentLabelMap[id]) {
                return getLabelNodeTextContent(documentLabelMap[id]);
            }

            var parent = fieldNode.parentNode;
            while (parent) {
                if (parent.nodeName.toLowerCase() == "label") {
                    return getLabelNodeTextContent(parent);
                }
                parent = parent.parentNode;
            }

            // No label found; we'll have to live with the name:
            return fieldNode.getAttribute("name");
        },

        /**
         * Get a list of fields in the document.
         * @return {Array} Each object in the array represents a field.  Each field contains:
         * <div class="mdetail-params"><ul)
         *   <li><code>text</code> : String<div class="sub-desc">The label to display (usually the field's caption).</div></li>
         *   <li><code>value</code> : String<div class="sub-desc">The name of the field.</div></li>
         *   <li><code>enumeration</code> : Array|null<div class="sub-desc">For enumerated fields, a nested array of text/value pairs.</div></li>
         * </ul></div>
         */
        getFields: function() {
            var contentFrame = parent.frames["ContentFrame"],
                doc = contentFrame !== undefined ? contentFrame.contentDocument : document,
                documentLabelMap = getDocumentLabelMap();

            var fields = [];

            var visitNamedNode = function(node, inLocalNode, selector) {
                var name = node.getAttribute("name");
                var nodeType = node.nodeName.toLowerCase();
                var field;

                if (nodeType == "input" || nodeType == "textarea") {
                    var controlType = hasAttribute(node, "type") ? node.getAttribute("type").toLowerCase() : "text";
                    if (controlType == "button" || controlType == "submit" || controlType == "reset") {
                        return;
                    }

                    // Fetch (or create) the field record:
                    //
                    field = CQ.shared.Form.searchArray(fields, "value", name);
                    if (!field) {
                        fields.push({
                            "text": CQ.shared.Form.getLabelForField(node, documentLabelMap),
                            "value": name, // for Selection.setOptions()
                            "name": name, // for everyone else
                            "enumeration": undefined,
                            "local": inLocalNode,
                            "selector": selector,
                            "type": nodeType,
                            "defaultValue": getDefaultValue(node),
                            "node": node
                        });
                        field = fields[fields.length - 1];
                    }

                    // See if we're an enumeration.  Note that Sidekick-authored checkboxes are always
                    // enumerations, even when they appear singly.
                    //
                    if (controlType == "radio" || (field.local && controlType == "checkbox")) {
                        if (!field.enumeration) {
                            // This is the first one we've found of this group; promote the label to the
                            // section label
                            var inputId = node.getAttribute("id");
                            if (inputId) {
                                var sectionId = getSectionIdForIndexedId(inputId);
                                var sectionLabel = getLabelForId(sectionId, documentLabelMap);
                                field.text = (sectionLabel ? sectionLabel : name);
                            } else {
                                field.text = name;
                            }
                            field.enumeration = [];
                        }
                        field.enumeration.push({
                            "text": CQ.shared.Form.getLabelForField(node, documentLabelMap),
                            "value": node.getAttribute("value"),
                            "defaultValue": getDefaultValue(node),
                            "node": node
                        });
                    }
                } else if (nodeType == "select") {
                    // Create the field record:
                    //
                    fields.push({
                        "text": CQ.shared.Form.getLabelForField(node, documentLabelMap),
                        "value": name, // for Selection.setOptions()
                        "name": name, // for everyone else
                        "enumeration": [],
                        "local": inLocalNode,
                        "type": nodeType,
                        "selector": selector,
                        "defaultValue": undefined, // defaultValues are on the options, not select element
                        "node": node
                    });
                    field = fields[fields.length - 1];

                    // Add the options to the field's enumeration:
                    //
                    var optionNodes = node.getElementsByTagName("option");
                    for (var i = 0; i < optionNodes.length; i++) {
                        field.enumeration.push({
                            "text": optionNodes[i].innerHTML,
                            "value": optionNodes[i].getAttribute("value"),
                            "defaultValue": getDefaultValue(optionNodes[i]),
                            "node": optionNodes[i]
                        });
                    }
                }
            };

            var walkTree = function(node, inLocalNode, selector) {
                if (node.nodeName.toLowerCase() == "div" && $CQ(node).children('.form_row').length > 0) {
                    inLocalNode = true;
                    selector = $CQ(node).attr('class').replace(/\s/g, '\.');
                }

                if (node.getAttribute && node.getAttribute("name")) {
                    visitNamedNode(node, inLocalNode, selector);
                }

                for (var i = 0; node.childNodes && i < node.childNodes.length; i++) {
                    var child = node.childNodes[i];
                    if (child.nodeType == 1) { // if element
                        walkTree(child, inLocalNode, selector);
                    }
                }
            };

            walkTree(doc, false, undefined);
            return fields;
        }
    }
}();

/*
 * Copyright 1997-2009 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */

/**
 * A helper class providing information about a CQ user.
 * @class CQ.shared.User
 * @singleton
 */
CQ.shared.User = function(infoData) {
    return {
        /**
         * @property {Object} data
         * The user data.
         * @private
         */
        data: null,

        /**
         * @property {String} language
         * Resolved language read from preferences
         * @private
         */
        language: null,

        /**
         * @property {String} userPropsPath
         * The path where user properties may be requested from.
         * @private
         */
        userPropsPath: null,

        /**
         * Assembles the url to request the user properties from.
         * Apply default if no path has been set.
         * @private
         */
        getUserPropsUrl: function() {
            if (!this.userPropsPath) {
                this.userPropsPath = CQ.shared.User.PROXY_URI;
            }
            return this.userPropsPath;
        },

        /**
         * Loads the data.
         * @private
         */
        load: function() {
            var url = this.getUserPropsUrl();
            url = CQ.shared.HTTP.noCaching(url);
            var response = CQ.shared.HTTP.get(url);
            if (CQ.shared.HTTP.isOk(response)) {
                this.data = CQ.shared.Util.eval(response);
            }
        },

        /**
         * Instantly initializes the user via a request to server or the provided infoData if it has not already been initialized.
         * @param {Object} infoData (optional) Data to initialize the user with
         * @param {Boolean} force  (otpional) True to force initialization (in case of second initialization)
         * @return {Object} The initialization data
         */
        init: function(infoData, force) {
            if (!this.initialized || force) {
                if (infoData) {
                    // this is not used yet
                    this.data = infoData;
                } else {
                    this.load();
                }
                this.initialized = true;
            }
            return this.data;
        },

        /**
         * Initializes the user via a request to server only when user is used for the first time.
         */
        lazyInit: function() {
            this.lazyLoad = function() {
                this.load();
                this.initialized = true;
            }
        },

        /**
         * Returns if the user has been initialized.
         * @return {Boolean} True if initialized, false otherwise.
         */
        isInitialized: function() {
            return this.initialized;
        },

        /**
         * Returns the language selected by the user.
         * @return {String} The language
         */
        getLanguage: function() {
            if (!this.isInitialized() && this.lazyLoad) {
                this.lazyLoad.call(this);
            }

            this.language = this.data &&
                this.data["preferences"] &&
                this.data["preferences"]["language"] ?
                this.data["preferences"]["language"] :
                "en";
            return this.language;
        }

    }

}();

/**
 * The URI to retrieve the user info from (defaults to <code>"/libs/cq/security/userinfo.json"</code>).
 * @static
 * @final
 * @type String
 */
CQ.shared.User.PROXY_URI = CQ.shared.HTTP.externalize("/libs/cq/security/userinfo" + CQ.shared.HTTP.EXTENSION_JSON);
/*
 * Copyright 1997-2010 Day Management AG
 * Barfuesserplatz 6, 4001 Basel, Switzerland
 * All Rights Reserved.
 *
 * This software is the confidential and proprietary information of
 * Day Management AG, ("Confidential Information"). You shall not
 * disclose such Confidential Information and shall use it only in
 * accordance with the terms of the license agreement you entered into
 * with Day.
 */
//------------------------------------------------------------------------------
// Initialize the CQ shared library

CQ.shared.User.lazyInit();

CQ.shared.I18n.init({
    locale: function() {
        return document.documentElement.lang || CQ.shared.User.getLanguage();
    },
    urlPrefix: "/libs/cq/i18n/dict."
});

/**
 * @license
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modern -o ./dist/lodash.js`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
;
(function() {

    /** Used as a safe reference for `undefined` in pre ES5 environments */
    var undefined;

    /** Used to pool arrays and objects used internally */
    var arrayPool = [],
        objectPool = [];

    /** Used to generate unique IDs */
    var idCounter = 0;

    /** Used to prefix keys to avoid issues with `__proto__` and properties on `Object.prototype` */
    var keyPrefix = +new Date + '';

    /** Used as the size when optimizations are enabled for large arrays */
    var largeArraySize = 75;

    /** Used as the max size of the `arrayPool` and `objectPool` */
    var maxPoolSize = 40;

    /** Used to detect and test whitespace */
    var whitespace = (
        // whitespace
        ' \t\x0B\f\xA0\ufeff' +

        // line terminators
        '\n\r\u2028\u2029' +

        // unicode category "Zs" space separators
        '\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000'
    );

    /** Used to match empty string literals in compiled template source */
    var reEmptyStringLeading = /\b__p \+= '';/g,
        reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
        reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

    /**
     * Used to match ES6 template delimiters
     * http://people.mozilla.org/~jorendorff/es6-draft.html#sec-literals-string-literals
     */
    var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

    /** Used to match regexp flags from their coerced string values */
    var reFlags = /\w*$/;

    /** Used to detected named functions */
    var reFuncName = /^\s*function[ \n\r\t]+\w/;

    /** Used to match "interpolate" template delimiters */
    var reInterpolate = /<%=([\s\S]+?)%>/g;

    /** Used to match leading whitespace and zeros to be removed */
    var reLeadingSpacesAndZeros = RegExp('^[' + whitespace + ']*0+(?=.$)');

    /** Used to ensure capturing order of template delimiters */
    var reNoMatch = /($^)/;

    /** Used to detect functions containing a `this` reference */
    var reThis = /\bthis\b/;

    /** Used to match unescaped characters in compiled string literals */
    var reUnescapedString = /['\n\r\t\u2028\u2029\\]/g;

    /** Used to assign default `context` object properties */
    var contextProps = [
        'Array', 'Boolean', 'Date', 'Function', 'Math', 'Number', 'Object',
        'RegExp', 'String', '_', 'attachEvent', 'clearTimeout', 'isFinite', 'isNaN',
        'parseInt', 'setTimeout'
    ];

    /** Used to make template sourceURLs easier to identify */
    var templateCounter = 0;

    /** `Object#toString` result shortcuts */
    var argsClass = '[object Arguments]',
        arrayClass = '[object Array]',
        boolClass = '[object Boolean]',
        dateClass = '[object Date]',
        funcClass = '[object Function]',
        numberClass = '[object Number]',
        objectClass = '[object Object]',
        regexpClass = '[object RegExp]',
        stringClass = '[object String]';

    /** Used to identify object classifications that `_.clone` supports */
    var cloneableClasses = {};
    cloneableClasses[funcClass] = false;
    cloneableClasses[argsClass] = cloneableClasses[arrayClass] =
        cloneableClasses[boolClass] = cloneableClasses[dateClass] =
        cloneableClasses[numberClass] = cloneableClasses[objectClass] =
        cloneableClasses[regexpClass] = cloneableClasses[stringClass] = true;

    /** Used as an internal `_.debounce` options object */
    var debounceOptions = {
        'leading': false,
        'maxWait': 0,
        'trailing': false
    };

    /** Used as the property descriptor for `__bindData__` */
    var descriptor = {
        'configurable': false,
        'enumerable': false,
        'value': null,
        'writable': false
    };

    /** Used to determine if values are of the language type Object */
    var objectTypes = {
        'boolean': false,
        'function': true,
        'object': true,
        'number': false,
        'string': false,
        'undefined': false
    };

    /** Used to escape characters for inclusion in compiled string literals */
    var stringEscapes = {
        '\\': '\\',
        "'": "'",
        '\n': 'n',
        '\r': 'r',
        '\t': 't',
        '\u2028': 'u2028',
        '\u2029': 'u2029'
    };

    /** Used as a reference to the global object */
    var root = (objectTypes[typeof window] && window) || this;

    /** Detect free variable `exports` */
    var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

    /** Detect free variable `module` */
    var freeModule = objectTypes[typeof module] && module && !module.nodeType && module;

    /** Detect the popular CommonJS extension `module.exports` */
    var moduleExports = freeModule && freeModule.exports === freeExports && freeExports;

    /** Detect free variable `global` from Node.js or Browserified code and use it as `root` */
    var freeGlobal = objectTypes[typeof global] && global;
    if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal)) {
        root = freeGlobal;
    }

    /*--------------------------------------------------------------------------*/

    /**
     * The base implementation of `_.indexOf` without support for binary searches
     * or `fromIndex` constraints.
     *
     * @private
     * @param {Array} array The array to search.
     * @param {*} value The value to search for.
     * @param {number} [fromIndex=0] The index to search from.
     * @returns {number} Returns the index of the matched value or `-1`.
     */
    function baseIndexOf(array, value, fromIndex) {
        var index = (fromIndex || 0) - 1,
            length = array ? array.length : 0;

        while (++index < length) {
            if (array[index] === value) {
                return index;
            }
        }
        return -1;
    }

    /**
     * An implementation of `_.contains` for cache objects that mimics the return
     * signature of `_.indexOf` by returning `0` if the value is found, else `-1`.
     *
     * @private
     * @param {Object} cache The cache object to inspect.
     * @param {*} value The value to search for.
     * @returns {number} Returns `0` if `value` is found, else `-1`.
     */
    function cacheIndexOf(cache, value) {
        var type = typeof value;
        cache = cache.cache;

        if (type == 'boolean' || value == null) {
            return cache[value] ? 0 : -1;
        }
        if (type != 'number' && type != 'string') {
            type = 'object';
        }
        var key = type == 'number' ? value : keyPrefix + value;
        cache = (cache = cache[type]) && cache[key];

        return type == 'object' ?
            (cache && baseIndexOf(cache, value) > -1 ? 0 : -1) :
            (cache ? 0 : -1);
    }

    /**
     * Adds a given value to the corresponding cache object.
     *
     * @private
     * @param {*} value The value to add to the cache.
     */
    function cachePush(value) {
        var cache = this.cache,
            type = typeof value;

        if (type == 'boolean' || value == null) {
            cache[value] = true;
        } else {
            if (type != 'number' && type != 'string') {
                type = 'object';
            }
            var key = type == 'number' ? value : keyPrefix + value,
                typeCache = cache[type] || (cache[type] = {});

            if (type == 'object') {
                (typeCache[key] || (typeCache[key] = [])).push(value);
            } else {
                typeCache[key] = true;
            }
        }
    }

    /**
     * Used by `_.max` and `_.min` as the default callback when a given
     * collection is a string value.
     *
     * @private
     * @param {string} value The character to inspect.
     * @returns {number} Returns the code unit of given character.
     */
    function charAtCallback(value) {
        return value.charCodeAt(0);
    }

    /**
     * Used by `sortBy` to compare transformed `collection` elements, stable sorting
     * them in ascending order.
     *
     * @private
     * @param {Object} a The object to compare to `b`.
     * @param {Object} b The object to compare to `a`.
     * @returns {number} Returns the sort order indicator of `1` or `-1`.
     */
    function compareAscending(a, b) {
        var ac = a.criteria,
            bc = b.criteria,
            index = -1,
            length = ac.length;

        while (++index < length) {
            var value = ac[index],
                other = bc[index];

            if (value !== other) {
                if (value > other || typeof value == 'undefined') {
                    return 1;
                }
                if (value < other || typeof other == 'undefined') {
                    return -1;
                }
            }
        }
        // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
        // that causes it, under certain circumstances, to return the same value for
        // `a` and `b`. See https://github.com/jashkenas/underscore/pull/1247
        //
        // This also ensures a stable sort in V8 and other engines.
        // See http://code.google.com/p/v8/issues/detail?id=90
        return a.index - b.index;
    }

    /**
     * Creates a cache object to optimize linear searches of large arrays.
     *
     * @private
     * @param {Array} [array=[]] The array to search.
     * @returns {null|Object} Returns the cache object or `null` if caching should not be used.
     */
    function createCache(array) {
        var index = -1,
            length = array.length,
            first = array[0],
            mid = array[(length / 2) | 0],
            last = array[length - 1];

        if (first && typeof first == 'object' &&
            mid && typeof mid == 'object' && last && typeof last == 'object') {
            return false;
        }
        var cache = getObject();
        cache['false'] = cache['null'] = cache['true'] = cache['undefined'] = false;

        var result = getObject();
        result.array = array;
        result.cache = cache;
        result.push = cachePush;

        while (++index < length) {
            result.push(array[index]);
        }
        return result;
    }

    /**
     * Used by `template` to escape characters for inclusion in compiled
     * string literals.
     *
     * @private
     * @param {string} match The matched character to escape.
     * @returns {string} Returns the escaped character.
     */
    function escapeStringChar(match) {
        return '\\' + stringEscapes[match];
    }

    /**
     * Gets an array from the array pool or creates a new one if the pool is empty.
     *
     * @private
     * @returns {Array} The array from the pool.
     */
    function getArray() {
        return arrayPool.pop() || [];
    }

    /**
     * Gets an object from the object pool or creates a new one if the pool is empty.
     *
     * @private
     * @returns {Object} The object from the pool.
     */
    function getObject() {
        return objectPool.pop() || {
            'array': null,
            'cache': null,
            'criteria': null,
            'false': false,
            'index': 0,
            'null': false,
            'number': null,
            'object': null,
            'push': null,
            'string': null,
            'true': false,
            'undefined': false,
            'value': null
        };
    }

    /**
     * Releases the given array back to the array pool.
     *
     * @private
     * @param {Array} [array] The array to release.
     */
    function releaseArray(array) {
        array.length = 0;
        if (arrayPool.length < maxPoolSize) {
            arrayPool.push(array);
        }
    }

    /**
     * Releases the given object back to the object pool.
     *
     * @private
     * @param {Object} [object] The object to release.
     */
    function releaseObject(object) {
        var cache = object.cache;
        if (cache) {
            releaseObject(cache);
        }
        object.array = object.cache = object.criteria = object.object = object.number = object.string = object.value = null;
        if (objectPool.length < maxPoolSize) {
            objectPool.push(object);
        }
    }

    /**
     * Slices the `collection` from the `start` index up to, but not including,
     * the `end` index.
     *
     * Note: This function is used instead of `Array#slice` to support node lists
     * in IE < 9 and to ensure dense arrays are returned.
     *
     * @private
     * @param {Array|Object|string} collection The collection to slice.
     * @param {number} start The start index.
     * @param {number} end The end index.
     * @returns {Array} Returns the new array.
     */
    function slice(array, start, end) {
        start || (start = 0);
        if (typeof end == 'undefined') {
            end = array ? array.length : 0;
        }
        var index = -1,
            length = end - start || 0,
            result = Array(length < 0 ? 0 : length);

        while (++index < length) {
            result[index] = array[start + index];
        }
        return result;
    }

    /*--------------------------------------------------------------------------*/

    /**
     * Create a new `lodash` function using the given context object.
     *
     * @static
     * @memberOf _
     * @category Utilities
     * @param {Object} [context=root] The context object.
     * @returns {Function} Returns the `lodash` function.
     */
    function runInContext(context) {
        // Avoid issues with some ES3 environments that attempt to use values, named
        // after built-in constructors like `Object`, for the creation of literals.
        // ES5 clears this up by stating that literals must use built-in constructors.
        // See http://es5.github.io/#x11.1.5.
        context = context ? _.defaults(root.Object(), context, _.pick(root, contextProps)) : root;

        /** Native constructor references */
        var Array = context.Array,
            Boolean = context.Boolean,
            Date = context.Date,
            Function = context.Function,
            Math = context.Math,
            Number = context.Number,
            Object = context.Object,
            RegExp = context.RegExp,
            String = context.String,
            TypeError = context.TypeError;

        /**
         * Used for `Array` method references.
         *
         * Normally `Array.prototype` would suffice, however, using an array literal
         * avoids issues in Narwhal.
         */
        var arrayRef = [];

        /** Used for native method references */
        var objectProto = Object.prototype;

        /** Used to restore the original `_` reference in `noConflict` */
        var oldDash = context._;

        /** Used to resolve the internal [[Class]] of values */
        var toString = objectProto.toString;

        /** Used to detect if a method is native */
        var reNative = RegExp('^' +
            String(toString)
            .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
            .replace(/toString| for [^\]]+/g, '.*?') + '$'
        );

        /** Native method shortcuts */
        var ceil = Math.ceil,
            clearTimeout = context.clearTimeout,
            floor = Math.floor,
            fnToString = Function.prototype.toString,
            getPrototypeOf = isNative(getPrototypeOf = Object.getPrototypeOf) && getPrototypeOf,
            hasOwnProperty = objectProto.hasOwnProperty,
            push = arrayRef.push,
            setTimeout = context.setTimeout,
            splice = arrayRef.splice,
            unshift = arrayRef.unshift;

        /** Used to set meta data on functions */
        var defineProperty = (function() {
            // IE 8 only accepts DOM elements
            try {
                var o = {},
                    func = isNative(func = Object.defineProperty) && func,
                    result = func(o, o, o) && func;
            } catch (e) {}
            return result;
        }());

        /* Native method shortcuts for methods with the same name as other `lodash` methods */
        var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate,
            nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray,
            nativeIsFinite = context.isFinite,
            nativeIsNaN = context.isNaN,
            nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys,
            nativeMax = Math.max,
            nativeMin = Math.min,
            nativeParseInt = context.parseInt,
            nativeRandom = Math.random;

        /** Used to lookup a built-in constructor by [[Class]] */
        var ctorByClass = {};
        ctorByClass[arrayClass] = Array;
        ctorByClass[boolClass] = Boolean;
        ctorByClass[dateClass] = Date;
        ctorByClass[funcClass] = Function;
        ctorByClass[objectClass] = Object;
        ctorByClass[numberClass] = Number;
        ctorByClass[regexpClass] = RegExp;
        ctorByClass[stringClass] = String;

        /*--------------------------------------------------------------------------*/

        /**
         * Creates a `lodash` object which wraps the given value to enable intuitive
         * method chaining.
         *
         * In addition to Lo-Dash methods, wrappers also have the following `Array` methods:
         * `concat`, `join`, `pop`, `push`, `reverse`, `shift`, `slice`, `sort`, `splice`,
         * and `unshift`
         *
         * Chaining is supported in custom builds as long as the `value` method is
         * implicitly or explicitly included in the build.
         *
         * The chainable wrapper functions are:
         * `after`, `assign`, `bind`, `bindAll`, `bindKey`, `chain`, `compact`,
         * `compose`, `concat`, `countBy`, `create`, `createCallback`, `curry`,
         * `debounce`, `defaults`, `defer`, `delay`, `difference`, `filter`, `flatten`,
         * `forEach`, `forEachRight`, `forIn`, `forInRight`, `forOwn`, `forOwnRight`,
         * `functions`, `groupBy`, `indexBy`, `initial`, `intersection`, `invert`,
         * `invoke`, `keys`, `map`, `max`, `memoize`, `merge`, `min`, `object`, `omit`,
         * `once`, `pairs`, `partial`, `partialRight`, `pick`, `pluck`, `pull`, `push`,
         * `range`, `reject`, `remove`, `rest`, `reverse`, `shuffle`, `slice`, `sort`,
         * `sortBy`, `splice`, `tap`, `throttle`, `times`, `toArray`, `transform`,
         * `union`, `uniq`, `unshift`, `unzip`, `values`, `where`, `without`, `wrap`,
         * and `zip`
         *
         * The non-chainable wrapper functions are:
         * `clone`, `cloneDeep`, `contains`, `escape`, `every`, `find`, `findIndex`,
         * `findKey`, `findLast`, `findLastIndex`, `findLastKey`, `has`, `identity`,
         * `indexOf`, `isArguments`, `isArray`, `isBoolean`, `isDate`, `isElement`,
         * `isEmpty`, `isEqual`, `isFinite`, `isFunction`, `isNaN`, `isNull`, `isNumber`,
         * `isObject`, `isPlainObject`, `isRegExp`, `isString`, `isUndefined`, `join`,
         * `lastIndexOf`, `mixin`, `noConflict`, `parseInt`, `pop`, `random`, `reduce`,
         * `reduceRight`, `result`, `shift`, `size`, `some`, `sortedIndex`, `runInContext`,
         * `template`, `unescape`, `uniqueId`, and `value`
         *
         * The wrapper functions `first` and `last` return wrapped values when `n` is
         * provided, otherwise they return unwrapped values.
         *
         * Explicit chaining can be enabled by using the `_.chain` method.
         *
         * @name _
         * @constructor
         * @category Chaining
         * @param {*} value The value to wrap in a `lodash` instance.
         * @returns {Object} Returns a `lodash` instance.
         * @example
         *
         * var wrapped = _([1, 2, 3]);
         *
         * // returns an unwrapped value
         * wrapped.reduce(function(sum, num) {
         *   return sum + num;
         * });
         * // => 6
         *
         * // returns a wrapped value
         * var squares = wrapped.map(function(num) {
         *   return num * num;
         * });
         *
         * _.isArray(squares);
         * // => false
         *
         * _.isArray(squares.value());
         * // => true
         */
        function lodash(value) {
            // don't wrap if already wrapped, even if wrapped by a different `lodash` constructor
            return (value && typeof value == 'object' && !isArray(value) && hasOwnProperty.call(value, '__wrapped__')) ?
                value :
                new lodashWrapper(value);
        }

        /**
         * A fast path for creating `lodash` wrapper objects.
         *
         * @private
         * @param {*} value The value to wrap in a `lodash` instance.
         * @param {boolean} chainAll A flag to enable chaining for all methods
         * @returns {Object} Returns a `lodash` instance.
         */
        function lodashWrapper(value, chainAll) {
            this.__chain__ = !!chainAll;
            this.__wrapped__ = value;
        }
        // ensure `new lodashWrapper` is an instance of `lodash`
        lodashWrapper.prototype = lodash.prototype;

        /**
         * An object used to flag environments features.
         *
         * @static
         * @memberOf _
         * @type Object
         */
        var support = lodash.support = {};

        /**
         * Detect if functions can be decompiled by `Function#toString`
         * (all but PS3 and older Opera mobile browsers & avoided in Windows 8 apps).
         *
         * @memberOf _.support
         * @type boolean
         */
        support.funcDecomp = !isNative(context.WinRTError) && reThis.test(runInContext);

        /**
         * Detect if `Function#name` is supported (all but IE).
         *
         * @memberOf _.support
         * @type boolean
         */
        support.funcNames = typeof Function.name == 'string';

        /**
         * By default, the template delimiters used by Lo-Dash are similar to those in
         * embedded Ruby (ERB). Change the following template settings to use alternative
         * delimiters.
         *
         * @static
         * @memberOf _
         * @type Object
         */
        lodash.templateSettings = {

            /**
             * Used to detect `data` property values to be HTML-escaped.
             *
             * @memberOf _.templateSettings
             * @type RegExp
             */
            'escape': /<%-([\s\S]+?)%>/g,

            /**
             * Used to detect code to be evaluated.
             *
             * @memberOf _.templateSettings
             * @type RegExp
             */
            'evaluate': /<%([\s\S]+?)%>/g,

            /**
             * Used to detect `data` property values to inject.
             *
             * @memberOf _.templateSettings
             * @type RegExp
             */
            'interpolate': reInterpolate,

            /**
             * Used to reference the data object in the template text.
             *
             * @memberOf _.templateSettings
             * @type string
             */
            'variable': '',

            /**
             * Used to import variables into the compiled template.
             *
             * @memberOf _.templateSettings
             * @type Object
             */
            'imports': {

                /**
                 * A reference to the `lodash` function.
                 *
                 * @memberOf _.templateSettings.imports
                 * @type Function
                 */
                '_': lodash
            }
        };

        /*--------------------------------------------------------------------------*/

        /**
         * The base implementation of `_.bind` that creates the bound function and
         * sets its meta data.
         *
         * @private
         * @param {Array} bindData The bind data array.
         * @returns {Function} Returns the new bound function.
         */
        function baseBind(bindData) {
            var func = bindData[0],
                partialArgs = bindData[2],
                thisArg = bindData[4];

            function bound() {
                // `Function#bind` spec
                // http://es5.github.io/#x15.3.4.5
                if (partialArgs) {
                    // avoid `arguments` object deoptimizations by using `slice` instead
                    // of `Array.prototype.slice.call` and not assigning `arguments` to a
                    // variable as a ternary expression
                    var args = slice(partialArgs);
                    push.apply(args, arguments);
                }
                // mimic the constructor's `return` behavior
                // http://es5.github.io/#x13.2.2
                if (this instanceof bound) {
                    // ensure `new bound` is an instance of `func`
                    var thisBinding = baseCreate(func.prototype),
                        result = func.apply(thisBinding, args || arguments);
                    return isObject(result) ? result : thisBinding;
                }
                return func.apply(thisArg, args || arguments);
            }
            setBindData(bound, bindData);
            return bound;
        }

        /**
         * The base implementation of `_.clone` without argument juggling or support
         * for `thisArg` binding.
         *
         * @private
         * @param {*} value The value to clone.
         * @param {boolean} [isDeep=false] Specify a deep clone.
         * @param {Function} [callback] The function to customize cloning values.
         * @param {Array} [stackA=[]] Tracks traversed source objects.
         * @param {Array} [stackB=[]] Associates clones with source counterparts.
         * @returns {*} Returns the cloned value.
         */
        function baseClone(value, isDeep, callback, stackA, stackB) {
            if (callback) {
                var result = callback(value);
                if (typeof result != 'undefined') {
                    return result;
                }
            }
            // inspect [[Class]]
            var isObj = isObject(value);
            if (isObj) {
                var className = toString.call(value);
                if (!cloneableClasses[className]) {
                    return value;
                }
                var ctor = ctorByClass[className];
                switch (className) {
                    case boolClass:
                    case dateClass:
                        return new ctor(+value);

                    case numberClass:
                    case stringClass:
                        return new ctor(value);

                    case regexpClass:
                        result = ctor(value.source, reFlags.exec(value));
                        result.lastIndex = value.lastIndex;
                        return result;
                }
            } else {
                return value;
            }
            var isArr = isArray(value);
            if (isDeep) {
                // check for circular references and return corresponding clone
                var initedStack = !stackA;
                stackA || (stackA = getArray());
                stackB || (stackB = getArray());

                var length = stackA.length;
                while (length--) {
                    if (stackA[length] == value) {
                        return stackB[length];
                    }
                }
                result = isArr ? ctor(value.length) : {};
            } else {
                result = isArr ? slice(value) : assign({}, value);
            }
            // add array properties assigned by `RegExp#exec`
            if (isArr) {
                if (hasOwnProperty.call(value, 'index')) {
                    result.index = value.index;
                }
                if (hasOwnProperty.call(value, 'input')) {
                    result.input = value.input;
                }
            }
            // exit for shallow clone
            if (!isDeep) {
                return result;
            }
            // add the source value to the stack of traversed objects
            // and associate it with its clone
            stackA.push(value);
            stackB.push(result);

            // recursively populate clone (susceptible to call stack limits)
            (isArr ? forEach : forOwn)(value, function(objValue, key) {
                result[key] = baseClone(objValue, isDeep, callback, stackA, stackB);
            });

            if (initedStack) {
                releaseArray(stackA);
                releaseArray(stackB);
            }
            return result;
        }

        /**
         * The base implementation of `_.create` without support for assigning
         * properties to the created object.
         *
         * @private
         * @param {Object} prototype The object to inherit from.
         * @returns {Object} Returns the new object.
         */
        function baseCreate(prototype, properties) {
            return isObject(prototype) ? nativeCreate(prototype) : {};
        }
        // fallback for browsers without `Object.create`
        if (!nativeCreate) {
            baseCreate = (function() {
                function Object() {}
                return function(prototype) {
                    if (isObject(prototype)) {
                        Object.prototype = prototype;
                        var result = new Object;
                        Object.prototype = null;
                    }
                    return result || context.Object();
                };
            }());
        }

        /**
         * The base implementation of `_.createCallback` without support for creating
         * "_.pluck" or "_.where" style callbacks.
         *
         * @private
         * @param {*} [func=identity] The value to convert to a callback.
         * @param {*} [thisArg] The `this` binding of the created callback.
         * @param {number} [argCount] The number of arguments the callback accepts.
         * @returns {Function} Returns a callback function.
         */
        function baseCreateCallback(func, thisArg, argCount) {
            if (typeof func != 'function') {
                return identity;
            }
            // exit early for no `thisArg` or already bound by `Function#bind`
            if (typeof thisArg == 'undefined' || !('prototype' in func)) {
                return func;
            }
            var bindData = func.__bindData__;
            if (typeof bindData == 'undefined') {
                if (support.funcNames) {
                    bindData = !func.name;
                }
                bindData = bindData || !support.funcDecomp;
                if (!bindData) {
                    var source = fnToString.call(func);
                    if (!support.funcNames) {
                        bindData = !reFuncName.test(source);
                    }
                    if (!bindData) {
                        // checks if `func` references the `this` keyword and stores the result
                        bindData = reThis.test(source);
                        setBindData(func, bindData);
                    }
                }
            }
            // exit early if there are no `this` references or `func` is bound
            if (bindData === false || (bindData !== true && bindData[1] & 1)) {
                return func;
            }
            switch (argCount) {
                case 1:
                    return function(value) {
                        return func.call(thisArg, value);
                    };
                case 2:
                    return function(a, b) {
                        return func.call(thisArg, a, b);
                    };
                case 3:
                    return function(value, index, collection) {
                        return func.call(thisArg, value, index, collection);
                    };
                case 4:
                    return function(accumulator, value, index, collection) {
                        return func.call(thisArg, accumulator, value, index, collection);
                    };
            }
            return bind(func, thisArg);
        }

        /**
         * The base implementation of `createWrapper` that creates the wrapper and
         * sets its meta data.
         *
         * @private
         * @param {Array} bindData The bind data array.
         * @returns {Function} Returns the new function.
         */
        function baseCreateWrapper(bindData) {
            var func = bindData[0],
                bitmask = bindData[1],
                partialArgs = bindData[2],
                partialRightArgs = bindData[3],
                thisArg = bindData[4],
                arity = bindData[5];

            var isBind = bitmask & 1,
                isBindKey = bitmask & 2,
                isCurry = bitmask & 4,
                isCurryBound = bitmask & 8,
                key = func;

            function bound() {
                var thisBinding = isBind ? thisArg : this;
                if (partialArgs) {
                    var args = slice(partialArgs);
                    push.apply(args, arguments);
                }
                if (partialRightArgs || isCurry) {
                    args || (args = slice(arguments));
                    if (partialRightArgs) {
                        push.apply(args, partialRightArgs);
                    }
                    if (isCurry && args.length < arity) {
                        bitmask |= 16 & ~32;
                        return baseCreateWrapper([func, (isCurryBound ? bitmask : bitmask & ~3), args, null, thisArg, arity]);
                    }
                }
                args || (args = arguments);
                if (isBindKey) {
                    func = thisBinding[key];
                }
                if (this instanceof bound) {
                    thisBinding = baseCreate(func.prototype);
                    var result = func.apply(thisBinding, args);
                    return isObject(result) ? result : thisBinding;
                }
                return func.apply(thisBinding, args);
            }
            setBindData(bound, bindData);
            return bound;
        }

        /**
         * The base implementation of `_.difference` that accepts a single array
         * of values to exclude.
         *
         * @private
         * @param {Array} array The array to process.
         * @param {Array} [values] The array of values to exclude.
         * @returns {Array} Returns a new array of filtered values.
         */
        function baseDifference(array, values) {
            var index = -1,
                indexOf = getIndexOf(),
                length = array ? array.length : 0,
                isLarge = length >= largeArraySize && indexOf === baseIndexOf,
                result = [];

            if (isLarge) {
                var cache = createCache(values);
                if (cache) {
                    indexOf = cacheIndexOf;
                    values = cache;
                } else {
                    isLarge = false;
                }
            }
            while (++index < length) {
                var value = array[index];
                if (indexOf(values, value) < 0) {
                    result.push(value);
                }
            }
            if (isLarge) {
                releaseObject(values);
            }
            return result;
        }

        /**
         * The base implementation of `_.flatten` without support for callback
         * shorthands or `thisArg` binding.
         *
         * @private
         * @param {Array} array The array to flatten.
         * @param {boolean} [isShallow=false] A flag to restrict flattening to a single level.
         * @param {boolean} [isStrict=false] A flag to restrict flattening to arrays and `arguments` objects.
         * @param {number} [fromIndex=0] The index to start from.
         * @returns {Array} Returns a new flattened array.
         */
        function baseFlatten(array, isShallow, isStrict, fromIndex) {
            var index = (fromIndex || 0) - 1,
                length = array ? array.length : 0,
                result = [];

            while (++index < length) {
                var value = array[index];

                if (value && typeof value == 'object' && typeof value.length == 'number' &&
                    (isArray(value) || isArguments(value))) {
                    // recursively flatten arrays (susceptible to call stack limits)
                    if (!isShallow) {
                        value = baseFlatten(value, isShallow, isStrict);
                    }
                    var valIndex = -1,
                        valLength = value.length,
                        resIndex = result.length;

                    result.length += valLength;
                    while (++valIndex < valLength) {
                        result[resIndex++] = value[valIndex];
                    }
                } else if (!isStrict) {
                    result.push(value);
                }
            }
            return result;
        }

        /**
         * The base implementation of `_.isEqual`, without support for `thisArg` binding,
         * that allows partial "_.where" style comparisons.
         *
         * @private
         * @param {*} a The value to compare.
         * @param {*} b The other value to compare.
         * @param {Function} [callback] The function to customize comparing values.
         * @param {Function} [isWhere=false] A flag to indicate performing partial comparisons.
         * @param {Array} [stackA=[]] Tracks traversed `a` objects.
         * @param {Array} [stackB=[]] Tracks traversed `b` objects.
         * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
         */
        function baseIsEqual(a, b, callback, isWhere, stackA, stackB) {
            // used to indicate that when comparing objects, `a` has at least the properties of `b`
            if (callback) {
                var result = callback(a, b);
                if (typeof result != 'undefined') {
                    return !!result;
                }
            }
            // exit early for identical values
            if (a === b) {
                // treat `+0` vs. `-0` as not equal
                return a !== 0 || (1 / a == 1 / b);
            }
            var type = typeof a,
                otherType = typeof b;

            // exit early for unlike primitive values
            if (a === a &&
                !(a && objectTypes[type]) &&
                !(b && objectTypes[otherType])) {
                return false;
            }
            // exit early for `null` and `undefined` avoiding ES3's Function#call behavior
            // http://es5.github.io/#x15.3.4.4
            if (a == null || b == null) {
                return a === b;
            }
            // compare [[Class]] names
            var className = toString.call(a),
                otherClass = toString.call(b);

            if (className == argsClass) {
                className = objectClass;
            }
            if (otherClass == argsClass) {
                otherClass = objectClass;
            }
            if (className != otherClass) {
                return false;
            }
            switch (className) {
                case boolClass:
                case dateClass:
                    // coerce dates and booleans to numbers, dates to milliseconds and booleans
                    // to `1` or `0` treating invalid dates coerced to `NaN` as not equal
                    return +a == +b;

                case numberClass:
                    // treat `NaN` vs. `NaN` as equal
                    return (a != +a) ?
                        b != +b
                        // but treat `+0` vs. `-0` as not equal
                        :
                        (a == 0 ? (1 / a == 1 / b) : a == +b);

                case regexpClass:
                case stringClass:
                    // coerce regexes to strings (http://es5.github.io/#x15.10.6.4)
                    // treat string primitives and their corresponding object instances as equal
                    return a == String(b);
            }
            var isArr = className == arrayClass;
            if (!isArr) {
                // unwrap any `lodash` wrapped values
                var aWrapped = hasOwnProperty.call(a, '__wrapped__'),
                    bWrapped = hasOwnProperty.call(b, '__wrapped__');

                if (aWrapped || bWrapped) {
                    return baseIsEqual(aWrapped ? a.__wrapped__ : a, bWrapped ? b.__wrapped__ : b, callback, isWhere, stackA, stackB);
                }
                // exit for functions and DOM nodes
                if (className != objectClass) {
                    return false;
                }
                // in older versions of Opera, `arguments` objects have `Array` constructors
                var ctorA = a.constructor,
                    ctorB = b.constructor;

                // non `Object` object instances with different constructors are not equal
                if (ctorA != ctorB &&
                    !(isFunction(ctorA) && ctorA instanceof ctorA && isFunction(ctorB) && ctorB instanceof ctorB) &&
                    ('constructor' in a && 'constructor' in b)
                ) {
                    return false;
                }
            }
            // assume cyclic structures are equal
            // the algorithm for detecting cyclic structures is adapted from ES 5.1
            // section 15.12.3, abstract operation `JO` (http://es5.github.io/#x15.12.3)
            var initedStack = !stackA;
            stackA || (stackA = getArray());
            stackB || (stackB = getArray());

            var length = stackA.length;
            while (length--) {
                if (stackA[length] == a) {
                    return stackB[length] == b;
                }
            }
            var size = 0;
            result = true;

            // add `a` and `b` to the stack of traversed objects
            stackA.push(a);
            stackB.push(b);

            // recursively compare objects and arrays (susceptible to call stack limits)
            if (isArr) {
                // compare lengths to determine if a deep comparison is necessary
                length = a.length;
                size = b.length;
                result = size == length;

                if (result || isWhere) {
                    // deep compare the contents, ignoring non-numeric properties
                    while (size--) {
                        var index = length,
                            value = b[size];

                        if (isWhere) {
                            while (index--) {
                                if ((result = baseIsEqual(a[index], value, callback, isWhere, stackA, stackB))) {
                                    break;
                                }
                            }
                        } else if (!(result = baseIsEqual(a[size], value, callback, isWhere, stackA, stackB))) {
                            break;
                        }
                    }
                }
            } else {
                // deep compare objects using `forIn`, instead of `forOwn`, to avoid `Object.keys`
                // which, in this case, is more costly
                forIn(b, function(value, key, b) {
                    if (hasOwnProperty.call(b, key)) {
                        // count the number of properties.
                        size++;
                        // deep compare each property value.
                        return (result = hasOwnProperty.call(a, key) && baseIsEqual(a[key], value, callback, isWhere, stackA, stackB));
                    }
                });

                if (result && !isWhere) {
                    // ensure both objects have the same number of properties
                    forIn(a, function(value, key, a) {
                        if (hasOwnProperty.call(a, key)) {
                            // `size` will be `-1` if `a` has more properties than `b`
                            return (result = --size > -1);
                        }
                    });
                }
            }
            stackA.pop();
            stackB.pop();

            if (initedStack) {
                releaseArray(stackA);
                releaseArray(stackB);
            }
            return result;
        }

        /**
         * The base implementation of `_.merge` without argument juggling or support
         * for `thisArg` binding.
         *
         * @private
         * @param {Object} object The destination object.
         * @param {Object} source The source object.
         * @param {Function} [callback] The function to customize merging properties.
         * @param {Array} [stackA=[]] Tracks traversed source objects.
         * @param {Array} [stackB=[]] Associates values with source counterparts.
         */
        function baseMerge(object, source, callback, stackA, stackB) {
            (isArray(source) ? forEach : forOwn)(source, function(source, key) {
                var found,
                    isArr,
                    result = source,
                    value = object[key];

                if (source && ((isArr = isArray(source)) || isPlainObject(source))) {
                    // avoid merging previously merged cyclic sources
                    var stackLength = stackA.length;
                    while (stackLength--) {
                        if ((found = stackA[stackLength] == source)) {
                            value = stackB[stackLength];
                            break;
                        }
                    }
                    if (!found) {
                        var isShallow;
                        if (callback) {
                            result = callback(value, source);
                            if ((isShallow = typeof result != 'undefined')) {
                                value = result;
                            }
                        }
                        if (!isShallow) {
                            value = isArr ?
                                (isArray(value) ? value : []) :
                                (isPlainObject(value) ? value : {});
                        }
                        // add `source` and associated `value` to the stack of traversed objects
                        stackA.push(source);
                        stackB.push(value);

                        // recursively merge objects and arrays (susceptible to call stack limits)
                        if (!isShallow) {
                            baseMerge(value, source, callback, stackA, stackB);
                        }
                    }
                } else {
                    if (callback) {
                        result = callback(value, source);
                        if (typeof result == 'undefined') {
                            result = source;
                        }
                    }
                    if (typeof result != 'undefined') {
                        value = result;
                    }
                }
                object[key] = value;
            });
        }

        /**
         * The base implementation of `_.random` without argument juggling or support
         * for returning floating-point numbers.
         *
         * @private
         * @param {number} min The minimum possible value.
         * @param {number} max The maximum possible value.
         * @returns {number} Returns a random number.
         */
        function baseRandom(min, max) {
            return min + floor(nativeRandom() * (max - min + 1));
        }

        /**
         * The base implementation of `_.uniq` without support for callback shorthands
         * or `thisArg` binding.
         *
         * @private
         * @param {Array} array The array to process.
         * @param {boolean} [isSorted=false] A flag to indicate that `array` is sorted.
         * @param {Function} [callback] The function called per iteration.
         * @returns {Array} Returns a duplicate-value-free array.
         */
        function baseUniq(array, isSorted, callback) {
            var index = -1,
                indexOf = getIndexOf(),
                length = array ? array.length : 0,
                result = [];

            var isLarge = !isSorted && length >= largeArraySize && indexOf === baseIndexOf,
                seen = (callback || isLarge) ? getArray() : result;

            if (isLarge) {
                var cache = createCache(seen);
                indexOf = cacheIndexOf;
                seen = cache;
            }
            while (++index < length) {
                var value = array[index],
                    computed = callback ? callback(value, index, array) : value;

                if (isSorted ?
                    !index || seen[seen.length - 1] !== computed :
                    indexOf(seen, computed) < 0
                ) {
                    if (callback || isLarge) {
                        seen.push(computed);
                    }
                    result.push(value);
                }
            }
            if (isLarge) {
                releaseArray(seen.array);
                releaseObject(seen);
            } else if (callback) {
                releaseArray(seen);
            }
            return result;
        }

        /**
         * Creates a function that aggregates a collection, creating an object composed
         * of keys generated from the results of running each element of the collection
         * through a callback. The given `setter` function sets the keys and values
         * of the composed object.
         *
         * @private
         * @param {Function} setter The setter function.
         * @returns {Function} Returns the new aggregator function.
         */
        function createAggregator(setter) {
            return function(collection, callback, thisArg) {
                var result = {};
                callback = lodash.createCallback(callback, thisArg, 3);

                var index = -1,
                    length = collection ? collection.length : 0;

                if (typeof length == 'number') {
                    while (++index < length) {
                        var value = collection[index];
                        setter(result, value, callback(value, index, collection), collection);
                    }
                } else {
                    forOwn(collection, function(value, key, collection) {
                        setter(result, value, callback(value, key, collection), collection);
                    });
                }
                return result;
            };
        }

        /**
         * Creates a function that, when called, either curries or invokes `func`
         * with an optional `this` binding and partially applied arguments.
         *
         * @private
         * @param {Function|string} func The function or method name to reference.
         * @param {number} bitmask The bitmask of method flags to compose.
         *  The bitmask may be composed of the following flags:
         *  1 - `_.bind`
         *  2 - `_.bindKey`
         *  4 - `_.curry`
         *  8 - `_.curry` (bound)
         *  16 - `_.partial`
         *  32 - `_.partialRight`
         * @param {Array} [partialArgs] An array of arguments to prepend to those
         *  provided to the new function.
         * @param {Array} [partialRightArgs] An array of arguments to append to those
         *  provided to the new function.
         * @param {*} [thisArg] The `this` binding of `func`.
         * @param {number} [arity] The arity of `func`.
         * @returns {Function} Returns the new function.
         */
        function createWrapper(func, bitmask, partialArgs, partialRightArgs, thisArg, arity) {
            var isBind = bitmask & 1,
                isBindKey = bitmask & 2,
                isCurry = bitmask & 4,
                isCurryBound = bitmask & 8,
                isPartial = bitmask & 16,
                isPartialRight = bitmask & 32;

            if (!isBindKey && !isFunction(func)) {
                throw new TypeError;
            }
            if (isPartial && !partialArgs.length) {
                bitmask &= ~16;
                isPartial = partialArgs = false;
            }
            if (isPartialRight && !partialRightArgs.length) {
                bitmask &= ~32;
                isPartialRight = partialRightArgs = false;
            }
            var bindData = func && func.__bindData__;
            if (bindData && bindData !== true) {
                // clone `bindData`
                bindData = slice(bindData);
                if (bindData[2]) {
                    bindData[2] = slice(bindData[2]);
                }
                if (bindData[3]) {
                    bindData[3] = slice(bindData[3]);
                }
                // set `thisBinding` is not previously bound
                if (isBind && !(bindData[1] & 1)) {
                    bindData[4] = thisArg;
                }
                // set if previously bound but not currently (subsequent curried functions)
                if (!isBind && bindData[1] & 1) {
                    bitmask |= 8;
                }
                // set curried arity if not yet set
                if (isCurry && !(bindData[1] & 4)) {
                    bindData[5] = arity;
                }
                // append partial left arguments
                if (isPartial) {
                    push.apply(bindData[2] || (bindData[2] = []), partialArgs);
                }
                // append partial right arguments
                if (isPartialRight) {
                    unshift.apply(bindData[3] || (bindData[3] = []), partialRightArgs);
                }
                // merge flags
                bindData[1] |= bitmask;
                return createWrapper.apply(null, bindData);
            }
            // fast path for `_.bind`
            var creater = (bitmask == 1 || bitmask === 17) ? baseBind : baseCreateWrapper;
            return creater([func, bitmask, partialArgs, partialRightArgs, thisArg, arity]);
        }

        /**
         * Used by `escape` to convert characters to HTML entities.
         *
         * @private
         * @param {string} match The matched character to escape.
         * @returns {string} Returns the escaped character.
         */
        function escapeHtmlChar(match) {
            return htmlEscapes[match];
        }

        /**
         * Gets the appropriate "indexOf" function. If the `_.indexOf` method is
         * customized, this method returns the custom method, otherwise it returns
         * the `baseIndexOf` function.
         *
         * @private
         * @returns {Function} Returns the "indexOf" function.
         */
        function getIndexOf() {
            var result = (result = lodash.indexOf) === indexOf ? baseIndexOf : result;
            return result;
        }

        /**
         * Checks if `value` is a native function.
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if the `value` is a native function, else `false`.
         */
        function isNative(value) {
            return typeof value == 'function' && reNative.test(value);
        }

        /**
         * Sets `this` binding data on a given function.
         *
         * @private
         * @param {Function} func The function to set data on.
         * @param {Array} value The data array to set.
         */
        var setBindData = !defineProperty ? noop : function(func, value) {
            descriptor.value = value;
            defineProperty(func, '__bindData__', descriptor);
        };

        /**
         * A fallback implementation of `isPlainObject` which checks if a given value
         * is an object created by the `Object` constructor, assuming objects created
         * by the `Object` constructor have no inherited enumerable properties and that
         * there are no `Object.prototype` extensions.
         *
         * @private
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
         */
        function shimIsPlainObject(value) {
            var ctor,
                result;

            // avoid non Object objects, `arguments` objects, and DOM elements
            if (!(value && toString.call(value) == objectClass) ||
                (ctor = value.constructor, isFunction(ctor) && !(ctor instanceof ctor))) {
                return false;
            }
            // In most environments an object's own properties are iterated before
            // its inherited properties. If the last iterated property is an object's
            // own property then there are no inherited enumerable properties.
            forIn(value, function(value, key) {
                result = key;
            });
            return typeof result == 'undefined' || hasOwnProperty.call(value, result);
        }

        /**
         * Used by `unescape` to convert HTML entities to characters.
         *
         * @private
         * @param {string} match The matched character to unescape.
         * @returns {string} Returns the unescaped character.
         */
        function unescapeHtmlChar(match) {
            return htmlUnescapes[match];
        }

        /*--------------------------------------------------------------------------*/

        /**
         * Checks if `value` is an `arguments` object.
         *
         * @static
         * @memberOf _
         * @category Objects
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if the `value` is an `arguments` object, else `false`.
         * @example
         *
         * (function() { return _.isArguments(arguments); })(1, 2, 3);
         * // => true
         *
         * _.isArguments([1, 2, 3]);
         * // => false
         */
        function isArguments(value) {
            return value && typeof value == 'object' && typeof value.length == 'number' &&
                toString.call(value) == argsClass || false;
        }

        /**
         * Checks if `value` is an array.
         *
         * @static
         * @memberOf _
         * @type Function
         * @category Objects
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if the `value` is an array, else `false`.
         * @example
         *
         * (function() { return _.isArray(arguments); })();
         * // => false
         *
         * _.isArray([1, 2, 3]);
         * // => true
         */
        var isArray = nativeIsArray || function(value) {
            return value && typeof value == 'object' && typeof value.length == 'number' &&
                toString.call(value) == arrayClass || false;
        };

        /**
         * A fallback implementation of `Object.keys` which produces an array of the
         * given object's own enumerable property names.
         *
         * @private
         * @type Function
         * @param {Object} object The object to inspect.
         * @returns {Array} Returns an array of property names.
         */
        var shimKeys = function(object) {
            var index, iterable = object,
                result = [];
            if (!iterable) return result;
            if (!(objectTypes[typeof object])) return result;
            for (index in iterable) {
                if (hasOwnProperty.call(iterable, index)) {
                    result.push(index);
                }
            }
            return result
        };

        /**
         * Creates an array composed of the own enumerable property names of an object.
         *
         * @static
         * @memberOf _
         * @category Objects
         * @param {Object} object The object to inspect.
         * @returns {Array} Returns an array of property names.
         * @example
         *
         * _.keys({ 'one': 1, 'two': 2, 'three': 3 });
         * // => ['one', 'two', 'three'] (property order is not guaranteed across environments)
         */
        var keys = !nativeKeys ? shimKeys : function(object) {
            if (!isObject(object)) {
                return [];
            }
            return nativeKeys(object);
        };

        /**
         * Used to convert characters to HTML entities:
         *
         * Though the `>` character is escaped for symmetry, characters like `>` and `/`
         * don't require escaping in HTML and have no special meaning unless they're part
         * of a tag or an unquoted attribute value.
         * http://mathiasbynens.be/notes/ambiguous-ampersands (under "semi-related fun fact")
         */
        var htmlEscapes = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };

        /** Used to convert HTML entities to characters */
        var htmlUnescapes = invert(htmlEscapes);

        /** Used to match HTML entities and HTML characters */
        var reEscapedHtml = RegExp('(' + keys(htmlUnescapes).join('|') + ')', 'g'),
            reUnescapedHtml = RegExp('[' + keys(htmlEscapes).join('') + ']', 'g');

        /*--------------------------------------------------------------------------*/

        /**
         * Assigns own enumerable properties of source object(s) to the destination
         * object. Subsequent sources will overwrite property assignments of previous
         * sources. If a callback is provided it will be executed to produce the
         * assigned values. The callback is bound to `thisArg` and invoked with two
         * arguments; (objectValue, sourceValue).
         *
         * @static
         * @memberOf _
         * @type Function
         * @alias extend
         * @category Objects
         * @param {Object} object The destination object.
         * @param {...Object} [source] The source objects.
         * @param {Function} [callback] The function to customize assigning values.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {Object} Returns the destination object.
         * @example
         *
         * _.assign({ 'name': 'fred' }, { 'employer': 'slate' });
         * // => { 'name': 'fred', 'employer': 'slate' }
         *
         * var defaults = _.partialRight(_.assign, function(a, b) {
         *   return typeof a == 'undefined' ? b : a;
         * });
         *
         * var object = { 'name': 'barney' };
         * defaults(object, { 'name': 'fred', 'employer': 'slate' });
         * // => { 'name': 'barney', 'employer': 'slate' }
         */
        var assign = function(object, source, guard) {
            var index, iterable = object,
                result = iterable;
            if (!iterable) return result;
            var args = arguments,
                argsIndex = 0,
                argsLength = typeof guard == 'number' ? 2 : args.length;
            if (argsLength > 3 && typeof args[argsLength - 2] == 'function') {
                var callback = baseCreateCallback(args[--argsLength - 1], args[argsLength--], 2);
            } else if (argsLength > 2 && typeof args[argsLength - 1] == 'function') {
                callback = args[--argsLength];
            }
            while (++argsIndex < argsLength) {
                iterable = args[argsIndex];
                if (iterable && objectTypes[typeof iterable]) {
                    var ownIndex = -1,
                        ownProps = objectTypes[typeof iterable] && keys(iterable),
                        length = ownProps ? ownProps.length : 0;

                    while (++ownIndex < length) {
                        index = ownProps[ownIndex];
                        result[index] = callback ? callback(result[index], iterable[index]) : iterable[index];
                    }
                }
            }
            return result
        };

        /**
         * Creates a clone of `value`. If `isDeep` is `true` nested objects will also
         * be cloned, otherwise they will be assigned by reference. If a callback
         * is provided it will be executed to produce the cloned values. If the
         * callback returns `undefined` cloning will be handled by the method instead.
         * The callback is bound to `thisArg` and invoked with one argument; (value).
         *
         * @static
         * @memberOf _
         * @category Objects
         * @param {*} value The value to clone.
         * @param {boolean} [isDeep=false] Specify a deep clone.
         * @param {Function} [callback] The function to customize cloning values.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {*} Returns the cloned value.
         * @example
         *
         * var characters = [
         *   { 'name': 'barney', 'age': 36 },
         *   { 'name': 'fred',   'age': 40 }
         * ];
         *
         * var shallow = _.clone(characters);
         * shallow[0] === characters[0];
         * // => true
         *
         * var deep = _.clone(characters, true);
         * deep[0] === characters[0];
         * // => false
         *
         * _.mixin({
         *   'clone': _.partialRight(_.clone, function(value) {
         *     return _.isElement(value) ? value.cloneNode(false) : undefined;
         *   })
         * });
         *
         * var clone = _.clone(document.body);
         * clone.childNodes.length;
         * // => 0
         */
        function clone(value, isDeep, callback, thisArg) {
            // allows working with "Collections" methods without using their `index`
            // and `collection` arguments for `isDeep` and `callback`
            if (typeof isDeep != 'boolean' && isDeep != null) {
                thisArg = callback;
                callback = isDeep;
                isDeep = false;
            }
            return baseClone(value, isDeep, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 1));
        }

        /**
         * Creates a deep clone of `value`. If a callback is provided it will be
         * executed to produce the cloned values. If the callback returns `undefined`
         * cloning will be handled by the method instead. The callback is bound to
         * `thisArg` and invoked with one argument; (value).
         *
         * Note: This method is loosely based on the structured clone algorithm. Functions
         * and DOM nodes are **not** cloned. The enumerable properties of `arguments` objects and
         * objects created by constructors other than `Object` are cloned to plain `Object` objects.
         * See http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm.
         *
         * @static
         * @memberOf _
         * @category Objects
         * @param {*} value The value to deep clone.
         * @param {Function} [callback] The function to customize cloning values.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {*} Returns the deep cloned value.
         * @example
         *
         * var characters = [
         *   { 'name': 'barney', 'age': 36 },
         *   { 'name': 'fred',   'age': 40 }
         * ];
         *
         * var deep = _.cloneDeep(characters);
         * deep[0] === characters[0];
         * // => false
         *
         * var view = {
         *   'label': 'docs',
         *   'node': element
         * };
         *
         * var clone = _.cloneDeep(view, function(value) {
         *   return _.isElement(value) ? value.cloneNode(true) : undefined;
         * });
         *
         * clone.node == view.node;
         * // => false
         */
        function cloneDeep(value, callback, thisArg) {
            return baseClone(value, true, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 1));
        }

        /**
         * Creates an object that inherits from the given `prototype` object. If a
         * `properties` object is provided its own enumerable properties are assigned
         * to the created object.
         *
         * @static
         * @memberOf _
         * @category Objects
         * @param {Object} prototype The object to inherit from.
         * @param {Object} [properties] The properties to assign to the object.
         * @returns {Object} Returns the new object.
         * @example
         *
         * function Shape() {
         *   this.x = 0;
         *   this.y = 0;
         * }
         *
         * function Circle() {
         *   Shape.call(this);
         * }
         *
         * Circle.prototype = _.create(Shape.prototype, { 'constructor': Circle });
         *
         * var circle = new Circle;
         * circle instanceof Circle;
         * // => true
         *
         * circle instanceof Shape;
         * // => true
         */
        function create(prototype, properties) {
            var result = baseCreate(prototype);
            return properties ? assign(result, properties) : result;
        }

        /**
         * Assigns own enumerable properties of source object(s) to the destination
         * object for all destination properties that resolve to `undefined`. Once a
         * property is set, additional defaults of the same property will be ignored.
         *
         * @static
         * @memberOf _
         * @type Function
         * @category Objects
         * @param {Object} object The destination object.
         * @param {...Object} [source] The source objects.
         * @param- {Object} [guard] Allows working with `_.reduce` without using its
         *  `key` and `object` arguments as sources.
         * @returns {Object} Returns the destination object.
         * @example
         *
         * var object = { 'name': 'barney' };
         * _.defaults(object, { 'name': 'fred', 'employer': 'slate' });
         * // => { 'name': 'barney', 'employer': 'slate' }
         */
        var defaults = function(object, source, guard) {
            var index, iterable = object,
                result = iterable;
            if (!iterable) return result;
            var args = arguments,
                argsIndex = 0,
                argsLength = typeof guard == 'number' ? 2 : args.length;
            while (++argsIndex < argsLength) {
                iterable = args[argsIndex];
                if (iterable && objectTypes[typeof iterable]) {
                    var ownIndex = -1,
                        ownProps = objectTypes[typeof iterable] && keys(iterable),
                        length = ownProps ? ownProps.length : 0;

                    while (++ownIndex < length) {
                        index = ownProps[ownIndex];
                        if (typeof result[index] == 'undefined') result[index] = iterable[index];
                    }
                }
            }
            return result
        };

        /**
         * This method is like `_.findIndex` except that it returns the key of the
         * first element that passes the callback check, instead of the element itself.
         *
         * If a property name is provided for `callback` the created "_.pluck" style
         * callback will return the property value of the given element.
         *
         * If an object is provided for `callback` the created "_.where" style callback
         * will return `true` for elements that have the properties of the given object,
         * else `false`.
         *
         * @static
         * @memberOf _
         * @category Objects
         * @param {Object} object The object to search.
         * @param {Function|Object|string} [callback=identity] The function called per
         *  iteration. If a property name or object is provided it will be used to
         *  create a "_.pluck" or "_.where" style callback, respectively.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {string|undefined} Returns the key of the found element, else `undefined`.
         * @example
         *
         * var characters = {
         *   'barney': {  'age': 36, 'blocked': false },
         *   'fred': {    'age': 40, 'blocked': true },
         *   'pebbles': { 'age': 1,  'blocked': false }
         * };
         *
         * _.findKey(characters, function(chr) {
         *   return chr.age < 40;
         * });
         * // => 'barney' (property order is not guaranteed across environments)
         *
         * // using "_.where" callback shorthand
         * _.findKey(characters, { 'age': 1 });
         * // => 'pebbles'
         *
         * // using "_.pluck" callback shorthand
         * _.findKey(characters, 'blocked');
         * // => 'fred'
         */
        function findKey(object, callback, thisArg) {
            var result;
            callback = lodash.createCallback(callback, thisArg, 3);
            forOwn(object, function(value, key, object) {
                if (callback(value, key, object)) {
                    result = key;
                    return false;
                }
            });
            return result;
        }

        /**
         * This method is like `_.findKey` except that it iterates over elements
         * of a `collection` in the opposite order.
         *
         * If a property name is provided for `callback` the created "_.pluck" style
         * callback will return the property value of the given element.
         *
         * If an object is provided for `callback` the created "_.where" style callback
         * will return `true` for elements that have the properties of the given object,
         * else `false`.
         *
         * @static
         * @memberOf _
         * @category Objects
         * @param {Object} object The object to search.
         * @param {Function|Object|string} [callback=identity] The function called per
         *  iteration. If a property name or object is provided it will be used to
         *  create a "_.pluck" or "_.where" style callback, respectively.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {string|undefined} Returns the key of the found element, else `undefined`.
         * @example
         *
         * var characters = {
         *   'barney': {  'age': 36, 'blocked': true },
         *   'fred': {    'age': 40, 'blocked': false },
         *   'pebbles': { 'age': 1,  'blocked': true }
         * };
         *
         * _.findLastKey(characters, function(chr) {
         *   return chr.age < 40;
         * });
         * // => returns `pebbles`, assuming `_.findKey` returns `barney`
         *
         * // using "_.where" callback shorthand
         * _.findLastKey(characters, { 'age': 40 });
         * // => 'fred'
         *
         * // using "_.pluck" callback shorthand
         * _.findLastKey(characters, 'blocked');
         * // => 'pebbles'
         */
        function findLastKey(object, callback, thisArg) {
            var result;
            callback = lodash.createCallback(callback, thisArg, 3);
            forOwnRight(object, function(value, key, object) {
                if (callback(value, key, object)) {
                    result = key;
                    return false;
                }
            });
            return result;
        }

        /**
         * Iterates over own and inherited enumerable properties of an object,
         * executing the callback for each property. The callback is bound to `thisArg`
         * and invoked with three arguments; (value, key, object). Callbacks may exit
         * iteration early by explicitly returning `false`.
         *
         * @static
         * @memberOf _
         * @type Function
         * @category Objects
         * @param {Object} object The object to iterate over.
         * @param {Function} [callback=identity] The function called per iteration.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {Object} Returns `object`.
         * @example
         *
         * function Shape() {
         *   this.x = 0;
         *   this.y = 0;
         * }
         *
         * Shape.prototype.move = function(x, y) {
         *   this.x += x;
         *   this.y += y;
         * };
         *
         * _.forIn(new Shape, function(value, key) {
         *   console.log(key);
         * });
         * // => logs 'x', 'y', and 'move' (property order is not guaranteed across environments)
         */
        var forIn = function(collection, callback, thisArg) {
            var index, iterable = collection,
                result = iterable;
            if (!iterable) return result;
            if (!objectTypes[typeof iterable]) return result;
            callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
            for (index in iterable) {
                if (callback(iterable[index], index, collection) === false) return result;
            }
            return result
        };

        /**
         * This method is like `_.forIn` except that it iterates over elements
         * of a `collection` in the opposite order.
         *
         * @static
         * @memberOf _
         * @category Objects
         * @param {Object} object The object to iterate over.
         * @param {Function} [callback=identity] The function called per iteration.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {Object} Returns `object`.
         * @example
         *
         * function Shape() {
         *   this.x = 0;
         *   this.y = 0;
         * }
         *
         * Shape.prototype.move = function(x, y) {
         *   this.x += x;
         *   this.y += y;
         * };
         *
         * _.forInRight(new Shape, function(value, key) {
         *   console.log(key);
         * });
         * // => logs 'move', 'y', and 'x' assuming `_.forIn ` logs 'x', 'y', and 'move'
         */
        function forInRight(object, callback, thisArg) {
            var pairs = [];

            forIn(object, function(value, key) {
                pairs.push(key, value);
            });

            var length = pairs.length;
            callback = baseCreateCallback(callback, thisArg, 3);
            while (length--) {
                if (callback(pairs[length--], pairs[length], object) === false) {
                    break;
                }
            }
            return object;
        }

        /**
         * Iterates over own enumerable properties of an object, executing the callback
         * for each property. The callback is bound to `thisArg` and invoked with three
         * arguments; (value, key, object). Callbacks may exit iteration early by
         * explicitly returning `false`.
         *
         * @static
         * @memberOf _
         * @type Function
         * @category Objects
         * @param {Object} object The object to iterate over.
         * @param {Function} [callback=identity] The function called per iteration.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {Object} Returns `object`.
         * @example
         *
         * _.forOwn({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
         *   console.log(key);
         * });
         * // => logs '0', '1', and 'length' (property order is not guaranteed across environments)
         */
        var forOwn = function(collection, callback, thisArg) {
            var index, iterable = collection,
                result = iterable;
            if (!iterable) return result;
            if (!objectTypes[typeof iterable]) return result;
            callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
            var ownIndex = -1,
                ownProps = objectTypes[typeof iterable] && keys(iterable),
                length = ownProps ? ownProps.length : 0;

            while (++ownIndex < length) {
                index = ownProps[ownIndex];
                if (callback(iterable[index], index, collection) === false) return result;
            }
            return result
        };

        /**
         * This method is like `_.forOwn` except that it iterates over elements
         * of a `collection` in the opposite order.
         *
         * @static
         * @memberOf _
         * @category Objects
         * @param {Object} object The object to iterate over.
         * @param {Function} [callback=identity] The function called per iteration.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {Object} Returns `object`.
         * @example
         *
         * _.forOwnRight({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
         *   console.log(key);
         * });
         * // => logs 'length', '1', and '0' assuming `_.forOwn` logs '0', '1', and 'length'
         */
        function forOwnRight(object, callback, thisArg) {
            var props = keys(object),
                length = props.length;

            callback = baseCreateCallback(callback, thisArg, 3);
            while (length--) {
                var key = props[length];
                if (callback(object[key], key, object) === false) {
                    break;
                }
            }
            return object;
        }

        /**
         * Creates a sorted array of property names of all enumerable properties,
         * own and inherited, of `object` that have function values.
         *
         * @static
         * @memberOf _
         * @alias methods
         * @category Objects
         * @param {Object} object The object to inspect.
         * @returns {Array} Returns an array of property names that have function values.
         * @example
         *
         * _.functions(_);
         * // => ['all', 'any', 'bind', 'bindAll', 'clone', 'compact', 'compose', ...]
         */
        function functions(object) {
            var result = [];
            forIn(object, function(value, key) {
                if (isFunction(value)) {
                    result.push(key);
                }
            });
            return result.sort();
        }

        /**
         * Checks if the specified property name exists as a direct property of `object`,
         * instead of an inherited property.
         *
         * @static
         * @memberOf _
         * @category Objects
         * @param {Object} object The object to inspect.
         * @param {string} key The name of the property to check.
         * @returns {boolean} Returns `true` if key is a direct property, else `false`.
         * @example
         *
         * _.has({ 'a': 1, 'b': 2, 'c': 3 }, 'b');
         * // => true
         */
        function has(object, key) {
            return object ? hasOwnProperty.call(object, key) : false;
        }

        /**
         * Creates an object composed of the inverted keys and values of the given object.
         *
         * @static
         * @memberOf _
         * @category Objects
         * @param {Object} object The object to invert.
         * @returns {Object} Returns the created inverted object.
         * @example
         *
         * _.invert({ 'first': 'fred', 'second': 'barney' });
         * // => { 'fred': 'first', 'barney': 'second' }
         */
        function invert(object) {
            var index = -1,
                props = keys(object),
                length = props.length,
                result = {};

            while (++index < length) {
                var key = props[index];
                result[object[key]] = key;
            }
            return result;
        }

        /**
         * Checks if `value` is a boolean value.
         *
         * @static
         * @memberOf _
         * @category Objects
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if the `value` is a boolean value, else `false`.
         * @example
         *
         * _.isBoolean(null);
         * // => false
         */
        function isBoolean(value) {
            return value === true || value === false ||
                value && typeof value == 'object' && toString.call(value) == boolClass || false;
        }

        /**
         * Checks if `value` is a date.
         *
         * @static
         * @memberOf _
         * @category Objects
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if the `value` is a date, else `false`.
         * @example
         *
         * _.isDate(new Date);
         * // => true
         */
        function isDate(value) {
            return value && typeof value == 'object' && toString.call(value) == dateClass || false;
        }

        /**
         * Checks if `value` is a DOM element.
         *
         * @static
         * @memberOf _
         * @category Objects
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if the `value` is a DOM element, else `false`.
         * @example
         *
         * _.isElement(document.body);
         * // => true
         */
        function isElement(value) {
            return value && value.nodeType === 1 || false;
        }

        /**
         * Checks if `value` is empty. Arrays, strings, or `arguments` objects with a
         * length of `0` and objects with no own enumerable properties are considered
         * "empty".
         *
         * @static
         * @memberOf _
         * @category Objects
         * @param {Array|Object|string} value The value to inspect.
         * @returns {boolean} Returns `true` if the `value` is empty, else `false`.
         * @example
         *
         * _.isEmpty([1, 2, 3]);
         * // => false
         *
         * _.isEmpty({});
         * // => true
         *
         * _.isEmpty('');
         * // => true
         */
        function isEmpty(value) {
            var result = true;
            if (!value) {
                return result;
            }
            var className = toString.call(value),
                length = value.length;

            if ((className == arrayClass || className == stringClass || className == argsClass) ||
                (className == objectClass && typeof length == 'number' && isFunction(value.splice))) {
                return !length;
            }
            forOwn(value, function() {
                return (result = false);
            });
            return result;
        }

        /**
         * Performs a deep comparison between two values to determine if they are
         * equivalent to each other. If a callback is provided it will be executed
         * to compare values. If the callback returns `undefined` comparisons will
         * be handled by the method instead. The callback is bound to `thisArg` and
         * invoked with two arguments; (a, b).
         *
         * @static
         * @memberOf _
         * @category Objects
         * @param {*} a The value to compare.
         * @param {*} b The other value to compare.
         * @param {Function} [callback] The function to customize comparing values.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
         * @example
         *
         * var object = { 'name': 'fred' };
         * var copy = { 'name': 'fred' };
         *
         * object == copy;
         * // => false
         *
         * _.isEqual(object, copy);
         * // => true
         *
         * var words = ['hello', 'goodbye'];
         * var otherWords = ['hi', 'goodbye'];
         *
         * _.isEqual(words, otherWords, function(a, b) {
         *   var reGreet = /^(?:hello|hi)$/i,
         *       aGreet = _.isString(a) && reGreet.test(a),
         *       bGreet = _.isString(b) && reGreet.test(b);
         *
         *   return (aGreet || bGreet) ? (aGreet == bGreet) : undefined;
         * });
         * // => true
         */
        function isEqual(a, b, callback, thisArg) {
            return baseIsEqual(a, b, typeof callback == 'function' && baseCreateCallback(callback, thisArg, 2));
        }

        /**
         * Checks if `value` is, or can be coerced to, a finite number.
         *
         * Note: This is not the same as native `isFinite` which will return true for
         * booleans and empty strings. See http://es5.github.io/#x15.1.2.5.
         *
         * @static
         * @memberOf _
         * @category Objects
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if the `value` is finite, else `false`.
         * @example
         *
         * _.isFinite(-101);
         * // => true
         *
         * _.isFinite('10');
         * // => true
         *
         * _.isFinite(true);
         * // => false
         *
         * _.isFinite('');
         * // => false
         *
         * _.isFinite(Infinity);
         * // => false
         */
        function isFinite(value) {
            return nativeIsFinite(value) && !nativeIsNaN(parseFloat(value));
        }

        /**
         * Checks if `value` is a function.
         *
         * @static
         * @memberOf _
         * @category Objects
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if the `value` is a function, else `false`.
         * @example
         *
         * _.isFunction(_);
         * // => true
         */
        function isFunction(value) {
            return typeof value == 'function';
        }

        /**
         * Checks if `value` is the language type of Object.
         * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
         *
         * @static
         * @memberOf _
         * @category Objects
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if the `value` is an object, else `false`.
         * @example
         *
         * _.isObject({});
         * // => true
         *
         * _.isObject([1, 2, 3]);
         * // => true
         *
         * _.isObject(1);
         * // => false
         */
        function isObject(value) {
            // check if the value is the ECMAScript language type of Object
            // http://es5.github.io/#x8
            // and avoid a V8 bug
            // http://code.google.com/p/v8/issues/detail?id=2291
            return !!(value && objectTypes[typeof value]);
        }

        /**
         * Checks if `value` is `NaN`.
         *
         * Note: This is not the same as native `isNaN` which will return `true` for
         * `undefined` and other non-numeric values. See http://es5.github.io/#x15.1.2.4.
         *
         * @static
         * @memberOf _
         * @category Objects
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if the `value` is `NaN`, else `false`.
         * @example
         *
         * _.isNaN(NaN);
         * // => true
         *
         * _.isNaN(new Number(NaN));
         * // => true
         *
         * isNaN(undefined);
         * // => true
         *
         * _.isNaN(undefined);
         * // => false
         */
        function isNaN(value) {
            // `NaN` as a primitive is the only value that is not equal to itself
            // (perform the [[Class]] check first to avoid errors with some host objects in IE)
            return isNumber(value) && value != +value;
        }

        /**
         * Checks if `value` is `null`.
         *
         * @static
         * @memberOf _
         * @category Objects
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if the `value` is `null`, else `false`.
         * @example
         *
         * _.isNull(null);
         * // => true
         *
         * _.isNull(undefined);
         * // => false
         */
        function isNull(value) {
            return value === null;
        }

        /**
         * Checks if `value` is a number.
         *
         * Note: `NaN` is considered a number. See http://es5.github.io/#x8.5.
         *
         * @static
         * @memberOf _
         * @category Objects
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if the `value` is a number, else `false`.
         * @example
         *
         * _.isNumber(8.4 * 5);
         * // => true
         */
        function isNumber(value) {
            return typeof value == 'number' ||
                value && typeof value == 'object' && toString.call(value) == numberClass || false;
        }

        /**
         * Checks if `value` is an object created by the `Object` constructor.
         *
         * @static
         * @memberOf _
         * @category Objects
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
         * @example
         *
         * function Shape() {
         *   this.x = 0;
         *   this.y = 0;
         * }
         *
         * _.isPlainObject(new Shape);
         * // => false
         *
         * _.isPlainObject([1, 2, 3]);
         * // => false
         *
         * _.isPlainObject({ 'x': 0, 'y': 0 });
         * // => true
         */
        var isPlainObject = !getPrototypeOf ? shimIsPlainObject : function(value) {
            if (!(value && toString.call(value) == objectClass)) {
                return false;
            }
            var valueOf = value.valueOf,
                objProto = isNative(valueOf) && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);

            return objProto ?
                (value == objProto || getPrototypeOf(value) == objProto) :
                shimIsPlainObject(value);
        };

        /**
         * Checks if `value` is a regular expression.
         *
         * @static
         * @memberOf _
         * @category Objects
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if the `value` is a regular expression, else `false`.
         * @example
         *
         * _.isRegExp(/fred/);
         * // => true
         */
        function isRegExp(value) {
            return value && typeof value == 'object' && toString.call(value) == regexpClass || false;
        }

        /**
         * Checks if `value` is a string.
         *
         * @static
         * @memberOf _
         * @category Objects
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if the `value` is a string, else `false`.
         * @example
         *
         * _.isString('fred');
         * // => true
         */
        function isString(value) {
            return typeof value == 'string' ||
                value && typeof value == 'object' && toString.call(value) == stringClass || false;
        }

        /**
         * Checks if `value` is `undefined`.
         *
         * @static
         * @memberOf _
         * @category Objects
         * @param {*} value The value to check.
         * @returns {boolean} Returns `true` if the `value` is `undefined`, else `false`.
         * @example
         *
         * _.isUndefined(void 0);
         * // => true
         */
        function isUndefined(value) {
            return typeof value == 'undefined';
        }

        /**
         * Creates an object with the same keys as `object` and values generated by
         * running each own enumerable property of `object` through the callback.
         * The callback is bound to `thisArg` and invoked with three arguments;
         * (value, key, object).
         *
         * If a property name is provided for `callback` the created "_.pluck" style
         * callback will return the property value of the given element.
         *
         * If an object is provided for `callback` the created "_.where" style callback
         * will return `true` for elements that have the properties of the given object,
         * else `false`.
         *
         * @static
         * @memberOf _
         * @category Objects
         * @param {Object} object The object to iterate over.
         * @param {Function|Object|string} [callback=identity] The function called
         *  per iteration. If a property name or object is provided it will be used
         *  to create a "_.pluck" or "_.where" style callback, respectively.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {Array} Returns a new object with values of the results of each `callback` execution.
         * @example
         *
         * _.mapValues({ 'a': 1, 'b': 2, 'c': 3} , function(num) { return num * 3; });
         * // => { 'a': 3, 'b': 6, 'c': 9 }
         *
         * var characters = {
         *   'fred': { 'name': 'fred', 'age': 40 },
         *   'pebbles': { 'name': 'pebbles', 'age': 1 }
         * };
         *
         * // using "_.pluck" callback shorthand
         * _.mapValues(characters, 'age');
         * // => { 'fred': 40, 'pebbles': 1 }
         */
        function mapValues(object, callback, thisArg) {
            var result = {};
            callback = lodash.createCallback(callback, thisArg, 3);

            forOwn(object, function(value, key, object) {
                result[key] = callback(value, key, object);
            });
            return result;
        }

        /**
         * Recursively merges own enumerable properties of the source object(s), that
         * don't resolve to `undefined` into the destination object. Subsequent sources
         * will overwrite property assignments of previous sources. If a callback is
         * provided it will be executed to produce the merged values of the destination
         * and source properties. If the callback returns `undefined` merging will
         * be handled by the method instead. The callback is bound to `thisArg` and
         * invoked with two arguments; (objectValue, sourceValue).
         *
         * @static
         * @memberOf _
         * @category Objects
         * @param {Object} object The destination object.
         * @param {...Object} [source] The source objects.
         * @param {Function} [callback] The function to customize merging properties.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {Object} Returns the destination object.
         * @example
         *
         * var names = {
         *   'characters': [
         *     { 'name': 'barney' },
         *     { 'name': 'fred' }
         *   ]
         * };
         *
         * var ages = {
         *   'characters': [
         *     { 'age': 36 },
         *     { 'age': 40 }
         *   ]
         * };
         *
         * _.merge(names, ages);
         * // => { 'characters': [{ 'name': 'barney', 'age': 36 }, { 'name': 'fred', 'age': 40 }] }
         *
         * var food = {
         *   'fruits': ['apple'],
         *   'vegetables': ['beet']
         * };
         *
         * var otherFood = {
         *   'fruits': ['banana'],
         *   'vegetables': ['carrot']
         * };
         *
         * _.merge(food, otherFood, function(a, b) {
         *   return _.isArray(a) ? a.concat(b) : undefined;
         * });
         * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot] }
         */
        function merge(object) {
            var args = arguments,
                length = 2;

            if (!isObject(object)) {
                return object;
            }
            // allows working with `_.reduce` and `_.reduceRight` without using
            // their `index` and `collection` arguments
            if (typeof args[2] != 'number') {
                length = args.length;
            }
            if (length > 3 && typeof args[length - 2] == 'function') {
                var callback = baseCreateCallback(args[--length - 1], args[length--], 2);
            } else if (length > 2 && typeof args[length - 1] == 'function') {
                callback = args[--length];
            }
            var sources = slice(arguments, 1, length),
                index = -1,
                stackA = getArray(),
                stackB = getArray();

            while (++index < length) {
                baseMerge(object, sources[index], callback, stackA, stackB);
            }
            releaseArray(stackA);
            releaseArray(stackB);
            return object;
        }

        /**
         * Creates a shallow clone of `object` excluding the specified properties.
         * Property names may be specified as individual arguments or as arrays of
         * property names. If a callback is provided it will be executed for each
         * property of `object` omitting the properties the callback returns truey
         * for. The callback is bound to `thisArg` and invoked with three arguments;
         * (value, key, object).
         *
         * @static
         * @memberOf _
         * @category Objects
         * @param {Object} object The source object.
         * @param {Function|...string|string[]} [callback] The properties to omit or the
         *  function called per iteration.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {Object} Returns an object without the omitted properties.
         * @example
         *
         * _.omit({ 'name': 'fred', 'age': 40 }, 'age');
         * // => { 'name': 'fred' }
         *
         * _.omit({ 'name': 'fred', 'age': 40 }, function(value) {
         *   return typeof value == 'number';
         * });
         * // => { 'name': 'fred' }
         */
        function omit(object, callback, thisArg) {
            var result = {};
            if (typeof callback != 'function') {
                var props = [];
                forIn(object, function(value, key) {
                    props.push(key);
                });
                props = baseDifference(props, baseFlatten(arguments, true, false, 1));

                var index = -1,
                    length = props.length;

                while (++index < length) {
                    var key = props[index];
                    result[key] = object[key];
                }
            } else {
                callback = lodash.createCallback(callback, thisArg, 3);
                forIn(object, function(value, key, object) {
                    if (!callback(value, key, object)) {
                        result[key] = value;
                    }
                });
            }
            return result;
        }

        /**
         * Creates a two dimensional array of an object's key-value pairs,
         * i.e. `[[key1, value1], [key2, value2]]`.
         *
         * @static
         * @memberOf _
         * @category Objects
         * @param {Object} object The object to inspect.
         * @returns {Array} Returns new array of key-value pairs.
         * @example
         *
         * _.pairs({ 'barney': 36, 'fred': 40 });
         * // => [['barney', 36], ['fred', 40]] (property order is not guaranteed across environments)
         */
        function pairs(object) {
            var index = -1,
                props = keys(object),
                length = props.length,
                result = Array(length);

            while (++index < length) {
                var key = props[index];
                result[index] = [key, object[key]];
            }
            return result;
        }

        /**
         * Creates a shallow clone of `object` composed of the specified properties.
         * Property names may be specified as individual arguments or as arrays of
         * property names. If a callback is provided it will be executed for each
         * property of `object` picking the properties the callback returns truey
         * for. The callback is bound to `thisArg` and invoked with three arguments;
         * (value, key, object).
         *
         * @static
         * @memberOf _
         * @category Objects
         * @param {Object} object The source object.
         * @param {Function|...string|string[]} [callback] The function called per
         *  iteration or property names to pick, specified as individual property
         *  names or arrays of property names.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {Object} Returns an object composed of the picked properties.
         * @example
         *
         * _.pick({ 'name': 'fred', '_userid': 'fred1' }, 'name');
         * // => { 'name': 'fred' }
         *
         * _.pick({ 'name': 'fred', '_userid': 'fred1' }, function(value, key) {
         *   return key.charAt(0) != '_';
         * });
         * // => { 'name': 'fred' }
         */
        function pick(object, callback, thisArg) {
            var result = {};
            if (typeof callback != 'function') {
                var index = -1,
                    props = baseFlatten(arguments, true, false, 1),
                    length = isObject(object) ? props.length : 0;

                while (++index < length) {
                    var key = props[index];
                    if (key in object) {
                        result[key] = object[key];
                    }
                }
            } else {
                callback = lodash.createCallback(callback, thisArg, 3);
                forIn(object, function(value, key, object) {
                    if (callback(value, key, object)) {
                        result[key] = value;
                    }
                });
            }
            return result;
        }

        /**
         * An alternative to `_.reduce` this method transforms `object` to a new
         * `accumulator` object which is the result of running each of its own
         * enumerable properties through a callback, with each callback execution
         * potentially mutating the `accumulator` object. The callback is bound to
         * `thisArg` and invoked with four arguments; (accumulator, value, key, object).
         * Callbacks may exit iteration early by explicitly returning `false`.
         *
         * @static
         * @memberOf _
         * @category Objects
         * @param {Array|Object} object The object to iterate over.
         * @param {Function} [callback=identity] The function called per iteration.
         * @param {*} [accumulator] The custom accumulator value.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {*} Returns the accumulated value.
         * @example
         *
         * var squares = _.transform([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], function(result, num) {
         *   num *= num;
         *   if (num % 2) {
         *     return result.push(num) < 3;
         *   }
         * });
         * // => [1, 9, 25]
         *
         * var mapped = _.transform({ 'a': 1, 'b': 2, 'c': 3 }, function(result, num, key) {
         *   result[key] = num * 3;
         * });
         * // => { 'a': 3, 'b': 6, 'c': 9 }
         */
        function transform(object, callback, accumulator, thisArg) {
            var isArr = isArray(object);
            if (accumulator == null) {
                if (isArr) {
                    accumulator = [];
                } else {
                    var ctor = object && object.constructor,
                        proto = ctor && ctor.prototype;

                    accumulator = baseCreate(proto);
                }
            }
            if (callback) {
                callback = lodash.createCallback(callback, thisArg, 4);
                (isArr ? forEach : forOwn)(object, function(value, index, object) {
                    return callback(accumulator, value, index, object);
                });
            }
            return accumulator;
        }

        /**
         * Creates an array composed of the own enumerable property values of `object`.
         *
         * @static
         * @memberOf _
         * @category Objects
         * @param {Object} object The object to inspect.
         * @returns {Array} Returns an array of property values.
         * @example
         *
         * _.values({ 'one': 1, 'two': 2, 'three': 3 });
         * // => [1, 2, 3] (property order is not guaranteed across environments)
         */
        function values(object) {
            var index = -1,
                props = keys(object),
                length = props.length,
                result = Array(length);

            while (++index < length) {
                result[index] = object[props[index]];
            }
            return result;
        }

        /*--------------------------------------------------------------------------*/

        /**
         * Creates an array of elements from the specified indexes, or keys, of the
         * `collection`. Indexes may be specified as individual arguments or as arrays
         * of indexes.
         *
         * @static
         * @memberOf _
         * @category Collections
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {...(number|number[]|string|string[])} [index] The indexes of `collection`
         *   to retrieve, specified as individual indexes or arrays of indexes.
         * @returns {Array} Returns a new array of elements corresponding to the
         *  provided indexes.
         * @example
         *
         * _.at(['a', 'b', 'c', 'd', 'e'], [0, 2, 4]);
         * // => ['a', 'c', 'e']
         *
         * _.at(['fred', 'barney', 'pebbles'], 0, 2);
         * // => ['fred', 'pebbles']
         */
        function at(collection) {
            var args = arguments,
                index = -1,
                props = baseFlatten(args, true, false, 1),
                length = (args[2] && args[2][args[1]] === collection) ? 1 : props.length,
                result = Array(length);

            while (++index < length) {
                result[index] = collection[props[index]];
            }
            return result;
        }

        /**
         * Checks if a given value is present in a collection using strict equality
         * for comparisons, i.e. `===`. If `fromIndex` is negative, it is used as the
         * offset from the end of the collection.
         *
         * @static
         * @memberOf _
         * @alias include
         * @category Collections
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {*} target The value to check for.
         * @param {number} [fromIndex=0] The index to search from.
         * @returns {boolean} Returns `true` if the `target` element is found, else `false`.
         * @example
         *
         * _.contains([1, 2, 3], 1);
         * // => true
         *
         * _.contains([1, 2, 3], 1, 2);
         * // => false
         *
         * _.contains({ 'name': 'fred', 'age': 40 }, 'fred');
         * // => true
         *
         * _.contains('pebbles', 'eb');
         * // => true
         */
        function contains(collection, target, fromIndex) {
            var index = -1,
                indexOf = getIndexOf(),
                length = collection ? collection.length : 0,
                result = false;

            fromIndex = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex) || 0;
            if (isArray(collection)) {
                result = indexOf(collection, target, fromIndex) > -1;
            } else if (typeof length == 'number') {
                result = (isString(collection) ? collection.indexOf(target, fromIndex) : indexOf(collection, target, fromIndex)) > -1;
            } else {
                forOwn(collection, function(value) {
                    if (++index >= fromIndex) {
                        return !(result = value === target);
                    }
                });
            }
            return result;
        }

        /**
         * Creates an object composed of keys generated from the results of running
         * each element of `collection` through the callback. The corresponding value
         * of each key is the number of times the key was returned by the callback.
         * The callback is bound to `thisArg` and invoked with three arguments;
         * (value, index|key, collection).
         *
         * If a property name is provided for `callback` the created "_.pluck" style
         * callback will return the property value of the given element.
         *
         * If an object is provided for `callback` the created "_.where" style callback
         * will return `true` for elements that have the properties of the given object,
         * else `false`.
         *
         * @static
         * @memberOf _
         * @category Collections
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function|Object|string} [callback=identity] The function called
         *  per iteration. If a property name or object is provided it will be used
         *  to create a "_.pluck" or "_.where" style callback, respectively.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {Object} Returns the composed aggregate object.
         * @example
         *
         * _.countBy([4.3, 6.1, 6.4], function(num) { return Math.floor(num); });
         * // => { '4': 1, '6': 2 }
         *
         * _.countBy([4.3, 6.1, 6.4], function(num) { return this.floor(num); }, Math);
         * // => { '4': 1, '6': 2 }
         *
         * _.countBy(['one', 'two', 'three'], 'length');
         * // => { '3': 2, '5': 1 }
         */
        var countBy = createAggregator(function(result, value, key) {
            (hasOwnProperty.call(result, key) ? result[key]++ : result[key] = 1);
        });

        /**
         * Checks if the given callback returns truey value for **all** elements of
         * a collection. The callback is bound to `thisArg` and invoked with three
         * arguments; (value, index|key, collection).
         *
         * If a property name is provided for `callback` the created "_.pluck" style
         * callback will return the property value of the given element.
         *
         * If an object is provided for `callback` the created "_.where" style callback
         * will return `true` for elements that have the properties of the given object,
         * else `false`.
         *
         * @static
         * @memberOf _
         * @alias all
         * @category Collections
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function|Object|string} [callback=identity] The function called
         *  per iteration. If a property name or object is provided it will be used
         *  to create a "_.pluck" or "_.where" style callback, respectively.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {boolean} Returns `true` if all elements passed the callback check,
         *  else `false`.
         * @example
         *
         * _.every([true, 1, null, 'yes']);
         * // => false
         *
         * var characters = [
         *   { 'name': 'barney', 'age': 36 },
         *   { 'name': 'fred',   'age': 40 }
         * ];
         *
         * // using "_.pluck" callback shorthand
         * _.every(characters, 'age');
         * // => true
         *
         * // using "_.where" callback shorthand
         * _.every(characters, { 'age': 36 });
         * // => false
         */
        function every(collection, callback, thisArg) {
            var result = true;
            callback = lodash.createCallback(callback, thisArg, 3);

            var index = -1,
                length = collection ? collection.length : 0;

            if (typeof length == 'number') {
                while (++index < length) {
                    if (!(result = !!callback(collection[index], index, collection))) {
                        break;
                    }
                }
            } else {
                forOwn(collection, function(value, index, collection) {
                    return (result = !!callback(value, index, collection));
                });
            }
            return result;
        }

        /**
         * Iterates over elements of a collection, returning an array of all elements
         * the callback returns truey for. The callback is bound to `thisArg` and
         * invoked with three arguments; (value, index|key, collection).
         *
         * If a property name is provided for `callback` the created "_.pluck" style
         * callback will return the property value of the given element.
         *
         * If an object is provided for `callback` the created "_.where" style callback
         * will return `true` for elements that have the properties of the given object,
         * else `false`.
         *
         * @static
         * @memberOf _
         * @alias select
         * @category Collections
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function|Object|string} [callback=identity] The function called
         *  per iteration. If a property name or object is provided it will be used
         *  to create a "_.pluck" or "_.where" style callback, respectively.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {Array} Returns a new array of elements that passed the callback check.
         * @example
         *
         * var evens = _.filter([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
         * // => [2, 4, 6]
         *
         * var characters = [
         *   { 'name': 'barney', 'age': 36, 'blocked': false },
         *   { 'name': 'fred',   'age': 40, 'blocked': true }
         * ];
         *
         * // using "_.pluck" callback shorthand
         * _.filter(characters, 'blocked');
         * // => [{ 'name': 'fred', 'age': 40, 'blocked': true }]
         *
         * // using "_.where" callback shorthand
         * _.filter(characters, { 'age': 36 });
         * // => [{ 'name': 'barney', 'age': 36, 'blocked': false }]
         */
        function filter(collection, callback, thisArg) {
            var result = [];
            callback = lodash.createCallback(callback, thisArg, 3);

            var index = -1,
                length = collection ? collection.length : 0;

            if (typeof length == 'number') {
                while (++index < length) {
                    var value = collection[index];
                    if (callback(value, index, collection)) {
                        result.push(value);
                    }
                }
            } else {
                forOwn(collection, function(value, index, collection) {
                    if (callback(value, index, collection)) {
                        result.push(value);
                    }
                });
            }
            return result;
        }

        /**
         * Iterates over elements of a collection, returning the first element that
         * the callback returns truey for. The callback is bound to `thisArg` and
         * invoked with three arguments; (value, index|key, collection).
         *
         * If a property name is provided for `callback` the created "_.pluck" style
         * callback will return the property value of the given element.
         *
         * If an object is provided for `callback` the created "_.where" style callback
         * will return `true` for elements that have the properties of the given object,
         * else `false`.
         *
         * @static
         * @memberOf _
         * @alias detect, findWhere
         * @category Collections
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function|Object|string} [callback=identity] The function called
         *  per iteration. If a property name or object is provided it will be used
         *  to create a "_.pluck" or "_.where" style callback, respectively.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {*} Returns the found element, else `undefined`.
         * @example
         *
         * var characters = [
         *   { 'name': 'barney',  'age': 36, 'blocked': false },
         *   { 'name': 'fred',    'age': 40, 'blocked': true },
         *   { 'name': 'pebbles', 'age': 1,  'blocked': false }
         * ];
         *
         * _.find(characters, function(chr) {
         *   return chr.age < 40;
         * });
         * // => { 'name': 'barney', 'age': 36, 'blocked': false }
         *
         * // using "_.where" callback shorthand
         * _.find(characters, { 'age': 1 });
         * // =>  { 'name': 'pebbles', 'age': 1, 'blocked': false }
         *
         * // using "_.pluck" callback shorthand
         * _.find(characters, 'blocked');
         * // => { 'name': 'fred', 'age': 40, 'blocked': true }
         */
        function find(collection, callback, thisArg) {
            callback = lodash.createCallback(callback, thisArg, 3);

            var index = -1,
                length = collection ? collection.length : 0;

            if (typeof length == 'number') {
                while (++index < length) {
                    var value = collection[index];
                    if (callback(value, index, collection)) {
                        return value;
                    }
                }
            } else {
                var result;
                forOwn(collection, function(value, index, collection) {
                    if (callback(value, index, collection)) {
                        result = value;
                        return false;
                    }
                });
                return result;
            }
        }

        /**
         * This method is like `_.find` except that it iterates over elements
         * of a `collection` from right to left.
         *
         * @static
         * @memberOf _
         * @category Collections
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function|Object|string} [callback=identity] The function called
         *  per iteration. If a property name or object is provided it will be used
         *  to create a "_.pluck" or "_.where" style callback, respectively.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {*} Returns the found element, else `undefined`.
         * @example
         *
         * _.findLast([1, 2, 3, 4], function(num) {
         *   return num % 2 == 1;
         * });
         * // => 3
         */
        function findLast(collection, callback, thisArg) {
            var result;
            callback = lodash.createCallback(callback, thisArg, 3);
            forEachRight(collection, function(value, index, collection) {
                if (callback(value, index, collection)) {
                    result = value;
                    return false;
                }
            });
            return result;
        }

        /**
         * Iterates over elements of a collection, executing the callback for each
         * element. The callback is bound to `thisArg` and invoked with three arguments;
         * (value, index|key, collection). Callbacks may exit iteration early by
         * explicitly returning `false`.
         *
         * Note: As with other "Collections" methods, objects with a `length` property
         * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
         * may be used for object iteration.
         *
         * @static
         * @memberOf _
         * @alias each
         * @category Collections
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function} [callback=identity] The function called per iteration.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {Array|Object|string} Returns `collection`.
         * @example
         *
         * _([1, 2, 3]).forEach(function(num) { console.log(num); }).join(',');
         * // => logs each number and returns '1,2,3'
         *
         * _.forEach({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { console.log(num); });
         * // => logs each number and returns the object (property order is not guaranteed across environments)
         */
        function forEach(collection, callback, thisArg) {
            var index = -1,
                length = collection ? collection.length : 0;

            callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
            if (typeof length == 'number') {
                while (++index < length) {
                    if (callback(collection[index], index, collection) === false) {
                        break;
                    }
                }
            } else {
                forOwn(collection, callback);
            }
            return collection;
        }

        /**
         * This method is like `_.forEach` except that it iterates over elements
         * of a `collection` from right to left.
         *
         * @static
         * @memberOf _
         * @alias eachRight
         * @category Collections
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function} [callback=identity] The function called per iteration.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {Array|Object|string} Returns `collection`.
         * @example
         *
         * _([1, 2, 3]).forEachRight(function(num) { console.log(num); }).join(',');
         * // => logs each number from right to left and returns '3,2,1'
         */
        function forEachRight(collection, callback, thisArg) {
            var length = collection ? collection.length : 0;
            callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
            if (typeof length == 'number') {
                while (length--) {
                    if (callback(collection[length], length, collection) === false) {
                        break;
                    }
                }
            } else {
                var props = keys(collection);
                length = props.length;
                forOwn(collection, function(value, key, collection) {
                    key = props ? props[--length] : --length;
                    return callback(collection[key], key, collection);
                });
            }
            return collection;
        }

        /**
         * Creates an object composed of keys generated from the results of running
         * each element of a collection through the callback. The corresponding value
         * of each key is an array of the elements responsible for generating the key.
         * The callback is bound to `thisArg` and invoked with three arguments;
         * (value, index|key, collection).
         *
         * If a property name is provided for `callback` the created "_.pluck" style
         * callback will return the property value of the given element.
         *
         * If an object is provided for `callback` the created "_.where" style callback
         * will return `true` for elements that have the properties of the given object,
         * else `false`
         *
         * @static
         * @memberOf _
         * @category Collections
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function|Object|string} [callback=identity] The function called
         *  per iteration. If a property name or object is provided it will be used
         *  to create a "_.pluck" or "_.where" style callback, respectively.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {Object} Returns the composed aggregate object.
         * @example
         *
         * _.groupBy([4.2, 6.1, 6.4], function(num) { return Math.floor(num); });
         * // => { '4': [4.2], '6': [6.1, 6.4] }
         *
         * _.groupBy([4.2, 6.1, 6.4], function(num) { return this.floor(num); }, Math);
         * // => { '4': [4.2], '6': [6.1, 6.4] }
         *
         * // using "_.pluck" callback shorthand
         * _.groupBy(['one', 'two', 'three'], 'length');
         * // => { '3': ['one', 'two'], '5': ['three'] }
         */
        var groupBy = createAggregator(function(result, value, key) {
            (hasOwnProperty.call(result, key) ? result[key] : result[key] = []).push(value);
        });

        /**
         * Creates an object composed of keys generated from the results of running
         * each element of the collection through the given callback. The corresponding
         * value of each key is the last element responsible for generating the key.
         * The callback is bound to `thisArg` and invoked with three arguments;
         * (value, index|key, collection).
         *
         * If a property name is provided for `callback` the created "_.pluck" style
         * callback will return the property value of the given element.
         *
         * If an object is provided for `callback` the created "_.where" style callback
         * will return `true` for elements that have the properties of the given object,
         * else `false`.
         *
         * @static
         * @memberOf _
         * @category Collections
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function|Object|string} [callback=identity] The function called
         *  per iteration. If a property name or object is provided it will be used
         *  to create a "_.pluck" or "_.where" style callback, respectively.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {Object} Returns the composed aggregate object.
         * @example
         *
         * var keys = [
         *   { 'dir': 'left', 'code': 97 },
         *   { 'dir': 'right', 'code': 100 }
         * ];
         *
         * _.indexBy(keys, 'dir');
         * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
         *
         * _.indexBy(keys, function(key) { return String.fromCharCode(key.code); });
         * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
         *
         * _.indexBy(characters, function(key) { this.fromCharCode(key.code); }, String);
         * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
         */
        var indexBy = createAggregator(function(result, value, key) {
            result[key] = value;
        });

        /**
         * Invokes the method named by `methodName` on each element in the `collection`
         * returning an array of the results of each invoked method. Additional arguments
         * will be provided to each invoked method. If `methodName` is a function it
         * will be invoked for, and `this` bound to, each element in the `collection`.
         *
         * @static
         * @memberOf _
         * @category Collections
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function|string} methodName The name of the method to invoke or
         *  the function invoked per iteration.
         * @param {...*} [arg] Arguments to invoke the method with.
         * @returns {Array} Returns a new array of the results of each invoked method.
         * @example
         *
         * _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
         * // => [[1, 5, 7], [1, 2, 3]]
         *
         * _.invoke([123, 456], String.prototype.split, '');
         * // => [['1', '2', '3'], ['4', '5', '6']]
         */
        function invoke(collection, methodName) {
            var args = slice(arguments, 2),
                index = -1,
                isFunc = typeof methodName == 'function',
                length = collection ? collection.length : 0,
                result = Array(typeof length == 'number' ? length : 0);

            forEach(collection, function(value) {
                result[++index] = (isFunc ? methodName : value[methodName]).apply(value, args);
            });
            return result;
        }

        /**
         * Creates an array of values by running each element in the collection
         * through the callback. The callback is bound to `thisArg` and invoked with
         * three arguments; (value, index|key, collection).
         *
         * If a property name is provided for `callback` the created "_.pluck" style
         * callback will return the property value of the given element.
         *
         * If an object is provided for `callback` the created "_.where" style callback
         * will return `true` for elements that have the properties of the given object,
         * else `false`.
         *
         * @static
         * @memberOf _
         * @alias collect
         * @category Collections
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function|Object|string} [callback=identity] The function called
         *  per iteration. If a property name or object is provided it will be used
         *  to create a "_.pluck" or "_.where" style callback, respectively.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {Array} Returns a new array of the results of each `callback` execution.
         * @example
         *
         * _.map([1, 2, 3], function(num) { return num * 3; });
         * // => [3, 6, 9]
         *
         * _.map({ 'one': 1, 'two': 2, 'three': 3 }, function(num) { return num * 3; });
         * // => [3, 6, 9] (property order is not guaranteed across environments)
         *
         * var characters = [
         *   { 'name': 'barney', 'age': 36 },
         *   { 'name': 'fred',   'age': 40 }
         * ];
         *
         * // using "_.pluck" callback shorthand
         * _.map(characters, 'name');
         * // => ['barney', 'fred']
         */
        function map(collection, callback, thisArg) {
            var index = -1,
                length = collection ? collection.length : 0;

            callback = lodash.createCallback(callback, thisArg, 3);
            if (typeof length == 'number') {
                var result = Array(length);
                while (++index < length) {
                    result[index] = callback(collection[index], index, collection);
                }
            } else {
                result = [];
                forOwn(collection, function(value, key, collection) {
                    result[++index] = callback(value, key, collection);
                });
            }
            return result;
        }

        /**
         * Retrieves the maximum value of a collection. If the collection is empty or
         * falsey `-Infinity` is returned. If a callback is provided it will be executed
         * for each value in the collection to generate the criterion by which the value
         * is ranked. The callback is bound to `thisArg` and invoked with three
         * arguments; (value, index, collection).
         *
         * If a property name is provided for `callback` the created "_.pluck" style
         * callback will return the property value of the given element.
         *
         * If an object is provided for `callback` the created "_.where" style callback
         * will return `true` for elements that have the properties of the given object,
         * else `false`.
         *
         * @static
         * @memberOf _
         * @category Collections
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function|Object|string} [callback=identity] The function called
         *  per iteration. If a property name or object is provided it will be used
         *  to create a "_.pluck" or "_.where" style callback, respectively.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {*} Returns the maximum value.
         * @example
         *
         * _.max([4, 2, 8, 6]);
         * // => 8
         *
         * var characters = [
         *   { 'name': 'barney', 'age': 36 },
         *   { 'name': 'fred',   'age': 40 }
         * ];
         *
         * _.max(characters, function(chr) { return chr.age; });
         * // => { 'name': 'fred', 'age': 40 };
         *
         * // using "_.pluck" callback shorthand
         * _.max(characters, 'age');
         * // => { 'name': 'fred', 'age': 40 };
         */
        function max(collection, callback, thisArg) {
            var computed = -Infinity,
                result = computed;

            // allows working with functions like `_.map` without using
            // their `index` argument as a callback
            if (typeof callback != 'function' && thisArg && thisArg[callback] === collection) {
                callback = null;
            }
            if (callback == null && isArray(collection)) {
                var index = -1,
                    length = collection.length;

                while (++index < length) {
                    var value = collection[index];
                    if (value > result) {
                        result = value;
                    }
                }
            } else {
                callback = (callback == null && isString(collection)) ?
                    charAtCallback :
                    lodash.createCallback(callback, thisArg, 3);

                forEach(collection, function(value, index, collection) {
                    var current = callback(value, index, collection);
                    if (current > computed) {
                        computed = current;
                        result = value;
                    }
                });
            }
            return result;
        }

        /**
         * Retrieves the minimum value of a collection. If the collection is empty or
         * falsey `Infinity` is returned. If a callback is provided it will be executed
         * for each value in the collection to generate the criterion by which the value
         * is ranked. The callback is bound to `thisArg` and invoked with three
         * arguments; (value, index, collection).
         *
         * If a property name is provided for `callback` the created "_.pluck" style
         * callback will return the property value of the given element.
         *
         * If an object is provided for `callback` the created "_.where" style callback
         * will return `true` for elements that have the properties of the given object,
         * else `false`.
         *
         * @static
         * @memberOf _
         * @category Collections
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function|Object|string} [callback=identity] The function called
         *  per iteration. If a property name or object is provided it will be used
         *  to create a "_.pluck" or "_.where" style callback, respectively.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {*} Returns the minimum value.
         * @example
         *
         * _.min([4, 2, 8, 6]);
         * // => 2
         *
         * var characters = [
         *   { 'name': 'barney', 'age': 36 },
         *   { 'name': 'fred',   'age': 40 }
         * ];
         *
         * _.min(characters, function(chr) { return chr.age; });
         * // => { 'name': 'barney', 'age': 36 };
         *
         * // using "_.pluck" callback shorthand
         * _.min(characters, 'age');
         * // => { 'name': 'barney', 'age': 36 };
         */
        function min(collection, callback, thisArg) {
            var computed = Infinity,
                result = computed;

            // allows working with functions like `_.map` without using
            // their `index` argument as a callback
            if (typeof callback != 'function' && thisArg && thisArg[callback] === collection) {
                callback = null;
            }
            if (callback == null && isArray(collection)) {
                var index = -1,
                    length = collection.length;

                while (++index < length) {
                    var value = collection[index];
                    if (value < result) {
                        result = value;
                    }
                }
            } else {
                callback = (callback == null && isString(collection)) ?
                    charAtCallback :
                    lodash.createCallback(callback, thisArg, 3);

                forEach(collection, function(value, index, collection) {
                    var current = callback(value, index, collection);
                    if (current < computed) {
                        computed = current;
                        result = value;
                    }
                });
            }
            return result;
        }

        /**
         * Retrieves the value of a specified property from all elements in the collection.
         *
         * @static
         * @memberOf _
         * @type Function
         * @category Collections
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {string} property The name of the property to pluck.
         * @returns {Array} Returns a new array of property values.
         * @example
         *
         * var characters = [
         *   { 'name': 'barney', 'age': 36 },
         *   { 'name': 'fred',   'age': 40 }
         * ];
         *
         * _.pluck(characters, 'name');
         * // => ['barney', 'fred']
         */
        var pluck = map;

        /**
         * Reduces a collection to a value which is the accumulated result of running
         * each element in the collection through the callback, where each successive
         * callback execution consumes the return value of the previous execution. If
         * `accumulator` is not provided the first element of the collection will be
         * used as the initial `accumulator` value. The callback is bound to `thisArg`
         * and invoked with four arguments; (accumulator, value, index|key, collection).
         *
         * @static
         * @memberOf _
         * @alias foldl, inject
         * @category Collections
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function} [callback=identity] The function called per iteration.
         * @param {*} [accumulator] Initial value of the accumulator.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {*} Returns the accumulated value.
         * @example
         *
         * var sum = _.reduce([1, 2, 3], function(sum, num) {
         *   return sum + num;
         * });
         * // => 6
         *
         * var mapped = _.reduce({ 'a': 1, 'b': 2, 'c': 3 }, function(result, num, key) {
         *   result[key] = num * 3;
         *   return result;
         * }, {});
         * // => { 'a': 3, 'b': 6, 'c': 9 }
         */
        function reduce(collection, callback, accumulator, thisArg) {
            if (!collection) return accumulator;
            var noaccum = arguments.length < 3;
            callback = lodash.createCallback(callback, thisArg, 4);

            var index = -1,
                length = collection.length;

            if (typeof length == 'number') {
                if (noaccum) {
                    accumulator = collection[++index];
                }
                while (++index < length) {
                    accumulator = callback(accumulator, collection[index], index, collection);
                }
            } else {
                forOwn(collection, function(value, index, collection) {
                    accumulator = noaccum ?
                        (noaccum = false, value) :
                        callback(accumulator, value, index, collection)
                });
            }
            return accumulator;
        }

        /**
         * This method is like `_.reduce` except that it iterates over elements
         * of a `collection` from right to left.
         *
         * @static
         * @memberOf _
         * @alias foldr
         * @category Collections
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function} [callback=identity] The function called per iteration.
         * @param {*} [accumulator] Initial value of the accumulator.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {*} Returns the accumulated value.
         * @example
         *
         * var list = [[0, 1], [2, 3], [4, 5]];
         * var flat = _.reduceRight(list, function(a, b) { return a.concat(b); }, []);
         * // => [4, 5, 2, 3, 0, 1]
         */
        function reduceRight(collection, callback, accumulator, thisArg) {
            var noaccum = arguments.length < 3;
            callback = lodash.createCallback(callback, thisArg, 4);
            forEachRight(collection, function(value, index, collection) {
                accumulator = noaccum ?
                    (noaccum = false, value) :
                    callback(accumulator, value, index, collection);
            });
            return accumulator;
        }

        /**
         * The opposite of `_.filter` this method returns the elements of a
         * collection that the callback does **not** return truey for.
         *
         * If a property name is provided for `callback` the created "_.pluck" style
         * callback will return the property value of the given element.
         *
         * If an object is provided for `callback` the created "_.where" style callback
         * will return `true` for elements that have the properties of the given object,
         * else `false`.
         *
         * @static
         * @memberOf _
         * @category Collections
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function|Object|string} [callback=identity] The function called
         *  per iteration. If a property name or object is provided it will be used
         *  to create a "_.pluck" or "_.where" style callback, respectively.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {Array} Returns a new array of elements that failed the callback check.
         * @example
         *
         * var odds = _.reject([1, 2, 3, 4, 5, 6], function(num) { return num % 2 == 0; });
         * // => [1, 3, 5]
         *
         * var characters = [
         *   { 'name': 'barney', 'age': 36, 'blocked': false },
         *   { 'name': 'fred',   'age': 40, 'blocked': true }
         * ];
         *
         * // using "_.pluck" callback shorthand
         * _.reject(characters, 'blocked');
         * // => [{ 'name': 'barney', 'age': 36, 'blocked': false }]
         *
         * // using "_.where" callback shorthand
         * _.reject(characters, { 'age': 36 });
         * // => [{ 'name': 'fred', 'age': 40, 'blocked': true }]
         */
        function reject(collection, callback, thisArg) {
            callback = lodash.createCallback(callback, thisArg, 3);
            return filter(collection, function(value, index, collection) {
                return !callback(value, index, collection);
            });
        }

        /**
         * Retrieves a random element or `n` random elements from a collection.
         *
         * @static
         * @memberOf _
         * @category Collections
         * @param {Array|Object|string} collection The collection to sample.
         * @param {number} [n] The number of elements to sample.
         * @param- {Object} [guard] Allows working with functions like `_.map`
         *  without using their `index` arguments as `n`.
         * @returns {Array} Returns the random sample(s) of `collection`.
         * @example
         *
         * _.sample([1, 2, 3, 4]);
         * // => 2
         *
         * _.sample([1, 2, 3, 4], 2);
         * // => [3, 1]
         */
        function sample(collection, n, guard) {
            if (collection && typeof collection.length != 'number') {
                collection = values(collection);
            }
            if (n == null || guard) {
                return collection ? collection[baseRandom(0, collection.length - 1)] : undefined;
            }
            var result = shuffle(collection);
            result.length = nativeMin(nativeMax(0, n), result.length);
            return result;
        }

        /**
         * Creates an array of shuffled values, using a version of the Fisher-Yates
         * shuffle. See http://en.wikipedia.org/wiki/Fisher-Yates_shuffle.
         *
         * @static
         * @memberOf _
         * @category Collections
         * @param {Array|Object|string} collection The collection to shuffle.
         * @returns {Array} Returns a new shuffled collection.
         * @example
         *
         * _.shuffle([1, 2, 3, 4, 5, 6]);
         * // => [4, 1, 6, 3, 5, 2]
         */
        function shuffle(collection) {
            var index = -1,
                length = collection ? collection.length : 0,
                result = Array(typeof length == 'number' ? length : 0);

            forEach(collection, function(value) {
                var rand = baseRandom(0, ++index);
                result[index] = result[rand];
                result[rand] = value;
            });
            return result;
        }

        /**
         * Gets the size of the `collection` by returning `collection.length` for arrays
         * and array-like objects or the number of own enumerable properties for objects.
         *
         * @static
         * @memberOf _
         * @category Collections
         * @param {Array|Object|string} collection The collection to inspect.
         * @returns {number} Returns `collection.length` or number of own enumerable properties.
         * @example
         *
         * _.size([1, 2]);
         * // => 2
         *
         * _.size({ 'one': 1, 'two': 2, 'three': 3 });
         * // => 3
         *
         * _.size('pebbles');
         * // => 7
         */
        function size(collection) {
            var length = collection ? collection.length : 0;
            return typeof length == 'number' ? length : keys(collection).length;
        }

        /**
         * Checks if the callback returns a truey value for **any** element of a
         * collection. The function returns as soon as it finds a passing value and
         * does not iterate over the entire collection. The callback is bound to
         * `thisArg` and invoked with three arguments; (value, index|key, collection).
         *
         * If a property name is provided for `callback` the created "_.pluck" style
         * callback will return the property value of the given element.
         *
         * If an object is provided for `callback` the created "_.where" style callback
         * will return `true` for elements that have the properties of the given object,
         * else `false`.
         *
         * @static
         * @memberOf _
         * @alias any
         * @category Collections
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Function|Object|string} [callback=identity] The function called
         *  per iteration. If a property name or object is provided it will be used
         *  to create a "_.pluck" or "_.where" style callback, respectively.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {boolean} Returns `true` if any element passed the callback check,
         *  else `false`.
         * @example
         *
         * _.some([null, 0, 'yes', false], Boolean);
         * // => true
         *
         * var characters = [
         *   { 'name': 'barney', 'age': 36, 'blocked': false },
         *   { 'name': 'fred',   'age': 40, 'blocked': true }
         * ];
         *
         * // using "_.pluck" callback shorthand
         * _.some(characters, 'blocked');
         * // => true
         *
         * // using "_.where" callback shorthand
         * _.some(characters, { 'age': 1 });
         * // => false
         */
        function some(collection, callback, thisArg) {
            var result;
            callback = lodash.createCallback(callback, thisArg, 3);

            var index = -1,
                length = collection ? collection.length : 0;

            if (typeof length == 'number') {
                while (++index < length) {
                    if ((result = callback(collection[index], index, collection))) {
                        break;
                    }
                }
            } else {
                forOwn(collection, function(value, index, collection) {
                    return !(result = callback(value, index, collection));
                });
            }
            return !!result;
        }

        /**
         * Creates an array of elements, sorted in ascending order by the results of
         * running each element in a collection through the callback. This method
         * performs a stable sort, that is, it will preserve the original sort order
         * of equal elements. The callback is bound to `thisArg` and invoked with
         * three arguments; (value, index|key, collection).
         *
         * If a property name is provided for `callback` the created "_.pluck" style
         * callback will return the property value of the given element.
         *
         * If an array of property names is provided for `callback` the collection
         * will be sorted by each property value.
         *
         * If an object is provided for `callback` the created "_.where" style callback
         * will return `true` for elements that have the properties of the given object,
         * else `false`.
         *
         * @static
         * @memberOf _
         * @category Collections
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Array|Function|Object|string} [callback=identity] The function called
         *  per iteration. If a property name or object is provided it will be used
         *  to create a "_.pluck" or "_.where" style callback, respectively.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {Array} Returns a new array of sorted elements.
         * @example
         *
         * _.sortBy([1, 2, 3], function(num) { return Math.sin(num); });
         * // => [3, 1, 2]
         *
         * _.sortBy([1, 2, 3], function(num) { return this.sin(num); }, Math);
         * // => [3, 1, 2]
         *
         * var characters = [
         *   { 'name': 'barney',  'age': 36 },
         *   { 'name': 'fred',    'age': 40 },
         *   { 'name': 'barney',  'age': 26 },
         *   { 'name': 'fred',    'age': 30 }
         * ];
         *
         * // using "_.pluck" callback shorthand
         * _.map(_.sortBy(characters, 'age'), _.values);
         * // => [['barney', 26], ['fred', 30], ['barney', 36], ['fred', 40]]
         *
         * // sorting by multiple properties
         * _.map(_.sortBy(characters, ['name', 'age']), _.values);
         * // = > [['barney', 26], ['barney', 36], ['fred', 30], ['fred', 40]]
         */
        function sortBy(collection, callback, thisArg) {
            var index = -1,
                isArr = isArray(callback),
                length = collection ? collection.length : 0,
                result = Array(typeof length == 'number' ? length : 0);

            if (!isArr) {
                callback = lodash.createCallback(callback, thisArg, 3);
            }
            forEach(collection, function(value, key, collection) {
                var object = result[++index] = getObject();
                if (isArr) {
                    object.criteria = map(callback, function(key) {
                        return value[key];
                    });
                } else {
                    (object.criteria = getArray())[0] = callback(value, key, collection);
                }
                object.index = index;
                object.value = value;
            });

            length = result.length;
            result.sort(compareAscending);
            while (length--) {
                var object = result[length];
                result[length] = object.value;
                if (!isArr) {
                    releaseArray(object.criteria);
                }
                releaseObject(object);
            }
            return result;
        }

        /**
         * Converts the `collection` to an array.
         *
         * @static
         * @memberOf _
         * @category Collections
         * @param {Array|Object|string} collection The collection to convert.
         * @returns {Array} Returns the new converted array.
         * @example
         *
         * (function() { return _.toArray(arguments).slice(1); })(1, 2, 3, 4);
         * // => [2, 3, 4]
         */
        function toArray(collection) {
            if (collection && typeof collection.length == 'number') {
                return slice(collection);
            }
            return values(collection);
        }

        /**
         * Performs a deep comparison of each element in a `collection` to the given
         * `properties` object, returning an array of all elements that have equivalent
         * property values.
         *
         * @static
         * @memberOf _
         * @type Function
         * @category Collections
         * @param {Array|Object|string} collection The collection to iterate over.
         * @param {Object} props The object of property values to filter by.
         * @returns {Array} Returns a new array of elements that have the given properties.
         * @example
         *
         * var characters = [
         *   { 'name': 'barney', 'age': 36, 'pets': ['hoppy'] },
         *   { 'name': 'fred',   'age': 40, 'pets': ['baby puss', 'dino'] }
         * ];
         *
         * _.where(characters, { 'age': 36 });
         * // => [{ 'name': 'barney', 'age': 36, 'pets': ['hoppy'] }]
         *
         * _.where(characters, { 'pets': ['dino'] });
         * // => [{ 'name': 'fred', 'age': 40, 'pets': ['baby puss', 'dino'] }]
         */
        var where = filter;

        /*--------------------------------------------------------------------------*/

        /**
         * Creates an array with all falsey values removed. The values `false`, `null`,
         * `0`, `""`, `undefined`, and `NaN` are all falsey.
         *
         * @static
         * @memberOf _
         * @category Arrays
         * @param {Array} array The array to compact.
         * @returns {Array} Returns a new array of filtered values.
         * @example
         *
         * _.compact([0, 1, false, 2, '', 3]);
         * // => [1, 2, 3]
         */
        function compact(array) {
            var index = -1,
                length = array ? array.length : 0,
                result = [];

            while (++index < length) {
                var value = array[index];
                if (value) {
                    result.push(value);
                }
            }
            return result;
        }

        /**
         * Creates an array excluding all values of the provided arrays using strict
         * equality for comparisons, i.e. `===`.
         *
         * @static
         * @memberOf _
         * @category Arrays
         * @param {Array} array The array to process.
         * @param {...Array} [values] The arrays of values to exclude.
         * @returns {Array} Returns a new array of filtered values.
         * @example
         *
         * _.difference([1, 2, 3, 4, 5], [5, 2, 10]);
         * // => [1, 3, 4]
         */
        function difference(array) {
            return baseDifference(array, baseFlatten(arguments, true, true, 1));
        }

        /**
         * This method is like `_.find` except that it returns the index of the first
         * element that passes the callback check, instead of the element itself.
         *
         * If a property name is provided for `callback` the created "_.pluck" style
         * callback will return the property value of the given element.
         *
         * If an object is provided for `callback` the created "_.where" style callback
         * will return `true` for elements that have the properties of the given object,
         * else `false`.
         *
         * @static
         * @memberOf _
         * @category Arrays
         * @param {Array} array The array to search.
         * @param {Function|Object|string} [callback=identity] The function called
         *  per iteration. If a property name or object is provided it will be used
         *  to create a "_.pluck" or "_.where" style callback, respectively.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {number} Returns the index of the found element, else `-1`.
         * @example
         *
         * var characters = [
         *   { 'name': 'barney',  'age': 36, 'blocked': false },
         *   { 'name': 'fred',    'age': 40, 'blocked': true },
         *   { 'name': 'pebbles', 'age': 1,  'blocked': false }
         * ];
         *
         * _.findIndex(characters, function(chr) {
         *   return chr.age < 20;
         * });
         * // => 2
         *
         * // using "_.where" callback shorthand
         * _.findIndex(characters, { 'age': 36 });
         * // => 0
         *
         * // using "_.pluck" callback shorthand
         * _.findIndex(characters, 'blocked');
         * // => 1
         */
        function findIndex(array, callback, thisArg) {
            var index = -1,
                length = array ? array.length : 0;

            callback = lodash.createCallback(callback, thisArg, 3);
            while (++index < length) {
                if (callback(array[index], index, array)) {
                    return index;
                }
            }
            return -1;
        }

        /**
         * This method is like `_.findIndex` except that it iterates over elements
         * of a `collection` from right to left.
         *
         * If a property name is provided for `callback` the created "_.pluck" style
         * callback will return the property value of the given element.
         *
         * If an object is provided for `callback` the created "_.where" style callback
         * will return `true` for elements that have the properties of the given object,
         * else `false`.
         *
         * @static
         * @memberOf _
         * @category Arrays
         * @param {Array} array The array to search.
         * @param {Function|Object|string} [callback=identity] The function called
         *  per iteration. If a property name or object is provided it will be used
         *  to create a "_.pluck" or "_.where" style callback, respectively.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {number} Returns the index of the found element, else `-1`.
         * @example
         *
         * var characters = [
         *   { 'name': 'barney',  'age': 36, 'blocked': true },
         *   { 'name': 'fred',    'age': 40, 'blocked': false },
         *   { 'name': 'pebbles', 'age': 1,  'blocked': true }
         * ];
         *
         * _.findLastIndex(characters, function(chr) {
         *   return chr.age > 30;
         * });
         * // => 1
         *
         * // using "_.where" callback shorthand
         * _.findLastIndex(characters, { 'age': 36 });
         * // => 0
         *
         * // using "_.pluck" callback shorthand
         * _.findLastIndex(characters, 'blocked');
         * // => 2
         */
        function findLastIndex(array, callback, thisArg) {
            var length = array ? array.length : 0;
            callback = lodash.createCallback(callback, thisArg, 3);
            while (length--) {
                if (callback(array[length], length, array)) {
                    return length;
                }
            }
            return -1;
        }

        /**
         * Gets the first element or first `n` elements of an array. If a callback
         * is provided elements at the beginning of the array are returned as long
         * as the callback returns truey. The callback is bound to `thisArg` and
         * invoked with three arguments; (value, index, array).
         *
         * If a property name is provided for `callback` the created "_.pluck" style
         * callback will return the property value of the given element.
         *
         * If an object is provided for `callback` the created "_.where" style callback
         * will return `true` for elements that have the properties of the given object,
         * else `false`.
         *
         * @static
         * @memberOf _
         * @alias head, take
         * @category Arrays
         * @param {Array} array The array to query.
         * @param {Function|Object|number|string} [callback] The function called
         *  per element or the number of elements to return. If a property name or
         *  object is provided it will be used to create a "_.pluck" or "_.where"
         *  style callback, respectively.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {*} Returns the first element(s) of `array`.
         * @example
         *
         * _.first([1, 2, 3]);
         * // => 1
         *
         * _.first([1, 2, 3], 2);
         * // => [1, 2]
         *
         * _.first([1, 2, 3], function(num) {
         *   return num < 3;
         * });
         * // => [1, 2]
         *
         * var characters = [
         *   { 'name': 'barney',  'blocked': true,  'employer': 'slate' },
         *   { 'name': 'fred',    'blocked': false, 'employer': 'slate' },
         *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
         * ];
         *
         * // using "_.pluck" callback shorthand
         * _.first(characters, 'blocked');
         * // => [{ 'name': 'barney', 'blocked': true, 'employer': 'slate' }]
         *
         * // using "_.where" callback shorthand
         * _.pluck(_.first(characters, { 'employer': 'slate' }), 'name');
         * // => ['barney', 'fred']
         */
        function first(array, callback, thisArg) {
            var n = 0,
                length = array ? array.length : 0;

            if (typeof callback != 'number' && callback != null) {
                var index = -1;
                callback = lodash.createCallback(callback, thisArg, 3);
                while (++index < length && callback(array[index], index, array)) {
                    n++;
                }
            } else {
                n = callback;
                if (n == null || thisArg) {
                    return array ? array[0] : undefined;
                }
            }
            return slice(array, 0, nativeMin(nativeMax(0, n), length));
        }

        /**
         * Flattens a nested array (the nesting can be to any depth). If `isShallow`
         * is truey, the array will only be flattened a single level. If a callback
         * is provided each element of the array is passed through the callback before
         * flattening. The callback is bound to `thisArg` and invoked with three
         * arguments; (value, index, array).
         *
         * If a property name is provided for `callback` the created "_.pluck" style
         * callback will return the property value of the given element.
         *
         * If an object is provided for `callback` the created "_.where" style callback
         * will return `true` for elements that have the properties of the given object,
         * else `false`.
         *
         * @static
         * @memberOf _
         * @category Arrays
         * @param {Array} array The array to flatten.
         * @param {boolean} [isShallow=false] A flag to restrict flattening to a single level.
         * @param {Function|Object|string} [callback=identity] The function called
         *  per iteration. If a property name or object is provided it will be used
         *  to create a "_.pluck" or "_.where" style callback, respectively.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {Array} Returns a new flattened array.
         * @example
         *
         * _.flatten([1, [2], [3, [[4]]]]);
         * // => [1, 2, 3, 4];
         *
         * _.flatten([1, [2], [3, [[4]]]], true);
         * // => [1, 2, 3, [[4]]];
         *
         * var characters = [
         *   { 'name': 'barney', 'age': 30, 'pets': ['hoppy'] },
         *   { 'name': 'fred',   'age': 40, 'pets': ['baby puss', 'dino'] }
         * ];
         *
         * // using "_.pluck" callback shorthand
         * _.flatten(characters, 'pets');
         * // => ['hoppy', 'baby puss', 'dino']
         */
        function flatten(array, isShallow, callback, thisArg) {
            // juggle arguments
            if (typeof isShallow != 'boolean' && isShallow != null) {
                thisArg = callback;
                callback = (typeof isShallow != 'function' && thisArg && thisArg[isShallow] === array) ? null : isShallow;
                isShallow = false;
            }
            if (callback != null) {
                array = map(array, callback, thisArg);
            }
            return baseFlatten(array, isShallow);
        }

        /**
         * Gets the index at which the first occurrence of `value` is found using
         * strict equality for comparisons, i.e. `===`. If the array is already sorted
         * providing `true` for `fromIndex` will run a faster binary search.
         *
         * @static
         * @memberOf _
         * @category Arrays
         * @param {Array} array The array to search.
         * @param {*} value The value to search for.
         * @param {boolean|number} [fromIndex=0] The index to search from or `true`
         *  to perform a binary search on a sorted array.
         * @returns {number} Returns the index of the matched value or `-1`.
         * @example
         *
         * _.indexOf([1, 2, 3, 1, 2, 3], 2);
         * // => 1
         *
         * _.indexOf([1, 2, 3, 1, 2, 3], 2, 3);
         * // => 4
         *
         * _.indexOf([1, 1, 2, 2, 3, 3], 2, true);
         * // => 2
         */
        function indexOf(array, value, fromIndex) {
            if (typeof fromIndex == 'number') {
                var length = array ? array.length : 0;
                fromIndex = (fromIndex < 0 ? nativeMax(0, length + fromIndex) : fromIndex || 0);
            } else if (fromIndex) {
                var index = sortedIndex(array, value);
                return array[index] === value ? index : -1;
            }
            return baseIndexOf(array, value, fromIndex);
        }

        /**
         * Gets all but the last element or last `n` elements of an array. If a
         * callback is provided elements at the end of the array are excluded from
         * the result as long as the callback returns truey. The callback is bound
         * to `thisArg` and invoked with three arguments; (value, index, array).
         *
         * If a property name is provided for `callback` the created "_.pluck" style
         * callback will return the property value of the given element.
         *
         * If an object is provided for `callback` the created "_.where" style callback
         * will return `true` for elements that have the properties of the given object,
         * else `false`.
         *
         * @static
         * @memberOf _
         * @category Arrays
         * @param {Array} array The array to query.
         * @param {Function|Object|number|string} [callback=1] The function called
         *  per element or the number of elements to exclude. If a property name or
         *  object is provided it will be used to create a "_.pluck" or "_.where"
         *  style callback, respectively.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {Array} Returns a slice of `array`.
         * @example
         *
         * _.initial([1, 2, 3]);
         * // => [1, 2]
         *
         * _.initial([1, 2, 3], 2);
         * // => [1]
         *
         * _.initial([1, 2, 3], function(num) {
         *   return num > 1;
         * });
         * // => [1]
         *
         * var characters = [
         *   { 'name': 'barney',  'blocked': false, 'employer': 'slate' },
         *   { 'name': 'fred',    'blocked': true,  'employer': 'slate' },
         *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
         * ];
         *
         * // using "_.pluck" callback shorthand
         * _.initial(characters, 'blocked');
         * // => [{ 'name': 'barney',  'blocked': false, 'employer': 'slate' }]
         *
         * // using "_.where" callback shorthand
         * _.pluck(_.initial(characters, { 'employer': 'na' }), 'name');
         * // => ['barney', 'fred']
         */
        function initial(array, callback, thisArg) {
            var n = 0,
                length = array ? array.length : 0;

            if (typeof callback != 'number' && callback != null) {
                var index = length;
                callback = lodash.createCallback(callback, thisArg, 3);
                while (index-- && callback(array[index], index, array)) {
                    n++;
                }
            } else {
                n = (callback == null || thisArg) ? 1 : callback || n;
            }
            return slice(array, 0, nativeMin(nativeMax(0, length - n), length));
        }

        /**
         * Creates an array of unique values present in all provided arrays using
         * strict equality for comparisons, i.e. `===`.
         *
         * @static
         * @memberOf _
         * @category Arrays
         * @param {...Array} [array] The arrays to inspect.
         * @returns {Array} Returns an array of shared values.
         * @example
         *
         * _.intersection([1, 2, 3], [5, 2, 1, 4], [2, 1]);
         * // => [1, 2]
         */
        function intersection() {
            var args = [],
                argsIndex = -1,
                argsLength = arguments.length,
                caches = getArray(),
                indexOf = getIndexOf(),
                trustIndexOf = indexOf === baseIndexOf,
                seen = getArray();

            while (++argsIndex < argsLength) {
                var value = arguments[argsIndex];
                if (isArray(value) || isArguments(value)) {
                    args.push(value);
                    caches.push(trustIndexOf && value.length >= largeArraySize &&
                        createCache(argsIndex ? args[argsIndex] : seen));
                }
            }
            var array = args[0],
                index = -1,
                length = array ? array.length : 0,
                result = [];

            outer:
                while (++index < length) {
                    var cache = caches[0];
                    value = array[index];

                    if ((cache ? cacheIndexOf(cache, value) : indexOf(seen, value)) < 0) {
                        argsIndex = argsLength;
                        (cache || seen).push(value);
                        while (--argsIndex) {
                            cache = caches[argsIndex];
                            if ((cache ? cacheIndexOf(cache, value) : indexOf(args[argsIndex], value)) < 0) {
                                continue outer;
                            }
                        }
                        result.push(value);
                    }
                }
            while (argsLength--) {
                cache = caches[argsLength];
                if (cache) {
                    releaseObject(cache);
                }
            }
            releaseArray(caches);
            releaseArray(seen);
            return result;
        }

        /**
         * Gets the last element or last `n` elements of an array. If a callback is
         * provided elements at the end of the array are returned as long as the
         * callback returns truey. The callback is bound to `thisArg` and invoked
         * with three arguments; (value, index, array).
         *
         * If a property name is provided for `callback` the created "_.pluck" style
         * callback will return the property value of the given element.
         *
         * If an object is provided for `callback` the created "_.where" style callback
         * will return `true` for elements that have the properties of the given object,
         * else `false`.
         *
         * @static
         * @memberOf _
         * @category Arrays
         * @param {Array} array The array to query.
         * @param {Function|Object|number|string} [callback] The function called
         *  per element or the number of elements to return. If a property name or
         *  object is provided it will be used to create a "_.pluck" or "_.where"
         *  style callback, respectively.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {*} Returns the last element(s) of `array`.
         * @example
         *
         * _.last([1, 2, 3]);
         * // => 3
         *
         * _.last([1, 2, 3], 2);
         * // => [2, 3]
         *
         * _.last([1, 2, 3], function(num) {
         *   return num > 1;
         * });
         * // => [2, 3]
         *
         * var characters = [
         *   { 'name': 'barney',  'blocked': false, 'employer': 'slate' },
         *   { 'name': 'fred',    'blocked': true,  'employer': 'slate' },
         *   { 'name': 'pebbles', 'blocked': true,  'employer': 'na' }
         * ];
         *
         * // using "_.pluck" callback shorthand
         * _.pluck(_.last(characters, 'blocked'), 'name');
         * // => ['fred', 'pebbles']
         *
         * // using "_.where" callback shorthand
         * _.last(characters, { 'employer': 'na' });
         * // => [{ 'name': 'pebbles', 'blocked': true, 'employer': 'na' }]
         */
        function last(array, callback, thisArg) {
            var n = 0,
                length = array ? array.length : 0;

            if (typeof callback != 'number' && callback != null) {
                var index = length;
                callback = lodash.createCallback(callback, thisArg, 3);
                while (index-- && callback(array[index], index, array)) {
                    n++;
                }
            } else {
                n = callback;
                if (n == null || thisArg) {
                    return array ? array[length - 1] : undefined;
                }
            }
            return slice(array, nativeMax(0, length - n));
        }

        /**
         * Gets the index at which the last occurrence of `value` is found using strict
         * equality for comparisons, i.e. `===`. If `fromIndex` is negative, it is used
         * as the offset from the end of the collection.
         *
         * If a property name is provided for `callback` the created "_.pluck" style
         * callback will return the property value of the given element.
         *
         * If an object is provided for `callback` the created "_.where" style callback
         * will return `true` for elements that have the properties of the given object,
         * else `false`.
         *
         * @static
         * @memberOf _
         * @category Arrays
         * @param {Array} array The array to search.
         * @param {*} value The value to search for.
         * @param {number} [fromIndex=array.length-1] The index to search from.
         * @returns {number} Returns the index of the matched value or `-1`.
         * @example
         *
         * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2);
         * // => 4
         *
         * _.lastIndexOf([1, 2, 3, 1, 2, 3], 2, 3);
         * // => 1
         */
        function lastIndexOf(array, value, fromIndex) {
            var index = array ? array.length : 0;
            if (typeof fromIndex == 'number') {
                index = (fromIndex < 0 ? nativeMax(0, index + fromIndex) : nativeMin(fromIndex, index - 1)) + 1;
            }
            while (index--) {
                if (array[index] === value) {
                    return index;
                }
            }
            return -1;
        }

        /**
         * Removes all provided values from the given array using strict equality for
         * comparisons, i.e. `===`.
         *
         * @static
         * @memberOf _
         * @category Arrays
         * @param {Array} array The array to modify.
         * @param {...*} [value] The values to remove.
         * @returns {Array} Returns `array`.
         * @example
         *
         * var array = [1, 2, 3, 1, 2, 3];
         * _.pull(array, 2, 3);
         * console.log(array);
         * // => [1, 1]
         */
        function pull(array) {
            var args = arguments,
                argsIndex = 0,
                argsLength = args.length,
                length = array ? array.length : 0;

            while (++argsIndex < argsLength) {
                var index = -1,
                    value = args[argsIndex];
                while (++index < length) {
                    if (array[index] === value) {
                        splice.call(array, index--, 1);
                        length--;
                    }
                }
            }
            return array;
        }

        /**
         * Creates an array of numbers (positive and/or negative) progressing from
         * `start` up to but not including `end`. If `start` is less than `stop` a
         * zero-length range is created unless a negative `step` is specified.
         *
         * @static
         * @memberOf _
         * @category Arrays
         * @param {number} [start=0] The start of the range.
         * @param {number} end The end of the range.
         * @param {number} [step=1] The value to increment or decrement by.
         * @returns {Array} Returns a new range array.
         * @example
         *
         * _.range(4);
         * // => [0, 1, 2, 3]
         *
         * _.range(1, 5);
         * // => [1, 2, 3, 4]
         *
         * _.range(0, 20, 5);
         * // => [0, 5, 10, 15]
         *
         * _.range(0, -4, -1);
         * // => [0, -1, -2, -3]
         *
         * _.range(1, 4, 0);
         * // => [1, 1, 1]
         *
         * _.range(0);
         * // => []
         */
        function range(start, end, step) {
            start = +start || 0;
            step = typeof step == 'number' ? step : (+step || 1);

            if (end == null) {
                end = start;
                start = 0;
            }
            // use `Array(length)` so engines like Chakra and V8 avoid slower modes
            // http://youtu.be/XAqIpGU8ZZk#t=17m25s
            var index = -1,
                length = nativeMax(0, ceil((end - start) / (step || 1))),
                result = Array(length);

            while (++index < length) {
                result[index] = start;
                start += step;
            }
            return result;
        }

        /**
         * Removes all elements from an array that the callback returns truey for
         * and returns an array of removed elements. The callback is bound to `thisArg`
         * and invoked with three arguments; (value, index, array).
         *
         * If a property name is provided for `callback` the created "_.pluck" style
         * callback will return the property value of the given element.
         *
         * If an object is provided for `callback` the created "_.where" style callback
         * will return `true` for elements that have the properties of the given object,
         * else `false`.
         *
         * @static
         * @memberOf _
         * @category Arrays
         * @param {Array} array The array to modify.
         * @param {Function|Object|string} [callback=identity] The function called
         *  per iteration. If a property name or object is provided it will be used
         *  to create a "_.pluck" or "_.where" style callback, respectively.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {Array} Returns a new array of removed elements.
         * @example
         *
         * var array = [1, 2, 3, 4, 5, 6];
         * var evens = _.remove(array, function(num) { return num % 2 == 0; });
         *
         * console.log(array);
         * // => [1, 3, 5]
         *
         * console.log(evens);
         * // => [2, 4, 6]
         */
        function remove(array, callback, thisArg) {
            var index = -1,
                length = array ? array.length : 0,
                result = [];

            callback = lodash.createCallback(callback, thisArg, 3);
            while (++index < length) {
                var value = array[index];
                if (callback(value, index, array)) {
                    result.push(value);
                    splice.call(array, index--, 1);
                    length--;
                }
            }
            return result;
        }

        /**
         * The opposite of `_.initial` this method gets all but the first element or
         * first `n` elements of an array. If a callback function is provided elements
         * at the beginning of the array are excluded from the result as long as the
         * callback returns truey. The callback is bound to `thisArg` and invoked
         * with three arguments; (value, index, array).
         *
         * If a property name is provided for `callback` the created "_.pluck" style
         * callback will return the property value of the given element.
         *
         * If an object is provided for `callback` the created "_.where" style callback
         * will return `true` for elements that have the properties of the given object,
         * else `false`.
         *
         * @static
         * @memberOf _
         * @alias drop, tail
         * @category Arrays
         * @param {Array} array The array to query.
         * @param {Function|Object|number|string} [callback=1] The function called
         *  per element or the number of elements to exclude. If a property name or
         *  object is provided it will be used to create a "_.pluck" or "_.where"
         *  style callback, respectively.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {Array} Returns a slice of `array`.
         * @example
         *
         * _.rest([1, 2, 3]);
         * // => [2, 3]
         *
         * _.rest([1, 2, 3], 2);
         * // => [3]
         *
         * _.rest([1, 2, 3], function(num) {
         *   return num < 3;
         * });
         * // => [3]
         *
         * var characters = [
         *   { 'name': 'barney',  'blocked': true,  'employer': 'slate' },
         *   { 'name': 'fred',    'blocked': false,  'employer': 'slate' },
         *   { 'name': 'pebbles', 'blocked': true, 'employer': 'na' }
         * ];
         *
         * // using "_.pluck" callback shorthand
         * _.pluck(_.rest(characters, 'blocked'), 'name');
         * // => ['fred', 'pebbles']
         *
         * // using "_.where" callback shorthand
         * _.rest(characters, { 'employer': 'slate' });
         * // => [{ 'name': 'pebbles', 'blocked': true, 'employer': 'na' }]
         */
        function rest(array, callback, thisArg) {
            if (typeof callback != 'number' && callback != null) {
                var n = 0,
                    index = -1,
                    length = array ? array.length : 0;

                callback = lodash.createCallback(callback, thisArg, 3);
                while (++index < length && callback(array[index], index, array)) {
                    n++;
                }
            } else {
                n = (callback == null || thisArg) ? 1 : nativeMax(0, callback);
            }
            return slice(array, n);
        }

        /**
         * Uses a binary search to determine the smallest index at which a value
         * should be inserted into a given sorted array in order to maintain the sort
         * order of the array. If a callback is provided it will be executed for
         * `value` and each element of `array` to compute their sort ranking. The
         * callback is bound to `thisArg` and invoked with one argument; (value).
         *
         * If a property name is provided for `callback` the created "_.pluck" style
         * callback will return the property value of the given element.
         *
         * If an object is provided for `callback` the created "_.where" style callback
         * will return `true` for elements that have the properties of the given object,
         * else `false`.
         *
         * @static
         * @memberOf _
         * @category Arrays
         * @param {Array} array The array to inspect.
         * @param {*} value The value to evaluate.
         * @param {Function|Object|string} [callback=identity] The function called
         *  per iteration. If a property name or object is provided it will be used
         *  to create a "_.pluck" or "_.where" style callback, respectively.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {number} Returns the index at which `value` should be inserted
         *  into `array`.
         * @example
         *
         * _.sortedIndex([20, 30, 50], 40);
         * // => 2
         *
         * // using "_.pluck" callback shorthand
         * _.sortedIndex([{ 'x': 20 }, { 'x': 30 }, { 'x': 50 }], { 'x': 40 }, 'x');
         * // => 2
         *
         * var dict = {
         *   'wordToNumber': { 'twenty': 20, 'thirty': 30, 'fourty': 40, 'fifty': 50 }
         * };
         *
         * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {
         *   return dict.wordToNumber[word];
         * });
         * // => 2
         *
         * _.sortedIndex(['twenty', 'thirty', 'fifty'], 'fourty', function(word) {
         *   return this.wordToNumber[word];
         * }, dict);
         * // => 2
         */
        function sortedIndex(array, value, callback, thisArg) {
            var low = 0,
                high = array ? array.length : low;

            // explicitly reference `identity` for better inlining in Firefox
            callback = callback ? lodash.createCallback(callback, thisArg, 1) : identity;
            value = callback(value);

            while (low < high) {
                var mid = (low + high) >>> 1;
                (callback(array[mid]) < value) ?
                low = mid + 1: high = mid;
            }
            return low;
        }

        /**
         * Creates an array of unique values, in order, of the provided arrays using
         * strict equality for comparisons, i.e. `===`.
         *
         * @static
         * @memberOf _
         * @category Arrays
         * @param {...Array} [array] The arrays to inspect.
         * @returns {Array} Returns an array of combined values.
         * @example
         *
         * _.union([1, 2, 3], [5, 2, 1, 4], [2, 1]);
         * // => [1, 2, 3, 5, 4]
         */
        function union() {
            return baseUniq(baseFlatten(arguments, true, true));
        }

        /**
         * Creates a duplicate-value-free version of an array using strict equality
         * for comparisons, i.e. `===`. If the array is sorted, providing
         * `true` for `isSorted` will use a faster algorithm. If a callback is provided
         * each element of `array` is passed through the callback before uniqueness
         * is computed. The callback is bound to `thisArg` and invoked with three
         * arguments; (value, index, array).
         *
         * If a property name is provided for `callback` the created "_.pluck" style
         * callback will return the property value of the given element.
         *
         * If an object is provided for `callback` the created "_.where" style callback
         * will return `true` for elements that have the properties of the given object,
         * else `false`.
         *
         * @static
         * @memberOf _
         * @alias unique
         * @category Arrays
         * @param {Array} array The array to process.
         * @param {boolean} [isSorted=false] A flag to indicate that `array` is sorted.
         * @param {Function|Object|string} [callback=identity] The function called
         *  per iteration. If a property name or object is provided it will be used
         *  to create a "_.pluck" or "_.where" style callback, respectively.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {Array} Returns a duplicate-value-free array.
         * @example
         *
         * _.uniq([1, 2, 1, 3, 1]);
         * // => [1, 2, 3]
         *
         * _.uniq([1, 1, 2, 2, 3], true);
         * // => [1, 2, 3]
         *
         * _.uniq(['A', 'b', 'C', 'a', 'B', 'c'], function(letter) { return letter.toLowerCase(); });
         * // => ['A', 'b', 'C']
         *
         * _.uniq([1, 2.5, 3, 1.5, 2, 3.5], function(num) { return this.floor(num); }, Math);
         * // => [1, 2.5, 3]
         *
         * // using "_.pluck" callback shorthand
         * _.uniq([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
         * // => [{ 'x': 1 }, { 'x': 2 }]
         */
        function uniq(array, isSorted, callback, thisArg) {
            // juggle arguments
            if (typeof isSorted != 'boolean' && isSorted != null) {
                thisArg = callback;
                callback = (typeof isSorted != 'function' && thisArg && thisArg[isSorted] === array) ? null : isSorted;
                isSorted = false;
            }
            if (callback != null) {
                callback = lodash.createCallback(callback, thisArg, 3);
            }
            return baseUniq(array, isSorted, callback);
        }

        /**
         * Creates an array excluding all provided values using strict equality for
         * comparisons, i.e. `===`.
         *
         * @static
         * @memberOf _
         * @category Arrays
         * @param {Array} array The array to filter.
         * @param {...*} [value] The values to exclude.
         * @returns {Array} Returns a new array of filtered values.
         * @example
         *
         * _.without([1, 2, 1, 0, 3, 1, 4], 0, 1);
         * // => [2, 3, 4]
         */
        function without(array) {
            return baseDifference(array, slice(arguments, 1));
        }

        /**
         * Creates an array that is the symmetric difference of the provided arrays.
         * See http://en.wikipedia.org/wiki/Symmetric_difference.
         *
         * @static
         * @memberOf _
         * @category Arrays
         * @param {...Array} [array] The arrays to inspect.
         * @returns {Array} Returns an array of values.
         * @example
         *
         * _.xor([1, 2, 3], [5, 2, 1, 4]);
         * // => [3, 5, 4]
         *
         * _.xor([1, 2, 5], [2, 3, 5], [3, 4, 5]);
         * // => [1, 4, 5]
         */
        function xor() {
            var index = -1,
                length = arguments.length;

            while (++index < length) {
                var array = arguments[index];
                if (isArray(array) || isArguments(array)) {
                    var result = result ?
                        baseUniq(baseDifference(result, array).concat(baseDifference(array, result))) :
                        array;
                }
            }
            return result || [];
        }

        /**
         * Creates an array of grouped elements, the first of which contains the first
         * elements of the given arrays, the second of which contains the second
         * elements of the given arrays, and so on.
         *
         * @static
         * @memberOf _
         * @alias unzip
         * @category Arrays
         * @param {...Array} [array] Arrays to process.
         * @returns {Array} Returns a new array of grouped elements.
         * @example
         *
         * _.zip(['fred', 'barney'], [30, 40], [true, false]);
         * // => [['fred', 30, true], ['barney', 40, false]]
         */
        function zip() {
            var array = arguments.length > 1 ? arguments : arguments[0],
                index = -1,
                length = array ? max(pluck(array, 'length')) : 0,
                result = Array(length < 0 ? 0 : length);

            while (++index < length) {
                result[index] = pluck(array, index);
            }
            return result;
        }

        /**
         * Creates an object composed from arrays of `keys` and `values`. Provide
         * either a single two dimensional array, i.e. `[[key1, value1], [key2, value2]]`
         * or two arrays, one of `keys` and one of corresponding `values`.
         *
         * @static
         * @memberOf _
         * @alias object
         * @category Arrays
         * @param {Array} keys The array of keys.
         * @param {Array} [values=[]] The array of values.
         * @returns {Object} Returns an object composed of the given keys and
         *  corresponding values.
         * @example
         *
         * _.zipObject(['fred', 'barney'], [30, 40]);
         * // => { 'fred': 30, 'barney': 40 }
         */
        function zipObject(keys, values) {
            var index = -1,
                length = keys ? keys.length : 0,
                result = {};

            if (!values && length && !isArray(keys[0])) {
                values = [];
            }
            while (++index < length) {
                var key = keys[index];
                if (values) {
                    result[key] = values[index];
                } else if (key) {
                    result[key[0]] = key[1];
                }
            }
            return result;
        }

        /*--------------------------------------------------------------------------*/

        /**
         * Creates a function that executes `func`, with  the `this` binding and
         * arguments of the created function, only after being called `n` times.
         *
         * @static
         * @memberOf _
         * @category Functions
         * @param {number} n The number of times the function must be called before
         *  `func` is executed.
         * @param {Function} func The function to restrict.
         * @returns {Function} Returns the new restricted function.
         * @example
         *
         * var saves = ['profile', 'settings'];
         *
         * var done = _.after(saves.length, function() {
         *   console.log('Done saving!');
         * });
         *
         * _.forEach(saves, function(type) {
         *   asyncSave({ 'type': type, 'complete': done });
         * });
         * // => logs 'Done saving!', after all saves have completed
         */
        function after(n, func) {
            if (!isFunction(func)) {
                throw new TypeError;
            }
            return function() {
                if (--n < 1) {
                    return func.apply(this, arguments);
                }
            };
        }

        /**
         * Creates a function that, when called, invokes `func` with the `this`
         * binding of `thisArg` and prepends any additional `bind` arguments to those
         * provided to the bound function.
         *
         * @static
         * @memberOf _
         * @category Functions
         * @param {Function} func The function to bind.
         * @param {*} [thisArg] The `this` binding of `func`.
         * @param {...*} [arg] Arguments to be partially applied.
         * @returns {Function} Returns the new bound function.
         * @example
         *
         * var func = function(greeting) {
         *   return greeting + ' ' + this.name;
         * };
         *
         * func = _.bind(func, { 'name': 'fred' }, 'hi');
         * func();
         * // => 'hi fred'
         */
        function bind(func, thisArg) {
            return arguments.length > 2 ?
                createWrapper(func, 17, slice(arguments, 2), null, thisArg) :
                createWrapper(func, 1, null, null, thisArg);
        }

        /**
         * Binds methods of an object to the object itself, overwriting the existing
         * method. Method names may be specified as individual arguments or as arrays
         * of method names. If no method names are provided all the function properties
         * of `object` will be bound.
         *
         * @static
         * @memberOf _
         * @category Functions
         * @param {Object} object The object to bind and assign the bound methods to.
         * @param {...string} [methodName] The object method names to
         *  bind, specified as individual method names or arrays of method names.
         * @returns {Object} Returns `object`.
         * @example
         *
         * var view = {
         *   'label': 'docs',
         *   'onClick': function() { console.log('clicked ' + this.label); }
         * };
         *
         * _.bindAll(view);
         * jQuery('#docs').on('click', view.onClick);
         * // => logs 'clicked docs', when the button is clicked
         */
        function bindAll(object) {
            var funcs = arguments.length > 1 ? baseFlatten(arguments, true, false, 1) : functions(object),
                index = -1,
                length = funcs.length;

            while (++index < length) {
                var key = funcs[index];
                object[key] = createWrapper(object[key], 1, null, null, object);
            }
            return object;
        }

        /**
         * Creates a function that, when called, invokes the method at `object[key]`
         * and prepends any additional `bindKey` arguments to those provided to the bound
         * function. This method differs from `_.bind` by allowing bound functions to
         * reference methods that will be redefined or don't yet exist.
         * See http://michaux.ca/articles/lazy-function-definition-pattern.
         *
         * @static
         * @memberOf _
         * @category Functions
         * @param {Object} object The object the method belongs to.
         * @param {string} key The key of the method.
         * @param {...*} [arg] Arguments to be partially applied.
         * @returns {Function} Returns the new bound function.
         * @example
         *
         * var object = {
         *   'name': 'fred',
         *   'greet': function(greeting) {
         *     return greeting + ' ' + this.name;
         *   }
         * };
         *
         * var func = _.bindKey(object, 'greet', 'hi');
         * func();
         * // => 'hi fred'
         *
         * object.greet = function(greeting) {
         *   return greeting + 'ya ' + this.name + '!';
         * };
         *
         * func();
         * // => 'hiya fred!'
         */
        function bindKey(object, key) {
            return arguments.length > 2 ?
                createWrapper(key, 19, slice(arguments, 2), null, object) :
                createWrapper(key, 3, null, null, object);
        }

        /**
         * Creates a function that is the composition of the provided functions,
         * where each function consumes the return value of the function that follows.
         * For example, composing the functions `f()`, `g()`, and `h()` produces `f(g(h()))`.
         * Each function is executed with the `this` binding of the composed function.
         *
         * @static
         * @memberOf _
         * @category Functions
         * @param {...Function} [func] Functions to compose.
         * @returns {Function} Returns the new composed function.
         * @example
         *
         * var realNameMap = {
         *   'pebbles': 'penelope'
         * };
         *
         * var format = function(name) {
         *   name = realNameMap[name.toLowerCase()] || name;
         *   return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
         * };
         *
         * var greet = function(formatted) {
         *   return 'Hiya ' + formatted + '!';
         * };
         *
         * var welcome = _.compose(greet, format);
         * welcome('pebbles');
         * // => 'Hiya Penelope!'
         */
        function compose() {
            var funcs = arguments,
                length = funcs.length;

            while (length--) {
                if (!isFunction(funcs[length])) {
                    throw new TypeError;
                }
            }
            return function() {
                var args = arguments,
                    length = funcs.length;

                while (length--) {
                    args = [funcs[length].apply(this, args)];
                }
                return args[0];
            };
        }

        /**
         * Creates a function which accepts one or more arguments of `func` that when
         * invoked either executes `func` returning its result, if all `func` arguments
         * have been provided, or returns a function that accepts one or more of the
         * remaining `func` arguments, and so on. The arity of `func` can be specified
         * if `func.length` is not sufficient.
         *
         * @static
         * @memberOf _
         * @category Functions
         * @param {Function} func The function to curry.
         * @param {number} [arity=func.length] The arity of `func`.
         * @returns {Function} Returns the new curried function.
         * @example
         *
         * var curried = _.curry(function(a, b, c) {
         *   console.log(a + b + c);
         * });
         *
         * curried(1)(2)(3);
         * // => 6
         *
         * curried(1, 2)(3);
         * // => 6
         *
         * curried(1, 2, 3);
         * // => 6
         */
        function curry(func, arity) {
            arity = typeof arity == 'number' ? arity : (+arity || func.length);
            return createWrapper(func, 4, null, null, null, arity);
        }

        /**
         * Creates a function that will delay the execution of `func` until after
         * `wait` milliseconds have elapsed since the last time it was invoked.
         * Provide an options object to indicate that `func` should be invoked on
         * the leading and/or trailing edge of the `wait` timeout. Subsequent calls
         * to the debounced function will return the result of the last `func` call.
         *
         * Note: If `leading` and `trailing` options are `true` `func` will be called
         * on the trailing edge of the timeout only if the the debounced function is
         * invoked more than once during the `wait` timeout.
         *
         * @static
         * @memberOf _
         * @category Functions
         * @param {Function} func The function to debounce.
         * @param {number} wait The number of milliseconds to delay.
         * @param {Object} [options] The options object.
         * @param {boolean} [options.leading=false] Specify execution on the leading edge of the timeout.
         * @param {number} [options.maxWait] The maximum time `func` is allowed to be delayed before it's called.
         * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.
         * @returns {Function} Returns the new debounced function.
         * @example
         *
         * // avoid costly calculations while the window size is in flux
         * var lazyLayout = _.debounce(calculateLayout, 150);
         * jQuery(window).on('resize', lazyLayout);
         *
         * // execute `sendMail` when the click event is fired, debouncing subsequent calls
         * jQuery('#postbox').on('click', _.debounce(sendMail, 300, {
         *   'leading': true,
         *   'trailing': false
         * });
         *
         * // ensure `batchLog` is executed once after 1 second of debounced calls
         * var source = new EventSource('/stream');
         * source.addEventListener('message', _.debounce(batchLog, 250, {
         *   'maxWait': 1000
         * }, false);
         */
        function debounce(func, wait, options) {
            var args,
                maxTimeoutId,
                result,
                stamp,
                thisArg,
                timeoutId,
                trailingCall,
                lastCalled = 0,
                maxWait = false,
                trailing = true;

            if (!isFunction(func)) {
                throw new TypeError;
            }
            wait = nativeMax(0, wait) || 0;
            if (options === true) {
                var leading = true;
                trailing = false;
            } else if (isObject(options)) {
                leading = options.leading;
                maxWait = 'maxWait' in options && (nativeMax(wait, options.maxWait) || 0);
                trailing = 'trailing' in options ? options.trailing : trailing;
            }
            var delayed = function() {
                var remaining = wait - (now() - stamp);
                if (remaining <= 0) {
                    if (maxTimeoutId) {
                        clearTimeout(maxTimeoutId);
                    }
                    var isCalled = trailingCall;
                    maxTimeoutId = timeoutId = trailingCall = undefined;
                    if (isCalled) {
                        lastCalled = now();
                        result = func.apply(thisArg, args);
                        if (!timeoutId && !maxTimeoutId) {
                            args = thisArg = null;
                        }
                    }
                } else {
                    timeoutId = setTimeout(delayed, remaining);
                }
            };

            var maxDelayed = function() {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                maxTimeoutId = timeoutId = trailingCall = undefined;
                if (trailing || (maxWait !== wait)) {
                    lastCalled = now();
                    result = func.apply(thisArg, args);
                    if (!timeoutId && !maxTimeoutId) {
                        args = thisArg = null;
                    }
                }
            };

            return function() {
                args = arguments;
                stamp = now();
                thisArg = this;
                trailingCall = trailing && (timeoutId || !leading);

                if (maxWait === false) {
                    var leadingCall = leading && !timeoutId;
                } else {
                    if (!maxTimeoutId && !leading) {
                        lastCalled = stamp;
                    }
                    var remaining = maxWait - (stamp - lastCalled),
                        isCalled = remaining <= 0;

                    if (isCalled) {
                        if (maxTimeoutId) {
                            maxTimeoutId = clearTimeout(maxTimeoutId);
                        }
                        lastCalled = stamp;
                        result = func.apply(thisArg, args);
                    } else if (!maxTimeoutId) {
                        maxTimeoutId = setTimeout(maxDelayed, remaining);
                    }
                }
                if (isCalled && timeoutId) {
                    timeoutId = clearTimeout(timeoutId);
                } else if (!timeoutId && wait !== maxWait) {
                    timeoutId = setTimeout(delayed, wait);
                }
                if (leadingCall) {
                    isCalled = true;
                    result = func.apply(thisArg, args);
                }
                if (isCalled && !timeoutId && !maxTimeoutId) {
                    args = thisArg = null;
                }
                return result;
            };
        }

        /**
         * Defers executing the `func` function until the current call stack has cleared.
         * Additional arguments will be provided to `func` when it is invoked.
         *
         * @static
         * @memberOf _
         * @category Functions
         * @param {Function} func The function to defer.
         * @param {...*} [arg] Arguments to invoke the function with.
         * @returns {number} Returns the timer id.
         * @example
         *
         * _.defer(function(text) { console.log(text); }, 'deferred');
         * // logs 'deferred' after one or more milliseconds
         */
        function defer(func) {
            if (!isFunction(func)) {
                throw new TypeError;
            }
            var args = slice(arguments, 1);
            return setTimeout(function() {
                func.apply(undefined, args);
            }, 1);
        }

        /**
         * Executes the `func` function after `wait` milliseconds. Additional arguments
         * will be provided to `func` when it is invoked.
         *
         * @static
         * @memberOf _
         * @category Functions
         * @param {Function} func The function to delay.
         * @param {number} wait The number of milliseconds to delay execution.
         * @param {...*} [arg] Arguments to invoke the function with.
         * @returns {number} Returns the timer id.
         * @example
         *
         * _.delay(function(text) { console.log(text); }, 1000, 'later');
         * // => logs 'later' after one second
         */
        function delay(func, wait) {
            if (!isFunction(func)) {
                throw new TypeError;
            }
            var args = slice(arguments, 2);
            return setTimeout(function() {
                func.apply(undefined, args);
            }, wait);
        }

        /**
         * Creates a function that memoizes the result of `func`. If `resolver` is
         * provided it will be used to determine the cache key for storing the result
         * based on the arguments provided to the memoized function. By default, the
         * first argument provided to the memoized function is used as the cache key.
         * The `func` is executed with the `this` binding of the memoized function.
         * The result cache is exposed as the `cache` property on the memoized function.
         *
         * @static
         * @memberOf _
         * @category Functions
         * @param {Function} func The function to have its output memoized.
         * @param {Function} [resolver] A function used to resolve the cache key.
         * @returns {Function} Returns the new memoizing function.
         * @example
         *
         * var fibonacci = _.memoize(function(n) {
         *   return n < 2 ? n : fibonacci(n - 1) + fibonacci(n - 2);
         * });
         *
         * fibonacci(9)
         * // => 34
         *
         * var data = {
         *   'fred': { 'name': 'fred', 'age': 40 },
         *   'pebbles': { 'name': 'pebbles', 'age': 1 }
         * };
         *
         * // modifying the result cache
         * var get = _.memoize(function(name) { return data[name]; }, _.identity);
         * get('pebbles');
         * // => { 'name': 'pebbles', 'age': 1 }
         *
         * get.cache.pebbles.name = 'penelope';
         * get('pebbles');
         * // => { 'name': 'penelope', 'age': 1 }
         */
        function memoize(func, resolver) {
            if (!isFunction(func)) {
                throw new TypeError;
            }
            var memoized = function() {
                var cache = memoized.cache,
                    key = resolver ? resolver.apply(this, arguments) : keyPrefix + arguments[0];

                return hasOwnProperty.call(cache, key) ?
                    cache[key] :
                    (cache[key] = func.apply(this, arguments));
            }
            memoized.cache = {};
            return memoized;
        }

        /**
         * Creates a function that is restricted to execute `func` once. Repeat calls to
         * the function will return the value of the first call. The `func` is executed
         * with the `this` binding of the created function.
         *
         * @static
         * @memberOf _
         * @category Functions
         * @param {Function} func The function to restrict.
         * @returns {Function} Returns the new restricted function.
         * @example
         *
         * var initialize = _.once(createApplication);
         * initialize();
         * initialize();
         * // `initialize` executes `createApplication` once
         */
        function once(func) {
            var ran,
                result;

            if (!isFunction(func)) {
                throw new TypeError;
            }
            return function() {
                if (ran) {
                    return result;
                }
                ran = true;
                result = func.apply(this, arguments);

                // clear the `func` variable so the function may be garbage collected
                func = null;
                return result;
            };
        }

        /**
         * Creates a function that, when called, invokes `func` with any additional
         * `partial` arguments prepended to those provided to the new function. This
         * method is similar to `_.bind` except it does **not** alter the `this` binding.
         *
         * @static
         * @memberOf _
         * @category Functions
         * @param {Function} func The function to partially apply arguments to.
         * @param {...*} [arg] Arguments to be partially applied.
         * @returns {Function} Returns the new partially applied function.
         * @example
         *
         * var greet = function(greeting, name) { return greeting + ' ' + name; };
         * var hi = _.partial(greet, 'hi');
         * hi('fred');
         * // => 'hi fred'
         */
        function partial(func) {
            return createWrapper(func, 16, slice(arguments, 1));
        }

        /**
         * This method is like `_.partial` except that `partial` arguments are
         * appended to those provided to the new function.
         *
         * @static
         * @memberOf _
         * @category Functions
         * @param {Function} func The function to partially apply arguments to.
         * @param {...*} [arg] Arguments to be partially applied.
         * @returns {Function} Returns the new partially applied function.
         * @example
         *
         * var defaultsDeep = _.partialRight(_.merge, _.defaults);
         *
         * var options = {
         *   'variable': 'data',
         *   'imports': { 'jq': $ }
         * };
         *
         * defaultsDeep(options, _.templateSettings);
         *
         * options.variable
         * // => 'data'
         *
         * options.imports
         * // => { '_': _, 'jq': $ }
         */
        function partialRight(func) {
            return createWrapper(func, 32, null, slice(arguments, 1));
        }

        /**
         * Creates a function that, when executed, will only call the `func` function
         * at most once per every `wait` milliseconds. Provide an options object to
         * indicate that `func` should be invoked on the leading and/or trailing edge
         * of the `wait` timeout. Subsequent calls to the throttled function will
         * return the result of the last `func` call.
         *
         * Note: If `leading` and `trailing` options are `true` `func` will be called
         * on the trailing edge of the timeout only if the the throttled function is
         * invoked more than once during the `wait` timeout.
         *
         * @static
         * @memberOf _
         * @category Functions
         * @param {Function} func The function to throttle.
         * @param {number} wait The number of milliseconds to throttle executions to.
         * @param {Object} [options] The options object.
         * @param {boolean} [options.leading=true] Specify execution on the leading edge of the timeout.
         * @param {boolean} [options.trailing=true] Specify execution on the trailing edge of the timeout.
         * @returns {Function} Returns the new throttled function.
         * @example
         *
         * // avoid excessively updating the position while scrolling
         * var throttled = _.throttle(updatePosition, 100);
         * jQuery(window).on('scroll', throttled);
         *
         * // execute `renewToken` when the click event is fired, but not more than once every 5 minutes
         * jQuery('.interactive').on('click', _.throttle(renewToken, 300000, {
         *   'trailing': false
         * }));
         */
        function throttle(func, wait, options) {
            var leading = true,
                trailing = true;

            if (!isFunction(func)) {
                throw new TypeError;
            }
            if (options === false) {
                leading = false;
            } else if (isObject(options)) {
                leading = 'leading' in options ? options.leading : leading;
                trailing = 'trailing' in options ? options.trailing : trailing;
            }
            debounceOptions.leading = leading;
            debounceOptions.maxWait = wait;
            debounceOptions.trailing = trailing;

            return debounce(func, wait, debounceOptions);
        }

        /**
         * Creates a function that provides `value` to the wrapper function as its
         * first argument. Additional arguments provided to the function are appended
         * to those provided to the wrapper function. The wrapper is executed with
         * the `this` binding of the created function.
         *
         * @static
         * @memberOf _
         * @category Functions
         * @param {*} value The value to wrap.
         * @param {Function} wrapper The wrapper function.
         * @returns {Function} Returns the new function.
         * @example
         *
         * var p = _.wrap(_.escape, function(func, text) {
         *   return '<p>' + func(text) + '</p>';
         * });
         *
         * p('Fred, Wilma, & Pebbles');
         * // => '<p>Fred, Wilma, &amp; Pebbles</p>'
         */
        function wrap(value, wrapper) {
            return createWrapper(wrapper, 16, [value]);
        }

        /*--------------------------------------------------------------------------*/

        /**
         * Creates a function that returns `value`.
         *
         * @static
         * @memberOf _
         * @category Utilities
         * @param {*} value The value to return from the new function.
         * @returns {Function} Returns the new function.
         * @example
         *
         * var object = { 'name': 'fred' };
         * var getter = _.constant(object);
         * getter() === object;
         * // => true
         */
        function constant(value) {
            return function() {
                return value;
            };
        }

        /**
         * Produces a callback bound to an optional `thisArg`. If `func` is a property
         * name the created callback will return the property value for a given element.
         * If `func` is an object the created callback will return `true` for elements
         * that contain the equivalent object properties, otherwise it will return `false`.
         *
         * @static
         * @memberOf _
         * @category Utilities
         * @param {*} [func=identity] The value to convert to a callback.
         * @param {*} [thisArg] The `this` binding of the created callback.
         * @param {number} [argCount] The number of arguments the callback accepts.
         * @returns {Function} Returns a callback function.
         * @example
         *
         * var characters = [
         *   { 'name': 'barney', 'age': 36 },
         *   { 'name': 'fred',   'age': 40 }
         * ];
         *
         * // wrap to create custom callback shorthands
         * _.createCallback = _.wrap(_.createCallback, function(func, callback, thisArg) {
         *   var match = /^(.+?)__([gl]t)(.+)$/.exec(callback);
         *   return !match ? func(callback, thisArg) : function(object) {
         *     return match[2] == 'gt' ? object[match[1]] > match[3] : object[match[1]] < match[3];
         *   };
         * });
         *
         * _.filter(characters, 'age__gt38');
         * // => [{ 'name': 'fred', 'age': 40 }]
         */
        function createCallback(func, thisArg, argCount) {
            var type = typeof func;
            if (func == null || type == 'function') {
                return baseCreateCallback(func, thisArg, argCount);
            }
            // handle "_.pluck" style callback shorthands
            if (type != 'object') {
                return property(func);
            }
            var props = keys(func),
                key = props[0],
                a = func[key];

            // handle "_.where" style callback shorthands
            if (props.length == 1 && a === a && !isObject(a)) {
                // fast path the common case of providing an object with a single
                // property containing a primitive value
                return function(object) {
                    var b = object[key];
                    return a === b && (a !== 0 || (1 / a == 1 / b));
                };
            }
            return function(object) {
                var length = props.length,
                    result = false;

                while (length--) {
                    if (!(result = baseIsEqual(object[props[length]], func[props[length]], null, true))) {
                        break;
                    }
                }
                return result;
            };
        }

        /**
         * Converts the characters `&`, `<`, `>`, `"`, and `'` in `string` to their
         * corresponding HTML entities.
         *
         * @static
         * @memberOf _
         * @category Utilities
         * @param {string} string The string to escape.
         * @returns {string} Returns the escaped string.
         * @example
         *
         * _.escape('Fred, Wilma, & Pebbles');
         * // => 'Fred, Wilma, &amp; Pebbles'
         */
        function escape(string) {
            return string == null ? '' : String(string).replace(reUnescapedHtml, escapeHtmlChar);
        }

        /**
         * This method returns the first argument provided to it.
         *
         * @static
         * @memberOf _
         * @category Utilities
         * @param {*} value Any value.
         * @returns {*} Returns `value`.
         * @example
         *
         * var object = { 'name': 'fred' };
         * _.identity(object) === object;
         * // => true
         */
        function identity(value) {
            return value;
        }

        /**
         * Adds function properties of a source object to the destination object.
         * If `object` is a function methods will be added to its prototype as well.
         *
         * @static
         * @memberOf _
         * @category Utilities
         * @param {Function|Object} [object=lodash] object The destination object.
         * @param {Object} source The object of functions to add.
         * @param {Object} [options] The options object.
         * @param {boolean} [options.chain=true] Specify whether the functions added are chainable.
         * @example
         *
         * function capitalize(string) {
         *   return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
         * }
         *
         * _.mixin({ 'capitalize': capitalize });
         * _.capitalize('fred');
         * // => 'Fred'
         *
         * _('fred').capitalize().value();
         * // => 'Fred'
         *
         * _.mixin({ 'capitalize': capitalize }, { 'chain': false });
         * _('fred').capitalize();
         * // => 'Fred'
         */
        function mixin(object, source, options) {
            var chain = true,
                methodNames = source && functions(source);

            if (!source || (!options && !methodNames.length)) {
                if (options == null) {
                    options = source;
                }
                ctor = lodashWrapper;
                source = object;
                object = lodash;
                methodNames = functions(source);
            }
            if (options === false) {
                chain = false;
            } else if (isObject(options) && 'chain' in options) {
                chain = options.chain;
            }
            var ctor = object,
                isFunc = isFunction(ctor);

            forEach(methodNames, function(methodName) {
                var func = object[methodName] = source[methodName];
                if (isFunc) {
                    ctor.prototype[methodName] = function() {
                        var chainAll = this.__chain__,
                            value = this.__wrapped__,
                            args = [value];

                        push.apply(args, arguments);
                        var result = func.apply(object, args);
                        if (chain || chainAll) {
                            if (value === result && isObject(result)) {
                                return this;
                            }
                            result = new ctor(result);
                            result.__chain__ = chainAll;
                        }
                        return result;
                    };
                }
            });
        }

        /**
         * Reverts the '_' variable to its previous value and returns a reference to
         * the `lodash` function.
         *
         * @static
         * @memberOf _
         * @category Utilities
         * @returns {Function} Returns the `lodash` function.
         * @example
         *
         * var lodash = _.noConflict();
         */
        function noConflict() {
            context._ = oldDash;
            return this;
        }

        /**
         * A no-operation function.
         *
         * @static
         * @memberOf _
         * @category Utilities
         * @example
         *
         * var object = { 'name': 'fred' };
         * _.noop(object) === undefined;
         * // => true
         */
        function noop() {
            // no operation performed
        }

        /**
         * Gets the number of milliseconds that have elapsed since the Unix epoch
         * (1 January 1970 00:00:00 UTC).
         *
         * @static
         * @memberOf _
         * @category Utilities
         * @example
         *
         * var stamp = _.now();
         * _.defer(function() { console.log(_.now() - stamp); });
         * // => logs the number of milliseconds it took for the deferred function to be called
         */
        var now = isNative(now = Date.now) && now || function() {
            return new Date().getTime();
        };

        /**
         * Converts the given value into an integer of the specified radix.
         * If `radix` is `undefined` or `0` a `radix` of `10` is used unless the
         * `value` is a hexadecimal, in which case a `radix` of `16` is used.
         *
         * Note: This method avoids differences in native ES3 and ES5 `parseInt`
         * implementations. See http://es5.github.io/#E.
         *
         * @static
         * @memberOf _
         * @category Utilities
         * @param {string} value The value to parse.
         * @param {number} [radix] The radix used to interpret the value to parse.
         * @returns {number} Returns the new integer value.
         * @example
         *
         * _.parseInt('08');
         * // => 8
         */
        var parseInt = nativeParseInt(whitespace + '08') == 8 ? nativeParseInt : function(value, radix) {
            // Firefox < 21 and Opera < 15 follow the ES3 specified implementation of `parseInt`
            return nativeParseInt(isString(value) ? value.replace(reLeadingSpacesAndZeros, '') : value, radix || 0);
        };

        /**
         * Creates a "_.pluck" style function, which returns the `key` value of a
         * given object.
         *
         * @static
         * @memberOf _
         * @category Utilities
         * @param {string} key The name of the property to retrieve.
         * @returns {Function} Returns the new function.
         * @example
         *
         * var characters = [
         *   { 'name': 'fred',   'age': 40 },
         *   { 'name': 'barney', 'age': 36 }
         * ];
         *
         * var getName = _.property('name');
         *
         * _.map(characters, getName);
         * // => ['barney', 'fred']
         *
         * _.sortBy(characters, getName);
         * // => [{ 'name': 'barney', 'age': 36 }, { 'name': 'fred',   'age': 40 }]
         */
        function property(key) {
            return function(object) {
                return object[key];
            };
        }

        /**
         * Produces a random number between `min` and `max` (inclusive). If only one
         * argument is provided a number between `0` and the given number will be
         * returned. If `floating` is truey or either `min` or `max` are floats a
         * floating-point number will be returned instead of an integer.
         *
         * @static
         * @memberOf _
         * @category Utilities
         * @param {number} [min=0] The minimum possible value.
         * @param {number} [max=1] The maximum possible value.
         * @param {boolean} [floating=false] Specify returning a floating-point number.
         * @returns {number} Returns a random number.
         * @example
         *
         * _.random(0, 5);
         * // => an integer between 0 and 5
         *
         * _.random(5);
         * // => also an integer between 0 and 5
         *
         * _.random(5, true);
         * // => a floating-point number between 0 and 5
         *
         * _.random(1.2, 5.2);
         * // => a floating-point number between 1.2 and 5.2
         */
        function random(min, max, floating) {
            var noMin = min == null,
                noMax = max == null;

            if (floating == null) {
                if (typeof min == 'boolean' && noMax) {
                    floating = min;
                    min = 1;
                } else if (!noMax && typeof max == 'boolean') {
                    floating = max;
                    noMax = true;
                }
            }
            if (noMin && noMax) {
                max = 1;
            }
            min = +min || 0;
            if (noMax) {
                max = min;
                min = 0;
            } else {
                max = +max || 0;
            }
            if (floating || min % 1 || max % 1) {
                var rand = nativeRandom();
                return nativeMin(min + (rand * (max - min + parseFloat('1e-' + ((rand + '').length - 1)))), max);
            }
            return baseRandom(min, max);
        }

        /**
         * Resolves the value of property `key` on `object`. If `key` is a function
         * it will be invoked with the `this` binding of `object` and its result returned,
         * else the property value is returned. If `object` is falsey then `undefined`
         * is returned.
         *
         * @static
         * @memberOf _
         * @category Utilities
         * @param {Object} object The object to inspect.
         * @param {string} key The name of the property to resolve.
         * @returns {*} Returns the resolved value.
         * @example
         *
         * var object = {
         *   'cheese': 'crumpets',
         *   'stuff': function() {
         *     return 'nonsense';
         *   }
         * };
         *
         * _.result(object, 'cheese');
         * // => 'crumpets'
         *
         * _.result(object, 'stuff');
         * // => 'nonsense'
         */
        function result(object, key) {
            if (object) {
                var value = object[key];
                return isFunction(value) ? object[key]() : value;
            }
        }

        /**
         * A micro-templating method that handles arbitrary delimiters, preserves
         * whitespace, and correctly escapes quotes within interpolated code.
         *
         * Note: In the development build, `_.template` utilizes sourceURLs for easier
         * debugging. See http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl
         *
         * For more information on precompiling templates see:
         * http://lodash.com/custom-builds
         *
         * For more information on Chrome extension sandboxes see:
         * http://developer.chrome.com/stable/extensions/sandboxingEval.html
         *
         * @static
         * @memberOf _
         * @category Utilities
         * @param {string} text The template text.
         * @param {Object} data The data object used to populate the text.
         * @param {Object} [options] The options object.
         * @param {RegExp} [options.escape] The "escape" delimiter.
         * @param {RegExp} [options.evaluate] The "evaluate" delimiter.
         * @param {Object} [options.imports] An object to import into the template as local variables.
         * @param {RegExp} [options.interpolate] The "interpolate" delimiter.
         * @param {string} [sourceURL] The sourceURL of the template's compiled source.
         * @param {string} [variable] The data object variable name.
         * @returns {Function|string} Returns a compiled function when no `data` object
         *  is given, else it returns the interpolated text.
         * @example
         *
         * // using the "interpolate" delimiter to create a compiled template
         * var compiled = _.template('hello <%= name %>');
         * compiled({ 'name': 'fred' });
         * // => 'hello fred'
         *
         * // using the "escape" delimiter to escape HTML in data property values
         * _.template('<b><%- value %></b>', { 'value': '<script>' });
         * // => '<b>&lt;script&gt;</b>'
         *
         * // using the "evaluate" delimiter to generate HTML
         * var list = '<% _.forEach(people, function(name) { %><li><%- name %></li><% }); %>';
         * _.template(list, { 'people': ['fred', 'barney'] });
         * // => '<li>fred</li><li>barney</li>'
         *
         * // using the ES6 delimiter as an alternative to the default "interpolate" delimiter
         * _.template('hello ${ name }', { 'name': 'pebbles' });
         * // => 'hello pebbles'
         *
         * // using the internal `print` function in "evaluate" delimiters
         * _.template('<% print("hello " + name); %>!', { 'name': 'barney' });
         * // => 'hello barney!'
         *
         * // using a custom template delimiters
         * _.templateSettings = {
         *   'interpolate': /{{([\s\S]+?)}}/g
         * };
         *
         * _.template('hello {{ name }}!', { 'name': 'mustache' });
         * // => 'hello mustache!'
         *
         * // using the `imports` option to import jQuery
         * var list = '<% jq.each(people, function(name) { %><li><%- name %></li><% }); %>';
         * _.template(list, { 'people': ['fred', 'barney'] }, { 'imports': { 'jq': jQuery } });
         * // => '<li>fred</li><li>barney</li>'
         *
         * // using the `sourceURL` option to specify a custom sourceURL for the template
         * var compiled = _.template('hello <%= name %>', null, { 'sourceURL': '/basic/greeting.jst' });
         * compiled(data);
         * // => find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector
         *
         * // using the `variable` option to ensure a with-statement isn't used in the compiled template
         * var compiled = _.template('hi <%= data.name %>!', null, { 'variable': 'data' });
         * compiled.source;
         * // => function(data) {
         *   var __t, __p = '', __e = _.escape;
         *   __p += 'hi ' + ((__t = ( data.name )) == null ? '' : __t) + '!';
         *   return __p;
         * }
         *
         * // using the `source` property to inline compiled templates for meaningful
         * // line numbers in error messages and a stack trace
         * fs.writeFileSync(path.join(cwd, 'jst.js'), '\
         *   var JST = {\
         *     "main": ' + _.template(mainText).source + '\
         *   };\
         * ');
         */
        function template(text, data, options) {
            // based on John Resig's `tmpl` implementation
            // http://ejohn.org/blog/javascript-micro-templating/
            // and Laura Doktorova's doT.js
            // https://github.com/olado/doT
            var settings = lodash.templateSettings;
            text = String(text || '');

            // avoid missing dependencies when `iteratorTemplate` is not defined
            options = defaults({}, options, settings);

            var imports = defaults({}, options.imports, settings.imports),
                importsKeys = keys(imports),
                importsValues = values(imports);

            var isEvaluating,
                index = 0,
                interpolate = options.interpolate || reNoMatch,
                source = "__p += '";

            // compile the regexp to match each delimiter
            var reDelimiters = RegExp(
                (options.escape || reNoMatch).source + '|' +
                interpolate.source + '|' +
                (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
                (options.evaluate || reNoMatch).source + '|$', 'g');

            text.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
                interpolateValue || (interpolateValue = esTemplateValue);

                // escape characters that cannot be included in string literals
                source += text.slice(index, offset).replace(reUnescapedString, escapeStringChar);

                // replace delimiters with snippets
                if (escapeValue) {
                    source += "' +\n__e(" + escapeValue + ") +\n'";
                }
                if (evaluateValue) {
                    isEvaluating = true;
                    source += "';\n" + evaluateValue + ";\n__p += '";
                }
                if (interpolateValue) {
                    source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
                }
                index = offset + match.length;

                // the JS engine embedded in Adobe products requires returning the `match`
                // string in order to produce the correct `offset` value
                return match;
            });

            source += "';\n";

            // if `variable` is not specified, wrap a with-statement around the generated
            // code to add the data object to the top of the scope chain
            var variable = options.variable,
                hasVariable = variable;

            if (!hasVariable) {
                variable = 'obj';
                source = 'with (' + variable + ') {\n' + source + '\n}\n';
            }
            // cleanup code by stripping empty strings
            source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
                .replace(reEmptyStringMiddle, '$1')
                .replace(reEmptyStringTrailing, '$1;');

            // frame code as the function body
            source = 'function(' + variable + ') {\n' +
                (hasVariable ? '' : variable + ' || (' + variable + ' = {});\n') +
                "var __t, __p = '', __e = _.escape" +
                (isEvaluating ?
                    ', __j = Array.prototype.join;\n' +
                    "function print() { __p += __j.call(arguments, '') }\n" :
                    ';\n'
                ) +
                source +
                'return __p\n}';

            // Use a sourceURL for easier debugging.
            // http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl
            var sourceURL = '\n/*\n//# sourceURL=' + (options.sourceURL || '/lodash/template/source[' + (templateCounter++) + ']') + '\n*/';

            try {
                var result = Function(importsKeys, 'return ' + source + sourceURL).apply(undefined, importsValues);
            } catch (e) {
                e.source = source;
                throw e;
            }
            if (data) {
                return result(data);
            }
            // provide the compiled function's source by its `toString` method, in
            // supported environments, or the `source` property as a convenience for
            // inlining compiled templates during the build process
            result.source = source;
            return result;
        }

        /**
         * Executes the callback `n` times, returning an array of the results
         * of each callback execution. The callback is bound to `thisArg` and invoked
         * with one argument; (index).
         *
         * @static
         * @memberOf _
         * @category Utilities
         * @param {number} n The number of times to execute the callback.
         * @param {Function} callback The function called per iteration.
         * @param {*} [thisArg] The `this` binding of `callback`.
         * @returns {Array} Returns an array of the results of each `callback` execution.
         * @example
         *
         * var diceRolls = _.times(3, _.partial(_.random, 1, 6));
         * // => [3, 6, 4]
         *
         * _.times(3, function(n) { mage.castSpell(n); });
         * // => calls `mage.castSpell(n)` three times, passing `n` of `0`, `1`, and `2` respectively
         *
         * _.times(3, function(n) { this.cast(n); }, mage);
         * // => also calls `mage.castSpell(n)` three times
         */
        function times(n, callback, thisArg) {
            n = (n = +n) > -1 ? n : 0;
            var index = -1,
                result = Array(n);

            callback = baseCreateCallback(callback, thisArg, 1);
            while (++index < n) {
                result[index] = callback(index);
            }
            return result;
        }

        /**
         * The inverse of `_.escape` this method converts the HTML entities
         * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to their
         * corresponding characters.
         *
         * @static
         * @memberOf _
         * @category Utilities
         * @param {string} string The string to unescape.
         * @returns {string} Returns the unescaped string.
         * @example
         *
         * _.unescape('Fred, Barney &amp; Pebbles');
         * // => 'Fred, Barney & Pebbles'
         */
        function unescape(string) {
            return string == null ? '' : String(string).replace(reEscapedHtml, unescapeHtmlChar);
        }

        /**
         * Generates a unique ID. If `prefix` is provided the ID will be appended to it.
         *
         * @static
         * @memberOf _
         * @category Utilities
         * @param {string} [prefix] The value to prefix the ID with.
         * @returns {string} Returns the unique ID.
         * @example
         *
         * _.uniqueId('contact_');
         * // => 'contact_104'
         *
         * _.uniqueId();
         * // => '105'
         */
        function uniqueId(prefix) {
            var id = ++idCounter;
            return String(prefix == null ? '' : prefix) + id;
        }

        /*--------------------------------------------------------------------------*/

        /**
         * Creates a `lodash` object that wraps the given value with explicit
         * method chaining enabled.
         *
         * @static
         * @memberOf _
         * @category Chaining
         * @param {*} value The value to wrap.
         * @returns {Object} Returns the wrapper object.
         * @example
         *
         * var characters = [
         *   { 'name': 'barney',  'age': 36 },
         *   { 'name': 'fred',    'age': 40 },
         *   { 'name': 'pebbles', 'age': 1 }
         * ];
         *
         * var youngest = _.chain(characters)
         *     .sortBy('age')
         *     .map(function(chr) { return chr.name + ' is ' + chr.age; })
         *     .first()
         *     .value();
         * // => 'pebbles is 1'
         */
        function chain(value) {
            value = new lodashWrapper(value);
            value.__chain__ = true;
            return value;
        }

        /**
         * Invokes `interceptor` with the `value` as the first argument and then
         * returns `value`. The purpose of this method is to "tap into" a method
         * chain in order to perform operations on intermediate results within
         * the chain.
         *
         * @static
         * @memberOf _
         * @category Chaining
         * @param {*} value The value to provide to `interceptor`.
         * @param {Function} interceptor The function to invoke.
         * @returns {*} Returns `value`.
         * @example
         *
         * _([1, 2, 3, 4])
         *  .tap(function(array) { array.pop(); })
         *  .reverse()
         *  .value();
         * // => [3, 2, 1]
         */
        function tap(value, interceptor) {
            interceptor(value);
            return value;
        }

        /**
         * Enables explicit method chaining on the wrapper object.
         *
         * @name chain
         * @memberOf _
         * @category Chaining
         * @returns {*} Returns the wrapper object.
         * @example
         *
         * var characters = [
         *   { 'name': 'barney', 'age': 36 },
         *   { 'name': 'fred',   'age': 40 }
         * ];
         *
         * // without explicit chaining
         * _(characters).first();
         * // => { 'name': 'barney', 'age': 36 }
         *
         * // with explicit chaining
         * _(characters).chain()
         *   .first()
         *   .pick('age')
         *   .value();
         * // => { 'age': 36 }
         */
        function wrapperChain() {
            this.__chain__ = true;
            return this;
        }

        /**
         * Produces the `toString` result of the wrapped value.
         *
         * @name toString
         * @memberOf _
         * @category Chaining
         * @returns {string} Returns the string result.
         * @example
         *
         * _([1, 2, 3]).toString();
         * // => '1,2,3'
         */
        function wrapperToString() {
            return String(this.__wrapped__);
        }

        /**
         * Extracts the wrapped value.
         *
         * @name valueOf
         * @memberOf _
         * @alias value
         * @category Chaining
         * @returns {*} Returns the wrapped value.
         * @example
         *
         * _([1, 2, 3]).valueOf();
         * // => [1, 2, 3]
         */
        function wrapperValueOf() {
            return this.__wrapped__;
        }

        /*--------------------------------------------------------------------------*/

        // add functions that return wrapped values when chaining
        lodash.after = after;
        lodash.assign = assign;
        lodash.at = at;
        lodash.bind = bind;
        lodash.bindAll = bindAll;
        lodash.bindKey = bindKey;
        lodash.chain = chain;
        lodash.compact = compact;
        lodash.compose = compose;
        lodash.constant = constant;
        lodash.countBy = countBy;
        lodash.create = create;
        lodash.createCallback = createCallback;
        lodash.curry = curry;
        lodash.debounce = debounce;
        lodash.defaults = defaults;
        lodash.defer = defer;
        lodash.delay = delay;
        lodash.difference = difference;
        lodash.filter = filter;
        lodash.flatten = flatten;
        lodash.forEach = forEach;
        lodash.forEachRight = forEachRight;
        lodash.forIn = forIn;
        lodash.forInRight = forInRight;
        lodash.forOwn = forOwn;
        lodash.forOwnRight = forOwnRight;
        lodash.functions = functions;
        lodash.groupBy = groupBy;
        lodash.indexBy = indexBy;
        lodash.initial = initial;
        lodash.intersection = intersection;
        lodash.invert = invert;
        lodash.invoke = invoke;
        lodash.keys = keys;
        lodash.map = map;
        lodash.mapValues = mapValues;
        lodash.max = max;
        lodash.memoize = memoize;
        lodash.merge = merge;
        lodash.min = min;
        lodash.omit = omit;
        lodash.once = once;
        lodash.pairs = pairs;
        lodash.partial = partial;
        lodash.partialRight = partialRight;
        lodash.pick = pick;
        lodash.pluck = pluck;
        lodash.property = property;
        lodash.pull = pull;
        lodash.range = range;
        lodash.reject = reject;
        lodash.remove = remove;
        lodash.rest = rest;
        lodash.shuffle = shuffle;
        lodash.sortBy = sortBy;
        lodash.tap = tap;
        lodash.throttle = throttle;
        lodash.times = times;
        lodash.toArray = toArray;
        lodash.transform = transform;
        lodash.union = union;
        lodash.uniq = uniq;
        lodash.values = values;
        lodash.where = where;
        lodash.without = without;
        lodash.wrap = wrap;
        lodash.xor = xor;
        lodash.zip = zip;
        lodash.zipObject = zipObject;

        // add aliases
        lodash.collect = map;
        lodash.drop = rest;
        lodash.each = forEach;
        lodash.eachRight = forEachRight;
        lodash.extend = assign;
        lodash.methods = functions;
        lodash.object = zipObject;
        lodash.select = filter;
        lodash.tail = rest;
        lodash.unique = uniq;
        lodash.unzip = zip;

        // add functions to `lodash.prototype`
        mixin(lodash);

        /*--------------------------------------------------------------------------*/

        // add functions that return unwrapped values when chaining
        lodash.clone = clone;
        lodash.cloneDeep = cloneDeep;
        lodash.contains = contains;
        lodash.escape = escape;
        lodash.every = every;
        lodash.find = find;
        lodash.findIndex = findIndex;
        lodash.findKey = findKey;
        lodash.findLast = findLast;
        lodash.findLastIndex = findLastIndex;
        lodash.findLastKey = findLastKey;
        lodash.has = has;
        lodash.identity = identity;
        lodash.indexOf = indexOf;
        lodash.isArguments = isArguments;
        lodash.isArray = isArray;
        lodash.isBoolean = isBoolean;
        lodash.isDate = isDate;
        lodash.isElement = isElement;
        lodash.isEmpty = isEmpty;
        lodash.isEqual = isEqual;
        lodash.isFinite = isFinite;
        lodash.isFunction = isFunction;
        lodash.isNaN = isNaN;
        lodash.isNull = isNull;
        lodash.isNumber = isNumber;
        lodash.isObject = isObject;
        lodash.isPlainObject = isPlainObject;
        lodash.isRegExp = isRegExp;
        lodash.isString = isString;
        lodash.isUndefined = isUndefined;
        lodash.lastIndexOf = lastIndexOf;
        lodash.mixin = mixin;
        lodash.noConflict = noConflict;
        lodash.noop = noop;
        lodash.now = now;
        lodash.parseInt = parseInt;
        lodash.random = random;
        lodash.reduce = reduce;
        lodash.reduceRight = reduceRight;
        lodash.result = result;
        lodash.runInContext = runInContext;
        lodash.size = size;
        lodash.some = some;
        lodash.sortedIndex = sortedIndex;
        lodash.template = template;
        lodash.unescape = unescape;
        lodash.uniqueId = uniqueId;

        // add aliases
        lodash.all = every;
        lodash.any = some;
        lodash.detect = find;
        lodash.findWhere = find;
        lodash.foldl = reduce;
        lodash.foldr = reduceRight;
        lodash.include = contains;
        lodash.inject = reduce;

        mixin(function() {
            var source = {}
            forOwn(lodash, function(func, methodName) {
                if (!lodash.prototype[methodName]) {
                    source[methodName] = func;
                }
            });
            return source;
        }(), false);

        /*--------------------------------------------------------------------------*/

        // add functions capable of returning wrapped and unwrapped values when chaining
        lodash.first = first;
        lodash.last = last;
        lodash.sample = sample;

        // add aliases
        lodash.take = first;
        lodash.head = first;

        forOwn(lodash, function(func, methodName) {
            var callbackable = methodName !== 'sample';
            if (!lodash.prototype[methodName]) {
                lodash.prototype[methodName] = function(n, guard) {
                    var chainAll = this.__chain__,
                        result = func(this.__wrapped__, n, guard);

                    return !chainAll && (n == null || (guard && !(callbackable && typeof n == 'function'))) ?
                        result :
                        new lodashWrapper(result, chainAll);
                };
            }
        });

        /*--------------------------------------------------------------------------*/

        /**
         * The semantic version number.
         *
         * @static
         * @memberOf _
         * @type string
         */
        lodash.VERSION = '2.4.1';

        // add "Chaining" functions to the wrapper
        lodash.prototype.chain = wrapperChain;
        lodash.prototype.toString = wrapperToString;
        lodash.prototype.value = wrapperValueOf;
        lodash.prototype.valueOf = wrapperValueOf;

        // add `Array` functions that return unwrapped values
        forEach(['join', 'pop', 'shift'], function(methodName) {
            var func = arrayRef[methodName];
            lodash.prototype[methodName] = function() {
                var chainAll = this.__chain__,
                    result = func.apply(this.__wrapped__, arguments);

                return chainAll ?
                    new lodashWrapper(result, chainAll) :
                    result;
            };
        });

        // add `Array` functions that return the existing wrapped value
        forEach(['push', 'reverse', 'sort', 'unshift'], function(methodName) {
            var func = arrayRef[methodName];
            lodash.prototype[methodName] = function() {
                func.apply(this.__wrapped__, arguments);
                return this;
            };
        });

        // add `Array` functions that return new wrapped values
        forEach(['concat', 'slice', 'splice'], function(methodName) {
            var func = arrayRef[methodName];
            lodash.prototype[methodName] = function() {
                return new lodashWrapper(func.apply(this.__wrapped__, arguments), this.__chain__);
            };
        });

        return lodash;
    }

    /*--------------------------------------------------------------------------*/

    // expose Lo-Dash
    var _ = runInContext();

    // some AMD build optimizers like r.js check for condition patterns like the following:
    if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
        // Expose Lo-Dash to the global object even when an AMD loader is present in
        // case Lo-Dash is loaded with a RequireJS shim config.
        // See http://requirejs.org/docs/api.html#config-shim
        root._ = _;

        // define as an anonymous module so, through path mapping, it can be
        // referenced as the "underscore" module
        define(function() {
            return _;
        });
    }
    // check for `exports` after `define` in case a build optimizer adds an `exports` object
    else if (freeExports && freeModule) {
        // in Node.js or RingoJS
        if (moduleExports) {
            (freeModule.exports = _)._ = _;
        }
        // in Narwhal or Rhino -require
        else {
            freeExports._ = _;
        }
    } else {
        // in a browser or Rhino
        root._ = _;
    }
}.call(this));