module.exports.logStuff = function (str) {
    console.log(str); // 'hi from client'
    callback('hi from server');
};