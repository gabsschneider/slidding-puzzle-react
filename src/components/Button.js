import React, { Component } from 'react'
import './Button.css'

export default class Button extends Component {
	render() {
		let { id, x, y } = this.props

		if(id === 0)
			return <div className='button' style={{ top: y, left: x }}/>

		return (
			<div
			  className='button' 
			  //style={{ top: y, left: x }} 
			  onClick={this.props.onClick}>
				<h1>{id}</h1>
			</div>
		)
	}
}