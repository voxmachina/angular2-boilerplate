# Angular2 boilerplate on steroids

This is an [Angular2](https://angular.io/) full project boilerplate on steroids!

It provides both frontend and a simple PHP backend REST API service to deliver the data which is being cached for two hours in the filesystem, the Docker image provides everything you'll need to develop locally, so no crazy LAMP installations will occur.

The steroids component is the speed and optimizations already done for you, by using several mechanisms which includes the [Angular AoT compilation mechanism](https://angular.io/docs/ts/latest/cookbook/aot-compiler.html) also but not only and all managed through [Gulp](http://gulpjs.com/) tasks.

Latest performance results from [Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)

![My image](https://voxmachina.github.io/img/boilerplate_gstatus.png)

Latest performance results from [WebPageTest](https://www.webpagetest.org/)

![My image](https://voxmachina.github.io/img/boilerplate_pstatus.png)

The live version of this boilerplate it's actually my own personal website at: http://igeni.us, so feel free to test it for yourself ;)



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

- `npm start` , starts the front-end server
- `sh api/www/services/start` , starts the backend server
  - Before: navigate to api folder and do: `docker build -t ngboilerplate .` to build the image, you only need to do this once, be sure to configure the start script also included in the api folder and [start your docker service](https://docs.docker.com/engine/admin/).



## Tasks

- `gulp build`
  - Task to perform to do a simple build and test the site with `npm start` afterwards
- `gulp dev`
  - Task to be used while developing
- `gulp stage`
  - Task to test your build before deploying
- `gulp deploy`
  - Task to deploy a new release to your server, creating a new symlink and keeping older versions for a rollback if needed