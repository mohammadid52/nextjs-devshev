import styles from "../styles/Navigation.module.css";
import { useRouter } from "next/router";

// icons
import { FiSearch } from "react-icons/fi";
import { VscArrowSmallRight } from "react-icons/vsc";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";

import { authActions } from "../store/action";
import { useDispatch, useSelector } from "react-redux";

const { logOut } = authActions;

const hoverItemLeft = (
  <div className={styles.nav__hover__container}>
    <ul>
      <li>
        <a>
          <div>
            <p className={styles.nav__hover__text1}>Item1</p>
            <p className={styles.nav__hover__text2}>Other Text</p>
          </div>
          <VscArrowSmallRight size={24} className={styles.nav__icon} />
        </a>
      </li>
      <li>
        <a>
          <div>
            <p className={styles.nav__hover__text1}>Item2</p>
            <p className={styles.nav__hover__text2}>Other Text</p>
          </div>
          <VscArrowSmallRight size={24} className={styles.nav__icon} />
        </a>
      </li>
      <li>
        <a>
          <div>
            <p className={styles.nav__hover__text1}>Item3</p>
            <p className={styles.nav__hover__text2}>Other Text</p>
          </div>
          <VscArrowSmallRight size={24} className={styles.nav__icon} />
        </a>
      </li>
    </ul>
  </div>
);

const Navigation = ({ isLoggedIn = true }) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);
  const { photoURL, displayName } = useSelector((state) => state.firebase.auth);
  const profilePhoto = photoURL ? String(photoURL) : "/avatar.jpg";

  const router = useRouter();

  const _logout = () => {
    dispatch(logOut(() => router.push("/auth")));
  };

  const hoverItemRight = (
    <div className={styles.nav__hover__container}>
      <ul>
        <li className={styles.greetings}>
          Hello,
          <div>{displayName || "Human"}</div>
        </li>

        <li>
          <a>
            <div className={styles.nav__right__item}>
              <CgProfile color="#696969" />
              <p className={styles.nav__hover__text1}>Profile</p>
            </div>
          </a>
        </li>

        <li>
          <div
            onClick={_logout}
            tabIndex="0"
            role="button"
            className={`${styles.logoutButton} ${styles.nav__right__item}`}
          >
            <BiLogOut color="#696969" />
            <p className={styles.logoutText}>Logout</p>
          </div>
        </li>
      </ul>
    </div>
  );
  return (
    <nav className={styles.navigation__container}>
      <ul className={`list-container ${styles.navigation__left}`}>
        <li className={`${styles.logo} ${styles.nav__item}`}>DevShev</li>
        <li className={styles.nav__item}>
          <a href="/">Inspiration</a>
          {hoverItemLeft}
        </li>
        <li className={styles.nav__item}>
          <a href="/">Find Work</a>
          {hoverItemLeft}
        </li>
        <li className={styles.nav__item}>
          <a href="/">Learn Design</a>
          {hoverItemLeft}
        </li>
        <li className={styles.nav__item}>
          <a href="/">Hire</a>
          {hoverItemLeft}
        </li>
      </ul>
      <div className={styles.navigation__right}>
        {isLoggedIn ? (
          <>
            <form className={styles.searchBar}>
              <FiSearch size={21} color="#bbb" />
              <input className={styles.searchInput} placeholder="Search" />
            </form>
            <ul className={styles.user}>
              <li className={`${styles.nav__item} right`}>
                <img
                  src={profilePhoto}
                  className={styles.user__image}
                  alt="avatar"
                  width={35}
                  height={35}
                />
                {hoverItemRight}
              </li>
            </ul>
          </>
        ) : (
          <ul className={styles.auth__action}>
            <li className={styles.logIn}>Login</li>
            <li className={`${styles.signUp} signUp`}>Sign up</li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
