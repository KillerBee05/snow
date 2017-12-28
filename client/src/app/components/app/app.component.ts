import { Component, HostBinding, OnInit } from '@angular/core';
declare var $: any;
import {Http} from '@angular/http';
import { SettingsService } from '../../core/settings/settings.service';

import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    @HostBinding('class.layout-fixed') get isFixed() { return this.settings.layout.isFixed; };
    @HostBinding('class.aside-collapsed') get isCollapsed() { return this.settings.layout.isCollapsed; };
    @HostBinding('class.layout-boxed') get isBoxed() { return this.settings.layout.isBoxed; };
    @HostBinding('class.layout-fs') get useFullLayout() { return this.settings.layout.useFullLayout; };
    @HostBinding('class.hidden-footer') get hiddenFooter() { return this.settings.layout.hiddenFooter; };
    @HostBinding('class.layout-h') get horizontal() { return this.settings.layout.horizontal; };
    @HostBinding('class.aside-float') get isFloat() { return this.settings.layout.isFloat; };
    @HostBinding('class.offsidebar-open') get offsidebarOpen() { return this.settings.layout.offsidebarOpen; };
    @HostBinding('class.aside-toggled') get asideToggled() { return this.settings.layout.asideToggled; };
    @HostBinding('class.aside-collapsed-text') get isCollapsedText() { return this.settings.layout.isCollapsedText; };


    constructor(
      public settings: SettingsService,
      private authService: AuthService,
      private router: Router,
      private flashMessage: FlashMessagesService,
      private http: Http
    ) { }

    onLogoutClick(){
      this.authService.logout();
      this.flashMessage.show('You have logged out!', { cssClass: 'alert-success', timeout: 5000});
      this.router.navigate(['/login']);
      return false;
    }

    ngOnInit() {
      this.http.get('http://localhost:8000/auth').subscribe(data => {
        console.log(data);
      });
        $(document).on('click', '[href="#"]', e => e.preventDefault());
    }
}
