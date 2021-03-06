import { useEffect, useState } from 'react';
// import swal from 'sweetalert';
import swal from '@sweetalert/with-react'
import './App.css';
import firebase from './firebase';
import { getFirestore, collection, getDocs, updateDoc, doc } from 'firebase/firestore/lite';

function App() {

  const [arrWord, setArrayWord] = useState([]);
  const [arrShow, setArrShow] = useState([]);
  const [arrWordText, setArrWordText] = useState([]);
  const [arrTranslate, setArrTranslate] = useState([]);
  const [isTextTranslate, setIsTextTranslate] = useState(false);
  const [dataSave, setDataSave] = useState({ word: '', translate: '' });

  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore(firebase);
      const colDb = collection(db, 'db-word');
      const dbSnapshot = await getDocs(colDb);
      const data = dbSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));


      document.getElementById("textWord").textContent = data[0].word;
      document.getElementById("textTranslate").textContent = data[0].translate;
      setArrWordText(data[0].word.split('\n'));
      setArrTranslate(data[0].translate.split('\n'));
      setDataSave(prev=>({...prev, ...data}));
    }

    fetchData();

  }, []);

  useEffect(() => {
    if (arrShow.length === 0 && arrWord.length !== 0) {
      calRandomWord();
      // console.log("call");
    }

    // console.log(arrShow.length);
    // console.log(arrWord.length);

  }, [arrWord, arrShow]);


  const saveDB = async () => {
    const db = getFirestore(firebase);
    const dbZero = doc(db, "db-word", "rbngF4iM3ScnzVtNQTXO");

    await updateDoc(dbZero, {
      word: dataSave.word,
      translate: dataSave.translate
    });

    swal({
      text: "Updated!",
      icon: "success",
      button: "OK",
    });
  }


  function loadWord() {
    let x = document.getElementById("textWord").value;
    // arrWord = x.split('\n'); // lines is an array of strings
    document.getElementById("btnNext").hidden = false;
    document.getElementById("btnReset").hidden = true;

    // let y = "";
    // // Loop through all lines
    // for (var j = 0; j < lines.length; j++) {
    //   y = y + "'" + lines[j] + "', ";
    // }

    setArrayWord(x.split("\n").map((v, i) => ({ idx: i, value: v })));
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
        // console.log("do: " + idx);
      } while (idxs.includes(idx));

      idxs.push(idx);

      // if (arrWord.indexOf(idx) === -1) {
      arrayShow.push(arrWord[idx]);
      // }
    }

    // console.log(arrayShow.length);

    const a = arrWord.filter((v, i) => !idxs.includes(i));

    // console.log(a.length);

    setArrayWord(a);
    setArrShow(arrayShow);

    // document.getElementById("demo").innerHTML = arrayShow;
    // document.getElementById("remain").innerHTML = "Remain: " + arrWord.length;
  }

  function hideTextArea() {

    // console.log("click");

    document.getElementById("btnHide").innerHTML = document.getElementById("btnHide").textContent === "Hide" ?
      "Show" : "Hide";

    document.getElementById("textWord").hidden = !document.getElementById("textWord").hidden;
    document.getElementById("btnLoad").hidden = !document.getElementById("btnLoad").hidden;
    document.getElementById("spanWord").hidden = !document.getElementById("spanWord").hidden;
  }

  const showAlertTranslate = idx => {
    if (arrWordText.length === arrTranslate.length) {
      // swal("TRANSLATE!!!", `${arrTranslate[idx]}`);
      swal(
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span>TRANSLATE!!!</span>
          <span style={{ fontSize: '40px' }}>
            {arrTranslate[idx]}
          </span>
        </div>
      );
    } else {
      swal({
        text: "Incorrect translation data!",
        icon: "error",
        button: "OK",
      });
    }
  }


  return (
    <div style={{
      display: "flex", justifyItems: 'center', flexDirection: 'column',
      maxWidth: '500px', margin: 'auto', background: 'white', padding: '10px'
    }}>

      <h3>Random Word</h3>
      <button style={{
        marginTop: '10px', height: "20px", width: '100px', marginBottom: '10px',
        backgroundColor: '#4287f5', color: 'white'
      }}
        id="btnSavedb" onClick={saveDB}>Save DB</button>

      <div style={{ marginBottom: '10px' }}>
        <span id="spanWord">Word</span>
        <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '5px' }}>
          <textarea onChange={(e) => {
            setArrWordText(e.target.value.trim().split('\n'));
            setDataSave(prev => ({ ...prev, word: e.target.value.trim() }));
          }} id="textWord" style={{ minHeight: '80px', minWidth: '250px' }}></textarea>
          <div style={{ display: 'flex', flexDirection: 'column', marginLeft: "10px" }}>
            <button style={{ height: '20px', marginTop: '5px' }} onClick={hideTextArea} id="btnHide">Hide</button>
            <button style={{ marginTop: '10px', height: "20px" }} onClick={loadWord} id="btnLoad">Load</button>
            <button style={{ marginTop: '10px', height: "20px", marginBottom: '5px' }} onClick={() => { setIsTextTranslate(prev => !prev) }} id="btnLoad">{isTextTranslate ? "x Translate" : "+ Translate"}</button>
          </div>
        </div>
        <div style={{ display: isTextTranslate ? 'flex' : 'none', flexDirection: 'column' }}>
          <span id="spanTranslate">Translate</span>
          <textarea onChange={(e) => {
            setArrTranslate(e.target.value.trim().split('\n'));
            setDataSave(prev => ({ ...prev, translate: e.target.value.trim() }));
          }} id="textTranslate" style={{ minHeight: '80px', minWidth: '250px', width: '250px', marginTop: '5px' }}></textarea>
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
      <div style={{ marginTop: '10px' }}>
        {
          arrShow.map((v, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <span>???????</span>
              <span style={{ fontSize: '30px', marginLeft: '6px', marginRight: '4px' }}>{v.value}</span>
              <button onClick={() => { showAlertTranslate(v.idx) }} style={{ backgroundColor: 'rgb(52, 222, 0)', height: '18px', width: '18px', borderRadius: 9, content: 'center', padding: 0 }}>+</button>
            </div>
          ))
        }
      </div>
      <p id="remain">Remain: {arrWord.length}</p>

      <button style={{ width: '50px' }} type="button" onClick={loadWord} id="btnReset" hidden>Reset</button>
      <button style={{ width: '50px' }} type="button" onClick={btnNextAction} id="btnNext">Next</button>

    </div>
  )
}

export default App;
