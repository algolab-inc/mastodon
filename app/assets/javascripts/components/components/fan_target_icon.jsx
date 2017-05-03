import PureRenderMixin from 'react-addons-pure-render-mixin';
import PropTypes from 'prop-types';

class FanTargetIcon extends React.PureComponent {

  constructor (props, context) {
    super(props, context);
    this.handleFanTargetClick = this.handleFanTargetClick.bind(this);
  }

  handleFanTargetClick (fan, e) {
    if (e.button === 0) {
      e.preventDefault();
      this.context.router.push(`/timelines/fan/${fan}`);
    }
  }

  render () {
    const fanTarget = this.props.fanTarget;
    return (
      <a href={fanTarget.get('url')} onClick={this.handleFanTargetClick.bind(this, fanTarget.get('name'))}>
        <img src={fanTarget.get('icon_path')} width={this.props.size} height={this.props.size} />
      </a>
    )
  }
}

FanTargetIcon.contextTypes = {
  router: React.PropTypes.object
};

FanTargetIcon.propTypes = {
  fanTarget: React.PropTypes.object.isRequired,
  size: React.PropTypes.number.isRequired
};

export default FanTargetIcon;
