import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { InstagramPost } from "../models/instagram-post";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/toPromise";
import { Config } from "../config";

@Injectable()
export class InstagramService {

    private postsUrl = Config.getEnvironmentVariable("instagramEndpoint");

    constructor(private http: Http) { }

    getPosts(): Promise<InstagramPost[]> {
        return this.http.get(this.postsUrl).toPromise()
            .then(this.extractData.bind(this))
            .catch(this.handleError);
    }

    extractData(res: Response): Object[] {
        let body = res.json();
        let posts = body.data || {};
        let content = [];

        for (let postId in posts) {
            if (posts.hasOwnProperty(postId)) {
                let aPost = posts[postId];
                let aContentItem = {
                    id: aPost.id,
                    title: "",
                    subTitle: "",
                    url: aPost.link,
                    createdAt: this.convertDate(aPost.created_time),
                    thumbnail: aPost.images.standard_resolution.url
                };

                if (aPost.caption !== null && aPost.caption.text !== null) {
                    aContentItem.title = aPost.caption.text;
                }

                if (aPost.location !== null && aPost.location.name !== null) {
                    aContentItem.subTitle = aPost.location.name;
                }

                content.push(aContentItem);
            }
        }

        return content;
    }

    convertDate(timestamp) {
        let a = new Date(timestamp * 1000);
        let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let year = a.getFullYear();
        let month = months[a.getMonth()];
        let date = a.getDate();
        let hour = a.getHours();
        let min = a.getMinutes();
        let sec = a.getSeconds();
        let time = date + " " + month + " " + year;

        return time;
    }

    handleError(error: any): Promise<void> {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : "Server error";
        console.error(errMsg);

        return Promise.reject(errMsg);
    }
}
