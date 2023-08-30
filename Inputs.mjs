import { convertToPolar } from "./ComplexOperatorAid.mjs";


export function Inputs (SelectInputFieldsID,classForTable,SelectInputFieldsClass,data,onInputChanged){

    const inputDiv = d3.select(SelectInputFieldsID);
    const table = inputDiv.append("table").attr("class",classForTable);
    table.style('font-size', '0.8rem');
    // Create table header
    const header = table.append("thead").append("tr");
    // Create a button in the first header cell
    header.append("th")
    .append("button")
    .text("R/X")
    .attr("class", "myButtonCurrentAndVoltagePanel") // optional: add a class for styling
    .on("click", function() {
      let tableToHide = document.getElementsByClassName(classForTable);
      tableToHide.style("display","none");
    });
    header.append("th").text("R");
    header.append("th").text("X");
    
    // Create table body
    const tbody = table.append("tbody");
    
    const inputFields = tbody.selectAll("."+SelectInputFieldsClass)
      .data(data)
      .enter().append("tr")
      .attr("class", SelectInputFieldsClass);
      
    var underlinedSlash = String.fromCharCode(47) + '\u0332';    
    // Add first column with input file labels
    inputFields.append("td")
      .text(d => `${d.key}: `)
      .attr("class",d => d.key.charAt(0))
      .style('font-size', '0.8rem')
      .on("mouseenter", function(d) {
        // Create tooltip element
        const tooltip = d3.selectAll(".CurrentAndVoltageTable")
          .append("div")
          .text(` ${convertToPolar(d.target.__data__.value,true).magnitude.toFixed(2)} `)
          .attr("class", "tooltip")
        const tooltipUnderlined = d3.selectAll(".CurrentAndVoltageTable")
          .append("div")
          .text(` ${underlinedSlash}${convertToPolar(d.target.__data__.value,true).angle.toFixed(1)} `)
          .attr("class", "tooltipUnderlined");
          
          let find_X_ValueOfRealInput = document.getElementById("VA-real");          
          let find_X_ValueOfRealInputForUnderlined = document.getElementById("VA-imaginary");
        const [mouseX, mouseY] = d3.pointer(event,".CurrentAndVoltageTable");
        tooltip.style("left",find_X_ValueOfRealInput.getBoundingClientRect().x + "px").style("top", mouseY + "px");
        tooltipUnderlined.style("left",find_X_ValueOfRealInputForUnderlined.getBoundingClientRect().x + "px").style("top", mouseY + "px");
      })
      .on("mouseout", function() {
        // Remove the tooltip element when the mouse is no longer over the element
        d3.select(".tooltip").remove();
        d3.select(".tooltipUnderlined").remove();
      });
    
    // Add second column with real input fields
    inputFields.append("td")
      .append("input")
      .style("width", "50px")
      .attr("type", "number")
      .attr("step", "0.01")
      .style('font-size', '0.8rem')
      .attr("value", d => d.value.x.toFixed(3))
      .attr("placeholder", "x")
      .attr("id", d => `${d.key}-real`)
      .attr("class",function(d) { 
        if (d.key.charAt(d.key.length-1) !== "A" && d.key.charAt(d.key.length-1) !== "B" && d.key.charAt(d.key.length-1) !== "C" && d.key.charAt(d.key.length-1) !== "0" && d.key.charAt(d.key.length-1) !== "1" && d.key.charAt(d.key.length-1) !== "2"){
           return "VAR"; 
        } else { 
        if ((d.key.length===3)){return "VAR" }
        else {
          return d.key.charAt(0);
        }
        }})
      .on("input", onInputChanged)
      .on("change", onInputChanged);
    
    // Add third column with imaginary input fields
    inputFields.append("td")
      .append("input")
      .style("width", "50px")
      .attr("type", "number")
      .attr("step", "0.01")
      .style('font-size', '0.8rem')
      .attr("value", d => d.value.y.toFixed(3))
      .attr("placeholder", "y")
      .attr("id", d => `${d.key}-imaginary`)
      .attr("class",function(d) {
        if (d.key.charAt(d.key.length-1) !== "A" && d.key.charAt(d.key.length-1) !== "B" && d.key.charAt(d.key.length-1) !== "C" && d.key.charAt(d.key.length-1) !== "0" && d.key.charAt(d.key.length-1) !== "1" && d.key.charAt(d.key.length-1) !== "2"){
           return "VAR"; 
        } else { 
        if ((d.key.length===3)){return "VAR" }
        else {
          return d.key.charAt(0);
        }
        }})
      .on("input", onInputChanged)
      .on("change", onInputChanged);

    return inputDiv;
}

export function InputsTopLeft (SelectInputFieldsID,classForTable,SelectInputFieldsClass,data,onInputChanged){

  const inputDiv = d3.select(SelectInputFieldsID);
  const table = inputDiv.append("table").attr("class",classForTable);
  table.style('font-size', '0.8rem');
    // Create table body
  const tbody = table.append("tbody");
  
  const inputFields = tbody.selectAll("."+SelectInputFieldsClass)
    .data(data)
    .enter().append("tr")
    .attr("class", SelectInputFieldsClass)
  
  // Add first column with input file labels
  inputFields.append("td")
    .text(function(d) {
      if (d.key !== "Per100") {
        return ` ${d.key}:`;
      } else {
        return "%";
      }
    })
    .attr("class",d => d.key);
  
  // Add second column with real input fields
  inputFields.append("td")
    .append("input")
    .style("width", "70px")
    .attr("type", "number")
    .attr("step", "0.01")
    .attr("value", d => d.value.x.toFixed(2))
    .attr("id", d => `${d.key}-real`)
    .attr("class",d => d.key)
    .style('font-size', '0.8rem')
    .style("text-align","end")
    .on("input", onInputChanged)
    .on("change", onInputChanged);

  return inputDiv;
}

