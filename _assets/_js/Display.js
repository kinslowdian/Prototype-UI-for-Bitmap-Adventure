	var DISPLAY;
	
	function display_init()
	{
		DISPLAY = {};
		
		DISPLAY._width 			= window.screen.width;
		DISPLAY._height 		= window.screen.height;
		
		DISPLAY.screenSectionMove = false;
		DISPLAY.screenSectionStore = 0;
	}
	
	function screenUpdateInit(forceEvent)
	{
		DISPLAY.screenUpdateUse = true;
		
		$(window).on("resize", screenUpdate);
	
		if(forceEvent)
		{
			screenUpdate(null);
		}
	}
	
	function screenUpdateCancel()
	{
		DISPLAY.screenUpdateUse = false;
		
		$(window).off("resize");
	}
	
	function screenUpdate(event)
	{
		var css_x;
		var css_y;
		var x;
		var y;
		
		
		DISPLAY._width 			= window.screen.width;
		DISPLAY._height 		= window.screen.height;
		DISPLAY._width_row 		= Math.round(DISPLAY._width / DISPLAY.tileWidth);
		DISPLAY._height_row 	= Math.round(DISPLAY._height / DISPLAY.tileHeight);
		DISPLAY._width_fill 	= DISPLAY._width_row * DISPLAY.tileWidth;
		DISPLAY._height_fill	= DISPLAY._height_row * DISPLAY.tileHeight;
		
		if(DISPLAY.screenUpdateUse)
		{
			// fix blurring:
			DISPLAY.center_X		= Math.floor(($(".stage-main").width() - $(".stage-view-x").width()) * 0.5);
			
			DISPLAY.center_y	= 0;
			
	
			DISPLAY.center_X < 0 ? x = DISPLAY.center_X : x = 0;
			
			css_x = {
						"-webkit-transform"	: "translateX(" + x + "px)",
						"transform" 		: "translateX(" + x + "px)"
					};
				
			$(".stage-view-x").css(css_x);
			
			
			DISPLAY.stageOffset = $(".stage-view-x").offset().left;
			
			DISPLAY.viewHeight = $(document).height();
			
			DISPLAY.y = 0;	
			DISPLAY.current_y = 0;
			
			
			if(!DISPLAY.screenSections)
			{
				screenDivision();	
			}
		}
	}
	
	function screenDivision()
	{
		DISPLAY._height <= 480 ?  DISPLAY.screenSections = 240 : DISPLAY.screenSections = 320; // 400
	}
	
	function moveStageTest()
	{
		var exitFrame;
		
		var triggered = false;
		
		for(var i = 0; i < 2000 / DISPLAY.screenSections; i++)
		{
			if(MAP_PLAYER.pos_y >= i * DISPLAY.screenSections && MAP_PLAYER.pos_y < (i + 1) * DISPLAY.screenSections)
			{
				if(DISPLAY.screenSectionCurrent != i && !DISPLAY.screenSectionMove)
				{
					if(DISPLAY.screenSectionCurrent != i && !DISPLAY.screenSectionMove)
					{
						DISPLAY.screenSectionMove = true;
						
						DISPLAY.screenSectionStore = i;
						
						i * DISPLAY.screenSections === 0 ? DISPLAY.y = 0 : DISPLAY.y = -(i * DISPLAY.screenSections - 80);
						
						triggered = true;
						
						moveStageScreen();
					}
				}
			}
		}
		
		// CATCH NEW LEVEL WITHOUT A SCREEN MOVE
		
		if(!triggered)
		{				
			if(PORTAL_TRAVEL != null || PORTAL_TRAVEL != undefined)
			{
				if(!game_levelChange)
				{
					if(portalScreenDisplayed)
					{
						portalScreenDisplayed = false;
						
						exitFrame = setTimeout(mapPlayer_entry, 100);
					}
						
					else
					{
						exitFrame = setTimeout(mapPlayer_entry, 1000);	
					}
					
					// mapPlayer_entry();
					//exitFrame = setTimeout(mapPlayer_entry, 1000);
					
					PORTAL_TRAVEL = null;	
				}
			}
		}
	}
	
	function moveStageScreen()
	{
		var css;
		
		css =	{
					"-webkit-transform"		: "translateY(" + DISPLAY.y + "px)",
					"transform"				: "translateY(" + DISPLAY.y + "px)",
					"-webkit-transition"	: "-webkit-transform 1s ease-in-out",
					"transition"			: "transform 6s ease-in-out" 
				};
			
		$(".stage-view-y")[0].addEventListener("webkitTransitionEnd", moveStageScreenEnd, false);
		$(".stage-view-y")[0].addEventListener("transitionend", moveStageScreenEnd, false);
					
		$(".stage-view-y").css(css);			
	}
	
	function moveStageScreenEnd(event)
	{
		var exitFrame;
		
		$(".stage-view-y")[0].removeEventListener("webkitTransitionEnd", moveStageScreenEnd, false);
		$(".stage-view-y")[0].removeEventListener("transitionend", moveStageScreenEnd, false);
		
		DISPLAY.screenSectionCurrent = DISPLAY.screenSectionStore;
		
		DISPLAY.screenSectionMove = false;
		
		if(PORTAL_TRAVEL != null || PORTAL_TRAVEL != undefined)
		{
			if(!game_levelChange)
			{
				if(portalScreenDisplayed)
				{
					portalScreenDisplayed = false;
					
					exitFrame = setTimeout(mapPlayer_entry, 100);
				}
					
				else
				{
					exitFrame = setTimeout(mapPlayer_entry, 1000);	
				}
				
				// mapPlayer_entry();
				//exitFrame = setTimeout(mapPlayer_entry, 1000);
				
				PORTAL_TRAVEL = null;	
			}
		}
		
/*
		if(MAP_PLAYER.enterPortal)
		{

		}
		
		if(playerInPortal)
		{
			if(portalTravelType === "STAGE")
			{
				playerInPortal = false;
				portalTravelType = "";
				
				// PORTAL EXIT CHECK
				playerExitPortal = true;
				
				exitFrame = setTimeout(mapPlayerEntry, 1000, true);
			}
			
			// TRY
			
			if(portalTravelType === "LEVEL")
			{
				playerInPortal = false;
				portalTravelType = "";
				
				// PORTAL EXIT CHECK
				playerExitPortal = true;
				
				exitFrame = setTimeout(mapPlayerEntry, 1000, true);
			}
		}
		
		if(battleEndStatus === "LOSE")
		{
			MAP_PLAYER.allowControl = true;
			
			$(".player-area .player-x").addClass(MAP_PLAYER.tweenClass); 
			
			$(".player-area .player-y").addClass(MAP_PLAYER.tweenClass);
			
			reset_battleEndStatus();
		}	
*/
	}	