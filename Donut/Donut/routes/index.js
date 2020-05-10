var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt-nodejs');
// const cookieParser = require('cookie-parser');
const session = require('express-session');
var router = express.Router();
var passport = require('passport');
var flash = require('connect-flash');
// const FileStore = require('session-file-store')(session); // 1

router.use(bodyParser.urlencoded({ extended: false }));


// router.use(cookieParser());ㅣ
router.use(session({  // 해킹을 막고자 비밀키를 설정
    key: 'user',
    secret : 'happy', // 암호화
    resave : false,  // 저장유무
    saveUninitialized : true,  // 속성을 초기화 하지 않고 저장
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24000 * 60 * 60 // 쿠키 유효기간 24시간
    }
    // store: new FileStore() //추가
}));


// configuration ===============================================================
var connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'123',
  database:'blockdonut'
});

router.use(passport.initialize());
router.use(passport.session());
router.use(flash());




//이렇게 하고 쿼리문 넣으면 됨!
/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'BlockDonation' });
});

router.get('/HomeSuccessIndiv', function(req, res, next) {
  var userId = req.session.user.userId;
  var amount = req.session.user.amount;
  var privatekey = req.session.user.privatekey;
  var address = req.session.user.address;
  var KeyStore = req.session.user.KeyStore;
  res.render('HomeSuccessIndiv', { title: 'BlockDonation' });
});

router.get('/loginIndiv', function(req, res, next) {
    res.render('loginIndiv', {message: '"Input your id & password"'});
});

router.get('/joinIndiv', function(req, res, next) {
  res.render('joinIndiv', { title: 'BlockDonation' });
});

router.get('/myList', function(req, res, next) {
  var userId = req.session.user.userId;
  var amount = req.session.user.amount;
  var privatekey = req.session.user.privatekey;
  var address = req.session.user.address;
  var KeyStore = req.session.user.KeyStore;

 
  res.render('myList', { title: 'Express', userId:userId, amount:amount, privatekey:privatekey, address:address });
});

router.get('/donation', function(req, res, next) {
  var userId = req.session.user.userId;
  var amount = req.session.user.amount;
  var privatekey = req.session.user.privatekey;
  var address = req.session.user.address;
  var KeyStore = req.session.user.KeyStore;
 
  res.render('donation', { title: 'Express', userId:userId, amount:amount, privatekey:privatekey, address:address });
});


router.get('/admin', function(req, res, next) {
  var userId = req.session.user.userId;
  var amount = req.session.user.amount;
  var privatekey = req.session.user.privatekey;
  var address = req.session.user.address;
  var KeyStore = req.session.user.KeyStore;

 
  res.render('admin', { title: 'Express', userId:userId, amount:amount, privatekey:privatekey, address:address });
});

router.get('/confirm', function(req, res, next) {
  var userId = req.session.user.userId;
  var amount = req.session.user.amount;
  var privatekey = req.session.user.privatekey;
  var address = req.session.user.address;
  var KeyStore = req.session.user.KeyStore;

 
  res.render('confirm', { title: 'Express', userId:userId, amount:amount, privatekey:privatekey, address:address });
});


router.get('/homeOrg', function(req, res, next) {
  res.render('homeOrg', { title: 'BlockDonation' });
});

router.get('/HomeSuccessOrg', function(req, res, next) {
  var userId = req.session.user.userId;
  var amount = req.session.user.amount;
  var privatekey = req.session.user.privatekey;
  var address = req.session.user.address;
  var KeyStore = req.session.user.KeyStore;
  res.render('HomeSuccessOrg', { title: 'BlockDonation' });
});

router.get('/joinOrg', function(req, res, next) {
  res.render('joinOrg', { title: 'BlockDonation' });
});


router.get('/loginOrg', function(req, res, next) {
  res.render('loginOrg', {message: '"Input your id & password"'});
});


router.get('/register', function(req, res, next) {
  var userId = req.session.user.userId;
  var amount = req.session.user.amount;
  var privatekey = req.session.user.privatekey;
  var address = req.session.user.address;
  var KeyStore = req.session.user.KeyStore;

 
  res.render('register', { title: 'Express', userId:userId, amount:amount, privatekey:privatekey, address:address });
});


router.get('/logout', function(req, res, next) {
console.log('logout 호출됨.');

if(req.session.user){
  console.log('로그아웃을 실행합니다.');
  req.session.destroy(function(error){
    if(error) {throw error;}

    console.log('세션을 삭제하고 로그아웃되었습니다.');
    res.render('./goodbye');
    // res.redirect('./');
  });
} else{
  console.log('아직 로그인이 되어있지 않습니다.');
  res.redirect('./');
}
});










