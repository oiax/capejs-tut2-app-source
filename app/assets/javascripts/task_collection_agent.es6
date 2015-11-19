class TaskCollectionAgent extends Cape.CollectionAgent {
  constructor(client, options) {
    super(client, options);
    this.basePath = '/api/';
    this.resourceName = 'tasks';
  }

  createTask(title) {
    this.create({ task: { title: title } });
  }

  updateTask(task, title) {
    this.update(task.id, { task: { title: title } })
  }

  toggleTask(task) {
    this.update(task.id, { task: { done: !task.done } });
  }

  destroyTask(task) {
    this.destroy(task.id);
  }
}
