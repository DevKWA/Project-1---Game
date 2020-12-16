
(function() {
  let questions = [{
    question: "Who was the creator/lead programmer of Sonic?",
    answerChoices: ["Yuji Naka", "Akira Toriyama", "Tomoya Ohtani", "Toei"],
    rightAnswer: 0
  }, {
    question: "What was the proposed name for Sonic?",
    answerChoices: ["The Blue Ball of Speed", "Mr.Needlemouse", "The Fast Weasel", "Naked Mole-Rat"],
    rightAnswer: 1
  }, {
    question: "At what speed does Sonic sprint/run?",
    answerChoices: ["550 MPH", "222 MPH", "1000 MPH", "767 MPH"],
    rightAnswer: 3
  }, {
    question: "Who is Sonic's Archenemy?",
    answerChoices: [ "Frieza", "Dr.Eggman", "Dr.CrazyFace", "Shadow The Hedgehog"],
    rightAnswer: 1
  }, {
    question: "Where did Sonic grow up? ",
    answerChoices: ["Emerald Hill", "Icy Fortress", "Water City", "Rock World"],
    rightAnswer: 0
  }, 
    
 
  


];
  
  let questionUpticker = 0; //Tracks question number
  let options = []; //Array containing user choices
  let sonicQuiz = $('#sonicTrivia'); // sonicTrivia div object
  
  // Show initial question
  showNext();
  
  // Click handler for the 'next' button
  $('#sonicGo').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(sonicQuiz.is('animation')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(options[questionUpticker])) {
      alert('Choose an answer.');
    } else {
      questionUpticker++;
      showNext();
    }
  });
  
  // Click handler for the 'sonicBack' button
  $('#sonicBack').on('click', function (e) {
    e.preventDefault();
    
    if(sonicQuiz.is('animation')) {
      return false;
    }
    choose();
    questionUpticker--;
    showNext();
  });
  
  // Click handler for the 'sonicOver' button
  $('#sonicOver').on('click', function (e) {
    e.preventDefault();
    
    if(sonicQuiz.is('animation')) {
      return false;
    }
    questionUpticker = 0;
    options = [];
    showNext();
    $('#sonicOver').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('cursorenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('cursorleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and  the answer options
  function createQuestionElement(index) {
    let questionElement = $('<div>', {
      id: 'question'
    });
    
    let headerOfSonic = $('<h3>Question ' + (index + 1) + ':</h3>');
    questionElement.append(headerOfSonic);
    
    let questionsOfSonic = $('<p>').append(questions[index].question);
    questionElement.append(questionsOfSonic);
    
    let radioButtonsOfSonic = createRadioInputs(index);
    questionElement.append(radioButtonsOfSonic);
    
    return questionElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadioInputs(index) {
    let radioList = $('<ul>');
    let sonicItem;
    let input = '';
    for (let i = 0; i < questions[index].answerChoices.length; i++) {
      sonicItem = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].answerChoices[i];
      sonicItem.append(input);
      radioList.append(sonicItem);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    options[questionUpticker] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function showNext() {
  sonicQuiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionUpticker < questions.length){
        let nextQuestion = createQuestionElement(questionUpticker);
        sonicQuiz.append(nextQuestion).fadeIn();
        if (!(isNaN(options[questionUpticker]))) {
          $('input[value='+options[questionUpticker]+']').prop('checked', true);
        }
        
        // Controls display of 'sonicBack' button
        if(questionUpticker === 1){
          $('#sonicBack').show();
        } else if(questionUpticker === 0){
          
          $('#sonicBack').hide();
          $('#sonicGo').show();
        }
      }else {
        let pointElem = showPoints();
        sonicQuiz.append(pointElem).fadeIn();
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
    for (let i = 0; i < options.length; i++) {
      if (options[i] === questions[i].rightAnswer) {
        numCorrect++;
      }
    }
    score.append('You have gathered ' + numCorrect + ' rings out of ' +  questions.length);
    return score;
  }
})();