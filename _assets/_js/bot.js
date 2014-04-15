	
	var bot_object = {};
	
	function bot_init()
	{
		bot_object.pos_x = 120;
		bot_object.pos_y = 120;
		bot_object.cur_x = 120;
		bot_object.cur_y = 120;
		bot_object.dir = "STILL";
		bot_object.move = 40;
		bot_object.walking = false;
		bot_object.listen = true;
	}
	
	function bot_update()
	{
		if(bot_object.listen)
		{
			if(touchControlData.moveDirection !== bot_object.dir && !bot_object.walking)
			{
				if(touchControlData.moveDirection === "UP")
				{
					bot_object.pos_y -= bot_object.move;
				}
				
				if(touchControlData.moveDirection === "DOWN")
				{
					bot_object.pos_y += bot_object.move;
				}
				
				if(touchControlData.moveDirection === "LEFT")
				{
					bot_object.pos_x -= bot_object.move;
				}
				
				if(touchControlData.moveDirection === "RIGHT")
				{
					bot_object.pos_x += bot_object.move;
				}
				
				if(bot_object.pos_x != bot_object.cur_x || bot_object.pos_y != bot_object.cur_y)
				{
					bot_object.walking = true;
					
					bot_move();
				}
				
				bot_object.dir = touchControlData.moveDirection;
			}	
		}
	}
	
	function bot_move()
	{
		var css;
		
		css = 	{
					"-webkit-transform"	: "translate(" + bot_object.pos_x + "px, " + bot_object.pos_y + "px)",
					"transform"			: "translate(" + bot_object.pos_x + "px, " + bot_object.pos_y + "px)"
				};
		
		$("#pre").css(css);
		
		hitTest();
		
		if(HIT_TEST.hit_edge)
		{
			bot_object.pos_x = bot_object.cur_x;
			bot_object.pos_y = bot_object.cur_y;
			
			bot_object.walking = false;
			
			bot_object.dir = "STILL";
			
			// buggy
			
			// HIT_TEST.hit_edge = false;
		}
		
		else
		{
			$("#bot")[0].addEventListener("webkitTransitionEnd", bot_move_end, false);
			$("#bot")[0].addEventListener("transitionend", bot_move_end, false);
			
			$("#bot").css(css);	
		}
	}
	
	
	function bot_move_end(event)
	{
		$("#bot")[0].removeEventListener("webkitTransitionEnd", bot_move_end, false);
		$("#bot")[0].removeEventListener("transitionend", bot_move_end, false);
		
		bot_object.cur_x = bot_object.pos_x;
		bot_object.cur_y = bot_object.pos_y;
		
		bot_object.walking = false;
		
		bot_object.dir = "STILL";
		
		if(HIT_TEST.hit_portal)
		{
			// alert("PORTAL");
			
			bot_object.listen = false;	
		}
		
		if(HIT_TEST.hit_enemy)
		{
			// alert("ENEMY");
			
			bot_object.listen = false;
		}
		
		else
		{
			bot_update();
		}
	}