import React, {
  PureComponent
} from 'react';
import Tag from './Tag';
import SuggestionList from './SuggestionList';

// To avoid text overflow on div while user is writing
const MAX_INPUT_SIZE = 70;

class TagAutocomplete extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      criteria: '',
      tags: [],
      suggestions: []
    };

    this.initialState = this.state;

  }

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside, true);
  }

  resetState = () => this.setState(this.initialState);

  hideSuggestions = () => {
    this.setState({
      suggestions: []
    });
  };

  suggest = (criteria) => {
    if (criteria && criteria.trim().length > 2) {
      this.setState({
        suggestions: this.props.suggestions.filter(
          (suggestion) => {
            return suggestion.label.toLowerCase().includes(criteria.toLowerCase()) &&
              this.state.tags.findIndex((tag) => tag.label.toLowerCase() === suggestion.label.toLowerCase()) === -1;
          }
        )
      });
    } else {
      this.hideSuggestions();
    }
  };

  onChange = (evt) => {
    const value = evt.target.value;
    this.setState({
      criteria: value
    });

    if (this.props.onCriteriaChange && value.trim().length > 2) {
      this.props.onCriteriaChange(value, () => {
        this.suggest(value);
      });
      return;
    }
    this.suggest(value);
  };

  addTag = (tags, tagToAdd) => {
    if (isTagUnique(tags, tagToAdd)) {
      this.setState({
        criteria: '',
        tags: this.state.tags.concat([tagToAdd]),
        suggestions: []
      }, () => {
        this.props.logChange(this.state.tags);
      });
    }
  };

  removeTag = (tagToRemove) => {
    const {
      tags
    } = this.state;
    this.setState({
      tags: tags.filter((tag) => tag.value !== tagToRemove.value)
    }, () => {
      this.props.logChange(this.state.tags);
    });
  };

  doKeyAction = (keyCode, criteria) => {
    const {
      tags
    } = this.state;
    switch (keyCode) {
      case 8:
        {
          if (criteria) return;
          if (!tags.length) return;
          this.setState({
            tags: tags.slice(0, tags.length - 1),
          }, () => {
            this.props.logChange(this.state.tags);
          });
          break;
        }
      case 13:
        {
          if (!criteria) return;
          const currentTag = {
            label: criteria,
            value: criteria,
            data: {}
          };
          this.addTag(tags, currentTag);
          break;
        }
      default:
    }
  };

  onKeyDown = (evt) => {
    const criteria = evt.target.value.trim();
    this.doKeyAction(evt.keyCode, criteria);
  };

  onSuggestionClick = (suggestion) => {
    const suggestionToAdd = Object.assign({}, suggestion, {
      data: {}
    });
    this.addTag(this.state.tags, suggestionToAdd);
  };

  onContainerClick = () => this.input.focus();

  onSaveButtonClick = (evt) => {
    if (this.props.onSaveButtonClick) {
      this.props.onSaveButtonClick(this.state.tags, evt);
    }
    this.setState(this.initialState);
  };

  onTagAttributeChange = (tag, tagAttribute) => {
    this.setState({
      tags: updateObjectInArray(this.state.tags, tag, tagAttribute)
    }, () => {
      this.props.logChange(this.state.tags);
    });
  };

  handleClickOutside = (evt) => {
    const wrapper = this.wrapper;
    if ((!wrapper || !wrapper.contains(evt.target)) && this.state.suggestions.length > 0) {
      this.hideSuggestions();
    }
  };

  render(){
    const {tags, criteria, suggestions} = this.state;
    const {name, label, options, defaultValue} = this.props.tagAttribute;
    const tagsAdded = tags.map(
      (tag) => {
        return (
          <Tag
            removeTag={this.removeTag}
            tagAttribute={{
              name,
              label,
              defaultValue,
              currentValue: tag.data[name],
              options
            }}
            showTagAttribute={this.props.showTagAttribute}
            showPopover={this.props.showPopover}
            onTagAttributeChange={this.onTagAttributeChange}
            key={tag.value}
            popoverContent={this.props.popoverContent}
            tag={tag}/>
        );
      }
    );

    const openSuggestions = suggestions.length > 0;
    const inputSize = criteria.length > MAX_INPUT_SIZE ? MAX_INPUT_SIZE : criteria.length;

    return (
      <div>
        <div className="autocomplete"
             ref={(wrapper) => { this.wrapper = wrapper; }}
             id="autocomplete"
             onClick={this.onContainerClick}>
          {tagsAdded}
          <span>
            <input
              type="text"
              name="criteria"
              autoComplete="off"
              size={inputSize}
              ref={(input) => { this.input = input; }}
              onKeyDown={this.onKeyDown}
              value={criteria}
              onChange={this.onChange}/>
              {
                openSuggestions &&
                <SuggestionList
                  onClick={this.onSuggestionClick}
                  suggestions={suggestions}/>
              }
          </span>
        </div>
        {this.props.extraForm}
        {this.props.showButton &&
          <button
            type="button"
            style={{marginTop: '5px'}}
            className="btn btn-primary pull-right"
            onClick={this.onSaveButtonClick}>
            {this.props.buttonText}
          </button>
        }
      </div>
    );
  }
}

TagAutocomplete.defaultProps = {
  suggestions: [],
  buttonText: 'Save',
  showTagAttribute: false,
  showPopover: false,
  reset: false,
  tagAttribute: {
    name:'',
    label:'',
    defaultValue:'',
    currentValue: '',
    options: []
  },
  logChange: () => {}
};

const isTagUnique = (tags, tagToAdd) => tags.findIndex((tag) => tag.value === tagToAdd.value || tag.label === tagToAdd.label) === -1;

const updateObjectInArray = (array, itemToUpdate, tagAttribute) => {
  return array.map(item => {
    if (item.value !== itemToUpdate.value) {
      return item;
    }

    return Object.assign({}, item, {
      data: tagAttribute
    });
  });
};

export default TagAutocomplete;
