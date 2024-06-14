import './App.scss'
import { ContextProvider } from './context/ContextProvider/ContextProvider'
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppRoutes } from './routes/AppRoutes';

function App() {

  return (
    <ContextProvider>
      <AppRoutes />
    </ContextProvider>
  )
}

export default App
