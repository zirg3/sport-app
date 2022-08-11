import bgImage1 from '../../../images/ex-bg-1.jpg';
import bgImage2 from '../../../images/ex-bg-2.jpg';
import checkCompletedImage from '../../../images/exercises/check-completed.svg';
import checkImage from '../../../images/exercises/check.svg';
import styles from './Exercise.module.scss'
import {useMutation, useQuery} from 'react-query';
import {$api} from '../../../api/api';
import Header from '../../common/Header/Header';
import stylesLayout from '../../Layout.module.scss';
import {useNavigate, useParams} from 'react-router-dom';
import Alert from '../../ui/Alert/Alert';
import React, {useEffect, useState} from 'react';
import cn from 'classnames'
import debounce from 'lodash.debounce'
import Loader from '../../ui/Loader';

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const SingleExercise = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [bgImage, setBgImage] = useState(bgImage1)

  useEffect(() => {
    setBgImage(getRandomInt(1,2) === 1 ? bgImage1 : bgImage2)
  },[])

  const { data, isSuccess, refetch, isLoading } = useQuery(
      'get exercise log',
      () =>
          $api({
            url: `/exercises/log/${id}`,
            type: 'GET',
            auth: true
          }),
  )

  const {mutate: changeState, error: errorChange,} = useMutation(
      'change log state',
      ({timeIndex, key, value}) => $api({
        url: '/exercises/log',
        type: 'PUT',
        body: { timeIndex, key, value, logId: id},
        auth: true,
      }),
      {
        onSuccess() {
          refetch()
        },
      }
  )

  const { mutate: setExCompleted, error: errorCompleted } = useMutation(
      'Change log state',
      () =>
          $api({
            url: '/exercises/log/completed',
            type: 'PUT',
            body: { logId: id, completed: true },
          }),
      {
        onSuccess() {
          // navigate(`/workout/${data.workoutLog}`)
        },
      }
  )

  useEffect(() => {
    if (
        isSuccess &&
        data.times.length === data.times.filter(time => time.completed).length &&
        data._id === id
    ) {
      setExCompleted()
    }
  }, [data?.times, isSuccess])

  return (
      <>
        <div
            className={`${stylesLayout.wrapper} ${stylesLayout.otherPage}`}
            style={{ backgroundImage: `url(${bgImage})`, height: 'auto' }}
        >
          <Header  />

          {isSuccess && (
              <div className={styles.heading}>
                <img src={`/uploads/exercises/${data.exercise.imageName}.svg`} alt="" height='34'/>
                <h1 className={stylesLayout.heading} style={{color: 'red'}}>{data.exercise.name}</h1>
              </div>
          )}
        </div>
        <div className='wrapper-inner-page'>
          <div style={{width: '90%', margin: '0 auto'}}>
            {errorChange && <Alert type='error' text={errorChange}/>}
            {errorCompleted && <Alert type='error' text={errorCompleted} />}
          </div>
          {isLoading || (isSuccess && data._id !== id) ? (
              <Loader />
              ) : (
                <div className={styles.wrapper}>
                    <div className={styles.row}>
                      <div>
                        <span>Подходы</span>
                      </div>
                      <div>
                        <span>Повторения и вес</span>
                      </div>
                      <div>
                        <span>Статус</span>
                      </div>
                    </div>
                    {data.times.map((item, idx) => (
                        <div className={cn(styles.row, {
                          [styles.completed]: item.completed
                        })} key={`ex ${idx}`}>
                          <div className={styles.opacity} key={`Prev ${idx}/${item.prevWeight}`}>
                            <input type="number" defaultValue={item.prevWeight} disabled/>
                            <i>кг {item.completed ? '/' : ' /'}</i>
                            <input type="number" value={item.prevRepeat} disabled/>
                          </div>
                          <div key={`RepeatWeight ${idx}/${item.weight}`}>
                            <input type='tel'
                                   pattern='[0-9]*'
                                   defaultValue={item.weight}
                                   disabled={item.completed}
                                   onChange={debounce(e =>
                                       e.target.value && changeState({timeIndex: idx, key: 'weight', value: e.target.value}), 2000)}
                            />
                            <i>кг {item.completed ? '/' : ' /'}</i>
                            <input type="number"
                                   defaultValue={item.repeat}
                                   disabled={item.completed}
                                   onChange={debounce(
                                       e =>
                                           e.target.value && changeState({timeIndex: idx, key: 'repeat', value: e.target.value}), 800)}
                            />
                          </div>
                          <div key={`Completed ${idx}/${item.completed}`}>
                            <img src={item.completed ? checkCompletedImage : checkImage}
                                 alt=""
                                 className={styles.checkbox}
                                 onClick={() =>
                                     changeState({timeIndex: idx, key: 'completed', value: !item.completed})}
                            />
                          </div>
                        </div>
                     ))}
                </div>
            )}
          {isSuccess && data?.times?.length === 0 && (
              <Alert type='warning' text='Упражнения не найдены' />
          )}
        </div>
        </>
  );
};

export default SingleExercise;
