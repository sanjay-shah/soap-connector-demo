module.exports = function(app, cb) {
  var ds = app.dataSource('soap-ds-flightly', 
    {
      connector: 'soap',
      remotingEnabled: true,
      wsdl: 'http://localhost:8000/flightlyWS/service.asmx?wsdl' 
    });

  // Unfortunately, the methods from the connector are mixed in asynchronously
  // This is a hack to wait for the methods to be injected
  ds.once('connected', function () {
     
    // Create the model
    var flightlyService = ds.createModel('FlightlyService', {});
    app.model(flightlyService);
    console.log('################ [FlightlyService] SOAP Model is ready #################');
    cb();
  });
}