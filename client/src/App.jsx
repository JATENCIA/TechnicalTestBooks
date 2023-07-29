import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import { AuthProvider } from './context/AuthContex'
import BookDetaild from './pages/BookDetaild'
import BooksPage from './pages/BooksPage'
import ProfilePage from './pages/ProfilePage'
import ProtectedRoute from './ProtectedRoute'
import { ReviewProvider } from './context/ReviewsContex'
import { BooksProvider } from './context/BooksContex'
import NavBar from './components/NavBar'

function App() {
  return (
    <AuthProvider>
      <BooksProvider>
        <ReviewProvider>
          <BrowserRouter>
            <NavBar />
            <Routes>
              <Route path='/' element={<BooksPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path='/detail/:id' element={<BookDetaild />} />
                <Route path='/profile' element={<ProfilePage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ReviewProvider>
      </BooksProvider>
    </AuthProvider>
  )
}

export default App
