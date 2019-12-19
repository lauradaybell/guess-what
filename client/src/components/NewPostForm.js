import React from 'react'
import CanvasDraw from 'react-canvas-draw'
import { withUser } from '../context/UserProvider'
import {withGetScreen} from 'react-getscreen'


class NewPostForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            width: 450,
            height: 450
        }
    }

    componentDidMount() {
        if (this.props.isMobile()) {
            this.setState({
                height: 250,
                width: 250
            })};
        if (this.props.isTablet()) {
            this.setState({
                height: 300,
                width: 300
            })
        }
    }

    handleChange = (e) => {
        const {name, value} = e.target 
        this.setState({
            [name]: value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        e.target.reset()
        const savedDrawing = this.saveableCanvas.getSaveData()
        
        this.props.handleAddPost(this.state.title, savedDrawing)
        this.saveableCanvas.clear()
        this.setState({
            title: '',
            
        })
    }
    
    render() {
        return(
            <div>
                <form className="newPostForm" onSubmit={this.handleSubmit}>
                    <input 
                        type="text" 
                        name="title" 
                        placeholder="title" 
                        value={this.state.title}
                        onChange={this.handleChange} 
                        className="newPostTitle" />
                <CanvasDraw id='canvas'
                    className="newCanvas"
                    canvasWidth={this.state.width}
                    canvasHeight={this.state.height}
                    ref={canvasDraw => (this.saveableCanvas = canvasDraw)}
                    />
                    <button className="newPostBtn" >Post</button>
                </form>
            </div>
        )
    }
}

export default withGetScreen(withUser(NewPostForm))