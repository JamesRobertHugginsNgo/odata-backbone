/* global _ Backbone */

/* exported ODataModel */
const ODataModel = Backbone.Model.extend({
	url: function () {
		const base = _.result(this, 'urlRoot')
			|| _.result(this.collection, 'url')
			|| (() => { throw new Error('A "url" property or function must be specified'); })();

		if (this.isNew()) return base;

		const id = this.get(this.idAttribute);
		return base.replace(/\/$/, '') + '(\'' + encodeURIComponent(id) + '\')';
	}
});
