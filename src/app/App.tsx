import AppRouter from 'app/providers/AppRouter/ui/AppRouter';
import Header from 'widgets/Header';
import Sidebar from 'widgets/Sidebar';

const App = () => {
	return (
		<div className='app'>
			<Header/>
			<div className='page'>
				<Sidebar/>
				<AppRouter/>
			</div>
		</div>
	);
};

export default App;
