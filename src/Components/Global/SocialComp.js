import React     from 'react'
import twitter   from '../../Assets/images/twitter.png'
import facebook  from '../../Assets/images/facebook.png'
import instagram from '../../Assets/images/instagram.png'

const SocialComp = () => {
    
    return(<>
        <div className="card mb-4 bg-light text-center">
            <div className="card-body py-12">
                <span className="mx-4">
                    <img src={instagram} className="h-40px my-2" alt="social-img"/>
                </span>
                <span  className="mx-4">
                    <img src={facebook} className="h-40px my-2" alt="social-img" />
                </span>
                <span className="mx-4">
                    <img src={twitter} className="h-40px my-2" alt="social-img"/>
                </span>
            </div>
        </div>
    </>)
}

export default SocialComp