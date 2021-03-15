import React, {Component} from 'react';
import "./Window.css"
import Cloud from './Cloud';

class Window extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            windDirection: 'right',
            cloudArrayLength: 0,
            cloudArray: [],
            delay: 60000
        }
    }

    componentDidMount() {
        // this.randomizeWind()
        this.interval = setInterval(this.generateClouds, this.state.delay)
    }

    componentDidUpdate(prevProps, prevState) {    
        if (prevState.cloudArray !== this.state.cloudArray) {   
            clearInterval(this.interval);      
            this.interval = setInterval(this.generateClouds, this.state.delay);    
        }  
    }

    componentWillUnmount() {    
        clearInterval(this.interval);  
    }

    randomizeWind = () => {
        if (Math.random() > 0.5) {
            this.setState({
                windDirection: 'right'
            })
        } else {
            this.setState({
                windDirection: 'left'
            })
        }
    }

    randomIntFromInterval = (min, max) => { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    generateClouds = () => {
        console.log('chance')
        console.log(this.state.cloudArrayLength)
            if (Math.random() > 0.5 && this.state.cloudArrayLength < 3) {
                console.log('generating cloud')
                //create a cloud and remove it after a certain amount of time
                const cloudLifetime = this.randomIntFromInterval(30000, 300000)
                let newCloudArray = this.state.cloudArray
                console.log('????')
                console.log(this.state.cloudArrayLength)
                const newCloudArrayLength = newCloudArray.push(<Cloud lifetime={cloudLifetime}
                                            windDirection={this.state.windDirection}
                                            key={cloudLifetime}/>)
                console.log(newCloudArray)
                this.setState({
                    cloudArrayLength: newCloudArrayLength,
                    cloudArray: newCloudArray
                }, this.cloudKill(cloudLifetime))
            }
    }

    cloudKill = (lifetime) => {
        setTimeout(() => {
            const newCloudArrayLength = (this.state.cloudArrayLength - 1)
            const newCloudArray1 = this.state.cloudArray
            const cloudIndex = newCloudArray1.findIndex(cloud => cloud.key == lifetime)
            newCloudArray1.splice(cloudIndex, 1)
            this.setState({
                cloudArrayLength: newCloudArrayLength,
                cloudArray: newCloudArray1,
            })
            console.log('splicing index : ' + lifetime)
        }, lifetime)
    }

    render() {

        return (
            <div className="window">
                {this.state.cloudArray}
            </div>
        )
    }
}

export default Window;