    // Welcome screen
        const welcomeScreen = document.querySelector('.welcome-screen');
        const welcomeButton = document.querySelector('.welcome-button');
        
        welcomeButton.addEventListener('click', () => {
            welcomeScreen.style.opacity = 0;
            setTimeout(() => {
                welcomeScreen.style.display = 'none';
                document.body.style.overflow = 'auto';
            }, 500);
        });
               // Dark mode toggle
        const darkModeToggle = document.getElementById('darkModeToggle');
        let darkMode = localStorage.getItem('darkMode') === 'enabled';

        // Apply dark mode if previously enabled
        if (darkMode) {
            document.body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }

        // Toggle dark mode
        darkModeToggle.addEventListener('click', () => {
            darkMode = !darkMode;
            
            if (darkMode) {
                document.body.classList.add('dark-mode');
                darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('darkMode', 'enabled');
            } else {
                document.body.classList.remove('dark-mode');
                darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('darkMode', 'disabled');
            }
        });

        // Sidebar functionality
        const sidebar = document.querySelector('.sidebar');
        const sidebarToggle = document.querySelector('.sidebar-toggle');
        const closeBtn = document.querySelector('.close-btn');

        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.add('open');
            document.body.classList.add('sidebar-open');
        });

        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('open');
            document.body.classList.remove('sidebar-open');
        });

        // Handle sidebar navigation links
        document.querySelectorAll('.sidebar-menu a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const sectionId = e.target.closest('a').getAttribute('href').substring(1);
                sidebar.classList.remove('open');
                document.body.classList.remove('sidebar-open');
                mobileMenu.classList.remove('active');
                showSection(sectionId);
            });
        });

        // Mobile menu toggle
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');

        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
        });

        // Enhanced Content templates with more facts
        const contentTemplates = {
            'facts': `
                <div class="section-title animate">
                    <h2>Amazing Space Facts</h2>
                    <p>Discover mind-blowing facts about our universe</p>
                </div>
                
                <div class="fact-categories animate delay-1">
                    <button class="category-btn active" data-category="all">All Categories</button>
                    <button class="category-btn" data-category="solar-system">Solar System</button>
                    <button class="category-btn" data-category="galaxies">Galaxies</button>
                    <button class="category-btn" data-category="black-holes">Black Holes</button>
                    <button class="category-btn" data-category="exoplanets">Exoplanets</button>
                </div>
                
                <div class="facts-grid animate delay-2">
                    <!-- Solar System Facts -->
                    <div class="fact-card" data-category="solar-system">
                        <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5f52f9ac-fb35-404a-9fa3-856d43d8c705.png" alt="Illustration of our solar system showing planets orbiting the sun with asteroid belt in between">
                        <h3>Neptune's Diamond Rain</h3>
                        <p>Scientists believe that on Neptune and Uranus, the atmospheric conditions create diamonds that literally rain down on the planets. The extreme pressure separates carbon atoms which then form diamonds that sink to the core.</p>
                        <p class="fact-card-source">Source: NASA Planetary Science Division</p>
                    </div>
                    
                    <div class="fact-card" data-category="solar-system">
                        <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1abbd1ac-927a-4f01-a9ae-a952921e054c.png" alt="Olympus Mons volcano on Mars compared to Mount Everest on Earth">
                        <h3>Olympus Mons</h3>
                        <p>The largest volcano in our solar system is Olympus Mons on Mars. It's about 13.6 miles (22 km) high, which is nearly three times the height of Earth's Mount Everest (5.5 miles or 8.9 km).</p>
                        <p class="fact-card-source">Source: NASA Mars Exploration Program</p>
                    </div>
                    
                    <div class="fact-card" data-category="solar-system">
                        <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1c8d9930-7237-4762-94ca-415de1337cee.png" alt="Colorful bands of Jupiter's atmosphere with the Great Red Spot visible">
                        <h3>Jupiter's Great Storm</h3>
                        <p>Jupiter's Great Red Spot has been raging for at least 400 years. This massive storm is larger than Earth (10,000 miles wide) with winds reaching speeds of up to 432 km/h (268 mph).</p>
                        <p class="fact-card-source">Source: NASA/JPL</p>
                    </div>
                    
                    <!-- Galaxy Facts -->
                    <div class="fact-card" data-category="galaxies">
                        <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fc3e216f-c789-4e77-a101-2f1a0a8a8e5b.png" alt="Hubble Deep Field image showing thousands of galaxies in a tiny patch of sky">
                        <h3>Countless Galaxies</h3>
                        <p>The observable universe contains between 100 billion to 200 billion galaxies. Each galaxy contains millions, billions or even trillions of stars. Our Milky Way galaxy alone has 100-400 billion stars.</p>
                        <p class="fact-card-source">Source: Hubble Space Telescope</p>
                    </div>
                    
                    <div class="fact-card" data-category="galaxies">
                        <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/b6a51b47-b697-4ec8-8bf5-cd7e0baa94f0.png" alt="Illustration of Andromeda Galaxy colliding with Milky Way">
                        <h3>Galactic Collision Coming</h3>
                        <p>The Andromeda Galaxy is heading toward our Milky Way at about 110 km per second (68 miles/sec). In about 4.5 billion years, they will collide and eventually form one giant elliptical galaxy.</p>
                        <p class="fact-card-source">Source: NASA Space Telescope Science Institute</p>
                    </div>
                    
                    <!-- Black Hole Facts -->
                    <div class="fact-card" data-category="black-holes">
                        <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/df66ab9c-f0c9-4100-b8a0-dd022533c222.png" alt="Artist's concept of a supermassive black hole with accretion disk">
                        <h3>Supermassive Black Hole</h3>
                        <p>At the center of our Milky Way galaxy lies Sagittarius A*, a supermassive black hole about 4 million times the mass of our Sun. Despite its size, it's only about 44 million km in diameter.</p>
                        <p class="fact-card-source">Source: Event Horizon Telescope Collaboration</p>
                    </div>
                    
                    <div class="fact-card" data-category="black-holes">
                        <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/bd337082-abba-47b7-9bd1-33ac7c119196.png" alt="Visualization of time dilation near a black hole">
                        <h3>Time Dilation</h3>
                        <p>Time moves slower near a black hole due to extreme gravity. If you spent one hour near a black hole, decades or even centuries could pass elsewhere in the universe.</p>
                        <p class="fact-card-source">Source: Einstein's General Relativity</p>
                    </div>
                    
                    <!-- Exoplanet Facts -->
                    <div class="fact-card" data-category="exoplanets">
                        <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2c317c8f-6e59-4601-8872-3409b00312a2.png" alt="Artist's impression of Kepler-186f, the first Earth-sized exoplanet discovered">
                        <h3>Earth-like Worlds</h3>
                        <p>As of 2023, astronomers have discovered over 5,000 exoplanets, with many in the habitable zone where liquid water could exist. Kepler-186f was the first Earth-sized planet found in the habitable zone of another star.</p>
                        <p class="fact-card-source">Source: NASA Exoplanet Archive</p>
                    </div>
                    
                    <div class="fact-card" data-category="exoplanets">
                        <img src="https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/2d025858-7e14-4247-a50c-5947f4ffe7c2.png" alt="Illustration of a diamond planet orbiting a dense star">
                        <h3>The Diamond Planet</h3>
                        <p>55 Cancri e is an exoplanet believed to be composed largely of diamond. About twice Earth's size and eight times more massive, it orbits its star every 18 hours and has surface temperatures around 2,700°C.</p>
                        <p class="fact-card-source">Source: Yale University Research</p>
                    </div>
                </div>
            `,
            'quizzes': `
                <div class="section-title animate">
                    <h2>Space Quizzes</h2>
                    <p>Test your space knowledge with these fun quizzes</p>
                </div>
                <div class="features">
                    <div class="feature-card animate delay-1">
                        <div class="feature-icon">❓</div>
                        <h3>Solar System Quiz</h3>
                        <p>How well do you know our cosmic neighborhood? Take this quiz to find out!</p>
                        <button class="btn btn-primary" style="margin-top:1rem">Start Quiz</button>
                    </div>
                    <div class="feature-card animate delay-2">
                        <div class="feature-icon">🌌</div>
                        <h3>Galaxy Challenge</h3>
                        <p>Prove your knowledge of galaxies, nebulae, and cosmic phenomena!</p>
                        <button class="btn btn-primary" style="margin-top:1rem">Start Quiz</button>
                    </div>
                </div>
            `,
            'games': `
                <div class="section-title animate">
                    <h2>Space Games</h2>
                    <p>Interactive games to explore the cosmos</p>
                </div>
                <div class="features">
                    <div class="feature-card animate delay-1">
                        <div class="feature-icon">🚀</div>
                        <h3>Planet Explorer</h3>
                        <p>Fly through our solar system and discover interesting facts about each planet.</p>
  <button onclick="document.location='index;.html'" class="btn btn-primary" style="margin-top:1rem">Play Game</button>
                    </div>
                    <div class="feature-card animate delay-2">
                        <div class="feature-icon">⭐</div>
                        <h3>Constellation Hunter</h3>
                        <p>Destroy the enemies using you spaceship</p>

<button onclick="document.location='index_huntergame.html'" class="btn btn-primary" style="margin-top:1rem">Play Game</button>
                        
                    </div>

                </div>
            `,
            'missions': `
     <div class="section-title animate">
        <h2>Famous Space Missions</h2>
        <p>Explore humanity's greatest journeys beyond Earth</p>
    </div>
    <div class="testimonial-cards">
        <div class="testimonial-card animate delay-1">
            <div class="testimonial-header">
 
                <div class="testimonial-name">
                    <h4>Apollo 11</h4>
                    <p>First Moon Landing: 1969</p>
                </div>
            </div>
            <p>"The first crewed mission to land on the Moon. Neil Armstrong and Buzz Aldrin became the first humans to walk on the lunar surface while Michael Collins remained in orbit."</p>
            <p class="fact-card-source">Key Achievement: 382 kg of lunar material collected</p>
        </div>
        <div class="testimonial-card animate delay-2">
            <div class="testimonial-header">
                
                <div class="testimonial-name">
                    <h4>Voyager Program</h4>
                    <p>Interstellar Mission: 1977</p>
                </div>
            </div>
            <p>"Twin spacecraft that explored the outer planets and are now in interstellar space. Voyager 1 is the most distant human-made object from Earth."</p>
            <p class="fact-card-source">Current Distance: ~24 billion km from Earth</p>
        </div>
        <div class="testimonial-card animate delay-3">
            <div class="testimonial-header">
  
                <div class="testimonial-name">
                    <h4>Mars Science Laboratory</h4>
                    <p>Curiosity Rover: 2012</p>
                </div>
            </div>
            <p>"The largest rover sent to Mars. Has discovered evidence of past water activity and organic molecules, revolutionizing our understanding of Mars' habitability."</p>
            <p class="fact-card-source">Key Finding: Ancient freshwater lake detected</p>
        </div>
        <div class="testimonial-card animate delay-1">
            <div class="testimonial-header">
 
                <div class="testimonial-name">
                    <h4>Hubble Space Telescope</h4>
                    <p>Orbital Observatory: 1990</p>
                </div>
            </div>
            <p>"One of the most productive scientific instruments ever built. Hubble's observations have led to breakthroughs in astrophysics and produced iconic images of the cosmos."</p>
            <p class="fact-card-source">Key Contribution: Accelerating universe discovery</p>
        </div>
        <div class="testimonial-card animate delay-2">
            <div class="testimonial-header">

                <div class="testimonial-name">
                    <h4>ISS</h4>
                    <p>International Space Station: 1998</p>
                </div>
            </div>
            <p>"The largest human-made body in low Earth orbit. A joint project between five space agencies representing 15 countries for scientific research in microgravity."</p>
            <p class="fact-card-source">Fact: Orbits Earth every 90 minutes</p>
        </div>
        <div class="testimonial-card animate delay-3">
            <div class="testimonial-header">
 
                <div class="testimonial-name">
                    <h4>Cassini-Huygens</h4>
                    <p>Saturn Mission: 1997-2017</p>
                </div>
            </div>
            <p>"The first spacecraft to orbit Saturn, studying the planet, its rings, and moons. The Huygens probe made the first landing on Titan, Saturns largest moon."</p>
            <p class="fact-card-source">Discovery: Enceladus' subsurface ocean</p>
        </div>
        <div class="testimonial-card animate delay-1">
            <div class="testimonial-header">

                <div class="testimonial-name">
                    <h4>New Horizons</h4>
                    <p>Pluto Flyby: 2015</p>
                </div>
            </div>
            <p>"The first spacecraft to explore Pluto, revealing its complex geology and atmosphere. Later flew by Arrokoth, providing insights about solar system formation."</p>
            <p class="fact-card-source">Key Finding: Pluto's nitrogen ice plains</p>
        </div>
        <div class="testimonial-card animate delay-2">
            <div class="testimonial-header">
 
                <div class="testimonial-name">
                    <h4>Parker Solar Probe</h4>
                    <p>Solar Mission: 2018</p>
                </div>
            </div>
            <p>"The first spacecraft to fly through the Sun's corona, studying solar wind and coronal heating. Holds records for fastest human-made object and closest approach to the Sun."</p>
            <p class="fact-card-source">Achievement: Withstands 1,370°C temperatures</p>
        </div>
    </div>
            `,
            'spacebooks': `
     <div class="section-title animate">
        <h2>Famous Space Books</h2>
        <p>Explore humanity's greatest journeys beyond Earth</p>
    </div>
    <div class="testimonial-cards">
        <div class="testimonial-card animate delay-1">
            <div class="testimonial-header">
 
                <div class="testimonial-name">
                    <h4>The Apollo of Aeronautics: NASA’s Aircraft Energy Efficiency Program, 1973-1987</h4>
                    <p></p>
                     <button onclick="document.location='601247main_ApolloAeronautics-ebook.pdf'" class="btn btn-primary" style="margin-top:1rem">Read Book</button>
                </div>
            </div>
            <p></p>

        </div>
        <div class="testimonial-card animate delay-2">
            <div class="testimonial-header">
                
                <div class="testimonial-name">
                    <h4>50 Years of Solar System Exploration</h4>
                     <button onclick="document.location='50-years-of-solar-system-exploration_tagged.pdf'" class="btn btn-primary" style="margin-top:1rem">Read Book</button>

                </div>
            </div>
            <p></p>

        </div>
        <div class="testimonial-card animate delay-3">
            <div class="testimonial-header">
  
                <div class="testimonial-name">
                    <h4>Governing the Moon</h4>
                      <button onclick="document.location='governing-the-moon-sp-2024-4559-ebook.pdf'" class="btn btn-primary" style="margin-top:1rem">Read Book</button>

                </div>
            </div>
    

        </div>
        <div class="testimonial-card animate delay-1">
            <div class="testimonial-header">
 
                <div class="testimonial-name">
                    <h4>Cosmos and Culture</h4>
                     <button onclick="document.location='sp-4802.pdf'" class="btn btn-primary" style="margin-top:1rem">Read Book</button>
                    <p></p>
                </div>
            </div>
        

        </div>
        <div class="testimonial-card animate delay-2">
            <div class="testimonial-header">

                <div class="testimonial-name">
                    <h4>ISRO - Genesis and Journey</h4>
                     <button onclick="document.location='01_ISRO_Genesis_and_Journey_Nagendra.pdf'" class="btn btn-primary" style="margin-top:1rem">Read Book</button>
<p></p>
                </div>
            </div>
           

        </div>
        <div class="testimonial-card animate delay-3">
            <div class="testimonial-header">
 
                <div class="testimonial-name">
                    <h4>Dr. Vikram Sarabhai</h4>
                       <button onclick="document.location='03_Dr.Vikram Sarabhai_Priyanka.pdf'" class="btn btn-primary" style="margin-top:1rem">Read Book</button>
       <p></p>
                </div>
            </div>
           
      
            `
        };

        // Fact category filtering
        function filterFacts(category) {
            const factCards = document.querySelectorAll('.fact-card');
            const categoryBtns = document.querySelectorAll('.category-btn');
            
            // Update active button
            categoryBtns.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.category === category);
            });
            
            // Filter facts
            factCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // Handle navigation and content loading
        function showSection(sectionId) {
            const contentContainer = document.getElementById('content-container');
            
            // Hide all sections
            document.querySelectorAll('section').forEach(section => {
                section.style.display = 'none';
            });
            
            // Show home section if needed
            if (sectionId === 'home') {
                contentContainer.innerHTML = '';
                document.getElementById('home').style.display = 'flex';
                return;
            }
            
            // Show specific section
            if (contentTemplates[sectionId]) {
                contentContainer.innerHTML = contentTemplates[sectionId];
                contentContainer.classList.add('active');
                
                // Scroll to the content
                window.scrollTo({
                    top: contentContainer.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Animate new elements
                const animateElements = contentContainer.querySelectorAll('.animate');
                animateElements.forEach(element => {
                    element.style.opacity = 0;
                    element.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        element.style.opacity = 1;
                        element.style.transform = 'translateY(0)';
                    }, 100);
                });
                
                // Set up fact category filtering if on facts page
                if (sectionId === 'facts') {
                    document.querySelectorAll('.category-btn').forEach(btn => {
                        btn.addEventListener('click', () => filterFacts(btn.dataset.category));
                    });
                }
            }
        }

        // Set up navigation
        document.querySelectorAll('.nav-links a, .mobile-menu a, .hero-buttons a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const sectionId = this.getAttribute('href').substring(1);
                mobileMenu.classList.remove('active');
                showSection(sectionId);
            });
        });

        // Show home page by default
        showSection('home');

        // Form submission
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                alert('Thank you for your message! We will get back to you soon.');
                this.reset();
            });
        }

        // Scroll animations for contact form
        const animateElements = document.querySelectorAll('.animate');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });

        animateElements.forEach(element => {
            element.style.opacity = 0;
            element.style.transform = 'translateY(20px)';
            observer.observe(element);
        });

        // Dynamic hero background
        const spaceImages = [
            'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/53f3d1a8-2d75-44c8-afbb-29b1ae792e31.png',
            'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/60aa0853-d55b-44c8-8b73-1228f25a54f5.png',
            'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d412ad1e-1d33-4846-b206-058e4f6f91fa.png'
        ];
        let currentBg = 0;
        
        function changeHeroBg() {
            const hero = document.querySelector('.hero');
            hero.style.backgroundImage = `url(${spaceImages[currentBg]})`;
            currentBg = (currentBg + 1) % spaceImages.length;
        }
        
        // Change background every 10 seconds
        setInterval(changeHeroBg, 10000);

        // Change navbar background on scroll
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
                if (window.scrollY > 50) {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            } else {
                navbar.style.backgroundColor = 'white';
            }
        });
       // Previous JavaScript remains unchanged
        // ...

        // Enhanced quiz questions
        const solarSystemQuizQuestions = [
           
            {
                question: "What is the hottest planet in our solar system?",
                options: ["Mercury", "Venus", "Earth", "Mars"],
                correctAnswer: 1,
                explanation: "Venus is hotter than Mercury due to its thick atmosphere trapping heat."
            },
            {
                question: "Which planet has the most moons?",
                options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
                correctAnswer: 1,
                explanation: "Saturn currently has over 140 confirmed moons."
            },
            {
                question: "What is Mars' largest volcano called?",
                options: ["Mount Everest", "Olympus Mons", "Mauna Kea", "Elysium Mons"],
                correctAnswer: 1
            },
            {
                question: "Which planet has the fastest winds in the solar system?",
                options: ["Jupiter", "Saturn", "Neptune", "Uranus"],
                correctAnswer: 2,
                explanation: "Neptune's winds can reach speeds of up to 1,200 mph (2,000 km/h)."
            },
            {
                question: "What is the age of our solar system?",
                options: ["4.6 million years", "56 million years", "2.1 billion years", "4.6 billion years"],
                correctAnswer: 3
            },
            {
                question: "Which planet has the shortest year?",
                options: ["Mercury", "Venus", "Mars", "Jupiter"],
                correctAnswer: 0
            },
            {
                question: "What percentage of the solar system's mass is contained in the Sun?",
                options: ["25%", "50%", "75%", "99.8%"],
                correctAnswer: 3
            },
            {
                question: "Which planet has a hexagonal storm at its north pole?",
                options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
                correctAnswer: 1
            },
            {
                question: "What is the name of Jupiter's largest moon?",
                options: ["Io", "Europa", "Ganymede", "Callisto"],
                correctAnswer: 2,
                explanation: "Ganymede is larger than the planet Mercury."
            },
            {
                question: "Which planet has the most circular orbit?",
                options: ["Earth", "Mars", "Venus", "Neptune"],
                correctAnswer: 2
            }
        ];

        // Quiz functionality
        function initializeQuiz() {
            const quizModal = document.createElement('div');
            quizModal.className = 'quiz-modal';
            quizModal.innerHTML = `
                <div class="quiz-container">
                    <button class="quiz-close-btn"><i class="fas fa-times"></i></button>
                    
                    <div class="quiz-header">
                        <h2>Solar System Quiz</h2>
                        <p>Test your knowledge about our cosmic neighborhood!</p>
                    </div>
                    
                    <div class="quiz-progress">
                        <div class="quiz-progress-bar"></div>
                    </div>
                    
                    <div class="question-container">
                        <div class="question-text"></div>
                        <div class="options-container"></div>
                    </div>
                    
                    <div class="quiz-footer">
                        <div class="quiz-score"></div>
                        <button class="quiz-nav-btn next-btn" disabled>Next</button>
                    </div>
                    
                    <div class="quiz-results">
                        <h3>Quiz Completed!</h3>
                        <div class="quiz-score-circle">
                            <div class="quiz-score-text">0%</div>
                        </div>
                        <div class="quiz-feedback"></div>
                        <button class="quiz-restart">Restart Quiz</button>
                    </div>
                </div>
            `;
            
            document.body.appendChild(quizModal);
            
            return {
                modal: quizModal,
                questionText: quizModal.querySelector('.question-text'),
                optionsContainer: quizModal.querySelector('.options-container'),
                progressBar: quizModal.querySelector('.quiz-progress-bar'),
                scoreElement: quizModal.querySelector('.quiz-score'),
                nextBtn: quizModal.querySelector('.next-btn'),
                closeBtn: quizModal.querySelector('.quiz-close-btn'),
                resultsContainer: quizModal.querySelector('.quiz-results'),
                scoreText: quizModal.querySelector('.quiz-score-text'),
                feedbackText: quizModal.querySelector('.quiz-feedback'),
                restartBtn: quizModal.querySelector('.quiz-restart'),
                questionContainer: quizModal.querySelector('.question-container')
            };
        }

        let quiz;
        let currentQuestion = 0;
        let score = 0;
        let userAnswers = [];

        function startQuiz() {
            quiz = initializeQuiz();
            
            // Reset quiz state
            currentQuestion = 0;
            score = 0;
            userAnswers = [];
            
            // Show modal
            quiz.modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Setup event listeners
            quiz.closeBtn.addEventListener('click', closeQuiz);
            quiz.nextBtn.addEventListener('click', nextQuestion);
            quiz.restartBtn.addEventListener('click', startQuiz);
            
            // Load first question
            loadQuestion(currentQuestion);
        }

        function loadQuestion(index) {
            const question = solarSystemQuizQuestions[index];
            
            // Update progress
            quiz.progressBar.style.width = `${((index + 1) / solarSystemQuizQuestions.length) * 100}%`;
            
            // Set question text
            quiz.questionText.textContent = question.question;
            quiz.optionsContainer.innerHTML = '';
            
            // Create options
            question.options.forEach((option, i) => {
                const optionBtn = document.createElement('button');
                optionBtn.className = 'option-btn';
                optionBtn.textContent = option;
                optionBtn.dataset.index = i;
                optionBtn.addEventListener('click', selectAnswer);
                quiz.optionsContainer.appendChild(optionBtn);
            });
            
            // Update score display
            quiz.scoreElement.textContent = `Question ${index + 1}/${solarSystemQuizQuestions.length}`;
            
            // Disable next button until answer is selected
            quiz.nextBtn.disabled = true;
            
            // Change button text for last question
            quiz.nextBtn.textContent = index === solarSystemQuizQuestions.length - 1 ? 'Submit' : 'Next';
        }

        function selectAnswer(e) {
            const selectedBtn = e.target;
            const question = solarSystemQuizQuestions[currentQuestion];
            const selectedIndex = parseInt(selectedBtn.dataset.index);
            
            // Reset all options
            const allOptions = quiz.optionsContainer.querySelectorAll('.option-btn');
            allOptions.forEach(option => {
                option.classList.remove('selected');
            });
            
            // Mark selected option
            selectedBtn.classList.add('selected');
            
            // Store user answer
            userAnswers[currentQuestion] = selectedIndex;
            
            // Enable next button
            quiz.nextBtn.disabled = false;
        }

        function nextQuestion() {
            const question = solarSystemQuizQuestions[currentQuestion];
            const selectedOption = quiz.optionsContainer.querySelector('.option-btn.selected');
            
            if (!selectedOption) return;
            
            const selectedIndex = parseInt(selectedOption.dataset.index);
            
            // Check if answer is correct
            const isCorrect = selectedIndex === question.correctAnswer;
            if (isCorrect) {
                score++;
            }
            
            // Show feedback (correct/incorrect)
            const allOptions = quiz.optionsContainer.querySelectorAll('.option-btn');
            allOptions.forEach(option => {
                option.disabled = true;
                const optionIndex = parseInt(option.dataset.index);
                
                if (optionIndex === question.correctAnswer) {
                    option.classList.add('correct');
                } else if (optionIndex === selectedIndex && !isCorrect) {
                    option.classList.add('incorrect');
                }
            });
            
            // Move to next question or show results
            setTimeout(() => {
                if (currentQuestion < solarSystemQuizQuestions.length - 1) {
                    currentQuestion++;
                    loadQuestion(currentQuestion);
                } else {
                    showResults();
                }
            }, 1000);
        }

        function showResults() {
            // Calculate percentage score
            const percentage = Math.round((score / solarSystemQuizQuestions.length) * 100);
            
            // Update results
            quiz.scoreText.textContent = `${percentage}%`;
            
            // Provide feedback based on score
            let feedback;
            if (percentage >= 90) {
                feedback = "Astronomical Genius! You know our solar system like the back of your hand!";
            } else if (percentage >= 70) {
                feedback = "Great Job! You've got a solid grasp of solar system facts.";
            } else if (percentage >= 50) {
                feedback = "Good Effort! You know some things but could brush up on your planetary knowledge.";
            } else {
                feedback = "Better Luck Next Time! Consider exploring our space facts section to learn more.";
            }
            
            quiz.feedbackText.textContent = feedback;
            
            // Hide question container and show results
            quiz.questionText.parentElement.style.display = 'none';
            quiz.resultsContainer.style.display = 'block';
            quiz.nextBtn.style.display = 'none';
        }

        function closeQuiz() {
            quiz.modal.classList.remove('active');
            document.body.style.overflow = 'auto';
            
            // Remove modal from DOM
            setTimeout(() => {
                quiz.modal.remove();
            }, 300);
        }

        // Modify the existing quiz section to use this new quiz
        document.addEventListener('DOMContentLoaded', function() {
            // When solar system quiz button is clicked
            document.addEventListener('click', function(e) {
                if (e.target.closest('.btn-primary') && e.target.closest('.feature-card') && e.target.textContent.trim() === 'Start Quiz') {
                    startQuiz();
                }
            });
        });

        // Previous JavaScript continues below
        // ...
