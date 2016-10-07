import { Component, OnInit } from "@angular/core";

@Component({
    selector: "navigation-menu",
    templateUrl: "./app/components/menu/menu.component.html",
    styleUrls: ["./app/components/menu/menu.component.css"]
})

export class MenuComponent {
    isActive: boolean;

    constructor() {
        this.isActive = false;
    }
}
