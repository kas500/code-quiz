var quiz = [];
//object to store question with single choise

//object to store question with multiple choise

//object to store question with true/false statement

//create array with questions and answers
var initArr = [ "~Qs: Inside which HTML element do we put the JavaScript?", "<js>","<javascript>","<code>","<script>`",
                "~Qs: Where is the correct place to insert a JavaScript?", "<head>","<body>","both are correct`","<title>",
                "~Qm: Select all primitive data.","number`","string`","boolean`","Object",
                "~Qb: JavaScript is the same as Java.", "false",
                "~Qs: Which event occurs when the user clicks on an HTML element?","onmouseclick","onclick`","onchange","onmouseover",
                "~Qs: Which operator is used to assign a value to a variable?", "*","-","=`","%",
                "~Qb: JavaScript is case-sensitive language.", "true",
                "~Qs: How do you write 'Hello World' in an alert box?", "alert('Hello World')`","alertBox(Hello World)","msg('Hello World')","prompt('Hello World')"];

var count = 0;
for (let index = 0; index < initArr.length; index++) {
    if(initArr[index].includes("~Q")){
        if(initArr[index].charAt(2)==="s"){
            var singleChoiseQ = {
                qName: "",
                answers: [],
                correctAnswer: ""
            };
            singleChoiseQ.qName = initArr[index];
            count = 1;
            while(count<=4){
                var subIndex = index+count
                if(initArr[subIndex].charAt(initArr[subIndex].length-1)==="`"){
                    initArr[subIndex]=initArr[subIndex].replace("`","");
                    singleChoiseQ.correctAnswer = initArr[subIndex];
                }
                singleChoiseQ.answers.push(initArr[subIndex]);
                count++;
            }   
            quiz.push(singleChoiseQ);
        }
        if(initArr[index].charAt(2)==="m"){
            var multipleChoiseQ = {
                qName: "",
                answers: [],
                correctAnswers: []
            };
            multipleChoiseQ.qName = initArr[index];
            count = 1;
            while(count<=4){
                var subIndex = index+count
                if(initArr[subIndex].charAt(initArr[subIndex].length-1)==="`"){
                    initArr[subIndex]=initArr[subIndex].replace("`","");
                    multipleChoiseQ.correctAnswers.push(initArr[subIndex]);
                }
                multipleChoiseQ.answers.push(initArr[subIndex]);
                count++;
            }
            quiz.push(multipleChoiseQ);
        }
        if(initArr[index].charAt(2)==="b"){
            var trueFalseQ = {
                qName: "",
                correctAnswer: false 
            };
            trueFalseQ.qName = initArr[index];
            trueFalseQ.correctAnswer = (initArr[index+1]==="true")?true:false;
            quiz.push(trueFalseQ);
        }

    }
    
}

console.log(quiz);