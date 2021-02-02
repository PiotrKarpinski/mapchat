class ProjectsController < ApplicationController
  def index
    @projects = Project.all
    if @projects
      render json: {
        projects: @projects
      }
    else
      render json: {
        status: 500,
        errors: ['no projects found']
      }
    end
  end
  def show
    @project = Project.find(params[:id])
    if @project
      render json: {
        project: @project
      }
    else
      render json: {
        status: 500,
        errors: ['projects not found']
      }
    end
  end

  def create
    @project = Project.new(project_params)
    @project.creator_id = current_user.id
    @project.users = current_user.id.to_s + '|'
    if @project.save
      render json: {
        status: :created,
        project: @project
      }
    else
      render json: {
        status: 500,
        errors: @project.errors.full_messages
      }
    end
  end
  private

  def project_params
    params.require(:data).permit(:name, :prefix, :creator_id)
  end
end
