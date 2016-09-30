import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { enableProdMode } from "@angular/core";
import { Config } from "./config";

import { AppModule } from "./components/app/app.module";

const platform = platformBrowserDynamic();

if (!Config.getEnvironmentVariable("devMode")) {
    enableProdMode();
}

platform.bootstrapModule(AppModule);
