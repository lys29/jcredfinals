import styles from './Newa.module.css';
import { useState } from "react";
import Button from './Button.jsx';
import axios from "axios";
import React from "react";
// import Arrow from '/images/Vector 23.png';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Newa = () => {
    const [ registerFullName, setRegisterFullName ] = useState('');;
    const [ registerEmail, setRegisterEmail ] = useState('');
    const [ registerPassword, setRegisterPassword ] = useState('');
    const [ registerCPassword, setRegisterCPassword ] = useState('');
    const [ registerStatus, setRegisterStatus ] = useState('');
    const router = useRouter();

    const register = () => {
        axios({
            method: "post",
            data: {
                fullname: registerFullName,
                username: registerUsername,
                email: registerEmail,
                password: registerPassword,
                confirmpassword: registerCPassword
            },
            withCredentials: true,
            url: "http://localhost:3000/register"
        }).then((response) => {
            if(response.data.message == "Username Already Taken"){
                setRegisterStatus(response.data.message);
            }else{
                router.push('/');
            }
        })
    };


    return (
        <div>
            <div className={styles.container}>
                    <div className={styles.left}>
                        <div className={styles.left1}>
                            <h1>Create Account</h1>
                            <div className={styles.spread}>
                                <input type='Email' onChange={e => setRegisterFullName(e.target.value)} placeholder='Full name'></input>
                                <div className={styles.p}>
                                    <input type='Email' onChange={e => setRegisterEmail(e.target.value)} placeholder='Email'></input>
                                </div>
                                <div className={styles.p}>
                                    <input type='Email' onchange={e => setRegisterPassword(e.target.value)} id="pass" name="pass" pattern="[a-z0-9]{1,15}" title="Password should be digits (0 to 9) or alphabets (a to z)." placeholder='Password' required></input>
                                </div>
                                <div className={styles.p}>
                                    <input type='Pass' onchange={e => setRegisterCPassword(e.target.value)} id="cpass" name="cpass" pattern="[a-z0-9]{1,15}" title="Password should be digits (0 to 9) or alphabets (a to z)." placeholder='Confirm Password' required></input>
                                </div>
                            </div>
                            <div className={styles.prior}><Link href='/Welcome'><Button onClick={register} type="submit"><h2>Sign Up</h2><img src="/images/Vector 23.png"/></Button></Link></div>
                            <div className={styles.last}><p>Already have an account?</p><Link href='/'><Button>Sign in</Button></Link></div>
                            <h1 style={{color:'red', fontSize: '15px', textAlign:'center', marginTop: '20px'}}>{registerStatus}</h1>
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default Newa;