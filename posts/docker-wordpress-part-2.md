---
title: Declutter your WordPress development environment with Docker, Part 2
date: 2022-02-09
excerpt: Implement the light
tags: post
---

# Setting up a development environment for WordPress with Docker

## Installing Docker

The simplest way to get started with Docker is to install it via the Docker Desktop app.

You can find installation instructions and the download here:

https://docs.docker.com/desktop/mac/install/

## Initialize a new `git` repository

We are going to call our project "Eevee's Training Blog".

```bash
git init eevees-training-blog && cd eevees-training-blog
```

## Provision our environment with `docker-compose`

Docker Compose allows us to programmatically provision and configure our development environment in a file `docker-compose.yml` that can be tracked in version control. This makes it simple to ensure that all developers on a team are working on the exact same environment, and to share updates to the environment as they happen.

### Initialize the database

First create the file `docker-compose.yml`:

```bash
touch docker-compose.yml
```

Then add these lines to it:

```yml
# docker-compose.yml

version: '3.3'

services:
  db:
    image: mysql:5.7
    platform: linux/x86_64 # for m1 environments
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: billspc
      MYSQL_DATABASE: eevee_development
      MYSQL_USER: eevee
      MYSQL_PASSWORD: charizard
```

Then run `docker-compose up`. This will pull the image from the Docker registry and spin up a mysql server in a container! Press `ctrl-c` to stop the container.

### Initialize a WordPress server

Wordpress maintains an image on the Docker public registry. We are going to pull that down and connect it to our environment's database

```yml
# docker-compose.yml

...

services:
  ...
  wordpress:
    depends_on:
      - db # wordpress can't run without the db, so we let docker-compose know that here
    image: wordpress:5.8
    platform: linux/x86_64
    restart: always
    ports: 
      - 8000:80 # maps an external port '8000' to an internal port '80' this lets us see the container at localhost:8000
    environment:
      WORDPRESS_DB_HOST: db:3306 # docker-compose lets us use the service name as the host url
      WORDPRESS_DB_USER: eevee
      WORDPRESS_DB_PASSWORD: charizard
      WORDPRESS_DB_NAME: eevee_development
```

Now when you run `docker-compose up` it will pull the WordPress image, configure it to pull data from the database service `db` and map its internal port `80` to a port `8000` on your host machine.

You can then run the "famous five-minute install", by navigating in your browser to `http://localhost:8000`

### Persist the data in the database

We are at a pretty good spot here. But there is a weak link in the chain. If we have to do any work with our `mysql` service we could potentially lose the data we have on our development environment. At best, this could end up as a big time suck, so we are going to use another feature of Docker -- volumes -- to make sure our data is persisted on disk in a place that won't disappear unless we want it to.

We can define a volume for the mysql container like so

```yaml
# docker-compose.yml

# set up the volume
volumes:
  db_data: {}

# configure the db service to store data in the volume
services:
  db:
    ...
    volumes:
      - db_data:/var/lib/mysql
```

This defines a persistent volume, which will be initialized on `docker-compose up` and which will be able to be referenced even after a `docker-compose down`

### Persist `wp-content` uploads

The same issue presents itself with media uploads. We are going to persist this data in our working directory

```yaml
# docker-compose.yml

volumes:
  ...
  wp_content_uploads: {}

services:
  ...
  wordpress:
    ...
    volumes:
      - ./wp-content/uploads:/var/www/html/wp-content/uploads
```

Add this directory to your `.gitignore`

```git
/wp-content/uploads
```

And make sure it is created in your project

```bash
mkdir -p wp-content/uploads
```

### Connect project directories to wordpress Docker image

```yaml
# docker-compose.yml

services:
  ...
  wordpress:
    ...
    volumes:
      ...
      - ./wp-content/plugins:/var/www/html/wp-content/plugins
      - ./wp-content/themes:/var/www/html/wp-content/themes
```

Now pull in whatever starter theme you want to your `wp-content/themes` directory.

I'm going to pull in `twentytwentyone` because its just the default with new wp installs

TODO: does this pull from container?

```bash
mkdir wp-content/themes
curl --output wp-content/themes/twentytwentyone.zip https://downloads.wordpress.org/theme/twentytwentyone.1.4.zip
unzip wp-content/themes/twentytwentyone.zip -d wp-content/themes
```

### Exposing `wp-config.php`

The official WordPress Docker image: https://hub.docker.com/_/wordpress/ allows us to append whatever we want to its internal `wp-config.php` with an environment variable `WORDPRESS_CONFIG_EXTRA` that is configurable via `docker-compose.yml`

We will set up a stub of this for the inevitable future:

```yaml
# docker-compose.yml

...
services:
  ...
  wordpress:
    ...
    environment:
      ...
      WORDPRESS_CONFIG_EXTRA: |
         /* any line below will be added to wp-config.php on the docker container */
         /* define('SAY_HELLO', 'hello'); */
```

## Conclusion

And that is it! You've got a working development environment, and a clean git repo. Any developer on your team with Docker installed can pull down the repository and spin up their environment within a few minutes, and that environment will be consistent across machines.
