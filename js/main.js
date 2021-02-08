"use strict";
{
  let words = [
    "dog",
    "cat",
    "horse",
    "bird",
    "mountain",
  ]
  let word;
  let start;
  let random;
  let word_letter;
  let letter_num = 0;


  const btn = document.querySelector("button");
  const title = document.getElementById("target");
  const enWord = document.getElementById("en-word");

  // 開始カウント
  // function ready(){

  // }
  

  // ゲームを開始する
  function typingStart(){
    setword();
  }
  
  //ゲームを終了する
  function typinFinish(){
    setword();
  }
  
  // 単語を表示する
  function setword() {
    random = Math.floor(Math.random() * words.length);
    enWord.textContent = words[random];
    letter();
  }

  // 単語の最初の文字を取得する
  function letter() {
    word_letter = words[random].charAt(letter_num)
  }



  btn.addEventListener("click", (e) => {
    console.log("start");
      $("button").remove("");
      start = performance.now();
      setword();
  });

}