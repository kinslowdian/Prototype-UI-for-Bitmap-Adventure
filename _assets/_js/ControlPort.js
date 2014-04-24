
	var MAP_PLAYER;
	
	var CONTROL_SIGNAL;
	
	var HIT_TEST;
	
	function mapPlayer_init(playerMover, playerTween, playerWalkTweenX, playerWalkTweenY, playerFadeTarget, hitTestArea)
	{
		MAP_PLAYER = {};
		
		MAP_PLAYER.pos_x = 120;
		MAP_PLAYER.pos_y = 120;
		MAP_PLAYER.cur_x = 120;
		MAP_PLAYER.cur_y = 120;
		MAP_PLAYER.dir = "STILL";
		MAP_PLAYER.move = 40;
		MAP_PLAYER.walking = false;
		
		MAP_PLAYER.playerMover 		= playerMover;
		MAP_PLAYER.playerTween 		= playerTween;
		MAP_PLAYER.playerWalkTween	= "";
		MAP_PLAYER.playerWalkTweenX = playerWalkTweenX;
		MAP_PLAYER.playerWalkTweenY = playerWalkTweenY;
		MAP_PLAYER.playerFadeTarget = playerFadeTarget;
		MAP_PLAYER.hitTestArea 		= hitTestArea;
		 
		MAP_PLAYER.placement = {};
		MAP_PLAYER.placement.block_x = 0;
		MAP_PLAYER.placement.block_y = 0;
		MAP_PLAYER.placement.block_full = 80;
		MAP_PLAYER.placement.entry = "";
		MAP_PLAYER.placement.enterMap = false;
		
		// MAP_PLAYER link to CONTROL_SIGNAL if false comms is broken
		MAP_PLAYER.listen = false;
	}
	
	function controlSignal_init()
	{
		CONTROL_SIGNAL = {};
		
		if(deviceTest.toString() === "object")
		{
			CONTROL_SIGNAL.enableTouch = true;
			
			if(window.innerWidth < window.innerHeight)
			{
				$("#displayError").addClass("displayErrorHide");
				$("#displayError-base").css("opacity", 0);
			}
			
			else
			{
				$("#displayError").addClass("displayErrorShow");
				$("#displayError-base").css("opacity", 1);
			}
			
			$("#displayError").addClass("tween-displayError");
			$("#displayError-base").addClass("tween-displayError-base");
			
			trace("DEVICE === TOUCH");
		}
		
		else
		{
			CONTROL_SIGNAL.enableTouch = false;
			
			trace("DEVICE === KEYBOARD");
		
			$("#touchPad").remove();
			
			$("#displayError").remove();
		}
		
		CONTROL_SIGNAL.data = {};
		
		if(CONTROL_SIGNAL.enableTouch)
		{
			CONTROL_SIGNAL.data.x_measure = $("#touchPad-full").width();
			CONTROL_SIGNAL.data.y_measure = $("#touchPad-full").height();
			
			// CONTROL_SIGNAL.ui_ready = false;
			CONTROL_SIGNAL.firstTouch = true;
		}
	}
	
	function hitTest_init()
	{
		HIT_TEST = {};
		HIT_TEST.hits = null;
		
		HIT_TEST.hit_edge = false;
		HIT_TEST.hit_portal = false;
		HIT_TEST.hit_enemy = false;		
	}
	
	function mapPlayer_ready()
	{
		MAP_PLAYER.listen = true;
		
		CONTROL_SIGNAL.firstTouch = true;
		
		control_switch(true);
		
		// touchDisplay(null);
	}
	
	
	///////////////////////////////// --- CONTROL
	
	
	// CALL AFTER ENTRY (true), TURN OFF WHEN LEAVING (false)
	
	function control_switch(ON)
	{
		trace("control_switch(ON); === " + ON);
		
		if(ON)
		{
			if(CONTROL_SIGNAL.enableTouch)
			{
				$(window)[0].addEventListener("touchstart", touchDisplay, false);
				$(window)[0].addEventListener("touchend", touchDisplay, false);
				
				$("#touchPad-full")[0].addEventListener("touchstart", touchFind, false);
				$("#touchPad-full")[0].addEventListener("touchmove", touchFind, false);
				$("#touchPad-full")[0].addEventListener("touchend", touchFind, false);
				
				if(CONTROL_SIGNAL.firstTouch)
				{
					touchDisplay(null);	
				}
			}
			
			else
			{
				$(window)[0].addEventListener("keydown", keyboardFind, false);
				$(window)[0].addEventListener("keyup", keyboardFind, false);	
			}			
		}
		
		else
		{
			if(CONTROL_SIGNAL.enableTouch)
			{
				$(window)[0].removeEventListener("touchstart", touchDisplay, false);
				$(window)[0].removeEventListener("touchend", touchDisplay, false);
				
				$("#touchPad-full")[0].removeEventListener("touchstart", touchFind, false);
				$("#touchPad-full")[0].removeEventListener("touchmove", touchFind, false);
				$("#touchPad-full")[0].removeEventListener("touchend", touchFind, false);
				
				touchDisplay(null);
				
				// $("#touchPad").css("opacity", 0);
				
				// CONTROL_SIGNAL.ui_ready = false;
				
				// touchLastTransition();	
			}
			
			else
			{
				$(window)[0].removeEventListener("keydown", keyboardFind, false);
				$(window)[0].removeEventListener("keyup", keyboardFind, false);	
			}
			
			$("#" + MAP_PLAYER.playerMover).removeClass(MAP_PLAYER.playerTween);			
		}
		
		control_reset();
	}
	
	function control_reset()
	{
		CONTROL_SIGNAL.data.moveDirection = "STILL";
		
		if(CONTROL_SIGNAL.enableTouch)
		{
			// CONTROL_SIGNAL.firstTouch = true;
			// CONTROL_SIGNAL.ui_ready = false;
			
			CONTROL_SIGNAL.data.x_percent = 0;
			CONTROL_SIGNAL.data.y_percent = 0;	
			
			touchFeedback();
		}
		
		mapPlayer_update();
	}
	
	function touchFirstTransition()
	{
		var css_touch;
		
		css_touch = 	{
							"-webkit-transform"	: "scale(1)",
							"transform"			: "scale(1)",
							"opacity"			: "1"
						};
		
		$("#touchPad_C .touchPad-cont").css(css_touch);
		
/*
		$("#touchPad_C .touchPad-cont")[0].addEventListener("webkitTransitionEnd", touchTransitionEnd, false);
		$("#touchPad_C .touchPad-cont")[0].addEventListener("transitionend", touchTransitionEnd, false);
			
		$("#touchPad_C .touchPad-cont").css(css_touch);
*/		
	}
	
