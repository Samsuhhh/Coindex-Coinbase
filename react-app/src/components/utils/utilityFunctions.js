// utility functions to use around app


export const capitalizeFirstLetter = (name) => {
    let split = name.split('');
    let res = split[0]?.toUpperCase();
    split.splice(0, 1, `${res}`)
    return split.join('')
};

// export const getPortfolioBalance = () => {
//     let total = 0;
//     let cash;

//     // get current user wallet balances and calculate cash value forEach
//     Object.keys(currWallet).forEach(key => {
//         let amt = Number(currWallet[key].assetAmount)
//         let price = Number(allAssets[key].usd)
//         cash = cashValueCalculator(amt, price)
//         total += cash
//     });

//     let split = total.toFixed(2).split('.');
//     let bulk = split[0];
//     let decimal = split[1];
//     let insert = bulk.split('')
//     if (bulk.length === 4) {
//         insert.splice(1, 0, ',')
//         return insert.join('') + '.' + decimal

//     } else if (bulk.length === 5) {
//         insert.splice(2, 0, ',')
//         return insert.join('') + '.' + decimal

//     } else if (bulk.length === 6) {
//         insert.splice(3, 0, ',')
//         return insert.join('') + '.' + decimal

//     } else if (bulk.length === 7) {
//         insert.splice(1, 0, ',')
//         insert.splice(5, 0, ',')
//         return insert.join('') + '.' + decimal

//     } else if (bulk.length === 8) {
//         insert.splice(2, 0, ',')
//         insert.splice(6, 0, ',')
//         return insert.join('') + '.' + decimal

//     } else if (bulk.length === 9) {
//         insert.splice(3, 0, ',')
//         insert.splice(7, 0, ',')
//         return insert.join('') + '.' + decimal
//     } else if (bulk.length === 10) {
//         insert.splice(1, 0, ',')
//         insert.splice(5, 0, ',')
//         insert.splice(9, 0, ',')
//         return insert.join('') + '.' + decimal
//     } else {
//         return "You're dummy rich."
//     }

// }