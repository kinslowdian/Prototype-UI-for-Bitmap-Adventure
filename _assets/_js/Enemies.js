	
	var enemyData_ARR = new Array();
	
	var enemies_ARR = new Array();
	
	var enemiesBorn = false;
	
	var enemy = function(settings, container)
	{
		this.settings				= settings;
		this.buildData				= {};
		this.buildData.container	= container;
		this.alive					= true;	
	};
	
	enemy.prototype.create = function()
	{
		this.id 				= this.settings.n;
		this.enemyType 			= this.settings.t;
		this.spawn				= this.settings.spawn;
		this.rating				= this.settings.l;
		
		this.buildData.block_x 	= this.settings.x;
		this.buildData.block_y 	= this.settings.y;
		this.buildData.x		= this.buildData.block_x * 80;
		this.buildData.y 		= this.buildData.block_y * 80;
		this.buildData.w 		= this.settings.w * 80;
		this.buildData.h 		= this.settings.h * 80;
		
		this.buildData.html		= html_lib_use("_enemy_" + this.enemyType);
		
		this.buildData.css		=	{
										"-webkit-transform"	: "translate(" + this.buildData.x + "px, " + this.buildData.y + "px)",
										"transform"			: "translate(" + this.buildData.x + "px, " + this.buildData.y + "px)"
									};
									
		delete this.settings;	
	};
	
	enemy.prototype.build = function()
	{
		$(this.buildData.container).append(this.buildData.html);
		$(this.buildData.container + " #_enemy_" + this.enemyType).attr("id", this.id);
			
		$("#" + this.id).css(this.buildData.css);		
	};
	
	function enemyRead()
	{
		for(var levelData in Logic.dat_ROM["_LEVELS"])
		{
			for(var i in Logic.dat_ROM["_LEVELS"][levelData]["enemyPlayers"]["ENEMY"])
			{
				enemyData_ARR.push(Logic.dat_ROM["_LEVELS"][levelData]["enemyPlayers"]["ENEMY"][i]);
			}
		}
		
		for(var j in enemyData_ARR)
		{
			var e = new enemy(enemyData_ARR[j], ".enemy-area");
			
			e.create();
			
			enemies_ARR.push(e);
		}
		
		trace(enemies_ARR);
		
		enemiesBorn = true;				
	}
	