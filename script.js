
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        // Game settings
        const boxSize = 20;
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        // Initial snake properties
        let snake = [{ x: boxSize * 5, y: boxSize * 5 }];
        let direction = "RIGHT";
        let score = 0;

        // Generate random food position
        let food = generateFood();

        function generateFood() {
            return {
                x: Math.floor(Math.random() * (canvasWidth / boxSize)) * boxSize,
                y: Math.floor(Math.random() * (canvasHeight / boxSize)) * boxSize
            };
        }

        // Draw game elements
        function draw() {
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            // Draw snake
            snake.forEach((part, index) => {
                ctx.fillStyle = index === 0 ? 'green' : 'lightgreen';
                ctx.fillRect(part.x, part.y, boxSize, boxSize);
            });

            // Draw food
            ctx.fillStyle = 'red';
            ctx.fillRect(food.x, food.y, boxSize, boxSize);

            // Move snake
            let newHead = { ...snake[0] };
            if (direction === "LEFT") newHead.x -= boxSize;
            if (direction === "UP") newHead.y -= boxSize;
            if (direction === "RIGHT") newHead.x += boxSize;
            if (direction === "DOWN") newHead.y += boxSize;

            // Check for collision with food
            if (newHead.x === food.x && newHead.y === food.y) {
                score++;
                food = generateFood();
            } else {
                snake.pop(); // Remove the last part of the snake if no food is eaten
            }

            // Check for collision with wall or itself
            if (
                newHead.x < 0 || newHead.x >= canvasWidth ||
                newHead.y < 0 || newHead.y >= canvasHeight ||
                snake.some(part => part.x === newHead.x && part.y === newHead.y)
            ) {
                resetGame();
            }

            // Add new head to snake
            snake.unshift(newHead);

            // Display score
            ctx.fillStyle = 'black';
            ctx.font = "20px Arial";
            ctx.fillText("Score: " + score, 10, 20);
        }

        // Handle key events
        document.addEventListener("keydown", event => {
            if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
            if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
            if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
            if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
        });

        // Reset game on collision
        function resetGame() {
            snake = [{ x: boxSize * 10, y: boxSize * 10}];
            direction = "RIGHT";
            score = 0;
            food = generateFood();
        }

        // Game loop
        setInterval(draw, 100);