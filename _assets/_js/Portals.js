	
	var portalData_ARR = new Array();
	
	var portals_ARR = new Array();
	
	var portalsOpened = false;
	
	var PORTAL_TRAVEL;
	
	var html_lib;

	var portal = function(settings, container)
	{
		this.settings 				= settings;
		this.buildData				= {};
		this.buildData.html			= html_lib_use("_portal");
		this.buildData.container 	= container;
		
		trace(this);
	};
	
	portal.prototype.portal_open = function()
	{	
		this.spawn				= this.settings.spawn;
		this.num 				= this.settings.num;
		this.id 				= "portal_" +  this.spawn + "_" + this.num; // PORTAL NUMBER 1 ON LEVEL 0 === #portal_0_1;
		
		this.buildData.block_x 	= this.settings.x;
		this.buildData.block_y 	= this.settings.y;
		this.buildData.x		= this.buildData.block_x * 80;
		this.buildData.y 		= this.buildData.block_y * 80;
		this.buildData.w 		= this.settings.w * 80;
		this.buildData.h 		= this.settings.h * 80;
		
		this.level				= this.settings.level;
		this.exit				= this.settings.exit;	
		this.direction 			= this.settings.direction;
		
		this.buildData.css	=	{
									"-webkit-transform"	: "translate(" + this.buildData.x + "px, " + this.buildData.y + "px)",
									"transform"			: "translate(" + this.buildData.x + "px, " + this.buildData.y + "px)"
								};
		
		delete this.settings;
	};
	
	portal.prototype.build = function(levelCheck)
	{
/*
		if(levelCheck == this.spawn)
		{
*/
			$(this.buildData.container).append(this.buildData.html);
			$(this.buildData.container + " #_portal").attr("id", this.id);
			
			$("#" + this.id).css(this.buildData.css);	
		/* } */
	}
	
	function portalRead()
	{
		for(var levelData in Logic.dat_ROM["_LEVELS"])
		{
			for(var i in Logic.dat_ROM["_LEVELS"][levelData]["portal"])
			{
				portalData_ARR.push(Logic.dat_ROM["_LEVELS"][levelData]["portal"][i]);
			}
		}

		trace("SAFE");
		trace(portalData_ARR);
		
		for(var j in portalData_ARR)
		{
			var p = new portal(portalData_ARR[j], ".portal-area");
			
			p.portal_open();
			
			portals_ARR.push(p);
		}
				
/*
		for(var portalData in portalData_ARR)
		{
			var p = new portal(portalData_ARR[portalData], ".portal-area");
			
			p.open();
			
			portals_ARR.push(p);
		}
*/
		
		portalsOpened = true;				
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
					for(var k in portals_ARR)
					{
						if(portals_ARR[i].level == portals_ARR[k].spawn)
						{
							if(portals_ARR[i].exit == portals_ARR[k].num)
							{
								game_levelChange = true;
								
								PORTAL_TRAVEL = {};
								PORTAL_TRAVEL = portals_ARR[k];
								
								ROM.mapLevel = portals_ARR[i].level;
								
								trace("!!!! GOING TO: " + ROM.mapLevel);
								trace(PORTAL_TRAVEL);
								
								// NEEDS TO BE IN OWN FUNCTION AND CALLED AFTER FADE:
								level_clear();	
								
								level_init();
								
								portalExit();
								
								break;
							}
						}
					}	
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