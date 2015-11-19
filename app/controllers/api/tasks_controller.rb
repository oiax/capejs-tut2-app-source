class Api::TasksController < ApplicationController
  def index
    @tasks = Task.order(position: :asc)
  end

  def create
    if Task.create(task_params)
      render text: 'OK'
    else
      render text: 'NG'
    end
  end

  def update
    task = Task.find(params[:id])
    if task.update_attributes(task_params)
      render text: 'OK'
    else
      render text: 'NG'
    end
  end

  def destroy
    Task.find(params[:id]).destroy
    render text: 'OK'
  end

  def move_higher
    task = Task.find(params[:id])
    task.move_higher
    render text: 'OK'
  end

  def move_lower
    task = Task.find(params[:id])
    task.move_lower
    render text: 'OK'
  end

  private
  def task_params
    params.require(:task).permit(:title, :done)
  end
end
