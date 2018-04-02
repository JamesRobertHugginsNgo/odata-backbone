'use strict';

/* global _ Backbone ODataModel */

/* exported ODataCollectionView */
var ODataCollectionView = Backbone.View.extend({
	columns: [{
		data: function data() {
			return _.result(ODataModel.prototype, 'idAttribute');
		},
		header: 'ID',
		render: function render(column, row) {
			return column;
		},
		sortable: true
	}],

	initialize: function initialize() {
		this.listenTo(this.collection, 'update', this.render);
	},

	render: function render() {
		this.$el.html(this.template({ view: this }));
	},

	template: _.template('<div class="row">\n\t<div class="col-xs-12">\n\t\t<table class="table">\n\t\t\t<thead>\n\t\t\t\t<tr role="row">\n\t\t\t\t<% for (var i = 0, l = view.columns.length; i < l; i = i + 1) { %>\n\t\t\t\t\t<th\n\t\t\t\t\t\tscope="col"\n\t\t\t\t\t<% if (_.result(view.columns[i], \'className\')) { %>\n\t\t\t\t\t\tclass="<%= _.result(view.columns[i], \'className\') %>"\n\t\t\t\t\t<% } %>\n\t\t\t\t\t>\n\t\t\t\t\t\t<%= _.result(view.columns[i], \'header\') %>\n\t\t\t\t\t</th>\n\t\t\t\t<% } %>\n\t\t\t\t</tr>\n\t\t\t</thead>\n\t\t\t<tbody>\n\t\t\t<% for (var i = 0, l = view.collection.length; i < l; i = i + 1) { %>\n\t\t\t\t<tr role="row">\n\t\t\t\t<% for (var i2 = 0, l2 = view.columns.length; i2 < l2; i2 = i2 + 1) { %>\n\t\t\t\t\t<td<% if (_.result(view.columns[i2], \'className\')) { %>\n\t\t\t\t\t\tclass="<%= _.result(view.columns[i2], \'className\') %>"\n\t\t\t\t\t<% } %>><%= view.columns[i2].render(view.collection.at(i).get(_.result(view.columns[i2], \'data\')), view.collection.at(i).toJSON()) %></td>\n\t\t\t\t<% } %>\n\t\t\t\t</tr>\n\t\t\t<% } %>\n\t\t\t</tbody>\n\t\t</table>\n\t</div>\n</div>\n')
});