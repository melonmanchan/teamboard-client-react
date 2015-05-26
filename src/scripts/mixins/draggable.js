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
			this.setState({ isDragging: true });
			return event.stopPropagation();
		});
		this.draggable.on('dragEnd', () => {
			this.setState({ isDragging: false });
		});

		this.draggable.on('dragMove', (event, pointer, moveVector) => {
			console.clear();
			console.log("Scale: " + this.state.moveScale);
			console.log("Old x: " + this.draggable.position.x);
			console.log("Old y: " + this.draggable.position.y);

			this.draggable.position.x = this.draggable.position.x - (pointer.pageX / this.state.moveScale);
			this.draggable.position.y = this.draggable.position.y - (pointer.pageY / this.state.moveScale);
			console.log("New x: " + this.draggable.position.x);
			console.log("New y: " + this.draggable.position.y);
			console.log("Page x: " + pointer.pageX);
			console.log("Page y: " + pointer.pageY);

		});
	},
	componentWillUnmount() {
		this.draggable = null;
	}
}
