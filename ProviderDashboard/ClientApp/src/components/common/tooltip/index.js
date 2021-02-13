/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-render-return-value */
/* eslint-disable react/no-find-dom-node */
import React from 'react';
import ReactDOM from 'react-dom';

import TooltipContainer from './TooltipContainer';

const tooltipDelay = 2000;
const tooltipShowDelay = 660;
const tooltipCloseDelay = 0;

let lastTimeTooltipShow = new Date();

class Tooltip extends React.Component {
  _showTimeout = null;

  _hideTimeout = null;

  _tooltipContainer = null;

  _parentContainer = null;

  componentWillUnmount() {
    const { tooltip } = this.props;
    if (tooltip) {
      clearTimeout(this._showTimeout);
      clearTimeout(this._hideTimeout);

      if (this._parentContainer) {
        ReactDOM.unmountComponentAtNode(this._parentContainer);
      }
      this._parentContainer = null;
    }
  }

  updateTooltip() {
    const { tooltip, tooltipPlacement, tooltipBgColor, target } = this.props;

    this._parentContainer = document.getElementById('tooltip-container');
    const targetElem = document.getElementById(target);
    const targetElemNode = targetElem !== null ? ReactDOM.findDOMNode(targetElem) : null;

    if (targetElemNode) {
      const elemBoundingRect = targetElemNode.getBoundingClientRect();

      const pos = {
        top: elemBoundingRect.top,
        left: elemBoundingRect.left,
      };

      if (window.scrollY) {
        pos.top += window.scrollY;
      }

      if (tooltipPlacement === 'up') {
        pos.top -= 10;
        pos.left += elemBoundingRect.width / 2 - 1;
      } else if (tooltipPlacement === 'right') {
        pos.top += elemBoundingRect.height / 2;
        pos.left += elemBoundingRect.width + 10;
      } else if (tooltipPlacement === 'left') {
        pos.top += elemBoundingRect.height / 2;
      } else {
        pos.top += elemBoundingRect.height + 10;
        pos.left += elemBoundingRect.width / 2 - 1;
      }

      if (this._parentContainer) {
        const comp = (
          <TooltipContainer bgColor={tooltipBgColor} position={pos} placement={tooltipPlacement}>
            {tooltip}
          </TooltipContainer>
        );

        this._tooltipContainer = ReactDOM.render(comp, this._parentContainer);
      }
    } else {
      console.error(`The element id ${target} doesn't exist`);
    }
  }

  tooltipHide() {
    clearTimeout(this._showTimeout);
    clearTimeout(this._hideTimeout);

    if (this._tooltipContainer) {
      this._tooltipContainer.isHidden() || (lastTimeTooltipShow = new Date());
      this._tooltipContainer.hide();
    }
  }

  tooltipMouseenter = () => {
    this.updateTooltip();

    clearTimeout(this._showTimeout);
    clearTimeout(this._hideTimeout);

    const showTooltip = () => {
      lastTimeTooltipShow = new Date();

      this._tooltipContainer && this._tooltipContainer.show();
    };

    if (Date.now() - lastTimeTooltipShow < tooltipDelay) {
      showTooltip();
    } else {
      const { enterDelay } = this.props;
      this._showTimeout = setTimeout(showTooltip, enterDelay || tooltipShowDelay);
    }
  };

  tooltipMouseleave = () => {
    const { leaveDelay } = this.props;
    const showDelay = leaveDelay || tooltipCloseDelay;

    const hideTooltip = () => {
      this._tooltipContainer && this.tooltipHide();
    };

    showDelay ? (this._hideTimeout = setTimeout(hideTooltip, showDelay)) : hideTooltip();
  };

  render() {
    const { children } = this.props;
    return children({
      tooltipMouseenter: this.tooltipMouseenter,
      tooltipMouseleave: this.tooltipMouseleave,
    });
  }
}

export default Tooltip;
