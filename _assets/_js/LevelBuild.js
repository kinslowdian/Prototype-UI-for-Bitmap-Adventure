	
	var Logic;
	
	var ext_html_path;
	
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
		LIB_DATA = $("#memory").html();
		
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
		$("#memory").html(LIB_DATA);
		
		temp_callback_html();
	}	
	
	// --------------------------------------------- HTML TOOL
	
	
	var LEVEL = function(settings)
	{
		this.settings = settings;
		this.buildData = {};
	}
	
	LEVEL.prototype.create = function()
	{
		this.buildData.levelNumber 	= this.settings.n; 
		this.buildData.block_w 		= this.settings.w * 80;
		this.buildData.block_h 		= this.settings.h * 80;
		this.buildData.weather		= this.settings.w;
		this.buildData.useTime		= this.settings.t;
		this.buildData.entry_x		= this.settings.entry_x;
		this.buildData.entry_y		= this.settings.entry_y;
		this.buildData.fall_x		= this.settings.fall_x;
		this.buildData.fall_y		= this.settings.fall_y;
		this.buildData.entry_d		= this.settings.entry_d;
		this.buildData.act			= this.settings.act;
		this.buildData.title		= this.settings.title;
	
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
		if(!ext_html_path)
		{
			ext_html_path = Logic.dat_ROM["_HTML-EXT"]["file_path"]["url"];
		}
		
		trace(Logic.dat_ROM);
		
		// prepIntroDataInit();
		
		// HACK
		temp_callback_json();
		// HACK
	}
	
	function level_init()
	{
		LEVEL_MAIN = new LEVEL(Logic.dat_ROM["level" + ROM.mapLevel]["levelSettings"]);
		
		LEVEL_MAIN.create();		
		
		// RESET SCREEN MOVE?
		
		// SET UP LEVEL INFO NOTICE
		
		// SET WEATHER HERE?
	
		
		level_form();
	}
	
	function level_form()
	{
		var i;
		
		i = 0;
		
		// WALLS BUSHES
		$.each(Logic.dat_ROM["level" + ROM.mapLevel]["texture"]["BUSH"], function(item)
		{
			var b = new level_create_basic(Logic.dat_ROM["level" + ROM.mapLevel]["texture"]["BUSH"][item], i, "BUSH", ".field-area");
			
			b.create();
			
			i++;
		});
		
		
		i = 0;
		
		// FLOWERS NON BLOCKING ART
		$.each(Logic.dat_ROM["level" + ROM.mapLevel]["texture"]["FLOWER_LIGHT"], function(item)
		{
			var f = new level_create_basic(Logic.dat_ROM["level" + ROM.mapLevel]["texture"]["FLOWER_LIGHT"][item], i, "FLOWER_LIGHT", ".field-area");
			
			f.create();
			
			i++;
		});
		
		i = 0;
		
		$.each(Logic.dat_ROM["level" + ROM.mapLevel]["portal"], function(item)
		{	
			var p = new portal(Logic.dat_ROM["level" + ROM.mapLevel]["portal"][item], ROM.mapLevel, ".portal-area");
			
			p.portal_open();
			p.build();
			
			portals_ARR.push(p);
			
			trace(i);
			
			i++;
		
		});
		
		html_lib_empty();	
	}