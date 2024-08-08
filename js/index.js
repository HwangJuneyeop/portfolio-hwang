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


$(function () {

    var jbOffset = $('.intro').offset();

    $(window).scroll(function () {
        if ($(document).scrollTop() > jbOffset.top) {
            $('.git_link').addClass("on");
        }
        else if ($(document).scrollTop() < jbOffset.top) {
            $('.git_link').removeClass("on");
        }
    });


    gsap.utils.toArray(".main .content").forEach(function (section) {

        const main = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 90%",
                end: "top top",
                scrub: true,
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

        "(min-width: 767px)": function () {
            const leftMotion = gsap.timeline({})
            leftMotion.addLabel('label')
                .to('.loading_page strong', { xPercent: -35, delay: 1, duration: 0.1 }, 'label')
                .to('.loading_page .txt01', { opacity: 0, delay: 1 }, 'label')
                .to('.loading_page .txt02', { opacity: 0, delay: 2 }, 'label')
                .to('.loading_page .txt03', { opacity: 0, delay: 3 }, 'label')
                .to('.loading_page', { yPercent: -100, delay: 3.5, ease: Power4.easeIn }, 'label')
                .fromTo('.intro h1', {
                    xPercent: 100,
                    scale: 0,
                    opacity: 0
                }, {
                    xPercent: 0,
                    scale: 1,
                    opacity: 1,
                })
        },

        "(max-width: 767px)": function () {

            const leftMotion = gsap.timeline({})
            leftMotion.addLabel('label')
                .to('.loading_page strong', { delay: 1, duration: 0.1 }, 'label')
                .to('.loading_page .txt01', { opacity: 0, delay: 1 }, 'label')
                .to('.loading_page .txt02', { opacity: 0, delay: 2 }, 'label')
                .to('.loading_page .txt03', { opacity: 0, delay: 3 }, 'label')
                .to('.loading_page', { yPercent: -100, delay: 3.5, ease: Power4.easeIn }, 'label')
                .fromTo('.intro h1', {
                    xPercent: 100,
                    scale: 0,
                    opacity: 0
                }, {
                    xPercent: 0,
                    scale: 1,
                    opacity: 1,
                })
        },

        "all": function () {

        }

    });

})
$(document).ready(function () {
    $('.s_html').hover(
        function () {
            $('.balloon_html').show();
            $('.balloon_html').css('display', 'flex');
        },
        function () {
            $('.balloon_html').hide();
        }
    );

    $('.s_css').hover(
        function () {
            $('.balloon_css').show();
            $('.balloon_css').css('display', 'flex');
        },
        function () {
            $('.balloon_css').hide();
        }
    );

    $('.s_js').hover(
        function () {
            $('.balloon_js').show();
            $('.balloon_js').css('display', 'flex');
        },
        function () {
            $('.balloon_js').hide();
        }
    );

    $('.s_ph').hover(
        function () {
            $('.balloon_ph').show();
            $('.balloon_ph').css('display', 'flex');
        },
        function () {
            $('.balloon_ph').hide();
        }
    );

    $('.s_fig').hover(
        function () {
            $('.balloon_fig').show();
            $('.balloon_fig').css('display', 'flex');
        },
        function () {
            $('.balloon_fig').hide();
        }
    );

    $('.s_git').hover(
        function () {
            $('.balloon_git').show();
            $('.balloon_git').css('display', 'flex');
        },
        function () {
            $('.balloon_git').hide();
        }
    );
});

$(document).ready(function () {
    const $links = $('.pf_link a');
    const $details = $('.pf_detail');

    $links.each(function (index) {
        $(this).on('click', function () {
            $details.removeClass('on');
            $links.removeClass('on');

            $details.eq(index).addClass('on');
            $links.eq(index).addClass('on');
        });
    });
});



$(document).ready(function () {
    function setActiveLink(targetId) {
        $('.link a').removeClass('active');
        $('.link a[href="' + targetId + '"]').addClass('active');
    }

    $('a[href^="#"]').on('click', function (event) {
        var target = $(this.getAttribute('href'));
        if (target.length) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 1000, function () {

                setActiveLink(target.selector);
            });
        }
    });


    $(window).on('scroll', function () {
        var scrollPosition = $(window).scrollTop();

        $('section').each(function () {
            var sectionOffset = $(this).offset().top;
            var sectionHeight = $(this).outerHeight();
            var sectionId = $(this).attr('id');

            if (scrollPosition >= sectionOffset && scrollPosition < sectionOffset + sectionHeight) {
                setActiveLink('#' + sectionId);
            }
        });
    });
});
