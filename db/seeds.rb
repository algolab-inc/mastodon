Doorkeeper::Application.create!(name: 'Web', superapp: true, redirect_uri: Doorkeeper.configuration.native_redirect_uri, scopes: 'read write follow')

if Rails.env.development? && !ENV['FAN_TARGET']
  domain = ENV['LOCAL_DOMAIN'] || Rails.configuration.x.local_domain
  admin  = Account.where(username: 'admin').first_or_create!(username: 'admin')
  User.where(email: "admin@#{domain}").first_or_initialize(email: "admin@#{domain}", password: 'mastodonadmin', password_confirmation: 'mastodonadmin', confirmed_at: Time.now.utc, admin: true, account: admin).save!
end

if ENV['FAN_TARGET']
  YAML.load(ERB.new(File.read("#{ENV['SEEDS_DIR']}/#{ENV['FAN_TARGET']}.yml")).result).each do |data|
    User.create!(
      account: Account.new(
        username: data['username'],
        avatar: data['avatar'] ? File.open(data['avatar']) : nil,
        fan_target_id: data['fan_target_id']
      ),
      email: data['email'],
      password: data['password'],
      password_confirmation: data['password'],
      confirmed_at: Time.now.utc,
      admin: data['admin'] == true
    )
  end
end
