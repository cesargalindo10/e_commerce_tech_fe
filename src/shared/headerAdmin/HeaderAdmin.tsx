import { useDispatch, useSelector } from 'react-redux';
import './headerAdmin.css'
import {FiLogOut} from "react-icons/fi"
import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { AppStore } from '../../redux/store';
import { resetUser } from '../../redux/state/user';
interface Props{
    children:ReactNode
}
export default function HeaderAdmin({children}:Props) {

 const user = useSelector((store: AppStore) => store.user)
 const dispatch = useDispatch();
 const navigate = useNavigate()
 const logOut=()=>{
    dispatch(resetUser())
    navigate("/login")
 }

  return (
    <div>
      <div className="container-header">
        <div className='d-flex align-items-center'>
          <h3 className='tc-white pe-4'>hola, {user.name}</h3>
          <button onClick={()=>logOut()} className=' btn-logout tc-white pe-4'><FiLogOut/></button>
        </div>
      </div>
      {children}
    </div>
  );
}