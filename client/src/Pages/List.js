import axios from 'axios';
import React, { Component, Fragment } from 'react';

export class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            image: []
        };
    }


    async componentDidMount() {
        await axios.post('/readupload')
            .then(res => {
                this.setState({
                    image: res.data
                })
            })
            .catch(err => {
                console.error(err)
            })
    }

    async componentDidUpdate() {
        await axios.post('/readupload')
            .then(res => {
                this.setState({
                    image: res.data
                })
            })
            .catch(err => {
                console.error(err)
            })
    }

    
    render() {

        return (
            <div className='container mt-4'>
                <Fragment>
                    {creatDelbtn(this.state.image)}
                </Fragment>
            </div>
        )
    }
}

const creatDelbtn = (image) => {
    let delbtn = []
    for (let i = 0; i < image.length; i++) {
        delbtn.push
        (
        <button key={image[i].imagename} type="button" className="btn btn-danger mt-4" 
        onClick={(e) => DelonClick(e,image[i].imagename)}>Delete</button>
        )
        delbtn.push(<br id={"break" + i} key={"break" + i} />)
    }
    return delbtn
}

const DelonClick = async (e,imagename) => {
    const formData = new FormData();
    formData.append('name',imagename)
    await axios.post('/delImg',formData)
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.error(err)
        })

}
export default List
