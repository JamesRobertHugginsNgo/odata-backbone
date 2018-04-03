/* global Backbone */

/* exported ODataCollectionDataTableView */
const ODataCollectionDataTableView = Backbone.View.extend({
	render: function() {
		if (this.dataTable) this.dataTable.destroy();
		this.$el.html(this.template);
		this.$el.find('table').DataTable({
			ajax: (data, callback, settings) => {
				const fetchData = {
					$count: true,
					$orderby: data.order.map((value) => data.columns[value.column].data + ' ' + value.dir).join(','),
					$skip: data.start,
					$top: data.length
				};
				if (data.search && data.search.value) fetchData.$search = '\'' + data.search.value + '\'';
				Promise.resolve(this.collection.fetch({ data: fetchData })).then(() => {
					callback({
						data: this.collection.toJSON(),
						draw: data.draw,
						recordsTotal: this.collection.count,
						recordsFiltered: this.collection.count
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
