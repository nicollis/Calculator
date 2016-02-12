var stored_var = null;
var on_display;
var stored_op = null;
var dec_place = -1;
var is_new = true; //helps reset display to 0 once a new number is entered after an operator is hit

var buttonEnum = {
  AC: 0,
  CE: 1,
  DIV: 2,
  MUL: 3,
  MIN: 4,
  PLU: 5,
  EQU: 6,
  DEC: 7,
  PER: 8
};

function init() {
  //Wire up operator buttons to function
  $("#ac").click(function(event) {
    onOperator(buttonEnum.AC)
  });
  $("#ce").click(function(event) {
    onOperator(buttonEnum.CE)
  });
  $("#per").click(function(event) {
    onOperator(buttonEnum.PER)
  });
  $("#div").click(function(event) {
    onOperator(buttonEnum.DIV)
  });
  $("#mul").click(function(event) {
    onOperator(buttonEnum.MUL)
  });
  $("#min").click(function(event) {
    onOperator(buttonEnum.MIN)
  });
  $("#plu").click(function(event) {
    onOperator(buttonEnum.PLU)
  });
  $("#dec").click(function(event) {
    onOperator(buttonEnum.DEC)
  });
  $("#equ").click(function(event) {
    onOperator(buttonEnum.EQU)
  });
  //Wire up numbers to funcation
  $("#0").click(function(event) {
    onNumber(0)
  });
  $("#1").click(function(event) {
    onNumber(1)
  });
  $("#2").click(function(event) {
    onNumber(2)
  });
  $("#3").click(function(event) {
    onNumber(3)
  });
  $("#4").click(function(event) {
    onNumber(4)
  });
  $("#5").click(function(event) {
    onNumber(5)
  });
  $("#6").click(function(event) {
    onNumber(6)
  });
  $("#7").click(function(event) {
    onNumber(7)
  });
  $("#8").click(function(event) {
    onNumber(8)
  });
  $("#9").click(function(event) {
    onNumber(9)
  });
  on_display = $("#screen").text();
}

function onNumber(num) {
  if (is_new == true) {
    on_display = 0;
    is_new = false;
  }
  if (on_display.toString().length >= 8) { //keeps value within screen
    return;
  }
  if (on_display == 0) {
    on_display = num;
  } else if (dec_place !== -1) {
    dec_place *= 10;
    on_display = +(on_display + num / dec_place).toFixed(dec_place.toString().length);
  } else {
    on_display = on_display * 10 + num;
  }

  updateDisplay();
}

function onOperator(op) {
  //Percent has to be handled before following mathIt function fires to chance calulated value to percent
  if (op == buttonEnum.PER) { //Percent logic based off Microsoft Calculator logic
    if (stored_var !== null && stored_op !== null) {
      on_display = mathIt(stored_var, on_display, buttonEnum.PER);
      onOperator(buttonEnum.EQU);
      return;
    } else {
      on_display = 0;
    }
  }
  //If operator is already set calculate
  if (stored_var !== null && stored_op !== null) {
    //Calculate stored OP before setting new one
    on_display = mathIt(stored_var, on_display, stored_op);
  }
  //Handle operator changes and flags
  switch (op) {
    case buttonEnum.AC: //Clear All
      on_display = 0;
      stored_var = null;
      dec_place = -1;
      stored_op = null;
      break;
    case buttonEnum.CE: //Clear Entery
      on_display = 0;
      dec_place = -1;
      break;
    case buttonEnum.DEC: //Add Decimal
      dec_place = 1;
      break;
    case buttonEnum.PLU: //Addition
      //Store whats on the display
      stored_var = on_display;
      stored_op = buttonEnum.PLU;
      is_new = true;
      break;
    case buttonEnum.MIN: //Subtraction
      //Store whats on the display
      stored_var = on_display;
      stored_op = buttonEnum.MIN;
      is_new = true;
      break;
    case buttonEnum.MUL: //Multiply
      //Store whats on the display
      stored_var = on_display;
      stored_op = buttonEnum.MUL;
      is_new = true;
      break;
    case buttonEnum.DIV: //Divide
      //Store whats on the display
      stored_var = on_display;
      stored_op = buttonEnum.DIV;
      is_new = true;
      break;
    case buttonEnum.EQU:
      stored_var = null;
      stored_op = null;
      is_new = true;
      break;
  };

  updateDisplay();
}

function updateDisplay() {
  var display = on_display;
  if (dec_place == 1) {
    display += ".";
  }
  $("#screen").text(display);
}

function mathIt(stored, display, op) {
  stored = +stored;
  display = +display; //turns exponent into number
  var results;
  switch (op) {
    case buttonEnum.PLU:
      results = stored + display;
      break;
    case buttonEnum.MIN:
      results = stored - display;
      break;
    case buttonEnum.MUL:
      results = stored * display;
      break;
    case buttonEnum.DIV:
      results = stored / display;
      break;
    case buttonEnum.PER:
      results = (display / 100) * stored;
      break;
  };
  if (results.toString().length > 8) {
    results = results.toExponential(3);
  }
  return results;
}

$(document).ready(init());