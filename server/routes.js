if (IS_COVERAGE_ACTIVE) {
    var bodyParser = Npm.require('body-parser');

    Picker.middleware(bodyParser.urlencoded({extended: false}));
    Picker.middleware(bodyParser.json({limit: '30mb'}));

    var getRoute = Picker.filter(function (req, res) {
            return req.method === 'GET';
        }),
        postRoute = Picker.filter(function (req, res) {
            return req.method === 'POST';
        });

    getRoute.route('/coverage', Handlers.showCoverage);

    getRoute.route('/coverage/show', Handlers.showCoverage);

    // Show static assets
    getRoute.route('/coverage/asset/:filename', Handlers.getAsset);

    getRoute.route('/:arg1?/:arg2?/:arg3?/:arg4?', Handlers.instrumentClientJs);

    //merge client coverage posted from browser
    postRoute.route('/coverage/client', Handlers.addClientCoverage);
}