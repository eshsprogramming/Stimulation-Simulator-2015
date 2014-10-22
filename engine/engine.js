function initGL(canvas){
	try {
		gl = canvas.getContext("experimental-webgl");
		gl.viewportWidth = canvas.width;
		gl.viewportHeight = canvas.height;
	} catch (e) {}
	if(!gl){
		alert("Could not initialise WebGL, sorry :-(");
	}
}
function getShader(gl, id) {
    var shaderScript = document.getElementById(id);
    if (!shaderScript) {
        return null;
    }

    var str = "";
    var k = shaderScript.firstChild;
    while (k) {
        if (k.nodeType == 3) {
            str += k.textContent;
        }
        k = k.nextSibling;
    }

    var shader;
    if (shaderScript.type == "x-shader/x-fragment") {
        shader = gl.createShader(gl.FRAGMENT_SHADER);
    } else if (shaderScript.type == "x-shader/x-vertex") {
        shader = gl.createShader(gl.VERTEX_SHADER);
    } else {
        return null;
    }

    gl.shaderSource(shader, str);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }

    return shader;
}

var shaderProgram; // not sure how this works exactly
function initShaders() {
    var fragmentShader = getShader(gl, "shader-fs");
    var vertexShader = getShader(gl, "shader-vs");

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Could not initialise shaders");
    }

    gl.useProgram(shaderProgram);

    shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

    shaderProgram.vertexColorAttribute = gl.getAttribLocation(shaderProgram, "aVertexColor");
    gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

    shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
    shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
}

function makeBuffer(array,itemSize,numItems){
	// thisVPB = thisVertexPositionBuffer
	var thisBuffer = gl.createBuffer(); // Creates the buffer
	gl.bindBuffer(gl.ARRAY_BUFFER, thisBuffer); 
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(array), gl.STATIC_DRAW); // Inputs data of position into buffer
	thisBuffer.itemSize = itemSize; // Temporarily 3/3 for triangles, may change for other shapes, does it change for strips?
	thisBuffer.numItems = numItems;
	return thisBuffer;
}

var pMatrix = mat4.create(); // perspectiv
function initViewport(items){
	gl.viewport(0,0, gl.viewportWidth, gl.viewportHeight);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	mat4.perspective(45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0, pMatrix);
	for(i=0;i<items.length;i++){
		mat4.identity(items[i].mvMatrix);
	}
}

function drawScene(items){
	gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix); // Was previously setUniforms() line 1
	for(i=0;i<items.length;i++){
		mat4.translate(items[i].mvMatrix, items[i].translation); // This is what line 111 is talking about, and could be replaced
		mat4.rotate(items[i].mvMatrix, ((items[i].r*Math.PI)/180), items[i].d);
        gl.bindBuffer(gl.ARRAY_BUFFER,items[i].pBuffer); // Here it uses it
		gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, items[i].pBuffer.itemSize, gl.FLOAT, false, 0, 0); // and here
		gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, items[i].mvMatrix); // Was previously setUniforms() line 2
        gl.bindBuffer(gl.ARRAY_BUFFER, items[i].cBuffer);
        gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, items[i].cBuffer.itemSize, gl.FLOAT, false, 0, 0);

        gl.drawArrays(items[i].drawType, 0, items[i].pBuffer.numItems); // and here
	}
}

var neheTexture;
function initTexture() {
    neheTexture = gl.createTexture();
    neheTexture.image = new Image();
    neheTexture.image.onload = function() {
        handleLoadedTexture(neheTexture);
    }
    neheTexture.image.src = "nehe.gif";
}
function handleLoadedTexture(texture) {
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.bindTexture(gl.TEXTURE_2D, null);
}

var lastTime = 0;
function animate(items) {
    var timeNow = new Date().getTime();
    if (lastTime != 0) {
        var elapsed = timeNow - lastTime;
        var add = (90 * elapsed) / 1000.0;
        for(i=0;i<items.length;i++){
            items[i].r += add;
        }
    }
    lastTime = timeNow;
}

function draw() { 
    requestAnimationFrame(draw);
    initViewport(triangles);
    drawScene(triangles);
    animate(triangles);
}

var triangles = [];
function webGLStart() {
	// Normal initializing of the canvas and shaders
	var canvas = document.getElementById("my-canvas");
	initGL(canvas);
	initShaders();
    initTexture();

    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.enable(gl.DEPTH_TEST);
  
    initData(triangles); // Defining data in triangles to be loaded
	initViewport(triangles); // Setting viewport based on pMatrix, and clears previous drawing
    
    draw();
    //drawScene(triangles); // Drawing the triangles
}