import styles from './Title.module.css';
import Button from './Button.jsx';
import Link from 'next/link';
import axios from "axios";
import React from "react";
import { useRouter } from 'next/router';
import { useState } from "react";

const Title = () => {
   
        //LOG IN USERS
        const [ loginEmail, setLoginEmail ] = useState('');
        const [ loginPassword, setLoginPassword ] = useState('');
        const [ registerStatus, setRegisterStatus ] = useState('');
        const router = useRouter();
    
        const login = () => {
            axios({
                method: "post",
                data: {
                    email: loginEmail,
                    password: loginPassword
                },
                withCredentials: true,
                url: "http://localhost:3001/login"
            }).then((response) => {
                if(response.data.message == "No User Exist"){
                    setRegisterStatus(response.data.message);
                }else{
                    router.push('/Welcome')//name of page na may users 
                }
            })
        };
        
    return (
        <div>
            <div className={styles.container}>
                    <div className={styles.left}>
                        <div className={styles.left1}>
                            <h1>Login</h1>
                            <h5>Please sign in to continue.</h5>
                            <div className={styles.spread}>
                                <input type='Email' onChange={e => setLoginEmail(e.target.value)}  placeholder='Email' required/>
                                <div className={styles.p}>
                                    <input type='Pass' id="pswrd" name="pswrd" onChange={e => setLoginPassword(e.target.value)} pattern="[a-z0-9]{1,15}" title="Password should be digits (0 to 9) or alphabets (a to z)." placeholder="Password" required />
                                </div>
                            </div>
                            <div className={styles.but}><Link href='/Forgot'><Button>Forgot Password</Button></Link></div>
                            <div className={styles.next}><Link href='/Welcome'><Button onClick ={login} type="submit"><h2>Login</h2><img src="/images/Vector 23.png"/></Button></Link></div>
                            <div className={styles.last}><p>Don't have an account?</p><Link href='/Newa'><Button>Sign up</Button></Link></div>
                            <h1 style={{color:'red', fontSize: '15px', textAlign:'center', marginTop: '20px'}}>{registerStatus}</h1>
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default Title;