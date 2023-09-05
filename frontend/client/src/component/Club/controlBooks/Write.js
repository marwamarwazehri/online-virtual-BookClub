import React ,{useState,useContext,useEffect}from 'react'
import './Write.css'
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios'
import { useQuery, useMutation, useQueryClient } from 'react-query';
import ReactQuill from "react-quill";
import Quill from 'quill/core';
import 'quill/dist/quill.snow.css';
import sanitizeHtml from 'sanitize-html';
import { IoIosArrowBack } from 'react-icons/io';
import booklogo from '../../../img/bookshopLogo.jpg'
import amazonlogo from '../../../img/amazonLogo.png'
import librollogo from '../../../img/libroLogo.png'
import applelogo from '../../../img/applelogo.png'
import Img from '../../../img/img.png'
import moment from "moment";
import { AuthContext } from "../../../context/authContext";


const Write = () => {
const { currentUser } = useContext(AuthContext);
const navigate = useNavigate();
const state = useLocation().state;


const [name, setName] = useState(state?.bookname || "");
const [author, setAuthor] = useState(state?.author || "");
const [pages, setPages] = useState(state?.pages || "");
const [link1, setLink1] = useState(state?.firstlink || "");
const [link2, setLink2] = useState(state?.secondlink || "");
const [link3, setLink3] = useState(state?.thirdlink || "");
const [link4, setLink4] = useState(state?.fourthlink || "");
const [otherlink, setOtherLink] = useState(state?.otherlink || "");

const [desc, setDesc] = useState(state?.description || "");
const [file, setFile] = useState(null);
const [cat, setCat] = useState(state?.category || "");


const handleDescChange = (value) => {
    setDesc(value);
  };
//Upload Image
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);// 3m zeed 3ala formData lfile 
      const res = await axios.post("http://localhost:8800/api/upload", formData);
      return res.data; /*bada tredele limgeurl eno limage name  */
    } catch (err) {
      console.log(err);
    }
  };




  //edit or Add a post depend on the State
  const [displayedErrors, setDisplayedErrors] = useState([]);//for error messages
  
  const handleClick = async (e) => {
  e.preventDefault();
  const plainTextDesc = sanitizeHtml(desc, {
    allowedTags: [], // Remove all tags
    allowedAttributes: {}, // Remove all attributes
  });
  
  // Create an array to store the error messages
  const errors = [];

  // Check if any of the required fields is empty and add error messages to the array
  if (!name) {
    errors.push("Name is empty!");
  }
  if (!author) {
    errors.push("Author is empty!");
  }
  if (!pages) {
    errors.push("Pages number is empty!");
  }
  if (!desc) {
    errors.push("Description is empty!");
  }
  if (!file) {
    errors.push("you should place a book image!");
  }
  if (!cat) {
    errors.push("Category is empty!");
  }
  
  // Check if the file type is incorrect
  if (file) {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      errors.push("Only JPEG and PNG files are accepted!");
    }
  }
  
  // Check if there are any error messages in the array
  if (errors.length > 0) {
    setDisplayedErrors(errors);

    // Clear the error messages after 3 seconds
    setTimeout(() => {
      setDisplayedErrors([]);
    }, 7000);

    return;
  }
  const imgUrl = await upload();

  try {
    if (state) {
      await axios.put(`http://localhost:8800/api/Post/${state.id}`, {
        name,
        author,
        pages,
        link1: link1 ? link1 : "",
        link2: link2 ? link2 : "",
        link3: link3 ? link3 : "",
        link4: link4 ? link4 : "",
        otherlink: otherlink ? otherlink : "",
        desc: plainTextDesc,
        cat,
        img: file ? imgUrl : "",
        userid: currentUser.id
      });
      navigate("/PostBook"); // Navigate to /PostBook after updating a post
    } else {
      await axios.post(`http://localhost:8800/api/Post/`, {
        name,
        author,
        pages,
        link1: link1 ? link1 : "",
        link2: link2 ? link2 : "",
        link3: link3 ? link3 : "",
        link4: link4 ? link4 : "",
        otherlink: otherlink ? otherlink : "",
        desc,
        cat,
        img: file ? imgUrl : "",
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        userid: currentUser.id
      });
      navigate("/BookJoin"); // Navigate to /BookJoin after adding a post
    }
  } catch (err) {
    console.log(err);
  }
};






