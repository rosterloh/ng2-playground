/// <reference path="../typings/_custom.d.ts" />

import {Directive, Component, View, ElementRef} from 'angular2/angular2';
import {Location, RouteConfig, RouterLink, Router} from 'angular2/router';
import {Http, Headers} from 'angular2/http';

import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {LoggedInRouterOutlet} from './LoggedInOutlet';
import {Home} from '../components/home/home';
import {Login} from '../components/login/login';
import {Signup} from '../components/signup/signup';

let template = require('./app.html');

/*
 * App Component
 * Top Level Component
 */
@Component({
  // The selector is what angular internally uses
  // for `document.querySelectorAll(selector)` in our index.html
  // where, in this case, selector is the string 'app'
  selector: 'app', // <app></app>
  // We need to tell Angular's compiler which directives are in our template.
  // Doing so will allow Angular to attach our behavior to an element
  directives: [ CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES, LoggedInRouterOutlet ],
  // Our list of styles in our component. We may add more to compose many styles together
  styles: [`
    .title {
      font-family: Arial, Helvetica, sans-serif;
    }
    main {
      padding: 1em;
    }
  `],
  // Every Angular template is first compiled by the browser before Angular runs it's compiler
  template: template
})
@RouteConfig([
  { path: '/',       redirectTo: '/home' },
  { path: '/home',   as: 'Home',   component: Home },
  { path: '/login',  as: 'Login',  component: Login },
  { path: '/signup', as: 'Signup', component: Signup }
])
export class App {
  // These are member type
  title: string;
  data: Array<any> = []; // default data
  // TypeScript public modifiers
  constructor(public router: Router, public http: Http) {
    this.title = 'Angular 2';
  }

  onInit() {
    // Our API
    // npm run express-install
    // npm run express

    const BASE_URL = 'http://localhost:3001';
    const TODO_API_URL = '/api/todos';
    const JSON_HEADERS = new Headers();

    JSON_HEADERS.append('Accept', 'application/json');
    JSON_HEADERS.append('Content-Type', 'application/json');

    this.http
      .get(BASE_URL + TODO_API_URL, {
        headers: JSON_HEADERS
      })
      .map(res => res.json())
      .subscribe(
        // onNext callback
        data => this.serverData(data),
        // onError callback
        err  => this.errorMessage(err),
        // onComplete callback
        ()   => console.log('complete')
      );//end http

  }

  serverData(data) {
    console.log('data', data);
    this.data = data;
  }//serverData

  errorMessage(err) {
    console.info(`${'\n'
      } // You must run these commands for the Http API to work in another process ${'\n'
      } npm run express-install ${'\n'
      } npm run express
    `);
    console.error(err);
  }//errorMessage

}
