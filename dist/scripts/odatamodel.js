'use strict';

/* global _ Backbone */

/* exported ODataModel */
var ODataModel = Backbone.Model.extend({
	url: function url() {
		var base = _.result(this, 'urlRoot') || _.result(this.collection, 'url') || function () {
			throw new Error('A "url" property or function must be specified');
		}();

		if (this.isNew()) return base;

		var id = this.get(this.idAttribute);
		return base.replace(/\/$/, '') + '(\'' + encodeURIComponent(id) + '\')';
	}
});