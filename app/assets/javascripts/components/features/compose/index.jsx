import ComposeFormContainer from './containers/compose_form_container';
import UploadFormContainer from './containers/upload_form_container';
import NavigationContainer from './containers/navigation_container';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { mountCompose, unmountCompose } from '../../actions/compose';
import { Link } from 'react-router';
import { injectIntl, defineMessages } from 'react-intl';
import SearchContainer from './containers/search_container';
import { Motion, spring } from 'react-motion';
import SearchResultsContainer from './containers/search_results_container';
import ImmutablePropTypes from 'react-immutable-proptypes';

const messages = defineMessages({
  start: { id: 'getting_started.heading', defaultMessage: 'Getting started' },
  public: { id: 'navigation_bar.public_timeline', defaultMessage: 'Federated timeline' },
  community: { id: 'navigation_bar.community_timeline', defaultMessage: 'Local timeline' },
  preferences: { id: 'navigation_bar.preferences', defaultMessage: 'Preferences' },
  logout: { id: 'navigation_bar.logout', defaultMessage: 'Logout' }
});

const mapStateToProps = state => ({
  showSearch: state.getIn(['search', 'submitted']) && !state.getIn(['search', 'hidden']),
  me: state.getIn(['accounts', state.getIn(['meta', 'me'])])
});

class Compose extends React.PureComponent {

  componentDidMount () {
    this.props.dispatch(mountCompose());
  }

  componentWillUnmount () {
    this.props.dispatch(unmountCompose());
  }

  render () {
    const { withHeader, showSearch, intl, me } = this.props;

    let header = '';

    if (withHeader) {
      let fanTargetLink = '';
      if (me.get('fan_target')) {
        const fanTargetName = me.getIn(['fan_target', 'name']);
        fanTargetLink = <Link to={'/timelines/fan/' + fanTargetName} className='drawer__tab' title={fanTargetName}><i role="img" aria-label={fanTargetName} className='fa fa-heart'/></Link>
      }

      header = (
        <div className='drawer__header'>
          <Link to='/getting-started' className='drawer__tab' title={intl.formatMessage(messages.start)}><i role="img" aria-label={intl.formatMessage(messages.start)} className='fa fa-asterisk' /></Link>
          {fanTargetLink}
          <Link to='/timelines/public/local' className='drawer__tab' title={intl.formatMessage(messages.community)}><i role="img" aria-label={intl.formatMessage(messages.community)} className='fa fa-users' /></Link>
          <Link to='/timelines/public' className='drawer__tab' title={intl.formatMessage(messages.public)}><i role="img" aria-label={intl.formatMessage(messages.public)} className='fa fa-globe' /></Link>
          <a href='/settings/preferences' className='drawer__tab' title={intl.formatMessage(messages.preferences)}><i role="img" aria-label={intl.formatMessage(messages.preferences)} className='fa fa-cog' /></a>
          <a href='/auth/sign_out' className='drawer__tab' data-method='delete' title={intl.formatMessage(messages.logout)}><i role="img" aria-label={intl.formatMessage(messages.logout)} className='fa fa-sign-out' /></a>
        </div>
      );
    }

    return (
      <div className='drawer'>
        {header}

        <SearchContainer />

        <div className='drawer__pager'>
          <div className='drawer__inner'>
            <NavigationContainer />
            <ComposeFormContainer />
          </div>

          <Motion defaultStyle={{ x: -100 }} style={{ x: spring(showSearch ? 0 : -100, { stiffness: 210, damping: 20 }) }}>
            {({ x }) =>
              <div className='drawer__inner darker' style={{ transform: `translateX(${x}%)`, visibility: x === -100 ? 'hidden' : 'visible' }}>
                <SearchResultsContainer />
              </div>
            }
          </Motion>
        </div>
      </div>
    );
  }

}

Compose.propTypes = {
  dispatch: PropTypes.func.isRequired,
  withHeader: PropTypes.bool,
  showSearch: PropTypes.bool,
  me: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(injectIntl(Compose));
