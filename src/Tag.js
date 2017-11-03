import React from 'react';
import {Glyphicon, Label, OverlayTrigger, Popover} from 'react-bootstrap';
import TagAttribute from './TagAttribute';

const Tag = (props) => {

  const onClick = (tag) => {
    return () => {
      props.removeTag(tag);
    };
  };

  const onTagAttributeChange = (tag) => {
    return (tagAttribute) => {
      props.onTagAttributeChange(tag, tagAttribute);
    };
  };

  const popover = (
    <Popover id="tag-form" >
      {props.showTagAttribute &&
        <TagAttribute {...props.tagAttribute} onChange={onTagAttributeChange(props.tag)}/>
      }
      {props.popoverContent}
    </Popover>
  );

  const label = props.label || 'label';

  return (
    <Label bsStyle="info" style={props.style}>
      {props.showPopover ?
        <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popover} >
          <span className="tag-label" style={{cursor:'pointer'}} >{props.tag[label]}&nbsp;</span>
        </OverlayTrigger> :
        <span className="tag-label" >{props.tag[label]} {props.extraInfo ? `- ${props.extraInfo}` : ''}</span>
      }
      {!props.hideCloseOption &&
        <span>
          &nbsp;
          <Glyphicon glyph="remove" className="remove-tag" onClick={onClick(props.tag)}/>
        </span>
      }
    </Label>
  );
};

export default Tag;
