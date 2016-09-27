import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { MediumPost } from "../models/medium-post";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/toPromise";

@Injectable()
export class MediumService {

  private postsUrl = "http://localhost:8080/services/content/public/medium";
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
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : "Server error";
    console.error(errMsg); // log to console instead
    return Promise.reject(errMsg);
  }
}
