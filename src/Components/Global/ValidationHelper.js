
//Validations -> 
export const LoginValidation = (values) => {
    const {  Email, Password} = values;
    let errors = {}
    if(!Email ){ errors.Email = 'Email Required'
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(Email)){
        errors.Email = 'Invalid email format'
    } 

    if(!Password ){ errors.Password = 'Password Required'
    }else if(Password.length < 6){
        errors.Password = 'Min 6 Characters'
    } 
    return errors;
}

export const ForgotValidation = (values) => {
    const {  Email } = values;
    let errors = {}
    if(!Email ){ errors.Email = 'Email Required'
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(Email)){
        errors.Email = 'Invalid email format'
    }
    
    return errors;
}


export const SignupValidation = (values, userType) => {

    const { Firstname, Lastname, Phone, Email, Password, HostType, ConfirmPassword, City} = values;
    let errors = {}
    
    if(!Firstname ){ 
        errors.Firstname = 'Firstname Required'
    }else if(/\d/.test(Firstname)){
        errors.Firstname = 'Invalid Firstname'
    }

    if(!Lastname){ 
        errors.Lastname = 'Lastname Required'
    }else if(/\d/.test(Firstname)){
        errors.Lastname = 'Invalid Lastname'
    }

    if(!Email ){ 
        errors.Email = 'Email Required'
    }else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(Email)){
        errors.Email = 'Invalid email format'
    } 

    if(!Password ){ errors.Password = 'Password Required'
    }else if(Password.length < 6){
        errors.Password = 'Min 6 Characters'
    } 

    if(userType == 'host' ){
        
        if(!HostType ){ 
            errors.HostType = 'Host Type Required'
        }else if(/\d/.test(Firstname)){
            errors.HostType = 'Invalid HostType'
        } 

        if(!City ){ 
            errors.City = 'City Required'
        }

        if(!Phone){ errors.Phone = 'Contact no Required'
        }else if(Phone.length > 10 || Phone.length < 10 ){
            errors.Phone = 'Min 10 Characters'
        }else if(!(/^([+]\d{2})?\d{10}$/.test(Phone))){
            errors.Phone = 'Invalid Phone'
        }

        if(!ConfirmPassword){ errors.ConfirmPassword = 'Please Confirm Password'
        }else if(ConfirmPassword != Password ){
            errors.ConfirmPassword = 'Password Missmatch'
        } 
        
    }

    return errors;
}