import PureRenderMixin from 'react-addons-pure-render-mixin';

const FanTargetIcon = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },

  propTypes: {
    fanTarget: React.PropTypes.object.isRequired,
    size: React.PropTypes.number.isRequired
  },

  handleFanTargetClick (fan, e) {
    if (e.button === 0) {
      e.preventDefault();
      this.context.router.push(`/timelines/fan/${fan}`);
    }
  },

  render () {
    const fanTarget = this.props.fanTarget;
    return (
      <a href={fanTarget.get('url')} onClick={this.handleFanTargetClick.bind(this, fanTarget.get('name'))}>
        <img src={fanTarget.get('icon_path')} width={this.props.size} height={this.props.size} />
      </a>
    )
  }
});

export default FanTargetIcon;
