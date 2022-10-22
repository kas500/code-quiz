var quiz = [];
var tempArrOfAnswers=[];
var resultsArr = [];
var statisticArr = [];
var qNum = 0;

var body = document.querySelector("body");
var h1El = document.querySelector("h1");
var formEl = document.querySelector("#studentInfo");
var buttonStart = document.querySelector("#start");
var studentNameField = document.querySelector("#studentName");
var studentName = studentNameField.value;
var pEl = document.querySelector("p");
var correctOrWrongEl = document.querySelector("#correctOrWrong");
var spanCurrentNum = document.querySelector("#currentNum");
var spanTotalNum = document.querySelector("#totalNum");
pEl.style.visibility = "hidden";


function questionsArrayGenerator(){
    //initial questions array
    var initArr = [ "~Qs: Inside which HTML element do we put the JavaScript?", "<js>","<javascript>","<code>","<script>`",
                    "~Qs: Where is the correct place to insert a JavaScript?", "<head>","<body>","<head> or <body>`","<title>",
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
                trueFalseQ.correctAnswer = initArr[index+1];
                quiz.push(trueFalseQ);
            }

        }
        
    }
}

function clearQuestions(){
    quiz =[];
}

function createQuestionCard(qNum){
    if (qNum<quiz.length) {
        var currentQuestionNum = qNum;
        var totalQuestionsNum = quiz.length;
        spanCurrentNum.innerHTML = currentQuestionNum+1;
        spanTotalNum.innerHTML = totalQuestionsNum;
        pEl.style.visibility = "visible";
        var card = document.createElement("form");
        card.setAttribute("data-question-index", currentQuestionNum);
        card.setAttribute("data-question-type", quiz[currentQuestionNum].qType);
        var questionName = document.createElement("p");
        questionName.setAttribute("id", "questionName");
        var fieldsetEl = document.createElement("fieldset");
        fieldsetEl.setAttribute("id", "listOfAnswers");
        questionName.innerHTML = quiz[currentQuestionNum].qName;
        pEl.appendChild(card);
        card.appendChild(questionName);
        card.appendChild(fieldsetEl);
        if((quiz[currentQuestionNum].qType==="single")){
            for (let index = 0; index < quiz[currentQuestionNum].answers.length; index++) {
                var inputEl = document.createElement("input");
                inputEl.setAttribute("id", index);
                inputEl.setAttribute("type","radio");
                inputEl.setAttribute("data-q-index", currentQuestionNum);
                inputEl.name = "answer";
                inputEl.value = quiz[currentQuestionNum].answers[index];
                var labelEl = document.createElement("label");
                labelEl.setAttribute("for",index);
                labelEl.textContent = quiz[currentQuestionNum].answers[index];;
                fieldsetEl.appendChild(inputEl);
                fieldsetEl.appendChild(labelEl);
                var brEl = document.createElement("br");
                fieldsetEl.appendChild(brEl);
            }
        createAnswerButton(fieldsetEl);
        }
        if(quiz[currentQuestionNum].qType==="multiple"){
            for (let index = 0; index < quiz[currentQuestionNum].answers.length; index++) {
                var inputEl = document.createElement("input");
                inputEl.setAttribute("id", index);
                inputEl.setAttribute("type","checkbox");
                inputEl.setAttribute("data-q-index", currentQuestionNum);
                inputEl.name = "answer";
                inputEl.value = quiz[currentQuestionNum].answers[index];
                var labelEl = document.createElement("label");
                labelEl.setAttribute("for",index);
                labelEl.textContent = quiz[currentQuestionNum].answers[index];;
                fieldsetEl.appendChild(inputEl);
                fieldsetEl.appendChild(labelEl);
                var brEl = document.createElement("br");
                fieldsetEl.appendChild(brEl);
            }
        createAnswerButton(fieldsetEl);
        }
        if(quiz[currentQuestionNum].qType==="true/false"){
                var inputElTrue = document.createElement("input");
                inputElTrue.setAttribute("id", "1");
                inputElTrue.setAttribute("type","radio");
                inputElTrue.setAttribute("data-q-index", currentQuestionNum);
                inputElTrue.name = "answer";
                inputElTrue.value = "true";
                var labelElTrue = document.createElement("label");
                labelElTrue.setAttribute("for","1");
                labelElTrue.textContent = "true";
                var inputElFalse = document.createElement("input");
                inputElFalse.setAttribute("id", "2");
                inputElFalse.setAttribute("type","radio");
                inputElFalse.setAttribute("data-q-index", currentQuestionNum);
                inputElFalse.name = "answer";
                inputElFalse.value = "false";
                var labelElFalse = document.createElement("label");
                labelElFalse.setAttribute("for","2");
                labelElFalse.textContent = "false";
                fieldsetEl.appendChild(inputElTrue);
                fieldsetEl.appendChild(labelElTrue);
                var brEl = document.createElement("br");
                fieldsetEl.appendChild(brEl);
                fieldsetEl.appendChild(inputElFalse);
                fieldsetEl.appendChild(labelElFalse);
                var brEl = document.createElement("br");
                fieldsetEl.appendChild(brEl);
                createAnswerButton(fieldsetEl);
        }
    }
    else{
        showResult(resultsArr);
        pEl.remove();
    }

    
};

