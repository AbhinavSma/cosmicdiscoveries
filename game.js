// Game Configuration
const config = {
    width: window.innerWidth,
    height: window.innerHeight,
    shipSpeed: 8,
    bulletSpeed: 15,
    enemySpeed: 3,
    powerupSpeed: 5,
    spawnRate: 60,
    levelThreshold: 1000,
    starCount: 500,
    nebulaCount: 3
};

// Game State
let state = {
    score: 0,
    level: 1,
    health: 100,
    gameOver: false,
    paused: false,
    powerups: {
        rapidFire: { active: false, duration: 0, maxDuration: 300 },
        shield: { active: false, duration: 0, maxDuration: 450 },
        tripleShot: { active: false, duration: 0, maxDuration: 400 },
        homingMissile: { active: false, duration: 0, maxDuration: 350 }
    },
    keys: {
        ArrowUp: false,
        ArrowDown: false,
        ArrowLeft: false,
        ArrowRight: false,
        Space: false
    }
};

// Initialize PixiJS Application
const app = new PIXI.Application({
    width: config.width,
    height: config.height,
    backgroundColor: 0x000000,
    view: document.getElementById('gameCanvas'),
    antialias: true,
    resolution: window.devicePixelRatio || 1,
    autoDensity: true
});

// Resize handling
window.addEventListener('resize', () => {
    config.width = window.innerWidth;
    config.height = window.innerHeight;
    app.renderer.resize(config.width, config.height);
    
    // Reposition player if game is running
    if (player.sprite) {
        player.sprite.x = config.width / 2;
        player.sprite.y = config.height - 100;
    }
});

// Game Objects
let player = {
    sprite: null,
    width: 60,
    height: 80,
    lastShot: 0,
    shotDelay: 15
};

let bullets = [];
let enemies = [];
let particles = [];
let powerups = [];
let stars = [];
let nebulas = [];
let explosions = [];

// UI Elements
const scoreElement = document.getElementById('score');
const levelElement = document.getElementById('level');
const healthElement = document.getElementById('health');
const powerupIndicator = document.getElementById('powerupIndicator');
const startScreen = document.getElementById('startScreen');
const gameOverScreen = document.getElementById('gameOverScreen');
const pauseScreen = document.getElementById('pauseScreen');
const finalScoreElement = document.getElementById('finalScore');
const finalLevelElement = document.getElementById('finalLevel');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');
const resumeButton = document.getElementById('resumeButton');

// Load Textures
const textures = {
    player: null,
    enemy: null,
    bullet: null,
    rapidFire: null,
    shield: null,
    tripleShot: null,
    homingMissile: null,
    explosion: null
};

async function loadTextures() {
    // Create textures programmatically
    textures.player = createShipTexture(0x4a00e0, 0x8e2de2);
    textures.enemy = createShipTexture(0xff0000, 0xff6666);
    textures.bullet = createBulletTexture(0x8e2de2, 0xffffff);
    textures.rapidFire = createPowerupTexture(0xff0000, 'R');
    textures.shield = createPowerupTexture(0x00aaff, 'S');
    textures.tripleShot = createPowerupTexture(0x00ff00, 'T');
    textures.homingMissile = createPowerupTexture(0xffcc00, 'H');
    textures.explosion = createExplosionTexture();
}

function createShipTexture(color1, color2) {
    const graphics = new PIXI.Graphics();
    
    // Ship body
    graphics.beginFill(color1);
    graphics.moveTo(30, 0);
    graphics.lineTo(60, 80);
    graphics.lineTo(0, 80);
    graphics.closePath();
    graphics.endFill();
    
    // Ship details
    graphics.beginFill(color2);
    graphics.drawRect(20, 20, 20, 20);
    graphics.endFill();
    
    return app.renderer.generateTexture(graphics);
}

