// Data to fetch 
const questions = [
    {
        title: 'Question 2',
        prompt: 'How comfortable are you with programming?',
        answers: {
            a: "Less Comfortable",
            b: "Somewhere in Between",
            c: "More Comfortable"
        },
        correctAnswer: "d",
    }
];

$(function() { 
    // Build questions
    function buildQuestions () {
        for (let thisQuestion in questions){ 
            //Build the sidebar items
            const sidebarItem = `
                <li>
                    <img src="assets/ic-question-24.svg" class="icon"/>
                    <div class="questionTitle sidebar-${thisQuestion}">
                        <h2>${questions[thisQuestion].title}</h2>
                        <span class="submissionStatus">Unanswered</span>
                    </div>
                </li>
            `
            //Render out items 
            $('#sidebar ul.open').append(sidebarItem);
            $('#sidebar ul.open li:first-child').addClass('active');
            
            //Build the header of the questions
            const header = `
            <div class="question-${thisQuestion} question">
                <div class="questionHeader">
                    <img src="assets/ic-question-24.svg" class="icon"/>
                    <h1>${questions[thisQuestion].title}</h1>
                </div>
                <div class="questionPrompt">
                    <p class="prompt">${questions[thisQuestion].prompt}</p>
                    <form action="" class="questionForm"></form>
                </div>
            </div>   
            `
            //Render out the heading and question 
            $('#questionContainer').append(header);

            // Make an array of answers for thisQuestion
            const questionAnswers = questions[thisQuestion].answers;
            
            //render out all the answers 
            for (choice in questionAnswers){
                $('.question-' + thisQuestion + ' .questionForm').append(`
                <label class="container">
                    <span class="answer"><span class="answerLetter">${choice}</span> ${questionAnswers[choice]}</span>
                    <input type="radio" name="radio" value="${choice}">
                    <span class="checkmark"></span>
                </label>`
                )};

            //render out the question footer 
            const questionFooter = `
                <div class="questionFooter">
                    <button type="submit" class="submitButton">Submit</button>
                    <p class="answerStatus">Unanswered</p>
                </div>`;
            $(`.question-${thisQuestion} .questionForm`).append(questionFooter);
        };
    }

 
    function checkAnswer (event, thisQuestion) {
        //Prevent default behaviour
        event.preventDefault();
       
        // Assign the user answer from the input
        let userAnswer = $(`.question-${thisQuestion} input[name=radio]:checked`).val();

        // Assign the correct answer 
        const correctAnswer = questions[thisQuestion].correctAnswer;
        if (userAnswer == correctAnswer) {
            //alert('✅ Congrats! You have the correct answer!')
        } else {
            //alert('❌ Whoops! Looks like you\'re incorrect. Try again.')           
        }   




        // Make question appear "answered" 
        $(`.question-${thisQuestion} .questionFooter p`).html(`Answered`);
        $(`.question-${thisQuestion} .questionFooter p`).addClass('answered');
        $(`.sidebar-${thisQuestion}`).addClass('answered');
        $(`.sidebar-${thisQuestion} .submissionStatus`).text(`Answered`);
        $(`.question-${thisQuestion} button`).addClass('disabled')
        
    } 

    buildQuestions();
  
    for (let thisQuestion in questions){
        // Check if a radio button is selected, then make the container class active
        $(`.question-${thisQuestion} .container`).on('click', function(){
            $(`.question-${thisQuestion} .container`).removeClass('selected');
            $(this).addClass('selected');
            $(`.question-${thisQuestion} button`).removeClass('disabled');
        });
        // Check if on submission if the answer is correct
        $(`.question-${thisQuestion} form`).on('submit', function () {
            checkAnswer(event, thisQuestion);
            $(`.question-${thisQuestion} .container.answered`).removeClass('answered');
            $('.selected', this).addClass('answered');
           
        });
    }

    // Listen if a list item in the sidebar is clicked, if so add a class "active"
    $('#sidebar li').on('click', function() {
        console.log('sidebar clicked');
        // Check all the items and remove classes
        $('#sidebar li ').removeClass('active');
        // Add class to this item that was clicked
        $(this).addClass('active');
        console.log(this);
    });

});