
(function() {
  let questions = [{
    question: "Who was the creator/lead programmer of Sonic?",
    answerChoices: ["Yuji Naka", "Akira Toriyama", "Tomoya Ohtani", "Toei"],
    rightAnswer: "Yuji Naka"
  }, {
    question: "What was the proposed name for Sonic?",
    answerChoices: ["The Blue Ball of Speed", "Mr.Needlemouse", "The Fast Weasel", "Naked Mole-Rat"],
    rightAnswer: "Mr.Needlemouse"
  }, {
    question: "At what speed does Sonic sprint/run?",
    answerChoices: ["550 MPH", "222 MPH", "1000 MPH", "767 MPH"],
    rightAnswer: "767 MPH"
  }, {
    question: "Who is Sonic's Archenemy?",
    answerChoices: [ "Frieza", "Dr.Eggman", "Dr.CrazyFace", "Shadow The Hedgehog"],
    rightAnswer: "Dr.Eggman"
  }, {
    question: "Where did Sonic grow up? ",
    answerChoices: ["Emerald Hill", "Icy Fortress", "Water City", "Rock World"],
    rightAnswer: "Emerald Hill"
  }];
  
  let questionCounter = 0; //Tracks question number
  let selections = []; //Array containing user choices
  let quiz = $('#sonicTrivia'); // sonicTrivia div object
  
  // Show initial question
  showNext();
  
  // Click handler for the 'next' button
  $('#sonicGo').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Choose an answer.');
    } else {
      questionCounter++;
      showNext();
    }
  });
  
  // Click handler for the 'sonicBack' button
  $('#sonicBack').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    showNext();
  });
  
  // Click handler for the 'sonicOver' button
  $('#sonicOver').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    showNext();
    $('#sonicOver').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    let qElement = $('<div>', {
      id: 'question'
    });
    
    let header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    let question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    let radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    let radioList = $('<ul>');
    let item;
    let input = '';
    for (let i = 0; i < questions[index].answerChoices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].answerChoices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function showNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        let nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'sonicBack' button
        if(questionCounter === 1){
          $('#sonicBack').show();
        } else if(questionCounter === 0){
          
          $('#sonicBack').hide();
          $('#sonicGo').show();
        }
      }else {
        let scoreElem = showPoints();
        quiz.append(scoreElem).fadeIn();
        $('#sonicGo').hide();
        $('#sonicBack').hide();
        $('#sonicOver').show();
      }
    });
  }
  
  // Adds the points and returns a paragraph element to be displayed
  function showPoints() {
    let score = $('<p>',{id: 'question'});
    
    let numCorrect = 0;
    for (let i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].rightAnswer) {
        numCorrect++;
      }
    }
    score.append('You have gathered ' + numCorrect + ' rings out of ' +  questions.length);
    return score;
  }
})();