function createBulletTexture(color1, color2) {
    const graphics = new PIXI.Graphics();
    
    // Bullet core
    graphics.beginFill(color1);
    graphics.drawRect(0, 0, 5, 15);
    graphics.endFill();
    
    // Bullet glow
    graphics.beginFill(color2, 0.5);
    graphics.drawRect(-2, -2, 9, 19);
    graphics.endFill();
    
    return app.renderer.generateTexture(graphics);
}

function createPowerupTexture(color, symbol) {
    const graphics = new PIXI.Graphics();
    const radius = 25;
    
    // Outer circle
    graphics.beginFill(color);
    graphics.drawCircle(radius, radius, radius);
    graphics.endFill();
    
    // Inner glow
    graphics.beginFill(0xffffff, 0.3);
    graphics.drawCircle(radius, radius, radius * 0.7);
    graphics.endFill();
    
    // Symbol
    const text = new PIXI.Text(symbol, {
        fontFamily: 'Orbitron',
        fontSize: 20,
        fill: 0xffffff,
        fontWeight: 'bold'
    });
    text.anchor.set(0.5);
    text.position.set(radius, radius);
    graphics.addChild(text);
    
    return app.renderer.generateTexture(graphics);
}

function createExplosionTexture() {
    const graphics = new PIXI.Graphics();
    const radius = 20;
    
    // Explosion core
    graphics.beginFill(0xff6600);
    graphics.drawCircle(radius, radius, radius);
    graphics.endFill();
    
    // Explosion rays
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        graphics.beginFill(0xffcc00);
        graphics.moveTo(radius, radius);
        graphics.lineTo(
            radius + Math.cos(angle) * radius * 1.5,
            radius + Math.sin(angle) * radius * 1.5
        );
        graphics.lineTo(
            radius + Math.cos(angle + 0.2) * radius * 1.5,
            radius + Math.sin(angle + 0.2) * radius * 1.5
        );
        graphics.closePath();
        graphics.endFill();
    }
    
    return app.renderer.generateTexture(graphics);
}

// Initialize Stars (Particle System)
function initStars() {
    const starContainer = new PIXI.ParticleContainer(config.starCount, {
        scale: true,
        position: true,
        rotation: true,
        uvs: true,
        alpha: true
    });
    app.stage.addChild(starContainer);
    
    for (let i = 0; i < config.starCount; i++) {
        const star = new PIXI.Sprite(PIXI.Texture.WHITE);
        star.tint = Math.random() * 0xffffff;
        star.alpha = Math.random() * 0.8 + 0.2;
        star.width = star.height = Math.random() * 3 + 1;
        star.x = Math.random() * config.width;
        star.y = Math.random() * config.height;
        star.speed = Math.random() * 5 + 1;
        starContainer.addChild(star);
        stars.push(star);
    }
}

// Initialize Nebulas (Background Effects)
function initNebulas() {
    for (let i = 0; i < config.nebulaCount; i++) {
        const nebula = new PIXI.Graphics();
        const size = Math.random() * 500 + 300;
        const x = Math.random() * config.width;
        const y = Math.random() * config.height;
        const color = Math.random() * 0x333333 + 0x222266;
        
        nebula.beginFill(color, 0.3);
        nebula.drawCircle(0, 0, size);
        nebula.endFill();
        nebula.position.set(x, y);
        nebula.blurRadius = 20;
        
        app.stage.addChildAt(nebula, 0);
        nebulas.push(nebula);
    }
}

// Initialize Player
function initPlayer() {
    player.sprite = new PIXI.Sprite(textures.player);
    player.sprite.anchor.set(0.5);
    player.sprite.position.set(config.width / 2, config.height - 100);
    player.sprite.scale.set(0.8);
    
    // Add engine glow
    const engineGlow = new PIXI.Graphics();
    engineGlow.beginFill(0x4a00e0, 0.5);
    engineGlow.drawRect(-15, 40, 30, 30);
    engineGlow.endFill();
    engineGlow.blurRadius = 10;
    player.sprite.addChild(engineGlow);
    
    app.stage.addChild(player.sprite);
}

