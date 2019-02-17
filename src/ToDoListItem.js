import React, { Component } from 'react';
import './ToDoListItem.css';

class ToDoListItem extends Component {
    // constructor() {
    //     super();
    //     this.state = {
    //     list_id: 1
    //     };
    // this.idcount = this.idcount.bind(this);
    // }

    // idcount() {
    //     this.setState(prevState =>{
    //         return {
    //             total: prevState.total + 1
    //         };
    //     });
    // }


    render() {
        const {
            todo_list_id,
            title,
            description,
            ...props
        } = this.props;

        return (
            <div className="ToDoListItem">
              <div className="ToDoListItem-title">{todo_list_id}</div>  
              <div className="ToDoListItem-title">{title}</div>
              <div className="ToDoListItem-description">{description}</div>
            </div>
          );
    }
}

export default ToDoListItem;