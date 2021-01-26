// global definitions
var taskCount = 0;  // counts all items that ever existed (never decreases)
var tidyCount = 0;  // number of struck items on list
var initialItems = ['Add a new task', 'Cross something off'];

// functions
function initializeList() {
  var idText;
  var itemText;
  var i;
  for (i = 0; i < initialItems.length; i++) {
    taskCount = taskCount + 1;
    idText = 'item' + taskCount;
    itemText = initialItems[i];
    var itemDiv = document.createElement('div');
    itemDiv.innerHTML = itemText;
    itemDiv.setAttribute('id',idText)
    itemDiv.setAttribute('class','item')
    itemDiv.setAttribute('onclick','strike(this.id)')
    document.getElementById('list0').appendChild(itemDiv);
  }
  // initializeDate();
}

function initializeDate() {
  var listHead = document.getElementById('listHead0');
  var headText = listHead.innerHTML;
  let DAYS_OF_WEEK = ['Sun ', 'Mon ', 'Tue ', 'Wed ', 'Thu ', 'Fri ', 'Sat '];
  let MONTHS_OF_YEAR = [' Jan ', ' Feb ', ' Mar ', ' Apr ', ' May ', ' Jun ', ' Jul ', ' Aug ', ' Sep ', ' Oct ', ' Nov ', ' Dec '];
  var n = new Date();
  var y = n.getFullYear();
  var m = n.getMonth();
  var d = n.getDate();
  var day = n.getDay();
  var dateString = DAYS_OF_WEEK[day] + d + MONTHS_OF_YEAR[m] + y;
  if (headText.localeCompare(dateString)==0) {
    listHead.innerHTML = 'To do';
  } else {
    listHead.innerHTML = dateString;
  }
}

function clearText() {
  var item = document.getElementById('textInput0');
  var val = item.value;
  if (val.localeCompare('New task')==0) {
    item.value = '';
  }
}

function removeStruck() {
  var idText;
  for (i = 1; i < taskCount + 1; i++) {
    idText = 'item' + i;
    var item = document.getElementById(idText);
    if (item != null) {
      var decor = item.style.textDecoration;
      if (decor.localeCompare('line-through')==0) {
        item.remove();
      }
    }
  }
  document.getElementById('tidyButton0').style.visibility = 'hidden';
  tidyCount = 0;
  focusOnText()
}

function focusOnText() { document.getElementById('textInput0').focus(); }

function addTask() {
  var itemText = document.getElementById('textInput0');
  if (itemText.value) {
    taskCount = taskCount + 1;
    var idText;
    idText = 'item' + taskCount;
    var div = document.createElement('div');
    div.innerHTML = itemText.value;
    div.setAttribute('id',idText)
    div.setAttribute('class','item')
    div.setAttribute('onclick','strike(this.id)')
    document.getElementById('list0').appendChild(div);
    document.getElementById('textInput0').value = '';
  }
  focusOnText()
}

function strike(id) {
  var item = document.getElementById(id);
  var decor = item.style.textDecoration;
  if (decor.localeCompare('line-through')==0) {
    item.style.textDecoration = 'none';
    tidyCount = tidyCount - 1;
  } else {
    item.style.textDecoration = 'line-through';
    tidyCount = tidyCount + 1;
  }
  if (tidyCount == 0) {
    document.getElementById('tidyButton0').style.visibility = 'hidden';
  }
  else{
    document.getElementById('tidyButton0').style.visibility = 'visible';
  }
}

// unused code
function testAlert() { alert('This is a test alert!'); }


