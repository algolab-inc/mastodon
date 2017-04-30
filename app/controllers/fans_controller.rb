# frozen_string_literal: true

class FansController < ApplicationController
  layout 'public'

  def show
    @fan_target = FanTarget.find_by!(name: params[:id])
    @statuses = @fan_target.nil? ? [] : Status.as_fan_timeline(@fan_target, current_account).paginate_by_max_id(20, params[:max_id])
    @statuses = cache_collection(@statuses, Status)
  end
end
