<?php

namespace App\Http\Controllers;

use App\Http\Middleware\Request;
use App\Http\Middleware\FileCache;

class MediumController extends Controller
{
    /**
     * Gets Medium data
     * @return mixed
     */
    public static function getData()
    {
        $cacheFile = dirname(__FILE__) . "/../../../storage/medium.json";

        if (!FileCache::cached($cacheFile)) {
          $url = 'https://medium.com/@peugenio/latest?format=json';
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
        // Clean medium protection on json feed
        $data = explode("</x>", $data);
        $data = json_decode($data[1]);
        $posts = $data->payload->references->Post;
        $content = [];
        $index = 0;
        $postUrlPrefix = "https://medium.com/dinomad/";
        $imageUrlPrefix = "https://cdn-images-1.medium.com/max/720/";

        foreach($posts as $post) {
            if ($index > 2) {
                break;
            }

            $content[$index] = [
                    'id' => $post->id,
                    'title' => $post->title,
                    'subTitle' => $post->content->subtitle,
                    'url' => $postUrlPrefix . $post->uniqueSlug,
                    'createdAt' => $post->virtuals->createdAtEnglish,
                    'thumbnail' => '',
            ];

            if ($post->virtuals->previewImage->imageId !== "") {
                $content[$index]['thumbnail'] = $imageUrlPrefix . $post->virtuals->previewImage->imageId;
            }

            $index++;
        }

        return $content;
    }
}