/*
	function touchLastTransition()
	{
		var css_touch;
		
		css_touch = 	{
							"-webkit-transform"	: "scale(0)",
							"transform"			: "scale(0)",
							"opacity"			: "0"
						};
						
		$("#touchPad_C .touchPad-cont")[0].addEventListener("webkitTransitionEnd", touchTransitionEnd, false);
		$("#touchPad_C .touchPad-cont")[0].addEventListener("transitionend", touchTransitionEnd, false);
			
		$("#touchPad_C .touchPad-cont").css(css_touch);			
	}
*/
	
/*
	function touchTransitionEnd(event)
	{
		$("#touchPad_C .touchPad-cont")[0].removeEventListener("webkitTransitionEnd", touchTransitionEnd, false);
		$("#touchPad_C .touchPad-cont")[0].removeEventListener("transitionend", touchTransitionEnd, false);
		
		CONTROL_SIGNAL.ui_ready = true;
	
		touchFeedback();
	}
*/
	
	function touchDisplay(event)
	{
		var css_max;
		var css_min;
		
		if(event != null)
		{
			event.preventDefault();
			
			if(event.type === "touchstart")
			{
				css_max = 	{
								"-webkit-transform"	: "scale(1)",
								"transform"			: "scale(1)",
								"opacity"			: "1"
							};
							
				css_min = 	{
								"-webkit-transform"	: "scale(0)",
								"transform"			: "scale(0)",
								"opacity"			: "0"
							};
			}
			
			if(event.type === "touchend")
			{
				css_max = 	{
								"-webkit-transform"	: "scale(0)",
								"transform"			: "scale(0)",
								"opacity"			: "0"
							};
							
				css_min = 	{
								"-webkit-transform"	: "scale(1)",
								"transform"			: "scale(1)",
								"opacity"			: "1"
							};
			}
			
		}
		
		else
		{
			if(CONTROL_SIGNAL.firstTouch)
			{
				CONTROL_SIGNAL.firstTouch = false;
				
				css_max = 	{
								"-webkit-transform"	: "scale(1)",
								"transform"			: "scale(1)",
								"opacity"			: "1"
							};
							
				css_min = 	{
								"-webkit-transform"	: "scale(0)",
								"transform"			: "scale(0)",
								"opacity"			: "0"
							};				
			}
			
			else
			{
				css_max = 	{
								"-webkit-transform"	: "scale(0)",
								"transform"			: "scale(0)",
								"opacity"			: "0"
							};
								
				css_min = 	{
								"-webkit-transform"	: "scale(1)",
								"transform"			: "scale(1)",
								"opacity"			: "1"
							};					
			}		
		}
		
		if(css_max && css_min)
		{
			$("#touchPad_C .touchPad-cont").css(css_max);
			$("#touchPad_C .touchPad-min").css(css_min);	
		}
	}	
	
