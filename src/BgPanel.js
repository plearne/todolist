import React, {Component} from 'react';
import './BgPanel.css';

export default class BgPanel extends Component {
  componentDidMount(){
    console.log('didMount...')
    let panel = this.getPanel();
    setTimeout(() => {
      panel.classList.add('show');
    }, 0)
  }
  render(){
    return (
      <div className="bg-container">
        <div className="bg-panel">
          <header>更换背景</header>
          <div className="pics" onClick={this.changeBg.bind(this)}>
            <div className="pic"><img alt="background" src="http://i1.piimg.com/588926/e41e2fcd0f7b8087.jpg"/></div>
            <div className="pic"><img alt="background" src="http://i1.piimg.com/588926/c9bb27dc0f22b174.jpg"/></div>
            <div className="pic"><img alt="background" src="http://i4.buimg.com/588926/b26f7f35c78e85b7.jpg"/></div>
            <div className="pic"><img alt="background" src="http://i1.piimg.com/588926/37e3c55373f8898e.jpg"/></div>
            <div className="pic"><img alt="background" src="http://i1.piimg.com/588926/67b63a66db2f1ba0.jpg"/></div>
            <div className="pic"><img alt="background" src="http://i1.piimg.com/588926/67b63a66db2f1ba0.jpg"/></div>
            <div className="pic"><img alt="background" src="http://i1.piimg.com/588926/67b63a66db2f1ba0.jpg"/></div>
            <div className="pic"><img alt="background" src="http://i1.piimg.com/588926/67b63a66db2f1ba0.jpg"/></div>
            <div className="pic"><img alt="background" src="http://i1.piimg.com/588926/67b63a66db2f1ba0.jpg"/></div>
            <div className="pic"><img alt="background" src="http://i1.piimg.com/588926/67b63a66db2f1ba0.jpg"/></div>
            <div className="pic"><img alt="background" src="http://i1.piimg.com/588926/67b63a66db2f1ba0.jpg"/></div>
            <div className="pic"><img alt="background" src="http://i1.piimg.com/588926/67b63a66db2f1ba0.jpg"/></div>
            <div className="pic"><img alt="background" src="http://i1.piimg.com/588926/c9bb27dc0f22b174.jpg"/></div>
            <div className="pic"><img alt="background" src="http://i1.piimg.com/588926/e41e2fcd0f7b8087.jpg"/></div>
            <div className="pic"><img alt="background" src="http://i1.piimg.com/588926/e41e2fcd0f7b8087.jpg"/></div>
            <div className="pic"><img alt="background" src="http://i1.piimg.com/588926/c9bb27dc0f22b174.jpg"/></div>
          </div>
          <footer>
            <button onClick={this.props.onClick.bind(null)}>完成</button>
          </footer>
        </div>
      </div>
    )
  }
  componentWillUnmount(){
    console.log('unmount...')
    
  }
  changeBg(e){
    let url = e.target.src;
    this.props.changeBg.call(null,url);
  }
  getPanel(){
    return document.querySelector('.bg-panel')
  }
}