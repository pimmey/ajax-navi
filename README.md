# ajax-navi
Simple AJAX navigation. Load the entire page only once, then fetch components you need. Works with history manipilation, i.e. if you open _site.com/#/about_, it will automatically go to your About page. Works with history navigation buttons (back/forward).

## Installation
```
bower install ajax-navi --save
```

## Usage
Just add `a.ajax-link` to the links you want to use in your AJAX navigation. You're also going to need a `div#main` container.

Optionally, you can pass a `data-bg-color` attribute, so the background color changes on page change 🙃 

## Dependencies
Depends on:
- jQuery
- [PACE](http://github.hubspot.com/pace/docs/welcome/)

Dev dependencies:
- [js-Logger](https://github.com/jonnyreeves/js-logger)
