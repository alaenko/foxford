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
       e.preventDefault();
     });
  }
 
  
  //Калькулятор
  const sumParams = {
    online: '0',
    curator: '1',
    iom: '0',
    class: '5'
  };
  var pay = '1';
  
  function getSum() {
    let params =  sumParams.online + sumParams.curator +  sumParams.iom + sumParams.class;
    switch(params) {
      case '0105':
      case '0106':
      case '0107':
      case '0108':
        return '9500';
      break
      
      case '0109':
        return '17600';
      break
      
      case '01010':
        return '19400';
      break
      
      case '01011':
        return '26600';
      break
      
      case '0005':
      case '0006':
      case '0007':
      case '0008':
        return '7500';
      break
      
      case '0009':
        return '15600';
      break
      
      case '00010':
        return '17400';
      break
      
      case '00011':
        return '24600';
      break
      
      case '0115':
      case '0116':
      case '0117':
      case '0118':
        return '12500';
      break
      
      case '0119':
        return '22400';
      break
      
      case '01110':
        return '24200';
      break
      
      case '01111':
        return '32600';
      break
      
      case '0015':
      case '0016':
      case '0017':
      case '0018':
        return '10500';
      break
      
      case '0019':
        return '20400';
      break
      
      case '00110':
        return '22200';
      break
      
      case '00111':
        return '30600';
      break
      
      case '1105':
      case '1106':
      case '1107':
      case '1108':
        return '11900';
      break
      
      case '1109':
        return '22300';
      break
      
      case '11010':
        return '24500';
      break
      
      case '11011':
        return '33300';
      break
      
      case '1005':
      case '1006':
      case '1007':
      case '1008':
        return '9900';
      break
      
      case '1009':
        return '20300';
      break
      
      case '10010':
        return '22500';
      break
      
      case '10011':
        return '31300';
      break
      
      case '1115':
      case '1116':
      case '1117':
      case '1118':
        return '16900';
      break
      
      case '1119':
        return '30100';
      break
      
      case '11110':
        return '32300';
      break
      
      case '11111':
        return '43300';
      break
      
      case '1015':
      case '1016':
      case '1017':
      case '1018':
        return '14900';
      break
      
      case '1019':
        return '28100';
      break
      
      case '10110':
        return '30300';
      break
      
      case '10111':
        return '41300';
      break
    }
  }
  function showSum() {
    if (pay === '1') {
      $('.price-number').text((parseInt(getSum()) * 3).toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
      $('#price-text').text('учебный год');
      $('#price-subtext').text('Стоимость обучения в этом учебном году при оплате в марте')//Это самый выгодный вариант покупки');
    } else {
      $('.price-number').text((parseInt(getSum()) * 3 / 2).toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 '));
      $('#price-text').text('месяц');
      $('#price-subtext').text('Стоимость одного месяца обучения при оплате в марте')//Оплатить за весь учебный год выгоднее');
    } 
  }
  
  $('#calc-class').change(function() {
    sumParams.class = $(this).val()
    showSum()
  });
  
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

  $('.checkbox-wrap input:checkbox').click(function() {
  let checkboxWrap = $(this).parent();
  removeRed();
    if (!$(this).is(':checked') ) {
      switch($(checkboxWrap).attr('id')) {
       case 'curator-checkbox-field':
        sumParams.curator = '0';
        changeCheckbox(checkboxWrap);
        $('.price-form-info-block').addClass('price-form-curator-info-block');
        $('.price-form-info-heading').text('Без куратора будет сложнее');
        $('.price-form-info-text').text('Куратор следит за успеваемостью и поддерживать учебную мотивацию ребёнка. Если не понравится, от куратора можно в любой момент отказаться.');
        break;

      case 'live-checkbox-field':
        sumParams.online = '0';
        changeCheckbox(checkboxWrap);
        changeCheckbox($('#video-checkbox-field'));
        $('#video-checkbox-field').find('input:checkbox').prop('checked', true);
        defaultText();
        break;

      case 'video-checkbox-field':
        sumParams.online = '1';
        changeCheckbox(checkboxWrap);
        changeCheckbox($('#live-checkbox-field'));
        $('#live-checkbox-field').find('input:checkbox').prop('checked', true);
        defaultText();
      }
    } else {
      switch($(checkboxWrap).attr('id')) {
        case 'curator-checkbox-field':
          sumParams.curator = '1';
          changeCheckbox(checkboxWrap);
          $('.price-form-info-heading').text('Куратор поможет в обучении');
          $('.price-form-info-text').text('Наставник будет отвечать на вопросы, присылать раз в неделю отчёт и поддерживать ребёнка.');
          break;
          
        case 'live-checkbox-field':
            sumParams.online = '1';
            changeCheckbox(checkboxWrap);
            changeCheckbox($('#video-checkbox-field'));
            $('#video-checkbox-field').find('input:checkbox').prop('checked', false);
            $('.price-form-info-heading').text('Живые онлайн-занятия');
            $('.price-form-info-text').text('Прямой эфир, чат с преподавателем и одноклассниками, опросы и другие интерактивы во время урока.');
            break;

        case 'video-checkbox-field':
            sumParams.online = '0';
            changeCheckbox(checkboxWrap);
            changeCheckbox($('#live-checkbox-field'));
            $('#live-checkbox-field').find('input:checkbox').prop('checked', false);
            $('.price-form-info-heading').text('Просмотр занятий в записи');
            $('.price-form-info-text').text('Видеозапись доступна в любое время, с любого устройства. Возможность перемотать или поставить на паузу.');
      }
    }
    showSum();
  });
  
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
  });
  
  
  //Замена текстов подсказки
  const changePriceInfo = function(val) {
    removeRed();
    switch(val) {
      case null:
        $('.price-form-info-heading').text('Тип программы обучения');
        $('.price-form-info-text').text('Базовая школьная программа, индивидуальная программа обучения');
        break
      case 'базовая':
        sumParams.iom = '0';
        $('.price-form-info-heading').text('Базовая школьная программа');
        $('.price-form-info-text').text('Все основные школьные предметы. Необходимый минимум для прохождения аттестаций.');
        break
      case 'индивидуальная':
        sumParams.iom = '1';
        $('.price-form-info-heading').text('Индивидуальная программа обучения');
        $('.price-form-info-text').text('Основные школьные предметы плюс углубленные и олимпиадные курсы по выбранному профилю.');
        break
    }
    showSum();
  }
  
  $('#course-type').focus(function() {
    changePriceInfo($(this).val() );
  })
  $('#course-type').change(function() {
    changePriceInfo($(this).val() );
  })
  $('.price-form-course-icon').click(function() {
    removeRed();
    $('.price-form-info-block').show();
    changePriceInfo($('#course-type').val());
  })
  $('.price-form-course-icon-red').click(function() {
    $('.price-form-info-block').show();
    $('.price-form-info-block').addClass('price-form-curator-info-block');
    $('.price-form-info-heading').text('Без куратора будет сложнее');
    $('.price-form-info-text').text('Настройте учебный процесс под потребности вашей семьи.');
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