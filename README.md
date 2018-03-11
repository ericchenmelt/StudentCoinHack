# StudentCoinHack
A student loan network on the ethereum blockchain

## Truffle

Update:

```npm uninstall -g truffle```

```npm install -g truffle```


## how to install

1. `git clone github.com/ericchenmelt/StudentCoinhack`

1. `cd StudentCoinhack`

1. `npm install -g truffle`

1. `npm install -g yarn`

1. `yarn install`

## how to build

3. Run the development console.
    ```javascript
    truffle develop
    ```

4. Compile and migrate the smart contracts. Note inside the development console we don't preface commands with `truffle`.
    ```javascript
    compile
    migrate
    deploy
    ```

## how to run 

1. `yarn start`

`go to localhost:3000`

## route ideas: 
```
/ => landing

/student/profile
/student/signup
/student/wallet
/student/myfunders
/student/transactions

/funder/signup
/funder/home
```

## how to not die:

```
truffle develop

> compile 
> migrate --reset 
> Accounts.deployed().then(function(instance){return instance.incrementStudent("hello world");}).then(console.log);
> Accounts.deployed().then(function(instance){return instance.getStudentCount();}).then(console.log);
```
