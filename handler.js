'use strict';

const Papa = require('papaparse');
const data = function(){
    return new Promise(function(resolve) {
        Papa.parse("https://www.pewtrusts.org/~/media/data-visualizations/interactives/2018/EIFP/data/countries.csv?v=e6bdba", {
            download: true,
            complete: function(results) {
                resolve(results);
            }
        });
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