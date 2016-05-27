import classNames from 'classnames';
import React, {PropTypes} from 'react';

import Corners from './Corners';
import Upgrades from '../../lib/Upgrades';

import '../ensureOldIEClassName';
import styles from './Button.less';

const DEPRECATED_SIZE_CLASSES = {
  default: styles.deprecated_sizeDefault,
  small: styles.deprecated_sizeDefault, // for new default size
  large: styles.deprecated_sizeLarge,
};

const SIZE_CLASSES = {
  small: styles.sizeSmall,
  medium: styles.sizeMedium,
  large: styles.sizeLarge,
};

class Button extends React.Component {
  static TOP_LEFT = Corners.TOP_LEFT;
  static TOP_RIGHT = Corners.TOP_RIGHT;
  static BOTTOM_RIGHT = Corners.BOTTOM_RIGHT;
  static BOTTOM_LEFT = Corners.BOTTOM_LEFT;

  static propTypes = {
    /**
     * Визуально нажатое состояние.
     */
    active: PropTypes.bool,

    disabled: PropTypes.bool,

    loading: PropTypes.bool,

    /**
     * Вариант использования. Влияет на цвет кнопки.
     */
    use: PropTypes.oneOf([
      'default',
      'primary',
      'success',
      'danger',
      'pay',
    ]),

    narrow: PropTypes.bool,

    size: PropTypes.oneOf(['small', 'medium', 'large']),

    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /**
     * Click handler.
     */
    onClick: PropTypes.func,
  };

  static defaultProps = {
    use: 'default',
    size: 'small',
    type: 'button',
  };

  render() {
    const {corners = 0} = this.props;
    const radius = '2px';

    var rootProps = {
      // By default the type attribute is 'submit'. IE8 will fire a click event
      // on this button if somewhere on the page user presses Enter while some
      // input is focused. So we set type to 'button' by default.
      type: this.props.type,
      className: classNames({
        [styles.root]: true,
        [styles['use-' + this.props.use]]: true,
        [styles.active]: this.props.active,
        [styles.disabled]: this.props.disabled || this.props.loading,
        [styles.narrow]: this.props.narrow,
        [styles.noPadding]: this.props._noPadding,

        ...this._getSizeClassMap(),
      }),
      style: {
        borderRadius: `${corners & Corners.TOP_LEFT ? 0 : radius}` +
          ` ${corners & Corners.TOP_RIGHT ? 0 : radius}` +
          ` ${corners & Corners.BOTTOM_RIGHT ? 0 : radius}` +
          ` ${corners & Corners.BOTTOM_LEFT ? 0 : radius}`,
      },
      disabled: this.props.disabled || this.props.loading,
      onClick: this.props.onClick,
      onKeyDown: this.props.onKeyDown,
    };
    if (this.props.align) {
      rootProps.style.textAlign = this.props.align;
    }
    if (this.props.width) {
      rootProps.style.width = this.props.width;
    }

    let error = null;
    if (this.props.error) {
      error = <div className={styles.error} />;
    } else if (this.props.warning) {
      error = <div className={styles.warning} />;
    }

    let loading = null;
    if (this.props.loading) {
      loading = <div className={styles.loading} />;
    }

    return (
      <button {...rootProps}>
        {loading}
        <div className={styles.caption}>
          {this.props.children}
        </div>
        {error}
      </button>
    );
  }

  _getSizeClassMap() {
    if (!Upgrades.__height34) {
      return {
        [DEPRECATED_SIZE_CLASSES[this.props.size]]: true,
      };
    }

    return {
      [SIZE_CLASSES[this.props.size]]: true,
    };
  }
}

export default Button;
