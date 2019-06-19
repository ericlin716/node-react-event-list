import React from 'react';
import EventItem from './EventItem';
import _ from 'lodash'
import { Table } from 'semantic-ui-react'

class EventList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        column: null,
        data: Array.from(this.props.eventList),
        direction: null,
      }

      this.handleSort = this.handleSort.bind(this);
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.eventList !== this.props.eventList) {
        const { column, direction } = this.state;
        if(column) {
          const sortedData = _.sortBy(Array.from(nextProps.eventList), [column]);
          this.setState({data: direction === 'ascending' ? sortedData : sortedData.reverse()})
        } else {
          this.setState({data: Array.from(nextProps.eventList)})
        }
      }
    }

    handleSort(clickedColumn) {
      return () => {
        const { column, data, direction } = this.state

        if (column !== clickedColumn) {
          this.setState({
            column: clickedColumn,
            data: _.sortBy(data, [clickedColumn]),
            direction: 'ascending',
          })
    
          return
        }
    
        this.setState({
          data: data.reverse(),
          direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
      }
    }

  	render() {
      const { data, column, direction } = this.state;
  		const eventItems = data.map((item,index) => {
  			return (
          <EventItem
            key={item.title + item.description + index} 
            id={item._id}
            title={item.title} 
            description={item.description} 
            startTime={item.startTime} 
            endTime={item.endTime} 
            category={item.category} 
            onUpdateItem={this.props.onUpdateItem}
  					onDeleteItem={this.props.onDeleteItem} 
          />
    		)
        });

    	return (
        <div>
          <Table fixed sortable celled inverted selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell 
                  width='3'
                  sorted={column === 'title' ? direction : null}
                  onClick={this.handleSort('title')}>
                    Title
                </Table.HeaderCell>
                <Table.HeaderCell
                  width='4'
                  sorted={column === 'description' ? direction : null}
                  onClick={this.handleSort('description')}>
                    Description
                </Table.HeaderCell>
                <Table.HeaderCell
                  width='2'
                  sorted={column === 'startTime' ? direction : null}
                  onClick={this.handleSort('startTime')}>
                    Start Date
                </Table.HeaderCell>
                <Table.HeaderCell
                  width='2'
                  sorted={column === 'endTime' ? direction : null}
                  onClick={this.handleSort('endTime')}>
                    End Date
                </Table.HeaderCell>
                <Table.HeaderCell
                  width='2'
                  sorted={column === 'category' ? direction : null}
                  onClick={this.handleSort('category')}>
                    Category
                </Table.HeaderCell>
                <Table.HeaderCell width='3'>Control</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {eventItems}
            </Table.Body>
          </Table>
        </div>
      );
  	}
}

export default EventList;