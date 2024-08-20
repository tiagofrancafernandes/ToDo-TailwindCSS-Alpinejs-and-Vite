import Alpine from 'alpinejs';

window.Alpine = Alpine;

document.addEventListener('alpine:init', () => {
    Alpine.data('todoData', () => ({
        todos: [
            {
                id: '123',
                category: 'list',
                title: 'Comprar leite',
                description: `Comprar 2 cx de leite + 2 cx de creme de leite`,
                done: false,
            },
            {
                id: '8789',
                category: 'list',
                // category: null,
                title: 'Comprar farofa',
                description: `Comprar farofa pronta`,
                done: true,
            },
            {
                id: '8787',
                category: 'todo',
                title: 'Se inscrever na academia',
                description: null,
                done: false,
            },
            {
                id: '4821',
                category: 'reminder',
                title: 'Outro item',
                description: null,
                done: false,
            },
        ],
        categories: [
            {
                id: 'task',
                color: 'green',
                label: 'Task',
            },
            {
                id: 'todo',
                color: 'blue',
                label: 'ToDo',
            },
            {
                id: 'reminder',
                color: 'orange',
                label: 'Reminder',
            },
            {
                id: 'list',
                color: 'green',
                label: 'List',
            },
        ],
        filters: {
            done: -1,
            text: '',
        },
        newTodo: false,
        waitingConfirmDelete: null,
        editTodo: {},
        init() {
            // TODO: ler URL params, carregar todos do storage (usar alpine store?)
            // this.editItem('123');
        },
        get showModal() {
            return this.newTodo || this.isEdit;
        },
        get getTodos() {
            let todos = this.todos;
            let filterByDone = this.filters?.done -0;
            let filterByText = this.filters?.text || null;
            let filterByCategory = this.filters?.category || null;
            console.log('filterByCategory', filterByCategory);

            if (filterByCategory) {
                todos = todos.filter(item => (item.category == filterByCategory));
            }

            if ([0, 1].includes(filterByDone)) {
                todos = todos.filter(item => (item.done == filterByDone));
            }

            if (filterByText) {
                todos = todos.filter(
                    item => `${item.label} ${item.description}`.toLowerCase().includes(filterByText)
                );
            }

            return todos;
        },
        get isEdit() {
            return Boolean((this.editTodo || {})?.id);
        },
        generateId(prefix = 'id_') {
            return `${prefix}` + Math.random().toString().slice(2).slice(0, 8);
        },

        editItem(id) { // WIP
            console.log('editItem id', id);
            this.newTodo = false;
            let todo = this.todos?.find((item) => item.id === id);
            this.editTodo = {
                ...(todo || {}),
            };
        },

        confirmData() { // WIP
            if (!this.editTodo) {
                this.newTodo = false,
                this.editTodo = {};
                return;
            }

            console.log('this.editTodo?.id', this.editTodo?.id);

            let itemIndex = this.editTodo?.id ? this.todos?.findIndex((item) => item.id === this.editTodo?.id) : -1;

            console.log('confirmData', 'itemIndex', itemIndex, '|', this.editTodo);

            if (itemIndex !== -1) {
                this.todos[itemIndex] = this.editTodo;
                this.dismissModal();
                console.log('1');
                return;
            }

            this.todos.push({
                ...(this.editTodo || {}),
                id: this.generateId(),
            });
            this.dismissModal();
        },

        deleteItem(id) { // WIP
            this.waitingConfirmDelete = id;
        },

        cancelDeleteItem() {
            this.waitingConfirmDelete = null;
        },

        confirmDeleteItem() {
            this.todos = this.todos?.filter((item) => item.id != this.waitingConfirmDelete);
            this.dismissModal();
        },

        dismissModal() {
            this.newTodo = false;
            this.editTodo = {};
        },

        toggleDone(todo) {
            todo['done'] = !todo['done'];
            // this.todos
        },

        categoryInfo(category = null) {
            if (!category || typeof category !== 'string') {
                return null;
            }

            console.log('category', category);

            return this.categories?.find((item) => item.id === category) || null;
        },
    }))
});

Alpine.start();
