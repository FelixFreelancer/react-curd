import React, { Component } from 'react';
import logo from './logo.svg';
import ListItem from './ListItem';
import './App.css';
import axios from 'axios'
import LOADING from './LOADING.gif'
class App extends Component {

    constructor(){

        super();
        this.state = {
            newTodos:'',
            editing:false,
            editingIndex:null,
            alert_word:null,
            // todos : [{ id:1, name:"Play golf"},
            //          { id:2, name:"buy some clothes"},
            //          { id:3, name:"buy some coats"},
            //          { id:4, name:"watch tv"}]
            todos:[],
            loadingImg: true
        };

        this.apiUrl = 'https://5aa775d97f6fcb0014ee249e.mockapi.io';

        this.handleChange = this.handleChange.bind(this);
        this.addTodo =  this.addTodo.bind(this);
        this.deleteTodos = this.deleteTodos.bind(this);
        this.updateTodos = this.updateTodos.bind(this);
        // this.generateTodosId = this.generateTodosId.bind(this);
        this.alert = this.alert.bind(this);
    }

    async componentDidMount(){
        const response = await axios.get(`${this.apiUrl}/todos`);
        setTimeout(() => {
            this.setState({
                todos:response.data,
                loadingImg:false
            });

        }, 2000)
    }


    alert(alert_word){
        this.setState({
            alert_word
        })

        setTimeout(() =>
        {
            this.setState({
                alert_word : null
            });
        }, 2000);
    }

    // generateTodosId(){
    //     const lastId = this.state.todos[this.state.todos.length-1];
    //     console.log(lastId)
    //    // console.log(lastId.id)
    //     if (lastId){
    //         return lastId.id+1;
    //         // console.log(lastId.id+1);
    //     }
    //     else return 1;
    // }

    editTodo(index){
        const todo_edit = this.state.todos[index];
        this.setState({
            editing:true,
            newTodos:todo_edit.name,
            editingIndex:index
        })
    }

    async updateTodos(){
        const todo = this.state.todos[this.state.editingIndex];

        const response = await axios.put(`${this.apiUrl}/todos/${todo.id}`, {
            name: this.state.newTodos
        })
        console.log(response)

        todo.name = this.state.newTodos;
        // console.log(todo.name);
        const todos = this.state.todos;
        todos[this.state.editingIndex] = todo;
        this.setState({
            todos,
            editing:false,
            editingIndex:null,
            newTodos:''
        })
        this.alert('todo updatesuccessfully.');
    }

    async deleteTodos(index){
        const todos = this.state.todos;
        const todo = todos[index]
        await axios.delete(`${this.apiUrl}/todos/${todo.id}`)
        delete todos[index];
        // console.log(todos_del[index]);
        this.setState({
            todos
        });
        this.alert('todo delete successfully.');
    }

    async addTodo(){
        // const newTodos = {
        //     name: this.state.newTodos,
        //     id: this.generateTodosId()
        // }

        const response = await axios.post(`${this.apiUrl}/todos`,{
            name: this.state.newTodos
            // name : this.state.newTodo
        })

        const todos = this.state.todos;
        todos.push(response.data);

        this.setState({
            todos:todos,
            newTodos:''
        })
        this.alert('todo add successfully.');
    }


    handleChange(event){
        this.setState({
            newTodos: event.target.value
        })
    }


    render() {
        // console.log(this.state.newTodos);
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">This is RHH react CRUD project.</h1>
        </header>
        <div className="container">
            {
                this.state.alert_word &&
                <div className="alert mt-3 alert-success">
                    <p className="text-center">
                        {this.state.alert_word}
                    </p>
                </div>
            }
            <h2 className="text-center p-4">Todos App</h2>
            <input name="todo_name" className="form-control my-4 " placeholder="Add new item"
                   onChange={this.handleChange} value={this.state.newTodos} />
            <button onClick={this.state.editing? this.updateTodos: this.addTodo} className="btn-success mb-3 form-control"
                   disabled={this.state.newTodos.length<5} >
                {this.state.editing? 'update todo':'add todo item'}
            </button>
            {
                this.state.loadingImg&&
                    <img src={LOADING} />
            }

            {
                (!this.state.editing|| this.state.loadingImg )&&
                <ul className="list-group">
                    {
                        this.state.todos.map((item, index)=>{
                            return (
                                <ListItem
                                    key = {item.id}
                                    item = {item}
                                    editTodo = {()=>
                                    {
                                        this.editTodo(index);}
                                    }
                                    deleteTodo = {()=>
                                    {
                                        this.deleteTodos(index);
                                    }}

                                />
                            )
                        })
                    }
                </ul>
            }


        </div>
      </div>
    );
  }
}

export default App;
