var express = require('express');
var router = express.Router();
var orm = require('orm');
var moment = require('moment');
var dbs = require('../dbs/dbs')(router);

router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/backstage', function(req, res, next) {
  res.render('backstage');
});
router.get('/index', function(req, res, next) {
  res.render('index');
});


//新闻信息
router.get('/datanews',dbs.datanews,function(req,res){
	res.send(res.locals.news);
});

router.get('/type1',dbs.type1,function(req,res){
	res.send(res.locals.news);
});
router.get('/type2',dbs.type2,function(req,res){
	res.send(res.locals.news);
});
router.get('/type3',dbs.type3,function(req,res){
	res.send(res.locals.news);
});

// 新增数据
router.post('/addnews',dbs.addnews,function(req,res){
	res.send(res.locals.news);
});
//修改数据
router.post('/update',dbs.update,function(req,res){
	res.json(res.locals.news);
});
// 删除数据
router.post('/delete',dbs.delete,function(req,res){
	res.json(res.locals.news);
});

module.exports = router;