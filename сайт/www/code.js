// Initialize Firebase
function initSession() {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      userName.textContent = "Здравствуйте " + user.displayName;
    }
  });
}

function createUser(email, password, name) {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => {
      console.log(user);
     user.updateProfile({
          displayName: name
         })
        .then(() => initSession());
    })
    .catch(err => {
      console.log(err);
    });
}

var btnLog = document.getElementById('btnLog');
var form = document.getElementById('loginForm');
var register=document.getElementById('register');
var registration = document.getElementById('Reg');
var userName = document.getElementById("user-name");

function reg(){

  if (  registration.textContent=="Регистрация"){
    register.style.display='block';
    form.style.display="none";
    btnLog.style.display='none';
    registration.textContent="Зарегистрироваться";
  }
  else {
          var name = document.getElementById('name').value; // Имя пользователя
          var email =document.getElementById('email').value; // email
          var password = document.getElementById('password').value; // password
          var repeatPassword = document.getElementById('repeatPassword').value;
              if (password !== repeatPassword) {
                    alert("Пароли не совпадают!");
                    }
                    else {
                      createUser(email, password, name);
                    }
        register.style.display="none";
        registration.style.display="none";
        btnLog.style.display='block';
        btnLog.textContent="Выйти";
}
}

function logIn(email, password) {
      firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then (user => {
          console.log(user.displayName);
        initSession();
      })
      .catch ( err => {
          console.log(err);
      });
};
var access;

//описание дейсвтий при нажатии на кнопку войти.
//смена названия с войти на выйти и обратно.
function logBtn(){
    register.style.display='none';
    form.style.display="block";
          console.log(btnLog.textContent);
    if(btnLog.textContent=="Войти" ){
        let email = document.getElementById('emailLogIn').value;
        let password= document.getElementById('passwordLogIn').value;
          logIn(email, password);
          btnLog.textContent = "Выйти";
          registration.style.display='none';
          document.getElementById('loginForm').style.display = 'none';
          document.getElementById('emailLogIn').value = "";
          document.getElementById('passwordLogIn').value ='';
          access = 1;
    }
    else {
          logOut();
          registration.style.display='block';
          btnLog.textContent = "Войти";
          registration.textContent="Регистрация";
          userName.textContent="Здравствуй Гость!"
          access = 0;
        }
}

function logOut() {
    firebase
      .auth()
      .signOut()
      .catch(err => {
        console.log(err);
      });
}

var burger = document.getElementById('burger');
var sidebar = document.getElementById('sidebar');

var mClosed = "closed"; //class name for closed button
var mOpened = "opened"; //class name for opened button
var mContClosed = "m_sidebar closed"; //class name for closed menu
var mContOpened = "m_sidebar opened"; //class name for opened menu
burger.onclick = function() {
  if (burger.className == mClosed && access == 1) {
    burger.className = mOpened;
    sidebar.className = mContOpened;
  }
  else if (burger.className == mOpened) {
    burger.className = mClosed;
    sidebar.className = mContClosed;
  }
}

var colorPicker = document.getElementById("bgColor");
function changeColor(){
   var colorVal = colorPicker.value;
   document.getElementById("page").style.background = colorVal;
}
colorPicker.addEventListener("change",changeColor);

document.getElementById('close').onclick = function() {
   var pTag = document.getElementsByTagName('p');
   pTag[pTag.length-1].parentNode.removeChild(pTag[pTag.length-1]);
}

function changeTxt(){
  var size= document.getElementById('txtChange').value;
  var txt = page.getElementsByTagName('p');
  var min = 8;
  var max= 24;
  var change = size + 'px';
    console.log(change);
    console.log(size);
      if (Number.isInteger(+size)){
        for(i=0; i<txt.length; i++){
          if (size >= min && size <=max ){
            txt[i].style.fontSize = change;
            console.log(txt[i].style.fontSize.value);
          }  else {
            alert("Введите от 8 до 24");
            size= "";
            console.log(txt[i]);
                 }
        }
      }
        else{
        alert('Введите целое число');
      }
}

  var font= document.getElementById('font');
  var post = document.getElementById('post');
  font.onclick=function(){
    var family=this.value;
    console.log(family);
    console.log(font);
    post.style.fontFamily=family;
  }

var burger2=document.getElementById('burger2');
var sett=document.getElementById('sett');

var closed2="closed2";
var opened2="opened2";
var settClosed="sett closed2";
var settOpened="sett opened2";
burger2.onclick=function(){
  if(burger2.className==closed2){
    burger2.className= opened2;
    sett.className=settOpened;
  }
  else if(burger2.className==opened2){
    burger2.className=closed2;
    sett.className=settClosed;
  }
}
