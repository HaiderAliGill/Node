2

import fs from 'fs';
import readline from 'readline';


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const filePath = './todolist.json';

// Load existing todos or initialize an empty list
let todos = [];
if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    todos = JSON.parse(data);
}

function saveTodos() {
    fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
}

function showTodos() {
    console.log('\nYour Todo List:');
    if (todos.length === 0) {
        console.log('No tasks yet!');
    } else {
        todos.forEach((todo, index) => {
            console.log(`${index + 1}. ${todo}`);
        });
    }
    console.log('');
}

function addTodo(task) {
    todos.push(task);
    saveTodos();
    console.log(`Added: "${task}"`);
}

function removeTodo(index) {
    if (index > 0 && index <= todos.length) {
        const removed = todos.splice(index - 1, 1);
        saveTodos();
        console.log(`Removed: "${removed[0]}"`);
    } else {
        console.log('Invalid task number.');
    }
}

function mainMenu() {
    console.log('\nTodo List Menu:');
    console.log('1. Show Todos');
    console.log('2. Add Todo');
    console.log('3. Remove Todo');
    console.log('4. Exit');
    rl.question('Choose an option: ', (choice) => {
        switch (choice) {
            case '1':
                showTodos();
                mainMenu();
                break;
            case '2':
                rl.question('Enter a new task: ', (task) => {
                    addTodo(task);
                    mainMenu();
                });
                break;
            case '3':
                rl.question('Enter the task number to remove: ', (num) => {
                    removeTodo(parseInt(num));
                    mainMenu();
                });
                break;
            case '4':
                console.log('Goodbye!');
                rl.close();
                break;
            default:
                console.log('Invalid choice. Try again.');
                mainMenu();
        }
    });
}

mainMenu();