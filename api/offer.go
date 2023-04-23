package main

import (
	"log"
	"net/http"
	
	"fmt"
 )

 

func main()  {

	 //handle /authorized route
	 http.HandleFunc("/",handlePage )

	 //listen to the port in 4001
	 err :=http.ListenAndServe(":4001",nil)

	 if err != nil {
	 	log.Println("There was an error listening on port :4001", err)
	  }
	 
}


func handlePage(writer http.ResponseWriter, request *http.Request) {
	fmt.Printf("Req: %s %s\n", request.Host, request.URL.Path) 
	
	

	header := request.Header.Get("Authorization")
	
	
	 if (header != "") {
	
		writer.WriteHeader(http.StatusOK)
		_, err := writer.Write([]byte("/ 15 "))
		if err != nil {
		// handle error
		}
	 } else {
		writer.WriteHeader(http.StatusUnauthorized)
	 		_, err2 := writer.Write([]byte("You're Unauthorized because you have no token"))
	 		if err2 != nil {
	 			return
	 		}
	 }

}
