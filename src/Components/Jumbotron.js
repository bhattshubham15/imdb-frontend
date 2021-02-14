import React, { Component } from 'react'

export default class JumbotronSection extends Component {
    state = {
        searchText: ''
    }
    handlesubmit = (e) => {
        e.preventDefault();
        console.log('e');
    }
    render() {
        return (
            <div className="container sticky">
                <div className="jumbotron">
                    <form id="searchform" onSubmit={e => { e.preventDefault(); }} autoComplete="off">
                        <input type="text" onChange={this.props.textChange} className="form-control" name="searchText" id="search-text" placeholder="search movie here..." />
                    </form>
                </div>
            </div>
        )
    }
}
