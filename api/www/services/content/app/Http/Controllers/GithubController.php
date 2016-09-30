<?php

namespace App\Http\Controllers;

use App\Http\Middleware\Request;
use App\Http\Middleware\FileCache;

class GithubController extends Controller
{
    /**
     * Gets Medium data
     * @return mixed
     */
    public static function getData()
    {
        $cacheFile = dirname(__FILE__) . "/../../../storage/github.json";

        if (!FileCache::cached($cacheFile)) {
          $url = "https://api.github.com/users/voxmachina/repos?sort=updated&per_page=3";
          $data = Request::get($url);
          $content = self::parseData($data);
          file_put_contents($cacheFile, json_encode($content));
        } else {
          $content = json_decode(file_get_contents($cacheFile), true);
        }

        return response()->json($content);
    }

    /**
     * Parses medium json data
     * @param  mixed $data
     * @return array
     */
    private static function parseData($data)
    {
        $data = json_decode($data);
        $posts = $data;
        $content = [];
        $index = 0;

        foreach($posts as $post) {
            if ($index > 2) {
                break;
            }

            $content[$index] = [
                    'id' => $post->id,
                    'title' => $post->name,
                    'subTitle' => $post->description,
                    'url' => $post->html_url,
                    'createdAt' => $post->pushed_at,
            ];

            $index++;
        }

        return $content;
    }
}
