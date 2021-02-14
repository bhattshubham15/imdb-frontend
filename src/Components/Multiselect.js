import React, { Component } from 'react'
import { Multiselect } from 'multiselect-react-dropdown';
import * as constants from '../Constants';

export default class MultiselectComp extends Component {
    state = {
        options: []
    };
    async componentDidMount() {
        await fetch(constants.BASE_URL + '/' + constants.GENRE_LIST)
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    options: data.data
                })
            });
    }
    createDropdownArray = (val) => {
        const newDropdownsearch = val.map((item) => {
            return item.genre_name;
        })
        this.props.dropdownSearch(newDropdownsearch);
    }
    render() {
        return (
            <div className="container sticky">
                <div className="jumbotron">
                    <Multiselect
                        options={this.state.options} // Options to display in the dropdown
                        selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
                        onSelect={this.createDropdownArray} // Function will trigger on select event
                        onRemove={this.createDropdownArray} // Function will trigger on remove event
                        displayValue="genre_name" // Property name to display in the dropdown options
                        placeholder="select genre here..."
                    />
                </div>
            </div>
        )
    }
}
