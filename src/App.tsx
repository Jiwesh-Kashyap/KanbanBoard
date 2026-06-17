import Board from './components/Board';
import NewTaskForm from './components/NewTaskForm';

export default function App(){
    return(
        <div className='app-container flex flex-col align-middle w-full m-auto'>
            <h1 className='text-4xl mb-10 align-middle'>Agile Tracker</h1>
            <NewTaskForm/>
            <Board/>
        </div>
    )
}