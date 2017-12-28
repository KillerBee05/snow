import { LayoutComponent } from '../layout/layout.component';

import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { RecoverComponent } from '../pages/recover/recover.component';
import { LockComponent } from '../pages/lock/lock.component';
import { MaintenanceComponent } from '../pages/maintenance/maintenance.component';
import { Error404Component } from '../pages/error404/error404.component';
import { Error500Component } from '../pages/error500/error500.component';

import { LunchComponent } from '../components/lunch/lunch.component';
import { ClientComponent } from '../components/client/client.component';
import { UserComponent } from '../components/user/user.component';
import { EditClientComponent } from '../components/edit-client/edit-client.component';
import { AddClientComponent } from '../components/add-client/add-client.component';
import { AuthGuard } from '../guards/auth.guard';

export const routes = [

    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', loadChildren: './home/home.module#HomeModule' },
            { path: 'dashboard', loadChildren: '../kitchen-sink/dashboard/dashboard.module#DashboardModule' },
            { path: 'widgets', loadChildren: '../kitchen-sink/widgets/widgets.module#WidgetsModule' },
            { path: 'elements', loadChildren: '../kitchen-sink/elements/elements.module#ElementsModule' },
            { path: 'forms', loadChildren: '../kitchen-sink/forms/forms.module#FormsModule' },
            { path: 'charts', loadChildren: '../kitchen-sink/charts/charts.module#ChartsModule' },
            { path: 'tables', loadChildren: '../kitchen-sink/tables/tables.module#TablesModule' },
            { path: 'maps', loadChildren: '../kitchen-sink/maps/maps.module#MapsModule' },
            { path: 'blog', loadChildren: '../kitchen-sink/blog/blog.module#BlogModule' },
            { path: 'ecommerce', loadChildren: '../kitchen-sink/ecommerce/ecommerce.module#EcommerceModule' },
            { path: 'extras', loadChildren: '../kitchen-sink/extras/extras.module#ExtrasModule' },
            { path: 'lunch', component: LunchComponent, canActivate:[AuthGuard] },
            { path: 'client', component: ClientComponent, canActivate:[AuthGuard] },
            { path: 'user', component: UserComponent, canActivate:[AuthGuard] },
            { path: 'edit-client', component: EditClientComponent, canActivate:[AuthGuard] },
            { path: 'add-client', component: AddClientComponent, canActivate:[AuthGuard] }
        ]
    },

    // Not lazy-loaded routes
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'recover', component: RecoverComponent },
    { path: 'lock', component: LockComponent },
    { path: 'maintenance', component: MaintenanceComponent },
    { path: '404', component: Error404Component },
    { path: '500', component: Error500Component },

    // Not found
    { path: '**', redirectTo: 'home' }

];
