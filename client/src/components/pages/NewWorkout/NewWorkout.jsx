import React, {useState} from 'react';
import ReactSelect from 'react-select'
import {Link} from 'react-router-dom'
import Layout from '../../Layout';
import bgImage from '../../../images/new-workout-bg.jpg';
import Field from '../../ui/Field/Field';
import Button from '../../ui/Button/Button';
import {useMutation, useQuery} from 'react-query';
import {$api} from '../../../api/api';
import Alert from '../../ui/Alert/Alert';
import Loader from '../../ui/Loader';
// import {optionColor} from '../../ui/optionColor';


const NewWorkout = () => {
  const [name, setName] = useState('')
  const [exercisesCurrent, setExercisesCurrent] = useState([])

  const { data, isSuccess } = useQuery('list exercises',
      () => $api({
        url: '/exercises',
        type: 'GET',
        auth: true
      }),
      {
        refetchOnWindowFocus: false,
      }
  )

  const {mutate: mutateExercises, isLoading, isSuccess: isSuccessMutate, error,} = useMutation(
      'Create new workout',
      ({ exIds }) =>
          $api({
            url: '/workouts',
            type: 'POST',
            body: { name, exerciseId: exIds },
          }),
      {
        onSuccess() {
          setName('')
          setExercisesCurrent([])
        },
      }
  )
  console.log(exercisesCurrent)

  const handleSubmit = (e) => {
    e.preventDefault()
    const exIds = exercisesCurrent.map(ex => ex.value)

    mutateExercises({
      exIds
    })
  }

  return (
      <>
        <Layout bgImage={bgImage} heading='Создать новую тренировку'/>
          <div className='wrapper-inner-page'>
            {error && <Alert type='error' text={error}/>}
            {isSuccessMutate && <Alert text={'Тренировка создана'} />}
            {(isLoading) && <Loader/>}
            <form onSubmit={handleSubmit}>
              <Field
                  placeholder='Ведите имя'
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
              />
              <Link className='dark-link' to='/new-exercise'>Добавить новое упражнение</Link>
              {isSuccess && data && (
              <ReactSelect
                  classNamePrefix='select2-selection'
                  placeholder='Упражнения...'
                  title='Упражнения'
                  isMulti
                  options={data.map(item => (
                    {value: item._id, label: item.name}
                  ))}
                  value={exercisesCurrent}
                  onChange={setExercisesCurrent}
                  // theme={theme => optionColor(theme)}
              />
              )}
              <Button text='Создать' callback={() => {}}/>
            </form>
          </div>
        </>
  );
};

export default NewWorkout;
