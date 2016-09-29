import { Component, OnInit } from "@angular/core";
import { GithubPost } from "../../models/github-post";
import { GithubService } from "../../services/github.service";

@Component({
    selector: "github-posts",
    templateUrl: "app/components/github-posts/github-posts.component.html",
    styleUrls: ["app/components/github-posts/github-posts.component.css"]
})

export class GithubPostsComponent implements OnInit {
    title = "Latest updates from Github";
    posts: GithubPost[];

    constructor(private instagramService: GithubService) { }

    getPosts(): void {
        this.instagramService.getPosts().then(posts => this.posts = posts);
    }

    ngOnInit(): void {
        this.getPosts();
    }
}
