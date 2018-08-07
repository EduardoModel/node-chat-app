//new Date().getTime()

// Jan 1st 1970 00:00:10 am

let moment = require('moment')

let timeStamp = moment().valueOf()
console.log(timeStamp)

// let date = new Date()
// console.log(date.getMonth())
let createdAt = 1234
let date = moment(createdAt)
//date.add(1, 'year').subtract(9, 'months')
//console.log(date.format('MMM Do YYYY '))
//date.subtract(1, 'hour')
console.log(date.format('h:mm a'))