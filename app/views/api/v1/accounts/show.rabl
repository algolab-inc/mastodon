object @account

attributes :id, :username, :acct, :display_name, :locked, :created_at

node(:note)            { |account| Formatter.instance.simplified_format(account) }
node(:url)             { |account| TagManager.instance.url_for(account) }
node(:avatar)          { |account| full_asset_url(account.avatar_original_url) }
node(:avatar_static)   { |account| full_asset_url(account.avatar_static_url) }
node(:header)          { |account| full_asset_url(account.header_original_url) }
node(:header_static)   { |account| full_asset_url(account.header_static_url) }

attributes :followers_count, :following_count, :statuses_count

child :fan_target, if: lambda { |account| account.fan_target } do
  attributes :name, :icon_url
  node(:url) { |fan_target| fan_url(fan_target.name) }
end
