// global definitions
var task_count = 0;  // counts all items that ever existed (never decreases)
var tidy_count = 0;  // number of struck items on list
var initial_items = ['Add a new task', 'Cross something off'];

// functions
function initialize_list(){
  var id_text;
  var item_text;
  var nInit = initial_items.length;
  var i;
  for (i = 0; i < nInit; i++){
    task_count = task_count + 1;
    id_text = 'item'.concat(task_count.toString(10));
    item_text = initial_items[i];
    var item_div = document.createElement('div');
    item_div.innerHTML = item_text;
    item_div.setAttribute('id',id_text)
    item_div.setAttribute('class','item')
    item_div.setAttribute('onclick','strike(this.id)')
    document.getElementById('list0').appendChild(item_div);
  }
  // initialize_date();
}

function initialize_date(){
  var list_head = document.getElementById('list_head0');
  var head_text = list_head.innerHTML;
  var days_of_week = ['Sun ', 'Mon ', 'Tue ', 'Wed ', 'Thu ', 'Fri ', 'Sat '];
  var months_of_year = [' Jan ', ' Feb ', ' Mar ', ' Apr ', ' May ', ' Jun ', ' Jul ', ' Aug ', ' Sep ', ' Oct ', ' Nov ', ' Dec '];
  var n = new Date();
  var y = n.getFullYear();
  var m = n.getMonth();
  var d = n.getDate();
  var day = n.getDay();
  var date_string = days_of_week[day].concat(d.toString(10),months_of_year[m],y.toString(10));
  if (head_text.localeCompare(date_string)==0){
    list_head.innerHTML = 'To do';
  } else{
    list_head.innerHTML = date_string;
  }
}

function clear_text(){
  var item = document.getElementById('text_input0');
  var val = item.value;
  if (val.localeCompare('New task')==0){
    item.value = '';
  }
}

function remove_struck(){
  var id_text;
  for (i = 1; i < task_count + 1; i++){
    id_text = 'item'.concat(i.toString(10));
    var item = document.getElementById(id_text);
    if (item != null){
      var decor = item.style.textDecoration;
      if (decor.localeCompare('line-through')==0){
        item.remove();
      }
    }
  }
  document.getElementById('tidy_button0').style.visibility = 'hidden';
  tidy_count = 0;
  focus_on_text()
}

function focus_on_text(){ document.getElementById('text_input0').focus(); }

function add_task(){
  var item_text = document.getElementById('text_input0');
  if (item_text.value){
    task_count = task_count + 1;
    var id_text;
    id_text = 'item'.concat(task_count.toString(10));
    var div = document.createElement('div');
    div.innerHTML = item_text.value;
    div.setAttribute('id',id_text)
    div.setAttribute('class','item')
    div.setAttribute('onclick','strike(this.id)')
    document.getElementById('list0').appendChild(div);
    document.getElementById('text_input0').value = '';
  }
  focus_on_text()
}

function strike(id){
  var item = document.getElementById(id);
  var decor = item.style.textDecoration;
  if (decor.localeCompare('line-through')==0){
    item.style.textDecoration = 'none';
    tidy_count = tidy_count - 1;
  } else {
    item.style.textDecoration = 'line-through';
    tidy_count = tidy_count + 1;
  }
  if (tidy_count == 0){
    document.getElementById('tidy_button0').style.visibility = 'hidden';
  }
  else{
    document.getElementById('tidy_button0').style.visibility = 'visible';
  }
}

// unused code
function test_alert(){ alert('This is a test alert!'); }


