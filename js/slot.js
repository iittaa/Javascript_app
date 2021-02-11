"use strict"
{

  const start = document.getElementById("start");
  const stop1 = document.getElementById("stop1");
  const stop2 = document.getElementById("stop2");
  const stop3 = document.getElementById("stop3");
  const img1 = document.querySelector(".img1");
  const img2 = document.querySelector(".img2");
  const img3 = document.querySelector(".img3");
  // タイムアウトID
  let id1;
  let id2;
  let id3;
  let remain = 3;
  let money;


  // 画像をランダムに表示する
  function randomImage(){
    const images  = [
      "../img/bell.png",
      "../img/cherry.png",
      "../img/seven.png",
    ];
    return images[Math.floor(Math.random() * images.length)];
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
    remain = 3;
    
  }

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
  });

  // それぞれのストップをクリックした時
  stop1.addEventListener("click", () => {
    if (stop1.classList.contains("inactive")){
      return;
    }
    clearTimeout(id1);
    remain--;
    stop1.classList.add("inactive");
    if (remain === 0) {
      start.classList.remove("inactive");
      checkResult();
    }
  });

  stop2.addEventListener("click", () => {
    if (stop2.classList.contains("inactive")){
      return;
    }
    clearTimeout(id2);
    remain--;
    stop2.classList.add("inactive");
    if (remain === 0) {
      start.classList.remove("inactive");
      checkResult();
    }
  });

  stop3.addEventListener("click", () => {
    if (stop3.classList.contains("inactive")){
      return;
    }
    clearTimeout(id3);
    remain--;
    stop3.classList.add("inactive");
    if (remain === 0) {
      start.classList.remove("inactive");
      checkResult();
    }
  });

}