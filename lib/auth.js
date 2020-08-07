
var jws = require('jws');
var options = require("./options");

module.exports = {
    encode: function (payload) {

        var header = { alg: 'HS256', exp: Date.now() + options.exp }

        return jws.sign({
            header: header
            , payload: payload
            , secret: options.secret
        })
    },
    decode: function (payload) {
        if (!jws.verify(payload, 'HS256', options.secret)) {
            return null
        }

        var decoded = jws.decode(payload, {
            json: true
        })
        var exp = decoded.header.exp

        if (exp && exp <= Date.now()) {
            return null
        }

        return decoded.payload
    },
}