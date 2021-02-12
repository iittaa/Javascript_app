"use strict";
{
  let enwords = ["aka","ametomuti","azarasi","biriya-do","bousaikunrenn","daitokai","dezitarukamera","dhisupurei","ebihurai","edozidai","fassyonzassi","ginkoukouza","happi-endo","hidarikurikku","hohoeminokikousi","kai","kaityuudokei","kaiyousinsousui","kanzi","kikkubokusingu","kodomonohi","koukaisakinitatazu","ko-nnpota-ju","kyanpufaiya-","meisikoukann","mitinimayou","musi","muzintou","nasukanotijyoue","nihontizu","no-topasokon","painappuru","renkonnnoana","saikoro","seki","seisyunnnohibi","si-rakansu","syourinzi","syouutyuu","taipingu","tika","tintaimansyonn","tutinokohakkenn","tyokore-to","tyuukosya","yoganopo-zu","youseinokuni","yuusansoundou","yuuyake",
  ]
  let jpwords = ["赤","アメとムチ","アザラシ","ビリヤード","防災訓練","大都会","デジタルカメラ","ディスプレイ","エビフライ","江戸時代","ファッション雑誌","銀行口座","ハッピーエンド","左クリック","微笑みの貴公子","貝","懐中時計","海洋深層水","漢字","キックボクシング","子どもの日","後悔先に立たず","コーンポタージュ","キャンプファイヤー","名刺交換","道に迷う","虫","無人島","ナスカの地上絵","日本地図","ノートパソコン","パイナップル","レンコンの穴","サイコロ","席","青春の日々","シーラカンス","少林寺","小宇宙","タイピング","地下","賃貸マンション","ツチノコ発見","チョコレート","中古車","ヨガのポーズ","妖精の国","有酸素運動","夕焼け",
  ]
  let enword;
  let jpword;
  let random;
  let word_letter;
  let letter_num = 0;
  // カウントダウンする秒数
  let sec;

  let correct = 0;
  let wrong = 0;
  let avg;
  let rate;

  // ゲームを開始する
  function typingStart() {
    $("#button").hide();
    $("#timelist").hide();
    $("#timer").text(sec);
    let cnt = sec;
    let id = setInterval(() => {
      cnt--;
      if (cnt <= 0) {
        clearInterval(id);
        typingFinish();
      }
       $("#timer").text(cnt);
    }, 1000);
    showWord();
  }
  
  //ゲームを終了する
  function typingFinish(){
    avg = ((correct + wrong) / sec).toFixed(1);
    rate = ((correct * 100) / (correct + wrong)).toFixed(1)
    $("#timer").hide();
    $("#en-word").hide();
    $("#jp-word").hide();
    $("#button").html();
    $("#timelist").html();
    $("#score").html(
      `<br>
      合計タイプ数 <span style="color:red; font-size:30px;">${correct + wrong}</span>回
      <br>
      ミスタイプ数 <span style="color:red; font-size:30px;">${wrong}</span>回
      <br>
      正答率 <span style="color:red; font-size:30px;">${rate}</span>％
      <br>
      平均タイプ数 <span style="color:red; font-size:30px;">${avg}</span>/秒
      <br>
      スコア <span style="color:red; font-size:40px;">${((avg * 20) - (wrong * 0.8)).toFixed()}</span>点`
      );
    random = 0;
    letter_num = 0;
    word_letter = 0;
    $("#finish").fadeIn();
    $(".container").hide();
  }
  
  // 単語を表示する
  function showWord() {
    random = Math.floor(Math.random() * enwords.length);
    enword = enwords[random];
    jpword = jpwords[random];
    $("#en-word").text(enword);
    $("#jp-word").text(jpword);
    letter();
  }

  // 単語の位置を取得する
  function letter() {
    word_letter = enwords[random].charAt(letter_num)
  }

  $("#button").click(() => {
    const radioVal = $('input[name="q1"]:checked').val();
    sec = radioVal;
    typingStart();
  });

  // 文字入力時のイベント
  document.addEventListener("keydown", (e) => {
    if (e.key === enword[letter_num]) {
      correct++
      letter_num++
      $("#en-word").html(`<span style="color:skyblue;">${enword.substr(0,letter_num)}</span>${enword.substr(letter_num)}`)
    } else {
      wrong++
      return;
    }
    if (letter_num === enword.length ){
      letter_num = 0;
      showWord();
    }
  });

  $("#score-btn").click(() => {
    $("#finish").hide();
    $("#result").fadeIn();
  });

}