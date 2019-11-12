function generate() {
}(function(e, a) { for(var i in a) e[i] = a[i]; }(this, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
var startLearningMonth = 8; // September

var lastPosibleMonth = 3; // April

var courseTypeMap = {
  'Стандарт': 'offline',
  'Премиум': 'online'
};
var paymentTypeMap = {
  'В рассрочку': 'credit',
  'Полностью': 'cash'
};
module.exports = {
  months: months,
  startLearningMonth: startLearningMonth,
  lastPosibleMonth: lastPosibleMonth,
  courseTypeMap: courseTypeMap,
  paymentTypeMap: paymentTypeMap
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/*global SpreadsheetApp DriveApp DocumentApp */
var _require = __webpack_require__(3),
    generalFolderId = _require.generalFolderId,
    contractTemplateId = _require.contractTemplateId;

var MorpherApi = __webpack_require__(4);

var CostCalc = __webpack_require__(5);

var _require2 = __webpack_require__(7),
    transformDateToString = _require2.transformDateToString,
    getAdditionalText = _require2.getAdditionalText,
    getCuratorText = _require2.getCuratorText,
    getStartLearningDate = _require2.getStartLearningDate;
    

function generate() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Тест');//.getActiveSheet(); ////////////////////

  var rows = sheet.getDataRange();
  var values = rows.getValues();
  var generalFolder = DriveApp.getFolderById(generalFolderId);
  var source = DriveApp.getFileById(contractTemplateId);
  var ourRow;

  for (var i in values) {
    if (!values.hasOwnProperty(i)) continue;
    ourRow = i;
    var currentRow = values[ourRow];
    var contractLink = currentRow[23];
    var activate = currentRow[32]
    if (activate) continue;
    var fields = {
      contractDate: currentRow[0],
      // 1 - amoid
      parentFullName: currentRow[2],
      parentPassportData: currentRow[3],
      parentPassportEmitter: currentRow[4],
      parentPassportEmitterNumber: currentRow[5],
      parentPassportEmissionDate: currentRow[6],
      parentRegistrationAddress: currentRow[7],
      // 8 - Дата регистрации родителя
      parentPhoneNumber: currentRow[9],
      parentEmail: currentRow[10],
      studentFullName: currentRow[11],
      studentBirthday: currentRow[12],
      studentAddress: currentRow[13],
      // сейчас пусто ( нет в тайп форме ). Надо править? TODO
      gradeString: currentRow[14],
      paymentType: currentRow[15],
      // 16 - Рассрочка на сколько месяцев?
      studentPhone: currentRow[17],
      studentEmail: currentRow[18],
      studentDocumentData: currentRow[19],
      // 20 - Дата регистрации обучающегося
      // 21 - Направление
      baseCourseType: currentRow[22],
      // 23 - Ссылка на договор
      // 24 - Ссылку на папку с договором
      withAdditionalCourse: !!currentRow[25],
      withCurator: !!currentRow[26],
      additionalCourseType: currentRow[27],
      // 28 - стоимость
      studentRegistrationAddress: currentRow[29],
      // 30 - Ссылка на оплату
      discount: currentRow[31],
      activate: currentRow[32]
    };
    
    var newFolder;
    if (currentRow[24]) {
      newFolder = DriveApp.getFolderById(currentRow[24].replace('https://drive.google.com/drive/folders/', ''));
    } else {
      newFolder = generalFolder.createFolder(fields.studentFullName);
    } 
    var files = newFolder.getFiles();
    while (files.hasNext()) {   
      var file = files.next();   
      if (file.getName().indexOf("Договор") != -1) {
        Drive.files.remove(file.getId()); //Удаляем старый договор из папки, если он есть
      }
    }
    var newFile = source.makeCopy(source, newFolder);
    newFile.setName('Договор ' + fields.studentFullName);
    var body = DocumentApp.openByUrl(newFile.getUrl()).getBody();
    var countDoc = parseInt(i) + 4000; // TODO перенести в отдельный модуль

    body.editAsText().replaceText("<<Дата заключения договора>> г", transformDateToString(fields.contractDate));
    body.editAsText().replaceText("!номер!", countDoc);
    body.editAsText().replaceText("<<Фамилия Имя Отчество родителя в им. падеже>>", fields.parentFullName);
    body.editAsText().replaceText("<<Серия и номер паспорта родителя>>", fields.parentPassportData);
    body.editAsText().replaceText("<<Орган, выдавший паспорт родителя>>", fields.parentPassportEmitter);
    body.editAsText().replaceText("<<Код подразделения>>", fields.parentPassportEmitterNumber);
    body.editAsText().replaceText("<<Дата выдачи паспорта родителя>>г.", transformDateToString(fields.parentPassportEmissionDate));
    body.editAsText().replaceText("<<Адрес регистрации родителя>>", fields.parentRegistrationAddress);
    body.editAsText().replaceText("<<Номер телефона родителя>>", fields.parentPhoneNumber);
    body.editAsText().replaceText("<<Адрес электронной почты родителя>>", fields.parentEmail);
    body.editAsText().replaceText("<<Фамилия Имя Отчество обучающегося в им. падеже>>", fields.studentFullName);
    body.editAsText().replaceText("<<Дата рождения обучающегося>>", transformDateToString(fields.studentBirthday));
    body.editAsText().replaceText("<<Место жительства обучающегося>>", fields.studentAddress);
    body.editAsText().replaceText("<<Адрес регистрации обучающегося>>", fields.studentRegistrationAddress);
    body.editAsText().replaceText("<<Телефон обучающегося>>", fields.studentPhone);
    body.editAsText().replaceText("<<электронная почта, указанная при регистрации на сайте foxford.ru>>", fields.studentEmail);
    body.editAsText().replaceText("<<Реквизиты документа ученика>>", fields.studentDocumentData);
    body.editAsText().replaceText("<<Дата начала обучения>>", "с " + transformDateToString(getStartLearningDate(fields.contractDate)));
    body.editAsText().replaceText("<<Указать уровень: Премиум/Стандарт>>", fields.baseCourseType.toString());
    body.editAsText().replaceText("<<Класс обучающегося в 2018-2019 учебном году>>", fields.gradeString);
    body.editAsText().replaceText("<<Доступ к базовым>>", fields.baseCourseType);
    body.editAsText().replaceText("<<Углубленный_блок_информация>>", fields.withAdditionalCourse ? getAdditionalText(fields.additionalCourseType) : '');
    body.editAsText().replaceText("<<С_куратором_или_без>>", getCuratorText(fields.withCurator));
    var payment = CostCalc.getPaymentText(fields);
    body.editAsText().replaceText("!стоимость!", payment.costText);
    body.editAsText().replaceText("!способ_оплаты!", payment.paymentText);

    try {
      body.editAsText().replaceText("<<Фамилия_Инициалы_родителя>>", MorpherApi.getSurnameWithInitials(fields.parentFullName));
    } catch (error) {
      body.editAsText().replaceText("<<Фамилия_Инициалы_родителя>>", fields.parentFullName);
    }

    body.editAsText().replaceText("<<именуемый>>", 'именуемый/ая');
    body.editAsText().replaceText("!зарегистрированныйРД!", 'зарегистрированный/ая');
    body.editAsText().replaceText("!зарегистрированныйУ!", 'зарегистрированный/ая');

    try {
      body.editAsText().replaceText("!имяРодителяР!", MorpherApi.getGentiveDeclensionString(fields.parentFullName));
    } catch (error) {
      body.editAsText().replaceText("!имяРодителяР!", fields.parentFullName);
    }

    //newFile.addEditor('externat@foxford.ru');
    newFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.EDIT);
    newFolder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.EDIT);
    var url = newFile.getUrl();
    var folderURL = newFolder.getUrl();
    sheet.getRange("X" + (parseInt(ourRow) + 1)).setValue(url);
    sheet.getRange("Y" + (parseInt(ourRow) + 1)).setValue(folderURL);
    sheet.getRange("AC" + (parseInt(ourRow) + 1)).setValue(payment.sum); //Проставляем сумму
    sheet.getRange("AE" + (parseInt(ourRow) + 1)).setValue(payment.payLink); //Проставляем ссылку на оплату
    //sheet.getRange("AG" + (parseInt(ourRow) + 1)).setValue('Удали меня'); //Проставляем текст в активатор генерации, чтобы при каждом изменении не срабатывал генератор
  }

  prikaz(newFolder, fields.contractDate. fields.studentFullName, countDoc, ourRow);
}

