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
				console.log('DATA', data);
				console.log('SETTINGS', settings);
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
						_iRecordsDisplay: data['@odata.count'],
						_iRecordsTotal: data['@odata.count'],
						data: _this.collection.toJSON()
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