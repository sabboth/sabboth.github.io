// global definitions
var taskCount = 0;  // counts all items that ever existed (never decreases)
var tidyCount = 0;  // number of struck items on list
var initialItems = ['Add a new task','0','Cross something off','0'];
var toDoList = [];
var positionLookUp = [];

// executed script
if (localStorage.getItem("toDoListStored") === null) {
  toDoList = JSON.parse(JSON.stringify(localStorage.getItem("toDoListStored")));
} else {
  toDoList = JSON.parse(JSON.stringify(initialItems));
}
initializeList()

// functions
function initializeList() {
  var idText;
  var itemText;
  var isStruck;
  var i;
  for (i = 0; i < toDoList.length/2; i++) {
    idText = 'item' + taskCount;
    itemText = toDoList[2*i];
    isStruck = toDoList[2*i + 1];
    var itemDiv = document.createElement('div');
    itemDiv.innerHTML = itemText;
    itemDiv.setAttribute('id',idText)
    itemDiv.setAttribute('class','item')
    itemDiv.setAttribute('onclick','strike(this.id)')
    if (isStruck == 1) {
      itemDiv.style.textDecoration = 'line-through';
    }
    document.getElementById('list0').appendChild(itemDiv)
    positionLookUp.push(taskCount)
    taskCount = taskCount + 1;
  }
  localStorage.setItem('toDoListStored',JSON.stringify(toDoList))
}

function addTask() {
  var itemText = document.getElementById('textInput0');
  if (itemText.value) {
    var idText;
    idText = 'item' + taskCount;
    var div = document.createElement('div');
    div.innerHTML = itemText.value;
    div.setAttribute('id',idText)
    div.setAttribute('class','item')
    div.setAttribute('onclick','strike(this.id)')
    document.getElementById('list0').appendChild(div)
    document.getElementById('textInput0').value = '';
    var position = positionLookUp[taskCount - 1] + 1;
    positionLookUp.push(position)
    toDoList.push(itemText)
    toDoList.push('0')
    taskCount = taskCount + 1;
  }
  focusOnText()
  localStorage.setItem('toDoListStored',JSON.stringify(toDoList))
}

function strike(id) {
  var item = document.getElementById(id);
  var idNumber = id.slice(4);
  var position = positionLookUp[idNumber];
  var decor = item.style.textDecoration;
  if (decor.localeCompare('line-through')==0) {
    item.style.textDecoration = 'none';
    toDoList[2*position + 1] = '0';
    tidyCount = tidyCount - 1;
  } else {
    item.style.textDecoration = 'line-through';
    toDoList[2*position + 1] = '1';
    tidyCount = tidyCount + 1;
  }
  if (tidyCount == 0) {
    document.getElementById('tidyButton0').style.visibility = 'hidden';
  }
  else{
    document.getElementById('tidyButton0').style.visibility = 'visible';
  }
  localStorage.setItem('toDoListStored',JSON.stringify(toDoList))
}

function removeStruck() {
  var idText;
  for (i = 0; i < taskCount; i++) {
    idText = 'item' + i;
    var item = document.getElementById(idText);
    if (item != null) {
      var decor = item.style.textDecoration;
      if (decor.localeCompare('line-through')==0) {
        item.remove();
        toDoList.splice(2*positionLookUp[i],2);
        positionLookUp[i] = -1;
        for (j = i + 1; j < taskCount; j++) {
          positionLookUp[j] = positionLookUp[j] - 1;
        }
      }
    }
  }
  document.getElementById('tidyButton0').style.visibility = 'hidden';
  tidyCount = 0;
  focusOnText()
  localStorage.setItem('toDoListStored',JSON.stringify(toDoList))
}

function focusOnText() { document.getElementById('textInput0').focus() }

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

// unused code
function testAlert() { alert('This is a test alert!') }


