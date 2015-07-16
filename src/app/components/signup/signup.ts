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

let styles   = require('./signup.css');
let template = require('./signup.html');

@Component({
  selector: 'signup'
})
@View({
  directives: [ angularDirectives ],
  styles: [ styles ],
  template: template
})
export class Signup {
  constructor(public router: Router, public http: Http) {
  }

  signup(event, username, password) {
    event.preventDefault();
    this.http.post('http://localhost:3001/users', {
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
        this.router.navigate('/home');
      },
      error => {
        alert(error.message);
        console.log(error.message);
      }
    );
  }

  login(event) {
    event.preventDefault();
    this.router.parent.navigate('/login');
  }

}
