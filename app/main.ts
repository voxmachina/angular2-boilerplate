import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
// import { platformBrowser } from "@angular/platform-browser";
import { enableProdMode } from "@angular/core";
import { Config } from "./config";


import { AppModule } from "./components/app/app.module";
// import { AppModuleNgFactory } from "./components/app/app.module.ngfactory";

const platform = platformBrowserDynamic();

if (!Config.getEnvironmentVariable("devMode")) {
    enableProdMode();
}

// platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
platform.bootstrapModule(AppModule);
