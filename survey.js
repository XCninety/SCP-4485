/* eslint-disable no-cond-assign */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable no-tabs */
/* eslint-disable no-var */
/* exported log */
// add event cross browser

"use strict";

$(document).ready(function() {	

	var data;
	$.ajax({
		type: "GET",  
		url: "http://sandbox.scp-wiki.kr/local--files/dark-light/names.csv",
		dataType: "text",       
		success: function(response)  
		{
			data = $.csv.toArrays(response);
			generateHtmlTable(data);
		}   
	});

	function generateHtmlTable(data) {
		var html = "<div class='database-table'>";
	
		if(typeof(data[0]) === "undefined") {
			return null;
			} else {
			$.each(data, function( index, row ) {
			//bind header
			if(index == 0) {
				html += "<div class='table-header'>";
				$.each(row, function( index, colData ) {
					html += "<div>";
					html += colData;
					html += "</div>";
				});
				html += "</div>";
				html += "<div class='table-body'>";
				} else {
				$.each(row, function( index, colData ) {
					html += "<div>";
					html += colData;
					html += "</div>";
				});
				}
			});
			html += "</div>";
			html += "</div>";
			$("#database-display").append(html);
			}
		}	

	var submitButton = document.getElementById("submit");
	var warningBox = document.getElementById("warning-box");
	var databaseDisplay = document.getElementById("database-display");
	var databaseTable = document.getElementsByClassName("database-table");
	var tableBody = document.getElementsByClassName("table-body");
	var warningTop = document.getElementsByClassName("warning-top");
	var warningBody = document.getElementsByClassName("warning-body");

	var imageBlocks = document.querySelectorAll(".img-block picture");
	var trust = document.querySelectorAll(".survey-questions");

	$(imageBlocks[3]).mgGlitch({
		// set 'true' to stop the plugin
		destroy : false, 
		// set 'false' to stop glitching
		glitch: true, 
		// set 'false' to stop scaling
		scale: true, 
		// set 'false' to stop glitch blending
		blend : true, 
		// select blend mode type
		blendModeType : "hard-light",
		// set min time for glitch 1 elem
		glitch1TimeMin : 500, 
		// set max time for glitch 1 elem
		glitch1TimeMax : 4000,
		// set min time for glitch 2 elem
		glitch2TimeMin : 150, 
		// set max time for glitch 2 elem
		glitch2TimeMax : 1000,
	});
	
	submitButton.addEventListener("click", function() {	
		var glitchingForm = document.getElementsByClassName("results-items");
		glitchingForm[0].classList.add("glitching");
		$(glitchingForm[0]).mgGlitch({
			// set 'true' to stop the plugin
			destroy : false, 
			// set 'false' to stop glitching
			glitch: true, 
			// set 'false' to stop scaling
			scale: true, 
			// set 'false' to stop glitch blending
			blend : true, 
			// select blend mode type
			blendModeType : "hue",
			// set min time for glitch 1 elem
			glitch1TimeMin : 200, 
			// set max time for glitch 1 elem
			glitch1TimeMax : 400,
			// set min time for glitch 2 elem
			glitch2TimeMin : 10, 
			// set max time for glitch 2 elem
			glitch2TimeMax : 100, 
		});
		setTimeout (() => {			
			warningBox.classList.add("warning-show");
			setTimeout (() => {			
				databaseDisplay.classList.add("warning-show");		
				setTimeout (() => {
					TweenLite.set(tableBody[0],{y:"0%"});

					TweenMax.to(
						tableBody[0], 10, {
							ease:
							CustomEase.create("custom", "M0,0 C0.43,0.022 0.616,0.196 0.7,0.3 0.821,0.45 0.824,1 1,1"), y:"-101%"} );
					setTimeout (() => {
						databaseDisplay.classList.remove("warning-show");
						setTimeout (() => {
							warningTop[0].classList.add("warning-show");
							setTimeout (() => {
								warningBody[0].classList.add("warning-show");
							}, 400);
						}, 800);			
					}, 11000);
				}, 800);
			}, 1000);
		}, 1000);
	});
		
	//clear all input
	function clearInput() {
		$(":input")
		.not(":button, :submit, :reset, :hidden")
		.val("")
		.prop("checked", false)
		.prop("selected", false);
	}

	clearInput();

	// Native fadeOut
	function fadeOut(el, ms) {
	if (ms) {
		el.style.transition = `opacity ${ms} ms`;
		el.addEventListener(
		"transitionend",
		function(event) {
			el.style.display = "none";
		},
		false
		);
	}
	el.style.opacity = "0";
	}

	// Native fadeIn
	function fadeIn(elem, ms) {
	elem.style.opacity = 0;

	if (ms) {
		let opacity = 0;
		const timer = setInterval(function() {
		opacity += 50 / ms;
		if (opacity >= 1) {
			clearInterval(timer);
			opacity = 1;
		}
		elem.style.opacity = opacity;
		}, 50);
	} else {
		elem.style.opacity = 1;
	}
	}

	// Get Width

	function getWidth(el) {
		const styles = window.getComputedStyle(el);
		const width = el.offsetWidth;
		const borderLeftWidth = parseFloat(styles.borderLeftWidth);
		const borderRightWidth = parseFloat(styles.borderRightWidth);
		const paddingLeft = parseFloat(styles.paddingLeft);
		const paddingRight = parseFloat(styles.paddingRight);
		return width - borderRightWidth - borderLeftWidth - paddingLeft - paddingRight;
	}

	// Overwrites native 'firstElementChild' prototype.
	// Adds Document & DocumentFragment support for IE9 & Safari.
	(function(constructor) {
		if (constructor &&
			constructor.prototype &&
			constructor.prototype.firstElementChild == null) {
			Object.defineProperty(constructor.prototype, "firstElementChild", {
				get: function() {
					var node, nodes = this.childNodes, i = 0;
					while (node = nodes[i++]) {
						if (node.nodeType === 1) {
							return node;
						}
					}
					return null;
				}
			});
		}
	})(window.Node || window.Element);
		
	// Randomize the survey questions
	function shuffleQuestions() {
		var container = document.getElementById("survey-wrapper");
		var elementsArray = Array.prototype.slice.call(container.getElementsByClassName("survey-questions"));
			elementsArray.forEach(function(element){
			container.removeChild(element);
		});
		var results = document.getElementById("survey-results");
		shuffleArray(elementsArray);
		elementsArray.forEach(function(element){
			container.insertBefore(element, container.firstElementChild);
		});
		container.appendChild(results);
	}

	// Randomize Radios

	function shuffleRadios() {
		var containers = document.getElementsByClassName("radio");
		for(var i=0; i < containers.length; i++){
			var elementsArray = Array.prototype.slice.call(containers[i].getElementsByClassName("radio-container"));
				elementsArray.forEach(function(element){
				containers[i].removeChild(element);
			});
			shuffleArray(elementsArray);
			elementsArray.forEach(function(element){
				containers[i].insertBefore(element, containers[i].firstElementChild);
			});
		}
	}

	// Shuffle Function

	function shuffleArray(array) {
		for (var i = array.length - 1; i > 0; i--) {
			var m = new MersenneTwister();
			var j = Math.floor(m.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}

	// Fill Employee ID Radios
	function randomIDGen () {
		var alphabet = to_a();
		var symbol = ["/",".","|"];
		var m = new MersenneTwister();
		var r1 = Math.floor((m.random() * 5));
		var idLabels = document.getElementsByClassName("employee-id");

		function to_a(c1 = "a", c2 = "z") {
				var a = "abcdefghijklmnopqrstuvwxyz".split("");
			return (a.slice(a.indexOf(c1), a.indexOf(c2) + 1)); 
		}
		
		function generateId (num) {
			var randomArray = [];
			var randomID = "";
			for (var i=0; i < num; i++) {
				var randNum = Math.floor(m.random(m.random() * 100) * 100); 
                var newNum;
                var n;
				if (0 < randNum && randNum <= 20) {
					n = new MersenneTwister(i);
					newNum = alphabet[Math.floor((n.random() * 25))];
				}
				if (21 < randNum && randNum <= 90) {
					n = new MersenneTwister(i);
					newNum = Math.floor((n.random() * 10));
				}
				if (91 < randNum && randNum <= 99) {
					n = new MersenneTwister(i);
					newNum = symbol[Math.floor((n.random() * 3))];
				}
				randomArray.push(newNum);
			}
			randomID =  randomArray.join("");
			return randomID;
		}

		for (i=0; i < idLabels.length; i++) {
			idLabels[i].innerHTML = generateId(20);
		}
		if (localStorage.getItem("RandomID") !== null) {
			idLabels[1].innerHTML = localStorage.getItem("RandomID");
		}
	}

	shuffleQuestions();
	shuffleRadios();
	randomIDGen();

	var slideshow = document.getElementById("survey-wrapper");

	var flkty = [];
	
	setTimeout (() => {
	flkty = new Flickity( slideshow, {
			cellAlign: "center",
			contain: true,
			resize: false,
			draggable: false,
			freeScroll: false,
			wrapAround: false,
			autoPlay: false,
			watchCSS: true,
			accessibility: true,
			setGallerySize: false,
			prevNextButtons: false,
			pageDots: false
		});
	}, 250);

	window.addEventListener("resize", () => {
		setTimeout(() => {
            // resize after un-hiding Flickity
			flkty.resize();
		},250);
	});

	var inputFields = document.querySelectorAll("input[type='text']");

	for(var i=0; i < inputFields.length; i++){
		inputFields[i].addEventListener("focusin", (event) => {		
			TweenMax.to(event.target.parentNode.querySelector("input[type='text'] + label"), 0.25, {
				ease:CustomEase.create(
					"custom", "M0,0 C0.4,0 0.2,1 1,1"
			), scale:0.8, y:-35, x:-20, color:"#7c8080"} );
		});
		inputFields[i].addEventListener("focusout", (event) => {
			if (event.target.value.length == 0) {
				console.log(event.target.value.length);
				TweenMax.to(event.target.parentNode.querySelector("input[type='text'] + label"), 0.25, {
					ease:CustomEase.create(
						"custom", "M0,0 C0.4,0 0.2,1 1,1"
				), scale:1, y:0, x:0, color:"#c80005"} );
			}
		});
	}

	var bgLayers = document.querySelectorAll(".layers-container > div");

	var bgVars = {
		varNames: [
			"circOneY",
			"circOneX",
			"circTwoY",
			"circTwoX",
			"logoOneY",
			"logoOneX",
			"logoOneR",
			"logoTwoY",
			"logoTwoX",
			"logoTwoR",
			"logoThrY",
			"logoThrX",
			"logoThrR",
			"logoForY",
			"logoForX",
			"logoForR"
		],
		varValues: [
			-30,
			0,
			15,
			0,
			15,
			10,
			-50,
			-15,
			10,
			-25,
			-15,
			-10,
			25,
			15,
			-10,
			50
		]
	};

	setTimeout(() => {
		TweenMax.from(document.body, 0.5, {
			ease:CustomEase.create(
				"custom", "M0,0 C0.4,0 0.2,1 1,1"
		), autoAlpha:0, delay:1} );
	}, 1000);

	//Random animation

	function randomAnimation () {
		for(var i=0; i < bgVars.varNames.length; i++){
            var m;
            var num;
			if ([1,3].indexOf(i) > -1) {
				num = 2;
				m = new MersenneTwister();
				num *= Math.floor(m.random()*2) == 1 ? 1 : -1;
				bgVars.varValues[i] = bgVars.varValues[i] + num;
			}
			m = new MersenneTwister();
			num = Math.floor(m.random()*(bgVars.varValues[i] / 10)) + 1;

			num *= Math.floor(m.random()*2) == 1 ? 1 : -1;
			bgVars.varValues[i] = bgVars.varValues[i] + num;
			if ([0,1].indexOf(i) > -1) {
				TweenMax.to(bgLayers[1], 10, {
					ease:CustomEase.create(
						"custom", "M0,0 C0.4,0 0.2,1 1,1"
				), y:bgVars.varValues[0] + "%", x:bgVars.varValues[1] + "%"} );
			}
			if ([2,3].indexOf(i) > -1) {
				TweenMax.to(bgLayers[2], 10, {
					ease:CustomEase.create(
						"custom", "M0,0 C0.4,0 0.2,1 1,1"
				), y:bgVars.varValues[2] + "%", x:bgVars.varValues[3] + "%"} );
			}
			if ([4,5,6].indexOf(i) > -1) {
				TweenMax.to(bgLayers[3], 10, {
					ease:CustomEase.create(
						"custom", "M0,0 C0.4,0 0.2,1 1,1"
				), y:bgVars.varValues[4] + "%", x:bgVars.varValues[5] + "%", transformOrigin:"center, center", rotation:bgVars.varValues[6]} );
			}
			if ([7,8,9].indexOf(i) > -1) {
				TweenMax.to(bgLayers[4], 10, {
					ease:CustomEase.create(
						"custom", "M0,0 C0.4,0 0.2,1 1,1"
				), y:bgVars.varValues[7] + "%", x:bgVars.varValues[8] + "%", transformOrigin:"center, center", rotation:bgVars.varValues[9]} );
			}
			if ([10,11,12].indexOf(i) > -1) {
				TweenMax.to(bgLayers[5], 10, {
					ease:CustomEase.create(
						"custom", "M0,0 C0.4,0 0.2,1 1,1"
				), y:bgVars.varValues[10] + "%", x:bgVars.varValues[11] + "%", transformOrigin:"center, center", rotation:bgVars.varValues[12]} );
			}
			if ([13,14,15].indexOf(i) > -1) {
				TweenMax.to(bgLayers[6], 10, {
					ease:CustomEase.create(
						"custom", "M0,0 C0.4,0 0.2,1 1,1"
				), y:bgVars.varValues[13] + "%", x:bgVars.varValues[14] + "%", transformOrigin:"center, center", rotation:bgVars.varValues[15]} );
			}
			if (i > 15) {
			console.log("you dun fuk'd up");
			}
		}
	}

	// begin survey
	document.getElementById("begin-button").addEventListener("click", () => {
		document.getElementById("start-survey").classList.add("remove");
		function bgStartAnimation () {
			//var layerDivs = document.querySelectorAll(".layers-container > div[class*='layer']");
			//for(var i=0; i < layerDivs.length; i++){
			//	layerDivs[i].classList.toggle("transform")
			//}
			//setTimeout(() => {
			//	for(var i=0; i < layerDivs.length; i++){
			//		layerDivs[i].classList.toggle("transform")
			//	}
			//}, 2000);
			TweenMax.to(document.getElementById("start-survey"), 0.5, {
				ease:CustomEase.create(
					"custom", "M0,0 C0.4,0 0.2,1 1,1"
			), autoAlpha:0} );
			//Background animations
			//First Gradient
			TweenMax.to(bgLayers[0], 2, {
				ease:CustomEase.create(
					"custom", "M0,0 C0.4,0 0.2,1 1,1"
			), scale:3, y:"-50%"} );
			// First Circles
			TweenMax.to(bgLayers[1], 2, {
				ease:CustomEase.create(
					"custom", "M0,0 C0.4,0 0.2,1 1,1"
			), scale:2.5, y:bgVars.varValues[0] + "%"} );
			//Second Circles
			TweenMax.to(bgLayers[2], 2, {
				ease:CustomEase.create(
					"custom", "M0,0 C0.4,0 0.2,1 1,1"
			), scale:1.5, y:bgVars.varValues[2] + "%"} );
			//First Logo
			TweenMax.to(bgLayers[3], 2, {
				ease:CustomEase.create(
					"custom", "M0,0 C0.4,0 0.2,1 1,1"
			), y:bgVars.varValues[4] + "%", x:bgVars.varValues[5] + "%", transformOrigin:"center, center", rotation:bgVars.varValues[6]} );
			//Second Logo
			TweenMax.to(bgLayers[4], 2, {
				ease:CustomEase.create(
					"custom", "M0,0 C0.4,0 0.2,1 1,1"
			), y:bgVars.varValues[7] + "%", x:bgVars.varValues[8] + "%", transformOrigin:"center, center", rotation:bgVars.varValues[9]} );
			//Third Logo
			TweenMax.to(bgLayers[5], 2, {
				ease:CustomEase.create(
					"custom", "M0,0 C0.4,0 0.2,1 1,1"
			), y:bgVars.varValues[10] + "%", x:bgVars.varValues[11] + "%", transformOrigin:"center, center", rotation:bgVars.varValues[12]} );
			//Forth Logo
			TweenMax.to(bgLayers[6], 2, {
				ease:CustomEase.create(
					"custom", "M0,0 C0.4,0 0.2,1 1,1"
			), y:bgVars.varValues[13] + "%", x:bgVars.varValues[14] + "%", transformOrigin:"center, center", rotation:bgVars.varValues[15]} );
			//First Gradient
			TweenMax.to(bgLayers[7], 2, {
				ease:CustomEase.create(
					"custom", "M0,0 C0.4,0 0.2,1 1,1"
			), scale:4, y:"-50%"} );

			setTimeout(() => {
				TweenMax.from(document.getElementById("survey-wrapper"), 0.5, {
					ease:CustomEase.create(
						"custom", "M0,0 C0.4,0 0.2,1 1,1"
				), autoAlpha:0, scale:0.6, delay:0.25} );
			}, 1000);
			setTimeout(() => {
				flkty.resize();
			}, 250);
		}

		window.requestAnimationFrame(bgStartAnimation);
	});

	// Foundation Input Box

	var foundation = ["T","H","E"," ","F","O","U","N","D","A","T","I","O","N"];
	var typeIndex = 0;
	var input = $("#group6-item");
	var focusBox = $("#focusbox");

	$(focusBox).click(function() {
		$(focusBox).addClass("selected");
		$(input).addClass("selected");
		$(input).focus();
	});

	$(input).on("focusout", function() {
		$(input).removeClass("selected");
		$(focusBox).removeClass("selected");
	});

	$(input).on("keydown", function (evt) {
		var key = evt.keyCode || evt.charCode;
		if ( key == 8 || key == 46 ) {
			if (typeIndex > 0) {
				typeIndex = typeIndex - 1;
				var str = $(this).val();
				var position = document.getElementById("group6-item").selectionStart-1;
				str = str.substr(0, position) + "" + str.substr(position + 1);
				$(this).val(str);
			}
		}
		else if (typeIndex<14) {
			$(this).sendKeys(foundation[typeIndex]);
			typeIndex = typeIndex + 1;
		}
		console.log(typeIndex);
		evt.preventDefault();
	});
	//input.on("keydown", function() {
	//	var key = event.keyCode || event.charCode;
	//	if( key == 8 || key == 46 ) {
	//		if (typeIndex > 0) {
	//			typeIndex = typeIndex - 1;
	//			return false;
	//		}
	//	}
	//});
	//input.on("keypress", function (e) {
	//	e.preventDefault;
	//	if (typeIndex<14) {
	//		typeIndex = typeIndex + 1;
	//		return foundation[typeIndex];
	//	}
	//	else {
	//		return false;
	//	}
	//});

	// Initialize Progress Bar
	var totalQuestions = document.querySelectorAll(".survey-questions").length;
	var incrementWidth = 100 / totalQuestions;

	// Progress Bar Update
			
	var clickNext = () => {
		flkty.next();
		setTimeout(() => {
			flkty.resize();
		}, 1000);
		function progressBar (){
			var wrapperWidth = getWidth(document.getElementById("progress-wrapper"));
			var progressWidth = getWidth(document.getElementById("progress-bar"));
			var currentWidth = (progressWidth / wrapperWidth) * 100;
			var newWidth = currentWidth + incrementWidth;
			var newWidthRounded = newWidth.toFixed();
			document.getElementById("progress-bar")
				.style.width = (newWidth + "%");
			document.getElementById("progress-bar")
				.setAttribute("data-progress", newWidthRounded);
		}

			window.requestAnimationFrame(progressBar);
			window.requestAnimationFrame(randomAnimation);
		
		// generate responses
		setTimeout(() => {
			var lastSlide = document.getElementById("survey-results");
			if (lastSlide.classList.contains("is-selected")) {
				var resultsContent = document.getElementById("results-paragraph").textContent;
				// large long haired cats response
				if (
					resultsContent.indexOf("cats") > -1 &&
					resultsContent.indexOf("large") > -1 &&
					resultsContent.indexOf("long fur") > -1
				) {
					document.getElementById("results-paragraph").insertAdjacentHTML("afterend", 
						"<p class=\"response\">Lions are not great pets.</p>"
					);
				}				
				// nothing
				else {
					document.getElementById("results-paragraph").insertAdjacentHTML("afterend", 
						""
					);
				}
			}
		}, 1);
	};
	
	var nextButton = document.querySelectorAll(".next-button");
	var backButton = document.querySelectorAll(".back-button");
	var backWarning = document.querySelectorAll(".back-warning");

	for(var j=0; j < nextButton.length; j++){
		nextButton[j].addEventListener("click", () => {
            clickNext();
        }, false);
	}

	for(var k=0; k < backButton.length; k++){
		backButton[k].addEventListener("click", () => {
            flkty.previous(false);
			var wrapperWidth = getWidth(document.getElementById("progress-wrapper"));
			var progressWidth = getWidth(document.getElementById("progress-bar"));
			var currentWidth = (progressWidth / wrapperWidth) * 100;
			var newWidth = currentWidth - incrementWidth;
			document.getElementById("progress-bar")
				.setAttribute("data-progress", newWidth);
			document.getElementById("progress-bar")	
				.style.width = (newWidth + "%");
			window.requestAnimationFrame(randomAnimation);
        }, false);
	}

	// Hide Back Button If First Slide

	backButton[0].style.display = "none"; 
	backWarning[0].style.display = "none"; 

	// reset carousel and progress bar on "start over"
	document.getElementById("start-over").addEventListener("click", () => {
		flkty.select(0);
		window.requestAnimationFrame(randomAnimation);
		document.getElementById("progress-bar").style.width = "0%";
		setTimeout(() => {
			var responseSpan = document.querySelectorAll("span.response-span");
			var responsePara = document.getElementsByClassName("response")[0];

			responsePara.parentNode.removeChild(responsePara);
			for(var i=0; i < responseSpan.length; i++){
				responseSpan[i].innerHTML = "";
			}
		}, 200);
	});

	// show previous question button once user has gotten into the quiz
	var showPrev = document.querySelectorAll(".flickity-slider > div:first-of-type .survey-question input");

	for(var l=0; l < showPrev.length; l++){
		showPrev[l].change(() => {
			document.getElementById("previous-question").fadeIn(1000);
		});
	}


	// hide previous question button once user has finished the quiz
	var showPrevEnd = document.querySelectorAll(".flickity-slider > div:nth-last-child(2) .survey-question input");

	for(var m=0; m < showPrev.length; m++){
		showPrevEnd[m].addEventListener("click", () => {
			document.getElementById("previous-question").fadeOut(500);
		});
	}

	// display results
	//var resultInput = document.querySelectorAll("input");

	//for(var i=0; i < resultInput.length; i++){
	//	resultInput[i].addEventListener("click", () => {
	//		var inputName = resultInput[i].getAttribute("name");
	//		var inputValue = resultInput[i].getAttribute("value");
	//		document.getElementById("" + inputName + "-response").innerHTML = inputValue;
	//	});
	//}

	var inputTextArea = document.querySelectorAll("input[type='text']");

	function nextOnEnter(event){
		if(event.which === 13){
			clickNext();
			event.preventDefault();
		}
	}

	for(var n=0; n < inputTextArea.length; n++){
		inputTextArea[n].addEventListener("keydown", nextOnEnter);
	}

	$("form").submit(function(e) {
		e.preventDefault();
		var $inputs = $("form input");
		console.log($inputs);
	
		$inputs.each(function() {
			localStorage.setItem($(this).attr("id"), $(this).val());
		});
	});

});
