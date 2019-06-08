'use strict';
const https = require('https');
const Papa = require('papaparse');


const data = function(){
    return new Promise(function(resolve) {
        https.get('https://www.pewtrusts.org/~/media/data-visualizations/interactives/2018/EIFP/data/countries.csv?v=e6bdba', (resp) => {
          let data = '';

          // A chunk of data has been recieved.
          resp.on('data', (chunk) => {
            data += chunk;
          });

          // The whole response has been received. Print out the result.
          resp.on('end', () => {
            resolve(data);
          });

        }).on("error", (err) => {
          console.log("Error: " + err.message);
        });
        /*Papa.parse("https://www.pewtrusts.org/~/media/data-visualizations/interactives/2018/EIFP/data/countries.csv?v=e6bdba", {
            download: true,
            complete: function(results) {
                resolve(results);
            }
        });*/
    });
}
module.exports.hello = async (event, context) => {
    var json = await data();
    return {
        statusCode: 200,
        body: JSON.stringify({
            message: json,
            input: event,
        }),
    };
};