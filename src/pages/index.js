import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import EventList from './comps/EventList';
import {
  Container,
  Grid,
  Divider,
  Segment,
  Input,
  Dropdown,
  Button
} from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { DateInput } from 'semantic-ui-calendar-react';
import { CategorySelection } from './utils/StaticData';

class Event extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventList: [],
      showTooltip: false,
      errMsg: '',
			title: '',
			description: '',
      startTime: '',
			endTime: '',
			category: ''
		};
		
		this.resetState = this.resetState.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.createItem = this.createItem.bind(this);
		this.deleteItem = this.deleteItem.bind(this);
		this.updateItem = this.updateItem.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.enableSubmit = this.enableSubmit.bind(this);
  }

  componentDidMount() {
    this.getEventList();
	}
	
	resetState() {
		this.setState({
      eventList: [],
      showTooltip: false,
      errMsg: '',
			title: '',
			description: '',
      startTime: '',
			endTime: '',
			category: ''
		});
	}

  getEventList() {
    const that = this;
    $.ajax({
      url: '/getAllEventItems',
      type: 'get',
      dataType: 'json',
      success: data => {
        console.log(data);
        that.setState({
          eventList: data
        });
      },
      error: err => {
        console.log(err);
      }
    });
  }

  createItem(newItem) {
    const that = this;
    $.ajax({
      url: '/addEventItem',
      type: 'post',
      dataType: 'json',
      data: newItem,
      success: data => {
        console.log(data);
        that.setState({
          eventList: data
        });
      },
      error: err => {
        console.log(err);
      }
    });
  }

  deleteItem(id) {
    const that = this;
    const postData = {
      _id: id
		};
    $.ajax({
      url: '/deleteEventItem',
      type: 'delete',
      dataType: 'json',
      data: postData,
      success: data => {
        console.log(data);
        that.getEventList();
      },
      error: err => {
        console.log(err);
      }
    });
	}

	updateItem(item) {
		console.log('update item', item);
    const that = this;
    $.ajax({
      url: '/updateEventItem',
      type: 'put',
      dataType: 'json',
      data: item,
      success: data => {
        console.log(data);
        that.getEventList();
      },
      error: err => {
        console.log(err);
      }
    });
	}
	
	handleChange(_, {name, value}) {
    if (this.state.hasOwnProperty(name)) {
      this.setState({ [name]: value });
    }
	}
	
	enableSubmit() {
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

  handleSubmit(event) {
    event.preventDefault();
		const {title, description, startTime, endTime, category} = this.state;
    if (title == '' 
      || title.length > 50
      || description == ''
      || description.length > 1000
			|| startTime == ''
			|| endTime == ''
			|| category == '') {
        this.setState({
          showTooltip: true,
          errMsg: title.length > 50 ? 'Title不可超過50個字' : description.length > 1000 ? 'Description不可超過1000個字' : '請輸入所有欄位資料'
        });
      return;
    }

    const newEvent = {
			title,
			description,
			category,
			startTime,
			endTime
    };

		console.log(newEvent);
		
		this.createItem(newEvent);
    this.resetState();
  }

  render() {
    return (
      <Container>
        <Segment padded>
          <h2 className="header">Event List</h2>
          <form
						autoComplete="off"
            onSubmit={this.handleSubmit}
          >
            <Grid columns={3}>
              <Grid.Row>
                <Grid.Column>
                  <Input
                    style={{ display: 'inline' }}
                    name="title"
                    type="text"
                    placeholder="title"
										className="inputField"
										value={this.state.title}
										onChange={this.handleChange}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Input
                    style={{ display: 'inline' }}
                    name="description"
                    type="text"
                    placeholder="description"
										className="inputField"
										value={this.state.description}
										onChange={this.handleChange}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Dropdown
										name="category"
                    placeholder="Category"
										selection
										value={this.state.category}
										onChange={this.handleChange}
                    options={CategorySelection}
                  />
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                <Grid.Column>
                  <DateInput
                    name="startTime"
                    animation="none"
										placeholder="Start Time"
										dateFormat="YYYY-MM-DD"
              			closable
                    value={this.state.startTime}
                    iconPosition="left"
                    onChange={this.handleChange}
                  />
                </Grid.Column>
                <Grid.Column>
                  <DateInput
                    name="endTime"
                    animation="none"
										placeholder="End Time"
										dateFormat="YYYY-MM-DD"
              			closable
                    value={this.state.endTime}
                    iconPosition="left"
                    onChange={this.handleChange}
                  />
                </Grid.Column>
                <Grid.Column>
                  <Button disabled={!this.enableSubmit()} positive>Create</Button>
                </Grid.Column>
              </Grid.Row>
            </Grid>
            {this.state.showTooltip && (
              <span className="tooltip">{this.state.errMsg}</span>
            )}
          </form>
          <Divider section />
          <EventList
						eventList={this.state.eventList}
						onUpdateItem={this.updateItem}
            onDeleteItem={this.deleteItem}
          />
        </Segment>
      </Container>
    );
  }
}

export default Event;
