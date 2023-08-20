import Sidebar from "./modules/sidebar";
document.addEventListener("DOMContentLoaded", function () {
    const sidebarMenu = new Sidebar(
        '.header-menu__btn',
        '.sidebar-menu__overlay',
        '.sidebar-menu',
        '.sidebar-menu .sidebar-list__link'
    );
    sidebarMenu.init();
    $(".feedback-carousel").owlCarousel({
      nav: true,
      dots: false,
      navText: ["<svg width=\"12\" height=\"21\" viewBox=\"0 0 12 21\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
      "<path d=\"M10.291 19.4082L1.36092 10.3134L10.4557 1.38334\" stroke=\"#37393F\" stroke-width=\"1.50213\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n" +
      "</svg>\n","<svg width=\"11\" height=\"21\" viewBox=\"0 0 11 21\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n" +
      "<path d=\"M0.945312 1.35645L9.95812 10.3693L0.945313 19.3821\" stroke=\"#37393F\" stroke-width=\"1.50213\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n" +
      "</svg>\n"],
      responsive : {
         // breakpoint from 0 up
         0 : {
            items: 1,
            nav: false,
            autoWidth: true,
         },
         // breakpoint from 768 up
         767 : {
            items: 2,
            nav: true,
             margin:24,
         },
         // breakpoint from 1200 up
         1199 : {
            items: 3,
             margin:24,
         }
      }
   });

   $('[data-fancybox-thanks]').fancybox({
      touch : false,
   });

    $(document).ready(function($) {   
        $(document).on( "click", 'a[href^="#"]', function( e ) {    
            e.preventDefault();     
            let target = this.hash,         
                $target = $(target),
                headerOffset;
            if (window.innerWidth > 991) {
                headerOffset = 192;
            } else if (window.innerWidth <= 991) {
                headerOffset = 131.66;
            } else if (window.innerWidth <= 575) {
                headerOffset = 64.41;
            }
            $('html, body').stop().animate({ scrollTop: $target.offset().top - headerOffset}, 300);   
        }); 
    });
});