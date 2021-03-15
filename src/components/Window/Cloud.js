import React from 'react';
import './Cloud.css';
import cloud1 from '../../img/clouds/cloud1.png';
import cloud2 from '../../img/clouds/cloud2.png';
import cloud3 from '../../img/clouds/cloud3.png';
import { motion } from 'framer-motion';

const Cloud = (props) => {
    //cloud lifetime in seconds
    const cloudLifeTime = (props.lifetime / 1000)
    let initialCloudPos = 0;
    const cloudSpeed = (cloudLifeTime - 5)



    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function cloudDistance(lifetime) {
        console.log(lifetime)
        console.log(parseInt(lifetime))
        console.log('cloudDistance lifetime: ' + lifetime)
        let distance = ""
        if (lifetime >= 30 && lifetime < 40) {
            //big cloud
            distance = "1"
            initialCloudPos = -340
        } else if (lifetime >= 40 && lifetime < 60) {
            //smaller cloud
            distance = "2"
            initialCloudPos = -220
        } else if (lifetime >= 60 && lifetime < 100) {
            //smaller cloud
            distance = "3"
            initialCloudPos = -200
        } else if (lifetime >= 100 && lifetime < 150) {
            //smaller cloud
            distance = "4"
            initialCloudPos = -180
        } else if (lifetime >= 150 && lifetime < 200) {
            //smaller cloud
            distance = "5"
            initialCloudPos = -150
        } else if (lifetime >= 200) {
            //smaller cloud
            distance = "6"
            initialCloudPos = -100
        }
        console.log('cloud' + distance)
        return ('cloud' + distance)
    }

    function randomizeCloud() {
       const cloud = randomIntFromInterval(1, 3)
       switch (cloud) {
           case 1: 
                return cloud1
           case 2:
                return cloud2
            case 3:
                return cloud3
       }
    }

    return (
        <div className={cloudDistance(cloudLifeTime)}>
            <motion.img src={randomizeCloud()}
                        initial={{x: initialCloudPos}}
                        animate={{x: 2500}}
                        transition={{duration: cloudSpeed, type: 'tween'}}
            />
        </div>
    )
}

export default Cloud;