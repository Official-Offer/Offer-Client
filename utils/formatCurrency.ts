const currencyFormat = (num: any, fixed: any) => {
    return Number.parseFloat(num).toFixed(fixed).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
export const isExistAndFormatCurrency = (num: any, fixed: any) => {
    num ? num = currencyFormat(num, fixed) : num = 0;
    return num;
};

// export const numberSeperator = (x: any) => {
//     // return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
//     return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
// }
export const numberSeperator = Intl.NumberFormat('en', { notation: 'standard' })

export const formatter = Intl.NumberFormat('en', { notation: 'compact' });

export const dateFormatter = Intl.DateTimeFormat('en', {month: 'short'})