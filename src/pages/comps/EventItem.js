import React, {Fragment} from 'react';
import { Table, Button } from 'semantic-ui-react'
import EditDialog from './EditDialog'

class EventItem extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
      openEdit: false
    }
    
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  
  handleUpdate(item) {
    this.props.onUpdateItem(item);
    this.setState({openEdit: false});
  }
	
	handleDelete() {
		this.props.onDeleteItem(this.props.id);
  }

  handleEdit() {
    this.setState({openEdit: true});
  }

  handleCancel() {
    this.setState({openEdit: false});
  }

	render() {
    const startDate = new Date(this.props.startTime);
    const formattedStartDate = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate();

    const endDate = new Date(this.props.endTime);
    let formattedEndDate = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate();

		return (
      <Fragment>
        <Table.Row>
          <Table.Cell>{ this.props.title }</Table.Cell>
          <Table.Cell>{ this.props.description }</Table.Cell>
          <Table.Cell>{ formattedStartDate }</Table.Cell>
          <Table.Cell>{ formattedEndDate }</Table.Cell>
          <Table.Cell>{ this.props.category }</Table.Cell>
          <Table.Cell>
            <Button.Group>
              <Button color='yellow' onClick={this.handleEdit.bind(this)}>Edit</Button>
              <Button.Or />
              <Button negative onClick={this.handleDelete.bind(this)}>Del</Button>
            </Button.Group>
          </Table.Cell>
        </Table.Row>
        <EditDialog 
          id={this.props.id}
          title={this.props.title} 
          description={this.props.description} 
          category={this.props.category} 
          startTime={formattedStartDate} 
          endTime={formattedEndDate} 
          open={this.state.openEdit}
          onUpdateItem={this.handleUpdate}
          onCancel={this.handleCancel}
        />
      </Fragment>
		)
	}
}

export default EventItem;