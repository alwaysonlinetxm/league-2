import Component from 'inferno-component';

class Text extends Component {
  render() {
    return (
      <div>{ this.props.text }</div>
    );
  }
}

export default Text;
