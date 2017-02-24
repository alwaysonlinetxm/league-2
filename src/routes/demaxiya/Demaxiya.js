import Component from 'inferno-component';
import { connect } from 'inferno-redux';
import { bindActionCreators } from 'redux';
import Immutable from 'seamless-immutable';
import Actions from '../../actions/DemaxiyaActions';
import Style from './Demaxiya.scss';

class Demaxiya extends Component {
  componentWillMount() {
    this.props.getHero();
  }

  render() {
    const { list } = this.props;

    return (
      <div className={ Style.demaxiya }>
        <p className={ `${Style.border} ${Style.color}` }>Demaxiya</p>
        { Immutable.asMutable(list).map((node, i) => <p key={ i }>{ node.author }</p>) }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { list } = state.demaxiya;
  return {
    list
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Demaxiya);