// Event Listeners
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', restartGame);
resumeButton.addEventListener('click', () => {
    state.paused = false;
    pauseScreen.style.display = 'none';
});

document.addEventListener('keydown', (e) => {
    if (e.code in state.keys) {
        state.keys[e.code] = true;
    }
    
    if (e.code === 'KeyP' && !state.gameOver) {
        state.paused = !state.paused;
        pauseScreen.style.display = state.paused ? 'flex' : 'none';
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code in state.keys) {
        state.keys[e.code] = false;
    }
});

// Game Functions
async function startGame() {
    await loadTextures();
    
    startScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';
    state.gameOver = false;
    state.score = 0;
    state.level = 1;
    state.health = 100;
    
    // Clear previous game objects
    clearGameObjects();
    
    // Initialize game elements
    initStars();
    initNebulas();
    initPlayer();
    
    // Reset powerups
    for (let powerup in state.powerups) {
        state.powerups[powerup].active = false;
        state.powerups[powerup].duration = 0;
    }
    updatePowerupUI();
    
    // Start game loop
    app.ticker.add(gameLoop);
}

function restartGame() {
    gameOverScreen.style.display = 'none';
    startGame();
}

function clearGameObjects() {
    // Remove all game objects
    app.stage.removeChildren();
    bullets = [];
    enemies = [];
    particles = [];
    powerups = [];
    stars = [];
    nebulas = [];
    explosions = [];
    
    // Stop game loop if running
    app.ticker.remove(gameLoop);
}

function gameLoop(delta) {
    if (state.gameOver || state.paused) return;
    
    update(delta);
    render();
}

