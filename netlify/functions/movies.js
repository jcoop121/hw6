// allows us to read csv files
let csv = require('neat-csv')

// allows us to read files from disk
let fs = require('fs')

// defines a lambda function
exports.handler = async function(event) {
  // write the event object to the back-end console
  // console.log(event)

  // read movies CSV file from disk
  let moviesFile = fs.readFileSync(`./movies.csv`)
  
  // turn the movies file into a JavaScript object, wait for that to happen
  let moviesFromCsv = await csv(moviesFile)

  // write the movies to the back-end console, check it out
  // console.log(moviesFromCsv)

  // 🔥 hw6: your recipe and code starts here!
  let year = event.queryStringParameters.year
  let genre = event.queryStringParameters.genre
  
   
  if (year == undefined || genre == undefined) {
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: `Nope!` // a string of data
    }
  }
  else {
    let returnValue = {
      numResults: 0,
      movies: []
    }

    // loop through all movie listings
    for (let i = 0; i < moviesFromCsv.length; i++) {

      // store each listing in memory
      let movie = moviesFromCsv[i]

    // resutls are dynamic based on the year and genre entered in the URL
    if (movie.startYear == year && movie.genres == genre) {

    // create a new object to hold the title, year, genre
    let movieObject = {
          
      Title: movie.primaryTitle,
      Year: movie.startYear, 
      Genre: movie.genres
    }

    // add the data to the array
    returnValue.movies.push(movieObject)
    
    // count the results 
    returnValue.numResults = returnValue.numResults + 1
    } 

        }

    // a lambda function returns a status code and a string of data
    return {
      statusCode: 200, // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      body: JSON.stringify(returnValue) // a string of data
    }
  }
}