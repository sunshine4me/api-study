const fetch = require('node-fetch');


(async () => {
    const response = await fetch('https://testerhome.com/');
    const body = await response.text();

    console.log(process.env.GRUNT_PATH)

})();