var express = require('express');
var WebDust = require('../models/webdust');
var ArduinoDust = require('../models/arduinodust');


var dustRouter = express.Router();
dustRouter
  .route('/web/items')
  .post(function (request, response) {

    console.log('POST /items');

    var item = new WebDust(request.body);

    item.save();

    response.status(201).send(item);
  })
  .get(function (request, response) {

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

    console.log('POST /items');

    var item = new ArduinoDust(request.body);

    item.save();

    response.status(201).send(item);
  })
  .get(function (request, response) {

    console.log('GET /arduino/items');

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
