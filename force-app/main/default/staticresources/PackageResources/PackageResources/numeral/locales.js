/*! @preserve
 * numeral.js
 * locales : 2.0.6
 * license : MIT
 * http://adamwdraper.github.com/Numeral-js/
 */

(function(global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['numeral'], factory);
    } else if (typeof module === 'object' && module.exports) {
        factory(require('./numeral'));
    } else {
        factory(global.numeral);
    }
}(this, function(numeral) {

    (function() {
        numeral.register('locale', 'sq_AL', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'ALL'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'az_AZ', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'AZN'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'hy_AM', {
            delimiters: {
                thousands: ' ',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'AMD'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'eu_ES', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'EUR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'be_BY', {
            delimiters: {
                thousands: ' ',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'BYR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'bs_BA', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'BAM'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'bg_BG', {
            delimiters: {
                thousands: ' ',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'BGN'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'ca_ES_EURO', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'EUR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'ca_ES', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'EUR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'zh_CN_PINYIN', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'CNY'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'zh_CN_STROKE', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'CNY'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'zh_CN', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'CNY'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'zh_HK_STROKE', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'HKD'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'zh_HK', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'HKD'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'zh_MO', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'MOP'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'zh_SG', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'SGD'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'zh_TW_STROKE', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'TWD'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'zh_TW', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'TWD'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'hr_HR', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'HRK'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'cs_CZ', {
            delimiters: {
                thousands: ' ',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'CZK'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'da_DK', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'DKK'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'nl_AW', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'AWG'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'nl_BE', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'EUR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'nl_NL', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'EUR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'nl_SR', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'SRD'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'dz_BT', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'BTN'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_AG', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'XCD'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_AU', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'AUD'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_BS', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'BSD'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_BB', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'BBD'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_BZ', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'BZD'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_BM', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'BMD'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_BW', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'BWP'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_CM', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'XAF'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_CA', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'CAD'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_KY', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'KYD'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_ER', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'ERN'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_FK', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'FKP'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_FJ', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'FJD'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_GM', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'GMD'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_GH', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'GHS'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_GI', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'GIP'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_GY', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'GYD'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_HK', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'HKD'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_IN', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'INR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_ID', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'IDR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_IE_EURO', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'EUR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_IE', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'EUR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_JM', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'JMD'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_KE', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'KES'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_LR', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'LRD'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_MG', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'MGA'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_MW', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'MWK'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_MY', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'MYR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_MU', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'MUR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_NA', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'NAD'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_NZ', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'NZD'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_NG', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'NGN'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_PK', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'PKR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_PG', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'PGK'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_PH', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'PHP'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_RW', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'RWF'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_SH', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'SHP'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_WS', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'WST'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_SC', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'SCR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_SL', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'SLL'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_SG', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'SGD'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_SX', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'ANG'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_SB', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'SBD'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_ZA', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'ZAR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_SZ', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'SZL'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_TZ', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'TZS'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_TO', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'TOP'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_TT', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'TTD'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_UG', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'UGX'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_GB', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'GBP'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_US', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'USD'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'en_VU', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'VUV'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'et_EE', {
            delimiters: {
                thousands: ' ',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'EUR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'fi_FI_EURO', {
            delimiters: {
                thousands: ' ',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'EUR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'fi_FI', {
            delimiters: {
                thousands: ' ',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'EUR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'fr_BE', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'EUR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'fr_CA', {
            delimiters: {
                thousands: ' ',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'CAD'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'fr_KM', {
            delimiters: {
                thousands: ' ',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'KMF'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'fr_FR_EURO', {
            delimiters: {
                thousands: ' ',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'EUR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'fr_FR', {
            delimiters: {
                thousands: ' ',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'EUR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'fr_GN', {
            delimiters: {
                thousands: ' ',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'GNF'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'fr_HT', {
            delimiters: {
                thousands: ' ',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'HTG'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'fr_LU', {
            delimiters: {
                thousands: ' ',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'EUR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'fr_MR', {
            delimiters: {
                thousands: ' ',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'MRO'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'fr_MC', {
            delimiters: {
                thousands: ' ',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'EUR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'fr_WF', {
            delimiters: {
                thousands: ' ',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'XPF'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'ka_GE', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'GEL'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'de_AT_EURO', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'EUR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'de_AT', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'EUR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'de_DE_EURO', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'EUR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'de_DE', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'EUR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'de_LU_EURO', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'EUR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'de_LU', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'EUR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'el_GR', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'EUR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'iw_IL', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'ILS'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'hu_HU', {
            delimiters: {
                thousands: ' ',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'HUF'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'is_IS', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'ISK'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'in_ID', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'IDR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'ga_IE', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'EUR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'it_IT', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'EUR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'ja_JP', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'JPY'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'kk_KZ', {
            delimiters: {
                thousands: ' ',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'KZT'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'km_KH', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'KHR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'ky_KG', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'KGS'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'ko_KP', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'KPW'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'ko_KR', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'KRW'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'lo_LA', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'LAK'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'lv_LV', {
            delimiters: {
                thousands: ' ',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'EUR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'lt_LT', {
            delimiters: {
                thousands: ' ',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'EUR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'lu_CD', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'CDF'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'lb_LU', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'EUR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'mk_MK', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'MKD'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'ms_BN', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'BND'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'ms_MY', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'MYR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'mt_MT', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'EUR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'no_NO', {
            delimiters: {
                thousands: ' ',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'NOK'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'pl_PL', {
            delimiters: {
                thousands: ' ',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'PLN'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'pt_AO', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'AOA'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'pt_BR', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'BRL'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'pt_CV', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'CVE'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'pt_MZ', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'MZN'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'pt_PT', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'EUR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'pt_ST', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'STD'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'ro_MD', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'MDL'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'ro_RO', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'RON'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'rm_CH', {
            delimiters: {
                thousands: '\'',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'CHF'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'rn_BI', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'BIF'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'ru_RU', {
            delimiters: {
                thousands: ' ',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'RUB'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'sr_BA', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'BAM'
            }
        });
    })();


    (function() {
        numeral.register('locale', 'sr_RS', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'RSD'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'sr_CS', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'CSD'
            }
        });
    })();


    (function() {
        numeral.register('locale', 'sh_BA', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'USD'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'sh_ME', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'USD'
            }
        });
    })();


    (function() {
        numeral.register('locale', 'sh_CS', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'USD'
            }
        });
    })();


    (function() {
        numeral.register('locale', 'sk_SK', {
            delimiters: {
                thousands: ' ',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'EUR'
            }
        });
    })();


    (function() {
        numeral.register('locale', 'sl_SI', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'EUR'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'so_DJ', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'DJF'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'so_SO', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'SOS'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'es_AR', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'ARS'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'es_BO', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'BOB'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'es_CL', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'CLP'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'es_CO', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'COP'
            }
        });
    })();


    (function() {
        numeral.register('locale', 'es_CR', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'CRC'
            }
        });
    })();


    (function() {
        numeral.register('locale', 'es_CU', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'CUP'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'es_DO', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'DOP'
            }
        });
    })();



    (function() {
        numeral.register('locale', 'es_EC', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'USD'
            }
        });
    })();


    (function() {
        numeral.register('locale', 'es_SV', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'SVC'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'es_GT', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'GTQ'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'es_HN', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'HNL'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'es_MX', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'MXN'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'es_NI', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'NIO'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'es_PA', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'PAB'
            }
        });
    })();


    (function() {
        numeral.register('locale', 'es_PY', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'PYG'
            }
        });
    })();


    (function() {
        numeral.register('locale', 'es_PE', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'PEN'
            }
        });
    })();


    (function() {
        numeral.register('locale', 'es_PR', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'USD'
            }
        });
    })();


    (function() {
        numeral.register('locale', 'es_ES_EURO', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'EUR'
            }
        });
    })();


    (function() {
        numeral.register('locale', 'es_ES', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'EUR'
            }
        });
    })();


    (function() {
        numeral.register('locale', 'es_US', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'USD'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'es_UY', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'UYU'
            }
        });
    })();


    (function() {
        numeral.register('locale', 'es_VE', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'VEF'
            }
        });
    })();


    (function() {
        numeral.register('locale', 'sv_SE', {
            delimiters: {
                thousands: ' ',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'SEK'
            }
        });
    })();


    (function() {
        numeral.register('locale', 'tl_PH', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'PHP'
            }
        });
    })();


    (function() {
        numeral.register('locale', 'tg_TJ', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'TJS'
            }
        });
    })();


    (function() {
        numeral.register('locale', 'ta_IN', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'INR'
            }
        });
    })();


    (function() {
        numeral.register('locale', 'ta_LK', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'LKR'
            }
        });
    })();


    (function() {
        numeral.register('locale', 'th_TH', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'THB'
            }
        });
    })();


    (function() {
        numeral.register('locale', 'ti_ET', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'ETB'
            }
        });
    })();


    (function() {
        numeral.register('locale', 'tr_TR', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'TRY'
            }
        });
    })();


    (function() {
        numeral.register('locale', 'uk_UA', {
            delimiters: {
                thousands: ' ',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'UAH'
            }
        });
    })();



    (function() {
        numeral.register('locale', 'ur_PK', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'PKR'
            }
        });
    })();


    (function() {
        numeral.register('locale', 'uz_LATN_UZ', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'UZS'
            }
        });
    })();


    (function() {
        numeral.register('locale', 'vi_VN', {
            delimiters: {
                thousands: '.',
                decimal: ','
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'VND'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'cy_GB', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'GBP'
            }
        });
    })();


    (function() {
        numeral.register('locale', 'yo_BJ', {
            delimiters: {
                thousands: ',',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'XOF'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'de_CH', {
            delimiters: {
                thousands: '\'',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'CHF'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'it_CH', {
            delimiters: {
                thousands: '\'',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'CHF'
            }
        });
    })();

    (function() {
        numeral.register('locale', 'fr_CH', {
            delimiters: {
                thousands: '\'',
                decimal: '.'
            },
            abbreviations: {
                thousand: 'k',
                million: 'm',
                billion: 'b'
            },
            ordinal: function(number) {
                return '';
            },
            currency: {
                symbol: 'CHF'
            }
        });
    })();


}));