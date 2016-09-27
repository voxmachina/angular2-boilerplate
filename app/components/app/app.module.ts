import { NgModule }      from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpModule } from "@angular/http";

import { AppComponent } from "./app.component";
import { MediumPostsComponent } from "../medium-posts/medium-posts.component";

import { MediumService } from "../../services/medium.service";

@NgModule({
  imports: [
    BrowserModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    MediumPostsComponent
  ],
  bootstrap: [AppComponent],
  providers: [MediumService]
})

export class AppModule { }
