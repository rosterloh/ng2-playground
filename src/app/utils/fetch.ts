/// <reference path="../../typings/_custom.d.ts" />

export function status(response) {
  if (response.status >= 200 && response.status < 300) {
    Promise.resolve(response);
  }
  return response.text().then(function(text) {
    throw new Error(text);
  });
}

export function text(response) {
  return response.text();
}

export function json(response) {
  return response.json();
}
