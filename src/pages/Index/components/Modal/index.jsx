import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './style.less'

export default class index extends PureComponent {
    static propTypes = {
        isShow: PropTypes.bool.isRequired,
        showText: PropTypes.string.isRequired,
        showTip: PropTypes.string.isRequired,
        handleClose: PropTypes.func.isRequired,
    }

    render() {
        const { isShow, showText, showTip, handleClose }= this.props
        return (
            <div className={isShow ? styles.show : styles.noShow}>
            <div className={styles.tip}>
              <p className={styles.tip_title}>{showText}</p>
              <p className={styles.tip_show}>{showTip}</p>
              <div className={styles.tip_footer} onClick={handleClose}>
                <p>知道了</p>
              </div>
            </div>
            <div className={styles.mask} />
          </div>
        )
    }
}
