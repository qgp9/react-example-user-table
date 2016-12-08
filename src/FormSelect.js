import React from 'react';

class FormSelect extends React.Component {
  render(){
    let options = [];
    if( this.props.placeholder){
      options.push(<option key="_placeholder" value="" >{this.props.placeholder}</option>);
    }
    options.push(this.props.options.map(value=>{
      return <option value={value} key={value}>{value}</option>
    }));
    return (
      <select name={this.props.name}
        placeholder={this.props.placeholder}
        value={this.props.value}
        onChange={e=>this.props.onChange(e)}
        defaultValue=""
        >
        {options}
      </select>
    );

  }
}


export default FormSelect;
