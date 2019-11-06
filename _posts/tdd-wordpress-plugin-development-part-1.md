---
title: Creating a WordPress plugin the TDD way - Part 1
date: 2019-11-05
excerpt: It's a dirty job, but someone's gotta do it.
---

# Creating a WordPress plugin the TDD way - Part 1

It's a dirty job, but someone's gotta do it.

Prerequisites to follow along:

- [VVV](https://varyingvagrantvagrants.org/)

## Initial setup

Using WP-CLI, we can quickly bootstrap our plugin with some solid defaults using its built in plugin scaffold generator.

```bash
# start a shell session on the VVV virtual machine
vagrant up
vagrant ssh

# nav to VVV's one.wordpress.test project directory
cd /srv/www/wordpress-one/public_html

# run WP-CLI scaffold
wp scaffold plugin serverless-redirects

# exit vm shell
exit

# init version control in project on your local machine
cd [vvv-directory]/www/wordpress-one/public_html/wp-content/plugins/serverless-redirects
git init
git add .
git commit -m 'initial commit'
```

Update `package.json` and `serverless-redirects.php` with some basic meta information about the plugin.

```json
{
	...
  "author": "Click Here Labs",
	...
}
```

```php
# ./serverless-redirects.php

<?php
/**
 * Plugin Name:     Serverless Redirects
 * Plugin URI:      https://clickherelabs.com
 * Description:     Improve the performance of your Wordpress site by handling redirects on the edge.
 * Author:          Click Here Labs
 * Author URI:      https://clickherelabs.com
 * Text Domain:     serverless-redirects
 * Domain Path:     /languages
 * Version:         0.1.0
 *
 * @package         Serverless_Redirects
 */
```

After updating `serverless-redirects.php` you will be able to see your changes on the [plugin page](http://one.wordpress.test/wp-admin/plugins.php) of your Wordpress install. Neat!

/plugin-screen.png

## Configure Wordpress test suite and test database

```bash
vagrant ssh

# on vagrant box
cd /srv/www/wordpress-one/public_html/wp-content/plugins/serverless-redirects

# run scaffolded script to set up test database `wordpressone_test` with user `root` and pw `root` (VVV defaults)
bin/install-wp-tests.sh wordpressone_test root root
```

## Writing our first tests and setting up an administrative view

First, let's create a function to output the HTML of the administrative view.

In our `./tests` folder, create the file `test-admin.php`. Here we will create our first test, which checks that a function `sr_options_page_html` returns `true` to an `administrator` user. (We are purposefully not going to check the content of the renderer as that is more in the realm of end-to-end tests.)

```php
# ./tests/test-admin.php

<?php

/**
 * Class AdminTest
 *
 * @package Serverless_Redirects
 */

class AdminTest extends WP_UnitTestCase
{
  public function test_admin_permissions()
  {
    $admin_id = $this->factory->user->create(array('role' => 'administrator'));
    wp_set_current_user($admin_id);

    $rendered = sr_options_page_html();

    $this->assertEquals($rendered, true);
  }
}
```

Notice we are breaking the test into three distinct sections.

1. The set up, where we create our dummy administrator user, and set it as the current user.
2. The part where we run the actual code we want to test.
3. The assertions about what we expect that code to do.

This is a good rule of thumb for organizing the code in your tests, and it will really make a difference when you come back to your tests in six months and want to understand what the hell you are actually testing.

Now run the test to make that sure it is failing.

```bash

# run the tests (VVV box)
phpunit

...
1) AdminTest::test_admin_permissions
Error: Call to undefined function sr_options_page_html()

/srv/www/wordpress-one/public_html/wp-content/plugins/serverless-redirects/tests/test-admin.php:16
...
```

Hooray it is! This error message says there is no function `sr_options_page_html`. We probably knew that already, but gives us an idea of what we need to do, which is to create that function.

```php
# ./serverless-redirects.php

...
function sr_options_page_html()
{
  ?>
  <div class="wrap">
    <h1>Serverless Redirects</h1>
  </div>
<?php
  return true;
}
```

Running the test now should give you a happy green `OK (1 test, 1 assertion)`.

Next, because we don't want everybody to have access to administer our site's redirects, let's make sure that a user with the less-privileged role of `author` gets a `null` response from this rendering function.

```php
# ./tests/test-admin.php
...
class AdminTest extends WP_UnitTestCase
{
	...
  public function test_user_permissions()
  {
    $user_id = $this->factory->user->create(array('role' => 'author'));
    wp_set_current_user($user_id);

    $rendered = sr_options_page_html();

    $this->assertEquals($rendered, null);
  }
}
```

When we run our tests again, we find, as expected, that they are failing again.

```bash
There was 1 failure:

1) AdminTest::test_user_permissions
Failed asserting that null matches expected true.
```

We will use some built in Wordpress functionality to get our tests passing.

```php
# ./serverless-redirects.php
...
function sr_options_page_html()
{
  // check permissions
  if (!current_user_can('manage_options')) {
    return;
  }
  ?>
  <div class="wrap">
    <h1>Serverless Redirects</h1>
  </div>
<?php
  return true;
}
```

We use a [guard](<https://en.wikipedia.org/wiki/Guard_(computer_science)>) clause to check the user's permissions, and immediately return `null` if they are insufficient. Run our tests again and they pass!

## Link to this empty husk of a page in the administrative side bar!

I'm going to cheat a little bit here, because I know the solution is simply a call to a built-in Wordpress function `‌[add_management_page](https://developer.wordpress.org/reference/functions/add_management_page/)`. We don't want our tests to test third-party code, so I am just going to put some guard rails on this thing, and make sure that the function we will create is added to the action.

```php
# ./tests/test-admin.php
class AdminTest extends WP_UnitTestCase
{
  ...
  public function test_admin_menu_actions()
  {
    $this->assertEquals(has_action('admin_menu', 'sr_options_page'), true);
  }
}
```

Run the test to make sure it is failing, then create the function `sr_options_page` in `serverless-redirects.php` and configure the sub-menu page.

```php
# ./serverless-redirects.php
...
function sr_options_page()
{
  add_management_page(
    'Serverless Redirects', # page title
    'Serverless Redirects', # menu title
    'administrator', # permissions
    'serverless-redirects', # menu slug
    'sr_options_page_html' # function that generates layout
  );
}
add_action('admin_menu', 'sr_options_page');
```

Once you have added this code your tests will pass again. Activate the plugin and you will see 'Serverless Redirects' in the 'Tools' menu in the admin sidebar. YOU'VE DONE GOOD, KID. Commit your changes to your favorite version control system. Have a jug of the molecules of your choice.

## Dig deeper

READ: [Unit Testing Wordpress Plugins with PHPUnit](https://premium.wpmudev.org/blog/unit-testing-wordpress-plugins-phpunit/)
