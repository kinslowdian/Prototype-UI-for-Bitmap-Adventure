	
	var portals_ARR = new Array();
	
	var PORTAL_TRAVEL;
	
	var html_lib;

	var portal = function(settings, portal_exist, container)
	{
		this.settings 				= settings;
		this.portal_exist 			= portal_exist;
		
		this.buildData				= {};
		this.buildData.html			= html_lib_use("_portal");
		this.buildData.container 	= container;
		
		trace(this);
	};
	
	portal.prototype.portal_open = function()
	{
		this.num 				= this.settings.num;
		this.id 				= "portal_" +  this.portal_exist + "_" + this.num; // PORTAL NUMBER 1 ON LEVEL 0 === #portal_0_1;
		
		this.buildData.block_x 	= this.settings.x;
		this.buildData.block_y 	= this.settings.y;
		this.buildData.x		= this.buildData.block_x * 80;
		this.buildData.y 		= this.buildData.block_y * 80;
		this.buildData.w 		= this.settings.w * 80;
		this.buildData.h 		= this.settings.h * 80;
		
		this.level				= this.settings.level;
		this.exit				= this.settings.exit;	
		this.direction 			= this.settings.direction;
		
		delete this.settings;
		
		$(this.buildData.container).append(this.buildData.html);
		$(this.buildData.container + " #_portal").attr("id", this.id);
		
	};
	
	portal.prototype.build = function()
	{
		this.buildData.css	=	{
									"-webkit-transform"	: "translate(" + this.buildData.x + "px, " + this.buildData.y + "px)",
									"transform"			: "translate(" + this.buildData.x + "px, " + this.buildData.y + "px)"
								};
		
		
		$("#" + this.id).css(this.buildData.css);
	}
	
	function portalEntry(portal_hit)
	{
		for(var i in portals_ARR)
		{
			if(portals_ARR[i].id === portal_hit)
			{
				// STAGE TRAVEL
				
				if(portals_ARR[i].level == ROM.mapLevel)
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
		
		
		if(PORTAL_TRAVEL.direction === "LEFT" || PORTAL_TRAVEL.direction === "UP")
		{
			mapPlayer_spawn(PORTAL_TRAVEL.buildData.block_x, PORTAL_TRAVEL.buildData.block_y, PORTAL_TRAVEL.direction, false);			
		}
		
		else
		{
			mapPlayer_spawn(PORTAL_TRAVEL.buildData.block_x, PORTAL_TRAVEL.buildData.block_y, PORTAL_TRAVEL.direction, true);	
		}
		
	}