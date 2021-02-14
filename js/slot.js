"use strict"
{

  const start = document.getElementById("start");
  const stop1 = document.getElementById("stop1");
  const stop2 = document.getElementById("stop2");
  const stop3 = document.getElementById("stop3");
  const img1 = document.querySelector(".img1");
  const img2 = document.querySelector(".img2");
  const img3 = document.querySelector(".img3");
  const images  = [
    "../img/panel1.png", //遊戯
    "../img/panel2.png", //海馬
    "../img/panel3.jpg", //城之内
    "../img/panel4.png", //杏
    "../img/panel5.png", //木馬
  ];
  let id1;
  let id2;
  let id3;
  let panelRemain = 3;
  let exoParts = 5;
  let haveMoney = 150000;
  let p1;
  let p2;
  let p3;

  $("#money").text(`所持金：${haveMoney}円`);


  // 画像をランダムに表示する
  function randomImage(){
    const n = Math.random();
    if (n < 0.10){
      return images[0]; //遊戯10%
    } else if (n < 0.30){
      return images[1]; //海馬30%
    } else if (n < 0.40) {
      return images[2]; //城之内10%
    } else if (n < 0.70) {
      return images[3]; //杏30%
    } else {
      return images[4]; //木馬30%
    }
  }
  
  // 各パネルを回す
  function slotStart1(){
    img1.src = randomImage();
    id1 = setTimeout(() => {
      slotStart1();
    }, 100)
  }

  function slotStart2(){
    img2.src = randomImage();
    id2 = setTimeout(() => {
      slotStart2();
    }, 100)
  }

  function slotStart3(){
    img3.src = randomImage();
    id3 = setTimeout(() => {
      slotStart3();
    }, 100)
  }

  function activate() {
    stop1.classList.remove("inactive");
    stop2.classList.remove("inactive");
    stop3.classList.remove("inactive");
    img1.classList.remove("unmatch");
    img2.classList.remove("unmatch");
    img3.classList.remove("unmatch");
    panelRemain = 3;
  }

  // 正誤判定
  function checkResult(){

    if (img1.src !== img2.src && img1.src !== img3.src){
      img1.classList.add("unmatch");
    }
    if (img2.src !== img1.src && img2.src !== img3.src){
      img2.classList.add("unmatch");
    }
    if (img3.src !== img1.src && img3.src !== img2.src){
      img3.classList.add("unmatch");
    }
    moneyResult();
    $("#money").text(`所持金：${haveMoney}円`);
  }

  // 出目の取得
  function moneyResult(){
    p1 = img1.src.substr(-5, 1);
    p2 = img2.src.substr(-5, 1);
    p3 = img3.src.substr(-5, 1);

    // 遊戯ビンゴ
    if (p1 == 1 && p2 == 1 && p3 == 1) {
      haveMoney += 100000;
    }

    // 海馬ビンゴ
    if (p1 == 2 && p2 == 2 && p3 == 2) {
      haveMoney += 50000;
    }

    // 城之内ビンゴ
    if (p1 == 3 && p2 == 3 && p3 == 3) {
      haveMoney -= 30000;
    }

    // 杏ビンゴ
    if (p1 == 4 && p2 == 4 && p3 == 4) {
      haveMoney += 10000;
    }

    // 木馬ビンゴ
    if (p1 == 5 && p2 == 5 && p3 == 5) {
      haveMoney += 30000;
    }

    // 遊戯二つ
    if (p1 == 1 && p2 == 1 && p3 != 1) {
      haveMoney += 100000;
    } else if (p1 == 1 && p2 != 1 && p3 == 1) {
      haveMoney += 100000;
    } else if (p1 != 1 && p2 == 1 && p3 == 1) {
      haveMoney += 100000;
    }

    // 海馬二つ
    if (p1 == 2 && p2 == 2 && p3 != 2) {
      haveMoney += 100000;
    } else if (p1 == 2 && p2 != 2 && p3 == 2) {
      haveMoney += 100000;
    } else if (p1 != 2 && p2 == 2 && p3 == 2) {
      haveMoney += 100000;
    }
  }

  // スタートをクリックした時
  start.addEventListener("click", () => {
    if (start.classList.contains("inactive")) {
      return;
    }
    if (stop1.classList.contains("inactive") && stop2.classList.contains("inactive") && stop3.classList.contains("inactive")) {
      activate();
    }
    start.classList.add("inactive");
    slotStart1();
    slotStart2();
    slotStart3();
    haveMoney -= 5000;
    $("#money").text(`所持金：${haveMoney}円`);
  });

  // それぞれのストップをクリックした時
  stop1.addEventListener("click", () => {
    if (stop1.classList.contains("inactive")){
      return;
    }
    clearTimeout(id1);
    panelRemain--;
    stop1.classList.add("inactive");
    if (panelRemain === 0) {
      checkResult();
      console.log(haveMoney)
      if (haveMoney === 0){
        $("#gameover").fadeIn();
      } else {
        start.classList.remove("inactive");
      }
    }
  });

  stop2.addEventListener("click", () => {
    if (stop2.classList.contains("inactive")){
      return;
    }
    clearTimeout(id2);
    panelRemain--;
    stop2.classList.add("inactive");
    if (panelRemain === 0) {
      checkResult();
      console.log(haveMoney)
      if (haveMoney === 0){
        $("#gameover").fadeIn();
      } else {
        start.classList.remove("inactive");
      }
    }
  });

  stop3.addEventListener("click", () => {
    if (stop3.classList.contains("inactive")){
      return;
    }
    clearTimeout(id3);
    panelRemain--;
    stop3.classList.add("inactive");
    if (panelRemain === 0) {
      checkResult();
      console.log(haveMoney)
      panelRemain = 3;
      if (haveMoney === 0){
        $("#gameover").fadeIn();
      } else {
        start.classList.remove("inactive");
      }
    }
  });



  // 購入ボタン
  $("#buy-btn1").click(function() {
    if (haveMoney < 50001) {
      return;
    } 
    if ($(".exo-img1").hasClass("inactive")) {
      return;
    }
    haveMoney -= 50000;
    exoParts--;
    if (exoParts === 0) {
      $("#gameclear").fadeIn();
    }
    $("#money").text(`所持金：${haveMoney}円`);
    $(".exo-img1").addClass("inactive");
    $("#buy-btn1").addClass("inactive");
    $(".set-parts1 img").removeClass("inactive");
    console.log(haveMoney);
  });

  $("#buy-btn2").click(function() {
    if (haveMoney < 100001) {
      return;
    }
    if ($(".exo-img2").hasClass("inactive")) {
      return;
    }
      haveMoney -= 100000;
      exoParts--;
      if (exoParts === 0) {
        $("#gameclear").fadeIn();
      }
      $("#money").text(`所持金：${haveMoney}円`);
      $(".exo-img2").addClass("inactive");
      $("#buy-btn2").addClass("inactive");
      $(".set-parts2 img").removeClass("inactive");
      console.log(haveMoney);
  });

  $("#buy-btn3").click(function() {
    if (haveMoney < 50001) {
      return;
    }
    if ($(".exo-img3").hasClass("inactive")) {
      return;
    }
      haveMoney -= 50000;
      exoParts--;
      if (exoParts === 0) {
        $("#gameclear").fadeIn();
      }
      $("#money").text(`所持金：${haveMoney}円`);
      $(".exo-img3").addClass("inactive");
      $("#buy-btn3").addClass("inactive");
      $(".set-parts3 img").removeClass("inactive");
      console.log(haveMoney);
  });

  $("#buy-btn4").click(function() {
    if (haveMoney < 50000) {
      return;
    }
    if ($(".exo-img4").hasClass("inactive")) {
      return;
    }
      haveMoney -= 50000;
      exoParts--;
      if (exoParts === 0) {
        $("#gameclear").fadeIn();
      }
      $("#money").text(`所持金：${haveMoney}円`);
      $(".exo-img4").addClass("inactive");
      $("#buy-btn4").addClass("inactive");
      $(".set-parts4 img").removeClass("inactive");
      console.log(haveMoney)
  });

  $("#buy-btn5").click(function() {
    if (haveMoney < 50000) {
      return;
    }
    if ($(".exo-img5").hasClass("inactive")) {
      return;
    }
      haveMoney -= 50000;
      exoParts--;
      if (exoParts === 0) {
        $("#gameclear").fadeIn();
      }
      $("#money").text(`所持金：${haveMoney}円`);
      $(".exo-img5").addClass("inactive");
      $("#buy-btn5").addClass("inactive");
      $(".set-parts5 img").removeClass("inactive");
      console.log(haveMoney);
  });


  

}