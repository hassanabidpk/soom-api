var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArduinoDust = new Schema();
ArduinoDust.add({
  timestamp: {
    type: Number,
    unique: true,
    required: true
    },
    location: {
        type: String,
        index: true
    },
    latitude: String,
    longitude: String,
    date: Date,
    pm10_value: String,
    pm10_grade: String,
    pm25_value: String,
    pm25_grade: String

});

/**
 * Accessing a specific schema type by key
 */

// ArduinoDust.path('date')
//     .default(function() {
//         return new Date();
//     })
//     .set(function(v) {
//         return v === 'now' ? new Date() : v;
//     });

/**
 * Plugins
 */

// function slugGenerator(options) {
//     options = options || {};
//     var key = options.key || 'location';

//     return function slugGenerator(schema) {
//         schema.path(key).set(function(v) {
//             this.slug = v.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/-+/g, '');
//             return v;
//         });
//     };
// }

// WebDust.plugin(slugGenerator());

/*
 * Query Helpers
 */

ArduinoDust.methods.expressiveQuery = function(location, date, callback) {
    return this.find('location', location).where('date').gte(date).run(callback);
};

/**
 * Define model.
 */



 module.exports = mongoose.model('ArduinoDust', ArduinoDust);
