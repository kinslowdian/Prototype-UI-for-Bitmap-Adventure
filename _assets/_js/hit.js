	var HIT_TEST;
	
	function hitTestInit()
	{
		HIT_TEST = {};
		HIT_TEST.hits = null;
		HIT_TEST.hit_edge = false;
		HIT_TEST.hit_portal = false;
		HIT_TEST.hit_enemy = false;
		
	}
	
	function hitTest()
	{
		var hit_id = "";
		
		HIT_TEST.hits = $(".collideCheck-player").collision(".collideCheck-field");
		
		HIT_TEST.hit_edge = false;
		HIT_TEST.hit_portal = false;
		HIT_TEST.hit_enemy = false;
		
		
		if(HIT_TEST.hits[0] != undefined || HIT_TEST.hits[0] != null)
		{
			hit_id = $(HIT_TEST.hits[0]).attr("id");
			
			if($("#" + hit_id).attr("data-npc") === "edge")
			{
				HIT_TEST.hit_edge = true;	
			}
			
			if($("#" + hit_id).attr("data-npc") === "portal")
			{
				HIT_TEST.hit_portal = true;	
			}
			
			if($("#" + hit_id).attr("data-npc") === "enemy")
			{
				HIT_TEST.hit_enemy = true;	
			}
		}
	}
	
	hitTestInit();