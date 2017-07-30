# SOOM api

## RESTful API endpoints

### GET `/api/web/items`

Get all Web dust items.

+ Method: `GET`
+ URL: `/api/web/items`

### POST `/api/web/items`

Create a new item.

+ Method: `POST`
+ URL: `/api/web/items`
+ Body:

```js
{
  "timestamp" : 1424000
  "location": "1",
  "latitude": "37",
  "longitude": "127.1",
  "date": "2017",
  "pm10_value": "41",
  "pm10_grade": "good",
  "pm25_value": "41",
  "pm25_grade": "good",
}
```

### GET `/api/items/:loc`

Get item with specific id.

+ Method: `GET`
+ URL: `/api/items/1`

### PUT `/api/items/:loc`

Update entire item with specific id.

+ Method: `PUT`
+ URL: `/api/web/items/seoul`
+ Body:

```js
{
  "timestamp" : 1424000
  "location": "1",
  "latitude": "37",
  "longitude": "127.1",
  "date": "2017",
  "pm10_value": "41",
  "pm10_grade": "good",
  "pm25_value": "41",
  "pm25_grade": "good",
}
```

### PATCH `/api/items/:loc`

Update part of the item with specific id.

+ Method: `PATCH`
+ URL: `/api/web/items/seoul`
+ Body:

```js
{
  "pm10_value": "30"
}
```

### DELETE `/api/items/:loc`

Delete item with specific id.

+ Method: `DELETE`
+ URL: `/api/items/seoul`

## Install

`npm install`

## Run

0. Make sure MongoDB is running, if not: `sudo ~/mongodb/bin/mongod` (assuming you have `~/mongodb` directory).
1. `npm run start`
