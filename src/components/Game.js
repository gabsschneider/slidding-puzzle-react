import React, { Component } from 'react'
import './Game.css'

import Button from './Button'

const cols = 4
const rows = 4

export default class Game extends Component {
	constructor(props) {
		super(props)

		this.empty_index = 15

		this.state = {
			numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0],
		}


	}

	handleClick = (index) => {
		if(this.canMove(index))
			this.move(index)
	}

	canMove = (index) => {
		let ei = this.empty_index
		let ci = index

		return (ci % cols == ei % cols && Math.abs(ci - ei) == cols)
			|| (ei % cols == 0 && (ci - ei == 1 || Math.abs(ci - ei) == cols))
			|| (ei % cols == cols - 1 && (ei - ci == 1 || Math.abs(ci - ei) == cols))
			|| (ei % cols > 0 && ei % cols < cols - 1 && (Math.abs(ci - ei) == 1 || Math.abs(ci - ei) == cols))
	}

	move = (index) => {
		let numbers = this.state.numbers

		numbers[this.empty_index] = numbers[index]
		numbers[index] = 0

		this.setState({ numbers })

		let numbers = this.state.numbers.slice()

		numbers[this.empty_index] = numbers[index]
		numbers[index] = 0

		this.empty_index = index

		this.setState({ numbers }, () => {
			if(this.isFinished())
				console.log('congrats!!!')
		})

	}

	isFinished = () => {
		let numbers = this.state.numbers.slice()

		if(this.empty_index == numbers.length - 1) {
			numbers.pop()
			return this.isSorted(numbers)
		}

		return false
	}

	isSorted = (array) => {
		let previous = 0
		return array.every((number, i) => {
			if(number > previous) {
				previous = number
				return true
			} else {
				return false
			}
		})
	}

	render() {
		return (
			<div className='game'>
				<div className='container'>
					{this.state.numbers.map((number, i) => {
						//let row = Math.floor(i / cols)
						//let col = i % cols
						//console.log(`row ${row} col ${col}`)
						if(number == 0)
							this.empty_index = i 
						
						return (
							<Button
							  key={number}
							  id={number}
							  onClick={() => this.handleClick(i)}/>
						)
					})}
				</div>
			</div>
		)
	}
}