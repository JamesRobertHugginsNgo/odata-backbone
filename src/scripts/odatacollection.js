/* global Backbone ODataModel */

/* exported ODataCollection */
const ODataCollection = Backbone.Collection.extend({
	count: null,

	data: {},

	fetch: function(options = {}) {
		console.log('FETCH')
		this.count = null;
		this.data = options.data || {};
		return Backbone.Collection.prototype.fetch.call(this, options);
	},

	model: ODataModel,

	parse: function(response, options) {
		if (response['@odata.count']) this.count = response['@odata.count'];
		return Backbone.Collection.prototype.parse.call(this, response.value);
	}
});
