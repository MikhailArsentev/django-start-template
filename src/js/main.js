'use strict';

// временные скрипты для демонстрации анимации
$('[data-target="modal"], .modal__overlay, .modal__close').click(function(e){
    e.preventDefault();
    $('body').toggleClass('fixed');
    $('.modal__preview').toggleClass('open');
    $(this).find('.about-block-item__wrapper').addClass('hover');
    setTimeout(function () {
        $('.modal-loading').fadeToggle(100);
        $('.post-page').fadeToggle(300);
        $('.modal__close').fadeToggle(300);
    }, 700);
});
$('.modal__overlay, .modal__close').click(function(e){
    $('.about-block-item__wrapper').removeClass('hover');
});
console.log('js ok');


/*
import Module from '../widgets/module/index.js';
 
import your vue modules example

import Module from '../widgets/module';
const module = new Module('#module-widget');

*/

