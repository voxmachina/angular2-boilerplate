<?php

namespace App\Http\Middleware;

class FileCache
{
    /**
     * Checks if a file is cached in two hours time
     * @param  string $filename
     * @return bool
     */
    public static function cached($filename)
    {
        $exists = file_exists($filename);

        if (!$exists) {
            return false;
        }

        return strtotime('+2 hours', filemtime($filename)) > time();
    }
}
