
var hitOptions = {
    segments: true,
    stroke: true,
    fill: true,
    tolerance: 2
};

var gridWidth = 20;
var gridHeight = 11;
var squareSize = 40;

var square = new Path.Rectangle(0, 0, squareSize, squareSize);
square.translate(squareSize / 2, squareSize / 2);
square.strokeColor = '#ccc';
square.fillColor = '#fff';

var liveLayer = new Layer();
var staticLayer = new Layer();
var toolbarLayer = new Layer();

var selectedItem = null;

for (var i = 1; i <= gridWidth; i++) {
    for (var j = 1; j <= gridHeight; j++) {
        var newSquare = square.clone();
        newSquare.position.x = i * squareSize + i * 5;
        newSquare.position.y = j * squareSize + j * 5;
        if (j == 1 || j == gridHeight || i == 1 || i == gridWidth) {
            newSquare.strokeColor = '#333';
            newSquare.fillColor = '#eee';
            staticLayer.addChild(newSquare);
            if (i == 1 && j == Math.ceil(gridHeight / 2)) {
                newSquare.strokeColor = '#088A08';
                newSquare.fillColor = '#64FE2E';
            } else if (i == gridWidth && j == Math.ceil(gridHeight / 2)) {
                newSquare.strokeColor = '#DF0101';
                newSquare.fillColor = '#F78181';
            }
        } else {
            liveLayer.addChild(newSquare);
        }
    }
}

for (var i = 1; i <= gridWidth; i++) {
    var newSquare = square.clone();
    newSquare.strokeColor = '#333';
    newSquare.fillColor = 'red';
    newSquare.fillColor.hue = Math.random() * 360;
    newSquare.position.x = i * squareSize + i * 5;
    newSquare.position.y = (squareSize + 5) * gridHeight + (squareSize * 2);
    toolbarLayer.addChild(newSquare);
}

square.remove();
liveLayer.translate(170,0);
staticLayer.translate(170,0);
toolbarLayer.translate(170,0);

function onMouseMove(event) {
    // if (selectedItem) {
    //     dragItem.position = event.point;
    // }
    var hitResult = project.hitTest(event.point, hitOptions);
    liveLayer.strokeColor = '#ccc';
    liveLayer.fillColor = '#fff';
    if (hitResult && hitResult.item.isDescendant(liveLayer)) {
        hitResult.item.strokeColor = '#2E9AFE';
        hitResult.item.fillColor = '#CEE3F6';
    }
}

function onMouseDown(event) {
    var hitResult = project.hitTest(event.point, hitOptions);
    
    if (hitResult && hitResult.item.isDescendant(liveLayer)) {
        selectedItem.scale(0.5);
        var newItem = selectedItem.clone();
        newItem.position = hitResult.item.position;
        selectedItem.scale(2);
    }
    
    if (hitResult && hitResult.item.isDescendant(toolbarLayer)) {
        if (selectedItem) {
            selectedItem.scale(0.5);
        }
        selectedItem = hitResult.item;
        selectedItem.remove();
        toolbarLayer.addChild(selectedItem);
        selectedItem.scale(2);
    }
}