//getCategory from Category Table 
const [category,setCategory]=useState([]);
useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8800/api/Categories/category');
      const categoriesData = response.data;
      setCategory(categoriesData);
      /*setCat(categoriesData.length > 0 ? categoriesData[0].category : '');*/
    } catch (error) {
      console.log(error);
    }
  };

  fetchCategories();
}, []);


const handleCategoryChange = (e) => {
  setCat(e.target.value);
};


 return (
    <div className='control-container'>
      <div className='right-container'>
       
       <div className='go-back'>
        <Link  to='/PostBook' className='back-icon'><IoIosArrowBack size={30} color='rgb(25, 151, 201)'/></Link>
        <Link   to='/PostBook'><p>GO BACK</p></Link>
       </div>
       
<div className='error-messages'>
  {displayedErrors.map((errorMsg, index) => (
    <p key={index}>{errorMsg}</p>
  ))}
</div>


       <div className='input'>
        <input
          type="text"
           value={name}
          placeholder="Book Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
           value={author}
          placeholder="Book Author"
          onChange={(e) => setAuthor(e.target.value)}
        />

        <input
          type="text"
           value={pages}
          placeholder="Pages Number"
          onChange={(e) => setPages(e.target.value)}
        />
     
        </div>

  
  <div className="editorContainer">
  <ReactQuill
    className="editor"
    theme="snow"
    value={desc}
    placeholder='Book Description'
    onChange={handleDescChange}
    sanitize={sanitizeHtml}
  />
</div>



<div className='choose-cat'>
<select value={cat} onChange={handleCategoryChange}>
    <option value="" hidden>Select a category</option> {/* Empty option */}
    {category.map((option, index) => (
      <option key={index} value={option.category}>
        {option.category}
      </option>
    ))}
  </select>
  
</div>
</div>


<div className='left'>

<div className='buy-links'>
          <p>-If Buying This Book available on one of these Websites you can put the link (this is optional) </p>
          <div className='links-input'>
           <div className='links-input-Item'>
            <img  src={booklogo}/>
            <input
          type="text"
           value={link1}
          placeholder="link"
          onChange={(e) => setLink1(e.target.value)}
        />
</div> 
          <div className='links-input-Item'>
          <img  src={librollogo}/>
            <input
          type="text"
           value={link2}
          placeholder="link"
          onChange={(e) => setLink2(e.target.value)}
        />
        </div>
 <div className='links-input-Item'>
        <img  src={amazonlogo}/>
            <input
          type="text"
           value={link3}
          placeholder="link"
          onChange={(e) => setLink3(e.target.value)}
        />
        </div>
 <div className='links-input-Item'>
        <img  src={applelogo}/>
            <input
          type="text"
           value={link4}
          placeholder="link"
          onChange={(e) => setLink4(e.target.value)}
        />
        </div>

        <div className='links-input-Item'>
        <div className='links-input-Item-other'>
                  OTHER WEBSITES  
              </div>
            <input
          type="text"
           value={otherlink}
          placeholder="link"
          onChange={(e) => setOtherLink(e.target.value)}
        />
        </div>

      

</div>
        </div>

<div className='upload-img'>
  
  <div className='upload-content'>
  <input
    type="file"
    id="file5"
    style={{ display: "none" }}
    onChange={(e) => setFile(e.target.files[0])}
    />         
   <label htmlFor="file5">
         <div className="item">
          <img src={Img} alt="" />
             <span>Add Image</span>
              </div>
            </label>   
     </div>  
  <div className='fake-image'>
    {file && (
          <img className="file" alt="" src={URL.createObjectURL(file)} />  
              
            )}
    </div>    
</div>




<div className='post'>
  <button onClick={handleClick}>{state?"EDIT":"POST"}</button>
</div>
</div>

      
    </div>
  )
}

export default Write