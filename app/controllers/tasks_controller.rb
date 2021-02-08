class TasksController < ApplicationController
  def index
    @tasks = Task.all
    if @tasks
      render json: {
        tasks: @tasks
      }
    else
      render json: {
        status: 500,
        errors: ['no tasks found']
      }
    end
  end
  def show
    @task = task.find(params[:id])
    if @task
      render json: {
        task: @task
      }
    else
      render json: {
        status: 500,
        errors: ['tasks not found']
      }
    end
  end

  def create
    @task = Task.new(task_params)
    if @task.save
      render json: {
        status: :created,
        task: @task
      }
    else
      render json: {
        status: 500,
        errors: @task.errors.full_messages
      }
    end
  end
  private

  def task_params
    params.require(:data).permit(:name, :description, :project_id, :status_id, :priority_id)
  end
end
