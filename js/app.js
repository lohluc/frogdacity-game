// Opens the instructions modal on page load
// Tutorial at http://www.webdesignerdepot.com/2012/10/creating-a-modal-window-with-html5-and-css3/
window.onload = function() {
    window.location.href = "#openModal";
};


// Enemies our player must avoid
var Enemy = function(x, y) {
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = this.get_speed();
};


// To get random speed for enemy object
Enemy.prototype.get_speed = function() {
    if (level == 0) {
    return Math.floor(Math.random() * (max_speed - min_speed + 1) + min_speed);
    } else if (level == 1) {
        return Math.floor(Math.random() * (max_speed - min_speed + 100) + min_speed); 
    } else {
        return Math.floor(Math.random() * (max_speed - min_speed + 1000) + min_speed);
    }
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 850)
        this.x += this.speed * dt;
    else {
        this.x = -100;
        this.speed = this.get_speed();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Player = function(x, y) {
    this.sprite = 'images/char-boy.png';
    this.x = x;
    this.y = y;
};

Player.prototype.update = function() {
    for (var i = 0; i < allEnemies.length; i++) {
        if ((this.y == allEnemies[i].y) && (this.x < allEnemies[i].x + 101) && (this.x + 101 > allEnemies[i].x)) {
            // If a enemy hits the player:
            // -> Player back to initial position
            // -> Score back to 0
            // -> Level back to 0
            // -> Increment fails by 1
            this.reset();
            score -= score;
            $('.score').text(score);
            fail += 1;
            $('.fails').text(fail);
            level -= level;
            $('.level').text(level);
        }
    }
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
    this.x = 400;
    this.y = 400;
};

Player.prototype.handleInput = function(key) {
    if (key == 'left') {
        if (this.x > 0) {
            this.x -= 100;
        }
    } else if (key == 'right') {
        if (this.x < 800) {
            this.x += 100;
        }
    } else if (key == 'up') {
        if (this.y > 40) {
            this.y -= 90;
        } else {
            // If player reaches the water:
            // -> Player back to initial position
            // -> Increment score by 1
            this.reset();
            score += 1;
            $('.score').text(score);
            // If score increments by 5:
            // -> Level + 1
            if (score % 5 == 0) {
                level += 1;
                $('.level').text(level);
            }
        }
    } else if (key == 'down') {
        if (this.y < 400) {
            this.y += 90;
        }
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [
    new Enemy(0, 40),
    new Enemy(0, 130),
    new Enemy(0, 220)
];

var player = new Player(400, 400);

// Game variables
var score = 0;
var level = 0;
var fail = 0;
var max_speed = 400,
    min_speed = 300;


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});