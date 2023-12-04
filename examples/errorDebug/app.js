/*Arbol de Asteriscos*/
function tree(floorNum){
    for (let i = 0; i < floorNum; i++){
        let floor = " ";
        for (let j = 0; j < i; j++){
            floor = floor + "*";
        }
        console.log(floor)
    }
}

tree(5)