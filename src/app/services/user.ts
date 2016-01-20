import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {AuthHttp, tokenNotExpired, JwtHelper} from 'angular2-jwt';

declare var Auth0Lock;

@Injectable()
export class UserService {
  lock = new Auth0Lock('BX4laiSFQJGxCPWpOg82DtgHOFGiwpKq', 'rosterloh.eu.auth0.com');
  jwtHelper: JwtHelper = new JwtHelper();
  userInfo = {};
  constructor(public http: Http, public authHttp: AuthHttp) {}

  login() {
    this.lock.show(function(err: string, profile: string, id_token: string) {

      if (err) {
        throw new Error(err);
      }

      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('id_token', id_token);

    });
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
  }

  loggedIn() {
    return tokenNotExpired();
  }

  getUserInfo() {
    return this.userInfo = localStorage.getItem('awsCred');
  }
};
