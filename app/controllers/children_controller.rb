class ChildrenController < ApplicationController
  before_action :set_child, only: %i[ show update destroy ]

  # GET /children
  def index
    # @children = Child.all
    @children = Child.where(user_id: current_user.id)
    render json: @children, status: :ok
  end

  # GET /children/1
  def show
    render json: @child, status: :ok
  end

  # POST /children
  def create
    @child = Child.create!(child_params)
      render json: @child, status: :created
  end

  # PATCH/PUT /children/1
  def update
    @child.update!(child_params)
    render json: @child, status: :accepted
  end

  # DELETE /children/1
  def destroy
    @child.destroy
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_child
      @child = Child.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def child_params
      params.permit(:name, :user_id, :pfp)
    end
end
