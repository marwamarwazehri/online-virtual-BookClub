import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './component/Home/Home';
import Navbar from './component/Home/Navbar/Navbar';
import Footer from './component/Home/Footer/Footer';
import Register from './component/Sign_Up-Sign_in-/Register';
import Login from './component/Sign_Up-Sign_in-/Login';
import BookJoin from './component/Join/BookJoin';
import BookShelf from './component/Join/BookShelf';
import BookDetails from './component/Join/BookDetails';
import { QueryClient, QueryClientProvider } from "react-query";
import Author from './component/Join/Author';
import LeftNavbar from './component/Club/controlBooks/LeftNavbar'
import PostBook from './component/Club/controlBooks/PostBook'
import About from './component/Club/controlBooks/About'
import Write from './component/Club/controlBooks/Write'
import UserStatus from './component/Club/controlBooks/UserStatus';
import Messages from './component/Club/controlBooks/MessagesClub/Messages';
import SettingsNavbar from './component/Settings/SettingsNavbar';
import EditProfile from './component/Settings/EditProfile';
import ChangePassword from './component/Settings/ChangePassword';
import CommentReply from './component/Club/controlBooks/MessagesClub/CommentReply';
import AdminNavbar from './Admin/AdminNavbar';
import AdminRegister from './Admin/AdminRegister';
import Category from './Admin/Category';
import ControlBookReviews from './Admin/ControlBookReviews';
import MessageComments from './Admin/MessageComments';
import AdminHome from './Admin/AdminHome';
import MeetingPosts from './component/Meeting/MeetingPosts';
import WriteMeeting from './component/Meeting/WriteMeeting';
import EditPostMeeting from './component/Meeting/EditPostMeeting';
import AdminUser from './Admin/AdminUser';
import BandUser from './Admin/BandUser';
import Appchat from './Appchat';





const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Home />
                  <Footer />
                </>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/BookJoin"
              element={
                <>
                  <Navbar />
                  <BookJoin />
                  <Footer />
                </>
              }
            />
            <Route path="/BookShelf" element={
              <>
                  <Navbar />
                  <BookShelf/>
                  <Footer />
                </>
            } />
            <Route path="/BookDetails/:id" element={
                  <>
                  <Navbar />
                  <BookDetails />
                  <Footer />
                </>} />
            <Route path="/author/:authorName" component={Author} element={
              <>
                  <Navbar />
                  <Author />
                  <Footer />
                </>
            } />


             <Route path="/LeftNavbar" component={LeftNavbar} element={
              <>
                  <Navbar />
                  <LeftNavbar/>
                  <Footer />
                </>
            } />

                <Route path="/PostBook" component={PostBook} element={
              <>
                  <Navbar />
                  <PostBook/>
                  <Footer />
                </>
            } />

            
                <Route path="/About" component={About} element={
              <>
                  <Navbar />
                  <About/>
                  <Footer />
                </>
            } />

 <Route path="/write" element={<Write/>}/>

 
                <Route path="/UserStatus" component={UserStatus} element={
              <>
                  <Navbar />
                  <UserStatus/>
                  <Footer />
                </>
            } />
            

              <Route path="/Messages" component={Messages} element={
              <>
                  <Navbar />
                  <Messages/>
                  <Footer />
                </>
            } />


            
              <Route path="/SettingsNavbar" component={SettingsNavbar} element={
              <>
                  <Navbar />
                  <SettingsNavbar/>
                  <Footer />
                </>
            } />

            <Route path="/EditProfile" component={EditProfile} element={
              <>
                  <Navbar />
                  <EditProfile/>
                  <Footer />
                </>
            } />
            
            
            <Route path="/ChangePassword" component={ChangePassword} element={
              <>
                  <Navbar />
                  <ChangePassword/>
                  <Footer />
                </>
            } />


              <Route path="/CommentReply" component={CommentReply} element={
              <>
                  <Navbar />
                  <CommentReply/>
                  <Footer />
                </>
            } />
            
            <Route path="/AdminNavbar" component={AdminNavbar} element={
              <>
                  <AdminNavbar/>
                 
                </>
            } />
            
             <Route path="/AdminRegister" component={AdminRegister} element={
              <>
                  <AdminRegister/>
                 
                </>
            } />
            
            <Route path="/Category" component={Category} element={
              <>
                  <Category/>
                 
                </>
            } />

            <Route path="/ControlBookReviews" component={ControlBookReviews} element={
              <>
                  <ControlBookReviews/>
                 
                </>
            } />
            
  <Route path="/MessageComments" component={MessageComments} element={
              <>
                  <MessageComments/>
                 
                </>
            } />
            
             <Route path="/AdminHome" component={AdminHome} element={
              <>
                  <AdminHome/>
                 
                </>
            } />

             <Route path="/MeetingPosts" component={MeetingPosts} element={
              <>
                  <Navbar/>
                  <MeetingPosts/>
                  <Footer/>
                 
                </>
            } />
       
        <Route path="/WriteMeeting" component={WriteMeeting} element={
              <>
                  <WriteMeeting/>
                 
                </>
            } />

            <Route path="/EditPostMeeting" component={EditPostMeeting} element={
              <>
                  <EditPostMeeting/>
                 
                </>
            } />

             <Route path="/AdminUser" component={AdminUser} element={
              <>
                  <AdminUser/>
                 
                </>
            } />

            <Route path="/BandUser" component={BandUser} element={
              <>
                  <BandUser/>
                 
                </>
            } />
       
        <Route path="/Appchat" component={Appchat} element={
              <>
                  <Navbar />
                  <Appchat/>
                  <Footer />
                </>
            } />
       
        </Routes>
      </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
