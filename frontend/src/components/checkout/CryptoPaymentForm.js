import React from 'react';

export const CHAIN_IDS = {
    TETHER: {
        NAME: "Tether",
        CURRENCY_CODE: "USDT",
        MAIN_NET: {
            ID: 1
        },
        ROPSTEN: {
            NAME: "ropsten",
            ID: 3
        }
    },
    BITCOIN: {
        NAME: "Bitcoin",
        CURRENCY_CODE: "BTC",
        MAIN_NET: {
            ID: 1
        },
        ROPSTEN: {
            NAME: "ropsten",
            ID: 3
        }
    },
    BINANCE: {
        NAME: "Binance",
        CURRENCY_CODE: "BNB",
        MAIN_NET: {
            ID: 56
        },
        TEST_NET: {
            NAME: "testnet",
            ID: 97,
        }
    },
    ETHEREUM: {
        NAME: "Ethereum",
        CURRENCY_CODE: "ETH",
        MAIN_NET: {
            ID: 1
        },
        ROPSTEN: {
            NAME: "ropsten",
            ID: 3
        }
    }
}

export const MAXIMUM_DECIMAL_PLACES = 8;

export const CRYPTO_IN_USD = {
    ETH: 3363.92,
	BNB: 499.98,
	BTC: 45499.89,
	USDT: 1
}

const CryptoPaymentForm = () => {
  return (
    <div>CryptoPaymentForm</div>
  )
}

export default CryptoPaymentForm