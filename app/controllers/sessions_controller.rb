class SessionsController < ApplicationController

  def create
    @user = User.find_by(username: session_params[:username])

    if @user && @user.authenticate(session_params[:password])
      login!
      render json: {
        logged_in: true,
        user: @user
      }
    else
      render json: {
        status: 401,
        errors: ['no such users, please try again']
      }
    end
  end
  def is_logged_in?
    if logged_in? && current_user
      render json: {
        logged_in: true,
        user: current_user
      }
    else
      render json: {
        logged_in: false,
        message: 'no such users'
      }
    end
  end
  def destroy
    logout!
    if logged_in? == false
    render json: {
      status: 200,
      logged_out: true
    }
    else
      render json: {
        status: 500,
        message: 'could not log you out',
        logged_out: false
      }
    end
  end
  private
  def session_params
    params.require(:user).permit(:username, :password)
  end

end
