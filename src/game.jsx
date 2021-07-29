import React, { Component } from "react";
import Board from "./board";
import "./App.css";
import Info from "./info";

class Game extends Component {
	constructor() {
		super();
		this.size = 20;
		this.rule = 5;
		this.state = this.reset(this.size, this.rule);
	}

	reset(size, rule) {
		let t_board = [];
		for (let i = 0; i < size * size; i++) {
			t_board.push({ key: i, value: "" });
		}
		let state = {
			move_list: [],
			size: size,
			cur_player: "X",
			board: t_board,
			rule: rule,
			win: false,
		};
		this.halfrule = ~~(rule / 2);
		return state;
	}

	isWinHelper(row, col, flag) {
		console.log(row, col, flag);
		let bias = [
			{ r: 1, c: 0 },
			{ r: 0, c: 1 },
			{ r: 1, c: 1 },
			{ r: 1, c: -1 },
		];
		for (let k = 0; k < 4; k++) {
			const b_r = bias[k]["r"];
			const b_c = bias[k]["c"];
			let candidates = [];
			for (let i = 1; i < this.halfrule + 1; i++) {
				candidates.push([row - b_r * i, col - b_c * i]);
				candidates.push([row + b_r * i, col + b_c * i]);
			}
			let won = true;
			for (let kk = 0; kk < candidates.length; kk++) {
				const c_r = candidates[kk][0];
				const c_c = candidates[kk][1];
				if (
					c_r < 0 ||
					c_c < 0 ||
					c_r >= this.state.size ||
					c_c >= this.state.size
				) {
					won = false;
				}
				if (
					won &&
					this.state.board[c_r * this.state.size + c_c].value !== flag
				) {
					won = false;
				}
			}
			if (won) {
				return true;
			}
		}
		return false;
	}

	isWin() {
		for (let i = 0; i < this.state.size; i++) {
			for (let j = 0; j < this.state.size; j++) {
				const flag = this.state.board[i * this.state.size + j].value;
				if (flag !== "") {
					if (this.isWinHelper(i, j, flag)) {
						return true;
					}
				}
			}
		}
		return false;
	}

	handleClick = (i) => {
		let new_board = [...this.state.board];
		new_board[i].value = this.state.cur_player;
		let new_player = this.state.cur_player === "X" ? "O" : "X";
		let move_list = [...this.state.move_list];
		move_list.push({ key: i, value: this.state.cur_player });
		if (this.isWin()) {
			this.setState({
				board: new_board,
				cur_player: new_player,
				win: true,
				move_list: move_list,
			});
		}
		this.setState({
			board: new_board,
			cur_player: new_player,
			move_list: move_list,
		});
	};

	handleReset = () => {
		const state = this.reset(this.size, this.rule);
		this.setState(state);
	};

	handleUndo = () => {
		let move_list = [...this.state.move_list];
		if (move_list.length > 0) {
			let new_board = [...this.state.board];
			const { key, value } = move_list.pop();
			new_board[key].value = "";
			let new_player = this.state.cur_player === "X" ? "O" : "X";
			this.setState({
				board: new_board,
				cur_player: new_player,
				move_list: move_list,
				win: false,
			});
		}
	};

	render() {
		return (
			<div className="game">
				<div className="game-board">
					<Board onClick={this.handleClick} state={this.state} />
				</div>
				<div className="game-info">
					<Info onUndo={this.handleUndo} onReset={this.handleReset} />
				</div>
			</div>
		);
	}
}

export default Game;
