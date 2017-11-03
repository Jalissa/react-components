import React, { Component } from 'react';
import TagAutocomplete from './TagAutocomplete';

const styles = {
  componentContainer: {
    margin: '15px 0px 15px 0px'
  }
}
class App extends Component {
  constructor(){
    super();
    this.suggestions = [
      { value: 0, label: 'Example A' },
      { value: 1, label: 'Example B' },
      { value: 2, label: 'Example C' },
      { value: 3, label: 'Example D' },
    ]

    this.example = {
      name: 'example',
      label: 'Example',
      defaultValue: 0,
      options: [
        { value: 1, label: 'Yes' },
        { value: 0, label: 'No' }
      ]
    };

  }
  render() {
    return (
      <div className="container">
        <header>
          <h1>React Components</h1>
        </header>
        <div>
          <h4>Tags</h4>  
          <p>Custom component to write tags when needed.</p>  
          <div className="col-md-6" style={styles.componentContainer}>
            <h3>Just Tags</h3>
            <TagAutocomplete />
          </div>
          <div className="clearfix"></div>
          <div className="col-md-6" style={styles.componentContainer}>
            <h3>With Tags and Suggestions (type example)</h3>
            <TagAutocomplete
              suggestions={this.suggestions}
            />
          </div>
          <div className="clearfix"></div>
          <div className="col-md-6" style={styles.componentContainer}>
            <h3>With extra information in tags (click on tag)</h3>
            <TagAutocomplete
              tagAttribute={this.example}
              showTagAttribute={true}
              showPopover={true}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
