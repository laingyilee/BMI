var list = document.querySelector('.list');
var bmiBtn = document.getElementById('Btn');
var resultBtn = document.getElementById('block');
var btn = document.querySelector('.button input');
var data;
var txt = "";

// //取得元素
// const preObject = document.getElementById('bmicount');
//與firebase連結
const bmiRef = firebase.database().ref().child('bmicount');

//監聽數值的變化並存取
bmiRef.on('value', function(snapshot) {
  object = snapshot.val();
  data = Object.keys(object).map(function (x) { return object[x] });
  updateList(data);

});

bmiBtn.addEventListener('click',bmiCount,false);


btn.addEventListener('click',function(){
    btn.classList.toggle('is-active');
},false);

btn.addEventListener('click',function(){

  switch(txt)
  {
      case "理想":
          resultBtn.classList.add('block1').remove('block2 block3 block4 block5');
          break;
      case "過輕":
          resultBtn.classList.add('block2').remove('block1 block3 block4 block5');
          break;
      case "過重":
          resultBtn.classList.add('block3').remove('block1 block2 block4 block5');
          break;
      case "輕度肥胖":
          resultBtn.classList.add('block4').remove('block1 block2 block3 block5');
          break;
      case "中度肥胖":
          resultBtn.classList.add('block4').remove('block1 block2 block3 block5');
          break;
      case "重度肥胖":
          resultBtn.classList.add('block5').remove('block1 block2 block3 block5');
          break;
      default:
          resultBtn.classList.remove('block1 block2 block3 block4 block5');
  }

},false);

resultBtn.addEventListener('click',showResult,false);

function showResult(e){
     if(e.target.id !=='block'){
        resultBtn.classList.remove('block1','block2','block3','block4','block5');
     };
}

list.addEventListener('click',toggleDone,false);

function toggleDone(e){
  e.preventDefault();
  if(e.target.tagName !=='A'){return};
  var index=e.target.dataset.index;
  data.splice(index,1);
  // localStorage.setItem('BMIvalue',JSON.stringify(data));
  updateList(data);
}

var today;

function getDate(){
  today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; 
  var yyyy = today.getFullYear();
  if(dd < 10){
    dd='0'+dd;
  }
  if(mm < 10) 
{
    mm='0'+mm;
}
today = yyyy+'-'+mm+'-'+dd;
}


function bmiCount(e){
	e.preventDefault();
  var heightNum =parseInt(document.getElementById('heightId').value);
  var weightNum =parseInt(document.getElementById('weightId').value);
  var BMItotal = weightNum/((heightNum/100)*(heightNum/100));
  var BMI = BMItotal.toFixed(1);
  getDate();
  check(e);
  //判斷BMI值範圍
  if (BMI < 18.5)
    {
      txt ="過輕";
      colorCode="blue";
    }
    else if (BMI >= 18.5 && BMI < 25)
    {
      txt ="理想";
      colorCode="green";
    }
    else if (BMI >= 25 && BMI< 27)
    {
      txt ="過重";
      colorCode="orange0";
    }
    else if (BMI >= 27 && BMI< 30)
    {
      txt ="輕度肥胖";
      colorCode="orange1";
    }
    else if (BMI >= 30 && BMI< 35)
    {
      txt ="中度肥胖";
      colorCode="orange1";
    }
    else{
      txt ="重度肥胖";
      colorCode="orange2";
    }

  var item = '<li class="'+colorCode+'"><span class="Alert">'+txt + '</span><span class="label"><i>BMI</i>'+BMI+'</span><span class="label"><i>身高</i>'+heightNum+'cm</span><span class="label"><i>體重</i>'+weightNum+'kg</span><span class="today">'+today+'<a href="#">x</a></li>';
  bmiRef.push({
    value:item
  })

  //秀出結果
  document.querySelector('#block .result').innerHTML=txt;
  document.querySelector('#block h3').innerHTML=BMI;
}

var hNum = document.getElementById('heightId');
hNum.addEventListener('blur',check);
var wNum = document.getElementById('weightId');
wNum.addEventListener('blur',check);


function updateList(data) {
  var str = '';
  var len = data.length;
  for (var i = 0; len > i; i++) {
    str += data[i].value;
  }
  list.innerHTML = str;
}

function check(e){
  var Str = e.target.value;
  if (Str==''){
    alert('請輸入身高體重');
    return;
  }
}