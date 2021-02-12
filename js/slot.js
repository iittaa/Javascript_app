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
      haveMoney += 30000;
    } else if (p1 == 1 && p2 != 1 && p3 == 1) {
      haveMoney += 30000;
    } else if (p1 != 1 && p2 == 1 && p3 == 1) {
      haveMoney += 30000;
    }

    // 海馬二つ
    if (p1 == 2 && p2 == 2 && p3 != 2) {
      haveMoney += 10000;
    } else if (p1 == 2 && p2 != 2 && p3 == 2) {
      haveMoney += 10000;
    } else if (p1 != 2 && p2 == 2 && p3 == 2) {
      haveMoney += 10000;
    }

    $("#money").text(`所持金：${haveMoney}円`);
  }

  function buycheck() {
    if (haveMoney > 50000) {
      if ($(".set-parts1 img").hasClass("inactive")) {
        $("#buy-btn1").removeClass("inactive");
      } else {
        return;
      }
    } else {
      $("#buy-btn1").addClass("inactive");
    }

    if (haveMoney > 100000) {
      if ($(".set-parts2 img").hasClass("inactive")) {
        $("#buy-btn2").removeClass("inactive");
      } else {
        return;
      }
    } else {
      $("#buy-btn2").addClass("inactive");
    }
    
    if (haveMoney > 50000) {
      if ($(".set-parts3 img").hasClass("inactive")) {
        $("#buy-btn3").removeClass("inactive");
      } else {
        return;
      }
    } else {
      $("#buy-btn3").addClass("inactive");
    }
    
    if (haveMoney > 50000) {
      if ($(".set-parts4 img").hasClass("inactive")) {
        $("#buy-btn4").removeClass("inactive");
      } else {
        return;
      }
    } else {
      $("#buy-btn4").addClass("inactive");
    }
    
    if (haveMoney > 50000) {
      if ($(".set-parts5 img").hasClass("inactive")) {
        $("#buy-btn5").removeClass("inactive");
      } else {
        return;
      }
    } else {
      $("#buy-btn5").addClass("inactive");
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
      buycheck();
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
      buycheck();
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
      buycheck();
      if (haveMoney === 0){
        $("#gameover").fadeIn();
      } else {
        start.classList.remove("inactive");
      }
    }
  });

  $("#buy-btn1").one("click", function() {
    if ($("#buy-btn1").hasClass("inactive")) {
      return;
    } else {
      haveMoney -= 50000;
      buycheck();
      exoParts--;
      if (exoParts === 0) {
        $("#gameclear").fadeIn();
      }
      $("#money").text(`所持金：${haveMoney}円`);
      $(".exo-img1").addClass("inactive");
      $("#buy-btn1").addClass("inactive");
      $(".set-parts1 img").removeClass("inactive");
    }
  });

  $("#buy-btn2").one("click", function() {
    if ($("#buy-btn2").hasClass("inactive")) {
      return;
    } else {
      haveMoney -= 100000;
      buycheck();
      exoParts--;
      if (exoParts === 0) {
        $("#gameclear").fadeIn();
      }
      $("#money").text(`所持金：${haveMoney}円`);
      $(".exo-img2").addClass("inactive");
      $("#buy-btn2").addClass("inactive");
      $(".set-parts2 img").removeClass("inactive");
    }
  });

  $("#buy-btn3").one("click", function() {
    if ($("#buy-btn3").hasClass("inactive")) {
      return;
    } else {
      haveMoney -= 50000;
      buycheck();
      exoParts--;
      if (exoParts === 0) {
        $("#gameclear").fadeIn();
      }
      $("#money").text(`所持金：${haveMoney}円`);
      $(".exo-img3").addClass("inactive");
      $("#buy-btn3").addClass("inactive");
      $(".set-parts3 img").removeClass("inactive");
    }
  });

  $("#buy-btn4").one("click", function() {
    if ($("#buy-btn4").hasClass("inactive")) {
      return;
    } else {
      haveMoney -= 50000;
      buycheck();
      exoParts--;
      if (exoParts === 0) {
        $("#gameclear").fadeIn();
      }
      $("#money").text(`所持金：${haveMoney}円`);
      $(".exo-img4").addClass("inactive");
      $("#buy-btn4").addClass("inactive");
      $(".set-parts4 img").removeClass("inactive");
    }
  });

  $("#buy-btn5").one("click", function() {
    if ($("#buy-btn5").hasClass("inactive")) {
      return;
    } else {
      haveMoney -= 50000;
      buycheck();
      exoParts--;
      if (exoParts === 0) {
        $("#gameclear").fadeIn();
      }
      $("#money").text(`所持金：${haveMoney}円`);
      $(".exo-img5").addClass("inactive");
      $("#buy-btn5").addClass("inactive");
      $(".set-parts5 img").removeClass("inactive");
    }
  });


}