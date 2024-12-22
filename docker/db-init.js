db = db.getSiblingDB("interview");

db.createCollection("stocks");
db.stocks.insertMany([
  { symbol: "5ERS", name: "THE5ERS", price: 777 },
]);
