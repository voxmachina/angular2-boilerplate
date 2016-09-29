import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { MediumPostsComponent } from "../medium-posts/medium-posts.component";
import { InstagramPostsComponent } from "../instagram-posts/instagram-posts.component";

import { MediumService } from "../../services/medium.service";
import { InstagramService } from "../../services/instagram.service";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        MediumPostsComponent,
        InstagramPostsComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        MediumService,
        InstagramService
    ]
})

export class AppModule { }
