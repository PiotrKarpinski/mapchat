class MessagesController < ApplicationController
  def index
    @messages = Message.all
    if @messages
      render json: {
        messages: @messages
      }
    else
      render json: {
        status: 500,
        errors: ['no messages found']
      }
    end
  end
  def show
    @message = Message.find(params[:id])
    if @message
      render json: {
        message: @message
      }
    else
      render json: {
        status: 500,
        errors: ['messages not found']
      }
    end
  end

  def create
    @message = Message.new(message_params)
    @message.poster_id = current_user.id
    @message.sent = DateTime.now
    if @message.save
      render json: {
        status: :created,
        message: @message
      }
    else
      render json: {
        status: 500,
        errors: @message.errors.full_messages
      }
    end
  end
  private

  def message_params
    params.require(:data).permit(:content, :getter_id, :poster_id)
  end
end
