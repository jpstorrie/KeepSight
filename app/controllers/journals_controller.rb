class JournalsController < ApplicationController
  before_action :set_journal, only: %i[ show update destroy ]

  # GET /journals
  def index
    @journals = Journal.all

    render json: @journals
  end

  # GET /journals/1
  def show
    render json: @journal
  end

  # POST /journals
  def create
    @journal = Journal.create!(journal_params)
    render json: @journal, status: :created
  end

  # PATCH/PUT /journals/1
  def update
    if @journal.update(journal_params)
    render json: @journal, status: :accepted
  end

  # DELETE /journals/1
  def destroy
    @journal.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_journal
      @journal = Journal.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def journal_params
      params.permit(:name, :journal, :milestone, :child_id)
    end
end
