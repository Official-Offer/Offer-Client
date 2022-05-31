import { CHAIN_ID, BSC_SCAN } from '@config/index';

export class CurrencyAmountAdapter {
    chain_id: any;
    localDisconnect: any;
    currency_amount: string;
    logo_currency_amount: string;
    networkName: string;
    networkFullName: string;
    scan_site: string;
    top_currency_amount: string;
    top_logo_currency_amount: string;

    constructor() {
        this.chain_id = CHAIN_ID;
        this.localDisconnect = process.browser && localStorage.getItem("disconnected");
        this.currency_amount = "";
        this.logo_currency_amount = "";
        this.networkName = "";
        this.networkFullName = "";
        this.scan_site = "";
        this.top_currency_amount = "";
        this.top_logo_currency_amount = "";
        this.switchCurrencyAmount();
    }

    switchCurrencyAmount() {
        switch (this.chain_id) {
            default:
                this.currency_amount = "BNB";
                this.top_currency_amount = "TOP";
                this.top_logo_currency_amount = "/img/logo.png";
                this.logo_currency_amount = "/img/coin/binance-coin.png";
                this.networkName = "BSC";
                this.networkFullName = "Binance Smart Chain";
                // this.currency_amount = "BNB";
                // this.top_currency_amount = "TOP";
                // this.top_logo_currency_amount = "/img/logo.png";
                // this.logo_currency_amount = "/img/coin/binance-coin.png";
                // this.networkName = "BSC";
                // this.networkFullName = "Binance Smart Chain";
                // this.scan_site = BSC_SCAN;
                this.currency_amount = "HERA";
                this.top_currency_amount = "TOP";
                this.top_logo_currency_amount = "/img/logo.png";
                this.logo_currency_amount = "/img/coin/hera.png";
                this.networkName = "HERA";
                this.networkFullName = "Hero Arena Coin";
                this.scan_site = BSC_SCAN;
                break;
        }
    }
}