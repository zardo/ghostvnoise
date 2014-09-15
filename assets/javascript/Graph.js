function Graph(config) {
    // user defined properties
    this.canvas = config.canvasEl;
    this.minX = config.minX;
    this.minY = config.minY;
    this.maxX = config.maxX;
    this.maxY = config.maxY;
    this.unitsPerTick = config.unitsPerTick;

    // constants
    this.axisColor = '#aaa';
    this.font = '8pt Calibri';
    this.tickSize = 20;

    // relationships
    this.context = this.canvas.getContext('2d');
    this.rangeX = this.maxX - this.minX;
    this.rangeY = this.maxY - this.minY;
    this.unitX = this.canvas.width / this.rangeX;
    this.unitY = this.canvas.height / this.rangeY;
    this.centerY = Math.round(Math.abs(this.minY / this.rangeY) * this.canvas.height);
    this.centerX = Math.round(Math.abs(this.minX / this.rangeX) * this.canvas.width);
    this.iteration = (this.maxX - this.minX) / 1000;
    this.scaleX = this.canvas.width / this.rangeX;
    this.scaleY = this.canvas.height / this.rangeY;
}

Graph.prototype.drawEquation = function(equation, color, thickness) {
    var context = this.context;
    context.save();
    context.save();
    this.transformContext();

    context.beginPath();
    context.moveTo(this.minX, equation(this.minX));

    for(var x = this.minX + this.iteration; x <= this.maxX; x += this.iteration) {
        context.lineTo(x, equation(x));
    }

    context.restore();
    context.lineJoin = 'round';
    context.lineWidth = thickness;
    context.strokeStyle = color;
    context.stroke();
    context.restore();
};

Graph.prototype.transformContext = function() {
    var context = this.context;

    // move context to center of canvas
    this.context.translate(this.centerX, this.centerY);

    /*
     * stretch grid to fit the canvas window, and
     * invert the y scale so that that increments
     * as you move upwards
     */
    context.scale(this.scaleX, -this.scaleY);
};

function gvnRandom(min, max) {
    return Math.random() * (max - min) + min;
}

var elements = document.querySelectorAll('.post-canvas');
Array.prototype.forEach.call(elements, function(el, i){
    var myGraph = new Graph({
        canvasEl: el.querySelectorAll('canvas')[0],
        minX: -10,
        minY: -10,
        maxX: 10,
        maxY: 10,
        unitsPerTick: 1
    });

    var rdms = {
        a: gvnRandom(1, 3),
        b: gvnRandom(2, 4),
        c: gvnRandom(4, 6),
        d: gvnRandom(0, 1),
        e: gvnRandom(0, 1),
        f: gvnRandom(0, 1),
    }

    myGraph.drawEquation(function(x) {
        return Math.cos(x * rdms.a);
    }, '#93C256', 1);

    myGraph.drawEquation(function(x) {
        return Math.exp(x / rdms.b) + Math.sin(x * rdms.c) * 2 - 6;
    }, '#3D7484', .8);

    myGraph.drawEquation(function(x) {
        return 5 * Math.sin(x * rdms.d);
    }, '#BE5474', 1.2);

    myGraph.drawEquation(function(x) {
        return Math.cos(x * rdms.e) * Math.pow(x, 2);
    }, '#A698DB', 1.2);

    myGraph.drawEquation(function(x) {
        return Math.cos(x * rdms.f) * Math.pow(x, 2);
    }, '#D5C05E', 1.2);
});