// global definitions
var task_count = 0; // counts all items that ever existed (never decreases)
var tidy_count = 0; // number of struck items on list
var initial_items = ["Add a new task", "Cross something off"]

// functions
function initialize_list(){
  var id_text0 = 'item';
  var id_text;
  var item_text0 = 'Item ';
  var item_text;
  var nInit = initial_items.length;
  var i;
  for (i = 0; i < nInit; i++){
    task_count = task_count + 1;
    id_text = id_text0.concat(task_count.toString(10));
    item_text = initial_items[i];
    var div = document.createElement("div");
    div.innerHTML = item_text;
    div.setAttribute('id',id_text)
    div.setAttribute('class','item')
    div.setAttribute('onclick','strike(this.id)')
    document.getElementById('list0').appendChild(div);
  }
}

function clear_text(){
  var item1 = document.getElementById('text_input0');
  let str1 = 'New task';
  var val = item1.value;
  if (val.localeCompare(str1)==0){
    item1.value = '';
  }
}

function remove_struck(){
  var task_count1 = task_count;
  var id_text0 = 'item';
  var id_text;
  for (i = 1; i < task_count1 + 1; i++){
    id_text = id_text0.concat(i.toString(10));
    var item1 = document.getElementById(id_text);
    if (item1 != null){
      let str1 = 'line-through';
      var decor = item1.style.textDecoration;
      if (decor.localeCompare(str1)==0){
        item1.remove();
      }
    }
  }
  document.getElementById('tidy_button0').style.visibility = 'hidden';
  tidy_count = 0;
}

function add_task(){
  var item_text = document.getElementById('text_input0');
  if (item_text.value){
    task_count = task_count + 1;
    var id_text0 = 'item';
    var id_text;
    id_text = id_text0.concat(task_count.toString(10));
    var div = document.createElement('div');
    div.innerHTML = item_text.value;
    div.setAttribute('id',id_text)
    div.setAttribute('class','item')
    div.setAttribute('onclick','strike(this.id)')
    document.getElementById('list0').appendChild(div);
    document.getElementById('text_input0').value = '';
  }
}

function function1(id){
  document.getElementById(id).style.textDecoration = 'line-through';
}

function strike(id){
  var item1 = document.getElementById(id);
  let str1 = 'line-through';
  var decor = item1.style.textDecoration;
  if (decor.localeCompare(str1)==0){
    item1.style.textDecoration = 'none';
    tidy_count = tidy_count - 1;
  } else {
    item1.style.textDecoration = 'line-through';
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
function test_alert(){
  alert('This is a test alert!');
}


