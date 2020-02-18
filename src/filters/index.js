import currency from 'currency.js';
import { format, isValid } from 'date-fns';
import parseISO from 'date-fns/parseISO';

const CLP = function CLP(value) {
  return currency(value, {
    symbol: '$', precision: 0, separator: '.', decimal: ',', formatWithSymbol: true,
  });
};

const USD = function USD(value) {
  return currency(value, {
    symbol: 'US$', separator: '.', decimal: ',', formatWithSymbol: true,
  });
};

const UF = function UF(value) {
  return currency(value, {
    symbol: 'UF ', separator: '.', decimal: ',', formatWithSymbol: true,
  });
};

const EURO = function EURO(value) {
  return currency(value, {
    symbol: '€ ', separator: '.', decimal: ',', formatWithSymbol: true,
  });
};

export default function (value, moneda = 'CLP') {
  if (moneda.toUpperCase() === 'UF') {
    return UF(parseFloat(value)).format();
  } if (moneda.toUpperCase() === 'USD') {
    return USD(parseFloat(value)).format();
  } if (moneda.toUpperCase() === 'EURO') {
    return EURO(parseFloat(value)).format();
  }
  return CLP(parseFloat(value)).format();
}

export function date(value, dateFormat = 'dd/MM/yyyy') {
  if (typeof value !== 'string' && isValid(value)) {
    return format(value, dateFormat);
  }
  return format(parseISO(value), dateFormat);
}

export function slug(originalValue) {
  let newValue = originalValue.replace(/^\s+|\s+$/g, ''); // trim
  newValue = newValue.toLowerCase();

  // remove accents, swap ñ for n, etc
  const from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;';
  const to = 'aaaaaeeeeeiiiiooooouuuunc------';
  for (let i = 0, l = from.length; i < l; i += 1) {
    newValue = newValue.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
  }

  newValue = newValue.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-'); // collapse dashes

  return newValue;
}
