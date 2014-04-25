			"portal":
			{
				"PORTAL_0":
				{
					"num": 0,
					"x": 1.5,
					"y": 13.5,
					"w": 1,
					"h": 1,
					"level": 0,
					"exit": 1,
					"direction": "UP",
					"spawn": 0
				},
				
				"PORTAL_1":
				{
					"num": 1,
					"x": 1.5,
					"y": 16.5,
					"w": 1,
					"h": 1,
					"level": 0,
					"exit": 0,
					"direction": "DOWN",
					"spawn": 0
				},
				
				"PORTAL_2":
				{
					"num": 2,
					"x": 0,
					"y": 24,
					"w": 1,
					"h": 1,
					"level": 1,
					"exit": 0,
					"direction": "RIGHT",
					"spawn": 0
				}
			},
			
			
			
			
			
			"portal":
			{
				"PORTAL_0":
				{
					"num": 0,
					"x": 0,
					"y": 3,
					"w": 1,
					"h": 1,
					"level": 0,
					"exit": 2,
					"direction": "RIGHT",
					"spawn": 1
				},
				
				"PORTAL_1":
				{
					"num": 1,
					"x": 0,
					"y": 8,
					"w": 1,
					"h": 1,
					"level": 1,
					"exit": 2,
					"direction": "RIGHT",
					"spawn": 1
				},
				
				"PORTAL_2":
				{
					"num": 2,
					"x": 0,
					"y": 11,
					"w": 1,
					"h": 1,
					"level": 1,
					"exit": 1,
					"direction": "RIGHT",
					"spawn": 1
				},
				
				"PORTAL_3":
				{
					"num": 3,
					"x": 1,
					"y": 13,
					"w": 1,
					"h": 1,
					"level": 1,
					"exit": 4,
					"direction": "LEFT",
					"spawn": 1
				},
				
				"PORTAL_4":
				{
					"num": 4,
					"x": 0,
					"y": 17,
					"w": 1,
					"h": 1,
					"level": 1,
					"exit": 3,
					"direction": "RIGHT",
					"spawn": 1
				},
				
				"PORTAL_5":
				{
					"num": 5,
					"x": 3,
					"y": 24,
					"w": 1,
					"h": 1,
					"level": 2,
					"exit": 0,
					"direction": "LEFT",
					"spawn": 1
				}
			},
			
			
			
			// LEVEL 2 (3) NEXT
			
