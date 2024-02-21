const axios = require('../node_modules/axios/dist/node/axios.cjs')
const xml2js = require('xml2js') // xml parser
const createHttpError = require('http-errors');


// many orders
module.exports.getOrders = async (req, res, next) => {
  try {

  } catch (error) {
    console.log('err')
  }
}

// single order
module.exports.getOrderById = async (req, res, next) => {
  try {
    const { id } = req.params
    const url = `${process.env.URL}${id}`;
    //const url = 'https://jsonplaceholder.typicode.com/users';
    
    // Make the GET request
    axios.get(url)
    .then(response => {
      // Handle successful response
      console.log('Response data:', response.data);
      const xmlData = response.data
      const parser = new xml2js.Parser();
      parser.parseString(xmlData, (err, result) => {
        if (err) {
          console.error('Error parsing XML:', err);
        } else {
          const orderJson = JSON.stringify(result, null, 2);
          res.status(200).send(orderJson)
          console.log(orderJson);
        }
      });
    })
    .catch(error => {
      // Handle error
      if (error.response) {
        createHttpError(error.response.status, 'Server responded with a non-2xx status');
        //console.error('Server responded with a non-2xx status:', error.response.status);
        //console.error('Response data:', error.response.data);
      } else if (error.request) {
        createHttpError(504, 'No response received from the server');
        //console.error('No response received from the server:', error.request);
      } else {
        createHttpError(404, 'Not Found');
        //console.error('Error setting up the request:', error.message);
      }
    });
    //res.status(200).send('hello wordl');
  } catch (error) {
    //console.log('err');
    next(error)
  }
}
