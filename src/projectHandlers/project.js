export class project {
    constructor(name) {
        this.name = name;
        this.id = crypto.randomUUID();
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removetask(taskId) {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
    }
}