import React, { Component } from "react";

class Square extends Component {
	returnEmoji(value) {
		if (value === "X") {
			return "🐷";
		}
		if (value === "O") {
			return "🐰";
		}
		return "";
	}

	render() {
		let disabled = this.props.value !== "";
		if (this.props.win) {
			disabled = true;
		}
		return (
			<button
				className="square"
				disabled={disabled}
				onClick={this.props.onClick}
			>
				{this.returnEmoji(this.props.value)}
			</button>
		);
	}
}

export default Square;
