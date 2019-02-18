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
this.purge_all_lists = this.purge_all_lists.bind(this);
this.purge_list = this.purge_list.bind(this);
}

// todo_list_idが0のものを抽出するというfilterによって
// 実質的にすべてのtodoListの値を消します
purge_all_lists() {
  this.setState({
    todoList:this.state.todoList.filter(x => x.todo_list_id == 0)
  })
}

// 引数でtodoListの各々の値を受け取っているので、
// filterで引数以外を抽出することで
// 特定のtodoListの値を消します
purge_list(props) {
  this.setState({
    todoList:this.state.todoList.filter(x => x !== props)
  })
}

// all_idの値を増やします。
idincrement() {
  this.setState(prevState =>{
      return {
          all_id: prevState.all_id + 1
      };
  });
}

// todoListとall_idの値をlocalStorageに保存しています
componentDidUpdate() {
  localStorage.setItem('todoList', JSON.stringify(this.state.todoList));
  localStorage.setItem('all_id', JSON.stringify(this.state.all_id));
}

// localStorageの値を呼び出しています。
// all_idはString型で格納されているのでparseメソッドでinteger型に直しています
componentDidMount() {
  this.setState({
    todoList: JSON.parse(localStorage.getItem('todoList')) || [],
    all_id: parseInt(JSON.parse(localStorage.getItem('all_id')),10) || 1
  });
}

  render() {
    return (
      <div className="App">
      <button onClick={this.purge_all_lists}>
        全てを削除
      </button>
        <form
          className="App-form"
          onSubmit={e => {
            // formのデフォルトのイベントをキャンセル
            e.preventDefault();

            // todoリストが追加されるたびにidを増やすことを目的としてます
            this.idincrement();

            // idがtitleのElementを取得
            const titleElement = e.target.elements["title"]
            // idがdescriptionのElementを取得
            const descriptionElement = e.target.elements["description"];

            // todoList stateに追加
            this.setState(
              {
                todoList:     this.state.todoList.concat({
                title:        titleElement.value,
                description:  descriptionElement.value,
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
            <button type="submit">
              登録
            </button>
          </div>
        </form>
        <div>
        {/* todoList配列の要素数分ToDoListItemコンポーネントを展開 */}
        {this.state.todoList.map(todo => (

            <ToDoListItem
              todo_list_id={todo.todo_list_id}
              key={todo.todo_list_id}
              title={todo.title}
              description={todo.description} 
              onClick={() => {this.purge_list(todo)}}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;