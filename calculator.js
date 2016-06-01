/*
  Run:  calculator("2 * (3.5 + 4) * 5 +((2 *3)/4+ 7)");
*/
function calculator(str) {
    // String to Array
    var myArr = strToArr(str);
    // Calculating
    resArr = processArifmetic(myArr);
    return resArr;
}

function strToArr(str) {
  var arr = [];
  var arrSimbol = ["+","-","/","*","(",")"];
  var elm = "";
  for (var i = 0; i < str.length; i++) {
    var flag=false;
    if(str[i] >= "0" && str[i] <= "9" || str[i] == "."){
      elm +=str[i];
      flag = true;
    } else if (elm.length > 0) {
        arr.push(Number(elm));
        elm = "";
    } 
    if(arrSimbol.indexOf(str[i]) > -1) {
      arr.push(str[i]);
      flag = true;
    }
    if(str[i] != " " && !flag ){
      throw new Error(str[i] + " - this isn't number or operation");
    }
  }
  if (elm.length > 0) {
    arr.push(Number(elm));
  } 
  if(arr.length == 0){
    throw new Error("This isn't formula!");
  }
  return arr;
}

//recursive function
function processArifmetic(elements) {
  var copyArray = elements.slice();
  var q1 = copyArray.indexOf("(");
  var q2 = copyArray.indexOf(")");
  if(q2 == -1){ 
    if (copyArray.indexOf("(") != -1){
      throw new Error("Qoutes doesn't double");
    }
    return arifmetic(copyArray);
  }

  if (q1!=-1 && q1<q2) {
    for (var i = q2; i < copyArray.length; i--) {
      if(copyArray[i] == "("){
        var e = copyArray.slice(i+1, q2);
        var res = arifmetic(e);
        copyArray.splice(i, q2-i+1, res);
        //recursive
        return processArifmetic(copyArray);
      }
    }
  } else {
    throw new Error("Qoutes doesn't double");
  }
}

function arifmetic(elements) {
  var multiplied = calcPriority(elements);
  var result = 0;
  if(multiplied[0] == "+" || multiplied[0] == "-"){
    result = calc(result, multiplied[1], multiplied[0]);
  } else {
    result = multiplied[0];
  }
  for (var i = 1; i < multiplied.length; i++) {
    if(multiplied[i] == "+" || multiplied[i] == "-"){
      result = calc(result, multiplied[i+1], multiplied[i]);
    }
  }
  return result;
}

function calcPriority(elements){
  var copyArray = elements.slice();
  for (var i = 0; i < copyArray.length; i++) {
    if(copyArray[i] == "*" || copyArray[i] == "/"){
      var res = calc(copyArray[i-1], copyArray[i+1], copyArray[i]);
      copyArray[i] = res;
      copyArray[i-1] = null;
      copyArray[i+1] = null;
      var resultArr = copyArray.filter(clearNull);
      return calcPriority(resultArr);
    }
  }
  return copyArray;
}

function clearNull(value) {
  return value != null;
}

function calc(x,y,opr) {
  var result = null;
  if(opr.length != 1 || typeof x != "number" || typeof y != "number") {
    var message = "";
    if ( typeof x != "number"){
      message += 'typeof x: '+ x + ' is '+(typeof x)+' must be number ';
    }
    if ( typeof y != "number"){
      message += 'typeof y:'+y + ' is '+(typeof y)+' must be number ';
    }
    if ( opr.length != 1){
      message += 'opr.length != 1: opr is '+opr;
    }
    throw new Error(message);
  }
  switch(opr) {
    case "*": result = x * y; break; 
    case "/": result = x / y; break; 
    case "+": result = x + y; break;
    case "-": result = x - y; break;
  }
  return result;
}


