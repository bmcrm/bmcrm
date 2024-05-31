import { AppRouter } from 'app/providers/AppRouter';
import Header from 'widgets/Header';

const App = () => {
	return (
		<div className='app'>
			<Header/>
			<main className='main'>
				<AppRouter/>
			</main>
		</div>
	);
};

export default App;
