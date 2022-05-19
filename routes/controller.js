let express = require("express");
let router = express.Router();
const MongodbClient = require("mongodb").MongoClient;
let url  = "mongodb+srv://root:1234@ostechnologies.pski4.mongodb.net/simplebks";
let sess;

router.get("/",(req, res) => {
    res.status(200)
       .send("Welcome to SIMPLEBKS INTERVIEW TEST");
})

router.post("/login", async (req,res) =>{
	let form  = req.body;
	
	MongodbClient.connect(url,(err,db) =>{
		if(err) throw err
		const db_ = db.db("simplebks")
		db_.collection("olist_sellers_dataset").find({$and:[{seller_id : form.seller_id},{seller_zip_code_prefix : form.seller_zip_code}]}).toArray((err,result) =>{
			if (err) throw err;
			sess = req.session;

			// Caheck if the current user is valid
			if(result.length == 0){
				res.status(200).send({"status" : "error" , "code" : 01 , "msg" : "invalid seller_id or password, please try again."});
			}else{
				// save current user into a session letiable
				sess.userid = result[0].seller_id;
				res.status(200).send({"status" : "success" , "code" : 00 , "msg" : "seller login successfully"});
			}

		});
	})
})

router.get("/order_items/:price/:order_date/:limit/:page",(req,res)=>{
	sess = req.session;
	let price_ = req.params.price;
	let oder_date = req.params.order_date;
	let limit  = parseInt(req.params.limit);
	let dataPage = parseInt(req.params.page);
	let offset = 0;

	if(sess.userid == undefined){
		res.status(401).send({"status":"error",code : "01",msg : "Please login first to be able to access this enpoint."});
	}else{
		MongodbClient.connect(url,(err,db)=>{
			if(err){
				throw err;
				res.status(500).send({status : "error",code : 01 , msg : "database error has occured"})
			}

			const db_ = db.db("simplebks");
			let dataSize=0;

			db_.collection("olist_order_items_dataset").find({seller_id : sess.userid}).toArray((err,stats)=>{
				dataSize = stats.length;
			});

			offset = limit * (dataPage-1);
		
			db_.collection("olist_order_items_dataset").find({seller_id : sess.userid}).skip(offset).sort({"price" : price_,"shipping_limit_date":oder_date}).limit(limit).toArray((err,result)=>{
				res.status(200).send({status : "success",code : 00,msg : "Transaction successful",data : result,total : dataSize,limit : limit,offset : offset});
			});

		})
	}
})

router.get("/logout", (req,res) =>{
	sess = req.session;
	let seller_id = sess.userid;
	delete sess.userid;
	res.status(200).send({msg : "seller "+seller_id+" successfully logout."});	
})

router.delete("/order_items/:id", (req,res)=>{
	sess = req.session;
	var id = req.params.id;

	if(sess.userid == undefined){
		res.status(401).send({"status":"error",code : "01",msg : "Please login first to be able to access this enpoint."});
	}else{	
		MongodbClient.connect(url,(err,db)=>{
			if(err){
				throw err
				res.status(500).send({status : "error",code : 01 , msg : "database error has occured"})
			}
			const db_ = db.db("simplebks")
			db_.collection("olist_order_items_dataset").findOneAndDelete({$and:[{_id : id},{seller_id : sess.userid}]},(err)=>{
				if (err) throw err;
				res.status(200).send({status : "success",code : 00,msg : "Document deleted successfully"});
			});

		})
	}
})

router.patch("/account",(req,res)=>{
	sess = req.session
	let seller_city = req.body.seller_city
	let seller_state = req.body.seller_state

	if(sess.userid == undefined){
		res.status(401).send({"status":"error",code : "01",msg : "Please login first to be able to access this enpoint."});
	}else{	
		MongodbClient.connect(url,(err,db)=>{
			if(err){
				throw err 
				res.status(500).send({status : "error",code : 01 , msg : "database error has occured"})
			} 

			let db_ = db.db("simplebks")
			db_.collection("olist_sellers_dataset").findOneAndUpdate({seller_id : sess.userid},{$set:{seller_city : seller_city, seller_state : seller_state}},{returnNewDocument:true},(err,result)=>{
				if(err) throw err 
				res.send({status : "success", code  : 00 , msg : "document updated successful", data : result})
			})

		})
	}	
})


module.exports = router