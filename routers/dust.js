var express = require('express');
var WebDust = require('../models/webdust');
var ArduinoDust = require('../models/arduinodust');


var dustRouter = express.Router();
dustRouter
  .route('/web/items')
  .post(function (request, response) {
    console.log('POST /items');
    console.log("POST body : " + request.body)
    console.log("POST location : " + request.body.location)

    var item = new WebDust(request.body);

    item.save();

    console.log("saved item : " + item);

    response.status(201).send(item);
  })
  .get(function (request, response) {
    var timeInMs = Date.now();
    var today = new Date().toDateString();
    console.log("tooday 1:" + today);
    console.log(timeInMs);
    console.log('GET /web/items');

    WebDust.find(function (error, items) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      console.log(items);

      response.json(items);
    });
  });

dustRouter
.route('/web/items/:loc')
.get(function (request, response) {

console.log('GET /items/:loc');

var loc = request.params.loc;
console.log("loc :" + loc);

WebDust.findOne({ location: loc }, function (error, item) {

  if (error) {
    response.status(500).send(error);
    return;
  }

  console.log("item :" + item);

  response.json(item);

});
})
.patch(function (request, response) {

  console.log('PATCH /items/:loc');

  var itemId = request.params.loc;

  WebDust.findOne({ location: itemId }, function (error, item) {

    if (error) {
      response.status(500).send(error);
      return;
    }

    if (item) {

      for (var property in request.body) {
        if (request.body.hasOwnProperty(property)) {
          if (typeof item[property] !== 'undefined') {
            item[property] = request.body[property];
          }
        }
      }
      item.save();

      response.json(item);
      return;
    }

    response.status(404).json({
      message: 'Item with id ' + itemId + ' was not found.'
    });
  });
})
.delete(function (request, response) {

  console.log('DELETE /items/:loc');

  var itemId = request.params.loc;

  WebDust.findOne({ location: itemId }, function (error, item) {

    if (error) {
      response.status(500).send(error);
      return;
    }

    if (item) {
      item.remove(function (error) {

        if (error) {
          response.status(500).send(error);
          return;
        }

        response.status(200).json({
          'message': 'Item with id ' + itemId + ' was removed.'
        });
      });
    } else {
      response.status(404).json({
        message: 'Item with id ' + itemId + ' was not found.'
      });
    }
  });
});

dustRouter
  .route('/arduino/items')
  .post(function (request, response) {

    console.log('POST /arduino/items for arudino');
    var pmval = request.param("value");
    console.log("POST /arduino/items : pmval: " + pmval );
    pmval = 40;
    // pmval = 40;
    var pmgrade = "good";

    if(pmval <= 30 ) {
        pmgrade = "good";
    } else if (pmval > 31 && pmval <=80) {
      pmgrade = "moderate";
    } else if (pmval > 80 && pmval <=150) {
      pmgrade = "unhealthy";
    } else if (pmval > 150) {
      pmgrade = "bad";
    }
    var body = {
          "apiURL":'http://apis.com',
          "date": new Date().toDateString(),
          "latitude":'37.241039',
          "location":'용인',
          "longitude":'127.1757653',
          "pm10_grade": pmgrade,
          "pm10_value": pmval.toString(),
          "show":true,
          "timestamp": Date.now()
    };
    var values = JSON.stringify(body);
    console.log("values: " + values);

    var item = new ArduinoDust(body);

    item.save();

    response.status(201).send(item);
  })
  .get(function (request, response) {

    console.log('GET /arduino/items');
    var pmval = request.param("value");
    console.log('GET /arduino/items  val :' + pmval);
    if(pmval) {

      if(pmval <= 30 ) {
          pmgrade = "좋은";
      } else if (pmval > 31 && pmval <=80) {
        pmgrade = "보통";
      } else if (pmval > 80 && pmval <=150) {
        pmgrade = "약간 나쁨";
      } else if (pmval > 150) {
        pmgrade = "아주 나쁨";
      }
      var body = {
            "apiURL":'http://apis.com',
            "date": new Date().toDateString(),
            "latitude":'37.241039',
            "location":'용인',
            "longitude":'127.1757653',
            "pm10_grade": pmgrade,
            "pm10_value": pmval.toString(),
            "show":true,
            "timestamp": Date.now()
      };

      var item = new ArduinoDust(body);

      item.save();

      response.status(201).send(item);
      return;
    }
    ArduinoDust.find(function (error, items) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      console.log(items);

      response.json(items);
    });
  });

  dustRouter
  .route('/arduino/items/:loc')
  .get(function (request, response) {

    console.log('GET /items/:loc');

    var loc = request.params.loc;
    console.log("loc :" + loc);

    ArduinoDust.findOne({ location: loc }, function (error, item) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      console.log("item :" + item);

      response.json(item);

    });
  })
  .patch(function (request, response) {

      console.log('PATCH /items/:loc');

      var itemId = request.params.loc;

      ArduinoDust.findOne({ location: itemId }, function (error, item) {

        if (error) {
          response.status(500).send(error);
          return;
        }

        if (item) {

          for (var property in request.body) {
            if (request.body.hasOwnProperty(property)) {
              if (typeof item[property] !== 'undefined') {
                item[property] = request.body[property];
              }
            }
          }
          item.save();

          response.json(item);
          return;
        }

        response.status(404).json({
          message: 'Item with id ' + itemId + ' was not found.'
        });
      });
    })
    .delete(function (request, response) {

      console.log('DELETE /items/:loc');

      var itemId = request.params.loc;

      ArduinoDust.findOne({ location: itemId }, function (error, item) {

        if (error) {
          response.status(500).send(error);
          return;
        }

        if (item) {
          item.remove(function (error) {

            if (error) {
              response.status(500).send(error);
              return;
            }

            response.status(200).json({
              'message': 'Item with id ' + itemId + ' was removed.'
            });
          });
        } else {
          response.status(404).json({
            message: 'Item with id ' + itemId + ' was not found.'
          });
        }
      });
    });

  module.exports = dustRouter;
