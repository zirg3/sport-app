import bgImage from '../../../images/new-workout-bg.jpg';
import styles from './SingleWorkout.module.scss'
import {useMutation, useQuery} from 'react-query';
import {$api} from '../../../api/api';
import { useNavigate } from 'react-router-dom';
import Alert from '../../ui/Alert/Alert';
import Layout from '../../Layout';
import Loader from '../../ui/Loader';


const ListWorkout = () => {
  const navigate = useNavigate()

  const { data, isSuccess } = useQuery(
      'get workouts',
      () =>
          $api({
            url: `/workouts`,
            type: 'GET',
            auth: true
          }),
      {
        refetchOnWindowFocus: false,
      }
  )

  const { mutate: createWorkoutLog, isLoading, isSuccess: isSuccessMutate, error,} = useMutation(
      'Create new workout log',
      ({ workoutId }) =>
          $api({
            url: '/workouts/log',
            type: 'POST',
            body: { workoutId },
          }),
      {
        onSuccess(data) {
          navigate(`/workout/${data._id}`)
        },
      }
  )

  return (
      <>
        <Layout bgImage={bgImage} heading='Список тренировок'/>
        <div className='wrapper-inner-page'>
          {error && <Alert type='error' text={error} />}
          {isSuccessMutate && <Alert text='Workout log created' />}
          {isLoading && <Loader />}
          {isSuccess && (
              <div className={styles.wrapper}>
                {data.map((workout, idx) => (
                      <div className={styles.item} key={`workout ${idx}`}>
                        <button aria-label='Create new workout'
                            onClick={() =>
                                createWorkoutLog({workoutId: workout._id,})
                            }>
                          <span>{workout.name}</span>
                        </button>
                      </div>
                  )
                )}
              </div>
          )}
          {isSuccess && data?.length === 0 && (
              <Alert type='warning' text='Тренировки не найдены' />
          )}
        </div>
      </>
  );
};

export default ListWorkout;
