(window.webpackJsonp = window.webpackJsonp || []).push([
    ["conversations-internal-pub-sub-client-builder"], {
        CiDO: function(e, t, n) {
            var i, r, o, s = {},
                a = "object" == typeof window && window || "object" == typeof self && self,
                c = c || function(e, t) {
                    var n = {},
                        i = n.lib = {},
                        r = i.Base = function() {
                            function e() {}
                            return {
                                extend: function(t) {
                                    e.prototype = this;
                                    var n = new e;
                                    t && n.mixIn(t);
                                    n.hasOwnProperty("init") || (n.init = function() {
                                        n.$super.init.apply(this, arguments)
                                    });
                                    n.init.prototype = n;
                                    n.$super = this;
                                    return n
                                },
                                create: function() {
                                    var e = this.extend();
                                    e.init.apply(e, arguments);
                                    return e
                                },
                                init: function() {},
                                mixIn: function(e) {
                                    for (var t in e) e.hasOwnProperty(t) && (this[t] = e[t]);
                                    e.hasOwnProperty("toString") && (this.toString = e.toString)
                                },
                                clone: function() {
                                    return this.init.prototype.extend(this)
                                }
                            }
                        }(),
                        o = i.WordArray = r.extend({
                            init: function(e, n) {
                                e = this.words = e || [];
                                this.sigBytes = n != t ? n : 4 * e.length
                            },
                            toString: function(e) {
                                return (e || a).stringify(this)
                            },
                            concat: function(e) {
                                var t = this.words,
                                    n = e.words,
                                    i = this.sigBytes,
                                    r = e.sigBytes;
                                this.clamp();
                                if (i % 4)
                                    for (var o = 0; o < r; o++) {
                                        var s = n[o >>> 2] >>> 24 - o % 4 * 8 & 255;
                                        t[i + o >>> 2] |= s << 24 - (i + o) % 4 * 8
                                    } else if (n.length > 65535)
                                        for (o = 0; o < r; o += 4) t[i + o >>> 2] = n[o >>> 2];
                                    else t.push.apply(t, n);
                                this.sigBytes += r;
                                return this
                            },
                            clamp: function() {
                                var t = this.words,
                                    n = this.sigBytes;
                                t[n >>> 2] &= 4294967295 << 32 - n % 4 * 8;
                                t.length = e.ceil(n / 4)
                            },
                            clone: function() {
                                var e = r.clone.call(this);
                                e.words = this.words.slice(0);
                                return e
                            },
                            random: function(t) {
                                for (var n, i = [], r = function(t) {
                                        t = t;
                                        var n = 987654321,
                                            i = 4294967295;
                                        return function() {
                                            var r = ((n = 36969 * (65535 & n) + (n >> 16) & i) << 16) + (t = 18e3 * (65535 & t) + (t >> 16) & i) & i;
                                            r /= 4294967296;
                                            return (r += .5) * (e.random() > .5 ? 1 : -1)
                                        }
                                    }, s = 0; s < t; s += 4) {
                                    var a = r(4294967296 * (n || e.random()));
                                    n = 987654071 * a();
                                    i.push(4294967296 * a() | 0)
                                }
                                return new o.init(i, t)
                            }
                        }),
                        s = n.enc = {},
                        a = s.Hex = {
                            stringify: function(e) {
                                for (var t = e.words, n = e.sigBytes, i = [], r = 0; r < n; r++) {
                                    var o = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;
                                    i.push((o >>> 4).toString(16));
                                    i.push((15 & o).toString(16))
                                }
                                return i.join("")
                            },
                            parse: function(e) {
                                for (var t = e.length, n = [], i = 0; i < t; i += 2) n[i >>> 3] |= parseInt(e.substr(i, 2), 16) << 24 - i % 8 * 4;
                                return new o.init(n, t / 2)
                            }
                        },
                        c = s.Latin1 = {
                            stringify: function(e) {
                                for (var t = e.words, n = e.sigBytes, i = [], r = 0; r < n; r++) {
                                    var o = t[r >>> 2] >>> 24 - r % 4 * 8 & 255;
                                    i.push(String.fromCharCode(o))
                                }
                                return i.join("")
                            },
                            parse: function(e) {
                                for (var t = e.length, n = [], i = 0; i < t; i++) n[i >>> 2] |= (255 & e.charCodeAt(i)) << 24 - i % 4 * 8;
                                return new o.init(n, t)
                            }
                        },
                        u = s.Utf8 = {
                            stringify: function(e) {
                                try {
                                    return decodeURIComponent(escape(c.stringify(e)))
                                } catch (e) {
                                    throw new Error("Malformed UTF-8 data")
                                }
                            },
                            parse: function(e) {
                                return c.parse(unescape(encodeURIComponent(e)))
                            }
                        },
                        l = i.BufferedBlockAlgorithm = r.extend({
                            reset: function() {
                                this._data = new o.init;
                                this._nDataBytes = 0
                            },
                            _append: function(e) {
                                "string" == typeof e && (e = u.parse(e));
                                this._data.concat(e);
                                this._nDataBytes += e.sigBytes
                            },
                            _process: function(t) {
                                var n = this._data,
                                    i = n.words,
                                    r = n.sigBytes,
                                    s = this.blockSize,
                                    a = r / (4 * s),
                                    c = (a = t ? e.ceil(a) : e.max((0 | a) - this._minBufferSize, 0)) * s,
                                    u = e.min(4 * c, r);
                                if (c) {
                                    for (var l = 0; l < c; l += s) this._doProcessBlock(i, l);
                                    var h = i.splice(0, c);
                                    n.sigBytes -= u
                                }
                                return new o.init(h, u)
                            },
                            clone: function() {
                                var e = r.clone.call(this);
                                e._data = this._data.clone();
                                return e
                            },
                            _minBufferSize: 0
                        }),
                        h = (i.Hasher = l.extend({
                            cfg: r.extend(),
                            init: function(e) {
                                this.cfg = this.cfg.extend(e);
                                this.reset()
                            },
                            reset: function() {
                                l.reset.call(this);
                                this._doReset()
                            },
                            update: function(e) {
                                this._append(e);
                                this._process();
                                return this
                            },
                            finalize: function(e) {
                                e && this._append(e);
                                return this._doFinalize()
                            },
                            blockSize: 16,
                            _createHelper: function(e) {
                                return function(t, n) {
                                    return new e.init(n).finalize(t)
                                }
                            },
                            _createHmacHelper: function(e) {
                                return function(t, n) {
                                    return new h.HMAC.init(e, n).finalize(t)
                                }
                            }
                        }), n.algo = {});
                    return n
                }(Math);
            ! function(e) {
                var t = c,
                    n = t.lib,
                    i = n.WordArray,
                    r = n.Hasher,
                    o = t.algo,
                    s = [],
                    a = [];
                ! function() {
                    function t(t) {
                        for (var n = e.sqrt(t), i = 2; i <= n; i++)
                            if (!(t % i)) return !1;
                        return !0
                    }

                    function n(e) {
                        return 4294967296 * (e - (0 | e)) | 0
                    }
                    for (var i = 2, r = 0; r < 64;) {
                        if (t(i)) {
                            r < 8 && (s[r] = n(e.pow(i, .5)));
                            a[r] = n(e.pow(i, 1 / 3));
                            r++
                        }
                        i++
                    }
                }();
                var u = [],
                    l = o.SHA256 = r.extend({
                        _doReset: function() {
                            this._hash = new i.init(s.slice(0))
                        },
                        _doProcessBlock: function(e, t) {
                            for (var n = this._hash.words, i = n[0], r = n[1], o = n[2], s = n[3], c = n[4], l = n[5], h = n[6], p = n[7], f = 0; f < 64; f++) {
                                if (f < 16) u[f] = 0 | e[t + f];
                                else {
                                    var d = u[f - 15],
                                        g = (d << 25 | d >>> 7) ^ (d << 14 | d >>> 18) ^ d >>> 3,
                                        m = u[f - 2],
                                        y = (m << 15 | m >>> 17) ^ (m << 13 | m >>> 19) ^ m >>> 10;
                                    u[f] = g + u[f - 7] + y + u[f - 16]
                                }
                                var v = i & r ^ i & o ^ r & o,
                                    b = (i << 30 | i >>> 2) ^ (i << 19 | i >>> 13) ^ (i << 10 | i >>> 22),
                                    O = p + ((c << 26 | c >>> 6) ^ (c << 21 | c >>> 11) ^ (c << 7 | c >>> 25)) + (c & l ^ ~c & h) + a[f] + u[f];
                                p = h;
                                h = l;
                                l = c;
                                c = s + O | 0;
                                s = o;
                                o = r;
                                r = i;
                                i = O + (b + v) | 0
                            }
                            n[0] = n[0] + i | 0;
                            n[1] = n[1] + r | 0;
                            n[2] = n[2] + o | 0;
                            n[3] = n[3] + s | 0;
                            n[4] = n[4] + c | 0;
                            n[5] = n[5] + l | 0;
                            n[6] = n[6] + h | 0;
                            n[7] = n[7] + p | 0
                        },
                        _doFinalize: function() {
                            var t = this._data,
                                n = t.words,
                                i = 8 * this._nDataBytes,
                                r = 8 * t.sigBytes;
                            n[r >>> 5] |= 128 << 24 - r % 32;
                            n[14 + (r + 64 >>> 9 << 4)] = e.floor(i / 4294967296);
                            n[15 + (r + 64 >>> 9 << 4)] = i;
                            t.sigBytes = 4 * n.length;
                            this._process();
                            return this._hash
                        },
                        clone: function() {
                            var e = r.clone.call(this);
                            e._hash = this._hash.clone();
                            return e
                        }
                    });
                t.SHA256 = r._createHelper(l);
                t.HmacSHA256 = r._createHmacHelper(l)
            }(Math);
            r = (i = c).lib.Base, o = i.enc.Utf8, i.algo.HMAC = r.extend({
                init: function(e, t) {
                    e = this._hasher = new e.init;
                    "string" == typeof t && (t = o.parse(t));
                    var n = e.blockSize,
                        i = 4 * n;
                    t.sigBytes > i && (t = e.finalize(t));
                    t.clamp();
                    for (var r = this._oKey = t.clone(), s = this._iKey = t.clone(), a = r.words, c = s.words, u = 0; u < n; u++) {
                        a[u] ^= 1549556828;
                        c[u] ^= 909522486
                    }
                    r.sigBytes = s.sigBytes = i;
                    this.reset()
                },
                reset: function() {
                    var e = this._hasher;
                    e.reset();
                    e.update(this._iKey)
                },
                update: function(e) {
                    this._hasher.update(e);
                    return this
                },
                finalize: function(e) {
                    var t = this._hasher,
                        n = t.finalize(e);
                    t.reset();
                    return t.finalize(this._oKey.clone().concat(n))
                }
            });
            ! function() {
                var e = c,
                    t = e.lib.WordArray;
                e.enc.Base64 = {
                    stringify: function(e) {
                        var t = e.words,
                            n = e.sigBytes,
                            i = this._map;
                        e.clamp();
                        for (var r = [], o = 0; o < n; o += 3)
                            for (var s = (t[o >>> 2] >>> 24 - o % 4 * 8 & 255) << 16 | (t[o + 1 >>> 2] >>> 24 - (o + 1) % 4 * 8 & 255) << 8 | t[o + 2 >>> 2] >>> 24 - (o + 2) % 4 * 8 & 255, a = 0; a < 4 && o + .75 * a < n; a++) r.push(i.charAt(s >>> 6 * (3 - a) & 63));
                        var c = i.charAt(64);
                        if (c)
                            for (; r.length % 4;) r.push(c);
                        return r.join("")
                    },
                    parse: function(e) {
                        var n = e.length,
                            i = this._map,
                            r = i.charAt(64);
                        if (r) {
                            var o = e.indexOf(r); - 1 != o && (n = o)
                        }
                        for (var s = [], a = 0, c = 0; c < n; c++)
                            if (c % 4) {
                                var u = i.indexOf(e.charAt(c - 1)) << c % 4 * 2,
                                    l = i.indexOf(e.charAt(c)) >>> 6 - c % 4 * 2;
                                s[a >>> 2] |= (u | l) << 24 - a % 4 * 8;
                                a++
                            }
                        return t.create(s, a)
                    },
                    _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
                }
            }();
            c.lib.Cipher || function(e) {
                var t = c,
                    n = t.lib,
                    i = n.Base,
                    r = n.WordArray,
                    o = n.BufferedBlockAlgorithm,
                    s = t.enc,
                    a = (s.Utf8, s.Base64),
                    u = t.algo.EvpKDF,
                    l = n.Cipher = o.extend({
                        cfg: i.extend(),
                        createEncryptor: function(e, t) {
                            return this.create(this._ENC_XFORM_MODE, e, t)
                        },
                        createDecryptor: function(e, t) {
                            return this.create(this._DEC_XFORM_MODE, e, t)
                        },
                        init: function(e, t, n) {
                            this.cfg = this.cfg.extend(n);
                            this._xformMode = e;
                            this._key = t;
                            this.reset()
                        },
                        reset: function() {
                            o.reset.call(this);
                            this._doReset()
                        },
                        process: function(e) {
                            this._append(e);
                            return this._process()
                        },
                        finalize: function(e) {
                            e && this._append(e);
                            return this._doFinalize()
                        },
                        keySize: 4,
                        ivSize: 4,
                        _ENC_XFORM_MODE: 1,
                        _DEC_XFORM_MODE: 2,
                        _createHelper: function() {
                            function e(e) {
                                return "string" == typeof e ? b : y
                            }
                            return function(t) {
                                return {
                                    encrypt: function(n, i, r) {
                                        return e(i).encrypt(t, n, i, r)
                                    },
                                    decrypt: function(n, i, r) {
                                        return e(i).decrypt(t, n, i, r)
                                    }
                                }
                            }
                        }()
                    }),
                    h = (n.StreamCipher = l.extend({
                        _doFinalize: function() {
                            return this._process(!0)
                        },
                        blockSize: 1
                    }), t.mode = {}),
                    p = n.BlockCipherMode = i.extend({
                        createEncryptor: function(e, t) {
                            return this.Encryptor.create(e, t)
                        },
                        createDecryptor: function(e, t) {
                            return this.Decryptor.create(e, t)
                        },
                        init: function(e, t) {
                            this._cipher = e;
                            this._iv = t
                        }
                    }),
                    f = h.CBC = function() {
                        var t = p.extend();
                        t.Encryptor = t.extend({
                            processBlock: function(e, t) {
                                var i = this._cipher,
                                    r = i.blockSize;
                                n.call(this, e, t, r);
                                i.encryptBlock(e, t);
                                this._prevBlock = e.slice(t, t + r)
                            }
                        });
                        t.Decryptor = t.extend({
                            processBlock: function(e, t) {
                                var i = this._cipher,
                                    r = i.blockSize,
                                    o = e.slice(t, t + r);
                                i.decryptBlock(e, t);
                                n.call(this, e, t, r);
                                this._prevBlock = o
                            }
                        });

                        function n(t, n, i) {
                            var r = this._iv;
                            if (r) {
                                var o = r;
                                this._iv = e
                            } else o = this._prevBlock;
                            for (var s = 0; s < i; s++) t[n + s] ^= o[s]
                        }
                        return t
                    }(),
                    d = (t.pad = {}).Pkcs7 = {
                        pad: function(e, t) {
                            for (var n = 4 * t, i = n - e.sigBytes % n, o = i << 24 | i << 16 | i << 8 | i, s = [], a = 0; a < i; a += 4) s.push(o);
                            var c = r.create(s, i);
                            e.concat(c)
                        },
                        unpad: function(e) {
                            var t = 255 & e.words[e.sigBytes - 1 >>> 2];
                            e.sigBytes -= t
                        }
                    },
                    g = (n.BlockCipher = l.extend({
                        cfg: l.cfg.extend({
                            mode: f,
                            padding: d
                        }),
                        reset: function() {
                            l.reset.call(this);
                            var e = this.cfg,
                                t = e.iv,
                                n = e.mode;
                            if (this._xformMode == this._ENC_XFORM_MODE) var i = n.createEncryptor;
                            else {
                                i = n.createDecryptor;
                                this._minBufferSize = 1
                            }
                            this._mode = i.call(n, this, t && t.words)
                        },
                        _doProcessBlock: function(e, t) {
                            this._mode.processBlock(e, t)
                        },
                        _doFinalize: function() {
                            var e = this.cfg.padding;
                            if (this._xformMode == this._ENC_XFORM_MODE) {
                                e.pad(this._data, this.blockSize);
                                var t = this._process(!0)
                            } else {
                                t = this._process(!0);
                                e.unpad(t)
                            }
                            return t
                        },
                        blockSize: 4
                    }), n.CipherParams = i.extend({
                        init: function(e) {
                            this.mixIn(e)
                        },
                        toString: function(e) {
                            return (e || this.formatter).stringify(this)
                        }
                    })),
                    m = (t.format = {}).OpenSSL = {
                        stringify: function(e) {
                            var t = e.ciphertext,
                                n = e.salt;
                            if (n) var i = r.create([1398893684, 1701076831]).concat(n).concat(t);
                            else i = t;
                            return i.toString(a)
                        },
                        parse: function(e) {
                            var t = a.parse(e),
                                n = t.words;
                            if (1398893684 == n[0] && 1701076831 == n[1]) {
                                var i = r.create(n.slice(2, 4));
                                n.splice(0, 4);
                                t.sigBytes -= 16
                            }
                            return g.create({
                                ciphertext: t,
                                salt: i
                            })
                        }
                    },
                    y = n.SerializableCipher = i.extend({
                        cfg: i.extend({
                            format: m
                        }),
                        encrypt: function(e, t, n, i) {
                            i = this.cfg.extend(i);
                            var r = e.createEncryptor(n, i),
                                o = r.finalize(t),
                                s = r.cfg;
                            return g.create({
                                ciphertext: o,
                                key: n,
                                iv: s.iv,
                                algorithm: e,
                                mode: s.mode,
                                padding: s.padding,
                                blockSize: e.blockSize,
                                formatter: i.format
                            })
                        },
                        decrypt: function(e, t, n, i) {
                            i = this.cfg.extend(i);
                            t = this._parse(t, i.format);
                            return e.createDecryptor(n, i).finalize(t.ciphertext)
                        },
                        _parse: function(e, t) {
                            return "string" == typeof e ? t.parse(e, this) : e
                        }
                    }),
                    v = (t.kdf = {}).OpenSSL = {
                        execute: function(e, t, n, i) {
                            i || (i = r.random(8));
                            var o = u.create({
                                    keySize: t + n
                                }).compute(e, i),
                                s = r.create(o.words.slice(t), 4 * n);
                            o.sigBytes = 4 * t;
                            return g.create({
                                key: o,
                                iv: s,
                                salt: i
                            })
                        }
                    },
                    b = n.PasswordBasedCipher = y.extend({
                        cfg: y.cfg.extend({
                            kdf: v
                        }),
                        encrypt: function(e, t, n, i) {
                            var r = (i = this.cfg.extend(i)).kdf.execute(n, e.keySize, e.ivSize);
                            i.iv = r.iv;
                            var o = y.encrypt.call(this, e, t, r.key, i);
                            o.mixIn(r);
                            return o
                        },
                        decrypt: function(e, t, n, i) {
                            i = this.cfg.extend(i);
                            t = this._parse(t, i.format);
                            var r = i.kdf.execute(n, e.keySize, e.ivSize, t.salt);
                            i.iv = r.iv;
                            return y.decrypt.call(this, e, t, r.key, i)
                        }
                    })
            }();
            ! function() {
                var e = c,
                    t = e.lib.BlockCipher,
                    n = e.algo,
                    i = [],
                    r = [],
                    o = [],
                    s = [],
                    a = [],
                    u = [],
                    l = [],
                    h = [],
                    p = [],
                    f = [];
                ! function() {
                    for (var e = [], t = 0; t < 256; t++) e[t] = t < 128 ? t << 1 : t << 1 ^ 283;
                    var n = 0,
                        c = 0;
                    for (t = 0; t < 256; t++) {
                        var d = c ^ c << 1 ^ c << 2 ^ c << 3 ^ c << 4;
                        d = d >>> 8 ^ 255 & d ^ 99;
                        i[n] = d;
                        r[d] = n;
                        var g = e[n],
                            m = e[g],
                            y = e[m],
                            v = 257 * e[d] ^ 16843008 * d;
                        o[n] = v << 24 | v >>> 8;
                        s[n] = v << 16 | v >>> 16;
                        a[n] = v << 8 | v >>> 24;
                        u[n] = v;
                        v = 16843009 * y ^ 65537 * m ^ 257 * g ^ 16843008 * n;
                        l[d] = v << 24 | v >>> 8;
                        h[d] = v << 16 | v >>> 16;
                        p[d] = v << 8 | v >>> 24;
                        f[d] = v;
                        if (n) {
                            n = g ^ e[e[e[y ^ g]]];
                            c ^= e[e[c]]
                        } else n = c = 1
                    }
                }();
                var d = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
                    g = n.AES = t.extend({
                        _doReset: function() {
                            for (var e = this._key, t = e.words, n = e.sigBytes / 4, r = 4 * ((this._nRounds = n + 6) + 1), o = this._keySchedule = [], s = 0; s < r; s++)
                                if (s < n) o[s] = t[s];
                                else {
                                    var a = o[s - 1];
                                    if (s % n) n > 6 && s % n == 4 && (a = i[a >>> 24] << 24 | i[a >>> 16 & 255] << 16 | i[a >>> 8 & 255] << 8 | i[255 & a]);
                                    else {
                                        a = i[(a = a << 8 | a >>> 24) >>> 24] << 24 | i[a >>> 16 & 255] << 16 | i[a >>> 8 & 255] << 8 | i[255 & a];
                                        a ^= d[s / n | 0] << 24
                                    }
                                    o[s] = o[s - n] ^ a
                                }
                            for (var c = this._invKeySchedule = [], u = 0; u < r; u++) {
                                s = r - u;
                                if (u % 4) a = o[s];
                                else a = o[s - 4];
                                c[u] = u < 4 || s <= 4 ? a : l[i[a >>> 24]] ^ h[i[a >>> 16 & 255]] ^ p[i[a >>> 8 & 255]] ^ f[i[255 & a]]
                            }
                        },
                        encryptBlock: function(e, t) {
                            this._doCryptBlock(e, t, this._keySchedule, o, s, a, u, i)
                        },
                        decryptBlock: function(e, t) {
                            var n = e[t + 1];
                            e[t + 1] = e[t + 3];
                            e[t + 3] = n;
                            this._doCryptBlock(e, t, this._invKeySchedule, l, h, p, f, r);
                            n = e[t + 1];
                            e[t + 1] = e[t + 3];
                            e[t + 3] = n
                        },
                        _doCryptBlock: function(e, t, n, i, r, o, s, a) {
                            for (var c = this._nRounds, u = e[t] ^ n[0], l = e[t + 1] ^ n[1], h = e[t + 2] ^ n[2], p = e[t + 3] ^ n[3], f = 4, d = 1; d < c; d++) {
                                var g = i[u >>> 24] ^ r[l >>> 16 & 255] ^ o[h >>> 8 & 255] ^ s[255 & p] ^ n[f++],
                                    m = i[l >>> 24] ^ r[h >>> 16 & 255] ^ o[p >>> 8 & 255] ^ s[255 & u] ^ n[f++],
                                    y = i[h >>> 24] ^ r[p >>> 16 & 255] ^ o[u >>> 8 & 255] ^ s[255 & l] ^ n[f++],
                                    v = i[p >>> 24] ^ r[u >>> 16 & 255] ^ o[l >>> 8 & 255] ^ s[255 & h] ^ n[f++];
                                u = g;
                                l = m;
                                h = y;
                                p = v
                            }
                            g = (a[u >>> 24] << 24 | a[l >>> 16 & 255] << 16 | a[h >>> 8 & 255] << 8 | a[255 & p]) ^ n[f++], m = (a[l >>> 24] << 24 | a[h >>> 16 & 255] << 16 | a[p >>> 8 & 255] << 8 | a[255 & u]) ^ n[f++], y = (a[h >>> 24] << 24 | a[p >>> 16 & 255] << 16 | a[u >>> 8 & 255] << 8 | a[255 & l]) ^ n[f++], v = (a[p >>> 24] << 24 | a[u >>> 16 & 255] << 16 | a[l >>> 8 & 255] << 8 | a[255 & h]) ^ n[f++];
                            e[t] = g;
                            e[t + 1] = m;
                            e[t + 2] = y;
                            e[t + 3] = v
                        },
                        keySize: 8
                    });
                e.AES = t._createHelper(g)
            }();
            ! function() {
                if ("undefined" != typeof ArrayBuffer) {
                    var e = c.lib.WordArray,
                        t = e.init;
                    (e.init = function(e) {
                        e instanceof ArrayBuffer ? e = new Uint8Array(e) : (e instanceof Int8Array || "undefined" != typeof Uint8ClampedArray && e instanceof Uint8ClampedArray || e instanceof Int16Array || e instanceof Uint16Array || e instanceof Int32Array || e instanceof Uint32Array || "undefined" != typeof Float32Array && e instanceof Float32Array || "undefined" != typeof Float64Array && e instanceof Float64Array) && (e = new Uint8Array(e.buffer, e.byteOffset, e.byteLength));
                        if (e instanceof Uint8Array) {
                            for (var n = e.byteLength, i = [], r = 0; r < n; r++) i[r >>> 2] |= e[r] << 24 - r % 4 * 8;
                            t.call(this, i, n)
                        } else t.apply(this, arguments)
                    }).prototype = e
                }
            }();
            var u = function() {
                    function e() {}
                    e.addListener = function(e, t, n) {
                        e.addEventListener ? e.addEventListener(t, n, !1) : e.attachEvent("on" + t, (function() {
                            n.apply(e, arguments)
                        }))
                    };
                    e.removeListener = function(e, t, n) {
                        e.removeEventListener ? e.removeEventListener(t, n, !1) : e.detachEvent("on" + t, (function() {
                            n.apply(e, arguments)
                        }))
                    };
                    e.addMessageListener = function(t, n) {
                        e.addListener(t, "message", n)
                    };
                    e.removeMessageListener = function(t, n) {
                        e.removeListener(t, "message", n)
                    };
                    e.addUnloadListener = function(t) {
                        e.addListener(a, "unload", t)
                    };
                    return e
                }(),
                l = function() {
                    "use strict";
                    var e = {};
                    e.inspect = t;

                    function t(e) {
                        if (void 0 === e) return "undefined";
                        var t, n;
                        if (e instanceof ArrayBuffer) {
                            n = "ArrayBuffer";
                            t = new DataView(e)
                        } else if (e instanceof DataView) {
                            n = "DataView";
                            t = e
                        }
                        if (!t) return JSON.stringify(e);
                        for (var i = [], r = 0; r < e.byteLength; r++) {
                            if (r > 20) {
                                i.push("...");
                                break
                            }
                            var o = t.getUint8(r).toString(16);
                            1 === o.length && (o = "0" + o);
                            i.push(o)
                        }
                        return "<" + n + " " + i.join(" ") + ">"
                    }
                    e.utf8Write = n;

                    function n(e, t, n) {
                        e.byteLength;
                        for (var i = 0, r = n.length; i < r; i++) {
                            var o = n.charCodeAt(i);
                            if (o < 128) e.setUint8(t++, o >>> 0 & 127 | 0);
                            else if (o < 2048) {
                                e.setUint8(t++, o >>> 6 & 31 | 192);
                                e.setUint8(t++, o >>> 0 & 63 | 128)
                            } else if (o < 65536) {
                                e.setUint8(t++, o >>> 12 & 15 | 224);
                                e.setUint8(t++, o >>> 6 & 63 | 128);
                                e.setUint8(t++, o >>> 0 & 63 | 128)
                            } else {
                                if (!(o < 1114112)) throw new Error("bad codepoint " + o);
                                e.setUint8(t++, o >>> 18 & 7 | 240);
                                e.setUint8(t++, o >>> 12 & 63 | 128);
                                e.setUint8(t++, o >>> 6 & 63 | 128);
                                e.setUint8(t++, o >>> 0 & 63 | 128)
                            }
                        }
                    }
                    e.utf8Read = i;

                    function i(e, t, n) {
                        for (var i = "", r = t, o = t + n; r < o; r++) {
                            var s = e.getUint8(r);
                            if (0 != (128 & s))
                                if (192 != (224 & s))
                                    if (224 != (240 & s)) {
                                        if (240 != (248 & s)) throw new Error("Invalid byte " + s.toString(16));
                                        i += String.fromCharCode((7 & s) << 18 | (63 & e.getUint8(++r)) << 12 | (63 & e.getUint8(++r)) << 6 | (63 & e.getUint8(++r)) << 0)
                                    } else i += String.fromCharCode((15 & s) << 12 | (63 & e.getUint8(++r)) << 6 | (63 & e.getUint8(++r)) << 0);
                            else i += String.fromCharCode((15 & s) << 6 | 63 & e.getUint8(++r));
                            else i += String.fromCharCode(s)
                        }
                        return i
                    }
                    e.utf8ByteCount = r;

                    function r(e) {
                        for (var t = 0, n = 0, i = e.length; n < i; n++) {
                            var r = e.charCodeAt(n);
                            if (r < 128) t += 1;
                            else if (r < 2048) t += 2;
                            else if (r < 65536) t += 3;
                            else {
                                if (!(r < 1114112)) throw new Error("bad codepoint " + r);
                                t += 4
                            }
                        }
                        return t
                    }
                    e.encode = function(e, t) {
                        var n = g(e, t);
                        if (0 != n) {
                            var i = new ArrayBuffer(n);
                            d(e, new DataView(i), 0, t);
                            return i
                        }
                    };
                    e.decode = p;
                    var o = 4294967296,
                        s = 1 / o;

                    function a(e, t) {
                        t = t || 0;
                        return e.getInt32(t) * o + e.getUint32(t + 4)
                    }

                    function c(e, t) {
                        t = t || 0;
                        return e.getUint32(t) * o + e.getUint32(t + 4)
                    }

                    function u(e, t, n) {
                        if (n < 0x8000000000000000) {
                            e.setInt32(t, Math.floor(n * s));
                            e.setInt32(t + 4, -1 & n)
                        } else {
                            e.setUint32(t, 2147483647);
                            e.setUint32(t + 4, 2147483647)
                        }
                    }

                    function l(e, t, n) {
                        if (n < 0x10000000000000000) {
                            e.setUint32(t, Math.floor(n * s));
                            e.setInt32(t + 4, -1 & n)
                        } else {
                            e.setUint32(t, 4294967295);
                            e.setUint32(t + 4, 4294967295)
                        }
                    }

                    function h(e, t) {
                        this.offset = t || 0;
                        this.view = e
                    }
                    h.prototype.map = function(e) {
                        for (var t = {}, n = 0; n < e; n++) {
                            t[this.parse()] = this.parse()
                        }
                        return t
                    };
                    h.prototype.bin = h.prototype.buf = function(e) {
                        var t = new ArrayBuffer(e);
                        new Uint8Array(t).set(new Uint8Array(this.view.buffer, this.offset, e), 0);
                        this.offset += e;
                        return t
                    };
                    h.prototype.str = function(e) {
                        var t = i(this.view, this.offset, e);
                        this.offset += e;
                        return t
                    };
                    h.prototype.array = function(e) {
                        for (var t = new Array(e), n = 0; n < e; n++) t[n] = this.parse();
                        return t
                    };
                    h.prototype.ext = function(e) {
                        var t = {};
                        t.type = this.view.getInt8(this.offset);
                        this.offset++;
                        t.data = this.buf(e);
                        this.offset += e;
                        return t
                    };
                    h.prototype.parse = function() {
                        var e, t, n = this.view.getUint8(this.offset);
                        if (0 == (128 & n)) {
                            this.offset++;
                            return n
                        }
                        if (128 == (240 & n)) {
                            t = 15 & n;
                            this.offset++;
                            return this.map(t)
                        }
                        if (144 == (240 & n)) {
                            t = 15 & n;
                            this.offset++;
                            return this.array(t)
                        }
                        if (160 == (224 & n)) {
                            t = 31 & n;
                            this.offset++;
                            return this.str(t)
                        }
                        if (224 == (224 & n)) {
                            e = this.view.getInt8(this.offset);
                            this.offset++;
                            return e
                        }
                        switch (n) {
                            case 192:
                                this.offset++;
                                return null;
                            case 193:
                                this.offset++;
                                return;
                            case 194:
                                this.offset++;
                                return !1;
                            case 195:
                                this.offset++;
                                return !0;
                            case 196:
                                t = this.view.getUint8(this.offset + 1);
                                this.offset += 2;
                                return this.bin(t);
                            case 197:
                                t = this.view.getUint16(this.offset + 1);
                                this.offset += 3;
                                return this.bin(t);
                            case 198:
                                t = this.view.getUint32(this.offset + 1);
                                this.offset += 5;
                                return this.bin(t);
                            case 199:
                                t = this.view.getUint8(this.offset + 1);
                                this.offset += 2;
                                return this.ext(t);
                            case 200:
                                t = this.view.getUint16(this.offset + 1);
                                this.offset += 3;
                                return this.ext(t);
                            case 201:
                                t = this.view.getUint32(this.offset + 1);
                                this.offset += 5;
                                return this.ext(t);
                            case 202:
                                e = this.view.getFloat32(this.offset + 1);
                                this.offset += 5;
                                return e;
                            case 203:
                                e = this.view.getFloat64(this.offset + 1);
                                this.offset += 9;
                                return e;
                            case 204:
                                e = this.view.getUint8(this.offset + 1);
                                this.offset += 2;
                                return e;
                            case 205:
                                e = this.view.getUint16(this.offset + 1);
                                this.offset += 3;
                                return e;
                            case 206:
                                e = this.view.getUint32(this.offset + 1);
                                this.offset += 5;
                                return e;
                            case 207:
                                e = c(this.view, this.offset + 1);
                                this.offset += 9;
                                return e;
                            case 208:
                                e = this.view.getInt8(this.offset + 1);
                                this.offset += 2;
                                return e;
                            case 209:
                                e = this.view.getInt16(this.offset + 1);
                                this.offset += 3;
                                return e;
                            case 210:
                                e = this.view.getInt32(this.offset + 1);
                                this.offset += 5;
                                return e;
                            case 211:
                                e = a(this.view, this.offset + 1);
                                this.offset += 9;
                                return e;
                            case 212:
                                t = 1;
                                this.offset++;
                                return this.ext(t);
                            case 213:
                                t = 2;
                                this.offset++;
                                return this.ext(t);
                            case 214:
                                t = 4;
                                this.offset++;
                                return this.ext(t);
                            case 215:
                                t = 8;
                                this.offset++;
                                return this.ext(t);
                            case 216:
                                t = 16;
                                this.offset++;
                                return this.ext(t);
                            case 217:
                                t = this.view.getUint8(this.offset + 1);
                                this.offset += 2;
                                return this.str(t);
                            case 218:
                                t = this.view.getUint16(this.offset + 1);
                                this.offset += 3;
                                return this.str(t);
                            case 219:
                                t = this.view.getUint32(this.offset + 1);
                                this.offset += 5;
                                return this.str(t);
                            case 220:
                                t = this.view.getUint16(this.offset + 1);
                                this.offset += 3;
                                return this.array(t);
                            case 221:
                                t = this.view.getUint32(this.offset + 1);
                                this.offset += 5;
                                return this.array(t);
                            case 222:
                                t = this.view.getUint16(this.offset + 1);
                                this.offset += 3;
                                return this.map(t);
                            case 223:
                                t = this.view.getUint32(this.offset + 1);
                                this.offset += 5;
                                return this.map(t)
                        }
                        throw new Error("Unknown type 0x" + n.toString(16))
                    };

                    function p(e) {
                        var t = new h(new DataView(e)),
                            n = t.parse();
                        if (t.offset !== e.byteLength) throw new Error(e.byteLength - t.offset + " trailing bytes");
                        return n
                    }

                    function f(e, t) {
                        return v.keysArray(e, !0).filter((function(n) {
                            var i = e[n];
                            return !(t && null == i || "function" === typeof i && !i.toJSON)
                        }))
                    }

                    function d(e, t, i, o) {
                        var s = typeof e;
                        if ("string" === s) {
                            if ((a = r(e)) < 32) {
                                t.setUint8(i, 160 | a);
                                n(t, i + 1, e);
                                return 1 + a
                            }
                            if (a < 256) {
                                t.setUint8(i, 217);
                                t.setUint8(i + 1, a);
                                n(t, i + 2, e);
                                return 2 + a
                            }
                            if (a < 65536) {
                                t.setUint8(i, 218);
                                t.setUint16(i + 1, a);
                                n(t, i + 3, e);
                                return 3 + a
                            }
                            if (a < 4294967296) {
                                t.setUint8(i, 219);
                                t.setUint32(i + 1, a);
                                n(t, i + 5, e);
                                return 5 + a
                            }
                        }
                        ArrayBuffer.isView && ArrayBuffer.isView(e) && (e = e.buffer);
                        if (e instanceof ArrayBuffer) {
                            if ((a = e.byteLength) < 256) {
                                t.setUint8(i, 196);
                                t.setUint8(i + 1, a);
                                new Uint8Array(t.buffer).set(new Uint8Array(e), i + 2);
                                return 2 + a
                            }
                            if (a < 65536) {
                                t.setUint8(i, 197);
                                t.setUint16(i + 1, a);
                                new Uint8Array(t.buffer).set(new Uint8Array(e), i + 3);
                                return 3 + a
                            }
                            if (a < 4294967296) {
                                t.setUint8(i, 198);
                                t.setUint32(i + 1, a);
                                new Uint8Array(t.buffer).set(new Uint8Array(e), i + 5);
                                return 5 + a
                            }
                        }
                        if ("number" === s) {
                            if (Math.floor(e) !== e) {
                                t.setUint8(i, 203);
                                t.setFloat64(i + 1, e);
                                return 9
                            }
                            if (e >= 0) {
                                if (e < 128) {
                                    t.setUint8(i, e);
                                    return 1
                                }
                                if (e < 256) {
                                    t.setUint8(i, 204);
                                    t.setUint8(i + 1, e);
                                    return 2
                                }
                                if (e < 65536) {
                                    t.setUint8(i, 205);
                                    t.setUint16(i + 1, e);
                                    return 3
                                }
                                if (e < 4294967296) {
                                    t.setUint8(i, 206);
                                    t.setUint32(i + 1, e);
                                    return 5
                                }
                                if (e < 0x10000000000000000) {
                                    t.setUint8(i, 207);
                                    l(t, i + 1, e);
                                    return 9
                                }
                                throw new Error("Number too big 0x" + e.toString(16))
                            }
                            if (e >= -32) {
                                t.setInt8(i, e);
                                return 1
                            }
                            if (e >= -128) {
                                t.setUint8(i, 208);
                                t.setInt8(i + 1, e);
                                return 2
                            }
                            if (e >= -32768) {
                                t.setUint8(i, 209);
                                t.setInt16(i + 1, e);
                                return 3
                            }
                            if (e >= -2147483648) {
                                t.setUint8(i, 210);
                                t.setInt32(i + 1, e);
                                return 5
                            }
                            if (e >= -0x8000000000000000) {
                                t.setUint8(i, 211);
                                u(t, i + 1, e);
                                return 9
                            }
                            throw new Error("Number too small -0x" + (-e).toString(16).substr(1))
                        }
                        if ("undefined" === s) {
                            if (o) return 0;
                            t.setUint8(i, 212);
                            t.setUint8(i + 1, 0);
                            t.setUint8(i + 2, 0);
                            return 3
                        }
                        if (null === e) {
                            if (o) return 0;
                            t.setUint8(i, 192);
                            return 1
                        }
                        if ("boolean" === s) {
                            t.setUint8(i, e ? 195 : 194);
                            return 1
                        }
                        if ("function" == typeof e.toJSON) return d(e.toJSON(), t, i, o);
                        if ("object" === s) {
                            var a, c = 0,
                                h = Array.isArray(e);
                            if (h) a = e.length;
                            else {
                                var p = f(e, o);
                                a = p.length
                            }
                            if (a < 16) {
                                t.setUint8(i, a | (h ? 144 : 128));
                                c = 1
                            } else if (a < 65536) {
                                t.setUint8(i, h ? 220 : 222);
                                t.setUint16(i + 1, a);
                                c = 3
                            } else if (a < 4294967296) {
                                t.setUint8(i, h ? 221 : 223);
                                t.setUint32(i + 1, a);
                                c = 5
                            }
                            if (h)
                                for (var g = 0; g < a; g++) c += d(e[g], t, i + c, o);
                            else
                                for (g = 0; g < a; g++) {
                                    var m = p[g];
                                    c += d(m, t, i + c);
                                    c += d(e[m], t, i + c, o)
                                }
                            return c
                        }
                        if ("function" === s) return 0;
                        throw new Error("Unknown type " + s)
                    }

                    function g(e, t) {
                        var n = typeof e;
                        if ("string" === n) {
                            if ((i = r(e)) < 32) return 1 + i;
                            if (i < 256) return 2 + i;
                            if (i < 65536) return 3 + i;
                            if (i < 4294967296) return 5 + i
                        }
                        ArrayBuffer.isView && ArrayBuffer.isView(e) && (e = e.buffer);
                        if (e instanceof ArrayBuffer) {
                            if ((i = e.byteLength) < 256) return 2 + i;
                            if (i < 65536) return 3 + i;
                            if (i < 4294967296) return 5 + i
                        }
                        if ("number" === n) {
                            if (Math.floor(e) !== e) return 9;
                            if (e >= 0) {
                                if (e < 128) return 1;
                                if (e < 256) return 2;
                                if (e < 65536) return 3;
                                if (e < 4294967296) return 5;
                                if (e < 0x10000000000000000) return 9;
                                throw new Error("Number too big 0x" + e.toString(16))
                            }
                            if (e >= -32) return 1;
                            if (e >= -128) return 2;
                            if (e >= -32768) return 3;
                            if (e >= -2147483648) return 5;
                            if (e >= -0x8000000000000000) return 9;
                            throw new Error("Number too small -0x" + e.toString(16).substr(1))
                        }
                        if ("boolean" === n) return 1;
                        if (null === e) return t ? 0 : 1;
                        if (void 0 === e) return t ? 0 : 3;
                        if ("function" == typeof e.toJSON) return g(e.toJSON(), t);
                        if ("object" === n) {
                            var i, o = 0;
                            if (Array.isArray(e)) {
                                i = e.length;
                                for (var s = 0; s < i; s++) o += g(e[s], t)
                            } else {
                                var a = f(e, t);
                                i = a.length;
                                for (s = 0; s < i; s++) {
                                    var c = a[s];
                                    o += g(c) + g(e[c], t)
                                }
                            }
                            if (i < 16) return 1 + o;
                            if (i < 65536) return 3 + o;
                            if (i < 4294967296) return 5 + o;
                            throw new Error("Array or object too long 0x" + i.toString(16))
                        }
                        if ("function" === n) return 0;
                        throw new Error("Unknown type " + n)
                    }
                    return e
                }();
            "undefined" == typeof Window && "undefined" == typeof WorkerGlobalScope && console.log("Warning: this distribution of Ably is intended for browsers. On nodejs, please use the 'ably' package on npm");

            function h() {
                var e = a.location;
                return !a.WebSocket || !e || !e.origin || e.origin.indexOf("http") > -1
            }
            var p = a.navigator && a.navigator.userAgent.toString(),
                f = {
                    libver: "js-web",
                    logTimestamps: !0,
                    userAgent: p,
                    currentUrl: a.location && a.location.href,
                    noUpgrade: p && p.match(/MSIE\s8\.0/),
                    binaryType: "arraybuffer",
                    WebSocket: a.WebSocket || a.MozWebSocket,
                    xhrSupported: a.XMLHttpRequest && "withCredentials" in new XMLHttpRequest,
                    jsonpSupported: "undefined" != typeof document,
                    allowComet: h(),
                    streamingSupported: !0,
                    useProtocolHeartbeats: !0,
                    createHmac: null,
                    msgpack: l,
                    supportsBinary: !!a.TextDecoder,
                    preferBinary: !1,
                    ArrayBuffer: a.ArrayBuffer,
                    atob: a.atob,
                    nextTick: function(e) {
                        setTimeout(e, 0)
                    },
                    addEventListener: a.addEventListener,
                    inspect: JSON.stringify,
                    stringByteSize: function(e) {
                        return a.TextDecoder && (new a.TextEncoder).encode(e).length || e.length
                    },
                    TextEncoder: a.TextEncoder,
                    TextDecoder: a.TextDecoder,
                    Promise: a.Promise,
                    getRandomValues: function(e) {
                        if (void 0 !== e) return function(t, n) {
                            e.getRandomValues(t);
                            n && n(null)
                        }
                    }(a.crypto || a.msCrypto)
                },
                d = function() {
                    var e, t = "aes",
                        n = 256,
                        i = "cbc",
                        r = 16,
                        o = 4,
                        s = 4294967296,
                        a = 2147483648,
                        u = c.lib.WordArray;
                    if (f.getRandomWordArray) e = f.getRandomWordArray;
                    else if ("undefined" != typeof Uint32Array && f.getRandomValues) {
                        var l = new Uint32Array(o);
                        e = function(e, t) {
                            var n = e / 4,
                                i = n == o ? l : new Uint32Array(n);
                            f.getRandomValues(i, (function(e) {
                                t(e, y.toWordArray(i))
                            }))
                        }
                    } else e = function(e, t) {
                        w.logAction(w.LOG_MAJOR, "Ably.Crypto.generateRandom()", "Warning: the browser you are using does not support secure cryptographically secure randomness generation; falling back to insecure Math.random()");
                        for (var n = e / 4, i = new Array(n), r = 0; r < n; r++) i[r] = Math.floor(Math.random() * s) - a;
                        t(null, u.create(i))
                    };

                    function h(e) {
                        return e + r & -r
                    }

                    function p(e) {
                        if ("aes" === e.algorithm && "cbc" === e.mode) {
                            if (128 === e.keyLength || 256 === e.keyLength) return;
                            throw new Error("Unsupported key length " + e.keyLength + " for aes-cbc encryption. Encryption key must be 128 or 256 bits (16 or 32 ASCII characters)")
                        }
                    }

                    function d(e) {
                        return e.replace("_", "/").replace("-", "+")
                    }
                    u.create([0, 0, 0, 0]);
                    var g = [u.create([269488144, 269488144, 269488144, 269488144], 16), u.create([16777216], 1), u.create([33685504], 2), u.create([50529024], 3), u.create([67372036], 4), u.create([84215045, 83886080], 5), u.create([101058054, 101056512], 6), u.create([117901063, 117901056], 7), u.create([134744072, 134744072], 8), u.create([151587081, 151587081, 150994944], 9), u.create([168430090, 168430090, 168427520], 10), u.create([185273099, 185273099, 185273088], 11), u.create([202116108, 202116108, 202116108], 12), u.create([218959117, 218959117, 218959117, 218103808], 13), u.create([235802126, 235802126, 235802126, 235798528], 14), u.create([252645135, 252645135, 252645135, 252645135], 15), u.create([269488144, 269488144, 269488144, 269488144], 16)];

                    function m() {}

                    function v() {
                        this.algorithm = null;
                        this.keyLength = null;
                        this.mode = null;
                        this.key = null
                    }
                    m.CipherParams = v;
                    m.getDefaultParams = function(e) {
                        var n;
                        if ("function" != typeof e && "string" != typeof e) {
                            if (!e.key) throw new Error("Crypto.getDefaultParams: a key is required");
                            n = "string" == typeof e.key ? c.enc.Base64.parse(d(e.key)) : y.toWordArray(e.key);
                            var r = new v;
                            r.key = n;
                            r.algorithm = e.algorithm || t;
                            r.keyLength = 32 * n.words.length;
                            r.mode = e.mode || i;
                            if (e.keyLength && e.keyLength !== r.keyLength) throw new Error("Crypto.getDefaultParams: a keyLength of " + e.keyLength + " was specified, but the key actually has length " + r.keyLength);
                            p(r);
                            return r
                        }
                        w.deprecated("Crypto.getDefaultParams(key, callback)", "Crypto.getDefaultParams({key: key})");
                        if ("function" == typeof e) m.generateRandomKey((function(t) {
                            e(null, m.getDefaultParams({
                                key: t
                            }))
                        }));
                        else {
                            if ("function" != typeof arguments[1]) throw new Error("Invalid arguments for Crypto.getDefaultParams");
                            arguments[1](null, m.getDefaultParams({
                                key: e
                            }))
                        }
                    };
                    m.generateRandomKey = function(t, i) {
                        if (1 == arguments.length && "function" == typeof t) {
                            i = t;
                            t = void 0
                        }
                        e((t || n) / 8, i)
                    };
                    m.getCipher = function(e) {
                        var t = e instanceof v ? e : m.getDefaultParams(e);
                        return {
                            cipherParams: t,
                            cipher: new b(t, o, e.iv)
                        }
                    };

                    function b(e, t, n) {
                        this.algorithm = e.algorithm + "-" + String(e.keyLength) + "-" + e.mode;
                        this.cjsAlgorithm = e.algorithm.toUpperCase().replace(/-\d+$/, "");
                        this.key = y.toWordArray(e.key);
                        n && (this.iv = y.toWordArray(n).clone());
                        this.blockLengthWords = t
                    }
                    b.prototype.encrypt = function(t, n) {
                        w.logAction(w.LOG_MICRO, "CBCCipher.encrypt()", "");
                        var i = (t = y.toWordArray(t)).sigBytes,
                            o = h(i),
                            s = this,
                            a = function() {
                                s.getIv((function(e, r) {
                                    if (e) n(e);
                                    else {
                                        var a = s.encryptCipher.process(t.concat(g[o - i])),
                                            c = r.concat(a);
                                        n(null, c)
                                    }
                                }))
                            };
                        if (this.encryptCipher) a();
                        else if (this.iv) {
                            this.encryptCipher = c.algo[this.cjsAlgorithm].createEncryptor(this.key, {
                                iv: this.iv
                            });
                            a()
                        } else e(r, (function(e, t) {
                            if (e) n(e);
                            else {
                                s.encryptCipher = c.algo[s.cjsAlgorithm].createEncryptor(s.key, {
                                    iv: t
                                });
                                s.iv = t;
                                a()
                            }
                        }))
                    };
                    b.prototype.decrypt = function(e) {
                        w.logAction(w.LOG_MICRO, "CBCCipher.decrypt()", "");
                        e = y.toWordArray(e);
                        var t = this.blockLengthWords,
                            n = e.words,
                            i = u.create(n.slice(0, t)),
                            r = u.create(n.slice(t)),
                            o = c.algo[this.cjsAlgorithm].createDecryptor(this.key, {
                                iv: i
                            }),
                            s = o.process(r),
                            a = o.finalize();
                        o.reset();
                        a && a.sigBytes && s.concat(a);
                        return s
                    };
                    b.prototype.getIv = function(t) {
                        if (this.iv) {
                            var n = this.iv;
                            this.iv = null;
                            t(null, n)
                        } else {
                            var i = this;
                            e(r, (function(e, n) {
                                e ? t(e) : t(null, i.encryptCipher.process(n))
                            }))
                        }
                    };
                    return m
                }(),
                g = function() {
                    var e, t, n = "ablyjs-storage-test";
                    try {
                        a.sessionStorage.setItem(n, n);
                        a.sessionStorage.removeItem(n);
                        e = !0
                    } catch (t) {
                        e = !1
                    }
                    try {
                        a.localStorage.setItem(n, n);
                        a.localStorage.removeItem(n);
                        t = !0
                    } catch (e) {
                        t = !1
                    }

                    function i() {}

                    function r(e) {
                        return e ? a.sessionStorage : a.localStorage
                    }

                    function o(e, t, n, i) {
                        var o = {
                            value: t
                        };
                        n && (o.expires = v.now() + n);
                        return r(i).setItem(e, JSON.stringify(o))
                    }

                    function s(e, t) {
                        var n = r(t).getItem(e);
                        if (!n) return null;
                        var i = JSON.parse(n);
                        if (i.expires && i.expires < v.now()) {
                            r(t).removeItem(e);
                            return null
                        }
                        return i.value
                    }

                    function c(e, t) {
                        return r(t).removeItem(e)
                    }
                    if (t) {
                        i.set = function(e, t, n) {
                            return o(e, t, n, !1)
                        };
                        i.get = function(e) {
                            return s(e, !1)
                        };
                        i.remove = function(e) {
                            return c(e, !1)
                        }
                    }
                    if (e) {
                        i.setSession = function(e, t, n) {
                            return o(e, t, n, !0)
                        };
                        i.getSession = function(e) {
                            return s(e, !0)
                        };
                        i.removeSession = function(e) {
                            return c(e, !0)
                        }
                    }
                    return i
                }(),
                m = {
                    internetUpUrl: "https://internet-up.ably-realtime.com/is-the-internet-up.txt",
                    jsonpInternetUpUrl: "https://internet-up.ably-realtime.com/is-the-internet-up-0-9.js",
                    defaultTransports: ["xhr_polling", "xhr_streaming", "jsonp", "web_socket"],
                    baseTransportOrder: ["xhr_polling", "xhr_streaming", "jsonp", "web_socket"],
                    transportPreferenceOrder: ["jsonp", "xhr_polling", "xhr_streaming", "web_socket"],
                    upgradeTransports: ["xhr_streaming", "web_socket"]
                };
            f.noUpgrade && (m.upgradeTransports = []);
            var y = function() {
                    var e = c.lib.WordArray,
                        t = f.ArrayBuffer,
                        n = f.atob,
                        i = f.TextEncoder,
                        r = f.TextDecoder,
                        o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
                        s = "0123456789abcdef";

                    function a(e) {
                        return null != e && void 0 !== e.sigBytes
                    }

                    function u(e) {
                        return null != e && e.constructor === t
                    }

                    function l(e) {
                        return t && t.isView && t.isView(e)
                    }

                    function h(e) {
                        for (var t, n, i, r, s = "", a = o, c = e.byteLength, u = c % 3, l = c - u, h = 0; h < l; h += 3) {
                            t = (258048 & (r = e[h] << 16 | e[h + 1] << 8 | e[h + 2])) >> 12;
                            n = (4032 & r) >> 6;
                            i = 63 & r;
                            s += a[(16515072 & r) >> 18] + a[t] + a[n] + a[i]
                        }
                        if (1 == u) {
                            t = (3 & (r = e[l])) << 4;
                            s += a[(252 & r) >> 2] + a[t] + "=="
                        } else if (2 == u) {
                            t = (1008 & (r = e[l] << 8 | e[l + 1])) >> 4;
                            n = (15 & r) << 2;
                            s += a[(64512 & r) >> 10] + a[t] + a[n] + "="
                        }
                        return s
                    }

                    function p(e) {
                        for (var t = n(e), i = t.length, r = new Uint8Array(i), o = 0; o < i; o++) {
                            var s = t.charCodeAt(o);
                            r[o] = s
                        }
                        return r.buffer
                    }

                    function d() {}
                    d.base64CharSet = o;
                    d.hexCharSet = s;
                    var g = d.isBuffer = function(e) {
                            return u(e) || a(e) || l(e)
                        },
                        m = d.toBuffer = function(e) {
                            if (!t) throw new Error("Can't convert to Buffer: browser does not support the necessary types");
                            if (u(e)) return new Uint8Array(e);
                            if (l(e)) return new Uint8Array(e.buffer);
                            if (a(e)) {
                                for (var n = new t(e.sigBytes), i = new Uint8Array(n), r = 0; r < e.sigBytes; r++) i[r] = e.words[r >>> 2] >>> 24 - r % 4 * 8 & 255;
                                return i
                            }
                            throw new Error("BufferUtils.toBuffer expected an arraybuffer, typed array, or CryptoJS wordarray")
                        };
                    d.toArrayBuffer = function(e) {
                        return u(e) ? e : m(e).buffer
                    };
                    d.toWordArray = function(t) {
                        l(t) && (t = t.buffer);
                        return a(t) ? t : e.create(t)
                    };
                    d.base64Encode = function(e) {
                        return a(e) ? c.enc.Base64.stringify(e) : h(m(e))
                    };
                    d.base64Decode = function(e) {
                        return t && n ? p(e) : c.enc.Base64.parse(e)
                    };
                    d.hexEncode = function(e) {
                        e = d.toWordArray(e);
                        return c.enc.Hex.stringify(e)
                    };
                    d.hexDecode = function(e) {
                        var n = c.enc.Hex.parse(e);
                        return t ? d.toArrayBuffer(n) : n
                    };
                    d.utf8Encode = function(e) {
                        return i ? (new i).encode(e).buffer : c.enc.Utf8.parse(e)
                    };
                    d.utf8Decode = function(e) {
                        if (!g(e)) throw new Error("Expected input of utf8decode to be an arraybuffer, typed array, or CryptoJS wordarray");
                        if (r && !a(e)) return (new r).decode(e);
                        e = d.toWordArray(e);
                        return c.enc.Utf8.stringify(e)
                    };
                    d.bufferCompare = function(e, t) {
                        if (!e) return -1;
                        if (!t) return 1;
                        e = d.toWordArray(e);
                        t = d.toWordArray(t);
                        e.clamp();
                        t.clamp();
                        var n = e.sigBytes - t.sigBytes;
                        if (0 != n) return n;
                        e = e.words;
                        t = t.words;
                        for (var i = 0; i < e.length; i++)
                            if (0 != (n = e[i] - t[i])) return n;
                        return 0
                    };
                    d.byteLength = function(e) {
                        return u(e) || l(e) ? e.byteLength : a(e) ? e.sigBytes : void 0
                    };
                    return d
                }(),
                v = function() {
                    var e = f.msgpack;

                    function t() {}

                    function n(e) {
                        return Math.floor(Math.random() * e.length)
                    }
                    t.mixin = function(e) {
                        for (var t = 1; t < arguments.length; t++) {
                            var n = arguments[t];
                            if (!n) break;
                            var i = n.hasOwnProperty;
                            for (var r in n) i && !i.call(n, r) || (e[r] = n[r])
                        }
                        return e
                    };
                    t.copy = function(e) {
                        return t.mixin({}, e)
                    };
                    t.isArray = Array.isArray || function(e) {
                        return "[object Array]" == Object.prototype.toString.call(e)
                    };
                    t.ensureArray = function(e) {
                        return t.isEmptyArg(e) ? [] : t.isArray(e) ? e : [e]
                    };
                    t.isObject = function(e) {
                        return "[object Object]" == Object.prototype.toString.call(e)
                    };
                    t.isEmpty = function(e) {
                        for (var t in e) return !1;
                        return !0
                    };
                    t.isOnlyPropIn = function(e, t) {
                        for (var n in e)
                            if (n !== t) return !1;
                        return !0
                    };
                    t.isEmptyArg = function(e) {
                        return null == e
                    };
                    t.shallowClone = function(e) {
                        var t = new Object;
                        for (var n in e) t[n] = e[n];
                        return t
                    };
                    t.prototypicalClone = function(e, n) {
                        function i() {}
                        i.prototype = e;
                        var r = new i;
                        n && t.mixin(r, n);
                        return r
                    };
                    t.inherits = f.inherits || function(e, n) {
                        e.super_ = n;
                        e.prototype = t.prototypicalClone(n.prototype, {
                            constructor: e
                        })
                    };
                    t.containsValue = function(e, t) {
                        for (var n in e)
                            if (e[n] == t) return !0;
                        return !1
                    };
                    t.intersect = function(e, n) {
                        return t.isArray(n) ? t.arrIntersect(e, n) : t.arrIntersectOb(e, n)
                    };
                    t.arrIntersect = function(e, n) {
                        for (var i = [], r = 0; r < e.length; r++) {
                            var o = e[r]; - 1 != t.arrIndexOf(n, o) && i.push(o)
                        }
                        return i
                    };
                    t.arrIntersectOb = function(e, t) {
                        for (var n = [], i = 0; i < e.length; i++) {
                            var r = e[i];
                            r in t && n.push(r)
                        }
                        return n
                    };
                    t.arrSubtract = function(e, n) {
                        for (var i = [], r = 0; r < e.length; r++) {
                            var o = e[r]; - 1 == t.arrIndexOf(n, o) && i.push(o)
                        }
                        return i
                    };
                    t.arrIndexOf = Array.prototype.indexOf ? function(e, t, n) {
                        return e.indexOf(t, n)
                    } : function(e, t, n) {
                        n = n || 0;
                        for (var i = e.length; n < i; n++)
                            if (e[n] === t) return n;
                        return -1
                    };
                    t.arrIn = function(e, n) {
                        return -1 !== t.arrIndexOf(e, n)
                    };
                    t.arrDeleteValue = function(e, n) {
                        var i = t.arrIndexOf(e, n),
                            r = -1 != i;
                        r && e.splice(i, 1);
                        return r
                    };
                    t.arrWithoutValue = function(e, n) {
                        var i = e.slice();
                        t.arrDeleteValue(i, n);
                        return i
                    };
                    t.keysArray = function(e, t) {
                        var n = [];
                        for (var i in e) t && !e.hasOwnProperty(i) || n.push(i);
                        return n
                    };
                    t.valuesArray = function(e, t) {
                        var n = [];
                        for (var i in e) t && !e.hasOwnProperty(i) || n.push(e[i]);
                        return n
                    };
                    t.arrForEach = Array.prototype.forEach ? function(e, t) {
                        e.forEach(t)
                    } : function(e, t) {
                        for (var n = e.length, i = 0; i < n; i++) t(e[i], i, e)
                    };
                    t.safeArrForEach = function(e, n) {
                        return t.arrForEach(e.slice(), n)
                    };
                    t.arrMap = Array.prototype.map ? function(e, t) {
                        return e.map(t)
                    } : function(e, t) {
                        for (var n = [], i = e.length, r = 0; r < i; r++) n.push(t(e[r], r, e));
                        return n
                    };
                    t.arrFilter = Array.prototype.filter ? function(e, t) {
                        return e.filter(t)
                    } : function(e, t) {
                        for (var n = [], i = e.length, r = 0; r < i; r++) t(e[r]) && n.push(e[r]);
                        return n
                    };
                    t.arrEvery = Array.prototype.every ? function(e, t) {
                        return e.every(t)
                    } : function(e, t) {
                        for (var n = e.length, i = 0; i < n; i++)
                            if (!t(e[i], i, e)) return !1;
                        return !0
                    };
                    t.allSame = function(e, n) {
                        if (0 === e.length) return !0;
                        var i = e[0][n];
                        return t.arrEvery(e, (function(e) {
                            return e[n] === i
                        }))
                    };
                    t.nextTick = f.nextTick;
                    var i = {
                        json: "application/json",
                        jsonp: "application/javascript",
                        xml: "application/xml",
                        html: "text/html",
                        msgpack: "application/x-msgpack"
                    };
                    t.defaultGetHeaders = function(e) {
                        return {
                            accept: i[e || "json"],
                            "X-Ably-Version": m.apiVersion,
                            "X-Ably-Lib": m.libstring
                        }
                    };
                    t.defaultPostHeaders = function(e) {
                        var t;
                        return {
                            accept: t = i[e || "json"],
                            "content-type": t,
                            "X-Ably-Version": m.apiVersion,
                            "X-Ably-Lib": m.libstring
                        }
                    };
                    t.arrPopRandomElement = function(e) {
                        return e.splice(n(e), 1)[0]
                    };
                    t.toQueryString = function(e) {
                        var t = [];
                        if (e)
                            for (var n in e) t.push(encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
                        return t.length ? "?" + t.join("&") : ""
                    };
                    t.parseQueryString = function(e) {
                        for (var t, n = /([^?&=]+)=?([^&]*)/g, i = {}; t = n.exec(e);) i[decodeURIComponent(t[1])] = decodeURIComponent(t[2]);
                        return i
                    };
                    t.now = Date.now || function() {
                        return (new Date).getTime()
                    };
                    t.inspect = f.inspect;
                    t.isErrorInfo = function(e) {
                        return "ErrorInfo" == e.constructor.name
                    };
                    t.inspectError = function(e) {
                        return e && (t.isErrorInfo(e) || "Error" == e.constructor.name || e instanceof Error) ? e.toString() : t.inspect(e)
                    };
                    t.inspectBody = function(e) {
                        return y.isBuffer(e) ? e.toString() : "string" == typeof e ? e : f.inspect(e)
                    };
                    t.dataSizeBytes = function(e) {
                        if (y.isBuffer(e)) return y.byteLength(e);
                        if ("string" == typeof e) return f.stringByteSize(e);
                        throw new Error("Expected input of Utils.dataSizeBytes to be a buffer or string, but was: " + typeof e)
                    };
                    t.cheapRandStr = function() {
                        return String(Math.random()).substr(2)
                    };
                    t.randomString = f.getRandomValues && "undefined" != typeof Uint8Array ? function(e) {
                        var t = new Uint8Array(e);
                        f.getRandomValues(t);
                        return y.base64Encode(t)
                    } : function(e) {
                        for (var t = y.base64CharSet, i = Math.round(4 * e / 3), r = "", o = 0; o < i; o++) r += t[n(t)];
                        return r
                    };
                    t.randomHexString = f.getRandomValues && "undefined" != typeof Uint8Array ? function(e) {
                        var t = new Uint8Array(e);
                        f.getRandomValues(t);
                        return y.hexEncode(t)
                    } : function(e) {
                        for (var t = y.hexCharSet, i = 2 * e, r = "", o = 0; o < i; o++) r += t[n(t)];
                        return r
                    };
                    t.arrChooseN = function(e, n) {
                        for (var i = Math.min(n, e.length), r = e.slice(), o = [], s = 0; s < i; s++) o.push(t.arrPopRandomElement(r));
                        return o
                    };
                    t.trim = String.prototype.trim ? function(e) {
                        return e.trim()
                    } : function(e) {
                        return e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "")
                    };
                    t.promisify = function(e, t, n) {
                        return new Promise((function(i, r) {
                            e[t].apply(e, Array.prototype.slice.call(n).concat((function(e, t) {
                                e ? r(e) : i(t)
                            })))
                        }))
                    };
                    t.decodeBody = function(t, n) {
                        return "msgpack" == n ? e.decode(t) : JSON.parse(String(t))
                    };
                    t.encodeBody = function(t, n) {
                        return "msgpack" == n ? e.encode(t, !0) : JSON.stringify(t)
                    };
                    return t
                }(),
                b = function() {
                    var e = function() {};

                    function t() {}
                    var n = Date.now || function() {
                        return (new Date).getTime()
                    };

                    function i(e) {
                        var t = e.statusCode;
                        return 408 === t && !e.code || 400 === t && !e.code || t >= 500 && t <= 504
                    }

                    function r(e) {
                        var t = e.connection,
                            n = t && t.connectionManager.host;
                        return n ? [n].concat(m.getFallbackHosts(e.options)) : m.getHosts(e.options)
                    }
                    t._getHosts = r;
                    t.methods = ["get", "delete", "post", "put", "patch"];
                    t.methodsWithoutBody = ["get", "delete"];
                    t.methodsWithBody = v.arrSubtract(t.methods, t.methodsWithoutBody);
                    v.arrForEach(t.methodsWithoutBody, (function(e) {
                        t[e] = function(n, i, r, o, s) {
                            t.do(e, n, i, r, null, o, s)
                        };
                        t[e + "Uri"] = function(n, i, r, o, s) {
                            t.doUri(e, n, i, r, null, o, s)
                        }
                    }));
                    v.arrForEach(t.methodsWithBody, (function(e) {
                        t[e] = function(n, i, r, o, s, a) {
                            t.do(e, n, i, r, o, s, a)
                        };
                        t[e + "Uri"] = function(n, i, r, o, s, a) {
                            t.doUri(e, n, i, r, o, s, a)
                        }
                    }));
                    t.do = function(o, s, a, c, u, l, h) {
                        h = h || e;
                        var p = "function" == typeof a ? a : function(e) {
                                return s.baseUri(e) + a
                            },
                            f = (c && c.accept, arguments),
                            d = s._currentFallback;
                        if (d) {
                            if (d.validUntil > n()) {
                                t.Request(o, s, p(d.host), c, l, u, (function(e) {
                                    if (e && i(e)) {
                                        s._currentFallback = null;
                                        t.do.apply(t, f)
                                    } else h.apply(null, arguments)
                                }));
                                return
                            }
                            s._currentFallback = null
                        }
                        var g = r(s);
                        if (1 != g.length) {
                            var m = function(e, r) {
                                var a = e.shift();
                                t.doUri(o, s, p(a), c, u, l, (function(t) {
                                    if (t && i(t) && e.length) m(e, !0);
                                    else {
                                        r && (s._currentFallback = {
                                            host: a,
                                            validUntil: n() + s.options.timeouts.fallbackRetryTimeout
                                        });
                                        h.apply(null, arguments)
                                    }
                                }))
                            };
                            m(g)
                        } else t.doUri(o, s, p(g[0]), c, u, l, h)
                    };
                    t.doUri = function(e, n, i, r, o, s, a) {
                        t.Request(e, n, i, r, s, o, a)
                    };
                    t.supportsAuthHeaders = !1;
                    t.supportsLinkHeaders = !1;
                    return t
                }(),
                O = function() {
                    function e() {
                        this.buffer = []
                    }
                    e.prototype.append = function(e) {
                        this.buffer.push(e);
                        return this
                    };
                    e.prototype.toString = function() {
                        return this.buffer.join("")
                    };
                    var t = {
                        codex: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                        encode: function(i) {
                            for (var r = new e, o = t.codex, s = new n(i); s.moveNext();) {
                                var a = s.current;
                                s.moveNext();
                                var c = s.current;
                                s.moveNext();
                                var u = s.current,
                                    l = a >> 2,
                                    h = (3 & a) << 4 | c >> 4,
                                    p = (15 & c) << 2 | u >> 6,
                                    f = 63 & u;
                                isNaN(c) ? p = f = 64 : isNaN(u) && (f = 64);
                                r.append(o.charAt(l) + o.charAt(h) + o.charAt(p) + o.charAt(f))
                            }
                            return r.toString()
                        },
                        decode: function(t) {
                            for (var n = new e, r = new i(t); r.moveNext();) {
                                var o = r.current;
                                if (o < 128) n.append(String.fromCharCode(o));
                                else if (o > 191 && o < 224) {
                                    r.moveNext();
                                    var s = r.current;
                                    n.append(String.fromCharCode((31 & o) << 6 | 63 & s))
                                } else {
                                    r.moveNext();
                                    s = r.current;
                                    r.moveNext();
                                    var a = r.current;
                                    n.append(String.fromCharCode((15 & o) << 12 | (63 & s) << 6 | 63 & a))
                                }
                            }
                            return n.toString()
                        }
                    };

                    function n(e) {
                        this._input = e;
                        this._index = -1;
                        this._buffer = []
                    }
                    n.prototype = {
                        current: Number.NaN,
                        moveNext: function() {
                            if (this._buffer.length > 0) {
                                this.current = this._buffer.shift();
                                return !0
                            }
                            if (this._index >= this._input.length - 1) {
                                this.current = Number.NaN;
                                return !1
                            }
                            var e = this._input.charCodeAt(++this._index);
                            if (13 == e && 10 == this._input.charCodeAt(this._index + 1)) {
                                e = 10;
                                this._index += 2
                            }
                            if (e < 128) this.current = e;
                            else if (e > 127 && e < 2048) {
                                this.current = e >> 6 | 192;
                                this._buffer.push(63 & e | 128)
                            } else {
                                this.current = e >> 12 | 224;
                                this._buffer.push(e >> 6 & 63 | 128);
                                this._buffer.push(63 & e | 128)
                            }
                            return !0
                        }
                    };

                    function i(e) {
                        this._input = e;
                        this._index = -1;
                        this._buffer = []
                    }
                    i.prototype = {
                        current: 64,
                        moveNext: function() {
                            if (this._buffer.length > 0) {
                                this.current = this._buffer.shift();
                                return !0
                            }
                            if (this._index >= this._input.length - 1) {
                                this.current = 64;
                                return !1
                            }
                            var e = t.codex.indexOf(this._input.charAt(++this._index)),
                                n = t.codex.indexOf(this._input.charAt(++this._index)),
                                i = t.codex.indexOf(this._input.charAt(++this._index)),
                                r = t.codex.indexOf(this._input.charAt(++this._index)),
                                o = e << 2 | n >> 4,
                                s = (15 & n) << 4 | i >> 2,
                                a = (3 & i) << 6 | r;
                            this.current = o;
                            64 != i && this._buffer.push(s);
                            64 != r && this._buffer.push(a);
                            return !0
                        }
                    };
                    return t
                }();
            m.ENVIRONMENT = "";
            m.REST_HOST = "rest.ably.io";
            m.REALTIME_HOST = "realtime.ably.io";
            m.FALLBACK_HOSTS = ["A.ably-realtime.com", "B.ably-realtime.com", "C.ably-realtime.com", "D.ably-realtime.com", "E.ably-realtime.com"];
            m.PORT = 80;
            m.TLS_PORT = 443;
            m.TIMEOUTS = {
                disconnectedRetryTimeout: 15e3,
                suspendedRetryTimeout: 3e4,
                httpRequestTimeout: 15e3,
                channelRetryTimeout: 15e3,
                fallbackRetryTimeout: 6e5,
                connectionStateTtl: 12e4,
                realtimeRequestTimeout: 1e4,
                recvTimeout: 9e4,
                preferenceConnectTimeout: 6e3,
                parallelUpgradeDelay: 6e3
            };
            m.httpMaxRetryCount = 3;
            m.maxMessageSize = 65536;
            m.errorReportingUrl = "https://errors.ably.io/api/15/store/";
            m.errorReportingHeaders = {
                "X-Sentry-Auth": "Sentry sentry_version=7, sentry_key=a04e33c8674c451f8a310fbec029acf5, sentry_client=ably-js/0.1",
                "Content-Type": "application/json"
            };
            m.version = "1.1.23";
            m.libstring = f.libver + "-" + m.version;
            m.apiVersion = "1.1";
            m.getHost = function(e, t, n) {
                return t = n ? t == e.restHost && e.realtimeHost || t || e.realtimeHost : t || e.restHost
            };
            m.getPort = function(e, t) {
                return t || e.tls ? e.tlsPort : e.port
            };
            m.getHttpScheme = function(e) {
                return e.tls ? "https://" : "http://"
            };
            m.getFallbackHosts = function(e) {
                var t = e.fallbackHosts,
                    n = void 0 !== e.httpMaxRetryCount ? e.httpMaxRetryCount : m.httpMaxRetryCount;
                return t ? v.arrChooseN(t, n) : []
            };
            m.getHosts = function(e) {
                return [e.restHost].concat(m.getFallbackHosts(e))
            };

            function R(e) {
                if ("string" != typeof e) throw new k("host must be a string; was a " + typeof e, 4e4, 400);
                if (!e.length) throw new k("host must not be zero-length", 4e4, 400)
            }
            m.objectifyOptions = function(e) {
                return "string" == typeof e ? -1 == e.indexOf(":") ? {
                    token: e
                } : {
                    key: e
                } : e
            };
            m.normaliseOptions = function(e) {
                if (e.host) {
                    w.deprecated("host", "restHost");
                    e.restHost = e.host
                }
                if (e.wsHost) {
                    w.deprecated("wsHost", "realtimeHost");
                    e.realtimeHost = e.wsHost
                }
                if (e.queueEvents) {
                    w.deprecated("queueEvents", "queueMessages");
                    e.queueMessages = e.queueEvents
                }
                if (!0 === e.recover) {
                    w.deprecated("{recover: true}", "{recover: function(lastConnectionDetails, cb) { cb(true); }}");
                    e.recover = function(e, t) {
                        t(!0)
                    }
                }
                if ("function" == typeof e.recover && !0 === e.closeOnUnload) {
                    w.logAction(w.LOG_ERROR, "Defaults.normaliseOptions", "closeOnUnload was true and a session recovery function was set - these are mutually exclusive, so unsetting the latter");
                    e.recover = null
                }
                "closeOnUnload" in e || (e.closeOnUnload = !e.recover);
                if (e.transports && v.arrIn(e.transports, "xhr")) {
                    w.deprecated('transports: ["xhr"]', 'transports: ["xhr_streaming"]');
                    v.arrDeleteValue(e.transports, "xhr");
                    e.transports.push("xhr_streaming")
                }
                "queueMessages" in e || (e.queueMessages = !0);
                var t = !1;
                if (e.restHost) e.realtimeHost = e.realtimeHost || e.restHost;
                else {
                    var n = e.environment && String(e.environment).toLowerCase() || m.ENVIRONMENT;
                    t = !n || "production" === n;
                    e.restHost = t ? m.REST_HOST : n + "-" + m.REST_HOST;
                    e.realtimeHost = t ? m.REALTIME_HOST : n + "-" + m.REALTIME_HOST
                }
                e.fallbackHosts = t || e.fallbackHostsUseDefault ? m.FALLBACK_HOSTS : e.fallbackHosts;
                v.arrForEach((e.fallbackHosts || []).concat(e.restHost, e.realtimeHost), R);
                e.port = e.port || m.PORT;
                e.tlsPort = e.tlsPort || m.TLS_PORT;
                e.maxMessageSize = e.maxMessageSize || m.maxMessageSize;
                "tls" in e || (e.tls = !0);
                e.timeouts = {};
                for (var i in m.TIMEOUTS) e.timeouts[i] = e[i] || m.TIMEOUTS[i];
                e.useBinaryProtocol = "useBinaryProtocol" in e ? f.supportsBinary && e.useBinaryProtocol : f.preferBinary;
                if (e.clientId) {
                    (e.headers = e.headers || {})["X-Ably-ClientId"] = y.base64Encode(y.utf8Encode(e.clientId))
                }
                "idempotentRestPublishing" in e || (e.idempotentRestPublishing = !1);
                if (e.promises && !f.Promise) {
                    w.logAction(w.LOG_ERROR, "Defaults.normaliseOptions", "{promises: true} was specified, but no Promise constructor found; disabling promises");
                    e.promises = !1
                }
                return e
            };
            var A = function() {
                    function e() {
                        this.any = [];
                        this.events = {};
                        this.anyOnce = [];
                        this.eventsOnce = {}
                    }

                    function t(e, t, n) {
                        try {
                            t.apply(e, n)
                        } catch (e) {
                            w.logAction(w.LOG_ERROR, "EventEmitter.emit()", "Unexpected listener exception: " + e + "; stack = " + (e && e.stack))
                        }
                    }

                    function n(e, t, i) {
                        var r, o, s, a;
                        for (a = 0; a < e.length; a++) {
                            r = e[a];
                            i && (r = r[i]);
                            if (v.isArray(r)) {
                                for (; - 1 !== (o = v.arrIndexOf(r, t));) r.splice(o, 1);
                                i && 0 === r.length && delete e[a][i]
                            } else if (v.isObject(r))
                                for (s in r) r.hasOwnProperty(s) && v.isArray(r[s]) && n([r], t, s)
                        }
                    }
                    e.prototype.on = function(e, t) {
                        if (1 == arguments.length && "function" == typeof e) this.any.push(e);
                        else if (v.isEmptyArg(e)) this.any.push(t);
                        else if (v.isArray(e)) {
                            var n = this;
                            v.arrForEach(e, (function(e) {
                                n.on(e, t)
                            }))
                        } else {
                            (this.events[e] || (this.events[e] = [])).push(t)
                        }
                    };
                    e.prototype.off = function(e, t) {
                        if (0 == arguments.length || v.isEmptyArg(e) && v.isEmptyArg(t)) {
                            this.any = [];
                            this.events = {};
                            this.anyOnce = [];
                            this.eventsOnce = {}
                        } else {
                            if (1 == arguments.length && "function" == typeof e) {
                                t = e;
                                e = null
                            }
                            if (t && v.isEmptyArg(e)) n([this.any, this.events, this.anyOnce, this.eventsOnce], t);
                            else {
                                if (v.isArray(e)) {
                                    var i = this;
                                    v.arrForEach(e, (function(e) {
                                        i.off(e, t)
                                    }))
                                }
                                if (t) n([this.events, this.eventsOnce], t, e);
                                else {
                                    delete this.events[e];
                                    delete this.eventsOnce[e]
                                }
                            }
                        }
                    };
                    e.prototype.listeners = function(e) {
                        if (e) {
                            var t = this.events[e] || [];
                            this.eventsOnce[e] && Array.prototype.push.apply(t, this.eventsOnce[e]);
                            return t.length ? t : null
                        }
                        return this.any.length ? this.any : null
                    };
                    e.prototype.emit = function(e) {
                        var n = Array.prototype.slice.call(arguments, 1),
                            i = {
                                event: e
                            },
                            r = [];
                        if (this.anyOnce.length) {
                            Array.prototype.push.apply(r, this.anyOnce);
                            this.anyOnce = []
                        }
                        this.any.length && Array.prototype.push.apply(r, this.any);
                        var o = this.eventsOnce[e];
                        if (o) {
                            Array.prototype.push.apply(r, o);
                            delete this.eventsOnce[e]
                        }
                        var s = this.events[e];
                        s && Array.prototype.push.apply(r, s);
                        v.arrForEach(r, (function(e) {
                            t(i, e, n)
                        }))
                    };
                    e.prototype.once = function(e, t) {
                        var n = arguments.length,
                            i = this;
                        if ((0 === n || 1 === n && "function" != typeof e) && f.Promise) return new f.Promise((function(t) {
                            i.once(e, t)
                        }));
                        if (1 == arguments.length && "function" == typeof e) this.anyOnce.push(e);
                        else if (v.isEmptyArg(e)) this.anyOnce.push(t);
                        else {
                            if (v.isArray(e)) throw "Arrays of events can only be used with on(), not once()";
                            (this.eventsOnce[e] || (this.eventsOnce[e] = [])).push(t)
                        }
                    };
                    e.prototype.whenState = function(e, n, i) {
                        var r = {
                                event: e
                            },
                            o = this,
                            s = Array.prototype.slice.call(arguments, 3);
                        if ("string" != typeof e || "string" != typeof n) throw "whenState requires a valid event String argument";
                        if ("function" != typeof i && f.Promise) return new f.Promise((function(t) {
                            o.whenState.bind(o, e, n, t).apply(o, s)
                        }));
                        e === n ? t(r, i, s) : this.once(e, i)
                    };
                    return e
                }(),
                w = function() {
                    var e, t;
                    if ("undefined" == typeof Window && "undefined" == typeof WorkerGlobalScope || a.console && a.console.log && "function" == typeof a.console.log.apply) {
                        e = function() {
                            console.log.apply(console, arguments)
                        };
                        t = console.warn ? function() {
                            console.warn.apply(console, arguments)
                        } : e
                    } else e = t = a.console && a.console.log ? function() {
                        Function.prototype.apply.call(console.log, console, arguments)
                    } : function() {};

                    function n(e, t) {
                        return ("000" + e).slice(-2 - (t || 0))
                    }
                    var i = 0,
                        r = 1,
                        o = 2,
                        s = 3,
                        c = 4,
                        u = r,
                        l = c,
                        h = u;

                    function p(e) {
                        return f.logTimestamps ? function(t) {
                            var i = new Date;
                            e(n(i.getHours()) + ":" + n(i.getMinutes()) + ":" + n(i.getSeconds()) + "." + n(i.getMilliseconds(), !0) + " " + t)
                        } : e
                    }
                    var d = p(e),
                        g = p(t);

                    function m(e) {}
                    m.LOG_NONE = i, m.LOG_ERROR = r, m.LOG_MAJOR = o, m.LOG_MINOR = s, m.LOG_MICRO = c;
                    m.LOG_DEFAULT = u, m.LOG_DEBUG = l;
                    m.logAction = function(e, t, n) {
                        m.shouldLog(e) && (e === r ? g : d)("Ably: " + t + ": " + n)
                    };
                    m.deprecated = function(e, t) {
                        m.shouldLog(r) && g("Ably: Deprecation warning - '" + e + "' is deprecated and will be removed from a future version. Please use '" + t + "' instead.")
                    };
                    m.shouldLog = function(e) {
                        return e <= h
                    };
                    m.setLog = function(e, t) {
                        void 0 !== e && (h = e);
                        void 0 !== t && (d = g = t)
                    };
                    return m
                }(),
                C = function() {
                    function e(e) {
                        e = e || [];
                        var t = function() {
                            for (var t = 0; t < e.length; t++) {
                                var n = e[t];
                                if (n) try {
                                    n.apply(null, arguments)
                                } catch (e) {
                                    w.logAction(w.LOG_ERROR, "Multicaster multiple callback handler", "Unexpected exception: " + e + "; stack = " + e.stack)
                                }
                            }
                        };
                        t.push = function() {
                            Array.prototype.push.apply(e, arguments)
                        };
                        return t
                    }
                    return e
                }(),
                S = function() {
                    function e() {}
                    e.levels = ["fatal", "error", "warning", "info", "debug"];
                    e.report = function(e, t, n, i) {
                        var r = {
                            event_id: v.randomHexString(16),
                            tags: v.mixin({
                                lib: f.libver
                            }, i),
                            platform: "javascript",
                            level: e,
                            release: m.version,
                            fingerprint: n && [n],
                            message: t,
                            request: {
                                headers: {
                                    "User-Agent": f.userAgent
                                },
                                url: f.currentUrl
                            }
                        };
                        w.logAction(w.LOG_MICRO, "ErrorReporter", "POSTing to error reporter: " + t);
                        b.postUri(null, m.errorReportingUrl, m.errorReportingHeaders, JSON.stringify(r), {}, (function(e, t) {
                            w.logAction(w.LOG_MICRO, "ErrorReporter", "POSTing to error reporter resulted in: " + (e ? v.inspectError(e) : v.inspectBody(t)))
                        }))
                    };
                    return e
                }(),
                k = function() {
                    function e(e, t, n, i) {
                        this.message = e;
                        this.code = t;
                        this.statusCode = n;
                        this.cause = i;
                        this.href = void 0
                    }
                    e.prototype.toString = function() {
                        var e = "[" + this.constructor.name;
                        this.message && (e += ": " + this.message);
                        this.statusCode && (e += "; statusCode=" + this.statusCode);
                        this.code && (e += "; code=" + this.code);
                        this.cause && (e += "; cause=" + v.inspectError(this.cause));
                        !this.href || this.message && this.message.indexOf("help.ably.io") > -1 || (e += "; see " + this.href + " ");
                        return e += "]"
                    };
                    e.fromValues = function(t) {
                        var n = v.mixin(new e, t);
                        t instanceof Error && (n.message = t.message);
                        n.code && !n.href && (n.href = "https://help.ably.io/error/" + n.code);
                        return n
                    };
                    return e
                }(),
                I = function() {
                    function e() {
                        this.name = void 0;
                        this.id = void 0;
                        this.timestamp = void 0;
                        this.clientId = void 0;
                        this.connectionId = void 0;
                        this.connectionKey = void 0;
                        this.data = void 0;
                        this.encoding = void 0;
                        this.extras = void 0;
                        this.size = void 0
                    }
                    e.prototype.toJSON = function() {
                        var e = {
                                name: this.name,
                                id: this.id,
                                clientId: this.clientId,
                                connectionId: this.connectionId,
                                connectionKey: this.connectionKey,
                                encoding: this.encoding,
                                extras: this.extras
                            },
                            t = this.data;
                        if (t && y.isBuffer(t))
                            if (arguments.length > 0) {
                                var n = this.encoding;
                                e.encoding = n ? n + "/base64" : "base64";
                                t = y.base64Encode(t)
                            } else t = y.toBuffer(t);
                        e.data = t;
                        return e
                    };
                    e.prototype.toString = function() {
                        var e = "[Message";
                        this.name && (e += "; name=" + this.name);
                        this.id && (e += "; id=" + this.id);
                        this.timestamp && (e += "; timestamp=" + this.timestamp);
                        this.clientId && (e += "; clientId=" + this.clientId);
                        this.connectionId && (e += "; connectionId=" + this.connectionId);
                        this.encoding && (e += "; encoding=" + this.encoding);
                        this.extras && (e += "; extras =" + JSON.stringify(this.extras));
                        this.data && ("string" == typeof this.data ? e += "; data=" + this.data : y.isBuffer(this.data) ? e += "; data (buffer)=" + y.base64Encode(this.data) : e += "; data (json)=" + JSON.stringify(this.data));
                        this.extras && (e += "; extras=" + JSON.stringify(this.extras));
                        return e += "]"
                    };
                    e.encrypt = function(e, t, n) {
                        var i = e.data,
                            r = e.encoding,
                            o = t.channelCipher;
                        r = r ? r + "/" : "";
                        if (!y.isBuffer(i)) {
                            i = y.utf8Encode(String(i));
                            r += "utf-8/"
                        }
                        o.encrypt(i, (function(t, i) {
                            if (t) n(t);
                            else {
                                e.data = i;
                                e.encoding = r + "cipher+" + o.algorithm;
                                n(null, e)
                            }
                        }))
                    };
                    e.encode = function(t, n, i) {
                        var r, o = t.data;
                        if (!("string" == typeof o || y.isBuffer(o) || null == o)) {
                            if (!v.isObject(o) && !v.isArray(o)) throw new k("Data type is unsupported", 40013, 400);
                            t.data = JSON.stringify(o);
                            t.encoding = (r = t.encoding) ? r + "/json" : "json"
                        }
                        null != n && n.cipher ? e.encrypt(t, n, i) : i(null, t)
                    };
                    e.encodeArray = function(t, n, i) {
                        for (var r = 0, o = 0; o < t.length; o++) e.encode(t[o], n, (function(e, n) {
                            e ? i(e) : ++r == t.length && i(null, t)
                        }))
                    };
                    e.serialize = v.encodeBody;
                    e.decode = function(e, t) {
                        var n = e.encoding;
                        if (n) {
                            var i, r = n.split("/"),
                                o = r.length,
                                s = e.data;
                            try {
                                for (;
                                    (i = o) > 0;) {
                                    var a = r[--o].match(/([\-\w]+)(\+([\w\-]+))?/);
                                    if (!a) break;
                                    var c = a[1];
                                    switch (c) {
                                        case "base64":
                                            s = y.base64Decode(String(s));
                                            continue;
                                        case "utf-8":
                                            s = y.utf8Decode(s);
                                            continue;
                                        case "json":
                                            s = JSON.parse(s);
                                            continue;
                                        case "cipher":
                                            if (null != t && t.cipher) {
                                                var u = a[3],
                                                    l = t.channelCipher;
                                                if (u != l.algorithm) throw new Error("Unable to decrypt message with given cipher; incompatible cipher params");
                                                s = l.decrypt(s);
                                                continue
                                            }
                                            throw new Error("Unable to decrypt message; not an encrypted channel");
                                        default:
                                            throw new Error("Unknown encoding")
                                    }
                                    break
                                }
                            } catch (e) {
                                throw new k("Error processing the " + c + " encoding, decoder returned ‘" + e.message + "’", 40013, 400)
                            } finally {
                                e.encoding = i <= 0 ? null : r.slice(0, i).join("/");
                                e.data = s
                            }
                        }
                    };
                    e.fromResponseBody = function(t, n, i) {
                        i && (t = v.decodeBody(t, i));
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r] = e.fromValues(t[r]);
                            try {
                                e.decode(o, n)
                            } catch (e) {
                                w.logAction(w.LOG_ERROR, "Message.fromResponseBody()", e.toString())
                            }
                        }
                        return t
                    };
                    e.fromValues = function(t) {
                        return v.mixin(new e, t)
                    };
                    e.fromValuesArray = function(t) {
                        for (var n = t.length, i = new Array(n), r = 0; r < n; r++) i[r] = e.fromValues(t[r]);
                        return i
                    };

                    function t(e) {
                        if (e && e.cipher && !e.cipher.channelCipher) {
                            if (!d) throw new Error("Encryption not enabled; use ably.encryption.js instead");
                            var t = d.getCipher(e.cipher);
                            e.cipher = t.cipherParams;
                            e.channelCipher = t.cipher
                        }
                    }
                    e.fromEncoded = function(n, i) {
                        var r = e.fromValues(n);
                        t(i);
                        try {
                            e.decode(r, i)
                        } catch (e) {
                            w.logAction(w.LOG_ERROR, "Message.fromEncoded()", e.toString())
                        }
                        return r
                    };
                    e.fromEncodedArray = function(n, i) {
                        t(i);
                        return v.arrMap(n, (function(t) {
                            return e.fromEncoded(t, i)
                        }))
                    };

                    function n(e) {
                        var t = 0;
                        e.name && (t += e.name.length);
                        e.clientId && (t += e.clientId.length);
                        e.extras && (t += JSON.stringify(e.extras).length);
                        e.data && (t += v.dataSizeBytes(e.data));
                        return t
                    }
                    e.getMessagesSize = function(e) {
                        for (var t, i = 0, r = 0; r < e.length; r++) i += (t = e[r]).size || (t.size = n(t));
                        return i
                    };
                    return e
                }(),
                M = function() {
                    f.msgpack;

                    function e(e) {
                        return v.arrIndexOf(t.Actions, e)
                    }

                    function t() {
                        this.action = void 0;
                        this.id = void 0;
                        this.timestamp = void 0;
                        this.clientId = void 0;
                        this.connectionId = void 0;
                        this.data = void 0;
                        this.encoding = void 0;
                        this.size = void 0
                    }
                    t.Actions = ["absent", "present", "enter", "leave", "update"];
                    t.prototype.isSynthesized = function() {
                        return this.id.substring(this.connectionId.length, 0) !== this.connectionId
                    };
                    t.prototype.parseId = function() {
                        var e = this.id.split(":");
                        return {
                            connectionId: e[0],
                            msgSerial: parseInt(e[1], 10),
                            index: parseInt(e[2], 10)
                        }
                    };
                    t.prototype.toJSON = function() {
                        var t = {
                                clientId: this.clientId,
                                action: e(this.action),
                                encoding: this.encoding
                            },
                            n = this.data;
                        if (n && y.isBuffer(n))
                            if (arguments.length > 0) {
                                var i = this.encoding;
                                t.encoding = i ? i + "/base64" : "base64";
                                n = y.base64Encode(n)
                            } else n = y.toBuffer(n);
                        t.data = n;
                        return t
                    };
                    t.prototype.toString = function() {
                        var e = "[PresenceMessage";
                        e += "; action=" + this.action;
                        this.id && (e += "; id=" + this.id);
                        this.timestamp && (e += "; timestamp=" + this.timestamp);
                        this.clientId && (e += "; clientId=" + this.clientId);
                        this.connectionId && (e += "; connectionId=" + this.connectionId);
                        this.encoding && (e += "; encoding=" + this.encoding);
                        this.data && ("string" == typeof this.data ? e += "; data=" + this.data : y.isBuffer(this.data) ? e += "; data (buffer)=" + y.base64Encode(this.data) : e += "; data (json)=" + JSON.stringify(this.data));
                        return e += "]"
                    };
                    t.encode = I.encode;
                    t.decode = I.decode;
                    t.fromResponseBody = function(e, n, i) {
                        i && (e = v.decodeBody(e, i));
                        for (var r = 0; r < e.length; r++) {
                            var o = e[r] = t.fromValues(e[r], !0);
                            try {
                                t.decode(o, n)
                            } catch (e) {
                                w.logAction(w.LOG_ERROR, "PresenceMessage.fromResponseBody()", e.toString())
                            }
                        }
                        return e
                    };
                    t.fromValues = function(e, n) {
                        n && (e.action = t.Actions[e.action]);
                        return v.mixin(new t, e)
                    };
                    t.fromValuesArray = function(e) {
                        for (var n = e.length, i = new Array(n), r = 0; r < n; r++) i[r] = t.fromValues(e[r]);
                        return i
                    };
                    t.fromEncoded = function(e, n) {
                        var i = t.fromValues(e, !0);
                        try {
                            t.decode(i, n)
                        } catch (e) {
                            w.logAction(w.LOG_ERROR, "PresenceMessage.fromEncoded()", e.toString())
                        }
                        return i
                    };
                    t.fromEncodedArray = function(e, n) {
                        return v.arrMap(e, (function(e) {
                            return t.fromEncoded(e, n)
                        }))
                    };
                    t.getMessagesSize = I.getMessagesSize;
                    return t
                }(),
                T = function() {
                    function e() {
                        this.action = void 0;
                        this.flags = void 0;
                        this.id = void 0;
                        this.timestamp = void 0;
                        this.count = void 0;
                        this.error = void 0;
                        this.connectionId = void 0;
                        this.connectionKey = void 0;
                        this.connectionSerial = void 0;
                        this.channel = void 0;
                        this.channelSerial = void 0;
                        this.msgSerial = void 0;
                        this.messages = void 0;
                        this.presence = void 0;
                        this.auth = void 0
                    }
                    var t = e.Action = {
                        HEARTBEAT: 0,
                        ACK: 1,
                        NACK: 2,
                        CONNECT: 3,
                        CONNECTED: 4,
                        DISCONNECT: 5,
                        DISCONNECTED: 6,
                        CLOSE: 7,
                        CLOSED: 8,
                        ERROR: 9,
                        ATTACH: 10,
                        ATTACHED: 11,
                        DETACH: 12,
                        DETACHED: 13,
                        PRESENCE: 14,
                        MESSAGE: 15,
                        SYNC: 16,
                        AUTH: 17
                    };
                    e.ActionName = [];
                    v.arrForEach(v.keysArray(e.Action, !0), (function(n) {
                        e.ActionName[t[n]] = n
                    }));
                    var n = {
                            HAS_PRESENCE: 1,
                            HAS_BACKLOG: 2,
                            RESUMED: 4,
                            TRANSIENT: 16,
                            PRESENCE: 65536,
                            PUBLISH: 1 << 17,
                            SUBSCRIBE: 1 << 18,
                            PRESENCE_SUBSCRIBE: 1 << 19
                        },
                        i = v.keysArray(n);
                    n.MODE_ALL = n.PRESENCE | n.PUBLISH | n.SUBSCRIBE | n.PRESENCE_SUBSCRIBE;
                    e.prototype.hasFlag = function(e) {
                        return (this.flags & n[e]) > 0
                    };
                    e.prototype.setFlag = function(e) {
                        return this.flags = this.flags | n[e]
                    };
                    e.prototype.getMode = function() {
                        return this.flags && this.flags & n.MODE_ALL
                    };
                    e.serialize = v.encodeBody;
                    e.deserialize = function(t, n) {
                        var i = v.decodeBody(t, n);
                        return e.fromDeserialized(i)
                    };
                    e.fromDeserialized = function(t) {
                        var n = t.error;
                        n && (t.error = k.fromValues(n));
                        var i = t.messages;
                        if (i)
                            for (var r = 0; r < i.length; r++) i[r] = I.fromValues(i[r]);
                        var o = t.presence;
                        if (o)
                            for (r = 0; r < o.length; r++) o[r] = M.fromValues(o[r], !0);
                        return v.mixin(new e, t)
                    };
                    e.fromValues = function(t) {
                        return v.mixin(new e, t)
                    };

                    function r(e) {
                        var t = [];
                        if (e)
                            for (var n = 0; n < e.length; n++) t.push(e[n].toString());
                        return "[ " + t.join(", ") + " ]"
                    }
                    var o = "id channel channelSerial connectionId connectionKey connectionSerial count msgSerial timestamp".split(" ");
                    e.stringify = function(t) {
                        var n, s = "[ProtocolMessage";
                        void 0 !== t.action && (s += "; action=" + e.ActionName[t.action] || !1);
                        for (var a = 0; a < o.length; a++) {
                            n = o[a];
                            void 0 !== t[n] && (s += "; " + n + "=" + t[n])
                        }
                        t.messages && (s += "; messages=" + r(I.fromValuesArray(t.messages)));
                        t.presence && (s += "; presence=" + r(M.fromValuesArray(t.presence)));
                        t.error && (s += "; error=" + k.fromValues(t.error).toString());
                        t.auth && t.auth.accessToken && (s += "; token=" + t.auth.accessToken);
                        t.flags && (s += "; flags=" + v.arrFilter(i, (function(e) {
                            return t.hasFlag(e)
                        })).join(","));
                        return s += "]"
                    };
                    e.isDuplicate = function(e, n) {
                        return e && n && (e.action === t.MESSAGE || e.action === t.PRESENCE) && e.action === n.action && e.channel === n.channel && e.id === n.id
                    };
                    return e
                }(),
                E = function() {
                    function e(e) {
                        this.count = e && e.count || 0;
                        this.data = e && e.data || 0;
                        this.uncompressedData = e && e.uncompressedData || 0;
                        this.failed = e && e.failed || 0;
                        this.refused = e && e.refused || 0
                    }

                    function t(t) {
                        e.call(this, t);
                        this.category = void 0;
                        if (t && t.category) {
                            this.category = {};
                            for (var n in t.category) {
                                var i = t.category[n];
                                Object.prototype.hasOwnProperty.call(t.category, n) && i && (this.category[n] = new e(i))
                            }
                        }
                    }

                    function n(e) {
                        this.peak = e && e.peak || 0;
                        this.min = e && e.min || 0;
                        this.mean = e && e.mean || 0;
                        this.opened = e && e.opened || 0;
                        this.refused = e && e.refused || 0
                    }

                    function i(e) {
                        this.succeeded = e && e.succeeded || 0;
                        this.failed = e && e.failed || 0;
                        this.refused = e && e.refused || 0
                    }

                    function r(e) {
                        this.plain = new n(e && e.plain);
                        this.tls = new n(e && e.tls);
                        this.all = new n(e && e.all)
                    }

                    function o(e) {
                        this.messages = new t(e && e.messages);
                        this.presence = new t(e && e.presence);
                        this.all = new t(e && e.all)
                    }

                    function s(e) {
                        this.realtime = new o(e && e.realtime);
                        this.rest = new o(e && e.rest);
                        this.webhook = new o(e && e.webhook);
                        this.sharedQueue = new o(e && e.sharedQueue);
                        this.externalQueue = new o(e && e.externalQueue);
                        this.httpEvent = new o(e && e.httpEvent);
                        this.push = new o(e && e.push);
                        this.all = new o(e && e.all)
                    }

                    function a(e) {
                        this.all = new o(e && e.all);
                        this.inbound = new s(e && e.inbound);
                        this.outbound = new s(e && e.outbound)
                    }

                    function c(e) {
                        this.all = new o(e && e.all);
                        this.producerPaid = new a(e && e.producerPaid);
                        this.consumerPaid = new a(e && e.consumerPaid)
                    }

                    function u(e) {
                        this.messages = e && e.messages || 0;
                        var t = e && e.notifications;
                        this.notifications = {
                            invalid: t && t.invalid || 0,
                            attempted: t && t.attempted || 0,
                            successful: t && t.successful || 0,
                            failed: t && t.failed || 0
                        };
                        this.directPublishes = e && e.directPublishes || 0
                    }

                    function l(e) {
                        this.succeeded = e && e.succeeded || 0;
                        this.skipped = e && e.skipped || 0;
                        this.failed = e && e.failed || 0
                    }

                    function h(e) {
                        this.delta = void 0;
                        if (e && e.delta) {
                            this.delta = {};
                            for (var t in e.delta) {
                                var n = e.delta[t];
                                Object.prototype.hasOwnProperty.call(e.delta, t) && n && (this.delta[t] = new l(n))
                            }
                        }
                    }

                    function p(e) {
                        a.call(this, e);
                        this.persisted = new o(e && e.persisted);
                        this.connections = new r(e && e.connections);
                        this.channels = new n(e && e.channels);
                        this.apiRequests = new i(e && e.apiRequests);
                        this.tokenRequests = new i(e && e.tokenRequests);
                        this.xchgProducer = new c(e && e.xchgProducer);
                        this.xchgConsumer = new c(e && e.xchgConsumer);
                        this.push = new u(e && e.pushStats);
                        this.processed = new h(e && e.processed);
                        this.inProgress = e && e.inProgress || void 0;
                        this.unit = e && e.unit || void 0;
                        this.intervalId = e && e.intervalId || void 0
                    }
                    p.fromValues = function(e) {
                        return new p(e)
                    };
                    return p
                }(),
                _ = function() {
                    function e() {
                        this.id = void 0;
                        this.deviceSecret = void 0;
                        this.platform = void 0;
                        this.formFactor = void 0;
                        this.clientId = void 0;
                        this.metadata = void 0;
                        this.deviceIdentityToken = void 0;
                        this.push = {
                            recipient: void 0,
                            state: void 0,
                            errorReason: void 0
                        }
                    }
                    e.prototype.toJSON = function() {
                        return {
                            id: this.id,
                            deviceSecret: this.deviceSecret,
                            platform: this.platform,
                            formFactor: this.formFactor,
                            clientId: this.clientId,
                            metadata: this.metadata,
                            deviceIdentityToken: this.deviceIdentityToken,
                            push: {
                                recipient: this.push.recipient,
                                state: this.push.state,
                                errorReason: this.push.errorReason
                            }
                        }
                    };
                    e.prototype.toString = function() {
                        var e = "[DeviceDetails";
                        this.id && (e += "; id=" + this.id);
                        this.platform && (e += "; platform=" + this.platform);
                        this.formFactor && (e += "; formFactor=" + this.formFactor);
                        this.clientId && (e += "; clientId=" + this.clientId);
                        this.metadata && (e += "; metadata=" + this.metadata);
                        this.deviceIdentityToken && (e += "; deviceIdentityToken=" + JSON.stringify(this.deviceIdentityToken));
                        this.push.recipient && (e += "; push.recipient=" + JSON.stringify(this.push.recipient));
                        this.push.state && (e += "; push.state=" + this.push.state);
                        this.push.errorReason && (e += "; push.errorReason=" + this.push.errorReason);
                        this.push.metadata && (e += "; push.metadata=" + this.push.metadata);
                        return e += "]"
                    };
                    e.toRequestBody = v.encodeBody;
                    e.fromResponseBody = function(t, n) {
                        n && (t = v.decodeBody(t, n));
                        return v.isArray(t) ? e.fromValuesArray(t) : e.fromValues(t)
                    };
                    e.fromValues = function(t) {
                        return v.mixin(new e, t)
                    };
                    e.fromValuesArray = function(t) {
                        for (var n = t.length, i = new Array(n), r = 0; r < n; r++) i[r] = e.fromValues(t[r]);
                        return i
                    };
                    return e
                }(),
                P = function() {
                    function e() {
                        this.channel = void 0;
                        this.deviceId = void 0;
                        this.clientId = void 0
                    }
                    e.prototype.toJSON = function() {
                        return {
                            channel: this.channel,
                            deviceId: this.deviceId,
                            clientId: this.clientId
                        }
                    };
                    e.prototype.toString = function() {
                        var e = "[PushChannelSubscription";
                        this.channel && (e += "; channel=" + this.channel);
                        this.deviceId && (e += "; deviceId=" + this.deviceId);
                        this.clientId && (e += "; clientId=" + this.clientId);
                        return e += "]"
                    };
                    e.toRequestBody = v.encodeBody;
                    e.fromResponseBody = function(t, n) {
                        n && (t = v.decodeBody(t, n));
                        return v.isArray(t) ? e.fromValuesArray(t) : e.fromValues(t)
                    };
                    e.fromValues = function(t) {
                        return v.mixin(new e, t)
                    };
                    e.fromValuesArray = function(t) {
                        for (var n = t.length, i = new Array(n), r = 0; r < n; r++) i[r] = e.fromValues(t[r]);
                        return i
                    };
                    return e
                }(),
                x = {
                    disconnected: k.fromValues({
                        statusCode: 400,
                        code: 80003,
                        message: "Connection to server temporarily unavailable"
                    }),
                    suspended: k.fromValues({
                        statusCode: 400,
                        code: 80002,
                        message: "Connection to server unavailable"
                    }),
                    failed: k.fromValues({
                        statusCode: 400,
                        code: 8e4,
                        message: "Connection failed or disconnected by server"
                    }),
                    closing: k.fromValues({
                        statusCode: 400,
                        code: 80017,
                        message: "Connection closing"
                    }),
                    closed: k.fromValues({
                        statusCode: 400,
                        code: 80017,
                        message: "Connection closed"
                    }),
                    unknownConnectionErr: k.fromValues({
                        statusCode: 500,
                        code: 50002,
                        message: "Internal connection error"
                    }),
                    unknownChannelErr: k.fromValues({
                        statusCode: 500,
                        code: 50001,
                        message: "Internal channel error"
                    })
                },
                L = function() {
                    function e() {
                        A.call(this);
                        this.messages = []
                    }
                    v.inherits(e, A);
                    e.prototype.count = function() {
                        return this.messages.length
                    };
                    e.prototype.push = function(e) {
                        this.messages.push(e)
                    };
                    e.prototype.shift = function() {
                        return this.messages.shift()
                    };
                    e.prototype.last = function() {
                        return this.messages[this.messages.length - 1]
                    };
                    e.prototype.copyAll = function() {
                        return this.messages.slice()
                    };
                    e.prototype.append = function(e) {
                        this.messages.push.apply(this.messages, e)
                    };
                    e.prototype.prepend = function(e) {
                        this.messages.unshift.apply(this.messages, e)
                    };
                    e.prototype.completeMessages = function(e, t, n) {
                        w.logAction(w.LOG_MICRO, "MessageQueue.completeMessages()", "serial = " + e + "; count = " + t);
                        n = n || null;
                        var i = this.messages,
                            r = i[0];
                        if (r) {
                            var o = r.message.msgSerial,
                                s = e + t;
                            if (s > o)
                                for (var a = i.splice(0, s - o), c = 0; c < a.length; c++) a[c].callback(n);
                            0 == i.length && this.emit("idle")
                        }
                    };
                    e.prototype.completeAllMessages = function(e) {
                        this.completeMessages(0, Number.MAX_SAFE_INTEGER || Number.MAX_VALUE, e)
                    };
                    e.prototype.clear = function() {
                        w.logAction(w.LOG_MICRO, "MessageQueue.clear()", "clearing " + this.messages.length + " messages");
                        this.messages = [];
                        this.emit("idle")
                    };
                    return e
                }(),
                N = function() {
                    var e = T.Action;

                    function t(e) {
                        A.call(this);
                        this.transport = e;
                        this.messageQueue = new L;
                        var t = this;
                        e.on("ack", (function(e, n) {
                            t.onAck(e, n)
                        }));
                        e.on("nack", (function(e, n, i) {
                            t.onNack(e, n, i)
                        }))
                    }
                    v.inherits(t, A);
                    t.prototype.onAck = function(e, t) {
                        w.logAction(w.LOG_MICRO, "Protocol.onAck()", "serial = " + e + "; count = " + t);
                        this.messageQueue.completeMessages(e, t)
                    };
                    t.prototype.onNack = function(e, t, n) {
                        w.logAction(w.LOG_ERROR, "Protocol.onNack()", "serial = " + e + "; count = " + t + "; err = " + v.inspectError(n));
                        n || (n = new k("Unable to send message; channel not responding", 50001, 500));
                        this.messageQueue.completeMessages(e, t, n)
                    };
                    t.prototype.onceIdle = function(e) {
                        var t = this.messageQueue;
                        0 !== t.count() ? t.once("idle", e) : e()
                    };
                    t.prototype.send = function(e) {
                        e.ackRequired && this.messageQueue.push(e);
                        w.shouldLog(w.LOG_MICRO) && w.logAction(w.LOG_MICRO, "Protocol.send()", "sending msg; " + T.stringify(e.message));
                        e.sendAttempted = !0;
                        this.transport.send(e.message)
                    };
                    t.prototype.getTransport = function() {
                        return this.transport
                    };
                    t.prototype.getPendingMessages = function() {
                        return this.messageQueue.copyAll()
                    };
                    t.prototype.clearPendingMessages = function() {
                        return this.messageQueue.clear()
                    };
                    t.prototype.finish = function() {
                        var e = this.transport;
                        this.onceIdle((function() {
                            e.disconnect()
                        }))
                    };

                    function n(t, n) {
                        this.message = t;
                        this.callback = n;
                        this.merged = !1;
                        var i = t.action;
                        this.sendAttempted = !1;
                        this.ackRequired = i == e.MESSAGE || i == e.PRESENCE
                    }
                    t.PendingMessage = n;
                    return t
                }(),
                U = function() {
                    var e = !(void 0 === g || !g.get),
                        t = !(void 0 === g || !g.getSession),
                        n = T.Action,
                        i = N.PendingMessage,
                        r = function() {},
                        o = m.transportPreferenceOrder,
                        s = o[o.length - 1],
                        c = "ably-transport-preference",
                        u = "ably-connection-recovery";

                    function l() {
                        return t && g.getSession(u)
                    }

                    function h(e) {
                        return t && g.setSession(u, e)
                    }

                    function p() {
                        return t && g.removeSession(u)
                    }

                    function d(e, t) {
                        return v.arrIndexOf(o, e.shortName) > v.arrIndexOf(o, t.shortName)
                    }

                    function y(e, t, n, i) {
                        this.options = e;
                        this.host = t;
                        this.mode = n;
                        this.connectionKey = i;
                        this.format = e.useBinaryProtocol ? "msgpack" : "json";
                        this.connectionSerial = void 0;
                        this.timeSerial = void 0
                    }
                    y.prototype.getConnectParams = function(e) {
                        var t = e ? v.copy(e) : {},
                            n = this.options;
                        switch (this.mode) {
                            case "upgrade":
                                t.upgrade = this.connectionKey;
                                break;
                            case "resume":
                                t.resume = this.connectionKey;
                                void 0 !== this.timeSerial ? t.timeSerial = this.timeSerial : void 0 !== this.connectionSerial && (t.connectionSerial = this.connectionSerial);
                                break;
                            case "recover":
                                var i = n.recover.split(":");
                                if (i) {
                                    t.recover = i[0];
                                    var r = i[1];
                                    isNaN(r) ? t.timeSerial = r : t.connectionSerial = r
                                }
                        }
                        void 0 !== n.clientId && (t.clientId = n.clientId);
                        !1 === n.echoMessages && (t.echo = "false");
                        void 0 !== this.format && (t.format = this.format);
                        void 0 !== this.stream && (t.stream = this.stream);
                        void 0 !== this.heartbeats && (t.heartbeats = this.heartbeats);
                        t.v = m.apiVersion;
                        t.lib = m.libstring;
                        void 0 !== n.transportParams && v.mixin(t, n.transportParams);
                        return t
                    };
                    y.prototype.toString = function() {
                        var e = "[mode=" + this.mode;
                        this.host && (e += ",host=" + this.host);
                        this.connectionKey && (e += ",connectionKey=" + this.connectionKey);
                        void 0 !== this.connectionSerial && (e += ",connectionSerial=" + this.connectionSerial);
                        this.timeSerial && (e += ",timeSerial=" + this.timeSerial);
                        this.format && (e += ",format=" + this.format);
                        return e += "]"
                    };

                    function O(e, n) {
                        A.call(this);
                        this.realtime = e;
                        this.options = n;
                        var i = n.timeouts,
                            r = this,
                            o = i.preferenceConnectTimeout + i.realtimeRequestTimeout;
                        this.states = {
                            initialized: {
                                state: "initialized",
                                terminal: !1,
                                queueEvents: !0,
                                sendEvents: !1,
                                failState: "disconnected"
                            },
                            connecting: {
                                state: "connecting",
                                terminal: !1,
                                queueEvents: !0,
                                sendEvents: !1,
                                retryDelay: o,
                                failState: "disconnected"
                            },
                            connected: {
                                state: "connected",
                                terminal: !1,
                                queueEvents: !1,
                                sendEvents: !0,
                                failState: "disconnected"
                            },
                            synchronizing: {
                                state: "connected",
                                terminal: !1,
                                queueEvents: !0,
                                sendEvents: !1,
                                forceQueueEvents: !0,
                                failState: "disconnected"
                            },
                            disconnected: {
                                state: "disconnected",
                                terminal: !1,
                                queueEvents: !0,
                                sendEvents: !1,
                                retryDelay: i.disconnectedRetryTimeout,
                                failState: "disconnected"
                            },
                            suspended: {
                                state: "suspended",
                                terminal: !1,
                                queueEvents: !1,
                                sendEvents: !1,
                                retryDelay: i.suspendedRetryTimeout,
                                failState: "suspended"
                            },
                            closing: {
                                state: "closing",
                                terminal: !1,
                                queueEvents: !1,
                                sendEvents: !1,
                                retryDelay: i.realtimeRequestTimeout,
                                failState: "closed"
                            },
                            closed: {
                                state: "closed",
                                terminal: !0,
                                queueEvents: !1,
                                sendEvents: !1,
                                failState: "closed"
                            },
                            failed: {
                                state: "failed",
                                terminal: !0,
                                queueEvents: !1,
                                sendEvents: !1,
                                failState: "failed"
                            }
                        };
                        this.state = this.states.initialized;
                        this.errorReason = null;
                        this.queuedMessages = new L;
                        this.msgSerial = 0;
                        this.connectionDetails = void 0;
                        this.connectionId = void 0;
                        this.connectionKey = void 0;
                        this.timeSerial = void 0;
                        this.connectionSerial = void 0;
                        this.connectionStateTtl = i.connectionStateTtl;
                        this.maxIdleInterval = null;
                        this.transports = v.intersect(n.transports || m.defaultTransports, O.supportedTransports);
                        this.baseTransport = v.intersect(m.baseTransportOrder, this.transports)[0];
                        this.upgradeTransports = v.intersect(this.transports, m.upgradeTransports);
                        this.transportPreference = null;
                        this.httpHosts = m.getHosts(n);
                        this.activeProtocol = null;
                        this.proposedTransports = [];
                        this.pendingTransports = [];
                        this.host = null;
                        this.lastAutoReconnectAttempt = null;
                        this.lastActivity = null;
                        this.mostRecentMsg = null;
                        this.forceFallbackHost = !1;
                        this.connectCounter = 0;
                        w.logAction(w.LOG_MINOR, "Realtime.ConnectionManager()", "started");
                        w.logAction(w.LOG_MICRO, "Realtime.ConnectionManager()", "requested transports = [" + (n.transports || m.defaultTransports) + "]");
                        w.logAction(w.LOG_MICRO, "Realtime.ConnectionManager()", "available transports = [" + this.transports + "]");
                        w.logAction(w.LOG_MICRO, "Realtime.ConnectionManager()", "http hosts = [" + this.httpHosts + "]");
                        if (!this.transports.length) {
                            var s = "no requested transports available";
                            w.logAction(w.LOG_ERROR, "realtime.ConnectionManager()", s);
                            throw new Error(s)
                        }
                        var a = f.addEventListener;
                        if (a) {
                            t && "function" == typeof n.recover && a("beforeunload", this.persistConnection.bind(this));
                            !0 === n.closeOnUnload && a("beforeunload", (function() {
                                w.logAction(w.LOG_MAJOR, "Realtime.ConnectionManager()", "beforeunload event has triggered the connection to close as closeOnUnload is true");
                                r.requestState({
                                    state: "closing"
                                })
                            }));
                            a("online", (function() {
                                if (r.state == r.states.disconnected || r.state == r.states.suspended) {
                                    w.logAction(w.LOG_MINOR, "ConnectionManager caught browser ‘online’ event", "reattempting connection");
                                    r.requestState({
                                        state: "connecting"
                                    })
                                }
                            }));
                            a("offline", (function() {
                                if (r.state == r.states.connected) {
                                    w.logAction(w.LOG_MINOR, "ConnectionManager caught browser ‘offline’ event", "disconnecting active transport");
                                    r.disconnectAllTransports()
                                }
                            }))
                        }
                    }
                    v.inherits(O, A);
                    O.supportedTransports = {};
                    O.prototype.createTransportParams = function(e, t) {
                        var n = new y(this.options, e, t, this.connectionKey);
                        this.timeSerial ? n.timeSerial = this.timeSerial : void 0 !== this.connectionSerial && (n.connectionSerial = this.connectionSerial);
                        return n
                    };
                    O.prototype.getTransportParams = function(e) {
                        var t = this;

                        function n(e) {
                            if (t.connectionKey) e("resume");
                            else if ("string" != typeof t.options.recover) {
                                var n = t.options.recover,
                                    i = l();
                                if (i && "function" == typeof n) {
                                    w.logAction(w.LOG_MINOR, "ConnectionManager.getTransportParams()", "Calling clientOptions-provided recover function with last session data");
                                    n(i, (function(n) {
                                        if (n) {
                                            t.options.recover = i.recoveryKey;
                                            e("recover")
                                        } else e("clean")
                                    }))
                                } else e("clean")
                            } else e("recover")
                        }
                        n((function(n) {
                            var i = t.createTransportParams(null, n);
                            if ("recover" === n) {
                                w.logAction(w.LOG_MINOR, "ConnectionManager.getTransportParams()", "Transport recovery mode = recover; recoveryKey = " + t.options.recover);
                                var r = t.options.recover.split(":");
                                r && r[2] && (t.msgSerial = r[2])
                            } else w.logAction(w.LOG_MINOR, "ConnectionManager.getTransportParams()", "Transport params = " + i.toString());
                            e(i)
                        }))
                    };
                    O.prototype.tryATransport = function(e, t, n) {
                        var i = this;
                        e.host;
                        w.logAction(w.LOG_MICRO, "ConnectionManager.tryATransport()", "trying " + t);
                        O.supportedTransports[t].tryConnect(this, this.realtime.auth, e, (function(r, o) {
                            var s = i.state;
                            if (s != i.states.closing && s != i.states.closed && s != i.states.failed)
                                if (r) {
                                    w.logAction(w.LOG_MINOR, "ConnectionManager.tryATransport()", "transport " + t + " " + r.event + ", err: " + r.error.toString());
                                    if (j.isTokenErr(r.error)) i.realtime.auth._forceNewToken(null, null, (function(r) {
                                        r ? i.actOnErrorFromAuthorize(r) : i.tryATransport(e, t, n)
                                    }));
                                    else if ("failed" === r.event) {
                                        i.notifyState({
                                            state: "failed",
                                            error: r.error
                                        });
                                        n(!0)
                                    } else "disconnected" === r.event && n(!1)
                                } else {
                                    w.logAction(w.LOG_MICRO, "ConnectionManager.tryATransport()", "viable transport " + t + "; setting pending");
                                    i.setTransportPending(o, e);
                                    n(null, o)
                                }
                            else {
                                if (o) {
                                    w.logAction(w.LOG_MINOR, "ConnectionManager.tryATransport()", "connection " + s.state + " while we were attempting the transport; closing " + o);
                                    o.close()
                                }
                                n(!0)
                            }
                        }))
                    };
                    O.prototype.setTransportPending = function(e, t) {
                        var n = t.mode;
                        w.logAction(w.LOG_MINOR, "ConnectionManager.setTransportPending()", "transport = " + e + "; mode = " + n);
                        v.arrDeleteValue(this.proposedTransports, e);
                        this.pendingTransports.push(e);
                        var i = this;
                        e.once("connected", (function(r, o, a, c) {
                            if ("upgrade" == n && i.activeProtocol) e.shortName !== s && v.arrIn(i.getUpgradePossibilities(), s) ? setTimeout((function() {
                                i.scheduleTransportActivation(r, e, o, a, c)
                            }), i.options.timeouts.parallelUpgradeDelay) : i.scheduleTransportActivation(r, e, o, a, c);
                            else {
                                i.activateTransport(r, e, o, a, c);
                                v.nextTick((function() {
                                    i.connectImpl(t)
                                }))
                            }
                            if ("recover" === n && i.options.recover) {
                                i.options.recover = null;
                                i.unpersistConnection()
                            }
                        }));
                        e.on(["disconnected", "closed", "failed"], (function(t) {
                            i.deactivateTransport(e, this.event, t)
                        }));
                        this.emit("transport.pending", e)
                    };
                    O.prototype.scheduleTransportActivation = function(e, t, n, i, r) {
                        var o = this,
                            s = this.activeProtocol && this.activeProtocol.getTransport(),
                            a = function() {
                                t.disconnect();
                                v.arrDeleteValue(o.pendingTransports, t)
                            };
                        if (this.state === this.states.connected || this.state === this.states.connecting)
                            if (!s || d(t, s)) {
                                w.logAction(w.LOG_MINOR, "ConnectionManager.scheduleTransportActivation()", "Scheduling transport upgrade; transport = " + t);
                                this.realtime.channels.onceNopending((function(s) {
                                    var c;
                                    if (s) w.logAction(w.LOG_ERROR, "ConnectionManager.scheduleTransportActivation()", "Unable to activate transport; transport = " + t + "; err = " + s);
                                    else if (t.isConnected) {
                                        if (o.state === o.states.connected) {
                                            w.logAction(w.LOG_MICRO, "ConnectionManager.scheduleTransportActivation()", "Currently connected, so temporarily pausing events until the upgrade is complete");
                                            o.state = o.states.synchronizing;
                                            c = o.activeProtocol
                                        } else if (o.state !== o.states.connecting) {
                                            w.logAction(w.LOG_MINOR, "ConnectionManager.scheduleTransportActivation()", "Current connection state (" + o.state.state + (o.state === o.states.synchronizing ? ", but with an upgrade already in progress" : "") + ") is not valid to upgrade in; abandoning upgrade to " + t.shortName);
                                            a();
                                            return
                                        }
                                        var u = n !== o.connectionId,
                                            l = u ? r : o;
                                        u && w.logAction(w.LOG_ERROR, "ConnectionManager.scheduleTransportActivation()", "Upgrade resulted in new connectionId; resetting library connection position from " + (o.timeSerial || o.connectionSerial) + " to " + (l.timeSerial || l.connectionSerial) + "; upgrade error was " + e);
                                        w.logAction(w.LOG_MINOR, "ConnectionManager.scheduleTransportActivation()", "Syncing transport; transport = " + t);
                                        o.sync(t, l, (function(n, r, s) {
                                            if (n) {
                                                if (o.state === o.states.synchronizing) {
                                                    w.logAction(w.LOG_ERROR, "ConnectionManager.scheduleTransportActivation()", "Unexpected error attempting to sync transport; transport = " + t + "; err = " + n);
                                                    o.disconnectAllTransports()
                                                }
                                            } else {
                                                var a = function() {
                                                    w.logAction(w.LOG_MINOR, "ConnectionManager.scheduleTransportActivation()", "Activating transport; transport = " + t);
                                                    o.activateTransport(e, t, r, i, s);
                                                    if (o.state === o.states.synchronizing) {
                                                        w.logAction(w.LOG_MICRO, "ConnectionManager.scheduleTransportActivation()", "Pre-upgrade protocol idle, sending queued messages on upgraded transport; transport = " + t);
                                                        o.state = o.states.connected
                                                    } else w.logAction(w.LOG_MINOR, "ConnectionManager.scheduleTransportActivation()", "Pre-upgrade protocol idle, but state is now " + o.state.state + ", so leaving unchanged");
                                                    o.state.sendEvents && o.sendQueuedMessages()
                                                };
                                                c ? c.onceIdle(a) : a()
                                            }
                                        }))
                                    } else {
                                        w.logAction(w.LOG_MINOR, "ConnectionManager.scheduleTransportActivation()", "Proposed transport " + t.shortName + "is no longer connected; abandoning upgrade");
                                        a()
                                    }
                                }))
                            } else {
                                w.logAction(w.LOG_MINOR, "ConnectionManager.scheduleTransportActivation()", "Proposed transport " + t.shortName + " is no better than current active transport " + s.shortName + " - abandoning upgrade");
                                a()
                            }
                        else {
                            w.logAction(w.LOG_MINOR, "ConnectionManager.scheduleTransportActivation()", "Current connection state (" + this.state.state + (this.state === this.states.synchronizing ? ", but with an upgrade already in progress" : "") + ") is not valid to upgrade in; abandoning upgrade to " + t.shortName);
                            a()
                        }
                    };
                    O.prototype.activateTransport = function(e, t, n, i, r) {
                        w.logAction(w.LOG_MINOR, "ConnectionManager.activateTransport()", "transport = " + t);
                        e && w.logAction(w.LOG_ERROR, "ConnectionManager.activateTransport()", "error = " + e);
                        n && w.logAction(w.LOG_MICRO, "ConnectionManager.activateTransport()", "connectionId =  " + n);
                        i && w.logAction(w.LOG_MICRO, "ConnectionManager.activateTransport()", "connectionDetails =  " + JSON.stringify(i));
                        r && w.logAction(w.LOG_MICRO, "ConnectionManager.activateTransport()", "serial =  " + (r.timeSerial || r.connectionSerial));
                        this.persistTransportPreference(t);
                        var o = this.state,
                            s = this.states.connected.state;
                        w.logAction(w.LOG_MINOR, "ConnectionManager.activateTransport()", "current state = " + o.state);
                        if (o.state == this.states.closing.state || o.state == this.states.closed.state || o.state == this.states.failed.state) {
                            w.logAction(w.LOG_MINOR, "ConnectionManager.activateTransport()", "Disconnecting transport and abandoning");
                            t.disconnect();
                            return !1
                        }
                        v.arrDeleteValue(this.pendingTransports, t);
                        if (!t.isConnected) {
                            w.logAction(w.LOG_MINOR, "ConnectionManager.activateTransport()", "Declining to activate transport " + t + " since it appears to no longer be connected");
                            return !1
                        }
                        var a = this.activeProtocol;
                        this.activeProtocol = new N(t);
                        this.host = t.params.host;
                        var c = i.connectionKey;
                        c && this.connectionKey != c && this.setConnection(n, i, r, !!e);
                        this.onConnectionDetailsUpdate(i, t);
                        var u = this;
                        v.nextTick((function() {
                            t.on("connected", (function(e, n, i) {
                                u.onConnectionDetailsUpdate(i, t);
                                u.emit("update", new F(s, s, null, e))
                            }))
                        }));
                        if (o.state === this.states.connected.state) {
                            if (e) {
                                this.errorReason = this.realtime.connection.errorReason = e;
                                this.emit("update", new F(s, s, null, e))
                            }
                        } else {
                            this.notifyState({
                                state: "connected",
                                error: e
                            });
                            this.errorReason = this.realtime.connection.errorReason = e || null
                        }
                        this.emit("transport.active", t);
                        if (a) {
                            a.messageQueue.count() > 0 && w.logAction(w.LOG_ERROR, "ConnectionManager.activateTransport()", "Previous active protocol (for transport " + a.transport.shortName + ", new one is " + t.shortName + ") finishing with " + a.messageQueue.count() + " messages still pending");
                            if (a.transport === t) {
                                var l = "Assumption violated: activating a transport that was also the transport for the previous active protocol; transport = " + t.shortName + "; stack = " + (new Error).stack;
                                w.logAction(w.LOG_ERROR, "ConnectionManager.activateTransport()", l);
                                S.report("error", l, "transport-previously-active")
                            } else a.finish()
                        }
                        v.safeArrForEach(this.pendingTransports, (function(e) {
                            if (e === t) {
                                var n = "Assumption violated: activating a transport that is still marked as a pending transport; transport = " + t.shortName + "; stack = " + (new Error).stack;
                                w.logAction(w.LOG_ERROR, "ConnectionManager.activateTransport()", n);
                                S.report("error", n, "transport-activating-pending");
                                v.arrDeleteValue(u.pendingTransports, t)
                            } else e.disconnect()
                        }));
                        v.safeArrForEach(this.proposedTransports, (function(e) {
                            if (e === t) {
                                var n = "Assumption violated: activating a transport that is still marked as a proposed transport; transport = " + t.shortName + "; stack = " + (new Error).stack;
                                w.logAction(w.LOG_ERROR, "ConnectionManager.activateTransport()", n);
                                S.report("error", n, "transport-activating-proposed");
                                v.arrDeleteValue(u.proposedTransports, t)
                            } else e.dispose()
                        }));
                        return !0
                    };
                    O.prototype.deactivateTransport = function(e, t, n) {
                        var i = this.activeProtocol,
                            r = i && i.getTransport() === e,
                            o = v.arrDeleteValue(this.pendingTransports, e),
                            s = v.arrDeleteValue(this.proposedTransports, e),
                            a = this.noTransportsScheduledForActivation();
                        w.logAction(w.LOG_MINOR, "ConnectionManager.deactivateTransport()", "transport = " + e);
                        w.logAction(w.LOG_MINOR, "ConnectionManager.deactivateTransport()", "state = " + t + (r ? "; was active" : o ? "; was pending" : s ? "; was proposed" : "") + (a ? "" : "; another transport is scheduled for activation"));
                        n && n.message && w.logAction(w.LOG_MICRO, "ConnectionManager.deactivateTransport()", "reason =  " + n.message);
                        if (r) {
                            w.logAction(w.LOG_MICRO, "ConnectionManager.deactivateTransport()", "Getting, clearing, and requeuing " + this.activeProtocol.messageQueue.count() + " pending messages");
                            this.queuePendingMessages(i.getPendingMessages());
                            v.nextTick((function() {
                                i.clearPendingMessages()
                            }));
                            this.activeProtocol = this.host = null;
                            clearTimeout(this.channelResumeCheckTimer)
                        }
                        this.emit("transport.inactive", e);
                        if (r && a || r && "failed" === t || "closed" === t || null === i && o && 0 === this.pendingTransports.length) {
                            if ("disconnected" === t && n && n.statusCode > 500 && this.httpHosts.length > 1) {
                                this.unpersistTransportPreference();
                                this.forceFallbackHost = !0;
                                this.notifyState({
                                    state: t,
                                    error: n,
                                    retryImmediately: !0
                                });
                                return
                            }
                            var c = "failed" === t && j.isTokenErr(n) ? "disconnected" : t;
                            this.notifyState({
                                state: c,
                                error: n
                            })
                        } else if (r && "disconnected" === t && this.state !== this.states.synchronizing) {
                            w.logAction(w.LOG_MICRO, "ConnectionManager.deactivateTransport()", "wasActive but another transport is connected and scheduled for activation, so going into the connecting state until it activates");
                            this.startSuspendTimer();
                            this.startTransitionTimer(this.states.connecting);
                            this.notifyState({
                                state: "connecting",
                                error: n
                            })
                        }
                    };
                    O.prototype.noTransportsScheduledForActivation = function() {
                        return v.isEmpty(this.pendingTransports) || this.pendingTransports.every((function(e) {
                            return !e.isConnected
                        }))
                    };
                    O.prototype.sync = function(e, t, i) {
                        var r = setTimeout((function() {
                                e.off("sync");
                                i(new k("Timeout waiting for sync response", 5e4, 500))
                            }), this.options.timeouts.realtimeRequestTimeout),
                            o = T.fromValues({
                                action: n.SYNC,
                                connectionKey: this.connectionKey
                            });
                        t.timeSerial ? o.timeSerial = t.timeSerial : void 0 !== t.connectionSerial && (o.connectionSerial = t.connectionSerial);
                        e.send(o);
                        e.once("sync", (function(e, t) {
                            clearTimeout(r);
                            i(null, e, t)
                        }))
                    };
                    O.prototype.setConnection = function(e, t, n, i) {
                        var r = this,
                            o = this.connectionid,
                            s = o && o !== e;
                        if (s || !o && i) {
                            w.logAction(w.LOG_MINOR, "ConnectionManager.setConnection()", "Resetting msgSerial");
                            this.msgSerial = 0
                        }
                        if (this.connectionId !== e) {
                            w.logAction(w.LOG_MINOR, "ConnectionManager.setConnection()", "New connectionId; reattaching any attached channels");
                            v.nextTick((function() {
                                r.realtime.channels.reattach()
                            }))
                        } else if (this.options.checkChannelsOnResume) {
                            w.logAction(w.LOG_MINOR, "ConnectionManager.setConnection()", "Same connectionId; checkChannelsOnResume is enabled");
                            clearTimeout(this.channelResumeCheckTimer);
                            this.realtime.channels.resetAttachedMsgIndicators();
                            this.channelResumeCheckTimer = setTimeout((function() {
                                r.realtime.channels.checkAttachedMsgIndicators(e)
                            }), 3e4)
                        }
                        this.realtime.connection.id = this.connectionId = e;
                        this.realtime.connection.key = this.connectionKey = t.connectionKey;
                        var a = s || !o;
                        this.setConnectionSerial(n, a)
                    };
                    O.prototype.clearConnection = function() {
                        this.realtime.connection.id = this.connectionId = void 0;
                        this.realtime.connection.key = this.connectionKey = void 0;
                        this.clearConnectionSerial();
                        this.msgSerial = 0;
                        this.unpersistConnection()
                    };
                    O.prototype.setConnectionSerial = function(e, t) {
                        var n = e.timeSerial,
                            i = e.connectionSerial;
                        w.logAction(w.LOG_MICRO, "ConnectionManager.setConnectionSerial()", "Updating connection serial; serial = " + i + "; timeSerial = " + n + "; force = " + t + "; previous = " + this.connectionSerial);
                        if (void 0 === n) {
                            if (void 0 !== i) {
                                if (i <= this.connectionSerial && !t) {
                                    w.logAction(w.LOG_ERROR, "ConnectionManager.setConnectionSerial()", "received message with connectionSerial " + i + ", but current connectionSerial is " + this.connectionSerial + "; assuming message is a duplicate and discarding it");
                                    return !0
                                }
                                this.realtime.connection.serial = this.connectionSerial = i;
                                this.setRecoveryKey()
                            }
                        } else {
                            if (n <= this.timeSerial && !t) {
                                w.logAction(w.LOG_ERROR, "ConnectionManager.setConnectionSerial()", "received message with timeSerial " + n + ", but current timeSerial is " + this.timeSerial + "; assuming message is a duplicate and discarding it");
                                return !0
                            }
                            this.realtime.connection.timeSerial = this.timeSerial = n;
                            this.setRecoveryKey()
                        }
                    };
                    O.prototype.clearConnectionSerial = function() {
                        this.realtime.connection.serial = this.connectionSerial = void 0;
                        this.realtime.connection.timeSerial = this.timeSerial = void 0;
                        this.clearRecoveryKey()
                    };
                    O.prototype.setRecoveryKey = function() {
                        this.realtime.connection.recoveryKey = this.connectionKey + ":" + (this.timeSerial || this.connectionSerial) + ":" + this.msgSerial
                    };
                    O.prototype.clearRecoveryKey = function() {
                        this.realtime.connection.recoveryKey = null
                    };
                    O.prototype.checkConnectionStateFreshness = function() {
                        if (this.lastActivity && this.connectionId) {
                            var e = v.now() - this.lastActivity;
                            if (e > this.connectionStateTtl + this.maxIdleInterval) {
                                w.logAction(w.LOG_MINOR, "ConnectionManager.checkConnectionStateFreshness()", "Last known activity from realtime was " + e + "ms ago; discarding connection state");
                                this.clearConnection();
                                this.states.connecting.failState = "suspended";
                                this.states.connecting.queueEvents = !1
                            }
                        }
                    };
                    O.prototype.persistConnection = function() {
                        if (t) {
                            var e = this.realtime.connection.recoveryKey;
                            e && h({
                                recoveryKey: e,
                                disconnectedAt: v.now(),
                                location: a.location,
                                clientId: this.realtime.auth.clientId
                            }, this.connectionStateTtl)
                        }
                    };
                    O.prototype.unpersistConnection = function() {
                        p()
                    };
                    O.prototype.getError = function() {
                        return this.errorReason || this.getStateError()
                    };
                    O.prototype.getStateError = function() {
                        return x[this.state.state]
                    };
                    O.prototype.activeState = function() {
                        return this.state.queueEvents || this.state.sendEvents
                    };
                    O.prototype.enactStateChange = function(e) {
                        var t = "failed" === e.current ? w.LOG_ERROR : w.LOG_MAJOR;
                        w.logAction(t, "Connection state", e.current + (e.reason ? "; reason: " + e.reason : ""));
                        w.logAction(w.LOG_MINOR, "ConnectionManager.enactStateChange", "setting new state: " + e.current + "; reason = " + (e.reason && e.reason.message));
                        var n = this.state = this.states[e.current];
                        if (e.reason) {
                            this.errorReason = e.reason;
                            this.realtime.connection.errorReason = e.reason
                        }(n.terminal || "suspended" === n.state) && this.clearConnection();
                        this.emit("connectionstate", e)
                    };
                    O.prototype.startTransitionTimer = function(e) {
                        w.logAction(w.LOG_MINOR, "ConnectionManager.startTransitionTimer()", "transitionState: " + e.state);
                        if (this.transitionTimer) {
                            w.logAction(w.LOG_MINOR, "ConnectionManager.startTransitionTimer()", "clearing already-running timer");
                            clearTimeout(this.transitionTimer)
                        }
                        var t = this;
                        this.transitionTimer = setTimeout((function() {
                            if (t.transitionTimer) {
                                t.transitionTimer = null;
                                w.logAction(w.LOG_MINOR, "ConnectionManager " + e.state + " timer expired", "requesting new state: " + e.failState);
                                t.notifyState({
                                    state: e.failState
                                })
                            }
                        }), e.retryDelay)
                    };
                    O.prototype.cancelTransitionTimer = function() {
                        w.logAction(w.LOG_MINOR, "ConnectionManager.cancelTransitionTimer()", "");
                        if (this.transitionTimer) {
                            clearTimeout(this.transitionTimer);
                            this.transitionTimer = null
                        }
                    };
                    O.prototype.startSuspendTimer = function() {
                        var e = this;
                        this.suspendTimer || (this.suspendTimer = setTimeout((function() {
                            if (e.suspendTimer) {
                                e.suspendTimer = null;
                                w.logAction(w.LOG_MINOR, "ConnectionManager suspend timer expired", "requesting new state: suspended");
                                e.states.connecting.failState = "suspended";
                                e.states.connecting.queueEvents = !1;
                                e.notifyState({
                                    state: "suspended"
                                })
                            }
                        }), this.connectionStateTtl))
                    };
                    O.prototype.checkSuspendTimer = function(e) {
                        "disconnected" !== e && "suspended" !== e && "connecting" !== e && this.cancelSuspendTimer()
                    };
                    O.prototype.cancelSuspendTimer = function() {
                        this.states.connecting.failState = "disconnected";
                        this.states.connecting.queueEvents = !0;
                        if (this.suspendTimer) {
                            clearTimeout(this.suspendTimer);
                            this.suspendTimer = null
                        }
                    };
                    O.prototype.startRetryTimer = function(e) {
                        var t = this;
                        this.retryTimer = setTimeout((function() {
                            w.logAction(w.LOG_MINOR, "ConnectionManager retry timer expired", "retrying");
                            t.retryTimer = null;
                            t.requestState({
                                state: "connecting"
                            })
                        }), e)
                    };
                    O.prototype.cancelRetryTimer = function() {
                        if (this.retryTimer) {
                            clearTimeout(this.retryTimer);
                            this.retryTimer = null
                        }
                    };
                    O.prototype.notifyState = function(e) {
                        var t = e.state,
                            n = this,
                            i = "disconnected" === t && (this.state === this.states.connected || this.state === this.states.synchronizing || e.retryImmediately || this.state === this.states.connecting && e.error && j.isTokenErr(e.error) && !(this.errorReason && j.isTokenErr(this.errorReason)));
                        w.logAction(w.LOG_MINOR, "ConnectionManager.notifyState()", "new state: " + t + (i ? "; will retry connection immediately" : ""));
                        if (t != this.state.state) {
                            this.cancelTransitionTimer();
                            this.cancelRetryTimer();
                            this.checkSuspendTimer(e.state);
                            if (!this.state.terminal) {
                                var r = this.states[e.state],
                                    o = new F(this.state.state, r.state, r.retryDelay, e.error || x[r.state]);
                                if (i) {
                                    var s = function() {
                                            if (n.state === n.states.disconnected) {
                                                n.lastAutoReconnectAttempt = v.now();
                                                n.requestState({
                                                    state: "connecting"
                                                })
                                            }
                                        },
                                        a = this.lastAutoReconnectAttempt && v.now() - this.lastAutoReconnectAttempt + 1;
                                    if (a && a < 1e3) {
                                        w.logAction(w.LOG_MICRO, "ConnectionManager.notifyState()", "Last reconnect attempt was only " + a + "ms ago, waiting another " + (1e3 - a) + "ms before trying again");
                                        setTimeout(s, 1e3 - a)
                                    } else v.nextTick(s)
                                } else "disconnected" !== t && "suspended" !== t || this.startRetryTimer(r.retryDelay);
                                ("disconnected" === t && !i || "suspended" === t || r.terminal) && v.nextTick((function() {
                                    n.disconnectAllTransports()
                                }));
                                "connected" != t || this.activeProtocol || w.logAction(w.LOG_ERROR, "ConnectionManager.notifyState()", "Broken invariant: attempted to go into connected state, but there is no active protocol");
                                this.enactStateChange(o);
                                if (this.state.sendEvents) this.sendQueuedMessages();
                                else if (!this.state.queueEvents) {
                                    this.realtime.channels.propogateConnectionInterruption(t, o.reason);
                                    this.failQueuedMessages(o.reason)
                                }
                            }
                        }
                    };
                    O.prototype.requestState = function(e) {
                        var t = e.state,
                            n = this;
                        w.logAction(w.LOG_MINOR, "ConnectionManager.requestState()", "requested state: " + t + "; current state: " + this.state.state);
                        if (t != this.state.state) {
                            this.cancelTransitionTimer();
                            this.cancelRetryTimer();
                            this.checkSuspendTimer(t);
                            if (!("connecting" == t && "connected" == this.state.state || "closing" == t && "closed" == this.state.state)) {
                                var i = this.states[t],
                                    r = new F(this.state.state, i.state, null, e.error || x[i.state]);
                                this.enactStateChange(r);
                                "connecting" == t && v.nextTick((function() {
                                    n.startConnect()
                                }));
                                "closing" == t && this.closeImpl()
                            }
                        }
                    };
                    O.prototype.startConnect = function() {
                        if (this.state === this.states.connecting) {
                            var e = this.realtime.auth,
                                t = this,
                                n = ++this.connectCounter,
                                i = function() {
                                    t.checkConnectionStateFreshness();
                                    t.getTransportParams((function(e) {
                                        n === t.connectCounter && t.connectImpl(e, n)
                                    }))
                                };
                            w.logAction(w.LOG_MINOR, "ConnectionManager.startConnect()", "starting connection");
                            this.startSuspendTimer();
                            this.startTransitionTimer(this.states.connecting);
                            if ("basic" === e.method) i();
                            else {
                                var r = function(e) {
                                    n === t.connectCounter && (e ? t.actOnErrorFromAuthorize(e) : i())
                                };
                                this.errorReason && j.isTokenErr(this.errorReason) ? e._forceNewToken(null, null, r) : e._ensureValidAuthCredentials(!1, r)
                            }
                        } else w.logAction(w.LOG_MINOR, "ConnectionManager.startConnect()", "Must be in connecting state to connect, but was " + this.state.state)
                    };
                    O.prototype.connectImpl = function(e, t) {
                        var n = this.state.state;
                        n !== this.states.connecting.state && n !== this.states.connected.state ? w.logAction(w.LOG_MINOR, "ConnectionManager.connectImpl()", "Must be in connecting state to connect (or connected to upgrade), but was " + n) : this.pendingTransports.length ? w.logAction(w.LOG_MINOR, "ConnectionManager.connectImpl()", "Transports " + this.pendingTransports[0].toString() + " currently pending; taking no action") : n == this.states.connected.state ? this.upgradeIfNeeded(e) : this.transports.length > 1 && this.getTransportPreference() ? this.connectPreference(e) : this.connectBase(e, t)
                    };
                    O.prototype.connectPreference = function(e) {
                        var t = this.getTransportPreference(),
                            n = this,
                            i = !1;
                        if (!v.arrIn(this.transports, t)) {
                            this.unpersistTransportPreference();
                            this.connectImpl(e)
                        }
                        w.logAction(w.LOG_MINOR, "ConnectionManager.connectPreference()", "Trying to connect with stored transport preference " + t);
                        var r = setTimeout((function() {
                            i = !0;
                            if (n.state.state !== n.states.connected.state) {
                                w.logAction(w.LOG_MINOR, "ConnectionManager.connectPreference()", "Shortcircuit connection attempt with " + t + " failed; clearing preference and trying from scratch");
                                n.disconnectAllTransports();
                                n.unpersistTransportPreference()
                            }
                            n.connectImpl(e)
                        }), this.options.timeouts.preferenceConnectTimeout);
                        e.host = n.httpHosts[0];
                        n.tryATransport(e, t, (function(t, o) {
                            clearTimeout(r);
                            if (i && o) {
                                o.off();
                                o.disconnect();
                                v.arrDeleteValue(this.pendingTransports, o)
                            } else if (!o && !t) {
                                n.unpersistTransportPreference();
                                n.connectImpl(e)
                            }
                        }))
                    };
                    O.prototype.connectBase = function(e, t) {
                        var n = this,
                            i = function(e) {
                                n.notifyState({
                                    state: n.states.connecting.failState,
                                    error: e
                                })
                            },
                            r = this.httpHosts.slice(),
                            o = function(e, i) {
                                t === n.connectCounter && (i || e || a())
                            };
                        w.logAction(w.LOG_MINOR, "ConnectionManager.connectBase()", "Trying to connect with base transport " + this.baseTransport);
                        var s = r.shift();
                        if (s) {
                            e.host = s;
                            if (this.forceFallbackHost && r.length) {
                                this.forceFallbackHost = !1;
                                a()
                            } else this.tryATransport(e, this.baseTransport, o)
                        } else i(new k("Unable to connect (no available host)", 80003, 404));

                        function a() {
                            r.length ? b.checkConnectivity((function(s, a) {
                                if (t === n.connectCounter)
                                    if (s) i(s);
                                    else if (a) {
                                    e.host = v.arrPopRandomElement(r);
                                    n.tryATransport(e, n.baseTransport, o)
                                } else i(new k("Unable to connect (network unreachable)", 80003, 404))
                            })) : i(new k("Unable to connect (and no more fallback hosts to try)", 80003, 404))
                        }
                    };
                    O.prototype.getUpgradePossibilities = function() {
                        var e = this.activeProtocol.getTransport().shortName,
                            t = v.arrIndexOf(this.upgradeTransports, e);
                        return this.upgradeTransports.slice(t + 1)
                    };
                    O.prototype.upgradeIfNeeded = function(e) {
                        var t = this.getUpgradePossibilities(),
                            n = this;
                        w.logAction(w.LOG_MINOR, "ConnectionManager.upgradeIfNeeded()", "upgrade possibilities: " + v.inspect(t));
                        t.length && v.arrForEach(t, (function(t) {
                            var i = n.createTransportParams(e.host, "upgrade");
                            n.tryATransport(i, t, r)
                        }))
                    };
                    O.prototype.closeImpl = function() {
                        w.logAction(w.LOG_MINOR, "ConnectionManager.closeImpl()", "closing connection");
                        this.cancelSuspendTimer();
                        this.startTransitionTimer(this.states.closing);
                        v.safeArrForEach(this.pendingTransports, (function(e) {
                            w.logAction(w.LOG_MICRO, "ConnectionManager.closeImpl()", "Closing pending transport: " + e);
                            e && e.close()
                        }));
                        v.safeArrForEach(this.proposedTransports, (function(e) {
                            w.logAction(w.LOG_MICRO, "ConnectionManager.closeImpl()", "Disposing of proposed transport: " + e);
                            e && e.dispose()
                        }));
                        if (this.activeProtocol) {
                            w.logAction(w.LOG_MICRO, "ConnectionManager.closeImpl()", "Closing active transport: " + this.activeProtocol.getTransport());
                            this.activeProtocol.getTransport().close()
                        }
                        this.notifyState({
                            state: "closed"
                        })
                    };
                    O.prototype.onAuthUpdated = function(e, t) {
                        var i = this;
                        switch (this.state.state) {
                            case "connected":
                                w.logAction(w.LOG_MICRO, "ConnectionManager.onAuthUpdated()", "Sending AUTH message on active transport");
                                if ((this.pendingTransports.length || this.proposedTransports.length) && i.state !== i.states.synchronizing) {
                                    this.disconnectAllTransports(!0);
                                    var r = this.activeProtocol.getTransport().params;
                                    v.nextTick((function() {
                                        "connected" === i.state.state && i.upgradeIfNeeded(r)
                                    }))
                                }
                                this.activeProtocol.getTransport().onAuthUpdated(e);
                                var o = T.fromValues({
                                    action: n.AUTH,
                                    auth: {
                                        accessToken: e.token
                                    }
                                });
                                this.send(o);
                                var s = function() {
                                        i.off(a);
                                        t(null, e)
                                    },
                                    a = function(e) {
                                        if ("failed" === e.current) {
                                            i.off(s);
                                            i.off(a);
                                            t(e.reason || i.getStateError())
                                        }
                                    };
                                this.once("connectiondetails", s);
                                this.on("connectionstate", a);
                                break;
                            case "connecting":
                                w.logAction(w.LOG_MICRO, "ConnectionManager.onAuthUpdated()", "Aborting current connection attempts in order to start again with the new auth details");
                                this.disconnectAllTransports();
                            default:
                                w.logAction(w.LOG_MICRO, "ConnectionManager.onAuthUpdated()", "Connection state is " + this.state.state + "; waiting until either connected or failed");
                                var c = function(n) {
                                    switch (n.current) {
                                        case "connected":
                                            i.off(c);
                                            t(null, e);
                                            break;
                                        case "failed":
                                        case "closed":
                                        case "suspended":
                                            i.off(c);
                                            t(n.reason || i.getStateError())
                                    }
                                };
                                i.on("connectionstate", c);
                                "connecting" === this.state.state ? i.startConnect() : i.requestState({
                                    state: "connecting"
                                })
                        }
                    };
                    O.prototype.disconnectAllTransports = function(e) {
                        w.logAction(w.LOG_MINOR, "ConnectionManager.disconnectAllTransports()", "Disconnecting all transports" + (e ? " except the active transport" : ""));
                        this.connectCounter++;
                        v.safeArrForEach(this.pendingTransports, (function(e) {
                            w.logAction(w.LOG_MICRO, "ConnectionManager.disconnectAllTransports()", "Disconnecting pending transport: " + e);
                            e && e.disconnect()
                        }));
                        this.pendingTransports = [];
                        v.safeArrForEach(this.proposedTransports, (function(e) {
                            w.logAction(w.LOG_MICRO, "ConnectionManager.disconnectAllTransports()", "Disposing of proposed transport: " + e);
                            e && e.dispose()
                        }));
                        this.proposedTransports = [];
                        if (this.activeProtocol && !e) {
                            w.logAction(w.LOG_MICRO, "ConnectionManager.disconnectAllTransports()", "Disconnecting active transport: " + this.activeProtocol.getTransport());
                            this.activeProtocol.getTransport().disconnect()
                        }
                    };
                    O.prototype.send = function(e, t, n) {
                        n = n || r;
                        var o = this.state;
                        if (o.sendEvents) {
                            w.logAction(w.LOG_MICRO, "ConnectionManager.send()", "sending event");
                            this.sendImpl(new i(e, n))
                        } else {
                            if (t && o.queueEvents || o.forceQueueEvents) {
                                w.shouldLog(w.LOG_MICRO) && w.logAction(w.LOG_MICRO, "ConnectionManager.send()", "queueing msg; " + T.stringify(e));
                                this.queue(e, n)
                            } else {
                                var s = "rejecting event, queueEvent was " + t + ", state was " + o.state;
                                w.logAction(w.LOG_MICRO, "ConnectionManager.send()", s);
                                n(this.errorReason || new k(s, 9e4, 400))
                            }
                        }
                    };
                    O.prototype.sendImpl = function(e) {
                        var t = e.message;
                        if (e.ackRequired && !e.sendAttempted) {
                            t.msgSerial = this.msgSerial++;
                            this.setRecoveryKey()
                        }
                        try {
                            this.activeProtocol.send(e)
                        } catch (e) {
                            w.logAction(w.LOG_ERROR, "ConnectionManager.sendImpl()", "Unexpected exception in transport.send(): " + e.stack)
                        }
                    };

                    function R(e, t, i) {
                        var r;
                        if (e.channel !== t.channel) return !1;
                        if ((r = e.action) !== n.PRESENCE && r !== n.MESSAGE) return !1;
                        if (r !== t.action) return !1;
                        var o = r === n.PRESENCE ? "presence" : "messages",
                            s = e[o].concat(t[o]);
                        if (I.getMessagesSize(s) > i) return !1;
                        if (!v.allSame(s, "clientId")) return !1;
                        if (!v.arrEvery(s, (function(e) {
                                return !e.id
                            }))) return !1;
                        e[o] = s;
                        return !0
                    }
                    O.prototype.queue = function(e, t) {
                        w.logAction(w.LOG_MICRO, "ConnectionManager.queue()", "queueing event");
                        var n = this.queuedMessages.last(),
                            r = this.options.maxMessageSize;
                        if (n && !n.sendAttempted && R(n.message, e, r)) {
                            if (!n.merged) {
                                n.callback = C([n.callback]);
                                n.merged = !0
                            }
                            n.callback.push(t)
                        } else this.queuedMessages.push(new i(e, t))
                    };
                    O.prototype.sendQueuedMessages = function() {
                        w.logAction(w.LOG_MICRO, "ConnectionManager.sendQueuedMessages()", "sending " + this.queuedMessages.count() + " queued messages");
                        for (var e; e = this.queuedMessages.shift();) this.sendImpl(e)
                    };
                    O.prototype.queuePendingMessages = function(e) {
                        if (e && e.length) {
                            w.logAction(w.LOG_MICRO, "ConnectionManager.queuePendingMessages()", "queueing " + e.length + " pending messages");
                            this.queuedMessages.prepend(e)
                        }
                    };
                    O.prototype.failQueuedMessages = function(e) {
                        var t = this.queuedMessages.count();
                        if (t > 0) {
                            w.logAction(w.LOG_ERROR, "ConnectionManager.failQueuedMessages()", "failing " + t + " queued messages, err = " + v.inspectError(e));
                            this.queuedMessages.completeAllMessages(e)
                        }
                    };
                    O.prototype.onChannelMessage = function(e, t) {
                        var i = this.activeProtocol && t === this.activeProtocol.getTransport(),
                            r = v.arrIn(this.pendingTransports, t) && this.state == this.states.synchronizing,
                            o = e.action === n.MESSAGE || e.action === n.PRESENCE;
                        if (i || r) {
                            if (o) {
                                if (this.setConnectionSerial(e)) return;
                                if (T.isDuplicate(e, this.mostRecentMsg)) {
                                    w.logAction(w.LOG_ERROR, "ConnectionManager.onChannelMessage()", "received message with different connectionSerial, but same message id as a previous; discarding; id = " + e.id);
                                    return
                                }
                                this.mostRecentMsg = e
                            }
                            this.realtime.channels.onChannelMessage(e)
                        } else v.arrIndexOf([n.ACK, n.NACK, n.ERROR], e.action) > -1 ? this.realtime.channels.onChannelMessage(e) : w.logAction(w.LOG_MICRO, "ConnectionManager.onChannelMessage()", "received message " + JSON.stringify(e) + "on defunct transport; discarding")
                    };
                    O.prototype.ping = function(e, t) {
                        if (e) {
                            w.logAction(w.LOG_MINOR, "ConnectionManager.ping()", "transport = " + e);
                            var n = function() {
                                    e.off("heartbeat", o);
                                    t(new k("Timeout waiting for heartbeat response", 5e4, 500))
                                },
                                i = v.now(),
                                r = v.cheapRandStr(),
                                o = function(n) {
                                    if (n === r) {
                                        e.off("heartbeat", o);
                                        clearTimeout(s);
                                        var a = v.now() - i;
                                        t(null, a)
                                    }
                                },
                                s = setTimeout(n, this.options.timeouts.realtimeRequestTimeout);
                            e.on("heartbeat", o);
                            e.ping(r)
                        } else if ("connected" === this.state.state) {
                            var a = !1,
                                c = this,
                                u = function(e, n) {
                                    c.off("transport.active", l);
                                    if (!a) {
                                        a = !0;
                                        t(e, n)
                                    }
                                },
                                l = function() {
                                    if (!a) {
                                        a = !0;
                                        v.nextTick((function() {
                                            c.ping(null, t)
                                        }))
                                    }
                                };
                            this.on("transport.active", l);
                            this.ping(this.activeProtocol.getTransport(), u)
                        } else t(new k("Unable to ping service; not connected", 4e4, 400))
                    };
                    O.prototype.abort = function(e) {
                        this.activeProtocol.getTransport().fail(e)
                    };
                    O.prototype.registerProposedTransport = function(e) {
                        this.proposedTransports.push(e)
                    };
                    O.prototype.getTransportPreference = function() {
                        return this.transportPreference || e && g.get(c)
                    };
                    O.prototype.persistTransportPreference = function(t) {
                        if (v.arrIn(m.upgradeTransports, t.shortName)) {
                            this.transportPreference = t.shortName;
                            e && g.set(c, t.shortName)
                        }
                    };
                    O.prototype.unpersistTransportPreference = function() {
                        this.transportPreference = null;
                        e && g.remove(c)
                    };
                    O.prototype.actOnErrorFromAuthorize = function(e) {
                        if (40171 === e.code) this.notifyState({
                            state: "failed",
                            error: e
                        });
                        else if (403 === e.statusCode) {
                            var t = "Client configured authentication provider returned 403; failing the connection";
                            w.logAction(w.LOG_ERROR, "ConnectionManager.actOnErrorFromAuthorize()", t);
                            this.notifyState({
                                state: "failed",
                                error: new k(t, 80019, 403, e)
                            })
                        } else {
                            t = "Client configured authentication provider request failed";
                            w.logAction(w.LOG_MINOR, "ConnectionManager.actOnErrorFromAuthorize", t);
                            this.notifyState({
                                state: this.state.failState,
                                error: new k(t, 80019, 401, e)
                            })
                        }
                    };
                    O.prototype.onConnectionDetailsUpdate = function(e, t) {
                        if (e) {
                            this.connectionDetails = e;
                            e.maxMessageSize && (this.options.maxMessageSize = e.maxMessageSize);
                            var n = e.clientId;
                            if (n) {
                                var i = this.realtime.auth._uncheckedSetClientId(n);
                                if (i) {
                                    w.logAction(w.LOG_ERROR, "ConnectionManager.onConnectionDetailsUpdate()", i.message);
                                    t.fail(i);
                                    return
                                }
                            }
                            var r = e.connectionStateTtl;
                            r && (this.connectionStateTtl = r);
                            this.maxIdleInterval = e.maxIdleInterval;
                            this.emit("connectiondetails", e)
                        }
                    };
                    return O
                }(),
                G = function() {
                    var e = T.Action,
                        t = T.fromValues({
                            action: e.CLOSE
                        }),
                        n = T.fromValues({
                            action: e.DISCONNECT
                        });

                    function i(e, t, n) {
                        A.call(this);
                        this.connectionManager = e;
                        e.registerProposedTransport(this);
                        this.auth = t;
                        this.params = n;
                        this.timeouts = n.options.timeouts;
                        this.format = n.format;
                        this.isConnected = !1;
                        this.isFinished = !1;
                        this.isDisposed = !1;
                        this.maxIdleInterval = null;
                        this.idleTimer = null;
                        this.lastActivity = null
                    }
                    v.inherits(i, A);
                    i.prototype.connect = function() {};
                    i.prototype.close = function() {
                        this.isConnected && this.requestClose();
                        this.finish("closed", x.closed)
                    };
                    i.prototype.disconnect = function(e) {
                        this.isConnected && this.requestDisconnect();
                        this.finish("disconnected", e || x.disconnected)
                    };
                    i.prototype.fail = function(e) {
                        this.isConnected && this.requestDisconnect();
                        this.finish("failed", e || x.failed)
                    };
                    i.prototype.finish = function(e, t) {
                        if (!this.isFinished) {
                            this.isFinished = !0;
                            this.isConnected = !1;
                            this.maxIdleInterval = null;
                            clearTimeout(this.idleTimer);
                            this.idleTimer = null;
                            this.emit(e, t);
                            this.dispose()
                        }
                    };
                    i.prototype.onProtocolMessage = function(t) {
                        w.shouldLog(w.LOG_MICRO) && w.logAction(w.LOG_MICRO, "Transport.onProtocolMessage()", "received on " + this.shortName + ": " + T.stringify(t) + "; connectionId = " + this.connectionManager.connectionId);
                        this.onActivity();
                        switch (t.action) {
                            case e.HEARTBEAT:
                                w.logAction(w.LOG_MICRO, "Transport.onProtocolMessage()", this.shortName + " heartbeat; connectionId = " + this.connectionManager.connectionId);
                                this.emit("heartbeat", t.id);
                                break;
                            case e.CONNECTED:
                                this.onConnect(t);
                                this.emit("connected", t.error, t.connectionId, t.connectionDetails, t);
                                break;
                            case e.CLOSED:
                                this.onClose(t);
                                break;
                            case e.DISCONNECTED:
                                this.onDisconnect(t);
                                break;
                            case e.ACK:
                                this.emit("ack", t.msgSerial, t.count);
                                break;
                            case e.NACK:
                                this.emit("nack", t.msgSerial, t.count, t.error);
                                break;
                            case e.SYNC:
                                if (void 0 !== t.connectionId) {
                                    this.emit("sync", t.connectionId, t);
                                    break
                                }
                                this.connectionManager.onChannelMessage(t, this);
                                break;
                            case e.AUTH:
                                this.auth.authorize((function(e) {
                                    e && w.logAction(w.LOG_ERROR, "Transport.onProtocolMessage()", "Ably requested re-authentication, but unable to obtain a new token: " + v.inspectError(e))
                                }));
                                break;
                            case e.ERROR:
                                w.logAction(w.LOG_MINOR, "Transport.onProtocolMessage()", "received error action; connectionId = " + this.connectionManager.connectionId + "; err = " + v.inspect(t.error) + (t.channel ? ", channel: " + t.channel : ""));
                                if (void 0 === t.channel) {
                                    this.onFatalError(t);
                                    break
                                }
                                this.connectionManager.onChannelMessage(t, this);
                                break;
                            default:
                                this.connectionManager.onChannelMessage(t, this)
                        }
                    };
                    i.prototype.onConnect = function(e) {
                        this.isConnected = !0;
                        var t = e.connectionDetails.maxIdleInterval;
                        if (t) {
                            this.maxIdleInterval = t + this.timeouts.realtimeRequestTimeout;
                            this.onActivity()
                        }
                    };
                    i.prototype.onDisconnect = function(e) {
                        var t = e && e.error;
                        w.logAction(w.LOG_MINOR, "Transport.onDisconnect()", "err = " + v.inspectError(t));
                        this.finish("disconnected", t)
                    };
                    i.prototype.onFatalError = function(e) {
                        var t = e && e.error;
                        w.logAction(w.LOG_MINOR, "Transport.onFatalError()", "err = " + v.inspectError(t));
                        this.finish("failed", t)
                    };
                    i.prototype.onClose = function(e) {
                        var t = e && e.error;
                        w.logAction(w.LOG_MINOR, "Transport.onClose()", "err = " + v.inspectError(t));
                        this.finish("closed", t)
                    };
                    i.prototype.requestClose = function() {
                        w.logAction(w.LOG_MINOR, "Transport.requestClose()", "");
                        this.send(t)
                    };
                    i.prototype.requestDisconnect = function() {
                        w.logAction(w.LOG_MINOR, "Transport.requestDisconnect()", "");
                        this.send(n)
                    };
                    i.prototype.ping = function(e) {
                        var t = {
                            action: T.Action.HEARTBEAT
                        };
                        e && (t.id = e);
                        this.send(T.fromValues(t))
                    };
                    i.prototype.dispose = function() {
                        w.logAction(w.LOG_MINOR, "Transport.dispose()", "");
                        this.isDisposed = !0;
                        this.off()
                    };
                    i.prototype.onActivity = function() {
                        if (this.maxIdleInterval) {
                            this.lastActivity = this.connectionManager.lastActivity = v.now();
                            this.setIdleTimer(this.maxIdleInterval + 100)
                        }
                    };
                    i.prototype.setIdleTimer = function(e) {
                        var t = this;
                        this.idleTimer || (this.idleTimer = setTimeout((function() {
                            t.onIdleTimerExpire()
                        }), e))
                    };
                    i.prototype.onIdleTimerExpire = function() {
                        this.idleTimer = null;
                        var e = v.now() - this.lastActivity,
                            t = this.maxIdleInterval - e;
                        if (t <= 0) {
                            var n = "No activity seen from realtime in " + e + "ms; assuming connection has dropped";
                            w.logAction(w.LOG_ERROR, "Transport.onIdleTimerExpire()", n);
                            this.disconnect(new k(n, 80003, 408))
                        } else this.setIdleTimer(t + 100)
                    };
                    i.prototype.onAuthUpdated = function() {};
                    return i
                }(),
                q = (function() {
                    var e = f.WebSocket,
                        t = "web_socket";

                    function n(e, n, i) {
                        this.shortName = t;
                        i.heartbeats = f.useProtocolHeartbeats;
                        G.call(this, e, n, i);
                        this.wsHost = m.getHost(i.options, i.host, !0)
                    }
                    v.inherits(n, G);
                    n.isAvailable = function() {
                        return !!e
                    };
                    n.isAvailable() && (U.supportedTransports[t] = n);
                    n.tryConnect = function(e, t, i, r) {
                        var o = new n(e, t, i),
                            s = function(e) {
                                r({
                                    event: this.event,
                                    error: e
                                })
                            };
                        o.on(["failed", "disconnected"], s);
                        o.on("wsopen", (function() {
                            w.logAction(w.LOG_MINOR, "WebSocketTransport.tryConnect()", "viable transport " + o);
                            o.off(["failed", "disconnected"], s);
                            r(null, o)
                        }));
                        o.connect()
                    };
                    n.prototype.createWebSocket = function(t, n) {
                        var i = 0;
                        if (n)
                            for (var r in n) t += (i++ ? "&" : "?") + r + "=" + n[r];
                        this.uri = t;
                        return new e(t)
                    };
                    n.prototype.toString = function() {
                        return "WebSocketTransport; uri=" + this.uri
                    };
                    n.prototype.connect = function() {
                        w.logAction(w.LOG_MINOR, "WebSocketTransport.connect()", "starting");
                        G.prototype.connect.call(this);
                        var e = this,
                            t = this.params,
                            n = t.options,
                            i = (n.tls ? "wss://" : "ws://") + this.wsHost + ":" + m.getPort(n) + "/";
                        w.logAction(w.LOG_MINOR, "WebSocketTransport.connect()", "uri: " + i);
                        this.auth.getAuthParams((function(n, r) {
                            if (!e.isDisposed) {
                                var o = "";
                                for (var s in r) o += " " + s + ": " + r[s] + ";";
                                w.logAction(w.LOG_MINOR, "WebSocketTransport.connect()", "authParams:" + o + " err: " + n);
                                if (n) e.disconnect(n);
                                else {
                                    var a = t.getConnectParams(r);
                                    try {
                                        var c = e.wsConnection = e.createWebSocket(i, a);
                                        c.binaryType = f.binaryType;
                                        c.onopen = function() {
                                            e.onWsOpen()
                                        };
                                        c.onclose = function(t) {
                                            e.onWsClose(t)
                                        };
                                        c.onmessage = function(t) {
                                            e.onWsData(t.data)
                                        };
                                        c.onerror = function(t) {
                                            e.onWsError(t)
                                        };
                                        c.on && c.on("ping", (function() {
                                            e.onActivity()
                                        }))
                                    } catch (t) {
                                        w.logAction(w.LOG_ERROR, "WebSocketTransport.connect()", "Unexpected exception creating websocket: err = " + (t.stack || t.message));
                                        e.disconnect(t)
                                    }
                                }
                            }
                        }))
                    };
                    n.prototype.send = function(e) {
                        var t = this.wsConnection;
                        if (t) try {
                            t.send(T.serialize(e, this.params.format))
                        } catch (e) {
                            var n = "Exception from ws connection when trying to send: " + v.inspectError(e);
                            w.logAction(w.LOG_ERROR, "WebSocketTransport.send()", n);
                            this.finish("disconnected", new k(n, 5e4, 500))
                        } else w.logAction(w.LOG_ERROR, "WebSocketTransport.send()", "No socket connection")
                    };
                    n.prototype.onWsData = function(e) {
                        w.logAction(w.LOG_MICRO, "WebSocketTransport.onWsData()", "data received; length = " + e.length + "; type = " + typeof e);
                        try {
                            this.onProtocolMessage(T.deserialize(e, this.format))
                        } catch (e) {
                            w.logAction(w.LOG_ERROR, "WebSocketTransport.onWsData()", "Unexpected exception handing channel message: " + e.stack)
                        }
                    };
                    n.prototype.onWsOpen = function() {
                        w.logAction(w.LOG_MINOR, "WebSocketTransport.onWsOpen()", "opened WebSocket");
                        this.emit("wsopen")
                    };
                    n.prototype.onWsClose = function(e) {
                        var t, n;
                        if ("object" == typeof e) {
                            t = e.wasClean;
                            n = e.code
                        } else t = 1e3 == (n = e);
                        delete this.wsConnection;
                        if (t) {
                            w.logAction(w.LOG_MINOR, "WebSocketTransport.onWsClose()", "Cleanly closed WebSocket");
                            var i = new k("Websocket closed", 80003, 400);
                            this.finish("disconnected", i)
                        } else {
                            var r = "Unclean disconnection of WebSocket ; code = " + n;
                            i = new k(r, 80003, 400);
                            w.logAction(w.LOG_MINOR, "WebSocketTransport.onWsClose()", r);
                            this.finish("disconnected", i)
                        }
                        this.emit("disposed")
                    };
                    n.prototype.onWsError = function(e) {
                        w.logAction(w.LOG_MINOR, "WebSocketTransport.onError()", "Error from WebSocket: " + e.message);
                        var t = this;
                        v.nextTick((function() {
                            t.disconnect(e)
                        }))
                    };
                    n.prototype.dispose = function() {
                        w.logAction(w.LOG_MINOR, "WebSocketTransport.dispose()", "");
                        this.isDisposed = !0;
                        var e = this.wsConnection;
                        if (e) {
                            e.onmessage = function() {};
                            delete this.wsConnection;
                            v.nextTick((function() {
                                w.logAction(w.LOG_MICRO, "WebSocketTransport.dispose()", "closing websocket");
                                e.close()
                            }))
                        }
                    }
                }(), function() {
                    var e = 0,
                        t = 1,
                        n = 2,
                        i = 3;

                    function r(e) {
                        var t = [80015, 80017, 80030];
                        return !!e.code && (!j.isTokenErr(e) && (!!v.arrIn(t, e.code) || e.code >= 4e4 && e.code < 5e4))
                    }

                    function o(e) {
                        return r(e) ? [T.fromValues({
                            action: T.Action.ERROR,
                            error: e
                        })] : [T.fromValues({
                            action: T.Action.DISCONNECTED,
                            error: e
                        })]
                    }

                    function s(e, t, n) {
                        n.format = void 0;
                        n.heartbeats = !0;
                        G.call(this, e, t, n);
                        this.stream = !("stream" in n) || n.stream;
                        this.sendRequest = null;
                        this.recvRequest = null;
                        this.pendingCallback = null;
                        this.pendingItems = null
                    }
                    v.inherits(s, G);
                    s.REQ_SEND = e;
                    s.REQ_RECV = t;
                    s.REQ_RECV_POLL = n;
                    s.REQ_RECV_STREAM = i;
                    s.prototype.connect = function() {
                        w.logAction(w.LOG_MINOR, "CometTransport.connect()", "starting");
                        G.prototype.connect.call(this);
                        var e = this,
                            n = this.params,
                            r = n.options,
                            s = m.getHost(r, n.host),
                            a = m.getPort(r),
                            c = r.tls ? "https://" : "http://";
                        this.baseUri = c + s + ":" + a + "/comet/";
                        var u = this.baseUri + "connect";
                        w.logAction(w.LOG_MINOR, "CometTransport.connect()", "uri: " + u);
                        this.auth.getAuthParams((function(n, r) {
                            if (n) e.disconnect(n);
                            else if (!e.isDisposed) {
                                e.authParams = r;
                                var s = e.params.getConnectParams(r);
                                "stream" in s && (e.stream = s.stream);
                                w.logAction(w.LOG_MINOR, "CometTransport.connect()", "connectParams:" + v.toQueryString(s));
                                var a = !1,
                                    c = e.recvRequest = e.createRequest(u, null, s, null, e.stream ? i : t);
                                c.on("data", (function(t) {
                                    if (e.recvRequest) {
                                        if (!a) {
                                            a = !0;
                                            e.emit("preconnect")
                                        }
                                        e.onData(t)
                                    }
                                }));
                                c.on("complete", (function(t, n, i) {
                                    e.recvRequest || (t = t || new k("Request cancelled", 80003, 400));
                                    e.recvRequest = null;
                                    e.onActivity();
                                    t ? t.code ? e.onData(o(t)) : e.disconnect(t) : v.nextTick((function() {
                                        e.recv()
                                    }))
                                }));
                                c.exec()
                            }
                        }))
                    };
                    s.prototype.requestClose = function() {
                        w.logAction(w.LOG_MINOR, "CometTransport.requestClose()");
                        this._requestCloseOrDisconnect(!0)
                    };
                    s.prototype.requestDisconnect = function() {
                        w.logAction(w.LOG_MINOR, "CometTransport.requestDisconnect()");
                        this._requestCloseOrDisconnect(!1)
                    };
                    s.prototype._requestCloseOrDisconnect = function(t) {
                        var n = t ? this.closeUri : this.disconnectUri;
                        if (n) {
                            var i = this,
                                r = this.createRequest(n, null, this.authParams, null, e);
                            r.on("complete", (function(e) {
                                if (e) {
                                    w.logAction(w.LOG_ERROR, "CometTransport.request" + (t ? "Close()" : "Disconnect()"), "request returned err = " + v.inspectError(e));
                                    i.finish("disconnected", e)
                                }
                            }));
                            r.exec()
                        }
                    };
                    s.prototype.dispose = function() {
                        w.logAction(w.LOG_MINOR, "CometTransport.dispose()", "");
                        if (!this.isDisposed) {
                            this.isDisposed = !0;
                            if (this.recvRequest) {
                                w.logAction(w.LOG_MINOR, "CometTransport.dispose()", "aborting recv request");
                                this.recvRequest.abort();
                                this.recvRequest = null
                            }
                            this.finish("disconnected", x.disconnected);
                            var e = this;
                            v.nextTick((function() {
                                e.emit("disposed")
                            }))
                        }
                    };
                    s.prototype.onConnect = function(e) {
                        if (!this.isDisposed) {
                            var t = e.connectionKey;
                            G.prototype.onConnect.call(this, e);
                            var n = this.baseUri + t;
                            w.logAction(w.LOG_MICRO, "CometTransport.onConnect()", "baseUri = " + n + "; connectionKey = " + e.connectionKey);
                            this.sendUri = n + "/send";
                            this.recvUri = n + "/recv";
                            this.closeUri = n + "/close";
                            this.disconnectUri = n + "/disconnect"
                        }
                    };
                    s.prototype.send = function(e) {
                        if (this.sendRequest) {
                            this.pendingItems = this.pendingItems || [];
                            this.pendingItems.push(e)
                        } else {
                            var t = this.pendingItems || [];
                            t.push(e);
                            this.pendingItems = null;
                            this.sendItems(t)
                        }
                    };
                    s.prototype.sendAnyPending = function() {
                        var e = this.pendingItems;
                        if (e) {
                            this.pendingItems = null;
                            this.sendItems(e)
                        }
                    };
                    s.prototype.sendItems = function(t) {
                        var n = this,
                            i = this.sendRequest = n.createRequest(n.sendUri, null, n.authParams, this.encodeRequest(t), e);
                        i.on("complete", (function(e, t) {
                            e && w.logAction(w.LOG_ERROR, "CometTransport.sendItems()", "on complete: err = " + v.inspectError(e));
                            n.sendRequest = null;
                            t ? n.onData(t) : e && e.code ? n.onData(o(e)) : n.disconnect(e);
                            n.pendingItems && v.nextTick((function() {
                                n.sendRequest || n.sendAnyPending()
                            }))
                        }));
                        i.exec()
                    };
                    s.prototype.recv = function() {
                        if (!this.recvRequest && this.isConnected) {
                            var e = this,
                                t = this.recvRequest = this.createRequest(this.recvUri, null, this.authParams, null, e.stream ? i : n);
                            t.on("data", (function(t) {
                                e.onData(t)
                            }));
                            t.on("complete", (function(t) {
                                e.recvRequest = null;
                                e.onActivity();
                                t ? t.code ? e.onData(o(t)) : e.disconnect(t) : v.nextTick((function() {
                                    e.recv()
                                }))
                            }));
                            t.exec()
                        }
                    };
                    s.prototype.onData = function(e) {
                        try {
                            var t = this.decodeResponse(e);
                            if (t && t.length)
                                for (var n = 0; n < t.length; n++) this.onProtocolMessage(T.fromDeserialized(t[n]))
                        } catch (e) {
                            w.logAction(w.LOG_ERROR, "CometTransport.onData()", "Unexpected exception handing channel event: " + e.stack)
                        }
                    };
                    s.prototype.encodeRequest = function(e) {
                        return JSON.stringify(e)
                    };
                    s.prototype.decodeResponse = function(e) {
                        "string" == typeof e && (e = JSON.parse(e));
                        return e
                    };
                    s.prototype.onAuthUpdated = function(e) {
                        this.authParams = {
                            access_token: e.token
                        }
                    };
                    return s
                }()),
                B = function() {
                    function e() {}

                    function t(e) {
                        this.channel = e;
                        this.basePath = e.basePath + "/presence"
                    }
                    v.inherits(t, A);
                    t.prototype.get = function(t, n) {
                        w.logAction(w.LOG_MICRO, "Presence.get()", "channel = " + this.channel.name);
                        if (void 0 === n)
                            if ("function" == typeof t) {
                                n = t;
                                t = null
                            } else {
                                if (this.channel.rest.options.promises) return v.promisify(this, "get", arguments);
                                n = e
                            }
                        var i = this.channel.rest,
                            r = i.options.useBinaryProtocol ? "msgpack" : "json",
                            o = b.supportsLinkHeaders ? void 0 : r,
                            s = v.defaultGetHeaders(r);
                        i.options.headers && v.mixin(s, i.options.headers);
                        var a = this.channel.channelOptions;
                        new H(i, this.basePath, s, o, (function(e, t, n) {
                            return M.fromResponseBody(e, a, !n && r)
                        })).get(t, n)
                    };
                    t.prototype.history = function(e, t) {
                        w.logAction(w.LOG_MICRO, "Presence.history()", "channel = " + this.channel.name);
                        this._history(e, t)
                    };
                    t.prototype._history = function(t, n) {
                        if (void 0 === n)
                            if ("function" == typeof t) {
                                n = t;
                                t = null
                            } else {
                                if (this.channel.rest.options.promises) return v.promisify(this, "_history", arguments);
                                n = e
                            }
                        var i = this.channel.rest,
                            r = i.options.useBinaryProtocol ? "msgpack" : "json",
                            o = b.supportsLinkHeaders ? void 0 : r,
                            s = v.defaultGetHeaders(r);
                        this.channel;
                        i.options.headers && v.mixin(s, i.options.headers);
                        var a = this.channel.channelOptions;
                        new H(i, this.basePath + "/history", s, o, (function(e, t, n) {
                            return M.fromResponseBody(e, a, !n && r)
                        })).get(t, n)
                    };
                    return t
                }(),
                D = function() {
                    var e = f.msgpack;

                    function t() {}

                    function n(e, t, n, i, r) {
                        b.supportsAuthHeaders ? e.auth.getAuthHeaders((function(e, o) {
                            e ? i(e) : r(v.mixin(o, t), n)
                        })) : e.auth.getAuthParams((function(e, o) {
                            e ? i(e) : r(t, v.mixin(o, n))
                        }))
                    }

                    function i(e, t) {
                        return function(n, i, r, o, s) {
                            if (!n || i) {
                                if (!o) try {
                                    i = v.decodeBody(i, t)
                                } catch (t) {
                                    e(t);
                                    return
                                }
                                if (void 0 !== i.statusCode) {
                                    var a = i.statusCode,
                                        c = i.response,
                                        u = i.headers;
                                    if (a < 200 || a >= 300) {
                                        var l = c && c.error || n;
                                        l || ((l = new Error("Error in unenveloping " + i)).statusCode = a);
                                        e(l, c, u, !0, a)
                                    } else e(n, c, u, !0, a)
                                } else e(n, i, r, !0, s)
                            } else e(n)
                        }
                    }

                    function r(e) {
                        var t = [];
                        if (e)
                            for (var n in e) t.push(n + "=" + e[n]);
                        return t.join("&")
                    }

                    function o(e, t) {
                        return e + (t ? "?" : "") + r(t)
                    }

                    function s(e, t, n, i) {
                        return function(s, a, c, u, l) {
                            s ? w.logAction(w.LOG_MICRO, "Resource." + t + "()", "Received Error; " + o(n, i) + "; Error: " + v.inspectError(s)) : w.logAction(w.LOG_MICRO, "Resource." + t + "()", "Received; " + o(n, i) + "; Headers: " + r(c) + "; StatusCode: " + l + "; Body: " + (y.isBuffer(a) ? a.toString() : a));
                            e && e(s, a, c, u, l)
                        }
                    }
                    v.arrForEach(b.methodsWithoutBody, (function(e) {
                        t[e] = function(n, i, r, o, s, a) {
                            t.do(e, n, i, null, r, o, s, a)
                        }
                    }));
                    v.arrForEach(b.methodsWithBody, (function(e) {
                        t[e] = function(n, i, r, o, s, a, c) {
                            t.do(e, n, i, r, o, s, a, c)
                        }
                    }));
                    t.do = function(t, r, a, c, u, l, h, p) {
                        w.shouldLog(w.LOG_MICRO) && (p = s(p, t, a, l));
                        if (h) {
                            p = p && i(p, h);
                            (l = l || {}).envelope = h
                        }

                        function f(i, s) {
                            w.shouldLog(w.LOG_MICRO) && w.logAction(w.LOG_MICRO, "Resource." + t + "()", "Sending; " + o(a, s));
                            var h = [r, a, i, c, s, function(e, t, i, o, s) {
                                e && j.isTokenErr(e) ? r.auth.authorize(null, null, (function(e) {
                                    e ? p(e) : n(r, u, l, p, f)
                                })) : p(e, t, i, o, s)
                            }];
                            c || h.splice(3, 1);
                            if (w.shouldLog(w.LOG_MICRO)) {
                                var d = c;
                                if ((i["content-type"] || "").indexOf("msgpack") > 0) try {
                                    d = e.decode(c)
                                } catch (e) {
                                    w.logAction(w.LOG_MICRO, "Resource." + t + "()", "Sending MsgPack Decoding Error: " + v.inspectError(e))
                                }
                                w.logAction(w.LOG_MICRO, "Resource." + t + "()", "Sending; " + o(a, s) + "; Body: " + d)
                            }
                            b[t].apply(this, h)
                        }
                        n(r, u, l, p, f)
                    };
                    return t
                }(),
                H = function() {
                    function e(e) {
                        var t = e.match(/^\.\/(\w+)\?(.*)$/);
                        return t && v.parseQueryString(t[2])
                    }

                    function t(t) {
                        "string" == typeof t && (t = t.split(","));
                        for (var n = {}, i = 0; i < t.length; i++) {
                            var r = t[i].match(/^\s*<(.+)>;\s*rel="(\w+)"$/);
                            if (r) {
                                var o = e(r[1]);
                                o && (n[r[2]] = o)
                            }
                        }
                        return n
                    }

                    function n(e, t, n, i, r, o) {
                        this.rest = e;
                        this.path = t;
                        this.headers = n;
                        this.envelope = i;
                        this.bodyHandler = r;
                        this.useHttpPaginatedResponse = o || !1
                    }
                    v.arrForEach(b.methodsWithoutBody, (function(e) {
                        n.prototype[e] = function(t, n) {
                            var i = this;
                            D[e](i.rest, i.path, i.headers, t, i.envelope, (function(e, t, r, o, s) {
                                i.handlePage(e, t, r, o, s, n)
                            }))
                        }
                    }));
                    v.arrForEach(b.methodsWithBody, (function(e) {
                        n.prototype[e] = function(t, n, i) {
                            var r = this;
                            D[e](r.rest, r.path, n, r.headers, t, r.envelope, (function(e, t, n, o, s) {
                                i && r.handlePage(e, t, n, o, s, i)
                            }))
                        }
                    }));

                    function i(e, t, n) {
                        return !(n && (t || "number" == typeof e.code))
                    }
                    n.prototype.handlePage = function(e, n, s, a, c, u) {
                        if (e && i(e, n, this.useHttpPaginatedResponse)) {
                            w.logAction(w.LOG_ERROR, "PaginatedResource.handlePage()", "Unexpected error getting resource: err = " + v.inspectError(e));
                            u(e)
                        } else {
                            var l, h, p;
                            try {
                                l = this.bodyHandler(n, s, a)
                            } catch (t) {
                                u(e || t);
                                return
                            }
                            s && (h = s.Link || s.link) && (p = t(h));
                            this.useHttpPaginatedResponse ? u(null, new o(this, l, s, c, p, e)) : u(null, new r(this, l, p))
                        }
                    };

                    function r(e, t, n) {
                        this.resource = e;
                        this.items = t;
                        if (n) {
                            var i = this;
                            "first" in n && (this.first = function(e) {
                                i.get(n.first, e)
                            });
                            "current" in n && (this.current = function(e) {
                                i.get(n.current, e)
                            });
                            this.next = function(e) {
                                "next" in n ? i.get(n.next, e) : e(null, null)
                            };
                            this.hasNext = function() {
                                return "next" in n
                            };
                            this.isLast = function() {
                                return !this.hasNext()
                            }
                        }
                    }
                    r.prototype.get = function(e, t) {
                        var n = this.resource;
                        D.get(n.rest, n.path, n.headers, e, n.envelope, (function(e, i, r, o, s) {
                            n.handlePage(e, i, r, o, s, t)
                        }))
                    };

                    function o(e, t, n, i, o, s) {
                        r.call(this, e, t, o);
                        this.statusCode = i;
                        this.success = i < 300 && i >= 200;
                        this.headers = n;
                        this.errorCode = s && s.code;
                        this.errorMessage = s && s.message
                    }
                    v.inherits(o, r);
                    return n
                }(),
                j = function() {
                    var e, t, n = Math.pow(2, 17);

                    function i() {}

                    function r() {
                        return ("000000" + Math.floor(1e16 * Math.random())).slice(-16)
                    }

                    function o(e) {
                        if (!v.isErrorInfo(e)) return new k(v.inspectError(e), e.code || 40170, e.statusCode || 401);
                        if (!e.code)
                            if (403 === e.statusCode) e.code = 40300;
                            else {
                                e.code = 40170;
                                e.statusCode = 401
                            }
                        return e
                    }
                    t = O.encode;
                    e = function(e, t) {
                        return c.HmacSHA256(e, t).toString(c.enc.Base64)
                    };

                    function s(e) {
                        if (!e) return "";
                        "string" == typeof e && (e = JSON.parse(e));
                        var t = {},
                            n = v.keysArray(e, !0);
                        if (!n) return "";
                        n.sort();
                        for (var i = 0; i < n.length; i++) t[n[i]] = e[n[i]].sort();
                        return JSON.stringify(t)
                    }

                    function a(e) {
                        if (e.authCallback) w.logAction(w.LOG_MINOR, "Auth()", "using token auth with authCallback");
                        else if (e.authUrl) w.logAction(w.LOG_MINOR, "Auth()", "using token auth with authUrl");
                        else if (e.key) w.logAction(w.LOG_MINOR, "Auth()", "using token auth with client-side signing");
                        else {
                            if (!e.tokenDetails) {
                                var t = "authOptions must include valid authentication parameters";
                                w.logAction(w.LOG_ERROR, "Auth()", t);
                                throw new Error(t)
                            }
                            w.logAction(w.LOG_MINOR, "Auth()", "using token auth with supplied token only")
                        }
                    }

                    function u(e) {
                        return "useTokenAuth" in e && !e.useTokenAuth
                    }

                    function l(e) {
                        return e.useTokenAuth || !u(e) && (e.authCallback || e.authUrl || e.token || e.tokenDetails)
                    }

                    function h(e) {
                        return !e.key && !e.authCallback && !e.authUrl
                    }
                    var p = 0;

                    function f() {
                        return p++
                    }

                    function d(t, n) {
                        this.client = t;
                        this.tokenParams = n.defaultTokenParams || {};
                        this.currentTokenRequestId = null;
                        this.waitingForTokenRequest = null;
                        if (l(n)) {
                            if (n.key && !e) {
                                var i = "client-side token request signing not supported";
                                w.logAction(w.LOG_ERROR, "Auth()", i);
                                throw new Error(i)
                            }
                            h(n) && w.logAction(w.LOG_ERROR, "Auth()", "Warning: library initialized with a token literal without any way to renew the token when it expires (no authUrl, authCallback, or key). See https://help.ably.io/error/40171 for help");
                            this._saveTokenOptions(n.defaultTokenParams, n);
                            a(this.authOptions)
                        } else {
                            if (!n.key) {
                                i = "No authentication options provided; need one of: key, authUrl, or authCallback (or for testing only, token or tokenDetails)";
                                w.logAction(w.LOG_ERROR, "Auth()", i);
                                throw new k(i, 40160, 401)
                            }
                            w.logAction(w.LOG_MINOR, "Auth()", "anonymous, using basic auth");
                            this._saveBasicOptions(n)
                        }
                    }
                    d.prototype.authorize = function(e, t, n) {
                        if ("function" != typeof e || n) {
                            if ("function" == typeof t && !n) {
                                n = t;
                                t = null
                            }
                        } else {
                            n = e;
                            t = e = null
                        }
                        if (!n) {
                            if (this.client.options.promises) return v.promisify(this, "authorize", arguments);
                            n = i
                        }
                        var r = this;
                        if (t && t.key && this.authOptions.key !== t.key) throw new k("Unable to update auth options with incompatible key", 40102, 401);
                        if (t && "force" in t) {
                            w.logAction(w.LOG_ERROR, "Auth.authorize", "Deprecation warning: specifying {force: true} in authOptions is no longer necessary, authorize() now always gets a new token. Please remove this, as in version 1.0 and later, having a non-null authOptions will overwrite stored library authOptions, which may not be what you want");
                            v.isOnlyPropIn(t, "force") && (t = null)
                        }
                        this._forceNewToken(e, t, (function(e, t) {
                            e ? n(e) : r.client.connection ? r.client.connection.connectionManager.onAuthUpdated(t, n) : n(null, t)
                        }))
                    };
                    d.prototype.authorise = function() {
                        w.deprecated("Auth.authorise", "Auth.authorize");
                        this.authorize.apply(this, arguments)
                    };
                    d.prototype._forceNewToken = function(e, t, n) {
                        var i = this;
                        this.tokenDetails = null;
                        this._saveTokenOptions(e, t);
                        a(this.authOptions);
                        this._ensureValidAuthCredentials(!0, (function(e, t) {
                            delete i.tokenParams.timestamp;
                            delete i.authOptions.queryTime;
                            n(e, t)
                        }))
                    };
                    d.prototype.requestToken = function(e, t, r) {
                        if ("function" != typeof e || r) {
                            if ("function" == typeof t && !r) {
                                r = t;
                                t = null
                            }
                        } else {
                            r = e;
                            t = e = null
                        }
                        if (!r && this.client.options.promises) return v.promisify(this, "requestToken", arguments);
                        t = t || this.authOptions;
                        e = e || v.copy(this.tokenParams);
                        r = r || i;
                        var a, c = this.client;
                        if (t.authCallback) {
                            w.logAction(w.LOG_MINOR, "Auth.requestToken()", "using token auth with authCallback");
                            a = t.authCallback
                        } else if (t.authUrl) {
                            w.logAction(w.LOG_MINOR, "Auth.requestToken()", "using token auth with authUrl");
                            a = function(e, i) {
                                var r = v.mixin({
                                        accept: "application/json, text/plain"
                                    }, t.authHeaders),
                                    o = t.authMethod && "post" === t.authMethod.toLowerCase();
                                if (!o) {
                                    var s = t.authUrl.indexOf("?");
                                    if (s > -1) {
                                        var a = v.parseQueryString(t.authUrl.slice(s));
                                        t.authUrl = t.authUrl.slice(0, s);
                                        t.authParams = v.mixin(a, t.authParams)
                                    }
                                }
                                var u = v.mixin({}, t.authParams || {}, e),
                                    l = function(e, t, r, o) {
                                        var s;
                                        if (e) w.logAction(w.LOG_MICRO, "Auth.requestToken().tokenRequestCallback", "Received Error: " + v.inspectError(e));
                                        else {
                                            s = r["content-type"];
                                            w.logAction(w.LOG_MICRO, "Auth.requestToken().tokenRequestCallback", "Received; content-type: " + s + "; body: " + v.inspectBody(t))
                                        }
                                        if (e || o) return i(e, t);
                                        y.isBuffer(t) && (t = t.toString());
                                        if (s) {
                                            var a = s.indexOf("application/json") > -1,
                                                c = s.indexOf("text/plain") > -1 || s.indexOf("application/jwt") > -1;
                                            if (a || c) {
                                                if (a) {
                                                    if (t.length > n) {
                                                        i(new k("authUrl response exceeded max permitted length", 40170, 401));
                                                        return
                                                    }
                                                    try {
                                                        t = JSON.parse(t)
                                                    } catch (e) {
                                                        i(new k("Unexpected error processing authURL response; err = " + e.message, 40170, 401));
                                                        return
                                                    }
                                                }
                                                i(null, t, s)
                                            } else i(new k("authUrl responded with unacceptable content-type " + s + ", should be either text/plain, application/jwt or application/json", 40170, 401))
                                        } else i(new k("authUrl response is missing a content-type header", 40170, 401))
                                    };
                                w.logAction(w.LOG_MICRO, "Auth.requestToken().tokenRequestCallback", "Requesting token from " + t.authUrl + "; Params: " + JSON.stringify(u) + "; method: " + (o ? "POST" : "GET"));
                                if (o) {
                                    var h = r || {};
                                    h["content-type"] = "application/x-www-form-urlencoded";
                                    var p = v.toQueryString(u).slice(1);
                                    b.postUri(c, t.authUrl, h, p, {}, l)
                                } else b.getUri(c, t.authUrl, r || {}, u, l)
                            }
                        } else {
                            if (!t.key) {
                                var u = "Need a new token, but authOptions does not include any way to request one (no authUrl, authCallback, or key)";
                                w.logAction(w.LOG_ERROR, "Auth()", "library initialized with a token literal without any way to renew the token when it expires (no authUrl, authCallback, or key). See https://help.ably.io/error/40171 for help");
                                r(new k(u, 40171, 403));
                                return
                            }
                            var l = this;
                            w.logAction(w.LOG_MINOR, "Auth.requestToken()", "using token auth with client-side signing");
                            a = function(e, n) {
                                l.createTokenRequest(e, t, n)
                            }
                        }
                        "capability" in e && (e.capability = s(e.capability));
                        var h = function(e, n) {
                                var i = "/keys/" + e.keyName + "/requestToken",
                                    r = function(e) {
                                        return c.baseUri(e) + i
                                    },
                                    o = v.defaultPostHeaders();
                                t.requestHeaders && v.mixin(o, t.requestHeaders);
                                w.logAction(w.LOG_MICRO, "Auth.requestToken().requestToken", "Sending POST to " + i + "; Token params: " + JSON.stringify(e));
                                e = JSON.stringify(e);
                                b.post(c, r, o, e, null, n)
                            },
                            p = !1,
                            f = this.client.options.timeouts.realtimeRequestTimeout,
                            d = setTimeout((function() {
                                p = !0;
                                var e = "Token request callback timed out after " + f / 1e3 + " seconds";
                                w.logAction(w.LOG_ERROR, "Auth.requestToken()", e);
                                r(new k(e, 40170, 401))
                            }), f);
                        a(e, (function(e, i, s) {
                            if (!p) {
                                clearTimeout(d);
                                if (e) {
                                    w.logAction(w.LOG_ERROR, "Auth.requestToken()", "token request signing call returned error; err = " + v.inspectError(e));
                                    r(o(e))
                                } else if ("string" != typeof i)
                                    if ("object" == typeof i) {
                                        var a = JSON.stringify(i).length;
                                        if (a > n && !t.suppressMaxLengthCheck) r(new k("Token request/details object exceeded max permitted stringified size (was " + a + " bytes)", 40170, 401));
                                        else if ("issued" in i) r(null, i);
                                        else if ("keyName" in i) h(i, (function(e, t, n, i) {
                                            if (e) {
                                                w.logAction(w.LOG_ERROR, "Auth.requestToken()", "token request API call returned error; err = " + v.inspectError(e));
                                                r(o(e))
                                            } else {
                                                i || (t = JSON.parse(t));
                                                w.logAction(w.LOG_MINOR, "Auth.getToken()", "token received");
                                                r(null, t)
                                            }
                                        }));
                                        else {
                                            c = "Expected token request callback to call back with a token string, token request object, or token details object";
                                            w.logAction(w.LOG_ERROR, "Auth.requestToken()", c);
                                            r(new k(c, 40170, 401))
                                        }
                                    } else {
                                        var c = "Expected token request callback to call back with a token string or token request/details object, but got a " + typeof i;
                                        w.logAction(w.LOG_ERROR, "Auth.requestToken()", c);
                                        r(new k(c, 40170, 401))
                                    }
                                else 0 === i.length ? r(new k("Token string is empty", 40170, 401)) : i.length > n ? r(new k("Token string exceeded max permitted length (was " + i.length + " bytes)", 40170, 401)) : "undefined" === i || "null" === i ? r(new k("Token string was literal null/undefined", 40170, 401)) : "{" !== i[0] || s && s.indexOf("application/jwt") > -1 ? r(null, {
                                    token: i
                                }) : r(new k("Token was double-encoded; make sure you're not JSON-encoding an already encoded token request or details", 40170, 401))
                            }
                        }))
                    };
                    d.prototype.createTokenRequest = function(t, n, i) {
                        if ("function" != typeof t || i) {
                            if ("function" == typeof n && !i) {
                                i = n;
                                n = null
                            }
                        } else {
                            i = t;
                            n = t = null
                        }
                        if (!i && this.client.options.promises) return v.promisify(this, "createTokenRequest", arguments);
                        n = n || this.authOptions;
                        t = t || v.copy(this.tokenParams);
                        var o = n.key;
                        if (o) {
                            var a = o.split(":"),
                                c = a[0],
                                u = a[1];
                            if (u)
                                if ("" !== t.clientId) {
                                    "capability" in t && (t.capability = s(t.capability));
                                    var l, h = v.mixin({
                                            keyName: c
                                        }, t),
                                        p = t.clientId || "",
                                        f = t.ttl || "",
                                        d = t.capability || "",
                                        g = this;
                                    l = function() {
                                        var t = h.nonce || (h.nonce = r()),
                                            n = h.timestamp,
                                            o = h.keyName + "\n" + f + "\n" + d + "\n" + p + "\n" + n + "\n" + t + "\n";
                                        h.mac = h.mac || e(o, u);
                                        w.logAction(w.LOG_MINOR, "Auth.getTokenRequest()", "generated signed request");
                                        i(null, h)
                                    }, h.timestamp ? l() : g.getTimestamp(n && n.queryTime, (function(e, t) {
                                        if (e) i(e);
                                        else {
                                            h.timestamp = t;
                                            l()
                                        }
                                    }))
                                } else i(new k("clientId can’t be an empty string", 40012, 400));
                            else i(new k("Invalid key specified", 40101, 403))
                        } else i(new k("No key specified", 40101, 403))
                    };
                    d.prototype.getAuthParams = function(e) {
                        "basic" == this.method ? e(null, {
                            key: this.key
                        }) : this._ensureValidAuthCredentials(!1, (function(t, n) {
                            t ? e(t) : e(null, {
                                access_token: n.token
                            })
                        }))
                    };
                    d.prototype.getAuthHeaders = function(e) {
                        "basic" == this.method ? e(null, {
                            authorization: "Basic " + this.basicKey
                        }) : this._ensureValidAuthCredentials(!1, (function(n, i) {
                            n ? e(n) : e(null, {
                                authorization: "Bearer " + t(i.token)
                            })
                        }))
                    };
                    d.prototype.getTimestamp = function(e, t) {
                        this.isTimeOffsetSet() || !e && !this.authOptions.queryTime ? t(null, this.getTimestampUsingOffset()) : this.client.time(t)
                    };
                    d.prototype.getTimestampUsingOffset = function() {
                        return v.now() + (this.client.serverTimeOffset || 0)
                    };
                    d.prototype.isTimeOffsetSet = function() {
                        return null !== this.client.serverTimeOffset
                    };
                    d.prototype._saveBasicOptions = function(e) {
                        this.method = "basic";
                        this.key = e.key;
                        this.basicKey = t(e.key);
                        this.authOptions = e || {};
                        "clientId" in e && this._userSetClientId(e.clientId)
                    };
                    d.prototype._saveTokenOptions = function(e, t) {
                        this.method = "token";
                        e && (this.tokenParams = e);
                        if (t) {
                            t.token && (t.tokenDetails = "string" == typeof t.token ? {
                                token: t.token
                            } : t.token);
                            t.tokenDetails && (this.tokenDetails = t.tokenDetails);
                            "clientId" in t && this._userSetClientId(t.clientId);
                            this.authOptions = t
                        }
                    };
                    d.prototype._ensureValidAuthCredentials = function(e, t) {
                        var n = this,
                            r = this.tokenDetails;
                        if (r) {
                            if (this._tokenClientIdMismatch(r.clientId)) {
                                t(new k("Mismatch between clientId in token (" + r.clientId + ") and current clientId (" + this.clientId + ")", 40102, 403));
                                return
                            }
                            if (!this.isTimeOffsetSet() || !r.expires || r.expires >= this.getTimestampUsingOffset()) {
                                w.logAction(w.LOG_MINOR, "Auth.getToken()", "using cached token; expires = " + r.expires);
                                t(null, r);
                                return
                            }
                            w.logAction(w.LOG_MINOR, "Auth.getToken()", "deleting expired token");
                            this.tokenDetails = null
                        }(this.waitingForTokenRequest || (this.waitingForTokenRequest = C())).push(t);
                        if (null === this.currentTokenRequestId || e) {
                            var o = this.currentTokenRequestId = f();
                            this.requestToken(this.tokenParams, this.authOptions, (function(e, t) {
                                if (n.currentTokenRequestId > o) w.logAction(w.LOG_MINOR, "Auth._ensureValidAuthCredentials()", "Discarding token request response; overtaken by newer one");
                                else {
                                    n.currentTokenRequestId = null;
                                    var r = n.waitingForTokenRequest || i;
                                    n.waitingForTokenRequest = null;
                                    e ? r(e) : r(null, n.tokenDetails = t)
                                }
                            }))
                        }
                    };
                    d.prototype._userSetClientId = function(e) {
                        if ("string" != typeof e && null !== e) throw new k("clientId must be either a string or null", 40012, 400);
                        if ("*" === e) throw new k('Can’t use "*" as a clientId as that string is reserved. (To change the default token request behaviour to use a wildcard clientId, instantiate the library with {defaultTokenParams: {clientId: "*"}}), or if calling authorize(), pass it in as a tokenParam: authorize({clientId: "*"}, authOptions)', 40012, 400);
                        var t = this._uncheckedSetClientId(e);
                        if (t) throw t
                    };
                    d.prototype._uncheckedSetClientId = function(e) {
                        if (this._tokenClientIdMismatch(e)) {
                            var t = "Unexpected clientId mismatch: client has " + this.clientId + ", requested " + e,
                                n = new k(t, 40102, 401);
                            w.logAction(w.LOG_ERROR, "Auth._uncheckedSetClientId()", t);
                            return n
                        }
                        this.clientId = this.tokenParams.clientId = e;
                        return null
                    };
                    d.prototype._tokenClientIdMismatch = function(e) {
                        return this.clientId && "*" !== this.clientId && e && "*" !== e && this.clientId !== e
                    };
                    d.isTokenErr = function(e) {
                        return e.code && e.code >= 40140 && e.code < 40150
                    };
                    return d
                }(),
                z = function() {
                    var e = function() {},
                        t = f.msgpack;

                    function n(e) {
                        if (!(this instanceof n)) return new n(e);
                        if (!e) {
                            var t = "no options provided";
                            w.logAction(w.LOG_ERROR, "Rest()", t);
                            throw new Error(t)
                        }(e = m.objectifyOptions(e)).log && w.setLog(e.log.level, e.log.handler);
                        w.logAction(w.LOG_MICRO, "Rest()", "initialized with clientOptions " + v.inspect(e));
                        this.options = m.normaliseOptions(e);
                        if (e.key) {
                            var r = e.key.match(/^([^:\s]+):([^:.\s]+)$/);
                            if (!r) {
                                t = "invalid key parameter";
                                w.logAction(w.LOG_ERROR, "Rest()", t);
                                throw new Error(t)
                            }
                            e.keyName = r[1];
                            e.keySecret = r[2]
                        }
                        if ("clientId" in e) {
                            if ("string" != typeof e.clientId && null !== e.clientId) throw new k("clientId must be either a string or null", 40012, 400);
                            if ("*" === e.clientId) throw new k('Can’t use "*" as a clientId as that string is reserved. (To change the default token request behaviour to use a wildcard clientId, use {defaultTokenParams: {clientId: "*"}})', 40012, 400)
                        }
                        w.logAction(w.LOG_MINOR, "Rest()", "started; version = " + m.libstring);
                        this.baseUri = this.authority = function(t) {
                            return m.getHttpScheme(e) + t + ":" + m.getPort(e, !1)
                        };
                        this._currentFallback = null;
                        this.serverTimeOffset = null;
                        this.auth = new j(this, e);
                        this.channels = new i(this);
                        this.push = new K(this)
                    }
                    n.prototype.stats = function(t, n) {
                        if (void 0 === n)
                            if ("function" == typeof t) {
                                n = t;
                                t = null
                            } else {
                                if (this.options.promises) return v.promisify(this, "stats", arguments);
                                n = e
                            }
                        var i = v.defaultGetHeaders(),
                            r = this.options.useBinaryProtocol ? "msgpack" : "json",
                            o = b.supportsLinkHeaders ? void 0 : r;
                        this.options.headers && v.mixin(i, this.options.headers);
                        new H(this, "/stats", i, o, (function(e, t, n) {
                            for (var i = n ? e : JSON.parse(e), r = 0; r < i.length; r++) i[r] = E.fromValues(i[r]);
                            return i
                        })).get(t, n)
                    };
                    n.prototype.time = function(t, n) {
                        if (void 0 === n)
                            if ("function" == typeof t) {
                                n = t;
                                t = null
                            } else {
                                if (this.options.promises) return v.promisify(this, "time", arguments);
                                n = e
                            }
                        var i = v.defaultGetHeaders();
                        this.options.headers && v.mixin(i, this.options.headers);
                        var r = this,
                            o = function(e) {
                                return r.authority(e) + "/time"
                            };
                        b.get(this, o, i, t, (function(e, t, i, o) {
                            if (e) n(e);
                            else {
                                o || (t = JSON.parse(t));
                                var s = t[0];
                                if (s) {
                                    r.serverTimeOffset = s - v.now();
                                    n(null, s)
                                } else {
                                    (e = new Error("Internal error (unexpected result type from GET /time)")).statusCode = 500;
                                    n(e)
                                }
                            }
                        }))
                    };
                    n.prototype.request = function(n, i, r, o, s, a) {
                        var c = this.options.useBinaryProtocol,
                            u = c ? t.encode : JSON.stringify,
                            l = c ? t.decode : JSON.parse,
                            h = c ? "msgpack" : "json",
                            p = b.supportsLinkHeaders ? void 0 : h;
                        r = r || {};
                        var f = "get" == (n = n.toLowerCase()) ? v.defaultGetHeaders(h) : v.defaultPostHeaders(h);
                        if (void 0 === a) {
                            if (this.options.promises) return v.promisify(this, "request", [n, i, r, o, s]);
                            a = e
                        }
                        "string" != typeof o && (o = u(o));
                        this.options.headers && v.mixin(f, this.options.headers);
                        s && v.mixin(f, s);
                        var d = new H(this, i, f, p, (function(e, t, n) {
                            return v.ensureArray(n ? e : l(e))
                        }), !0);
                        if (!v.arrIn(b.methods, n)) throw new k("Unsupported method " + n, 40500, 405);
                        v.arrIn(b.methodsWithBody, n) ? d[n](r, o, a) : d[n](r, a)
                    };
                    n.prototype.setLog = function(e) {
                        w.setLog(e.level, e.handler)
                    };

                    function i(e) {
                        this.rest = e;
                        this.attached = {}
                    }
                    i.prototype.get = function(e, t) {
                        e = String(e);
                        var n = this.attached[e];
                        n ? t && n.setOptions(t) : this.attached[e] = n = new Q(this.rest, e, t);
                        return n
                    };
                    i.prototype.release = function(e) {
                        delete this.attached[String(e)]
                    };
                    return n
                }();
            z.Promise = function(e) {
                (e = m.objectifyOptions(e)).promises = !0;
                return new z(e)
            };
            z.Callbacks = z;
            var V = function() {
                function e(n) {
                    if (!(this instanceof e)) return new e(n);
                    w.logAction(w.LOG_MINOR, "Realtime()", "");
                    z.call(this, n);
                    this.connection = new J(this, this.options);
                    this.channels = new t(this);
                    !1 !== n.autoConnect && this.connect()
                }
                v.inherits(e, z);
                e.prototype.connect = function() {
                    w.logAction(w.LOG_MINOR, "Realtime.connect()", "");
                    this.connection.connect()
                };
                e.prototype.close = function() {
                    w.logAction(w.LOG_MINOR, "Realtime.close()", "");
                    this.connection.close()
                };

                function t(e) {
                    A.call(this);
                    this.realtime = e;
                    this.all = {};
                    this.inProgress = {};
                    var t = this;
                    e.connection.connectionManager.on("transport.active", (function() {
                        t.onTransportActive()
                    }))
                }
                v.inherits(t, A);
                t.prototype.onChannelMessage = function(e) {
                    var t = e.channel;
                    if (void 0 !== t) {
                        var n = this.all[t];
                        n ? n.onMessage(e) : w.logAction(w.LOG_ERROR, "Channels.onChannelMessage()", "received event for non-existent channel: " + t)
                    } else w.logAction(w.LOG_ERROR, "Channels.onChannelMessage()", "received event unspecified channel, action = " + e.action)
                };
                t.prototype.onTransportActive = function() {
                    for (var e in this.all) {
                        var t = this.all[e];
                        "attaching" === t.state || "detaching" === t.state ? t.checkPendingState() : "suspended" === t.state && t.attach()
                    }
                };
                t.prototype.reattach = function(e) {
                    for (var t in this.all) {
                        var n = this.all[t];
                        "attached" === n.state && n.requestState("attaching", e)
                    }
                };
                t.prototype.resetAttachedMsgIndicators = function() {
                    for (var e in this.all) {
                        var t = this.all[e];
                        "attached" === t.state && (t._attachedMsgIndicator = !1)
                    }
                };
                t.prototype.checkAttachedMsgIndicators = function(e) {
                    for (var t in this.all) {
                        var n = this.all[t];
                        if ("attached" === n.state && !1 === n._attachedMsgIndicator) {
                            var i = "30s after a resume, found channel which has not received an attached; channelId = " + t + "; connectionId = " + e;
                            w.logAction(w.LOG_ERROR, "Channels.checkAttachedMsgIndicators()", i);
                            S.report("error", i, "channel-no-attached-after-resume");
                            n.requestState("attaching")
                        }
                    }
                };
                t.prototype.propogateConnectionInterruption = function(e, t) {
                    var n = ["attaching", "attached", "detaching", "suspended"],
                        i = {
                            closing: "detached",
                            closed: "detached",
                            failed: "failed",
                            suspended: "suspended"
                        }[e];
                    for (var r in this.all) {
                        var o = this.all[r];
                        v.arrIn(n, o.state) && o.notifyState(i, t)
                    }
                };
                t.prototype.get = function(e, t) {
                    e = String(e);
                    var n = this.all[e];
                    n ? t && n.setOptions(t) : n = this.all[e] = new X(this.realtime, e, t);
                    return n
                };
                t.prototype.release = function(e) {
                    this.all[e] && delete this.all[e]
                };
                t.prototype.setInProgress = function(e, t, n) {
                    this.inProgress[e.name] = this.inProgress[e.name] || {};
                    this.inProgress[e.name][t] = n;
                    !n && this.hasNopending() && this.emit("nopending")
                };
                t.prototype.onceNopending = function(e) {
                    this.hasNopending() ? e() : this.once("nopending", e)
                };
                t.prototype.hasNopending = function() {
                    return v.arrEvery(v.valuesArray(this.inProgress, !0), (function(e) {
                        return !v.containsValue(e, !0)
                    }))
                };
                return e
            }();
            V.Promise = function(e) {
                (e = m.objectifyOptions(e)).promises = !0;
                return new V(e)
            };
            V.Callbacks = V;
            var F = function() {
                    function e(e, t, n, i) {
                        this.previous = e;
                        this.current = t;
                        n && (this.retryIn = n);
                        i && (this.reason = i)
                    }
                    return e
                }(),
                W = function() {
                    function e(e, t, n, i) {
                        this.previous = e;
                        this.current = t;
                        "attached" === t && (this.resumed = n);
                        i && (this.reason = i)
                    }
                    return e
                }(),
                J = function() {
                    function e() {}

                    function t(e, t) {
                        A.call(this);
                        this.ably = e;
                        this.connectionManager = new U(e, t);
                        this.state = this.connectionManager.state.state;
                        this.key = void 0;
                        this.id = void 0;
                        this.serial = void 0;
                        this.timeSerial = void 0;
                        this.recoveryKey = void 0;
                        this.errorReason = null;
                        var n = this;
                        this.connectionManager.on("connectionstate", (function(e) {
                            var t = n.state = e.current;
                            v.nextTick((function() {
                                n.emit(t, e)
                            }))
                        }));
                        this.connectionManager.on("update", (function(e) {
                            v.nextTick((function() {
                                n.emit("update", e)
                            }))
                        }))
                    }
                    v.inherits(t, A);
                    t.prototype.whenState = function(e, t) {
                        A.prototype.whenState.call(this, e, this.state, t, new F(void 0, e))
                    };
                    t.prototype.connect = function() {
                        w.logAction(w.LOG_MINOR, "Connection.connect()", "");
                        this.connectionManager.requestState({
                            state: "connecting"
                        })
                    };
                    t.prototype.ping = function(t) {
                        w.logAction(w.LOG_MINOR, "Connection.ping()", "");
                        if (!t) {
                            if (this.ably.options.promises) return v.promisify(this, "ping", arguments);
                            t = e
                        }
                        this.connectionManager.ping(null, t)
                    };
                    t.prototype.close = function() {
                        w.logAction(w.LOG_MINOR, "Connection.close()", "connectionKey = " + this.key);
                        this.connectionManager.requestState({
                            state: "closing"
                        })
                    };
                    return t
                }(),
                K = function() {
                    var e = function() {};

                    function t(e) {
                        this.rest = e;
                        this.admin = new n(e)
                    }

                    function n(e) {
                        this.rest = e;
                        this.deviceRegistrations = new i(e);
                        this.channelSubscriptions = new r(e)
                    }
                    n.prototype.publish = function(t, n, i) {
                        var r = this.rest,
                            o = r.options.useBinaryProtocol ? "msgpack" : "json",
                            s = v.mixin({
                                recipient: t
                            }, n),
                            a = v.defaultPostHeaders(o),
                            c = {};
                        if ("function" != typeof i) {
                            if (this.rest.options.promises) return v.promisify(this, "publish", arguments);
                            i = e
                        }
                        r.options.headers && v.mixin(a, r.options.headers);
                        r.options.pushFullWait && v.mixin(c, {
                            fullWait: "true"
                        });
                        s = v.encodeBody(s, o);
                        D.post(r, "/push/publish", s, a, c, !1, (function(e) {
                            i(e)
                        }))
                    };

                    function i(e) {
                        this.rest = e
                    }
                    i.prototype.save = function(t, n) {
                        var i = this.rest,
                            r = i.options.useBinaryProtocol ? "msgpack" : "json",
                            o = _.fromValues(t),
                            s = v.defaultPostHeaders(r),
                            a = {};
                        if ("function" != typeof n) {
                            if (this.rest.options.promises) return v.promisify(this, "save", arguments);
                            n = e
                        }
                        i.options.headers && v.mixin(s, i.options.headers);
                        i.options.pushFullWait && v.mixin(a, {
                            fullWait: "true"
                        });
                        o = v.encodeBody(o, r);
                        D.put(i, "/push/deviceRegistrations/" + encodeURIComponent(t.id), o, s, a, !1, (function(e, t, i, o) {
                            n(e, !e && _.fromResponseBody(t, !o && r))
                        }))
                    };
                    i.prototype.get = function(t, n) {
                        var i = this.rest,
                            r = i.options.useBinaryProtocol ? "msgpack" : "json",
                            o = v.defaultGetHeaders(r),
                            s = t.id || t;
                        if ("function" != typeof n) {
                            if (this.rest.options.promises) return v.promisify(this, "get", arguments);
                            n = e
                        }
                        if ("string" == typeof s && s.length) {
                            i.options.headers && v.mixin(o, i.options.headers);
                            D.get(i, "/push/deviceRegistrations/" + encodeURIComponent(s), o, {}, !1, (function(e, t, i, o) {
                                n(e, !e && _.fromResponseBody(t, !o && r))
                            }))
                        } else n(new k("First argument to DeviceRegistrations#get must be a deviceId string or DeviceDetails", 4e4, 400))
                    };
                    i.prototype.list = function(t, n) {
                        var i = this.rest,
                            r = i.options.useBinaryProtocol ? "msgpack" : "json",
                            o = b.supportsLinkHeaders ? void 0 : r,
                            s = v.defaultGetHeaders(r);
                        if ("function" != typeof n) {
                            if (this.rest.options.promises) return v.promisify(this, "list", arguments);
                            n = e
                        }
                        i.options.headers && v.mixin(s, i.options.headers);
                        new H(i, "/push/deviceRegistrations", s, o, (function(e, t, n) {
                            return _.fromResponseBody(e, !n && r)
                        })).get(t, n)
                    };
                    i.prototype.remove = function(t, n) {
                        var i = this.rest,
                            r = i.options.useBinaryProtocol ? "msgpack" : "json",
                            o = v.defaultGetHeaders(r),
                            s = {},
                            a = t.id || t;
                        if ("function" != typeof n) {
                            if (this.rest.options.promises) return v.promisify(this, "remove", arguments);
                            n = e
                        }
                        if ("string" == typeof a && a.length) {
                            i.options.headers && v.mixin(o, i.options.headers);
                            i.options.pushFullWait && v.mixin(s, {
                                fullWait: "true"
                            });
                            D.delete(i, "/push/deviceRegistrations/" + encodeURIComponent(a), o, s, !1, (function(e) {
                                n(e)
                            }))
                        } else n(new k("First argument to DeviceRegistrations#remove must be a deviceId string or DeviceDetails", 4e4, 400))
                    };
                    i.prototype.removeWhere = function(t, n) {
                        var i = this.rest,
                            r = i.options.useBinaryProtocol ? "msgpack" : "json",
                            o = v.defaultGetHeaders(r);
                        if ("function" != typeof n) {
                            if (this.rest.options.promises) return v.promisify(this, "removeWhere", arguments);
                            n = e
                        }
                        i.options.headers && v.mixin(o, i.options.headers);
                        i.options.pushFullWait && v.mixin(t, {
                            fullWait: "true"
                        });
                        D.delete(i, "/push/deviceRegistrations", o, t, !1, (function(e) {
                            n(e)
                        }))
                    };

                    function r(e) {
                        this.rest = e
                    }
                    r.prototype.save = function(t, n) {
                        var i = this.rest,
                            r = i.options.useBinaryProtocol ? "msgpack" : "json",
                            o = P.fromValues(t),
                            s = v.defaultPostHeaders(r),
                            a = {};
                        if ("function" != typeof n) {
                            if (this.rest.options.promises) return v.promisify(this, "save", arguments);
                            n = e
                        }
                        i.options.headers && v.mixin(s, i.options.headers);
                        i.options.pushFullWait && v.mixin(a, {
                            fullWait: "true"
                        });
                        o = v.encodeBody(o, r);
                        D.post(i, "/push/channelSubscriptions", o, s, a, !1, (function(e, t, i, o) {
                            n(e, !e && P.fromResponseBody(t, !o && r))
                        }))
                    };
                    r.prototype.list = function(t, n) {
                        var i = this.rest,
                            r = i.options.useBinaryProtocol ? "msgpack" : "json",
                            o = b.supportsLinkHeaders ? void 0 : r,
                            s = v.defaultGetHeaders(r);
                        if ("function" != typeof n) {
                            if (this.rest.options.promises) return v.promisify(this, "list", arguments);
                            n = e
                        }
                        i.options.headers && v.mixin(s, i.options.headers);
                        new H(i, "/push/channelSubscriptions", s, o, (function(e, t, n) {
                            return P.fromResponseBody(e, !n && r)
                        })).get(t, n)
                    };
                    r.prototype.removeWhere = function(t, n) {
                        var i = this.rest,
                            r = i.options.useBinaryProtocol ? "msgpack" : "json",
                            o = v.defaultGetHeaders(r);
                        if ("function" != typeof n) {
                            if (this.rest.options.promises) return v.promisify(this, "removeWhere", arguments);
                            n = e
                        }
                        i.options.headers && v.mixin(o, i.options.headers);
                        i.options.pushFullWait && v.mixin(t, {
                            fullWait: "true"
                        });
                        D.delete(i, "/push/channelSubscriptions", o, t, !1, (function(e) {
                            n(e)
                        }))
                    };
                    r.prototype.remove = r.prototype.removeWhere;
                    r.prototype.listChannels = function(t, n) {
                        var i = this.rest,
                            r = i.options.useBinaryProtocol ? "msgpack" : "json",
                            o = b.supportsLinkHeaders ? void 0 : r,
                            s = v.defaultGetHeaders(r);
                        if ("function" != typeof n) {
                            if (this.rest.options.promises) return v.promisify(this, "listChannels", arguments);
                            n = e
                        }
                        i.options.headers && v.mixin(s, i.options.headers);
                        i.options.pushFullWait && v.mixin(t, {
                            fullWait: "true"
                        });
                        new H(i, "/push/channels", s, o, (function(e, t, n) {
                            !n && r && (e = v.decodeBody(e, r));
                            for (var i = 0; i < e.length; i++) e[i] = String(e[i]);
                            return e
                        })).get(t, n)
                    };
                    return t
                }(),
                Q = function() {
                    function e() {}
                    var t = 9;

                    function n(e, t, n) {
                        w.logAction(w.LOG_MINOR, "Channel()", "started; name = " + t);
                        A.call(this);
                        this.rest = e;
                        this.name = t;
                        this.basePath = "/channels/" + encodeURIComponent(t);
                        this.presence = new B(this);
                        this.setOptions(n)
                    }
                    v.inherits(n, A);
                    n.prototype.setOptions = function(e) {
                        this.channelOptions = e = e || {};
                        if (e.cipher) {
                            if (!d) throw new Error("Encryption not enabled; use ably.encryption.js instead");
                            var t = d.getCipher(e.cipher);
                            e.cipher = t.cipherParams;
                            e.channelCipher = t.cipher
                        } else if ("cipher" in e) {
                            e.cipher = null;
                            e.channelCipher = null
                        }
                    };
                    n.prototype.history = function(t, n) {
                        w.logAction(w.LOG_MICRO, "Channel.history()", "channel = " + this.name);
                        if (void 0 === n)
                            if ("function" == typeof t) {
                                n = t;
                                t = null
                            } else {
                                if (this.rest.options.promises) return v.promisify(this, "history", arguments);
                                n = e
                            }
                        this._history(t, n)
                    };
                    n.prototype._history = function(e, t) {
                        var n = this.rest,
                            i = n.options.useBinaryProtocol ? "msgpack" : "json",
                            r = b.supportsLinkHeaders ? void 0 : i,
                            o = v.defaultGetHeaders(i);
                        n.options.headers && v.mixin(o, n.options.headers);
                        var s = this.channelOptions;
                        new H(n, this.basePath + "/messages", o, r, (function(e, t, n) {
                            return I.fromResponseBody(e, s, !n && i)
                        })).get(e, t)
                    };

                    function i(e) {
                        return v.arrEvery(e, (function(e) {
                            return !e.id
                        }))
                    }
                    n.prototype.publish = function() {
                        var n, r, o = arguments[0],
                            s = arguments[1],
                            a = arguments[arguments.length - 1],
                            c = this;
                        if ("function" != typeof a) {
                            if (this.rest.options.promises) return v.promisify(this, "publish", arguments);
                            a = e
                        }
                        if ("string" == typeof o || null === o) {
                            n = [I.fromValues({
                                name: o,
                                data: s
                            })];
                            r = arguments[2]
                        } else if (v.isObject(o)) {
                            n = [I.fromValues(o)];
                            r = arguments[1]
                        } else {
                            if (!v.isArray(o)) throw new k("The single-argument form of publish() expects a message object or an array of message objects", 40013, 400);
                            n = I.fromValuesArray(o);
                            r = arguments[1]
                        }
                        "object" == typeof r && r || (r = {});
                        var u = this.rest,
                            l = u.options,
                            h = l.useBinaryProtocol ? "msgpack" : "json",
                            p = u.options.idempotentRestPublishing,
                            f = v.defaultPostHeaders(h);
                        l.headers && v.mixin(f, l.headers);
                        if (p && i(n)) {
                            var d = v.randomString(t);
                            v.arrForEach(n, (function(e, t) {
                                e.id = d + ":" + t.toString()
                            }))
                        }
                        I.encodeArray(n, this.channelOptions, (function(e) {
                            if (e) a(e);
                            else {
                                var t = I.getMessagesSize(n),
                                    i = l.maxMessageSize;
                                t > i ? a(new k("Maximum size of messages that can be published at once exceeded ( was " + t + " bytes; limit is " + i + " bytes)", 40009, 400)) : c._publish(I.serialize(n, h), f, r, a)
                            }
                        }))
                    };
                    n.prototype._publish = function(e, t, n, i) {
                        D.post(this.rest, this.basePath + "/messages", e, t, n, !1, i)
                    };
                    return n
                }(),
                X = function() {
                    var e = T.Action,
                        t = function() {},
                        n = "statechange",
                        i = "sync";

                    function r(e, t, n) {
                        w.logAction(w.LOG_MINOR, "RealtimeChannel()", "started; name = " + t);
                        Q.call(this, e, t, n);
                        this.realtime = e;
                        this.presence = new $(this, e.options);
                        this.connectionManager = e.connection.connectionManager;
                        this.state = "initialized";
                        this.subscriptions = new A;
                        this.syncChannelSerial = void 0;
                        this.properties = {
                            attachSerial: void 0
                        };
                        this.setOptions(n);
                        this.errorReason = null;
                        this._requestedFlags = null;
                        this._mode = null;
                        this._attachedMsgIndicator = !1
                    }
                    v.inherits(r, Q);
                    r.invalidStateError = function(e) {
                        return {
                            statusCode: 400,
                            code: 90001,
                            message: "Channel operation failed as channel state is " + e
                        }
                    };
                    r.progressOps = {
                        statechange: n,
                        sync: i
                    };
                    r.processListenerArgs = function(e) {
                        "function" == typeof(e = Array.prototype.slice.call(e))[0] && e.unshift(null);
                        null == e[e.length - 1] && e.pop();
                        return e
                    };
                    r.prototype.publish = function() {
                        var e = arguments.length,
                            n = arguments[0],
                            i = arguments[e - 1];
                        if ("function" != typeof i) {
                            if (this.realtime.options.promises) return v.promisify(this, "publish", arguments);
                            i = t;
                            ++e
                        }
                        if (this.connectionManager.activeState()) {
                            if (2 == e)
                                if (v.isObject(n)) n = [I.fromValues(n)];
                                else {
                                    if (!v.isArray(n)) throw new k("The single-argument form of publish() expects a message object or an array of message objects", 40013, 400);
                                    n = I.fromValuesArray(n)
                                }
                            else n = [I.fromValues({
                                name: arguments[0],
                                data: arguments[1]
                            })];
                            var r = this,
                                o = this.realtime.options.maxMessageSize;
                            I.encodeArray(n, this.channelOptions, (function(e) {
                                if (e) i(e);
                                else {
                                    var t = I.getMessagesSize(n);
                                    t > o ? i(new k("Maximum size of messages that can be published at once exceeded ( was " + t + " bytes; limit is " + o + " bytes)", 40009, 400)) : r._publish(n, i)
                                }
                            }))
                        } else i(this.connectionManager.getError())
                    };
                    r.prototype._publish = function(t, n) {
                        w.logAction(w.LOG_MICRO, "RealtimeChannel.publish()", "message count = " + t.length);
                        var i = this.state;
                        switch (i) {
                            case "failed":
                            case "suspended":
                                n(k.fromValues(r.invalidStateError(i)));
                                break;
                            default:
                                w.logAction(w.LOG_MICRO, "RealtimeChannel.publish()", "sending message; channel state is " + i);
                                var o = new T;
                                o.action = e.MESSAGE;
                                o.channel = this.name;
                                o.messages = t;
                                this.sendMessage(o, n)
                        }
                    };
                    r.prototype.onEvent = function(e) {
                        w.logAction(w.LOG_MICRO, "RealtimeChannel.onEvent()", "received message");
                        for (var t = this.subscriptions, n = 0; n < e.length; n++) {
                            var i = e[n];
                            t.emit(i.name, i)
                        }
                    };
                    r.prototype.attach = function(e, t) {
                        if ("function" == typeof e) {
                            t = e;
                            e = null
                        }
                        if (!t) {
                            if (this.realtime.options.promises) return v.promisify(this, "attach", arguments);
                            t = function(e) {
                                e && w.logAction(w.LOG_MAJOR, "RealtimeChannel.attach()", "Channel attach failed: " + e.toString())
                            }
                        }
                        e && (this._requestedFlags = e);
                        var n = this.connectionManager;
                        if (n.activeState()) switch (this.state) {
                            case "attached":
                                if (!e) {
                                    t();
                                    break
                                }
                            default:
                                this.requestState("attaching");
                            case "attaching":
                                this.once((function(e) {
                                    switch (this.event) {
                                        case "attached":
                                            t();
                                            break;
                                        case "detached":
                                        case "suspended":
                                        case "failed":
                                            t(e.reason || n.getError());
                                            break;
                                        case "detaching":
                                            t(new k("Attach request superseded by a subsequent detach request", 9e4, 409))
                                    }
                                }))
                        } else t(n.getError())
                    };
                    r.prototype.attachImpl = function() {
                        w.logAction(w.LOG_MICRO, "RealtimeChannel.attachImpl()", "sending ATTACH message");
                        this.setInProgress(n, !0);
                        var i = T.fromValues({
                            action: e.ATTACH,
                            channel: this.name
                        });
                        this._requestedFlags && v.arrForEach(this._requestedFlags, (function(e) {
                            i.setFlag(e)
                        }));
                        this.sendMessage(i, t)
                    };
                    r.prototype.detach = function(e) {
                        if (!e) {
                            if (this.realtime.options.promises) return v.promisify(this, "detach", arguments);
                            e = t
                        }
                        var n = this.connectionManager;
                        if (n.activeState()) switch (this.state) {
                            case "detached":
                            case "failed":
                                e();
                                break;
                            default:
                                this.requestState("detaching");
                            case "detaching":
                                this.once((function(t) {
                                    switch (this.event) {
                                        case "detached":
                                            e();
                                            break;
                                        case "attached":
                                        case "suspended":
                                        case "failed":
                                            e(t.reason || n.getError());
                                            break;
                                        case "attaching":
                                            e(new k("Detach request superseded by a subsequent attach request", 9e4, 409))
                                    }
                                }))
                        } else e(n.getError())
                    };
                    r.prototype.detachImpl = function(i) {
                        w.logAction(w.LOG_MICRO, "RealtimeChannel.detach()", "sending DETACH message");
                        this.setInProgress(n, !0);
                        var r = T.fromValues({
                            action: e.DETACH,
                            channel: this.name
                        });
                        this.sendMessage(r, i || t)
                    };
                    r.prototype.subscribe = function() {
                        var e = r.processListenerArgs(arguments),
                            n = e[0],
                            i = e[1],
                            o = e[2];
                        if (!o) {
                            if (this.realtime.options.promises) return v.promisify(this, "subscribe", [n, i]);
                            o = t
                        }
                        if ("failed" !== this.state) {
                            this.subscriptions.on(n, i);
                            return this.attach(o)
                        }
                        o(k.fromValues(r.invalidStateError("failed")))
                    };
                    r.prototype.unsubscribe = function() {
                        var e = r.processListenerArgs(arguments),
                            t = e[0],
                            n = e[1];
                        this.subscriptions.off(t, n)
                    };
                    r.prototype.sync = function() {
                        switch (this.state) {
                            case "initialized":
                            case "detaching":
                            case "detached":
                                throw new k("Unable to sync to channel; not attached", 4e4)
                        }
                        var t = this.connectionManager;
                        if (!t.activeState()) throw t.getError();
                        var n = T.fromValues({
                            action: e.SYNC,
                            channel: this.name
                        });
                        this.syncChannelSerial && (n.channelSerial = this.syncChannelSerial);
                        t.send(n)
                    };
                    r.prototype.sendMessage = function(e, t) {
                        this.connectionManager.send(e, this.realtime.options.queueMessages, t)
                    };
                    r.prototype.sendPresence = function(t, n) {
                        var i = T.fromValues({
                            action: e.PRESENCE,
                            channel: this.name,
                            presence: v.isArray(t) ? M.fromValuesArray(t) : [M.fromValues(t)]
                        });
                        this.sendMessage(i, n)
                    };
                    r.prototype.onMessage = function(t) {
                        var n, i = !1;
                        switch (t.action) {
                            case e.ATTACHED:
                                this._attachedMsgIndicator = !0;
                                this.properties.attachSerial = t.channelSerial;
                                this._mode = t.getMode();
                                if ("attached" === this.state) {
                                    var r = t.hasFlag("RESUMED");
                                    if (!r || this.channelOptions.updateOnAttached) {
                                        this.presence.onAttached(t.hasFlag("HAS_PRESENCE"));
                                        var o = new W(this.state, this.state, r, t.error);
                                        this.emit("update", o)
                                    }
                                } else this.notifyState("attached", t.error, t.hasFlag("RESUMED"), t.hasFlag("HAS_PRESENCE"));
                                break;
                            case e.DETACHED:
                                var s = t.error ? k.fromValues(t.error) : new k("Channel detached", 90001, 404);
                                "detaching" === this.state ? this.notifyState("detached", s) : "attaching" === this.state ? this.notifyState("suspended", s) : this.requestState("attaching", s);
                                break;
                            case e.SYNC:
                                i = !0;
                                n = this.syncChannelSerial = t.channelSerial;
                                if (!t.presence) break;
                            case e.PRESENCE:
                                for (var a = t.presence, c = t.id, u = t.connectionId, l = t.timestamp, h = this.channelOptions, p = 0; p < a.length; p++) {
                                    try {
                                        var f = a[p];
                                        M.decode(f, h)
                                    } catch (e) {
                                        w.logAction(w.LOG_ERROR, "RealtimeChannel.onMessage()", e.toString())
                                    }
                                    f.connectionId || (f.connectionId = u);
                                    f.timestamp || (f.timestamp = l);
                                    f.id || (f.id = c + ":" + p)
                                }
                                this.presence.setPresence(a, i, n);
                                break;
                            case e.MESSAGE:
                                var d = t.messages;
                                for (c = t.id, u = t.connectionId, l = t.timestamp, h = this.channelOptions, p = 0; p < d.length; p++) {
                                    try {
                                        var g = d[p];
                                        I.decode(g, h)
                                    } catch (e) {
                                        w.logAction(w.LOG_MINOR, "RealtimeChannel.onMessage()", e.toString())
                                    }
                                    g.connectionId || (g.connectionId = u);
                                    g.timestamp || (g.timestamp = l);
                                    g.id || (g.id = c + ":" + p)
                                }
                                this.onEvent(d);
                                break;
                            case e.ERROR:
                                (s = t.error) && 80016 == s.code ? this.checkPendingState() : this.notifyState("failed", k.fromValues(s));
                                break;
                            default:
                                w.logAction(w.LOG_ERROR, "RealtimeChannel.onMessage()", "Fatal protocol error: unrecognised action (" + t.action + ")");
                                this.connectionManager.abort(x.unknownChannelErr)
                        }
                    };
                    r.prototype.onAttached = function() {
                        w.logAction(w.LOG_MINOR, "RealtimeChannel.onAttached", "activating channel; name = " + this.name)
                    };
                    r.prototype.notifyState = function(e, t, r, o) {
                        w.logAction(w.LOG_MICRO, "RealtimeChannel.notifyState", "name = " + this.name + ", current state = " + this.state + ", notifying state " + e);
                        this.clearStateTimer();
                        if (e !== this.state) {
                            this.presence.actOnChannelState(e, o, t);
                            "suspended" === e && this.connectionManager.state.sendEvents ? this.startRetryTimer() : this.cancelRetryTimer();
                            t && (this.errorReason = t);
                            var s = new W(this.state, e, r, t),
                                a = "failed" === e ? w.LOG_ERROR : w.LOG_MAJOR;
                            w.logAction(a, 'Channel state for channel "' + this.name + '"', e + (t ? "; reason: " + t : ""));
                            if ("attached" === e) {
                                this.onAttached();
                                this.setInProgress(i, o);
                                this.setInProgress(n, !1)
                            } else if ("detached" === e || "failed" === e || "suspended" === e) {
                                this.setInProgress(n, !1);
                                this.setInProgress(i, !1)
                            }
                            this.state = e;
                            this.emit(e, s)
                        }
                    };
                    r.prototype.requestState = function(e, t) {
                        w.logAction(w.LOG_MINOR, "RealtimeChannel.requestState", "name = " + this.name + ", state = " + e);
                        this.notifyState(e, t);
                        this.checkPendingState()
                    };
                    r.prototype.checkPendingState = function() {
                        var e = this.connectionManager.state;
                        if (e.sendEvents || e.forceQueueEvents) {
                            w.logAction(w.LOG_MINOR, "RealtimeChannel.checkPendingState", "name = " + this.name + ", state = " + this.state);
                            switch (this.state) {
                                case "attaching":
                                    this.startStateTimerIfNotRunning();
                                    this.attachImpl();
                                    break;
                                case "detaching":
                                    this.startStateTimerIfNotRunning();
                                    this.detachImpl();
                                    break;
                                case "attached":
                                    this.sync()
                            }
                        } else w.logAction(w.LOG_MINOR, "RealtimeChannel.checkPendingState", "sendEvents is false; state is " + this.connectionManager.state.state)
                    };
                    r.prototype.timeoutPendingState = function() {
                        switch (this.state) {
                            case "attaching":
                                var e = new k("Channel attach timed out", 90007, 408);
                                this.notifyState("suspended", e);
                                break;
                            case "detaching":
                                e = new k("Channel detach timed out", 90007, 408);
                                this.notifyState("attached", e);
                                break;
                            default:
                                this.checkPendingState()
                        }
                    };
                    r.prototype.startStateTimerIfNotRunning = function() {
                        var e = this;
                        this.stateTimer || (this.stateTimer = setTimeout((function() {
                            w.logAction(w.LOG_MINOR, "RealtimeChannel.startStateTimerIfNotRunning", "timer expired");
                            e.stateTimer = null;
                            e.timeoutPendingState()
                        }), this.realtime.options.timeouts.realtimeRequestTimeout))
                    };
                    r.prototype.clearStateTimer = function() {
                        var e = this.stateTimer;
                        if (e) {
                            clearTimeout(e);
                            this.stateTimer = null
                        }
                    };
                    r.prototype.startRetryTimer = function() {
                        var e = this;
                        this.retryTimer || (this.retryTimer = setTimeout((function() {
                            if ("suspended" === e.state && e.connectionManager.state.sendEvents) {
                                e.retryTimer = null;
                                w.logAction(w.LOG_MINOR, "RealtimeChannel retry timer expired", "attempting a new attach");
                                e.requestState("attaching")
                            }
                        }), this.realtime.options.timeouts.channelRetryTimeout))
                    };
                    r.prototype.cancelRetryTimer = function() {
                        if (this.retryTimer) {
                            clearTimeout(this.retryTimer);
                            this.suspendTimer = null
                        }
                    };
                    r.prototype.setInProgress = function(e, t) {
                        this.rest.channels.setInProgress(this, e, t)
                    };
                    r.prototype.history = function(e, n) {
                        w.logAction(w.LOG_MICRO, "RealtimeChannel.history()", "channel = " + this.name);
                        if (void 0 === n)
                            if ("function" == typeof e) {
                                n = e;
                                e = null
                            } else {
                                if (this.rest.options.promises) return v.promisify(this, "history", arguments);
                                n = t
                            }
                        if (e && e.untilAttach) {
                            if ("attached" !== this.state) {
                                n(new k("option untilAttach requires the channel to be attached", 4e4, 400));
                                return
                            }
                            if (!this.properties.attachSerial) {
                                n(new k("untilAttach was specified and channel is attached, but attachSerial is not defined", 4e4, 400));
                                return
                            }
                            delete e.untilAttach;
                            e.from_serial = this.properties.attachSerial
                        }
                        Q.prototype._history.call(this, e, n)
                    };
                    r.prototype.whenState = function(e, t) {
                        A.prototype.whenState.call(this, e, this.state, t)
                    };
                    return r
                }(),
                $ = function() {
                    var e = function() {};

                    function t(e) {
                        return e.clientId + ":" + e.connectionId
                    }

                    function n(e) {
                        return e.channel.realtime.auth.clientId
                    }

                    function i(e) {
                        var t = e.channel.realtime,
                            n = t.auth.clientId;
                        return (!n || "*" === n) && "connected" === t.connection.state
                    }

                    function r(e, t, n) {
                        switch (e.state) {
                            case "attached":
                            case "suspended":
                                n();
                                break;
                            case "initialized":
                            case "detached":
                            case "detaching":
                            case "attaching":
                                e.attach((function(e) {
                                    e ? t(e) : n()
                                }));
                                break;
                            default:
                                t(k.fromValues(X.invalidStateError(e.state)))
                        }
                    }

                    function o(e, t) {
                        B.call(this, e);
                        this.syncComplete = !1;
                        this.members = new s(this);
                        this._myMembers = new s(this);
                        this.subscriptions = new A;
                        this.pendingPresence = []
                    }
                    v.inherits(o, B);
                    o.prototype.enter = function(e, t) {
                        if (i(this)) throw new k("clientId must be specified to enter a presence channel", 40012, 400);
                        return this._enterOrUpdateClient(void 0, e, "enter", t)
                    };
                    o.prototype.update = function(e, t) {
                        if (i(this)) throw new k("clientId must be specified to update presence data", 40012, 400);
                        return this._enterOrUpdateClient(void 0, e, "update", t)
                    };
                    o.prototype.enterClient = function(e, t, n) {
                        return this._enterOrUpdateClient(e, t, "enter", n)
                    };
                    o.prototype.updateClient = function(e, t, n) {
                        return this._enterOrUpdateClient(e, t, "update", n)
                    };
                    o.prototype._enterOrUpdateClient = function(t, i, r, o) {
                        if (!o)
                            if ("function" == typeof i) {
                                o = i;
                                i = null
                            } else {
                                if (this.channel.realtime.options.promises) return v.promisify(this, "_enterOrUpdateClient", [t, i, r]);
                                o = e
                            }
                        var s = this.channel;
                        if (s.connectionManager.activeState()) {
                            w.logAction(w.LOG_MICRO, "RealtimePresence." + r + "Client()", "channel = " + s.name + ", client = " + (t || "(implicit) " + n(this)));
                            var a = M.fromValues({
                                action: r,
                                data: i
                            });
                            t && (a.clientId = t);
                            var c = this;
                            M.encode(a, s.channelOptions, (function(e) {
                                if (e) o(e);
                                else switch (s.state) {
                                    case "attached":
                                        s.sendPresence(a, o);
                                        break;
                                    case "initialized":
                                    case "detached":
                                        s.attach();
                                    case "attaching":
                                        c.pendingPresence.push({
                                            presence: a,
                                            callback: o
                                        });
                                        break;
                                    default:
                                        (e = new k("Unable to " + r + " presence channel (incompatible state)", 90001)).code = 90001;
                                        o(e)
                                }
                            }))
                        } else o(s.connectionManager.getError())
                    };
                    o.prototype.leave = function(e, t) {
                        if (i(this)) throw new k("clientId must have been specified to enter or leave a presence channel", 40012, 400);
                        return this.leaveClient(void 0, e, t)
                    };
                    o.prototype.leaveClient = function(t, n, i) {
                        if (!i)
                            if ("function" == typeof n) {
                                i = n;
                                n = null
                            } else {
                                if (this.channel.realtime.options.promises) return v.promisify(this, "leaveClient", [t, n]);
                                i = e
                            }
                        var r = this.channel;
                        if (r.connectionManager.activeState()) {
                            w.logAction(w.LOG_MICRO, "RealtimePresence.leaveClient()", "leaving; channel = " + this.channel.name + ", client = " + t);
                            var o = M.fromValues({
                                action: "leave",
                                data: n
                            });
                            t && (o.clientId = t);
                            switch (r.state) {
                                case "attached":
                                    r.sendPresence(o, i);
                                    break;
                                case "attaching":
                                    this.pendingPresence.push({
                                        presence: o,
                                        callback: i
                                    });
                                    break;
                                case "initialized":
                                case "failed":
                                    i(new k("Unable to leave presence channel (incompatible state)", 90001));
                                    break;
                                default:
                                    i(x.failed)
                            }
                        } else i(r.connectionManager.getError())
                    };
                    o.prototype.get = function() {
                        var t = Array.prototype.slice.call(arguments);
                        1 == t.length && "function" == typeof t[0] && t.unshift(null);
                        var n = t[0],
                            i = t[1],
                            o = !n || !("waitForSync" in n) || n.waitForSync;
                        if (!i) {
                            if (this.channel.realtime.options.promises) return v.promisify(this, "get", t);
                            i = e
                        }

                        function s(e) {
                            i(null, n ? e.list(n) : e.values())
                        }
                        if ("suspended" !== this.channel.state) {
                            var a = this;
                            r(this.channel, i, (function() {
                                var e = a.members;
                                o ? e.waitSync((function() {
                                    s(e)
                                })) : s(e)
                            }))
                        } else o ? i(k.fromValues({
                            statusCode: 400,
                            code: 91005,
                            message: "Presence state is out of sync due to channel being in the SUSPENDED state"
                        })) : s(this.members)
                    };
                    o.prototype.history = function(t, n) {
                        w.logAction(w.LOG_MICRO, "RealtimePresence.history()", "channel = " + this.name);
                        if (void 0 === n)
                            if ("function" == typeof t) {
                                n = t;
                                t = null
                            } else {
                                if (this.channel.realtime.options.promises) return v.promisify(this, "history", arguments);
                                n = e
                            }
                        if (t && t.untilAttach)
                            if ("attached" === this.channel.state) {
                                delete t.untilAttach;
                                t.from_serial = this.channel.properties.attachSerial
                            } else n(new k("option untilAttach requires the channel to be attached, was: " + this.channel.state, 4e4, 400));
                        B.prototype._history.call(this, t, n)
                    };
                    o.prototype.setPresence = function(e, t, n) {
                        w.logAction(w.LOG_MICRO, "RealtimePresence.setPresence()", "received presence for " + e.length + " participants; syncChannelSerial = " + n);
                        var i, r, o = this.members,
                            s = this._myMembers,
                            a = [],
                            c = this.channel.connectionManager.connectionId;
                        if (t) {
                            this.members.startSync();
                            n && (r = n.match(/^[\w\-]+:(.*)$/)) && (i = r[1])
                        }
                        for (var u = 0; u < e.length; u++) {
                            switch ((l = M.fromValues(e[u])).action) {
                                case "leave":
                                    o.remove(l) && a.push(l);
                                    l.connectionId !== c || l.isSynthesized() || s.remove(l);
                                    break;
                                case "enter":
                                case "present":
                                case "update":
                                    o.put(l) && a.push(l);
                                    l.connectionId === c && s.put(l)
                            }
                        }
                        if (t && !i) {
                            o.endSync();
                            this._ensureMyMembersPresent();
                            this.channel.setInProgress(X.progressOps.sync, !1);
                            this.channel.syncChannelSerial = null
                        }
                        for (u = 0; u < a.length; u++) {
                            var l = a[u];
                            this.subscriptions.emit(l.action, l)
                        }
                    };
                    o.prototype.onAttached = function(e) {
                        w.logAction(w.LOG_MINOR, "RealtimePresence.onAttached()", "channel = " + this.channel.name + ", hasPresence = " + e);
                        if (e) this.members.startSync();
                        else {
                            this._synthesizeLeaves(this.members.values());
                            this.members.clear();
                            this._ensureMyMembersPresent()
                        }
                        var t = this.pendingPresence,
                            n = t.length;
                        if (n) {
                            this.pendingPresence = [];
                            var i = [],
                                r = C();
                            w.logAction(w.LOG_MICRO, "RealtimePresence.onAttached", "sending " + n + " queued presence messages");
                            for (var o = 0; o < n; o++) {
                                var s = t[o];
                                i.push(s.presence);
                                r.push(s.callback)
                            }
                            this.channel.sendPresence(i, r)
                        }
                    };
                    o.prototype.actOnChannelState = function(e, t, n) {
                        switch (e) {
                            case "attached":
                                this.onAttached(t);
                                break;
                            case "detached":
                            case "failed":
                                this._clearMyMembers();
                                this.members.clear();
                            case "suspended":
                                this.failPendingPresence(n)
                        }
                    };
                    o.prototype.failPendingPresence = function(e) {
                        if (this.pendingPresence.length) {
                            w.logAction(w.LOG_MINOR, "RealtimeChannel.failPendingPresence", "channel; name = " + this.channel.name + ", err = " + v.inspectError(e));
                            for (var t = 0; t < this.pendingPresence.length; t++) try {
                                this.pendingPresence[t].callback(e)
                            } catch (e) {}
                            this.pendingPresence = []
                        }
                    };
                    o.prototype._clearMyMembers = function() {
                        this._myMembers.clear()
                    };
                    o.prototype._ensureMyMembersPresent = function() {
                        var e = this,
                            t = this.members,
                            n = this._myMembers,
                            i = function(t) {
                                if (t) {
                                    var n = "Presence auto-re-enter failed: " + t.toString(),
                                        i = new k(n, 91004, 400);
                                    w.logAction(w.LOG_ERROR, "RealtimePresence._ensureMyMembersPresent()", n);
                                    var r = new W(e.channel.state, e.channel.state, !0, i);
                                    e.channel.emit("update", r)
                                }
                            };
                        for (var r in n.map)
                            if (!(r in t.map)) {
                                var o = n.map[r];
                                w.logAction(w.LOG_MICRO, "RealtimePresence._ensureMyMembersPresent()", 'Auto-reentering clientId "' + o.clientId + '" into the presence set');
                                this._enterOrUpdateClient(o.clientId, o.data, "enter", i);
                                delete n.map[r]
                            }
                    };
                    o.prototype._synthesizeLeaves = function(e) {
                        var t = this.subscriptions;
                        v.arrForEach(e, (function(e) {
                            var n = M.fromValues({
                                action: "leave",
                                connectionId: e.connectionId,
                                clientId: e.clientId,
                                data: e.data,
                                encoding: e.encoding,
                                timestamp: v.now()
                            });
                            t.emit("leave", n)
                        }))
                    };
                    o.prototype.on = function() {
                        w.deprecated("presence.on", "presence.subscribe");
                        this.subscribe.apply(this, arguments)
                    };
                    o.prototype.off = function() {
                        w.deprecated("presence.off", "presence.unsubscribe");
                        this.unsubscribe.apply(this, arguments)
                    };
                    o.prototype.subscribe = function() {
                        var t = X.processListenerArgs(arguments),
                            n = t[0],
                            i = t[1],
                            r = t[2],
                            o = this.channel;
                        if (!r) {
                            if (this.channel.realtime.options.promises) return v.promisify(this, "subscribe", [n, i]);
                            r = e
                        }
                        if ("failed" !== o.state) {
                            this.subscriptions.on(n, i);
                            o.attach(r)
                        } else r(k.fromValues(X.invalidStateError("failed")))
                    };
                    o.prototype.unsubscribe = function() {
                        var e = X.processListenerArgs(arguments),
                            t = e[0],
                            n = e[1];
                        this.subscriptions.off(t, n)
                    };

                    function s(e) {
                        A.call(this);
                        this.presence = e;
                        this.map = {};
                        this.syncInProgress = !1;
                        this.residualMembers = null
                    }
                    v.inherits(s, A);
                    s.prototype.get = function(e) {
                        return this.map[e]
                    };
                    s.prototype.getClient = function(e) {
                        var t = this.map,
                            n = [];
                        for (var i in t) {
                            var r = t[i];
                            r.clientId == e && "absent" != r.action && n.push(r)
                        }
                        return n
                    };
                    s.prototype.list = function(e) {
                        var t = this.map,
                            n = e && e.clientId,
                            i = e && e.connectionId,
                            r = [];
                        for (var o in t) {
                            var s = t[o];
                            "absent" !== s.action && (n && n != s.clientId || i && i != s.connectionId || r.push(s))
                        }
                        return r
                    };

                    function a(e, t) {
                        if (e.isSynthesized() || t.isSynthesized()) return e.timestamp > t.timestamp;
                        var n = e.parseId(),
                            i = t.parseId();
                        return n.msgSerial === i.msgSerial ? n.index > i.index : n.msgSerial > i.msgSerial
                    }
                    s.prototype.put = function(e) {
                        "enter" !== e.action && "update" !== e.action || ((e = M.fromValues(e)).action = "present");
                        var n = this.map,
                            i = t(e);
                        this.residualMembers && delete this.residualMembers[i];
                        var r = n[i];
                        if (r && !a(e, r)) return !1;
                        n[i] = e;
                        return !0
                    };
                    s.prototype.values = function() {
                        var e = this.map,
                            t = [];
                        for (var n in e) {
                            var i = e[n];
                            "absent" != i.action && t.push(i)
                        }
                        return t
                    };
                    s.prototype.remove = function(e) {
                        var n = this.map,
                            i = t(e),
                            r = n[i];
                        if (r && !a(e, r)) return !1;
                        if (this.syncInProgress) {
                            (e = M.fromValues(e)).action = "absent";
                            n[i] = e
                        } else delete n[i];
                        return !0
                    };
                    s.prototype.startSync = function() {
                        var e = this.map,
                            t = this.syncInProgress;
                        w.logAction(w.LOG_MINOR, "PresenceMap.startSync()", "channel = " + this.presence.channel.name + "; syncInProgress = " + t);
                        if (!this.syncInProgress) {
                            this.residualMembers = v.copy(e);
                            this.setInProgress(!0)
                        }
                    };
                    s.prototype.endSync = function() {
                        var e = this.map,
                            t = this.syncInProgress;
                        w.logAction(w.LOG_MINOR, "PresenceMap.endSync()", "channel = " + this.presence.channel.name + "; syncInProgress = " + t);
                        if (t) {
                            for (var n in e) {
                                "absent" === e[n].action && delete e[n]
                            }
                            this.presence._synthesizeLeaves(v.valuesArray(this.residualMembers));
                            for (var n in this.residualMembers) delete e[n];
                            this.residualMembers = null;
                            this.setInProgress(!1)
                        }
                        this.emit("sync")
                    };
                    s.prototype.waitSync = function(e) {
                        var t = this.syncInProgress;
                        w.logAction(w.LOG_MINOR, "PresenceMap.waitSync()", "channel = " + this.presence.channel.name + "; syncInProgress = " + t);
                        t ? this.once("sync", e) : e()
                    };
                    s.prototype.clear = function(e) {
                        this.map = {};
                        this.setInProgress(!1);
                        this.residualMembers = null
                    };
                    s.prototype.setInProgress = function(e) {
                        w.logAction(w.LOG_MICRO, "PresenceMap.setInProgress()", "inProgress = " + e);
                        this.syncInProgress = e;
                        this.presence.syncComplete = !e
                    };
                    return o
                }(),
                Y = function() {
                    var e = function() {},
                        t = 0,
                        n = {},
                        i = 0,
                        r = 3;

                    function o() {
                        for (var e in n) n[e].dispose()
                    }
                    var s = void 0 !== a && a.XDomainRequest;

                    function c() {
                        var e = navigator.userAgent.toString().match(/MSIE\s([\d.]+)/);
                        return e && Number(e[1])
                    }

                    function l() {
                        var e;
                        return s && (e = c()) && 10 === e
                    }

                    function h(e, t) {
                        return e.getResponseHeader && e.getResponseHeader(t)
                    }

                    function p(e) {
                        return e.getResponseHeader && (e.getResponseHeader("transfer-encoding") || !e.getResponseHeader("content-length"))
                    }

                    function d(e) {
                        for (var t = v.trim(e.getAllResponseHeaders()).split("\r\n"), n = {}, i = 0; i < t.length; i++) {
                            var r = v.arrMap(t[i].split(":"), v.trim);
                            n[r[0].toLowerCase()] = r[1]
                        }
                        return n
                    }

                    function g(e, i, r, o, s, a, c) {
                        A.call(this);
                        (r = r || {}).rnd = v.cheapRandStr();
                        l() && !r.envelope && (r.envelope = "json");
                        this.uri = e + v.toQueryString(r);
                        this.headers = i || {};
                        this.body = o;
                        this.method = c ? c.toUpperCase() : v.isEmptyArg(o) ? "GET" : "POST";
                        this.requestMode = s;
                        this.timeouts = a;
                        this.timedOut = !1;
                        this.requestComplete = !1;
                        n[this.id = String(++t)] = this
                    }
                    v.inherits(g, A);
                    var O = g.createRequest = function(e, t, n, i, r, o, s) {
                        o = o || m.TIMEOUTS;
                        return new g(e, t, v.copy(n), i, r, o, s)
                    };
                    g.prototype.complete = function(e, t, n, i, r) {
                        if (!this.requestComplete) {
                            this.requestComplete = !0;
                            t && this.emit("data", t);
                            this.emit("complete", e, t, n, i, r);
                            this.dispose()
                        }
                    };
                    g.prototype.abort = function() {
                        this.dispose()
                    };
                    g.prototype.exec = function() {
                        var e = this.requestMode == i ? this.timeouts.httpRequestTimeout : this.timeouts.recvTimeout,
                            t = this,
                            n = this.timer = setTimeout((function() {
                                t.timedOut = !0;
                                c.abort()
                            }), e),
                            o = this.body,
                            s = this.method,
                            a = this.headers,
                            c = this.xhr = new XMLHttpRequest,
                            u = a.accept,
                            l = "text";
                        u ? 0 === u.indexOf("application/x-msgpack") && (l = "arraybuffer") : a.accept = "application/json";
                        if (o) {
                            (a["content-type"] || (a["content-type"] = "application/json")).indexOf("application/json") > -1 && "string" != typeof o && (o = JSON.stringify(o))
                        }
                        c.open(s, this.uri, !0);
                        c.responseType = l;
                        "authorization" in a && (c.withCredentials = !0);
                        for (var f in a) c.setRequestHeader(f, a[f]);
                        var g = function(e, n, i, r) {
                            var o = n + " (event type: " + e.type + ")" + (t.xhr.statusText ? ", current statusText is " + t.xhr.statusText : "");
                            w.logAction(w.LOG_ERROR, "Request.on" + e.type + "()", o);
                            t.complete(new k(o, i, r))
                        };
                        c.onerror = function(e) {
                            g(e, "XHR error occurred", null, 400)
                        };
                        c.onabort = function(e) {
                            t.timedOut ? g(e, "Request aborted due to request timeout expiring", null, 408) : g(e, "Request cancelled", null, 400)
                        };
                        c.ontimeout = function(e) {
                            g(e, "Request timed out", null, 408)
                        };
                        var m, b, O, R, A = 0,
                            C = !1;

                        function S() {
                            clearTimeout(n);
                            R = b < 400;
                            204 != b ? m = t.requestMode == r && R && p(c) : t.complete(null, null, null, null, b)
                        }

                        function I() {
                            try {
                                var e, n, i = h(c, "content-type");
                                if (i ? i.indexOf("application/json") >= 0 : "text" == c.responseType) {
                                    (n = "arraybuffer" === c.responseType ? y.utf8Decode(c.response) : String(c.responseText)).length && (n = JSON.parse(n));
                                    C = !0
                                } else n = c.response;
                                if (void 0 !== n.response) {
                                    b = n.statusCode;
                                    R = b < 400;
                                    e = n.headers;
                                    n = n.response
                                } else e = d(c)
                            } catch (e) {
                                t.complete(new k("Malformed response body from server: " + e.message, null, 400));
                                return
                            }
                            if (R || v.isArray(n)) t.complete(null, n, e, C, b);
                            else {
                                var r = n.error;
                                r || (r = new k("Error response received from server: " + b + " body was: " + v.inspect(n), null, b));
                                t.complete(r, n, e, C, b)
                            }
                        }

                        function M() {
                            for (var e, t, n = (O = c.responseText).length - 1; A < n && (e = O.indexOf("\n", A)) > -1;) {
                                t = O.slice(A, e);
                                A = e + 1;
                                T(t)
                            }
                        }

                        function T(e) {
                            try {
                                e = JSON.parse(e)
                            } catch (e) {
                                t.complete(new k("Malformed response body from server: " + e.message, null, 400));
                                return
                            }
                            t.emit("data", e)
                        }

                        function E() {
                            M();
                            t.streamComplete = !0;
                            v.nextTick((function() {
                                t.complete()
                            }))
                        }
                        c.onreadystatechange = function() {
                            var e = c.readyState;
                            if (!(e < 3) && 0 !== c.status) {
                                if (void 0 === b) {
                                    1223 === (b = c.status) && (b = 204);
                                    S()
                                }
                                3 == e && m ? M() : 4 == e && (m ? E() : I())
                            }
                        };
                        c.send(o)
                    };
                    g.prototype.dispose = function() {
                        var t = this.xhr;
                        if (t) {
                            t.onreadystatechange = t.onerror = t.onabort = t.ontimeout = e;
                            this.xhr = null;
                            var i = this.timer;
                            if (i) {
                                clearTimeout(i);
                                this.timer = null
                            }
                            this.requestComplete || t.abort()
                        }
                        delete n[this.id]
                    };
                    if (f.xhrSupported) {
                        "object" == typeof u && u.addUnloadListener(o);
                        if (void 0 !== b) {
                            b.supportsAuthHeaders = !0;
                            b.Request = function(e, t, n, r, o, s, a) {
                                var c = O(n, r, o, s, i, t && t.options.timeouts, e);
                                c.once("complete", a);
                                c.exec();
                                return c
                            };
                            b.checkConnectivity = function(e) {
                                var t = m.internetUpUrl;
                                w.logAction(w.LOG_MICRO, "(XHRRequest)Http.checkConnectivity()", "Sending; " + t);
                                b.getUri(null, t, null, null, (function(t, n) {
                                    var i = !t && "yes" == n.replace(/\n/, "");
                                    w.logAction(w.LOG_MICRO, "(XHRRequest)Http.checkConnectivity()", "Result: " + i);
                                    e(null, i)
                                }))
                            }
                        }
                    }
                    return g
                }();
            (function() {
                var e = "xhr_streaming";

                function t(t, n, i) {
                    q.call(this, t, n, i);
                    this.shortName = e
                }
                v.inherits(t, q);
                t.isAvailable = function() {
                    return f.xhrSupported && f.streamingSupported && f.allowComet
                };
                t.tryConnect = function(e, n, i, r) {
                    var o = new t(e, n, i),
                        s = function(e) {
                            r({
                                event: this.event,
                                error: e
                            })
                        };
                    o.on(["failed", "disconnected"], s);
                    o.on("preconnect", (function() {
                        w.logAction(w.LOG_MINOR, "XHRStreamingTransport.tryConnect()", "viable transport " + o);
                        o.off(["failed", "disconnected"], s);
                        r(null, o)
                    }));
                    o.connect()
                };
                t.prototype.toString = function() {
                    return "XHRStreamingTransport; uri=" + this.baseUri + "; isConnected=" + this.isConnected
                };
                t.prototype.createRequest = function(e, t, n, i, r) {
                    return Y.createRequest(e, t, n, i, r, this.timeouts)
                };
                void 0 !== U && t.isAvailable() && (U.supportedTransports[e] = t)
            })(),
            function() {
                var e = "xhr_polling";

                function t(t, n, i) {
                    i.stream = !1;
                    q.call(this, t, n, i);
                    this.shortName = e
                }
                v.inherits(t, q);
                t.isAvailable = function() {
                    return f.xhrSupported && f.allowComet
                };
                t.tryConnect = function(e, n, i, r) {
                    var o = new t(e, n, i),
                        s = function(e) {
                            r({
                                event: this.event,
                                error: e
                            })
                        };
                    o.on(["failed", "disconnected"], s);
                    o.on("preconnect", (function() {
                        w.logAction(w.LOG_MINOR, "XHRPollingTransport.tryConnect()", "viable transport " + o);
                        o.off(["failed", "disconnected"], s);
                        r(null, o)
                    }));
                    o.connect()
                };
                t.prototype.toString = function() {
                    return "XHRPollingTransport; uri=" + this.baseUri + "; isConnected=" + this.isConnected
                };
                t.prototype.createRequest = function(e, t, n, i, r) {
                    return Y.createRequest(e, t, n, i, r, this.timeouts)
                };
                void 0 !== U && t.isAvailable() && (U.supportedTransports[e] = t)
            }(),
            function() {
                var e = function() {},
                    t = a._ablyjs_jsonp = {};
                t._ = function(n) {
                    return t["_" + n] || e
                };
                var n = 1,
                    i = null,
                    r = "jsonp";

                function o(e, t, n) {
                    n.stream = !1;
                    q.call(this, e, t, n);
                    this.shortName = r
                }
                v.inherits(o, q);
                o.isAvailable = function() {
                    return f.jsonpSupported && f.allowComet
                };
                o.isAvailable() && (U.supportedTransports[r] = o);
                f.jsonpSupported && (i = document.getElementsByTagName("head")[0]);
                var s = null;
                a.JSONPTransport = o;
                o.tryConnect = function(e, t, n, i) {
                    var r = new o(e, t, n),
                        s = function(e) {
                            i({
                                event: this.event,
                                error: e
                            })
                        };
                    r.on(["failed", "disconnected"], s);
                    r.on("preconnect", (function() {
                        w.logAction(w.LOG_MINOR, "JSONPTransport.tryConnect()", "viable transport " + r);
                        r.off(["failed", "disconnected"], s);
                        i(null, r)
                    }));
                    r.connect()
                };
                o.prototype.toString = function() {
                    return "JSONPTransport; uri=" + this.baseUri + "; isConnected=" + this.isConnected
                };
                var c = o.prototype.createRequest = function(e, t, n, i, r, o, s) {
                    o = this && this.timeouts || o || m.TIMEOUTS;
                    return new u(void 0, e, t, v.copy(n), i, r, o, s)
                };

                function u(e, t, i, r, o, s, a, c) {
                    A.call(this);
                    void 0 === e && (e = n++);
                    this.id = e;
                    this.uri = t;
                    this.params = r || {};
                    this.params.rnd = v.cheapRandStr();
                    if (i) {
                        i["X-Ably-Version"] && (this.params.v = i["X-Ably-Version"]);
                        i["X-Ably-Lib"] && (this.params.lib = i["X-Ably-Lib"])
                    }
                    this.body = o;
                    this.method = c;
                    this.requestMode = s;
                    this.timeouts = a;
                    this.requestComplete = !1
                }
                v.inherits(u, A);
                u.prototype.exec = function() {
                    var e = this.id,
                        n = this.body,
                        r = this.method,
                        o = this.uri,
                        s = this.params,
                        a = this;
                    s.callback = "_ablyjs_jsonp._(" + e + ")";
                    s.envelope = "jsonp";
                    n && (s.body = n);
                    r && "get" !== r && (s.method = r);
                    var c = this.script = document.createElement("script"),
                        u = o + v.toQueryString(s);
                    c.src = u;
                    c.src.split("/").slice(-1)[0] !== u.split("/").slice(-1)[0] && w.logAction(w.LOG_ERROR, "JSONP Request.exec()", "Warning: the browser appears to have truncated the script URI. This will likely result in the request failing due to an unparseable body param");
                    c.async = !0;
                    c.type = "text/javascript";
                    c.charset = "UTF-8";
                    c.onerror = function(e) {
                        a.complete(new k("JSONP script error (event: " + v.inspect(e) + ")", null, 400))
                    };
                    t["_" + e] = function(e) {
                        if (e.statusCode) {
                            var t = e.response;
                            if (204 == e.statusCode) a.complete(null, null, null, e.statusCode);
                            else if (t)
                                if (e.statusCode < 400 || v.isArray(t)) a.complete(null, t, e.headers, e.statusCode);
                                else {
                                    var n = t.error || new k("Error response received from server", null, e.statusCode);
                                    a.complete(n)
                                }
                            else a.complete(new k("Invalid server response: no envelope detected", null, 500))
                        } else a.complete(null, e)
                    };
                    var l = this.requestMode == q.REQ_SEND ? this.timeouts.httpRequestTimeout : this.timeouts.recvTimeout;
                    this.timer = setTimeout((function() {
                        a.abort()
                    }), l);
                    i.insertBefore(c, i.firstChild)
                };
                u.prototype.complete = function(e, t, n, i) {
                    n = n || {};
                    if (!this.requestComplete) {
                        this.requestComplete = !0;
                        var r;
                        if (t) {
                            r = "string" == typeof t ? "text/plain" : "application/json";
                            n["content-type"] = r;
                            this.emit("data", t)
                        }
                        this.emit("complete", e, t, n, !0, i);
                        this.dispose()
                    }
                };
                u.prototype.abort = function() {
                    this.dispose()
                };
                u.prototype.dispose = function() {
                    var e = this.timer;
                    if (e) {
                        clearTimeout(e);
                        this.timer = null
                    }
                    var n = this.script;
                    n.parentNode && n.parentNode.removeChild(n);
                    delete t[this.id];
                    this.emit("disposed")
                };
                if (f.jsonpSupported && !b.Request) {
                    b.Request = function(e, t, n, i, r, o, s) {
                        var a = c(n, i, r, o, q.REQ_SEND, t && t.options.timeouts, e);
                        a.once("complete", s);
                        v.nextTick((function() {
                            a.exec()
                        }));
                        return a
                    };
                    b.checkConnectivity = function(e) {
                        var t = m.jsonpInternetUpUrl;
                        if (s) s.push(e);
                        else {
                            s = [e];
                            w.logAction(w.LOG_MICRO, "(JSONP)Http.checkConnectivity()", "Sending; " + t);
                            var n = new u("isTheInternetUp", t, null, null, null, q.REQ_SEND, m.TIMEOUTS);
                            n.once("complete", (function(e, t) {
                                var n = !e && t;
                                w.logAction(w.LOG_MICRO, "(JSONP)Http.checkConnectivity()", "Result: " + n);
                                for (var i = 0; i < s.length; i++) s[i](null, n);
                                s = null
                            }));
                            v.nextTick((function() {
                                n.exec()
                            }))
                        }
                    }
                }
            }();
            s.msgpack = l;
            s.Rest = z;
            s.Realtime = V;
            V.ConnectionManager = U;
            V.BufferUtils = z.BufferUtils = y;
            void 0 !== d && (V.Crypto = z.Crypto = d);
            V.Defaults = z.Defaults = m;
            V.Http = z.Http = b;
            V.Utils = z.Utils = v;
            V.Http = z.Http = b;
            V.Message = z.Message = I;
            V.PresenceMessage = z.PresenceMessage = M;
            V.ProtocolMessage = z.ProtocolMessage = T;
            e.exports = s;
            e.exports.__esModule = !0
        },
        y0kb: function(e, t, n) {
            "use strict";
            n.r(t);
            var i = {};
            n.r(i);
            n.d(i, "error", (function() {
                return f
            }));
            n.d(i, "info", (function() {
                return d
            }));
            n.d(i, "log", (function() {
                return g
            }));
            n.d(i, "trace", (function() {
                return m
            }));
            n.d(i, "warn", (function() {
                return y
            }));
            var r = n("CiDO"),
                o = n("LZPL"),
                s = n.n(o);
            const a = {
                    na1: {
                        environment: "hubspot",
                        fallbackHosts: ["hubspot-a-fallback.ably-realtime.com", "hubspot-b-fallback.ably-realtime.com", "hubspot-c-fallback.ably-realtime.com", "hubspot-d-fallback.ably-realtime.com", "hubspot-e-fallback.ably-realtime.com"]
                    },
                    eu1: {
                        environment: "hubspot-eu",
                        fallbackHosts: ["hubspot-eu-a-fallback.ably-realtime.com", "hubspot-eu-b-fallback.ably-realtime.com", "hubspot-eu-c-fallback.ably-realtime.com", "hubspot-eu-d-fallback.ably-realtime.com", "hubspot-eu-e-fallback.ably-realtime.com"]
                    }
                },
                c = () => {
                    const e = s.a.getHublet();
                    return a[e] || a.na1
                };

            function u(e) {
                return class extends e {
                    constructor(e) {
                        const t = c();
                        super(Object.assign({}, t, {}, e))
                    }
                }
            }
            var l = {
                Rest: r.Rest,
                msgpack: r.msgpack,
                Realtime: u(r.Realtime)
            };
            const h = "conversations";

            function p(e) {
                return function(...t) {
                    (s.a.isQa() || s.a.debug(h) || !s.a.deployed()) && console[e](...t)
                }
            }
            const f = p("error"),
                d = p("info"),
                g = p("log"),
                m = p("trace"),
                y = p("warn");
            var v = n("SYgn"),
                b = n.n(v);
            const O = e => {
                    function t(t, n) {
                        let i;
                        try {
                            i = b.a[e](t, n)
                        } catch (e) {
                            setTimeout(() => {
                                throw e
                            }, 0)
                        }
                        return i
                    }
                    return t
                },
                R = (O("captureException"), O("setExtraContext"));

            function A({
                maxLines: e = 25,
                sentryDataKey: t
            }) {
                if (e > 100) throw new Error("Max lines cannot exceed 100");
                if ("string" != typeof t) throw new Error("`sentryDataKey` is required");
                const n = [];

                function r(r) {
                    return function(...o) {
                        const s = (new Date).toISOString();
                        n.push([s, ...o]);
                        n.length > e && n.shift();
                        R({
                            [t]: n
                        });
                        i[r](...o)
                    }
                }
                return {
                    error: r("error"),
                    info: r("info"),
                    log: r("log"),
                    trace: r("trace"),
                    warn: r("warn")
                }
            }
            const w = "closed",
                C = "closing",
                S = "connected",
                k = "connecting",
                I = "disconnected",
                M = "failed",
                T = "initialized",
                E = "suspended";

            function _(e, t, n) {
                return new Promise((i, r) => {
                    const o = setTimeout(() => {
                        n && "string" != typeof n || (n = new Error(n || `Timed out after ${t} ms`));
                        r(n)
                    }, t);
                    e.then(e => {
                        clearTimeout(o);
                        i(e)
                    }, e => {
                        clearTimeout(o);
                        r(e)
                    })
                })
            }
            var P = _;
            const x = (e, ...t) => Object.assign(new Error, ...t, {
                    message: e
                }),
                L = 408;

            function N(e, ...t) {
                return x(e, ...t, {
                    statusCode: L
                })
            }
            const U = 15e3;

            function G(e, t) {
                const n = new Error(e);
                t.reason && (n.responseText = t.reason.toString());
                return n
            }

            function q(e) {
                return P(new Promise((t, n) => {
                    if (e.state === S) t(void 0);
                    else {
                        e.once(S, t);
                        e.once(M, e => n(G("PubSub connection failed", e)))
                    }
                }), U, N("PubSub wait for connection timeout"))
            }

            function B(e) {
                switch (e.state) {
                    case T:
                    case w:
                    case M:
                        e.connect();
                        return q(e);
                    case S:
                        return Promise.resolve();
                    case k:
                    case I:
                    case E:
                        return q(e);
                    case C:
                        return Promise.reject(new Error("PubSub connection closing"));
                    default:
                        return Promise.reject(new Error("Unknown PubSub status"))
                }
            }

            function D() {}

            function H(e, {
                onDisconnect: t = D,
                onFailure: n = D,
                onConnect: i = D,
                onConnecting: r = D,
                onSuspended: o = D
            }) {
                let s = !0,
                    a = T,
                    c = "";
                e.on(S, () => {
                    const t = e.id !== c && a === I;
                    i({
                        connectionWasSuspended: t || a === E,
                        reconnected: !s
                    });
                    s = !1;
                    a = S;
                    c = e.id
                });
                e.on(I, () => {
                    s = !1;
                    a = I;
                    t()
                });
                e.on(E, () => {
                    a = E;
                    o()
                });
                e.on(M, () => {
                    a = M;
                    n()
                });
                e.on(k, () => r({
                    reconnecting: !s
                }))
            }
            var j = n("z4Bj");
            const z = "1",
                V = "SUCCESS",
                F = "FAILURE",
                W = 2e3,
                J = ["number", "description", "line", "column"];

            function K(e) {
                if (!e) return null;
                const t = Object.keys(e).filter(e => !J.includes(e));
                return t.length ? t.reduce((t, n) => {
                    const i = e[n];
                    switch (typeof i) {
                        case "boolean":
                        case "number":
                            t[n] = i;
                            break;
                        case "string":
                            {
                                const e = i.length > W ? "..." : "";t[n] = `${i.substr(0,W)}${e}`;
                                break
                            }
                        case "function":
                            t[n] = "function() { /* Function removed */ }";
                            break;
                        case "object":
                            t[n] = null === i ? i : "/* Object, Error, or Array removed */"
                    }
                    return t
                }, {}) : null
            }
            const Q = (e, t, n) => (...i) => {
                const r = Date.now();

                function o(n) {
                    const i = Date.now();
                    e.captureEvent(t, {
                        startTime: r,
                        endTime: i,
                        duration: i - r,
                        result: n instanceof Error ? F : V
                    });
                    if (n instanceof Error) {
                        const e = K(n),
                            i = window.newrelic;
                        if (i && i.addPageAction) {
                            const {
                                channelName: n,
                                code: r,
                                errorSource: o,
                                statusCode: s,
                                message: a
                            } = e || {};
                            i.addPageAction("realtime-errors", {
                                opName: t,
                                code: r,
                                channelName: n,
                                errorSource: o,
                                statusCode: s,
                                message: a
                            })
                        }
                        return Promise.reject(n)
                    }
                    return Promise.resolve(n)
                }
                return n(...i).then(o, o)
            };

            function X(e, t = {}) {
                return new Promise((n, i) => {
                    e.history(t, (e, t) => {
                        if (e) {
                            const t = x("PubSub history error.  Reason: " + e.message, e);
                            i(t)
                        } else n(t.items)
                    })
                })
            }

            function $({
                channel: e,
                onMessage: t,
                onPlayback: n
            }) {
                return new Promise((i, r) => {
                    X(e, {
                        direction: "backwards",
                        untilAttach: !0
                    }).then(e => {
                        const r = {
                                playback: !0
                            },
                            o = [...e].reverse();
                        n ? n(o) : t && o.forEach(e => t(e, r));
                        i()
                    }).catch(r)
                })
            }
            var Y = n("Gpbg"),
                Z = n.n(Y);
            const ee = 5e3,
                te = () => s.a.deployed() ? "app" : "local",
                ne = () => s.a.isQa() ? "qa" : "";

            function ie() {
                return Z.a.get(`https://${te()}.hubspot${ne()}.com/network-check/is-the-internet-up.txt`, {
                    timeout: ee,
                    query: {
                        rnd: Math.random()
                    }
                }).then(() => ({
                    online: !0
                }), e => ({
                    online: !1,
                    error: e
                }))
            }

            function re(e) {
                const t = e.statusCode === L,
                    n = 40170 === e.code;
                if (t || n) return ie().then(({
                    online: t
                }) => {
                    if (t) throw e;
                    throw x("Network Unavailable", e)
                });
                throw e
            }
            const oe = "attached",
                se = "failed";

            function ae({
                channel: e
            }) {
                return P(new Promise((t, n) => {
                    e.attach(i => {
                        if (i) {
                            const t = x("PubSub channel attach failure: " + i.code, Object.assign({
                                channelName: e.name,
                                errorSource: "ably-attach"
                            }, i));
                            n(t)
                        } else t()
                    })
                }), U, N("PubSub channel attach timeout", {
                    channelName: e.name
                }))
            }

            function ce({
                channel: e,
                onMessage: t,
                onPlayback: n,
                playbackMessages: i,
                reporter: r = {
                    captureEvent: () => {},
                    setAdditionalContext: () => {}
                }
            }) {
                return P(new Promise(o => {
                    e.subscribe(z, t);
                    const s = () => i || n ? Q(r, "message-playback", $)({
                        channel: e,
                        onMessage: t,
                        onPlayback: n
                    }) : Promise.resolve();
                    (e.state === oe ? Promise.resolve() : Q(r, "attach", ae)({
                        channel: e
                    })).then(s).catch(re).catch(e => console.log("Channel attach failed - ", e.message));
                    o()
                }), U, N("PubSub subscribe timeout", {
                    channelName: e.name
                }))
            }

            function ue(e, t, n) {
                e.get(t).unsubscribe(n)
            }

            function le(e, t, n) {
                const i = Object(j.a)();

                function r(e) {
                    n(e) && i.resolve(e)
                }
                const o = ce({
                    channel: e.get(t),
                    onMessage: r
                }).then(() => i.promise).then(n => {
                    ue(e, t, r);
                    return n
                });
                return P(o, U, N("PubSub message expectation timeout", {
                    channelId: t
                }))
            }

            function he(e, t, n, i = ((e, t) => t.id === e)) {
                return le(e, t, e => i(n, e)).catch(e => {
                    throw x("PubSub publish verification failed. Reason: " + e.message, e, {
                        channelId: t,
                        messageId: n
                    })
                })
            }
            const {
                Message: pe
            } = l.Realtime;

            function fe(e, {
                channelId: t,
                data: n,
                messageId: i,
                publishVerifier: r
            }) {
                const o = e.get(t),
                    s = pe.fromEncoded({
                        id: i,
                        data: n,
                        name: z
                    }),
                    a = new Promise((n, a) => {
                        const c = he(e, t, i, r).catch(e => a(e));
                        new Promise((e, n) => {
                            o.publish(s, i => {
                                i ? n(x("PubSub publish failure: " + i.code, Object.assign({
                                    channelId: t
                                }, i))) : e(s)
                            })
                        }).then(() => c).then(e => n(e), e => a(x(e.message, Object.assign({
                            channelId: t
                        }, e))))
                    });
                return P(a, U, N("PubSub publish timeout", {
                    channelId: t,
                    messageId: i,
                    data: n
                }))
            }
            const de = ({
                channel: e,
                onMessage: t
            }) => P(new Promise((n, i) => {
                e.presence.subscribe("enter", t);
                e.presence.subscribe("leave", t);
                e.presence.subscribe("update", t);
                e.presence.enter({}, t => {
                    if (t) {
                        const n = x("PubSub presence channel attachment failure: " + t.code, Object.assign({
                            channelName: e.name
                        }, t));
                        i(n)
                    } else n()
                })
            }), U, N("PubSub presence.subscribe timeout", {
                channelName: e.name
            }));

            function ge(e, t, n) {
                const i = e.get(t);
                i.presence.leave();
                i.presence.unsubscribe(n)
            }

            function me(e) {
                let t, n = !1;
                return (...i) => {
                    if (!n) {
                        n = !0;
                        t = e(...i)
                    }
                    return t
                }
            }
            const ye = me(e => () => {
                    e.captureEvent("received-message")
                }),
                ve = ({
                    channel: e,
                    reporter: t
                }) => {
                    const n = ye(t);
                    e.unsubscribe(z, n);
                    e.subscribe(z, n)
                };

            function be(e, t) {
                const n = e.get(t);
                return P(new Promise((e, i) => {
                    if (n.state === oe) e(void 0);
                    else {
                        n.once(oe, e);
                        n.once(se, e => {
                            i(x("PubSub channel attachment failure", Object.assign({
                                channelId: t
                            }, e)))
                        })
                    }
                }), U, N("PubSub channel attachment timeout", {
                    channelId: t,
                    channelState: n.state
                }))
            }

            function Oe(e) {
                return P(new Promise((t, n) => {
                    e.authorize(void 0, void 0, e => {
                        e && n(x("PubSub reauthorization failure: " + e.code, e));
                        t()
                    })
                }), U, N("PubSub reauthorization timeout"))
            }

            function Re(e, t, n) {
                try {
                    if (e.tokenDetails.expires < Date.now()) return !1;
                    const i = JSON.parse(e.tokenDetails.capability);
                    return n ? n(Object.keys(i), t) : t.every(e => !!i[e])
                } catch (e) {
                    console.error("hasCapability check failed", e);
                    return !1
                }
            }

            function Ae(e) {
                try {
                    return e.tokenDetails.expires < Date.now()
                } catch (e) {
                    return !1
                }
            }

            function we(e) {
                let t = Promise.resolve(null);
                return (...n) => {
                    const i = () => e(...n);
                    t = t.then(i, i);
                    return t
                }
            }

            function Ce(e, t) {
                let n = null,
                    i = !0;
                e.on(({
                    current: e
                }) => {
                    switch (e) {
                        case k:
                            n = Date.now();
                            break;
                        case S:
                            if (n) {
                                const e = Date.now();
                                t.captureEvent(i ? "connect" : "reconnect", {
                                    startTime: n,
                                    endTime: e,
                                    duration: e - n,
                                    result: V
                                })
                            }
                            i = !1;
                            n = null;
                            break;
                        case I:
                            if (n) {
                                const e = Date.now();
                                t.captureEvent(i ? "connect" : "reconnect", {
                                    startTime: n,
                                    endTime: e,
                                    duration: e - n,
                                    result: F
                                })
                            } else t.captureEvent("disconnected");
                            n = null;
                            i = !1;
                            break;
                        case M:
                            t.captureEvent("connection-failed");
                            n = null;
                            i = !1;
                            break;
                        case E:
                            t.captureEvent("connection-suspended");
                            n = null;
                            i = !1;
                            break;
                        default:
                            n = null;
                            i = !1
                    }
                })
            }
            const Se = ({
                error: e,
                fingerprint: t,
                tags: n = {}
            }) => {
                const i = K(e);
                window.newrelic && window.newrelic.noticeError && window.newrelic.noticeError(e);
                b.a.captureException(e, {
                    fingerprint: t,
                    tags: n,
                    extra: {
                        error: i
                    }
                });
                const r = b.a.lastEventId();
                console.error(`(Event Id: ${r})\nError reported with '${e.message}'`);
                i && Object.keys(i).forEach(e => {
                    i[e] && console.error(`Extra Data [${e}]: `, i[e])
                });
                return r
            };

            function ke(e) {
                const t = Object.keys(e).reduce((t, n) => {
                    const i = e[n];
                    Object.keys(i).forEach(e => {
                        t[e] = t[e] ? [...t[e], i[e]] : [i[e]]
                    });
                    return t
                }, {});
                return Object.keys(t).reduce((e, n) => Object.assign({}, e, {
                    [n](...e) {
                        t[n].forEach(t => {
                            try {
                                t(...e)
                            } catch (e) {
                                Se({
                                    error: e
                                })
                            }
                        })
                    }
                }), {})
            }
            const Ie = me(e => () => {
                    e.captureEvent("received-presence-message")
                }),
                Me = ({
                    channel: e,
                    reporter: t
                }) => {
                    const n = Ie(t);
                    e.presence.unsubscribe(n);
                    e.presence.subscribe("enter", n);
                    e.presence.subscribe("leave", n);
                    e.presence.subscribe("present", n);
                    e.presence.subscribe("update", n)
                },
                Te = ({
                    channel: e
                }) => new Promise((t, n) => {
                    e.presence.get((i, r) => {
                        if (i) {
                            const t = x("PubSub get presence messages failure: " + i.code, Object.assign({
                                channelName: e.name
                            }, i));
                            n(t)
                        } else t(r)
                    })
                }),
                Ee = new RegExp(/^(?:\w+\.)+([\w+-]+).*/),
                _e = function(e) {
                    try {
                        const t = e.connectionManager.connectionDetails;
                        if (t) {
                            const {
                                serverId: e
                            } = t, n = Ee.exec(e);
                            if (n) return {
                                "ably-region": n[1]
                            }
                        }
                        return {}
                    } catch (e) {
                        console.error("Failed to get ably region. ", e);
                        return {}
                    }
                },
                Pe = (() => {
                    let e = 0;
                    return () => "lifecycle-hooks-" + e++
                })(),
                xe = (e, t) => {
                    40160 === e.code && b.a.captureMessage("CAPABILITY_ERROR", {
                        extra: {
                            channelId: t,
                            now: Date.now()
                        }
                    })
                };
            class Le {
                constructor(e, t, n) {
                    this.realtime = e;
                    this.keyedLifecycleHooks = {};
                    this.lifecycleHooks = {};
                    this.reporter = t;
                    this.publishVerifier = n;
                    const i = we(this.publish.bind(this));
                    this.publish = Q(this.reporter, "publish", i);
                    this.subscribe = Q(this.reporter, "subscribe", this.subscribe.bind(this));
                    this.subscribePresence = Q(this.reporter, "subscribe-presence", this.subscribePresence.bind(this));
                    this._profiledReauthorize = Q(this.reporter, "reauthorize", Oe);
                    this.realtime.connection.on(this.updateReporter.bind(this));
                    Ce(this.realtime.connection, this.reporter)
                }
                updateReporter({
                    current: e,
                    previous: t
                }) {
                    if (t !== S && e === S) {
                        const e = _e(this.realtime.connection);
                        this.reporter.setAdditionalContext(e)
                    }
                }
                registerLifecycleHooks(e) {
                    const t = Pe();
                    this.keyedLifecycleHooks = Object.assign({}, this.keyedLifecycleHooks, {
                        [t]: e
                    });
                    this.lifecycleHooks = ke(this.keyedLifecycleHooks);
                    H(this.realtime.connection, this.lifecycleHooks);
                    return t
                }
                connect() {
                    this.realtime.connection.connect();
                    return Promise.resolve()
                }
                close() {
                    this.realtime.connection.off();
                    this.realtime.connection.close()
                }
                getConnectionId() {
                    return this.realtime.connection.id || null
                }
                isConnected() {
                    return this.realtime.connection.state === S
                }
                hasTokenExpired() {
                    return Ae(this.realtime.auth)
                }
                ensureValidToken() {
                    return this.hasTokenExpired() ? this.reauthorize() : Promise.resolve()
                }
                reauthorize(e, t) {
                    return e && Re(this.realtime.auth, e, t) ? Promise.resolve() : this._profiledReauthorize(this.realtime.auth).catch(re)
                }
                publish({
                    channelId: e,
                    data: t,
                    messageId: n
                }) {
                    const {
                        connection: i,
                        channels: r
                    } = this.realtime;
                    return B(i).then(() => this.ensureValidToken()).then(() => be(r, e)).then(() => fe(r, {
                        channelId: e,
                        data: t,
                        messageId: n,
                        publishVerifier: this.publishVerifier
                    })).catch(re)
                }
                subscribe({
                    channelId: e,
                    onMessage: t,
                    onPlayback: n,
                    playbackMessages: i
                }) {
                    const r = this.realtime.channels.get(e);
                    return B(this.realtime.connection).then(() => this.ensureValidToken()).then(() => ce({
                        channel: r,
                        onMessage: t,
                        onPlayback: n,
                        playbackMessages: i,
                        reporter: this.reporter
                    })).then(() => ve({
                        channel: r,
                        reporter: this.reporter
                    })).catch(t => {
                        xe(t, e);
                        throw t
                    }).catch(re)
                }
                subscribePresence({
                    channelId: e,
                    onMessage: t
                }) {
                    const n = this.realtime.channels.get(e);
                    return B(this.realtime.connection).then(() => this.ensureValidToken()).then(() => de({
                        channel: n,
                        onMessage: t
                    })).then(() => Me({
                        channel: n,
                        reporter: this.reporter
                    })).catch(t => {
                        xe(t, e);
                        throw t
                    }).catch(re)
                }
                unsubscribe({
                    channelId: e,
                    onMessage: t
                }) {
                    return B(this.realtime.connection).then(() => this.ensureValidToken()).then(() => ue(this.realtime.channels, e, t)).catch(re)
                }
                unsubscribePresence({
                    channelId: e,
                    onMessage: t
                }) {
                    return B(this.realtime.connection).then(() => this.ensureValidToken()).then(() => ge(this.realtime.channels, e, t)).catch(re)
                }
                getPresenceMessages({
                    channelId: e
                }) {
                    const t = this.realtime.channels.get(e);
                    return Te({
                        channel: t
                    })
                }
            }
            const Ne = "ABLY_LOG_LEVEL",
                Ue = 2,
                Ge = 4,
                qe = () => {
                    try {
                        const e = window.localStorage.getItem(Ne),
                            t = parseInt(null !== e ? e : "NaN", 10);
                        if ("number" == typeof t && !isNaN(t)) {
                            console.warn("[OVERRIDE] ABLY_LOG_LEVEL = " + t);
                            return t
                        }
                    } catch (e) {}
                    return s.a.isQa() || !s.a.deployed() ? Ue : Ge
                },
                Be = A({
                    maxLines: 100,
                    sentryDataKey: "ablyLogs"
                });
            let De;
            const He = () => De;

            function je({
                clientOptions: e,
                reporter: t = {
                    captureEvent() {},
                    setAdditionalContext() {}
                },
                publishVerifier: n
            }) {
                if (!De) {
                    const i = new l.Realtime(Object.assign({}, e, {
                        autoConnect: !1,
                        log: {
                            level: qe(),
                            handler: Be.log
                        },
                        queryTime: !0
                    }));
                    De = new Le(i, t, n)
                }
                return {
                    getInstance: He
                }
            }
            var ze = n("I5zW");

            function Ve(e, t) {
                const n = t.find((n, i) => e > n && e < t[i + 1]),
                    i = void 0 !== n ? t.indexOf(n) : -1;
                return i >= 0 ? `${t[i]}-${t[i+1]-1}` : t[t.length - 1] + "+"
            }
            class Fe {
                constructor(e, t = [0, 250, 500, 1e3, 2500, 5e3]) {
                    this.name = e;
                    this.edges = t;
                    this.metric = {
                        min: 1 / 0,
                        max: 0,
                        success: 0,
                        failure: 0
                    }
                }
                getAggregateData() {
                    return 0 === this.metric.success && 0 === this.metric.failure ? {} : Object.keys(this.metric).reduce((e, t) => {
                        e[`${this.name}-${t}`] = this.metric[t];
                        return e
                    }, {})
                }
                addDataPoint(e) {
                    const {
                        metric: t
                    } = this, {
                        result: n,
                        duration: i
                    } = e;
                    if (n === V) {
                        t.success++;
                        const e = Ve(i, this.edges);
                        t[e] = (t[e] || 0) + 1;
                        t.min = i < t.min ? i : t.min;
                        t.max = i > t.max ? i : t.max
                    } else t.failure++
                }
            }
            const We = 9e5,
                Je = e => !!Object.keys(e).length,
                Ke = Object(ze.createMetricsFactory)("realtime-communication");
            class Qe {
                constructor(e = (e => {}), t = We, n = Fe) {
                    this.sendRollup = () => {
                        if (Je(this.aggregateMetrics) || Je(this.counts)) {
                            const e = Object.keys(this.aggregateMetrics).reduce((e, t) => Object.assign({}, e, {}, this.aggregateMetrics[t].getAggregateData()), {});
                            this.reportData(Object.assign({}, e, {}, this.counts, {}, this.additionalContext));
                            this.aggregateMetrics = {};
                            this.counts = {}
                        }
                    };
                    this.aggregateMetrics = {};
                    this.counts = {};
                    this.interval = t;
                    this.MetricAggregator = n;
                    this.reportData = e;
                    this.additionalContext = {}
                }
                start() {
                    if (!this._intervalId) {
                        this._intervalId = setInterval(this.sendRollup, this.interval);
                        window.addEventListener("beforeunload", this.sendRollup)
                    }
                }
                stop() {
                    if (this._intervalId) {
                        clearInterval(this._intervalId);
                        delete this._intervalId;
                        this.sendRollup();
                        window.removeEventListener("beforeunload", this.sendRollup)
                    }
                }
                captureEvent(e, t) {
                    if (t) {
                        const {
                            aggregateMetrics: n
                        } = this;
                        n[e] = n[e] || new this.MetricAggregator(e);
                        n[e].addDataPoint(t);
                        Ke.timer(e).update(t.endTime - t.startTime)
                    } else Ke.counter(e).increment();
                    this.counts[e] = (this.counts[e] || 0) + 1
                }
                setAdditionalContext(e = {}) {
                    this.additionalContext = Object.assign({}, this.additionalContext, {}, e)
                }
            }

            function Xe(e = Qe) {
                return new e(e => {
                    window.newrelic && window.newrelic.addPageAction && window.newrelic.addPageAction("realtime-stats", e)
                })
            }
            var $e = n("QYOI"),
                Ye = n("pHO9");
            const Ze = "DEBOUNCED",
                et = e => {
                    let t = Promise.resolve(),
                        n = null;
                    const i = () => {
                            const t = e(...n);
                            n = null;
                            return t
                        },
                        r = () => n ? i() : Ze,
                        o = () => n ? i() : Ze,
                        s = (...e) => {
                            n = e;
                            t = t.then(r, o);
                            return t
                        };
                    s.DEBOUNCED = Ze;
                    return s
                },
                tt = (e, t = []) => Object.keys(e).reduce((n, i) => {
                    if (!t.includes(i)) return n;
                    n[i] = e[i];
                    return n
                }, {});
            var nt = n("sZSy");
            const it = (e, t) => {
                    const n = Object(nt.a)(Object.keys(e), Object.keys(t));
                    return tt(e, n)
                },
                rt = (e, t) => {
                    let n = Promise.resolve(),
                        i = !1;
                    return (...r) => {
                        const o = () => {
                            i = !1;
                            return e(...r)
                        };
                        i && t();
                        n = n.then(o, o);
                        i = !0;
                        return n
                    }
                };
            var ot = n("YibP");
            const st = e => (...t) => e(...t).catch(n => {
                    if (n) {
                        console.warn(`Async call threw exception '${n.message}'. Retrying...`);
                        console.warn(n)
                    }
                    return e(...t)
                }).catch(e => {
                    throw Object(ot.a)("Async call failed twice. Reason: " + e.message, e, {
                        originalStack: e.stack
                    })
                }),
                at = (e, t, n, i, r, o, s, a) => {
                    if (!e) {
                        let e;
                        if (void 0 === t) e = new Error("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
                        else {
                            const c = [n, i, r, o, s, a];
                            let u = 0;
                            e = new Error("Invariant Violation: " + t.replace(/%s/g, () => c[u++]))
                        }
                        e.framesToPop = 1;
                        throw e
                    }
                },
                ct = (e, t = []) => Object.keys(e).reduce((n, i) => {
                    if (t.includes(i)) return n;
                    n[i] = e[i];
                    return n
                }, {});
            var ut = n("TUHz"),
                lt = n("DdHT");
            const ht = /^(?:AGENT|VISITOR)-(.*)$/,
                pt = e => Object.assign({}, e, {
                    data: JSON.parse(e.data)
                }),
                ft = e => ({
                    data: e.data,
                    timestamp: e.timestamp,
                    clientId: e.clientId
                }),
                dt = e => {
                    const {
                        data: t,
                        timestamp: n
                    } = e, i = t && "number" == typeof t.timestamp, r = t && "API" === t.clientType;
                    n && i && !r && (t.timestamp = n);
                    return Object.assign({}, e, {
                        data: t
                    })
                },
                gt = e => {
                    if (!e.clientId) throw new Error("malformed message");
                    const {
                        clientId: t
                    } = e, n = ht.exec(t);
                    if (n) {
                        const e = n[1],
                            t = parseInt(e, 10);
                        if (isNaN(t)) throw new Error("malformed message")
                    }
                    return e
                },
                mt = ({
                    message: e
                }) => Object(lt.a)(pt, gt, dt, ft)(e),
                yt = e => (...t) => {
                    let n;
                    try {
                        n = b.a[e](...t)
                    } catch (e) {
                        setTimeout(() => {
                            throw e
                        }, 0)
                    }
                    return n
                },
                vt = yt("captureException"),
                bt = (yt("setExtraContext"), ({
                    messages: e
                }) => e.reduce((e, t) => {
                    const {
                        clientId: n,
                        data: i,
                        timestamp: r
                    } = t;
                    return Object.assign({}, e, {
                        [n]: {
                            clientId: n,
                            data: i,
                            timestamp: r
                        }
                    })
                }, {})),
                Ot = ({
                    subscriptions: e,
                    isMessageEcho: t,
                    vendor: n
                }) => {
                    const i = {};
                    Object.keys(e).forEach(r => {
                        const o = e[r],
                            {
                                onMessage: s,
                                onPlayback: a,
                                onPresence: c
                            } = o,
                            u = Object(ut.a)(o, ["onMessage", "onPlayback", "onPresence"]),
                            l = (e, {
                                playback: n = !1
                            } = {}) => {
                                if (!t(e)) try {
                                    s(mt({
                                        message: e
                                    }), {
                                        playback: n
                                    })
                                } catch (e) {
                                    vt(e);
                                    console.error(e)
                                }
                            },
                            h = c ? e => {
                                t(e) || n.getPresenceMessages({
                                    channelId: r
                                }).then(e => {
                                    try {
                                        c(bt({
                                            messages: e
                                        }))
                                    } catch (e) {
                                        console.error(e)
                                    }
                                })
                            } : c,
                            p = a ? e => {
                                try {
                                    a(e.map(e => mt({
                                        message: e
                                    })))
                                } catch (e) {
                                    vt(e);
                                    console.error(e)
                                }
                            } : a;
                        i[r] = Object.assign({}, u, {
                            onMessage: l,
                            onPlayback: p,
                            onPresence: h
                        })
                    });
                    return i
                },
                Rt = e => Object.keys(e).reduce((e, t) => {
                    const n = e[t];
                    return "function" == typeof n ? Object.assign({}, e, {
                        [t]: {
                            onMessage: n
                        }
                    }) : e
                }, e),
                At = ({
                    vendor: e,
                    toAdd: t = {},
                    toRemove: n = {},
                    reauthorize: i = (() => {})
                }) => Promise.all(Object.keys(n).map(t => {
                    const {
                        onMessage: i
                    } = n[t];
                    return e.unsubscribe({
                        channelId: t,
                        onMessage: i
                    })
                })).then(() => i(Object.keys(t))).then(() => Promise.all(Object.keys(t).map(n => {
                    const {
                        onMessage: i,
                        onPlayback: r
                    } = t[n];
                    return e.subscribe({
                        channelId: n,
                        playbackMessages: !0,
                        onMessage: i,
                        onPlayback: r
                    })
                }))),
                wt = ({
                    vendor: e
                }) => ({
                    message: t,
                    channel: n
                }) => e.publish({
                    channelId: n,
                    data: JSON.stringify(t),
                    messageId: t.id
                }),
                Ct = ({
                    vendor: e,
                    toAdd: t = {},
                    toRemove: n = {},
                    reauthorize: i = (() => {})
                }) => Promise.all(Object.keys(n).filter(e => n[e].onPresence).map(t => {
                    const {
                        onPresence: i
                    } = n[t];
                    return e.unsubscribePresence({
                        channelId: t,
                        onMessage: i
                    })
                })).then(() => i(Object.keys(t))).then(() => Promise.all(Object.keys(t).filter(e => t[e].onPresence).map(n => {
                    const {
                        onPresence: i
                    } = t[n];
                    return e.subscribePresence({
                        channelId: n,
                        onMessage: i
                    }).then(() => {
                        i({})
                    })
                })));
            class St {
                constructor(e, t = {}) {
                    this.publish = st(({
                        message: e,
                        channel: t,
                        threadId: n
                    }) => {
                        at("string" == typeof e.id, "A message id is required to publish a message");
                        this.messageIdsBeingPublished = this.messageIdsBeingPublished.add(e.id);
                        return this._publishFn({
                            message: e,
                            channel: t,
                            threadId: n
                        }).then(t => {
                            this.messageIdsBeingPublished = this.messageIdsBeingPublished.remove(e.id);
                            return mt({
                                message: t
                            })
                        })
                    });
                    this.updateSubscriptions = et(e => {
                        const t = it(e, this.subscriptions),
                            n = it(this.subscriptions, e);
                        return this.transactSubscriptions({
                            toAdd: t,
                            toRemove: Object.keys(n)
                        })
                    });
                    this.transactSubscriptions = Object(Ye.a)(rt, st)(({
                        toAdd: e,
                        toRemove: t
                    }) => {
                        const n = Rt(e),
                            i = Ot({
                                subscriptions: n,
                                isMessageEcho: e => e.connectionId === this.vendor.getConnectionId() || this.messageIdsBeingPublished.has(e.id),
                                vendor: this.vendor
                            }),
                            r = tt(this.subscriptions, t);
                        Ct({
                            vendor: this.vendor,
                            toAdd: i,
                            toRemove: r,
                            reauthorize: this.reauthorize
                        }).catch(e => console.log("Presence subscription failed - ", e.message));
                        return At({
                            vendor: this.vendor,
                            toAdd: i,
                            toRemove: r,
                            reauthorize: this.reauthorize
                        }).then(() => {
                            this.subscriptions = Object.assign({}, ct(this.subscriptions, t), {}, i);
                            return Object.assign({}, this.subscriptions)
                        })
                    });
                    this.channelCapabilityValidator = t.channelCapabilityValidator;
                    this.vendor = e;
                    this.subscriptions = {};
                    this.messageIdsBeingPublished = Object($e.Set)();
                    this.reauthorize = et(this.reauthorize.bind(this));
                    this._publishFn = wt({
                        vendor: this.vendor
                    })
                }
                isConnected() {
                    return this.vendor.isConnected()
                }
                connect() {
                    return this.vendor.connect()
                }
                close() {
                    this.vendor.close()
                }
                reauthorize(e = []) {
                    return Boolean(e.length) ? this.vendor.reauthorize(e, this.channelCapabilityValidator) : Promise.resolve()
                }
            }
            const kt = e => {
                    try {
                        return JSON.parse(e)
                    } catch (e) {
                        console.error(e);
                        return {}
                    }
                },
                It = (e, t) => {
                    const n = e && e === t.id,
                        i = kt(t.data),
                        r = e && e === i.id;
                    return n || r
                };
            n.d(t, "reporter", (function() {
                return Mt
            }));
            n.d(t, "buildConversationsPubSub", (function() {
                return Tt
            }));
            const Mt = Xe(),
                Tt = ({
                    clientOptions: e,
                    lifecycleHooks: t
                }) => {
                    Mt.start();
                    const n = je({
                        clientOptions: e,
                        reporter: Mt,
                        publishVerifier: It
                    }).getInstance();
                    n.registerLifecycleHooks(t);
                    return new St(n, e)
                }
        },
        z4Bj: function(e, t, n) {
            "use strict";

            function i() {
                let e = () => {},
                    t = () => {};
                return {
                    promise: new Promise((n, i) => {
                        e = n;
                        t = i
                    }),
                    resolve: e,
                    reject: t
                }
            }
            t.a = i
        }
    }
]);
//# sourceMappingURL=conversations-internal-pub-sub-client-builder.js.map