document.getElementById('foodInputForm').addEventListener('submit', saveChoice);

function saveChoice(e) {
  var name = document.getElementById('nameInput').value;
  var foodChoice = document.getElementById('foodInput').value;
  var quantity = document.getElementById('quantityInput').value;
  var choiceId = chance.guid();
  var choiceStatus = 'Pending';

  var choice = {
    id: choiceId,
    name: name,
    foodChoice: foodChoice,
    quantity: quantity,
    status: choiceStatus
  }

  if (localStorage.getItem('choices') == null) {
    var choices = [];
    choices.push(choice);
    localStorage.setItem('choices', JSON.stringify(choices));
  } else {
    var choices = JSON.parse(localStorage.getItem('choices'));
    choices.push(choice);
    localStorage.setItem('choices', JSON.stringify(choices));
  }

  document.getElementById('foodInputForm').reset();

  fetchIssues();

  e.preventDefault();
}

function setStatusClosed(id) {
  var choices = JSON.parse(localStorage.getItem('choices'));

  for (var i = 0; i < choices.length; i++) {
    if (choices[i].id == id) {
      choices[i].status = 'Closed';
    }
  }

  localStorage.setItem('choices', JSON.stringify(choices));

  fetchIssues();
}

function deleteIssue(id) {
  var choices = JSON.parse(localStorage.getItem('choices'));

  for (var i = 0; i < choices.length; i++) {
    if (choices[i].id == id) {
      choices.splice(i, 1);
    }
  }

  localStorage.setItem('choices', JSON.stringify(choices));

  fetchIssues();
}

function fetchIssues() {
  var choices = JSON.parse(localStorage.getItem('choices'));
  var foodChoiceList = document.getElementById('foodChoiceList');

  foodChoiceList.innerHTML = '';

  for (var i = 0; i < choices.length; i++) {
    var id = choices[i].id;
    var name = choices[i].name;
    var foodChoice = choices[i].foodChoice;
    var quantity = choices[i].quantity;
    var status = choices[i].status;

    foodChoiceList.innerHTML +=   '<div class="well">'+
                              '<h6>Issue ID: ' + id + '</h6>'+
                              '<p><span class="label label-info">' + status + '</span></p>'+
                              '<h3>' + quantity + '</h3>'+
                              '<p><span class="glyphicon glyphicon-time"></span> ' + foodChoice + '</p>'+
                              '<p><span class="glyphicon glyphicon-user"></span> ' + name + '</p>'+
                              '<a href="#" onclick="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a> '+
                              '<a href="#" onclick="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                              '</div>';
  }
}
