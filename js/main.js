document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------
    // 1. Loader & Initialization
    // ----------------------------------------------------
    const loader = document.querySelector('.loader-wrapper');
    if (loader) {
        setTimeout(() => {
            gsap.to(loader, {
                yPercent: -100,
                duration: 1,
                ease: "power4.inOut",
                onComplete: initAnimations
            });
        }, 2000); // 2 second mock load time
    } else {
        initAnimations();
    }

    // ----------------------------------------------------
    // 2. Navbar & Mobile Menu
    // ----------------------------------------------------
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    let lastScroll = window.scrollY;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        
        if (currentScroll > window.innerHeight * 0.8) {
            // If scrolling UP, show navbar
            if (currentScroll < lastScroll) {
                navbar.classList.add('scrolled');
            } else {
                // If scrolling DOWN, hide navbar
                navbar.classList.remove('scrolled');
            }
        } else {
            // In the first section, it remains hidden
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle hamburger icon animation
            const bars = menuToggle.querySelectorAll('.bar');
            if (navLinks.classList.contains('active')) {
                bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                bars[0].style.transform = 'rotate(0) translate(0)';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'rotate(0) translate(0)';
            }
        });
    }

    // Close mobile menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                menuToggle.click();
            }
        });
    });

    // ----------------------------------------------------
    // 3. Swiper Carousel (Interior Gallery)
    // ----------------------------------------------------
    if (document.querySelector('.gallery-slider')) {
        new Swiper('.gallery-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            centeredSlides: true,
            loop: true,
            speed: 800,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 1.5,
                },
                1024: {
                    slidesPerView: 2.5,
                }
            }
        });
    }

    // ----------------------------------------------------
    // 4. Form Submission Mock
    // ----------------------------------------------------
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = leadForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'SENDING...';
            btn.style.opacity = '0.7';
            
            setTimeout(() => {
                btn.innerText = 'ENQUIRY SUBMITTED!';
                btn.style.background = '#28a745';
                btn.style.color = '#fff';
                leadForm.reset();
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = '';
                    btn.style.opacity = '1';
                }, 3000);
            }, 1500);
        });
    }

    // ----------------------------------------------------
    // 5. GSAP Scroll Animations
    // ----------------------------------------------------
    function initAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        // Hero Sky Sequence
        const tl = gsap.timeline();
        // Since loader hides via yPercent, we animate hero content up
        tl.fromTo(".screen-sky .main-headline", {y: 40, opacity: 0}, {y: 0, opacity: 1, duration: 1, ease: "power3.out"}, "-=0.2")
          .fromTo(".scroll-explore", {opacity: 0}, {opacity: 1, duration: 1}, "-=0.5");

        // Parallax for Banner 1 Text
        gsap.to(".screen-sky .hero-content", {
            yPercent: 60,
            opacity: 0,
            ease: "none",
            scrollTrigger: {
                trigger: ".screen-sky",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        // Parallax for Banner 2 Text (Minimized to keep visually centered)
        gsap.fromTo(".screen-aerial .hero-content", 
            { yPercent: 10 },
            {
                yPercent: -10,
                ease: "none",
                scrollTrigger: {
                    trigger: ".screen-aerial",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            }
        );

        // Scale reveal logic if any
        const revealScales = gsap.utils.toArray('.reveal-scale');
        revealScales.forEach(elem => {
            gsap.fromTo(elem, 
                { scale: 0.9, opacity: 0 },
                {
                    scale: 1, opacity: 1, duration: 1.2, ease: "power2.out",
                    scrollTrigger: { trigger: elem, start: "top 85%" }
                }
            );
        });

        // Scroll Reveal Animations
        const revealUps = gsap.utils.toArray('.reveal-up');
        revealUps.forEach(elem => {
            gsap.fromTo(elem, 
                { y: 50, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 1,
                    scrollTrigger: { trigger: elem, start: "top 85%" }
                }
            );
        });

        // Side Reveals
        const revealSides = gsap.utils.toArray('.reveal-side');
        revealSides.forEach(elem => {
            gsap.fromTo(elem, 
                { x: -50, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 1.2, ease: "power2.out",
                    scrollTrigger: { trigger: elem, start: "top 85%" }
                }
            );
        });

        const revealSidesRight = gsap.utils.toArray('.reveal-side-right');
        revealSidesRight.forEach(elem => {
            gsap.fromTo(elem, 
                { x: 50, opacity: 0 },
                {
                    x: 0, opacity: 1, duration: 1.2, ease: "power2.out",
                    scrollTrigger: { trigger: elem, start: "top 85%" }
                }
            );
        });

        // Zoom reveals (Images/Maps)
        const revealZooms = gsap.utils.toArray('.reveal-zoom');
        revealZooms.forEach(elem => {
            gsap.fromTo(elem, 
                { scale: 0.9, opacity: 0 },
                {
                    scale: 1, opacity: 1, duration: 1.5, ease: "power2.out",
                    scrollTrigger: { trigger: elem, start: "top 90%" }
                }
            );
        });

        // Stagger Reveals (Amenities grid)
        const staggers = document.querySelectorAll('.reveal-stagger');
        staggers.forEach(grid => {
            const cards = grid.children;
            gsap.fromTo(cards, 
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1, duration: 0.8, stagger: 0.2,
                    scrollTrigger: { trigger: grid, start: "top 85%" }
                }
            );
        });

        // Parallax Effect for Vision Background
        gsap.to(".parallax-img", {
            yPercent: 20,
            ease: "none",
            scrollTrigger: {
                trigger: ".vision-section",
                start: "top bottom", 
                end: "bottom top",
                scrub: true
            }
        });

        // Lens Magnifier Effect mapping
        const mapContainer = document.getElementById('mapLensContainer');
        const mapImg = document.getElementById('masterMapImg');
        const lens = document.getElementById('magnifierLens');

        if (mapContainer && mapImg && lens) {
            const zoom = 2; // 2x Zoom level
            
            mapContainer.addEventListener('mousemove', function(e) {
                e.preventDefault();
                
                const rect = mapContainer.getBoundingClientRect();
                let x = e.clientX - rect.left;
                let y = e.clientY - rect.top;

                // Restrict variables to bounds
                if (x > mapImg.width) x = mapImg.width;
                if (x < 0) x = 0;
                if (y > mapImg.height) y = mapImg.height;
                if (y < 0) y = 0;

                lens.style.display = "block";
                lens.style.left = x + "px";
                lens.style.top = y + "px";

                lens.style.backgroundImage = `url('${mapImg.src}')`;
                lens.style.backgroundSize = (mapImg.width * zoom) + "px " + (mapImg.height * zoom) + "px";
                
                const rx = (x * zoom) - (lens.offsetWidth / 2);
                const ry = (y * zoom) - (lens.offsetHeight / 2);

                lens.style.backgroundPosition = `-${rx}px -${ry}px`;
            });

            mapContainer.addEventListener('mouseleave', function() {
                lens.style.display = "none";
            });
        }
    }
});
