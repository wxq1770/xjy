
# start-react-redux-project

```
1. git clone https://github.com/ThomasChan/start-react-redux-project.git
2. yarn install
3. make (default running port is 4686)
```

## REST API

if you want use local mock server, run
```
yarn mocker (default api port is 3003)
```

if you want change port just `yarn mocker -p [port]`, and do not forget rerun make with `API_ADDR=http://localhost:[port] make`

## Encryption

if you need encryption something, **do not forget** regenerate new openssl public key, we use ```jsencrypt``` for encryption.