,
		
		"level2":
		{
			"levelSettings":
			{
				"n": 0,
				"w": 4,
				"h": 25,
				"w": [{"weather": "RAIN"}],
				"t": false,
				"entry_x": 2,
				"entry_y": 1,
				"fall_x": 1.5,
				"fall_y": 3,
				"act": "act iii",
				"title": "level c" 
			},
			
			"texture":
			{
				"BUSH":
				{
					"BUSH_0":
					{
						"x": 0.5,
						"y": 8,
						"w": 1,
						"h": 1,
						"p": "pixels_forest collideCheck-field"
					},
					
					"BUSH_1":
					{
						"x": 2.5,
						"y": 8,
						"w": 1,
						"h": 1,
						"p": "pixels_forest collideCheck-field"
					},
					
					"BUSH_2":
					{
						"x": 0.5,
						"y": 10,
						"w": 1,
						"h": 1,
						"p": "pixels_forest collideCheck-field"
					},
					
					"BUSH_3":
					{
						"x": 2.5,
						"y": 10,
						"w": 1,
						"h": 1,
						"p": "pixels_forest collideCheck-field"
					},
					
					"BUSH_4":
					{
						"x": 0,
						"y": 11.5,
						"w": 4,
						"h": 0.5,
						"p": "pixels_forest collideCheck-field"
					},
					
					"BUSH_5":
					{
						"x": 0,
						"y": 13,
						"w": 4,
						"h": 0.5,
						"p": "pixels_forest collideCheck-field"
					},
					
					"BUSH_6":
					{
						"x": 0.5,
						"y": 14,
						"w": 1,
						"h": 1,
						"p": "pixels_forest collideCheck-field"
					},
					
					"BUSH_7":
					{
						"x": 2.5,
						"y": 14,
						"w": 1,
						"h": 1,
						"p": "pixels_forest collideCheck-field"
					},
					
					"BUSH_8":
					{
						"x": 0.5,
						"y": 16,
						"w": 1,
						"h": 1,
						"p": "pixels_forest collideCheck-field"
					},
					
					"BUSH_9":
					{
						"x": 2.5,
						"y": 16,
						"w": 1,
						"h": 1,
						"p": "pixels_forest collideCheck-field"
					}
				},
				
				"FLOWER_LIGHT":
				{
					"FLOWER_0":
					{
						"x": 0.5,
						"y": 4,
						"w": 3,
						"h": 3,
						"p": "pixels_flowerLight"				
					},
					
					"FLOWER_1":
					{
						"x": 1.5,
						"y": 12,
						"w": 1,
						"h": 1,
						"p": "pixels_flowerLight"				
					},
					
					"FLOWER_2":
					{
						"x": 0.5,
						"y": 18,
						"w": 3,
						"h": 3,
						"p": "pixels_flowerLight"				
					}
				}
			},
						
			"enemyPlayers":
			{
				"ENEMY":
				{
					"ENEMY_0":
					{
						"x": 1.5,
						"y": 8,
						"w": 1,
						"h": 1,
						"n": "level2_griz0",
						"t": "griz",
						"l": 0,
						"head": "BIRD"
					},
					
					"ENEMY_1":
					{
						"x": 1.5,
						"y": 16,
						"w": 1,
						"h": 1,
						"n": "level2_griz1",
						"t": "griz",
						"l": 0,
						"head": "GRIZ"
					}			
				}
			},
			
			"clearing":
			{
				"CLEARING_0":
				{
					"x": 11,
					"y": 6,
					"w": 2,
					"h": 2,
					"n": "level2_clearing0",
					"t": "clearing_cross" 
				},
				
				"CLEARING_1":
				{
					"x": 3,
					"y": 6,
					"w": 2,
					"h": 2,
					"n": "level2_clearing1",
					"t": "clearing_cross" 
				}
			},
			
			"portal":
			{
				"PORTAL_0":
				{
					"x": 1.5,
					"y": 2,
					"w": 1,
					"h": 1,
					"t": "portal",
					"collideInstance": "portal-0",
					"travel": "portal-0",
					"journey": "LEVEL",
					"exitDir": "DOWN",
					"stars": 22,
					"jump": 1,
					"jump_portal": 5
				},
				
				"PORTAL_1":
				{
					"x": 1.5,
					"y": 10,
					"w": 1,
					"h": 1,
					"t": "portal",
					"collideInstance": "portal-1",
					"travel": "portal-1",
					"journey": "LEVEL",
					"exitDir": "UP",
					"stars": 22,
					"jump": 3,
					"jump_portal": 1
				},
				
				"PORTAL_2":
				{
					"x": 1.5,
					"y": 14,
					"w": 1,
					"h": 1,
					"t": "portal",
					"collideInstance": "portal-2",
					"travel": "portal-2",
					"journey": "LEVEL",
					"exitDir": "DOWN",
					"stars": 22,
					"jump": 3,
					"jump_portal": 2
				},
				
				"PORTAL_3":
				{
					"x": 1.5,
					"y": 22,
					"w": 1,
					"h": 1,
					"t": "portal",
					"collideInstance": "portal-3",
					"travel": "portal-3",
					"journey": "LEVEL",
					"exitDir": "UP",
					"stars": 22,
					"jump": 3,
					"jump_portal": 0
				}
				
			},
			
			"decay_L":[{"cut":"landDecay_l_0"}, {"cut":"landDecay_l_1"}, {"cut":"landDecay_l_2"}, {"cut":"landDecay_l_3"}, {"cut":"landDecay_l_4"}, {"cut":"landDecay_l_2"}],
			
			"decay_R":[{"cut":"landDecay_r_0"}, {"cut":"landDecay_r_1"}, {"cut":"landDecay_r_2"}, {"cut":"landDecay_r_3"}, {"cut":"landDecay_r_4"}, {"cut":"landDecay_r_2"}]
		},
		
		"level3":
		{
			"levelSettings":
			{
				"n": 3,
				"w": 4,
				"h": 25,
				"w": [{"weather": "SNOW"}],
				"t": false,
				"entry_x": 2,
				"entry_y": 1,
				"fall_x": 2.5,
				"fall_y": 23,
				"act": "act iv",
				"title": "level d" 
			},
			
			"texture":
			{
				"BUSH":
				{
					"BUSH_0":
					{
						"x": 0,
						"y": 0,
						"w": 4,
						"h": 3.5,
						"p": "pixels_forest collideCheck-field"
					},
					
					"BUSH_1":
					{
						"x": 0,
						"y": 3.5,
						"w": 1.5,
						"h": 0.5,
						"p": "pixels_forest collideCheck-field"
					},
					
					"BUSH_2":
					{
						"x": 2.5,
						"y": 3.5,
						"w": 1.5,
						"h": 0.5,
						"p": "pixels_forest collideCheck-field"
					},
					
					"BUSH_3":
					{
						"x": 0,
						"y": 4,
						"w": 0.5,
						"h": 1,
						"p": "pixels_forest collideCheck-field"
					},
					
					"BUSH_4":
					{
						"x": 3.5,
						"y": 4,
						"w": 0.5,
						"h": 1,
						"p": "pixels_forest collideCheck-field"
					},
					
					"BUSH_5":
					{
						"x": 0,
						"y": 6,
						"w": 0.5,
						"h": 1,
						"p": "pixels_forest collideCheck-field"
					},
					
					"BUSH_6":
					{
						"x": 3.5,
						"y": 6,
						"w": 0.5,
						"h": 1,
						"p": "pixels_forest collideCheck-field"
					},
					
					"BUSH_7":
					{
						"x": 0,
						"y": 7,
						"w": 1.5,
						"h": 0.5,
						"p": "pixels_forest collideCheck-field"
					},
					
					"BUSH_8":
					{
						"x": 2.5,
						"y": 7,
						"w": 1.5,
						"h": 0.5,
						"p": "pixels_forest collideCheck-field"
					},
					
					"BUSH_9":
					{
						"x": 0,
						"y": 7.5,
						"w": 4,
						"h": 14.5,
						"p": "pixels_forest collideCheck-field"
					},
					
					"BUSH_10":
					{
						"x": 0,
						"y": 22,
						"w": 1,
						"h": 3,
						"p": "pixels_forest collideCheck-field"
					},
					
					"BUSH_11":
					{
						"x": 3,
						"y": 22,
						"w": 1,
						"h": 3,
						"p": "pixels_forest collideCheck-field"
					}
				},
				
				"FLOWER_LIGHT":
				{
					"FLOWER_0":
					{
						"x": 1,
						"y": 22,
						"w": 0.5,
						"h": 3,
						"p": "pixels_flowerLight"				
					},
					
					"FLOWER_1":
					{
						"x": 1.5,
						"y": 23,
						"w": 1,
						"h": 1,
						"p": "pixels_flowerLight"				
					},
					
					"FLOWER_2":
					{
						"x": 2.5,
						"y": 22,
						"w": 0.5,
						"h": 3,
						"p": "pixels_flowerLight"				
					},
					
					"FLOWER_HEAVY_0":
					{
						"x": 0.5,
						"y": 4,
						"w": 1,
						"h": 0.5,
						"p": "pixels_flowerHeavy"
					},
					
					"FLOWER_HEAVY_1":
					{
						"x": 0.5,
						"y": 4.5,
						"w": 0.5,
						"h": 0.5,
						"p": "pixels_flowerHeavy"
					},
					
					"FLOWER_HEAVY_2":
					{
						"x": 2.5,
						"y": 4,
						"w": 1,
						"h": 0.5,
						"p": "pixels_flowerHeavy"
					},
					
					"FLOWER_HEAVY_3":
					{
						"x": 3,
						"y": 4.5,
						"w": 0.5,
						"h": 0.5,
						"p": "pixels_flowerHeavy"
					},
					
					"FLOWER_HEAVY_4":
					{
						"x": 0.5,
						"y": 6,
						"w": 0.5,
						"h": 0.5,
						"p": "pixels_flowerHeavy"
					},
					
					"FLOWER_HEAVY_5":
					{
						"x": 3,
						"y": 6,
						"w": 0.5,
						"h": 0.5,
						"p": "pixels_flowerHeavy"
					},
					
					"FLOWER_HEAVY_6":
					{
						"x": 0.5,
						"y": 6.5,
						"w": 1,
						"h": 0.5,
						"p": "pixels_flowerHeavy"
					},
					
					"FLOWER_HEAVY_7":
					{
						"x": 2.5,
						"y": 6.5,
						"w": 1,
						"h": 0.5,
						"p": "pixels_flowerHeavy"
					}
				}
			},
						
			"enemyPlayers":
			{
				"ENEMY":
				{
					"ENEMY_0":
					{
						"x": 1.5,
						"y": 6.5,
						"w": 1,
						"h": 1,
						"n": "level3_griz0",
						"t": "griz",
						"l": 0,
						"head": "BIRD"
					},
					
					"ENEMY_1":
					{
						"x": 1,
						"y": 23,
						"w": 1,
						"h": 1,
						"n": "level3_griz1",
						"t": "griz",
						"l": 0,
						"head": "GRIZ"
					}			
				}
			},
			
			"clearing":
			{
				"CLEARING_0":
				{
					"x": 11,
					"y": 6,
					"w": 2,
					"h": 2,
					"n": "level2_clearing0",
					"t": "clearing_cross" 
				},
				
				"CLEARING_1":
				{
					"x": 3,
					"y": 6,
					"w": 2,
					"h": 2,
					"n": "level2_clearing1",
					"t": "clearing_cross" 
				}
			},
			
			"portal":
			{
				"PORTAL_0":
				{
					"x": 1.5,
					"y": 5,
					"w": 1,
					"h": 1,
					"t": "portal",
					"collideInstance": "portal-0",
					"travel": "portal-0",
					"journey": "LEVEL",
					"exitDir": "DOWN",
					"stars": 22,
					"jump": 2,
					"jump_portal": 3
				},
				
				"PORTAL_1":
				{
					"x": 1.5,
					"y": 22,
					"w": 1,
					"h": 1,
					"t": "portal",
					"collideInstance": "portal-1",
					"travel": "portal-1",
					"journey": "LEVEL",
					"exitDir": "DOWN",
					"stars": 22,
					"jump": 2,
					"jump_portal": 1
				},
				
				"PORTAL_2":
				{
					"x": 1.5,
					"y": 24,
					"w": 1,
					"h": 1,
					"t": "portal",
					"collideInstance": "portal-2",
					"travel": "portal-2",
					"journey": "LEVEL",
					"exitDir": "UP",
					"stars": 22,
					"jump": 2,
					"jump_portal": 2
				}
			},
			
			"decay_L":[{"cut":"landDecay_l_0"}, {"cut":"landDecay_l_1"}, {"cut":"landDecay_l_2"}, {"cut":"landDecay_l_3"}, {"cut":"landDecay_l_4"}, {"cut":"landDecay_l_2"}],
			
			"decay_R":[{"cut":"landDecay_r_0"}, {"cut":"landDecay_r_1"}, {"cut":"landDecay_r_2"}, {"cut":"landDecay_r_3"}, {"cut":"landDecay_r_4"}, {"cut":"landDecay_r_2"}]
		}

			
			
			
			
			