import React from "react";
import {
  Card,
  CardBody,
  Input,
  Label,
  Row,
  Form,
  Col,
  Spinner,
} from "reactstrap";
import axios from "axios";
import { ContextLayout } from "../../../utility/context/Layout";
import { AgGridReact } from "ag-grid-react";
//import BaseURLAPI from "../../../../src/redux/helpers/api_functions"

import "../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../assets/scss/pages/users.scss";
import * as Icon from "react-feather";
import { history } from "../../../history";
import { getAPICall, postAPICall ,BaseURLAPI } from "../../../redux/helpers/api_functions";
import { connect } from "react-redux";
import NotificationManager from "react-notifications/lib/NotificationManager";
class addpresale extends React.Component {
 state={
     levelName:"",
     coinQty:"",
     coinPrice:"",
     duration:""
     
 };
 submitHandler(e){
     e.preventDefault();
     let{levelName,coinQty,coinPrice,duration} =this.state;
     if(levelName=="" || coinQty=="" || coinPrice=="" || duration==""){
        NotificationManager.warning("Please fill the field Properly.")
     }
     else{
        axios.post(BaseURLAPI +"/addpresale",{levelname:levelName,coinquantity:coinQty,coinprice:coinPrice,duration:duration}).then((res)=>{
            console.log(res.data,"response.....");
            NotificationManager.success("Pre-sale added successfully.")
            setTimeout(()=>{ window.location.reload();},1000)
        }).catch((err)=>{
          NotificationManager.error("Something went wrong.")
        })
     }
     
    console.log(this.state.levelName,"hello")


 }
 

 

  render() {
    return (
      <Row className="app-user-list">
        <Col sm="12"></Col>
        <Col sm="12">
          <Card>
            <CardBody style={{ height: "70vh" }}>
              <h1 className="text-center">Add Pre-sale</h1>
              <Form className="py-4" onSubmit={this.submitHandler.bind(this)}>
                <div className="form-group row d-flex justify-content-center">
                  <Label for="levelname" className="col-sm-2 col-md-2 col-lg-1 col-form-label">
                    Level Name
                  </Label>
                  <div className="col-sm-10 col-md-6">
                    <Input
                      type="text"
                      className="form-control px-1"
                      id="levelname"
                      placeholder="Enter Level"
                      onChange={(e)=>{this.state.levelName=e.target.value;}}
                      value={this.levelName}
                    />
                  </div>
                </div>
                <div className="form-group row d-flex justify-content-center">
                  <Label for="coinQty" className="col-sm-2 col-md-2 col-lg-1 col-form-label">
                    Coin Quantity
                  </Label>
                  <div className="col-sm-10 col-md-6">
                    <Input
                      type="text"
                      className="form-control px-1"
                      id="coinQty"
                      placeholder="Coin Quantity"
                      onChange={(e)=>{this.state.coinQty=e.target.value;}}
                      value={this.coinQty}
                    />
                  </div>
                </div>
                <div className="form-group row d-flex justify-content-center">
                  <Label for="coinPrice" className="col-sm-2 col-md-2 col-lg-1 col-form-label">
                    Coin Price
                  </Label>
                  <div className="col-sm-10 col-md-6">
                    <Input
                      type="text"
                      className="form-control px-1"
                      id="coinPrice"
                      pattern="/^\d*\.?\d*$/"
                      title="Coin price can be in number or digits"
                      placeholder="Coin Price"
                      onChange={(e)=>{this.state.coinPrice=e.target.value;}}
                      value={this.coinPrice}
                    />
                  </div>
                </div>
                <div className="form-group row d-flex justify-content-center">
                  <Label for="duration" className="col-sm-2 col-md-2 col-lg-1 col-form-label">
                    Duration
                  </Label>
                  <div className="col-sm-10 col-md-6">
                    <Input
                      type="number"
                      className="form-control px-1"
                      id="duration"
                      placeholder="Enter Duration"
                      onChange={(e)=>this.state.duration=e.target.value}
                      value={this.duration}
                    />
                  </div>
                </div>
                <div className="btnClass d-flex justify-content-center">
                <button type="submit" className="btn btn-primary">Submit</button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUserId: state.auth.login.user.user_id,
  };
};
export default connect(mapStateToProps)(addpresale);
