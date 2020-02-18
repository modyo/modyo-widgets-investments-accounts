/* eslint-disable no-param-reassign */
/**
Get the params from an url
Usage:
If url is: http://somesite.com/seach?query=yyy&myParam=xxxx
to get the myParam value:
getURLParams("myParam")
For more power needs:
http://stackoverflow.com/a/19965480
https://github.com/sindresorhus/query-string
*/
export function getURLParams(sParam) {
  const sPageURL = window.location.search.substring(1);
  const sURLVariables = sPageURL.split('&');
  for (let i = 0; i < sURLVariables.length; i += 1) {
    const sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] === sParam) {
      return sParameterName[1];
    }
  }
  return false;
}

export const rutUtilities = {
  clean(value) {
    if (typeof _value !== 'string') {
      value = value.toString();
    }
    return value.replace(/^0+|[^0-9kK]+/g, '').toUpperCase().substring(0, 9);
  },

  format(_value, _default) {
    _value = this.clean(_value);

    if (!_value) {
      return _default;
    }

    if (_value.length <= 1) {
      return _value;
    }

    let result = `${_value.slice(-4, -1)}-${_value.substr(_value.length - 1)}`;
    for (let i = 4; i < _value.length; i += 3) {
      result = `${_value.slice(-3 - i, -i)}.${result}`;
    }
    return result;
  },

  validate(rut) {
    if (typeof (rut) !== 'string') {
      return false;
    }
    const cRut = rut.replace(/[.-]/g, '');
    const cDv = cRut.charAt(cRut.length - 1).toUpperCase();
    let nRut = parseInt(cRut.substr(0, cRut.length - 1), 10);
    if (Number.isNaN(nRut)) {
      return false;
    }
    let sum = 0;
    let factor = 2;
    nRut = nRut.toString();
    for (let i = nRut.length - 1; i >= 0; i -= 1) {
      sum += nRut.charAt(i) * factor;
      factor = (factor + 1) % 8 || 2;
    }
    let computedDv = 0;

    switch (sum % 11) {
      case 1:
        computedDv = 'k';
        break;
      case 0:
        computedDv = 0;
        break;
      default:
        computedDv = 11 - (sum % 11);
        break;
    }

    return computedDv.toString().toUpperCase() === cDv.toString().toUpperCase();
  },
};

export const rutDirective = {
  bind(el, binding, vnode) {
    el.addEventListener('blur', () => {
      vnode.context[binding.expression] = rutUtilities.format(el.value);
    });
    el.addEventListener('keyup', () => {
      vnode.context[binding.expression] = rutUtilities.format(el.value);
    });
  },
  updated() {},
};
