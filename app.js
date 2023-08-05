$(document).ready(() => {

    let cells = ['', '', '', '', '', '', '', '', '',];
    let player = 'circle';

    let circleScore = 0;
    let crossScore = 0;

    function createBoard() {
        cells.forEach((_cell, index) => {
            const elm = document.createElement('div');
            elm.classList.add('grid_item');
            elm.id = index;
            elm.addEventListener('click', add);

            $('.board').append(elm);
        });
    }

    function add(e) {
        const shape = document.createElement('div');
        shape.classList.add(player);
        player = player == 'circle' ? 'cross' : 'circle';
        e.target.append(shape);
        e.target.removeEventListener('click', add);
        checkScore();
    }

    function checkScore() {
        let allSquare = document.querySelectorAll('.grid_item');
        let winnings = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],

            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],

            [0, 4, 8],
            [2, 4, 6]
        ];

        // if circle wins
        winnings.forEach(array => {
            let circleWin = array.every(cell =>
                allSquare[cell].firstChild?.classList.contains('circle'));

            if (circleWin) {
                circleScore++;
                alert('Circle wins the game');
                $('.circle_score').text(circleScore);
                allSquare.forEach(square => square.replaceWith(square.cloneNode(true)));
                return;
            }
            });

            // if cross wins
            winnings.forEach(array => {
                let crossWin = array.every(cell =>
                    allSquare[cell].firstChild?.classList.contains('cross'));

                if (crossWin) {
                    crossScore++;
                    alert('Cross wins the game');
                    $('.cross_score').text(crossScore);
                    allSquare.forEach(square => square.replaceWith(square.cloneNode(true)));
                    return;
            }
            });
    }

    createBoard();

    // empty board
    $('.restart').click(() => {
        $('.grid_item').remove();
        createBoard();
    });

    // restart the game
    $('.reset').click(() => {
        circleScore = 0;
        $('.circle_score').text(circleScore);

        crossScore = 0
        $('.cross_score').text(crossScore);

        $('.grid_item').remove();
        createBoard();
    });
});
