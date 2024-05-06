import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideProtractorTestingSupport(),
    provideRouter(routes)
  ]
}).catch((err) => console.error(err));
