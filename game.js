// Game State
class Game2048 {
    constructor() {
        this.gridSize = 4;
        this.grid = [];
        this.score = 0;
        this.bestScore = this.loadBestScore();
        this.gameWon = false;
        this.gameOver = false;

        // DOM Elements
        this.tileContainer = document.getElementById('tile-container');
        this.scoreElement = document.getElementById('score');
        this.bestScoreElement = document.getElementById('best-score');
        this.gameMessage = document.getElementById('game-message');
        this.messageTitle = document.getElementById('message-title');
        this.messageText = document.getElementById('message-text');

        // Initialize
        this.init();
    }

    init() {
        this.setupGrid();
        this.addRandomTile();
        this.addRandomTile();
        this.updateDisplay();
        this.setupControls();
        this.updateBestScoreDisplay();
    }

    setupGrid() {
        this.grid = [];
        for (let i = 0; i < this.gridSize; i++) {
            this.grid[i] = [];
            for (let j = 0; j < this.gridSize; j++) {
                this.grid[i][j] = 0;
            }
        }
    }

    setupControls() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (this.gameOver && !this.gameWon) return;

            const key = e.key;
            let moved = false;

            switch(key) {
                case 'ArrowUp':
                    e.preventDefault();
                    moved = this.move('up');
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    moved = this.move('down');
                    break;
                case 'ArrowLeft':
                    e.preventDefault();
                    moved = this.move('left');
                    break;
                case 'ArrowRight':
                    e.preventDefault();
                    moved = this.move('right');
                    break;
            }

