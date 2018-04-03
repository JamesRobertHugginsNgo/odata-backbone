/* global Backbone */

/* exported ODataCollectionDataTableView */
const ODataCollectionDataTableView = Backbone.View.extend({
	render: function() {
		if (this.dataTable) this.dataTable.destroy();
		this.$el.html(this.template);
		this.$el.find('table').DataTable({
			ajax: (data, callback, settings) => {
				console.log('DATA', data);
				console.log('SETTINGS', settings);
				const fetchData = {
					$count: true,
					$orderby: data.order.map((value) => data.columns[value.column].data + ' ' + value.dir).join(','),
					$skip: data.start,
					$top: data.length
				};
				if (data.search && data.search.value) fetchData.$search = '\'' + data.search.value + '\'';
				Promise.resolve(this.collection.fetch({ data: fetchData })).then(() => {
					callback({
						_iRecordsDisplay: data['@odata.count'],
						_iRecordsTotal: data['@odata.count'],
						data: this.collection.toJSON()
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

	template: `{{> odatacollectiondatatableview.mustache }}`
});
