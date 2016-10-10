<?php

namespace App\Http\Controllers;

use App\Http\Middleware\Request;
use App\Http\Middleware\FileCache;

class AnalyticsController extends Controller
{
    /**
     * Gets Medium data
     * @return mixed
     */
    public static function getAnalytics()
    {
        $cacheFile = dirname(__FILE__) . "/../../../storage/analytics.js";

        if (!FileCache::cached($cacheFile)) {
          $url = "http://www.google-analytics.com/analytics.js";
          $content = Request::get($url);
          file_put_contents($cacheFile, $content);
        } else {
          $content = file_get_contents($cacheFile);
        }

        return response($content)->withHeaders(['Content-Type' => 'application/javascript']);
    }
}
