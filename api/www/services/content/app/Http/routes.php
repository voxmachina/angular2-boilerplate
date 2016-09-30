<?php

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

  $cacheFile = "../storage/github.json";
  $exists = file_exists($cacheFile);

  if( !$exists || ( $exists && time() > strtotime('+2 hours', filemtime($cacheFile)))) {
    $url = "https://api.github.com/users/voxmachina/repos?sort=updated&per_page=5";

    $curl = curl_init();
    curl_setopt_array(
      $curl,
      [
        CURLOPT_URL            => $url,
        CURLOPT_USERAGENT      => 'spider',
        CURLOPT_TIMEOUT        => 120,
        CURLOPT_CONNECTTIMEOUT => 30,
        CURLOPT_RETURNTRANSFER => TRUE,
        CURLOPT_ENCODING       => 'UTF-8'
      ]
    );
    $data = curl_exec($curl);
    curl_close($curl);

    file_put_contents($cacheFile, $data);
  } else {
    $data = file_get_contents($cacheFile);
  }

  return response()->json(json_decode($data));
});

/**
* Returns the latest instagram feed in json format
* Uses 2 hours file cache mechanism
 */
$app->get('instagram', function() use ($app) {

  $cacheFile = "../storage/instagram.json";
  $exists = file_exists($cacheFile);

  if( !$exists || ( $exists && time() > strtotime('+2 hours', filemtime($cacheFile)))) {
    $url = "https://api.instagram.com/v1/users/".$_ENV['INSTAGRAM_USER_ID']."/media/recent/?access_token=".$_ENV['INSTAGRAM_ACCESS_TOKEN'] . "&count=5";

    $curl = curl_init();
    curl_setopt_array(
      $curl,
      [
        CURLOPT_URL            => $url,
        CURLOPT_USERAGENT      => 'spider',
        CURLOPT_TIMEOUT        => 120,
        CURLOPT_CONNECTTIMEOUT => 30,
        CURLOPT_RETURNTRANSFER => TRUE,
        CURLOPT_ENCODING       => 'UTF-8'
      ]
    );
    $data = curl_exec($curl);
    curl_close($curl);

    file_put_contents($cacheFile, $data);
  } else {
    $data = file_get_contents($cacheFile);
  }

  return response()->json(json_decode($data));
});

/**
* Returns the latest medium feed in json format
* Uses 2 hours file cache mechanism
*/
$app->get('medium', function () use ($app) {

  $cacheFile = "../storage/medium.json";
  $exists = file_exists($cacheFile);

  if( !$exists || ( $exists && time() > strtotime('+2 hours', filemtime($cacheFile)))) {
    $url = 'https://medium.com/@peugenio/latest?format=json';

    $curl = curl_init();
    curl_setopt_array(
      $curl,
      [
        CURLOPT_URL            => $url,
        CURLOPT_USERAGENT      => 'spider',
        CURLOPT_TIMEOUT        => 120,
        CURLOPT_CONNECTTIMEOUT => 30,
        CURLOPT_RETURNTRANSFER => TRUE,
        CURLOPT_ENCODING       => 'UTF-8'
      ]
    );
    $data = curl_exec($curl);
    curl_close($curl);

    // Clean medium protection on json feed
    $data = explode("</x>", $data);
    $data = $data[1];

    file_put_contents($cacheFile, $data);
  } else {
    $data = file_get_contents($cacheFile);
  }

  return response()->json(json_decode($data));
});
