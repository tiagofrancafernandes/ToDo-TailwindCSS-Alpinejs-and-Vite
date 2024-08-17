import Alpine from 'alpinejs';

window.Alpine = Alpine;

document.addEventListener('alpine:init', () => {
    Alpine.data('todoData', () => ({
        todos: [1, 32, 4, ],

        toggleDone(todo) {
            todo['done'] = !todo['done'];
            // this.todos
        },
    }))
});

Alpine.start();
