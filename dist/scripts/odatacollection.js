'use strict';

/* global Backbone ODataModel */

/* exported ODataCollection */
var ODataCollection = Backbone.Collection.extend({
	count: null,

	data: {},

	fetch: function fetch() {
		var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		console.log('FETCH');
		this.count = null;
		this.data = options.data || {};
		return Backbone.Collection.prototype.fetch.call(this, options);
	},

	model: ODataModel,

	parse: function parse(response, options) {
		if (response['@odata.count']) this.count = response['@odata.count'];
		return Backbone.Collection.prototype.parse.call(this, response.value);
	}
});