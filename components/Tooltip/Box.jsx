import events from 'add-event-listener';
import React from 'react';

import position from './position';

import styles from './Box.less';

export default class Box extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pos: null,
    };

    this.handleDocClick = this.handleDocClick.bind(this);
    this.reflow = this.reflow.bind(this);
  }

  render() {
    let style = this.state.pos ? this.state.pos.boxStyle : {left: 0};

    return (
      <div className={styles.root} style={style}>
        {this.renderPin()}
        <div className={styles.inner}>{this.props.children}</div>
      </div>
    );
  }

  renderPin() {
    let pos = this.state.pos;
    if (!pos) return null;

  let outer = Object.assign({}, pos.pinStyle);
  let inner = {};
    switch (pos.pinDirection) {
      case 'bottom':
        outer.bottom = -6;
        outer.marginLeft = -7;

        outer.borderBottom = inner.borderBottom = '0';
        outer.borderLeftColor = inner.borderLeftColor = 'transparent';
        outer.borderRightColor = inner.borderRightColor = 'transparent';

        inner.top = -7;
        inner.left = -6;
        break;

      case 'top':
        outer.top = -6;
        outer.marginLeft = -7;

        outer.borderTop = inner.borderTop = '0';
        outer.borderLeftColor = inner.borderLeftColor = 'transparent';
        outer.borderRightColor = inner.borderRightColor = 'transparent';

        inner.top = 1;
        inner.left = -6;
        break;

      case 'left':
        outer.left = -6;
        outer.marginTop = -7;

        outer.borderLeft = inner.borderLeft = '0';
        outer.borderTopColor = inner.borderTopColor = 'transparent';
        outer.borderBottomColor = inner.borderBottomColor = 'transparent';

        inner.top = -6;
        inner.left = 1;
        break;

      case 'right':
        outer.right = -6;
        outer.marginTop = -7;

        outer.borderRight = inner.borderRight = '0';
        outer.borderTopColor = inner.borderTopColor = 'transparent';
        outer.borderBottomColor = inner.borderBottomColor = 'transparent';

        inner.top = -6;
        inner.left = -7;
        break;
    }

    return (
      <div className={styles.pin} style={outer}>
        <div className={styles.pinInner} style={inner} />
      </div>
    );
  }

  componentDidMount() {
    this.reflow();

    events.addEventListener(window, 'scroll', this.reflow);
    if (this.props.trigger === 'click') {
      events.addEventListener(document, 'click', this.handleDocClick);
    }
  }

  componentWillUnmount() {
    events.removeEventListener(window, 'scroll', this.reflow);
    events.removeEventListener(document, 'click', this.handleDocClick);
  }

  componentDidUpdate() {
    this.reflow();
  }

  handleDocClick(event) {
    const target = event.target || srcElement;
    if (!this.props.target.contains(target) &&
        !React.findDOMNode(this).contains(target)) {
      this.props.onClose();
    }
  }

  reflow() {
    if (this.updating_) return;

    this.updating_ = true;
    this.setState({pos: null}, () => {
      let of = this.props.target;
      let el = React.findDOMNode(this);
      this.setState({pos: position(el, of, this.props.pos)}, () => {
        this.updating_ = false;
      });
    });
  }
}
