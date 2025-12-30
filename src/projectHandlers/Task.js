export class Task {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = crypto.randomUUID();
        this.completed = false; // Tasks start as incomplete
    }

    toggleComplete() {
        this.completed = !this.completed;
    }
}