module.exports.signUpErros = (err) => {
    let errors = {pseudo: '', email: '', password: ''}

    if (err.message.includes('pseudo'))
        errors.pseudo = "Pseudo incorrect ou déjà utilisé";

    if (err.message.includes('email'))
        errors.email = "Email incorrect";

    if (err.message.includes("password"))
        errors.password = 'Le mot de passe doit faire 6 caractères minimum et 32 maximum'

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo"))
        errors.pseudo = "Ce pseudo est déjà pris";
    
    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email"))
        errors.email = "Cet email est déjà enregistré";

    return errors
}

module.exports.signInErrors = (err) => {
    let errors = { email: '', password: ''}
  
    if (err.message.includes("email")) 
      errors.email = "Email et/ou mot de passe incorrect(s)";
    
    if (err.message.includes('password'))
      errors.password = "Email et/ou mot de passe incorrect(s)"
  
    return errors;
}
  
module.exports.uploadErrors = (err) => {
    let errors = {format: '', maxSize: ''};

    if (err.message.includes('invalid file'))
        errors.format = "Format incompatible. Seulement '.jpg', '.png', .jpeg' sont acceptés";

    if (err.message.includes('max size'))
        errors.maxSize = "Le fichier dépasse 500ko";

    return errors;
}