function update(delta) {
    // Update player position
    if (state.keys.ArrowUp && player.sprite.y > 50) player.sprite.y -= config.shipSpeed;
    if (state.keys.ArrowDown && player.sprite.y < config.height - 50) player.sprite.y += config.shipSpeed;
    if (state.keys.ArrowLeft && player.sprite.x > 50) player.sprite.x -= config.shipSpeed;
    if (state.keys.ArrowRight && player.sprite.x < config.width - 50) player.sprite.x += config.shipSpeed;
    
    // Shooting
    player.lastShot++;
    if (state.keys.Space && player.lastShot >= player.shotDelay) {
        shoot();
        player.lastShot = 0;
        
        if (state.powerups.rapidFire.active) {
            player.shotDelay = 5;
        } else {
            player.shotDelay = 15;
        }
    }
    
    // Update bullets
    for (let i = bullets.length - 1; i >= 0; i--) {
        bullets[i].y -= bullets[i].speed;
        
        // Remove bullets that are off screen
        if (bullets[i].y < -20) {
            app.stage.removeChild(bullets[i].sprite);
            bullets.splice(i, 1);
            continue;
        }
        
        // Update homing missiles
        if (bullets[i].homing) {
            const nearestEnemy = findNearestEnemy(bullets[i].x, bullets[i].y);
            if (nearestEnemy) {
                const dx = nearestEnemy.sprite.x - bullets[i].x;
                const dy = nearestEnemy.sprite.y - bullets[i].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance > 0) {
                    bullets[i].x += (dx / distance) * 5;
                    bullets[i].y += (dy / distance) * 5;
                }
            }
        }
        
        // Check for bullet-enemy collisions
        for (let j = enemies.length - 1; j >= 0; j--) {
            if (checkCollision(bullets[i], enemies[j])) {
                createExplosion(enemies[j].sprite.x, enemies[j].sprite.y, enemies[j].size / 10);
                
                // Remove enemy and bullet
                app.stage.removeChild(enemies[j].sprite);
                enemies.splice(j, 1);
                
                app.stage.removeChild(bullets[i].sprite);
                bullets.splice(i, 1);
                
                // Increase score
                state.score += 10 * state.level;
                
                // Random chance to spawn powerup
                if (Math.random() < 0.15) {
                    spawnPowerup(bullets[i].x, bullets[i].y);
                }
                
                break;
            }
        }
    }
    
    // Update enemies
    for (let i = enemies.length - 1; i >= 0; i--) {
        // AI: move toward player with some randomness
        const dx = player.sprite.x - enemies[i].sprite.x;
        const dy = player.sprite.y - enemies[i].sprite.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance > 0) {
            enemies[i].sprite.x += (dx / distance) * config.enemySpeed * (0.7 + Math.random() * 0.6);
            enemies[i].sprite.y += (dy / distance) * config.enemySpeed * (0.7 + Math.random() * 0.6);
        }
        
        // Rotate enemy toward player
        enemies[i].sprite.rotation = Math.atan2(dy, dx) + Math.PI/2;
        
        // Remove enemies that are off screen
        if (enemies[i].sprite.y > config.height + 100) {
            app.stage.removeChild(enemies[i].sprite);
            enemies.splice(i, 1);
            continue;
        }
        
        // Check for player-enemy collisions
        if (checkCollision(player, enemies[i])) {
            if (!state.powerups.shield.active) {
                state.health -= 10;
                if (state.health <= 0) {
                    gameOver();
                }
            }
            
            createExplosion(enemies[i].sprite.x, enemies[i].sprite.y, enemies[i].size / 10);
            app.stage.removeChild(enemies[i].sprite);
            enemies.splice(i, 1);
        }
    }
    
    // Spawn new enemies
    if (Math.random() < 0.02 + (state.level * 0.005)) {
        spawnEnemy();
    }
    
    // Update powerups
    for (let i = powerups.length - 1; i >= 0; i--) {
        powerups[i].sprite.y += config.powerupSpeed;
        
        // Remove powerups that are off screen
        if (powerups[i].sprite.y > config.height + 50) {
            app.stage.removeChild(powerups[i].sprite);
            powerups.splice(i, 1);
            continue;
        }
        
        // Check for player-powerup collisions
        if (checkCollision(player, powerups[i])) {
            activatePowerup(powerups[i].type);
            app.stage.removeChild(powerups[i].sprite);
            powerups.splice(i, 1);
        }
    }
    
    // Update active powerups
    for (let powerup in state.powerups) {
        if (state.powerups[powerup].active) {
            state.powerups[powerup].duration -= delta;
            if (state.powerups[powerup].duration <= 0) {
                state.powerups[powerup].active = false;
                updatePowerupUI();
            }
        }
    }
    
    // Update stars (background)
    for (let star of stars) {
        star.y += star.speed;
        if (star.y > config.height) {
            star.y = 0;
            star.x = Math.random() * config.width;
        }
    }
    
    // Update explosions
    for (let i = explosions.length - 1; i >= 0; i--) {
        explosions[i].time -= delta;
        explosions[i].sprite.scale.set(1 + (1 - explosions[i].time / explosions[i].maxTime) * 2);
        explosions[i].sprite.alpha = explosions[i].time / explosions[i].maxTime;
        
        if (explosions[i].time <= 0) {
            app.stage.removeChild(explosions[i].sprite);
            explosions.splice(i, 1);
        }
    }
    
    // Check for level up
    if (state.score >= state.level * config.levelThreshold) {
        state.level++;
        createLevelUpEffect();
    }
    
    // Update UI
    scoreElement.textContent = state.score;
    levelElement.textContent = state.level;
    healthElement.textContent = state.health;
}

function render() {
    // Position bullet sprites
    for (let bullet of bullets) {
        bullet.sprite.x = bullet.x;
        bullet.sprite.y = bullet.y;
    }
}

function shoot() {
    if (state.powerups.tripleShot.active) {
        // Triple shot
        createBullet(player.sprite.x - 20, player.sprite.y - 40);
        createBullet(player.sprite.x, player.sprite.y - 40);
        createBullet(player.sprite.x + 20, player.sprite.y - 40);
    } else if (state.powerups.homingMissile.active) {
        // Homing missile
        createBullet(player.sprite.x, player.sprite.y - 40, true);
    } else {
        // Single shot
        createBullet(player.sprite.x, player.sprite.y - 40);
    }
}

