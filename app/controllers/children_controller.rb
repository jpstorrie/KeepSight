class ChildrenController < ApplicationController
  before_action :set_child, only: %i[ show update destroy ]

  # GET /children
  def index
    @children = Child.all

    render json: @children
  end

  # GET /children/1
  def show
    render json: @child
  end

  # POST /children
  def create
    @child = Child.create!(child_params)
      render json: @child, status: :created
  end

  # PATCH/PUT /children/1
  def update
    if @child.update!(child_params)
      render json: @child, status: :accepted
  end

  # DELETE /children/1
  def destroy
    @child.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_child
      @child = Child.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def child_params
      params.permit(:name, :user_id)
    end
end
