globalThis.__nitro_main__ = import.meta.url;
import { a as FastResponse, n as HTTPError, r as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-07-19T10:26:23.315Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/assets/admin.index-DJ7LAi8J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26-SoFMfAHVJ5oqB5t+mpFRoQvFIoc\"",
		"mtime": "2026-07-19T12:14:00.321Z",
		"size": 38,
		"path": "../public/assets/admin.index-DJ7LAi8J.js"
	},
	"/assets/about-BtJxQI2D.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"485-p4tRS+gk918baHAGYch89e6GCQ0\"",
		"mtime": "2026-07-19T12:14:00.321Z",
		"size": 1157,
		"path": "../public/assets/about-BtJxQI2D.js"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"17-ZZkCVrbr4BSdjt/K43J0tq8+Qq4\"",
		"mtime": "2026-07-19T10:26:23.321Z",
		"size": 23,
		"path": "../public/robots.txt"
	},
	"/assets/arrow-right-CUtOwrev.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a5-tb4GmF9u787tOG8QgzyqXMFtZ3M\"",
		"mtime": "2026-07-19T12:14:00.321Z",
		"size": 165,
		"path": "../public/assets/arrow-right-CUtOwrev.js"
	},
	"/assets/button-C7iMnHuZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e91-BJnpVENnTE2BQnsTyFlhf8gWmxk\"",
		"mtime": "2026-07-19T12:14:00.323Z",
		"size": 3729,
		"path": "../public/assets/button-C7iMnHuZ.js"
	},
	"/assets/bell-B_7OOGkp.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"122-iZU3RktQeD3TbYCh9QuFMpictEo\"",
		"mtime": "2026-07-19T12:14:00.323Z",
		"size": 290,
		"path": "../public/assets/bell-B_7OOGkp.js"
	},
	"/assets/badge-bZ0Ow1A9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"34b-0lKRa9I/8QAlUrz2Y1h72cOEDQ4\"",
		"mtime": "2026-07-19T12:14:00.323Z",
		"size": 843,
		"path": "../public/assets/badge-bZ0Ow1A9.js"
	},
	"/assets/check-C3dCA59X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7c-d3iSrELlqPFH/i+Aa10OIPPRDWs\"",
		"mtime": "2026-07-19T12:14:00.323Z",
		"size": 124,
		"path": "../public/assets/check-C3dCA59X.js"
	},
	"/assets/auth-pcy3pqLl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4b13-Ys1rES8YkFOyH8JqGj+jaPLm+a8\"",
		"mtime": "2026-07-19T12:14:00.321Z",
		"size": 19219,
		"path": "../public/assets/auth-pcy3pqLl.js"
	},
	"/assets/card-zfioK6Pe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"42e-joapPSm1zbJYOcfzvWA3LR8aHEI\"",
		"mtime": "2026-07-19T12:14:00.323Z",
		"size": 1070,
		"path": "../public/assets/card-zfioK6Pe.js"
	},
	"/assets/chevron-down-ENcD55yo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"80-Q1bNhqsBEpmehXZOqa867BTsQFU\"",
		"mtime": "2026-07-19T12:14:00.324Z",
		"size": 128,
		"path": "../public/assets/chevron-down-ENcD55yo.js"
	},
	"/assets/createLucideIcon-BRJDuESr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d2-fpu54BlyzK8P+wA9zc/kdMQ/UvE\"",
		"mtime": "2026-07-19T12:14:00.324Z",
		"size": 1234,
		"path": "../public/assets/createLucideIcon-BRJDuESr.js"
	},
	"/assets/contact-DP9jHi2o.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fa6-faFVfYxuf4If87AjsF9VsWqaKqI\"",
		"mtime": "2026-07-19T12:14:00.324Z",
		"size": 4006,
		"path": "../public/assets/contact-DP9jHi2o.js"
	},
	"/assets/dashboard.cart-DoK0sCPZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f95-sEZo85yVmM21lDCx0iW69197GTE\"",
		"mtime": "2026-07-19T12:14:00.326Z",
		"size": 3989,
		"path": "../public/assets/dashboard.cart-DoK0sCPZ.js"
	},
	"/assets/dashboard.browse-6d8A-xVq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"54e-FClR//PWPwGzxaYn/+oUjTcuqPw\"",
		"mtime": "2026-07-19T12:14:00.326Z",
		"size": 1358,
		"path": "../public/assets/dashboard.browse-6d8A-xVq.js"
	},
	"/assets/dashboard.checkout-DegLnghj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"278a-JBjVKPiL4y/O+1G1qRJrWVebBP4\"",
		"mtime": "2026-07-19T12:14:00.336Z",
		"size": 10122,
		"path": "../public/assets/dashboard.checkout-DegLnghj.js"
	},
	"/assets/client-CxGvq9o7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3b067-5cVLRvu/156n42HvB1e5VIWFEbc\"",
		"mtime": "2026-07-19T12:14:00.324Z",
		"size": 241767,
		"path": "../public/assets/client-CxGvq9o7.js"
	},
	"/assets/dashboard.index-B8j7LKZV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1eb3-DUMGEDM2AGYH3gp6qRfbqNEJA1I\"",
		"mtime": "2026-07-19T12:14:00.336Z",
		"size": 7859,
		"path": "../public/assets/dashboard.index-B8j7LKZV.js"
	},
	"/assets/dashboard.notifications-Cmr4hEGk.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6af-6NWLNNjlFJr4RP4hceb49eO5Hvc\"",
		"mtime": "2026-07-19T12:14:00.336Z",
		"size": 1711,
		"path": "../public/assets/dashboard.notifications-Cmr4hEGk.js"
	},
	"/assets/dist-4L_qd8SR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"25d-T5jgZyVpFUT9sh4DIR2rLDOVJz4\"",
		"mtime": "2026-07-19T12:14:00.340Z",
		"size": 605,
		"path": "../public/assets/dist-4L_qd8SR.js"
	},
	"/assets/dashboard.subscriptions-CpYF9WiI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"598-lRZe1GXOLZfV1bpwVRaj3j/lBOY\"",
		"mtime": "2026-07-19T12:14:00.340Z",
		"size": 1432,
		"path": "../public/assets/dashboard.subscriptions-CpYF9WiI.js"
	},
	"/assets/dist-C1RJhgYD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"281-K2XQEy4dSuaU+NZeVCiNF1cCMKU\"",
		"mtime": "2026-07-19T12:14:00.340Z",
		"size": 641,
		"path": "../public/assets/dist-C1RJhgYD.js"
	},
	"/assets/dashboard.orders-CchLFVxK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"69655-knEcCpaRk+CCflIE6dPVSViwcWw\"",
		"mtime": "2026-07-19T12:14:00.338Z",
		"size": 431701,
		"path": "../public/assets/dashboard.orders-CchLFVxK.js"
	},
	"/assets/dashboard.profile-Bu24aHtr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"622-MJMQao0PaTxEkU2owddxSo9+nGw\"",
		"mtime": "2026-07-19T12:14:00.338Z",
		"size": 1570,
		"path": "../public/assets/dashboard.profile-Bu24aHtr.js"
	},
	"/assets/dist-CqLj2Xz3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f9f-rz8D0u8xs/6+cNkCOrtpxBlZt3g\"",
		"mtime": "2026-07-19T12:14:00.341Z",
		"size": 3999,
		"path": "../public/assets/dist-CqLj2Xz3.js"
	},
	"/assets/dist-dMa6PeDo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1765-TkV0wPHfw19KgrsTpkwZzl5Xh7s\"",
		"mtime": "2026-07-19T12:14:00.343Z",
		"size": 5989,
		"path": "../public/assets/dist-dMa6PeDo.js"
	},
	"/assets/dollar-sign-DFwKkP4S.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"db-55cE+uij7aBdy5cgQQnW7gM+DaI\"",
		"mtime": "2026-07-19T12:14:00.343Z",
		"size": 219,
		"path": "../public/assets/dollar-sign-DFwKkP4S.js"
	},
	"/assets/faq-CDFLMs46.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f3b-KFIIQWW/BN1+xb6gjAHvQWFRYHI\"",
		"mtime": "2026-07-19T12:14:00.343Z",
		"size": 7995,
		"path": "../public/assets/faq-CDFLMs46.js"
	},
	"/assets/dist-DHydPpMS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2d0-PGKyjcN2Hwvmh+zl/pSFdkD8dXY\"",
		"mtime": "2026-07-19T12:14:00.341Z",
		"size": 720,
		"path": "../public/assets/dist-DHydPpMS.js"
	},
	"/assets/format-DLowf3Gh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c7-e+npvw5GMknCHruONBE+/I5XB/U\"",
		"mtime": "2026-07-19T12:14:00.343Z",
		"size": 199,
		"path": "../public/assets/format-DLowf3Gh.js"
	},
	"/assets/how-it-works-DCLqRhMZ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"895-5Kej+SOKJ+FoDWfnbQijwsAhwdg\"",
		"mtime": "2026-07-19T12:14:00.345Z",
		"size": 2197,
		"path": "../public/assets/how-it-works-DCLqRhMZ.js"
	},
	"/assets/html2canvas-CRV6Yc1K.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"30b8d-dRJIFW+YrHpaaQMj3RzlDNuvUiY\"",
		"mtime": "2026-07-19T12:14:00.345Z",
		"size": 199565,
		"path": "../public/assets/html2canvas-CRV6Yc1K.js"
	},
	"/assets/input-Db2zRyag.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"294-zgiTOX5h74K5r3XmAP9bjykBqAo\"",
		"mtime": "2026-07-19T12:14:00.346Z",
		"size": 660,
		"path": "../public/assets/input-Db2zRyag.js"
	},
	"/assets/label-CR_9bDjO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2b8-E6Ba9W/KdFyZAgWhKNys7UqX+sQ\"",
		"mtime": "2026-07-19T12:14:00.346Z",
		"size": 696,
		"path": "../public/assets/label-CR_9bDjO.js"
	},
	"/assets/link-2-DlFslkYD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"f2-GN8vLz6v3wnZoXuLvQPg3BONNuQ\"",
		"mtime": "2026-07-19T12:14:00.346Z",
		"size": 242,
		"path": "../public/assets/link-2-DlFslkYD.js"
	},
	"/assets/not-found-i5RsCZif.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"76-Trmr7GZIBZuvfg4uM18tBiRtOXg\"",
		"mtime": "2026-07-19T12:14:00.348Z",
		"size": 118,
		"path": "../public/assets/not-found-i5RsCZif.js"
	},
	"/assets/index-DFNPS9oe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"56003-4ZPHnfJhUfJEe58TtlPi6Sn4rko\"",
		"mtime": "2026-07-19T12:14:00.296Z",
		"size": 352259,
		"path": "../public/assets/index-DFNPS9oe.js"
	},
	"/assets/index.es-CxFH6l7C.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"24f45-lLmwj9CWqqvuGnPD1ySmlPSPZ48\"",
		"mtime": "2026-07-19T12:14:00.345Z",
		"size": 151365,
		"path": "../public/assets/index.es-CxFH6l7C.js"
	},
	"/assets/pricing-ByGR2lSx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"97d-RtYBErvyH4i5NhEtnBUDcMvv1vE\"",
		"mtime": "2026-07-19T12:14:00.348Z",
		"size": 2429,
		"path": "../public/assets/pricing-ByGR2lSx.js"
	},
	"/assets/MarketingLayout-CIcbRFXU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"16d2-+w0x91cdQvSPKelP+bgV0iWXuZQ\"",
		"mtime": "2026-07-19T12:14:00.296Z",
		"size": 5842,
		"path": "../public/assets/MarketingLayout-CIcbRFXU.js"
	},
	"/assets/products.index-8Ru8FrCJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"cb9-vYBWDqq4qY35v6PggM6uviQfV+s\"",
		"mtime": "2026-07-19T12:14:00.349Z",
		"size": 3257,
		"path": "../public/assets/products.index-8Ru8FrCJ.js"
	},
	"/assets/products._slug-d16bHAWm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b3-neIINP1OCgINPN3/LPcbHHkK334\"",
		"mtime": "2026-07-19T12:14:00.349Z",
		"size": 2483,
		"path": "../public/assets/products._slug-d16bHAWm.js"
	},
	"/assets/products._slug-R21NYYWE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1f2-1MfkJXYizF+xtP7cFT4iPBhZpik\"",
		"mtime": "2026-07-19T12:14:00.348Z",
		"size": 498,
		"path": "../public/assets/products._slug-R21NYYWE.js"
	},
	"/assets/purify.es-DuRL7t6i.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"68ff-UzqdquwlS23jMr/0lDNWmxy5AL0\"",
		"mtime": "2026-07-19T12:14:00.350Z",
		"size": 26879,
		"path": "../public/assets/purify.es-DuRL7t6i.js"
	},
	"/assets/reseller.index-DJ7LAi8J.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26-SoFMfAHVJ5oqB5t+mpFRoQvFIoc\"",
		"mtime": "2026-07-19T12:14:00.351Z",
		"size": 38,
		"path": "../public/assets/reseller.index-DJ7LAi8J.js"
	},
	"/assets/receipt-D7F0z-_v.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1be-NLWI4QzY1s/OA3IHZBE7av4vXLs\"",
		"mtime": "2026-07-19T12:14:00.350Z",
		"size": 446,
		"path": "../public/assets/receipt-D7F0z-_v.js"
	},
	"/assets/reset-password-CNaBhYOT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"563-JhcDdLFkRVSuGhdVzS0ZXGYplHE\"",
		"mtime": "2026-07-19T12:14:00.351Z",
		"size": 1379,
		"path": "../public/assets/reset-password-CNaBhYOT.js"
	},
	"/assets/rolldown-runtime-Bh1tDfsg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"237-RWMfWL++Hyx/oSoFmTJgBJkEveY\"",
		"mtime": "2026-07-19T12:14:00.352Z",
		"size": 567,
		"path": "../public/assets/rolldown-runtime-Bh1tDfsg.js"
	},
	"/assets/route-BsluiAhR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1a07e-7qfl07Zw9DrDR6KgUbqfa0lmKVg\"",
		"mtime": "2026-07-19T12:14:00.353Z",
		"size": 106622,
		"path": "../public/assets/route-BsluiAhR.js"
	},
	"/assets/routes-BMlB9LTb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1fe7-94/0eJBaxJn1cVeRox8a8Y5ZkWk\"",
		"mtime": "2026-07-19T12:14:00.354Z",
		"size": 8167,
		"path": "../public/assets/routes-BMlB9LTb.js"
	},
	"/assets/shopping-cart-DaLCNrH6.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"124-b9Q5Lq2n9r+epzqzm3GLt1bo4+g\"",
		"mtime": "2026-07-19T12:14:00.354Z",
		"size": 292,
		"path": "../public/assets/shopping-cart-DaLCNrH6.js"
	},
	"/assets/theme-toggle-BNra678y.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f5-OWSbDX8VCkrs/ze8rEpIeYUFxUs\"",
		"mtime": "2026-07-19T12:14:00.355Z",
		"size": 2293,
		"path": "../public/assets/theme-toggle-BNra678y.js"
	},
	"/assets/sparkles-CzAcUuAd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-U6+Kf6vmt6azyty+7SQtp9u2sVM\"",
		"mtime": "2026-07-19T12:14:00.355Z",
		"size": 494,
		"path": "../public/assets/sparkles-CzAcUuAd.js"
	},
	"/assets/trending-up-DZXpV4mc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ee-kmiy+HifW5iz0mRYZ1f60/s13PU\"",
		"mtime": "2026-07-19T12:14:00.357Z",
		"size": 494,
		"path": "../public/assets/trending-up-DZXpV4mc.js"
	},
	"/assets/styles-TUNG57pp.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"1657e-u2y3B/2ctylqwM6DB9DTIy9yjw0\"",
		"mtime": "2026-07-19T12:14:00.362Z",
		"size": 91518,
		"path": "../public/assets/styles-TUNG57pp.css"
	},
	"/assets/useQuery-CdrCMT9n.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"60-SKIPJdKEsVO2/S41Sr9SBMHzewQ\"",
		"mtime": "2026-07-19T12:14:00.358Z",
		"size": 96,
		"path": "../public/assets/useQuery-CdrCMT9n.js"
	},
	"/assets/useBaseQuery-DYOBwnYh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"228f-cpxbIKgoDKCNjevXZYu1ryIjBy0\"",
		"mtime": "2026-07-19T12:14:00.358Z",
		"size": 8847,
		"path": "../public/assets/useBaseQuery-DYOBwnYh.js"
	},
	"/assets/types-CHwUWPSh.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dc45-bMgn5gfFsG5tXMsQN9o+gVMGRP4\"",
		"mtime": "2026-07-19T12:14:00.357Z",
		"size": 56389,
		"path": "../public/assets/types-CHwUWPSh.js"
	},
	"/assets/typeof-B5XbjTb1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10f-yPXEOGyFHb1Ws7OoWyWNEEBz4mQ\"",
		"mtime": "2026-07-19T12:14:00.357Z",
		"size": 271,
		"path": "../public/assets/typeof-B5XbjTb1.js"
	},
	"/assets/user-CC9Ez92I.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-BFoQy/Zjsgq4ZNA8Sk8Duyr/OsY\"",
		"mtime": "2026-07-19T12:14:00.360Z",
		"size": 196,
		"path": "../public/assets/user-CC9Ez92I.js"
	},
	"/assets/users-B2DsBfh3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"132-zWrZr6UD+W4xcDta4BNDqTEV8E4\"",
		"mtime": "2026-07-19T12:14:00.360Z",
		"size": 306,
		"path": "../public/assets/users-B2DsBfh3.js"
	},
	"/assets/useSuspenseQuery-BK8dGXXD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-gNI3aYkgwT6f8sYy69oiqnwmwGs\"",
		"mtime": "2026-07-19T12:14:00.358Z",
		"size": 174,
		"path": "../public/assets/useSuspenseQuery-BK8dGXXD.js"
	},
	"/assets/utils-B6KiDbIe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6a7d-iNkBSvaSyIjvZOzWoTvEa49qwcI\"",
		"mtime": "2026-07-19T12:14:00.360Z",
		"size": 27261,
		"path": "../public/assets/utils-B6KiDbIe.js"
	},
	"/images/employees.jpg": {
		"type": "image/jpeg",
		"etag": "\"1d7e-r67SmkeA62vvF7f4lQ4kPhk5Lhw\"",
		"mtime": "2026-07-19T11:07:33.537Z",
		"size": 7550,
		"path": "../public/images/employees.jpg"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_xzlEOP = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_xzlEOP
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };
