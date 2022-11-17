package main

import (
	"fmt"
	"log"
	"net/http"

	"main/controllers"
	"main/db"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {

	// connecting to database
	db.Opendb()

	r := mux.NewRouter()
	r.HandleFunc("/user", controllers.CreateUser).Methods("POST")
	r.HandleFunc("/users/", controllers.GetUsers).Methods("GET")
	r.HandleFunc("/user/{user_id}", controllers.GetUser).Methods("GET")
	r.HandleFunc("/user/{user_id}", controllers.UpdateUser).Methods("PUT")

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "DELETE", "POST", "PUT"},
	})

	handler := c.Handler(r)

	fmt.Println("project started at 8080")
	log.Fatal(http.ListenAndServe(":8080", handler))
	http.Handle("/", r)

}
