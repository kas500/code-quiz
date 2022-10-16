var quiz = [];
//object to store question with single choise
var singleChoiseQ = {
    question: "",
    answers: [],
    correctIndex: 0
};
//object to store question with multiple choise
var multipleChoiseQ = {
    question: "",
    answers: [],
    correctIndexes: []
};
//object to store question with true/false statement
var trueFalseQ = {
    question: "",
    correctAnswer: false 
};
//create array with questions and answers
var initArr = [ "~Qs: Inside which HTML element do we put the JavaScript?", "<js>","<javascript>","<code>","<script>+",
                "~Qs: Where is the correct place to insert a JavaScript?", "<head>","<body>","both are correct+","<title>",
                "~Qm: Select all primitive data.","number+","string+","boolean+","Object",
                "~Qb: JavaScript is the same as Java.", "false",
                "~Qs: Which event occurs when the user clicks on an HTML element?","onmouseclick","onclick+","onchange","onmouseover",
                "~Qs: Which operator is used to assign a value to a variable?", "*","-","=+","%",
                "~Qb: JavaScript is case-sensitive language.", "true",
                "~Qs: How do you write 'Hello World' in an alert box?", "alert('Hello World')+","alertBox(Hello World)","msg('Hello World')","prompt('Hello World')"];

var count = 0;
for (let index = 0; index < initArr.length; index++) {
    if(initArr[index].includes("~Q")){
        if(initArr[index].charAt(2)==="s"){
            console.log(initArr[index]);
            console.log("single");
            count = 1;
            while(count<=4){
                console.log(initArr[index+count]);
                count++;
            }
        }
        if(initArr[index].charAt(2)==="m"){
            console.log(initArr[index]);
            console.log("multiple");
            count = 1;
            while(count<=4){
                console.log(initArr[index+count]);
                count++;
            }
        }
        if(initArr[index].charAt(2)==="b"){
            console.log(initArr[index]);
            console.log("boolean");
            console.log(initArr[index+1]);
        }
    }
    
}