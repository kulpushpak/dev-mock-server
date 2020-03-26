const server = () => {
    const express = require('express');
    const bodyParser = require('body-parser');
    const args = require('minimist')(process.argv.splice(2));
    const app = express();
    const chalk = require('chalk');
    const port = args.port || 3100;
    const dbFile = args.db || null;
    const showLog = args.showlog || false;
    const log = console.log;

    app.use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
        next();
    });
    
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use((req, res, next) => {
        log(chalk.yellow(`url = ${req.url} method = ${req.method}`))
        if (showLog) {
            log(chalk.gray("req.headers = ", JSON.stringify(req.headers)));
            log(chalk.gray("-----------------"))
            log(chalk.gray("req.params = ", JSON.stringify(req.query)));
            log(chalk.gray("-----------------"))
            log(chalk.grey("req.body = ", JSON.stringify(req.body)));
            log(chalk.gray("-----------------"))
        }
        next();
    });

    if (!dbFile) {
        log(chalk.redBright("db file is required."));
        return false;
    }
    const fs = require('fs');

    // var fileData;
    fs.readFile(dbFile, (err, data) => {
        if (err) { log(chalk.redBright(err)); return false; }
        let fileData = JSON.parse(data);
        parseRouteData(fileData);
    });

    var parseRouteData = (data) => {
        let routesData = data;
        log(chalk.grey('Creating routes ....'))
        for (const route in routesData) {
            createRoutes(route, routesData[route]);
        }
    }
    var createRoutes = (route, resObj) => {
        app.all(
            route,
            bodyParser.json(),
            (req, res) => {
                res.status(200).send(resObj);
            }
        );
        log(chalk.gray(route));
    }
    app.listen(port, () => {
        chalk.greenBright(`App listening on port ${port}`)
    });
};

exports.createServer = server;