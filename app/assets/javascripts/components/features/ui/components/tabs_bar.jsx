import { Link } from 'react-router';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const mapStateToProps = state => ({
  me: state.getIn(['accounts', state.getIn(['meta', 'me'])])
});

class TabsBar extends React.Component {

  constructor (props, context) {
    super(props, context);
  }

  render () {
    const { me } = this.props;
    let fanTargetLink = '';
    if (me.get('fan_target')) {
      const fanTargetName = me.getIn(['fan_target', 'name']);
      fanTargetLink = <Link className='tabs-bar__link primary' activeClassName='active' to={'/timelines/fan/' + fanTargetName}><i className='fa fa-fw fa-heart' /><FormattedMessage id='tabs_bar.fan_timeline' defaultMessage={fanTargetName} /></Link>;
    }

    return (
      <div className='tabs-bar'>
        <Link className='tabs-bar__link primary' activeClassName='active' to='/statuses/new'><i className='fa fa-fw fa-pencil' /><FormattedMessage id='tabs_bar.compose' defaultMessage='Compose' /></Link>
        <Link className='tabs-bar__link primary' activeClassName='active' to='/timelines/home'><i className='fa fa-fw fa-home' /><FormattedMessage id='tabs_bar.home' defaultMessage='Home' /></Link>
        {fanTargetLink}
        <Link className='tabs-bar__link primary' activeClassName='active' to='/notifications'><i className='fa fa-fw fa-bell' /><FormattedMessage id='tabs_bar.notifications' defaultMessage='Notifications' /></Link>

        <Link className='tabs-bar__link secondary' activeClassName='active' to='/timelines/public/local'><i className='fa fa-fw fa-users' /><FormattedMessage id='tabs_bar.local_timeline' defaultMessage='Local' /></Link>
        <Link className='tabs-bar__link secondary' activeClassName='active' to='/timelines/public'><i className='fa fa-fw fa-globe' /><FormattedMessage id='tabs_bar.federated_timeline' defaultMessage='Federated' /></Link>

        <Link className='tabs-bar__link primary' activeClassName='active' style={{ flexGrow: '0', flexBasis: '30px' }} to='/getting-started'><i className='fa fa-fw fa-asterisk' /></Link>
      </div>
    );
  }

}

TabsBar.propTypes = {
  me: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(TabsBar);
