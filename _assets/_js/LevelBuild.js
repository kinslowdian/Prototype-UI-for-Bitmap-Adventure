	
	var Logic;
	
	var ext_html_path;
	
	var ext_html_data;
	
	var LEVEL_MAIN;	
	
	var json_local_root = "_assets/_data/";
	
	// --------------------------------------------- JSON TOOL
	
	function get_JSON(obj)
	{
		var json_request = new XMLHttpRequest();
		var json_method = "GET"; //other option is POST
		var json_url = json_local_root + obj.dat_FILE; //file
		var json_async = true;
		
		json_request.open(json_method, json_url, json_async);
			
		json_request.onload = function()
		{
			obj.dat_ROM = JSON.parse(this.responseText);
				
			obj.dat_COMPLETE();
		};
			
		json_request.send();
	}
	
	// --------------------------------------------- JSON TOOL	
	
	// --------------------------------------------- HTML TOOL
	
	var load_HTML = function(_html, target)
	{
		var ext_html = ext_html_path + _html;
		var exit_frame;
				
		$(target).load(ext_html, function(html)
		{
			// adding parameters to the event
			event_htmlLoaded.fileLoaded = _html;
			event_htmlLoaded.data = html;
			event_htmlLoaded.dataContainer = target;
					
			$(target).html("");
					
			$(target).html(html);
					
			// stops flickker
			// $("#" + $(target).attr("id") + " > div").addClass("safety");
				
			// firing the event
			exit_frame = setTimeout(function(){ document.dispatchEvent(event_htmlLoaded); }, 20);
		});				
	}	
	
	function html_lib_init()
	{
		$(document).get(0).addEventListener("EVENT_HTML_LOADED", html_lib_loaded, false);
		
		var lf = Logic.dat_ROM["_HTML-EXT"]["file_lib"]["file"];
		var lh = new load_HTML(lf, $("#memory"));		
	}
	
	function html_lib_loaded(event)
	{
		$(document).get(0).removeEventListener("EVENT_HTML_LOADED", html_lib_loaded, false);
		
		html_lib_store();
	}
	
	function html_lib_store()
	{	
		ext_html_data = $("#memory").html();
		
		temp_callback_html();
	}
	
	function html_lib_use(html_class)
	{
		var html;
		
		html = $("#memory ." + html_class).html();
		
		return html;
	}
	
	function html_lib_empty()
	{
		$("#memory").html("");
	}
	
	function html_lib_reuse()
	{
		$("#memory").html(ext_html_data);
		
		// IF FAIL ADD BACK IN
		// temp_callback_html();
	}	
	
	// --------------------------------------------- HTML TOOL
	
	
	var LEVEL = function(settings)
	{
		this.settings = settings;
		this.buildData = {};
		this.titleData = {};
	}
	
	LEVEL.prototype.create = function()
	{
		this.levelNumber 			= this.settings.n; 
		this.weather				= this.settings.weather;
		
		this.buildData.entry_fall	= this.settings.entry_fall;
		this.buildData.fall_x		= this.settings.fall_x;
		this.buildData.fall_y		= this.settings.fall_y;
		this.buildData.direction	= this.settings.fall_d;
		
		this.titleData.act			= this.settings.act;
		this.titleData.title		= this.settings.title;
	
		delete this.settings;
	}	
	
	var level_create_basic = function(settings, num, set, container)
	{
		this.settings = settings;
		this.container = container;
		this.buildData = {};
		this.num = num;
		this.set = set;	
	};
	
	level_create_basic.prototype.create = function()
	{
		this.buildData.block_x	= this.settings.x * 80;
		this.buildData.block_y	= this.settings.y * 80;
		this.buildData.block_w	= this.settings.w * 80;
		this.buildData.block_h	= this.settings.h * 80;
		this.buildData.id		= "level" + ROM.mapLevel + "_" + this.set + this.num;
		this.buildData.pixels	= this.settings.p;
		
		if(this.buildData.pixels.search("collideCheck-field") > -1)
		{
			this.buildData.html 	= '<div id="' + this.buildData.id + '" class="' + this.buildData.pixels + '" data-npc="edge"></div>';
		}
		
		else
		{
			this.buildData.html 	= '<div id="' + this.buildData.id + '" class="' + this.buildData.pixels + '"></div>';
		}
		
		this.buildData.css		= 	{
										"width"				: this.buildData.block_w + "px",
										"height"			: this.buildData.block_h + "px",
										"position"			: "absolute",
										"-webkit-transform"	: "translate(" + this.buildData.block_x + "px, " + this.buildData.block_y + "px)",
										"transform"			: "translate(" + this.buildData.block_x + "px, " + this.buildData.block_y + "px)"
									};
								
		$(this.container).append(this.buildData.html);
		$(this.container + " #" + this.buildData.id).css(this.buildData.css);
		
		delete this.settings;		
	};
	
	function gameData_get()
	{
		Logic = new Object();
		
		Logic.dat_FILE = "setup.json";
		Logic.dat_ROM;
		Logic.dat_COMPLETE = gameData_get_loaded;
		
		get_JSON(Logic);
	}
	
	function gameData_get_loaded()
	{
		// var save_ARR = new Array();
		
		if(!ext_html_path)
		{
			ext_html_path = Logic.dat_ROM["_HTML-EXT"]["file_path"]["url"];
		}
		
		// trace(Logic.dat_ROM);

		// trace(Logic.dat_ROM["_LEVELS"]);

/*
		for(var prop in Logic.dat_ROM["_LEVELS"])
		{
			// trace(Logic.dat_ROM["_LEVELS"][prop]);
			
			for(var j in Logic.dat_ROM["_LEVELS"][prop]["portal"])
			{
				save_ARR.push(Logic.dat_ROM["_LEVELS"][prop]["portal"][j]);
			}
		}
*/
		
		// trace(save_ARR);
		
		
		// prepIntroDataInit();
		
		// HACK
		temp_callback_json();
		// HACK
	}
	
	function level_init()
	{
		LEVEL_MAIN = new LEVEL(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["levelSettings"]);
		
		LEVEL_MAIN.create();		
		
		// RESET SCREEN MOVE?
		
		// SET UP LEVEL INFO NOTICE
		
		if(game_levelChange)
		{
			game_levelChange = false;
		}
		
		level_form();
		
		// ADD LATER
		
		level_player_setup();
	}
	
	function level_form()
	{
		var i;
		
		
		if(ext_html_data)
		{
			html_lib_reuse();
		}
		
		level_weather();
		
		decayBuild();
		
		// FLOOR COLOUR
		
		$(".field-floor > div").addClass(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["texture"]["FLOOR"]["class"]);
		
		// TREES BUSHES
		
		i = 0;
		
		for(var object_bush in Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["texture"]["BUSH"])
		{
			var b = new level_create_basic(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["texture"]["BUSH"][object_bush], i, "BUSH", ".field-area");
			
			b.create();
			
			i++;
		}
		
		// FLOWERS
		
		i = 0;
		
		for(var object_flower in Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["texture"]["FLOWER_LIGHT"])
		{
			var f = new level_create_basic(Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["texture"]["FLOWER_LIGHT"][object_flower], i, "FLOWER_LIGHT", ".field-area");
			
			f.create();
			
			i++;			
		}
		
		// PORTALS (PRE-READ)
		
		if(!portalsOpened)
		{
			portalRead();
			
			portalsOpened = true;
		}
		
		for(var object_portal in portals_ARR)
		{
			if(ROM.mapLevel == portals_ARR[object_portal].spawn)
			{
				portals_ARR[object_portal].build();	
			}
		}
		
		html_lib_empty();	
	}
	
	function level_weather()
	{
		var weather_use = true;
		
		var html_data;
		var html_cont;
		
		if(LEVEL_MAIN.weather === "CLEAR")
		{
			weather_use = false;
		}
		
		else
		{
			if(LEVEL_MAIN.weather === "SNOW")
			{
				html_data = html_lib_use("_weather_data_SNOW");	
				html_cont = ".weather-snow";
			}
			
			if(LEVEL_MAIN.weather === "RAIN")
			{
				html_data = html_lib_use("_weather_data_RAIN");	
				html_cont = ".weather-rain";				
			}
			
			if(LEVEL_MAIN.weather === "WIND")
			{
				html_data = html_lib_use("_weather_data_WIND");	
				html_cont = ".weather-wind";				
			}
		}
		
		if(weather_use)
		{
			$(html_cont).html(html_data);
		}
	}
	
	function decayBuild()
	{
		var decayLength = Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["decay_L"].length;
		
		for(var i = 0; i < decayLength; i++)
		{
			var final_class_L = Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["decay_L"][i].cut;
			var final_class_R = Logic.dat_ROM["_LEVELS"]["level" + ROM.mapLevel]["decay_R"][i].cut;
			
			$(".woodland-darkness-left .landDecayBlock_" + i).addClass(final_class_L);
			
			$(".woodland-darkness-right .landDecayBlock_" + i).addClass(final_class_R);
		}
	}
	
	function level_player_setup()
	{
		trace("level_player_setup();");
		
		if(LEVEL_MAIN.buildData.entry_fall === "YES" && game_introEntrance)
		{
			trace("CATCH");
			
			game_introEntrance = false;
			
			mapPlayer_spawn(LEVEL_MAIN.buildData.fall_x, LEVEL_MAIN.buildData.fall_y, LEVEL_MAIN.buildData.direction, true);
			
			trace(LEVEL_MAIN);
		}
		
		else
		{
			portalExit();
		}
	}
	
	function level_clear()
	{
		$(".field-floor > div").removeAttr("class");
		
		$(".portal-area").html("");
		$(".field-area").html("");
		
		$("#space .weather-snow").html("");
		$("#space .weather-rain").html("");
		$("#space .weather-wind").html("");
	}