import React, {useState} from 'react';
import Layout from '../../Layout';
import cn from 'classnames';
import bgImage from '../../../images/new-workout-bg.jpg';
import Field from '../../ui/Field/Field';
import Button from '../../ui/Button/Button';
import styles from './NewExercise.module.scss';
import {useMutation} from 'react-query';
import {$api} from '../../../api/api';
import Alert from '../../ui/Alert/Alert';
import Loader from '../../ui/Loader';
// import {optionColor} from '../../ui/optionColor';


const data = ['chest', 'shoulders', 'biceps', 'legs', 'hit', 'back']

const NewExercise = () => {
  const [name, setName] = useState('')
  const [times, setTimes] = useState(1)
  const [imageName, setImageName] = useState('chest')
  const [errorCreate, setErrorCreate] = useState(false)

  const {isSuccess, mutate, isLoading, error} = useMutation(
      'Create new exercise',
      () => $api({
        url: '/exercises',
        type: 'POST',
        body: {name, times, imageName},
      }),
      {
        onSuccess(data) {
          setName('')
          setTimes(1)
          setImageName('chest')

        }
      }
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name && times && imageName){
      setErrorCreate(false)
      mutate()
    } else
      setErrorCreate(true)
  }

  return (
      <>
        <Layout bgImage={bgImage} heading='Создать новое упражнение'/>
          <div className='wrapper-inner-page'>
            {error && <Alert type='error' text={error}/>}
            {isSuccess && <Alert text={'Упражнение создано'} />}
            {(isLoading) && <Loader/>}
            <form onSubmit={handleSubmit}>
              {errorCreate && <div>Заполните все поля</div>}
              <Field
                  placeholder='Название'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
              />
              <Field
                  placeholder='Количество'
                  value={times}
                  onChange={e => setTimes(e.target.value)}
                  required
              />
                <div className={styles.images}>
                  {data &&
                  (data.map(name => (
                      <img
                          key={`ex img ${name}`}
                          src={`/uploads/exercises/${name}.svg`}
                          alt={name}
                          className={cn({
                            [styles.active]: imageName === name,
                          })}
                          onClick={() => setImageName(name)}
                          draggable={false}
                          height='45'
                      />
                    )))
                  }
                </div>
              <Button text='Создать' callback={() => {}}/>
            </form>
          </div>
        </>
  );
};

export default NewExercise;