            if (moved) {
                this.addRandomTile();
                this.updateDisplay();
                this.checkGameState();
            }
        });

        // Touch controls
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;

        const gameContainer = document.querySelector('.game-container');

        gameContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });

        gameContainer.addEventListener('touchend', (e) => {
            if (this.gameOver && !this.gameWon) return;

            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            this.handleSwipe();
        }, { passive: true });

        const handleSwipe = () => {
            const deltaX = touchEndX - touchStartX;
            const deltaY = touchEndY - touchStartY;
            const minSwipeDistance = 30;

            let moved = false;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                // Horizontal swipe
                if (Math.abs(deltaX) > minSwipeDistance) {
                    if (deltaX > 0) {
                        moved = this.move('right');
                    } else {
                        moved = this.move('left');
                    }
                }
            } else {
                // Vertical swipe
                if (Math.abs(deltaY) > minSwipeDistance) {
                    if (deltaY > 0) {
                        moved = this.move('down');
                    } else {
                        moved = this.move('up');
                    }
                }
            }

            if (moved) {
                this.addRandomTile();
                this.updateDisplay();
                this.checkGameState();
            }
        };

        this.handleSwipe = handleSwipe;

        // New game button
        document.getElementById('new-game-btn').addEventListener('click', () => {
            this.restart();
        });

        document.getElementById('try-again-btn').addEventListener('click', () => {
            this.restart();
        });
    }

    addRandomTile() {
        const emptyCells = [];

        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                if (this.grid[i][j] === 0) {
                    emptyCells.push({ row: i, col: j });
                }
            }
        }

        if (emptyCells.length > 0) {
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            const value = Math.random() < 0.9 ? 2 : 4;
            this.grid[randomCell.row][randomCell.col] = value;
        }
    }

    move(direction) {
        let moved = false;
        const oldGrid = JSON.stringify(this.grid);

        switch(direction) {
            case 'left':
                moved = this.moveLeft();
                break;
            case 'right':
                moved = this.moveRight();
                break;
            case 'up':
                moved = this.moveUp();
                break;
            case 'down':
                moved = this.moveDown();
                break;
        }

        return JSON.stringify(this.grid) !== oldGrid;
    }

    moveLeft() {
        let moved = false;

        for (let i = 0; i < this.gridSize; i++) {
            const row = this.grid[i].filter(cell => cell !== 0);
            const merged = [];

            for (let j = 0; j < row.length; j++) {
                if (j < row.length - 1 && row[j] === row[j + 1]) {
                    merged.push(row[j] * 2);
                    this.score += row[j] * 2;
                    j++;
                } else {
                    merged.push(row[j]);
                }
            }

            while (merged.length < this.gridSize) {
                merged.push(0);
            }

            this.grid[i] = merged;
        }

        return true;
    }

    moveRight() {
        let moved = false;

        for (let i = 0; i < this.gridSize; i++) {
            const row = this.grid[i].filter(cell => cell !== 0);
            const merged = [];

            for (let j = row.length - 1; j >= 0; j--) {
                if (j > 0 && row[j] === row[j - 1]) {
                    merged.unshift(row[j] * 2);
                    this.score += row[j] * 2;
                    j--;
                } else {
                    merged.unshift(row[j]);
                }
            }

            while (merged.length < this.gridSize) {
                merged.unshift(0);
            }

            this.grid[i] = merged;
        }

        return true;
    }

    moveUp() {
        for (let j = 0; j < this.gridSize; j++) {
            const column = [];
            for (let i = 0; i < this.gridSize; i++) {
                if (this.grid[i][j] !== 0) {
                    column.push(this.grid[i][j]);
                }
            }

            const merged = [];
            for (let i = 0; i < column.length; i++) {
                if (i < column.length - 1 && column[i] === column[i + 1]) {
                    merged.push(column[i] * 2);
                    this.score += column[i] * 2;
                    i++;
                } else {
                    merged.push(column[i]);
                }
            }

            while (merged.length < this.gridSize) {
                merged.push(0);
            }

            for (let i = 0; i < this.gridSize; i++) {
                this.grid[i][j] = merged[i];
            }
        }

        return true;
    }

    moveDown() {
        for (let j = 0; j < this.gridSize; j++) {
            const column = [];
            for (let i = 0; i < this.gridSize; i++) {
                if (this.grid[i][j] !== 0) {
                    column.push(this.grid[i][j]);
                }
            }

            const merged = [];
            for (let i = column.length - 1; i >= 0; i--) {
                if (i > 0 && column[i] === column[i - 1]) {
                    merged.unshift(column[i] * 2);
                    this.score += column[i] * 2;
                    i--;
                } else {
                    merged.unshift(column[i]);
                }
            }

            while (merged.length < this.gridSize) {
                merged.unshift(0);
            }

            for (let i = 0; i < this.gridSize; i++) {
                this.grid[i][j] = merged[i];
            }
        }

        return true;
    }

    updateDisplay() {
        // Clear tile container
        this.tileContainer.innerHTML = '';

        // Calculate tile size and gap dynamically
        const container = document.querySelector('.game-container');
        const containerWidth = container.offsetWidth;
        const gap = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--tile-gap'));
        const tileSize = (containerWidth - gap * (this.gridSize + 1)) / this.gridSize;

        // Render tiles
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                const value = this.grid[i][j];
                if (value !== 0) {
                    const tile = document.createElement('div');
                    tile.className = `tile tile-${value} tile-new`;
                    tile.textContent = value;

                    const top = gap + i * (tileSize + gap);
                    const left = gap + j * (tileSize + gap);

                    tile.style.top = `${top}px`;
                    tile.style.left = `${left}px`;
                    tile.style.width = `${tileSize}px`;
                    tile.style.height = `${tileSize}px`;

                    this.tileContainer.appendChild(tile);

                    // Remove animation class after animation completes
                    setTimeout(() => {
                        tile.classList.remove('tile-new');
                    }, 200);
                }
            }
        }

        // Update score
        this.scoreElement.textContent = this.score;

        // Update best score
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            this.saveBestScore();
            this.updateBestScoreDisplay();
        }
    }

    checkGameState() {
        // Check for 2048 tile (win condition)
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                if (this.grid[i][j] === 2048 && !this.gameWon) {
                    this.gameWon = true;
                    this.showMessage('Selamat!', 'Anda mencapai 2048! Lanjutkan bermain atau mulai lagi.');
                    return;
                }
            }
        }

        // Check for available moves
        if (!this.canMove()) {
            this.gameOver = true;
            this.showMessage('Game Over!', `Tidak ada gerakan yang tersedia. Skor akhir: ${this.score}`);
        }
    }

    canMove() {
        // Check for empty cells
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                if (this.grid[i][j] === 0) {
                    return true;
                }
            }
        }

        // Check for possible merges
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                const current = this.grid[i][j];

                // Check right
                if (j < this.gridSize - 1 && current === this.grid[i][j + 1]) {
                    return true;
                }

                // Check down
                if (i < this.gridSize - 1 && current === this.grid[i + 1][j]) {
                    return true;
                }
            }
        }

        return false;
    }

    showMessage(title, text) {
        this.messageTitle.textContent = title;
        this.messageText.textContent = text;
        this.gameMessage.classList.add('show');
    }

    hideMessage() {
        this.gameMessage.classList.remove('show');
    }

    restart() {
        this.score = 0;
        this.gameWon = false;
        this.gameOver = false;
        this.hideMessage();
        this.setupGrid();
        this.addRandomTile();
        this.addRandomTile();
        this.updateDisplay();
    }

    // localStorage methods
    saveBestScore() {
        try {
            localStorage.setItem('game2048-best-score', this.bestScore.toString());
        } catch (e) {
            console.error('Failed to save best score:', e);
        }
    }

    loadBestScore() {
        try {
            const saved = localStorage.getItem('game2048-best-score');
            return saved ? parseInt(saved, 10) : 0;
        } catch (e) {
            console.error('Failed to load best score:', e);
            return 0;
        }
    }

    updateBestScoreDisplay() {
        this.bestScoreElement.textContent = this.bestScore;
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const game = new Game2048();
});
