import { Component, OnInit } from "@angular/core";

@Component({
    moduleId: module.id,
    selector: "navigation-menu",
    templateUrl: "menu.component.html",
    styleUrls: ["menu.component.css"]
})

export class MenuComponent {
    isActive: boolean;

    constructor() {
        this.isActive = false;
    }
}
