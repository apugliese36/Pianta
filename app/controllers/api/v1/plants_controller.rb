class Api::V1::PlantsController < ApiController
  skip_before_action :verify_authenticity_token, only: [:index, :show, :create, :update, :destroy]

  def index
    plants = Plant.where(user: current_user)
    render json: { plants: plants, current_user: current_user }
  end

  def show
    plant = Plant.find(params[:id])
    if plant.user_id == current_user.id
      render json: plant
    else
      render json:
      { error: 'Plant does not exist' },
        status: 404
    end
  end

  def create
    plant = Plant.new(plant_params)
    if plant.save
      render json: Plant.where(user: current_user)
    else
      render json:
      { error: plant.errors.full_messages },
        status: :unprocessable_entity
    end
  end

  def update
    plant = Plant.update(params[:id], plant_params)
    if plant.save
      render json: plant
    else
      render json: { errors: plant.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    plant = Plant.find(params[:id])
    plant.destroy
    render json: { message: 'Post deleted' }
  end

  private

  def plant_params
    params.require(:plant).permit(
      :name,
      :common_name,
      :sunlight_needs,
      :watering_needs,
      :photo,
      :birthdate,
      :user_id
    )
  end
end
