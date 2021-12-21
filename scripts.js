function addRow() {
  var table = document.getElementById("gtab");
  var totalrow = table.rows.length;
  var row = table.insertRow(totalrow - 1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var type = document.createElement("input");
  var name = document.createElement("input");
  var grade = document.createElement("input");
  type.placeholder = "class";
  name.placeholder = "new class";
  grade.placeholder = "grade";
  grade.id = "i" + totalrow - 1;
  cell1.appendChild(type);
  cell2.appendChild(name);
  cell3.appendChild(grade);
}
function removeRow() {
  var totalrow = document.getElementById("gtab").rows.length;
  if (totalrow > 7) {
    document.getElementById("gtab").deleteRow(totalrow - 2);
  } else {
    alert("Error");
  }
}
function reset() {
  var totalrow = document.getElementById("gtab").rows.length;
  while (totalrow != 7) {
    document.getElementById("gtab").deleteRow(totalrow - 2);
    totalrow--;
  }
}
function calc() {
  var table = document.getElementById("gtab");
  var totalrow = document.getElementById("gtab").rows.length,currentNum = 0;
  let totalScore = 0;
  for(var length = 0; length != totalrow;length++){
  		console.log(parseInt(document.getElementById("i" + length).value));
      totalScore += currentNum;
  }
  alert(totalScore);
}
