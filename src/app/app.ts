import {Component, View, ViewEncapsulation} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig, Router} from 'angular2/router';
import {FORM_PROVIDERS, CORE_DIRECTIVES} from 'angular2/common';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from 'ng2-material/all';

import {Settings} from './settings/settings';
import {UserService} from './services/user';

@Component({
  selector: 'app',
  providers: [ ...FORM_PROVIDERS, MATERIAL_PROVIDERS, UserService ],
  directives: [ ...ROUTER_DIRECTIVES, CORE_DIRECTIVES, MATERIAL_DIRECTIVES, Settings ],
  pipes: [],
  styles: [
    require('./app.scss')
  ],
  encapsulation: ViewEncapsulation.None,
  template: require('./app.html')
})
@RouteConfig([
  { path: '/settings/...', component: Settings, as: 'Settings', useAsDefault: true }
])
export class App {
  constructor(
    private _userService: UserService,
    private _router: Router
  ) {}

  login() {
    return this._userService.login();
  }

  logout() {
    return this._userService.logout();
  }

  loggedIn() {
    return this._userService.loggedIn();
  }

  getUserInfo() {
    return this._userService.getUserInfo();
  }
}
