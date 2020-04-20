'use strict';

$( document ).ready(function() {
  //Видео
  $('.video-placeholder').click(function() {
    $(this).hide();
    let video = $(this).siblings('.w-embed-youtubevideo').find('iframe');
    let src = video.attr('src').replace('autoplay=0', 'autoplay=1');
    video.attr('src', src);
  });
  
  //Табы с шагами
  if (window.matchMedia('(max-width: 991px)').matches) {
     $('.steps-tab').click(function(e) {
       e.preventDefault()
     })
  }
 
  
  //Калькулятор
  let pay = '2'//Способ оплаты
  const today = new Date(),
        curMonth = today.getMonth()
  
  let monthes//Количество учебных месяцев
  if (curMonth > 7 && curMonth <= 11) {
    monthes = 17 - curMonth
  } else if (curMonth < 3) {
    monthes = 5 - curMonth 
  } else {
    monthes = 9
  }

  const sumParams = {
    online: false,
    iom: false,
    iomOnline: false,
    curator: false,
    classRuc: false,
    class: '5'
  }

  let prices = {
    basePrice: 26100,//Всегда сумма за весь год
    baseOnlinePrice: 2000,
    iomPrice: 18000,//Всегда сумма за весь год
    iomOnlinePrice: 2000,
    curatorPrice: 2500,
    classRucPrice: 1600
  }

  const showSum = function() {
    switch(sumParams.class) {
      case '1':
      case '2':
        prices.basePrice = 18900
        prices.baseOnlinePrice = 1400
        prices.iomOnlinePrice = 0
        break
      case '3':
      case '4':
        prices.basePrice = 29700
        prices.baseOnlinePrice = 2200
        prices.iomOnlinePrice = 0
        break
      case '5':
      case '6':
        prices.basePrice = 26100
        prices.baseOnlinePrice = 2000
        prices.iomOnlinePrice = 2000
        break
      case '7':
      case '8':
        prices.basePrice = 35100
        prices.baseOnlinePrice = 2000
        prices.iomOnlinePrice = 2000
        break
      case '9':
      case '10':
        prices.basePrice = 53100
        prices.baseOnlinePrice = 5000
        prices.iomOnlinePrice = 2000
        break
      case '11':
        prices.basePrice = 80100
        prices.baseOnlinePrice = 7000
        prices.iomOnlinePrice = 3000
    }

    let price,
        onlinePrice = sumParams.online ? prices.baseOnlinePrice : 0,
        iomPrice = sumParams.iom ? prices.iomPrice : 0,
        iomOnlinePrice = sumParams.iomOnline ? prices.iomOnlinePrice : 0,
        curatorPrice = sumParams.curator ? prices.curatorPrice : 0,
        classRucPrice = sumParams.classRuc ? prices.classRucPrice : 0
    
    const monthlyPrices = onlinePrice + iomOnlinePrice + curatorPrice + classRucPrice

    if (pay === '1') {
      price = prices.basePrice + iomPrice + monthlyPrices * monthes - monthlyPrices - (prices.basePrice/9) - (iomPrice/9)
      $('.price-number').text(price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
      $('#price-text').text('учебный год');
      $('#price-subtext').text('Это самый выгодный вариант покупки')
    } else {
      price = (prices.basePrice + iomPrice) / 9 + monthlyPrices
      $('.price-number').text(price.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
      $('#price-text').text('месяц');
      $('#price-subtext').text('Оплатить за весь учебный год выгоднее')
    }
  }
  
  $('#calc-class').change(function() {
    sumParams.class = $(this).val()
    showSum()
    switch($(this).val()) {
      case null:
        defaultText()
        break
      case '1':
      case '2':
        $('.price-form-info-heading').text('1-2 классы');
        $('.price-form-info-text').html("- Онлайн-занятия и записи занятий,<br>- Интерактивные задания и методические материалы на портале,<br>- Обратная связь с классным руководителем,<br>- Поддержка психолога.");
        break
    case '3':
    case '4':
        $('.price-form-info-heading').text('3-4 классы');
        $('.price-form-info-text').html("- Онлайн-занятия и записи занятий,<br>- Методические вебинары для родителей,<br>- Интерактивные задания и методические материалы на портале,<br>- Обратная связь с классным руководителем,<br>- Поддержка психолога.");
    }
  })
  
   //Кастомные чекбоксы 
  function removeRed() {
    $('.price-form-info-block').removeClass('price-form-curator-info-block');
  }
  function defaultText() {
    $('.price-form-info-heading').text('Выберите параметры обучения');
    $('.price-form-info-text').text('Настройте учебный процесс под потребности вашей семьи.');
  }
  function changeCheckbox(el) {
    $(el).find('.checkbox-point').toggleClass('check');
    $(el).find('.checkbox-grey').toggleClass('check');
  }

    //Выбор типа базовой
    $('#base').change(function() {
        removeRed();
        switch($(this).val()) {
          case null:
            defaultText()
            break
          case 'base':
            sumParams.online = false;
            $('.price-form-info-heading').text('Просмотр занятий в записи');
            $('.price-form-info-text').text('Видеозапись доступна в любое время, с любого устройства. Возможность перемотать или поставить на паузу.');
            break
          case 'online':
            sumParams.online = true;
            $('.price-form-info-heading').text('Живые онлайн-занятия');
            $('.price-form-info-text').text('Прямой эфир, чат с преподавателем и одноклассниками, опросы и другие интерактивы во время урока.');
            break
        }
        showSum()
    })

    //Выбор типа ИОМ
    $('#iom').change(function() {
        removeRed();
        switch($(this).val()) {
          case null:
          case 'no':
            sumParams.iom = false
            defaultText()
            break
          case 'base':
            sumParams.iomOnline = false
            sumParams.iom = true
            $('.price-form-info-heading').text('Просмотр занятий в записи');
            $('.price-form-info-text').text('Видеозапись доступна в любое время, с любого устройства. Возможность перемотать или поставить на паузу.');
            break
          case 'online':
            sumParams.iomOnline = true
            sumParams.iom = true
            $('.price-form-info-heading').text('Живые онлайн-занятия');
            $('.price-form-info-text').text('Прямой эфир, чат с преподавателем и одноклассниками, опросы и другие интерактивы во время урока.');
            break
        }
        showSum()
    })

    //Выбор сопровождения
    $('#escort').change(function() {
        removeRed();
        switch($(this).val()) {
            case 'no':
                sumParams.classRuc = false
                sumParams.curator = false
                $('.price-form-info-block').addClass('price-form-curator-info-block');
                $('.price-form-info-heading').text('Без сопровождения будет сложнее');
                $('.price-form-info-text').text('Наставник следит за успеваемостью и поддерживать учебную мотивацию ребёнка. Если не понравится, от сопровождения можно в любой момент отказаться.')
                break
            case 'curator':
              sumParams.classRuc = false
              sumParams.curator = true
              $('.price-form-info-heading').text('Персональный наставник');
              $('.price-form-info-text').text('Наставник будет отвечать на вопросы, присылать раз в неделю отчёт и поддерживать ребёнка.');
              break
            case 'classRuc':
              sumParams.classRuc = true
              sumParams.curator = false
              $('.price-form-info-heading').text('Классный руководитель');
              $('.price-form-info-text').text('Классный руководитель проводит онлайн встречи в минигруппах 2 раза в месяц по вопросам организации учебного процесса, мониторит общую успеваемость детей, отвечает на вопросы в общем чате.');
              break
        }
        showSum()
    })
  
  //Переключение кнопок оплаты
  $('.pay-btn').click(function() {
   $('.pay-btn').toggleClass('active-pay');
   removeRed();
   pay = $(this).attr('pay');
   if (pay === '1') {
    $('.price-form-info-heading').text('Оплата за год');
     $('.price-form-info-text').text('Оплата сразу за год избавит вас от хлопот с ежемесячными ссылками на оплату.');
   } else {
     $('.price-form-info-heading').text('Оплата по месяцам');
     $('.price-form-info-text').text('Платежи вносятся 28 числа каждого месяца.')//8 платежей. Вносятся 28 числа каждого месяца.');
    }
   showSum()
  })

  //Иконки на моб версии
  $('.price-form-course-icon').click(function() {
    removeRed()
    $('.price-form-info-block').show();
    defaultText()
  })
  
  //Слайдер
  if (window.matchMedia('(min-width: 992px)').matches) {
    $('.events-slider').css('min-height', $('.events-slide').height() );
    $('.events-slide:not(:first)').find('.slide-photo').hide();
    $('.events-slide:not(:first)').find('.slide-text').hide();
  }
  
  var nextPhoto = $('.events-slide').eq(1).find('.slide-photo').attr('src');
  var prevPhoto = $('.events-slide').eq(-1).find('.slide-photo').attr('src');
  $('.events-slider-next').css('background-image', 'linear-gradient(180deg, hsla(0, 0%, 100%, .7), hsla(0, 0%, 100%, .7)), url(' + nextPhoto + ')');
  $('.events-slider-prev').css('background-image', 'linear-gradient(180deg, hsla(0, 0%, 100%, .7), hsla(0, 0%, 100%, .7)), url(' + prevPhoto + ')');
  var slide = 0;
  var nextSl = 2;
  var prevSl = -1;
  
  //next
  $('.events-slider-next').click(function() {
    if (slide == $('.events-slide').length) {
      slide = 0;
    }
    nextSl = slide + 2;
    if (nextSl == $('.events-slide').length) {
      nextSl = 0;
    } else if (nextSl == $('.events-slide').length + 1) {
      nextSl = 1;
    }
    prevSl = slide;
    let nexPhoto = $('.events-slide').eq(nextSl).find('.slide-photo').attr('src');
    $(this).css('background-image', 'linear-gradient(180deg, hsla(0, 0%, 100%, .7), hsla(0, 0%, 100%, .7)), url(' + nexPhoto + ')');
    let prPhoto = $('.events-slide').eq(prevSl).find('.slide-photo').attr('src');
    $('.events-slider-prev').css('background-image', 'linear-gradient(180deg, hsla(0, 0%, 100%, .7), hsla(0, 0%, 100%, .7)), url(' + prPhoto + ')');
    slide++;
  });
  
  //prev
  $('.events-slider-prev').click(function() {
    if (Math.abs(slide) == $('.events-slide').length) {
      slide = 0;
    }
    prevSl = slide - 2;
    nextSl = slide;
    if (Math.abs(prevSl) > $('.events-slide').length) {
      prevSl = -1;
    }
    let nexPhoto = $('.events-slide').eq(nextSl).find('.slide-photo').attr('src');
    $('.events-slider-next').css('background-image', 'linear-gradient(180deg, hsla(0, 0%, 100%, .7), hsla(0, 0%, 100%, .7)), url(' + nexPhoto + ')');
    let prPhoto = $('.events-slide').eq(prevSl).find('.slide-photo').attr('src');
    $(this).css('background-image', 'linear-gradient(180deg, hsla(0, 0%, 100%, .7), hsla(0, 0%, 100%, .7)), url(' + prPhoto + ')');
    slide--;
  });
  
  });