$(document).ready(function() {
    // Initialize AOS (Animate On Scroll) library
    AOS.init({
        duration: 1000,
        once: true
    });

    // Initialize particles.js for background particle effect
    particlesJS.load('particles-js', './particles.json', function() { 
        console.log('particles.js loaded');
    });

    // Smooth scrolling for navigation links and buttons
    $('a.nav-link, a.btn').on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            var targetOffset = $(hash).offset().top - 20; // Adjust offset if needed

            $('html, body').animate({
                scrollTop: targetOffset
            }, 200); // Adjust duration for desired speed
        }
    });

    // Back-to-Top Button Functionality
    var backToTop = $('.back-to-top');
    backToTop.hide();

    $(window).on('scroll', function() {
        var scrollPos = $(document).scrollTop();
    
        // Show or hide the back-to-top button
        if (scrollPos > 500) {
            backToTop.fadeIn();
        } else {
            backToTop.fadeOut();
        }
    
        // Active Navigation State
        var navLinks = $('nav a.nav-link');
        var windowHeight = $(window).height();
        var docHeight = $(document).height();
    
        navLinks.each(function() {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
    
            if (refElement.length) {
                var refElementTop = refElement.offset().top - 150;
                var refElementBottom = refElementTop + refElement.outerHeight();
    
                if (scrollPos >= refElementTop && scrollPos < refElementBottom) {
                    navLinks.removeClass("active");
                    currLink.addClass("active");
                } else {
                    currLink.removeClass("active");
                }
            }
        });
    
        // Check if scrolled to bottom
        if (scrollPos + windowHeight >= docHeight - 50) {
            navLinks.removeClass("active");
            navLinks.last().addClass('active');
        }
    });
    

    // Click event for back-to-top button
    backToTop.on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({scrollTop: 0}, 600);
    });

    // Function to animate skill bars on scroll
    function animateSkillBars() {
        $('.skill-bar').each(function() {
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();

            if (bottom_of_window > bottom_of_object) {
                $(this).find('.skill-progress').css('width', $(this).data('progress') + '%');
            }
        });
    }

    // Trigger skill bar animation on scroll and on page load
    $(window).scroll(animateSkillBars);
    animateSkillBars();

    // Scroll-triggered animations for fade-in sections
    function checkFadeInSections() {
        $('.fade-in-section').each(function() {
            if (isElementInViewport(this)) {
                $(this).addClass('is-visible');
            }
        });
    }

    // Trigger fade-in animations on scroll and on page load
    $(window).scroll(checkFadeInSections);
    checkFadeInSections();

    // Helper function to check if an element is in the viewport
    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Add parallax effect to the hero section
    $(window).scroll(function() {
        var scrollPosition = $(this).scrollTop();
        $('.hero').css('background-position', 'center ' + (scrollPosition * 0.5) + 'px');
    });

    // Add a subtle hover effect to project cards
    $(".project-card").hover(
        function() {
            $(this).addClass('shadow-lg').css('transform', 'translateY(-5px)');
        },
        function() {
            $(this).removeClass('shadow-lg').css('transform', 'translateY(0)');
        }
    );

    // Tilt effect for project cards
    $('.project-card').tilt({
        maxTilt: 5,
        scale: 1.05,
        transition: true
    });

    // Animated counter for skills
    $('.skill-bar').each(function() {
        var $this = $(this);
        var progressValue = $this.data('progress');
        $({ Counter: 0 }).animate({ Counter: progressValue }, {
            duration: 2000,
            easing: 'swing',
            step: function() {
                $this.find('.skill-progress').css('width', this.Counter + '%');
                $this.find('.skill-percentage').text(Math.ceil(this.Counter) + '%');
            }
        });
    });

    // Email validation function
    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Form submission handler
    $('form').on('submit', function(e) {
        var emailInput = $(this).find('input[type="email"]');
        var email = emailInput.val();

        if (!isValidEmail(email)) {
            e.preventDefault(); // Prevent form submission
            emailInput.addClass('is-invalid');
        } else {
            emailInput.removeClass('is-invalid');
            // You can add your form submission code here
            alert('Thank you for your message!, I will get to you soon as possible');
        }
    });

    // Real-time email validation
    $('input[type="email"]').on('input', function() {
        var email = $(this).val();
        if (isValidEmail(email)) {
            $(this).removeClass('is-invalid');
        }
    });
});
