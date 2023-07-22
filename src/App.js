import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import RootLayout from './components/RootLayout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './components/Home/Home';
import Popular from './components/Popular/Popular';
import TopRated from './components/TopRated/TopRated';
import Upcoming from './components/Upcoming/Upcoming';
import MoviePage from './components/MoviePage/MoviePage';
function App() {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/Home",
          element: <Home />
        },
        {
          path: "/Popular",
          element: <Popular />
        },
        {
          path: "/TopRated",
          element: <TopRated />
        },
        {
          path: "/Upcoming",
          element: <Upcoming />
        },
        {
          path: "/movie/:id",
          element: <MoviePage />
        }
      ]
    }
  ])
  return (
    <div className='main'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
