import { Component, OnInit } from "@angular/core";
import { InstagramPost } from "../../models/instagram-post";
import { InstagramService } from "../../services/instagram.service";

@Component({
    selector: "instagram-posts",
    templateUrl: "./app/components/instagram-posts/instagram-posts.component.html",
    styleUrls: ["./app/components/instagram-posts/instagram-posts.component.css"]
})

export class InstagramPostsComponent implements OnInit {
    title = "Latest posts from Instagram";
    posts: InstagramPost[];

    constructor(private instagramService: InstagramService) { }

    getPosts(): void {
        this.instagramService.getPosts().then(posts => this.posts = posts);
    }

    ngOnInit(): void {
        this.getPosts();
    }
}
