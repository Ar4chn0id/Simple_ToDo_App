var express = require('express');
var router = express.Router();
var fs = require("fs");

const veri = JSON.parse(fs.readFileSync('veriler.json', 'utf8'));
//console.log(veri);

router.get("/home", (req, res) =>{
  res.render("home",{notlar: veri.notlar})
})

router.get("/add", (req, res) =>{
  res.render("add",{})
})

router.get("/read/:id", (req, res) =>{
  const notId = parseInt(req.params.id);
  const item = veri.notlar.find((item) => item.id == notId);

  if (item) {
    res.render("read",{ title: item.başlık, content: item.içerik });
  } else {
    res.status(404).send('Nesne bulunamadı');
  }
})

router.get('/delete/:id', (req, res) => {
  const IdToDelete = parseInt(req.params.id);
  const result = veri.notlar.filter(notlar => notlar.id != IdToDelete);
  veri.notlar = result;
  fs.writeFileSync('veriler.json', JSON.stringify(veri));
  res.render("home",{notlar: veri.notlar});
});

router.post("/add", (req,res) => {
  const baslik = req.body.başlık;
  const içerik = req.body.içerik;
  const id =req.body.id;
  if(baslik || içerik != ""){
    console.log(baslik,içerik,id);
    var x= {"id":id,"başlık":baslik,"içerik":içerik};
    veri.notlar.push(x);
    fs.writeFileSync('veriler.json', JSON.stringify(veri));
    res.render("home",{notlar: veri.notlar})
  }
  else{
    res.render("add");
  }

})


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home',{notlar: veri.notlar});
});





module.exports = router;
