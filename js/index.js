 /* gsap */
 gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

 let panels = gsap.utils.toArray(".panel"),
     observer = ScrollTrigger.normalizeScroll(true),
     scrollTween;


 document.addEventListener("touchstart", e => {
     if (scrollTween) {
         e.preventDefault();
         e.stopImmediatePropagation();
     }
 }, { capture: true, passive: false })

 function goToSection(i) {
     scrollTween = gsap.to(window, {
         scrollTo: { y: i * innerHeight, autoKill: false },
         onStart: () => {
             observer.disable();
             observer.enable();
         },
         duration: 1,
         onComplete: () => scrollTween = null,
         overwrite: true
     });
 }

 panels.forEach((panel, i) => {
     ScrollTrigger.create({
         trigger: panel,
         start: "top bottom",
         end: "+=199%",
         onToggle: self => self.isActive && !scrollTween && goToSection(i)
     });
 });

 ScrollTrigger.create({
     start: 0,
     end: "max",
     snap: 1 / (panels.length - 1)
 })

 
$(function(){

  var jbOffset = $( '.intro' ).offset();

  $( window ).scroll( function() {
      if ( $( document ).scrollTop() > jbOffset.top ) {
          $('.git_link').addClass("on");
      }
      else if( $( document ).scrollTop() < jbOffset.top ){
          $('.git_link').removeClass("on");
      }
  });


  gsap.utils.toArray(".main .content").forEach(function(section) {

      const main = gsap.timeline({
        scrollTrigger: {
        trigger: section,
        start: "top 90%",
        end: "top top",
        scrub:true,
        }
      });
      
      main.set(section, {
          opacity: 0
      })
      .to(section, {
          opacity: 1
      })

  });

  ScrollTrigger.matchMedia({
      
      "(min-width: 767px)": function() {
          const leftMotion = gsap.timeline({})
          leftMotion.addLabel('label')
          .to('.loading_page strong',{xPercent:-35,delay:1,duration:0.1},'label')
          .to('.loading_page .txt01',{opacity:0,delay:1},'label')
          .to('.loading_page .txt02',{opacity:0,delay:2},'label')
          .to('.loading_page .txt03',{opacity:0,delay:3},'label')
          .to('.loading_page',{yPercent:-100,delay:3.5,ease: Power4.easeIn},'label')
          .fromTo('.intro h1',{
              xPercent:100,
              scale:0,
              opacity:0
          },{
              xPercent:0,
              scale:1,
              opacity:1,
          })
      },
      
      "(max-width: 767px)": function() {

          const leftMotion = gsap.timeline({})
          leftMotion.addLabel('label')
          .to('.loading_page strong',{delay:1,duration:0.1},'label')
          .to('.loading_page .txt01',{opacity:0,delay:1},'label')
          .to('.loading_page .txt02',{opacity:0,delay:2},'label')
          .to('.loading_page .txt03',{opacity:0,delay:3},'label')
          .to('.loading_page',{yPercent:-100,delay:3.5,ease: Power4.easeIn},'label')
          .fromTo('.intro h1',{
              xPercent:100,
              scale:0,
              opacity:0
          },{
              xPercent:0,
              scale:1,
              opacity:1,
          })
      }, 
      
      "all": function() {
      
      }
    
  });

})

 $('.slider').slick({
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: $('.prevArrow'),
    nextArrow: $('.nextArrow'),
  });
  $('.slider').on('afterChange', function (event, slick, currentSlide) {
    if (currentSlide === 0) {
      $('.prevArrow').hide();
    } else {
      $('.prevArrow').show();
    }
    if (currentSlide === slick.slideCount - slick.options.slidesToShow) {
      $('.nextArrow').hide();
    } else {
      $('.nextArrow').show();
    }
  });
  $('.prevArrow').hide();


  $(document).ready(function() {
   
    $(window).scroll(function() {
       //현재 위치 값 구하기
        var scrollPosition = $(window).scrollTop();
    
        $(".panel").each(function() {
            var target = $(this);
            var targetTop = target.offset().top;
            var targetHeight = target.outerHeight();
            
            if (scrollPosition >= targetTop && scrollPosition < targetTop + targetHeight) {
             
                $(".menubar li").removeClass("on");
                $(".menubar li a[href='#" + target.attr('id') + "']").parent().addClass("on");
            }
        });
    });
});
