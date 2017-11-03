import React, {Component} from 'react';
import {ControlLabel, FormControl} from 'react-bootstrap';

class TagAttribute extends Component {

  constructor(props) {
    super(props);
    this.state = {
      [this.props.name]: this.props.currentValue || this.props.defaultValue
    };
  };

  componentDidMount(){
    this.props.onChange(this.state);
  }

  onChange = (evt) => {
    const tagAttribute = {
      [evt.target.name]: evt.target.value
    };

    this.props.onChange(tagAttribute);
    this.setState(tagAttribute);
  };

  render(){
    const options = this.props.options.map((option) => {
      const value = option[this.props.optionValue];
      return <option key={value} value={value}>{option[this.props.optionLabel]}</option>
    });

    return(
      <div>
        <ControlLabel style={{color: '#555'}}>
          {this.props.label}
        </ControlLabel>
        <FormControl
          onChange={this.onChange}
          componentClass="select"
          name={this.props.name}
          value={this.state[this.props.name]}
          placeholder="select">
          <option value="">Please select</option>
          {options}
        </FormControl>
      </div>
    )
  }
}

TagAttribute.defaultProps = {
  optionValue: 'value',
  optionLabel: 'label',
  options: []
};

export default TagAttribute;
