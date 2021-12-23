const guideslist=document.querySelector('.guides');

const loggedoutlinks=document.querySelectorAll('.logged-out');
const loggedinlinks=document.querySelectorAll('.logged-in');

const accountDetails=document.querySelector('.account-details');



const setupUI=(user)=>{
    if(user){
        //output userdata
        db.collection('userdata').doc(user.uid).get().then(doc=>{
            const html=`
                <div>logged in as ${user.email}</div>
                <div>Department    :${doc.data().department}</div>
                <div>Fullname   :${doc.data().fullname}</div>
                <div>Phone     :${doc.data().phone}</div>
            `;
            accountDetails.innerHTML=html;
        })

        //acount info
        
        

        loggedinlinks.forEach(item=>item.style.display='block');
        loggedoutlinks.forEach(item=>item.style.display='none');
    }
    else{
        accountDetails.innerHTML="";
        loggedoutlinks.forEach(item=>item.style.display='block');
        loggedinlinks.forEach(item=>item.style.display='none');

    }
}


const setupGuides=(data)=>{

    if(data.length){
        let html='';
    data.forEach(doc=>{
        const guide=doc.data();

        const li=`
        <li>
          <div class="collapsible-header grey lighten-4">${guide.title}</div>
          <div class="collapsible-body white">${guide.content}</div>
  
        </li>
        `;
        html+=li
    });

    guideslist.innerHTML=html;
    
    }
    else{
        guideslist.innerHTML='<h5 class="center-align">Login to view Resent updates</h5>'
    }
    
}




// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });