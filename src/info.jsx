import React, {Component} from "react";

class Info extends Component {
    render() {
        let disabled = this.props.value !== '';
        if (this.props.win){
            disabled = true
        }
        return (
            <div>
                <button onClick={this.props.onUndo}>
                    Undo
                </button>
                <button onClick={this.props.onReset}>
                    Reset
                </button>
            </div>
        );
    }
}

export default Info;