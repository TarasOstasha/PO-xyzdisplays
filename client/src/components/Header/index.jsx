import styles from './Header.module.sass';


function Header() {
  return (
    <div className={styles.headerWrapper}>
      <img src="https://www.xyzdisplays.com/v/vspfiles/templates/Charmed/images/template/header_bg.jpg" alt="xyzdisplays" />

      <h4 className={styles.test}>XYZ Displays Shipping Freight</h4>
    </div>
  )
}

export default Header

