import React, { Component } from 'react';
import './ToDoListItem.css';

class ToDoListItem extends Component {

    render() {
        const {
            todo_list_id,
            title,
            description,
            ...props
        } = this.props;

        return (
            <div className="ToDoListItem"{...props}>
              <div className="ToDoListItem-title">{todo_list_id}</div>  
              <div className="ToDoListItem-title">{title}</div>
              <div className="ToDoListItem-description">{description}</div>
            </div>
          );
    }
}

export default ToDoListItem;