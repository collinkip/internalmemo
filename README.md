##Title:FLOWBITE COMMUNICATINS
#Internal communications system


#DESCRIPTION
    The system provides a platform for member of a company to get
    updates on communications pertaining internal affairs 


#CONTRIBUTORS
    SCCJ/01432/2019	COLLINS MUGO
	SCCI/00776/2019	Francis Ndungu
	SCCI/00781/2019	Clinton Joash
	SCCI/00760/2019	samuel Njoroge
	SCCJ/01105/2018	manase
	SCCJ/01434/2019	Johnclaud Mwangi 
	SCCI/00763/2019	Daniel Mwanzia

<!-- open this folder on the terminal and run the following commmands

build the docker image -->
docker build -t flowbite .
<!-- run the docker image created  on port 8080-->
docker run -p 8080:80 -d flowbite


docker ps


go to any browser and enter the following link on the browser

http://0.0.0.0:8080/test/


