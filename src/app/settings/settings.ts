import {Component} from 'angular2/core';
import {RouteConfig, Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {FORM_PROVIDERS, CORE_DIRECTIVES} from 'angular2/common';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from 'ng2-material/all';

import {AddressForm} from './address/address';
import {Preferences} from './preferences/preferences';
import {UserService} from '../services/user';

@Component({
  selector: 'settings-tabs',
  providers: [
      ...FORM_PROVIDERS,
      MATERIAL_PROVIDERS,
      UserService
  ],
  directives: [
      ...ROUTER_DIRECTIVES,
      CORE_DIRECTIVES,
      MATERIAL_DIRECTIVES,
      AddressForm,
      Preferences
  ],
  template: require('./settings.html')
})

@RouteConfig([
    {path: '/preferences', component: Preferences, as: 'Preferences', useAsDefault: true},
    {path: '/address', component: AddressForm, as: 'Address'}
])

export class Settings {
   constructor(
        private _userService: UserService,
        private _router: Router
    ) {}

    loggedIn() {
        return this._userService.loggedIn();
    }

    getUserInfo() {
        return this._userService.getUserInfo();
    }
}
