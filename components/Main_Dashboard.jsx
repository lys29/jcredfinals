import styles from "./Main_Dashboard.module.css";
import React from "react";
import { useState, useEffect } from 'react';
import Link from 'next/link';

function MainDashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function getPageData(){
        const response = await fetch('http:localhost:3000/camera');
        const res = await response.json();
        setData(res.data);
    }
    getPageData();

  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  const image_set = 'data:image/png;base64,';
  const current_date = new Date();
  const date = `${current_date.getDate()}/${current_date.getMonth()+1}/${current_date.getFullYear()}`

    return (
        
        <div className={styles.background}>
            
            <div className={styles.navigation}>
            <Link href="/"><button className={styles.logout_button}>LOG OUT</button></Link>
                <label className={styles.date_today}>Date Today:{date}</label>
            </div>
            <div className={styles.container}>
                {data ? data.map(datas =>(
                <div className={styles.image_container}>
                    <div className={styles.main_image_container}>
                        <img className={styles.image} src={image_set + Buffer.from(datas.image).toString('utf-8')}/>
                        <br/>
                        <label className={styles.dateTime}>{datas.datetime}</label>
                    </div>
                    <div className={styles.sub_images}>
                        <div>
                            <img className={styles.image1} src="/images/no-image.png"/>
                            <br/>
                            <label className={styles.dateTime}>Date and Time Recorded: This is Time</label>
                        </div>
                        <div >
                            <img className={styles.image2} src="/images/no-image.png"/>
                            <br/>
                            <label className={styles.dateTime}>Date and Time Recorded: This is Time</label>
                        </div>
                        <div>
                            <img className={styles.image2} src="/images/no-image.png"/>
                            <br/>
                            <label className={styles.dateTime}>Date and Time Recorded: This is Time</label>
                        </div>
                    </div>
                </div>
                )) :(<p> Loading</p>)}
            </div>
            
        </div>
  
    );
};

export default MainDashboard;