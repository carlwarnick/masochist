/**
 * @flow strict-local
 */

import {pathToRegexp} from 'path-to-regexp';

import routeConfig from './routeConfig';

const CATCH_ALL_ROUTE = '*';

let routeMap = null;

function getRouteMap() {
  if (!routeMap) {
    routeMap = new Map(
      routeConfig
        .map(config => {
          if (config.path !== CATCH_ALL_ROUTE) {
            return [pathToRegexp(config.path), config];
          }
        })
        .filter(Boolean),
    );
  }
  return routeMap;
}

/**
 * Matches paths only.
 */
export default function matchRoute(path: string) {
  for (let [regexp, route] of getRouteMap()) {
    if (regexp.test(path)) {
      return route;
    }
  }
}
