import './App.css'
import AddBookForm from './components/AddBookForm'
import BookList from './components/BookList'

function App() {
  return (
    <div style={{ maxWidth: 600, margin: '2rem auto' }}>
      <h1>Bookshelf</h1>
      <AddBookForm />
      <hr style={{ margin: '2rem 0' }} />
      <BookList />
    </div>
  )
}

export default App
