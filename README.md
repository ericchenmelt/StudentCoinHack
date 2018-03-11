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

## how to test deposit
Make sure account1 has sufficient funds in MetaMask. 

```
truffle compile

truffle migrate --reset

var accounts;

web3.eth.getAccounts(function(err,res) { accounts = res; });

var account1 = accounts[0]; // first account

var account2 = accounts[1]; // second account, if exists

console.log(account1);

Accounts.deployed().then(function(instance){return instance.addStudent("Martin Shrekli", "Columbia", "Phrma bro", {from: account2});}).then(console.log);

Accounts.deployed().then(function(instance){return instance.addLender("Raphael", {from: account1});}).then(console.log);

Accounts.deployed().then(function(instance){return instance.startFundraising(100000, {from: account2});}).then(console.log);

Accounts.deployed().then(function(instance){return instance.getLenderBalanceIdx(0, {from: account1});}).then(console.log);

Accounts.deployed().then(function(instance){return instance.getStudentRaisedIdx(0, {from: account2});}).then(console.log);

Accounts.deployed().then(function(instance){return instance.fund(0, {from: account1, value: 400, gas:900000});}).then(console.log);

Accounts.deployed().then(function(instance){return instance.getStudentRaisedIdx(0, {from: account2});}).then(console.log);

web3.fromWei(web3.eth.getBalance(account1));
web3.fromWei(web3.eth.getBalance(account2));

Accounts.deployed().then(function(instance){return instance.getContractBalance()}).then(console.log);
```
