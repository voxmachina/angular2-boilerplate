import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./Components/App/app.module";

const platform = platformBrowserDynamic();

platform.bootstrapModule(AppModule);