/*       POST로 받아오는 부분         */
router.post('/myList_amount', function(req,res){
  let amount = req.body.amount;
  console.log(amount);
  var sql = 'insert into userinfo (amount) values(?)';
    var params = [amount];
      connection.query(sql , params, function(error, results, fields) {
        // if(error) throw error;
        //console.log(error);
        console.log(results);
        res.render('완료');
        //connection.end();

      });
});

router.post('/JoinIndiv', function(req, res){
  console.log('start');
  // var sendData = {};
  let userName = req.body.userName;
  console.log(userName);
  console.log(req.body.userName);

  let userId = req.body.userId;
  console.log(req.body.userId)
  console.log(userId)
  let password = req.body.password;
  console.log(req.body.password)
  console.log(password)
  let birthdate = req.body.birthdate;
  console.log(req.body.birthdate)
  console.log(birthdate)
  let phonenum = req.body.phonenum;
  console.log(req.body.phonenum)
  let userType = req.body.userType;
  console.log(req.body.userType)

  let email = req.body.email;
  console.log(req.body.email)

  let address = req.body.address;
  let privateKey = req.body.privateKey;
  let KeyStore = req.body.KeyStore;
  console.log(KeyStore)
  
  // connection.connect();

  bcrypt.hash(password, null, null, function(error, hash){

    console.log("insert");
    var sql = 'insert into userinfo (userName, userId, password, birthdate, phonenum, userType, email, address, privatekey,KeyStore) values( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    var params = [userName, userId, hash, birthdate, phonenum, userType, email, address, privateKey,KeyStore];
      connection.query(sql , params, function(error, results, fields) {
        // if(error) throw error;
        //console.log(error);
        console.log(results);
        
        //connection.end();

      });
    res.redirect('./loginIndiv');
  });
});


router.post('/confirm', function(req, res){
  res.send( console.log('sd'));
  location.href("./myList");

});


router.post('/JoinOrg', function(req, res){
  // console.log(req.session.user.address);
  console.log('start');
  // var sendData = {};
  let userName = req.body.userName;
  console.log(userName);
  console.log(req.body.userName);

  let userId = req.body.userId;
  console.log(req.body.userId)
  console.log(userId)
  let password = req.body.password;
  console.log(req.body.password)
  console.log(password)
  let birthdate = req.body.birthdate;
  console.log(req.body.birthdate)
  console.log(birthdate)
  let phonenum = req.body.phonenum;
  console.log(req.body.phonenum)
  let userType = req.body.userType;
  console.log(req.body.userType)

  let email = req.body.email;
  console.log(req.body.email)

  // let mailCheck = req.body.mailCheck;
  let address = req.body.address;
  let privateKey = req.body.privateKey;
  let KeyStore = req.body.KeyStore;
  console.log(KeyStore)
  
  // connection.connect();

  bcrypt.hash(password, null, null, function(error, hash){

    console.log("insert");
    var sql = 'insert into userinfo (userName, userId, password, birthdate, phonenum, userType, email, address, privatekey,KeyStore) values( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    var params = [userName, userId, hash, birthdate, phonenum, userType, email, address, privateKey,KeyStore];
      connection.query(sql , params, function(error, results, fields) {
        // if(error) throw error;
        //console.log(error);
        console.log(results);
        
        //connection.end();

      });
    // var link = "http://13.125.213.224"
    //res.send( console.log('sd'));
      res.redirect('./loginOrg');
  });
});





/////////////////////로그인///////////////////////

