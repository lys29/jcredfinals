import styles from './Forgot.module.css';
import Button from './Button.jsx';
// import Arrow from '/images/Vector 23.png';
import Link from 'next/link';
import axios from "axios";
import React from "react";
import { useState } from "react";

const Forgot = () => {
     //CHANGE PASSWORD
     const [ ChangeUsername, setChangeUsername ] = useState('');
     const [ ChangePassword, setChangePassword ] = useState('');
     const [ ConfirmchangePassword, setConChangePassword ] = useState('');
     const [ registerStatus, setRegisterStatus ] = useState('');
 
     const change_password = () => {
         axios({
             method: "post",
             data: {
                 username: ChangeUsername,
                 password: ChangePassword,
                 confirmpassword: ConfirmchangePassword
             },
             withCredentials: true,
             url: "http://192.168.18.5:3001/change_password"
         }).then((response) => {
             if(response.data.message){
                 setRegisterStatus(response.data.message);
             }else{
                 setRegisterStatus("Password Changed Successfully");
             }
         });
 
     }
     
    return (
        <div>
            <div className={styles.container}>
                    <div className={styles.left}>
                        <div className={styles.left1}>
                            <h1>Change Password</h1>
                            <div className={styles.spread}>
                                <input type='Email' placeholder='Email'></input>
                                <input type='Pass' placeholder='New Password'></input>
                                <div className={styles.spr}><input type='checkbox' id="check"></input> <label for="check">Show Password</label></div>
                                <input type='CPass' placeholder='Confirm Password'></input>
                                <div className={styles.spr1}><input type='checkbox' id="check1"></input> <label for="check1">Show Password</label></div>
                            </div>
                            <div className={styles.last}>
                            <Link href='/'><Button><h2>Save Changes</h2><img src="/images/Vector 23.png"/></Button></Link>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default Forgot;