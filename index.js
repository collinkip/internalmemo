const guideslist=document.querySelector('.guides');

const loggedoutlinks=document.querySelectorAll('.logged-out');
const loggedinlinks=document.querySelectorAll('.logged-in');

const accountDetails=document.querySelector('.account-details');
const tableUsers=document.querySelector('.table-user');
const editModel=document.querySelector('.model-wrapper');
const editModalForm=document.querySelector('.edit-model form');

let id;



const setupUI=(user)=>{
    if(user){
        //output userdata
        
        db.collection('userdata').doc(user.uid).get().then(doc=>{
                 const html=`
                 <tr data-id='${doc.id}'>
                     <td><div>${doc.data().fullname}</div></td>
                     <td><div>${doc.data().department}</div></td>
                     <td><div>${user.email}</div></td>
                     <td><div>${doc.data().phone}</div></td>
                     <td>
                         <button class="btn btn-edit" id="btn-edit"><a href="#" class="white-text modal-trigger" data-target="modal-edit">Edit</a></button>
                         <button class="btn btn-delete">Delete</button>

                     </td>
                </tr>
            `;
            tableUsers.innerHTML=html;
            const deletebutton=document.querySelector('.btn-delete');
            deletebutton.addEventListener('click',()=>{
                db.collection('userdata').doc(`${doc.id}`).delete().then (()=>{
                    console.log('user deleted');
                });
                
                
            });
            const edit=document.querySelector('.btn-edit');
            edit.addEventListener('click',()=>{
                id=doc.id;
                console.log(doc.data());
                console.log(id);
                editModalForm.fullname.value=doc.data().fullname;
                editModalForm.phone.value=doc.data().phone;
                editModalForm.email.value=user.email;
                editModalForm.department.value=doc.data().department;
                
            });
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
editModalForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    db.collection('userdata').doc(id).update({
        fullname:editModalForm.fullname.value,
        department:editModalForm.department.value,
        phone:editModalForm.phone.value
    }).catch(err=>{
        alert(err);
    });

});

  







