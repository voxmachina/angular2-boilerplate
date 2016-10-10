<?php

namespace App\Http\Middleware;

class Request
{
    /**
     * Performs a curl request given an url
     * @param  string $url
     * @return mixed
     */
    public static function get($url)
    {
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

        return $data;
    }
}
