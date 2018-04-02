/* global Promise */

/* exported loadResources */
const loadResources = (() => {
	const loaded = {};
	return (...urls) => {
		const loadPromises = [];
		const l = urls.length;
		for (let i = 0; i < l; i++) {
			const url = urls[i];
			if (!loaded[url]) {
				switch (url.slice((urls[i].lastIndexOf('.') - 1 >>> 0) + 2)) {
					case 'css':
					loaded[url] = new Promise((resolve, reject) => {
						$('head').append($('<link href="' + url + '" rel="stylesheet" type="text/css">'));
						const img = document.createElement('img');
						img.onerror = () => resolve();
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
		}
		return Promise.all(loadPromises);
	};
})();
