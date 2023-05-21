//const calculateBtn = document.getElementById("calcbutton");
const submitForm = document.getElementById("submitForm");
let sequencediv = document.getElementById("sequencediv");
let weightdiv = document.getElementById("weightdiv");
let shippingdiv = document.getElementById("shippingdiv");

submitForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let textVal = document.getElementById("sequenceText").value;
    let parts = countParts(textVal);
    let bases = onlyBases(textVal);
    let weightsMap = buildWeightsMap(parts);
    let weights = calculateMass(parts, weightsMap);
    sequencediv.textContent = "DNA Parts are: " + JSON.stringify(parts);
    shippingdiv.textContent = "DNA Shipping label is: " + bases;
    weightdiv.textContent = "DNA weights are: " + weights;
    console.log("calculating... ");
    confetti();
});

// randomly create a weights map assume these were given to us by a chemist
function buildWeightsMap(partsMap){ 
    weightsMap = {};
    for(x in partsMap){
        weightsMap[x] = 100;
    }
    console.log(weightsMap);
    return weightsMap;
}
// task 1
function countParts(sequence) {
    let parts = {};
    let start = 0;
    const end = sequence.length;
  
    while (start < end) {
      let part = "";
  
      if (sequence[start] === "-") {
        part += "-";
        start += 1;
      }
  
      firstPart = sequence.substring(start - 1, start + 2);
      secondPart = sequence.substring(start + 2, start + 3);

      if (firstPart in parts && firstPart !== "") {
        parts[firstPart] += 1;
      } else {
        parts[firstPart] = 1;
      }

      if (secondPart in parts && secondPart !== "") {
        parts[secondPart] += 1;
      } else {
        parts[secondPart] = 1;
      }
  
      start += 3;
    }
    
    for (let key in parts){ // remove empty strings
        if(parts.hasOwnProperty(key)){
            if(key === ""){
                delete parts[key];
            }
        }
    }

    return parts;
  }
// bases contain d as second part
// nonbases contain r as second part
// task 3
  function onlyBases(sequence){
    const parts = {};
    let baseString = "";
    let nonBasedString = "";
    let start = 0;
    const end = sequence.length;
  
    while (start < end) {
      let part = "";
  
      if (sequence[start] === "-") {
        part += "-";
        start += 1;
      }
      firstPart = sequence.substring(start, start + 1);
      secondPart = sequence.substring(start + 1, start + 2);
    
      console.log(firstPart + ":" + secondPart);
      if(secondPart == "d"){
        baseString += firstPart;
      }else {
        nonBasedString += firstPart;
      }
      start += 3;
    }
  
    return "[" + baseString + "]" + nonBasedString;
  }
  
  // task 2
  function calculateMass(parts, partWeights) {
    let mass = 0;
  
    for (const part in parts) {
      if (part in partWeights) {
        mass += parts[part] * partWeights[part];
      }
    }
  
    return mass;
  }
