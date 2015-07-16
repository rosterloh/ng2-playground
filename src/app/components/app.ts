/// <reference path="../../typings/_custom.d.ts" />

/*
 * Angular 2
 */
import {Component, View} from 'angular2/annotations';
import {RouteConfig, Router} from 'angular2/router';

/*
 * Directives
 */
import {coreDirectives} from 'angular2/angular2';
import {routerDirectives} from 'angular2/router';
import {formDirectives} from 'angular2/forms';
// Import all of our custom app directives
import {appDirectives} from '../directives/directives';

/*
 * App Pipes
 * our collection of pipes registry
 */
import {appPipes} from '../pipes/pipes';

/*
 * Components
 */
// We use a folder if we want separate files
import {Home} from './home/home';
import {Login} from './login/login';
import {Signup} from './signup/signup';
// Otherwise we only use one file for a component
import {Dashboard} from './dashboard';
// A simple example of a Component using a Service
import {Todo} from './todo';

let styles   = require('./app.css');
let template = require('./app.html');

/*
 * App Component
 * Top Level Component
 * Simple router component example
 */
@Component({
  selector: 'app', // without [ ] means we are selecting the tag directly
  viewInjector: [ appPipes ]
})
@View({
  // needed in order to tell Angular's compiler what's in the template
  directives: [
    // Angular's core directives
    coreDirectives,

    // Angular's form directives
    formDirectives,

    // Angular's router
    routerDirectives,

    // Our collection of directives from /directives
    appDirectives
  ],
  styles: [ styles ],
  template: template
})
@RouteConfig([
  { path: '/',          redirectTo: '/home' },
  { path: '/home',      as: 'home',       component: Home },
  { path: '/login',     as: 'login',      component: Login },
  { path: '/signup',    as: 'signup',     component: Signup },
  { path: '/dashboard', as: 'dashboard',  component: Dashboard },
  { path: '/todo',      as: 'todo',       component: Todo }
])
export class App {
  name: string;
  constructor(public router: Router) {
    this.name = 'angular 2';
  }
}
