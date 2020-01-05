import React from 'react'
import {FireContext} from './FireContextProvider'
import {VictoryBar} from 'victory'

class DataParser extends React.Component {

    constructor (props) {
        super(props)
        this.state = 
            props.dateStrings.reduce ((endObj, dateString) => {
                endObj[dateString] = []
                return endObj
            }, {})
        // this.state = {
        //     ...this.props.dateStrings
        // }
        this.db = this.props.db
        this.firestore = this.props.firestore
        console.log(this.state);
    }

    handleClick = () => {
        let i = 0
        this.props.docRefs.forEach((doc) => {
            doc.get()
            .then(doc => {
                this.setState(
                    {[this.props.dateStrings[i]]: doc.data()}
                    );
                i++
            })
            .catch(error => {
                console.log(error);
            })
            
        })
        setTimeout(() => {
            console.log(
                Object.keys(this.state["Jan 04 2020"]).reduce ((endArray, key) => {
                    return ([...endArray, {
                        type: key,
                        count: [key]
                    }])
                }

                , [])
                );
        }, 3000)
    }

    render () {
        return (
        <>
            <button onClick={this.handleClick}>OK</button>
            
        </>
        )
    }
}

export default DataParser