var express = require('express');
var orm = require('orm');
var moment = require('moment');

//服务器设置
var dbusername = "root";
var dbpassword = "";
var dbname = "newsdata";

//导入到路由
module.exports = function(router){

	//数据库设置	
	router.use(orm.express("mysql://" + dbusername + ":" + dbpassword + "@localhost/" + dbname, {
	    define: function (db, models, next) {
			models.news = db.define("news", {
	        	newsid: {
	                type: 'serial',
	                key: true
	            },
	            newstype:String,
	            newstitle: String,
	            newsimg: String,
	            newscontent: String,
	            newstime: String
	        });
	        next();
	    }
	}));

	//数据库操作
	var dbs = {
		//获取新闻信息
		datanews:function(req,res,next){
			req.models.news.find({
				
			}, function(err, news) {
				if (err) throw err;
				res.locals.news = news;
				next();
			});
		},
		//查询新闻
		type1:function(req,res,next){
			req.models.news.find({
				newstype:'type1'
			}, function(err, news) {
				if (err) throw err;
				res.locals.news = news;
				next();
			});
		},
		type2:function(req,res,next){
			req.models.news.find({
				newstype:'type2'
			}, function(err, news) {
				if (err) throw err;
				res.locals.news = news;
				next();
			});
		},
		type3:function(req,res,next){
			req.models.news.find({
				newstype:'type3'
			}, function(err, news) {
				if (err) throw err;
				res.locals.news = news;
				next();
			});
		},
		
		//新增数据
		addnews:function(req,res,next){
			// console.log(req.models.news)
			req.models.news.create({
				newstype:req.body.newstype,
				newstitle:req.body.newstitle,
				newsimg: req.body.newsimg,
				newscontent: req.body.newscontent,
				newstime: req.body.newstime
			}, function(err) {
				if (err) throw err;
				res.locals.news = "数据插入成功";
				next();
			});
		},
		//修改数据
		update:function(req,res,next){
			req.models.news.get(req.body.newsid, function (err, news) {
			    news.save({ 
		    		newstype:req.body.newstype,
					newstitle:req.body.newstitle,
					newsimg: req.body.newsimg,
					newscontent: req.body.newscontent,
					newstime: req.body.newstime
			    }, function (err) {
			    	if (err) throw err;
			    	res.locals.news = "修改数据成功";
			    	next();
			    });
			});
		},
		//删除数据
		delete:function(req,res,next){
			req.models.news.get(req.body.newsid, function (err, news) {
			    news.remove(function (err) {
			    	if (err) throw err;
			    	res.locals.news = "删除数据成功";
			    	next();
			    });
			});
		}
	}

	return dbs;
}