class VideosController < ApplicationController
  before_action :set_video, only: %i[ show update destroy ]

  # GET /videos
  def index
    @videos = Video.all

    render json: @videos
  end

  # GET /videos/1
  def show
    render json: @video
  end

  # POST /videos
  def create
    @video = Video.create!(video_params)
    render json: @video, status: :created
  end

  # PATCH/PUT /videos/1
  def update
    @video.update!(video_params)
    render json: @video, status: :accepted
  end

  # DELETE /videos/1
  def destroy
    @video.destroy
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_video
      @video = Video.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def video_params
      params.permit(:name, :notes, :milestone, :child_id)
    end
end