function createBullet(x, y, homing = false) {
    const bulletSprite = new PIXI.Sprite(textures.bullet);
    bulletSprite.anchor.set(0.5);
    bulletSprite.position.set(x, y);
    app.stage.addChild(bulletSprite);
    
    bullets.push({
        sprite: bulletSprite,
        x: x,
        y: y,
        width: 5,
        height: 15,
        speed: config.bulletSpeed,
        homing: homing
    });
}

function spawnEnemy() {
    const size = 30 + Math.random() * 30;
    const x = Math.random() * (config.width - size) + size/2;
    
    const enemySprite = new PIXI.Sprite(textures.enemy);
    enemySprite.anchor.set(0.5);
    enemySprite.position.set(x, -size);
    enemySprite.scale.set(size / 60);
    app.stage.addChild(enemySprite);
    
    // Add engine glow
    const engineGlow = new PIXI.Graphics();
    engineGlow.beginFill(0xff0000, 0.5);
    engineGlow.drawRect(-15, 40, 30, 30);
    engineGlow.endFill();
    engineGlow.blurRadius = 10;
    enemySprite.addChild(engineGlow);
    
    enemies.push({
        sprite: enemySprite,
        x: x,
        y: -size,
        width: size,
        height: size,
        size: size
    });
}

function spawnPowerup(x, y) {
    const types = ['rapidFire', 'shield', 'tripleShot', 'homingMissile'];
    const type = types[Math.floor(Math.random() * types.length)];
    
    const powerupSprite = new PIXI.Sprite(textures[type]);
    powerupSprite.anchor.set(0.5);
    powerupSprite.position.set(x, y);
    app.stage.addChild(powerupSprite);
    
    // Add glow effect
    const glow = new PIXI.filters.GlowFilter({
        distance: 15,
        outerStrength: 2,
        innerStrength: 1,
        color: 0xffffff,
        quality: 0.5
    });
    powerupSprite.filters = [glow];
    
    // Add pulsing animation
    powerupSprite.scale.set(0.8);
    const pulse = () => {
        powerupSprite.scale.x = 0.8 + Math.sin(Date.now() / 200) * 0.2;
        powerupSprite.scale.y = 0.8 + Math.sin(Date.now() / 200) * 0.2;
        requestAnimationFrame(pulse);
    };
    pulse();
    
    powerups.push({
        sprite: powerupSprite,
        x: x,
        y: y,
        width: 30,
        height: 30,
        type: type
    });
}

function activatePowerup(type) {
    state.powerups[type].active = true;
    state.powerups[type].duration = state.powerups[type].maxDuration;
    updatePowerupUI();
    
    // Visual feedback
    const feedback = new PIXI.Text(type.toUpperCase().replace('_', ' '), {
        fontFamily: 'Orbitron',
        fontSize: 24,
        fill: 0xffffff,
        fontWeight: 'bold',
        align: 'center'
    });
    feedback.anchor.set(0.5);
    feedback.position.set(config.width / 2, config.height / 2);
    feedback.alpha = 0;
    app.stage.addChild(feedback);
    
    // Animation
    const animate = () => {
        feedback.y -= 1;
        feedback.alpha += 0.02;
        if (feedback.alpha < 1) {
            requestAnimationFrame(animate);
        } else {
            const fadeOut = () => {
                feedback.alpha -= 0.02;
                if (feedback.alpha > 0) {
                    requestAnimationFrame(fadeOut);
                } else {
                    app.stage.removeChild(feedback);
                }
            };
            fadeOut();
        }
    };
    animate();
}

