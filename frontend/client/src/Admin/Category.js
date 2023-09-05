import React, {useState,useContext,useEffect} from 'react'
import './Category.css'
import AdminNavbar from './AdminNavbar'
import { AuthContext } from "../context/authContext";
import { Link , useNavigate} from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {MdOutlineCancel} from 'react-icons/md'
import axios from "axios";


const makeRequest = axios.create({
  baseURL: "http://localhost:8800/api/AdminUser",
  withCredentials: true,
});



const Category = () => {
const { currentUser} = useContext(AuthContext);
  const queryClient = useQueryClient();

  const [newCategory,setNewCategory]=useState('');
  const [isdeleted,setIsDeleted]=useState(false);
const [isEmptyError, setIsEmptyError] = useState(false);
const [showCategory, setShowCategory] = useState(false);
 const [categoryExistsError, setCategoryExistsError] = useState(false);


  
//getCategories
const { isLoading, error, data } = useQuery(["Categories"], () =>
  makeRequest.get(`/getCategories`).then((res) => {
    return res.data;
  })
 
);



  // add Category
  const addCategory = async () => {
    if (newCategory.trim() === '') {
      setIsEmptyError(true);
        setTimeout(() => {
     setIsEmptyError(false);
    }, 3000);
      return;
    }

    try {
      const response = await makeRequest.post('/addCategory', { category: newCategory });
      if (response.status === 200) {
        setNewCategory('');
        setShowCategory(false);
        queryClient.invalidateQueries('Categories');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
            setCategoryExistsError(true);
          setTimeout(() => {
        setCategoryExistsError(false);
    }, 3000);
         setNewCategory('');
      } else {
        console.error('Error adding category:', error);
      }
    }
  };


//delete Categorys

const handleDeleteCategory = async (categoryId) => {
  try {
    await axios.delete(`http://localhost:8800/api/AdminUser/deletecategory/${categoryId}`);
    queryClient.invalidateQueries("Categories"); // Invalidate the query to fetch updated data
    setIsDeleted(true);
    setTimeout(() => {
     setIsDeleted(false);
    }, 3000);
    

  
  } catch (error) {
    console.error(error);
  }
};


const handleCancel=(()=>{
  setShowCategory(false);
  setNewCategory('');
})


  return (
    <div className='main-category-conatner'>
      <div className='nav-category'>
          <AdminNavbar/>
      </div>
  
   {/* ////////////////////////////////////////////////////////////////////////////// */}     
 <div className='category-content'>
       <div className='category-content-title'>
        <h5>Category Items</h5>
       </div>

{isdeleted &&<div className='category-del'><p>Category has been removed</p></div>}      
{/*fetch categories*/}

{isLoading ? (
  <p>Loading...</p>
) : (
  
<div className='category-List'>
  
    <table>
      <thead>
        <tr>
    <th>S.N.</th>
    <th>Category</th>
     <th>Action</th>
        </tr>
      </thead>
      <tbody>
       {data && data.map((category,index) => {
    return(
    <tr key={category.id}>
        <td>{index + 1}</td>
        <td>{category.category}</td>
         <td><button onClick={()=>handleDeleteCategory(category.id)}>Delete</button></td>
           </tr>
    );
  })}
      </tbody>
    </table>
  
</div>
)}

<div className='add-cat-design'>

<button onClick={()=>setShowCategory(!showCategory)}>Add Category</button>
</div>


{showCategory &&
<div className='add-categort-container'>

 <div className='add-category'>

  <div className='categoryfield-content'>
  <div className='categoryfield-content-cancel'><MdOutlineCancel size={33} color='rgb(77, 73, 73)' onClick={handleCancel}/></div>
{isEmptyError && <div className='categoryfield'><p>Category Field is empty</p></div>}
{categoryExistsError && <div className='categoryfield'><p>Category already exists</p></div>}
           <input type='text' placeholder='Category' value={newCategory}  onChange={(e)=>setNewCategory(e.target.value)}/>
            <button onClick={addCategory}>ADD</button>
            </div>
            </div>
    </div>
 }



      </div>
      
    </div>
  )
}

export default Category
