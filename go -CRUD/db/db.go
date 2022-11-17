package db

import (
	"fmt"
	"log"
	"os"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/joho/godotenv"
)

var Db *gorm.DB

func Opendb() {
	godotenv.Load()
	username := os.Getenv("username")
	password := os.Getenv("password")
	databaseName := os.Getenv("databaseName")

	dbs := fmt.Sprintf("%s:%s@tcp(127.0.0.1:3306)/%s?charset=utf8&parseTime=True", username, password, databaseName)
	db, err := gorm.Open("mysql", dbs)

	if err != nil {
		log.Println("Connection Failed to Open")
		Db = nil
	}

	log.Println("Connection Established")
	Db = db

}
