package controllers

import (
	"encoding/json"
	"fmt"

	"main/db"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	uuid "github.com/satori/go.uuid"
)

// creating user stucture
type User struct {
	User_id       uuid.UUID
	First_name    string `json:"first_name"`
	Last_name     string `json:"last_name"`
	Date_of_birth string `json:"date_of_birth"`
	Email_id      string `json:"email_id"`
	Created_date  time.Time
	Updated_date  time.Time
	User_type     string `json:"user_type"`
}

// structure for patch
type Edit struct {
	First_name string `json:"first_name"`
	Last_name  string `json:"last_name"`
}

// create new user
func CreateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/json")
	var user User
	_ = json.NewDecoder(r.Body).Decode(&user)
	user.User_id = uuid.NewV4()
	user.Created_date = time.Now()
	user.Updated_date = time.Now()
	db.Db.Create(&user)
	// fmt.Println(user)
	json.NewEncoder(w).Encode(user)

}

// retrieving user details
func GetUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/json")
	var user User
	params := mux.Vars(r)

	_ = db.Db.Where("user_id=?", params["user_id"]).Find(&user)
	json.NewEncoder(w).Encode(user)
}

// retrieving all user details
func GetUsers(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/json")
	var users []User
	err := db.Db.Find(&users)
	if err != nil {
		fmt.Println(err)
	}
	// fmt.Println(users)

	json.NewEncoder(w).Encode(users)
}

// update user details
func UpdateUser(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Context-Type", "application/json")
	var user User
	params := mux.Vars(r)

	var edit Edit
	_ = json.NewDecoder(r.Body).Decode(&edit)
	db.Db.Model(&user).Where("user_id=?", params["user_id"]).Updates(User{First_name: edit.First_name, Last_name: edit.Last_name})

	_ = db.Db.Where("user_id=?", params["user_id"]).Find(&user)
	json.NewEncoder(w).Encode(user)

}
