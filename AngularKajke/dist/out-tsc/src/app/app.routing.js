import { ErrorPageComponent } from './error-page/error-page.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
var appRoutes = [
    { path: '', component: HomeComponent },
    { path: 'error', component: ErrorPageComponent },
    { path: '**', redirectTo: '' }
];
export var routing = RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map