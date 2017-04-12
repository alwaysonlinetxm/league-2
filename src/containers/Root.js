// @flow
import Inferno from 'inferno';
import Component from 'inferno-component';
import { bindActionCreators } from 'redux';
import { connect } from 'inferno-redux';
import * as actions from '../actions/CommonActions';
import './reset.scss';

class Root extends Component {
  props: {
    children: Object,
    actions: Object,
    text: string
  }

  render() {
    const { actions, children, text } = this.props;

    return (
      <div>
        { Inferno.cloneVNode(children, { ...actions }) }
        <footer>{ text }</footer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    text: state.common.text
  };
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
