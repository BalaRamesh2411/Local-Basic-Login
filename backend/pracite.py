from flask import Flask,request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import pymysql 

app = Flask(__name__)

CORS(app)


SQLALCHEMY_DATABASE_URI = "mysql+pymysql://root:@127.0.0.1:3306/login"
app.config["SQLALCHEMY_DATABASE_URI"]=SQLALCHEMY_DATABASE_URI
app.config["SQLALCHEMY_POOL_RECYCLE"]=299
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"]=False
db=SQLAlchemy(app)


class User_list(db.Model):
    __tablename__ = "users"
    user_Id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_name = db.Column(db.String)
    user_email = db.Column(db.String)
    user_password = db.Column(db.String)



@app.route('/registeruser', methods=["POST"])
def create_register_list():
    setdata = User_list(
        user_name=request.form["user_name"],
        user_email=request.form["user_email"],
        user_password=request.form["user_password"],
    )
    db.session.add(setdata)
    db.session.commit()
    return "success"



@app.route("/register/<int:id>", methods=["GET"])
def getRegData(id):
    registerdatas = User_list.query.filter_by(user_Id=id).first()
    return jsonify(
        {"user_Id": registerdatas.user_Id, "user_name": registerdatas.user_name, "user_email":registerdatas.user_email,"user_password":registerdatas.user_password}
    )
    
@app.route('/loginUserData',methods=['POST'])
def loginUser():
    loginData = User_list.query.filter_by(user_email=request.form['Emaildata'],user_password=request.form['Passworddata']).first()

    if loginData is None:
        return "user is not found"
    
    return jsonify({'user_email':loginData.user_email,'user_name':loginData.user_name,'user_Id':loginData.user_Id})
