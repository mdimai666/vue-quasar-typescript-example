export function clone(obj: Object) {
  return JSON.parse(JSON.stringify(obj));
}

export function array_move(arr: any[], old_index: number, new_index: number) {

  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
};

export function dynamicSort(property: string) {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a: any, b: any) {
    var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return result * sortOrder;
  }
}

export function downloadObjectAsJson(exportObj: object, exportName: string) {
  var json = JSON.stringify(exportObj);
  if (exportName.indexOf('json') === -1)
    exportName += '.json';
  download(json, exportName, 'text/json');
}

export function downloadStringAsXML(string: string, exportName: string) {
  var json = (string);
  if (exportName.indexOf('xml') === -1)
    exportName += '.xml';
  download(json, exportName, 'text/xml');
}

export function download(text: string, name: string, type: string) {
  var file = new Blob([text], {
    type: type
  });
  var isIE = /*@cc_on!@*/ false || !!(document as any).documentMode;
  if (isIE) {
    window.navigator.msSaveOrOpenBlob(file, name);
  } else {
    var a = document.createElement('a');
    a.href = URL.createObjectURL(file);
    a.download = name;
    a.click();
  }
}

export function findGetParameter(parameterName: string) {
  var result = null,
    tmp = [];
  location.search
    .substr(1)
    .split("&")
    .forEach(function (item) {
      tmp = item.split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
  return result;
}

export function onlyUnique(value: any, index: number, self: any) {
  return self.indexOf(value) === index;
}

export function randomdColor() {
  var hex = '0123456789ABCDEF'.split(''),
    color = '#',
    i;
  for (i = 0; i < 6; i++) {
    color = color + hex[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function removeNonWords(st: string) {
  var s = st.replace(/[^\wа-я]+/ig, '');
  return s;
}

export function removeNonWords2(st: string) {
  var s = st.replace(/[^\wа-я\-\_\.]+/ig, '');
  return s;
}

export function forwardSlash(str: string) {
  return (str || '').replace(/\\/g, '/');
}

/**
 * return numeric object array
 * @example
 * {0: value1, 1: value 2}
 */
export function toObjectArray(arr: any[]) {
  var rv: any = {};
  for (var i = 0; i < arr.length; ++i)
    rv[i] = arr[i];
  return rv;
}

export function trimSlash(str: string) {
  return (str || '').replace(/^\/|\/$/g, "");
};

export function urlJoin() {
  var p = [];
  for (var i = 0; i < arguments.length; i++) {
    var path = arguments[i];
    path = trimSlash(forwardSlash(path));
    p.push(path);
  }

  return trimSlash(p.join('/'));;
}

export function fullUrl(...params: string[]) {
  let h = urlJoin.apply(null, params as any);
  if (h.indexOf('http') < 0) (h as any) = "//" + h;
  return h;
}

// export function all_childs(arr: any[], id: number | number[], prop_parent_id: string, __maxDepth = 15) {
//   if (__maxDepth < 1) return []
//   prop_parent_id = prop_parent_id || 'parent_id'
//   if (id.length !== 0 && !id.length) id = [id]

//   let childs = arr.filter(s => id.includes(s.parent_id))
//   let ids = childs.map(s => s.id)

//   if (childs.length > 0)
//     return childs.concat(all_childs(arr, ids, prop_parent_id, --__maxDepth))
//   else
//     return []
// }

let date_map_0 = {
  'Jan': 'Янв',
  'Feb': 'Фев',
  'Mar': 'Мар',
  'Apr': 'Апр',
  'May': 'Май',
  'Jun': 'Июн',
  'Jul': 'Июл',
  'Aug': 'Авг',
  'Sep': 'Сен',
  'Oct': 'Окт',
  'Nov': 'Ноя',
  'Dec': 'Дек',
  'January': 'Январь',
  'February': 'Февраль',
  'March': 'Март',
  'April': 'Апрель',
  // 'May':'Май',
  'June': 'Июнь',
  'July': 'Июль',
  'August': 'Август',
  'September': 'Сентябрь',
  'October': 'Октябрь',
  'November': 'Ноябрь',
  'December': 'Декабрь',
}

let date_map = {
  'Jan': 'Янв',
  'Feb': 'Фев',
  'Mar': 'Мар',
  'Apr': 'Апр',
  'May': 'Май',
  'Jun': 'Июн',
  'Jul': 'Июл',
  'Aug': 'Авг',
  'Sep': 'Сен',
  'Oct': 'Окт',
  'Nov': 'Ноя',
  'Dec': 'Дек',
  'January': 'Января',
  'February': 'Февраля',
  'March': 'Марта',
  'April': 'Апреля',
  // 'May':'Мая',
  'June': 'Июня',
  'July': 'Июля',
  'August': 'Августа',
  'September': 'Сентября',
  'October': 'Октября',
  'November': 'Ноября',
  'December': 'Декабря',
};

/**
 * Replace month name string
 * @param {String} val String contain month name in english
 * @returns {String}
 */
export function translate_monthName(val: string) {
  return (date_map as any)[val] || val;
}

export function translate_monthNamePrimary(val: string) {
  return (date_map_0 as any)[val] || val;
}

export default {
  array_move,
  dynamicSort,
  downloadObjectAsJson,
  downloadStringAsXML,
  download,
  findGetParameter,
  onlyUnique,
  randomdColor,
  removeNonWords,
  removeNonWords2,
  forwardSlash,
  toObjectArray,
  trimSlash,
  urlJoin,
  fullUrl,
  // all_childs,
  translate_monthName,
}
