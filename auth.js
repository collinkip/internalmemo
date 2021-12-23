
//listen auth status
auth.onAuthStateChanged(user=>{
    if(user){
        console.log('user logges in');
        //get data
    db.collection('memos').onSnapshot(snapshot=>{
    setupGuides(snapshot.docs);
    setupUI(user);
    console.log(user.email)
});
    }
    else{
        setupUI();
        console.log('user loged out');
        setupGuides([]);
    }
});



//create new guide
const createForm=document.querySelector('#create-form');
createForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    db.collection('memos').add({
        title:createForm['title'].value,
        content:createForm['content'].value
    }).then(()=>{
        //close modal and reset form
        const modal=document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset(); 

    }).catch(err=>{
        console.log(err.message)
        alert(err.message);
    })
})



//signup
const signupForm=document.querySelector('#signup-form');
signupForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    //get signup details

    const email=signupForm['signup-email'].value;
    const password=signupForm['signup-password'].value;
    console.log(email,password);


    //signup usser
    auth.createUserWithEmailAndPassword(email,password).then(cred =>{
        return db.collection('userdata').doc(cred.user.uid).set({
            fullname:signupForm['signup-fullname'].value,
            phone:signupForm['signup-phone'].value,
            department:signupForm['signup-department'].value
        }).catch(err=>{
            alert(err)
        });
        
    }).then(()=>{
        const modal=document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset(); 

    }).catch(err=>{
        alert(err);
    });

});



//logout user
const logout=document.querySelector('#logout');

logout.addEventListener('click',(e)=>{ 
    e.preventDefault();
    auth.signOut().then(()=>{
    });
    

});



//login formsigned
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    //get user details
    const email=loginForm['login-email'].value;
    const password=loginForm['login-password'].value;
    
    auth.signInWithEmailAndPassword(email,password).then(cred=>{
          const modal=document.querySelector('#modal-login')
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    }).catch(err=>{
        console.log(err.message)
        alert(err.message);
    })
})
