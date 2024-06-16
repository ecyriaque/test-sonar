import './App.css';
import { Routes, Route} from 'react-router-dom';
import NavbarSpacel from './component/Navbar';
import ImageList from './component/ImageList';
import VideoList from './component/VideoList';
import ImageDetails from './component/ImageDetails';
import VideoDetails from './component/VideoDetails';
import Article from './component/Article';
import ChargementFichier from './component/ChargementFichier';
import ListeAnnotations from './component/ListeAnnotaions';

function App() {

  //sample data

  const images =  [
    {id : 1 , title : "Img1" , author : "Author 1", url : "https://img.freepik.com/photos-gratuite/paysage-paisible-paisible-campagne-propre-flux_1417-1106.jpg"},
    {id : 2 , title : "Img2" , author : "Author 1", url : "https://img.freepik.com/photos-gratuite/jetee-au-bord-lac-hallstatt-autriche_181624-44201.jpg"},
    {id : 3 , title : "Img3" , author : "Author 2", url : "https://img.freepik.com/photos-gratuite/paysage-paisible-paisible-campagne-propre-flux_1417-1106.jpg"},
    {id : 4 , title : "Img4" , author : "Author 3", url : "https://img.freepik.com/photos-gratuite/paysage-paisible-paisible-campagne-propre-flux_1417-1106.jpg"},
    {id : 5 , title : "Img5" , author : "Author 4", url : "https://img.freepik.com/photos-gratuite/jetee-au-bord-lac-hallstatt-autriche_181624-44201.jpg"},
    {id : 6 , title : "Img6" , author : "Author 1", url : "https://img.freepik.com/photos-gratuite/paysage-paisible-paisible-campagne-propre-flux_1417-1106.jpg"}
  ];

  const videos = [
    {id : 1, title : "Video1", author : "Reader 1", url : "https://www.youtube.com/watch?v=SMcztSqSQ18&t=185s"},
    {id : 2, title : "Video2", author : "Reader 2", url : "https://www.youtube.com/watch?v=SMcztSqSQ18&t=185s"}
  ];

  const title = "Article 1";

  const article = "Le chat s'est assis sur le tapis";
  
  return (
    <div className="App">

      <NavbarSpacel />
      
      <Routes>
        <Route path="/image" element={<ImageList images={images} />} />
        <Route path="/video" element={<VideoList videos={videos} />} />
        <Route path="/image/:id" element={<ImageDetails  images={images} />} />
        <Route path="/video/:id" element={<VideoDetails  videos={videos} />} />
        <Route path="/article" element={<Article title={title} article={article} />} />
        <Route path="/charger_document" element={<ChargementFichier />} />
        <Route path="/annotations" element = { < ListeAnnotations/>} />
      </Routes>
      
    </div>
  );
}

export default App;
