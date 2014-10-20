var pyramid = {
    one:{
        position:[
            -1, -1,  1,
            -1, -1, -1,
             0,  1,  0,
        ],
    },
    two:{
        position:[
             1, -1, -1,
            -1, -1, -1,
             0,  1,  0,
        ],
    },
    three:{
        position:[
             1, -1,  1,
             1, -1, -1,
             0,  1,  0,
        ],
    },
    four:{
        position:[
            -1, -1,  1,
             1, -1,  1,
             0,  1,  0,
        ],
    },
    five:{
        position:[
            -1, -1, -1,
            -1, -1,  1,
             1, -1,  1,
        ],
    },
    six:{
        position:[
            -1, -1, -1,
             1, -1, -1,
             1, -1,  1,
        ],
    },
}

function initData(data){
    // Model


    data[0] = {
    	position:pyramid.one.position,
        colors:[
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        ],
        translation:[ 0.0, 0.0, -7.0],
        r:0,
        d:[1,.25,.5],
        mvMatrix:mat4.create(), // Creates effectively a translation buffer, to use the translation
    };
    // It's possible could put the translation into mvMatrix here, but for now the translation is done within drawScene();
    data[0].pBuffer=makeBuffer(data[0].position,3,3); // Here data is put into the buffer along with the buffer being created, is possible since this is reoccuring, could put it into the drawScene() function
    data[0].cBuffer=makeBuffer(data[0].colors,4,3);

    data[1] = {
    	position:pyramid.two.position,
        colors:[
        0.5, 0.5, 1.0, 1.0,
        0.5, 0.5, 1.0, 1.0,
        0.5, 0.5, 1.0, 1.0,
        ],
    	translation:[ 0.0,0.0,-7.0],
        r:0,
        d:[1,.25,.5],
    	mvMatrix:mat4.create(),
    }
    data[1].pBuffer=makeBuffer(data[1].position,3,3);
    data[1].cBuffer=makeBuffer(data[1].colors,4,3);

    data[2] = {
        position:pyramid.three.position,
        colors:[
        0.5, 0.5, 0.0, 1.0,
        0.5, 0.5, 0.0, 1.0,
        0.5, 0.5, 0.0, 1.0,
        ],
        translation:[ 0.0,0.0,-7.0],
        r:0,
        d:[1,.25,.5],
        mvMatrix:mat4.create(),
    }
    data[2].pBuffer=makeBuffer(data[2].position,3,3);
    data[2].cBuffer=makeBuffer(data[2].colors,4,3);

    data[3] = {
        position:pyramid.four.position,
        colors:[
        1, 0, 1.0, 1.0,
        1, 0, 1.0, 1.0,
        1, 0, 1.0, 1.0,
        ],
        translation:[ 0.0,0.0,-7.0],
        r:0,
        d:[1,.25,.5],
        mvMatrix:mat4.create(),
    }
    data[3].pBuffer=makeBuffer(data[3].position,3,3);
    data[3].cBuffer=makeBuffer(data[3].colors,4,3);

    data[4] = {
        position:pyramid.five.position,
        colors:[
        1, 0, 1.0, 1.0,
        1, 1, 1.0, 1.0,
        0, 0, 1.0, 1.0,
        ],
        translation:[ 0.0,0.0,-7.0],
        r:0,
        d:[1,.25,.5],
        mvMatrix:mat4.create(),
    }
    data[4].pBuffer=makeBuffer(data[4].position,3,3);
    data[4].cBuffer=makeBuffer(data[4].colors,4,3);

    data[5] = {
        position:pyramid.six.position,
        colors:[
        1, 0, 1.0, 1.0,
        0, 1, 0.0, 1.0,
        0, 0, 1.0, 1.0,
        ],
        translation:[ 0.0,0.0,-7.0],
        r:0,
        d:[1,.25,.5],
        mvMatrix:mat4.create(),
    }
    data[5].pBuffer=makeBuffer(data[5].position,3,3);
    data[5].cBuffer=makeBuffer(data[5].colors,4,3);
}