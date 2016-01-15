import {Component, View} from 'angular2/core';
import {ViewEncapsulation} from 'angular2/core';
import {FORM_PROVIDERS} from 'angular2/common';
import {Login} from './login/login';
import {Home} from './home/home';
import {NavigationService} from './navigation/navigation';
import {MATERIAL_DIRECTIVES, MATERIAL_PROVIDERS} from 'ng2-material/all';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

@Component({
  selector: 'app',
  providers: [ ...FORM_PROVIDERS, NavigationService, MATERIAL_PROVIDERS ],
  directives: [ MATERIAL_DIRECTIVES, ROUTER_DIRECTIVES ],
  pipes: [],
  styles: [
    require('../assets/css/index.scss')
  ],
  encapsulation: ViewEncapsulation.None,
  template: require('./app.html')
})
@RouteConfig([
  {path: '/login', component: Login, name: 'Login', data: {title: 'Login Page'}},
  {path: '/home', component: Home, name: 'Home', data: {title: 'Home Page'}},
  {path: '/**', redirectTo: ['Login']}
])
export class App {
  constructor(public navigation: NavigationService) {
  }
}
