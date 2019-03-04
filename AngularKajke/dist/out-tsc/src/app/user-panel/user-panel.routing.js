import { PageNotFoundComponent } from './../shared/components/page-not-found/page-not-found.component';
import { ConfirmEmailChangeComponent } from './confirm-email-change/confirm-email-change.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { HomeComponent } from './home/home.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RootComponent } from './../user-panel/root/root.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
export var routing = RouterModule.forChild([
    {
        path: 'settings',
        component: RootComponent, canActivate: [AuthGuard],
        children: [
            { path: '', component: HomeComponent },
            { path: 'password', component: ChangePasswordComponent },
            { path: 'delete', component: DeleteAccountComponent },
            { path: 'email', component: ChangeEmailComponent },
            { path: 'confirmchange', component: ConfirmEmailChangeComponent },
            { path: '**', component: PageNotFoundComponent }
        ]
    }
]);
//# sourceMappingURL=user-panel.routing.js.map