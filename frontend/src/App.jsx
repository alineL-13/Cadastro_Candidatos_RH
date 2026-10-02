import Header from './components/header'
import { Route, Routes } from 'react-router'
import CandidatesList from './pages/candidatesList'
import CandidateDetails from './pages/candidateDetails'
import CreatePage from './pages/createPage'

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <Routes>
        <Route path="/" element={<CandidatesList />} />
        <Route path="/candidato/:id" element={<CandidateDetails />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </div>
  )
}

export default App
