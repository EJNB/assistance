let app = require('./app'),
    server = app.listen(app.get('port'),function () {
        console.log('Inciando Express en el puerto '+app.get('port'))
    });