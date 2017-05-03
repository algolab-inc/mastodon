import ImmutablePropTypes from 'react-immutable-proptypes';
import Avatar from '../../../components/avatar';
import FanTargetIcon from '../../../components/fan_target_icon'
import IconButton from '../../../components/icon_button';
import DisplayName from '../../../components/display_name';
import Permalink from '../../../components/permalink';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

class NavigationBar extends React.PureComponent {

  render () {
    let fanTargetIcon='';
    if (this.props.account.get('acct') === this.props.account.get('username') && this.props.account.get('fan_target')) {
      fanTargetIcon = <div style={{ position: 'absolute', right: '0px', bottom: '0px', width: '24px', height: '24px' }}><FanTargetIcon fanTarget={this.props.account.get('fan_target')} size={24} /></div>;
    }

    return (
      <div className='navigation-bar'>
        <Permalink href={this.props.account.get('url')} to={`/accounts/${this.props.account.get('id')}`}><Avatar src={this.props.account.get('avatar')} animate size={40} /></Permalink>

        <div className='navigation-bar__profile' style={{ position: 'relative' }}>
          <Permalink href={this.props.account.get('url')} to={`/accounts/${this.props.account.get('id')}`}>
            <strong className='navigation-bar__profile-account'>@{this.props.account.get('acct')}</strong>
          </Permalink>
          <a href='/settings/profile' className='navigation-bar__profile-edit'><FormattedMessage id='navigation_bar.edit_profile' defaultMessage='Edit profile' /></a>
          {fanTargetIcon}
        </div>
      </div>
    );
  }

}

NavigationBar.propTypes = {
  account: ImmutablePropTypes.map.isRequired
};

export default NavigationBar;
