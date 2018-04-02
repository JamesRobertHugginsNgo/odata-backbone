/* global _ Backbone ODataModel */

/* exported ODataCollectionView */
const ODataCollectionView = Backbone.View.extend({
	columns: [{
		data: function() {
			return _.result(ODataModel.prototype, 'idAttribute');
		},
		header: 'ID',
		render: function(column, row) {
			return column;
		},
		sortable: true
	}],

	initialize: function() {
		this.listenTo(this.collection, 'update', this.render);
	},

	render: function() {
		this.$el.html(this.template({ view: this }));
	},

	template: _.template(`{{> odatacollectionview.mustache }}`)
});
