import Alpine from 'alpinejs';

window.Alpine = Alpine;

document.addEventListener('alpine:init', () => {
    Alpine.data('todoData', () => ({
        todos: [1, 32, 4, ],
        newTodo: false,
        editTodo: null,
        get showModal() {
            return this.newTodo || this.editTodo;
        },

        editItem(id) { // WIP
            this.newTodo = false,
            this.editTodo = {
                id,
                title: 'Titulo',
                category: 'todo',
                description: `algo aqui\npara testar`,
            };
        },

        deleteItem(id) { // TODO
            this.newTodo = false,
            this.editTodo = null;
        },

        dismissModal() {
            this.newTodo = false;
            this.editTodo = null;
        },

        toggleDone(todo) {
            todo['done'] = !todo['done'];
            // this.todos
        },
    }))
});

Alpine.start();
