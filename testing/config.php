<?php



$config['site_title'] = 'Take Me To Denmark';			// Site title
$config['base_url'] = 'http://testing.takemetodenmark.com'; 				// Override base URL (e.g. http://example.com)
$config['theme'] = 'tmtd-custom'; 			// Set the theme (defaults to "default")
$config['date_format'] = 'jS M Y';		// Set the PHP date format
$config['twig_config'] = array(			// Twig settings
	'cache' => false,					// To enable Twig caching change this to CACHE_DIR
	'autoescape' => false,				// Autoescape Twig vars
	'debug' => false					// Enable Twig debug
);
$config['pages_order_by'] = 'date';	// Order pages by "alpha" or "date"
$config['pages_order'] = 'asc';			// Order pages "asc" or "desc"
$config['excerpt_length'] = 50;			// The pages excerpt length (in words)

// To add a custom config setting:


// Uploads folder
$config['uploads_folder'] = 'http://testing.takemetodenmark.com/uploads/'; 	// Can be accessed by {{ config.uploads_folder }} in a theme

//
// // better navigation plugin
// $config['at_navigation']['id'] = 'main-nav';
// $config['at_navigation']['class'] = 'menu';
// $config['at_navigation']['class_li'] = '';
// $config['at_navigation']['class_a'] = '';
// // $config['at_navigation']['exclude']['single'] = array('study/*', 'paperwork/*');
// $config['at_navigation']['exclude']['folder'] = array('housing', 'paperwork');


 $config['custom_meta_values'] = array(
	// custom meta
	'hero' => 'Hero',
	'keywords' => 'Keywords',
	'icon' => 'Icon',
	'hook' => 'Hook',
);

$config['pages_order_by'] = 'placing';
