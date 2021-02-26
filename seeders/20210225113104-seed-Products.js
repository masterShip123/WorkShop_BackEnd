'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    data.map(item => {
      item.created_at = new Date()
      item.updated_at = new Date()
    })

    return queryInterface.bulkInsert('Products', data, {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Products', null, {})
  }
}

const data = [
  {
    "name": "Arduino Sensor Kit V5.0",
    "image": "product_10.jpg",
    "stoc": 13,
    "price": 150
  },
  {
    "name": "4-Channel 5VDC Relay Module Relay Active High / LOW",
    "image": "product_02.jpg",
    "stoc": 1,
    "price": 185
  },
  {
    "name": "4-Channel 5VDC Relay Module Relay Active High / LOW",
    "image": "product_01.jpg",
    "stoc": 1,
    "price": 185
  },
  {
    "name": "4-Channel 5VDC Relay Module Relay Active High / LOW",
    "image": "product_07.jpg",
    "stoc": 1,
    "price": 185
  },
  {
    "name": "Arduino MEGA 2560 R3 ใช้ชิฟ USB CH340 รุ่นใหม่ แถมสาย USB",
    "image": "product_05.jpg",
    "stoc": 100,
    "price": 200
  },
  {
    "name": "Arduino Nano 3.0 Mini USB รุ่นใหม่ใช้ชิฟ CH340G แถมสาย Mini USB",
    "image": "product_23.jpg",
    "stoc": 2,
    "price": 130
  },
  {
    "name": "Arduino ProtoShield Mini UNO Prototype Shield พร้อม Mini Breadboard",
    "image": "product_12.jpg",
    "stoc": 100,
    "price": 60
  },

]
