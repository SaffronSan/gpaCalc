function addRow() {
  var table = document.getElementById("gtab"),
  totalrow = table.rows.length,
  row = table.insertRow(totalrow - 1),
  cell1 = row.insertCell(0),
  cell2 = row.insertCell(1),
  cell3 = row.insertCell(2),
  type = document.createElement("select"),
  name = document.createElement("input"),
  grade = document.createElement("input"),
  a = document.createElement("option"),
  b = document.createElement("option"), 
  c = document.createElement("option");
  a.text = "AP";
  b.text = "HR";
  c.text = "None";
  a.value = "AP";
  b.value = "HR";
  c.value = "None";
  type.options.add(a, 0);
  type.options.add(b, 1);
  type.options.add(c, 2);
  name.placeholder = "new class";
  grade.placeholder = "grade";
  name.className = "name";
  type.id = "t" + (totalrow - 3);
  name.id = "n" + (totalrow - 3);
  grade.id = "i" + (totalrow - 3);
  cell1.appendChild(type);
  cell2.appendChild(name);
  cell3.appendChild(grade);
}
function removeRow() {
  var totalrow = document.getElementById("gtab").rows.length;
  if (totalrow > 6) {
    document.getElementById("gtab").deleteRow(totalrow - 2);
  } else {
    alert("Error");
  }
}
function reset() {
  var totalrow = document.getElementById("gtab").rows.length,
  len = 0;
  while (totalrow != 6) {
    document.getElementById("gtab").deleteRow(totalrow - 2);
    totalrow--;
  }
  document.getElementById("n0").value = "History";
  document.getElementById("n1").value = "Math";
  document.getElementById("n2").value = "ELA";
  document.getElementById("i0").value = "97";
  document.getElementById("i1").value = "97";
  document.getElementById("i2").value = "90";
  let select1 = document.getElementById("t1"),
  select2 = document.getElementById("t2");
  select1.selectedIndex = 1;
  select2.selectedIndex = 2;
}
function bonusFinder(type){
  type = type.toLowerCase();
  if(type == "ap"){
    return 1;
  }else if(type == "hr"){
    return .5;
  }else{
    return 0;
  }
}
function creditsFinder(grade){
  if(grade >= 90){
    return 4;
  }else if(grade >= 80){
    return 3;
  }else if(grade >= 70){
    return 2;
  }else if(grade >= 60){
    return 1;
  }else{
    return 0;
  }
}
function calc() {
  let totalrow = document.getElementById("gtab").rows.length,
    totalScore = 0, currentNum = 0, length = 0,
    gpaScore = 0, cType = "n", bonus = 0,
    result = document.getElementsByClassName("result");
  while (length < totalrow) {
    currentNum = parseInt(document.getElementById("i" + length).value);
    gpaScore += creditsFinder(currentNum);
    bonus = bonusFinder(dropFinder(length));
    gpaScore += bonus;
    totalScore += currentNum;
    length++;
    if (length == totalrow - 3) {
      break;
    }
  }
  totalScore /= length;
  gpaScore /= length;
  totalScore = Math.round(totalScore);
  gpaScore = Math.round(gpaScore * 100) / 100;
  document.getElementById("ave").innerHTML = totalScore;
  document.getElementById("gpa").innerHTML = gpaScore;
  //result.style.color = "black"; This don't work on replit
}
function dropFinder(len){
  let select = document.getElementById("t" + len);
  let index = select.selectedIndex;
  return select.options[index].value;
}
