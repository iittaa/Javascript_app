"use strict"
{
  const choices = document.getElementById("choices");
  const quizList = [
    {q: "パンケーキの由来は？", c: ["フライパンで調理するケーキだから", "パンみたいなケーキだから", "膨らみすぎてパンクしたケーキだから"]},
    {q: "チゲ鍋のチゲはどういう意味？", c: ["鍋", "辛い", "うまい"]},
    {q: "アンパンマンの中身は？", c: ["つぶあん", "こしあん", "ずんだあん"]},
  ];
  let num = 0;
  let answer;
  let score;

  // 選択肢シャッフル
  function shuffle(arr) {
    for (let i = arr.length -1; i > 0 ; i--){
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i],arr[j]] = [arr[j],arr[i]];
    };
    return arr;
  }

  // 判定処理
  function checkResult(li) {
    if (answer === true) {
      return;
    }
    answer = true;
    if (quizList[num].c[0] === li.textContent) {
      li.classList.add("correct");
      score++
    } else {
      li.classList.add("wrong");
    }
  }


  // クイズを出題するx
  function setQuiz(){
    answer = false;
    $("#question").text(quizList[num].q); 

    while(choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }

    shuffle([...quizList[num].c]).forEach(choice => {
      const li = document.createElement("li")
      li.textContent = choice;
      $("#choices").append(li);
      $("li").click(() => {
        checkResult(li);
        $("#btn").removeClass("inactive");
      });
    });
    if (num === quizList.length - 1){
      $("#btn").text("スコアを確認する");
    }
  }
  setQuiz();

  $("#btn").click(() => { 
    if ($("#btn").hasClass("inactive")){
      return;
    }

    $("#btn").addClass("inactive")

    if (num === quizList.length - 1){
      $("#btn").text("スコアを確認する");
    } else {
      num++
      setQuiz();
    }
  });




}