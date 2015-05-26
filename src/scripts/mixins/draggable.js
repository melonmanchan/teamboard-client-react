import React     from 'react';
import Draggable from 'draggabilly';

/**
 * Simple mixin that makes the component draggable inside it's parent.
 */
export default {
	getInitialState() {
		return { isDragging: false,
		         moveScale:  1}
	},

	componentDidMount() {
		this.draggable = new Draggable(this.getDOMNode(), {
			containment: true
		});
		this.draggable.on('dragStart', (draggable, event) => {
			this.setState({ isDragging: true,
			startPos: {x:this.draggable.position.x,y:this.draggable.position.y} });
			return event.stopPropagation();
		});
		this.draggable.on('dragEnd', () => {
			this.setState({ isDragging: false });
		});

		this.draggable.on('dragMove', (event, pointer, moveVector) => {
			console.log(this.state.moveScale);

			let changeX = this.draggable.position.x - this.state.startPos.x;
			let changeY = this.draggable.position.y - this.state.startPos.y;

			let newX = this.state.startPos.x + changeX /this.state.moveScale;
			let newY = this.state.startPos.y + changeY /this.state.moveScale;

			this.draggable.position.x = newX;
			this.draggable.position.y = newY;

		});
	},
	componentWillUnmount() {
		this.draggable = null;
	}
}
