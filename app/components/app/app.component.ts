import { Component } from "@angular/core";
import { MediumPost } from "../../models/medium-post";
import { MediumService } from "../../services/medium.service";

@Component({
  selector: "dashboard",
  templateUrl: "app/components/app/app.component.html",
  styleUrls: ["app/components/app/app.component.css"]
})

export class AppComponent {
  title = "IGenius";
}
