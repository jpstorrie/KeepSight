class UsersController < ApplicationController
  skip_before_action :authorized_user, only:[:create]

  # def index
  #   @users = User.all

  #   render json: @users
  # end

  def show
    render json: current_user, status: :ok
  end

  def create
    @user = User.create!(user_params)
    render json: @user, status: :created
  end

  # # PATCH/PUT /users/1
  # def update
  #   @user.update!(user_params)
  #   render json: @user, status: :accepted
  # end

  # # DELETE /users/1
  # def destroy
  #   @user.destroy
  #   head :no_content
  # end

  # private
  #   # Use callbacks to share common setup or constraints between actions.
  #   def set_user
  #     @user = User.find(params[:id])
  #   end

    # Only allow a list of trusted parameters through.
    def user_params
      params.permit(:username, :password, :email, :recieve_emails, :pfp)
    end
end
