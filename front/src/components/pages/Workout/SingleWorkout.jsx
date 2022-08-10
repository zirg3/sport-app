import bgImage from '../../../images/new-workout-bg.jpg';
import styles from './SingleWorkout.module.scss'
import {useMutation, useQuery} from 'react-query';
import {$api} from '../../../api/api';
import Header from '../../common/Header/Header';
import stylesLayout from '../../Layout.module.scss';
import {useNavigate, useParams} from 'react-router-dom';
import Alert from '../../ui/Alert/Alert';
import {Fragment, useEffect} from 'react';
import Loader from '../../ui/Loader';
import cn from 'classnames'

const SingleWorkout = () => {
  const navigate = useNavigate()
  const {id} = useParams()

  const { data, isSuccess, isLoading } = useQuery(
      'get workout',
      () =>
          $api({
            url: `/workouts/log/${id}`,
            type: 'GET',
            auth: true
          }),
      {
        refetchOnWindowFocus: false,
      }
  )

  const { mutate: setWorkoutCompleted, error: errorCompleted } = useMutation(
      'Change log state',
      () => $api({
        url: '/workouts/log/completed',
        type: 'PUT',
        body: { logId: id },
      }),
      {
        onSuccess(data) {
          navigate(`/workouts`)
        },
      }
  )

  useEffect(() => {
    if (
        isSuccess &&
        data?.exerciseLogs &&
        data.exerciseLogs.length ===
        data.exerciseLogs.filter(log => log.completed).length &&
        data._id === id
    ) {
      setWorkoutCompleted()
    }
  }, [data?.exerciseLogs])

  return (
      <>
        <div
            className={`${stylesLayout.wrapper} ${stylesLayout.otherPage}`}
            style={{ backgroundImage: `url(${bgImage})`, height: 'auto' }}
        >
          <Header />
          {isSuccess && (
            <div>
              <time className={styles.time}>{data.minutes} мин.</time>
              <h1 className={stylesLayout.heading} style={{color: 'red'}}>{data.workout.name}</h1>
            </div>
          )}
        </div>
        <div className='wrapper-inner-page'>
          <div style={{width: '90%', margin: '0 auto'}}>
            {errorCompleted && <Alert type='error' text={errorCompleted}/>}
          </div>
          {isLoading || (isSuccess && data._id !== id) ? (
              <Loader/>
          ) : (
            <div className={styles.wrapper}>
              {data.exerciseLogs.map((exLog, idx) => {
                return (
                    <Fragment key={`ex ${idx}`}>
                      <div className={cn(styles.item, {
                        [styles.completed]: exLog.completed,
                      })}>
                        <button aria-label='переход к упражнению' onClick={() => navigate(`/exercise/${exLog._id}`)}>
                          <span>{exLog.exercise.name}</span>
                          <img src={`/uploads/exercises/${exLog.exercise.imageName}.svg`} alt="" height='34'/>
                        </button>
                      </div>
                      {idx % 2 !== 0 && idx !== data.exerciseLogs.length - 1 && (
                          <div className={styles.line}></div>
                      )}
                    </Fragment>
                    )
              })}
            </div>
          )}
          {isSuccess && data?.length === 0 && (
              <Alert type='warning' text='Упражнения не найдены'/>
          )}
        </div>
        </>
  );
};

export default SingleWorkout;