router.post('/loginIndiv', function(req, res){         //app.post('login_user',  form에서 로그인 버튼을 누르면 login_user
 console.log(req.body);
//  var check = 0;
 var userId = req.body.userId;                  // 경로로 이동할 것이고 login_user 경로가 된다면 app.post를 실행함 뜻
 var password = req.body.password;                        // input 의 id,pw를 입력 후에 데이터를 서버로 보내는 과정에서
 var loginsql = 'SELECT * FROM userinfo WHERE userId = ?';      // 난 express 모듈을 사용하기 때문에, bodyParser를 이용함
                                console.log(req.body.userId, req.body.password);                          
 connection.query(loginsql, userId, function (error, results, fields) {
        console.log('/loginIndiv 호출됨.');  

        if(req.session.user){
          console.log('이미 로그인이 되어있으므로 메인페이지로 이동합니다.');
          res.redirect('./');
        } else{ 
        if (error) {
               console.log('err :' + error);
        } else {
                console.log(results);
                if (results[0]!=undefined) {
                    console.log(results[0].password, password);
                        if (!bcrypt.compareSync(password, results[0].password)) {     
                          console.log('패스워드가 일치하지 않습니다.');
                          return res.render('loginIndiv', {message: '"please check your password"'});
                            

                        } else {
                                console.log('로그인 성공');
                                // check = 1;
                                req.session.user = {userId:results[0].userId, 
                                  password:results[0].password, 
                                  userName:results[0].userName, 
                                  privatekey:results[0].privatekey, 
                                  address:results[0].address, 
                                  amount:results[0].amount,
                                  KeyStore:results[0].KeyStore,
                                  // check:check
                                  };
                                console.log('로그인 ID : ' + req.session.user.userId);
                                console.log('회원 이름 : ' + req.session.user.userName);
                                console.log('회원 EOA : ' + req.session.user.address);
                                console.log('회원 PK : ' + req.session.user.privatekey);
                                console.log('amount : ' + req.session.user.amount);
                                console.log('KeyStore : ' + req.session.user.KeyStore);


                                res.cookie("user", req.body.userId,{
                                  expires: new Date(Date.now() + 900000),
                                  httpOnly: true
                                });

                                res.render('./welcome', {userName: req.session.user.userName});
                                // res.redirect('./');
                        }
                } else {
                        console.log(results[0]);
                        console.log('해당 유저가 없습니다');
                        return res.render('loginIndiv', {message: '"please check your id"'});
                }
        }
      }
        });
});


router.post('/loginOrg', function(req, res){         //app.post('login_user',  form에서 로그인 버튼을 누르면 login_user
 console.log(req.body);
//  var check = 0;
 var userId = req.body.userId;                  // 경로로 이동할 것이고 login_user 경로가 된다면 app.post를 실행함 뜻
 var password = req.body.password;                        // input 의 id,pw를 입력 후에 데이터를 서버로 보내는 과정에서
 var loginsql = 'SELECT * FROM userinfo WHERE userId = ?';      // 난 express 모듈을 사용하기 때문에, bodyParser를 이용함
                                console.log(req.body.userId, req.body.password);                          
 connection.query(loginsql, userId, function (error, results, fields) {
        console.log('/loginOrg 호출됨.');  

        if(req.session.user){
          console.log('이미 로그인이 되어있으므로 메인페이지로 이동합니다.');
          res.redirect('./HomeSuccessOrg');
        } else{ 
        if (error) {
               console.log('err :' + error);
        } else {
                console.log(results);
                if (results[0]!=undefined) {
                    console.log(results[0].password, password);
                        if (!bcrypt.compareSync(password, results[0].password)) {     
                          console.log('패스워드가 일치하지 않습니다.');
                          return res.render('loginOrg', {message: '"please check your password"'});
                            

                        } else {
                                console.log('로그인 성공');
                                // check = 1;
                                req.session.user = {userId:results[0].userId, 
                                  password:results[0].password, 
                                  userName:results[0].userName, 
                                  privatekey:results[0].privatekey, 
                                  address:results[0].address, 
                                  amount:results[0].amount,
                                  KeyStore:results[0].KeyStore,
                                  // check:check
                                  };
                                console.log('로그인 ID : ' + req.session.user.userId);
                                console.log('회원 이름 : ' + req.session.user.userName);
                                console.log('회원 EOA : ' + req.session.user.address);
                                console.log('회원 PK : ' + req.session.user.privatekey);
                                console.log('amount : ' + req.session.user.amount);
                                console.log('KeyStore : ' + req.session.user.KeyStore);


                                res.cookie("user", req.body.userId,{
                                  expires: new Date(Date.now() + 900000),
                                  httpOnly: true
                                });

                                res.render('./HomeSuccessOrg');
                                // res.redirect('./');
                        }
                } else {
                        console.log(results[0]);
                        console.log('해당 유저가 없습니다');
                        return res.render('loginOrg', {message: '"please check your id"'});
                }
        }
      }
        });
});


      //register
// router.post('/register', function(req, res){
//   console.log('./register start');
//   // var sendData = {};
// });

//////////////////////////////////////마이페이지

// router.post('/myList', function(req, res, next) {
//   var address = req.session.user.address;
//   var amount = req.session.user.amount;
//   console.log(address);
//   console.log(amount);
//   console.log("## post request"); 
//   res.render('myList', { title: 'Express', address: address, amount : amount, method: "post" });
// });



module.exports = router;
