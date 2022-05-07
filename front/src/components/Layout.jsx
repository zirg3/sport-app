import Header from './common/Header/Header';
import styles from './Layout.module.scss'

const Layout = ({children, bgImage, height = '350px'}) => {
  return (
      <div className={styles.wrapper} style={{height, backgroundImage: `url(${bgImage})`}}>
        <Header/>
        <div>
          {children}
        </div>
      </div>
  );
};

export default Layout;
