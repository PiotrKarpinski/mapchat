class StatusesController < ApplicationController
  def index
    @statuses = Status.all
  end

  def show
    @status = Status.find(params[:id])
    if @status
      render json: {
        status: @status
      }
    else
      render json: {
        status: 500,
        errors: ['statuses not found']
      }
    end
  end

  def create
    @status = Status.new(status_params)
    if @status.save
      render json: {
        status: :created,
        status: @status
      }
    else
      render json: {
        status: 500,
        errors: @status.errors.full_messages
      }
    end
  end
  private

  def status_params
    params.require(:data).permit(:name, :project_id)
  end
end
