Backbone.sync = (() => {
	const backbone_sync = Backbone.sync;
	return function(method, model, options) {
		options.beforeSend = function(jqXHR, settings) {
			console.log('BEFORE SEND');
		};
		return backbone_sync.call(this, method, model, options);
	}
})();

const Model = ODataModel.extend({
	idAttribute: 'ID'
});

const Collection = ODataCollection.extend({
	model: Model,

	url: 'http://services.odata.org/V4/OData/OData.svc/Products'
});

const View = ODataCollectionDataTableView.extend({});

const collection = new Collection();

console.log('TEST');

const view = new View({ collection: collection });
view.$el.appendTo($('#view'));
view.render();
// Promise.resolve(collection.fetch({
// 	data: {
// 		$count: true,
// 		$orderby: 'Name asc',
// 		$select: 'ID,Name,Description,ReleaseDate',
// 		$skip: 0,
// 		$top: 5
// 	}
// }));
