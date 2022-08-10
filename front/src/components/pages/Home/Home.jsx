import Button from '../../ui/Button/Button';
import Counters from '../../ui/Counters/Counters';
import Layout from '../../Layout';
import bgImage from '../../../images/bg-main1-min.jpg';
import styles from './Home.module.scss';
import {useNavigate}  from 'react-router-dom'
import {useQuery} from 'react-query';
import {$api} from '../../../api/api';
import {useAuth} from '../../../hooks/useAuth';


const Home = () => {
  const navigate = useNavigate()
  const {isAuth} = useAuth()

  const {refetch, data, isSuccess} = useQuery('home page counters',
      () => $api({
        url: '/users/profile',
        type: 'GET',
        auth: true
      }),
      {
        refetchOnWindowFocus: false,
        enabled: isAuth,
      }
  )

  return (
        <Layout bgImage={bgImage}>
          <Button text='Новая тренировка' styleBtn='button' callback={() => navigate('/new-workout')}/>
          <h1 className={styles.heading}>Название тренировки</h1>
          {(isSuccess && isAuth) && <Counters minutes={data.minutes} workouts={data.workouts} kg={data.kg}/>}
        </Layout>
  );
};

export default Home
