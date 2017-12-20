class Api::V1::PlantsController < ApiController
  skip_before_action :verify_authenticity_token, only: [:create, :destroy]

  def index
    plants = Plant.all
    render json: plants
  end

  # def show
  #   render json: Garden.find(params[:id])
  # end

  # def create
  #   superhero = Superhero.new(superhero_params)
  #   if superhero.save
  #     render json: superhero
  #   else
  #     render json:
  #     { error: superhero.errors.full_messages },
  #       status: :unprocessable_entity
  #   end
  # end

  # def destroy
  #   @superhero = Superhero.find(params[:id])
  #   @superhero.delete
  # end

  # private

  # def require_permission
  #   @superhero = Superhero.find(params[:id])
  #   if current_user.id != @superhero.user_id && current_user.role != 'admin'
  #     redirect_to :root
  #   end
  # end

  # def superhero_params
  #   params.require(:superhero).permit(
  #     :name,
  #     :backstory,
  #     :superpower,
  #     :image_url,
  #     :user_id
  #   )
  # end
end
