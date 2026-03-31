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
            spaceBetween: 0,
            centeredSlides: false,
            loop: true,
            speed: 1200,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
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

        // --- Mouse Parallax Effect ---
        const skyScreen = document.querySelector('.screen-sky');
        if (skyScreen) {
            skyScreen.addEventListener('mousemove', (e) => {
                const { clientX, clientY } = e;
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2;
                const moveX = (clientX - centerX) / 40; 
                const moveY = (clientY - centerY) / 40;
                
                // Gently shift text wrapper
                gsap.to(".text-parallax-wrapper", {
                    x: moveX * 0.5,
                    y: moveY * 0.5,
                    duration: 1,
                    ease: "power2.out"
                });

                // Dramatically shift kite wrapper opposite of mouse (depth effect)
                gsap.to(".kite-parallax-wrapper", {
                    x: moveX * -2,
                    y: moveY * -2,
                    duration: 1,
                    ease: "power2.out"
                });
            });
        }

        // Hero Sky Sequence
        const tl = gsap.timeline();
        
        // Kite taking off dynamically from the bottom right
        tl.fromTo(".reveal-kite", 
            {x: 400, y: 400, rotationZ: 45, opacity: 0}, 
            {
                x: 0, y: 0, rotationZ: 0, opacity: 1, 
                duration: 3, 
                ease: "power2.out",
                onComplete: () => {
                    // Aggressive, dynamic drifting and pulling flight logic
                    gsap.to(".reveal-kite", {
                        y: "-=120",
                        x: "-=80",
                        rotationZ: -12,
                        scale: 1.05,
                        duration: 4.5,
                        yoyo: true,
                        repeat: -1,
                        ease: "sine.inOut"
                    });
                }
            }, 
            0
        )
        // Sweeping fly-in effect for the main text
        .fromTo(".screen-sky .main-headline", 
            {y: 150, z: -200, scale: 0.7, opacity: 0}, 
            {
                y: 0, 
                z: 0, 
                scale: 1,
                opacity: 1, 
                duration: 2, 
                ease: "power4.out",
                onComplete: () => {
                    // Flight drifting in the clouds continuous loop
                    gsap.to(".screen-sky .main-headline", {
                        y: -15,
                        x: 10,
                        rotationZ: 1, /* Slight aerodynamic tilt loop */
                        duration: 4,
                        ease: "sine.inOut",
                        yoyo: true,
                        repeat: -1
                    });
                }
            }, 
            "-=0.2"
        )
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

        // Dynamic Amenities Grid Initialization
        const gridContainer = document.getElementById('dynamic-amenities-grid');
        if (gridContainer) {
            const allAmenities = [
                { icon: 'fa-person-swimming', text: 'SWIMMING POOL' },
                { icon: 'fa-child-reaching', text: 'KIDS POOL' },
                { icon: 'fa-person-snowboarding', text: 'KIDS PLAY AREA' },
                { icon: 'fa-person-biking', text: 'CYCLING' },
                { icon: 'fa-dumbbell', text: 'GYM' },
                { icon: 'fa-table-tennis-paddle-ball', text: 'PICKLE BALL' },
                { icon: 'fa-person-walking', text: 'REFLEXOLOGY WALK WAY' },
                { icon: 'fa-person-running', text: 'JOGGING' },
                { icon: 'fa-spa', text: 'SPA/SAUNA/SALON' },
                { icon: 'fa-book-open', text: 'LIBRARY' },
                { icon: 'fa-bridge', text: 'SKY WALK' },
                { icon: 'fa-martini-glass', text: 'POOL PARTY AREA' },
                { icon: 'fa-gamepad', text: 'INDOOR GAMES' },
                { icon: 'fa-golf-ball-tee', text: 'MINI GOLF' },
                { icon: 'fa-microphone-lines', text: 'PERFOMANCE AREA' },
                { icon: 'fa-mug-hot', text: 'CAFE' },
                { icon: 'fa-users-rectangle', text: 'MULTI PURPOSE HALL' },
                { icon: 'fa-chalkboard-user', text: 'BOARD ROOM' },
                { icon: 'fa-laptop-code', text: 'WORK STATIONS' },
                { icon: 'fa-couch', text: 'LUXURY LOUNGE' },
                { icon: 'fa-bench-tree', text: 'OUTDOOR SITTING' },
                { icon: 'fa-hands-praying', text: 'PRAYER AREA' }
            ];

            // Setup tracking queues
            let activePool = [...allAmenities].slice(0, 12);
            let inactivePool = [...allAmenities].slice(12);

            // Construct 12 initial physical 3D elements dynamically
            activePool.forEach((item) => {
                gridContainer.insertAdjacentHTML('beforeend', `
                    <div class="amenity-item reveal-stagger-item">
                        <div class="amenity-inner">
                            <div class="amenity-front">
                                <i class="fa-solid ${item.icon}"></i>
                                <span>${item.text}</span>
                            </div>
                            <div class="amenity-back">
                                <i class="fa-solid fa-spinner"></i>
                                <span>LOADING</span>
                            </div>
                        </div>
                    </div>
                `);
            });

            // Engage 3D Swap physics engine every 2.5 seconds
            setInterval(() => {
                const randomSlotIndex = Math.floor(Math.random() * 12);
                const slotEl = gridContainer.children[randomSlotIndex];
                
                const inactiveIndex = Math.floor(Math.random() * inactivePool.length);
                const newItem = inactivePool[inactiveIndex];
                const oldItem = activePool[randomSlotIndex];
                
                // Swap in tracking matrices
                activePool[randomSlotIndex] = newItem; 
                inactivePool[inactiveIndex] = oldItem; 
                
                const inner = slotEl.querySelector('.amenity-inner');
                const isFlipped = slotEl.classList.contains('is-flipped');
                const targetFace = slotEl.querySelector(isFlipped ? '.amenity-front' : '.amenity-back');
                
                // Inject new payload behind the active face instantly before rotation
                targetFace.innerHTML = `<i class="fa-solid ${newItem.icon}"></i><span>${newItem.text}</span>`;
                
                gsap.to(inner, {
                    rotationY: isFlipped ? 0 : 180,
                    duration: 0.8,
                    ease: "back.out(1.2)"
                });
                
                slotEl.classList.toggle('is-flipped');
            }, 2500);
        }

        // Stagger Reveals (Amenities grid dynamic nodes mapping)
        const staggers = document.querySelectorAll('.reveal-stagger');
        staggers.forEach(grid => {
            const cards = Array.from(grid.children).filter(child => !child.classList.contains('hidden-spacer'));
            gsap.fromTo(cards, 
                { y: 30, opacity: 0, scale: 0.95 },
                {
                    y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.05,
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
