class PhotosController < ApplicationController
  before_action :set_photo, only: %i[ show update destroy ]

  # GET /photos
  def index
    @photos = Photo.all

    render json: @photos
  end

  # GET /photos/1
  def show
    render json: @photo
  end

  def download_photo
    photo = Photo.find(params[:id])
    send_data photo.photo.download, filename: photo.name.to_s, type: photo.photo.content_type
  end

  # POST /photos
  def create
    @photo = Photo.create!(photo_params)
    render json: @photo, status: :created
  end

  # PATCH/PUT /photos/1
  def update
    @photo.update!(photo_params)
    render json: @photo, status: :accepted
  end

  # DELETE /photos/1
  def destroy
    @photo.destroy
    head :no_content
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_photo
      @photo = Photo.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def photo_params
      params.permit(:name, :notes, :milestone, :child_id, :photo)
    end
end
