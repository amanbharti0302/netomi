import React from "react";
import './form.styles.scss';

import $ from 'jquery';
var ReactDOM = require('react-dom');


class Form extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:"",
            birthday:"",
            contact:"",
            country:"Not Selected",
            state:"Not Selected",
            email:""
        };
    }

    setStateData(cur){
        if(cur==="Not Selected")return;
        cur = JSON.parse(cur);
        var list =[];
        list.push(<option value="Not Selected">Not Selected</option>);
        cur.states.map((el)=>{
            list.push(<option value={JSON.stringify(el)} name = {el.name}>{el.name}</option>);
        })
        ReactDOM.render(list, document.getElementById('state'));
    }


    handleChange = event => {
        const { value, name } = event.target;    
        this.setState({ [name]: value });
        if(name === "country")this.setStateData(value);
    };

    showerror(error){
        const message = <p style={{color:"red"}}>{JSON.stringify(error)}</p>
        ReactDOM.render(message, document.getElementById('message'));
    }

    handleSubmit = async e => {
        e.preventDefault();
        // /const d = new Date();
        const {name,birthday,contact,country,state,email} = this.state;
        ///var chdate = d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate();
        //console.log(birthday,chdate);
        
        if(name===""||name.length<4||name.length>10)this.showerror({Status:"FAIL",message:"Invalid Name"});       
        else if(birthday==="" || birthday>Date.now())this.showerror({Status:"FAIL",message:"Invalid Birthday"});
        else if(contact==="" ||contact.length!=10)this.showerror({Status:"FAIL",message:"Invalid Contact details"});
        else if(country==="")this.showerror({Status:"FAIL",message:"Invalid Country Details"});
        else if(state==="")this.showerror({Status:"FAIL",message:"Invalid State Details"});
        else if(email==="")this.showerror({Status:"FAIL",message:"Invalid Email"});
        else this.showerror({Status:"success",message:"All fields are valid"});
    }
    

    render(){
        $.get("https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json",(res)=>{
            res = JSON.parse(res);
            var list =[];
            list.push(<option value="Not Selected" name = "Not Selected">Not Selected</option>);
            res.map((el)=>{
                list.push(<option value={JSON.stringify(el)} name ={el.name} >{el.name}</option>);
            })
            ReactDOM.render(list, document.getElementById('country'));
        })

        return(
            <div className="form-div">
                <form  className="form" method = "POST" onSubmit = {this.handleSubmit}>
                    <label for="name">Name</label>
                    <input type="text" minLength="4" maxLength="10" id="name" name="name" value = {this.state.name} placeholder="Name" onChange = {this.handleChange}/>

                    <label for="birthday">Date of Birth</label>
                    <input type="date" id="birthday" name="birthday" value = {this.state.birthday} onChange = {this.handleChange} />

                    <label for="contact">Contact</label>
                    <input type="number" min="1111111111" max="9999999999" id="contact" name="contact" placeholder="Contact" value = {this.state.contact} onChange = {this.handleChange}/>

                    <label for="country">Country</label>
                    <select type="search"  id="country" name="country" value = {this.state.country} onChange = {this.handleChange}>
                        <option value="Not Selected">Not Selected</option>    
                    </select>

                    <label for="state">State</label>
                    <select type="text" id="state" name="state" value = {this.state.state} onChange = {this.handleChange}>
                        <option value="Not Selected">Not Selected</option>    
                    </select>

                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="John@email.com" value = {this.state.email} onChange = {this.handleChange}/>

                    <button type="submit" className="btn-sub">Submit</button>
                </form>

                <div id = "message"></div>
            </div>
        )
    }

}

export default Form;