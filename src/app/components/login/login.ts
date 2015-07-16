/// <reference path="../../../typings/_custom.d.ts" />

/*
 * Angular 2
 */
import {Component, View} from 'angular2/annotations';
import {Http} from 'angular2/http';
import {Router} from 'angular2/router';

/*
 * Directives
 * angularDirectives: Angular's core/form/router directives
 * appDirectives: Our collection of directives from /directives
 */
import {appDirectives, angularDirectives} from 'app/directives/directives';

import {status, json} from 'app/utils/fetch';

let styles   = require('./login.css');
let template = require('./login.html');

@Component({
  selector: 'login'
})
@View({
  styles: [ styles ],
  template: template,
  directives: [angularDirectives, appDirectives]
})
export class Login {
  constructor(public router: Router, public http: Http) {
  }

  login(event, username, password) {
    event.preventDefault();
    this.http.post('http://localhost:3001/sessions/create', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username, password
      })
    })
    .toRx()
    .map(status)
    .map(json)
    .subscribe(
      response => {
        localStorage.setItem('jwt', response.id_token);
        this.router.parent.navigate('/home');
      },
      error => {
        alert(error.message);
        console.log(error.message);
      }
    );
  }

  signup(event) {
    event.preventDefault();
    this.router.parent.navigate('/signup');
  }
}
