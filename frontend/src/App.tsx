import {Container, CssBaseline} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import News from "./features/news/news.tsx";
import NewsForm from "./features/news/components/NewsForm.tsx";
import OneNewsPost from "./features/news/components/OneNewsPost.tsx";
import AppToolbar from "./components/UI/AppToolbar/AppToolbar.tsx";


const App = () => {

  return (
      <>
          <CssBaseline/>
          <header>
              <AppToolbar/>
          </header>

          <main>
              <Container maxWidth="xl">
                  <Routes>
                      <Route path="/" element={<News/>}/>
                      <Route path="/news/newPost" element={<NewsForm/>}/>
                      <Route path="/news/:id" element={<OneNewsPost/>}/>
                      <Route path="*" element={(<h3>Not found</h3>)}/>
                  </Routes>
              </Container>
          </main>
      </>
  )
};

export default App;