function updatePowerupUI() {
    powerupIndicator.innerHTML = '';
    
    for (let powerup in state.powerups) {
        if (state.powerups[powerup].active) {
            const icon = document.createElement('div');
            icon.className = 'powerup-icon';
            
            let bgColor, text;
            switch (powerup) {
                case 'rapidFire':
                    bgColor = 'linear-gradient(135deg, #ff0000, #ff6666)';
                    text = 'R';
                    break;
                case 'shield':
                    bgColor = 'linear-gradient(135deg, #00aaff, #66ccff)';
                    text = 'S';
                    break;
                case 'tripleShot':
                    bgColor = 'linear-gradient(135deg, #00ff00, #66ff66)';
                    text = 'T';
                    break;
                case 'homingMissile':
                    bgColor = 'linear-gradient(135deg, #ffcc00, #ffee66)';
                    text = 'H';
                    break;
            }
            
            icon.style.background = bgColor;
            icon.textContent = text;
            
            // Add progress indicator
            const progress = document.createElement('div');
            progress.className = 'powerup-progress';
            progress.style.height = `${(state.powerups[powerup].duration / state.powerups[powerup].maxDuration) * 100}%`;
            
            icon.appendChild(progress);
            powerupIndicator.appendChild(icon);
        }
    }
}

function createExplosion(x, y, size) {
    const explosionSprite = new PIXI.Sprite(textures.explosion);
    explosionSprite.anchor.set(0.5);
    explosionSprite.position.set(x, y);
    explosionSprite.scale.set(size / 40);
    explosionSprite.blendMode = PIXI.BLEND_MODES.ADD;
    app.stage.addChild(explosionSprite);
    
    explosions.push({
        sprite: explosionSprite,
        time: 30,
        maxTime: 30
    });
}

function createLevelUpEffect() {
    // Create level up text
    const levelUpText = new PIXI.Text(`LEVEL ${state.level}`, {
        fontFamily: 'Orbitron',
        fontSize: 48,
        fill: 0xffffff,
        fontWeight: 'bold',
        align: 'center'
    });
    levelUpText.anchor.set(0.5);
    levelUpText.position.set(config.width / 2, config.height / 2);
    levelUpText.alpha = 0;
    app.stage.addChild(levelUpText);
    
    // Add glow filter
    levelUpText.filters = [
        new PIXI.filters.GlowFilter({
            distance: 15,
            outerStrength: 4,
            innerStrength: 2,
            color: 0x4a00e0,
            quality: 0.5
        })
    ];
    
    // Animate
    const animate = () => {
        levelUpText.y -= 1;
        levelUpText.alpha += 0.02;
        if (levelUpText.alpha < 1) {
            requestAnimationFrame(animate);
        } else {
            const fadeOut = () => {
                levelUpText.alpha -= 0.02;
                if (levelUpText.alpha > 0) {
                    requestAnimationFrame(fadeOut);
                } else {
                    app.stage.removeChild(levelUpText);
                }
            };
            fadeOut();
        }
    };
    animate();
}

function findNearestEnemy(x, y) {
    let nearest = null;
    let minDistance = Infinity;
    
    for (let enemy of enemies) {
        const dx = enemy.sprite.x - x;
        const dy = enemy.sprite.y - y;
        const distance = dx * dx + dy * dy; // No need for sqrt for comparison
        
        if (distance < minDistance) {
            minDistance = distance;
            nearest = enemy;
        }
    }
    
    return nearest;
}

function checkCollision(obj1, obj2) {
    const dx = obj1.sprite.x - obj2.sprite.x;
    const dy = obj1.sprite.y - obj2.sprite.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Simple circular collision detection
    const radius1 = (obj1.width + obj1.height) / 4;
    const radius2 = (obj2.width + obj2.height) / 4;
    
    return distance < radius1 + radius2;
}



function gameOver() {
    state.gameOver = true;
    finalScoreElement.textContent = state.score;
    finalLevelElement.textContent = state.level;
    gameOverScreen.style.display = 'flex';
}

// Initialize stars
initStars();