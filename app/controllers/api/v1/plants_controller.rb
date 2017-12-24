class Api::V1::PlantsController < ApiController
  skip_before_action :verify_authenticity_token, only: [:create, :destroy]

  def index
    plants = Plant.all
    render json: plants
  end

  def show
    render json: Plant.find(params[:id])
  end

  def create
    plant = Plant.new(plant_params)
    if plant.save
      render json: Plant.all
    else
      render json:
      { error: plant.errors.full_messages },
        status: :unprocessable_entity
    end
  end

  # def destroy
  #   @superhero = Superhero.find(params[:id])
  #   @superhero.delete
  # end

  private

  # def require_permission
  #   @superhero = Superhero.find(params[:id])
  #   if current_user.id != @superhero.user_id && current_user.role != 'admin'
  #     redirect_to :root
  #   end
  # end

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
