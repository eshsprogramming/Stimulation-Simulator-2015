function initData(data){
	// Eventually this function could be done somewhere else, but would take the data from the map file
    /*

    Triangle 1:  [ -1.0, -1.0, -1.0, -1.0, -1.0,  1.0,  1.0, -1.0,  1.0,  ]
    Triangle 2:  [  1.0, -1.0,  1.0,  1.0, -1.0, -1.0, -1.0, -1.0, -1.0,  ]
    Triangle 3:  [ -1.0, -1.0, -1.0,  0.0,  1.0,  0.0, -1.0, -1.0,  1.0,  ]
    Triangle 4:  [ -1.0, -1.0,  1.0,  0.0,  1.0,  0.0,  1.0, -1.0,  1.0,  ]
    Triangle 5:  [  1.0, -1.0,  1.0,  0.0,  1.0,  0.0,  1.0, -1.0, -1.0,  ]
    Triangle 6:  [  1.0, -1.0, -1.0,  0.0,  1.0,  0.0, -1.0, -1.0, -1.0,  ]

     */

	data[0] = {
		position:[
        -1.0, -1.0,  0.0,
         0.0,  1.0,  0.0,
         1.0, -1.0,  0.0
        ],
        colors:[
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        ],
        translation:[-1.0, 0.0, -7.0],
        mvMatrix:mat4.create(), // Creates effectively a translation buffer, to use the translation
	};
	// It's possible could put the translation into mvMatrix here, but for now the translation is done within drawScene();
	data[0].pBuffer=makePBuffer(data[0].position); // Here data is put into the buffer along with the buffer being created, is possible since this is reoccuring, could put it into the drawScene() function
    data[0].cBuffer=makeCBuffer(data[0].colors);

	data[1] = {
		position:[
    	 0.0, -1.0,  0.0,
    	 1.0,  1.0,  0.0,
    	-1.0,  1.0,  0.0,
    	],
        colors:[
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        ],
    	translation:[1.0,0.0,-7.0],
    	mvMatrix:mat4.create(),
	}
	data[1].pBuffer=makePBuffer(data[1].position);
    data[1].cBuffer=makeCBuffer(data[1].colors);
}