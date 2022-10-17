var quiz = [];
var qNum = 1;
var h1El = document.querySelector("h1");
var formEl = document.querySelector("#studentInfo");
var buttonStart = document.querySelector("#start");
var buttonAnswer = document.querySelector("#answer");
var studentNameField = document.querySelector("#studentName");
var studentName = studentNameField.value;
var pEl = document.querySelector("p");
var spanCurrentNum = document.querySelector("#currentNum");
var spanTotalNum = document.querySelector("#totalNum");

pEl.style.visibility = "hidden";
buttonAnswer.style.visibility = "hidden";


localStorage.setItem("studentName","") ;
localStorage.setItem("maxScore", "");

buttonStart.addEventListener("click", function(event){
    if(studentNameField.value!==""){
        event.preventDefault();
        clearQuestions()
        questionsArrayGenerator();
        h1El.remove();
        formEl.remove();
        createQuestionCard();
    }
    else alert("Please enter your name");
});

buttonAnswer.addEventListener("click", function(event){
    event.preventDefault();
    if(qNum<quiz.length){
        qNum++;
        document.querySelector("#questionName").remove();
        createQuestionCard();
    }
    else if (qNum==quiz.length){
        buttonAnswer.style.visibility = "hidden";
    }
});

function createQuestionCard(){
    var currentQuestionNum = qNum;
    var totalQuestionsNum = quiz.length;
    spanCurrentNum.innerHTML = currentQuestionNum;
    spanTotalNum.innerHTML = totalQuestionsNum;
    pEl.style.visibility = "visible";
    buttonAnswer.style.visibility = "visible";
    var questionName = document.createElement("p");
    questionName.setAttribute("id", "questionName");
    var ulEl = document.createElement("ul");
    ulEl.setAttribute("id", "listOfAnswers");
    questionName.innerHTML = quiz[currentQuestionNum-1].qName;
    pEl.appendChild(questionName);
    questionName.appendChild(ulEl);
    if(quiz[currentQuestionNum-1].qType==="single"){
        for (let index = 0; index < quiz[currentQuestionNum-1].answers.length; index++) {
            var li = document.createElement("li");
            li.textContent = quiz[currentQuestionNum-1].answers[index];
            ulEl.appendChild(li);
        }
    }
    if(quiz[currentQuestionNum-1].qType==="multiple"){
        for (let index = 0; index < quiz[currentQuestionNum-1].answers.length; index++) {
            var li = document.createElement("li");
            li.textContent = quiz[currentQuestionNum-1].answers[index];
            ulEl.appendChild(li);
        }
    }
    if(quiz[currentQuestionNum-1].qType==="true/false"){
            var liTrue = document.createElement("li");
            liTrue.setAttribute("value", true);
            liTrue.textContent="true";
            var liFalse = document.createElement("li");
            liFalse.setAttribute("value", false);
            liFalse.textContent="false";
            ulEl.appendChild(liTrue);
            ulEl.appendChild(liFalse);

    }
}




function questionsArrayGenerator(){
    //initial questions array
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
        //generate single choise question object and add to array  
            if(initArr[index].charAt(2)==="s"){
                var singleChoiseQ = {
                    qName: "",
                    answers: [],
                    correctAnswer: "",
                    qType: "single"
                };
                singleChoiseQ.qName = initArr[index].replace("~Qs: ","");
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
        //generate multiple choise question object and add to array   
            if(initArr[index].charAt(2)==="m"){
                var multipleChoiseQ = {
                    qName: "",
                    answers: [],
                    correctAnswers: [],
                    qType: "multiple"
                };
                multipleChoiseQ.qName = initArr[index].replace("~Qm: ","");;
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
        //generate true/false question object and add to array       
            if(initArr[index].charAt(2)==="b"){
                var trueFalseQ = {
                    qName: "",
                    correctAnswer: false ,
                    qType: "true/false"
                };
                trueFalseQ.qName = initArr[index].replace("~Qb: ","");;
                trueFalseQ.correctAnswer = (initArr[index+1]==="true")?true:false;
                quiz.push(trueFalseQ);
            }

        }
        
    }
}

function clearQuestions(){
    quiz =[];
}
