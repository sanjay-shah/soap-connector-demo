module.exports = function(Acme) {
  // Refine the methods
  FlightlyService.buyTickets = function (cb) {
   var FlightlyService = FlightlyService.app.models.FlightlyService;
   FlightlyService.buyTickets({"delay": "0"}, function (err, response) {
     console.log('ProductList: %j', response);
     var result = response;
     //var result = (!err && response.listProductsResult) ?
     //response.listProductsResult[0].listProductsResult : [];
     cb(err, result);
   });
 };

 FlightlyService.traveldocuments = function (cb) {
   var FlightlyService = FlightlyService.app.models.FlightlyService;
   FlightlyService.traveldocuments({
    "Destination": destination || "SAN",
    "seats": seats || "1A",
    "price": price || "0.00",
    "accountid": accountid || 00000,
    "startingpoint": startingpoint || "DEN"
   }, function (err, response) {
     console.log('Traveldocuments: %j', response);
     var result = response;
     //var result = (!err && response.listProductsResult) ?
     //response.listProductsResult[0].listProductsResult : [];
     cb(err, result);
   });
 };

 FlightlyService.remoteMethod(
  'buyTickets', {
    isStatic: true,
    accepts: [
      {
        arg: 'destination', 
        type: 'string', 
        required: true
      },
      {
        arg: 'seats', 
        type: 'string', 
        required: true
      },
      {
        arg: 'price', 
        type: 'number', 
        required: true
      },
      {
        arg: 'accountid', 
        type: 'number', 
        required: true
      },
      {
        arg: 'startingpoint', 
        type: 'string', 
        required: true
      }
    ],
    returns: {arg: 'result', type: 'object', root: true},
    http: {verb: 'get', path: '/buyTickets'}
  });
};

FlightlyService.remoteMethod(
  'traveldocuments', {
    isStatic: true,
    returns: {arg: 'result', type: 'object', root: true},
    http: {verb: 'get', path: '/traveldocuments'}
  });
};
