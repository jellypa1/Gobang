import React, { Component } from "react";
import Square from "./square";

class Board extends Component {
	constructor(props) {
		super(props);
		this.onClick = this.props.onClick;
		this.size = this.props.state.size;
	}

	renderMap() {
		let rows = [];
		for (let i = 0; i < this.size; i++) {
			rows.push(this.renderRow(i));
		}
		return <div>{rows}</div>;
	}

	returnEmoji(value) {
		if (value === "X") {
			return "🐷";
		}
		if (value === "O") {
			return "🐰";
		}
		return "";
	}

	renderRow(irow) {
		return (
			<div key={"row" + irow.toString()} className="board-row">
				{this.props.state.board
					.slice(this.size * irow, this.size * (irow + 1))
					.map((square) => this.renderSquare(square))}
			</div>
		);
	}

	renderSquare(square) {
		const key = square.key;
		const value = square.value;
		return (
			<Square
				key={key.toString()}
				value={value}
				win={this.props.state.win}
				onClick={() => this.onClick(key)}
			/>
		);
	}

	render() {
		let status =
			"Next player: " + this.returnEmoji(this.props.state.cur_player);
		if (this.props.state.win) {
			const win_player = this.props.state.cur_player === "X" ? "O" : "X";
			status = "Player " + this.returnEmoji(win_player) + " wins!";
		}
		return (
			<div>
				<div className="status">{status}</div>
				{this.renderMap()}
			</div>
		);
	}
}

export default Board;
