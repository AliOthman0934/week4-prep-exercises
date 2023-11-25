import eurosFormatter from './euroFormatter.js';

function deposit(amount) {
  this._cash += amount;
}

function withdraw(amount) {
  if (this._cash - amount < 0) {
    console.log(`Insufficient funds!`);
    return 0;
  }


  if (amount > this._dailyAllowance) {
    console.log(`Withdrawal exceeds the daily allowance!`);
    return 0;
  }

  this._cash -= amount;
  this._dayTotalWithdrawals += amount; 
  return amount;
}

function transferInto(wallet, amount) {
  console.log(
    `Transferring ${eurosFormatter.format(amount)} from ${
      this._name
    } to ${wallet.getName()}`
  );
  const withdrawnAmount = this.withdraw(amount);
  wallet.deposit(withdrawnAmount);
}

function reportBalance() {
  console.log(
    `Name: ${this._name}, balance: ${eurosFormatter.format(this._cash)}, ` +
    `daily withdrawals: ${eurosFormatter.format(this._dayTotalWithdrawals)}`
  );
}

function getName() {
  return this._name;
}

function setDailyAllowance(newAllowance) {
  this._dailyAllowance = newAllowance;
}

function createWallet(name, cash = 0) {
  return {
    _name: name,
    _cash: cash,
    _dailyAllowance: Infinity, 
    _dayTotalWithdrawals: 0,

    deposit,
    withdraw,
    transferInto,
    reportBalance,
    getName,
    setDailyAllowance,
  };
}

function main() {
  const walletJack = createWallet('Jack', 100);
  const walletJoe = createWallet('Joe', 10);
  const walletJane = createWallet('Jane', 20);

  walletJack.transferInto(walletJoe, 50);
  walletJane.transferInto(walletJoe, 25);

  walletJane.deposit(20);
  walletJane.transferInto(walletJoe, 25);

  walletJack.reportBalance();
  walletJoe.reportBalance();
  walletJane.reportBalance();


  walletJack.setDailyAllowance(75);

  const withdrawnAmount = walletJack.withdraw(80);
  console.log(`Withdrawn Amount: ${eurosFormatter.format(withdrawnAmount)}`);
  walletJack.reportBalance();
}

main();
