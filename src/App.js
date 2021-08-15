import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [arrWord, setArrayWord] = useState([]);
  const [arrShow, setArrShow] = useState([]);

  useEffect(() => {
    if (arrShow.length === 0 && arrWord.length !== 0)
      calRandomWord();

  }, [arrWord, arrShow]);

  function myFunction() {
    var x = document.getElementById("myTextarea").value;
    // arrWord = x.split('\n'); // lines is an array of strings
    document.getElementById("btnNext").hidden = false;
    document.getElementById("btnReset").hidden = true;

    // let y = "";
    // // Loop through all lines
    // for (var j = 0; j < lines.length; j++) {
    //   y = y + "'" + lines[j] + "', ";
    // }

    setArrayWord(x.split("\n"));
    setArrShow([]);
  }

  function btnNextAction() {
    calRandomWord();
  }

  function calRandomWord() {
    let arrayShow = [];
    // let arrayNew = [];
    let idxs = [];
    let e = document.getElementById("number");
    // var value = e.options[e.selectedIndex].value;
    let text = e.options[e.selectedIndex].text;
    for (let i = 0; i < text; i++) {
      // console.log(arrWord.length);
      // console.log(i);
      if (arrWord.length === i) {
        document.getElementById("btnNext").hidden = true;
        document.getElementById("btnReset").hidden = false;
        break;
      }

      let idx;

      do {
        idx = Math.floor(Math.random() * arrWord.length);
      } while (idxs.includes(idx));

      idxs.push(idx);

      if (arrWord.indexOf(idx) === -1) {
        arrayShow.push(arrWord.find((v, i) => i === idx));
      }
    }

    // console.log(arrayShow);

    setArrayWord(prev => { return prev.filter(v => !arrayShow.includes(v)) });
    setArrShow(arrayShow);

    // document.getElementById("demo").innerHTML = arrayShow;
    // document.getElementById("remain").innerHTML = "Remain: " + arrWord.length;
  }

  function hideTextArea() {

    // console.log("click");

    document.getElementById("btnHide").innerHTML = document.getElementById("btnHide").textContent === "Hide" ?
      "Show" : "Hide";

    document.getElementById("myTextarea").hidden = !document.getElementById("myTextarea").hidden;
    document.getElementById("btnLoad").hidden = !document.getElementById("btnLoad").hidden;
  }


  return (
    <div style={{
      display: "flex", justifyItems: 'center', flexDirection: 'column',
      maxWidth: '500px', margin: 'auto', background: 'white', padding: '10px'
    }}>

      <h3>Random Word</h3>
      {/* <br> */}
      <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '10px' }}>
        <textarea id="myTextarea" style={{ minHeight: '80px', minWidth: '300px' }}></textarea>
        <div style={{ display: 'flex', flexDirection: 'column', marginLeft: "10px" }}>
          <button style={{ height: '20px' }} onClick={hideTextArea} id="btnHide">Hide</button>
          <button style={{ marginTop: '10px', height: "20px" }} onClick={myFunction} id="btnLoad">Load</button>
        </div>
      </div>

      <div>
        <label htmlFor="number">Choose number word:</label>

        <select id="number" style={{ width: '50px', marginLeft: '5px' }} defaultValue="one">
          <option value="one">1</option>
          <option value="two">2</option>
          <option value="three">3</option>
          <option value="four">4</option>
          <option value="five">5</option>
          <option value="ten">10</option>
          <option value="fifteen">15</option>
          <option value="twenty">20</option>
        </select>
      </div>

      {/* <br> */}
      {/* <p id="demo" style={{ fontSize: '50px' }}>{arrShow}</p> */}
      <ul style={{ fontSize: '30px', margin: 0 }}>
        {
          arrShow.map((v, i)=><li key={i}>{v}</li>)
        }
      </ul>
      <p id="remain">Remain: {arrWord.length}</p>

      <button style={{ width: '50px' }} type="button" onClick={myFunction} id="btnReset" hidden>Reset</button>
      <button style={{ width: '50px' }} type="button" onClick={btnNextAction} id="btnNext">Next</button>

    </div>
  )
}

export default App;
