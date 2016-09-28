import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { MediumPost } from "../models/medium-post";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/toPromise";
import { Config } from "../config";

@Injectable()
export class MediumService {

  private postsUrl = Config.getEnvironmentVariable("mediumEndpoint");
  private postUrlPrefix = "https://medium.com/dinomad/";
  private imageUrlPrefix = "https://cdn-images-1.medium.com/max/720/";

  constructor (private http: Http) {}

  getPosts(): Promise<MediumPost[]> {
    return this.http.get(this.postsUrl).toPromise()
                    .then(this.extractData.bind(this))
                    .catch(this.handleError);
  }

  extractData(res: Response): Object[] {
    let body = res.json();
    let posts = body.payload.references.Post || {};
    let content = [];

    for (let postId in posts) {
      if (posts.hasOwnProperty(postId)) {
        let aPost = posts[postId];
        let aContentItem = {
          id: aPost.id,
          title: aPost.title,
          subTitle: aPost.content.subtitle,
          url: this.postUrlPrefix + aPost.uniqueSlug,
          createdAt: aPost.virtuals.createdAtEnglish,
          thumbnail: ""
        };

        if (aPost.virtuals.previewImage.imageId !== "") {
          aContentItem.thumbnail = this.imageUrlPrefix + aPost.virtuals.previewImage.imageId;
        }

        content.push(aContentItem);
      }
    }

    return content;
  }

  handleError (error: any): Promise<void> {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : "Server error";
    console.error(errMsg);

    return Promise.reject(errMsg);
  }
}
