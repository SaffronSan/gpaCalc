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
    c = document.createElement("option"),
    mode = document.getElementById("mode"), ind = mode.selectedIndex,
    choice = mode.options[ind].value.toLowerCase();
  if (choice == "gpa") {
    a.text = "AP";
    b.text = "HR";
    c.text = "None";
    a.value = "AP";
    b.value = "HR";
    c.value = "None";
    name.placeholder = "new class";
  } else {
    a.text = "Perform";
    b.text = "Rehearse";
    c.text = "Prepare";
    a.value = "Perform";
    b.value = "Rehearse";
    c.value = "Prepare";
    name.placeholder = "new assigment";
  }
  grade.placeholder = "grade";
  type.options.add(a, 0);
  type.options.add(b, 1);
  type.options.add(c, 2);
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
  let totalrow = document.getElementById("gtab").rows.length, mode = document.getElementById("mode"), ind = mode.selectedIndex,
    choice = mode.options[ind].value.toLowerCase(),
    len = 0;
  while (totalrow != 6) {
    document.getElementById("gtab").deleteRow(totalrow - 2);
    totalrow--;
  }
  if (choice == "gpa") {
    document.getElementById("n0").value = "History";
    document.getElementById("n1").value = "Math";
    document.getElementById("n2").value = "ELA";
    document.getElementById("i0").value = "97";
    document.getElementById("i1").value = "97";
    document.getElementById("i2").value = "90";
  } else if (choice == "final") {
    document.getElementById("n0").value = "Project";
    document.getElementById("n1").value = "Quiz";
    document.getElementById("n2").value = "Home work";
    document.getElementById("i0").value = "90";
    document.getElementById("i1").value = "80";
    document.getElementById("i2").value = "100";
  }
  let select1 = document.getElementById("t1"),
    select2 = document.getElementById("t2");
  select1.selectedIndex = 1;
  select2.selectedIndex = 2;
}
function bonusFinder(type) {
  type = type.toLowerCase();
  if (type == "ap") {
    return 1;
  } else if (type == "hr") {
    return .5;
  } else {
    return 0;
  }
}
function creditsFinder(grade) {
  if (grade >= 90) {
    return 4;
  } else if (grade >= 80) {
    return 3;
  } else if (grade >= 70) {
    return 2;
  } else if (grade >= 60) {
    return 1;
  } else {
    return 0;
  }
}
function checkNull() {
  let maxRow = totalrow = document.getElementById("gtab").rows.length - 3, len = 0, currGrade = 0;
  while (len != maxRow) {
    currGrade = document.getElementById("i" + len).value;
    console.log(currGrade);
    if (currGrade == "") {
      len++;
      alert("Must enter grade\nNo Grade found on line " +
        len);
      return true;
    }
    len++;
  }
  return false;
}
function gpaCalc() {
  let totalrow = document.getElementById("gtab").rows.length,
    totalScore = 0, currentNum = 0, length = 0,
    gpaScore = 0, cType = "n", bonus = 0,
    result = document.getElementsByClassName("result");
  document.getElementById("gradeTitle").textContent = "GPA";
  if (!checkNull()) {
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
  }
  //result.style.color = "black"; This don't work on replit
}
function dropFinder(len) {
  let select = document.getElementById("t" + len);
  let index = select.selectedIndex;
  return select.options[index].value;
}
function evaluateProb() {
  var mode = document.getElementById("mode"), ind = mode.selectedIndex,
    choice = mode.options[ind].value.toLowerCase();
  if (choice == "gpa") {
    gpaCalc();
  } else {
    finalCalc();
  }
}
function findAmount(type) {
  let totalrow = document.getElementById("gtab").rows.length - 3, totalType = 0;
  for (let count = 0; count != totalrow; count++) {
    if (dropFinder(count) == type) {
      totalType++;
    }
  }
  return totalType;
}
function finalCalc() {
  let totalrow = document.getElementById("gtab").rows.length - 3,
    prepare = 0, perform = 0, rehearse = 0,
    currentType, total = 0, aveGrade = 0;
  document.getElementById("gradeTitle").textContent = "Final Grade";
  if (!checkNull()) {
    for (var count = 0; totalrow != count; count++) {
      currentType = dropFinder(count);
      if (currentType == "Perform") {
        perform += parseInt(document.getElementById("i" + count).value);
      } else if (currentType == "Rehearse") {
        rehearse += parseInt(document.getElementById("i" + count).value);
      } else if (currentType == "Prepare") {
        prepare += parseInt(document.getElementById("i" + count).value);
      }
      aveGrade += parseInt(document.getElementById("i" + count).value);
    }
    prepare /= findAmount("Prepare");
    rehearse /= findAmount("Rehearse");
    perform /= findAmount("Perform");
    prepare = Math.round(prepare * 100) / 100;
    rehearse = Math.round(rehearse * 100) / 100;
    perform = Math.round(perform * 100) / 100;
    total = (prepare * .2) + (rehearse * .3) + (perform * .5);
    console.log("prepare: " + prepare + "\nRehearse: " + rehearse + "\nPerform: " + perform + "\ntotal " + total);
    aveGrade = Math.round((aveGrade / totalrow) * 100) / 100;
    document.getElementById("gpa").innerHTML = total;
    document.getElementById("ave").innerHTML = aveGrade;
  }
}
function modeSet() {
  let mode = document.getElementById("mode"), ind = mode.selectedIndex,
    choice = mode.options[ind].value.toLowerCase(),
    ltype = document.getElementById("type"),
    lname = document.getElementById("name"),
    utype = document.getElementById(""),
    uname = document.getElementById(""),
    uselect = document.getElementById(""),
    newOption;
  if (choice == "final") {
    ltype.textContent = "Work Type";
    lname.textContent = "Work Name";
    for (let ind = 0; ind != 3; ind++) {
      uselect = document.getElementById("t" + ind);
      uselect.remove(0);
      uselect.remove(1);
      newOption = document.createElement("option");
      newOption.text = "Perform";
      newOption.value = "Perform";
      uselect.add(newOption, uselect[0]);
      uselect.remove(1);
      newOption = document.createElement("option");
      newOption.text = "Rehearse";
      newOption.value = "Rehearse";
      uselect.add(newOption);
      newOption = document.createElement("option");
      newOption.text = "Prepare";
      newOption.value = "Prepare";
      uselect.add(newOption);
    }
    console.log("final");
  } else if (choice == "gpa") {
    ltype.textContent = "Class\nType";
    lname.textContent = "Class Name";
    for (let ind = 0; ind != 3; ind++) {
      uselect = document.getElementById("t" + ind);
      uselect.remove(0);
      uselect.remove(1);
      newOption = document.createElement("option");
      newOption.text = "AP";
      newOption.value = "AP";
      uselect.add(newOption, uselect[0]);
      uselect.remove(1);
      newOption = document.createElement("option");
      newOption.text = "HR";
      newOption.value = "HR";
      uselect.add(newOption);
      newOption = document.createElement("option");
      newOption.text = "None";
      newOption.value = "None";
      uselect.add(newOption);
    }
    console.log("gpa");
  }
  reset();
}
