<?php

use App\Http\Controllers\MediumController;
use App\Http\Controllers\InstagramController;
use App\Http\Controllers\GithubController;
use App\Http\Controllers\AnalyticsController;

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

/**
 * Returns the latest github feed in json format
 * Uses 2 hours file cache mechanism
 */
$app->get('github', function() use ($app) {
    return GithubController::getData();
});

/**
* Returns the latest instagram feed in json format
* Uses 2 hours file cache mechanism
 */
$app->get('instagram', function() use ($app) {
    return InstagramController::getData();
});

/**
* Returns the latest medium feed in json format
* Uses 2 hours file cache mechanism
*/
$app->get('medium', function () use ($app) {
    return MediumController::getData();
});

/**
 * Locally cache google analytics file per two hours
 */
$app->get('analytics.{timestamp}.js', function () use ($app) {
    return AnalyticsController::getAnalytics();
});
$app->get('analytics.js', function () use ($app) {
    return AnalyticsController::getAnalytics();
});
