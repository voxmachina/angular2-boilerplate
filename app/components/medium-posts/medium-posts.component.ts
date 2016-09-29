import { Component, AfterViewChecked } from "@angular/core";
import { MediumPost } from "../../models/medium-post";
import { MediumService } from "../../services/medium.service";

@Component({
    selector: "medium-posts",
    templateUrl: "app/components/medium-posts/medium-posts.component.html",
    styleUrls: ["app/components/medium-posts/medium-posts.component.css"]
})

export class MediumPostsComponent implements AfterViewChecked {
    title = "Latest posts from Medium";
    posts: MediumPost[];

    constructor(private mediumService: MediumService) { }

    getPosts(): void {
        this.mediumService.getPosts().then(posts => this.posts = posts);
    }

    ngAfterViewChecked(): void {
        this.getPosts();
    }
}
