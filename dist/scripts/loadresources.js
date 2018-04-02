'use strict';

/* global Promise */

/* exported loadResources */
var loadResources = function () {
	var loaded = {};
	return function () {
		for (var _len = arguments.length, urls = Array(_len), _key = 0; _key < _len; _key++) {
			urls[_key] = arguments[_key];
		}

		var loadPromises = [];
		var l = urls.length;

		var _loop = function _loop(i) {
			var url = urls[i];
			if (!loaded[url]) {
				switch (url.slice((urls[i].lastIndexOf('.') - 1 >>> 0) + 2)) {
					case 'css':
						loaded[url] = new Promise(function (resolve, reject) {
							$('head').append($('<link href="' + url + '" rel="stylesheet" type="text/css">'));
							var img = document.createElement('img');
							img.onerror = function () {
								return resolve();
							};
							img.src = url;
						});
						break;

					case 'js':
						loaded[url] = Promise.resolve($.getScript(url));
						break;
				}
			}
			if (loaded[url]) {
				loadPromises.push(loaded[url]);
			} else {
				loadPromises.push(Promise.reject());
			}
		};

		for (var i = 0; i < l; i++) {
			_loop(i);
		}
		return Promise.all(loadPromises);
	};
}();