/*
	function touchDisplay(event)
	{
		var css_max;
		var css_min;
		
		if(!CONTROL_SIGNAL.firstTouch)
		{
			event.preventDefault();
			
			if(event.type === "touchstart")
			{
				css_max = 	{
								"-webkit-transform"	: "scale(1)",
								"transform"			: "scale(1)",
								"opacity"			: "1"
							};
							
				css_min = 	{
								"-webkit-transform"	: "scale(0)",
								"transform"			: "scale(0)",
								"opacity"			: "0"
							};
			}
			
			if(event.type === "touchend")
			{
				css_max = 	{
								"-webkit-transform"	: "scale(0)",
								"transform"			: "scale(0)",
								"opacity"			: "0"
							};
							
				css_min = 	{
								"-webkit-transform"	: "scale(1)",
								"transform"			: "scale(1)",
								"opacity"			: "1"
							};
			}
			
			if(css_max && css_min)
			{
				$("#touchPad_C .touchPad-cont").css(css_max);
				$("#touchPad_C .touchPad-min").css(css_min);	
			}
		}
	}
*/
	
	function touchFind(event)
	{
		event.preventDefault();
		
		if(event.type === "touchstart" || event.type === "touchmove")
		{
			if(!CONTROL_SIGNAL.data.offset) //  === "NONE"
			{
				// CONTROL_SIGNAL.data.offset = $("#" + event.target.id).offset();
				
				CONTROL_SIGNAL.data.offset = $("#touchPad-full").offset()
			}	
			
			CONTROL_SIGNAL.data.x = event.targetTouches[0].pageX - CONTROL_SIGNAL.data.offset.left;
			CONTROL_SIGNAL.data.y = event.targetTouches[0].pageY - CONTROL_SIGNAL.data.offset.top;
			
			if(CONTROL_SIGNAL.data.x >= 0 && CONTROL_SIGNAL.data.x <= CONTROL_SIGNAL.data.x_measure)
			{
				CONTROL_SIGNAL.data.x_percent = Math.round((CONTROL_SIGNAL.data.x / CONTROL_SIGNAL.data.x_measure) * 100);
			}
			
			if(CONTROL_SIGNAL.data.y >= 0 && CONTROL_SIGNAL.data.y <= CONTROL_SIGNAL.data.y_measure)
			{
				CONTROL_SIGNAL.data.y_percent = Math.round((CONTROL_SIGNAL.data.y / CONTROL_SIGNAL.data.y_measure) * 100);
			}
			
			touchControlSignal();
		}
		
		if(event.type === "touchend")
		{
/*
			if(CONTROL_SIGNAL.firstTouch)
			{
				CONTROL_SIGNAL.firstTouch = false;
			}
*/
			
			control_reset();
		}
	}
	
	function touchControlSignal()
	{
		if(CONTROL_SIGNAL.data.x_percent >= 33 && CONTROL_SIGNAL.data.x_percent < 66)
		{
			if(CONTROL_SIGNAL.data.y_percent >= 0 && CONTROL_SIGNAL.data.y_percent < 33)
			{
				CONTROL_SIGNAL.data.moveDirection = "UP";
			}
		}
		
		if(CONTROL_SIGNAL.data.x_percent >= 33 && CONTROL_SIGNAL.data.x_percent < 66)
		{
			if(CONTROL_SIGNAL.data.y_percent >= 66 && CONTROL_SIGNAL.data.y_percent <= 100)
			{
				CONTROL_SIGNAL.data.moveDirection = "DOWN";
			}
		}
		
		if(CONTROL_SIGNAL.data.x_percent >= 0 && CONTROL_SIGNAL.data.x_percent < 33)
		{
			if(CONTROL_SIGNAL.data.y_percent >= 33 && CONTROL_SIGNAL.data.y_percent < 66)
			{
				CONTROL_SIGNAL.data.moveDirection = "LEFT";
			}
		}
		
		if(CONTROL_SIGNAL.data.x_percent >= 66 && CONTROL_SIGNAL.data.x_percent <= 100)
		{
			if(CONTROL_SIGNAL.data.y_percent >= 33 && CONTROL_SIGNAL.data.y_percent < 66)
			{
				CONTROL_SIGNAL.data.moveDirection = "RIGHT";
			}
		}	
		
		touchFeedback();
		
		mapPlayer_update();
	}
	
	// CALLED FROM PHONE ROTATE EVENT (BUG FIX)
	
	function touchOffsetUpdate()
	{
		if(CONTROL_SIGNAL.enableTouch)
		{
			CONTROL_SIGNAL.data.offset = $("#touchPad-full").offset();	
		}
	}	
	
	function touchFeedback()
	{
		var ind;
		
		switch(CONTROL_SIGNAL.data.moveDirection)
		{
			case "UP":
			{
				ind = "touchPad-U-ind";
				
				break;
			}
			
			case "DOWN":
			{
				ind = "touchPad-D-ind";
				
				break;
			}
			
			case "LEFT":
			{
				ind = "touchPad-L-ind";
				
				break;
			}
			
			case "RIGHT":
			{
				ind = "touchPad-R-ind";
				
				break;
			}
		}
		
		if(CONTROL_SIGNAL.data.moveDirection === "STILL")
		{
			$("#" + CONTROL_SIGNAL.data.indicator).css("opacity", 0);
		}
		
		else
		{
			if(ind !== CONTROL_SIGNAL.data.indicator)
			{
				$("#" + CONTROL_SIGNAL.data.indicator).css("opacity", 0);
				
				$("#" + ind).css("opacity", 1);
				
				CONTROL_SIGNAL.data.indicator = ind;	
			}		
		}
	}
	
	function keyboardFind(event)
	{
		if(event.type === "keyup")
		{
			CONTROL_SIGNAL.data.moveDirection = "STILL";
		}
		
		if(event.type === "keydown")
		{
			switch(event.keyCode)
			{
				case 37:
				{
					// LEFT
					
					CONTROL_SIGNAL.data.moveDirection = "LEFT";
					
					break;
				}
				
				case 38:
				{
					// UP
					
					CONTROL_SIGNAL.data.moveDirection = "UP";
					
					break;
				}
				
				case 39:
				{
					// RIGHT
					
					CONTROL_SIGNAL.data.moveDirection = "RIGHT";
					
					break;
				}
				
				case 40:
				{
					// DOWN
					
					CONTROL_SIGNAL.data.moveDirection = "DOWN";
					
					break;
				}
				
				default:
				{
					CONTROL_SIGNAL.data.moveDirection = "STILL";
				}
			}	
		}
		
		mapPlayer_update();
	}
	
	
	///////////////////////////////// --- CONTROL
	
	///////////////////////////////// --- PLAYER
	
	function mapPlayer_spawn(x, y, d, moveExtra)
	{
		var css;
		
		var map_x = 0;
		var map_y = 0;
		
		MAP_PLAYER.placement.block_x = x;
		MAP_PLAYER.placement.block_y = y;
		MAP_PLAYER.placement.entry = d;
		MAP_PLAYER.placement.enterMap = true;
		
		map_x = MAP_PLAYER.placement.block_x * MAP_PLAYER.placement.block_full;
		map_y = MAP_PLAYER.placement.block_y * MAP_PLAYER.placement.block_full;
		
		MAP_PLAYER.pos_x = MAP_PLAYER.cur_x = map_x;
		MAP_PLAYER.pos_y = MAP_PLAYER.cur_y = map_y;
		
		
		
		css = 	{
					"-webkit-transform"	: "translate(" + MAP_PLAYER.pos_x + "px, " + MAP_PLAYER.pos_y + "px)",
					"transform"			: "translate(" + MAP_PLAYER.pos_x + "px, " + MAP_PLAYER.pos_y + "px)"
				};
		
		$("#" + MAP_PLAYER.playerMover).css(css);
	
	
		if(moveExtra)
		{
			MAP_PLAYER.move += MAP_PLAYER.move;
		}
		
		else
		{
			
		}
	}
	
	function mapPlayer_entry()
	{
		trace("mapPlayer_entry();");
		
		hitTest_init();
		
		CONTROL_SIGNAL.data.moveDirection = MAP_PLAYER.placement.entry;
		
		MAP_PLAYER.placement.entry = "";
		
		$("#" + MAP_PLAYER.playerMover).addClass(MAP_PLAYER.playerTween);
		
		$("." + MAP_PLAYER.playerFadeTarget).css("opacity", 1);
		
		mapPlayer_update();
	}
	
	function mapPlayer_update()
	{
		if(MAP_PLAYER.listen || MAP_PLAYER.placement.enterMap)
		{
			if(CONTROL_SIGNAL.data.moveDirection !== MAP_PLAYER.dir && !MAP_PLAYER.walking)
			{
				if(CONTROL_SIGNAL.data.moveDirection === "UP")
				{
					MAP_PLAYER.pos_y -= MAP_PLAYER.move;
					
					MAP_PLAYER.playerWalkTween = MAP_PLAYER.playerWalkTweenX;
				}
				
				if(CONTROL_SIGNAL.data.moveDirection === "DOWN")
				{
					MAP_PLAYER.pos_y += MAP_PLAYER.move;
					
					MAP_PLAYER.playerWalkTween = MAP_PLAYER.playerWalkTweenX;
				}
				
				if(CONTROL_SIGNAL.data.moveDirection === "LEFT")
				{
					MAP_PLAYER.pos_x -= MAP_PLAYER.move;
					
					MAP_PLAYER.playerWalkTween = MAP_PLAYER.playerWalkTweenY;
				}
				
				if(CONTROL_SIGNAL.data.moveDirection === "RIGHT")
				{
					MAP_PLAYER.pos_x += MAP_PLAYER.move;
					
					MAP_PLAYER.playerWalkTween = MAP_PLAYER.playerWalkTweenY;
				}
				
				if(MAP_PLAYER.pos_x != MAP_PLAYER.cur_x || MAP_PLAYER.pos_y != MAP_PLAYER.cur_y)
				{
					MAP_PLAYER.walking = true;
					
					mapPlayer_move();
				}
				
				MAP_PLAYER.dir = CONTROL_SIGNAL.data.moveDirection;
			}	
		}		
	}
	
	function mapPlayer_move()
	{
		var css;
		
		css = 	{
					"-webkit-transform"	: "translate(" + MAP_PLAYER.pos_x + "px, " + MAP_PLAYER.pos_y + "px)",
					"transform"			: "translate(" + MAP_PLAYER.pos_x + "px, " + MAP_PLAYER.pos_y + "px)"
				};
		
		$("#" + MAP_PLAYER.hitTestArea).css(css);
		
		hitTest();
		
		if(HIT_TEST.hit_edge)
		{
			MAP_PLAYER.pos_x = MAP_PLAYER.cur_x;
			MAP_PLAYER.pos_y = MAP_PLAYER.cur_y;
			
			MAP_PLAYER.walking = false;
			
			MAP_PLAYER.dir = "STILL";
		}
		
		else
		{
			$("#" + MAP_PLAYER.playerMover + " .player-sprite").addClass(MAP_PLAYER.playerWalkTween);
			
			if(HIT_TEST.hit_portal)
			{
				$("." + MAP_PLAYER.playerFadeTarget).css("opacity", 0);
			}
			
			
			$("." + MAP_PLAYER.playerTween)[0].addEventListener("webkitTransitionEnd", mapPlayer_move_end, false);
			$("." + MAP_PLAYER.playerTween)[0].addEventListener("transitionend", mapPlayer_move_end, false);
			
			$("#" + MAP_PLAYER.playerMover).css(css);	
		}		
	}
	
	function mapPlayer_move_end(event)
	{
		$("." + MAP_PLAYER.playerTween)[0].removeEventListener("webkitTransitionEnd", mapPlayer_move_end, false);
		$("." + MAP_PLAYER.playerTween)[0].removeEventListener("transitionend", mapPlayer_move_end, false);
		
		MAP_PLAYER.cur_x = MAP_PLAYER.pos_x;
		MAP_PLAYER.cur_y = MAP_PLAYER.pos_y;
		
		MAP_PLAYER.walking = false;
		
		MAP_PLAYER.dir = "STILL";
		
		$("#" + MAP_PLAYER.playerMover + " .player-sprite").removeClass(MAP_PLAYER.playerWalkTween);
		
		
		if(MAP_PLAYER.placement.enterMap)
		{
			MAP_PLAYER.placement.enterMap = false;
			
			if(MAP_PLAYER.move != 40)
			{
				MAP_PLAYER.move = 40;	
			}
			
			mapPlayer_ready();
		}
		
		if(HIT_TEST.hit_portal)
		{
			gameStateChange("PORTAL");	
		}
		
		if(HIT_TEST.hit_enemy)
		{
			gameStateChange("ENEMY");
		}
		
		else
		{
			mapPlayer_update();
		}
		
		moveStageTest();
	}
	
	function gameStateChange(gotoState)
	{
		MAP_PLAYER.listen = false;
		
		control_switch(false);
		
		if(gotoState === "PORTAL")
		{
			portalEntry(HIT_TEST.hit_portal_id);
		}
		
		if(gotoState === "ENEMY")
		{
			
		}
	}
	
	
	///////////////////////////////// --- PLAYER
	
	
	///////////////////////////////// --- HITTEST
	
	function hitTest()
	{
		var hit_id = "";
		
		HIT_TEST.hits = $(".collideCheck-player").collision(".collideCheck-field");
		
		HIT_TEST.hit_edge = false;
		HIT_TEST.hit_portal = false;
		HIT_TEST.hit_enemy = false;
		
		HIT_TEST.hit_portal_id = "";
		HIT_TEST.hit_enemy_id = "";
		
		
		if(HIT_TEST.hits[0] != undefined || HIT_TEST.hits[0] != null)
		{
			if($(HIT_TEST.hits[0]).attr("id"))
			{
				hit_id = $(HIT_TEST.hits[0]).attr("id");
			}
			
			
			if($(HIT_TEST.hits[0]).attr("data-npc") === "edge")
			{
				HIT_TEST.hit_edge = true;	
			}
			
			if($(HIT_TEST.hits[0]).attr("data-npc") === "portal")
			{
				HIT_TEST.hit_portal = true;
				
				HIT_TEST.hit_portal_id = hit_id;
				
				alert(HIT_TEST.hit_portal_id);	
			}
			
			if($(HIT_TEST.hits[0]).attr("data-npc") === "enemy")
			{
				HIT_TEST.hit_enemy = true;
				
				HIT_TEST.hit_enemy_id = hit_id;	
			}
		}
	}	
	
	///////////////////////////////// --- HITTEST
	
	
	
	
	
	
	