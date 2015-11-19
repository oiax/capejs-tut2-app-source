class TodoList extends Cape.Component {
  init() {
    this.agent = new TaskCollectionAgent(this);
    this.createForm = new CreateForm(this);
    this.updateForm = new UpdateForm(this);
    this.agent.refresh();
  }

  render(m) {
    m.ul(m => {
      this.agent.objects.forEach((task, index) => {
        m.li(m => {
          this.renderTask(m, task);
          this.renderButtons(m, task, index);
        });
      });
    });
    if (this.updateForm.editingTask) this.updateForm.render(m);
    else this.createForm.render(m);
  }

  renderTask(m, task) {
    m.class({ completed: task.done });
    m.label(m => {
      m.onclick(e => this.agent.toggleTask(task));
      m.input({ type: 'checkbox', checked: task.done }).sp();
      m.class({ modifying: task.modifying });
      m.span(task.title);
    });
  }

  renderButtons(m, task, index) {
    m.onclick(e => this.updateForm.editTask(task));
    m.span('Edit', { class: 'button' });
    m.onclick(e => {
      if (confirm('Are you sure you want to delete this task?'))
        this.agent.destroyTask(task);
    });
    m.span('Delete', { class: 'button' });
    if (index === 0) m.class('disabled');
    else m.onclick(e => this.agent.patch('move_higher', task.id));
    m.span({ class: 'button' }, m => m.fa('arrow-circle-up'));
    if (index === this.agent.objects.length - 1) m.class('disabled');
    else m.onclick(e => this.agent.patch('move_lower', task.id));
    m.span({ class: 'button' }, m => m.fa('arrow-circle-down'));
  }
}
