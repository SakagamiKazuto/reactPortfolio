import React, { Component } from 'react';
import './App.css';
import ToDoListItem from "./ToDoListItem.js"

class App extends Component {
  constructor() {
    super();
    this.state = {
    todoList: [],
    all_id: 1
    };
this.idincrement = this.idincrement.bind(this);
}

//
idincrement() {
  this.setState(prevState =>{
      return {
          all_id: prevState.all_id + 1
      };
  });
}



  render() {
    return (
      <div className="App">
        <form
          className="App-form"
          onSubmit={e => {
            // formのデフォルトのイベントをキャンセル
            e.preventDefault();

            this.idincrement();

            // idがtitleのElementを取得
            const titleElement = e.target.elements["title"]
            // idがdescriptionのElementを取得
            const descriptionElement = e.target.elements["description"];

            // todoList stateに追加
            this.setState(
              {
                todoList: this.state.todoList.concat({
                  title: titleElement.value,
                  description: descriptionElement.value,
                  todo_list_id: this.state.all_id
                })
              },
              // stateの変更後に入力した値を空にする
              // e.preventDefaultでイベントをキャンセルしたため、
              // これがないと値が残ります
              () => {
                titleElement.value = "";
                descriptionElement.value = "";
              }
            )
          }}
        >
          <div>
            <input
              id="title"
              placeholder="title"
            />
            <textarea
              id="description"
              placeholder="description"
            />
          </div>
          <div>
            <button
              type="submit"
            >
              登録
            </button>
          </div>
        </form>
        <div>
        {/* todoList配列の要素数分ToDoListItemコンポーネントを展開 */}
        {this.state.todoList.map(todo => (

            <ToDoListItem
              todo_list_id={todo.todo_list_id}
              key={todo.title}
              title={todo.title}
              description={todo.description} 

              // クリックされたItemをtodoList stateから削除
              onClick={() => {
                this.setState({
                  todoList: this.state.todoList.filter(x => x !== todo)
                })
              }}               
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;