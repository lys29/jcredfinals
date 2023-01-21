import styles from './Title.module.css';
import Button from './Button.jsx';
import Link from 'next/link';

const Title = () => {
    return (
        <div>
            <div className={styles.container}>
                    <div className={styles.left}>
                        <div className={styles.left1}>
                            <h1>Login</h1>
                            <h5>Please sign in to continue.</h5>
                            <div className={styles.spread}>
                                <input type='Email' placeholder='Email'></input>
                                <div className={styles.p}>
                                    <input type='Pass' placeholder='Password'></input>
                                </div>
                            </div>
                            <div className={styles.but}><Link href='/Forgot'><Button>Forgot Password</Button></Link></div>
                            <div className={styles.next}><Link href='/Welcome'><Button><h2>Login</h2><img src="/images/Vector 23.png"/></Button></Link></div>
                            <div className={styles.last}><p>Don't have an account?</p><Link href='/Newa'><Button>Sign up</Button></Link></div>
                        </div>
                    </div>
            </div>
        </div>
    );
};

export default Title;