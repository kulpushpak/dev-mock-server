# dev-mock-server
Mock server for front-end developers.
```
This server creates all paths with all methods e.g. GET,POST,DELETE and returns same data for every method.
Support for Update and Delete methods will be avaiable in next release. 
```

## npm use
```
$ npm i dev-mock-server
$ npm i -g dev-mock-server
```
## run
``` 
$ dev-mock-server [options]
```
```
options - 

--db <db.json>              -- Any json file along with path having object structure  {<path> : <response object>}
                            --  example 
                            {
                                "/path/to/hello":{
                                    status:200,
                                    message: "Hello World!"
                                }
                            }

--showlog <true|false>      -- Flag to log headers, params and body for every request on console
                            -- default : false
```