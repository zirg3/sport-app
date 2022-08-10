import Auth from './components/pages/Auth/Auth'
import Home from './components/pages/Home/Home'
import NewExercise from './components/pages/NewExercise/NewExercise'
import NewWorkout from './components/pages/NewWorkout/NewWorkout'
import Profile from './components/pages/Profile/Profile'
import SingleWorkout from './components/pages/Workout/SingleWorkout'
import ListWorkouts from './components/pages/Workout/ListWorkouts'
import SingleExercise from './components/pages/Exercises/SingleExercise'

export const routes = [
	{
		path: '/',
		exact: true,
		element: Home,
		auth: false,
	},
	{
		path: '/auth',
		exact: false,
		element: Auth,
		auth: false,
	},
	{
		path: '/new-workout',
		exact: false,
		element: NewWorkout,
		auth: true,
	},
	{
		path: '/new-exercise',
		exact: false,
		element: NewExercise,
		auth: true,
	},
	{
		path: '/profile',
		exact: false,
		element: Profile,
		auth: true,
	},
	{
		path: '/workout/:id',
		exact: false,
		element: SingleWorkout,
		auth: true,
	},
	{
		path: '/workouts',
		exact: false,
		element: ListWorkouts,
		auth: true,
	},
	{
		path: '/exercise/:id',
		exact: false,
		element: SingleExercise,
		auth: true,
	},
]
