import React from 'react';
import cn from 'classnames';

export default class TooltipContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  show() {
    this.setState({ visible: true });
  }

  hide() {
    this.setState({ visible: false });
  }

  isHidden() {
    const { visible } = this.state;
    return !visible;
  }

  render() {
    const { bgColor, position, placement, children } = this.props;
    const { visible } = this.state;
    const tooltipColor = bgColor || '#893dff';

    const classes = cn({
      tooltip: true,
      'tooltip-visible': visible,
      'tooltip-above': placement === 'up',
      'tooltip-right': placement === 'right',
      'tooltip-left': placement === 'left',
    });

    const styles = {
      ...position,
      backgroundColor: tooltipColor,
    };

    if (placement === 'up') {
      styles.borderTopColor = tooltipColor;
    } else {
      styles.borderBottomColor = tooltipColor;
    }

    return (
      <div aria-hidden={visible} role="tooltip" style={styles} className={classes}>
        <div className="tooltip-body">{children}</div>
      </div>
    );
  }
}
