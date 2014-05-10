'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [
	function() {
		// Define a set of default roles
		this.defaultRoles = ['user'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if(user) {
				for (var userRoleIndex in user.roles) {
					for (var roleIndex in this.roles) {
						if(this.roles[roleIndex] === user.roles[userRoleIndex]) {
							return true;
						}
					}
				} 
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

	        // Add menu item object
	        this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuClass, level, parentMenuItemURL, menuItemUIRoute, isPublic, roles) {
	            // Validate that the menu exists
	            this.validateMenuExistance(menuId);
	            
	            var menu = {
	                    title: menuItemTitle,
	                    link: menuItemURL,
	                    class: menuClass || '',
	                    level: level || 1,
	                    uiRoute: menuItemUIRoute || ('/' + menuItemURL),
	                    isPublic: isPublic || this.menus[menuId].isPublic,
	                    roles: roles || this.defaultRoles,
	                    subitems: [],
	                    shouldRender: shouldRender
	                },
	                menuItems = this.menus[menuId].items;
	            
	            if (menuClass === 'submenu') {
	                // Search for menu item
	                for (var itemIndex in menuItems) {
	                    switch (level) {
	                        case (1):
	                            if (menuItems[itemIndex].link === parentMenuItemURL) {
	                                // Push new menu item
	                                menuItems[itemIndex].subitems.push(menu);
	                            }
	                            break;
	                        case (2):
	                            for (var subitemIndex in menuItems[itemIndex].subitems) {
	                                if (menuItems[itemIndex].subitems[subitemIndex].link === parentMenuItemURL) {
	                                    // Change parent class to dropdown-submenu
	                                    menuItems[itemIndex].subitems[subitemIndex].class = 'dropdown-submenu';
	                                    
	                                    // Push new menu item
	                                    menuItems[itemIndex].subitems[subitemIndex].subitems.push(menu);
	                                }
	                            }
	                            break;
	                        case (3):
	                            for (var resubitemIndex in menuItems[itemIndex].subitems) {
	                                for (var subSubitemIndex in menuItems[itemIndex].subitems[resubitemIndex].subitems) {
	                                    if (menuItems[itemIndex].subitems[resubitemIndex].subitems[subSubitemIndex].link === parentMenuItemURL) {
	                                        // Change parent class to dropdown-submenu
	                                        menuItems[itemIndex].subitems[resubitemIndex].subitems[subSubitemIndex].class = 'dropdown-submenu';
	                                    
	                                        // Push new menu item
	                                        menuItems[itemIndex].subitems[resubitemIndex].subitems[subSubitemIndex].subitems.push(menu);
	                                    }
	                                }
	                                
	                            }
	                            break; 
	                    }
	                }
	            } else {
	                menuItems.push(menu);
	            }
	            // Return the menu object
	            return this.menus[menuId];
	        };
	        
		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};
		
		// Remove existing menu object by menu id
	        this.removeSubMenuItem = function(menuId, submenuItemURL) {
	            // Validate that the menu exists
	            this.validateMenuExistance(menuId);
	
	            // Search for menu item to remove
	            for (var itemIndex in this.menus[menuId].items) {
	                for (var subitemIndex in this.menus[menuId].items[itemIndex].subitems) {
	                    if (this.menus[menuId].items[itemIndex].subitems[subitemIndex].link === submenuItemURL) {
	                        this.menus[menuId].items[itemIndex].subitems.splice(subitemIndex, 1);
	                    }
	                }
	            }
	
	            // Return the menu object
	            return this.menus[menuId];
	        };

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
