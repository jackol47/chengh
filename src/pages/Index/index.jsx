import React, { PureComponent } from 'react';
import styles from './style.less';
import { header, skills } from './service';
import { get } from './api';
import axios from 'axios'
import Modal from './components/Modal';
import img from '../../res';

class PageHome extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      showTip: '',
      showText: ''
    };
  }

  async componentDidMount() {
    const { data } = await axios.get('json.js')
    console.log('response: ', data)
  }

  handleClick = (item) => {
    const { tip, text, href } = item;
    if (href) {
      window.location.href = href;
      return false;
    }
    if (tip && text) {
      this.setState({
        showTip: tip,
        showText: text
      });
      this.setState({
        isShow: true
      });
    } else {
      this.setState({
        isShow: false
      });
    }
  };

  render() {
    const { isShow, showText, showTip } = this.state;

    return (
      <div className={styles.root}>
        <header className={styles.header}>
          {header.map((item) => {
            return (
              <div key={item.text} onClick={() => this.handleClick(item)}>
                <img src={item.img} alt="" />
                <p>{item.text}</p>
              </div>
            );
          })}
        </header>
        <img className={styles.banner} src={img.banner} alt="" />
        <h3 className={styles.title}>技能中心</h3>
        <ul className={styles.skill}>
          {skills.map((item) => {
            return (
              <li className={styles.skill_list} key={item.text}>
                <img src={item.img} alt="" />
                <p>{item.text}</p>
                <div
                  className={styles.skill_try}
                  onClick={() => {
                    this.handleClick(item);
                  }}
                >
                  试一试
                </div>
              </li>
            );
          })}
        </ul>
        <Modal
          isShow={isShow}
          showText={showText}
          showTip={showTip}
          handleClose={this.handleClick}
        />
      </div>
    );
  }
}

export default PageHome;
