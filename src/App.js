import React, { useState, useEffect } from "react";
import Board from "./Board";
import { images } from "./images";
import { updateURLParameter } from "./helpers";

function App() {
  const [setTime, setSetTime] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const changeIsstart = () => {
    setIsStarted(true);
  };
 const setTimeFalse=()=>{
   setSetTime(false);
 };
  const changerTimer = () => {
    console.log("again come in here herehere here here");
    setValue1(0);
    setValue2(0);
    setValue3(0);
    setValue4(0);
    setSetTime(true);
  };
  const [imgUrl, setImgUrl] = useState(images);
  const [index, setIndex] = useState(0);
  const [value1, setValue1] = useState(0);
  const [value2, setValue2] = useState(0);
  const [value3, setValue3] = useState(0);
  const [value4, setValue4] = useState(0);

  const resetTime = () => {
    setSetTime(false);
    setValue1(0);
    setValue2(0);
    setValue3(0);
    setValue4(0);
  };

  const changeTime = () => {
    var var1 = false;
    var var2 = false;
    var var3 = false;
    var newvalue1;
    var newvalue2;
    var newvalue3;
    var newvalue4;
    newvalue1 = value1 + 1;
    if (newvalue1 > 9) {
      var1 = true;
      newvalue1 = 0;
      newvalue2 = value2 + 1;
      if (newvalue2 > 5) {
        var2 = true;
        newvalue1 = 0;
        newvalue2 = 0;
        newvalue3 = value3 + 1;
        setValue3(newvalue3);
        if (newvalue3 > 9) {
          var3 = true;
          newvalue1 = 0;
          newvalue2 = 0;
          newvalue3 = 0;
          newvalue4 = value4 + 1;
        }
      }
    }
    if (var1 && var2 && var3) {
      setValue1(newvalue1);
      setValue2(newvalue2);
      setValue3(newvalue3);
      setValue4(newvalue4);
    } else if (var1 && var2) {
      setValue1(newvalue1);
      setValue2(newvalue2);
      setValue3(newvalue3);
    } else if (var1) {
      setValue1(newvalue1);
      setValue2(newvalue2);
    } else {
      setValue1(newvalue1);
    }
  };
  useEffect(() => {
    if (setTime) {
      const time = setTimeout(changeTime, 1000);

      return () => {
        clearTimeout(time);
      };
    }
  });


  const changeIndexVal = () => {
    var indexNow = index + 1;
    if (indexNow > 3) {
      indexNow = 0;
    }
    setIndex(indexNow);
    setIsStarted(false);
    resetTime();
  };

  // const handleImageChange = (e) => {
  //   setImgUrl(e.target.value);
  //   window.history.replaceState(
  //     "",
  //     "",
  //     updateURLParameter(window.location.href, "img", e.target.value)
  //   );
  // };
  console.log(imgUrl);
  console.log(imgUrl[0]);
  return (
    <div className="App">
      <h1 id="h11">Sli-zle</h1>
      <div style={{ paddingLeft:32, paddingTop:20}}>
        <img id="appImage" src={imgUrl[index].img} alt="image1" />
      </div>
      <Board
        imgUrl={imgUrl[index].img}
        resetTime={resetTime}
        changerTimer={changerTimer}
        isStarted={isStarted}
        changeIsstart={changeIsstart}
        value1={value1}
        value2={value2}
        value3={value3}
        value4={value4}
        setTimeFalse={setTimeFalse}
      />
      <h5 className="container-time">
        {value4}
        {value3}:{value2}
        {value1}
      </h5>

      <button type="button" id="buttonAll" onClick={changeIndexVal}>
        SWAP
      </button>
    </div>
  );
}

export default App;
