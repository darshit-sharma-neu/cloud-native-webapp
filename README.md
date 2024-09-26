# Assignment - 1
## webapp

A cloud-native application, specifically designed for cloud computing architecture.

## Pre-requisites
To run this application you will need following 

- [Node.js](https://nodejs.org/) `v20.17.0 LTS`
- [NPM](https://www.npmjs.com/) `v10.8.2`
- [MYSQL](https://www.mysql.com/) Database `v8.1.0`
 
We also need to provide following env variables - 
| Env Variable | Description |
| ------ | ------ |
| DB_NAME | Name of database to connect |
| DB_USER | Mysql user name |
| DB_PASS | Mysql password |

you can use the following command -
```
export DB_NAME=<name of database> DB_USER=<mysql username> DB_PASS=<mysql password>
```

## Installation

clone the repo and follow the steps below - 

```sh
cd webapp
npm i
npm run start
```

You should see output like this - 
```
> webapp@1.0.0 start
> node index.js

[20:06:10.402] INFO (31548): Connecting to database
[20:06:10.446] INFO (31548): Server is listening on PORT: 3000
[20:06:10.469] INFO (31548): Connected to Database
```
To validate you can run the following command in terminal - 
`curl -vvvv 'http://localhost:3000/healthz'`

You should see output like - 
```
* Host localhost:3000 was resolved.
* IPv6: ::1
* IPv4: 127.0.0.1
*   Trying [::1]:3000...
* Connected to localhost (::1) port 3000
> GET /healthz HTTP/1.1
> Host: localhost:3000
> User-Agent: curl/8.7.1
> Accept: */*
> 
* Request completely sent off
< HTTP/1.1 200 OK
< X-Powered-By: Express
< cache-control: no-cache
< Date: Thu, 26 Sep 2024 00:10:03 GMT
< Connection: keep-alive
< Keep-Alive: timeout=5
< Content-Length: 0
< 
* Connection #0 to host localhost left intact
```
