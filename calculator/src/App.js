import logo from "./logo.svg";
import "./App.css";
import React from "react";
import Button from "./Components/Button";
import ResultBox from "./Components/ResultBox";
import { useState } from "react";

const buttonsLabels = [
  "CE",
  "C",
  "±",
  "%",
  "1",
  "2",
  "3",
  "/",
  "4",
  "5",
  "6",
  "*",
  "7",
  "8",
  "9",
  "-",
  "0",
  ".",
  "=",
  "+",
  "sin(x)",
  "cos(x)",
  "tan(x)",
  "exp(x)",
 
];

function applyOperation(op1, op2, operation){
  switch (operation){
    case "+":
      return op1 + op2;
    case "-":
      return op1 - op2;
    case "*":
      return op1 * op2;
    case "/":
      return op1 / op2;
    case "cos(x)":
      return Math.cos(op2)
    case "sin(x)":
      return Math.sin(op2)
    case "tan(x)":
      return Math.tan(op2)
    case "exp(x)":
      return Math.exp(op2)

  }

  return -1;
}

function performCalculation(props, id) {
  const { op1, op2, op, res } = props;
  const [operand1, setOperand1] = op1;
  const [operand2, setOperand2] = op2;
  const [operation, setOperation] = op;
  const [result, setResult] = res;

  if (id === "."){
    setResult(result + ".");
    setOperand2(operand2 + ".");
  }  else if (id === "C"){
    setOperand1("");
    setOperand2("");
    setResult("0");
    setOperation("");
  } else if (id === "CE"){
    setOperand2("");
    setResult("0");
  } else if (id === "±"){
    setResult((parseFloat(result)*-1).toString().slice(0, 13));
    setOperand2((parseFloat(operand2)*-1).toString().slice(0, 13));
  } else if (id === "%"){
    setOperand2((parseFloat(operand2)/100).toString().slice(0, 13));
    setResult((parseFloat(result)/100).toString().slice(0, 13));
  }
  else if (['cos(x)', 'sin(x)', 'tan(x)', 'exp(x)'].includes(id)){
    const calcResult = applyOperation(0, parseFloat(operand2), id)
    setOperand2(calcResult.toString().slice(0, 13));
    setResult(calcResult.toString().slice(0, 13));
  }
  else if (operand1 === "") {
    setOperand1((" " + operand2).slice(1, 14));
    setOperation(id);
    setResult('0');
    setOperand2("");
  } 
  
  else {
    const op1 = parseFloat(operand1);
    const op2 = parseFloat(operand2);
    var calcResult =  0;
    if (id === "="){
      if (operand1  ===  "" || operation === ""){
        return;
      }
      else{
        calcResult = applyOperation(op1, op2, operation);
        setOperand1("");
        setOperation("");
        setResult(calcResult.toString().slice(0, 13));
        setOperand2(calcResult.toString().slice(0, 13));
        return;
      }
    }
    else{
      calcResult = applyOperation(op1, op2, operation);
    }
    setOperand1(calcResult.toString().slice(0, 13));
    setOperation(id);
    setResult(calcResult.toString().slice(0, 13));
    setOperand2("");
  }
}

function ButtonClicked(id, props) {
  const { op1, op2, op, res } = props;
  const [operand1, setOperand1] = op1;
  const [operand2, setOperand2] = op2;
  const [operation, setOperation] = op;
  const [result, setResult] = res;

  if (isNaN(parseInt(id))) {
    performCalculation(props, id);
  } else {
    setResult(parseFloat(operand2 + id).toString().slice(0, 13));
    setOperand2((operand2 + id).slice(0, 13));
  }
  console.log(operand1, operation, operand2);
}

function App() {
  const [operand1, setOperand1] = useState("");
  const [operand2, setOperand2] = useState("");
  const [operation, setOperation] = useState("");
  const [result, setResult] = useState("0");

  const buttons = buttonsLabels.map((label) =>
    Button({
      onClick: () =>
        ButtonClicked(label, {
          op1: [operand1, setOperand1],
          op2: [operand2, setOperand2],
          op: [operation, setOperation],
          res: [result, setResult],
        }),
      label: label,
    })
  );
  const buttonsRows = [];
  for (var i = 0; i < buttons.length; i += 4) {
    buttonsRows.push(
      <div className="button-row" key={"button-row-" + i}>
        {buttons.slice(i, i + 4)}
      </div>
    );
  }
  return (
    <div className="page">
      <div key="calc" className="container">
        <div key="result-box">{ResultBox({ result: result })}</div>
        <div className="button-container">
          <div key="buttons">{buttonsRows}</div>
        </div>
      </div>
      <div style={{color:'#fff', fontSize:'16pt', margin:'10px', textAlign:'center'}}>
        This is an applicator web App using React. Please write in chat if you want to see something specific. I will post all the code on github!
        </div>
    </div>
  );
}

export default App;
