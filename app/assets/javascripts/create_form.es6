class CreateForm extends Cape.Partial {
  constructor(parent) {
    super(parent);
    this.agent = parent.agent;
  }

  render(m) {
    m.formFor('new_task', m => {
      m.onkeyup(e => this.refresh());
      m.textField('title', { value: this.val('new_task.title') }).sp();
      m.attr({ disabled: this.val('new_task.title').trim() === '' });
      m.onclick(e =>
        this.agent.createTask(this.val('new_task.title', '')));
      m.btn(`Add task #${ this.agent.objects.length + 1 }`);
    });
  }
}
