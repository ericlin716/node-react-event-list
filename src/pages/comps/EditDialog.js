import React, { Component } from 'react'
import { Button, Header, Image, Modal, Input, Dropdown } from 'semantic-ui-react'
import { DateInput } from 'semantic-ui-calendar-react';
import { CategorySelection } from '../utils/StaticData';

class EditDialog extends Component {
  constructor(props) {
    super(props);
    const { title, description, category, startTime, endTime } = this.props;

    this.state = {
      showTooltip: false,
      title,
      description,
      category,
			startTime,
			endTime
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdateItem = this.handleUpdateItem.bind(this);
    this.enableUpdate = this.enableUpdate.bind(this);
  }

  handleChange(event, {name, value}) {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
  }

  handleUpdateItem() {
    const { id, onUpdateItem } = this.props;
    const {title, description, startTime, endTime, category} = this.state;

    onUpdateItem({
      _id: id,
      title,
      description,
      startTime,
      endTime,
      category
    });
  }

	enableUpdate() {
		const {title, description, startTime, endTime, category} = this.state;

		if (title == '' 
			|| description == ''
			|| startTime == ''
			|| endTime == ''
			|| category == '') {
      return false;
		}

		return true;
	}

  render() {
    const { open, onCancel } = this.props;

    return (
      <Modal dimmer='blurring' open={open} onClose={this.close}>
        <Modal.Header>Update Event</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Input
              name='title'
              style={{display: 'inline'}}
              ref="content"
              type="text"
              placeholder="title"
              className="inputField"
              value={this.state.title}
              onChange={this.handleChange}
            />
            <Input
              name='description'
              style={{display: 'inline'}}
              ref="content"
              type="text"
              placeholder="description"
              className="inputField"
              value={this.state.description}
              onChange={this.handleChange}
            />
            <Dropdown 
              name='category'
              style={{margin: "10px"}} 
              placeholder='Category' 
              value={this.state.category} 
              selection 
              options={CategorySelection}
              onChange={this.handleChange}
            />
            <br/>
            <br/>
            <DateInput
              name="startTime"
              animation='none'
              placeholder="Start Time"
              dateFormat="YYYY-MM-DD"
              closable
              value={this.state.startTime}
              iconPosition="left"
              onChange={this.handleChange}
            />
            <DateInput
              name="endTime"
              animation='none'
              placeholder="End Time"
              dateFormat="YYYY-MM-DD"
              closable
              value={this.state.endTime}
              iconPosition="left"
              onChange={this.handleChange}
            />
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
              disabled={!this.enableUpdate()}
              positive
              icon='checkmark'
              labelPosition='right'
              content="Save"
              onClick={this.handleUpdateItem}
          />
          <Button color='black' onClick={onCancel}>
            Cancel
          </Button>
          {this.state.showTooltip && (
            <span className="tooltip">Please fill all fields !</span>
          )}
        </Modal.Actions>
      </Modal>
    )
  }
}

export default EditDialog
