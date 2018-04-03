'use strict';

/* global Backbone */

/* exported ODataCollectionDataTableView */
var ODataCollectionDataTableView = Backbone.View.extend({
	render: function render() {
		var _this = this;

		if (this.dataTable) this.dataTable.destroy();
		this.$el.html(this.template);
		this.$el.find('table').DataTable({
			ajax: function ajax(data, callback, settings) {
				var fetchData = {
					$count: true,
					$orderby: data.order.map(function (value) {
						return data.columns[value.column].data + ' ' + value.dir;
					}).join(','),
					$skip: data.start,
					$top: data.length
				};
				if (data.search && data.search.value) fetchData.$search = '\'' + data.search.value + '\'';
				Promise.resolve(_this.collection.fetch({ data: fetchData })).then(function () {
					callback({
						data: _this.collection.toJSON(),
						draw: data.draw,
						recordsTotal: _this.collection.count,
						recordsFiltered: _this.collection.count
					});
				});
			},
			columns: [{
				data: 'ID',
				title: 'ID'
			}, {
				data: 'Name',
				title: 'Name'
			}],
			serverSide: true
		});
	},

	template: '<table class="table"></table>\n'
});