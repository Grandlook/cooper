/*
 * jQuery SyntaxHighlighter Plugin
 * version: 1.1
 * @requires jQuery v1.2.2 or later
 *
 * Copyright (c) 2008 AlloVince
 * Examples at: http://allo.ave7.net/JQuery_with_SyntaxHighlighter
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 */
if (jQuery)
	(function($) {
		$
				.extend(
						$,
						{
							SyntaxHighlighter : function(option) {
								var highlighter_name = option.name != undefined ? option.name
										: "SyntaxHighlighter", showGutter = option.showGutter != undefined ? option.showGutter
										: true, showControls = option.showControls != undefined ? option.showControls
										: false, collapseAll = option.collapseAll != undefined ? option.collapseAll
										: false, firstLine = option.firstLine ? option.firstLine
										: 1, showColumns = option.showColumns != undefined ? option.showColumns
										: false;
								if (typeof (option) == "string")
									var dir = option;
								if (typeof (option) == "object")
									dir = option.dir;
								var apptoall = option.apptoall != undefined ? option.apptoall
										: true, autofind = option.autofind != undefined ? option.autofind
										: true, jspath = option.jspath ? option.jspath
										: dir + "Scripts/", csspath = option.csspath ? option.csspath
										: dir + "Styles/", swfpath = option.swfpath ? option.swfpath
										: dir + "Scripts/", highlighter = {
									cpp : {
										alias : "c,c++",
										has : false
									},
									csharp : {
										alias : "c#,c-sharp",
										has : false
									},
									css : {
										has : false
									},
									delphi : {
										alias : "pascal",
										has : false
									},
									java : {
										has : false
									},
									jscript : {
										alias : "js,javascript",
										has : false
									},
									php : {
										has : false
									},
									python : {
										alias : "py",
										has : false
									},
									ruby : {
										alias : "rails,ror",
										has : false
									},
									sql : {
										has : false
									},
									vb : {
										alias : "vb.net",
										has : false
									},
									xml : {
										alias : "html,xhtml,xslt",
										has : false
									}
								}, highlighter_count = 0;
								if (autofind == true)
									var finds = "pre[class],texterea[class]";
								else
									finds = "pre[name='" + highlighter_name
											+ "'][class],texterea[name='"
											+ highlighter_name + "'][class]";
								$(finds)
										.each(
												function() {
													var C = $(this).attr(
															"class");
													C = C.split(":");
													C = C[0];
													if ($(this).css("display") == "none")
														$(this)
																.attr(
																		"name",
																		highlighter_name
																				+ "_lighted");
													if ($(this).attr("name") == undefined
															|| $(this).attr(
																	"name") == highlighter_name)
														for ( var A in highlighter)
															if (A == C) {
																if (highlighter[A].has == false)
																	highlighter_count++;
																highlighter[A].has = true;
																$(this)
																		.attr(
																				"name",
																				highlighter_name);
																break
															} else if (highlighter[A].alias) {
																var _ = highlighter[A].alias
																		.split(",");
																for ( var B = 0; B < _.length; B++)
																	if (C == _[B]) {
																		if (highlighter[A].has == false)
																			highlighter_count++;
																		highlighter[A].has = true;
																		$(this)
																				.attr(
																						"name",
																						highlighter_name);
																		break
																	}
															}
												});
								String.prototype.ucfirst = function() {
									var A = this.split(/\s+/g);
									for ( var _ = 0; _ < A.length; _++) {
										var $ = A[_].match(/(\w)(\w*)/);
										A[_] = $[1].toUpperCase()
												+ $[2].toLowerCase()
									}
									return A.join(" ")
								};
								if (highlighter_count > 0)
									$
											.getScript(
													jspath + "shCore.js",
													function() {
														eval(this);
														$("head")
																.append(
																		"<link rel=\"stylesheet\" type=\"text/css\" media=\"screen\" href=\""
																				+ csspath
																				+ "SyntaxHighlighter.css\" />");
														var i = 0;
														for ( var types in highlighter)
															if (highlighter[types].has == true) {
																var jsfile = jspath
																		+ "shBrush"
																		+ types
																				.ucfirst()
																		+ ".js";
																$
																		.getScript(
																				jsfile,
																				function() {
																					eval(this);
																					i++;
																					if (i == highlighter_count) {
																						dp.SyntaxHighlighter.ClipboardSwf = swfpath
																								+ "clipboard.swf";
																						if (apptoall == false)
																							dp.SyntaxHighlighter
																									.HighlightAll(highlighter_name);
																						if (apptoall == true)
																							dp.SyntaxHighlighter
																									.HighlightAll(
																											highlighter_name,
																											showGutter,
																											showControls,
																											collapseAll,
																											firstLine,
																											showColumns)
																					}
																				})
															}
													})
							}
						})
	})(jQuery)