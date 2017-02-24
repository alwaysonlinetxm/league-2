import Component from 'inferno-component';
import { connect } from 'inferno-redux';
import Immutable from 'seamless-immutable';
import Text from './Text';
import Style from './Home.scss';
import ActionTypes from '../../constants/ActionTypes';

class Home extends Component {
  toDemaxiya = () => {
    this.context.router.push('/demaxiya');
  }

  showText = () => {
    this.props.showText('demaxiya');
  }

  componentWillMount() {
    this.props.request({
      url: '//offline-news-api.herokuapp.com/stories',
      success: ActionTypes.GET_MEMBER
    });
  }

  render() {
    const { list, text } = this.props;

    return (
      <div className={ Style.home }>
        <p onClick={ this.toDemaxiya } className={ `${Style.border} ${Style.color}` }>Home</p>
        { Immutable.asMutable(list).map((node, i) => <p key={ i }>{ node.author }</p>) }
        <div onClick={ this.showText }>lalala</div>
        <Text text={ text } />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { list, total, text } = state.home;
  return {
    list,
    total,
    text
  };
}

export default connect(mapStateToProps)(Home);
