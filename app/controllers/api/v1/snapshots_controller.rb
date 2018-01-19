class Api::V1::SnapshotsController < ApiController
  skip_before_action :verify_authenticity_token, only: [:create, :destroy]

  def index
    snapshots = Snapshot.all.order(:created_at).reverse
    render json: { snapshots: snapshots }
  end

  def create
    snapshot = Snapshot.new(snapshot_params)
    if snapshot.save
      render json: Snapshot.where(plant_id: snapshot_params[:plant_id]).order(:created_at).reverse
    else
      render json:
      { error: snapshot.errors.full_messages },
        status: :unprocessable_entity
    end
  end

  private

  def snapshot_params
    params.require(:snapshot).permit(
      :journal_entry,
      :photo,
      :plant_id
    )
  end
end
