import React from 'react';
import {Link} from 'react-router-dom';

const HandleCheck = () => {



  const handleCheck = () =>{
    return null;
  }
  return (
    <div> 
      <div className='login' >
            <Link to='/'>
                medistore
            </Link>
            <div className="login__container">
                <h1>Sign-In</h1>
                <form>

                    <h5>
                        userHandle
                    </h5>

                    <button onClick={handleCheck} className='login__registerButton' >Create your Amazon Account</button>
                </form>
            </div>
            
        </div>
    </div>
  )
}

export default HandleCheck;