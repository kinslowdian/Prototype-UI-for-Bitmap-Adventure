	
	var portals_ARR = new Array();
	
	var PORTAL_TRAVEL;
	
	var portal = function()
	{
		
	};
	
	portal.prototype.portal_open = function(portal_num, portal_exist, x, y, w, h, portal_level, portal_exit, portal_direction)
	{
		this.num 			= portal_num;
		this.id 			= "portal_" + portal_exist + "_" + portal_num; // PORTAL NUMBER 1 ON LEVEL 0 === #portal_0_1;
 		
		this.buildData		= {};
		
		this.buildData.block_x 	= x;
		this.buildData.block_y 	= y;
		this.buildData.x		= this.buildData.block_x * 80;
		this.buildData.y 		= this.buildData.block_y * 80;
		this.buildData.w 		= w * 80;
		this.buildData.h 		= h * 80;
		
		this.level				= portal_level;
		this.exit				= portal_exit;	
		this.direction 			= portal_direction;
	};
	
	function portalEntry(portal_hit)
	{
		for(var i in portals_ARR)
		{
			if(portals_ARR[i].id === portal_hit)
			{
				// STAGE TRAVEL
				
				if(portals_ARR[i].level == ROM.level)
				{
					for(var j in portals_ARR)
					{
						if(portals_ARR[i].exit == portals_ARR[j].num)
						{
							PORTAL_TRAVEL = {};
							PORTAL_TRAVEL = portals_ARR[j];	
							
							portalExit();
							
							break;	
						}
					}
					
					break; 
				}
				
				// LEVEL TRAVEL
				
				else
				{
					
				}
			}
		}
	}
	
	function portalExit()
	{
		trace(PORTAL_TRAVEL);
		
/*
		var css;
		
		css = 	{
					"-webkit-transform"	: "translate(" + PORTAL_TRAVEL.buildData.x + "px, " + PORTAL_TRAVEL.buildData.y + "px)",
					"transform"			: "translate(" + PORTAL_TRAVEL.buildData.x + "px, " + PORTAL_TRAVEL.buildData.y + "px)",
				};
				
		$("#" + MAP_PLAYER.playerMover).css(css);
*/
		
		if(PORTAL_TRAVEL.direction === "LEFT" || PORTAL_TRAVEL.direction === "UP")
		{
			mapPlayer_spawn(PORTAL_TRAVEL.buildData.block_x, PORTAL_TRAVEL.buildData.block_y, PORTAL_TRAVEL.direction, false);			
		}
		
		else
		{
			mapPlayer_spawn(PORTAL_TRAVEL.buildData.block_x, PORTAL_TRAVEL.buildData.block_y, PORTAL_TRAVEL.direction, true);	
		}
		
	}