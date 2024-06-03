import { AppRouter } from 'app/providers/AppRouter'
import Header from 'widgets/Header'

const App = () => {
  return (
    <div className='app'>
      <Header />
      <AppRouter />
    </div>
  )
}

export default App
