'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Articles', 'articles', 'dropdown');
        	Menus.addMenuItem('topbar', 'All Articles', 'articles', 'submenu', 1, 'articles');
	        Menus.addMenuItem('topbar', 'Editor', 'articles/editor', 'submenu', 1, 'articles');
	        Menus.addMenuItem('topbar', 'Add Article', 'articles/create', 'submenu', 2, 'articles/editor');
	        Menus.addMenuItem('topbar', 'New Article', 'articles/create', 'submenu', 3, 'articles/create');
	}
]);
