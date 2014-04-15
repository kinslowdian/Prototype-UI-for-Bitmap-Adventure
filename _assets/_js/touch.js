	
	var trace = function(str){ console.log(str); };
	
	var TOUCH_OBJECT = {};
	
	var touchControlData = {};
	
	$(document).ready(function(){ init(); });
	
	
	function init()
	{
		$("#touchPad-full_L")[0].addEventListener("touchstart", touchFind, false);
		$("#touchPad-full_L")[0].addEventListener("touchmove", touchFind, false);
		$("#touchPad-full_L")[0].addEventListener("touchend", touchFind, false);
			
		$("#touchPad-full_R")[0].addEventListener("touchstart", touchFind, false);
		$("#touchPad-full_R")[0].addEventListener("touchmove", touchFind, false);
		$("#touchPad-full_R")[0].addEventListener("touchend", touchFind, false);
		
		$(window)[0].addEventListener("keydown", keyboardFind, false);
		
		$(window)[0].addEventListener("keyup", keyboardFind, false);
		
		
		TOUCH_OBJECT.allow = true;
		
		touchControlData.x_measure = $("#touchPad-full_L").width();
		touchControlData.y_measure = $("#touchPad-full_R").height();
		
		
		bot_init();
		
		// trace(touchControlData);
		
		touchReset();
		
		//alert("INIT");
		
	}
	
	function touchFind(event)
	{
		event.preventDefault();
		
		// var offset = $("#" + event.target.id).offset();
		
		// debug("event", event.type);
		
		if(event.type === "touchstart" || event.type === "touchmove")
		{
			if(!touchControlData.axisListen) //  === "NONE"
			{
				touchControlData.axisListen = $("#" + event.target.id).attr("data-axis");
				touchControlData.offset = $("#" + event.target.id).offset();
				// set offset for new axis instead of constant writing
				// touchControlData.eventOffset = offset.left;
			}
			
			// debug("x", event.targetTouches[0].clientX - event.pageX);
			// debug("y", event.targetTouches[0].clientY - event.pageY);	
			
			touchControlData.x = event.targetTouches[0].pageX - touchControlData.offset.left;
			touchControlData.y = event.targetTouches[0].pageY - touchControlData.offset.top;
			
			switch(touchControlData.axisListen)
			{
				case "x":
				{
					if(touchControlData.x >= 0 && touchControlData.x <= touchControlData.x_measure)
					{
						touchControlData.controlPercent = Math.round((touchControlData.x / touchControlData.x_measure) * 100);
					
						// debug("xp", touchControlData.controlPercent);
					}
					
					
					break;
				}
				
				case "y":
				{
					if(touchControlData.y >= 0 && touchControlData.y <= touchControlData.y_measure)
					{
						touchControlData.controlPercent = Math.round((touchControlData.y / touchControlData.y_measure) * 100);
						
						// debug("yp", touchControlData.controlPercent);
					}
					
					break;
				}
			}
			
			
			
			// debug("x", touchControlData.x);
			// debug("y", touchControlData.y);
			
			
			// debug("x", event.targetTouches[0].pageX - offset.left);
			// debug("y", event.targetTouches[0].pageY - offset.top);
			
			touchControlSignal();
		}
		
		if(event.type === "touchend")
		{
			touchReset();
		}
		
		// trace(event);
		
		// trace();
		
		// debug("x", event.touches[0].clientX);
		// debug("y", event.touches[0].clientY);
	}
	
	function touchControlSignal()
	{
		if(touchControlData.axisListen === "x")
		{
			if(touchControlData.controlPercent >= 0 && touchControlData.controlPercent < 50)
			{
				touchControlData.moveDirection = "LEFT";
			}
			
			else
			{
				touchControlData.moveDirection = "RIGHT";
			}
		}
		
		else
		{
			if(touchControlData.controlPercent >= 0 && touchControlData.controlPercent < 50)
			{
				touchControlData.moveDirection = "UP";
			}
			
			else
			{
				touchControlData.moveDirection = "DOWN";
			}			
		}
		
		// debug("dir", touchControlData.moveDirection);
		
		touchFeedback();
		
		bot_update();
	}
	
	function touchFeedback()
	{
		var ind;
		
		switch(touchControlData.moveDirection)
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
		
		
		if(touchControlData.moveDirection === "STILL")
		{
			$("#" + touchControlData.indicator).css("opacity", 0);
		}
		
		else
		{
			if(ind !== touchControlData.indicator)
			{
				$("#" + touchControlData.indicator).css("opacity", 0);
				
				$("#" + ind).css("opacity", 1);
				
				touchControlData.indicator = ind;	
			}			
		}
	}
	
	function touchReset()
	{
		touchControlData.axisListen = "";
		touchControlData.moveDirection = "STILL";
		touchControlData.controlPercent = 0;
		touchControlData.eventOffset = 0;
		
		// debug("xp", touchControlData.controlPercent);
		// debug("yp", touchControlData.controlPercent);
		
		// debug("dir", touchControlData.moveDirection);
		
		bot_update();
		
		touchFeedback();
	}
	
	function keyboardFind(event)
	{
		if(event.type === "keyup")
		{
			touchControlData.moveDirection = "STILL";
		}
		
		if(event.type === "keydown")
		{
			switch(event.keyCode)
			{
				case 37:
				{
					// LEFT
					
					touchControlData.moveDirection = "LEFT";
					
					break;
				}
				
				case 38:
				{
					// UP
					
					touchControlData.moveDirection = "UP";
					
					break;
				}
				
				case 39:
				{
					// RIGHT
					
					touchControlData.moveDirection = "RIGHT";
					
					break;
				}
				
				case 40:
				{
					// DOWN
					
					touchControlData.moveDirection = "DOWN";
					
					break;
				}
				
				default:
				{
					touchControlData.moveDirection = "STILL";
				}
			}	
		}
		
		bot_update();
	}
	
	function debug(sel, msg)
	{
		$("#dev .dev-" + sel + " span").text(msg);
	}
	
	