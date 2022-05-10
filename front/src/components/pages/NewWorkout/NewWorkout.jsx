import React, {useState} from 'react';
import ReactSelect from 'react-select'
import {Link} from 'react-router-dom'
import Layout from '../../Layout';
import bgImage from '../../../images/new-workout-bg.jpg';
import Field from '../../ui/Field/Field';
import Button from '../../ui/Button/Button';
// import {optionColor} from '../../ui/optionColor';


const NewWorkout = () => {
  const [name, setName] = useState()
  const [exercises, setExercises] = useState([])

  const handleSubmit = () => {

  }

  return (
      <>
        <Layout bgImage={bgImage} heading='Создать новую тренировку'/>
          <div className='wrapper-inner-page'>
            <form onSubmit={handleSubmit}>
              <Field
                  placeholder='Ведите имя'
                  value={name}
                  onChange={e => setName(e.target.value)}
              />
              <Link className='dark-link' to='/new-exercise'>Добавить новое упражнение</Link>
              <ReactSelect
                  classNamePrefix='select2-selection'
                  placeholder='Упражнения...'
                  title='Упражнения'
                  options={[
                    {value: 0, label: 'push-up'},
                    {value: 1, label: 'Pull-ups'},
                  ]}
                  value={exercises}
                  onChange={setExercises}
                  isMulti={true}
                  // theme={theme => optionColor(theme)}
              />
              <Button text='Создать' callback={() => {}}/>
            </form>
          </div>
        </>
  );
};

export default NewWorkout;
