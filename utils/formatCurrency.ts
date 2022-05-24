const currencyFormat = (num: any, fixed: any) => {
    return Number.parseFloat(num).toFixed(fixed).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}

export const isExistAndFormatCurrency = (num: any, fixed: any) => {
    num ? num = currencyFormat(num, fixed) : num = 0;
    return num;
};

export const numberSeperator = (x) => {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export const formatter = Intl.NumberFormat('en', { notation: 'compact' });