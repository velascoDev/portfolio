"use-strict";

module.exports = ($) => {
	$("#soup-prev, #soup-next").hide();
	$(document).ready(() => {
		setTimeout(() => {
			$("#soup-next").fadeIn("slow");
			const content = [{
		    	title: "EDUARDO VELASCO",
		    	desc: "Welcome to my portfolio."
		  	}, {
		    	title: "I AM A PROGRAMMER",
		    	desc: "programmer n. \prō-gram-mer\ \nAn organism capable of turning caffeine into code."
		  	}, {
		    	title: "I AM A DESIGNER",
		    	desc: "designer n. \deˈzīner\ \nA person who stares at color codes for way too long."
		  	}, {
		    	title: "SEIZE THE DAY",
		    	desc: "What are you waiting for?\nGet out there and make your dreams happen."
		  	}];
		  	let currentPage = 0;
		  	for ( var i = 0; i < content.length; i++ ) {
		    	for ( var obj in content[i] ) {
		      		if ( typeof content[i][obj] === "string" ) {
		        		content[i][obj] = content[i][obj].split("");
		        		continue;
		      		} else if ( typeof content[i][obj] === "object" ) {
		        		let toPush = [];
		        		for( let j = 0; j < content[i][obj].length; j++ ) {
		          			for( let k = 0; k < content[i][obj][j].length; k++ ) {
		            			toPush.push(content[i][obj][j][k]);
		          			}
		        		}
		        		content[i][obj] = toPush;
		      		}
		    	}
			    $("#segments").append("<div class=\"letters-wrap mutable\"><div class=\"soup-title\"></div><div class=\"soup-desc\"></div></div>");
			    setText();
			    $("#segments").append("<div class=\"letters-wrap position-data\"><div class=\"soup-title\"></div><div class=\"soup-desc\"></div></div>");
			    setText();
		  	}
		  	arrangeCurrentPage();
		 	scrambleOthers();
		  	$(window).resize(() => {
		    	arrangeCurrentPage();
		    	scrambleOthers();
		  	});
		  	$("#soup-prev").hide();
		  	$("#soup-prev").click(() => {
		    	$("#soup-nav").fadeOut("fast");
		    	$("#soup-next").show();
		    	$("#soup-nav").fadeIn("fast");
		    	currentPage--;
		    	if (currentPage === 0) {
		      		$(".entypo-right-open-big").stop().addClass("bounce");
		     		$("#soup-prev").stop().fadeOut("fast");
		    	}
		    	arrangeCurrentPage();
		    	scrambleOthers();
		  	});
		  	$("#soup-next").click(() => {
		    	$(".entypo-right-open-big").stop().removeClass("bounce");
		    	$("#soup-prev").stop().fadeIn("slow");
		    	currentPage++;
		    	if ( currentPage === content.length - 1 ) {
		      		$("#soup-next").stop().fadeOut("slow");
		    	}
		    	arrangeCurrentPage();
		    	scrambleOthers();
		  	});

		  	function arrangeCurrentPage() {
		  	  	for ( let i = 0; i < content[currentPage].title.length; i++ ) {
		      		$(".mutable:eq(" + currentPage + ") > .soup-title > .letter").eq(i).css({
			        	left: $(".position-data:eq(" + currentPage + ") > .soup-title > .letter").eq(i).offset().left + "px",
			        	top: $(".position-data:eq(" + currentPage + ") > .soup-title > .letter").eq(i).offset().top + "px",
			        	color: "white",
			        	zIndex: 9001
		      		});
		    	}
			    for ( let i = 0; i < content[currentPage].desc.length; i++ ) {
			      	$(".mutable:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).css({
			        	left: $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).offset().left + "px",
			        	top: $(".position-data:eq(" + currentPage + ") > .soup-desc > .letter").eq(i).offset().top + "px",
			        	color: "white",
			        	zIndex: 9001
			      	});
			    }
		  	}

		  	function setText() {
			    for ( let j = 0; j < content[i].title.length; j++ ) {
			      	$(".soup-title").last().append("<span class=\"letter\">" + content[i].title[j] + "</span>");
			    }
			    for ( let j = 0; j < content[i].desc.length; j++ ) {
			      	$(".soup-desc").last().append("<span class=\"letter\">" + content[i].desc[j] + "</span>");
			    }
		  	}

		  	function scrambleOthers() {
				let parts, randLeft, randTop, offset, bounds, middleX, middleY;
			    for ( let i = 0; i < content.length; i++ ) {
			    	if ( currentPage === i )
			        	continue;
			      	parts = [
			        	["title", ".soup-title"],
			        	["desc", ".soup-desc"]
			      	];
			     	for ( let j = 0; j < parts.length; j++ ) {
			        	for ( let k = 0; k < content[i][parts[j][0]].length; k++ ) {
				          	randLeft = Math.floor(Math.random() * $(window).width());
				          	randTop = Math.floor(Math.random() * $(window).height());
				          	offset = $(".position-data").eq(currentPage).offset();
				          	bounds = {
								left: offset.left,
								top: offset.top,
								right: $(window).width() - offset.left,
								bottom: $(window).height() - offset.top
				          	};
				         	middleX = bounds.left + $(".position-data").eq(currentPage).width() / 2;
				          	middleY = bounds.top + $(".position-data").eq(currentPage).height() / 2;
							$(".mutable:eq(" + i + ") > " + parts[j][1] + " > .letter").eq(k).css({
								left: randLeft,
								top: randTop,
								color: "transparent",
								zIndex: "initial"
							});
			        	}
			      	}
			    }
		  	}
		}, 2000);
	});
};
