class FanTarget < ActiveYaml::Base
  include ActiveHash::Associations
  set_root_path "config/master/fan_target"
  set_filename ENV.fetch('FAN_TARGET', 'default')
  has_many :accounts
  has_many :statuses, through: :accounts

  def icon_url
    ActionController::Base.helpers.asset_url("fan-target/#{ENV.fetch('FAN_TARGET', 'default')}/#{key}-icon.png")
  end
end
