//Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule  } from 'angular2-flash-messages';
import { JwtModule } from '@auth0/angular-jwt'

//Main App module
import { AppComponent } from './components/app/app.component';
// import { AppRoutingModule } from './routes/app-routing.module';

//Routing modules
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

//Angle theme Modules
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { RoutesModule } from './routes/routes.module';


// Services
import { ClientService } from './services/client/client.service';
import { RegisterService } from './services/register/register.service';
import { ValidationService } from './services/validation/validation.service';
import { AuthService } from './services/auth/auth.service';


// Components
import { LunchComponent } from './components/lunch/lunch.component';
import { ClientComponent } from './components/client/client.component';
import { UserComponent } from './components/user/user.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { ClientFilterPipe } from './pipes/client-filter.pipe';

// https://github.com/ocombe/ng2-translate/issues/218
export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        LunchComponent,
        ClientComponent,
        UserComponent,
        RegisterComponent,
        LoginComponent,
        EditClientComponent,
        AddClientComponent,
        ClientFilterPipe
    ],
    imports: [
        HttpClientModule,
        HttpModule,
        BrowserAnimationsModule, // required for ng2-tag-input
        CoreModule,
        LayoutModule,
        SharedModule.forRoot(),
        RoutesModule,
        FormsModule,
        // AppRoutingModule,
        FlashMessagesModule.forRoot(),
        JwtModule.forRoot({
         config: {
           tokenGetter: () => {
             return localStorage.getItem('id_token');
           },
           whitelistedDomains: ['http://localhost:3000']
         }
       }),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        })
    ],
    providers: [
      ClientService,
      RegisterService,
      ValidationService,
      AuthService,
      AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
