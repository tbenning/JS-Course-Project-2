$(function() { 
// Question data to load into Question container
    const questions = [
        {
            title: 'Question 2',
            prompt: 'How comfortable do you feel with code?',
            answers: {
                a: "Less Comfortable",
                b: "Somewhere in Between",
                c: "More Comfortable"
            },
            correctAnswer: "d",
        }
    ];
    
    // Build questions
    function buildQuestions () {
        for (let thisQuestion in questions){ 
            //Build the sidebar items
            const sidebarItem = `
                <li>
                    <img src="assets/ic-question-24.svg" class="icon"/>
                    <div class="questionTitle">
                        <h2>${questions[thisQuestion].title}</h2>
                    </div>
                </li>
            `
            //Render out items 
            $('#sidebar ul.open').append(sidebarItem);
            $('#sidebar ul.slides li:first-child').addClass('active');
            
            //Build the header of the questions
            const header = `
            <div class="question-${thisQuestion} question">
                <div class="questionHeader">
                    <h1>${questions[thisQuestion].title}</h1>
                    <p>Unanswered</p>
                </div>
                <div class="questionPrompt">
                    <p>${questions[thisQuestion].prompt}</p>
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
                    <span class="answer">${choice}. ${questionAnswers[choice]}</span>
                    <input type="radio" name="radio" value="${choice}">
                    <span class="checkmark"></span>
                </label>`
                )};

            //render out the question footer 
            const questionFooter = `
                <div class="questionFooter">
                    <button type="submit" class="submitButton">Submit</button>
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

        $(`.question-${thisQuestion} .questionHeader p`).text('Answered');
    } 

    buildQuestions();
  
    for (let thisQuestion in questions){
        // Check if a radio button is selected, then make the container class active
        $(`.question-${thisQuestion} .container`).on('click', function(){
            $(`.question-${thisQuestion} .container`).removeClass('selected');
            $(this).addClass('selected');
        });
        // Check if on submission if the answer is correct
        $(`.question-${thisQuestion} form`).on('submit', function () {
            checkAnswer(event, thisQuestion);
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