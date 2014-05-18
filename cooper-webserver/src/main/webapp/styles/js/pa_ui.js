jQuery.pa_ui || (function(b) {
	var a = typeof pauiConfig == "undefined" ? {} : pauiConfig;
	jQuery.pa_ui = b.extend({
		version : "3.0",
		build : "2010.0720.1742",
		isDebug : false,
		autoLoadJs : true,
		autoLoadCss : false,
		lazyLoad : false,
		theme : "default"
	}, a)
})(jQuery);
if ($.pa_ui.isDebug) {
	$.pa_ui.fileMapping = {
		dialog : [ "dialog", "" ],
		accordion : [ "accordion", "accordion" ],
		tabs : [ "tabs", "tabs" ],
		popuptrigger : [ "popup", "" ],
		tooltip : [ "tooltip", "" ],
		table : [ "table,datepicker", "table,datepicker" ],
		exinput : [ "exinput", "" ],
		datepicker : [ "datepicker", "datepicker" ],
		birthday_year : [ "birthday,validator", "validator,datepicker" ],
		birthday_month : [ "birthday,validator", "validator,datepicker" ],
		birthday_day : [ "birthday,validator", "validator,datepicker" ],
		insuranceinterval : [ "datepicker,insuranceinterval", "datepicker" ],
		popupyear : [ "ymd", "datepicker" ],
		popupmonth : [ "ymd", "datepicker" ],
		popupday : [ "ymd", "datepicker" ],
		keyboard : [ "keyboard", "keyboard" ],
		validator : [ "validator", "validator" ],
		validcode : [ "validcode", "" ],
		tree : [ "tree", "tree" ],
		radio : [ "radio", "select" ],
		radiobutton : [ "radiobutton", "" ],
		checkbox : [ "checkbox", "select" ],
		dropselect : [ "dropselect", "select" ],
		dropinput : [ "dropinput", "select" ],
		dropbox : [ "dropbox", "select" ],
		casselect : [ "casselect", "select" ],
		stars : [ "stars", "select" ],
		pagebar : [ "pagebar", "pagebar" ],
		slider : [ "slider", "slider" ],
		gallery : [ "gallery", "" ],
		eximage : [ "image", "image" ],
		exscroll : [ "exscroll", "" ],
		roller : [ "roller", "" ],
		gotop : [ "totop", "" ],
		shadowtext : [ "shadowtext", "shadowtext" ],
		ajaxlink : [ "ajaxlink", "" ],
		virframe : [ "virframe", "" ],
		passwordstrength : [ "passwordstrength", "" ],
		times : [ "times", "" ],
		formatmoney : [ "formatmoney", "" ],
		suggest : [ "suggest", "" ],
		menu : [ "menu", "" ],
		menuie : [ "menuie", "" ]
	}
} else {
	$.pa_ui.fileMapping = {
		dialog : [ "dialog", "" ],
		accordion : [ "misc", "accordion" ],
		tabs : [ "misc", "tabs" ],
		tree : [ "misc", "tree" ],
		roller : [ "misc", "" ],
		tooltip : [ "misc", "" ],
		exscroll : [ "misc", "scroll" ],
		shadowtext : [ "misc", "shadowtext" ],
		exinput : [ "misc", "" ],
		radio : [ "misc", "radio" ],
		radiobutton : [ "misc", "" ],
		checkbox : [ "misc", "select" ],
		dropselect : [ "misc", "select" ],
		dropinput : [ "misc", "select" ],
		dropbox : [ "misc", "select" ],
		casselect : [ "misc", "select" ],
		keyboard : [ "misc", "keyboard" ],
		passwordstrength : [ "misc", "" ],
		table : [ "misc,date", "table,datepicker" ],
		validator : [ "validator", "validator" ],
		stars : [ "misc", "stars" ],
		pagebar : [ "misc", "pagebar" ],
		slider : [ "misc", "slider" ],
		gallery : [ "misc", "" ],
		eximage : [ "misc", "image" ],
		datepicker : [ "date", "datepicker" ],
		birthday_year : [ "date,validator", "validator,datepicker" ],
		birthday_month : [ "date,validator", "validator,datepicker" ],
		birthday_day : [ "date,validator", "validator,datepicker" ],
		insuranceinterval : [ "date", "datepicker" ],
		popupyear : [ "date", "datepicker" ],
		popupmonth : [ "date", "datepicker" ],
		popupday : [ "date", "datepicker" ],
		popuptrigger : [ "misc", "" ],
		gotop : [ "misc", "" ],
		ajaxlink : [ "misc", "" ],
		virframe : [ "misc", "" ],
		validcode : [ "validator", "" ],
		times : [ "misc", "" ],
		formatmoney : [ "misc", "" ],
		suggest : [ "misc", "" ],
		menu : [ "misc", "" ],
		menuie : [ "misc", "" ]
	}
}
(function(a) {
	a
			.extend(
					a.pa_ui,
					{
						util : {
							log : function(f) {
								var g = "pa_ui_log";
								var h = "pa_ui_log_content";
								var e = "pa_ui_log_button";
								var b = a("#" + g);
								if (b.length <= 0) {
									a("body").append(
											"<div id='" + g + "'></div>");
									b = a("#" + g)
								}
								var d = b.find("textarea:first").val() || "";
								d = new Date().getFullYear() + "-"
										+ (new Date().getMonth() + 1) + "-"
										+ (new Date().getDate()) + " "
										+ (new Date().getHours()) + ":"
										+ (new Date().getMinutes()) + ":"
										+ (new Date().getSeconds()) + " "
										+ (new Date().getMilliseconds()) + ": "
										+ f + "\r\n" + d;
								var c = '<div id="'
										+ h
										+ '" class="pa_ui_log_content"><textarea>'
										+ d
										+ '</textarea></div><div id="'
										+ e
										+ '" class="pa_ui_log_button"><button onclick="$(\'#'
										+ g
										+ "').remove();\">\u5173\u95ed</button><button onclick=\"$('#"
										+ h
										+ "').children('textarea').val('')\">\u6e05\u9664</button></div>";
								b.html(c)
							},
							logAll : function(b) {
								if (b == null | b == undefined) {
									this.log(b)
								}
								for ( var c in b) {
									this.log(c + "	" + b[c])
								}
							},
							timeMillis : function(c) {
								if ($isEmpty(c)) {
									return 0
								}
								var b = c.split("-");
								return new Date(b[0], b[1], b[2], 0, 0, 0)
										.getTime()
							},
							safeId : function(b) {
								b = b.replace(/:/g, "\\:");
								b = b.replace(/\./g, "\\.");
								return b
							},
							copyToClipboard : function(c) {
								if (window.clipboardData) {
									window.clipboardData.clearData();
									window.clipboardData.setData("Text", c);
									return true
								} else {
									if (navigator.userAgent.indexOf("Opera") != -1) {
										window.location = c;
										return true
									} else {
										if (window.netscape) {
											try {
												netscape.security.PrivilegeManager
														.enablePrivilege("UniversalXPConnect")
											} catch (h) {
												alert("\u88ab\u6d4f\u89c8\u5668\u62d2\u7edd\uff01\n\u8bf7\u5728\u6d4f\u89c8\u5668\u5730\u5740\u680f\u8f93\u5165'about:config'\u5e76\u56de\u8f66\n\u7136\u540e\u5c06'signed.applets.codebase_principal_support'\u8bbe\u7f6e\u4e3a'true'")
											}
											var f = Components.classes["@mozilla.org/widget/clipboard;1"]
													.createInstance(Components.interfaces.nsIClipboard);
											if (!f) {
												return false
											}
											var d = Components.classes["@mozilla.org/widget/transferable;1"]
													.createInstance(Components.interfaces.nsITransferable);
											if (!d) {
												return false
											}
											d.addDataFlavor("text/unicode");
											var i = new Object();
											var b = new Object();
											var i = Components.classes["@mozilla.org/supports-string;1"]
													.createInstance(Components.interfaces.nsISupportsString);
											var j = c;
											i.data = j;
											d.setTransferData("text/unicode",
													i, j.length * 2);
											var g = Components.interfaces.nsIClipboard;
											if (!f) {
												return false
											}
											f.setData(d, null,
													g.kGlobalClipboard);
											return true
										}
									}
								}
							}
						},
						ui : {
							getCenter : function(d) {
								var c = document.documentElement.clientWidth
										+ a(document).scrollLeft();
								var b = document.documentElement.clientHeight
										+ a(document).scrollTop();
								var f = (c - a(d).outerWidth()) / 2;
								var e = (b - a(d).outerHeight()) / 2;
								return {
									left : f,
									top : e
								}
							},
							select : {
								init : function(b) {
									a.pa_ui.ui.select.removeAll(b)
								},
								add : function(b, d, e) {
									var c = new Option(e, d);
									b.options.add(c)
								},
								remove : function(c, b) {
									c.options.remove(b)
								},
								removeAll : function(b) {
									b.options.length = 0
								}
							},
							adjustPosition : function(i) {
								var d = a(i);
								var f = d.outerWidth();
								var b = d.outerHeight();
								var h = d.offset().left;
								var g = d.offset().top;
								var e = document.documentElement.clientWidth
										+ a(document).scrollLeft();
								var c = document.documentElement.clientHeight
										+ a(document).scrollTop();
								if (g + b > c && c > b) {
									g -= (g + b - c)
								}
								if (h + f > e && e > f) {
									h -= (h + f - e)
								}
								d.css({
									top : g,
									left : h
								})
							},
							scrollPosition : function(i) {
								var d = a(i);
								var f = d.outerWidth();
								var b = d.outerHeight();
								var h = d.offset().left;
								var g = d.offset().top;
								var e = document.documentElement.clientWidth
										+ a(document).scrollLeft();
								var c = document.documentElement.clientHeight
										+ a(document).scrollTop();
								if (g + b > c && c > b) {
									a(document).scrollTop(
											a(document).scrollTop()
													+ (g + b - c))
								}
								if (h + f > e && e > f) {
									a(document).scrollLeft(
											a(document).scrollLeft()
													+ (h + f - e))
								}
							}
						},
						loader : {
							loadJs : function(c) {
								var b = document.getElementsByTagName("head")
										.item(0);
								script = document.createElement("script");
								script.src = c;
								script.type = "text/javascript";
								b.appendChild(script)
							},
							loadCss : function(c) {
								var b = document.getElementsByTagName("head")
										.item(0);
								css = document.createElement("link");
								css.href = c;
								css.rel = "stylesheet";
								css.type = "text/css";
								b.appendChild(css)
							}
						},
						validator : {
							isInt : function(b) {
								return true
							},
							isEmpty : function(b) {
								if (b == null) {
									return true
								}
								return (b.length == 0)
							},
							isBlank : function(b) {
								if (b == null) {
									return true
								}
								return (a.trim(b).length == 0)
							},
							isNumeric : function(b) {
								var c = /^[0-9]*$/;
								return (c.test(b))
							},
							isCharNum : function(b) {
								var c = /^[0-9a-zA-Z]*$/;
								return (c.test(b))
							},
							isEmail : function(b) {
								var c = /^[_\.0-9a-zA-Z\-]+@([_0-9a-zA-Z\-]+\.)+[a-zA-Z]{2,3}$/;
								return (c.test(b))
							},
							isFloat : function(b) {
								var c = /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/;
								return (c.test(b))
							},
							isPhone : function(b) {
								var c = /^[0-9-;,]*$/;
								return (c.test(b))
							},
							isMobile : function(b) {
								var c = /^1[3-5]\d{9}$/;
								return (c.test(b))
							},
							isInteger : function(b) {
								var c = /^\d+$/;
								if (!c.test(b) || parseInt(b, 10) == 0) {
									return false
								}
								return true
							},
							isHttpUrl : function(b) {
								var c = /^http[s]?:\/\/[\w-]+(\.[\w-]+)+([\w-\.\/?%&=]*)?$/;
								return c.test(b)
							},
							isDate : function(b) {
								var c = b
										.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
								if (c == null) {
									return false
								}
								var e = new Date(c[1], c[3] - 1, c[4]);
								return (e.getFullYear() == c[1]
										&& (e.getMonth() + 1) == c[3] && e
										.getDate() == c[4])
							}
						},
						converter : {
							toInt : function(c) {
								var b = parseInt(c, 10);
								return (isNaN(b)) ? 0 : b
							},
							toFloat : function(c) {
								var b = parseFloat(c);
								return (isNaN(b)) ? 0 : b
							},
							toDate : function(c) {
								if (a.pa_ui.validator.isDate(c)) {
									c = c.replace(/\-/ig, "/");
									var b = c.split("/");
									a.each(b, function(d) {
										b[d] = b[d].replace(/^0+/g, "")
									});
									if (b[2]
											&& (parseInt(b[1]) > 0 && parseInt(b[1]) < 13)
											&& (parseInt(b[2]) > 0 && parseInt(b[2]) < 32)) {
										return new Date(parseInt(b[0]),
												parseInt(b[1]) - 1,
												parseInt(b[2]))
									} else {
										return null
									}
								} else {
									return null
								}
							}
						},
						widget : {
							inited : function(b) {
								a.pa_ui.widget.initedCount++;
								if (a.pa_ui.widget.timer) {
									clearTimeout(a.pa_ui.widget.timer)
								}
								a.pa_ui.widget.timer = setTimeout(
										function() {
											if (a.pa_ui.widget.initedCount >= a.pa_ui.widget.count) {
												if (!a.pa_ui.widget.triggered) {
													a("body").trigger(
															"widgetloaded");
													a.pa_ui.widget.triggered = true
												}
											}
										}, 200)
							},
							init : function(b) {
								a.pa_ui.widget.initingCount++
							},
							count : 0,
							initedCount : 0,
							initingCount : 0,
							triggered : false,
							timer : null
						},
						loading : function(j, k) {
							var f = function() {
								if (a.browser.msie && a.browser.version < 7) {
									var l = Math
											.max(
													document.documentElement.scrollWidth,
													document.body.scrollWidth);
									var m = Math
											.max(
													document.documentElement.offsetWidth,
													document.body.offsetWidth);
									if (l < m) {
										return a(window).width() + "px"
									} else {
										return l + "px"
									}
								} else {
									return a(document).width() + "px"
								}
							};
							var e = function() {
								if (a.browser.msie && a.browser.version < 7) {
									var m = Math
											.max(
													document.documentElement.scrollHeight,
													document.body.scrollHeight);
									var l = Math
											.max(
													document.documentElement.offsetHeight,
													document.body.offsetHeight);
									if (m < l) {
										return a(window).height() + "px"
									} else {
										return m + "px"
									}
								} else {
									return a(document).height() + "px"
								}
							};
							var g = function() {
								this.overlay.css({
									width : 0,
									height : 0
								}).css({
									width : this._overlayWidth(),
									height : this._overlayHeight()
								})
							};
							var c = function() {
								d.remove();
								h.remove();
								a(window).unbind("resize.loading");
								clearTimeout(i);
								clearInterval(b);
								if (typeof k.close === "function") {
									k.close.call()
								}
							};
							var d = a("<div></div>").addClass("pa_ui_loading")
									.css({
										position : "absolute"
									}).html(j).appendTo("body");
							d.css({
								left : a.pa_ui.ui.getCenter(d[0]).left,
								top : a.pa_ui.ui.getCenter(d[0]).top
							});
							var h = a("<div></div>").addClass(
									"pa_ui_loading_overlay").css({
								position : "absolute"
							}).appendTo(document.body);
							h.css({
								width : f(),
								height : e()
							});
							var i = null, b;
							if (k.interval
									&& a.pa_ui.validator.isInt(k.interval)) {
								i = setTimeout(c, k.interval)
							} else {
								if (k.whenClose
										&& typeof k.whenClose === "function") {
									b = setInterval(function() {
										if (k.whenClose.call() === true) {
											c()
										}
									}, 500)
								}
							}
						},
						randomId : 100000
					})
})(jQuery);
(function($) {
	$.cookie = function(name, value, options) {
		if (typeof value != "undefined") {
			options = options || {};
			if (value === null) {
				value = "";
				options = $.extend({}, options);
				options.expires = -1
			}
			var expires = "";
			if (options.expires
					&& (typeof options.expires == "number" || options.expires.toUTCString)) {
				var date;
				if (typeof options.expires == "number") {
					date = new Date();
					date.setTime(date.getTime()
							+ (options.expires * 24 * 60 * 60 * 1000))
				} else {
					date = options.expires
				}
				expires = "; expires=" + date.toUTCString()
			}
			var path = options.path ? "; path=" + (options.path) : "";
			var domain = options.domain ? "; domain=" + (options.domain) : "";
			var secure = options.secure ? "; secure" : "";
			document.cookie = [ name, "=", encodeURIComponent(value), expires,
					path, domain, secure ].join("")
		} else {
			var cookieValue = null;
			if (document.cookie && document.cookie != "") {
				var cookies = document.cookie.split(";");
				for ( var i = 0; i < cookies.length; i++) {
					var cookie = jQuery.trim(cookies[i]);
					if (cookie.substring(0, name.length + 1) == (name + "=")) {
						cookieValue = decodeURIComponent(cookie
								.substring(name.length + 1));
						break
					}
				}
			}
			return cookieValue
		}
	};
	$.extend({
		metadata : {
			defaults : {
				type : "class",
				name : "metadata",
				cre : /({.*})/,
				single : "metadata"
			},
			setType : function(type, name) {
				this.defaults.type = type;
				this.defaults.name = name
			},
			get : function(elem, opts) {
				var settings = $.extend({}, this.defaults, opts);
				if (!settings.single.length) {
					settings.single = "metadata"
				}
				var data = $.data(elem, settings.single);
				if (data) {
					return data
				}
				data = "{}";
				var getData = function(data) {
					if (typeof data != "string") {
						return data
					}
					if (data.indexOf("{") < 0) {
						data = eval("(" + data + ")")
					}
				};
				var getObject = function(data) {
					if (typeof data != "string") {
						return data
					}
					data = eval("(" + data + ")");
					return data
				};
				if (settings.type == "html5") {
					var object = {};
					$(elem.attributes).each(function() {
						var name = this.nodeName;
						if (name.match(/^data-/)) {
							name = name.replace(/^data-/, "")
						} else {
							return true
						}
						object[name] = getObject(this.nodeValue)
					})
				} else {
					if (settings.type == "class") {
						var m = settings.cre.exec(elem.className);
						if (m) {
							data = m[1]
						}
					} else {
						if (settings.type == "elem") {
							if (!elem.getElementsByTagName) {
								return
							}
							var e = elem.getElementsByTagName(settings.name);
							if (e.length) {
								data = $.trim(e[0].innerHTML)
							}
						} else {
							if (elem.getAttribute != undefined) {
								var attr = elem.getAttribute(settings.name);
								if (attr) {
									data = attr
								}
							}
						}
					}
					object = getObject(data.indexOf("{") < 0 ? "{" + data + "}"
							: data)
				}
				$.data(elem, settings.single, object);
				return object
			}
		}
	});
	$.fn.metadata = function(opts) {
		return $.metadata.get(this[0], opts)
	};
	$.fn.xFixed = function(params) {
		var defaults = {
			openMode : "absolute"
		};
		var o = $.extend(defaults, params);
		var done = false;
		if (($.browser.msie && $.browser.version == "6.0")) {
			done = true
		}
		var paraPostion = o.openMode;
		return this.each(function(i, o) {
			var $this = $(this);
			if (paraPostion == "absolute") {
				$this.css({
					position : "absolute"
				})
			} else {
				if (done) {
					$this.css({
						position : "absolute"
					})
				} else {
					$this.css({
						position : "fixed"
					})
				}
			}
		})
	};
	$.fn.bgiframe = function(s) {
		if ($.browser.msie && /MSIE 6.0/ig.test(navigator.appVersion)) {
			s = $.extend({
				top : "auto",
				left : "auto",
				width : "auto",
				height : "auto",
				opacity : true,
				src : "javascript:false;"
			}, s || {});
			var prop = function(n) {
				return n && n.constructor == Number ? n + "px" : n
			}, html = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'
					+ s.src
					+ '"style="display:block;position:absolute;z-index:-1;'
					+ (s.opacity !== false ? "filter:Alpha(Opacity='0');" : "")
					+ "top:"
					+ (s.top == "auto" ? "expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+'px')"
							: prop(s.top))
					+ ";left:"
					+ (s.left == "auto" ? "expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+'px')"
							: prop(s.left))
					+ ";width:"
					+ (s.width == "auto" ? "expression(this.parentNode.offsetWidth+'px')"
							: prop(s.width))
					+ ";height:"
					+ (s.height == "auto" ? "expression(this.parentNode.offsetHeight+'px')"
							: prop(s.height)) + ';"/>';
			return this.each(function() {
				if ($("> iframe.bgiframe", this).length == 0) {
					this.insertBefore(document.createElement(html),
							this.firstChild)
				}
			})
		}
		return this
	};
	$.fn.autosizeiframe = function() {
		return this
				.each(function() {
					try {
						var iframe = this;
						var bHeight = iframe.contentWindow.document.body.scrollHeight;
						var dHeight = iframe.contentWindow.document.documentElement.scrollHeight;
						var height = Math.max(bHeight, dHeight);
						iframe.height = height
					} catch (e) {
					}
				})
	};
	$.widget("ui.selection", {
		_init : function() {
		},
		get : function() {
			var e = this.element[0];
			return (("selectionStart" in e && function() {
				var l = e.selectionEnd - e.selectionStart;
				return {
					begin : e.selectionStart,
					end : e.selectionEnd,
					length : l,
					text : e.value.substr(e.selectionStart, l)
				}
			}) || (document.selection && function() {
				e.focus();
				var r = document.selection.createRange();
				if (r == null) {
					return {
						begin : 0,
						end : e.value.length,
						length : 0
					}
				}
				var re = e.createTextRange();
				var rc = re.duplicate();
				re.moveToBookmark(r.getBookmark());
				rc.setEndPoint("EndToStart", re);
				return {
					begin : rc.text.length,
					end : rc.text.length + r.text.length,
					length : r.text.length,
					text : r.text
				}
			}) || function() {
				return {
					begin : 0,
					end : e.value.length,
					length : 0
				}
			})()
		},
		set : function() {
		},
		replace : function() {
		},
		destroy : function() {
		}
	});
	$.extend($.ui.selection, {
		getter : "get",
		defauts : {}
	});
	$.widget("ui.cover", {
		_init : function() {
			var self = this;
			this.coverBox = $("<div></div>").addClass("pa_ui_cover_box").hide()
					.appendTo("body");
			this.coverDiv = $("<div></div>").addClass("pa_ui_cover").appendTo(
					self.coverBox);
			this.contentDiv = $("<div></div>").addClass("pa_ui_cover_content")
					.appendTo(self.coverDiv);
			var top = this.element.offset().top;
			var left = this.element.offset().left;
			if (this.options.offset) {
				if (this.options.offset.top) {
					top += this.options.offset.top
				}
				if (this.options.offset.left) {
					left += this.options.offset.left
				}
			}
			var width = this.element.outerWidth();
			var height = this.element.outerHeight();
			if (this.options.addWidth) {
				width += this.options.addWidth
			}
			if (this.options.addHeight) {
				height += this.options.addHeight
			}
			this.coverBox.width(width).height(height).css("top", top).css(
					"left", left);
			self.show(this.options.message);
			if (self.options.autoClose) {
				setTimeout(function() {
					self.close();
					self.element.removeData("cover")
				}, self.options.delay)
			}
		},
		show : function(message) {
			this.contentDiv.html(message ? message : "");
			this.coverBox.css("z-index", $.ui.popup.maxZ++);
			var effect = this.options.effect;
			if (effect && this.coverBox[effect]) {
				if (this.options.effectPars) {
					this.coverBox[effect].call(this.coverBox,
							this.options.effectPars)
				} else {
					this.coverBox[effect]()
				}
			} else {
				if (this.options.effectPars) {
					this.coverBox.show(this.options.effectPars)
				} else {
					this.coverBox.show()
				}
			}
		},
		close : function() {
			var effect = this.options.effect;
			if (effect && this.coverBox[effect]) {
				if (effect == "slideDown") {
					effect = "slideUp"
				} else {
					if (effect == "fadeIn") {
						effect = "fadeOut"
					} else {
						effect = "hide"
					}
				}
				if (this.options.effectPars) {
					this.coverBox[effect].call(this.coverBox,
							this.options.effectPars)
				} else {
					this.coverBox[effect]()
				}
			} else {
				if (this.options.effectPars) {
					this.coverBox.hide(this.options.effectPars)
				} else {
					this.coverBox.hide()
				}
			}
		},
		destroy : function() {
			this.element.removeData("cover");
			this.coverBox.remove()
		}
	});
	$
			.widget(
					"ui.popup",
					{
						_init : function() {
							var self = this;
							this.offset = {
								top : 0,
								left : 0
							};
							this.container = $(
									'<div class="pa_ui_popup_container"></div>')
									.hide().css({
										position : "absolute"
									}).append(self.element.show()).bgiframe()
									.appendTo("body");
							var viewWidth = document.documentElement.clientWidth
									+ $(document).scrollLeft();
							var viewHeight = document.documentElement.clientHeight
									+ $(document).scrollTop();
							var left = (viewWidth - self.container.outerWidth()) / 2;
							var top = (viewHeight - self.container
									.outerHeight()) / 2;
							if (self.options.anchor && self.options.anchor.id) {
								var $anchor = typeof self.options.anchor.id == "string" ? $("#"
										+ self.options.anchor.id)
										: $(self.options.anchor.id);
								left = $anchor.offset().left;
								top = $anchor.offset().top
										+ $anchor.outerHeight();
								var width = self.container.outerWidth();
								if ((width + left) > viewWidth) {
									var left = left - width
											+ $anchor.outerWidth();
									if (left < 0) {
										left = 0
									}
								}
							}
							this.offset.left = left;
							this.offset.top = top;
							self.container.css({
								left : left,
								top : top
							});
							self._isOpen = false;
							var triggerClose = this.options.triggerClose;
							if (triggerClose == "click") {
								$(document).bind("click." + self.widgetName,
										function(event) {
										})
							} else {
								if (triggerClose == "mouseout") {
									self.container.bind("mouseout."
											+ self.widgetName, function(event) {
									})
								}
							}
							$(window).bind("resize.popup", function() {
								self._resetPos()
							});
							return this
						},
						moveToTop : function() {
							var self = this;
							self.container.css("z-index", $.ui.popup.maxZ++);
							return self
						},
						_adjustPos : function() {
							var self = this;
							var viewWidth = document.documentElement.clientWidth
									+ $(document).scrollLeft();
							var viewHeight = document.documentElement.clientHeight
									+ $(document).scrollTop();
							var width = this.container.outerWidth();
							if ((width + this.offset.left) > viewWidth) {
								this.offset.left = this.offset.left - width;
								if (self.options.anchor
										&& self.options.anchor.id) {
									var $anchor = typeof self.options.anchor.id == "string" ? $("#"
											+ self.options.anchor.id)
											: $(self.options.anchor.id);
									self.offset.left = self.offset.left
											+ $anchor.outerWidth()
								}
								if (this.offset.left < 0) {
									this.offset.left = 0
								}
							}
							this.container.css({
								left : this.offset.left,
								top : this.offset.top
							})
						},
						_resetPos : function() {
							var self = this;
							if (self.options.anchor && self.options.anchor.id) {
								var $anchor = typeof self.options.anchor.id == "string" ? $("#"
										+ self.options.anchor.id)
										: $(self.options.anchor.id);
								self.offset.left = $anchor.offset().left;
								self.offset.top = $anchor.offset().top
										+ $anchor.outerHeight();
								self.container.css({
									left : self.offset.left,
									top : self.offset.top
								})
							}
						},
						containEvent : function(event) {
							var contain = false;
							var el = $(event.target);
							while (el.size() > 0) {
								if (el[0] == this.container[0]) {
									contain = true;
									break
								} else {
									el = el.parent()
								}
							}
							return contain
						},
						open : function(o) {
							if (this._isOpen) {
								return this
							}
							this.overlay = this.options.modal ? this._overlay()
									: null;
							var self = this;
							$.extend(self.options, o);
							self._resetPos();
							self._adjustPos();
							self.container.show();
							self.moveToTop();
							self._isOpen = true;
							return self
						},
						_overlay : function() {
							var $overlay = $("<div></div>").addClass(
									"pa_ui_popup_overlay").appendTo(
									document.body).css({
								width : this._overlayWidth(),
								height : this._overlayHeight()
							});
							return $overlay
						},
						_overlayWidth : function() {
							if ($.browser.msie && $.browser.version < 7) {
								var scrollWidth = Math.max(
										document.documentElement.scrollWidth,
										document.body.scrollWidth);
								var offsetWidth = Math.max(
										document.documentElement.offsetWidth,
										document.body.offsetWidth);
								if (scrollWidth < offsetWidth) {
									return $(window).width() + "px"
								} else {
									return scrollWidth + "px"
								}
							} else {
								return $(document).width() + "px"
							}
						},
						_overlayHeight : function() {
							if ($.browser.msie && $.browser.version < 7) {
								var scrollHeight = Math.max(
										document.documentElement.scrollHeight,
										document.body.scrollHeight);
								var offsetHeight = Math.max(
										document.documentElement.offsetHeight,
										document.body.offsetHeight);
								if (scrollHeight < offsetHeight) {
									return $(window).height() + "px"
								} else {
									return scrollHeight + "px"
								}
							} else {
								return $(document).height() + "px"
							}
						},
						_overlayResize : function() {
							this.overlay.css({
								width : 0,
								height : 0
							}).css({
								width : this._overlayWidth(),
								height : this._overlayHeight()
							})
						},
						isOpen : function() {
							return this._isOpen
						},
						top : function(t) {
							this.offset.top = t
						},
						left : function(l) {
							this.offset.left = l
						},
						close : function() {
							var self = this;
							self.container.hide().css({
								left : 0,
								top : 0
							});
							self._isOpen = false
						},
						destroy : function() {
							var self = this;
							self.element.unbind("remove");
							self.container.remove();
							$(window).unbind(".popup")
						}
					});
	$.extend($.ui.popup, {
		getter : "isOpen containEvent",
		defaults : {
			offsetX : 0,
			offsetY : 0,
			anchor : {
				id : null
			},
			modal : false,
			triggerClose : null
		},
		maxZ : 1000
	});
	if ($.pa_ui.isDebug) {
		$(document).ready(
				function() {
					$(document.body).append(
							"using version:" + $.pa_ui.version + " build:"
									+ $.pa_ui.build)
				})
	}
	$(document).ready(function() {
		$("[pa_ui_name]").each(function() {
			var c = $(this).attr("pa_ui_name").split(",").length;
			$.pa_ui.widget.count += c
		})
	})
})(jQuery);
(function(f) {
	var j = new Array();
	var h = new Array();
	var d = [];
	var k = "/ui30/js/";
	if (f.pa_ui.lazyLoad) {
		f(document)
				.ready(
						function() {
							if (f.pa_ui.autoLoadJs) {
								var o = f("script[src*=pa_ui.js]").attr("src");
								if (o) {
									k = o
											.substring(0, (o
													.indexOf("/pa_ui.js")))
											+ "/";
									if (o.indexOf("?theme=") > -1
											|| o.indexOf("&theme=") > -1) {
										theme = o.substring(
												o.indexOf("theme=") + 6,
												o.length);
										if (theme.indexOf("&") > -1) {
											theme = theme.substring(0, theme
													.indexOf("&"))
										}
										if (theme) {
											f.pa_ui.theme = theme
										}
									}
								}
								if (typeof pa_ui_theme != "undefined"
										&& pa_ui_theme.length > 0) {
									f.pa_ui.theme = pa_ui_theme
								}
								f("[pa_ui_name]")
										.each(
												function() {
													var p = f(this).attr(
															"pa_ui_name")
															.split(",");
													for ( var q = 0; q < p.length; q++) {
														var r = p[q];
														if (r == null
																|| r.length <= 0) {
															continue
														}
														if (f.inArray(r, j) == -1) {
															j.push(r)
														}
													}
												});
								for ( var m = 0; m < j.length; m++) {
									if (j[m]) {
										if (!f.pa_ui.fileMapping[j[m]]) {
											alert("\u4f7f\u7528\u4e86\u4e0d\u5b58\u5728\u7684pa_ui_name="
													+ j[m]);
											return
										}
										var n = f.pa_ui.fileMapping[j[m]][0]
												.split(",");
										f
												.each(
														n,
														function() {
															if (this != null
																	&& this.length > 0) {
																if (f
																		.inArray(
																				(this + ""),
																				h) == -1) {
																	h
																			.push((this + ""))
																}
															}
														});
										n = f.pa_ui.fileMapping[j[m]][1]
												.split(",");
										f
												.each(
														n,
														function() {
															if (this != null
																	|| this.length > 0) {
																if (f
																		.inArray(
																				(this + ""),
																				d) == -1) {
																	d
																			.push((this + ""))
																}
															}
														})
									}
								}
								for ( var m = 0; m < h.length; m++) {
									var l = k + "pa_ui_" + h[m];
									if (f.pa_ui.isDebug) {
										l += ".source"
									}
									l += ".js";
									f.pa_ui.loader.loadJs(l)
								}
								if (f.pa_ui.autoLoadCss) {
									k = k.replace(/\/js\/$/, "/themes/")
											+ f.pa_ui.theme + "/";
									var l = k + "pa_ui.css";
									f.pa_ui.loader.loadCss(l)
								}
							}
						})
	} else {
		if (f.pa_ui.autoLoadJs) {
			var e = document.getElementsByTagName("script");
			var a;
			for ( var g = 0; g < e.length; g++) {
				if (e[g].src.indexOf("pa_ui.js") > 0) {
					a = e[g].src;
					break
				}
			}
			if (a) {
				k = a.substring(0, (a.indexOf("/pa_ui.js"))) + "/";
				if (a.indexOf("?theme=") > -1 || a.indexOf("&theme=") > -1) {
					theme = a.substring(a.indexOf("theme=") + 6, a.length);
					if (theme.indexOf("&") > -1) {
						theme = theme.substring(0, theme.indexOf("&"))
					}
					if (theme) {
						f.pa_ui.theme = theme
					}
				}
			}
			if (typeof pa_ui_theme != "undefined" && pa_ui_theme.length > 0) {
				f.pa_ui.theme = pa_ui_theme
			}
			f("[pa_ui_name]").each(function() {
				var l = f(this).attr("pa_ui_name").split(",");
				for ( var m = 0; m < l.length; m++) {
					var n = l[m] + "";
					if (n == null || n.length <= 0) {
						continue
					}
					if (f.inArray(n, j) == -1) {
						j.push(n)
					}
				}
			});
			for ( var g = 0; g < j.length; g++) {
				if (j[g]) {
					if (!f.pa_ui.fileMapping[j[g]]) {
						alert("\u4f7f\u7528\u4e86\u4e0d\u5b58\u5728\u7684pa_ui_name="
								+ j[g]);
						return
					}
					var b = f.pa_ui.fileMapping[j[g]][0].split(",");
					f.each(b, function() {
						if (this != null && this.length > 0) {
							if (f.inArray((this + ""), h) == -1) {
								h.push((this + ""))
							}
						}
					});
					b = f.pa_ui.fileMapping[j[g]][1].split(",");
					f.each(b, function() {
						if (this != null || this.length > 0) {
							if (f.inArray((this + ""), d) == -1) {
								d.push((this + ""))
							}
						}
					})
				}
			}
			for ( var g = 0; g < h.length; g++) {
				var c = k + "pa_ui_" + h[g];
				if (f.pa_ui.isDebug) {
					c += ".source"
				}
				c += ".js";
				f.pa_ui.loader.loadJs(c)
			}
			if (f.pa_ui.autoLoadCss) {
				k = k.replace(/\/js\/$/, "/themes/") + f.pa_ui.theme + "/";
				var c = k + "pa_ui.css";
				f.pa_ui.loader.loadCss(c)
			}
		}
	}
})(jQuery);
(function(b) {
	b
			.widget(
					"ui.dialog",
					{
						version : "3.0",
						build : "2011.0314.1729",
						_init : function() {
							this.originalTitle = this.element.attr("title");
							this.originPosition = null;
							var n = this, o = this.options, j = o.title
									|| this.originalTitle || "", e = b.ui.dialog
									.getTitleId(this.element), c = (this.uuid = b.ui.dialog.uuid++), k = (this.uiDialog = b("<div/>"))
									.appendTo(document.body)
									.hide()
									.addClass(o.dialogClass)
									.css({
										position : o.openMode,
										overflow : "hidden",
										zIndex : o.zIndex
									})
									.attr("tabIndex", -1)
									.css("outline", 0)
									.keydown(
											function(p) {
												(o.closeOnEscape
														&& p.keyCode
														&& p.keyCode == b.ui.keyCode.ESCAPE && n
														.close(p))
											}).attr({
										role : "dialog",
										"aria-labelledby" : e
									}).mousedown(function(p) {
										n.moveToTop(true, p)
									}), g = this.uiDialogContent = this.element
									.show().removeAttr("title").addClass(
											"pa_ui_dialog_content").appendTo(k), f = (this.uiDialogTitlebar = b("<div></div>"))
									.addClass("pa_ui_dialog_titlebar")
									.prependTo(k), m = b("<div></div>")
									.addClass("pa_ui_dialog_titlebar_button")
									.prependTo(f), h = b('<a href=""/>')
									.addClass("pa_ui_dialog_titlebar_close")
									.attr("title", o.closeText).attr("role",
											"button").mousedown(function(p) {
										p.stopPropagation()
									}).click(function(p) {
										n.close(p);
										return false
									}), i = b('<a href=""/>').addClass(
									"pa_ui_dialog_titlebar_min").attr("role",
									"button").attr("title", o.minText)
									.mousedown(function(p) {
										p.stopPropagation()
									}).click(function(p) {
										return n.min()
									}), l = b('<a href=""/>').addClass(
									"pa_ui_dialog_titlebar_max").attr("role",
									"button").attr("title", o.maxText)
									.mousedown(function(p) {
										p.stopPropagation()
									}).click(function(p) {
										return n.max()
									}), d = b("<div></div>").addClass(
									"pa_ui_dialog_title").attr("id", e).html(
									'<div class="pa_ui_dialog_title_left"><div class="pa_ui_dialog_title_right">'
											+ j + "</div></div>").prependTo(f);
							if (o.minimize) {
								i.appendTo(m)
							}
							if (o.maximize) {
								l.appendTo(m)
							}
							h.appendTo(m);
							b("<div></div>")
									.addClass("pa_ui_dialog_footer")
									.html(
											'<div class="footer_left"></div><div class="footer_right"></div>')
									.appendTo(k);
							f.find("*").add(f).disableSelection();
							(o.draggable && b.fn.draggable && this
									._makeDraggable());
							(o.resizable && b.fn.resizable && this
									._makeResizable());
							this._isOpen = false;
							(o.bgiframe && b.fn.bgiframe && k.bgiframe());
							(o.autoOpen && this.open())
						},
						isOpen : function() {
							return this._isOpen
						},
						open : function() {
							if (this._isOpen) {
								return
							}
							var d = this.options, c = this.uiDialog;
							this.overlay = d.modal ? new b.ui.dialog.overlay(
									this) : null;
							if (d.frameOverlay) {
								this._frameOverlay(true)
							}
							(c.next().length && c.appendTo("body"));
							this._size();
							this._position(d.position);
							c.show(d.show);
							if (c.find(".pa_ui_dialog_title_right").html() == "") {
								setTimeout(
										function() {
											try {
												var g = c.find("iframe");
												var h;
												if (g.length == 1) {
													h = g[0].contentWindow.document
												}
												if (g.length == 2) {
													h = g[1].contentWindow.document
												}
												if (h) {
													b(h)
															.ready(
																	function() {
																		if (h.title) {
																			c
																					.find(
																							".pa_ui_dialog_title_right")
																					.html(
																							h.title)
																		} else {
																			c
																					.find(
																							".pa_ui_dialog_title_right")
																					.html(
																							document.title)
																		}
																	})
												}
											} catch (f) {
												var e = f.message
											}
										}, 800)
							}
							this.moveToTop(true);
							(d.modal && c.bind("keypress.dialog", function(g) {
								if (g.keyCode != b.ui.keyCode.TAB) {
									return
								}
								var f = b(":tabbable", this), h = f
										.filter(":first")[0], e = f
										.filter(":last")[0];
								if (g.target == e && !g.shiftKey) {
									setTimeout(function() {
										h.focus()
									}, 1)
								} else {
									if (g.target == h && g.shiftKey) {
										setTimeout(function() {
											e.focus()
										}, 1)
									}
								}
							}));
							b([])
									.add(
											c
													.find(".pa_ui_dialog_content :tabbable:first"))
									.add(
											c
													.find(".pa_ui_dialog_buttonpane :tabbable:first"))
									.add(c).filter(":first").focus();
							this._trigger("open");
							this._isOpen = true;
							b.ui.dialog.dialogs.push(this.element);
							if (this.options.modal) {
								b.ui.dialog.modalDialogs.push(this.element)
							}
							b.ui.dialog.currentDialog = this.element
						},
						moveToTop : function(e, d) {
							if ((this.options.modal && !e)
									|| (!this.options.stack && !this.options.modal)) {
								return this._trigger("focus", d)
							}
							if (this.options.zIndex > b.ui.dialog.maxZ) {
								b.ui.dialog.maxZ = this.options.zIndex
							}
							(this.overlay && this.overlay.$el.css("z-index",
									1000));
							var c = {
								scrollTop : this.element.attr("scrollTop"),
								scrollLeft : this.element.attr("scrollLeft")
							};
							this.uiDialog.css("z-index", ++b.ui.dialog.maxZ);
							this.element.attr(c);
							this._trigger("focus", d);
							b.ui.dialog.currentDialog = this.element
						},
						min : function() {
							var e = this;
							if (e.uiDialog.hasClass(e.options.dialogClass)) {
								e.uiDialog.removeClass(e.options.dialogClass)
										.addClass(
												e.options.dialogClass + "_min");
								e.uiDialogContent.hide();
								e.originPosition = e.uiDialog.position();
								b.ui.dialog.minDialogs.push(e.element);
								var j = 0;
								var h = b(window).height()
										- e.uiDialogTitlebar.outerHeight();
								for ( var g = 0; g < b.ui.dialog.minDialogs.length; g++) {
									if (b.ui.dialog.minDialogs[g] == e.element) {
									} else {
										var d = b.ui.dialog.minDialogs[g]
												.dialog("getPosition")[0];
										var f = b.ui.dialog.minDialogs[g]
												.dialog("getPosition")[1];
										var c = b.ui.dialog.minDialogs[g]
												.dialog("getDimension")[0];
										if (j == d) {
											j += c
										}
									}
								}
								e.uiDialog.css("left", j).css("top", h).css(
										"bottom", "3px")
							} else {
								if (e.uiDialog.hasClass(e.options.dialogClass
										+ "_min")) {
									e.uiDialog.removeClass(
											e.options.dialogClass + "_min")
											.addClass(e.options.dialogClass);
									e.uiDialogContent.show();
									e.uiDialog.css("left",
											e.originPosition.left).css("top",
											e.originPosition.top);
									for ( var g = 0; g < b.ui.dialog.minDialogs.length; g++) {
										if (b.ui.dialog.minDialogs[g] == e.element) {
											b.ui.dialog.minDialogs.splice(g, 1);
											break
										}
									}
								}
							}
							return false
						},
						max : function() {
							var d = this;
							if (d.uiDialog.hasClass(d.options.dialogClass)) {
								d.uiDialog.removeClass(d.options.dialogClass)
										.addClass(
												d.options.dialogClass + "_max");
								d.originPosition = d.uiDialog.position();
								d.originDimensions = d.getDimension();
								var e = document.documentElement.clientWidth
										+ b(document).scrollLeft();
								var c = document.documentElement.clientHeight
										+ b(document).scrollTop();
								d.uiDialog.css("left", "0").css("top", "0")
										.css("width", e).css("height", c);
								d.uiDialogContent
										.css("height", d.uiDialog.innerHeight()
												- d.uiDialogTitlebar
														.outerHeight() - 10);
								b("iframe[role=iframe]", d.uiDialogContent)
										.css("height", d.element.css("height"))
							} else {
								if (d.uiDialog.hasClass(d.options.dialogClass
										+ "_max")) {
									d.uiDialog.removeClass(
											d.options.dialogClass + "_max")
											.addClass(d.options.dialogClass);
									d.uiDialog.css("left",
											d.originPosition.left).css("top",
											d.originPosition.top).css("width",
											d.originDimensions[0]).css(
											"height", d.originDimensions[1]);
									d.uiDialogContent.css("height",
											d.originDimensions[3] - 10);
									b("iframe[role=iframe]", d.uiDialogContent)
											.css("height",
													d.element.css("height"))
								}
							}
							return false
						},
						close : function(e) {
							var c = this;
							if (false === c._trigger("beforeclose", e)) {
								return
							}
							for ( var d = 0; d < b.ui.dialog.dialogs.length; d++) {
								if (b.ui.dialog.dialogs[d] == this.element) {
									b.ui.dialog.dialogs.splice(d, 1);
									break
								}
							}
							for ( var d = 0; d < b.ui.dialog.modalDialogs.length; d++) {
								if (b.ui.dialog.modalDialogs[d] == this.element) {
									b.ui.dialog.modalDialogs.splice(d, 1);
									break
								}
							}
							for ( var d = 0; d < b.ui.dialog.minDialogs.length; d++) {
								if (b.ui.dialog.minDialogs[d] == c.element) {
									b.ui.dialog.minDialogs.splice(d, 1);
									break
								}
							}
							if (b.ui.dialog.dialogs
									&& b.ui.dialog.dialogs.length) {
								b.ui.dialog.currentDialog = b.ui.dialog.dialogs[b.ui.dialog.dialogs.length - 1]
							} else {
								b.ui.dialog.currentDialog = null
							}
							(c.overlay && c.overlay.destroy.call(c));
							if (c.options.frameOverlay) {
								this._frameOverlay(false)
							}
							c.uiDialog.unbind("keypress.dialog");
							(c.options.hide ? c.uiDialog.hide(c.options.hide,
									function() {
										c._trigger("close", e)
									}) : c.uiDialog.hide()
									&& c._trigger("close", e));
							b.ui.dialog.overlay.resize();
							c._isOpen = false;
							this.destroy()
						},
						destroy : function() {
							(this.overlay && this.overlay.destroy.call(this));
							this.uiDialog.hide();
							this.element.unbind(".dialog").removeData("dialog")
									.removeClass("pa_ui_dialog_content").hide()
									.appendTo("body");
							!this.options.element && this.element.empty();
							this.uiDialog.remove();
							(this.originalTitle && this.element.attr("title",
									this.originalTitle))
						},
						getDimension : function() {
							return [ this.uiDialog.outerWidth(),
									this.uiDialog.outerHeight(),
									this.uiDialogContent.outerWidth(),
									this.uiDialogContent.outerHeight() ]
						},
						getPosition : function() {
							return [ this.uiDialog.offset().left,
									this.uiDialog.offset().top ]
						},
						_makeDraggable : function() {
							var c = this, e = this.options, d;
							this.uiDialog.draggable({
								cancel : ".pa_ui_dialog_content",
								handle : ".pa_ui_dialog_titlebar",
								containment : "document",
								start : function() {
									d = e.height;
									b(this).height(b(this).height()).addClass(
											"pa_ui_dialog_dragging");
									(e.dragStart && e.dragStart.apply(
											c.element[0], arguments))
								},
								drag : function() {
									(e.drag && e.drag.apply(c.element[0],
											arguments))
								},
								stop : function() {
									b(this)
											.removeClass(
													"pa_ui_dialog_dragging")
											.height(d);
									(e.dragStop && e.dragStop.apply(
											c.element[0], arguments));
									b.ui.dialog.overlay.resize()
								}
							})
						},
						_makeResizable : function(f) {
							f = (f === undefined ? this.options.resizable : f);
							var c = this, e = this.options, d = typeof f == "string" ? f
									: "n,e,s,w,se,sw,ne,nw";
							this.uiDialog.resizable({
								cancel : ".pa_ui_dialog_content",
								alsoResize : this.element,
								maxWidth : e.maxWidth,
								maxHeight : e.maxHeight,
								minWidth : e.minWidth,
								minHeight : e.minHeight,
								start : function() {
									b(this).addClass("pa_ui_dialog_resizing");
									(e.resizeStart && e.resizeStart.apply(
											c.element[0], arguments))
								},
								resize : function() {
									(e.resize && e.resize.apply(c.element[0],
											arguments))
								},
								handles : d,
								stop : function() {
									b(this)
											.removeClass(
													"pa_ui_dialog_resizing");
									e.height = b(this).height();
									e.width = b(this).width();
									(e.resizeStop && e.resizeStop.apply(
											c.element[0], arguments));
									b.ui.dialog.overlay.resize()
								}
							})
						},
						_position : function(j) {
							var e = b(window), f = b(document), g = f
									.scrollTop(), d = f.scrollLeft(), h = g;
							if (b.inArray(j, [ "center", "top", "right",
									"bottom", "left" ]) >= 0) {
								j = [
										j == "right" || j == "left" ? j
												: "center",
										j == "top" || j == "bottom" ? j
												: "middle" ]
							}
							if (j.constructor != Array) {
								j = [ "center", "middle" ]
							}
							if (j[0].constructor == Number) {
								d += j[0]
							} else {
								switch (j[0]) {
								case "left":
									d += 0;
									break;
								case "right":
									d += e.width() - this.uiDialog.outerWidth();
									break;
								default:
								case "center":
									d += (e.width() - this.uiDialog
											.outerWidth()) / 2
								}
							}
							if (j[1].constructor == Number) {
								g += j[1]
							} else {
								switch (j[1]) {
								case "top":
									g += 0;
									break;
								case "bottom":
									g += e.height()
											- this.uiDialog.outerHeight();
									break;
								default:
								case "middle":
									if (this.options.openMode == "fixed") {
										g = (e.height() - this.uiDialog
												.outerHeight()) / 2
									} else {
										g += (e.height() - this.uiDialog
												.outerHeight()) / 2
									}
								}
							}
							if (b.ui.dialog.dialogs) {
								for ( var c = 0; c < b.ui.dialog.dialogs.length; c++) {
									g += 20;
									d += 20
								}
							}
							this.uiDialog.css({
								top : Math.max(g, 0),
								left : Math.max(d, 0)
							})
						},
						_setData : function(d, e) {
							(a[d] && this.uiDialog.data(a[d], e));
							switch (d) {
							case "closeText":
								this.uiDialogTitlebarCloseText.text(e);
								break;
							case "minText":
								this.uiDialogTitlebarMinText.text(e);
								break;
							case "maxText":
								this.uiDialogTitlebarMaxText.text(e);
								break;
							case "dialogClass":
								this.uiDialog.removeClass(
										this.options.dialogClass).addClass(e);
								break;
							case "draggable":
								(e ? this._makeDraggable() : this.uiDialog
										.draggable("destroy"));
								break;
							case "height":
								this.uiDialog.height(e);
								break;
							case "position":
								this._position(e);
								break;
							case "resizable":
								var c = this.uiDialog, f = this.uiDialog
										.is(":data(resizable)");
								(f && !e && c.resizable("destroy"));
								(f && typeof e == "string" && c.resizable(
										"option", "handles", e));
								(f || this._makeResizable(e));
								break;
							case "title":
								b(".pa_ui_dialog_title", this.uiDialogTitlebar)
										.html(e || "&nbsp;");
								break;
							case "width":
								this.uiDialog.width(e);
								break
							}
							b.widget.prototype._setData.apply(this, arguments)
						},
						_size : function() {
							var g = this.options;
							var f = this;
							this.element.css({
								height : 0,
								minHeight : 0,
								width : "auto"
							});
							b("iframe[role=iframe]", this.uiDialogContent).css(
									"height", "0");
							var d = this.uiDialog.css({
								height : "auto",
								width : g.width
							}).height();
							this.element.css({
								minHeight : Math.max(g.minHeight - d, 0),
								height : g.height == "auto" ? "auto" : Math
										.max(g.height - d, 0)
							});
							b("iframe[role=iframe]", this.uiDialogContent).css(
									"height", this.element.css("height"));
							var k = false;
							var j = b("iframe[role=iframe]",
									this.uiDialogContent);
							try {
								if (j && j[0]) {
									var h = parseInt(f.uiDialogContent.css(
											"padding-left").replace("px", ""),
											10)
											+ parseInt(f.uiDialogContent.css(
													"padding-right").replace(
													"pax", ""), 10);
									var c = parseInt(f.uiDialogContent.css(
											"padding-top").replace("px", ""),
											10)
											+ parseInt(f.uiDialogContent.css(
													"padding-bottom").replace(
													"pax", ""), 10);
									j
											.bind(
													"load",
													function() {
														var e = w1 = w2 = 0;
														try {
															if (j[0].contentDocument
																	&& j[0].contentDocument.body.offsetWidth) {
																w1 = j[0].contentDocument.body.offsetWidth + 16
															} else {
																if (j[0].Document
																		&& j[0].Document.body.scrollWidth) {
																	w2 = j[0].Document.body.scrollWidth
																}
															}
															e = Math
																	.max(w1, w2) + 20;
															var m = h1 = h2 = 0;
															if (j[0].contentDocument
																	&& j[0].contentDocument.body.offsetHeight) {
																h1 = j[0].contentDocument.body.offsetHeight + 16
															} else {
																if (j[0].Document
																		&& j[0].Document.body.scrollHeight) {
																	h2 = Math
																			.max(
																					m,
																					j[0].Document.body.scrollHeight)
																}
															}
															m = Math
																	.max(h1, h2) + 20;
															if (e > g.minWidth
																	&& typeof g.width == "undefined") {
																k = true;
																f.element
																		.css(
																				"width",
																				e);
																f.uiDialog
																		.css(
																				"width",
																				e
																						+ h)
															}
															if (m > g.minHeight
																	&& g.height == "auto") {
																k = true;
																f.element
																		.css(
																				"height",
																				m);
																f.uiDialog
																		.css(
																				"height",
																				m
																						+ c
																						+ d);
																b(
																		"iframe[role=iframe]",
																		this.uiDialogContent)
																		.css(
																				"height",
																				f.element
																						.css("height"))
															}
															if (k) {
																f
																		._position(g.position);
																b(window)
																		.trigger(
																				"resize")
															}
														} catch (l) {
														}
													})
								}
							} catch (i) {
							}
						},
						_frameOverlay : function(d) {
							if (!this.otherFrames) {
								this.otherFrames = this._allFrames()
							}
							if (this.options.frameOverlay) {
								if (d) {
									for ( var e = 0; e < this.otherFrames.length; e++) {
										var c = this.otherFrames[e];
										c.$ && c.$.ui
												&& c.$.ui.dialog.overlay(null)
									}
								} else {
									for ( var e = 0; e < this.otherFrames.length; e++) {
										var c = this.otherFrames[e];
										b.ui.dialog.modalDialogs.length == 0
												&& c.$
												&& c.$.ui
												&& c.$.ui.dialog.overlay
														.destroy(this)
									}
								}
							}
						},
						_allFrames : function() {
							var c = [];
							if (top.frames && top.frames.length > 0) {
								for ( var k = 0; k < top.frames.length; k++) {
									var m = top.frames[k], n, l;
									try {
										l = top.frames[k].document
												.getElementsByTagName("frame")
									} catch (h) {
										continue
									}
									if (l.length <= 0) {
										c.push(m)
									} else {
										for ( var g = 0; g < l.length; g++) {
											var e = m.frames[g];
											try {
												n = e.document
											} catch (h) {
												continue
											}
											c.push(e)
										}
									}
								}
							}
							return c
						}
					});
	var a = {
		dragStart : "start.draggable",
		drag : "drag.draggable",
		dragStop : "stop.draggable",
		maxHeight : "maxHeight.resizable",
		minHeight : "minHeight.resizable",
		maxWidth : "maxWidth.resizable",
		minWidth : "minWidth.resizable",
		resizeStart : "start.resizable",
		resize : "drag.resizable",
		resizeStop : "stop.resizable"
	};
	b.extend(b.ui.dialog, {
		defaults : {
			autoOpen : true,
			bgiframe : true,
			closeOnEscape : true,
			closeText : "\u5173\u95ed",
			minimize : true,
			minText : "\u6700\u5c0f\u5316",
			maximize : true,
			maxText : "\u6700\u5927\u5316",
			dialogClass : "pa_ui_dialog",
			draggable : true,
			hide : null,
			height : "auto",
			maxHeight : false,
			maxWidth : false,
			minHeight : 5,
			minWidth : 5,
			modal : false,
			frameOverlay : "",
			position : "center",
			resizable : false,
			openMode : "absolute",
			show : null,
			stack : true,
			title : "",
			zIndex : 1000
		},
		getter : "isOpen getDimension getPosition",
		uuid : 0,
		maxZ : 0,
		getTitleId : function(c) {
			return "pa_ui_dialog_title_" + (c.attr("id") || ++this.uuid)
		},
		overlay : function(c) {
			this.$el = b.ui.dialog.overlay.create(c)
		},
		dialogs : [],
		minDialogs : [],
		modalDialogs : [],
		currentDialog : null
	});
	b
			.extend(
					b.ui.dialog.overlay,
					{
						instance : null,
						dialogInstances : [],
						maxZ : 0,
						events : b.map(
								"focus,mousedown,mouseup,keydown,keypress,click"
										.split(","), function(c) {
									return c + ".dialog_overlay"
								}).join(" "),
						create : function(c) {
							if (this.instance == null) {
								b(document)
										.bind(
												"keydown.dialog_overlay",
												function(d) {
													(c.options.closeOnEscape
															&& d.keyCode
															&& d.keyCode == b.ui.keyCode.ESCAPE && c
															.close(d))
												});
								b(window).bind("resize.dialog_overlay",
										b.ui.dialog.overlay.resize);
								$el = b("<div></div>").appendTo(document.body)
										.addClass("pa_ui_dialog_overlay").css({
											width : this.width(),
											height : this.height()
										});
								(b.fn.bgiframe && $el.bgiframe());
								this.instance = $el
							} else {
								$el = this.instance
							}
							if (c) {
								this.dialogInstances.push(c.uuid)
							}
							return this.instance
						},
						destroy : function(d) {
							if (this.dialogInstances) {
								for ( var c = 0; c < this.dialogInstances.length; c++) {
									if (this.dialogInstances[c] == d.uuid) {
										this.dialogInstances.splice(c, 1);
										break
									}
								}
							}
							if ((this.dialogInstances
									&& this.dialogInstances.length === 0 && this.instance)
									|| (!this.dialogInstances && this.instance)) {
								b([ document, window ]).unbind(
										".dialog_overlay");
								this.instance.remove();
								this.instance = null
							}
						},
						height : function() {
							if (b.browser.msie && b.browser.version < 7) {
								var d = Math.max(
										document.documentElement.scrollHeight,
										document.body.scrollHeight);
								var c = Math.max(
										document.documentElement.offsetHeight,
										document.body.offsetHeight);
								if (d < c) {
									return b(window).height() + "px"
								} else {
									return d + "px"
								}
							} else {
								return b(document).height() + "px"
							}
						},
						width : function() {
							if (b.browser.msie && b.browser.version < 7) {
								var c = Math.max(
										document.documentElement.scrollWidth,
										document.body.scrollWidth);
								var d = Math.max(
										document.documentElement.offsetWidth,
										document.body.offsetWidth);
								if (c < d) {
									return b(window).width() + "px"
								} else {
									return c + "px"
								}
							} else {
								return b(document).width() + "px"
							}
						},
						resize : function() {
							if (b.ui.dialog.overlay.instance) {
								b.ui.dialog.overlay.instance.css({
									width : 0,
									height : 0
								}).css({
									width : b.ui.dialog.overlay.width(),
									height : b.ui.dialog.overlay.height()
								})
							}
						}
					});
	b.extend(b.ui.dialog.overlay.prototype, {
		destroy : function() {
			b.ui.dialog.overlay.destroy(this)
		}
	})
})(jQuery);
(function(a) {
	a.pa_ui.dialog = {
		open : function(b) {
			var c;
			if (b.url) {
				if (b.iframeId && b.iframeName) {
					c = a("<div></div>").html(
							'<iframe frameBorder="no" border="0" role="iframe" width="100%" id="'
									+ b.iframeId + '" name="' + b.iframeName
									+ '" src="' + b.url + '"></iframe>')
							.appendTo("body")
				} else {
					if (b.iframeName) {
						c = a("<div></div>").html(
								'<iframe frameBorder="no" border="0" role="iframe" width="100%" name="'
										+ b.iframeName + '" src="' + b.url
										+ '"></iframe>').appendTo("body")
					} else {
						if (b.iframeId) {
							c = a("<div></div>").html(
									'<iframe frameBorder="no" border="0" role="iframe" width="100%" id="'
											+ b.iframeId + '" src="' + b.url
											+ '"></iframe>').appendTo("body")
						} else {
							c = a("<div></div>").html(
									'<iframe frameBorder="no" border="0" role="iframe" width="100%" src="'
											+ b.url + '"></iframe>').appendTo(
									"body")
						}
					}
				}
			} else {
				if (b.message) {
					c = a("<div></div>").html(b.message)
				} else {
					if (b.element) {
						c = a("#" + b.element)
					} else {
						return null
					}
				}
			}
			b.autoOpen = true;
			c.dialog(b);
			return c
		},
		close : function(b) {
			var c = b || a.ui.dialog.currentDialog;
			if (c) {
				c.dialog("close")
			}
		}
	}
})(jQuery);
