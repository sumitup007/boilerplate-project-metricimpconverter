function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = numberStringSplitter(input)[0];
    let nums = checkDivision(result);
    if(!nums){
      return undefined;
    }
    let num1 = nums[0];
    let num2 = nums[1]||"1";

    result = parseFloat(num1)/parseFloat(num2);

    if(isNaN(num1) || isNaN(num2)){
      return undefined;
    }
    
    return result;
  };
  
  this.getUnit = function(input) {
    let result = numberStringSplitter(input)[1].toLowerCase();
    switch(result){
      case "km":
      case "gal":
      case "lbs":
      case "mi":
      case "kg":
        return result;
      case "l":
        return "L";
      default:
        return undefined;
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    let result = initUnit.toLowerCase();
    switch(result){
      case "km":
        return "mi";
      case "gal":
        return "L";
      case "lbs":
        return "kg";
      case "mi":
        return "km";
      case "kg":
        return "lbs";
      case "l":
        return "gal";
      default:
        return undefined;
    }
  };

  this.spellOutUnit = function(unit) {
    let result = unit.toLowerCase();
    switch(result){
      case "km":
        return "kilometers";
      case "gal":
        return "gallons";
      case "lbs":
        return "pounds";
      case "mi":
        return "miles";
      case "kg":
        return "kilograms";
      case "l":
        return "liters";
      default:
        return "Unknown";
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let unit = initUnit.toLowerCase();
    let result;

    switch(unit){
      case "km":
        result = initNum / miToKm;
        break;
      case "gal":
        result = initNum * galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "l":
        result = initNum / galToL;
        break;
      default:
        result = "Unknown";
    }    
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    
    return result;
  };
  
}

function numberStringSplitter(input){
  let number = input.match(/[.\d\/]+/g) || ["1"];
  let string = input.match(/[a-zA-z]+/g)[0];
  return [number[0],string]
}

function checkDivision(fractionNum){
  let nums = fractionNum.split('/');
  if(nums.length>2){
    return false;
  }
  return nums;
}

module.exports = ConvertHandler;
