let matrix = shuffleMatrix()

const board = document.querySelector('.board');

drawTokens();
addEventListeners()

function drawTokens(){
    board.innerHTML = '';
    matrix.forEach(row => row.forEach(item => {
        if (item == ""){
            board.innerHTML += `<div class='empty'>${item}</div>`
        }else{
            board.innerHTML += `<div class='token'>${item}</div>`
        }
    }))
}


function addEventListeners(){
    const tokens = document.querySelectorAll('.token')
    tokens.forEach( token => token.addEventListener('click', () => {
        let actualPosition = searchPosition(token.innerText)
        let emptyPosition = searchPosition('')
        let movement = canItMovement(actualPosition, emptyPosition)
        if(movement !== false){
            updateMatrix(token.innerText, actualPosition, emptyPosition)
            let result = compareMatrix();
            if(result == true){
                confetti({
                    particleCount: 150,
                    spread: 180
                  });
            }
            drawTokens();
            addEventListeners()
        }   
    }))
}

function searchPosition(element){
    let rowIndex = 0;
    let columnIndex = 0;
    matrix.forEach((row, index) =>{
        const rowElement = row.findIndex(item => item == element)
        if (rowElement != -1){
            rowIndex = index;
            columnIndex = rowElement;
        } 
    })
    return [rowIndex, columnIndex]
}

function canItMovement(actualPosition, emptyPosition){
    if (actualPosition[1] == emptyPosition[1]){
        if (actualPosition[0] - emptyPosition[0] > 1  || actualPosition[0] - emptyPosition[0] < -1){
            return false
        } 
    }else if(actualPosition[0] == emptyPosition[0]){        
        if (actualPosition[1] - emptyPosition[1] > 1  || actualPosition[1] - emptyPosition[1] < -1){
            return false
        }
    }else{
        return false
    }
}

function updateMatrix(element, actualPosition, emptyPosition){
    matrix[actualPosition[0]][actualPosition[1]] = ''
    matrix[emptyPosition[0]][emptyPosition[1]] = element;
}

function shuffleMatrix(){   
    let shuffleMatrix = [
        [],
        [],
        []
    ]
    let array = ['1','2','3','4','5','6','7','8','']
    let suffleArray = array.sort(()=> Math.random()-0.5)
    let column = 0;
    let row = 0;
    suffleArray.forEach(element => {
        shuffleMatrix[row].push(element)
        if(column < 2){
            column++
        }else{
            column = 0
            row++;
        }    
    })
    return shuffleMatrix
}

function compareMatrix(){
    let counter = 0;
    let finalMatrix = [
        ['1','2','3'],
        ['4','5','6'],
        ['7','8','']
    ]

    matrix.forEach((row, indexRow) => {
        row.forEach((element, indexColumn) => {
            if(element == finalMatrix[indexRow][indexColumn]){
                counter++;
            }
        })
    })
    if(counter == 9){
        return true
    }else{
        return false
    }
}


