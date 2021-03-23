class PrioritiesController < ApplicationController
  def index
    @priorities = Priority.all
  end

  def show
    @priority = Priority.find(params[:id])
    if @priority
      render json: {
        priority: @priority
      }
    else
      render json: {
        status: 500,
        errors: ['priorities not found']
      }
    end
  end

  def create
    @priority = Priority.new(priority_params)
    if @priority.save
      render json: {
        status: :created,
        priority: @priority
      }
    else
      render json: {
        status: 500,
        errors: @priority.errors.full_messages
      }
    end
  end
  private

  def priority_params
    params.require(:data).permit(:name, :project_id)
  end
end
