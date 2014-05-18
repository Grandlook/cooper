(function(a) {
	version: "2011.0412.0951"
})(jQuery);
(function(a) {
	a
			.widget(
					"ui.accordion",
					{
						_init : function() {
							var b = this;
							this.origin = this.element;
							if (this.element[0].tagName.toLowerCase() != "ul") {
								this.element = this.element.find("ul:eq(0)")
							}
							this._initCss();
							var d = this.origin.attr("pa_ui_expand_node");
							if (d) {
								if (d == "0") {
									b.element.children(b.options.childTag)
											.addClass(b.options.cssExpand)
											.removeClass(b.options.cssCollapse)
								} else {
									if (d == "-1") {
										b.element
												.children(b.options.childTag)
												.addClass(b.options.cssCollapse)
												.removeClass(
														b.options.cssExpand)
									} else {
										b.expand(d)
									}
								}
							} else {
								var e = this.origin.attr("pa_ui_expand_id");
								if (e) {
									this.element
											.children(b.options.childTag)
											.each(
													function(f, g) {
														if (g.id == e) {
															d = (f + 1) + ""
														} else {
															a(
																	b.options.childTag,
																	g)
																	.each(
																			function(
																					k,
																					h) {
																				if (h.id == e) {
																					d = (f + 1)
																							+ "."
																							+ (k + 1)
																				}
																			})
														}
													});
									if (d) {
										b.expand(d)
									}
								}
							}
							b._bindElement(this.element);
							var c = this.origin.attr("pa_ui_all_id");
							if (c != null && c.length > 0) {
								a("#" + c)
										.bind(
												"click.accordion",
												function() {
													if (a(this).attr("checked") == 1) {
														b.element
																.children(
																		b.options.childTag)
																.removeClass(
																		b.options.cssCollapse)
																.addClass(
																		b.options.cssExpand)
													} else {
														b.element
																.children(
																		b.options.childTag)
																.removeClass(
																		b.options.cssExpand)
																.addClass(
																		b.options.cssCollapse)
													}
												})
							}
						},
						_initCss : function() {
							var b = this;
							this.element
									.children(b.options.childTag)
									.each(
											function(c) {
												if (!a(this).hasClass(
														b.options.cssExpand)
														&& !a(this)
																.hasClass(
																		b.options.cssCollapse)) {
													if (a(this).children("ul")
															.size() > 0) {
														a(this)
																.addClass(
																		b.options.cssCollapse)
													} else {
														a(this)
																.addClass(
																		b.options.cssExpand)
													}
												}
												a(this)
														.children(
																b.options.contentTag)
														.children(
																b.options.childTag)
														.each(
																function() {
																	if (!a(this)
																			.hasClass(
																					b.options.cssExpand)
																			&& !a(
																					this)
																					.hasClass(
																							b.options.cssCollapse)) {
																		if (a(
																				this)
																				.children(
																						"ul")
																				.size() > 0) {
																			a(
																					this)
																					.addClass(
																							b.options.cssCollapse)
																		} else {
																			a(
																					this)
																					.addClass(
																							b.options.cssExpand)
																		}
																	}
																})
											})
						},
						expand : function(g) {
							var d = this;
							var c = g.split(".");
							var f = this.element;
							for ( var e = 0; e < c.length; e++) {
								g = a.pa_ui.converter.toInt(c[e]);
								if (g > 0) {
									g--;
									f.children(d.options.childTag).addClass(
											d.options.cssCollapse).removeClass(
											d.options.cssExpand).removeClass(
											"focus");
									var b = f.children(d.options.childTag
											+ ":eq(" + g + ")");
									b.addClass(d.options.cssExpand)
											.removeClass(d.options.cssCollapse);
									if (!d.origin.hasClass("pa_ui_clicked")) {
										d.origin.addClass("pa_ui_clicked")
									}
									if (e == c.length - 1) {
										b.addClass("focus")
									}
									f = a(d.options.contentTag, b).eq(0)
								}
							}
							return this
						},
						_bindElement : function(d) {
							var c = this;
							var b = this.origin.attr("pa_ui_single_class");
							d
									.children(this.options.childTag)
									.each(
											function() {
												a(c.options.titleTag, this)
														.eq(0)
														.bind(
																"click.accordion",
																function(h) {
																	if (!c.origin
																			.hasClass("pa_ui_clicked")) {
																		c.origin
																				.addClass("pa_ui_clicked")
																	}
																	var f = a(h.target);
																	while (f
																			.size() > 0
																			&& f[0] != this) {
																		f = f
																				.parent()
																	}
																	if (f
																			.size() <= 0) {
																		f = a(this)
																	}
																	var i = f
																			.parents(c.options.childTag
																					+ ":first");
																	i
																			.parent()
																			.children(
																					c.options.childTag)
																			.each(
																					function() {
																						if (f
																								.parent()[0] != this) {
																							a(
																									this)
																									.removeClass(
																											c.options.cssExpand)
																									.addClass(
																											c.options.cssCollapse)
																						}
																					});
																	if (c.options.keepFocus) {
																		var g = i
																				.find(
																						"ul")
																				.html();
																		if (!g) {
																			c.element
																					.find(
																							".focus")
																					.removeClass(
																							"focus")
																		}
																	} else {
																		c.element
																				.find(
																						".focus")
																				.removeClass(
																						"focus")
																	}
																	i
																			.toggleClass(
																					c.options.cssCollapse)
																			.toggleClass(
																					c.options.cssExpand)
																			.addClass(
																					"focus");
																	c
																			._trigger(
																					"expand",
																					null,
																					{
																						ui : c,
																						li : i
																					})
																});
												a(this)
														.find(
																"."
																		+ b
																		+ ":first")
														.bind(
																"click.accordion",
																function(f) {
																	a(this)
																			.parents(
																					c.options.childTag
																							+ ":first")
																			.removeClass(
																					c.options.cssExpand)
																			.addClass(
																					c.options.cssCollapse);
																	return false
																});
												var e = a(c.options.contentTag,
														this);
												if (e.size() <= 0) {
													return
												} else {
													c._bindElement(e)
												}
											})
						},
						_clickTitle : function(c) {
							var b = this
						},
						destroy : function() {
							var b = this;
							var c = this.origin.attr("pa_ui_all_id");
							a("#" + c).unbind(".accordion");
							this.element
									.children(this.options.childTag)
									.each(
											function() {
												a(b.options.titleTag, this).eq(
														0).unbind(".accordion");
												a(this)
														.find(
																"."
																		+ b.origin
																				.attr("pa_ui_single_class")
																		+ ":first")
														.unbind(".accordion")
											});
							a.widget.prototype.destroy.apply(this)
						}
					});
	a
			.extend(
					a.ui.accordion,
					{
						defaults : {
							keepFocus : true,
							childTag : "li",
							titleTag : "div",
							contentTag : "ul",
							cssCollapse : "expand",
							cssExpand : "collapse"
						},
						load : function() {
							a("[pa_ui_name*=accordion]")
									.each(
											function() {
												a.pa_ui.widget.init(this);
												var b = {};
												if (a(this).attr(
														"pa_ui_first_tag") != null
														&& a(this)
																.attr(
																		"pa_ui_first_tag").length > 0) {
													b.childTag = a(this).attr(
															"pa_ui_first_tag")
												}
												if (a(this).attr(
														"pa_ui_title_tag") != null
														&& a(this)
																.attr(
																		"pa_ui_title_tag").length > 0) {
													b.titleTag = a(this).attr(
															"pa_ui_title_tag")
												}
												if (a(this).attr(
														"pa_ui_content_tag") != null
														&& a(this)
																.attr(
																		"pa_ui_content_tag").length > 0) {
													b.contentTag = a(this)
															.attr(
																	"pa_ui_content_tag")
												}
												if (a(this)
														.attr(
																"pa_ui_accordion_keepfocus") != null
														&& a(this)
																.attr(
																		"pa_ui_accordion_keepfocus").length > 0) {
													b.keepFocus = a(this)
															.attr(
																	"pa_ui_accordion_keepfocus") === "false" ? false
															: true
												}
												a(this).accordion(b);
												a.pa_ui.widget.inited(this)
											})
						}
					});
	if (a.pa_ui.lazyLoad) {
		a(document).ready(function() {
			a.ui.accordion.load()
		})
	} else {
		a.ui.accordion.load()
	}
})(jQuery);
(function($) {
	$
			.widget(
					"ui.tabs",
					{
						_init : function() {
							if (this.options.deselectable !== undefined) {
								this.options.collapsible = this.options.deselectable
							}
							this.leftIndex = 0;
							this.rightIndex = 0;
							this._tabify(true)
						},
						_setData : function(key, value) {
							if (key == "selected") {
								if (this.options.collapsible
										&& value == this.options.selected) {
									return
								}
								this.select(value)
							} else {
								this.options[key] = value;
								if (key == "deselectable") {
									this.options.collapsible = value
								}
								this._tabify()
							}
						},
						_tabId : function(a) {
							return a.title
									&& a.title.replace(/\s/g, "_").replace(
											/[^A-Za-z0-9\-_:\.]/g, "")
									|| this.options.idPrefix + $.data(a)
						},
						_sanitizeSelector : function(hash) {
							return hash.replace(/:/g, "\\:")
						},
						_ui : function(tab, panel) {
							return {
								tab : tab,
								panel : panel,
								index : this.anchors.index(tab)
							}
						},
						_cleanup : function() {
							this.lis.filter("ui-state-processing=0").attr(
									"ui-state-processing", "1").find(
									"span:data(label.tabs)").each(
									function() {
										var el = $(this);
										el.html(el.data("label.tabs"))
												.removeData("label.tabs")
									})
						},
						_scrollable : function(obj) {
							var self = this;
							self.appendLeft = $(".pa_ui_tabs_scrollleft",
									self.element[0]);
							if (self.appendLeft.length == 0) {
								self.appendLeft = $(this.options.appendleft)
										.insertBefore(self.list)
							}
							self.appendLeft
									.addClass("pa_ui_disabled pa_ui_tabs_disabledleft");
							self.appendRight = $(".pa_ui_tabs_scrollright",
									self.element[0]);
							if (self.appendRight.length <= 0) {
								self.appendRight = $(this.options.appendright)
										.insertBefore(self.list)
							}
							self.appendRight
									.addClass("pa_ui_disabled pa_ui_tabs_disabledright");
							if (this.options.scrollEvent === "click") {
								self.appendLeft.bind("click.tabs", function() {
									self.scroll("l")
								});
								self.appendRight.bind("click.tabs", function() {
									self.scroll("r")
								})
							} else {
								if (this.options.scrollEvent === "mouseover") {
									var timer = null;
									self.appendLeft.bind("mouseover.tabs",
											function() {
												timer = setInterval(function() {
													self.scroll("l")
												}, self.options.scrollInterval)
											}).bind("mouseout.tabs",
											function() {
												clearInterval(timer)
											});
									self.appendRight.bind("mouseover.tabs",
											function() {
												timer = setInterval(function() {
													self.scroll("r")
												}, self.options.scrollInterval)
											}).bind("mouseout.tabs",
											function() {
												clearInterval(timer)
											})
								}
							}
						},
						scroll : function(orientation) {
							var self = this;
							var maxWidth, w, totalW;
							if (orientation === "l") {
								maxWidth = self.list.parent().innerWidth();
								maxWidth = maxWidth
										- self.appendLeft.outerWidth({
											margin : true
										}) - self.appendRight.outerWidth({
											margin : true
										});
								w = 0;
								totalW = 0;
								oleft = self.list.css("left");
								if (oleft == "auto") {
									oleft = 0
								} else {
									oleft = oleft.replace("px", "");
									oleft = $.pa_ui.converter.toInt(oleft)
								}
								oleft = -1 * oleft;
								self.leftIndex = -1;
								for ( var i = 0; i <= self.maxIndex; i++) {
									w += self.lis.eq(i).outerWidth({
										margin : true
									});
									if (w > oleft) {
										break
									} else {
										if (w == oleft) {
											break
										}
									}
									self.leftIndex = i
								}
								if (self.leftIndex >= 0) {
									w = 0;
									for ( var i = 0; i <= self.leftIndex; i++) {
										w += self.lis.eq(i).outerWidth({
											margin : true
										})
									}
									w = -1 * w;
									self.list.css("left", w + "px")
								}
								if (self.leftIndex < 0) {
									self.list.css("left", 0);
									self.appendLeft
											.addClass("pa_ui_disabled pa_ui_tabs_disabledleft")
								}
								w = 0;
								for ( var i = (self.leftIndex < 0 ? 0
										: self.leftIndex); i <= self.maxIndex; i++) {
									w += self.lis.eq(i).outerWidth({
										margin : true
									});
									if (w > maxWidth) {
										self.appendRight
												.removeClass("pa_ui_disabled pa_ui_tabs_disabledright");
										break
									}
								}
							} else {
								maxWidth = self.list.parent().width();
								maxWidth = maxWidth
										- self.appendLeft.outerWidth({
											margin : true
										}) - self.appendRight.outerWidth({
											margin : true
										});
								w = 0;
								totalW = 0;
								oleft = self.list.css("left");
								if (oleft == "auto") {
									oleft = 0
								} else {
									oleft = oleft.replace("px", "");
									oleft = $.pa_ui.converter.toInt(oleft)
								}
								self.rightIndex = self.maxIndex;
								w = oleft;
								for ( var i = 0; i <= self.maxIndex; i++) {
									w += self.lis.eq(i).outerWidth({
										margin : true
									});
									if (w > maxWidth) {
										break
									}
									self.rightIndex = i
								}
								if (self.rightIndex < self.maxIndex) {
									self.rightIndex++;
									w = 0;
									for ( var i = 0; i <= self.rightIndex; i++) {
										w += self.lis.eq(i).outerWidth({
											margin : true
										})
									}
									var ww = 0;
									for ( var i = 0; i <= self.maxIndex; i++) {
										ww += self.lis.eq(i).outerWidth({
											margin : true
										})
									}
									w = Math.min(w, ww);
									w = w - maxWidth;
									w = -1 * w;
									self.list.css("left", w + "px");
									self.appendLeft
											.removeClass("pa_ui_disabled pa_ui_tabs_disabledleft")
								}
								if (self.rightIndex >= self.maxIndex) {
									self.appendRight
											.addClass("pa_ui_disabled pa_ui_tabs_disabledright")
								}
							}
						},
						_tabify : function(init) {
							this.list = this.element.find("ul:first");
							this.lis = $("li:has(a[href])", this.list);
							this.anchors = this.lis.map(function() {
								return $("a", this)[0]
							});
							this.panels = $([]);
							var self = this, o = this.options;
							if (this.options.scroll) {
								this._scrollable(this.list)
							}
							self.maxIndex = self.lis.length - 1;
							var fragmentId = /^#.+/;
							this.anchors
									.each(function(i, a) {
										var href = $(a).attr("href");
										var hrefBase = href.split("#")[0], baseEl;
										if (hrefBase
												&& (hrefBase === location
														.toString().split("#")[0] || (baseEl = $("base")[0])
														&& hrefBase === baseEl.href)) {
											href = a.hash;
											a.href = href
										}
										if (fragmentId.test(href)) {
											self.panels = self.panels.add(self
													._sanitizeSelector(href))
										} else {
											if (href != "#") {
												if ($(a).parents("li:first")
														.attr("pa_ui_url_type") != "ajax") {
													$.data(a, "origin.link", $(
															a).clone())
												} else {
													$.data(a, "origin.link",
															"1")
												}
												$.data(a, "href.tabs", href);
												$.data(a, "load.tabs", href
														.replace(/#.*$/, ""));
												var id = self._tabId(a);
												$.data(document.body, "aaaa",
														"1");
												a.href = "#" + id;
												$.data(a, "old.link", id);
												var $panel = $("#" + id);
												if (!$panel.length) {
													$panel = $(o.panelTemplate)
															.attr("id", id)
															.addClass(
																	"pa_ui_tabs_panel")
															.insertAfter(
																	self.panels[i - 1]
																			|| self.list);
													$panel.data("destroy.tabs",
															true)
												}
												self.panels = self.panels
														.add($panel)
											} else {
												o.disabled.push(i)
											}
										}
									});
							if (init) {
								this.panels.addClass("pa_ui_tabs_panel");
								var selectclass = this.options.selectedclass;
								if (o.selected === undefined) {
									if (location.hash) {
										this.anchors.each(function(i, a) {
											if (a.hash == location.hash) {
												o.selected = i;
												return false
											}
										})
									}
									if (typeof o.selected != "number"
											&& this.lis.filter("."
													+ selectclass).length) {
										o.selected = this.lis.index(this.lis
												.filter("." + selectclass))
									}
									o.selected = o.selected || 0
								} else {
									if (o.selected === null) {
										o.selected = -1
									}
								}
								o.selected = ((o.selected >= 0 && this.anchors[o.selected]) || o.selected < 0) ? o.selected
										: 0;
								o.disabled = $
										.unique(
												o.disabled
														.concat($
																.map(
																		this.lis
																				.filter("pa_ui_state_disabled=0"),
																		function(
																				n,
																				i) {
																			return self.lis
																					.index(n)
																		})))
										.sort();
								if ($.inArray(o.selected, o.disabled) != -1) {
									o.disabled.splice($.inArray(o.selected,
											o.disabled), 1)
								}
								this.panels.addClass("pa_ui_tabs_hide");
								this.lis.removeClass(selectclass);
								if (o.selected >= 0 && this.anchors.length) {
									this.panels.eq(o.selected).removeClass(
											"pa_ui_tabs_hide");
									this.lis.eq(o.selected).addClass(
											selectclass);
									self.element.queue("tabs", function() {
										self._trigger("show", null, self._ui(
												self.anchors[o.selected],
												self.panels[o.selected]))
									});
									if (o.selected > 0) {
										this._fixTab()
									}
									this.load(o.selected)
								}
								if (o.scroll) {
									var maxWidth = self.list.parent()
											.innerWidth();
									maxWidth = maxWidth
											- self.appendLeft.outerWidth({
												margin : true
											}) - self.appendRight.outerWidth({
												margin : true
											});
									var w = 0, maxIndex = 0;
									for ( var i = 0; i <= self.maxIndex; i++) {
										w += self.lis.eq(i).outerWidth({
											margin : true
										});
										if (w > maxWidth) {
											break
										}
										maxIndex = i
									}
									if (o.selected > maxIndex) {
										self.appendLeft
												.removeClass("pa_ui_disabled pa_ui_tabs_disabledleft")
									}
									if (o.selected < self.maxIndex) {
										self.appendRight
												.removeClass("pa_ui_disabled pa_ui_tabs_disabledright")
									}
								}
								$(window)
										.bind(
												"unload",
												function() {
													self.lis.add(self.anchors)
															.unbind(".tabs");
													self.lis = self.anchors = self.panels = null
												})
							} else {
								o.selected = this.lis.index(this.lis.filter("."
										+ selectclass))
							}
							for ( var i = 0, li; (li = this.lis[i]); i++) {
								if ($.inArray(i, o.disabled) != -1
										&& !$(li).hasClass(selectclass)) {
									$(li).attr("pa_ui_state_disabled", "0")
								} else {
									$(li).attr("pa_ui_state_disabled", "1")
								}
							}
							if (o.cache === false) {
								this.anchors.removeData("cache.tabs")
							}
							this.lis.add(this.anchors).unbind(".tabs");
							if (o.event != "mouseover") {
								var addState = function(state, el) {
									if (el.is(":not(pa_ui_state_disabled=0)")) {
										el.attr("pa_ui_state_" + state, "0")
									}
								};
								var removeState = function(state, el) {
									el.attr("pa_ui_state_" + state, "1")
								};
								this.lis.bind("mouseover.tabs", function() {
									addState("hover", $(this))
								});
								this.lis.bind("mouseout.tabs", function() {
									removeState("hover", $(this))
								});
								this.anchors.bind("focus.tabs", function() {
									addState("focus", $(this).closest("li"))
								});
								this.anchors.bind("blur.tabs", function() {
									removeState("focus", $(this).closest("li"))
								})
							}
							var hideFx, showFx;
							if (o.fx) {
								if ($.isArray(o.fx)) {
									hideFx = o.fx[0];
									showFx = o.fx[1]
								} else {
									hideFx = showFx = o.fx
								}
							}
							function resetStyle($el, fx) {
								$el.css({
									display : ""
								});
								if ($.browser.msie && fx.opacity) {
									$el[0].style.removeAttribute("filter")
								}
							}
							var showTab = showFx ? function(clicked, $show) {
								$(clicked).closest("li").addClass(selectclass);
								$show.hide().removeClass("pa_ui_tabs_hide")
										.animate(
												showFx,
												showFx.duration || "normal",
												function() {
													resetStyle($show, showFx);
													self._trigger("show", null,
															self._ui(clicked,
																	$show[0]))
												})
							} : function(clicked, $show) {
								$(clicked).closest("li").addClass(selectclass);
								$show.removeClass("pa_ui_tabs_hide");
								self._fixTab();
								self._trigger("show", null, self._ui(clicked,
										$show[0]))
							};
							var hideTab = hideFx ? function(clicked, $hide) {
								$hide.animate(hideFx, hideFx.duration
										|| "normal", function() {
									self.lis.removeClass(selectclass);
									$hide.addClass("pa_ui_tabs_hide");
									resetStyle($hide, hideFx);
									self.element.dequeue("tabs")
								})
							} : function(clicked, $hide, $show) {
								self.lis.removeClass(selectclass);
								$hide.addClass("pa_ui_tabs_hide");
								self.element.dequeue("tabs")
							};
							this.anchors
									.bind(
											o.event + ".tabs",
											function() {
												var el = this, $li = $(this)
														.closest("li"), $hide = self.panels
														.filter(":not(.pa_ui_tabs_hide)"), $show = $(self
														._sanitizeSelector(this.hash));
												if (($li.hasClass(selectclass) && !o.collapsible)
														|| self
																._trigger(
																		"select",
																		null,
																		self
																				._ui(
																						this,
																						$show[0])) === false) {
													this.blur();
													return false
												}
												o.selected = self.anchors
														.index(this);
												var oldurl = $.data(
														document.body, "aaaa");
												if (oldurl != "1") {
													$("#" + oldurl).attr(
															"href",
															"#" + oldurl).attr(
															"target", "");
													$("#" + oldurl)
															.parents("li:first")
															.removeClass(
																	selectclass)
															.attr(
																	"ui_state_focus",
																	"0")
												}
												self.abort();
												if (o.collapsible) {
													if ($li
															.hasClass(selectclass)) {
														o.selected = -1;
														self.element
																.queue(
																		"tabs",
																		function() {
																			hideTab(
																					el,
																					$hide)
																		})
																.dequeue("tabs");
														this.blur();
														return false
													} else {
														if (!$hide.length) {
															self.element
																	.queue(
																			"tabs",
																			function() {
																				showTab(
																						el,
																						$show)
																			});
															self
																	.load(self.anchors
																			.index(this));
															this.blur();
															return false
														}
													}
												}
												if ($show.length) {
													if ($hide.length) {
														self.element
																.queue(
																		"tabs",
																		function() {
																			hideTab(
																					el,
																					$hide)
																		})
													}
													self.element.queue("tabs",
															function() {
																showTab(el,
																		$show)
															});
													self.load(self.anchors
															.index(this))
												} else {
													throw "jQuery UI Tabs: Mismatching fragment identifier."
												}
												if ($.browser.msie) {
													this.blur()
												}
											});
							this.anchors.bind("click.tabs", function() {
								return false
							})
						},
						_fixTab : function() {
							var self = this;
							var o = self.options;
							if (!self.options.scroll) {
								return
							}
							var leftHide = self.lis.parent().position().left;
							var w = 0;
							for ( var i = 0; i < o.selected; i++) {
								w += self.lis.eq(i).outerWidth({
									margin : true
								})
							}
							if (w < Math.abs(leftHide)) {
								self.list.css("left", -1 * w)
							} else {
								w += self.lis.eq(o.selected).outerWidth({
									margin : true
								});
								var maxWidth = self.list.parent().width()
										- self.appendLeft.outerWidth({
											margin : true
										}) - self.appendRight.outerWidth({
											margin : true
										});
								if (w > (maxWidth + Math.abs(leftHide))) {
									w = -1 * (w - maxWidth);
									self.list.css("left", w)
								}
							}
						},
						destroy : function() {
							var o = this.options;
							this.abort();
							this.element.unbind(".tabs").removeData("tabs");
							this.anchors.each(function() {
								var href = $.data(this, "href.tabs");
								if (href) {
									this.href = href
								}
								var $this = $(this).unbind(".tabs");
								$.each([ "href", "load", "cache" ], function(i,
										prefix) {
									$this.removeData(prefix + ".tabs")
								})
							});
							this.lis
									.unbind(".tabs")
									.add(this.panels)
									.each(
											function() {
												if ($
														.data(this,
																"destroy.tabs")) {
													$(this).remove()
												} else {
													$(this)
															.attr(
																	"pa_ui_state_disabled",
																	"1");
													$(this)
															.removeClass(
																	[
																			o.selectedclass,
																			"pa_ui_tabs_panel",
																			"pa_ui_tabs_hide" ]
																			.join(" "))
												}
											})
						},
						add : function(url, label, index) {
							if (index === undefined) {
								index = this.anchors.length
							}
							var self = this, o = this.options, $li = $(o.tabTemplate
									.replace(/#\{href\}/g, url).replace(
											/#\{label\}/g, label)), id = !url
									.indexOf("#") ? url.replace("#", "") : this
									._tabId($("a", $li)[0]);
							$li.data("destroy.tabs", true);
							var $panel = $("#" + id);
							if (!$panel.length) {
								$panel = $(o.panelTemplate).attr("id", id)
										.data("destroy.tabs", true)
							}
							$panel.addClass("pa_ui_tabs_panel pa_ui_tabs_hide");
							if (index >= this.lis.length) {
								$li.appendTo(this.list);
								$panel.appendTo(this.list[0].parentNode)
							} else {
								$li.insertBefore(this.lis[index]);
								$panel.insertBefore(this.panels[index])
							}
							o.disabled = $.map(o.disabled, function(n, i) {
								return n >= index ? ++n : n
							});
							this._tabify();
							if (this.anchors.length == 1) {
								$li.addClass(this.options.selectedclass);
								$panel.removeClass("pa_ui_tabs_hide");
								this.element.queue("tabs", function() {
									self._trigger("show", null, self._ui(
											self.anchors[0], self.panels[0]))
								});
								this.load(0)
							}
							this._trigger("add", null, this._ui(
									this.anchors[index], this.panels[index]))
						},
						remove : function(index) {
							var o = this.options, $li = this.lis.eq(index)
									.remove(), $panel = this.panels.eq(index)
									.remove();
							if ($li.hasClass(this.options.selectedclass)
									&& this.anchors.length > 1) {
								this.select(index
										+ (index + 1 < this.anchors.length ? 1
												: -1))
							}
							o.disabled = $.map($.grep(o.disabled,
									function(n, i) {
										return n != index
									}), function(n, i) {
								return n >= index ? --n : n
							});
							this._tabify();
							this._trigger("remove", null, this._ui($li
									.find("a")[0], $panel[0]))
						},
						enable : function(index) {
							var o = this.options;
							if ($.inArray(index, o.disabled) == -1) {
								return
							}
							this.lis.eq(index)
									.attr("pa_ui_state_disabled", "1");
							o.disabled = $.grep(o.disabled, function(n, i) {
								return n != index
							});
							this._trigger("enable", null, this._ui(
									this.anchors[index], this.panels[index]))
						},
						disable : function(index) {
							var self = this, o = this.options;
							if (index != o.selected) {
								this.lis.eq(index).attr("pa_ui_state_disabled",
										"0");
								o.disabled.push(index);
								o.disabled.sort();
								this._trigger("disable", null, this
										._ui(this.anchors[index],
												this.panels[index]))
							}
						},
						select : function(index) {
							if (typeof index == "string") {
								index = this.anchors.index(this.anchors
										.filter("[href$=" + index + "]"))
							} else {
								if (index === null) {
									index = -1
								}
							}
							if (index == -1 && this.options.collapsible) {
								index = this.options.selected
							}
							this.anchors.eq(index).trigger(
									this.options.event + ".tabs")
						},
						load : function(index) {
							var self = this, o = this.options, a = this.anchors
									.eq(index)[0], url = $.data(a, "load.tabs");
							this.abort();
							if (!url || this.element.queue("tabs").length !== 0
									&& $.data(a, "cache.tabs")) {
								this.element.dequeue("tabs");
								return
							}
							var url_type = this.lis.eq(index);
							var murl = $.data(a, "origin.link");
							var ourl = url_type.find("a[href]:first").attr(
									"href");
							if (murl != "1") {
								var target = murl.attr("target");
								if (target == "_blank") {
									if ($.browser.msie) {
										murl.appendTo("body").hide();
										murl[0].click()
									} else {
										window.open(murl.attr("href"))
									}
								} else {
									location.href = murl.attr("href")
								}
								self.element.dequeue("tabs");
								return
							}
							this.lis.eq(index).attr("ui-state-processing", "0");
							if (o.spinner) {
								var span = $("span", a);
								span.data("label.tabs", span.html()).html(
										o.spinner)
							}
							this.xhr = $
									.ajax($
											.extend(
													{},
													o.ajaxOptions,
													{
														url : url,
														success : function(r, s) {
															if ($
																	.data(a,
																			"origin.link") == "1"
																	&& url_type
																			.attr("pa_ui_url_type") == "ajax") {
																$(
																		self
																				._sanitizeSelector(a.hash))
																		.html(r)
															}
															self._cleanup();
															if (o.cache) {
																$
																		.data(
																				a,
																				"cache.tabs",
																				true)
															}
															self
																	._trigger(
																			"load",
																			null,
																			self
																					._ui(
																							self.anchors[index],
																							self.panels[index]));
															try {
																o.ajaxOptions
																		.success(
																				r,
																				s)
															} catch (e) {
															}
															self.element
																	.dequeue("tabs")
														}
													}))
						},
						abort : function() {
							this.element.queue([]);
							this.panels.stop(false, true);
							if (this.xhr) {
								this.xhr.abort();
								delete this.xhr
							}
							this._cleanup()
						},
						url : function(index, url) {
							this.anchors.eq(index).removeData("cache.tabs")
									.data("load.tabs", url)
						},
						length : function() {
							return this.anchors.length
						}
					});
	$
			.extend(
					$.ui.tabs,
					{
						getter : "length",
						defaults : {
							ajaxOptions : {
								async : true
							},
							cache : false,
							collapsible : false,
							disabled : [],
							event : "click",
							selectedclass : "focus",
							fx : null,
							idPrefix : "pa_ui_tabs_",
							panelTemplate : "<div></div>",
							spinner : "<em>Loading&#8230;</em>",
							selectedclass : "focus",
							tabTemplate : '<li><a href="#{href}"><span>#{label}</span></a></li>',
							length : "",
							appendleft : '<a class="pa_ui_tabs_scrollleft"></a>',
							appendright : '<a class="pa_ui_tabs_scrollright"></a>',
							scrollEvent : "click",
							scrollInterval : 500
						},
						load : function() {
							$("[pa_ui_name*=tabs]")
									.each(
											function(index) {
												$.pa_ui.widget.init(this);
												var options = {}, option;
												var self = this;
												option = $(this).attr(
														"pa_ui_tabs_event");
												if (option) {
													options.event = $(this)
															.attr(
																	"pa_ui_tabs_event")
												}
												option = $(this).attr(
														"pa_ui_tabs_focus");
												if (option) {
													options.selectedclass = $(
															this).attr(
															"pa_ui_tabs_focus")
												}
												option = $(this).attr(
														"pa_ui_tabs_select");
												if (option) {
													options.select = eval(option)
												}
												option = $(this)
														.attr(
																"pa_ui_tabs_selectedindex");
												if (option) {
													options.selected = $.pa_ui.converter
															.toInt(option)
												}
												option = $(this).attr(
														"pa_ui_tabs_scroll");
												if (option) {
													options.scroll = (option == "true")
												}
												option = $(this)
														.attr(
																"pa_ui_tabs_scrollevent");
												if (option) {
													options.scrollEvent = option
												}
												option = $(this)
														.attr(
																"pa_ui_tabs_scrollinterval");
												if (option) {
													options.scrollInterval = $.pa_ui.converter
															.toInt(option)
												}
												$(this).tabs(options);
												$.pa_ui.widget.inited(this)
											})
						}
					});
	if ($.pa_ui.lazyLoad) {
		$(document).ready(function() {
			$.ui.tabs.load()
		})
	} else {
		$.ui.tabs.load()
	}
})(jQuery);
(function(a) {
	a(document)
			.ready(
					function() {
						inRegion = function(e, d) {
							return (d.x >= e.left && d.x < (e.left + e.width)
									&& d.y >= e.top && d.y < (e.top + e.height))
						};
						function b(e, d, h) {
							var g = e.offset().top;
							var f = e.offset().left;
							switch (d) {
							case "tl":
								break;
							case "tr":
								f += e.outerWidth();
								break;
							case "bl":
								g += e.outerHeight();
								break;
							case "br":
								g += e.outerHeight();
								f += e.outerWidth()
							}
							if (h) {
								g += h.y;
								f += h.x
							}
							return {
								top : g,
								left : f
							}
						}
						var c = false;
						if (!c) {
							a.ui.popup.popuptriggers = [];
							a("[pa_ui_name*=popuptrigger]")
									.each(
											function() {
												a.pa_ui.widget.init(this);
												var l = this;
												var k = a(this).attr(
														"pa_ui_target_id");
												if (k == null) {
													alert("\u4f7f\u7528pa_ui_target_id\u8bbe\u5b9a\u5f39\u51fa\u7684\u5143\u7d20\u3002");
													return
												}
												if (k.length > 0) {
													var i = {
														top : a(l).position().top,
														left : a(l).position().left,
														width : a(l)
																.outerWidth(),
														height : a(l)
																.outerHeight()
													};
													var d = a("#" + k).popup({
														anchor : {
															id : this
														}
													});
													a.ui.popup.popuptriggers
															.push(d);
													var j = a(this).offset().top
															+ a(this)
																	.outerHeight();
													var e = a(this).offset().left;
													var h = a(this)
															.attr(
																	"pa_ui_popuptrigger_position") ? a(
															this)
															.attr(
																	"pa_ui_popuptrigger_position")
															: "bl";
													var g = {
														x : 0,
														y : 0
													};
													if (a(this)
															.attr(
																	"pa_ui_popuptrigger_offset")) {
														var n = a(this)
																.attr(
																		"pa_ui_popuptrigger_offset");
														var m = n.split(",");
														var f = {
															x : 0,
															y : 0
														};
														if (m.length > 0) {
															g.x = parseInt(m[0])
														}
														if (m.length > 1) {
															g.y = parseInt(m[1])
														}
													}
													a(this)
															.hover(
																	function(o) {
																		a
																				.each(
																						a.ui.popup.popuptriggers,
																						function() {
																							this
																									.popup("close")
																						});
																		var p = b(
																				a(l),
																				h,
																				g);
																		d
																				.popup(
																						"top",
																						p.top)
																				.popup(
																						"left",
																						p.left)
																				.popup(
																						"open")
																	},
																	function(p) {
																		var o = {
																			top : d
																					.parent()
																					.position().top,
																			left : d
																					.parent()
																					.position().left,
																			width : d
																					.parent()
																					.outerWidth(),
																			height : d
																					.parent()
																					.outerHeight()
																		};
																		if (inRegion(
																				i,
																				{
																					x : p.pageX,
																					y : p.pageY
																				})
																				|| inRegion(
																						o,
																						{
																							x : p.pageX,
																							y : p.pageY
																						})) {
																		} else {
																			d
																					.popup("close")
																		}
																	});
													d
															.bind(
																	"mouseout",
																	function(p) {
																		var o = {
																			top : d
																					.parent()
																					.position().top,
																			left : d
																					.parent()
																					.position().left,
																			width : d
																					.parent()
																					.outerWidth(),
																			height : d
																					.parent()
																					.outerHeight()
																		};
																		if (inRegion(
																				i,
																				{
																					x : p.pageX,
																					y : p.pageY
																				})
																				|| inRegion(
																						o,
																						{
																							x : p.pageX,
																							y : p.pageY
																						})) {
																		} else {
																			d
																					.popup("close")
																		}
																	})
												}
												a.pa_ui.widget.inited(this)
											});
							c = true
						}
					})
})(jQuery);
(function(a) {
	a
			.widget(
					"ui.tooltip",
					{
						_init : function() {
							var b = this;
							this.isShow = false;
							this.element.addClass("pa_ui_tooltip");
							this.tip = a("<div></div>").addClass(
									this.options.wrapperClass).css({
								position : "absolute"
							}).appendTo("body").hide();
							if (b.options.hasTitle) {
								this.title = a("<div></div>").addClass(
										"pa_ui_tooltip_title").appendTo(
										this.tip);
								this.closeHandle = a("<a></a>")
										.attr("href", "").addClass(
												"pa_ui_tooltip_close").html(
												b.options.closeText).click(
												function() {
													b.hideTip();
													return false
												}).appendTo(this.title)
							}
							this.message = null;
							if (this.options.referId != null
									&& this.options.referId.length > 0) {
								this.message = a("#" + this.options.referId)
										.clone().show().appendTo(this.tip);
								a("#" + this.options.referId).hide()
							} else {
								this.message = a("<div></div>")
										.addClass("pa_ui_tooltip_message")
										.html(
												this.options.message ? this.options.message
														: "")
										.appendTo(this.tip)
							}
							if (this.options.event == "hover") {
								this.element.hover(function(c) {
									b.showTip()
								}, function(c) {
									b.hideTip()
								})
							} else {
								if (this.element[0].nodeName == "INPUT") {
									this.element.focus(function(c) {
										a(".pa_ui_tooltip").tooltip("hideTip");
										b.showTip()
									}).blur(function() {
										a(".pa_ui_tooltip").tooltip("hideTip")
									})
								} else {
									this.element.click(function(c) {
										a(".pa_ui_tooltip").tooltip("hideTip");
										b.showTip()
									})
								}
								a(document)
										.bind(
												"click.tooltip",
												function(c) {
													if (a(c.target).parents(
															".pa_ui_tooltip").length <= 0
															&& a(c.target)
																	.parents(
																			".pa_ui_tooltip_wrapper").length <= 0
															&& !a(c.target)
																	.hasClass(
																			".pa_ui_tooltip")
															&& !a(c.target)
																	.hasClass(
																			".pa_ui_tooltip_wrapper")) {
														b.hideTip()
													}
												})
							}
							if (this.options.isShow) {
								this.showTip()
							}
						},
						showTip : function() {
							var b = this;
							if (!b.isShow) {
								b._position();
								b.tip.css("z-index", a.ui.popup.maxZ++).show();
								if (b.options.autoAdjust) {
									a.pa_ui.ui.adjustPosition(b.tip[0])
								}
								b.isShow = true
							}
						},
						hideTip : function() {
							var b = this;
							b.tip.hide();
							b.isShow = false
						},
						_position : function() {
							var d = this.element.offset().top;
							var c = this.element.offset().left;
							var b = this.options.position;
							switch (b) {
							case "tl":
								break;
							case "tr":
								c += this.element.outerWidth();
								break;
							case "bl":
								d += this.element.outerHeight();
								break;
							case "br":
								d += this.element.outerHeight();
								c += this.element.outerWidth()
							}
							if (this.options.offset) {
								d += this.options.offset.top;
								c += this.options.offset.left
							}
							this.tip.css("top", d).css("left", c)
						},
						destroy : function() {
							this.tip.remove();
							this.element.removeClass("pa_ui_tooltip")
						}
					});
	a.extend(a.ui.tooltip, {
		defaults : {
			event : "hover",
			position : "bl",
			wrapperClass : "pa_ui_tooltip_wrapper",
			offset : {
				left : 0,
				top : 0
			},
			isShow : false,
			hasTitle : false,
			closeText : "\u5173\u95ed",
			autoAdjust : true
		},
		load : function() {
			var b = false;
			if (!b) {
				a("[pa_ui_name*=tooltip]").each(function() {
					a.pa_ui.widget.init(this);
					var f, c = {};
					var g = a(this);
					if (g.attr("pa_ui_tooltip_event") == "click") {
						c.event = "click"
					} else {
						c.event = "hover"
					}
					if (g.attr("pa_ui_tooltip_message")) {
						c.message = g.attr("pa_ui_tooltip_message")
					}
					if (g.attr("pa_ui_tooltip_referid")) {
						c.referId = g.attr("pa_ui_tooltip_referid")
					}
					if (g.attr("pa_ui_tooltip_position")) {
						c.position = g.attr("pa_ui_tooltip_position")
					}
					if (g.attr("pa_ui_tooltip_isshow")) {
						c.isShow = g.attr("pa_ui_tooltip_isshow") == "true"
					}
					if (g.attr("pa_ui_tooltip_hastitle")) {
						c.hasTitle = g.attr("pa_ui_tooltip_hastitle") == "true"
					}
					if (g.attr("pa_ui_tooltip_closetext")) {
						c.closeText = g.attr("pa_ui_tooltip_closetext")
					}
					if (g.attr("pa_ui_tooltip_offset")) {
						var e = g.attr("pa_ui_tooltip_offset");
						var d = e.split(",");
						var h = {
							left : 0,
							top : 0
						};
						if (d.length > 0) {
							h.left = a.pa_ui.converter.toInt(d[0])
						}
						if (d.length > 1) {
							h.top = a.pa_ui.converter.toInt(d[1])
						}
						c.offset = h
					}
					f = g.attr("pa_ui_tooltip_class");
					if (f) {
						c.wrapperClass = f
					}
					g.tooltip(c);
					a.pa_ui.widget.inited(this)
				})
			}
		}
	});
	if (a.pa_ui.lazyLoad) {
		a(document).ready(function() {
			a.ui.tooltip.load()
		})
	} else {
		a(document).ready(function() {
			a.ui.tooltip.load()
		})
	}
})(jQuery);
(function($) {
	$
			.widget(
					"ui.patable",
					$
							.extend(
									{},
									$.ui.mouse,
									{
										version : "3.0",
										build : "2012.0522.1128",
										_init : function() {
											var self = this;
											this._mouseInit();
											this.$headtds = $("thead td",
													this.element[0]);
											this.hasHead = this.$headtds.size() > 0;
											this.$bodytrs = $("tbody tr",
													this.element[0]);
											this.rows = this.$bodytrs.size();
											this.cols = 0;
											this.wrapped = false;
											this.hintDiv = $("<div></div>");
											this.selects = [];
											if (this.hasHead) {
												this.colList = this
														._buildHeader();
												this.cols = this.colList.length;
												this.cache = this._cache();
												if (this.options.sortable) {
													this._sortable()
												}
												if (this.options.resizable) {
													this._resizable()
												}
												if (this.options.customizable) {
													this._customizable()
												}
												if (this.options.tree) {
													this._tree()
												}
												if (this.options.cellEdit
														|| this.options.rowEdit) {
													this._loadEditorSetting()
												}
												if (this.options.cellEdit) {
													this._cellEdit()
												}
												if (this.options.rowEdit) {
													this._rowEdit()
												}
												this.element
														.bind(
																"update",
																function() {
																	self.$headtds = $(
																			"thead td",
																			this.element[0]);
																	self.hasHead = this.$headtds
																			.size() > 0;
																	self.$bodytrs = $(
																			"tbody tr",
																			this.element[0]);
																	self.rows = this.$bodytrs
																			.size();
																	self.colList = this
																			._buildHeader();
																	self.cols = self.colList.length;
																	self.cache = this
																			._cache()
																})
											}
											if (this.options.hoverable) {
												this._hoverable()
											}
											if (this.options.selectable) {
												this._selectable()
											}
											this._fixCellIndex()
										},
										destroy : function() {
											if (this.$headtds) {
												this.$headtds
														.each(function() {
															$(this)
																	.unbind(
																			"click.patable")
																	.css(
																			"cursor",
																			"deault");
															$(this).children()
																	.children()
																	.remove();
															$(this)
																	.parent()
																	.remove(
																			"div.pa_ui_cell_wrapper")
														});
												this.$headtds
														.unbind("click.patable")
														.css("cursor", "deault")
														.removeAttr(
																"pa_ui_editor")
														.removeAttr(
																"pa_ui_editor_source")
														.removeAttr(
																"pa_ui_editor_source")
														.removeAttr("parser")
														.removeAttr("sortable")
														.removeAttr("order")
											}
											this.$bodytrs
													.each(function() {
														$(this)
																.removeClass(
																		"inited")
																.removeClass(
																		"parent")
																.removeClass(
																		"expanded")
																.removeClass(
																		"collapsed")
																.removeClass(
																		"pa_ui_selected");
														$(this)
																.removeAttr(
																		"pa_ui_table_hoverable")
																.removeAttr(
																		"pa_ui_parent")
																.removeAttr(
																		"pa_ui_table_selectable");
														$(this)
																.children("td")
																.each(
																		function(
																				index) {
																			$(
																					this)
																					.removeAttr(
																							"edit")
																					.removeAttr(
																							"realIndex")
																					.attr(
																							"style",
																							"")
																		})
													});
											$(this.$bodytrs).find(
													".pa_ui_table_opbox")
													.remove();
											$.widget.prototype.destroy
													.apply(this)
										},
										_hoverable : function() {
											var self = this;
											this.$bodytrs
													.attr(
															"pa_ui_table_hoverable",
															"true")
													.hover(
															function(event) {
																$(this)
																		.parents()
																		.andSelf()
																		.filter(
																				"[pa_ui_table_hoverable=true]")
																		.addClass(
																				self.options.cssHover)
															},
															function(event) {
																$(this)
																		.parents()
																		.andSelf()
																		.filter(
																				"[pa_ui_table_hoverable=true]")
																		.removeClass(
																				self.options.cssHover)
															})
										},
										_selectable : function() {
											var self = this;
											this.$bodytrs.attr(
													"pa_ui_table_selectable",
													"true");
											var selectMode = this.options.selectMode;
											var selectColumn = this.options.selectColumn;
											var selectTrigger = this.options.selectTrigger;
											if (selectColumn >= 0) {
												this.$bodytrs
														.each(function(index) {
															var tr = this;
															var $checkbox = $(
																	this)
																	.children(
																			"td:eq("
																					+ selectColumn
																					+ ")")
																	.find(
																			self.options.selectTriggerElement);
															if ($checkbox
																	.attr("checked") == "true") {
																self
																		._select(tr)
															}
															if (selectTrigger == "element") {
																$checkbox
																		.click(function(
																				event) {
																			self
																					._select(index);
																			event
																					.stopPropagation()
																		})
															}
														})
											}
										},
										_select : function(rowIndex) {
											var self = this;
											var row = null;
											if (typeof rowIndex == "object") {
												self.$bodytrs
														.each(function(index) {
															if ((rowIndex[0] && rowIndex[0] == this)
																	|| rowIndex == this) {
																row = rowIndex;
																rowIndex = index
															}
														})
											}
											if (rowIndex > self.$bodytrs.size()) {
												return
											}
											if (row == null) {
												row = self.$bodytrs[rowIndex]
											}
											var selectMode = this.options.selectMode;
											var selectTrigger = this.options.selectTrigger;
											var selectColumn = this.options.selectColumn;
											if (selectMode == "single") {
												self.$bodytrs
														.each(function(index) {
															if (rowIndex != index) {
																$(
																		self.$bodytrs[index])
																		.removeClass(
																				self.options.cssSelected);
																if (selectColumn >= 0) {
																	$(
																			self.$bodytrs[index])
																			.children(
																					"td:eq("
																							+ selectColumn
																							+ ")")
																			.find(
																					self.options.selectTriggerElement)
																			.attr(
																					"checked",
																					"")
																}
															}
														})
											}
											if (self.options.selectMode === "multi") {
												$(row)
														.toggleClass(
																self.options.cssSelected)
											} else {
												$(row)
														.addClass(
																self.options.cssSelected)
											}
											if (selectColumn >= 0
													&& selectTrigger == "tr") {
												$(row)
														.children(
																"td:eq("
																		+ selectColumn
																		+ ")")
														.find(
																this.options.selectTriggerElement)
														.attr(
																"checked",
																($(row)
																		.hasClass(
																				self.options.cssSelected) ? "true"
																		: ""))
														.click(function(event) {
															return false
														})
											}
											this._trigger("select");
											this._showDetail(row)
										},
										_showDetail : function(row) {
											var self = this;
											if (this.options.detailId) {
												var url = this.options.detailUrl;
												$("#" + this.options.detailId)
														.addClass("loading")
														.show();
												$("#" + this.options.detailId)
														.load(
																url
																		+ row[0].rowIndex);
												setTimeout(
														function() {
															$(
																	"#"
																			+ self.options.detailId)
																	.removeClass(
																			"loading")
														}, 2000)
											}
										},
										sort : function() {
											this.element.trigger("sortStart");
											this._setHeadCss();
											this._appendToTable(this
													._sortData());
											this.element.trigger("sortEnd")
										},
										_sortable : function() {
											var self = this;
											this.$headtds
													.bind(
															"click.patable",
															function(e) {
																if (!this.sortable) {
																	return
																}
																self.options.sortList = [];
																this.order = this.count++ % 2;
																self.options.sortList
																		.push([
																				this.column,
																				this.order ]);
																self.sort()
															}).css({
														cursor : "pointer"
													})
										},
										_buildHeader : function() {
											var self = this;
											var colList = [];
											this.$headtds
													.each(function(index) {
														this.count = 0;
														this.column = index;
														this.order = 0;
														this.sortable = !($(
																this)
																.attr(
																		"pa_ui_sortable") == "false");
														this.sorttype = $(this)
																.attr(
																		"pa_ui_sorttype");
														this.visible = true;
														colList[index] = this
													});
											if (self.$bodytrs.size() > 0) {
												$(self.$bodytrs[0])
														.children("td")
														.each(
																function(index) {
																	if (index < colList.length) {
																		var p = self
																				._detechParserForColumn(this);
																		if (p) {
																			colList[index].parser = p
																		}
																	}
																})
											}
											return colList
										},
										_detechParserForColumn : function(col) {
											var l = $.ui.patable.sortparsers.length;
											for ( var i = 1; i < l; i++) {
												if ($.ui.patable.sortparsers[i]
														.is($.trim($(col)
																.text()))) {
													return $.ui.patable.sortparsers[i]
												}
											}
											return $.ui.patable.sortparsers[0]
										},
										_getParserById : function(name) {
											var l = parsers.length;
											for ( var i = 0; i < l; i++) {
												if (parsers[i].id.toLowerCase() == name
														.toLowerCase()) {
													return parsers[i]
												}
											}
											return false
										},
										_cache : function() {
											var table = this.element[0];
											var totalRows = (table.tBodies[0] && table.tBodies[0].rows.length) || 0, totalCells = (table.tBodies[0].rows[0] && table.tBodies[0].rows[0].cells.length) || 0, cache = {
												row : [],
												normalized : []
											};
											for ( var i = 0; i < totalRows; ++i) {
												var c = table.tBodies[0].rows[i], cols = [];
												cache.row.push($(c));
												for ( var j = 0; j < totalCells; ++j) {
													if (j < this.colList.length) {
														cols
																.push(this.colList[j].parser
																		.format(
																				$(
																						c.cells[j])
																						.text(),
																				table,
																				c.cells[j]))
													}
												}
												cols.push(i);
												cache.normalized.push(cols);
												cols = null
											}
											return cache
										},
										_sortData : function() {
											function sortText(a, b) {
												if (a == "") {
													return 1
												}
												if (b == "") {
													return -1
												}
												return ((a < b) ? -1
														: ((a > b) ? 1 : 0))
											}
											function sortTextDesc(a, b) {
												if (a == "") {
													return 1
												}
												if (b == "") {
													return -1
												}
												return ((b < a) ? -1
														: ((b > a) ? 1 : 0))
											}
											function sortNumeric(a, b) {
												if (a === "" || b === "") {
													return
												}
												if (a == null && b != null) {
													return 1
												}
												if (b == null && a != null) {
													return -1
												}
												if (a == null && b == null) {
													return 0
												}
												if (typeof a === "string") {
													a = a.split(/[^-\.\d]+/)
															.join("")
												}
												if (typeof b === "string") {
													b = b.split(/[^-\.\d]+/)
															.join("")
												}
												return a - b
											}
											function sortNumericDesc(a, b) {
												if (a === "" || b === "") {
													return
												}
												if (a == null && b != null) {
													return 1
												}
												if (b == null && a != null) {
													return -1
												}
												if (a == null && b == null) {
													return 0
												}
												if (typeof a === "string") {
													a = a.split(/[^-\.\d]+/)
															.join("")
												}
												if (typeof b === "string") {
													b = b.split(/[^-\.\d]+/)
															.join("")
												}
												return b - a
											}
											var table = this.element[0];
											var sortList = this.options.sortList;
											var dynamicExp = "var sortWrapper = function(a,b) {", l = sortList.length;
											for ( var i = 0; i < l; i++) {
												var c = sortList[i][0];
												var order = sortList[i][1];
												if (this.colList[c].sorttype === "numeric") {
													var s = (order == 0) ? "sortNumeric"
															: "sortNumericDesc"
												} else {
													var s = ((this.colList[c].parser.type) == "text") ? ((order == 0) ? "sortText"
															: "sortTextDesc")
															: ((order == 0) ? "sortNumeric"
																	: "sortNumericDesc")
												}
												var e = "e" + i;
												dynamicExp += "var " + e
														+ " = " + s + "(a[" + c
														+ "],b[" + c + "]); ";
												dynamicExp += "if(" + e
														+ ") { return " + e
														+ "; } ";
												dynamicExp += "else { "
											}
											var orgOrderCol = this.cache.normalized[0].length - 1;
											dynamicExp += "return a["
													+ orgOrderCol + "]-b["
													+ orgOrderCol + "];";
											for ( var i = 0; i < l; i++) {
												dynamicExp += "}; "
											}
											dynamicExp += "return 0; ";
											dynamicExp += "}; ";
											eval(dynamicExp);
											this.cache.normalized
													.sort(sortWrapper)
										},
										_appendToTable : function() {
											var table = this.element[0];
											var c = this.cache, r = c.row, n = c.normalized, totalRows = n.length, checkCell = (n[0].length - 1), tableBody = $(table.tBodies[0]), rows = [];
											for ( var i = 0; i < totalRows; i++) {
												rows.push(r[n[i][checkCell]]);
												var o = r[n[i][checkCell]];
												var l = o.length;
												for ( var j = 0; j < l; j++) {
													tableBody[0]
															.appendChild(o[j])
												}
											}
											rows = null
										},
										_setHeadCss : function() {
											this.$headtds
													.removeClass(
															this.options.cssSortAsc)
													.removeClass(
															this.options.cssSortDesc);
											for ( var index in this.options.sortList) {
												var sortCol = this.options.sortList[index];
												if (sortCol[1] == 1) {
													$(this.colList[sortCol[0]])
															.addClass(
																	this.options.cssSortAsc)
												} else {
													if (sortCol[1] == 0) {
														$(
																this.colList[sortCol[0]])
																.addClass(
																		this.options.cssSortDesc)
													}
												}
											}
										},
										_mouseDown : function(event) {
											var self = this;
											if (event.button == 2) {
												return false
											}
											if (self.options.selectable
													&& self.options.selectTrigger == "tr") {
												var tr = $(event.target)
														.parents()
														.andSelf()
														.filter(
																"[pa_ui_table_selectable=true]");
												if (tr.length <= 0) {
													return
												}
												self._select(tr)
											}
											if (self.options.cellEdit) {
												var target = event.target;
												while ($(target).attr("edit") != "true") {
													if (target == self.element[0]) {
														break
													}
													target = target.parentNode
												}
												var cellIndex = $(target).attr(
														"cellIndex");
												if (self.options.cellEditors[cellIndex]
														&& self.options.cellEditors[cellIndex].editable) {
													var source = self.options.cellEditors[cellIndex].source;
													var editor = self.options.cellEditors[cellIndex].editor;
													switch (editor) {
													case "textbox":
														self
																._cellTextboxEditor(target);
														break;
													case "textarea":
														self
																._cellTextareaEditor(target);
														break;
													case "radio":
														self._cellRadioEditor(
																target, source);
														break;
													case "select":
														self._cellSelectEditor(
																target, source);
														break;
													case "checkbox":
														self
																._cellCheckboxEditor(
																		target,
																		source);
														break;
													case "date":
														self
																._cellDateEditor(target);
														break
													}
												}
											}
											if (self.options.rowEdit) {
												var target = event.target;
												while ($(target).attr("edit") != "true") {
													if (target == self.element[0]) {
														break
													}
													target = target.parentNode
												}
												if (!$(target)
														.parent()
														.hasClass(
																"pa_ui_row_editing")) {
													return
												}
												var cellIndex = $(target).attr(
														"cellIndex");
												if (self.options.cellEditors[cellIndex]
														&& self.options.cellEditors[cellIndex].editable) {
													var source = self.options.cellEditors[cellIndex].source;
													var editor = self.options.cellEditors[cellIndex].editor;
													var cell = target;
													var input = $(cell)
															.children("input")
															.size() > 0 ? $(
															cell).children(
															"input")[0] : null;
													switch (editor) {
													case "textbox":
														self
																._cellTextboxEditor(
																		cell,
																		input);
														break;
													case "textarea":
														self
																._cellTextareaEditor(
																		cell,
																		input);
														break;
													case "radio":
														self._cellRadioEditor(
																cell, source,
																input);
														break;
													case "select":
														self._cellSelectEditor(
																cell, source,
																input);
														break;
													case "checkbox":
														self
																._cellCheckboxEditor(
																		cell,
																		source,
																		input);
														break;
													case "date":
														self._cellDateEditor(
																cell, input);
														break
													}
												}
											}
										},
										_cell : function(row, col) {
											if (row < this.rows
													&& col < this.cols) {
												return $(this.$bodytrs[row])
														.children("td").eq(col)
											}
										},
										_resizable : function() {
											var self = this;
											this._wrapCell();
											var minWidth = this.options.colMinWidth || 10;
											var maxWidth = this.options.colMaxWidth
													|| this.element.width();
											this.$headtds
													.each(function() {
														var $td = $(this);
														var colIndex = this.cellIndex;
														$td
																.children("div")
																.resizable(
																		{
																			handles : "e",
																			minWidth : minWidth,
																			maxWidth : maxWidth
																		})
																.bind(
																		"resize",
																		function(
																				event,
																				ui) {
																			if (ui != null) {
																				self.$bodytrs
																						.each(function(
																								rowindex) {
																							$(
																									this)
																									.children(
																											"td")
																									.each(
																											function(
																													index) {
																												if (index == colIndex) {
																													$(
																															this)
																															.width(
																																	ui.size.width);
																													var temp = $(
																															"<div class='pa_ui_table_tabwrapac'></div>)")
																															.text(
																																	$(
																																			this)
																																			.text())
																															.hide();
																													var newstr = $(
																															this)
																															.text()
																															.replace(
																																	$(
																																			this)
																																			.text()
																																			.substring(
																																					1),
																																	"...");
																													if (ui.size.width < 55
																															&& $(
																																	this)
																																	.children()
																																	.hasClass(
																																			"pa_ui_table_tabwrapac") == false) {
																														$(
																																this)
																																.text(
																																		newstr)
																																.append(
																																		temp)
																													}
																													if (ui.size.width > 100
																															&& $(
																																	this)
																																	.children()
																																	.hasClass(
																																			"pa_ui_table_tabwrapac") == true) {
																														$(
																																this)
																																.text(
																																		$(
																																				this)
																																				.children(
																																						".pa_ui_table_tabwrapac")
																																				.text())
																													}
																												}
																											})
																						})
																			}
																		})
													})
										},
										_customizable : function() {
											var self = this;
											var el = self.element[0];
											this._wrapCell();
											var html = "<ul>";
											this.$headtds
													.each(function(i) {
														html += '<li><input value="'
																+ i
																+ '" type="checkbox" id="pa_ui_col_check_'
																+ i
																+ '" checked="'
																+ self.colList[i].visible
																+ '"/><label for="pa_ui_col_check_'
																+ i
																+ '">'
																+ $(
																		self.colList[i])
																		.text()
																+ "</label></li>"
													});
											html += "</ul>";
											var pop = $("<div></div>")
													.addClass("pa_ui_cell_menu")
													.html(html)
													.find("input")
													.bind(
															"click",
															function(event) {
																if (event.target.checked) {
																	jQuery.ui.patable
																			.showCol(
																					el,
																					$(
																							event.target)
																							.val())
																} else {
																	var tcount = 0;
																	var cutd = $(
																			"thead td",
																			el);
																	for (i = 0; i < $(
																			"thead td",
																			el).length; i++) {
																		if (cutd
																				.get(i).style.display != "none") {
																			tcount++
																		}
																	}
																	if (tcount > 1) {
																		jQuery.ui.patable
																				.hideCol(
																						el,
																						$(
																								event.target)
																								.val())
																	} else {
																		alert("\u9700\u4fdd\u7559\u4e00\u5217");
																		$(this)
																				.attr(
																						"checked",
																						"true")
																	}
																}
															}).end().popup();
											this.$headtds
													.each(function(i) {
														var link = $(
																'<a href=""></a>')
																.appendTo(
																		$(this)
																				.children(
																						"div"))
																.addClass(
																		"pa_ui_cell_link")
																.hide()
																.click(
																		function(
																				event) {
																			var left = $(
																					this)
																					.offset().left;
																			var top = $(
																					this)
																					.offset().top
																					+ $(
																							this)
																							.outerHeight();
																			pop
																					.popup(
																							"close")
																					.popup(
																							"top",
																							top)
																					.popup(
																							"left",
																							left)
																					.popup(
																							"open");
																			return false
																		});
														var td = this;
														$(this)
																.hover(
																		function() {
																			$(
																					".pa_ui_cell_link")
																					.hide();
																			$(
																					".pa_ui_cell_link",
																					td)
																					.show()
																		},
																		function() {
																			if (!pop
																					.popup("isOpen")) {
																				$(
																						".pa_ui_cell_link",
																						td)
																						.hide()
																			}
																		})
													});
											$(document)
													.click(
															function(event) {
																if ($(
																		event.target)
																		.parents()
																		.andSelf()
																		.hasClass(
																				"pa_ui_cell_menu")) {
																	return
																}
																if (pop
																		.popup(
																				"containEvent",
																				event)) {
																	return
																}
																if (pop
																		.popup("isOpen")) {
																	pop
																			.popup("close")
																}
															})
										},
										_wrapCell : function() {
											if (this.wrapped) {
												return
											}
											if (this.$headtds) {
												this.$headtds
														.each(function() {
															$(this)
																	.wrapInner(
																			'<div class="pa_ui_cell_wrapper c"></div>');
															$(
																	"div.pa_ui_cell_wrapper")
																	.height(
																			$(
																					this)
																					.height())
														})
											}
											this.wrapped = true
										},
										_tree : function() {
											var self = this;
											var op = self.options;
											var column = op.treeColumn;
											var rootId = new Array();
											var rootIdIndex = 0;
											this.$bodytrs
													.each(function(index) {
														if ($(this).attr(
																"pa_ui_parent") == null
																|| $(this)
																		.attr(
																				"pa_ui_parent").length <= 0) {
															self
																	._makeNode($(this));
															rootId[rootIdIndex] = $(
																	this).attr(
																	"id");
															rootIdIndex++
														}
													});
											var expandNode = op.expandNode;
											if (expandNode != null
													&& expandNode.length > 0) {
												var expandNode = expandNode
														.split(",");
												for (i = 0,
														l = expandNode.length; i < l; i++) {
													var nodes = expandNode[i]
															.split(".");
													var level = 0;
													var parent = self.element;
													self
															._expand($("#"
																	+ rootId[nodes[0] - 1]));
													var nodeRootId = rootId[nodes[0] - 1];
													var nodeParentId, nodeId;
													for (k = 1; k < nodes.length; k++) {
														if (k == 1) {
															nodeParentId = nodeRootId
														} else {
															nodeParentId = nodeId
														}
														nodeId = $(
																self.element
																		.find("tbody tr[pa_ui_parent="
																				+ nodeParentId
																				+ "]"))
																.eq(
																		nodes[k] - 1)
																.attr("id");
														if (nodes[k] <= $(self.element
																.find("tbody tr[pa_ui_parent="
																		+ nodeParentId
																		+ "]")).length) {
															self._expand($("#"
																	+ nodeId))
														}
													}
												}
											}
										},
										_makeNode : function($node) {
											var self = this;
											if (!$node.hasClass("inited")) {
												$node.addClass("inited");
												var childNodes = this
														._childrenOf($node);
												if (!$node.hasClass("parent")
														&& childNodes.length > 0) {
													$node.addClass("parent")
												}
												if ($node.hasClass("parent")) {
													var cell = $($node
															.children("td")[this.options.treeColumn]);
													var padding = parseInt(
															cell
																	.css("padding-left"),
															10) + 19;
													var i = childNodes.length;
													while (i--) {
														$(
																$(childNodes[i])
																		.children(
																				"td")[self.options.treeColumn])
																.css(
																		"padding-left",
																		padding
																				+ "px");
														self
																._moveTr(
																		$(childNodes[i]),
																		$node)
													}
													$("<span/>").addClass(
															"pa_ui_table_icon")
															.prependTo(cell[0]);
													$node
															.removeClass(
																	"expanded")
															.addClass(
																	"collapsed")
															.click(
																	function() {
																		self
																				._expandCollapse($node)
																	}).css(
																	"cursor",
																	"pointer");
													if ($node
															.hasClass("collapsed")) {
														self._collapse($node)
													} else {
														if ($node
																.hasClass("expanded")) {
															self._expand($node)
														}
													}
												}
											}
										},
										_childrenOf : function($node) {
											return $("tbody tr[pa_ui_parent="
													+ $node[0].id + "]",
													this.element[0])
										},
										_expand : function(node) {
											var self = this;
											node.removeClass("collapsed")
													.addClass("expanded");
											self
													._childrenOf(node)
													.each(
															function() {
																self
																		._makeNode($(this));
																if (!node
																		.hasClass("expanded")) {
																	self
																			._expand($(this))
																}
																$(this).show()
															})
										},
										_collapse : function(node) {
											var self = this;
											node.removeClass("expanded")
													.addClass("collapsed");
											self
													._childrenOf(node)
													.each(
															function() {
																self
																		._makeNode($(this));
																if (!$(this)
																		.hasClass(
																				"collapsed")) {
																	self
																			._collapse($(this))
																}
																$(this).hide()
															})
										},
										_expandCollapse : function(node) {
											if (node.hasClass("collapsed")) {
												this._expand(node)
											} else {
												node.removeClass("expanded");
												this._collapse(node)
											}
										},
										_indent : function(node, value) {
											var cell = $(node.children("td")[options.treeColumn]);
											var padding = parseInt(cell
													.css("padding-left"), 10)
													+ value;
											cell.css("padding-left", +padding
													+ "px");
											childrenOf(node).each(function() {
												indent($(this), value)
											})
										},
										_moveTr : function(tr, destination) {
											var self = this;
											tr.insertAfter(destination);
											var childs = self._childrenOf(tr), i = childs.length;
											while (i--) {
												self._moveTr($(childs[i]),
														tr[0])
											}
										},
										_loadEditorSetting : function() {
											var self = this;
											this.options.cellEditors = [];
											self.$headtds
													.each(function(index) {
														var cellEditor = $(this)
																.attr(
																		"pa_ui_editor")
																|| "";
														var item = {
															cellIndex : index,
															editable : (cellEditor.length > 0),
															editor : cellEditor,
															source : $(this)
																	.attr(
																			"pa_ui_editor_source")
														};
														self.options.cellEditors[index] = item
													})
										},
										_cellEdit : function() {
											var self = this;
											self.$bodytrs
													.each(function() {
														$(this)
																.children("td")
																.each(
																		function(
																				index) {
																			if (self.options.cellEditors[index].editable) {
																				$(
																						this)
																						.attr(
																								"edit",
																								true)
																			}
																		})
													})
										},
										_fixCellIndex : function() {
											var self = this;
											var matrix = [];
											for ( var i = 0; i < this.rows; i++) {
												var cells = self.$bodytrs[i].cells;
												var clen = cells.length;
												for ( var j = 0; j < clen; j++) {
													var c = cells[j];
													var rowSpan = c.rowSpan || 1;
													var colSpan = c.colSpan || 1;
													var firstAvailCol = -1;
													if (!matrix[i]) {
														matrix[i] = []
													}
													var m = matrix[i];
													while (m[++firstAvailCol]) {
													}
													c.realIndex = firstAvailCol;
													for ( var k = i; k < i
															+ rowSpan; k++) {
														if (!matrix[k]) {
															matrix[k] = []
														}
														var matrixrow = matrix[k];
														for ( var l = firstAvailCol; l < firstAvailCol
																+ colSpan; l++) {
															matrixrow[l] = 1
														}
													}
												}
											}
										},
										_cellTextboxEditor : function(cell,
												input, saved) {
											var self = this;
											var $cell = $(cell);
											var hasInput = (input != null);
											var $input = $(input);
											if ($cell.length <= 0) {
												return
											}
											var pop = $("div.pa_ui_textbox_editor");
											if (pop.length <= 0) {
												pop = $("<div></div>")
														.addClass(
																"pa_ui_textbox_editor")
														.addClass(
																"pa_ui_table_editor")
											}
											pop.empty();
											var editor = $(
													'<input type="textbox"/>')
													.appendTo(pop);
											var btnBox = $("<div></div>")
													.addClass(
															"pa_ui_table_editor_button")
													.appendTo(pop);
											var btnSave = $(
													'<button type="button"></button>')
													.addClass(
															"pa_ui_save_button")
													.appendTo(btnBox);
											if (saved) {
												btnSave.text("\u4fdd\u5b58")
											} else {
												btnSave.text("\u786e\u5b9a")
											}
											var btnCancel = $(
													'<button type="button">\u53d6\u6d88</button>')
													.addClass(
															"pa_ui_cancel_button")
													.appendTo(btnBox);
											if (hasInput) {
												editor.val($input.val())
											} else {
												editor.val($cell.text())
											}
											btnSave.bind("click", function(
													event) {
												if (hasInput) {
													$input.val(editor.val())
												} else {
													$cell.text(editor.val())
												}
												pop.popup("close")
											});
											btnCancel.click(function() {
												pop.popup("close")
											});
											$(".pa_ui_table_editor").popup()
													.popup("close");
											if (hasInput) {
												pop.popup({
													anchor : {
														id : input
													}
												}).popup("open", {
													anchor : {
														id : input
													}
												})
											} else {
												pop.popup({
													anchor : {
														id : cell
													}
												}).popup("open", {
													anchor : {
														id : cell
													}
												})
											}
										},
										_cellTextareaEditor : function(cell,
												input, saved) {
											var self = this;
											var $cell = $(cell);
											var hasInput = (input != null);
											var $input = $(input);
											if ($cell.length <= 0) {
												return
											}
											var pop = $("div.pa_ui_textarea_editor");
											if (pop.length <= 0) {
												pop = $("<div></div>")
														.addClass(
																"pa_ui_textarea_editor")
														.addClass(
																"pa_ui_table_editor")
											}
											pop.empty();
											var editor = $("<textarea/>")
													.appendTo(pop);
											var btnBox = $("<div></div>")
													.addClass(
															"pa_ui_table_editor_button")
													.appendTo(pop);
											var btnSave = $(
													'<button type="button"></button>')
													.addClass(
															"pa_ui_save_button")
													.appendTo(btnBox);
											if (saved) {
												btnSave.text("\u4fdd\u5b58")
											} else {
												btnSave.text("\u786e\u5b9a")
											}
											var btnCancel = $(
													'<button type="button">\u53d6\u6d88</button>')
													.addClass(
															"pa_ui_cancel_button")
													.appendTo(btnBox);
											if (hasInput) {
												editor.val($input.val())
											} else {
												editor.val($cell.text())
											}
											btnSave.bind("click", function(
													event) {
												if (hasInput) {
													$input.val(editor.val())
												} else {
													$cell.text(editor.val())
												}
												pop.popup("close")
											});
											btnCancel.click(function() {
												pop.popup("close")
											});
											$(".pa_ui_table_editor").popup()
													.popup("close");
											if (hasInput) {
												pop.popup({
													anchor : {
														id : input
													}
												}).popup("open", {
													anchor : {
														id : input
													}
												})
											} else {
												pop.popup({
													anchor : {
														id : cell
													}
												}).popup("open", {
													anchor : {
														id : cell
													}
												})
											}
										},
										_cellCheckboxEditor : function(cell,
												source, input, saved) {
											var self = this;
											var $cell = $(cell);
											var hasInput = (input != null);
											var $input = $(input);
											if ($cell.length <= 0) {
												return
											}
											var contain = function(t) {
												var tt = $cell.text()
														.split(",");
												if (hasInput) {
													tt = $input.val()
															.split(",")
												}
												for ( var i = 0; i < tt.length; i++) {
													if (tt[i] == t) {
														return true
													}
												}
												return false
											};
											var pop = $("div.pa_ui_checkbox_editor");
											if (pop.length <= 0) {
												pop = $("<div></div>")
														.addClass(
																"pa_ui_checkbox_editor")
														.addClass(
																"pa_ui_table_editor")
											}
											pop.empty();
											var html = "";
											if (source) {
												$('[name="' + source + '"]')
														.each(
																function() {
																	html += '<label><input type="checkbox" value="'
																			+ $(
																					this)
																					.val()
																			+ '"'
																			+ (contain($(
																					this)
																					.parent()
																					.text()) ? 'checked="true"'
																					: "")
																			+ "/>"
																			+ $(
																					this)
																					.parent()
																					.text()
																			+ "</label>"
																});
												pop.append(html)
											}
											var editor = $(":checkbox", pop);
											var btnBox = $("<div></div>")
													.addClass(
															"pa_ui_table_editor_button")
													.appendTo(pop);
											var btnSave = $(
													'<button type="button"></button>')
													.addClass(
															"pa_ui_save_button")
													.appendTo(btnBox);
											if (saved) {
												btnSave.text("\u4fdd\u5b58")
											} else {
												btnSave.text("\u786e\u5b9a")
											}
											var btnCancel = $(
													'<button type="button">\u53d6\u6d88</button>')
													.addClass(
															"pa_ui_cancel_button")
													.appendTo(btnBox);
											btnSave.bind("click", function(
													event) {
												var t = "";
												editor.each(function() {
													if (this.checked) {
														t += $(this).parent()
																.text()
																+ ","
													}
												});
												if (t.length > 0) {
													t = t.substring(0,
															t.length - 1)
												}
												if (hasInput) {
													$input.val(t)
												} else {
													$cell.text(t)
												}
												pop.popup("close")
											});
											btnCancel.click(function() {
												pop.popup("close")
											});
											$(".pa_ui_table_editor").popup()
													.popup("close");
											if (hasInput) {
												pop.popup({
													anchor : {
														id : input
													}
												}).popup("open", {
													anchor : {
														id : input
													}
												})
											} else {
												pop.popup({
													anchor : {
														id : cell
													}
												}).popup("open", {
													anchor : {
														id : cell
													}
												})
											}
										},
										_cellSelectEditor : function(cell,
												sourceId, input, saved) {
											var self = this;
											var $cell = $(cell);
											var hasInput = (input != null);
											var $input = $(input);
											if ($cell.length <= 0) {
												return
											}
											var pop = $("div.pa_ui_select_editor");
											if (pop.length <= 0) {
												pop = $("<div></div>")
														.addClass(
																"pa_ui_select_editor")
														.addClass(
																"pa_ui_table_editor")
											}
											pop.empty();
											var editor = $("<select/>")
													.appendTo(pop);
											var btnBox = $("<div></div>")
													.addClass(
															"pa_ui_table_editor_button")
													.appendTo(pop);
											var btnSave = $(
													'<button type="button"></button>')
													.addClass(
															"pa_ui_save_button")
													.appendTo(btnBox);
											if (saved) {
												btnSave.text("\u4fdd\u5b58")
											} else {
												btnSave.text("\u786e\u5b9a")
											}
											var btnCancel = $(
													'<button type="button">\u53d6\u6d88</button>')
													.addClass(
															"pa_ui_cancel_button")
													.appendTo(btnBox);
											var v = "";
											if (hasInput) {
												v = $input.val()
											} else {
												v = $cell.text()
											}
											if (sourceId) {
												editor.children("option")
														.remove();
												$("#" + sourceId)
														.children("option")
														.each(
																function() {
																	editor
																			.append('<option value="'
																					+ $(
																							this)
																							.val()
																					+ '" '
																					+ (($(
																							this)
																							.text() == v) ? 'selected="true"'
																							: "")
																					+ ">"
																					+ $(
																							this)
																							.text()
																					+ "</option>")
																})
											}
											if (hasInput) {
												editor.val($input.val())
											} else {
												editor.val($cell.text())
											}
											btnSave
													.bind(
															"click",
															function(event) {
																var i = editor[0].selectedIndex;
																if (hasInput) {
																	$input
																			.val(editor
																					.children(
																							"option:eq("
																									+ i
																									+ ")")
																					.text())
																} else {
																	$cell
																			.text(editor
																					.children(
																							"option:eq("
																									+ i
																									+ ")")
																					.text())
																}
																pop
																		.popup("close")
															});
											btnCancel.click(function() {
												pop.popup("close")
											});
											$(".pa_ui_table_editor").popup()
													.popup("close");
											if (hasInput) {
												pop.popup({
													anchor : {
														id : input
													}
												}).popup("open", {
													anchor : {
														id : input
													}
												})
											} else {
												pop.popup({
													anchor : {
														id : cell
													}
												}).popup("open", {
													anchor : {
														id : cell
													}
												})
											}
										},
										_cellRadioEditor : function(cell,
												source, input, saved) {
											var self = this;
											var $cell = $(cell);
											var hasInput = (input != null);
											var $input = $(input);
											if ($cell.length <= 0) {
												return
											}
											var pop = $("div.pa_ui_radio_editor");
											if (pop.length <= 0) {
												pop = $("<div></div>")
														.addClass(
																"pa_ui_radio_editor")
														.addClass(
																"pa_ui_table_editor")
											}
											pop.empty();
											var html = "";
											var v = "";
											if (hasInput) {
												v = $input.val()
											} else {
												v = $cell.text()
											}
											if (source) {
												$('[name="' + source + '"]')
														.each(
																function() {
																	html += '<label><input type="radio" name="'
																			+ source
																			+ '" value="'
																			+ $(
																					this)
																					.val()
																			+ '"'
																			+ ($(
																					this)
																					.parent()
																					.text() == v ? 'checked="true"'
																					: "")
																			+ "/>"
																			+ $(
																					this)
																					.parent()
																					.text()
																			+ "</label>"
																});
												pop.append(html)
											}
											var editor = $(":radio", pop);
											var btnBox = $("<div></div>")
													.addClass(
															"pa_ui_table_editor_button")
													.appendTo(pop);
											var btnSave = $(
													'<button type="button"></button>')
													.addClass(
															"pa_ui_save_button")
													.appendTo(btnBox);
											if (saved) {
												btnSave.text("\u4fdd\u5b58")
											} else {
												btnSave.text("\u786e\u5b9a")
											}
											var btnCancel = $(
													'<button type="button">\u53d6\u6d88</button>')
													.addClass(
															"pa_ui_cancel_button")
													.appendTo(btnBox);
											btnSave.bind("click", function(
													event) {
												if (hasInput) {
													$input.val(editor.filter(
															'[checked="true"]')
															.parent().text())
												} else {
													$cell.text(editor.filter(
															'[checked="true"]')
															.parent().text())
												}
												pop.popup("close")
											});
											btnCancel.click(function() {
												pop.popup("close")
											});
											$(".pa_ui_table_editor").popup()
													.popup("close");
											if (hasInput) {
												pop.popup({
													anchor : {
														id : input
													}
												}).popup("open", {
													anchor : {
														id : input
													}
												})
											} else {
												pop.popup({
													anchor : {
														id : cell
													}
												}).popup("open", {
													anchor : {
														id : cell
													}
												})
											}
										},
										_cellDateEditor : function(cell, input,
												saved) {
											var self = this;
											var $cell = $(cell);
											var hasInput = (input != null);
											var v = "";
											if (hasInput) {
												$(input).datepicker();
												return
											} else {
												v = $cell.text()
											}
											if ($cell.length <= 0) {
												return
											}
											var pop = $("div.pa_ui_date_editor");
											var editor, btnSave, btnCancel;
											if (pop.length <= 0) {
												pop = $("<div></div>")
														.addClass(
																"pa_ui_date_editor")
														.addClass(
																"pa_ui_table_editor")
											}
											pop.empty();
											var editor = $(
													'<input type="textbox"/>')
													.appendTo(pop).val(v)
													.datepicker({
														canInput : false
													});
											var btnBox = $("<div></div>")
													.addClass(
															"pa_ui_table_editor_button")
													.appendTo(pop);
											var btnSave = $(
													'<button type="button">\u4fdd\u5b58</button>')
													.addClass(
															"pa_ui_save_button")
													.appendTo(btnBox);
											var btnCancel = $(
													'<button type="button">\u53d6\u6d88</button>')
													.addClass(
															"pa_ui_cancel_button")
													.appendTo(btnBox);
											btnSave
													.bind(
															"click",
															function(event) {
																$cell
																		.text($.datepicker
																				.formatDate(
																						"yy-mm-dd",
																						editor
																								.datepicker("getDate")));
																editor
																		.datepicker("close");
																pop
																		.popup("close")
															});
											btnCancel.click(function() {
												editor.datepicker("close");
												pop.popup("close")
											});
											$(".pa_ui_table_editor").popup()
													.popup("close");
											if (hasInput) {
												pop.popup({
													anchor : {
														id : input
													}
												}).popup("open", {
													anchor : {
														id : input
													}
												})
											} else {
												pop.popup({
													anchor : {
														id : cell
													}
												}).popup("open", {
													anchor : {
														id : cell
													}
												})
											}
										},
										_rowEdit : function() {
											var self = this;
											var ops = self.options;
											self.rowEditMode = "edit";
											self.$bodytrs
													.each(function(index) {
														var td = $("<td></td>")
																.addClass(
																		"pa_ui_table_opbox");
														var edit = $("<a/>")
																.text(
																		ops.editText)
																.attr("href",
																		"")
																.addClass(
																		"pa_ui_table_op pa_ui_table_opedit")
																.click(
																		function() {
																			self
																					.rowEdit(index);
																			self
																					._rowEditLink(
																							td,
																							12);
																			return false
																		})
																.appendTo(td);
														var del = $("<a/>")
																.text(
																		ops.deleteText)
																.attr("href",
																		"")
																.addClass(
																		"pa_ui_table_op pa_ui_table_opdelete")
																.click(
																		function() {
																			self
																					.rowDelete(index);
																			return false
																		})
																.appendTo(td);
														var save = $("<a/>")
																.text(
																		ops.saveText)
																.attr("href",
																		"")
																.addClass(
																		"pa_ui_table_op pa_ui_table_opsave")
																.click(
																		function() {
																			self
																					.rowSave();
																			self
																					._rowEditLink(
																							td,
																							3);
																			return false
																		})
																.appendTo(td);
														var can = $("<a/>")
																.text(
																		ops.cancelText)
																.attr("href",
																		"")
																.addClass(
																		"pa_ui_table_op pa_ui_table_opcancel")
																.click(
																		function() {
																			self
																					.rowUnEdit();
																			self
																					._rowEditLink(
																							td,
																							3);
																			return false
																		})
																.appendTo(td);
														td.appendTo(this);
														self
																._rowEditLink(
																		td, 3)
													})
										},
										_rowEditLink : function($td, state) {
											$(".pa_ui_table_op", $td[0]).hide();
											if ((state & 1) > 0) {
												$(".pa_ui_table_opedit", $td[0])
														.show()
											}
											if ((state & 2) > 0) {
												$(".pa_ui_table_opdelete",
														$td[0]).show()
											}
											if ((state & 4) > 0) {
												$(".pa_ui_table_opsave", $td[0])
														.show()
											}
											if ((state & 8) > 0) {
												$(".pa_ui_table_opcancel",
														$td[0]).show()
											}
										},
										rowEdit : function(row) {
											var self = this;
											if (row > self.$bodytrs.length) {
												return this
											}
											self.rowUnEdit();
											var $row = $(self.$bodytrs[row]);
											self.rowData = [];
											$row.children("td").each(
													function(index) {
														var data = [];
														data[0] = $(this)
																.text();
														data[1] = $(this)
																.html();
														self.rowData.push(data)
													});
											$row
													.children("td")
													.each(
															function(index) {
																if (self.options.cellEditors[index]
																		&& self.options.cellEditors[index].editable) {
																	$(this)
																			.attr(
																					"edit",
																					true)
																			.empty();
																	if (self.options.cellEditors[index].editor == "textarea") {
																		var tdinput = $(
																				'<input type="textbox"/>')
																				.width(
																						"70%")
																				.val(
																						self.rowData[index][0])
																				.appendTo(
																						this)
																				.keyup(
																						function() {
																							$(
																									".pa_ui_textarea_editor")
																									.children(
																											"textarea")
																									.val(
																											$(
																													this)
																													.val())
																						})
																	} else {
																		$(
																				'<input type="textbox"/>')
																				.attr(
																						"readonly",
																						"true")
																				.width(
																						"70%")
																				.val(
																						self.rowData[index][0])
																				.appendTo(
																						this)
																	}
																}
															});
											$row.addClass("pa_ui_row_editing");
											return this
										},
										rowUnEdit : function() {
											var self = this;
											var $row = $(".pa_ui_row_editing",
													self.element[0]);
											if (self.rowData) {
												$
														.each(
																self.rowData,
																function(index) {
																	if (self.options.cellEditors[index]
																			&& self.options.cellEditors[index].editable) {
																		$(
																				$row
																						.children(
																								"td")
																						.eq(
																								index))
																				.html(
																						self.rowData[index][1])
																	}
																})
											}
											var $td = $(".pa_ui_table_opbox",
													$row[0]);
											self._rowEditLink($td, 3);
											$row
													.removeClass("pa_ui_row_editing");
											return self
										},
										rowInsert : function(row) {
											var self = this;
											if (row > self.$bodytrs.length) {
												return this
											}
											$append = $("<tr></tr>");
											for ( var i = 0; i < self.cols; i++) {
												$append.append("<td></td>")
											}
											$append.appendTo(self.element
													.children("tbody"));
											self.rowEdit(self.rows++);
											return this
										},
										rowDelete : function(row) {
											var self = this;
											if (row > self.$bodytrs.length) {
												return this
											}
											var $row = $(self.$bodytrs[row]);
											var cover = $row.cover({
												message : "deleting..."
											});
											setTimeout(function() {
												$row.cover("destroy");
												$row.remove()
											}, 2000);
											return this
										},
										rowSave : function() {
											var self = this;
											var $row = $(".pa_ui_row_editing",
													self.element[0]);
											if ($row.length <= 0) {
												return false
											}
											$(".pa_ui_popup_container").hide();
											var cover = $row.cover({
												message : "saving..."
											});
											setTimeout(
													function() {
														$row
																.children("td")
																.each(
																		function(
																				index) {
																			if (self.options.cellEditors[index]
																					&& self.options.cellEditors[index].editable) {
																				var v = $(
																						this)
																						.children(
																								"input")
																						.val();
																				$(
																						this)
																						.empty()
																						.text(
																								v)
																			}
																		});
														cover.cover("destroy");
														$row
																.removeClass("pa_ui_row_editing")
													}, 2000);
											return false
										}
									}));
	$
			.extend(
					$.ui.patable,
					{
						defaults : {
							hoverable : false,
							cssHover : "pa_ui_hover",
							selectable : false,
							selectmode : "single",
							selectTrigger : "element",
							selectTriggerElement : ":radio",
							selectColumn : 0,
							cssSelected : "pa_ui_selected",
							sortable : false,
							cssSortAsc : "pa_ui_sort_asc",
							cssSortDesc : "pa_ui_sort_desc",
							cssSortNo : "",
							sortList : [],
							resizable : false,
							colMinWidth : 50,
							colMaxWidth : 300,
							customizable : false,
							tree : false,
							treeColumn : 0,
							cssExpand : "pa_ui_table_expand",
							cssCollapse : "pa_ui_table_collapse",
							cellEdit : false,
							rowEdit : false
						},
						hideCol : function(el, index) {
							$("thead td", el).eq(index).hide();
							$("tbody tr", el).each(function() {
								$("td", this).eq(index).hide()
							})
						},
						showCol : function(el, index) {
							$("thead td", el).eq(index).show();
							$("tbody tr", el).each(function() {
								$("td", this).eq(index).show()
							})
						},
						sortparsers : [
								{
									id : "text",
									is : function(s) {
										return true
									},
									format : function(s) {
										s = $.trim(s);
										return $.trim(s.toLowerCase())
									},
									type : "text"
								},
								{
									id : "digit",
									is : function(s, table) {
										return $.pa_ui.validator.isNumeric(s)
									},
									format : function(s) {
										s = $.trim(s);
										s = s.replace(new RegExp(/[^0-9.]/g),
												"");
										if (s != null
												&& s != ""
												&& s.length > 0
												&& $.pa_ui.validator
														.isNumeric(s)) {
											return $.pa_ui.converter.toFloat(s)
										} else {
											return null
										}
									},
									type : "numeric"
								},
								{
									id : "currency",
									is : function(s) {
										return /^[\uffe1$\u20ac?.]/.test(s)
									},
									format : function(s) {
										s = $.trim(s);
										if (/^[\uffe1$\u20ac?.]/.test(s)) {
											return $.pa_ui.converter.toFloat(s
													.replace(new RegExp(
															/[^0-9.]/g), ""))
										} else {
											return null
										}
									},
									type : "numeric"
								},
								{
									id : "ipAddress",
									is : function(s) {
										return /^\d{2,3}[\.]\d{2,3}[\.]\d{2,3}[\.]\d{2,3}$/
												.test(s)
									},
									format : function(s) {
										var a = s.split("."), r = "", l = a.length;
										for ( var i = 0; i < l; i++) {
											var item = a[i];
											if (item.length == 2) {
												r += "0" + item
											} else {
												r += item
											}
										}
										return $.pa_ui.converter.toFloat(r)
									},
									type : "numeric"
								},
								{
									id : "isoDate",
									is : function(s) {
										return /^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/
												.test(s)
									},
									format : function(s) {
										s = $.trim(s);
										if (/^\d{4}[\/-]\d{1,2}[\/-]\d{1,2}$/
												.test(s)) {
											return $.pa_ui.converter
													.toFloat((s != "") ? new Date(
															s
																	.replace(
																			new RegExp(
																					/-/g),
																			"/"))
															.getTime()
															: null)
										} else {
											return null
										}
									},
									type : "numeric"
								},
								{
									id : "percent",
									is : function(s) {
										return /\%$/.test($.trim(s))
									},
									format : function(s) {
										s = $.trim(s);
										return $.pa_ui.converter.toFloat(s
												.replace(new RegExp(/%/g), ""))
									},
									type : "numeric"
								},
								{
									id : "time",
									is : function(s) {
										return /^(([0-2]?[0-9]:[0-5][0-9])|([0-1]?[0-9]:[0-5][0-9]\s(am|pm)))$/
												.test(s)
									},
									format : function(s) {
										return $.pa_ui.converter
												.toFloat(new Date("2000/01/01 "
														+ s).getTime())
									},
									type : "numeric"
								} ],
						load : function() {
							var inited = false;
							if (!inited) {
								$("[pa_ui_name*='table']")
										.each(
												function() {
													$.pa_ui.widget.init(this);
													var options = {};
													var $this = $(this);
													if ($this
															.attr("pa_ui_hover") == "true") {
														options.hoverable = true
													}
													if ($this
															.attr("pa_ui_selectable") == "true") {
														options.selectable = true;
														if ($this
																.attr("pa_ui_select_mode") === "multi") {
															options.selectMode = "multi"
														} else {
															options.selectMode = "single"
														}
														options.selectTrigger = $this
																.attr("pa_ui_select_trigger")
																|| "tr";
														options.selectColumn = $this
																.attr("pa_ui_select_column")
																|| -1
													}
													if ($this
															.attr("pa_ui_select_triggerelement")) {
														options.selectTriggerElement = $this
																.attr("pa_ui_select_triggerelement")
													}
													if ($this
															.attr("pa_ui_sortable") === "true") {
														options.sortable = true
													}
													if ($this
															.attr("pa_ui_resizable") === "true") {
														options.resizable = true
													}
													if ($this
															.attr("pa_ui_customizable") === "true") {
														options.customizable = true
													}
													if ($this
															.attr("pa_ui_tree") === "true") {
														options.tree = true;
														options.treeColumn = 0 || $.pa_ui.converter
																.toInt($this
																		.attr("pa_ui_tree_column"));
														options.expandNode = $this
																.attr("pa_ui_tree_expand")
													}
													if ($this
															.attr("pa_ui_cell_edit") === "true") {
														options.cellEdit = true
													} else {
														if ($this
																.attr("pa_ui_row_edit") === "true") {
															options.rowEdit = true;
															options.editText = $this
																	.attr("pa_ui_row_edit_text") ? $this
																	.attr("pa_ui_row_edit_text")
																	: "\u7f16\u8f91";
															options.deleteText = $this
																	.attr("pa_ui_row_delete_text") ? $this
																	.attr("pa_ui_row_delete_text")
																	: "\u5220\u9664";
															options.saveText = $this
																	.attr("pa_ui_row_save_text") ? $this
																	.attr("pa_ui_row_save_text")
																	: "\u4fdd\u5b58";
															options.cancelText = $this
																	.attr("pa_ui_row_cancle_text") ? $this
																	.attr("pa_ui_row_cancel_text")
																	: "\u53d6\u6d88"
														}
													}
													if ($this
															.attr("pa_ui_table_detailid")) {
														options.detailId = $this
																.attr("pa_ui_table_detailid");
														options.detailUrl = $this
																.attr("pa_ui_table_detailurl")
													}
													$this.patable(options);
													$.pa_ui.widget.inited(this)
												});
								inited = true
							}
						}
					});
	if ($.pa_ui.lazyLoad) {
		$(document).ready(function() {
			$.ui.patable.load()
		})
	} else {
		$.ui.patable.load()
	}
})(jQuery);
(function(a) {
	a
			.widget(
					"ui.keyboard",
					{
						version : "3.0",
						build : "2010.1130.0830",
						_init : function() {
							var b = this.element.attr("lang");
							b === "en" && (this.options.lang = b);
							this._buildKeyboard();
							this.isShow = false
						},
						destroy : function() {
							this.close();
							if (self.trigger && self.trigger.length > 0) {
								self.trigger.remove()
							}
							this.element.unbind(".keyboard");
							a.widget.prototype.destroy.apply(this, arguments)
						},
						_RandomSort : function(d, c) {
							return Math.random() - 0.5
						},
						_getRandomNum : function() {
							var b = new Array();
							var c;
							for (c = 0; c < 10; c++) {
								b[c] = c
							}
							if (this.options.random) {
								return b.sort(this._RandomSort)
							} else {
								return b
							}
						},
						_getRandomChar : function() {
							var d = new Array();
							var c, b;
							for (c = 0, b = 97; b < 123; c++, b++) {
								d[c] = b
							}
							for (c = 0; c < d.length; c++) {
								d[c] = String.fromCharCode(d[c])
							}
							if (this.options.random) {
								return d.sort(this._RandomSort)
							} else {
								return d
							}
						},
						_getRandomPreChar : function() {
							if (this.options.random) {
								return this.options.preArray
										.sort(this._RandomSort)
							} else {
								return this.options.preArray
							}
						},
						open : function() {
							if (this.isShow) {
								return
							}
							this.options.numArray = this._getRandomNum();
							this.options.charArray = this._getRandomChar();
							this.options.preArray = this._getRandomPreChar();
							var d = this;
							var h = d.options;
							d.kb = a("#pa_ui_keyboard_body");
							if (d.kb.length != 0) {
								d.kb.remove()
							}
							if (h.keyType == "advance") {
								d.kb = a('<div id="pa_ui_keyboard_body" class="pa_ui_keyboard_advance"></div>')
							} else {
								if (h.keyType == "number") {
									d.kb = a('<div id="pa_ui_keyboard_body" class="pa_ui_keyboard_number"></div>')
								} else {
									d.kb = a('<div id="pa_ui_keyboard_body" class="pa_ui_keyboard_body"></div>')
								}
							}
							var c = '<div class="pa_ui_keyboard_caption"><ul>';
							if (h.lang === "cn") {
								c += '<li class="pa_ui_keyboard_close"></li><li class="pa_ui_keyboard_caps"></li></ul></div>'
							} else {
								if (h.lang === "en") {
									c += '<li class="pa_ui_keyboard_close_en"></li><li class="pa_ui_keyboard_caps_en"></li></ul></div>'
								}
							}
							c += '<div class="pa_ui_keyboard_content"><ul>';
							if (h.keyType == "number") {
								for (i = 0; i < 10; i++) {
									c += '<li class="pa_ui_keyboard_key">'
											+ h.numArray[i] + "</li>"
								}
								if (h.lang === "cn") {
									c += '<li class="pa_ui_keyboard_cancle"></li>';
									c += '<li class="pa_ui_keyboard_ok"></li>'
								} else {
									if (h.lang === "en") {
										c += '<li class="pa_ui_keyboard_cancle_en"></li>';
										c += '<li class="pa_ui_keyboard_ok_en"></li>'
									}
								}
								c += "</ul></div>"
							} else {
								for (i = 0; i < 10; i++) {
									c += '<li class="pa_ui_keyboard_key">'
											+ h.numArray[i] + "</li>"
								}
								for (i = 0; i < 26; i++) {
									c += '<li class="pa_ui_keyboard_key">'
											+ h.charArray[i] + "</li>"
								}
								if (h.keyType == "advance") {
									for (i = 0; i < h.preArray.length; i++) {
										c += '<li class="pa_ui_keyboard_key">'
												+ h.preArray[i] + "</li>"
									}
								}
								if (h.lang === "cn") {
									c += '<li class="pa_ui_keyboard_ok"></li>';
									c += '<li class="pa_ui_keyboard_cancle"></li>'
								} else {
									if (h.lang === "en") {
										c += '<li class="pa_ui_keyboard_ok_en"></li>';
										c += '<li class="pa_ui_keyboard_cancle_en"></li>'
									}
								}
								c += "</ul></div>"
							}
							if (h.bgiframe === true) {
								d.kb.html(c).objiframe()
							} else {
								d.kb.html(c)
							}
							if (h.lang === "cn") {
								a(".pa_ui_keyboard_close", d.kb).click(
										function(j) {
											d.close();
											d._focusInput()
										});
								a(".pa_ui_keyboard_caps", d.kb)
										.click(
												function(j) {
													a
															.each(
																	a(
																			".pa_ui_keyboard_key",
																			d.kb),
																	function(l,
																			m) {
																		var k = m.innerHTML
																				.charCodeAt(0);
																		if (k > 96
																				&& k < 123) {
																			m.innerHTML = m.innerHTML
																					.toUpperCase()
																		} else {
																			if (k > 64
																					&& k < 91) {
																				m.innerHTML = m.innerHTML
																						.toLowerCase()
																			}
																		}
																	})
												})
							} else {
								if (h.lang === "en") {
									a(".pa_ui_keyboard_close_en", d.kb).click(
											function(j) {
												d.close();
												d._focusInput()
											});
									a(".pa_ui_keyboard_caps_en", d.kb)
											.click(
													function(j) {
														a
																.each(
																		a(
																				".pa_ui_keyboard_key",
																				d.kb),
																		function(
																				l,
																				m) {
																			var k = m.innerHTML
																					.charCodeAt(0);
																			if (k > 96
																					&& k < 123) {
																				m.innerHTML = m.innerHTML
																						.toUpperCase()
																			} else {
																				if (k > 64
																						&& k < 91) {
																					m.innerHTML = m.innerHTML
																							.toLowerCase()
																				}
																			}
																		})
													})
								}
							}
							a("li", d.kb)
									.mouseover(
											function() {
												if (!a(this)
														.hasClass(
																"pa_ui_keyboard_cancle_en")
														&& !a(this)
																.hasClass(
																		"pa_ui_keyboard_ok_en")
														&& !a(this)
																.hasClass(
																		"pa_ui_keyboard_caps_en")
														&& !a(this)
																.hasClass(
																		"pa_ui_keyboard_close_en")) {
													a(this)
															.removeClass(
																	"pa_ui_keyboard_key")
															.addClass(
																	"pa_ui_keyboard_mouseover")
												}
											})
									.mouseout(
											function() {
												if (!a(this)
														.hasClass(
																"pa_ui_keyboard_cancle_en")
														&& !a(this)
																.hasClass(
																		"pa_ui_keyboard_ok_en")
														&& !a(this)
																.hasClass(
																		"pa_ui_keyboard_caps_en")
														&& !a(this)
																.hasClass(
																		"pa_ui_keyboard_close_en")) {
													a(this)
															.removeClass(
																	"pa_ui_keyboard_mouseover")
															.addClass(
																	"pa_ui_keyboard_key")
												}
											})
									.click(
											function(k) {
												if (a(this)
														.hasClass(
																"pa_ui_keyboard_cancle")
														|| a(this)
																.hasClass(
																		"pa_ui_keyboard_cancle_en")) {
													if (d.element.val().length > 0) {
														var m = d.element.val().length;
														d.element.val(d.element
																.val()
																.substring(0,
																		m - 1));
														d._trigger("delete",
																null, null)
													}
												} else {
													if (a(this)
															.hasClass(
																	"pa_ui_keyboard_ok")
															|| a(this)
																	.hasClass(
																			"pa_ui_keyboard_ok_en")) {
														d.close();
														d._focusInput()
													} else {
														var l = d.element
																.attr("maxlength");
														if ((l > 0 && l < 200000)
																&& d.element
																		.val().length >= l) {
														} else {
															var j = this.innerHTML;
															if (j == "&amp;") {
																j = "&"
															}
															if (j == "&lt;") {
																j = "<"
															}
															if (j == "&gt;") {
																j = ">"
															}
															if (j == "&nbsp;") {
																j = " "
															}
															d.element
																	.val(d.element
																			.val()
																			+ j);
															d.element.focus();
															d._trigger("click",
																	null, null)
														}
													}
												}
											});
							if (h.position) {
								a("#" + h.position).append(d.kb[0])
							} else {
								d.element.after(d.kb[0]);
								var g = d.element.offset();
								var f = g.left + h.offset.left;
								var b = d.element.outerHeight();
								var e = g.top + b + h.offset.top;
								d.kb.css({
									left : f + "px",
									top : e + "px",
									position : "absolute",
									zIndex : "1000"
								})
							}
							d.element.attr("disabled", "disabled");
							d.isShow = true;
							d._trigger("open", null, null)
						},
						close : function() {
							var c = this;
							if (c.kb && c.kb.length > 0) {
								c.kb.remove()
							}
							c.element.removeAttr("disabled");
							c.isShow = false;
							c._trigger("close", null, null);
							var b = c.element.data("passwordstrength");
							if (b) {
								a(c.element).passwordstrength("check")
							}
						},
						_buildKeyboard : function() {
							var b = this;
							if (this.options.trigger == 1
									|| this.options.trigger == 3) {
								this.element.bind(this.options.event
										+ ".keyboard", function() {
									b.open()
								})
							}
							if (this.options.trigger == 2
									|| this.options.trigger == 3) {
								b.trigger = a(this.options.triggerHandle)
										.addClass(this.options.triggerClass)
										.bind("click.keyboard", function(c) {
											b.open()
										});
								this.element.after(b.trigger)
							}
							a(document)
									.bind(
											"click.keyboard",
											function(c) {
												if (a(c.target).parents(
														"#pa_ui_keyboard_body").length == 0
														&& !a(c.target)
																.hasClass(
																		b.options.contentClass)
														&& !a(c.target)
																.hasClass(
																		b.options.triggerClass)
														&& a(c.target).attr(
																"id") != "pa_ui_keyboard_body"
														&& c.target != b.element[0]) {
													if (b.kb != null && b.kb[0]
															&& b.isShow) {
														b.close();
														if (b.options.focusOnClose) {
															b._focusInput()
														} else {
															b.element.blur()
														}
													}
												}
											})
						},
						_focusInput : function() {
							if (a.browser.msie) {
								var b = this.element[0].createTextRange();
								b.collapse(false);
								b.select()
							} else {
								this.element[0].focus()
							}
						}
					});
	a
			.extend(
					a.ui.keyboard,
					{
						defaults : {
							lang : "cn",
							event : "click",
							keyType : "normal",
							bgiframe : false,
							random : true,
							trigger : 3,
							focusOnClose : false,
							triggerHandle : '<button type="button" />',
							triggerClass : "pa_ui_keyboard_click",
							captionClass : "pa_ui_keyboard_caption",
							bodyClass : "pa_ui_keyboard_body",
							advanceClass : "pa_ui_keyboard_advance",
							contentClass : "pa_ui_keyboard_content",
							keyClass : "pa_ui_keyboard_key",
							mouseoverClass : "pa_ui_keyboard_mouseover",
							position : "",
							offset : {
								top : 0,
								left : 0
							},
							preArray : [ "~", "!", "@", "#", "$", "%", "^",
									"&", "*", "(", ")", "_", "+", "|", "-",
									"`", "[", "]", "<", ">", "?", "=", "\\",
									"{", "}", "'", ",", ".", "/", ":", '"',
									";", "&nbsp;" ],
							numArray : [],
							charArray : []
						},
						load : function() {
							a("[pa_ui_name*=keyboard]")
									.each(
											function() {
												a.pa_ui.widget.init(this);
												var b = {}, c;
												c = a(this).attr(
														"pa_ui_keyboard_type")
														|| a(this)
																.attr(
																		"pa_ui_key_type");
												if (c) {
													b.keyType = c
												}
												c = a(this)
														.attr(
																"pa_ui_keyboard_random")
														|| a(this).attr(
																"pa_ui_random");
												if (c) {
													b.random = (c === "true")
												}
												c = a(this)
														.attr(
																"pa_ui_keyboard_trigger")
														|| a(this)
																.attr(
																		"pa_ui_keyboard_click");
												if (c) {
													b.trigger = parseInt(c, 10)
												}
												c = a(this)
														.attr(
																"pa_ui_keyboard_position");
												if (c) {
													b.position = c
												}
												c = a(this)
														.attr(
																"pa_ui_keyboard_offset");
												if (c) {
													var e = c.split(",");
													var d = {
														left : 0,
														top : 0
													};
													if (e.length > 0) {
														d.left = a.pa_ui.converter
																.toInt(e[0])
													}
													if (e.length > 1) {
														d.top = a.pa_ui.converter
																.toInt(e[1])
													}
													b.offset = d
												}
												c = a(this).attr(
														"pa_ui_keyboard_focus");
												if (c) {
													b.focusOnClose = (c === "true")
												}
												c = a(this)
														.attr(
																"pa_ui_keyboard_bgiframe");
												if (c) {
													b.bgiframe = (c === "true")
												}
												a(this).keyboard(b);
												a.pa_ui.widget.inited(this)
											})
						}
					});
	if (a.pa_ui.lazyLoad) {
		a(document).ready(function() {
			a.ui.keyboard.load()
		})
	} else {
		a.ui.keyboard.load()
	}
})(jQuery);
(function(a) {
	a.fn.objiframe = function(c) {
		if (a.browser.msie) {
			c = a.extend({
				top : "auto",
				left : "auto",
				width : "auto",
				height : "auto",
				opacity : true,
				src : "javascript:false;"
			}, c || {});
			var d = function(e) {
				return e && e.constructor == Number ? e + "px" : e
			}, b = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'
					+ c.src
					+ '"style="display:block;position:absolute;z-index:-1;'
					+ (c.opacity !== false ? "filter:Alpha(Opacity='0');" : "")
					+ "top:"
					+ (c.top == "auto" ? "expression(((parseInt(this.parentNode.currentStyle.borderTopWidth)||0)*-1)+'px')"
							: d(c.top))
					+ ";left:"
					+ (c.left == "auto" ? "expression(((parseInt(this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+'px')"
							: d(c.left))
					+ ";width:"
					+ (c.width == "auto" ? "expression(this.parentNode.offsetWidth+'px')"
							: d(c.width))
					+ ";height:"
					+ (c.height == "auto" ? "expression(this.parentNode.offsetHeight+'px')"
							: d(c.height)) + ';"/>';
			return this.each(function() {
				if (a("> iframe.bgiframe", this).length == 0) {
					this.insertBefore(document.createElement(b),
							this.firstChild)
				}
			})
		}
		return this
	}
})(jQuery);
(function(a) {
	a.widget("ui.validcode", {
		_init : function() {
			var c = this, d = this.options;
			c.element.attr("src", d.image);
			c.element.attr("alt", d.alt);
			var b = a(
					'<a href="#" onclick="javascript:return false;" class="pa_ui_validcode_txt">'
							+ d.text + "</a>").bind(d.event, function() {
				var e = d.image + "?" + a.pa_ui.randomId++;
				c.element.attr("src", e)
			});
			if (d.targetid == "") {
				b.insertAfter(c.element)
			} else {
				b.appendTo(a("#" + d.targetid))
			}
		},
		destroy : function() {
			a.widget.prototype.destroy.apply(this, arguments)
		}
	});
	a
			.extend(
					a.ui.validcode,
					{
						defaults : {
							event : "click",
							image : "",
							text : "",
							alt : "",
							targetid : ""
						},
						loadMe : function() {
							a("#[pa_ui_name*='validcode']")
									.each(
											function(c) {
												a.pa_ui.widget.init(this);
												var e = a(this)
														.attr(
																"pa_ui_validcode_image") ? a(
														this)
														.attr(
																"pa_ui_validcode_image")
														: "";
												var f = a(this).attr(
														"pa_ui_validcode_text") ? a(
														this).attr(
														"pa_ui_validcode_text")
														: "";
												var d = a(this).attr(
														"pa_ui_validcode_alt") ? a(
														this).attr(
														"pa_ui_validcode_alt")
														: "";
												var b = a(this)
														.attr(
																"pa_ui_validcode_target") ? a(
														this)
														.attr(
																"pa_ui_validcode_target")
														: "";
												a(this).validcode({
													image : e,
													text : f,
													alt : d,
													targetid : b
												});
												a.pa_ui.widget.inited(this)
											})
						}
					});
	if (a.pa_ui.lazyLoad) {
		a(document).ready(function() {
			a.ui.validcode.loadMe()
		})
	} else {
		a.ui.validcode.loadMe()
	}
})(jQuery);
(function(a) {
	a
			.widget(
					"ui.tree",
					{
						_init : function() {
							this.originelement = this.element;
							if (this.element[0].tagName.toLowerCase() != "ul") {
								this.element = this.element.find("ul:eq(0)")
							}
							if (this.options.url) {
								this.load("source", this.element[0])
							} else {
								this.treeview()
							}
						},
						destroy : function() {
							a.widget.prototype.destroy.apply(this, arguments)
						},
						load : function(c, f) {
							var b = "", d = this;
							var e = this.options.url;
							a.getJSON(e, {
								root : c
							}, function(g) {
								function h(j) {
									var k = a("<li/>").html(
											"<div>" + this.text + "</div>");
									if (this.hasChildren || this.children
											&& this.children.length) {
										b += "<li><div>" + this.text
												+ "</div><ul>";
										var i = a("<ul/>").appendTo(k);
										if (this.children
												&& this.children.length) {
											a.each(this.children, h, [ i ])
										}
										b += "</ul></li>"
									} else {
										b += "<li>" + this.text + "</li>"
									}
								}
								a.each(g, h, [ f ]);
								d.element.html(b);
								d.treeview()
							})
						},
						prepareBranches : function() {
							if (!this.options.prerendered) {
								this.filter(":last-child:not(ul)").addClass(
										self.options.last);
								this.filter(
										(self.options.collapsed ? "" : "."
												+ this.options.closed)
												+ ":not(."
												+ this.options.open
												+ ")").find(">ul").hide()
							}
							return this.filter(":has(>ul)")
						},
						applyClasses : function(d) {
							var b = this;
							var c = b.options.hover;
							a(d).filter(":has(>ul):not(:has(>a))")
									.find(">span").click(function(e) {
										b.toggler.apply(a(this).next())
									}).add(a("a", this)).hover(function() {
										a(this).addClass(c)
									}, function() {
										a(this).removeClass(c)
									});
							if (!this.options.prerendered) {
								a(d).filter(":has(>ul:hidden)").addClass(
										b.options.expandable).toggleClass(
										b.options.last, false).addClass(
										b.options.lastExpandable).end();
								a(d).not(":has(>ul:hidden)").addClass(
										b.options.collapsable).toggleClass(
										b.options.last, false).addClass(
										b.options.lastCollapsable).end();
								a(d).prepend(
										'<div class="' + b.options.title
												+ '"/>').find(
										"div." + b.options.title).each(
										function() {
											var e = "";
											a.each(a(this).parent().attr(
													"class").split(" "),
													function() {
														e += this + "-title "
													});
											a(d).addClass(e)
										})
							}
							a(d).find("div." + b.options.title)
									.click(b.toggler)
						},
						_expandOne : function(e, d) {
							var c = d;
							var b = d.indexOf(".");
							if (b > 0) {
								c = d.split(".")[0];
								d = d.substring(b + 1)
							}
							a(e[c - 1]).removeClass(this.options.collapse)
									.addClass(this.options.expand);
							a(e[c - 1]).children("ul:first").show();
							if (b > 0) {
								return this._expandOne(a(e[c - 1]).children(
										"ul:first").children("li"), d)
							}
						},
						_initClass : function(c) {
							var b = this;
							var e = this.options;
							var d = a(c).children("li");
							d.each(function() {
								if (a(this).children("ul:first").length > 0) {
									if (e.expandNode == "-1") {
										a(this).removeClass(e.collapse)
												.removeClass("last_level")
												.addClass(e.expand);
										a(this).children("ul:first").show()
									} else {
										a(this).removeClass(e.expand)
												.removeClass("last_level")
												.addClass(e.collapse);
										a(this).children("ul:first").hide()
									}
									a(this).children("div:first").addClass(
											e.title);
									if (a(this).children("ul:first").children(
											"li").children("div").length > 0) {
										return b._initClass(a(this).children(
												"ul:first"))
									}
								} else {
									a(this).removeClass(e.expand).removeClass(
											e.collapse).addClass("last_level")
								}
							});
							if (e.expandNode != "-1" && e.expandNode != "0") {
								this._expandOne(tobj, e.expandNode)
							}
						},
						treeview : function() {
							var d = this.element[0], c = this;
							o = this.options;
							c.element.find("li").each(
									function() {
										a(this).removeClass(o.expand)
												.removeClass(o.collapse)
												.addClass("last_level")
									});
							this._initClass(d);
							if (o.add) {
								return d.trigger("add", [ o.add ])
							}
							if (o.toggle) {
								var e = o.toggle;
								o.toggle = function() {
									return e.apply(a(this).parent()[0],
											arguments)
								}
							}
							a(d).addClass("treeview");
							var b = a(d).find("li").tree("prepareBranches");
							this.applyClasses(b);
							if (o.control) {
								c.options.treeController(this, o.control);
								a(o.control).show()
							}
							return a(o)
									.bind(
											"add",
											function(g, f) {
												a(f)
														.prev()
														.removeClass(
																this.options.last)
														.removeClass(
																this.options.lastCollapsable)
														.removeClass(
																this.options.lastExpandable)
														.find(">.title")
														.removeClass(
																this.options.lastCollapsableHitarea)
														.removeClass(
																this.options.lastExpandableHitarea);
												this.applyClasses(a(f).find(
														"li").andSelf().tree(
														"prepareBranches"))
											})
						},
						toggler : function() {
							var b = a(this).parent().find(".title").parent(
									"li:first");
							if (a(b).hasClass("expand")) {
								a(b).removeClass("expand").addClass("collapse")
							} else {
								a(b).removeClass("collapse").addClass("expand")
							}
							a(
									a(this).parent().find(">.title").parent()
											.find(">ul")).each(function() {
								a(this).toggle()
							})
						}
					});
	a.extend(a.ui.tree, {
		defaults : {
			event : "click",
			cookieId : "",
			add : "",
			url : "",
			toggle : "",
			collapsed : true,
			prerendered : true,
			persist : "location",
			expandNode : "0",
			expand : "expand",
			collapse : "collapse",
			title : "title",
			hover : "hover",
			open : "open",
			closed : "closed",
			url : "",
			expandable : "expandable",
			expandableHitarea : "expandable-title",
			lastExpandableHitarea : "lastExpandable-title",
			collapsable : "collapsable",
			collapsableHitarea : "collapsable-title",
			lastCollapsableHitarea : "lastCollapsable-title",
			lastCollapsable : "lastCollapsable",
			lastExpandable : "lastExpandable",
			last : "last"
		},
		loadMe : function() {
			a("[pa_ui_name*=tree]").each(
					function(c) {
						a.pa_ui.widget.init(this);
						var b = {}, d;
						d = a(this).attr("pa_ui_tree_dataurl");
						if (d) {
							b.url = d
						}
						d = a(this).attr("pa_ui_tree_expandnode")
								|| a(this).attr("pa_ui_tree_style");
						if (d) {
							b.expandNode = d
						}
						a(this).tree(b);
						a.pa_ui.widget.inited(this)
					})
		}
	});
	if (a.pa_ui.lazyLoad) {
		a(document).ready(function() {
			a.ui.tree.loadMe()
		})
	} else {
		a.ui.tree.loadMe()
	}
})(jQuery);
(function(a) {
	a.widget("ui.radio", {
		_init : function() {
			var b = this, e = this.options;
			var d = this.element.attr("name");
			var c = this.label = a(":radio[name='" + d + "']").parent();
			c.each(function(f) {
				var l = a(this).text();
				var k = e;
				var i = d;
				var h = a(this).children(":radio");
				var j = a(h).attr("value");
				var g = k.cssItem;
				if (a(h).attr("checked") == true) {
					a(":radio[name='" + d + "']").get(f).checked == true;
					g = k.cssSelect
				}
				a('<button name="' + f + '" title="' + l + '"></button>').wrap(
						"<span></span>").wrap("<span></span>").html(l)
						.addClass(k.cssButton).addClass(g).insertBefore(
								a(b.element[0]).parent("label")).click(
								function(m) {
									a(":radio[name='" + d + "']").attr(
											"checked", "");
									a(h).attr("checked", "true");
									a(this).parent()
											.children("." + k.cssSelect)
											.removeClass(k.cssSelect).addClass(
													k.cssItem);
									a(this).removeClass(k.cssItem).addClass(
											k.cssSelect);
									m.preventDefault()
								}).hover(
								function() {
									a(this).toggleClass(k.cssItem, false)
											.addClass(k.cssHover)
								},
								function() {
									a(this).toggleClass(k.cssHover, false)
											.addClass(k.cssItem)
								});
				a(this).hide()
			})
		},
		destroy : function() {
			var b = this, c = this.options;
			this.label.show();
			this.element.parent().prevAll("button").each(function() {
				if (a(this).hasClass(c.cssButton)) {
					a(this).remove("button")
				}
			})
		}
	});
	a.extend(a.ui.radio, {
		defaults : {
			cssButton : "pa_ui_radio_button",
			cssItem : "pa_ui_radio_item",
			cssSelect : "pa_ui_radio_select",
			cssHover : "pa_ui_radio_hover"
		},
		load : function() {
			a("#[pa_ui_name='radio']").each(function(b) {
				a.pa_ui.widget.init(this);
				a(this).radio();
				a.pa_ui.widget.inited(this)
			})
		}
	});
	if (a.pa_ui.lazyLoad) {
		a(document).ready(function() {
			a.ui.radio.load()
		})
	} else {
		a.ui.radio.load()
	}
})(jQuery);
(function(a) {
	a
			.widget(
					"ui.radiobutton",
					{
						_init : function() {
							var b = this;
							this.elementName = this.element.attr("name");
							this._initFromRadio()
						},
						_initFromRadio : function() {
							var c = this;
							this.elements = a([]);
							if (this.element[0].form) {
								this.elements = a(":radio[name="
										+ this.elementName + "]",
										this.element[0].form)
							} else {
								this.elements = a(":radio[name="
										+ this.elementName + "]")
							}
							if (this.elements[0] != this.element[0]) {
								return
							}
							this.buttons = a([]);
							var b = c.element.parent().is("label") ? c.element
									.parent() : c.element();
							this.elements
									.each(function(d) {
										var h = a(this);
										var j = h.parent().is("label") ? h
												.parent().text() : h.val();
										var i = h.val();
										var e = c.options.cssItem;
										if (h.attr("checked")) {
											e = c.options.cssSelect
										}
										var f = a(
												'<button type="button"></button>')
												.html(j);
										var g = a("<span></span>")
												.append(f)
												.wrapInner("<span></span>")
												.addClass(e)
												.click(
														function(k) {
															var l = this;
															c.buttons
																	.each(function(
																			m,
																			n) {
																		if (n[0] != l) {
																			n
																					.removeClass(
																							c.options.cssSelect)
																					.addClass(
																							c.options.cssItem)
																		}
																	});
															a(this)
																	.toggleClass(
																			c.options.cssItem)
																	.toggleClass(
																			c.options.cssSelect);
															a(this)
																	.hasClass(
																			c.options.cssSelect) ? h
																	.attr(
																			"checked",
																			"checked")
																	: h
																			.removeAttr("checked")
														})
												.hover(
														function() {
															a(this)
																	.addClass(
																			c.options.cssHover)
														},
														function() {
															a(this)
																	.removeClass(
																			c.options.cssHover)
														}).insertBefore(b);
										c.buttons.push(g);
										h.parent().is("label") ? h.parent()
												.hide() : h.hide()
									})
						},
						_initFromSelect : function() {
						},
						destroy : function() {
							this.buttons.remove()
						}
					});
	a.extend(a.ui.radiobutton, {
		defaults : {
			cssItem : "pa_ui_radiobutton_item",
			cssSelect : "pa_ui_radiobutton_select",
			cssHover : "pa_ui_radiobutton_hover"
		},
		load : function() {
			a("#[pa_ui_name='radiobutton']").each(function(b) {
				a.pa_ui.widget.init(this);
				a(this).radiobutton();
				a.pa_ui.widget.inited(this)
			})
		}
	});
	if (a.pa_ui.lazyLoad) {
		a(document).ready(function() {
			a.ui.radiobutton.load()
		})
	} else {
		a.ui.radiobutton.load()
	}
})(jQuery);
(function(a) {
	a.widget("ui.checkbox", {
		_init : function() {
			var b = this, e = this.options;
			var d = a(this.element[0]).attr("name");
			var c = a(":checkbox[name='" + d + "']").parent();
			c.each(function(f) {
				var l = a(this).text();
				var k = e;
				var i = d;
				var j = a(a(this).children(":checkbox")).attr("value");
				var g = k.cssItem;
				if (a(a(this).children(":checkbox")).attr("checked") == true) {
					var h = a(this).children(":checkbox");
					g = k.cssCheckItem;
					a(
							'<button name="' + f + '" title="' + l + '">' + l
									+ "</button>").addClass(g).insertAfter(
							a(this)).toggle(function() {
						a(h).attr("checked", "");
						a(this).removeClass(k.cssCheckItem).addClass(k.cssItem)
					}, function() {
						a(h).attr("checked", "true");
						a(this).removeClass(k.cssItem).addClass(k.cssCheckItem)
					}).hover(
							function() {
								a(this).toggleClass(k.cssItem, false).addClass(
										k.cssHoverItem)
							},
							function() {
								a(this).toggleClass(k.cssHoverItem, false)
										.addClass(k.cssItem)
							})
				} else {
					var h = a(this).children(":checkbox");
					a(
							'<button name="' + f + '" title="' + l + '">' + l
									+ "</button>").addClass(g).insertAfter(
							a(this)).toggle(function() {
						a(h).attr("checked", "true");
						a(this).removeClass(k.cssItem).addClass(k.cssCheckItem)
					}, function() {
						a(h).attr("checked", "");
						a(this).removeClass(k.cssCheckItem).addClass(k.cssItem)
					}).hover(
							function() {
								a(this).toggleClass(k.cssItem, false).addClass(
										k.cssHoverItem)
							},
							function() {
								a(this).toggleClass(k.cssHoverItem, false)
										.addClass(k.cssItem)
							})
				}
				a(this).hide()
			})
		}
	});
	a.extend(a.ui.checkbox, {
		defaults : {
			cssItem : "pa_ui_checkbox_item",
			cssCheckItem : "pa_ui_checkbox_select",
			cssHoverItem : "pa_ui_checkbox_hover"
		},
		load : function() {
			a("[pa_ui_name*=checkbox]").each(function(b) {
				a.pa_ui.widget.init(this);
				a(this).checkbox();
				a.pa_ui.widget.inited(this)
			})
		}
	});
	if (a.pa_ui.lazyLoad) {
		a(document).ready(function() {
			a.ui.checkbox.load()
		})
	} else {
		a.ui.checkbox.load()
	}
})(jQuery);
(function(a) {
	a
			.widget(
					"ui.dropselect",
					{
						version : "3.0",
						build : "2013.0304.1521",
						_init : function() {
							if (this.element
									.hasClass("pa_ui_dropselect_dropped")) {
								return this
							}
							var d = this, g = this.options;
							this.liList = new Array();
							this.liList1 = new Array();
							this.liList2 = new Array();
							this.isShow = false;
							this.selectValue = d.element.val();
							this.selectText = this
									._selectText(this.selectValue);
							this.offsetSaved = d.element.offset();
							this.heightSaved = d.element.outerHeight();
							this.otitleValue = d.element.attr("otitle");
							var c = this.element.height();
							if (c) {
							}
							this.input = a(
									'<input type="text" class="pa_ui_dropselect_input"/>')
									.val(this.selectText).attr("readonly",
											"true").hide();
							var b = this.input;
							if (this.options.canInput) {
								this.input.attr("readonly", "false")
										.removeAttr("readonly")
							}
							if (this.options.trigger == 1) {
								this.input
										.bind(
												"click",
												function(h) {
													if (a.ui.dropselect.currentOpen
															&& a.ui.dropselect.currentOpen != d.element[0]) {
														a(
																a.ui.dropselect.currentOpen)
																.dropselect(
																		"close")
													}
												})
							}
							if (this.options.trigger == 2) {
								this.input.bind("click", function(h) {
									d._trigger("drop", h, null);
									d.change();
									d._clickButton();
									if (g.searchable) {
										this.select()
									}
								})
							}
							this.button = a(
									'<button type="button" class="pa_ui_dropselect_button"></button>')
									.hide().bind("click", function(h) {
										d._trigger("drop", h, null);
										d.change();
										d._clickButton()
									});
							if (this.otitleValue != "") {
								this.input.attr("otitle", this.otitleValue);
								this.button.attr("otitle", this.otitleValue)
							}
							if (this.element.attr("disabled")) {
								this.input
										.removeClass("pa_ui_dropselect_input")
										.addClass(
												"pa_ui_dropselect_disabled_input");
								this.button.removeClass(
										"pa_ui_dropselect_button").addClass(
										"pa_ui_dropselect_disabled_button")
							}
							this.popselect = a("<div></div>").addClass(
									"pa_ui_dropselect_popup").addClass(
									d.options.appendClass).width(
									d.input.outerWidth()
											+ d.button.outerWidth()).append(
									this._getHtml()).hide();
							this._buildPopup();
							a(document)
									.bind(
											"keydown.dropselect",
											function(k) {
												var m = a(d.popselect).css(
														"display");
												var h = "."
														+ d.options.cssSelectItem;
												var j = "";
												if (m == "block") {
													if (window.event) {
														k = window.event
													}
													var l = k.charCode
															|| k.keyCode;
													if (l == 38) {
														if (a(d.popselect)
																.find(h).prev()
																.size() > 0) {
															a(d.popselect)
																	.find(h)
																	.addClass(
																			d.options.cssItem)
																	.removeClass(
																			d.options.cssSelectItem)
																	.prev()
																	.addClass(
																			d.options.cssSelectItem);
															j = a(d.popselect)
																	.find(h)
																	.attr("v");
															d.input
																	.val(d
																			._selectText(j));
															d.element.val(j);
															d.options.eventchange
																	&& d.element
																			.trigger("change")
														}
													} else {
														if (l == 40) {
															if (a(d.popselect)
																	.find(h)
																	.next()
																	.size() > 0) {
																a(d.popselect)
																		.find(h)
																		.addClass(
																				d.options.cssItem)
																		.removeClass(
																				d.options.cssSelectItem)
																		.next()
																		.addClass(
																				d.options.cssSelectItem);
																j = a(
																		d.popselect)
																		.find(h)
																		.attr(
																				"v");
																d.input
																		.val(d
																				._selectText(j));
																d.element
																		.val(j);
																d.options.eventchange
																		&& d.element
																				.trigger("change")
															}
														} else {
															if (l == 13) {
																if (d.isShow) {
																	j = a(
																			d.popselect)
																			.find(
																					h)
																			.attr(
																					"v");
																	d.input
																			.val(d
																					._selectText(j));
																	d.element
																			.val(j);
																	d.element
																			.blur();
																	d.close();
																	d.options.eventchange
																			&& d.element
																					.trigger("change");
																	return false
																}
															}
														}
													}
												}
											});
							d.element
									.hide()
									.after(this.popselect)
									.after(this.button)
									.after(this.input)
									.addClass("pa_ui_dropselect_dropped")
									.bind(
											"casselectchange",
											function() {
												d.input.val(d
														._selectText(d.element
																.val()))
											})
									.bind(
											"propertychange",
											function() {
												d.input.val(d
														._selectText(d.element
																.val()));
												if (d.element.attr("disabled")) {
													d.element.attr("disabled",
															"");
													d.input
															.removeClass(
																	"pa_ui_dropselect_input")
															.addClass(
																	"pa_ui_dropselect_disabled_input");
													d.button
															.removeClass(
																	"pa_ui_dropselect_button")
															.addClass(
																	"pa_ui_dropselect_disabled_button")
												} else {
													d.element.attr("disabled",
															"");
													d.input
															.removeClass(
																	"pa_ui_dropselect_disabled_input")
															.addClass(
																	"pa_ui_dropselect_input");
													d.button
															.removeClass(
																	"pa_ui_dropselect_disabled_button")
															.addClass(
																	"pa_ui_dropselect_button")
												}
											});
							d.input.show();
							d.button.show();
							if (d.element.outerWidth() != 0) {
								this.input.width(d.element.outerWidth()
										- d.button.outerWidth())
							} else {
								if (this.element.css("width") != 0
										&& this.button.css("width") != 0) {
									var e = parseInt(this.element.css("width"),
											10);
									var f = parseInt(this.button.css("width"),
											10);
									if (!isNaN(e)) {
										this.input.width(e - f);
										this.popselect.width(this.element
												.css("width"))
									}
								}
							}
							if (d.element[0].watch) {
								d.element[0].watch("value", function(k, h, j) {
									d.element.val(j);
									d.element.attr("value", j);
									d.input.val(d._selectText(j))
								})
							}
							if (d.element[0].watch) {
								d.element[0]
										.watch(
												"disabled",
												function(k, h, j) {
													if (j) {
														d.element.attr(
																"disabled", "");
														d.input
																.removeClass(
																		"pa_ui_dropselect_input")
																.addClass(
																		"pa_ui_dropselect_disabled_input");
														d.button
																.removeClass(
																		"pa_ui_dropselect_button")
																.addClass(
																		"pa_ui_dropselect_disabled_button")
													} else {
														d.element.attr(
																"disabled",
																"true");
														d.input
																.removeClass(
																		"pa_ui_dropselect_disabled_input")
																.addClass(
																		"pa_ui_dropselect_input");
														d.button
																.removeClass(
																		"pa_ui_dropselect_disabled_button")
																.addClass(
																		"pa_ui_dropselect_button")
													}
												})
							}
							if (this.options.searchable) {
								this._searchable()
							}
							return this
						},
						setValue : function(b) {
							this.input.val(this._selectText(b));
							this.element.val(b);
							this.element.attr("value", b)
						},
						bgiframe : function(f) {
							var d = /MSIE 6.0/ig.test(navigator.appVersion), c = /MSIE 7.0/ig
									.test(navigator.appVersion), b = /MSIE 8.0/ig
									.test(navigator.appVersion);
							if (a.browser.msie && (d || c || b)) {
								f = a.extend({
									top : "auto",
									left : "auto",
									width : "auto",
									height : "auto",
									opacity : true,
									src : "javascript:false;"
								}, f || {});
								var g = function(h) {
									return h && h.constructor == Number ? h
											+ "px" : h
								}, e = '<iframe class="bgiframe"frameborder="0"tabindex="-1"src="'
										+ f.src
										+ '"style="display:block;position:absolute;z-index:-1;'
										+ (f.opacity !== false ? "filter:Alpha(Opacity='0');"
												: "")
										+ "top:"
										+ (f.top == "auto" ? "expression(((parseInt(this.parentNode&&this.parentNode.currentStyle&&this.parentNode.currentStyle.borderTopWidth)||0)*-1)+'px')"
												: g(f.top))
										+ ";left:"
										+ (f.left == "auto" ? "expression(((parseInt(this.parentNode&&this.parentNode.currentStyle&&this.parentNode.currentStyle.borderLeftWidth)||0)*-1)+'px')"
												: g(f.left))
										+ ";width:"
										+ (f.width == "auto" ? "expression(this.parentNode.offsetWidth+'px')"
												: g(f.width))
										+ ";height:"
										+ (f.height == "auto" ? "expression(this.parentNode.offsetHeight+'px')"
												: g(f.height)) + ';"/>';
								this.popselect
										.each(function() {
											if (a("> iframe.bgiframe", this).length == 0) {
												this.insertBefore(document
														.createElement(e),
														this.firstChild)
											}
										})
							}
						},
						setDisabled : function(b) {
							if (b == "true") {
								this.element.attr("disabled", "true");
								this.input
										.removeClass("pa_ui_dropselect_input")
										.addClass(
												"pa_ui_dropselect_disabled_input")
										.attr("disabled", "true");
								this.button.removeClass(
										"pa_ui_dropselect_button").addClass(
										"pa_ui_dropselect_disabled_button")
										.attr("disabled", "true")
							} else {
								this.element.attr("disabled", "");
								this.input
										.addClass("pa_ui_dropselect_input")
										.removeClass(
												"pa_ui_dropselect_disabled_input")
										.attr("disabled", "");
								this.button
										.addClass("pa_ui_dropselect_button")
										.removeClass(
												"pa_ui_dropselect_disabled_button")
										.attr("disabled", "")
							}
						},
						change : function() {
							var b = this;
							this.popselect.empty().addClass(
									"pa_ui_dropselect_popup").width(
									b.element.outerWidth())
									.append(b._getHtml());
							this._buildPopup();
							return b
						},
						close : function() {
							this.popselect.hide();
							this.button.removeClass(this.options.cssSelecting);
							this.input.removeClass(this.options.cssSelecting);
							this.popselect
									.removeClass(this.options.cssSelecting);
							this._trigger("undrop", null, null);
							this.isShow = false;
							if (a.ui.dropselect.currentOpen == this.element[0]) {
								a.ui.dropselect.currentOpen = this.element[0]
							}
						},
						_clickExternal : function(c) {
							var b = a(c.target);
							if (b.hasClass("pa_ui_dropselect_input")
									|| b.hasClass("pa_ui_dropselect_button")) {
							} else {
								this.close()
							}
						},
						timeout : null,
						_searchable : function() {
							var b = this;
							if (!this.options.canInput
									&& !this.options.trigger == 2) {
								return
							}
							this.input.bind("keyup.dropselect", function(c) {
								if (b.options.suggest) {
									b._suggest(c)
								} else {
									b._search(c)
								}
							})
						},
						_suggest : function(d) {
							var b = this;
							var c = d || window.event;
							var e = c.keyCode;
							if ((e >= 65 && e <= 90) || (e >= 48 && e <= 57)
									|| (e >= 96 && e <= 105) || e == 46
									|| e == 8 || e == 32) {
								clearTimeout(b.timeSearch);
								b.timeSearch = setTimeout(function() {
									b.searchsuggest(null, d)
								}, b.options.searchDelay)
							}
						},
						searchsuggest : function(f, e) {
							var c = this, b = f ? f : a.trim(c.input.val());
							var d = e || window.event;
							var g = d.keyCode;
							clearTimeout(c.timeClose);
							this.input.addClass("pa_ui_dropselect_searching");
							if (b.length >= c.options.minLength) {
								c._searchsuggest(b, e);
								if (g != 8 && this.options.autofill
										&& this.liList.length > 0
										&& c.options.pinyin == false) {
									c._autoFill(b, this.liList[0])
								}
							} else {
								c.close()
							}
						},
						_searchsuggest : function(h, g) {
							var d = this, f = this.options.data, c, b = new Array();
							var e = {};
							b.length = 0;
							a(d.element).children("option").each(
									function(j) {
										if (d.options.pinyin) {
											b[j] = new Array(a(this).text(), a(
													this).attr("value"),
													a(this).attr("pinyin"))
										} else {
											b[j] = new Array(a(this).text(), a(
													this).attr("value"))
										}
									});
							f = b;
							if (a.isArray(f)) {
								c = a.ui.dropselect.localSearch(f, h);
								this.input
										.removeClass("pa_ui_dropselect_searching");
								d._sort(c)
							} else {
								if (d.options.pinyin) {
									c = a.ui.dropselect.pinyinSearch(f, h);
									d.element
											.removeClass("pa_ui_dropselect_searching");
									d._sort(c)
								}
							}
						},
						_sort : function(b) {
							var d = this, c = new Array();
							if (b && b.length > 0) {
								switch (this.options.sort) {
								case 0:
									d._showResult(b);
									break;
								case 1:
									a.each(b, function(g, h) {
										c[g] = h[0] + "_" + h[1]
									});
									c = c.sort(function(h, g) {
										return h.localeCompare(g)
									});
									a.each(c, function(g, h) {
										b[g] = h.split("_")
									});
									d._showResult(b);
									break;
								case 2:
									var e = this.options.hotsorturl;
									if (e) {
										var f = {
											result : b
										};
										a.getJSON(e, f, function(g) {
											b = g;
											d._showResult(b)
										})
									} else {
										d._showResult(b)
									}
									break
								}
							} else {
								d.popselect.empty();
								this.liList.length = 0
							}
						},
						_showResult : function(b) {
							var d = this, c = a.trim(d.input.val());
							a.each(b, function(e, f) {
								d.liList2[e] = f[1]
							});
							a.each(b, function(e, f) {
								b[e] = f[0]
							});
							this.liList = b;
							this.popselect.empty();
							if (b.length > 0) {
								this.popselect.addClass(
										"pa_ui_dropselect_popup").append(
										d._setLi(b));
								this.popselect.find("li").eq(0).addClass(
										d.options.cssSelectItem).removeClass(
										d.options.cssItem);
								this.popselect.find("li").click(
										function(e) {
											d.input.val(a(this).text().replace(
													/(^\s*)|(\s*$)/g, ""));
											d.element.val(a(this).attr("v"));
											d.element.trigger("change");
											d._trigger("select", e, null);
											d.element.blur();
											d.close();
											return false
										});
								if (!this.isShow) {
									this.popselect.show();
									this.isShow = true
								}
							} else {
								d.liList2.length = 0
							}
						},
						_autoFill : function(b, c) {
							this.input.val(c);
							this.input.selection(b.length, b.length + c.length)
						},
						_url : function(c, b) {
							var d = {};
							d[this.element.attr("name") ? this.element
									.attr("name") : "keyword"] = b;
							d = a.extend({}, this.options.otherData, d);
							if (c.indexOf("?") > 0) {
								c = c + "&" + a.param(d)
							} else {
								c = c + "?" + a.param(d)
							}
							return c
						},
						_search : function(e) {
							var c = this;
							var d = e || window.event;
							var f = d.keyCode;
							c.liList.length = 0;
							a(c.element).children("option").each(function(h) {
								c.liList[h] = a(this).text();
								c.liList1[h] = a(this).attr("value")
							});
							if ((f >= 65 && f <= 90) || (f >= 48 && f <= 57)
									|| (f >= 96 && f <= 105) || f == 46
									|| f == 8 || f == 32) {
								var c = this;
								var b = this.input.val();
								var g = new Array();
								g = c._getLi(b);
								this.popselect.empty();
								if (g.length > 0) {
									this.popselect.addClass(
											"pa_ui_dropselect_popup").append(
											c._setLi(g));
									this.popselect.find("li").eq(0).addClass(
											c.options.cssSelectItem)
											.removeClass(c.options.cssItem);
									this.popselect
											.find("li")
											.click(
													function(h) {
														c.input
																.val(a(this)
																		.text()
																		.replace(
																				/(^\s*)|(\s*$)/g,
																				""));
														c.element.val(a(this)
																.attr("v"));
														c.element
																.trigger("change");
														c._trigger("select", h,
																null);
														c.element.blur();
														c.close();
														return false
													});
									if (!this.isShow) {
										this.popselect.show();
										this.isShow = true
									}
								}
							}
						},
						_getLi : function(b) {
							var d = new Array();
							var c = 0;
							for (i = 0; i < this.liList.length; i++) {
								if (this.liList[i].indexOf(b) == 0) {
									d[c] = this.liList[i];
									this.liList2[c] = this.liList1[i];
									c++
								}
							}
							return d
						},
						_setLi : function(c) {
							var b = this;
							var d = '<div class="pa_ui_dropselect_box"><ul>';
							a
									.each(
											c,
											function(g) {
												var e = b.liList2[g];
												var f = c[g];
												d += '<li t="'
														+ f
														+ '" v="'
														+ e
														+ '" class="pa_ui_dropselect_item"><a href="javascript:void(0);" title="'
														+ f
														+ '" class="pa_ui_dropselect_item_link">'
														+ f + "</a></li>"
											});
							d += "</ul></div>";
							return d
						},
						_buildPopup : function() {
							var b = this;
							if (this.options.bgiframe) {
								this.bgiframe()
							}
							this.popselect
									.find("li")
									.click(
											function(d) {
												var e = d.target;
												while (e != this
														&& e.parentNode) {
													e = e.parentNode
												}
												if (a(this)
														.attr(
																"pa_ui_dropselect_selectable") === "false") {
													return false
												} else {
													var c = a(e);
													b.input
															.val(c
																	.text()
																	.replace(
																			/(^\s*)|(\s*$)/g,
																			""));
													b.element.val(c.attr("v"));
													b.element.trigger("change");
													b._trigger("select", d,
															null);
													b.element.blur();
													b.close();
													return false
												}
											});
							a(document).bind("click.dropselect", function(c) {
								b._clickExternal(c)
							});
							if (this.options.resizable) {
								a(".pa_ui_dropselect_box", this.popselect)
										.resizable({
											handles : "s"
										})
							}
						},
						_getHtml : function() {
							var b = this;
							var d = this.element.children("option");
							var c = '<div class="pa_ui_dropselect_box">';
							if (d.length > 0) {
								c += '<ul class="c">';
								a
										.each(
												d,
												function() {
													var f = a(this).attr(
															"value");
													var j = a(this).attr(
															"class")
															+ " "
															+ b.options.cssItem;
													var g = a(this).text();
													var h = a(this)
															.attr(
																	"pa_ui_dropselect_selectable");
													c += '<li t="' + g
															+ '" v="' + f
															+ '" class="' + j
															+ '"';
													if (h) {
														c += ' pa_ui_dropselect_selectable="'
																+ h + '"'
													}
													c += '><a href="javascript:void(0);" title="'
															+ g
															+ '" class="pa_ui_dropselect_item_link">'
															+ g + "</a></li>"
												});
								c += "</ul>"
							}
							c += "</div>";
							var e = false;
							if (e) {
							}
							return c
						},
						_show : function() {
							if (a.ui.dropselect.currentOpen
									&& a.ui.dropselect.currentOpen != this.element[0]) {
								a(a.ui.dropselect.currentOpen).dropselect(
										"close")
							}
							a.ui.dropselect.currentOpen = this.element[0];
							var b = this.input.offset().left, j = this.input
									.offset().top
									+ this.input.outerHeight(), l = this.input
									.position().top
									+ this.input.outerHeight(), f = this.input
									.position().left;
							if (Number(j) > Number(l)) {
								j = l;
								b = f
							}
							this.popselect.css({
								position : "absolute",
								left : b + "px",
								top : j + "px"
							}).css("z-index", a.ui.popup.maxZ++).show();
							var h = this.popselect.children("div")
									.innerHeight(), g = a("ul",
									this.popselect[0]).outerHeight(true);
							if (g < h) {
								this.popselect.children("div").css({
									height : "auto",
									overflow : "hidden"
								})
							}
							var e = this.popselect.outerHeight(), c = document.documentElement.clientHeight
									+ a(document).scrollTop();
							if (((j + e) > c)
									&& ((j - a(document).scrollTop()) > e)) {
								j -= e + this.input.outerHeight()
							}
							this.popselect.css({
								top : j + "px"
							});
							this.isShow = true;
							this.button.addClass(this.options.cssSelecting);
							this.input.addClass(this.options.cssSelecting);
							this.popselect.addClass(this.options.cssSelecting);
							var m = this;
							var d = null;
							this.popselect.find("li").each(
									function() {
										if (a(this).attr("v") == m.element
												.val()) {
											d = this;
											a(this).addClass(
													m.options.cssSelectItem)
													.removeClass(
															m.options.cssItem)
										} else {
										}
									});
							if (d) {
								var j = a(d).position().top;
								var k = a(d).parent().parent().height();
								if (j > k) {
									a(d).parent().parent().scrollTop(j)
								}
							}
						},
						_clickButton : function() {
							if (this.element.attr("disabled")) {
								return
							}
							if (this.isShow) {
								this.close()
							} else {
								this._show()
							}
						},
						_selectText : function(c) {
							var b = false;
							var d = "";
							this.element
									.children("option")
									.each(
											function() {
												if (!b) {
													if (a(this).val() == c) {
														a(this)
																.attr(
																		"pa_ui_dropselect_selectable");
														d = a(this).text();
														b = true
													}
												}
											});
							return d.replace(/(^\s*)|(\s*$)/g, "")
						},
						destroy : function() {
							a.widget.prototype.destroy.apply(this);
							this.element
									.removeClass("pa_ui_dropselect_dropped")
									.show();
							this.input.remove();
							this.button.remove();
							this.popselect.remove()
						}
					});
	a.extend(a.ui.dropselect, {
		defaults : {
			cssSelecting : "pa_ui_dropselect_selecting",
			cssItem : "pa_ui_dropselect_item",
			cssSelectItem : "pa_ui_dropselect_item_select",
			trigger : 2,
			bgiframe : true,
			searchable : false,
			searchDelay : 100,
			resizable : false,
			currentOpen : null,
			suggest : false,
			minLength : 2,
			maxCount : 10,
			pinyin : false,
			autofill : true,
			sort : 1,
			eventchange : false
		},
		pinyinSearch : function(d, c) {
			var b = new Array();
			a.each(d, function(e, f) {
				if (d.indexOf(c) != -1) {
					b.push(e)
				}
			});
			return b
		},
		localSearch : function(c, b) {
			var d = new RegExp(b.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi,
					"\\$1"), "i");
			return a.grep(c, function(e) {
				return d.test(e)
			})
		},
		loadMe : function() {
			a("[pa_ui_name*=dropselect]").each(function() {
				a.pa_ui.widget.init(this);
				var b = {}, c;
				c = a(this).attr("pa_ui_dropselect_trigger");
				if (c) {
					b.trigger = a.pa_ui.converter.toInt(c)
				}
				c = a(this).attr("pa_ui_dropselect_appendclass");
				if (c) {
					b.appendClass = c
				}
				c = a(this).attr("pa_ui_dropselect_resizable");
				if (c) {
					b.resizable = c === "true"
				}
				c = a(this).attr("pa_ui_dropselect_canInput");
				if (c) {
					b.canInput = c === "true"
				}
				c = a(this).attr("pa_ui_dropselect_suggest");
				if (c) {
					b.suggest = c === "true"
				}
				c = a(this).attr("pa_ui_dropselect_minLength");
				if (c) {
					b.minLength = c
				}
				c = a(this).attr("pa_ui_dropselect_pinyin");
				if (c) {
					b.pinyin = c === "true"
				}
				c = a(this).attr("pa_ui_dropselect_searchable");
				if (c) {
					b.searchable = c === "true"
				}
				c = a(this).attr("pa_ui_dropselect_bgiframe");
				if (c) {
					b.bgiframe = c === "true"
				}
				c = a(this).attr("pa_ui_dropselect_eventchange");
				if (c) {
					b.eventchange = c === "true"
				}
				a(this).dropselect(b);
				a.pa_ui.widget.inited(this)
			})
		}
	});
	a.fn.selection = function(c, b) {
		if (c !== undefined) {
			return this.each(function() {
				if (this.createTextRange) {
					var d = this.createTextRange();
					if (b === undefined || c == b) {
						d.move("character", c);
						d.select()
					} else {
						d.collapse(true);
						d.moveStart("character", c);
						d.moveEnd("character", b);
						d.select()
					}
				} else {
					if (this.setSelectionRange) {
						this.setSelectionRange(c, b)
					} else {
						if (this.selectionStart) {
							this.selectionStart = c;
							this.selectionEnd = b
						}
					}
				}
			})
		}
	};
	if (a.pa_ui.lazyLoad) {
		a(document).ready(function() {
			a.ui.dropselect.loadMe()
		})
	} else {
		a.ui.dropselect.loadMe()
	}
})(jQuery);
(function(a) {
	a
			.widget(
					"ui.dropinput",
					{
						version : "3.0",
						build : "2010.1122.1703",
						positionx : "",
						positiony : "",
						classid : "",
						triggerClass : "",
						_init : function() {
							var c = this, e = this.options;
							this.popdiv = a(".pa_ui_dropinput_checkpop");
							this.button = a("<input class='pa_ui_dropinput_button' type='button' />");
							this.popcheckbox = this.element
									.next(".pa_ui_dropinput_checkpop");
							this.popselect = a(
									'<div class="pa_ui_dropinput_checkedlist"></div>')
									.hide();
							this.tempinput = a(
									'<div class="pa_ui_dropinput_checkeinput">\u60a8\u9009\u62e9\u7684\u662f\uff1a</div>')
									.hide();
							if (this.options.refersource != undefined) {
								var b = "#" + this.options.refersource;
								this.element
										.after("<input class='pa_ui_dropinput_button' type='button' />");
								this.element
										.next("input")
										.after(
												"<div class='pa_ui_dropinput_pop'></div>");
								this.element.addClass("pa_ui_dropinput_input");
								this.table = a(b).clone(true).appendTo(
										".pa_ui_dropinput_pop");
								var d = this.table;
								d.removeAttr("id");
								d.hide();
								this.triggerClass = this.element.attr("class");
								if (!this.options.caninput) {
									this.element.attr("readonly", true)
								}
								var c = this;
								a(document).mousedown(function(f) {
									c._clickExternal(f)
								});
								this.element.focus(function(f) {
									c._show(d)
								});
								this.element.next(":button").click(function() {
									c._show(d)
								});
								d.find("tr").not(d.find("tr").eq(0)).click(
										function() {
											var f;
											f = a(this).find("td:first");
											c._setvalue(d, f)
										})
							}
							if (this.options.autocomplete) {
								var c = this;
								this.autocomplete()
							}
							if (this.options.checkbox == "1") {
								var c = this;
								c._checkbox()
							}
							a(document).bind("click.dropinput", function(f) {
								c._close(f)
							})
						},
						_show : function(b) {
							this.positionx = this.element.position().left;
							if (this.element.css("height") == "auto") {
								this.positiony = this.element.position().top + 17
							} else {
								this.positiony = this.element.height()
										+ this.element.position().top
							}
							this._position(b, this.positionx, this.positiony);
							b.show()
						},
						_hide : function(b) {
							b.hide()
						},
						_position : function(c, b, d) {
							c.css({
								position : "absolute"
							});
							c.css("left", b + "px");
							c.css("top", d + "px")
						},
						_clickExternal : function(c) {
							var b = a(c.target);
							if (!(b.attr("tagName") == "TD")
									&& !(b.hasClass(this.triggerClass))) {
								this.table.hide()
							}
						},
						_close : function(c) {
							var b = a(c.target);
							if (b.hasClass("pa_ui_dropinput_input")
									|| b.hasClass("pa_ui_dropinput_button")
									|| b
											.hasClass("pa_ui_dropinput_autocompletepop")
									|| b.parents("div").hasClass(
											"pa_ui_dropinput_checkpop")) {
							} else {
								this.popdiv.hide();
								a(".pa_ui_dropinput_autocompletepop").hide()
							}
						},
						_setvalue : function(d, c) {
							var b = c.text();
							this.element.val(b);
							d.hide()
						},
						_checkbox : function() {
							var b = this;
							var c = this.element;
							c.addClass("pa_ui_dropinput_input").after(b.button);
							if (!b.options.caninput) {
								b.element.attr("readonly", true)
							}
							c
									.click(function() {
										if (a
												.trim(b.popcheckbox
														.css("display")) !== "none") {
											b.popcheckbox.hide()
										} else {
											a("div.pa_ui_dropinput_checkpop")
													.each(function() {
														a(this).hide()
													});
											b._show(b.popcheckbox)
										}
									});
							b.button
									.click(function() {
										if (a
												.trim(b.popcheckbox
														.css("display")) !== "none") {
											b.popcheckbox.hide()
										} else {
											a("div.pa_ui_dropinput_checkpop")
													.each(function() {
														a(this).hide()
													});
											b._show(b.popcheckbox)
										}
									});
							if (b.options.rows) {
								b.button.after(b.popselect);
								b.tempinput.click(function() {
									b._show(b.popcheckbox);
									return false
								});
								b.popcheckbox
										.contents()
										.find(":input")
										.click(
												function() {
													if (b.options.rows) {
														if (a(this).attr(
																"checked") === true) {
															c
																	.val(c
																			.val()
																			+ a(
																					this)
																					.val()
																			+ ";");
															b.popselect
																	.append(
																			"<p>"
																					+ a(
																							this)
																							.val()
																					+ ";</p>")
																	.focus();
															b.popselect.show();
															b.button
																	.before(b.tempinput
																			.show())
														} else {
															c
																	.val(
																			c
																					.val()
																					.replace(
																							a(
																									this)
																									.val()
																									+ ";",
																							""))
																	.focus();
															a(
																	".pa_ui_dropinput_checkedlist")
																	.children(
																			"p:contains('"
																					+ a(
																							this)
																							.val()
																					+ "')")
																	.remove();
															if (!a(
																	".pa_ui_dropinput_checkedlist")
																	.children()
																	.is("p")) {
																b.popselect
																		.hide();
																b.tempinput
																		.hide()
															}
														}
													}
												})
							} else {
								b.popcheckbox
										.contents()
										.find(":input")
										.click(
												function() {
													if (a(this).attr("checked") === true) {
														c
																.val(
																		c.val()
																				+ a(
																						this)
																						.val()
																				+ ";")
																.focus();
														b._show(b.popcheckbox)
													} else {
														c
																.val(
																		c
																				.val()
																				.replace(
																						a(
																								this)
																								.val()
																								+ ";",
																						""))
																.focus();
														b._show(b.popcheckbox)
													}
												})
							}
						},
						rows : function() {
						},
						autocomplete : function(b, e) {
							var d = this;
							var f = this.element;
							f.addClass("pa_ui_dropinput_autocompleteinput");
							var c = a(
									"<div class='pa_ui_dropinput_autocompletepop'></div>")
									.width(f.outerWidth() - 2).hide();
							f.after(c);
							f.bind("focus", function(g) {
								this.select()
							});
							f
									.bind(
											"keyup",
											function(i) {
												hasFocus = 1;
												lastKeyPressCode = i.keyCode;
												var h = f.val();
												var g = encodeURI(encodeURI("ajax/search.jsp?time="
														+ (new Date())
																.getTime()
														+ "&q=" + h));
												c.empty();
												if (h != "") {
													a
															.getJSON(
																	g,
																	function(k) {
																		var j = "<ul>";
																		a
																				.each(
																						k,
																						function(
																								l,
																								m) {
																							j += "<li class='pa_ui_dropinput_autocompleteitem'><a href='' class='pa_ui_dropselect_item_link'>"
																									+ m.text
																									+ "</a></li>";
																							if (l == 5) {
																								return false
																							}
																						});
																		c
																				.html(j
																						+ "</ul>");
																		d
																				._show(c);
																		c
																				.find(
																						"li")
																				.click(
																						function(
																								l) {
																							f
																									.val(
																											a(
																													this)
																													.text())
																									.focus();
																							c
																									.hide();
																							return false
																						})
																				.hover(
																						function() {
																							a(
																									this)
																									.addClass(
																											"pa_ui_dropinput_autocompleteitemhover")
																						},
																						function() {
																							a(
																									this)
																									.removeClass(
																											"pa_ui_dropinput_autocompleteitemhover")
																						})
																	})
												}
											})
						}
					});
	a
			.extend(
					a.ui.dropinput,
					{
						defaults : {
							caninput : false,
							autocomplete : false,
							delay : 400,
							rows : false
						},
						load : function() {
							var b = false;
							if (!b) {
								a("[pa_ui_name*=dropinput]")
										.each(
												function() {
													var c = {};
													var d = a(this);
													if (d
															.attr("pa_ui_dropinput_caninput") === "true") {
														c.caninput = true
													}
													if (d
															.attr("pa_ui_dropinput_refersource")) {
														c.refersource = d
																.attr("pa_ui_dropinput_refersource")
													}
													if (d
															.attr("pa_ui_dropinput_autocomplete") === "true") {
														c.autocomplete = true
													}
													if (d
															.attr("pa_ui_dropinput_autocompletedata")) {
														c.autocomplete_data = d
																.attr("pa_ui_dropinput_autocompletedata")
													}
													if (d
															.attr("pa_ui_dropinput_checkbox")) {
														c.checkbox = d
																.attr("pa_ui_dropinput_checkbox")
													}
													if (d
															.attr("pa_ui_dropinput_checkboxrows") === "true") {
														c.rows = true
													}
													d.dropinput(c);
													a.pa_ui.widget.inited(this)
												})
							}
						}
					});
	if (a.pa_ui.lazyLoad) {
		a(document).ready(function() {
			a.ui.dropinput.load()
		})
	} else {
		a.ui.dropinput.load()
	}
})(jQuery);
(function(a) {
	a.widget("ui.dropbox", {
		_init : function() {
			var b = this, c = this.options;
			this.show = false;
			this.selectValue = b.element.val();
			this.input = a('<input type="text" class="pa_ui_dropbox_input"/>')
					.val(c.text + ":" + this.selectText).width(
							b.element.outerWidth() - 20).attr("readonly",
							"true").bind("click", function() {
						b._clickButton()
					});
			this.button = a('<button class="pa_ui_dropbox_button"></button>')
					.bind("click", function() {
						b._clickButton()
					});
			this.del = a('<input type="text" class="pa_ui_dropbox_del"/>')
					.hide().val("\u64a4\u9500").bind("click", function() {
						b.input.removeClass("pa_ui_dropbox_chcolor");
						b.del.removeClass("pa_ui_dropbox_chcolor");
						b.close;
						b.input.val(c.text + ":\u8bf7\u9009\u62e9");
						b.element.val("0");
						a(this).hide();
						b.button.show()
					});
			this.selectText = this._selectText(this.selectValue);
			this.input.val(c.text + ":" + this.selectText);
			this.offsetSaved = b.element.offset();
			this.heightSaved = b.element.outerHeight();
			b.element.before(this.input).before(this.del).before(this.button)
					.css({
						position : "absolute"
					}).hide().bind(
							"change",
							function() {
								b.input.val(c.text + ":"
										+ b._selectText(b.element.val()))
							});
			this.element.data("data", this._getOptions());
			this.popselect = a("#" + c.displayid).empty().append(
					this._getHtml());
			if (c.expand == "false") {
				this.popselect.hide()
			}
			a(document).bind("click.dropbox", function(d) {
				b._clickExternal(d)
			});
			return this
		},
		close : function() {
			this.show = false;
			this.button.removeClass(this.options.cssSelecting);
			this.input.removeClass(this.options.cssSelecting);
			this.popselect.removeClass(this.options.cssSelecting)
		},
		_clickExternal : function(c) {
			var b = a(c.target);
			if (b.hasClass("pa_ui_dropbox_input")
					|| b.hasClass("pa_ui_dropbox_button")
					|| b.hasClass("pa_ui_dropbox_popselect")) {
			} else {
				this.close()
			}
		},
		_getOptions : function() {
			var b = new Array();
			this.element.children("option").each(function() {
				b.push({
					v : a(this).val(),
					t : a(this).text()
				})
			});
			return b
		},
		_getHtml : function() {
			var d = this.element.data("data");
			if (d == null) {
				this.element.data("data", this._getOptions());
				d = this.element.data("data")
			}
			var c = '<div class="pa_ui_dropbox_box c">';
			if (d.length > 0) {
				c += "<ul>";
				for ( var b in d) {
					c += '<li v="' + d[b].v + '" class="'
							+ this.options.cssItem
							+ '"><a href="" class="pa_ui_dropbox_item_link">'
							+ d[b].t + "</a></li>"
				}
				c += "</ul>"
			}
			c += "</div>";
			return c
		},
		_clickButton : function() {
			a("#" + this.options.displayid).empty().append(this._getHtml());
			a("#" + this.options.displayid).hide();
			a("#" + this.options.displayid).show();
			this.show = true;
			this.button.addClass(this.options.cssSelecting);
			this.input.addClass(this.options.cssSelecting);
			this.popselect.addClass(this.options.cssSelecting);
			var b = this, c = this.options;
			this.popselect.find("li").each(
					function() {
						var d = c;
						a(this).click(function(f) {
							var g = f.target;
							while (g != this && g.parentNode) {
								g = g.parentNode
							}
							var e = a(g);
							b.input.val(d.text + ":" + e.text());
							b.element.val(e.attr("v"));
							b.element.trigger("change");
							b.close();
							a("#" + d.displayid).empty().hide();
							if (e.text().indexOf("\u8bf7\u9009\u62e9") == -1) {
								a(b.del).show();
								a(b.button).hide()
							} else {
								a(b.del).hide();
								a(b.button).show()
							}
							f.stopPropagation();
							return false
						});
						if (a(this).attr("v") == b.element.val()) {
							a(this).addClass(b.options.cssSelectItem)
									.removeClass(b.options.cssItem)
						} else {
						}
					})
		},
		_selectText : function(d) {
			var c = false;
			var e = "";
			var b = this;
			this.element.children("option").each(function() {
				if (!c) {
					if (a(this).val() == d) {
						if (a(this).val() != "0") {
							b.input.addClass("pa_ui_dropbox_chcolor");
							b.del.addClass("pa_ui_dropbox_chcolor")
						} else {
							b.input.removeClass("pa_ui_dropbox_chcolor");
							b.del.removeClass("pa_ui_dropbox_chcolor")
						}
						e = a(this).text();
						c = true
					}
				}
			});
			return e
		},
		destroy : function() {
			a.widget.prototype.destroy.apply(this);
			this.element.attr("style", "").show();
			this.input.remove();
			this.button.remove();
			this.del.remove();
			this.popselect.remove()
		}
	});
	a.extend(a.ui.dropbox, {
		defaults : {
			cssSelecting : "pa_ui_dropbox_selecting",
			cssItem : "pa_ui_dropbox_item",
			cssSelectItem : "pa_ui_dropbox_item_select",
			text : "",
			displayid : "",
			expand : "false"
		},
		load : function() {
			a("[pa_ui_name*=dropbox]").each(
					function(b) {
						a.pa_ui.widget.init(this);
						a(this).dropbox(
								{
									text : a(this).attr("pa_ui_dropbox_text"),
									displayid : a(this)
											.attr("pa_ui_dropbox_id"),
									expand : a(this).attr(
											"pa_ui_dropbox_expand") ? a(this)
											.attr("pa_ui_dropbox_expand")
											: "false"
								});
						a.pa_ui.widget.inited(this)
					})
		}
	});
	if (a.pa_ui.lazyLoad) {
		a(document).ready(function() {
			a.ui.dropbox.load()
		})
	} else {
		a.ui.dropbox.load()
	}
})(jQuery);
(function(a) {
	a.widget("ui.casselect", {
		_init : function() {
			this.options.id = this.element[0].id ? this.element[0].id : "";
			this._bind()
		},
		_bind : function() {
			var b = this, c = this.options;
			if (c.id == c.parentId) {
				var c = this.options;
				a.getJSON(c.data,
						function(e) {
							var d = a("#" + c.id);
							d.empty();
							if (b.options.appendItem
									&& b.options.appendItem.length > 1) {
								a(
										'<option value="'
												+ b.options.appendItem[0]
												+ '">'
												+ b.options.appendItem[1]
												+ "</option>").appendTo(d)
							}
							a(e).each(
									function(f) {
										var g = "";
										if (this.parentid == -1) {
											a(
													'<option value="' + this.id
															+ '" ' + g + ">"
															+ this.text
															+ "</option>")
													.appendTo(d)
										}
									});
							b._trigger("change", null, null)
						})
			} else {
				a("#" + c.parentId).change(function() {
					var d = a(this).attr("value");
					return b._find(d)
				})
			}
		},
		_find : function(c) {
			var b = this;
			var d = this.options;
			if (d.xml != "") {
				a.ajax({
					type : "GET",
					url : d.xml,
					dataType : "xml",
					success : function(e) {
						a(e).find("category").each(function() {
							var f = a(this).find("name").text()
						})
					}
				})
			} else {
				if (d.ajax != "") {
					a.getJSON(d.ajax, {
						value : c
					}, function(f) {
						var e = a("#" + d.id);
						e[0].options.length = 0;
						if (b.options.appendItem
								&& b.options.appendItem.length > 1) {
							a(
									'<option value="' + b.options.appendItem[0]
											+ '">' + b.options.appendItem[1]
											+ "</option>").appendTo(e)
						}
						a(f).each(function(g) {
							e[0].options.add(new Option(this.text, this.id))
						});
						e.change()
					});
					b._trigger("change", null, null)
				} else {
					a.getJSON(d.data, function(g) {
						var f = a("#" + d.id);
						var e = c;
						f[0].options.length = 0;
						if (b.options.appendItem
								&& b.options.appendItem.length > 1) {
							a(
									'<option value="' + b.options.appendItem[0]
											+ '">' + b.options.appendItem[1]
											+ "</option>").appendTo(f)
						}
						a(g).each(
								function(h) {
									if (this.parentid == e) {
										f[0].options.add(new Option(this.text,
												this.id))
									}
								});
						f.change();
						b._trigger("change", null, null)
					})
				}
			}
		}
	});
	a
			.extend(
					a.ui.casselect,
					{
						defaults : {
							parentId : "",
							ajax : "",
							xml : "",
							data : ""
						},
						load : function() {
							a("[pa_ui_name*=casselect]")
									.each(
											function(c) {
												a.pa_ui.widget.init(this);
												var f = a(this)
														.attr(
																"pa_ui_casselect_parent") ? a(
														this)
														.attr(
																"pa_ui_casselect_parent")
														: "";
												var e = a(this).attr(
														"pa_ui_casselect_data") ? a(
														this).attr(
														"pa_ui_casselect_data")
														: "";
												var b = a(this).attr(
														"pa_ui_casselect_xml") ? a(
														this).attr(
														"pa_ui_casselect_xml")
														: "";
												var d = a(this).attr(
														"pa_ui_casselect_ajax") ? a(
														this).attr(
														"pa_ui_casselect_ajax")
														: "";
												a(this).casselect({
													parentId : f,
													data : e,
													xml : b,
													ajax : d
												});
												a.pa_ui.widget.inited(this)
											})
						}
					});
	if (a.pa_ui.lazyLoad) {
		a(document).ready(function() {
			a.ui.casselect.load()
		})
	} else {
		a.ui.casselect.load()
	}
})(jQuery);
(function($) {
	$
			.widget(
					"ui.stars",
					{
						_init : function() {
							var self = this, o = this.options, id = 0;
							o.isSelect = o.inputType == "select";
							this.$form = $(this.element).closest("form");
							this.$selec = o.isSelect ? $("select", this.element)
									: null;
							this.$rboxs = o.isSelect ? $("option", this.$selec)
									: $(":radio", this.element);
							this.$stars = this.$rboxs
									.map(function(i) {
										var el = {
											value : this.value,
											title : (o.isSelect ? this.text
													: this.title)
													|| this.value,
											isDefault : (o.isSelect && this.defaultSelected)
													|| this.defaultChecked
										};
										if (i == 0) {
											o.split = typeof o.split != "number" ? 0
													: o.split;
											o.val2id = [];
											o.id2val = [];
											o.id2title = [];
											o.name = o.isSelect ? self.$selec
													.get(0).name : this.name;
											o.disabled = o.disabled
													|| (o.isSelect ? $(
															self.$selec).attr(
															"disabled") : $(
															this).attr(
															"disabled"))
										}
										if (el.value == o.cancelValue) {
											o.cancelTitle = el.title;
											return null
										}
										o.val2id[el.value] = id;
										o.id2val[id] = el.value;
										o.id2title[id] = el.title;
										if (el.isDefault) {
											o.checked = id;
											o.value = o.defaultValue = el.value;
											o.title = el.title
										}
										var $s = $("<div/>").addClass(
												o.starClass);
										var $a = $("<a/>").attr("title",
												o.showTitles ? el.title : "")
												.text(el.value);
										if (o.split) {
											var oddeven = (id % o.split);
											var stwidth = Math
													.floor(o.starWidth
															/ o.split);
											$s.width(stwidth);
											$a.css("margin-left", "-"
													+ (oddeven * stwidth)
													+ "px")
										}
										id++;
										return $s.append($a).get(0)
									});
							o.items = id;
							o.isSelect ? this.$selec.remove() : this.$rboxs
									.remove();
							this.$cancel = $("<div/>")
									.addClass(o.cancelClass)
									.append(
											$("<a/>")
													.attr(
															"title",
															o.showTitles ? o.cancelTitle
																	: "").text(
															o.cancelValue));
							o.cancelShow &= !o.disabled && !o.oneVoteOnly;
							o.cancelShow && this.element.append(this.$cancel);
							this.element.append(this.$stars);
							if (o.checked === undefined) {
								o.checked = -1;
								o.value = o.defaultValue = o.cancelValue;
								o.title = ""
							}
							this.$value = $('<input type="hidden" name="'
									+ o.name + '" value="' + o.value + '" />');
							this.element.append(this.$value);
							this.$stars.bind("click.stars", function(e) {
								if (!o.forceSelect && o.disabled) {
									return false
								}
								var i = self.$stars.index(this);
								o.checked = i;
								o.value = o.id2val[i];
								o.title = o.id2title[i];
								self.$value.attr({
									disabled : o.disabled ? "disabled" : "",
									value : o.value
								});
								fillTo(i, false);
								self._disableCancel();
								!o.forceSelect && self.callback(e, "star")
							}).bind("mouseover.stars", function() {
								if (o.disabled) {
									return false
								}
								var i = self.$stars.index(this);
								fillTo(i, true)
							}).bind("mouseout.stars", function() {
								if (o.disabled) {
									return false
								}
								fillTo(self.options.checked, false)
							});
							this.$cancel
									.bind(
											"click.stars",
											function(e) {
												if (!o.forceSelect
														&& (o.disabled || o.value == o.cancelValue)) {
													return false
												}
												o.checked = -1;
												o.value = o.cancelValue;
												o.title = "";
												self.$value.val(o.value).attr({
													disabled : "disabled"
												});
												fillNone();
												self._disableCancel();
												!o.forceSelect
														&& self.callback(e,
																"cancel")
											})
									.bind(
											"mouseover.stars",
											function() {
												if (self._disableCancel()) {
													return false
												}
												self.$cancel
														.addClass(o.cancelHoverClass);
												fillNone();
												self._showCap(o.cancelTitle)
											})
									.bind(
											"mouseout.stars",
											function() {
												if (self._disableCancel()) {
													return false
												}
												self.$cancel
														.removeClass(o.cancelHoverClass);
												self.$stars
														.triggerHandler("mouseout.stars")
											});
							this.$form.bind("reset.stars", function() {
								!o.disabled && self.select(o.defaultValue)
							});
							$(window)
									.unload(
											function() {
												self.$cancel.unbind(".stars");
												self.$stars.unbind(".stars");
												self.$form.unbind(".stars");
												self.$selec = self.$rboxs = self.$stars = self.$value = self.$cancel = self.$form = null
											});
							function fillTo(index, hover) {
								if (index != -1) {
									var addClass = hover ? o.starHoverClass
											: o.starOnClass;
									var remClass = hover ? o.starOnClass
											: o.starHoverClass;
									self.$stars.eq(index).prevAll(
											"." + o.starClass).andSelf()
											.removeClass(remClass).addClass(
													addClass);
									self.$stars.eq(index).nextAll(
											"." + o.starClass).removeClass(
											o.starHoverClass + " "
													+ o.starOnClass);
									self._showCap(o.id2title[index])
								} else {
									fillNone()
								}
							}
							function fillNone() {
								self.$stars.removeClass(o.starOnClass + " "
										+ o.starHoverClass);
								self._showCap("")
							}
							this.select(o.value);
							o.disabled && this.disable()
						},
						_disableCancel : function() {
							var o = this.options, disabled = o.disabled
									|| o.oneVoteOnly
									|| (o.value == o.cancelValue);
							if (disabled) {
								this.$cancel.removeClass(o.cancelHoverClass)
										.addClass(o.cancelDisabledClass)
							} else {
								this.$cancel.removeClass(o.cancelDisabledClass)
							}
							this.$cancel.css("opacity", disabled ? 0.5 : 1);
							return disabled
						},
						_disableAll : function() {
							var o = this.options;
							this._disableCancel();
							if (o.disabled) {
								this.$stars.filter("div").addClass(
										o.starDisabledClass)
							} else {
								this.$stars.filter("div").removeClass(
										o.starDisabledClass)
							}
						},
						_showCap : function(s) {
							var o = this.options;
							if (o.captionEl) {
								o.captionEl.text(s)
							}
						},
						value : function() {
							return this.options.value
						},
						select : function(val) {
							var o = this.options, e = (val == o.cancelValue) ? this.$cancel
									: this.$stars.eq(o.val2id[val]);
							o.forceSelect = true;
							e.triggerHandler("click.stars");
							o.forceSelect = false
						},
						selectID : function(id) {
							var o = this.options, e = (id == -1) ? this.$cancel
									: this.$stars.eq(id);
							o.forceSelect = true;
							e.triggerHandler("click.stars");
							o.forceSelect = false
						},
						enable : function() {
							this.options.disabled = false;
							this._disableAll()
						},
						disable : function() {
							this.options.disabled = true;
							this._disableAll()
						},
						destroy : function() {
							this.options.isSelect ? this.$selec
									.appendTo(this.element) : this.$rboxs
									.appendTo(this.element);
							this.$form.unbind(".stars");
							this.$cancel.unbind(".stars").remove();
							this.$stars.unbind(".stars").remove();
							this.$value.remove();
							this.element.unbind(".stars").removeData("stars")
						},
						callback : function(e, type) {
							var o = this.options;
							o.callback && o.callback(this, type, o.value, e);
							o.oneVoteOnly && !o.disabled && this.disable()
						}
					});
	$
			.extend(
					$.ui.stars,
					{
						getter : "value",
						defaults : {
							inputType : "select",
							split : 0,
							disabled : false,
							cancelTitle : "Cancel Rating",
							cancelValue : 0,
							cancelShow : false,
							oneVoteOnly : false,
							showTitles : true,
							captionEl : null,
							callback : null,
							starWidth : 16,
							cancelClass : "pa_ui_stars_cancel",
							starClass : "pa_ui_stars_star",
							starOnClass : "pa_ui_stars_staron",
							starHoverClass : "pa_ui_stars_starhover",
							starDisabledClass : "pa_ui_stars_stardisabled",
							cancelHoverClass : "pa_ui_stars_cancelhover",
							cancelDisabledClass : "pa_ui_stars_canceldisabled"
						},
						load : function() {
							var inited = false;
							if (!inited) {
								$("[pa_ui_name*=stars]")
										.each(
												function() {
													var options = {};
													var $this = $(this);
													if ($this
															.attr("pa_ui_stars_inputtype")) {
														options.inputType = $this
																.attr("pa_ui_stars_inputtype")
													}
													if ($this
															.attr("pa_ui_stars_cancelclass")) {
														options.cancelClass = $this
																.attr("pa_ui_stars_cancelclass")
													}
													if ($this
															.attr("pa_ui_stars_starclass")) {
														options.starClass = $this
																.attr("pa_ui_stars_starclass")
													}
													if ($this
															.attr("pa_ui_stars_staronclass")) {
														options.starOnClass = $this
																.attr("pa_ui_stars_staronclass")
													}
													if ($this
															.attr("pa_ui_stars_starhoverclass")) {
														options.starHoverClass = $this
																.attr("pa_ui_stars_starhoverclass")
													}
													if ($this
															.attr("pa_ui_stars_cancelhoverclass")) {
														options.cancelHoverClass = $this
																.attr("pa_ui_stars_cancelhoverclass")
													}
													if ($this
															.attr("pa_ui_stars_callback")) {
														options.callback = eval($this
																.attr("pa_ui_stars_callback"))
													}
													if ($this
															.attr("pa_ui_stars_cancelshow") === "true") {
														options.cancelShow = true
													} else {
														options.cancelShow = false
													}
													$this.stars(options)
												})
							}
						}
					});
	if ($.pa_ui.starsLoad) {
		$(document).ready(function() {
			$.ui.stars.load()
		})
	} else {
		$.ui.stars.load()
	}
})(jQuery);

(function($) {
	$
			.widget(
					"ui.pagebar",
					{
						version : "3.0",
						build : "2011.1024.1101",
						_init : function() {
							var o = this.options, totalpage = 0;
							if (o.page < 1) {
								o.page = 1
							}
							totalpage = o.totalCount / o.perpage;
							if (o.totalCount % o.perpage > 0) {
								totalpage++
							}
							o.totalPage = parseInt(totalpage, 10);
							if (o.page > o.totalPage) {
								o.page = o.totalPage
							}
							if (o.type == "contextual") {
								this._pagecontextual()
							} else {
								if (o.type == "pagebar") {
									this._pagebar()
								} else {
									this._pageanys()
								}
							}
						},
						destroy : function() {
							$(this.gotopage).unbind(".pagebar");
							$(this.element).empty()
						},
						_get_page_item : function(page) {
							if (page == this.options.page) {
								return ('<span class="thispage">' + page + "</span>")
							} else {
								if (page == 1) {
									if (this.options.clickFunc == "") {
										return ('<a class="begin" href="'
												+ this._get_page_url(page)
												+ '">' + page + "</a>")
									} else {
										return ('<a class="begin" href="javascript:void(0);" onclick="'
												+ this.options.clickFunc
												+ "("
												+ page
												+ ');return false;">'
												+ page + "</a>")
									}
								} else {
									if (page == this.options.totalPage) {
										if (this.options.clickFunc == "") {
											return ('<a class="end" href="'
													+ this._get_page_url(page)
													+ '">' + page + "</a>")
										} else {
											return ('<a class="end" href="javascript:void(0);" onclick="'
													+ this.options.clickFunc
													+ "("
													+ page
													+ ');return false;">'
													+ page + "</a>")
										}
									} else {
										if (this.options.clickFunc == "") {
											return ('<a href="'
													+ this._get_page_url(page)
													+ '">' + page + "</a>")
										} else {
											return ('<a href="javascript:void(0);" onclick="'
													+ this.options.clickFunc
													+ "("
													+ page
													+ ');return false;">'
													+ page + "</a>")
										}
									}
								}
							}
						},
						_get_page_url : function(page) {
							return this.options.url.replace("{page}", page)
						},
						_pagebar : function() {
							var o = this.options, hotPage = 3, self = this;
							if (o.totalPage < 2 || o.totalCount == 0) {
								return
							}
							var showPage = 2 * Number(o.matchPage) + 2
									+ hotPage;
							var sb = "";
							if (o.disp == "1" || o.disp == "3") {
								if (o.page == 1) {
									sb += '<span class="pa_ui_first">'
											+ o.begintext + "</span>"
								} else {
									if (this.options.clickFunc == "") {
										sb += '<a class="pa_ui_first" href="'
												+ this._get_page_url(1) + '">'
												+ o.begintext + "</a>"
									} else {
										sb += '<a class="pa_ui_first" href="javascript:void(0);" onclick="'
												+ this.options.clickFunc
												+ "("
												+ 1
												+ ');return false;">'
												+ o.begintext + "</a>"
									}
								}
							}
							if (o.disp == "2" || o.disp == "3") {
								if (o.page == 1) {
									sb += '<span class="prev">' + o.prevtext
											+ "</span>"
								} else {
									if (this.options.clickFunc == "") {
										sb += '<a class="prev" href="'
												+ this
														._get_page_url(Number(o.page) - 1)
												+ '">' + o.prevtext + "</a>"
									} else {
										sb += '<a class="prev" href="javascript:void(0);" onclick="'
												+ this.options.clickFunc
												+ "("
												+ (Number(o.page) - 1)
												+ ');return false;">'
												+ o.prevtext + "</a>"
									}
								}
							}
							if (o.totalPage <= showPage) {
								for ( var i = 1; i <= o.totalPage; i++) {
									sb += this._get_page_item(i)
								}
							} else {
								var bitPage = Number(hotPage)
										+ Number(o.matchPage) + 2;
								if (o.page <= bitPage) {
									for ( var i = 1; i <= bitPage; i++) {
										sb += this._get_page_item(i)
									}
									if ((Number(o.page) + Number(o.matchPage)) > bitPage) {
										for ( var i = (bitPage + 1); i <= (Number(o.page) + Number(o.matchPage)); i++) {
											sb += this._get_page_item(i)
										}
									}
									if ((Number(o.page) + Number(o.matchPage)) >= (Number(o.totalPage)
											- Number(hotPage) - 1)) {
										for ( var i = (Number(o.page)
												+ Number(o.matchPage) + 1); i <= o.totalPage; i++) {
											sb += this._get_page_item(i)
										}
									} else {
										sb += '<span class="space">' + o.space
												+ "</span>";
										for ( var i = Number(o.totalPage)
												- Number(hotPage) + 1; i <= o.totalPage; i++) {
											sb += this._get_page_item(i)
										}
									}
								} else {
									if ((Number(o.page) + Number(bitPage)) > o.totalPage) {
										for ( var i = 1; i <= hotPage; i++) {
											sb += this._get_page_item(i)
										}
										sb += '<span class="space">' + o.space
												+ "</span>";
										if ((Number(o.totalPage)
												- Number(o.page)
												+ Number(o.matchPage) + 1) > bitPage) {
											for ( var i = (Number(o.page) - Number(o.matchPage)); i <= (Number(o.totalPage) - Number(bitPage)); i++) {
												sb += this._get_page_item(i)
											}
										}
										for ( var i = (Number(o.totalPage)
												- Number(bitPage) + 1); i <= o.totalPage; i++) {
											sb += this._get_page_item(i)
										}
									} else {
										for ( var i = 1; i <= hotPage; i++) {
											sb += this._get_page_item(i)
										}
										sb += '<span class="space">' + o.space
												+ "</span>";
										for ( var i = Number(o.page)
												- Number(o.matchPage); i <= Number(o.page)
												+ Number(o.matchPage); i++) {
											sb += this._get_page_item(i)
										}
										sb += '<span class="space">' + o.space
												+ "</span>";
										for ( var i = Number(o.totalPage)
												- Number(hotPage) + 1; i <= o.totalPage; i++) {
											sb += this._get_page_item(i)
										}
									}
								}
							}
							if (o.disp == "2" || o.disp == "3") {
								if (o.page == o.totalPage) {
									sb += '<span class="next">' + o.nexttext
											+ "</span>"
								} else {
									if (this.options.clickFunc == "") {
										sb += '<a class="next" href="'
												+ this
														._get_page_url(Number(o.page) + 1)
												+ '">' + o.nexttext + "</a>"
									} else {
										sb += '<a class="next" href="javascript:void(0);" onclick="'
												+ this.options.clickFunc
												+ "("
												+ (Number(o.page) + 1)
												+ ');return false;">'
												+ o.nexttext + "</a>"
									}
								}
							}
							if (o.disp == "1" || o.disp == "3") {
								if (o.page == o.totalPage) {
									sb += '<span class="pa_ui_next">'
											+ o.endtext + "</span>"
								} else {
									if (this.options.clickFunc == "") {
										sb += '<a class="pa_ui_next" href="'
												+ this
														._get_page_url(o.totalPage)
												+ '">' + o.endtext + "</a>"
									} else {
										sb += '<a class="pa_ui_next" href="javascript:void(0);" onclick="'
												+ this.options.clickFunc
												+ "("
												+ o.totalPage
												+ ');return false;">'
												+ o.endtext + "</a>"
									}
								}
							}
							this.pagegos = $('<label>\u5230\u7b2c<input type="text" class="goto" pa_ui_name="painput"  name="page" maxsize="5" />\u9875</label>');
							this.pagego = this.pagegos.children("input");
							if (o.jump == "true") {
								if (o.clickFunc == "") {
									this.gotopage = $("<a></a>")
											.addClass("a_define")
											.attr("title", o.jumptext)
											.attr("href", "")
											.html(
													('<strong class="up">'
															+ o.jumptext
															+ '</strong><strong class="down">'
															+ o.jumptext + "</strong>"))
											.bind(
													"click.pagebar",
													function() {
														var val = parseInt(
																self.pagego
																		.val(),
																10);
														if (val > 0
																&& val <= o.totalPage) {
															window.location.href = self
																	._get_page_url(val)
														} else {
															alert("\u60a8\u8f93\u5165\u7684\u9875\u7801\u683c\u5f0f\u9519\u8bef\u6216\u8005\u5927\u4e8e\u6700\u5927\u9875\u7801,\u8bf7\u68c0\u67e5\u540e\u91cd\u65b0\u8f93\u5165")
														}
														return false
													})
								} else {
									this.gotopage = $(
											'<a href="javascript:void(0);" class="a_define" title="'
													+ o.jumptext
													+ '" onclick="return false;"><strong class="up">'
													+ o.jumptext
													+ '</strong><strong class="down">'
													+ o.jumptext
													+ "</strong></a>").bind(
											"click.pagebar",
											function() {
												var val = parseInt(self.pagego
														.val(), 10);
												return eval(o.clickFunc + "("
														+ val + ")")
											})
								}
							}
							this.element.html(sb);
							if (o.inited) {
								eval(o.inited + "()")
							}
							if (o.jump == "true") {
								this.element.append(this.pagegos);
								this.element.append(this.gotopage)
							}
						},
						_pagecontextual : function() {
							var o = this.options, self = this;
							if (o.totalPage < 2 || o.totalCount == 0) {
								return
							}
							var sb = "";
							if (o.disp == "1" || o.disp == "3") {
								if (o.page == 1) {
									sb += '<span class="pa_ui_first">'
											+ o.begintext + "</span>"
								} else {
									if (this.options.clickFunc == "") {
										sb += '<a class="pa_ui_first" href="'
												+ this._get_page_url(1) + '">'
												+ o.begintext + "</a>"
									} else {
										sb += '<a class="pa_ui_first" href="javascript:void(0);" onclick="'
												+ this.options.clickFunc
												+ "("
												+ 1
												+ ');return false;">'
												+ o.begintext + "</a>"
									}
								}
							}
							if (o.disp == "2" || o.disp == "3") {
								if (o.page == 1) {
									sb += '<span class="prev">' + o.prevtext
											+ "</span>"
								} else {
									if (this.options.clickFunc == "") {
										sb += '<a class="prev" href="'
												+ this
														._get_page_url(Number(o.page) - 1)
												+ '">' + o.prevtext + "</a>"
									} else {
										sb += '<a class="prev" href="javascript:void(0);" onclick="'
												+ this.options.clickFunc
												+ "("
												+ (Number(o.page) - 1)
												+ ');return false;">'
												+ o.prevtext + "</a>"
									}
								}
							}
							var beginPage = Number(o.page) - Number(o.prevPage);
							var endPage = Number(o.page) + Number(o.nextPage);
							if (beginPage > 1) {
								sb += '<span class="space">' + o.space
										+ "</span>"
							}
							if (beginPage < 1) {
								endPage = Number(endPage)
										+ (1 - Number(beginPage))
							} else {
								if (endPage > o.totalPage) {
									beginPage = Number(beginPage)
											- (Number(endPage) - Number(o.totalPage))
								}
							}
							if (beginPage < 1) {
								beginPage = 1
							}
							if (endPage > o.totalPage) {
								endPage = o.totalPage
							}
							for ( var i = beginPage; i <= endPage; i++) {
								sb += this._get_page_item(i)
							}
							if (endPage < o.totalPage) {
								sb += '<span class="space">' + o.space
										+ "</span>"
							}
							if (o.disp == "2" || o.disp == "3") {
								if (o.page == o.totalPage) {
									sb += '<span class="next">' + o.nexttext
											+ "</span>"
								} else {
									if (this.options.clickFunc == "") {
										sb += '<a class="next" href="'
												+ this
														._get_page_url(Number(o.page) + 1)
												+ '">' + o.nexttext + "</a>"
									} else {
										sb += '<a class="next" href="javascript:void(0);" onclick="'
												+ this.options.clickFunc
												+ "("
												+ (Number(o.page) + 1)
												+ ');return false;">'
												+ o.nexttext + "</a>"
									}
								}
							}
							if (o.disp == "1" || o.disp == "3") {
								if (o.page == o.totalPage) {
									sb += '<span class="pa_ui_last">'
											+ o.endtext + "</span>"
								} else {
									if (this.options.clickFunc == "") {
										sb += '<a class="pa_ui_last" href="'
												+ this
														._get_page_url(o.totalPage)
												+ '">' + o.endtext + "</a>"
									} else {
										sb += '<a class="pa_ui_last" href="javascript:void(0);" onclick="'
												+ this.options.clickFunc
												+ "("
												+ o.totalPage
												+ ');return false;">'
												+ o.endtext + "</a>"
									}
								}
							}
							this.pagegos = $('<label>\u5230\u7b2c<input type="text" class="goto" pa_ui_name="painput"  name="page" maxsize="5" />\u9875</label>');
							this.pagego = this.pagegos.children("input");
							if (o.jump == "true") {
								if (o.clickFunc == "") {
									this.gotopage = $(
											'<a href="" class="a_define" title="'
													+ o.jumptext
													+ '"><strong class="up">'
													+ o.jumptext
													+ '</strong><strong class="down">'
													+ o.jumptext
													+ "</strong></a>")
											.bind(
													"click.pagebar",
													function() {
														var val = parseInt(
																self.pagego
																		.val(),
																10);
														if (val > 0
																&& val <= o.totalPage) {
															window.location.href = self
																	._get_page_url(val)
														} else {
															alert("\u60a8\u8f93\u5165\u7684\u9875\u7801\u683c\u5f0f\u9519\u8bef\u6216\u8005\u5927\u4e8e\u6700\u5927\u9875\u7801,\u8bf7\u68c0\u67e5\u540e\u91cd\u65b0\u8f93\u5165")
														}
														return false
													})
								} else {
									this.gotopage = $(
											'<a href="javascript:void(0);" class="a_define" title="'
													+ o.jumptext
													+ '" onclick="return false;"><strong class="up">'
													+ o.jumptext
													+ '</strong><strong class="down">'
													+ o.jumptext
													+ "</strong></a>").bind(
											"click.pagebar",
											function() {
												var val = parseInt(self.pagego
														.val(), 10);
												return eval(o.clickFunc + "("
														+ val + ")")
											})
								}
							}
							this.element.html(sb);
							if (o.jump == "true") {
								this.element.append(this.pagegos);
								this.element.append(this.gotopage)
							}
						},
						_pageanys : function() {
							var o = this.options, hotPage = 3, self = this;
							if (o.totalPage < 2 || o.totalCount == 0) {
								return
							}
							var showPage = 2 * Number(o.matchPage) + 2
									+ hotPage;
							showPage = Number(o.jumppage) + 1;
							var beginPage = 1, endPage;
							if (o.page != 1 && (o.page / o.jumppage > 1)) {
								var tmp = parseInt(o.page / o.jumppage, 10);
								if (o.page % o.jumppage == 0) {
									tmp = o.page / o.jumppage - 1
								}
								beginPage = Number(o.jumppage) * Number(tmp)
										+ 1
							}
							var tmpPage = Number(beginPage)
									+ Number(o.jumppage);
							if (tmpPage > o.totalPage) {
								endPage = o.totalPage
							} else {
								endPage = Number(tmpPage) - 1
							}
							var sb = "";
							if (o.totalPage / (Number(o.jumppage) + 1) > 1) {
								if (Number(o.page) == 1) {
									sb += '<span class="pa_ui_first">'
											+ o.begintext + "</span>"
								} else {
									if (this.options.clickFunc == "") {
										sb += '<a class="pa_ui_first" href="'
												+ this._get_page_url(1) + '">'
												+ o.begintext + "</a>"
									} else {
										sb += '<a class="pa_ui_first" href="javascript:void(0);" onclick="'
												+ this.options.clickFunc
												+ "("
												+ 1
												+ ');return false;">'
												+ o.begintext + "</a>"
									}
								}
							}
							if (o.page < 2) {
								sb += '<span class="prev">' + o.prevtext
										+ "</span>"
							} else {
								if (this.options.clickFunc == "") {
									sb += '<a class="prev" href="'
											+ this
													._get_page_url(Number(o.page) - 1)
											+ '">' + o.prevtext + "</a>"
								} else {
									sb += '<a class="prev" href="javascript:void(0);" onclick="'
											+ this.options.clickFunc
											+ "("
											+ (Number(o.page) - 1)
											+ ');return false;">'
											+ o.prevtext
											+ "</a>"
								}
							}
							if (o.totalPage - endPage == 1) {
								endPage++
							}
							if (beginPage == endPage) {
								beginPage = beginPage - o.jumppage
							}
							for ( var i = beginPage; i <= endPage; i++) {
								sb += this._get_page_item(i)
							}
							if (o.totalPage > showPage) {
								sb += '<span class="space">' + o.space
										+ "</span>";
								sb += this
										._get_page_item(Number(o.totalPage) - 1);
								sb += this._get_page_item(o.totalPage)
							}
							if (o.page == o.totalPage) {
								sb += '<span class="next">' + o.nexttext
										+ "</span>"
							} else {
								if (this.options.clickFunc == "") {
									sb += '<a class="next" href="'
											+ this
													._get_page_url(Number(o.page) + 1)
											+ '">' + o.nexttext + "</a>"
								} else {
									sb += '<a class="next" href="javascript:void(0);" onclick="'
											+ this.options.clickFunc
											+ "("
											+ (Number(o.page) + 1)
											+ ');return false;">'
											+ o.nexttext
											+ "</a>"
								}
							}
							if (o.totalPage / (Number(o.jumppage) + 1) > 1) {
								if (endPage == o.totalPage) {
									sb += '<span class="pa_ui_next">'
											+ o.endtext + "</span>"
								} else {
									var tmplastpage = Number(o.totalPage)
											/ o.jumppage - 1;
									var lastpage = parseInt(tmplastpage, 10) + 1;
									if (this.options.clickFunc == "") {
										sb += '<a class="pa_ui_next" href="'
												+ this
														._get_page_url(o.totalPage)
												+ '">' + o.endtext + "</a>"
									} else {
										sb += '<a class="pa_ui_next" href="javascript:void(0);" onclick="'
												+ this.options.clickFunc
												+ "("
												+ o.totalPage
												+ ');return false;">'
												+ o.endtext + "</a>"
									}
								}
								if (endPage == o.totalPage) {
									if (this.options.clickFunc == "") {
										sb = '<a class="pa_ui_first" href="'
												+ this._get_page_url(1) + '">'
												+ o.begintext + "</a>"
									} else {
										sb = '<a class="pa_ui_first" href="javascript:;" onclick="'
												+ this.options.clickFunc
												+ "("
												+ 1
												+ ');return false;">'
												+ o.begintext + "</a>"
									}
									if (this.options.clickFunc == "") {
										sb += '<a class="prev" href="'
												+ this
														._get_page_url(Number(o.page) - 1)
												+ '">' + o.prevtext + "</a>"
									} else {
										sb += '<a class="prev" href="javascript:void(0);" onclick="'
												+ this.options.clickFunc
												+ "("
												+ (Number(o.page) - 1)
												+ ');return false;">'
												+ o.prevtext + "</a>"
									}
									sb += this._get_page_item(1);
									sb += this._get_page_item(2);
									sb += '<span class="space">' + o.space
											+ "</span>";
									if (beginPage == endPage) {
										beginPage = beginPage - o.jumppage
									}
									for ( var i = beginPage; i <= endPage; i++) {
										sb += this._get_page_item(i)
									}
									if (o.page == o.totalPage) {
										sb += '<span class="next">'
												+ o.nexttext + "</span>"
									} else {
										if (this.options.clickFunc == "") {
											sb += '<a class="next" href="'
													+ this
															._get_page_url(Number(o.page) + 1)
													+ '">' + o.nexttext
													+ "</a>"
										} else {
											sb += '<a class="next" href="javascript:;" onclick="'
													+ this.options.clickFunc
													+ "("
													+ (Number(o.page) + 1)
													+ ');return false;">'
													+ o.nexttext + "</a>"
										}
									}
									if (o.page == o.totalPage) {
										sb += '<span class="pa_ui_next">'
												+ o.endtext + "</span>"
									} else {
										if (this.options.clickFunc == "") {
											sb += '<a class="pa_ui_next" href="'
													+ this
															._get_page_url(o.totalPage)
													+ '">' + o.endtext + "</a>"
										} else {
											sb += '<a class="pa_ui_next" href="javascript:;" onclick="'
													+ this.options.clickFunc
													+ "("
													+ o.totalPage
													+ ');return false;">'
													+ o.endtext + "</a>"
										}
									}
								}
								this.pagegos = $('<label>\u5230\u7b2c<input type="text" class="goto" pa_ui_name="painput"  name="page" maxsize="5" />\u9875</label>');
								this.pagego = this.pagegos.children("input");
								if (o.clickFunc == "") {
									this.gotopage = $("<a></a>")
											.addClass("a_define")
											.attr("title", o.jumptext)
											.attr("href", "")
											.html(
													('<strong class="up">'
															+ o.jumptext
															+ '</strong><strong class="down">'
															+ o.jumptext + "</strong>"))
											.bind(
													"click.pagebar",
													function() {
														var val = parseInt(
																self.pagego
																		.val(),
																10);
														if (val > 0
																&& val <= o.totalPage) {
															window.location.href = self
																	._get_page_url(val)
														} else {
															alert("\u60a8\u8f93\u5165\u7684\u9875\u7801\u683c\u5f0f\u9519\u8bef\u6216\u8005\u5927\u4e8e\u6700\u5927\u9875\u7801,\u8bf7\u68c0\u67e5\u540e\u91cd\u65b0\u8f93\u5165")
														}
														return false
													})
								} else {
									this.gotopage = $(
											'<a href="javascript:void(0);" class="a_define" title="'
													+ o.jumptext
													+ '" onclick="return false;"><strong class="up">'
													+ o.jumptext
													+ '</strong><strong class="down">'
													+ o.jumptext
													+ "</strong></a>").bind(
											"click.pagebar",
											function() {
												var val = parseInt(self.pagego
														.val(), 10);
												if (val > 0
														&& val <= o.totalPage) {
													return eval(o.clickFunc
															+ "(" + val + ")")
												} else {
													self.pagego.val("")
												}
											})
								}
							}
							this.element.html(sb);
							if (o.inited) {
								eval(o.inited + "()")
							}
							if (o.jump == "true") {
								this.element.append(this.pagegos);
								if (!!this.pagegos) {
									this.pagegos
											.children("input")
											.bind(
													"keydown",
													function(e) {
														var keyCode = e.keyCode;
														if (keyCode !== 8
																&& keyCode !== 13
																&& keyCode !== 37
																&& keyCode !== 16
																&& keyCode !== 39
																&& keyCode !== 46
																&& (keyCode < 48 || keyCode > 57)
																&& (keyCode < 96 || keyCode > 105)) {
															e.preventDefault()
														}
													})
								}
								this.element.append(this.gotopage)
							}
						}
					});
	$.extend($.ui.pagebar, {
		defaults : {
			id : "",
			prevPage : "3",
			nextPage : "3",
			matchPage : "3",
			totalPage : "0",
			page : "1",
			perpage : "0",
			totalCount : "0",
			rowCount : "",
			url : "",
			begintext : "\u9996\u9875",
			endtext : "\u672b\u9875",
			prevtext : "\u4e0a\u4e00\u9875",
			nexttext : "\u4e0b\u4e00\u9875",
			clickFunc : "",
			disp : "2",
			jump : "true",
			jumptext : "\u786e\u5b9a",
			type : "",
			space : "...",
			inited : "",
			jumppage : "10"
		},
		load : function() {
			$("[pa_ui_name*=pagebar]").each(function(index) {
				$.pa_ui.widget.init(this);
				var options = {}, option;
				option = $(this).attr("id");
				if (option) {
					options.id = option
				}
				option = $(this).attr("pa_ui_pagebar_nextpage");
				if (option) {
					options.nextPage = option
				}
				option = $(this).attr("pa_ui_pagebar_prevPage");
				if (option) {
					options.prevPage = option
				}
				option = $(this).attr("pa_ui_pagebar_page");
				if (option) {
					options.page = option
				}
				option = $(this).attr("pa_ui_pagebar_matchs");
				if (option) {
					options.matchPage = option
				}
				option = $(this).attr("pa_ui_pagebar_perpage");
				if (option) {
					options.perpage = option
				}
				option = $(this).attr("pa_ui_pagebar_total");
				if (option) {
					options.totalCount = option
				}
				option = $(this).attr("pa_ui_pagebar_url");
				if (option) {
					options.url = option
				}
				option = $(this).attr("pa_ui_pagebar_click");
				if (option) {
					options.clickFunc = option
				}
				option = $(this).attr("pa_ui_pagebar_display");
				if (option) {
					options.disp = option
				}
				option = $(this).attr("pa_ui_pagebar_goto");
				if (option) {
					options.jump = option
				}
				option = $(this).attr("pa_ui_pagebar_goto_text");
				if (option) {
					options.jumptext = option
				}
				option = $(this).attr("pa_ui_pagebar_type");
				if (option) {
					options.type = option
				}
				option = $(this).attr("pa_ui_pagebar_prev_text");
				if (option) {
					options.prevtext = option
				}
				option = $(this).attr("pa_ui_pagebar_next_text");
				if (option) {
					options.nexttext = option
				}
				option = $(this).attr("pa_ui_pagebar_first_text");
				if (option) {
					options.begintext = option
				}
				option = $(this).attr("pa_ui_pagebar_last_text");
				if (option) {
					options.endtext = option
				}
				option = $(this).attr("pa_ui_pagebar_inited");
				if (option) {
					options.inited = option
				}
				option = $(this).attr("pa_ui_pagebar_jumppage");
				if (option) {
					options.jumppage = option
				}
				$(this).pagebar(options);
				$.pa_ui.widget.inited(this)
			})
		}
	});
	if ($.pa_ui.lazyLoad) {
		$(document).ready(function() {
			$.ui.pagebar.load()
		})
	} else {
		$.ui.pagebar.load()
	}
})(jQuery);

(function(a) {
	a.widget("ui.slider", {
		_init : function() {
			var b = this;
			this.fM = null;
			this.fS = null;
			this.isdrag = false;
			this.block = a('<div class="pa_ui_block"></div>').appendTo(
					this.element)[0];
			this.show = a(
					'<div class="pa_ui_show"><span class="y_s1">'
							+ this.options.start + '</span><span class="y_s2">'
							+ this.options.end
							+ '</span><span class="y_s3"></span></div>')
					.appendTo(this.element)[0];
			this.mxLeft = 0;
			this.mxTop = 0;
			this.show = this.show.getElementsByTagName("span")[2];
			this.mxRight = this.element.width() - a(this.block).width() - 2;
			this.mxBottom = this.element.height() - a(this.block).height() - 2;
			this.element.bind("mousedown.slider", function(c) {
				b._setpos(c)
			});
			a(this.block).bind("mousedown.slider", function(c) {
				b._start(c)
			});
			this.move(this.options.value)
		},
		_start : function(c) {
			if (this.disabled) {
				return
			}
			var b = this;
			this.isdrag = true;
			var d = a(this.block);
			this._x = c.clientX - d.offset().left;
			this._y = c.clientY - d.offset().top;
			if (a.browser.msie) {
				this.block.setCapture()
			} else {
				c.preventDefault()
			}
			this.fM = function(f) {
				b._move(f)
			};
			this.fS = function(f) {
				b._stop(f)
			};
			a(document).bind("mousemove", this.fM);
			a(document).bind("mouseup", this.fS);
			this._trigger("start", null, null)
		},
		_move : function(f) {
			window.getSelection ? window.getSelection().removeAllRanges()
					: document.selection.empty();
			var d = f.clientX - this._x - this.element.offset().left;
			var c = f.clientY - this._y - this.element.offset().top;
			d = Math.min(Math.max(d, this.mxLeft), this.mxRight);
			c = Math.min(Math.max(c, this.mxTop), this.mxBottom);
			if (this.options.orientation == "horizontal") {
				a(this.block).css({
					left : d + "px"
				})
			} else {
				a(this.block).css({
					top : c + "px"
				})
			}
			var b = this.options.end - this.options.start;
			if (this.options.setlevel) {
				if (this.options.orientation == "horizontal") {
					a(this.show).html(
							parseInt((d / (this.element.width()
									- a(this.block).width() - 2))
									* b + this.options.start))
				} else {
					a(this.show).html(
							parseInt((c / (this.element.height()
									- a(this.block).height() - 2))
									* b + this.options.start))
				}
			}
			this._trigger("move", null, null)
		},
		_stop : function() {
			a(document).unbind("mousemove", this.fM);
			a(document).unbind("mouseup", this.fS);
			this.isdrag = false;
			if (a.browser.msie) {
				this.block.releaseCapture()
			}
			this._trigger("end", null, null)
		},
		_setpos : function(f) {
			if (this.isdrag || this.disabled) {
				return
			}
			var b = this.options.end - this.options.start;
			if (this.options.orientation == "horizontal") {
				var d = Math.min(Math.max(
						(f.clientX - this.element.offset().left), this.mxLeft),
						this.mxRight);
				a(this.block).css({
					left : d + "px"
				});
				this.options.setlevel
						&& a(this.show).html(
								parseInt((d / (this.element.width()
										- a(this.block).width() - 2))
										* b + this.options.start))
			} else {
				var c = Math.min(Math.max(
						(f.clientY - this.element.offset().top), this.mxTop),
						this.mxBottom);
				a(this.block).css({
					top : c + "px"
				});
				this.options.setlevel
						&& a(this.show).html(
								parseInt((c / (this.element.height()
										- a(this.block).height() - 2))
										* b + this.options.start))
			}
		},
		move : function(c) {
			if (typeof c == "string") {
				if (!/^[0-9]*$/.test(c)) {
					return
				}
			}
			var e = this.options.end - this.options.start;
			var d = c - this.options.start;
			var b = d / e, f;
			this.show.innerHTML = Math.min(Math.max(c, this.options.start),
					this.options.end);
			if (this.options.orientation == "horizontal") {
				a(this.block).css(
						{
							left : Math.min(Math
									.max((parseInt(b
											* (this.element.width() - 2))),
											this.mxLeft), this.mxRight)
									+ "px"
						})
			} else {
				a(this.block).css(
						{
							top : Math.min(Math
									.max((parseInt(b
											* (this.element.height() - 2))),
											this.mxTop), this.mxBottom)
									+ "px"
						})
			}
		},
		disable : function() {
			this.disabled = true;
			this.element.addClass("pa_ui_silder_disable")
		},
		enable : function() {
			this.disabled = false;
			this.element.removeClass("pa_ui_silder_disable")
		},
		destroy : function() {
			a.widget.prototype.destroy.apply(this);
			this.element.unbind(".slider");
			a(this.block).unbind(".slider");
			a(this.block).empty();
			a(this.element).empty()
		}
	});
	a.extend(a.ui.slider, {
		defaults : {
			start : 0,
			end : 50,
			value : 10,
			setlevel : true,
			disabled : false,
			orientation : "horizontal"
		},
		loadMe : function() {
		}
	});
	if (a.pa_ui.lazyLoad) {
		a(document).ready(function() {
			a.ui.slider.loadMe()
		})
	} else {
		a.ui.slider.loadMe()
	}
})(jQuery);
(function(a) {
	a
			.widget(
					"ui.gallery",
					{
						version : "3.0",
						build : "2011.1122.1421",
						_init : function() {
							var b = this, d = this.options;
							var c = this.count = b.element.find("a").length;
							this.index = d.currentIndex;
							d.count = c;
							b.element.find("a").each(
									function(e) {
										a(this).attr("pa_ui_gallery_noteid",
												e + 1);
										a.data(document.body,
												"pa_ui_gallery_min", "1");
										a.data(document.body,
												"pa_ui_gallery_max", d.num);
										if (e >= d.num) {
											a(this).hide()
										}
									});
							b.element
									.find("a")
									.bind(
											d.event,
											function(j) {
												var k = a(this).attr(
														"pa_ui_image_url");
												var i = a(this).attr(
														"pa_ui_link_url");
												var h = a(this).attr(
														"pa_ui_gallery_noteid");
												var f = a(this).attr(
														"pa_ui_image_url") ? a(
														this).attr(
														"pa_ui_image_url") : "";
												b.index = a.pa_ui.converter
														.toInt(a(this)
																.attr(
																		"pa_ui_gallery_noteid"));
												b
														.loadthumb(
																a("#"
																		+ d.targetId),
																{
																	src : k,
																	link : i,
																	noteId : h
																})
														.attr(
																"pa_ui_image_url",
																f)
														.attr(
																"pa_ui_gallery_noteid",
																a(this)
																		.attr(
																				"pa_ui_gallery_noteid"));
												a(this).addClass("active")
														.siblings()
														.removeClass("active");
												var g = a(this).attr(
														"pa_ui_link_url");
												if (g) {
													a("#" + d.targetId).parent(
															"a")
															.attr("href", g)
												} else {
													a("#" + d.targetId).parent(
															"a").removeAttr(
															"href")
												}
												return false
											});
							b.element.find("a:nth-child(1)").trigger(d.event);
							if (this.count > d.num) {
								this.next = a(
										'<a class="pa_ui_gallery_next" href="" title="\u4e0b\u4e00\u5f20"></a>')
										.bind("click.gallery", function() {
											b.moveNext();
											return false
										});
								if (!b.options.isLoop && b.options.endClass) {
									this.prev = a(
											'<a class="pa_ui_gallery_noprev" href="" title="\u4e0a\u4e00\u5f20"></a>')
											.bind("click.gallery", function() {
												b.movePrev();
												return false
											})
								} else {
									this.prev = a(
											'<a class="pa_ui_gallery_prev" href="" title="\u4e0a\u4e00\u5f20"></a>')
											.bind("click.gallery", function() {
												b.movePrev();
												return false
											})
								}
								this.prev.prependTo(this.element);
								this.element.append(this.next)
							}
							if (this.options.navagate) {
								this.prev_link = a(
										'<a class="pa_ui_gallery_prevlink" href=""></a>')
										.unbind(".gallery").bind(
												"click.gallery", function() {
													b.showPrev();
													return false
												});
								this.next_link = a(
										'<a class="pa_ui_gallery_nextlink" href=""></a>')
										.unbind(".gallery").bind(
												"click.gallery", function() {
													b.showNext();
													return false
												});
								a('<div class="pa_ui_gallery_hovernav"></div>')
										.append(this.prev_link).append(
												this.next_link).insertAfter(
												a("#" + d.targetId));
								a(".pa_ui_gallery_hovernav > a").focus(
										function() {
											a(this).blur();
											return false
										})
							}
							if (this.options.autoPlay) {
								this.play();
								this.element.find("a").bind(
										"mouseover.gallery", function() {
											b.stop()
										}).bind("mouseout.gallery", function() {
									b.play()
								})
							}
						},
						loadthumb : function(d, b) {
							a("a", d).hide();
							var c = a("a[noteid=" + b.noteId + "]", d);
							if (c.length > 0) {
								c.show()
							} else {
								c = a("a:first", d).removeAttr("href");
								c.children("img").removeAttr("src");
								c = c.clone().attr("noteid", b.noteId)
										.appendTo(d).show();
								if (b.link) {
									c.attr("href", b.link)
								}
								if (b.src) {
									a("img", c).attr("src", b.src)
								}
							}
							return d
						},
						moveNext : function() {
							var b = this;
							var g = a.data(document.body, "pa_ui_gallery_min");
							var d = a.data(document.body, "pa_ui_gallery_max");
							var i = Number(d) + 1;
							if (b.options.isLoop) {
								if ((Number(d) - Number(g) + 1) < b.options.num
										|| d == this.count) {
									if (d == this.count) {
										d = 1
									} else {
										d = Number(d) + 1
									}
									b.element.find("a").filter(
											"a:[pa_ui_gallery_noteid=" + g
													+ "]").hide();
									var c = b.element.find("a").eq(
											this.count + 1);
									var f = b.element.find("a").filter(
											"a:[pa_ui_gallery_noteid=" + d
													+ "]");
									f.clone(true).insertBefore(c).show();
									f.remove();
									a.data(document.body, "pa_ui_gallery_max",
											d);
									if (g == this.count) {
										g = 1
									} else {
										g = Number(g) + 1
									}
									a.data(document.body, "pa_ui_gallery_min",
											g)
								} else {
									d = Number(d) + 1;
									b.element.find("a").filter(
											"a:[pa_ui_gallery_noteid=" + g
													+ "]").hide();
									var e = b.element.find("a").eq(
											this.count + 1);
									var h = b.element.find("a").filter(
											"a:[pa_ui_gallery_noteid=" + d
													+ "]");
									h.clone(true).insertBefore(e).show();
									h.remove();
									h.show();
									g = Number(g) + 1;
									a.data(document.body, "pa_ui_gallery_min",
											g);
									a.data(document.body, "pa_ui_gallery_max",
											d);
									if (b.options.endClass) {
										b.prev.removeClass(
												"pa_ui_gallery_noprev")
												.addClass("pa_ui_gallery_prev")
									}
								}
							} else {
								if (d < this.count) {
									d = Number(d) + 1;
									b.element.find("a").filter(
											"a:[pa_ui_gallery_noteid=" + g
													+ "]").hide();
									b.element.find("a").filter(
											"a:[pa_ui_gallery_noteid=" + d
													+ "]").show();
									g = Number(g) + 1;
									a.data(document.body, "pa_ui_gallery_min",
											g);
									a.data(document.body, "pa_ui_gallery_max",
											d);
									if (b.options.endClass) {
										b.prev.removeClass(
												"pa_ui_gallery_noprev")
												.addClass("pa_ui_gallery_prev")
									}
								}
								if (this.count == i && b.options.endClass) {
									b.next.removeClass("pa_ui_gallery_next")
											.addClass("pa_ui_gallery_nonext")
								}
								if (g == 1 && b.options.endClass) {
									b.prev.removeClass("pa_ui_gallery_noprev")
											.addClass("pa_ui_gallery_prev")
								}
							}
						},
						movePrev : function() {
							var b = this;
							var g = a.data(document.body, "pa_ui_gallery_min");
							var d = a.data(document.body, "pa_ui_gallery_max");
							var i = Number(d) + 1;
							if (b.options.isLoop) {
								if (g >= 1 && d <= b.options.num) {
									if (g == 1) {
										g = this.count
									} else {
										g = Number(g) - 1
									}
									b.element.find("a").filter(
											"a:[pa_ui_gallery_noteid=" + d
													+ "]").hide();
									var c = b.element.find("a").eq(1);
									var f = b.element.find("a").filter(
											"a:[pa_ui_gallery_noteid=" + g
													+ "]");
									f.clone(true).insertBefore(c).show();
									f.remove();
									a.data(document.body, "pa_ui_gallery_min",
											g);
									if (d == 1) {
										d = this.count
									} else {
										d = Number(d) - 1
									}
									a.data(document.body, "pa_ui_gallery_max",
											d)
								} else {
									g = Number(g) - 1;
									var e = b.element.find("a").eq(1);
									var h = b.element.find("a").filter(
											"a:[pa_ui_gallery_noteid=" + (g)
													+ "]");
									h.clone(true).insertBefore(e).show();
									h.remove();
									b.element.find("a").filter(
											"a:[pa_ui_gallery_noteid=" + (d)
													+ "]").hide();
									d = Number(d) - 1;
									a.data(document.body, "pa_ui_gallery_min",
											g);
									a.data(document.body, "pa_ui_gallery_max",
											d);
									if (b.options.endClass) {
										b.next.removeClass(
												"pa_ui_gallery_nonext")
												.addClass("pa_ui_gallery_next")
									}
								}
							} else {
								if (g > 1) {
									g = Number(g) - 1;
									b.element.find("a").filter(
											"a:[pa_ui_gallery_noteid=" + (g)
													+ "]").show();
									b.element.find("a").filter(
											"a:[pa_ui_gallery_noteid=" + (d)
													+ "]").hide();
									d = Number(d) - 1;
									a.data(document.body, "pa_ui_gallery_min",
											g);
									a.data(document.body, "pa_ui_gallery_max",
											d);
									if (b.options.endClass) {
										b.next.removeClass(
												"pa_ui_gallery_nonext")
												.addClass("pa_ui_gallery_next")
									}
								}
								if (this.count == i && b.options.endClass) {
									b.next.removeClass("pa_ui_gallery_nonext")
											.addClass("pa_ui_gallery_next")
								}
								if (g == 1 && b.options.endClass) {
									b.prev.removeClass("pa_ui_gallery_prev")
											.addClass("pa_ui_gallery_noprev")
								}
							}
						},
						showNext : function() {
							this.index++;
							if (this.index > this.count) {
								this.index = this.count - 1;
								return
							}
							var b = this.element.find("a").filter(
									"[pa_ui_gallery_noteid=" + (this.index)
											+ "]");
							if (b) {
								this.element.find(
										"a:[pa_ui_gallery_noteid="
												+ (this.index) + "]").trigger(
										this.options.event)
							}
						},
						showPrev : function() {
							this.index--;
							if (this.index < 0) {
								this.index = 0;
								return
							}
							var c = a("#" + this.options.targetId).attr(
									"pa_ui_gallery_noteid");
							var b = this.element.find("a").filter(
									"[noteid=" + (this.index) + "]");
							if (b) {
								this.element.find(
										"a:[pa_ui_gallery_noteid="
												+ (this.index) + "]").trigger(
										this.options.event)
							}
						},
						play : function() {
							var b = this;
							if (!this.timer) {
								this.timer = setInterval(function() {
									if ((b.index) >= b.count) {
										b.index = -1
									}
									b.showNext()
								}, this.options.playSpeed)
							}
						},
						stop : function() {
							if (this.timer) {
								clearInterval(this.timer);
								this.timer = false
							}
						},
						destroy : function() {
							var b = this;
							this.stop();
							this.element.find(".pa_ui_gallery_next").unbind(
									"click.gallery");
							this.element.find(".pa_ui_gallery_prev").unbind(
									"click.gallery");
							this.element.find("a").unbind(b.options.event)
									.removeClass("active")
						}
					});
	a.extend(a.ui.gallery, {
		defaults : {
			event : "click",
			navigate : false,
			num : "50",
			count : "0",
			targetId : "",
			currentIndex : 0,
			autoPlay : false,
			isLoop : false,
			endClass : false,
			playSpeed : 3000
		},
		loadMe : function() {
			a("#[pa_ui_name='gallery']").each(function(c) {
				a.pa_ui.widget.init(this);
				var b = {}, d;
				d = a(this).attr("pa_ui_gallery_target");
				if (typeof d != "undefined") {
					b.targetId = d
				}
				d = a(this).attr("pa_ui_gallery_num");
				if (typeof d != "undefined") {
					b.num = a.pa_ui.converter.toInt(d)
				}
				d = a(this).attr("pa_ui_gallery_speed");
				if (typeof d != "undefined") {
					b.playSpeed = a.pa_ui.converter.toInt(d)
				}
				d = a(this).attr("pa_ui_gallery_event");
				if (typeof d != "undefined") {
					b.event = d
				}
				d = a(this).attr("pa_ui_gallery_autoplay");
				if (typeof d != "undefined") {
					b.autoPlay = (d === "true")
				}
				d = a(this).attr("pa_ui_gallery_isloop");
				if (typeof d != "undefined") {
					b.isLoop = (d === "true")
				}
				d = a(this).attr("pa_ui_gallery_endclass");
				if (typeof d != "undefined") {
					b.endClass = (d === "true")
				}
				a(this).gallery(b);
				a.pa_ui.widget.inited(this)
			})
		}
	});
	if (a.pa_ui.lazyLoad) {
		a(document).ready(function() {
			a.ui.gallery.loadMe()
		})
	} else {
		a.ui.gallery.loadMe()
	}
})(jQuery);
(function(a) {
	a.widget("ui.eximage", {
		_init : function() {
			var b = this;
			if (b.options.resizable) {
				b._resizable()
			}
		},
		_resizable : function() {
			var b = this;
			b.element.resizable(b.options)
		},
		destroy : function() {
			this.element.resizable("destroy")
		}
	});
	a.extend(a.ui.eximage, {
		defaults : {
			resizable : false
		},
		load : function() {
			a("[pa_ui_name*='eximage']").each(function(c) {
				a.pa_ui.widget.init(this);
				var b = {};
				var d = a(this);
				if (d.attr("pa_ui_resize") == "true") {
					b.resizable = true
				}
				b.aspectRatio = true;
				b.autoHide = true;
				b.ghost = "pa_ui_image_ghost";
				a(this).eximage(b);
				a.pa_ui.widget.inited(this)
			})
		}
	});
	if (a.pa_ui.lazyLoad) {
		a(document).ready(function() {
			a.ui.eximage.load()
		})
	} else {
		a.ui.eximage.load()
	}
})(jQuery);
(function(a) {
	a.widget("ui.exscroll", {
		_init : function() {
			var c = this;
			this.direction = c.options.direction;
			if (this.direction == "top") {
				this.speed = c.options.speed;
				this.pause = c.options.pause;
				this.height = c.element.outerHeight();
				this.element.html(this.element.html() + this.element.html());
				this.maxHeight = this.element[0].scrollHeight / 2;
				c.counter = 0;
				this.counter1 = 0;
				c.timer = setTimeout(function() {
					c._scroll()
				}, c.pause);
				this.timer = "";
				this.element.bind("mouseover.exscroll", function() {
					c.stop()
				});
				this.element.bind("mouseout.exscroll", function() {
					c.timer = setTimeout(function() {
						c._scroll()
					}, c.speed)
				})
			} else {
				if (this.direction == "left") {
					var c = this;
					this.speed = c.options.speed;
					this.pause = c.options.pause;
					this.width = c.element.outerWidth();
					var d = this.element.find("ul"), b = d.children("li");
					var f = 0, e = 0;
					for (i = 0; i <= b.size() - 1; i++) {
						f = b.eq(i).outerWidth();
						e += f
					}
					d.css("width", (e * 2) + "px");
					this.maxWidth = d.outerWidth() / 2;
					this.counter = 0;
					c.timer = setTimeout(function() {
						c._scroll()
					}, c.pause);
					this.timer = "";
					this.element.bind("mouseover.exscroll", function() {
						c.stop()
					});
					this.element.bind("mouseout.exscroll", function() {
						c.timer = setTimeout(function() {
							c._scroll()
						}, c.speed)
					})
				}
			}
		},
		_scroll : function() {
			if (this.direction == "left") {
				var c = this;
				if (this.element[0].scrollLeft < this.maxWidth) {
					this.element[0].scrollLeft++;
					this.counter++;
					if (this.counter == this.width) {
						var d = this.element.find("ul"), b = d.children("li");
						b.eq(0).clone(true).appendTo(d)
					}
				} else {
					this.element[0].scrollLeft = 0;
					this.counter = 0
				}
				if (this.counter < this.width) {
					this.timer = setTimeout(function() {
						c._scroll()
					}, c.speed)
				} else {
					this.counter = 0;
					this.timer = setTimeout(function() {
						c._scroll()
					}, c.pause)
				}
			} else {
				if (this.direction == "top") {
					var c = this;
					if (c.element[0].scrollTop < (this.maxHeight)) {
						this.element[0].scrollTop++;
						this.counter++
					} else {
						this.element[0].scrollTop = 0;
						this.counter = 0
					}
					if (this.counter < this.height) {
						this.timer = setTimeout(function() {
							c._scroll()
						}, c.speed)
					} else {
						this.counter = 0;
						this.timer = setTimeout(function() {
							c._scroll()
						}, c.pause)
					}
				}
			}
		},
		stop : function() {
			clearTimeout(this.timer)
		},
		destroy : function() {
			this.stop();
			this.element.unbind("mouseover.exscroll");
			this.element.unbind("mouseout.exscroll")
		}
	});
	a
			.extend(
					a.ui.exscroll,
					{
						defaults : {
							tag : "ul>li",
							speed : 50,
							pause : 2000,
							direction : "top"
						},
						load : function() {
							a("[pa_ui_name*=exscroll]")
									.each(
											function() {
												a.pa_ui.widget.init(this);
												var c = {}, d;
												var b = this;
												if (a(this).attr(
														"pa_ui_exscroll_tag") != null
														&& a(this)
																.attr(
																		"pa_ui_exscroll_tag").length > 0) {
													c.tag = a(this)
															.attr(
																	"pa_ui_exscroll_tag")
												}
												d = a(this).attr(
														"pa_ui_exscroll_speed");
												if (d) {
													c.speed = parseInt(d)
												}
												d = a(this).attr(
														"pa_ui_exscroll_pause");
												if (d) {
													c.pause = parseInt(d)
												}
												d = a(this)
														.attr(
																"pa_ui_exscroll_direction");
												if (d) {
													c.direction = d
												}
												a(this).exscroll(c);
												a.pa_ui.widget.inited(this)
											})
						}
					});
	if (a.pa_ui.lazyLoad) {
		a(document).ready(function() {
			a.ui.exscroll.load()
		})
	} else {
		a.ui.exscroll.load()
	}
})(jQuery);
(function(a) {
	a.widget("ui.roller", {
		_init : function() {
			var b = this;
			this.savedHeight = this.element.outerHeight();
			var c = this.content = a("<div></div>").html(this.element.html());
			this.element.empty();
			this.content.appendTo(this.element).css({
				overflow : "hidden"
			});
			if (b.options.collapse) {
				this.content.height(this.options.min)
			}
			var d = this.handle = a("<div></div>").addClass(
					"pa_ui_roller_title");
			if (b.options.collapse) {
				d.addClass(b.options.cssExpand)
			} else {
				d.addClass(b.options.cssCollapse)
			}
			a("<div></div>").addClass("pa_ui_roller_handle").appendTo(d);
			this.handle.click(function() {
				if (d.hasClass(b.options.cssCollapse)) {
					b.content.height(b.options.min);
					b.handle.removeClass(b.options.cssCollapse).addClass(
							b.options.cssExpand)
				} else {
					b.content.height(b.savedHeight);
					b.handle.removeClass(b.options.cssExpand).addClass(
							b.options.cssCollapse)
				}
			});
			if (b.options.position == "top") {
				d.prependTo(this.element)
			} else {
				if (b.options.position == "bottom") {
					d.appendTo(this.element)
				}
			}
		},
		destroy : function() {
			this.handle.remove()
		}
	});
	a
			.extend(
					a.ui.roller,
					{
						defaults : {
							cssExpand : "pa_ui_roller_collapse",
							cssCollapse : "pa_ui_roller_expand",
							collapse : false,
							position : "top",
							min : 100
						},
						load : function() {
							a.pa_ui.widget.init(this);
							var b = false;
							if (!b) {
								a("[pa_ui_name*=roller]")
										.each(
												function() {
													a.pa_ui.widget.init(this);
													var c = {};
													var d = a(this);
													if (d
															.attr("pa_ui_roller_height")) {
														c.min = a.pa_ui.converter
																.toInt(d
																		.attr("pa_ui_roller_height"))
													}
													if (d
															.attr("pa_ui_roller_collapse")) {
														c.collapse = d
																.attr("pa_ui_roller_collapse") == "true"
													}
													if (d
															.attr("pa_ui_roller_position")) {
														c.position = d
																.attr("pa_ui_roller_position")
													}
													a(this).roller(c);
													a.pa_ui.widget.inited(this)
												})
							}
							a.pa_ui.widget.inited(this)
						}
					});
	if (a.pa_ui.loadLazy) {
		a(document).ready(function() {
			a.ui.roller.load()
		})
	} else {
		a.ui.roller.load()
	}
})(jQuery);
(function(a) {
	a.widget("ui.gotop", {
		_init : function() {
			var b = this.element;
			b.addClass(this.options.appendClass).hide();
			a(window).scroll(
					function() {
						if (document.documentElement.scrollTop == 0) {
							b.hide()
						} else {
							b.show();
							b.click(function() {
								document.documentElement.scrollTop = 0
							});
							if (a.browser.msie && a.browser.version == 6) {
								var c = a(window).scrollTop()
										+ a(window).height() - b.height() - 30;
								b.css({
									position : "absolute",
									bottom : "auto"
								});
								b.css("top", c)
							}
						}
					})
		},
		destroy : function() {
			this.element.removeClass(this.options.appendClass)
		}
	});
	a
			.extend(
					a.ui.gotop,
					{
						defaults : {
							appendClass : "pa_ui_gotop"
						},
						load : function() {
							if (a("body[pa_ui_name*=gotop]").length > 0) {
								var b = a("<div></div>")
										.html(
												'<a href="" onclick="return false;">\u56de\u9876\u90e8</a>')
										.appendTo("body");
								b.gotop()
							}
						}
					});
	if (a.pa_ui.lazyLoad) {
		a(document).ready(function() {
			a.ui.gotop.load()
		})
	} else {
		a(document).ready(function() {
			a.ui.gotop.load()
		})
	}
})(jQuery);
(function(a) {
	a.widget("ui.shadowtext", {
		_init : function() {
			var b = this;
			this.element.children(b.options.selector).hover(function() {
				b.element.addClass(b.options.cssCover);
				a(this).addClass(b.options.cssHover)
			}, function() {
				b.element.removeClass(b.options.cssCover);
				a(this).removeClass(b.options.cssHover)
			})
		},
		destroy : function() {
			var b = this;
			this.element.children(b.options.selector).unbind("mouseover")
		}
	});
	a.extend(a.ui.shadowtext, {
		defaults : {
			cssCover : "pa_ui_shadow_cover",
			cssHover : "pa_ui_shadow_hover",
			selector : "p"
		},
		load : function() {
			var b = false;
			if (!b) {
				a("[pa_ui_name*=shadowtext]").each(function() {
					var c = {}, d;
					d = a(this).attr("pa_ui_shadowtext_selector");
					if (d) {
						c.selector = d
					}
					a(this).shadowtext(c)
				})
			}
		}
	});
	if (a.pa_ui.lazyLoad) {
		a(document).ready(function() {
			a.ui.shadowtext.load()
		})
	} else {
		a.ui.shadowtext.load()
	}
})(jQuery);
(function(a) {
	a.widget("ui.ajaxlink", {
		_init : function() {
			var b = this;
			this.element.click(function(c) {
				b._getContent();
				return false
			})
		},
		_getContent : function() {
			var b = this;
			var c = this.options.url;
			a.get(c, function(d) {
				if (b.options.onlybody) {
					d = d.replace(/<script.*>.*<\/script>/ig, "");
					d = d.replace(/<\/?link.*>/ig, "");
					d = d.replace(/<\/?html.*>/ig, "");
					d = d.replace(/<\/?body.*>/ig, "");
					d = d.replace(/<\/?head.*>/ig, "");
					d = d.replace(/<\/?!doctype.*>/ig, "");
					d = d.replace(/<\/?meta.*>/ig, "");
					d = d.replace(/<title.*>.*<\/title>/ig, "")
				}
				a("#" + b.options.targetid).html(d)
			})
		},
		destroy : function() {
			this.unbind(".ajaxlink")
		}
	});
	a.extend(a.ui.ajaxlink, {
		defaults : {
			onlybody : true
		},
		load : function() {
			a("[pa_ui_name*=ajaxlink]").each(function() {
				a.pa_ui.widget.init(this);
				var b = {}, c;
				c = a(this).attr("href");
				if (c) {
					b.url = c
				} else {
					alert("please set href value");
					return
				}
				c = a(this).attr("pa_ui_ajaxlink_targetid");
				if (c) {
					b.targetid = c
				} else {
					alert("please set pa_ui_ajaxlink_targetid value");
					return
				}
				c = a(this).attr("pa_ui_ajaxlink_onlybody");
				if (c) {
					b.onlybody = true
				}
				a(this).ajaxlink(b);
				a.pa_ui.widget.inited(this)
			})
		}
	});
	if (a.pa_ui.lazyLoad) {
		a(document).ready(function() {
			a.ui.ajaxlink.load()
		})
	} else {
		a.ui.ajaxlink.load()
	}
})(jQuery);
(function(a) {
	a.widget("ui.virframe", {
		_init : function() {
			var b = this;
			if (typeof b.options.offset.x != "number") {
				b.options.offset.x = a("#" + b.options.offset.x).offset().left
						+ a("#" + b.options.offset.x).outerWidth()
			}
			if (typeof b.options.offset.y != "number") {
				b.options.offset.y = a("#" + b.options.offset.y).offset().top
						+ a("#" + b.options.offset.y).outerHeight()
			}
			b.leftdiv = a("#" + b.options.left);
			b.splitterdiv = a("#" + b.options.splitter);
			b.rightdiv = a("#" + b.options.right);
			b._resize();
			var c = {
				axis : "x",
				iframeFix : true,
				containment : "parent",
				drag : function(d, e) {
					var f = e.position;
					b.leftdiv.width(f.left);
					b.rightdiv.css("left", f.left + b.splitterdiv.width());
					b._resize()
				}
			};
			b.splitterdiv.draggable(c);
			a(window).bind("resize.virframe", function() {
				b._resize()
			})
		},
		_resize : function() {
			var c = document.documentElement.clientWidth
					- parseInt(this.options.offset.x);
			var b = document.documentElement.clientHeight
					- parseInt(this.options.offset.y);
			c = c - this.leftdiv.width() - this.splitterdiv.width();
			this.rightdiv.width(c);
			this.element.height(b);
			this.splitterdiv.height(b)
		},
		destroy : function() {
			this.unbind(".virframe")
		}
	});
	a.extend(a.ui.virframe, {
		defaults : {
			left : "navigation",
			splitter : "splitter",
			right : "work",
			offset : {
				x : 0,
				y : 0
			}
		},
		load : function() {
			a("[pa_ui_name*=virframe]").each(function() {
				a.pa_ui.widget.init(this);
				var c = {}, d;
				d = a(this).attr("pa_ui_virframe_offset");
				if (d) {
					var b = d.split(",");
					var e = {
						x : 0,
						y : 0
					};
					if (b.lenght > 0) {
						e.x = a.pa_ui.converter.toInt(b[0]);
						if (e.x == 0) {
							e.x = b[0]
						}
					}
					if (b.length > 1) {
						e.y = a.pa_ui.converter.toInt(b[1]);
						if (e.y == 0) {
							e.y = b[1]
						}
					}
					c.offset = e
				}
				a(this).virframe(c);
				a.pa_ui.widget.inited(this)
			})
		}
	});
	if (a.pa_ui.lazyLoad) {
		a(document).ready(function() {
			a.ui.virframe.load()
		})
	} else {
		a.ui.virframe.load()
	}
})(jQuery);
(function(a) {
	a.widget("ui.exinput", {
		version : "3.0",
		build : "2010.0613.1720",
		_init : function() {
			var c = this;
			var b = this.element.attr("maxlength"), d = this.element[0];
			this.element.bind(
					"focus",
					function(f) {
						if (c.options.focus) {
							c.element.addClass(c.options.cssFocus)
						}
						if (c.options.watermark
								&& c.element.hasClass(c.options.cssWatermark)) {
							c.element.removeClass(c.options.cssWatermark).val(
									"")
						}
					}).bind(
					"blur",
					function(f) {
						if (c.options.focus) {
							c.element.removeClass(c.options.cssFocus)
						}
						if (c.options.watermark && c.element.val() == "") {
							c.element.addClass(c.options.cssWatermark).val(
									c.options.watermarktext)
						}
					});
			if (c.element.val() == "") {
				if (c.options.watermark) {
					c.element.addClass(c.options.cssWatermark).val(
							c.options.watermarktext)
				}
			}
			if (typeof c.options.splitter == "undefind"
					|| c.options.splitter == "") {
			} else {
				c.splitter(c.options.splitter)
			}
		},
		destroy : function() {
			a.widget.prototype.destroy.apply(this);
			a(window).unbind(".splitter");
			if (this.splitterBox) {
				this.splitterBox.remove()
			}
		},
		splitter : function(g) {
			var i = parseInt(g.toString().replace(/\s/ig, ""));
			if (i.lengh == 0) {
				return false
			}
			var f = this._splitterPosition().left;
			var d = this._splitterPosition().top;
			var c = this.element.outerHeight();
			if (this.splitterBox) {
				this.splitterBox.remove()
			}
			this.splitterBox = a("<div></div>").addClass(
					this.options.splitterClass).css({
				position : "absolute",
				left : f,
				top : d,
				height : c
			}).insertAfter(this.element);
			var b = this;
			this.element.keyup(function() {
				b._makeSplitter()
			});
			this.element.keydown(function() {
				if (b.element.val().replace(/ /ig, "") == "") {
					b.unSplitter()
				}
			});
			a(window).bind("resize.splitter", function() {
				b.splitterBox.css({
					left : b._splitterPosition().left,
					top : b._splitterPosition().top
				})
			})
		},
		_splitterPosition : function() {
			return {
				left : (this.element.position().left + (this.element
						.outerWidth() - this.element.innerWidth()) / 2),
				top : (this.element.position().top + (this.element
						.outerHeight() - this.element.innerHeight()) / 2)
			}
		},
		makeSplitter : function(b) {
			this._makeSplitter(b)
		},
		unSplitter : function(c) {
			var b = this;
			if (this.splitterBox) {
				this.splitterBox.empty()
			}
			b.element.val(b.element.val().replace(/ /ig, ""))
		},
		_makeSplitter : function(k) {
			var g = this, f = this.element.val().replace(/ /ig, "") || k || "";
			if (k !== undefined) {
				this.element.val(k)
			}
			this.splitterBox.empty();
			this.splitterNum = parseInt(this.options.splitter, 10);
			var j = "", c = e = 0;
			for ( var h = 0; h < f.length; h++) {
				if ((h >= this.splitterNum) && (h % this.splitterNum == 0)) {
					if (f.substring(h, h + 1) != " ") {
						j += " "
					}
				}
				j += f.substring(h, h + 1)
			}
			this.element.val(j);
			var d = j.split(" ");
			for ( var h = 0; h < d.length; h++) {
				if (h === 0) {
					a("<span></span>").addClass("pa_ui_input_splitter_first")
							.html(d[h]).appendTo(g.splitterBox)
				} else {
					if (h % 2 == 0) {
						a("<span></span>")
								.addClass("pa_ui_input_splitter_even").html(
										d[h]).appendTo(g.splitterBox)
					} else {
						a("<span></span>").addClass("pa_ui_input_splitter_odd")
								.html(d[h]).appendTo(g.splitterBox)
					}
				}
			}
		}
	});
	a.extend(a.ui.exinput, {
		defaults : {
			focus : true,
			cssFocus : "focus",
			cssWatermark : "pa_ui_input_watermark",
			splitter : "",
			splitterClass : "pa_ui_input_splitter_box"
		},
		load : function() {
			a("[pa_ui_name*=exinput]").each(function() {
				a.pa_ui.widget.init(this);
				var b = {}, c;
				c = a(this).attr("pa_ui_input_watermark");
				if (c) {
					b.watermark = true;
					b.watermarktext = c
				}
				c = a(this).attr("pa_ui_input_focus");
				if (c && c == "false") {
					b.focus = false
				}
				c = a(this).attr("pa_ui_input_focusclass");
				if (c) {
					b.focusClass = c
				}
				c = a(this).attr("pa_ui_input_splitter");
				if (c) {
					b.splitter = c
				}
				c = a(this).attr("pa_ui_input_splitterclass");
				if (c) {
					b.splitterClass = c
				}
				a(this).exinput(b);
				a.pa_ui.widget.inited(this)
			})
		}
	});
	if (a.pa_ui.lazyLoad) {
		a(document).ready(function() {
			a.ui.exinput.load()
		})
	} else {
		a.ui.exinput.load()
	}
})(jQuery);
(function($) {
	$.widget("ui.passwordstrength", {
		_init : function() {
			var self = this;
			this.options.event = this.options.event ? this.options.event
					: "keyup";
			if (this.options.event) {
				this.element.bind(this.options.event + ".passwordstrength",
						function() {
							self.check()
						})
			}
			if (this.options.tipBox) {
				this.tipBox = $("#" + this.options.tipBox)
			}
		},
		check : function() {
			this.tipBox.empty();
			var f = this.options.checkStrength;
			var v = this.element.val();
			var result;
			if (typeof f === "function") {
				result = f(v)
			} else {
				if (typeof f === "string") {
					result = eval(f + '("' + v + '")')
				} else {
					return
				}
			}
			var div = $("<div></div>").addClass("pa_ui_password_tipbox");
			if (result) {
				var bar = $("<div></div>").addClass("bar").appendTo(div);
				$("<div></div>").addClass(
						this.options.hintPrefix + result.level).appendTo(bar);
				$("<div></div>").addClass(
						this.options.messagePrefix + result.level).html(
						result.message).appendTo(div);
				div.appendTo(this.tipBox)
			}
		},
		destroy : function() {
			this.element.unbind(".passwordstrength");
			this.tipBox.empty()
		}
	});
	$
			.extend(
					$.ui.passwordstrength,
					{
						defaults : {
							event : "",
							tipBox : "",
							hintPrefix : "level",
							messagePrefix : "message",
							checkStrength : function(value) {
								var reg1 = /(^[a-z]{4,8}$)|(^[0-9]{4,8}$)/;
								var reg2 = /^[A-Za-z]+[0-9]+[A-Za-z0-9]*|[0-9]+[A-Za-z]+[A-Za-z0-9]*$/;
								var reg3 = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{13,})$ /;
								if (value.length < 4) {
									return {
										level : 0,
										message : "\u592a\u77ed"
									}
								}
								if (reg1.test(value)) {
									return {
										level : 1,
										message : "\u5f31"
									}
								}
								if (reg2.test(value) && value.length > 8) {
									return {
										level : 2,
										message : "\u4e2d"
									}
								}
								if (value.match(/(.[^a-z0-9])/ig)
										&& value.length > 12) {
									return {
										level : 3,
										message : "\u5f3a"
									}
								} else {
									return {
										level : 1,
										message : "\u5f31"
									}
								}
							}
						},
						loadMe : function() {
							$("#[pa_ui_name*='passwordstrength']")
									.each(
											function(index) {
												$.pa_ui.widget.init(this);
												var options = {}, option;
												option = $(this)
														.attr(
																"pa_ui_password_tipbox");
												if (option) {
													options.tipBox = option
												} else {
													alert("\u5bc6\u7801\u5f3a\u5ea6\u6ca1\u6709\u8bbe\u5b9a\u663e\u793a\uff0c\u4f7f\u7528tipBox\u8bbe\u5b9a\u3002");
													return
												}
												option = $(this).attr(
														"pa_ui_password_check");
												if (option) {
													options.checkStrength = option
												}
												$(this).passwordstrength(
														options);
												$.pa_ui.widget.inited(this)
											})
						}
					});
	if ($.pa_ui.lazyLoad) {
		$(document).ready(function() {
			$.ui.passwordstrength.loadMe()
		})
	} else {
		$.ui.passwordstrength.loadMe()
	}
})(jQuery);
(function($) {
	$
			.widget(
					"ui.times",
					{
						version : "3.0",
						build : "2010.0722.1637",
						_init : function() {
							this.run()
						},
						_timer : function() {
							if (this.options.maxtime >= 0) {
								if (this.options.dispdays) {
									var days = Math.floor(this.options.maxtime
											/ (24 * 60 * 60));
									var hours = Math
											.floor((this.options.maxtime - (days * 24 * 60 * 60))
													/ (60 * 60));
									var minutes = Math
											.floor((this.options.maxtime
													- (days * 24 * 60 * 60) - (hours * 60 * 60)) / 60);
									var seconds = Math
											.floor(this.options.maxtime % 60)
								} else {
									var days = 0;
									var hours = Math.floor(this.options.maxtime
											/ (60 * 60));
									var minutes = Math
											.floor((this.options.maxtime - (hours * 60 * 60)) / 60);
									var seconds = Math
											.floor(this.options.maxtime % 60)
								}
								if (days < 10) {
									days = "0" + days
								}
								if (hours < 10) {
									hours = "0" + hours
								}
								if (minutes < 10) {
									minutes = "0" + minutes
								}
								if (seconds < 10) {
									seconds = "0" + seconds
								}
								var msg = this.options.message.replace(
										"{days}", days).replace("{hours}",
										hours).replace("{minutes}", minutes)
										.replace("{seconds}", seconds);
								this.element.html(msg);
								--this.options.maxtime
							} else {
								this._clear();
								if (this.options.callback != "") {
									eval(this.options.callback)
								}
							}
						},
						run : function() {
							var self = this;
							this.options.timer = setInterval(function() {
								self._timer()
							}, "1000")
						},
						_clear : function() {
							clearInterval(this.options.timer)
						}
					});
	$
			.extend(
					$.ui.times,
					{
						defaults : {
							timer : null,
							maxtime : "60",
							targetId : "",
							spaceTime : "1000",
							message : "\u8ddd\u79bb\u7ed3\u675f\u65f6\u95f4\u8fd8\u6709{hours}\u5c0f\u65f6{minutes}\u5206{seconds}\u79d2",
							callback : "",
							dispdays : false
						},
						load : function() {
							$("[pa_ui_name*=times]")
									.each(
											function(index) {
												$.pa_ui.widget.init(this);
												var options = {}, option;
												var self = this;
												option = $(this).attr(
														"pa_ui_times_maxtime");
												if (option) {
													options.maxtime = $(this)
															.attr(
																	"pa_ui_times_maxtime")
												}
												option = $(this).attr(
														"pa_ui_times_target");
												if (option) {
													options.targetId = $(this)
															.attr(
																	"pa_ui_times_target")
												}
												option = $(this).attr(
														"pa_ui_times_space");
												if (option) {
													options.spaceTime = $(this)
															.attr(
																	"pa_ui_times_space")
												}
												option = $(this).attr(
														"pa_ui_times_message");
												if (option) {
													options.message = $(this)
															.attr(
																	"pa_ui_times_message")
												}
												option = $(this).attr(
														"pa_ui_times_callback");
												if (option) {
													options.callback = $(this)
															.attr(
																	"pa_ui_times_callback")
												}
												option = $(this).attr(
														"pa_ui_times_dispdays");
												if (option) {
													options.dispdays = option === "true"
												}
												$(this).times(options);
												$.pa_ui.widget.inited(this)
											})
						}
					});
	if ($.pa_ui.lazyLoad) {
		$(document).ready(function() {
			$.ui.times.load()
		})
	} else {
		$.ui.times.load()
	}
})(jQuery);
(function(a) {
	a
			.widget(
					"ui.formatMoney",
					{
						version : "3.0",
						build : "2011.0412.0943",
						_init : function() {
							var b = this, d = this.options;
							b.element.bind("blur.formatMoney", function() {
								b.format()
							}).bind("focus.formatMoney", function() {
								b.element.val(b.toNumber());
								b.element[0].select();
								if (a.browser.msie) {
									var e = b.element[0].createTextRange();
									e.collapse(false);
									e.select()
								}
								this.select()
							});
							b.cnBox = a([]);
							if (d.cnBox) {
								b.cnBox = a("#" + d.cnBox)
							}
							var c = b.toNumber();
							if (a.trim(b.element.val()) != "") {
								if (isNaN(c)) {
									b.element.val("0")
								} else {
									b.format()
								}
							}
						},
						format : function() {
							var b = this, d = b.toFormat(), e = b.toChinese();
							b.element[b.element.is("input, select, textarea") ? "val"
									: "html"](d);
							b.cnBox[b.cnBox.is("input, select, textarea") ? "val"
									: "html"](e)
						},
						toNumber : function() {
							var c = this.options, b = this.element.val();
							if (isNaN(b)) {
								if (c.autoClear) {
									b = this._autoClear(b)
								}
								if (c.decimalSymbol != ".") {
									b = b.replace(c.decimalSymbol, ".")
								}
							}
							if (isNaN(b)) {
								return "0"
							}
							return b
						},
						toFormat : function() {
							var h = this.toNumber(), d = this.options, l = h
									.split("."), p = (h == Math.abs(h)), c = (l.length > 1), g = (c ? l[1]
									: "0"), k = g;
							h = Math.abs(l[0]);
							if (d.decimalPlace >= 0) {
								g = parseFloat("1." + g);
								g = g.toFixed(d.decimalPlace);
								if (g.substring(0, 1) == "2") {
									h = Number(h) + 1
								}
								g = g.substring(2)
							}
							var r = l[0], q;
							if (r.length > 16) {
								if (d.group) {
									for ( var e = 0; e < Math
											.floor((r.length - (1 + e)) / 3); e++) {
										r = r.substring(0, r.length
												- (4 * e + 3))
												+ d.groupSymbol
												+ r.substring(r.length
														- (4 * e + 3))
									}
								}
								if ((c && d.decimalPlace == -1)
										|| d.decimalPlace > 0) {
									r += d.decimalSymbol + g
								}
								var j = p ? d.positiveFormat : d.negativeFormat;
								m = j.replace(/%s/g, d.symbol);
								m = m.replace(/%n/g, r);
								return m
							}
							h = String(h);
							if (d.group) {
								for ( var e = 0; e < Math
										.floor((h.length - (1 + e)) / 3); e++) {
									h = h.substring(0, h.length - (4 * e + 3))
											+ d.groupSymbol
											+ h.substring(h.length
													- (4 * e + 3))
								}
							}
							if ((c && d.decimalPlace == -1)
									|| d.decimalPlace > 0) {
								h += d.decimalSymbol + g
							}
							var n = p ? d.positiveFormat : d.negativeFormat;
							var b = n.replace(/%s/g, d.symbol);
							b = b.replace(/%n/g, h);
							return b
						},
						toChinese : function() {
							var k = this.toNumber(), d = this.options, t = (k == Math
									.abs(k)), q = k.split("."), b = (q.length > 1), j = (b ? q[1]
									: "0"), n = j, r = "", f = [ "\u96f6",
									"\u58f9", "\u8d30", "\u53c1", "\u8086",
									"\u4f0d", "\u9646", "\u67d2", "\u634c",
									"\u7396" ], s = [ "\u5143", "\u62fe",
									"\u4f70", "\u4edf", "\u4e07", "\u62fe",
									"\u4f70", "\u4edf", "\u4ebf", "\u62fe",
									"\u4f70", "\u4edf", "\u4e07" ], e = [
									"\u89d2", "\u5206" ];
							if (d.decimalPlace >= 0) {
								j = parseFloat("1." + j);
								j = j.toFixed(d.decimalPlace);
								if (j.substring(0, 1) == "2") {
									q[0] = Number(q[0]) + 1
								}
								j = j.substring(2);
								q[1] = j
							}
							if (!t) {
								r += "\u8d1f"
							}
							k = String(Math.abs(q[0]));
							var g = k.length;
							if (g >= 14) {
								return "\u8d85\u8fc7\u6700\u5927\u4f4d\u6570"
							}
							for ( var h = 0; h < g; h++) {
								var p = k.charAt(h);
								r += f[p];
								r += s[g - h - 1]
							}
							if (q.length > 1 && q[1] != "") {
								r += (f[q[1].charAt(0)]);
								r += e[0];
								r += (q[1].charAt(1) ? f[q[1].charAt(1)] : "");
								r += (q[1].charAt(1) ? e[1] : "")
							}
							r = r.replace("\u96f6\u96f6", "\u96f6");
							r = r.replace("\u96f6\u4ebf", "\u4ebf");
							r = r.replace("\u4ebf\u4e07", "\u4ebf");
							r = r.replace(/\u96f6\u4e07/g, "\u4e07");
							r = r.replace(/\u96f6\u4edf/g, "");
							r = r.replace(/\u96f6\u4f70/g, "");
							r = r.replace(/\u96f6\u62fe/g, "");
							r = r.replace("\u4ebf\u4e07", "\u4ebf");
							if (k == 0 && q[1] == "00") {
								r = r.replace(/\u96f6\u5143/g, "\u96f6\u5143")
							} else {
								if (q[0] == "0") {
									r = r.replace(/\u96f6\u5143/g,
											"\u96f6\u5143")
								} else {
									r = r.replace(/\u96f6\u5143/g, "\u5143")
								}
							}
							r = r.replace(/\u96f6\u89d2/g, "");
							r = r.replace(/\u96f6\u5206/g, "");
							r = r.replace("\u8d1f\u5143", "\u8d1f");
							if (r.charAt(r.length - 1) == "\u5143"
									|| r.charAt(r.length - 1) == "\u89d2") {
								r = r + "\u6574"
							}
							return r
						},
						_autoClear : function(b) {
							var e = this.options, c;
							if (e.symbol === "") {
								c = new RegExp(
										"[^\\d" + e.decimalSymbol + "-]", "g")
							} else {
								var d = e.symbol.replace("$", "\\$").replace(
										".", "\\."), c = new RegExp(d
										+ "|[^\\d" + this.options.decimalSymbol
										+ "-]", "g")
							}
							b = b.replace(c, "");
							b = b.replace(e.decimalSymbol, "$#$").replace(
									new RegExp("\\.", "g"), "").replace("$#$",
									e.decimalSymbol);
							b = b.replace(/^\-/g, "$*$").replace(/\-/g, "")
									.replace("$*$", "-");
							b = b.replace(new RegExp("^\\-$|^-"
									+ e.decimalSymbol + "$|^\\"
									+ e.decimalSymbol + "$|^-"
									+ e.decimalSymbol + "\\d$"), "");
							return b
						},
						destroy : function() {
							var b = this;
							b.element.unbind(".formatMoney");
							b.cnBox[b.cnBox.is("input, select, textarea") ? "val"
									: "html"]("");
							a.widget.prototype.destroy.apply(this)
						}
					});
	a.extend(a.ui.formatMoney, {
		getter : "toNumber",
		defaults : {
			autoClear : true,
			symbol : "",
			positiveFormat : "%s%n",
			negativeFormat : "%s-%n",
			decimalSymbol : ".",
			decimalPlace : 2,
			groupSymbol : ",",
			group : true,
			cnBox : null
		},
		load : function() {
			a("[pa_ui_name*=formatmoney]").each(function(c) {
				a.pa_ui.widget.init(this);
				var b = {}, d;
				d = a(this).attr("pa_ui_formatmoney");
				if (typeof d != "undefined") {
					b = a(this).metadata({
						type : "attr",
						name : "pa_ui_formatmoney",
						single : "pa_ui_formatmoney"
					})
				}
				a(this).formatMoney(b);
				a.pa_ui.widget.inited(this)
			})
		}
	});
	if (a.pa_ui.loadLazy) {
		a(document).ready(function() {
			a.ui.formatMoney.load()
		})
	} else {
		a.ui.formatMoney.load()
	}
})(jQuery);
(function(a) {
	a
			.widget(
					"ui.suggest",
					{
						version : "3.0",
						build : "2010.0525.1400",
						_init : function() {
							var b = this;
							b.focused = -1, b.hasFocus = false,
									b.savedValue = "";
							this.element.addClass("pa_ui_suggest_input").bind(
									"keydown.suggest",
									function(c) {
										var d = a.ui.keyCode;
										switch (c.keyCode) {
										case d.PAGE_UP:
											break;
										case d.PAGE_DOWN:
											break;
										case d.UP:
											b.move(-1);
											c.preventDefault();
											break;
										case d.DOWN:
											b.move(1);
											c.preventDefault();
											break;
										case d.ENTER:
										case d.TAB:
											b.select(null);
											break;
										case d.ESCAPE:
											b.element.val(b.term);
											b.close();
											break;
										case d.LEFT:
										case d.RIGHT:
										case d.SHIFT:
										case d.CONTROL:
										case d.ALT:
											break;
										default:
											clearTimeout(b.timeSearch);
											b.timeSearch = setTimeout(
													function() {
														b.search(null, c)
													}, b.options.delay);
											break
										}
									}).bind("focus.suggest", function() {
								b.selectedItem = null;
								b.previous = b.element.val()
							}).bind("blur.suggest", function(c) {
								clearTimeout(b.timeSearch);
								b.timeClose = setTimeout(function() {
									b.close(c)
								}, 300)
							});
							b.resultContainer = a("<div></div>").addClass(
									b.options.containerClass).appendTo("body")
									.hide().css({
										position : "absolute",
										"z-index" : a.ui.popup.maxZ++
									}).bgiframe()
						},
						move : function(d) {
							var b = a("li", this.resultContainer), c = b.length;
							this.focused += d;
							if (this.focused < 0) {
								this.focused = 0
							} else {
								if (this.focused >= c) {
									this.focused = c - 1
								}
							}
							b.removeClass("pa_ui_suggest_focus");
							b.eq(this.focused).addClass("pa_ui_suggest_focus");
							this._showResult();
							if (b.eq(this.focused).text()) {
								this.element.val(b.eq(this.focused).text())
							}
						},
						search : function(d) {
							var c = this, b = d ? d : a.trim(c.element.val());
							clearTimeout(c.timeClose);
							c.element.addClass("pa_ui_suggest_searching");
							if (b.length >= this.options.minLength) {
								c._search(b)
							} else {
								c.close()
							}
						},
						_search : function(g) {
							var c = this, f = this.options.data, b;
							if (a.isArray(f)) {
								b = a.ui.suggest.localSearch(f, g);
								c.element
										.removeClass("pa_ui_suggest_searching");
								c._sort(b);
								c._showResult()
							} else {
								if (typeof f === "string") {
									var e = c._url(f, g);
									var d = new Date().getTime();
									a
											.getJSON(
													e,
													function(h) {
														c.element
																.removeClass("pa_ui_suggest_searching");
														b = h;
														c._sort(b);
														c._showResult()
													})
								} else {
									if (c.options.pinyin) {
										b = a.ui.suggest.pinyinSearch(f, g);
										c.element
												.removeClass("pa_ui_suggest_searching");
										c._sort(b);
										c._showResult()
									}
								}
							}
						},
						_sort : function(b) {
							var c = this;
							if (b && b.length > 0) {
								switch (this.options.sort) {
								case 0:
									c._createDom(b);
									break;
								case 1:
									b = b.sort(function(g, f) {
										return g.localeCompare(f)
									});
									c._createDom(b);
									break;
								case 2:
									var d = this.options.hotsorturl;
									if (d) {
										var e = {
											result : b
										};
										a.getJSON(d, e, function(f) {
											b = f;
											c._createDom(b)
										})
									} else {
										c._createDom(b)
									}
									break
								}
							} else {
								c.resultContainer.empty()
							}
						},
						_createDom : function(b) {
							var c = this;
							c.resultContainer.empty();
							if (b && b.length > 0) {
								var d = a("<ul></ul>");
								var e = c.options.maxCount;
								if (c.options.otherData) {
									if (c.options.otherData.maxCount) {
										e = c.options.otherData.maxCount
									}
								}
								a
										.each(
												b,
												function(g, f) {
													if (g < e) {
														a("<li></li>")
																.html(f)
																.bind(
																		"click.suggest",
																		function(
																				h) {
																			h
																					.preventDefault();
																			h
																					.stopPropagation();
																			c
																					.select(this)
																		})
																.hover(
																		function(
																				j) {
																			var i = a(
																					this)
																					.parent(
																							"ul")
																					.children(
																							"li");
																			var h = this;
																			i
																					.removeClass("pa_ui_suggest_focus");
																			a(h)
																					.addClass(
																							"pa_ui_suggest_focus");
																			c.focused = (function() {
																				for ( var k = 0; k <= i.length; k++) {
																					if (i
																							.eq(k)[0] == h) {
																						return k
																					}
																				}
																				return 0
																			})
																					()
																		},
																		function(
																				h) {
																			a(
																					this)
																					.removeClass(
																							"pa_ui_suggest_focus")
																		})
																.appendTo(d)
													} else {
														return
													}
												});
								c.resultContainer.append(d)
							}
							c.focused = -1
						},
						_showResult : function() {
							var b = this, f = b.element.position(), c = b.options.width
									|| b.element.outerWidth(), e = f.left, d = f.top
									+ b.element.outerHeight();
							b.resultContainer.css({
								width : c,
								left : e,
								top : d
							}).show()
						},
						close : function() {
							this.resultContainer.hide()
						},
						select : function(b) {
							var c = false;
							if (b) {
								this.element.val(a(b).text());
								c = true
							} else {
								if (this.focused >= 0) {
									var d = a("li", this.resultContainer).eq(
											this.focused);
									if (d.length > 0) {
										this.element.val(d.text());
										c = true
									}
								}
							}
							if (c) {
								this.close()
							}
						},
						_url : function(c, b) {
							var d = {};
							d[this.element.attr("name") ? this.element
									.attr("name") : "keyword"] = b;
							d = a.extend({}, this.options.otherData, d);
							if (c.indexOf("?") > 0) {
								c = c + "&" + a.param(d)
							} else {
								c = c + "?" + a.param(d)
							}
							return c
						},
						destroy : function() {
							this.element
									.unbind(".suggest")
									.removeClass(
											"pa_ui_suggest_input pa_ui_suggest_searching");
							this.resultContainer.remove()
						}
					});
	a.extend(a.ui.suggest, {
		defaults : {
			delay : 100,
			containerClass : "pa_ui_suggest_result",
			minLength : 2,
			maxCount : 10,
			pinyin : false,
			sort : 1
		},
		localSearch : function(c, b) {
			var d = new RegExp(b.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/gi,
					"\\$1"), "i");
			return a.grep(c, function(e) {
				return d.test(e)
			})
		},
		pinyinSearch : function(d, c) {
			var b = new Array();
			a.each(d, function(e, f) {
				if ((e + f).indexOf(c) != -1) {
					b.push(e)
				}
			});
			return b
		},
		load : function() {
			a("[pa_ui_name*=suggest]").each(function(c) {
				a.pa_ui.widget.init(this);
				var b = {}, d;
				d = a(this).attr("pa_ui_suggest");
				if (typeof d != "undefined") {
					b = a(this).metadata({
						type : "attr",
						name : "pa_ui_suggest",
						single : "pa_ui_suggest"
					})
				}
				a(this).suggest(b);
				a.pa_ui.widget.inited(this)
			})
		}
	});
	if (a.pa_ui.lazyLoad) {
		a(document).ready(function() {
			a.ui.suggest.load()
		})
	} else {
		a.ui.suggest.load()
	}
})(jQuery);
(function(b) {
	var a = function(e, c) {
		var d = Array.prototype.slice.call(arguments).slice(2);
		return function(f) {
			return c.apply(e, [ f || window.event ].concat(d))
		}
	};
	b.widget("ui.menu",
			{
				version : "3.0",
				build : "2010.0630.1124",
				_init : function() {
					this.timer = [];
					this.elements = {};
					this.options.data != null
							&& this.html(this.element[0], this.options.data);
					b("ul", this.element[0]).eq(0).addClass("container");
					this.parent = this.element.children().eq(0)[0];
					var d = b("li", this.parent), c = this;
					d.each(function(f) {
						var e = b("ul", this).eq(0);
						b(this).bind(c.options.event, a(c, c.show, this)).bind(
								"mouseleave", a(c, c.hide, this));
						e[0] && e.hide();
						e[0] && b(this).addClass("hassubmenu")
					});
					this.refresh(b("ul", this.element[0]).eq(0)[0])
				},
				show : function(j, o) {
					if (this.timer.length != 0) {
						for ( var g = 0, f = this.timer.length; g < f; g++) {
							clearTimeout(this.timer[g])
						}
						this.timer = [];
						var c = o.parentNode;
						for ( var g = 0, h = b(c).children(), f = b(c)
								.children().length; g < f; g++) {
							var n = b("ul", h.eq(g)[0]).eq(0);
							n[0] && b("ul", h.eq(g)[0]).each(function(e) {
								b(this).hide()
							})
						}
					}
					if (b(o).attr("class") == "disable") {
						return
					}
					b(o).addClass("focus");
					var k = b("ul", o).eq(0), d = false, c = b(this.parent)
							.children();
					if (!k[0]) {
						return
					}
					var m = "";
					b(o).parent().find("li ul").stop(false, true);
					c.each(function(e) {
						if (o == c.eq(e)[0]) {
							d = true
						}
					});
					if (this.options.direction == "x"
							&& this.options.animate != "") {
						d == true && k.css({
							left : "-1px",
							top : b(o).parent().height() - 4
						}).slideDown(this.options.animate);
						d == false && k.css({
							left : b(o).parent().width() - 4,
							top : "0px"
						}).slideDown(this.options.animate)
					} else {
						if (this.options.direction == "y"
								&& this.options.animate != "") {
							!k.data("u_data") && k.data("u_data", k.width());
							k.css({
								left : m || b(o).parent().width() - 4,
								top : "-10px",
								width : 0
							}).animate({
								width : k.data("u_data") || 0
							}, this.options.animate)
						} else {
							this.options.direction == "x" && d == true
									&& k.css({
										left : "-1px",
										top : b(o).parent().height() - 4
									}).show();
							this.options.direction == "x" && d == false
									&& k.css({
										left : b(o).parent().width() - 4,
										top : "0px"
									}).show();
							this.options.direction == "y" && k.css({
								left : m || b(o).parent().width() - 4,
								top : "-10px"
							}).show()
						}
					}
				},
				hide : function(h, f) {
					var g = b("ul", f).eq(0).stop(false, true), d = this, c;
					b(f).attr("class") != "disable"
							&& b(f).removeClass("focus");
					if (this.options.direction == "x"
							&& this.options.animate != "") {
						g.slideUp(this.options.animate)
					} else {
						if (this.options.direction == "y"
								&& this.options.animate != "") {
							g.animate({
								width : 0
							}, this.options.animate, function() {
								g.hide()
							})
						} else {
							g.hide()
						}
					}
				},
				html : function(k, j) {
					if (j.length == 0 || !j) {
						return
					}
					var h = b("<ul></ul>").appendTo(k), e;
					for ( var g = 0, f = j.length; g < f; g++) {
						e = b("<li></li>").appendTo(h).html(j[g].txt)[0];
						if (j[g].items) {
							this.html(e, j[g].items)
						}
					}
				},
				refresh : function(d, e) {
					var c = this;
					b(d).children().each(
							function(f) {
								var h = b("ul", this).eq(0), g = !e ? "" + f
										: e + "-" + f;
								b(this).attr({
									index : g
								});
								c.elements[g] = this;
								h[0] && c.refresh(h[0], g)
							})
				},
				disable : function() {
					for ( var d = 0, c = arguments.length; d < c; d++) {
						b(this.elements[arguments[d]]).addClass("disable")
					}
				},
				enable : function() {
					for ( var d = 0, c = arguments.length; d < c; d++) {
						b(this.elements[arguments[d]]).removeClass("disable")
					}
				},
				add : function(f) {
					var i, j, h;
					if (!this.elements[f.p]) {
						var e = f.p.split("-");
						var g = e.length;
						e[g - 1] = e[g - 1] - 1;
						if (!this.elements[e.join()]) {
							return
						}
						i = this.elements[e.join()];
						j = "after"
					} else {
						i = this.elements[f.p];
						j = "before"
					}
					h = f.link ? "<a href='" + f.link + "'>" + f.text + "</a>"
							: f.text;
					var d = b("<li>" + h + "</li>");
					d[j == "before" ? "insertBefore" : "insertAfter"](b(i))
							.bind("click", a(this, this.show, d[0])).bind(
									"mouseleave", a(this, this.hide, d[0]));
					this.refresh(b("ul", this.element[0]).eq(0)[0])
				},
				remove : function(c) {
					if (!this.elements[c]) {
						return
					}
					b(this.elements[c]).unbind().remove()
				}
			});
	b.extend(b.ui.menu, {
		defaults : {
			data : null,
			delay : 300,
			event : "mouseenter",
			direction : "y",
			animate : ""
		},
		load : function() {
			b("[pa_ui_name*=menu]").each(function(d) {
				b.pa_ui.widget.init(this);
				var c = {}, e;
				e = b(this).attr("pa_ui_menu");
				if (typeof e != "undefined") {
					c = b(this).metadata({
						type : "attr",
						name : "pa_ui_menu",
						single : "pa_ui_menu"
					})
				}
				b(this).menu(c);
				b.pa_ui.widget.inited(this)
			})
		}
	});
	if (b.pa_ui.loadLazy) {
		b(document).ready(function() {
			b.ui.menu.load()
		})
	} else {
		b.ui.menu.load()
	}
})(jQuery);
(function(a) {
	a
			.widget(
					"ui.menuie",
					{
						version : "3.0",
						build : "2010.0728.1648",
						_init : function() {
							this.timer = [];
							this.elements = {};
							this.options.data != null
									&& this.html(this.element[0],
											this.options.data);
							this.ulContainer = this.element.is("ul") ? this.element
									: this.element.children("ul:first");
							this.ulContainer.addClass("container");
							var c = a("li", this.ulContainer), b = this;
							c
									.each(function(f) {
										var e = a("ul", this).eq(0), d = this;
										a(this)
												.bind(
														b.options.event,
														function(g) {
															if (b.focusLi != this) {
																a(b.focusLi)
																		.removeClass(
																				"focus")
															}
															b.focusLi = this;
															b.focusPopup = false;
															b.show(g, this)
														})
												.bind(
														"mouseleave",
														function(g) {
															d = this;
															b.timer[b.timer.length] = setTimeout(
																	function(h) {
																		b
																				.hide(
																						h,
																						d)
																	},
																	b.options.delay)
														});
										e[0] && e.hide();
										e[0] && a(this).addClass("hassubmenu")
									})
						},
						_pagePos : function(b) {
							if (b.pageX) {
								return {
									x : b.pageX,
									y : b.pageY
								}
							} else {
								return {
									x : b.clientX + document.body.scrollLeft
											- document.body.clientLeft,
									y : b.clientY + document.body.scrollTop
											- document.body.clientTop
								}
							}
						},
						_popupShow : function(f, i, c, g) {
							var k = this, d = k.position(f, i, c, g), b = c
									.outerWidth(), h = c.outerHeight();
							k.oPopup = window.createPopup();
							k.oPopup.document.body.innerHTML = "<ul>"
									+ c.html() + "</ul>";
							var j = k.oPopup.document.createStyleSheet();
							k.options.appendCss && k.options.appendCss(j);
							k.oPopup.show(d.left, d.top, b, h);
							a(k.oPopup.document.body)
									.bind(
											"mouseenter",
											function() {
												if (k.timer.length != 0) {
													for ( var m = 0, e = k.timer.length; m < e; m++) {
														clearTimeout(k.timer[m])
													}
												}
												a(k.focusLi).addClass("focus");
												k.focusPopup = true
											}).bind("mouseleave", function() {
										k.oPopup.hide();
										k.focusPopup = false;
										a(k.focusLi).removeClass("focus")
									})
						},
						show : function(h, b) {
							var d = this, j = a(b);
							if (this.timer.length != 0) {
								for ( var g = 0, c = this.timer.length; g < c; g++) {
									clearTimeout(this.timer[g])
								}
								this.timer = []
							}
							if (j.hasClass("disable")) {
								return
							}
							j.addClass("focus");
							if (!j.addClass("hassubmenu")) {
								return
							}
							var f = a("ul", b).eq(0);
							this.isShow = true;
							d._popupShow(h, this.options.direction, f, j);
							a(window).resize(function() {
							})
						},
						hide : function(c, b) {
							if (this.focusPopup) {
								return
							}
							!a(b).hasClass("disable")
									&& a(b).removeClass("focus");
							this.oPopup && this.oPopup.isOpen
									&& this.oPopup.hide()
						},
						position : function(i, m, f, k) {
							var d, l, h = i.screenY - this._pagePos(i).y, j = i.screenX
									- this._pagePos(i).x, g = document.documentElement.clientWidth
									+ a(document).scrollLeft(), c = document.documentElement.clientHeight
									+ a(document).scrollTop(), b = f
									.outerWidth(), n = f.outerHeight();
							if (m == "x") {
								d = k.offset().left;
								l = k.offset().top + k.outerHeight();
								if ((d + b) > g) {
									d -= (d + b) - g
								}
							} else {
								d = k.offset().left + k.outerWidth();
								l = k.offset().top;
								if ((l + n) > c) {
									l -= (l + n) - c
								}
							}
							d += j;
							l += h;
							return {
								left : d,
								top : l
							}
						},
						html : function(k, j) {
							if (j.length == 0 || !j) {
								return
							}
							var h = a('<ul class="root"></ul>').appendTo(k), b, f;
							for ( var g = 0, e = j.length; g < e; g++) {
								b = a('<li class="row"></li>').appendTo(h);
								if (j[g].appendClass) {
									b.addClass(j[g].appendClass)
								}
								f = a('<a class="title"></a>').html(j[g].label)
										.appendTo(b);
								if (j[g].href) {
									f.attr("href", j[g].href)
								} else {
									f.attr("href", "javascript:void(0);")
								}
								if (j[g].onclick) {
									f.attr("onclick", j[g].onclick)
								}
								if (j[g].submenus) {
									this.submenuH(b, j[g].submenus)
								}
							}
						},
						submenuH : function(k, j) {
							if (j.length == 0 || !j) {
								return
							}
							var h = a('<ul class="childs"></ul>').appendTo(k), b, f;
							for ( var g = 0, e = j.length; g < e; g++) {
								b = a("<li></li>").appendTo(h);
								if (j[g].appendClass) {
									b.addClass(j[g].appendClass)
								}
								f = a("<a></a>").html(j[g].label).appendTo(b);
								if (j[g].href) {
									f.attr("href", j[g].href)
								} else {
									f.attr("href", "javascript:void(0);")
								}
								if (j[g].onclick) {
									f.attr("onclick", j[g].onclick)
								}
								if (j[g].submenus) {
									this.submenuH(b, j[g].submenus)
								}
							}
						},
						log : function(b) {
							a("#log").append(b + "<br/>")
						}
					});
	a.extend(a.ui.menuie, {
		defaults : {
			data : null,
			delay : 300,
			event : "mouseenter",
			direction : "x",
			appendCss : function() {
			}
		},
		load : function() {
			a("[pa_ui_name*=menuie]").each(function(c) {
				a.pa_ui.widget.init(this);
				var b = {}, d;
				d = a(this).attr("pa_ui_menu");
				if (typeof d != "undefined") {
					b = a(this).metadata({
						type : "attr",
						name : "pa_ui_menuie",
						single : "pa_ui_menuie"
					})
				}
				a(this).menuie(b);
				a.pa_ui.widget.inited(this)
			})
		}
	});
	if (a.pa_ui.loadLazy) {
		a(document).ready(function() {
			a.ui.menuie.load()
		})
	} else {
		a.ui.menuie.load()
	}
})(jQuery);
