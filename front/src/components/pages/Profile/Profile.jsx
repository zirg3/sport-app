import bgImage from '../../../images/new-workout-bg.jpg';
import afterImage from '../../../images/after.jpg'
import styles from './Profile.module.scss'
import {useQuery} from 'react-query';
import {$api} from '../../../api/api';
import Header from '../../common/Header/Header';
import stylesLayout from '../../Layout.module.scss';
import Counters from '../../ui/Counters/Counters';
import userImage from '../../../images/header/user.svg'
import {useAuth} from '../../../hooks/useAuth';

const Profile = () => {
  const {userLogin} = useAuth()
  const { data, isSuccess } = useQuery(
      'home page counters',
      () =>
          $api({
            url: '/users/profile',
            type: 'GET',
            auth: true
          }),
      {
        refetchOnWindowFocus: false,
      }
  )

  return (
      <>
        <div
            className={`${stylesLayout.wrapper} ${stylesLayout.otherPage}`}
            style={{ backgroundImage: `url(${bgImage})`, height: 'auto' }}
        >
          <Header />

          <div className={styles.center}>
            <img src={userImage} alt='Profile' height='56' draggable={false} />
            {isSuccess && (
              <>
                <h1 className={stylesLayout.heading} style={{color: 'red'}}>{userLogin}</h1>
                <h2>Ваша почта <br/> {data.email}</h2>
              </>
            )}
          </div>

          {isSuccess && (
              <Counters
                  minutes={data.minutes}
                  workouts={data.workouts}
                  kgs={data.kgs}
                  type='profile'
              />
          )}
        </div>
          <div className='wrapper-inner-page'>
            <div className={styles.before_after}>
              <div>
                <div className={styles.heading}>До</div>
                <img src={afterImage} alt=""/>
              </div>
              <div>
                <div className={styles.heading}>После</div>
                <img src={afterImage} alt=""/>
              </div>
            </div>
          </div>
        </>
  );
};

export default Profile;
