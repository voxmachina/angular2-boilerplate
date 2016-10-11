# Angular2 boilerplate on steroids

This is an [Angular2](https://angular.io/) full project boilerplate on steroids!

It provides both frontend and a simple PHP backend REST API service to deliver the data which is being cached for two hours in the filesystem, the Docker image provides everything you'll need to develop locally, so no crazy LAMP installations will occur.

The steroids component is the speed and optimizations already done for you, by using several mechanisms which includes the [Angular AoT compilation mechanism](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html) also but not only and all managed through [Gulp](http://gulpjs.com/) tasks.

Latest performance results from [Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)

![My image](https://voxmachina.github.io/img/boilerplate_gstatus.png)

Latest performance results from [WebPageTest](https://www.webpagetest.org/)

![My image](https://voxmachina.github.io/img/boilerplate_pstatus.png)

The live version of this boilerplate it's actually my own personal website at: http://igeni.us, so feel free to test it for yourself ;)

## About

This implements a simple personal website with three pages, reading content from json endpoints from Medium, Instagram and Github; then there's an about page and a contacts page.

The front-end section is build with Angular2, the back-end uses PHP to deliver the results and also cache them locally, also provides all the necessary .htaccess files and rules to make the app work properly.

The project uses a series of methods and mechanisms to achieve top performance and speed, and all is manageable through simple Gulp tasks; the only more complex task is the task that performs the Angular AoT compilation mechanism which replaces the app entry code by updating some imports, as it was a hacky solution to achieve conditional imports because that is something that Typescript does not support.

Another complex mechanism is added as a task also to deliver a first version of the content for the above-the-fold target, which basically transforms index.html into an index.php with the top menu bar and only loads through PHP the Medium feed, a barely perceived difference on good connections, but on slow connections it makes all the difference between someone leaving your site or start reading something right away and staying for more. 

If you're interested you can read all about this project story on Medium: ToDo

## Dependencies

- [Node v6+](https://nodejs.org/en/)
- [Docker](https://www.docker.com/)
- [Composer](https://getcomposer.org/)
- [Gulp](http://gulpjs.com/)



## Installation

- `npm install`
- navigate to: api/www/services/content and do `composer install`



## Configuration

- gulp.json
  - `cp config/gulp.example.json config/gulp.json`
  - Fill in your details:
    - ssh for later deploy usage to your server
    - googleKey for analytics site ID ([the first part of the html file](https://support.google.com/webmasters/answer/35179?hl=en))
    - cloudfare credentials ([signup now for the free plan](https://www.cloudflare.com/plans/))
- .env
  - `cp api/www/services/content/.env.example api/www/services/content/.env`
  - Your [Instagram API credentials](https://bobmckay.com/web/simple-tutorial-for-getting-an-instagram-clientid-and-access-token/) if you plan to use it

## Servers

- `npm start` , starts the front-end server, be sure to have a build first with `gulp build`
- Configure your back-end server:
  - [Start your docker service](https://docs.docker.com/engine/admin/).
  - Navigate to api folder and do: `docker build -t ngboilerplate .` to build the image, you only need to do this once.
  - Configure your shared folder path both in api/start script
  - `sh api/start` , starts the back-end server



## Tasks

- `gulp build`
  - Task to perform to do a simple build and test the site with `npm start` afterwards
- `gulp dev`
  - Task to be used while developing
- `gulp stage`
  - Task to test your build before deploying
- `gulp deploy`
  - Task to deploy a new release to your server, creating a new symlink and keeping older versions for a rollback if needed
- `gulp clean`
  - Task to clean temporary build folders and files




## Above the fold content optimization

These files represent what is first loaded into the page initially:

- config/critical.scss
- config/critical.html

The content of these files will later be injected into the index file at the moment of a deploy, this index.html will be moved into an index.php file and load the latest Medium only posts from the cached json file.

You'll need to keep these in sync with changes/updates you do to your designs, layout and data.


## License

MIT

