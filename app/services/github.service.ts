import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { GithubPost } from "../models/github-post";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/toPromise";
import { Config } from "../config";

@Injectable()
export class GithubService {

    private postsUrl = Config.getEnvironmentVariable("githubEndpoint");

    constructor(private http: Http) { }

    getPosts(): Promise<GithubPost[]> {
        return this.http.get(this.postsUrl).toPromise()
            .then(this.extractData.bind(this))
            .catch(this.handleError);
    }

    extractData(res: Response): Object[] {
        return res.json();
    }

    handleError(error: any): Promise<void> {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : "Server error";
        console.error(errMsg);

        return Promise.reject(errMsg);
    }
}
