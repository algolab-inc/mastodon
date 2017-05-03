class FanTarget < ActiveYaml::Base
  include ActiveHash::Associations
  set_root_path "config/master/fan_target"
  set_filename ENV.fetch('FAN_TARGET', 'default')
  has_many :accounts
  has_many :statuses, through: :accounts

  def icon_path
    ActionController::Base.helpers.asset_path("fan-target/#{ENV.fetch('FAN_TARGET', 'default')}/#{key}-48x48.png")
  end
end