global.generate = generate;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(2)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = {
  generalFolderId: '16z5ztW7ZMB4ro7iHvVfjKfWYtV1TRmZF', //Старая папка 2018/19 -'1F4Khrr7r_SL7c7hYBVGt5b95kArFOMMo',
  contractTemplateId: "1Am8UdM4Wt8YGVXjSrWItqvh7QMNSxXcC1celWf3_l2E"
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* global UrlFetchApp*/
var MorpherApi = function MorpherApi() {
  var _this = this;

  _classCallCheck(this, MorpherApi);

  _defineProperty(this, "_baseUrl", 'http://ws3.morpher.ru/russian/declension');

  _defineProperty(this, "_token", 'fa097c59-7de7-446b-b62e-e9211714f441');

  _defineProperty(this, "getJson", function (string) {
    var url = "".concat(_this._baseUrl, "?s=").concat(string, "&token=").concat(_this._token, "&format=json");
    var response = UrlFetchApp.fetch(url);
    var jsonText = response.getContentText();

    try {
      return JSON.parse(jsonText);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  });

  _defineProperty(this, "getSurnameWithInitials", function (string) {
    var json = _this.getJson(string);

    var fio = json['ФИО'];
    var surname = fio['Ф'];
    var name = fio['И'];
    var patronymic = fio['О'];
    return "".concat(surname, " ").concat(name[0], ". ").concat(patronymic[0], ".");
  });

  _defineProperty(this, "getGentiveDeclensionString", function (string) {
    var json = _this.getJson(string);

    return json['Р'];
  });
};

module.exports = new MorpherApi();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var costMap = __webpack_require__(6);

var _require = __webpack_require__(0),
    months = _require.months,
    startLearningMonth = _require.startLearningMonth,
    lastPosibleMonth = _require.lastPosibleMonth,
    courseTypeMap = _require.courseTypeMap,
    paymentTypeMap = _require.paymentTypeMap;

var CostCalc =
/*#__PURE__*/
function () {
  function CostCalc() {
    _classCallCheck(this, CostCalc);
  }

  _createClass(CostCalc, null, [{
    key: "floatToSamplesInWordsRus",
    value: function floatToSamplesInWordsRus(fAmount) {
      var mapNumbers = {
        0: [2, 1, "ноль"],
        1: [0, 2, "один", "одна"],
        2: [1, 2, "два", "две"],
        3: [1, 1, "три"],
        4: [1, 1, "четыре"],
        5: [2, 1, "пять"],
        6: [2, 1, "шесть"],
        7: [2, 1, "семь"],
        8: [2, 1, "восемь"],
        9: [2, 1, "девять"],
        10: [2, 1, "десять"],
        11: [2, 1, "одиннадцать"],
        12: [2, 1, "двенадцать"],
        13: [2, 1, "тринадцать"],
        14: [2, 1, "четырнадцать"],
        15: [2, 1, "пятнадцать"],
        16: [2, 1, "шестнадцать"],
        17: [2, 1, "семнадцать"],
        18: [2, 1, "восемнадцать"],
        19: [2, 1, "девятнадцать"],
        20: [2, 1, "двадцать"],
        30: [2, 1, "тридцать"],
        40: [2, 1, "сорок"],
        50: [2, 1, "пятьдесят"],
        60: [2, 1, "шестьдесят"],
        70: [2, 1, "семьдесят"],
        80: [2, 1, "восемьдесят"],
        90: [2, 1, "девяносто"],
        100: [2, 1, "сто"],
        200: [2, 1, "двести"],
        300: [2, 1, "триста"],
        400: [2, 1, "четыреста"],
        500: [2, 1, "пятьсот"],
        600: [2, 1, "шестьсот"],
        700: [2, 1, "семьсот"],
        800: [2, 1, "восемьсот"],
        900: [2, 1, "девятьсот"]
      };
      var mapOrders = [{
        _Gender: true,
        _arrStates: [""]
      }, {
        _Gender: false,
        _arrStates: ["тысяча", "тысячи", "тысяч"]
      }, {
        _Gender: true,
        _arrStates: ["миллион", "миллиона", "миллионов"]
      }, {
        _Gender: true,
        _arrStates: ["миллиард", "миллиарда", "миллиардов"]
      }, {
        _Gender: true,
        _arrStates: ["триллион", "триллиона", "триллионов"]
      }];
      var objKop = {
        _Gender: false,
        _arrStates: [""]
      };

      function Value(dVal, bGender) {
        var xVal = mapNumbers[dVal];

        if (xVal[1] === 1) {
          return xVal[2];
        } else {
          return xVal[2 + (bGender ? 0 : 1)];
        }
      }

      function From0To999(fValue, oObjDesc, fnAddNum, fnAddDesc) {
        var nCurrState = 2;

        if (Math.floor(fValue / 100) > 0) {
          var fCurr = Math.floor(fValue / 100) * 100;
          fnAddNum(Value(fCurr, oObjDesc._Gender));
          nCurrState = mapNumbers[fCurr][0];
          fValue -= fCurr;
        }

        if (fValue < 20) {
          if (Math.floor(fValue) > 0) {
            fnAddNum(Value(fValue, oObjDesc._Gender));
            nCurrState = mapNumbers[fValue][0];
          }
        } else {
          var _fCurr = Math.floor(fValue / 10) * 10;

          fnAddNum(Value(_fCurr, oObjDesc._Gender));
          nCurrState = mapNumbers[_fCurr][0];
          fValue -= _fCurr;

          if (Math.floor(fValue) > 0) {
            fnAddNum(Value(fValue, oObjDesc._Gender));
            nCurrState = mapNumbers[fValue][0];
          }
        }

        fnAddDesc(oObjDesc._arrStates[nCurrState]);
      }

      var fInt = Math.floor(fAmount + 0.005);
      var fDec = Math.floor((fAmount - fInt) * 100 + 0.5);
      var arrRet = [];
      var arrThousands = [];

      for (; fInt > 0.9999; fInt /= 1000) {
        arrThousands.push(Math.floor(fInt % 1000));
      }

      if (arrThousands.length === 0) {
        arrThousands.push(0);
      }

      function PushToRes(strVal) {
        arrRet.push(strVal);
      }

      for (var iSouth = arrThousands.length - 1; iSouth >= 0; --iSouth) {
        if (arrThousands[iSouth] === 0) {
          continue;
        }

        From0To999(arrThousands[iSouth], mapOrders[iSouth], PushToRes, PushToRes);
      }

      if (arrThousands[0] === 0) {
        //  Handle zero amount
        if (arrThousands.length === 1) {
          PushToRes(Value(0, mapOrders[0]._Gender));
        }

        var nCurrState = 2;
        PushToRes(mapOrders[0]._arrStates[nCurrState]);
      }

      if (arrRet.length > 0) {
        // Capitalize first letter
        arrRet[0] = arrRet[0].match(/^(.)/)[1].toLocaleUpperCase() + arrRet[0].match(/^.(.*)$/)[1];
      }

      arrRet.push(fDec < 10 ? "0" + fDec : "" + fDec);
      From0To999(fDec, objKop, function () {}, PushToRes);
      return arrRet.join(" ");
    }
  }, {
    key: "getSumAsText",
    value: function getSumAsText(sum) {
      return sum + ' (' + CostCalc.floatToSamplesInWordsRus(sum).replace('  00 ', '') + ') рублей 00 копеек';
    }
  }, {
    key: "filledArray",
    value: function filledArray(length, value) {
      var arr = [];

      for (var i = 0; i < length; i++) {
        arr.push(value);
      }

      return arr;
    }
  }, {
    key: "getCurrentMonthPayment",
    value: function getCurrentMonthPayment(date) {
      //if (date <= 10) return 2; //старая версия (до сент 2019)
      //if (date <= 20) return 1.5; //старая версия (до сент 2019)
      if (date <= 14) return 1;
      if (date > 14) return 1/2;
      return 0;
    }
  }, {
    key: "getSecondPaymentMonth",
    value: function getSecondPaymentMonth(date) {
      var curDate = new Date(date);

      if (curDate.getMonth() > lastPosibleMonth && curDate.getMonth() < startLearningMonth) {
        return startLearningMonth;
      }

      if (curDate.getDate() >= 10) {
        return curDate.getMonth() + 1;
      }

      return curDate.getMonth();
    }
  }, {
    key: "generatePaymentText",
    value: function generatePaymentText(date, cost, unchangeblePrice, onCredit) {
      var cureDate = new Date(date);
      var paymentsArr = CostCalc.getPaymentsArr(date, cost, unchangeblePrice, onCredit);
      var sum = paymentsArr.reduce(function (acc, i) {
        return acc + i;
      }, 0);
      sum = Math.floor(sum);
      var paymentStrings = [];
      paymentStrings.push(CostCalc.getSumAsText(paymentsArr.shift()) + ' - в течение 5 рабочих дней с даты заключения Договора');
      var nextPaymentMonth = CostCalc.getSecondPaymentMonth(date);
      paymentsArr.forEach(function (sum) {
        var year = nextPaymentMonth >= 8 ? cureDate.getFullYear() : cureDate.getFullYear() + 1;
        if (nextPaymentMonth > 11) nextPaymentMonth = 0;
        paymentStrings.push(CostCalc.getSumAsText(sum) + ' - до «20» ' + months[nextPaymentMonth] + ' ' + year + 'г.');
        nextPaymentMonth++;
      });
      return {
        text: paymentStrings.join('\n'),
        sum: sum
      };
    }
  }, {
    key: "getPaymentsArr",
    value: function getPaymentsArr(date, cost, unchangeblePrice, onCredit) {
    var nextYearLearningDuration = 5;
      var curDate = new Date(date);
      var curMonth = curDate.getMonth();
      var curDay = curDate.getDate();
      //var isCredit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      //var maxMonth //количество месяцев обучения за весь год
      var maxMonth = onCredit ? 9 : 8; //старое (до сент 2019)
      //var firstMonthCostMultuply = 2; //старое (до сент 2019)
      var firstMonthCostMultuply = curDay > 14 ? (3/2) : 2; //после и до 14 числа
     // var curMonthPaymentCoof = 0; // in case when we can't divide payments more then 2 or 3 month //старое (до сент 2019)

      if (Array.isArray(cost)) {
        maxMonth = cost[1];
        cost = cost[0];
        firstMonthCostMultuply = 1;
        curMonthPaymentCoof = 1;
      }
      
      /*if (curMonth < startLearningMonth && curMonth > lastPosibleMonth) { //летом
        var payments = CostCalc.filledArray(maxMonth, Math.floor(cost / maxMonth));

        if (isCredit) {
          payments[0] = payments[0] * firstMonthCostMultuply;
          payments.pop();
        }

        return payments;
      } else {*/
      
        var monthEstimate;//кол-во месяцев обучения

        if (curMonth >= startLearningMonth) {
          monthEstimate = nextYearLearningDuration + 12 - curMonth;
        } else {
          monthEstimate = nextYearLearningDuration - curMonth;
        }
        
        var curMonthPaymentCoof = CostCalc.getCurrentMonthPayment(curDay);
        
        var allPayments
        if (unchangeblePrice) { //Если БП Стандарт - он не должен уменьшаться
          firstMonthCostMultuply = 2;
          curMonthPaymentCoof = 1;
          allPayments = onCredit ? CostCalc.filledArray(monthEstimate, Math.floor(cost / monthEstimate)) : CostCalc.filledArray(maxMonth, Math.floor(cost / maxMonth));
        } else {
          cost = (cost / maxMonth) * monthEstimate //Уменьшение оплаты с каждым месяцем (оплата за мес * кол-во месяцев обучения)
          allPayments = CostCalc.filledArray(monthEstimate, Math.floor(cost / monthEstimate))//CostCalc.filledArray(monthEstimate, Math.floor(cost / monthEstimate));//Заполняем массив с суммами за месяц (одинаковыми)
        }

        
        if (onCredit) {

          if (allPayments.length > 1) {
            allPayments[0] *= firstMonthCostMultuply;
            allPayments.pop();
          }
        } else {
          // убираем лишний месяц для оплаты полностью
          allPayments.pop();
          allPayments[0] = allPayments[0] * curMonthPaymentCoof;
        }

        return allPayments;
    }
    /**
     *
     * @param grade number 5-11
     * @param baseCourseType string online|offline
     * @param additionalCourseType string online|offline
     * @param withCurator boolean
     * @param onCredit boolean
     */

  }, {
    key: "getCost",
    value: function getCost(_ref) {
      var grade = _ref.grade,
          baseCourseType = _ref.baseCourseType,
          additionalCourseType = _ref.additionalCourseType,
          withCurator = _ref.withCurator,
          onCredit = _ref.onCredit;
      var costObj, costArr;
      if (isNaN(+grade)) throw new Error('[CostCalc] wrong grade (must be a number) - ' + grade); // Цена для 5-8 классов одинаковая

      if (grade >= 5 && grade <= 7) {
        grade = 8;
      }

      var gradeMap = costMap[grade];
      if (!gradeMap) throw new Error('[CostCalc] wrong grade number - ' + grade);
      costObj = gradeMap[baseCourseType];
      if (!costObj) throw new Error('[CostCalc] wrong baseCourseType - ' + baseCourseType);

      if (additionalCourseType) {
        costObj = costObj.additional[additionalCourseType];
        if (!costObj) throw new Error('[CostCalc] wrong additionalCourseType - ' + additionalCourseType);
      }

      if (withCurator) {
        costArr = costObj.curator;
      } else {
        costArr = costObj.simple;
      }
      
      var unchangeblePrice = costArr[4] ? true : false; //для случая, когда цена не должна уменьшаться
      if (onCredit) {
        return [costArr[2], costArr[3], unchangeblePrice];//price, price-link
      } else {
        return [costArr[0], costArr[1], unchangeblePrice];//price, price-link
      }
    }
  }, {
    key: "getPaymentText",
    value: function getPaymentText(_ref2) {
      var contractDate = _ref2.contractDate,
          gradeString = _ref2.gradeString,
          paymentType = _ref2.paymentType,
          baseCourseType = _ref2.baseCourseType,
          withAdditionalCourse = _ref2.withAdditionalCourse,
          additionalCourseType = _ref2.additionalCourseType,
          withCurator = _ref2.withCurator,
          discount = parseInt(_ref2.discount),
          unchangeblePrice = false;
      var grade = parseInt(gradeString);
      var onCredit = paymentTypeMap[paymentType] === paymentTypeMap['В рассрочку'];
      var costAndLink = CostCalc.getCost({
        grade: grade,
        baseCourseType: courseTypeMap[baseCourseType],
        additionalCourseType: withAdditionalCourse && (courseTypeMap[additionalCourseType] || courseTypeMap['Стандарт']),
        withCurator: withCurator,
        onCredit: onCredit
      });
      var cost = costAndLink[0];
      if (discount) {
        cost = cost / 100 * (100 - discount);//Применяем скидку, если есть
      }
      if (costAndLink[2]) { //Если в массиве цен указан доп. элемент, цена не будет уменьшаться с каждым месяцем
       unchangeblePrice = true;
      }
      var payLink = costAndLink[1]
      var costText;
      var paymentText;
      var sum;

      if (onCredit) {
        var generated = CostCalc.generatePaymentText(contractDate, cost, unchangeblePrice, onCredit);
        sum = Math.round(generated.sum / 10) * 10;
        costText = CostCalc.getSumAsText(generated.sum);
        paymentText = generated.text;
      } else {
        var estimateCost = CostCalc.getPaymentsArr(contractDate, cost, unchangeblePrice, onCredit).reduce(function (acc, item) {
          return acc + item;
        }, 0);
        sum = Math.round(estimateCost / 10) * 10;
        costText = CostCalc.getSumAsText(estimateCost);
        paymentText = 'единовременно в полном объёме в течение 5 рабочих дней с даты заключения Договора;';
      }

      return {
        costText: costText,
        paymentText: paymentText,
        sum: sum,
        payLink: payLink
      };
    }
  }]);

  return CostCalc;
}();

module.exports = CostCalc;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

//  Первое значение стоимость при оплате за наличные, второе - ссылка на оплату, третье - в рассрочку, четвертое - ссылка на оплату за первый месяц
module.exports = {
  8: {
    offline: {
      simple: [20000, 'https://foxford.ru/products/5c681eb6fbd931e21a750113f9d579143322998a', 22500, 'https://foxford.ru/products/577a9310377051e35f9ca07d1f222b3da53b58cf', 'unchangeblePrice'],
      curator: [36000, 'https://foxford.ru/products/05786026b789a60307973517f4eb1405bafcd113', 40500, 'https://foxford.ru/products/8e10e47e0f48a0e27b3a469c0e3f54e6cf78431e'],
      additional: {
        offline: {
          simple: [28000, 'https://foxford.ru/products/552ae238e9e74e1b19660f6224d808b79b7f66fb', 31500, 'https://foxford.ru/products/631a4920745f5bd694f5b176f95eea3fc8f84f21'],
          curator: [44000, 'https://foxford.ru/products/dc9ba296a399bb806e18ae5d45aa9e22a33df7ba', 49500, 'https://foxford.ru/products/82744ae97bc52a2f62fac89b8a1411632db4a926']
        },
        online: {
          simple: [44000, 'https://foxford.ru/products/dc9ba296a399bb806e18ae5d45aa9e22a33df7ba', 49500, 'https://foxford.ru/products/82744ae97bc52a2f62fac89b8a1411632db4a926'],
          curator: [60000, 'https://foxford.ru/products/c5cfc1e53e7a8165691f3d37acb8e7ca6a83e458', 67500, 'https://foxford.ru/products/e2f6544b647d33bc5c908196f4ed156fbaa0ecb6']
        }
      }
    },
    online: {
      simple: [39200, 'https://foxford.ru/products/f280b5d594f5e523852693c497f3584b525d5924', 44100, 'https://foxford.ru/products/a120fa6d6c474c01c9d0570b72fe787ad2719366'],
      curator: [55200, 'https://foxford.ru/products/ee69d22baeeb39a8fdeb8bf7545699117477ba2c', 62100, 'https://foxford.ru/products/3fa6238fb5527566c9d06364a9f26e037aed88a0'],
      additional: {
        offline: {
          simple: [47200, 'https://foxford.ru/products/f7e20a94479c7a43f2822aa29cd098864daaa30d', 53100, 'https://foxford.ru/products/75f76a342a5ebb185071ab3564bbc3304e14945c'],
          curator: [63200, 'https://foxford.ru/products/3a9c92d6f621d55153ff50b77b66e156b09b2cc1', 71100, 'https://foxford.ru/products/87f13d490fe4d542e8e0653d771b8c43899bcfb8']
        },
        online: {
          simple: [63200, 'https://foxford.ru/products/3a9c92d6f621d55153ff50b77b66e156b09b2cc1', 71100, 'https://foxford.ru/products/87f13d490fe4d542e8e0653d771b8c43899bcfb8'],
          curator: [79200, 'https://foxford.ru/products/0538fbdcdccc4f5b436a3a39ce974f5792f80f27', 89100, 'https://foxford.ru/products/42be0295122c3a8f8cc1ff0c439b581a7278e18f']
        }
      }
    }
  },
  9: {
    offline: {
      simple: [41600, 'https://foxford.ru/products/3d2d58b62d407686acf98c7f6c2a3584a3c4aa8e', 46800, 'https://foxford.ru/products/edace3880645e85a55c540e263962fb5322f4d4c', 'unchangeblePrice'],
      curator: [57600, 'https://foxford.ru/products/3cfe51cbd4d9d0641d1f2269ec1b517c781168d6', 64800, 'https://foxford.ru/products/b631a1b8e3c5cee4cd4813386aff8984262a8ff2'],
      additional: {
        offline: {
          simple: [54400, 'https://foxford.ru/products/f04e2c51c185ad85185927c870e9e0ee1770aa4a', 61200, 'https://foxford.ru/products/201fd5eba306ed096193c1b843a98251f31af234'],
          curator: [70400, 'https://foxford.ru/products/6a2d639ea3fc442bcc04802fa949b09f3d9cb227', 79200, 'https://foxford.ru/products/53531bf7eec8bdd41974dcb14e81c17351a20e25']
        },
        online: {
          simple: [78400, 'https://foxford.ru/products/0b935d7be12a571091c4739fc94835fd383065df', 88200, 'https://foxford.ru/products/5b6beb4d5c1c15b7180f3aa06063c6dfa2d6dc4d'],
          curator: [94400, 'https://foxford.ru/products/b9745e479b71e85e817184d7fff5e3d777bf7349', 106200, 'https://foxford.ru/products/a039d7c4a0efc1c03098e3a1653232761bc55a00']
        }
      }
    },
    online: {
      simple: [79200, 'https://foxford.ru/products/0538fbdcdccc4f5b436a3a39ce974f5792f80f27', 89100, 'https://foxford.ru/products/42be0295122c3a8f8cc1ff0c439b581a7278e18f'],
      curator: [95200, 'https://foxford.ru/products/823bf02e7147e45f7d7d007352ead52b33ee4834', 107100, 'https://foxford.ru/products/97559b150dbadf81e10ee3f855bd3a4f9975a7c4'],
      additional: {
        offline: {
          simple: [92000, 'https://foxford.ru/products/8d9a56fbb87fa143a27444e06748535f1e838a89', 103500, 'https://foxford.ru/products/ac865653b71e0561da802ce9b3e9d4a47c178965'],
          curator: [108000, 'https://foxford.ru/products/5d66af36ae03c528dcb5d1e0a5274d0230eee416', 121500, 'https://foxford.ru/products/53d0e0422cb59473cc717c6171cb53202e1d2242']
        },
        online: {
          simple: [116000, 'https://foxford.ru/products/090a19bbe0b75707fec56b83d170d0f97c91857e', 130500, 'https://foxford.ru/products/677ec002f3fa3ff2bf25b69f14e1aaf13409cdfd'],
          curator: [132000, 'https://foxford.ru/products/656ed04961cb01d19a86bd9bbb7d7bb80d184178', 148500, 'https://foxford.ru/products/99e48d136d5807ff6fbcb4bcd8ee1b069a0061ac']
        }
      }
    }
  },
  10: {
    offline: {
      simple: [46400, 'https://foxford.ru/products/94a1b4f598e86e1120dcd554301d15b6612430e1', 52200, 'https://foxford.ru/products/21f087e0e1d00ac465f60cd08f17abcf1fdfe836', 'unchangeblePrice'],
      curator: [64200, 'https://foxford.ru/products/ce669f13ac4bb1d26fd9184cf9cecf40e6f3e42f', 70200, 'https://foxford.ru/products/7d700c593fe6a57eeb2128569760cc4fd3982317'],
      additional: {
        offline: {
          simple: [59200, 'https://foxford.ru/products/25824454a50339aa6147ccf4d79d1c43f404e311', 66600, 'https://foxford.ru/products/3e0c2023ec1741870f145bee8960762a3e3b1391'],
          curator: [75200, 'https://foxford.ru/products/cd3ffc4fa612f66f64200314c5858249c6c3253b', 84600, 'https://foxford.ru/products/e07ffb21f300cb46a5e041a7c0ca4fd5f8157f38']
        },
        online: {
          simple: [83200, 'https://foxford.ru/products/d3573af4a61963ff1180b9b67db6f20dfd221dd5', 93600, 'https://foxford.ru/products/fe3e1a5606537436b223929dadd3af7eef36bcb8'],
          curator: [99200, 'https://foxford.ru/products/d5bc86f068f399f8d1bff6ad643bb4d376b11151', 111600, 'https://foxford.ru/products/a645a36d4461f9110148c508eb776e6baff21eec']
        }
      }
    },
    online: {
      simple: [87200, 'https://foxford.ru/products/189b2377eee7b75398cd3d9f5c63484af7565d1c', 98100, 'https://foxford.ru/products/ee8f0a235dc65597c1500317426366e5f8956c64'],
      curator: [103200, 'https://foxford.ru/products/961645204a86a962854c6ed07cc8514b08fd84c4', 116100, 'https://foxford.ru/products/b031a8a397480c6fe3321c68e575a739b3e3e237'],
      additional: {
        offline: {
          simple: [100000, 'https://foxford.ru/products/c8654a63a83cfa890b9e9bd0066b1f708e6449f7', 112500, 'https://foxford.ru/products/8a343f723c57bfb42106bc76c3435bb00a93739d'],
          curator: [116000, 'https://foxford.ru/products/090a19bbe0b75707fec56b83d170d0f97c91857e', 130500, 'https://foxford.ru/products/677ec002f3fa3ff2bf25b69f14e1aaf13409cdfd']
        },
        online: {
          simple: [124000, 'https://foxford.ru/products/1267c28cfe421a1a0db56a190fccd98b3df6bcb7', 139500, 'https://foxford.ru/products/7174859be0259a4389376582fb9d02f21774354e'],
          curator: [140000, 'https://foxford.ru/products/2c4d08ca6e46a3eb932aeb13f1f1ea903fef3927', 157500, 'https://foxford.ru/products/0ed5b7a7d5f1ef3c16cb5105dbcd956ecee03401']
        }
      }
    }
  },
  11: {
    offline: {
      simple: [65600, 'https://foxford.ru/products/a79294d86eb3ba5ee5c4491868d6f412d4a412e5', 73800, 'https://foxford.ru/products/ce58b10057b1664e8da4ce4a44b810fc6a34a780', 'unchangeblePrice'],
      curator: [81600, 'https://foxford.ru/products/c6af81d7609118bbd5ed1908cced856f505c8f32', 91800, 'https://foxford.ru/products/6e6de4b30e967f617b239270419bb4edb3ed263b'],
      additional: {
        offline: {
          simple: [81600, 'https://foxford.ru/products/c6af81d7609118bbd5ed1908cced856f505c8f32', 91800, 'https://foxford.ru/products/6e6de4b30e967f617b239270419bb4edb3ed263b'],
          curator: [97600, 'https://foxford.ru/products/9c052869410e9f9b506677d33dc8d4327e537178', 109800, 'https://foxford.ru/products/f3fbe9e8dc06b5624dd161e7b996afd47a4260df']
        },
        online: {
          simple: [113600, 'https://foxford.ru/products/520edbfcde7e127ad8e68c67d2a1f1c76d1cadad', 127800, 'https://foxford.ru/products/1e9eefdef18105d3bbec5bba169cb3cb6e63374d'],
          curator: [129600, 'https://foxford.ru/products/e17b0f4de3f6fe3db63e6cedbd7f68783ac8dc9d', 145800, 'https://foxford.ru/products/4fe1c0cc0605a789da2cc7dc182021f352789cf8']
        }
      }
    },
    online: {
      simple: [119200, 'https://foxford.ru/products/4b7a1eb0305c0714765ee3ca225ab059380f5f08', 134100, 'https://foxford.ru/products/3da7b46f4c836ff40ac4fe3ce85ca71e21727462'],
      curator: [135200, 'https://foxford.ru/products/dccab4eaf73f1698a41498be3be3dda8c6eb3bc7', 152100, 'https://foxford.ru/products/c2f51aec60fd40a41072e5ea1d2868f3b8866c68'],
      additional: {
        offline: {
          simple: [135200, 'https://foxford.ru/products/dccab4eaf73f1698a41498be3be3dda8c6eb3bc7', 152100, 'https://foxford.ru/products/c2f51aec60fd40a41072e5ea1d2868f3b8866c68'],
          curator: [151200, 'https://foxford.ru/products/bb72563b6b5ccd091afd06cb99f43d4a459e6cf7', 170100, 'https://foxford.ru/products/e5e9fe9d2b1705e4626fff3fab36b3d9b42b5539']
        },
        online: {
          simple: [167200, 'https://foxford.ru/products/74cfa2dccba4089b41b30faf9e49bec69bf6dfde', 188100, 'https://foxford.ru/products/94ca2bd5d117dd4d26818120a63cd3fb920c5fe7'],
          curator: [183200, 'https://foxford.ru/products/741c1d05c4325c02eb2bb0944be8127f20a09c0f', 206100, 'https://foxford.ru/products/191530c94e14a1a912ec68fa2685d914ff24f60c']
        }
      }
    }
  }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var _require = __webpack_require__(0),
    months = _require.months,
    startLearningMonth = _require.startLearningMonth,
    lastPosibleMonth = _require.lastPosibleMonth;

function getMonthString(month) {
  var monthStringsWithSpaces = months.map(function (m) {
    return " ".concat(m, " ");
  });
  return monthStringsWithSpaces[month];
}

function transformDateToString(date, prikaz) {
  date = new Date(date);
  var month = date.getMonth();
  var monthString = getMonthString(month);
  var justDate = date.getDate();
  if (justDate < 10) justDate = "0" + justDate.toString();
  return (prikaz ?
    "«" + justDate.toString() + "»" + monthString.toString() + date.getFullYear().toString() + " г."
    : justDate.toString() + monthString.toString() + date.getFullYear().toString() + " года"
  )
}

function getStartLearningDate(date) {
  var curMonth = new Date(date).getMonth();

  if (curMonth >= startLearningMonth || curMonth <= lastPosibleMonth) {
    return date;
  }

  return new Date(new Date(date).getFullYear() + '-09-01');
}

var getAdditionalText = function getAdditionalText(type) {
  return "3) Общеобразовательный углубленный блок, в рамках которого Обучающемуся предоставляется доступ не более, чем к 5 (пяти) углубленным и/или олимпиадным Курсам по выбранному Заказчиком направлению. Курсы блока направлены на углубленное изучение отдельных тем и предполагают подготовку к олимпиадам, государственной итоговой аттестации. Для рекомендации Курсов в составе общеобразовательного углубленного блока Исполнитель проводит для Обучающегося онлайн-консультацию специалиста по профориентации.\n Уровень доступа к Курсам: «" + (type || 'Стандарт') + "»";
};

var getCuratorText = function getCuratorText(withCurator) {
  if (withCurator) {
    return "Программа реализуется с персональным сопровождением с участием Куратора.\n Куратор:\n - отвечает на вопросы Заказчика и/или Обучающегося, связанные с содержанием и процессом освоения Программы; использованием Онлайн-платформы. Куратор отвечает на вопросы ежедневно с 09:00 до 21:00 часов по московскому времени, если иной режим не согласован в отдельном порядке с Куратором;\n - один раз в неделю проводит онлайн-консультации с Обучающимся и Заказчиком в соответствии с согласованным графиком;\n - осуществляет мониторинг успеваемости Обучающегося и контроль за выполнением им домашних заданий;\n - один раз в неделю направляет Заказчику отчет об успеваемости Обучающегося по Программе.\n - на основе своего опыта консультирует Обучающегося по вопросам поступления в высшее учебное заведение.\n Исполнитель информирует Заказчика о способах взаимодействия с Куратором в порядке, установленном п. 9.1 Договора.\n В течение периода обучения Заказчик вправе не более трёх раз обратиться к Исполнителю для замены Куратора. В этом случае Исполнитель осуществляет подбор и замену Куратора в течение 7 (семи) календарных дней с момента получения от Заказчика обращения в порядке, установленном в  п. 9.1 Договора.";
  } else {
    return "Программа реализуется без персонального сопровождения Обучающегося.";
  }
};

module.exports = {
  transformDateToString: transformDateToString,
  getAdditionalText: getAdditionalText,
  getCuratorText: getCuratorText,
  getStartLearningDate: getStartLearningDate
};

//////Генерация приказа
function prikaz(folder, contractDate, studentFullName, countDogovor, ourRow) {
  var countPrikazSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Порядок для приказов'),
      sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    var source = DriveApp.getFileById('13cbrzGpyELuubSzKxQBVbcPNjGd3Z6Om5nvJ4yUFDQk');
    var files = folder.getFiles();
    
    while (files.hasNext()) {   
      var file = files.next();   
    if (file.getName().indexOf("Приказ о зачислении") != -1) {
      files.remove(file.getId()); //Удаляем старый  приказ из папки, если он есть
    }
    
    var newFile = source.makeCopy(source, folder);
    newFile.setName('Приказ о зачислении ' + studentFullName);
    var body = DocumentApp.openByUrl(newFile.getUrl()).getBody();
    var countLastRow = countPrikazSheet.getLastRow();
    var lastCountPrikaz = parseInt(countPrikazSheet.getRange("A" + countLastRow).getValue()); //Порядковый номер прошлого приказа
    var countPrikaz = lastCountPrikaz + 1;
    countPrikazSheet.getRange("A" + countLastRow + 1).setValue(countPrikaz);

    body.editAsText().replaceText("<<Дата заключения договора>>", transformDateToString(contractDate, true));
    body.editAsText().replaceText("<<Номер приказа>>", countPrikaz);
    body.editAsText().replaceText("<<ФИО обучающегося>>", studentFullName);
    body.editAsText().replaceText("<<Номер договора>>", "№ " + countDogovor + "−ЭФ/19-20");
    
    newFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.EDIT);
    sheet.getRange("AG" + (parseInt(ourRow) + 1)).setValue('Удали меня'); //Проставляем текст в активатор генерации, чтобы при каждом изменении не срабатывал генератор
  }
}
//////Генерация приказа
/***/ })
/******/ ])));