function createAnswerButton(fieldsetEl){
    var buttonAnswer = document.createElement("button");
    buttonAnswer.setAttribute("id", "btnAnswer");
    buttonAnswer.textContent = "Answer";
    fieldsetEl.appendChild(buttonAnswer);
}

buttonStart.addEventListener("click", function(event){
    event.stopPropagation();
    if(studentNameField.value!==""){
        event.preventDefault();
        clearQuestions()
        questionsArrayGenerator();
        h1El.remove();
        formEl.remove();
        createQuestionCard(qNum++);
    }
    else alert("Please enter your name");

    
});


document.addEventListener("click",function(event){
    event.stopPropagation();
    if(event.target.id==="start"){
        if(studentNameField.value!==""){
            event.preventDefault();
            clearQuestions()
            questionsArrayGenerator();
            h1El.remove();
            formEl.remove();
            createQuestionCard(qNum);
        }
        else 
        alert("Please enter your name");
    }  
    if(event.target.id==="btnAnswer"){
        event.preventDefault();
        submitChoise();
    }
    if(event.target.id==="btnStat"){
        showStatisticAlert(JSON.parse(localStorage.getItem("results")));
    }
});    

function submitChoise(){
    var options = document.querySelectorAll("input:checked");
    if (options.length>0) {
            var questionCard = document.querySelector("form");
            var questionType = questionCard.dataset.questionType;
            var questionIndex = questionCard.dataset.questionIndex;
            var result = 0;
            if ((questionType === "single")||(questionType === "true/false")) {
                result = (options[0].value.trim()===quiz[questionIndex].correctAnswer.trim())?1:0;
                resultsArr.push(result);
                showCorrectWrongMessage(result);
            }
            if (questionType === "multiple") {
                if (options.length === quiz[questionIndex].correctAnswers.length) {
                    for (let index = 0; index < quiz[questionIndex].correctAnswers.length; index++) {
                        if(options[index].value.trim()===quiz[questionIndex].correctAnswers[index].trim()){
                            result = 1;
                        }
                        else result =  0;
                    }
                }
                else result = 0;
                resultsArr.push(result);
                showCorrectWrongMessage(result);
            }

            questionCard.remove();
            setTimeout(function(){createQuestionCard(qNum++);},500);

    }
    else alert("Select answer");
}

function showCorrectWrongMessage(result) {
    correctOrWrongEl.innerHTML = (result===1)?"Correct":"Wrong";
    setTimeout(function() {
      correctOrWrongEl.innerHTML = "";
    }, 500)
  }

function showResult(resultsArr){
    var correctAnswersCount = 0;
    resultsArr.forEach(element => {
        if(element === 1){
            correctAnswersCount++;
        }
    });
    var resultPersantage = (correctAnswersCount*100)/resultsArr.length;
    var yourResultDiv = document.createElement("div");
    yourResultDiv.setAttribute("id", "result");
    var yourResultP = document.createElement("p");
    yourResultP.textContent = "Your result is "+resultPersantage+" %";
    yourResultDiv.appendChild(yourResultP);
    body.appendChild(yourResultDiv);
    var showStatisticBtn = document.createElement("button");
    showStatisticBtn.setAttribute("id", "btnStat");
    showStatisticBtn.textContent = "Show statistic";
    body.appendChild(showStatisticBtn);
    var startAgainBtn = document.createElement("button");
    startAgainBtn.setAttribute("id", "refresh");
    startAgainBtn.setAttribute("onClick", "window.location.reload()");
    startAgainBtn.textContent = "Restart";
    var brEl = document.createElement("br");
    body.appendChild(brEl); 
    body.appendChild(startAgainBtn);

    addToSorage(studentNameField.value,resultPersantage);
}

function addToSorage(name, result){
    var statItem = {
        personName: name,
        result: result
    }
    statisticArr = (JSON.parse(window.localStorage.getItem("results")) != null) ? JSON.parse(window.localStorage.getItem("results")):[];
    
    if(statisticArr.some(obj => obj.personName === name)){
        var existingObject =  statisticArr.find(obj => obj.personName === name);
        existingObject.result = (existingObject.result<result)? result: existingObject.result;
    }
    else statisticArr.push(statItem);

    window.localStorage.setItem("results", JSON.stringify(statisticArr));
}


function showStatisticAlert(arr) {
    arr.sort((a,b) => b.result - a.result);
    var messageStat = "";
    arr.forEach(element => {
        messageStat = messageStat + "Student name: "+arr.personName +" High score: "+arr.result + "%\n";
    });
    alert(messageStat);
}