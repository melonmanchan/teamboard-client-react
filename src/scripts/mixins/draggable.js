import React     from 'react';
import Draggable from 'draggabilly';

/**
 * Simple mixin that makes the component draggable inside it's parent.
 */
export default {
	getInitialState() {
		return { isDragging: false,
		         moveScale:  1 }
	},

	componentDidMount() {
		this.draggable = new Draggable(this.getDOMNode(), {
			containment: false
		});

		this.draggable.on('dragStart', (draggable, event) => {
			this.setState({ isDragging: true,
							startPos: {
								x: this.draggable.position.x,
								y: this.draggable.position.y
									  } });

			return event.stopPropagation();
		});

		this.draggable.on('dragEnd', () => {
			this.setState({ isDragging: false });
		});

		this.draggable.on('dragMove', (pointer, event, moveVector) => {
				let maxY = (this.props.moveArea.height * 108) - 108;
				let maxX = (this.props.moveArea.width * 192) - 192;

				if(this.draggable.position.x >= maxX)
				{
					this.draggable.position.x = maxX;

				} else {
					let changeX = this.draggable.position.x - this.state.startPos.x;
					let newX = this.state.startPos.x + changeX / this.state.moveScale;
					this.draggable.position.x = newX;
				}

				if(this.draggable.position.y >=maxY)
				{
					this.draggable.position.y =maxY;

				} else {
					let changeY = this.draggable.position.y - this.state.startPos.y;
					let newY = this.state.startPos.y + changeY / this.state.moveScale;
					this.draggable.position.y = newY;
				}
				console.clear();
			return event.stopPropagation();

		});
	},
	componentWillUnmount() {
		this.draggable = null;
	}
}
