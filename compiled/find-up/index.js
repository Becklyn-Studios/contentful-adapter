(() => {
    "use strict";
    var r = {
        21: (r, e, t) => {
            const s = t(17);
            const n = t(387);
            const c = t(164);
            const o = Symbol("findUp.stop");
            r.exports = async (r, e = {}) => {
                let t = s.resolve(e.cwd || "");
                const { root: c } = s.parse(t);
                const i = [].concat(r);
                const runMatcher = async e => {
                    if (typeof r !== "function") {
                        return n(i, e);
                    }
                    const t = await r(e.cwd);
                    if (typeof t === "string") {
                        return n([t], e);
                    }
                    return t;
                };
                while (true) {
                    const r = await runMatcher({ ...e, cwd: t });
                    if (r === o) {
                        return;
                    }
                    if (r) {
                        return s.resolve(t, r);
                    }
                    if (t === c) {
                        return;
                    }
                    t = s.dirname(t);
                }
            };
            r.exports.sync = (r, e = {}) => {
                let t = s.resolve(e.cwd || "");
                const { root: c } = s.parse(t);
                const i = [].concat(r);
                const runMatcher = e => {
                    if (typeof r !== "function") {
                        return n.sync(i, e);
                    }
                    const t = r(e.cwd);
                    if (typeof t === "string") {
                        return n.sync([t], e);
                    }
                    return t;
                };
                while (true) {
                    const r = runMatcher({ ...e, cwd: t });
                    if (r === o) {
                        return;
                    }
                    if (r) {
                        return s.resolve(t, r);
                    }
                    if (t === c) {
                        return;
                    }
                    t = s.dirname(t);
                }
            };
            r.exports.exists = c;
            r.exports.sync.exists = c.sync;
            r.exports.stop = o;
        },
        387: (r, e, t) => {
            const s = t(17);
            const n = t(147);
            const { promisify: c } = t(837);
            const o = t(940);
            const i = c(n.stat);
            const a = c(n.lstat);
            const u = { directory: "isDirectory", file: "isFile" };
            function checkType({ type: r }) {
                if (r in u) {
                    return;
                }
                throw new Error(`Invalid type specified: ${r}`);
            }
            const matchType = (r, e) => r === undefined || e[u[r]]();
            r.exports = async (r, e) => {
                e = { cwd: process.cwd(), type: "file", allowSymlinks: true, ...e };
                checkType(e);
                const t = e.allowSymlinks ? i : a;
                return o(
                    r,
                    async r => {
                        try {
                            const n = await t(s.resolve(e.cwd, r));
                            return matchType(e.type, n);
                        } catch (r) {
                            return false;
                        }
                    },
                    e
                );
            };
            r.exports.sync = (r, e) => {
                e = { cwd: process.cwd(), allowSymlinks: true, type: "file", ...e };
                checkType(e);
                const t = e.allowSymlinks ? n.statSync : n.lstatSync;
                for (const n of r) {
                    try {
                        const r = t(s.resolve(e.cwd, n));
                        if (matchType(e.type, r)) {
                            return n;
                        }
                    } catch (r) {}
                }
            };
        },
        940: (r, e, t) => {
            const s = t(698);
            class EndError extends Error {
                constructor(r) {
                    super();
                    this.value = r;
                }
            }
            const testElement = async (r, e) => e(await r);
            const finder = async r => {
                const e = await Promise.all(r);
                if (e[1] === true) {
                    throw new EndError(e[0]);
                }
                return false;
            };
            const pLocate = async (r, e, t) => {
                t = { concurrency: Infinity, preserveOrder: true, ...t };
                const n = s(t.concurrency);
                const c = [...r].map(r => [r, n(testElement, r, e)]);
                const o = s(t.preserveOrder ? 1 : Infinity);
                try {
                    await Promise.all(c.map(r => o(finder, r)));
                } catch (r) {
                    if (r instanceof EndError) {
                        return r.value;
                    }
                    throw r;
                }
            };
            r.exports = pLocate;
            r.exports["default"] = pLocate;
        },
        164: (r, e, t) => {
            const s = t(147);
            const { promisify: n } = t(837);
            const c = n(s.access);
            r.exports = async r => {
                try {
                    await c(r);
                    return true;
                } catch (r) {
                    return false;
                }
            };
            r.exports.sync = r => {
                try {
                    s.accessSync(r);
                    return true;
                } catch (r) {
                    return false;
                }
            };
        },
        147: r => {
            r.exports = require("fs");
        },
        698: r => {
            r.exports = require("../p-limit");
        },
        17: r => {
            r.exports = require("path");
        },
        837: r => {
            r.exports = require("util");
        },
    };
    var e = {};
    function __nccwpck_require__(t) {
        var s = e[t];
        if (s !== undefined) {
            return s.exports;
        }
        var n = (e[t] = { exports: {} });
        var c = true;
        try {
            r[t](n, n.exports, __nccwpck_require__);
            c = false;
        } finally {
            if (c) delete e[t];
        }
        return n.exports;
    }
    if (typeof __nccwpck_require__ !== "undefined") __nccwpck_require__.ab = __dirname + "/";
    var t = __nccwpck_require__(21);
    module.exports = t;
})();
