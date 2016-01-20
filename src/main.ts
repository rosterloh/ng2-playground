/*
 * Providers provided by Angular
 */
import {provide} from 'angular2/core';
import {bootstrap, ELEMENT_PROBE_PROVIDERS} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS, Http} from 'angular2/http';

import {AuthHttp, AuthConfig} from 'angular2-jwt';
import {MATERIAL_PROVIDERS} from 'ng2-material/all';
/*
 * App Component
 * our top level component that holds all of our components
 */
import {App} from './app/app';
/*
 * Bootstrap our Angular app with a top level component `App` and inject
 * our Services and Providers into Angular's dependency injection
 */
document.addEventListener('DOMContentLoaded', function main() {
  bootstrap(App, [
    ...('production' === process.env.ENV ? [] : ELEMENT_PROBE_PROVIDERS),
    ...HTTP_PROVIDERS,
    ...ROUTER_PROVIDERS,
    ...MATERIAL_PROVIDERS,
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    provide(AuthHttp, {
      useFactory: (http) => {
        return new AuthHttp(new AuthConfig(), http);
      },
      deps: [Http]
    })
  ])
  .catch(err => console.error(err));
});
