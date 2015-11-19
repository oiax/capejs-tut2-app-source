class UpdateForm extends Cape.Partial {
  constructor(parent) {
    super(parent);
    this.agent = parent.agent;
    this.editingTask = null;
  }

  render(m) {
    m.formFor('task', m => {
      m.onkeyup(e => this.refresh());
      m.textField('title').sp();
      m.attr({ disabled: this.val('task.title').trim() === '' });
      m.btn('Update', { onclick: e => this.updateTask() });
      m.btn('Cancel', { onclick: e => this.reset() });
    });
  }

  editTask(task) {
    if (this.editingTask === task) {
      this.reset();
    }
    else {
      if (this.editingTask) this.editingTask.modifying = false;
      task.modifying = true;
      this.reset();
      this.editingTask = task;
      this.val('task.title', task.title);
      this.refresh();
    }
  }

  reset() {
    if (this.editingTask) this.editingTask.modifying = false;
    this.editingTask = null;
    this.val('task.title', '');
    this.refresh();
  }

  updateTask() {
    var task = this.editingTask;
    task.modifying = false;
    this.editingTask = null;
    this.agent.updateTask(task, this.val('task.title', ''));
  }
}
