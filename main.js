// class of todo

class Todo {
    constructor(title, state) {
        this.title = title;
        this.state = state;
    };
};

// local storage class
class Store {
    // getting todos from local storage

    static getTodos() {
        let todos;
        if (localStorage.getItem('todos') === null) {
            todos = [];
        } else {
            todos = JSON.parse(localStorage.getItem('todos'));
        };
        return todos;
    };

    // add todo to localStorage

    static addTodo(todo) {
        const todos = Store.getTodos();
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
        let noOfTodoLeft = Store.getTodos();
        todoLeft.innerHTML = noOfTodoLeft.length;
    };

    // remove todo from local storage

    static removeTodo(el) {
        const todos = Store.getTodos();
        todos.forEach((todo, index) => {
            if (todo.title === el) {
                todos.splice(index, 1);
            }
        });

        localStorage.setItem('todos', JSON.stringify(todos));
        let noOfTodoLeft = Store.getTodos();
        todoLeft.innerHTML = noOfTodoLeft.length;
    };

};

// UI class 

class UI {
    // display todos on load

    static displayTodos() {
        const todos = Store.getTodos();
        todos.forEach((todo) => {
            UI.addToList(todo.title);
        })
    }

    //add book to list function 

    static addToList(input) {
        const li = document.createElement("li");
        li.classList.add("todo-item");
        li.innerHTML = `${input}<div class="right"><i class="fas fa-check clr-second done" data-done="done"></i><i class="far fa-trash-alt delete"></i></div>`;
        tableWrapper.appendChild(li);
    };

    // delete todo

    static deleteTodo(todo) {
        if (todo.classList.contains('delete')) {
            todo.parentElement.parentElement.remove();
            UI.showAlert("Todo Removed Successfully", "red");
        };
    };

    // done Todo function 

    static doneTodo(ele) {
        const done = ele.parentElement.parentElement.textContent;
        ele.parentElement.parentElement.innerHTML = `<strike>${done}<\strike>`;
        UI.showAlert("Todo Marked as done...", "green");
        let noOfTodoLeft = Store.getTodos();
        todoLeft.innerHTML = noOfTodoLeft.length;
    };

    // show Alert method 

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `msg ${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#todo-list');
        container.insertBefore(div, form);
        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.msg').remove(), 3000);
    };
}

// setting left todos

var todoLeft = document.querySelector(".todo-no");
let noOfTodoLeft = Store.getTodos();
todoLeft.innerHTML = noOfTodoLeft.length;
const tableWrapper = document.querySelector(".table-wrapper");

// events of Todo app

document.addEventListener('DOMContentLoaded', UI.displayTodos);

// add tod to UI 

document.querySelector("#todo-list").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.querySelector("#input").value;

    if (input === "") {
        UI.showAlert("Please Enter Something...", "red")
    } else {
        var state = false;
        const todo = new Todo(input, state);
        // add to UI
        UI.addToList(input);
        // add to Local storage
        Store.addTodo(todo);
        // show alert
        UI.showAlert("Todo Added Successfully...", "green");
        // clear input Fields							 
        document.querySelector("#input").value = "";
    };
})

// delete todo on event

tableWrapper.addEventListener("click", (e) => {
    UI.deleteTodo(e.target);
    var todo = e.target.parentElement.parentElement.textContent;
    Store.removeTodo(todo);
})

// done in UI

//mark on event 

tableWrapper.addEventListener("click", (e) => {
    if (e.target.classList.contains("done")) {
        UI.doneTodo(e.target);
    }
})

// remove all 

const btnrm = document.querySelector(".btn-sec");
btnrm.addEventListener("click", () => {
    var todos = Store.getTodos();
    todos = [];
    tableWrapper.innerHTML = "";
    localStorage.setItem('todos', JSON.stringify(todos));
    let noOfTodoLeft = Store.getTodos();
    todoLeft.innerHTML = noOfTodoLeft.length;
    UI.showAlert("Removed All Todo Successfully...", "red");
})